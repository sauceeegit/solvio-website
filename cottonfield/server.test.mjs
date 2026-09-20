// Integration tests — Step 1 + Step 2
// Run: PORT=4175 node server.mjs & sleep 1 && PORT=4175 node --test server.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';

const BASE=`http://127.0.0.1:${process.env.PORT||4174}`;
// Path to guni.json relative to this test file (same dir as server.mjs)
const GUNI_FILE=fileURLToPath(new URL('./data/guni.json',import.meta.url));

const GUNI_SEED={
agent:'Guni',role:'orchestrator',status:'idle',
activeWorkers:[],pendingQuestion:null,
messages:[],currentJob:null,
lastUpdate:new Date().toISOString()
};

async function resetGuni(){
await writeFile(GUNI_FILE,JSON.stringify(GUNI_SEED,null,2));
}

async function get(path){
const r=await fetch(`${BASE}${path}`);
return{status:r.status,body:await r.json()};
}
async function post(path,body){
const r=await fetch(`${BASE}${path}`,{method:'POST',
headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
return{status:r.status,body:await r.json()};
}
async function patch(path,body){
const r=await fetch(`${BASE}${path}`,{method:'PATCH',
headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
return{status:r.status,body:await r.json()};
}

// ── Step 2 tests ────────────────────────────────────────────────────────────

test('new message persists to guni.json',async()=>{
await resetGuni();
const{status,body}=await post('/api/guni/messages',{text:'Check on Markus progress.'});
assert.equal(status,201);
assert.ok(body.message.id.startsWith('msg_'));
assert.equal(body.message.role,'user');
assert.equal(body.message.text,'Check on Markus progress.');
// verify via GET that it survived
const g=await get('/api/guni');
assert.equal(g.body.messages.length,1);
assert.equal(g.body.messages[0].id,body.message.id);
});

test('job is created with stable id on new message',async()=>{
await resetGuni();
const{status,body}=await post('/api/guni/messages',{text:'Fix the login bug.'});
assert.equal(status,201);
assert.ok(body.job.id.startsWith('job_'));
assert.equal(body.job.status,'pending');
assert.equal(body.job.intent,'Fix the login bug.');
assert.equal(body.message.jobId,body.job.id);
const g=await get('/api/guni');
assert.equal(g.body.currentJob.id,body.job.id);
});

test('one pending job enforced — second message rejected with 409',async()=>{
await resetGuni();
await post('/api/guni/messages',{text:'First job.'});
const{status,body}=await post('/api/guni/messages',{text:'Second job — should be blocked.'});
assert.equal(status,409);
assert.match(body.error,/already active/i);
});

test('NEEDS YOU → user answer with matching jobId → job resumes as working',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Deploy to staging.'});
const jobId=created.job.id;
// worker transitions job to needs_you (must supply matching jobId)
await patch('/api/guni/jobs/current',{jobId,status:'needs_you',pendingQuestion:'Which branch?'});
// user answers with the correct jobId
const{status,body}=await post('/api/guni/messages',{text:'Use main.',jobId});
assert.equal(status,200);
assert.equal(body.guni.currentJob.id,jobId);
assert.equal(body.guni.currentJob.status,'working');
assert.equal(body.guni.currentJob.answer,'Use main.');
assert.equal(body.guni.currentJob.pendingQuestion,null);
});

test('wrong jobId answer rejected with 409',async()=>{
await resetGuni();
const{body:j2}=await post('/api/guni/messages',{text:'Some job.'});
await patch('/api/guni/jobs/current',{jobId:j2.job.id,status:'needs_you',pendingQuestion:'Confirm?'});
const{status,body}=await post('/api/guni/messages',{text:'Yes.',jobId:'job_wrong-id-xyz'});
assert.equal(status,409);
assert.match(body.error,/does not match/i);
});

test('answer rejected when job status is not needs_you',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Run tests.'});
const jobId=created.job.id;
// job is still pending, never set to needs_you
const{status,body}=await post('/api/guni/messages',{text:'Go ahead.',jobId});
assert.equal(status,409);
assert.match(body.error,/not waiting/i);
});

test('restart preserves conversation and job state',async()=>{
await resetGuni();
const{body:m1}=await post('/api/guni/messages',{text:'Persist this job.'});
const msgId=m1.message.id;
const jobId=m1.job.id;
// simulate restart: server always reads from disk, so a fresh GET is the test
const{status,body}=await get('/api/guni');
assert.equal(status,200);
assert.equal(body.messages.length,1);
assert.equal(body.messages[0].id,msgId);
assert.equal(body.currentJob.id,jobId);
assert.equal(body.currentJob.status,'pending');
});

// ── Safety fix regression tests ────────────────────────────────────────────

test('working job blocks new job creation with 409',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'First job.'});
const jobId=created.job.id;
// advance to working
await patch('/api/guni/jobs/current',{jobId,status:'working'});
// attempt to create a second job
const{status,body}=await post('/api/guni/messages',{text:'Should be blocked.'});
assert.equal(status,409);
assert.match(body.error,/working/i);
// original job must still be current and unchanged
const g=await get('/api/guni');
assert.equal(g.body.currentJob.id,jobId);
assert.equal(g.body.currentJob.status,'working');
});

