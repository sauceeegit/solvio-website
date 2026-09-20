// Autonomous coding worker for Plantage / Guni jobs.
//
// Spawned by server.mjs after a new TASK or DELEGATE job is created.
// Usage: node worker.mjs <jobId> <serverPort>
//
// The worker:
//   1. Reads workspaces.json to find the right project directory.
//   2. PATCHes the job to "working".
//   3. Runs `claude -p` scoped to that directory.
//   4. Parses the final output for DONE: or NEEDS_YOU: sentinel lines.
//   5. PATCHes the job to the appropriate terminal state.
//
// Mock mode (WORKER_MOCK=1): skips the real claude invocation.
//   WORKER_MOCK_RESULT=DONE (default) or NEEDS_YOU
//   WORKER_MOCK_BLOCKER=<reason text for NEEDS_YOU>

import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve as resolvePath} from 'node:path';

const [jobId, serverPort] = process.argv.slice(2);
const baseUrl = `http://127.0.0.1:${serverPort}`;

// ── HTTP helpers (no external deps) ─────────────────────────────────────────

async function getGuni() {
  const res = await fetch(`${baseUrl}/api/guni`);
  return res.json();
}

async function patchJob(status, extra = {}) {
  try {
    await fetch(`${baseUrl}/api/guni/jobs/current`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({jobId, status, ...extra}),
    });
  } catch {
    // Server may have restarted; ignore — the worker exits cleanly.
  }
}

// ── Workspace resolution ─────────────────────────────────────────────────────
// Reads workspaces.json (adjacent to this file), then matches case-insensitively
// against every word in the job intent. Returns an absolute path, or null.

async function resolveWorkspace(intent) {
  const registryPath = fileURLToPath(new URL('./workspaces.json', import.meta.url));
  let registry = {};
  try {
    registry = JSON.parse(await readFile(registryPath, 'utf8'));
  } catch {
    return null;
  }

  const words = intent.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/);
  for (const key of Object.keys(registry)) {
    if (words.includes(key.toLowerCase())) {
      const raw = registry[key];
      return raw === '.' ? fileURLToPath(new URL('.', import.meta.url)) : resolvePath(raw);
    }
  }
  return null;
}

// ── Claude invocation ────────────────────────────────────────────────────────

const WORKER_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes per job

const WORKER_SYSTEM_PROMPT = `You are an autonomous coding worker for the Plantage AI office.

RULES (strictly enforced):
1. Work ONLY within the assigned workspace directory.
2. Do NOT push to git, deploy, publish, or make any external irreversible changes.
3. Do NOT print, expose, read, or modify credentials, API keys, or secrets.
4. After making changes, run available tests or builds to verify correctness.
5. If tests or builds fail, diagnose and fix. Retry up to 3 times.
6. Never remove or delete project files unless the task explicitly asks for it.
7. When you are fully done and verified, output EXACTLY this line as your VERY LAST LINE of output:
   DONE: <one sentence summary of what changed and what passed>
8. If you cannot complete the task without human input (missing credential, ambiguous requirement, destructive action needed), output EXACTLY as your VERY LAST LINE:
   NEEDS_YOU: <one sentence describing exactly what human input is required>`;

function buildPrompt(intent, workspacePath) {
  return `${WORKER_SYSTEM_PROMPT}

TASK: ${intent}
WORKSPACE: ${workspacePath}

Begin. Work inside the workspace, complete the task, verify with tests or a build, then output the appropriate DONE: or NEEDS_YOU: sentinel as your very last line.`;
}

async function runClaude(intent, workspacePath) {
  const prompt = buildPrompt(intent, workspacePath);
  const claudeBin = 'claude';
  const args = [
    '-p',
    '--dangerously-skip-permissions',
    '--allowedTools', 'Bash,Edit,Read,Write,Glob,Grep,LS',
    '--max-turns', '20',
    prompt,
  ];

  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    const proc = spawn(claudeBin, args, {
      cwd: workspacePath,
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    proc.stdout.on('data', d => {
      const chunk = d.toString();
      stdout += chunk;
      process.stdout.write('[claude] ' + chunk);
    });
    proc.stderr.on('data', d => {
      stderr += d.toString();
      process.stderr.write('[claude-err] ' + d.toString());
    });

    const timer = setTimeout(() => {
      proc.kill('SIGTERM');
    }, WORKER_TIMEOUT_MS);

    proc.on('close', code => {
      clearTimeout(timer);
      resolve({stdout, stderr, code});
    });
    proc.on('error', err => {
      clearTimeout(timer);
      resolve({stdout, stderr: stderr + '\n' + err.message, code: -1});
    });
  });
}