test('correct jobId in PATCH succeeds',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Patch test.'});
const jobId=created.job.id;
const{status,body}=await patch('/api/guni/jobs/current',{jobId,status:'needs_you',pendingQuestion:'Ready?'});
assert.equal(status,200);
assert.equal(body.job.status,'needs_you');
assert.equal(body.job.pendingQuestion,'Ready?');
});

test('wrong jobId in PATCH returns 409',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Stale worker test.'});
const realId=created.job.id;
const{status,body}=await patch('/api/guni/jobs/current',{jobId:'job_stale-wrong-id',status:'done'});
assert.equal(status,409);
assert.match(body.error,/does not match/i);
// currentJob must be unchanged
const g=await get('/api/guni');
assert.equal(g.body.currentJob.id,realId);
assert.equal(g.body.currentJob.status,'pending');
});

test('wrong jobId PATCH does not alter currentJob',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Immutability check.'});
const jobId=created.job.id;
// stale patch with wrong id
await patch('/api/guni/jobs/current',{jobId:'job_bad',status:'done'});
// verify via GET nothing changed
const g=await get('/api/guni');
assert.equal(g.body.currentJob.id,jobId);
assert.equal(g.body.currentJob.status,'pending');
assert.equal(g.body.currentJob.result,null);
});

// ── Step 3 tests — outbound Chad dispatch (requires DISCORD_MOCK=1) ────────

test('dispatch stores Discord message ID on currentJob',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Tell Chad to check the build.'});
const jobId=created.job.id;
const{status,body}=await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'Check the build and report back.'});
assert.equal(status,200);
assert.ok(body.job.outboundDiscordMessageId.startsWith('mock-msg-'));
assert.equal(body.job.dispatchedAt!==undefined,true);
// verify via GET it persisted
const g=await get('/api/guni');
assert.equal(g.body.currentJob.outboundDiscordMessageId,body.job.outboundDiscordMessageId);
});

test('dispatched message contains jobId',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Deploy to staging.'});
const jobId=created.job.id;
const{status,body}=await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'Deploy main to staging.'});
assert.equal(status,200);
assert.ok(body.job.dispatchedMessage.includes(jobId));
});

test('second dispatch on same job rejected with 409',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'First dispatch test.'});
const jobId=created.job.id;
await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'Do the thing.'});
const{status,body}=await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'Do it again.'});
assert.equal(status,409);
assert.match(body.error,/already dispatched/i);
});

test('failed Discord send does not store message ID',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Fail dispatch test.'});
const jobId=created.job.id;
const{status,body}=await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'This will fail.',_mockFail:true});
assert.equal(status,502);
const g=await get('/api/guni');
assert.equal(g.body.currentJob.outboundDiscordMessageId,undefined);
});

test('wrong jobId dispatch rejected with 409',async()=>{
await resetGuni();
await post('/api/guni/messages',{text:'Wrong id dispatch test.'});
const{status,body}=await post('/api/guni/jobs/current/dispatch',{jobId:'job_wrong-stale-id',instruction:'Do something.'});
assert.equal(status,409);
assert.match(body.error,/does not match/i);
});

// ── Step 4 tests — inbound Chad reply ingestion ────────────────────────────
// Server started with DISCORD_CHAD_CHANNEL_ID=ch_test DISCORD_CHAD_BOT_USER_ID=bot_chad
// DISCORD_OWN_BOT_USER_ID=bot_own (set in the test run command alongside DISCORD_MOCK=1)

function chadMsg(overrides={}){
return{
id:'dmsg-'+crypto.randomUUID(),
channel_id:'ch_test',
author:{id:'bot_chad',bot:true},
content:'All done. job_placeholder here.',
...overrides
};
}

test('valid Chad reply by jobId → job becomes done',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Check the deploy.'});
const jobId=created.job.id;
const{status,body}=await post('/webhooks/chad',chadMsg({
content:`Build looks good! Job complete. [Cottonfield Job: ${jobId}]`
}));
assert.equal(status,200);
assert.equal(body.correlated,true);
assert.equal(body.job.id,jobId);
assert.equal(body.job.status,'done');
assert.ok(body.job.result.length>0);
// persists via GET
const g=await get('/api/guni');
assert.equal(g.body.currentJob.status,'done');
});

test('valid Chad reply by message reference → job becomes done',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Run the build.'});
const jobId=created.job.id;
// dispatch so outboundDiscordMessageId is set
const{body:dispatched}=await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'Run the build pipeline.'});
const outMsgId=dispatched.job.outboundDiscordMessageId;
const{status,body}=await post('/webhooks/chad',chadMsg({
content:'Pipeline finished successfully.',
message_reference:{message_id:outMsgId}
}));
assert.equal(status,200);
assert.equal(body.correlated,true);
assert.equal(body.job.id,jobId);
assert.equal(body.job.status,'done');
});

test('wrong channel → ignored with 202',async()=>{
await resetGuni();
const{status,body}=await post('/webhooks/chad',chadMsg({channel_id:'ch_wrong'}));
assert.equal(status,202);
assert.equal(body.ignored,true);
assert.match(body.reason,/wrong channel/i);
// currentJob unchanged
const g=await get('/api/guni');
assert.equal(g.body.currentJob,null);
});

test('wrong author → ignored with 202',async()=>{
await resetGuni();
const{status,body}=await post('/webhooks/chad',chadMsg({
author:{id:'bot_stranger',bot:true}
}));
assert.equal(status,202);
assert.equal(body.ignored,true);
assert.match(body.reason,/wrong author/i);
});

test('own bot message → ignored with 202',async()=>{
await resetGuni();
// bot_own is set as DISCORD_OWN_BOT_USER_ID in the test env
const{status,body}=await post('/webhooks/chad',chadMsg({
author:{id:'bot_own',bot:true}
}));
assert.equal(status,202);
assert.equal(body.ignored,true);
assert.match(body.reason,/own bot/i);
});

test('duplicate Discord message ID → ignored without double-processing',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Dedup test.'});
const jobId=created.job.id;
const msgId='dmsg-dedup-fixed-id';
const payload=chadMsg({id:msgId,content:`All done. [Cottonfield Job: ${jobId}]`});
// first delivery → processes normally
await post('/webhooks/chad',payload);
// second delivery with same Discord message ID → ignored
const{status,body}=await post('/webhooks/chad',payload);
assert.equal(status,202);
assert.equal(body.ignored,true);
assert.match(body.reason,/already processed/i);
});

test('ambiguous/missing correlation → currentJob not mutated',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Ambiguous reply test.'});
const jobId=created.job.id;
// no jobId in content, no matching reply reference
const{status,body}=await post('/webhooks/chad',chadMsg({content:'Hey what was the task again?'}));
assert.equal(status,202);
assert.equal(body.correlated,false);
// currentJob must be untouched
const g=await get('/api/guni');
assert.equal(g.body.currentJob.id,jobId);
assert.equal(g.body.currentJob.status,'pending');
});

test('question reply → job becomes needs_you with pendingQuestion set',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Deploy to prod.'});
const jobId=created.job.id;
const question='Which branch should I deploy?';
const{status,body}=await post('/webhooks/chad',chadMsg({
content:`[Cottonfield Job: ${jobId}] ${question}`
}));
assert.equal(status,200);
assert.equal(body.correlated,true);
assert.equal(body.job.status,'needs_you');
assert.ok(body.job.pendingQuestion.includes(question.split(' ')[0]));
});

// ── Step 5-fix tests — follow-up reply dispatch ────────────────────────────
// Server started with DISCORD_MOCK=1 DISCORD_CHAD_CHANNEL_ID=ch_test etc.
// Helper: advance a job through dispatch → needs_you (Chad question) → answer.
async function setupNeedsYouJob(){
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Deploy to staging.'});
const jobId=created.job.id;
// dispatch the job
await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'Deploy the thing.'});
// Chad asks a question
await post('/webhooks/chad',chadMsg({
content:`[Cottonfield Job: ${jobId}] Which branch should I deploy?`
}));
return jobId;
}