// ── Parse final status from claude output ────────────────────────────────────
// Looks for the LAST occurrence of DONE: or NEEDS_YOU: sentinel in output.

function parseFinalStatus(output) {
  const lines = output.split('\n').map(l => l.trim()).filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('DONE:')) {
      return {status: 'done', text: lines[i].slice('DONE:'.length).trim()};
    }
    if (lines[i].startsWith('NEEDS_YOU:')) {
      return {status: 'needs_you', text: lines[i].slice('NEEDS_YOU:'.length).trim()};
    }
  }
  // No sentinel found — treat as a blocker rather than silently succeeding.
  return {status: 'needs_you', text: 'Worker finished without a DONE or NEEDS_YOU sentinel. Review logs.'};
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!jobId || !serverPort) {
    console.error('[worker] Missing jobId or serverPort');
    process.exit(1);
  }

  // Short delay to let the HTTP response reach the client before we patch.
  await new Promise(r => setTimeout(r, 150));

  // Confirm the job still exists and is ours.
  let guni;
  try {
    guni = await getGuni();
  } catch (e) {
    console.error('[worker] Could not reach server:', e.message);
    process.exit(1);
  }
  if (!guni.currentJob || guni.currentJob.id !== jobId) {
    console.log('[worker] Job no longer current, exiting.');
    process.exit(0);
  }

  const intent = guni.currentJob.intent;

  // ── Mock mode (tests) ──────────────────────────────────────────────────────
  if (process.env.WORKER_MOCK === '1') {
    await patchJob('working');
    const mockResult = (process.env.WORKER_MOCK_RESULT || 'DONE').toUpperCase();
    await new Promise(r => setTimeout(r, 50)); // let watchers poll
    if (mockResult === 'DONE') {
      await patchJob('done', {result: 'Mock worker: task completed successfully.'});
    } else {
      await patchJob('needs_you', {
        pendingQuestion: process.env.WORKER_MOCK_BLOCKER || 'Mock worker: blocked — human input required.',
      });
    }
    process.exit(0);
  }

  // ── Workspace resolution ───────────────────────────────────────────────────
  const workspacePath = await resolveWorkspace(intent);

  if (!workspacePath) {
    await patchJob('needs_you', {
      pendingQuestion: 'No workspace found for this task. Add a matching entry to workspaces.json, or specify a project name in your request.',
    });
    process.exit(0);
  }

  if (!existsSync(workspacePath)) {
    await patchJob('needs_you', {
      pendingQuestion: `Workspace directory not found on disk: ${workspacePath}`,
    });
    process.exit(0);
  }

  // ── Mark working ───────────────────────────────────────────────────────────
  await patchJob('working');

  // ── Run claude ─────────────────────────────────────────────────────────────
  console.log(`[worker] Running claude in ${workspacePath} for job ${jobId}`);
  const {stdout, stderr, code} = await runClaude(intent, workspacePath);

  if (code === -1 && stderr.includes('ENOENT')) {
    await patchJob('needs_you', {
      pendingQuestion: 'Claude Code CLI not found. Install it and ensure it is in PATH.',
    });
    process.exit(0);
  }

  // ── Parse result and update job ────────────────────────────────────────────
  const final = parseFinalStatus(stdout);
  if (final.status === 'done') {
    await patchJob('done', {result: final.text});
  } else {
    await patchJob('needs_you', {pendingQuestion: final.text});
  }

  process.exit(0);
}

main().catch(e => {
  console.error('[worker] Fatal error:', e);
  process.exit(1);
});