test('NEEDS YOU answer resumes same jobId',async()=>{
const jobId=await setupNeedsYouJob();
const{status,body}=await post('/api/guni/messages',{text:'Use main.',jobId});
assert.equal(status,200);
assert.equal(body.guni.currentJob.id,jobId);
assert.equal(body.guni.currentJob.status,'working');
assert.equal(body.guni.currentJob.answer,'Use main.');
});

test('follow-up reply is dispatched exactly once — stores followUpDiscordMessageId',async()=>{
const jobId=await setupNeedsYouJob();
// resume the job
await post('/api/guni/messages',{text:'Use main.',jobId});
// dispatch the answer back to Chad
const{status,body}=await post('/api/guni/jobs/current/reply',{jobId,answer:'Use main.'});
assert.equal(status,200);
assert.ok(body.job.followUpDiscordMessageId.startsWith('mock-msg-'));
assert.ok(body.job.followUpDispatchedAt!==undefined);
// verify persisted
const g=await get('/api/guni');
assert.equal(g.body.currentJob.followUpDiscordMessageId,body.job.followUpDiscordMessageId);
});

test('same jobId preserved through full needs_you cycle',async()=>{
const jobId=await setupNeedsYouJob();
await post('/api/guni/messages',{text:'Use main.',jobId});
const{body:replied}=await post('/api/guni/jobs/current/reply',{jobId,answer:'Use main.'});
assert.equal(replied.job.id,jobId);
// GET confirms no new job was created
const g=await get('/api/guni');
assert.equal(g.body.currentJob.id,jobId);
});

test('duplicate follow-up reply blocked with 409',async()=>{
const jobId=await setupNeedsYouJob();
await post('/api/guni/messages',{text:'Use main.',jobId});
await post('/api/guni/jobs/current/reply',{jobId,answer:'Use main.'});
// second call on same job
const{status,body}=await post('/api/guni/jobs/current/reply',{jobId,answer:'Use main.'});
assert.equal(status,409);
assert.match(body.error,/already dispatched/i);
});

test('wrong jobId on follow-up reply → 409',async()=>{
const jobId=await setupNeedsYouJob();
await post('/api/guni/messages',{text:'Use main.',jobId});
const{status,body}=await post('/api/guni/jobs/current/reply',{jobId:'job_wrong-stale',answer:'Use main.'});
assert.equal(status,409);
assert.match(body.error,/does not match/i);
});

test('follow-up reply rejected when job is not in working+answered state',async()=>{
await resetGuni();
const{body:created}=await post('/api/guni/messages',{text:'Some task.'});
const jobId=created.job.id;
// job is still pending, no answer yet
const{status,body}=await post('/api/guni/jobs/current/reply',{jobId,answer:'whatever'});
assert.equal(status,409);
assert.match(body.error,/resumed state/i);
});

// ── Multi-cycle needs_you tests (VERANDA fix) ─────────────────────────────
// Helper: set up a job, complete its FIRST needs_you cycle fully
// (answer given + follow-up dispatched) and return {jobId, origOutboundId}.
async function setupTwoCycleJob(){
const jobId=await setupNeedsYouJob();
// First answer (resumes job, status → working)
await post('/api/guni/messages',{text:'Use main.',jobId});
// First follow-up dispatch
await post('/api/guni/jobs/current/reply',{jobId,answer:'Use main.'});
// Chad asks a second question on the same job
await post('/webhooks/chad',chadMsg({
content:`[Cottonfield Job: ${jobId}] Should I also run migrations?`
}));
return jobId;
}

test('second Chad question on same job resets follow-up guard',async()=>{
const jobId=await setupTwoCycleJob();
const{body}=await get('/api/guni');
assert.equal(body.currentJob.status,'needs_you');
assert.equal(body.currentJob.id,jobId);
assert.equal(body.currentJob.followUpDiscordMessageId,null);
assert.equal(body.currentJob.followUpDispatchedAt,null);
// original outbound ID must still be set
assert.ok(body.currentJob.outboundDiscordMessageId,'original outbound ID preserved');
});

test('second answer dispatches once — stores new followUpDiscordMessageId',async()=>{
const jobId=await setupTwoCycleJob();
await post('/api/guni/messages',{text:'Yes, run migrations.',jobId});
const{status,body}=await post('/api/guni/jobs/current/reply',{jobId,answer:'Yes, run migrations.'});
assert.equal(status,200);
assert.ok(body.job.followUpDiscordMessageId,'second followUpDiscordMessageId stored');
assert.ok(body.job.followUpDispatchedAt,'second followUpDispatchedAt stored');
});

test('same jobId preserved across both needs_you cycles',async()=>{
const jobId=await setupTwoCycleJob();
await post('/api/guni/messages',{text:'Yes, run migrations.',jobId});
const{body}=await post('/api/guni/jobs/current/reply',{jobId,answer:'Yes, run migrations.'});
assert.equal(body.job.id,jobId,'jobId unchanged through both cycles');
});

test('duplicate dispatch within second cycle blocked with 409',async()=>{
const jobId=await setupTwoCycleJob();
await post('/api/guni/messages',{text:'Yes, run migrations.',jobId});
await post('/api/guni/jobs/current/reply',{jobId,answer:'Yes, run migrations.'});
// second call on same answer must be blocked
const{status,body}=await post('/api/guni/jobs/current/reply',{jobId,answer:'Yes, run migrations.'});
assert.equal(status,409);
assert.match(body.error,/already dispatched/i);
});

test('first cycle dispatch still blocked after second cycle begins',async()=>{
// Verify the original dispatch idempotency guard (outboundDiscordMessageId) is untouched
const jobId=await setupNeedsYouJob();
// First answer completes cycle 1
await post('/api/guni/messages',{text:'Use main.',jobId});
await post('/api/guni/jobs/current/reply',{jobId,answer:'Use main.'});
// Chad asks cycle 2
await post('/webhooks/chad',chadMsg({
content:`[Cottonfield Job: ${jobId}] Should I also run migrations?`
}));
// Original dispatch route must still reject (outboundDiscordMessageId still set)
const{status,body}=await post('/api/guni/jobs/current/dispatch',{jobId,instruction:'irrelevant'});
assert.equal(status,409);
assert.match(body.error,/already dispatched/i);
});

// ── Guni message router tests ─────────────────────────────────────────────

test('"bro how is the field?" is CHAT — no job created',async()=>{
await resetGuni();
const{status,body}=await post('/api/guni/messages',{text:'bro how is the field?'});
assert.equal(status,200,'CHAT returns 200 not 201');
assert.ok(!body.job,'no job should be created for CHAT');
assert.ok(body.reply,'reply message present');
assert.equal(body.reply.intent,'CHAT');
// guni state must have no active job
const{body:g}=await get('/api/guni');
assert.equal(g.currentJob,null,'currentJob must remain null after CHAT');
});

test('casual greeting is CHAT — no job created',async()=>{
await resetGuni();
const{status,body}=await post('/api/guni/messages',{text:'hey'});
assert.equal(status,200);
assert.ok(!body.job);
assert.ok(body.reply);
});

test('task message creates exactly one job',async()=>{
await resetGuni();
const{status,body}=await post('/api/guni/messages',{text:'Deploy the staging build.'});
assert.equal(status,201,'TASK returns 201');
assert.ok(body.job,'job created');
assert.ok(body.job.id);
});

test('delegate message creates one job (normal dispatch path)',async()=>{
await resetGuni();
const{status,body}=await post('/api/guni/messages',{text:'Have Chad check the prod logs.'});
assert.equal(status,201,'DELEGATE returns 201');
assert.ok(body.job,'job created for DELEGATE');
assert.equal(body.job.jobIntent,'DELEGATE');
});

test('CHAT does not block subsequent task job creation',async()=>{
await resetGuni();
await post('/api/guni/messages',{text:'how are things?'});
const{status,body}=await post('/api/guni/messages',{text:'Run the test suite.'});
assert.equal(status,201,'task after CHAT creates a job');
assert.ok(body.job);
});

test('CHAT messages are appended to conversation history',async()=>{
await resetGuni();
await post('/api/guni/messages',{text:'how is the field?'});
const{body:g}=await get('/api/guni');
// user + assistant messages both saved
assert.ok(g.messages.length>=2,'both user and reply messages stored');
assert.equal(g.messages[0].intent,'CHAT');
assert.equal(g.messages[1].role,'assistant');
});

// ── Step 1 regression tests ────────────────────────────────────────────────

test('GET /api/guni returns 200 (Step 1 regression)',async()=>{
const{status,body}=await get('/api/guni');
assert.equal(status,200);
assert.equal(body.agent,'Guni');
assert.ok('lastUpdate' in body);
});

test('GET /api/desks/markus still works (Step 1 regression)',async()=>{
const{status,body}=await get('/api/desks/markus');
assert.equal(status,200);
assert.equal(body.agent,'Hermes');
});

test('GET /api/desks/chad still works (Step 1 regression)',async()=>{
const{status,body}=await get('/api/desks/chad');
assert.equal(status,200);
assert.equal(body.agent,'Chad');
});

test('GET /api/desks/unknown returns 404 (Step 1 regression)',async()=>{
const{status}=await get('/api/desks/doesnotexist');
assert.equal(status,404);
});

test('POST /api/guni is 405 — Guni GET stays read-only (Step 1 regression)',async()=>{
const r=await fetch(`${BASE}/api/guni`,{method:'POST',body:'{}',
headers:{'Content-Type':'application/json'}});
assert.equal(r.status,405);
});

// ── Worker integration tests (WORKER_MOCK=1) ──────────────────────────────
// Verify the spawn→patch lifecycle by polling until the job reaches its
// terminal state. Workers run in mock mode — no real claude is invoked.

async function waitForJobStatus(targetStatuses,timeoutMs=4000){
const deadline=Date.now()+timeoutMs;
const statusSet=new Set(Array.isArray(targetStatuses)?targetStatuses:[targetStatuses]);
while(Date.now()<deadline){
const{body}=await get('/api/guni');
if(body.currentJob&&statusSet.has(body.currentJob.status))return body.currentJob;
await new Promise(r=>setTimeout(r,50));
}
throw new Error('Timeout waiting for job status: '+[...statusSet].join(' | '));
}

test('worker mock: job transitions to done',async()=>{
await resetGuni();
const{status,body}=await post('/api/guni/messages',{text:'Fix the tests.'});
assert.equal(status,201);
const jobId=body.job.id;
const job=await waitForJobStatus('done');
assert.equal(job.id,jobId,'correct job reached done');
assert.equal(job.status,'done');
assert.ok(job.result&&job.result.length>0,'result message present');
});

test('worker mock: job transitions to needs_you when blocked',async()=>{
// Worker env is inherited from the SERVER process, not the test process, so
// WORKER_MOCK_RESULT must be set on a dedicated server instance.
const NYPORT=4199;
const nyBase=`http://127.0.0.1:${NYPORT}`;
const serverPath=fileURLToPath(new URL('./server.mjs',import.meta.url));
const srv=spawn(process.execPath,[serverPath],{
  env:{...process.env,PORT:String(NYPORT),
       WORKER_MOCK:'1',WORKER_MOCK_RESULT:'NEEDS_YOU',
       WORKER_MOCK_BLOCKER:'Need credentials to proceed.',
       DISCORD_MOCK:'1',DISCORD_CHAD_CHANNEL_ID:'ch_test',
       DISCORD_CHAD_BOT_USER_ID:'bot_chad',DISCORD_OWN_BOT_USER_ID:'bot_own'},
  stdio:['ignore','ignore','ignore']
});
// Wait for server to be ready
await new Promise(r=>setTimeout(r,800));
try{
  const r=await fetch(`${nyBase}/api/guni/messages`,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({text:'Deploy the build.'})
  });
  assert.equal(r.status,201);
  const body=await r.json();
  const jobId=body.job.id;
  const deadline=Date.now()+4000;
  while(Date.now()<deadline){
    const gr=await fetch(`${nyBase}/api/guni`);
    const g=await gr.json();
    if(g.currentJob&&g.currentJob.status==='needs_you'){
      assert.equal(g.currentJob.id,jobId,'correct job blocked');
      assert.ok(g.currentJob.pendingQuestion,'pendingQuestion set');
      assert.match(g.currentJob.pendingQuestion,/credentials/i);
      return;
    }
    await new Promise(r=>setTimeout(r,50));
  }
  assert.fail('Timeout waiting for needs_you status');
}finally{
  srv.kill('SIGTERM');
}
});

test('worker done: new job can be created after worker completes',async()=>{
await resetGuni();
const{body:first}=await post('/api/guni/messages',{text:'First autonomous task.'});
const firstJobId=first.job.id;
// wait for worker to mark job done
await waitForJobStatus('done');
// now a new job must be accepted (done clears the slot)
const{status,body}=await post('/api/guni/messages',{text:'Second autonomous task.'});
assert.equal(status,201,'new job accepted after worker done');
assert.ok(body.job.id!==firstJobId,'new job has a fresh id');
});
