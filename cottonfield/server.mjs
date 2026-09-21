import http from 'node:http';
import crypto from 'node:crypto';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {validateDeskPatch} from './validate.mjs';

const files={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/model.js':'model.js','/live.js':'live.js','/favicon.svg':'favicon.svg'};
const types={html:'text/html',css:'text/css',js:'text/javascript',svg:'image/svg+xml'};

// --- Local live-desk API (Phase 1: Markus only) -----------------------
// LIVE_DESKS is the single source of truth for which desk ids may be read
// or written. A desk id never comes from anywhere but this fixed set —
// it is matched by exact string equality, never interpolated into a path
// from arbitrary request input, and nothing here ever shells out.
const LIVE_DESKS=new Set(['markus','chad']);
const dataDir=new URL('./data/',import.meta.url);
const deskFile=(id)=>new URL(id+'.json',dataDir);

const SEED_BASE={
markus:{project:'Markus',agent:'Hermes',status:'working',currentTask:'Tracing generateDraft failure',currentStage:'investigate',steps:['Investigate','Confirm','Fix','Verify'],needsHuman:false,humanAction:null,result:null},
chad:{project:'Chad',agent:'Chad',status:'working',currentTask:null,currentStage:null,steps:[],needsHuman:false,humanAction:null,result:null},
guni:{agent:'Guni',role:'orchestrator',status:'idle',activeWorkers:[],pendingQuestion:null,messages:[],currentJob:null}
};
// lastUpdate is stamped fresh each time a desk is (re)seeded, not once at
// server-start, so a reseed after the data file is removed reads as "now".
const seedFor=(id)=>({...SEED_BASE[id],lastUpdate:new Date().toISOString()});

async function ensureSeeded(id){
try{await readFile(deskFile(id));}
catch{await mkdir(dataDir,{recursive:true});await writeFile(deskFile(id),JSON.stringify(seedFor(id),null,2));}
}

async function readDesk(id){
await ensureSeeded(id);
return JSON.parse(await readFile(deskFile(id),'utf8'));
}

async function writeDesk(id,patch){
const current=await readDesk(id);
const next={...current,...patch,lastUpdate:new Date().toISOString()};
await writeFile(deskFile(id),JSON.stringify(next,null,2));
return next;
}

// Resolves with the raw Buffer (not a decoded string) so callers that need
// to verify an HMAC signature over the exact bytes received can do so —
// decoding to a JS string first and re-encoding for signing would be an
// unnecessary (if usually harmless) place for the two to silently drift.
function readBody(req,maxBytes=16*1024){
return new Promise((resolve,reject)=>{
let size=0;const chunks=[];
req.on('data',c=>{
size+=c.length;
if(size>maxBytes){reject(Object.assign(new Error('Body too large'),{tooLarge:true}));req.destroy();return;}
chunks.push(c);
});
req.on('end',()=>resolve(Buffer.concat(chunks)));
req.on('error',reject);
});
}

function sendJson(res,status,body){
res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
res.end(JSON.stringify(body));
}

async function handleApi(req,res,id){
if(!LIVE_DESKS.has(id)){sendJson(res,404,{error:'Unknown desk: '+id});return;}

if(req.method==='GET'){
try{sendJson(res,200,await readDesk(id));}
catch{sendJson(res,500,{error:'Could not read desk state.'});}
return;
}

if(req.method==='POST'){
let raw;
try{raw=await readBody(req);}
catch(e){sendJson(res,e.tooLarge?413:400,{error:'Could not read request body.'});return;}
let parsed;
try{parsed=raw.length?JSON.parse(raw.toString('utf8')):{};}
catch{sendJson(res,400,{error:'Body must be valid JSON.'});return;}
const result=validateDeskPatch(parsed);
if(!result.ok){sendJson(res,400,{error:result.error});return;}
try{sendJson(res,200,await writeDesk(id,result.value));}
catch{sendJson(res,500,{error:'Could not save desk state.'});}
return;
}

res.writeHead(405,{'Allow':'GET, POST'});res.end();
}

// --- Hermes Agent bridge ------------------------------------------------
// Receives Hermes Agent's own `hooks.outbound` webhook deliveries (see
// ~/.hermes/hermes-agent/agent/outbound_webhooks.py) and translates a small,
// deliberately narrow set of its real lifecycle events into a MARKUS status
// patch — through the exact same validateDeskPatch()/writeDesk() path a
// manual POST /api/desks/markus uses. This is not a second status system;
// it is a translator in front of the one that already exists.
//
// Wire format (as Hermes actually sends it): POST with header
// X-Hermes-Signature-256: sha256=<hmac-of-body> when a secret is configured,
// and a JSON body shaped like
// {hook_event_name, session_id, cwd, tool_name, tool_input, extra, profile,
//  delivery_id, timestamp}.
//
// Only these events are ever translated into a write; everything else
// (including every pre_tool_call / post_tool_call firing, which would be
// far too noisy for a calm desk view) is acknowledged and dropped:
//   on_session_start                  -> working
//   pre_approval_request              -> needs_you (humanAction from the
//                                         approval's own description/command)
//   post_approval_response            -> working (decision made)
//   on_session_end / on_session_finalize -> done
//   agent_loop_stopped                -> paused
//
// Optional MARKUS_PROJECT_DIR env var scopes this to one working directory,
// since for now the whole local Hermes install maps to the single MARKUS
// desk ("one worker, not a platform") — everything outside that directory
// is ignored rather than misreported as Markus's status.
function mapHermesEvent(payload){
const event=payload.hook_event_name;
const extra=(payload&&typeof payload.extra==='object'&&payload.extra)||{};
const textField=(v)=>typeof v==='string'&&v.trim()?v.trim().slice(0,500):null;
switch(event){
case 'on_session_start':
return {status:'working',needsHuman:false,humanAction:null,agent:'Hermes',currentTask:'Hermes session started'};
case 'pre_approval_request':
return {status:'needs_you',needsHuman:true,agent:'Hermes',
humanAction:textField(extra.description)||textField(extra.command)||'Hermes is asking for approval before continuing.'};
case 'post_approval_response':
return {status:'working',needsHuman:false,humanAction:null,agent:'Hermes'};
case 'on_session_end':
case 'on_session_finalize':
return {status:'done',needsHuman:false,humanAction:null,agent:'Hermes'};
case 'agent_loop_stopped':
return {status:'paused',needsHuman:false,humanAction:null,agent:'Hermes'};
default:
return null;
}
}

function verifyHermesSignature(rawBody,header){
const secret=process.env.HERMES_WEBHOOK_SECRET;
if(!secret)return {ok:true,unsigned:true};
if(typeof header!=='string'||!header.startsWith('sha256='))return {ok:false};
const expected=crypto.createHmac('sha256',secret).update(rawBody).digest('hex');
const provided=header.slice('sha256='.length);
const a=Buffer.from(expected,'utf8'),b=Buffer.from(provided,'utf8');
if(a.length!==b.length)return {ok:false};
return {ok:crypto.timingSafeEqual(a,b)};
}

async function handleHermesWebhook(req,res){
if(req.method!=='POST'){res.writeHead(405,{'Allow':'POST'});res.end();return;}
let raw;
try{raw=await readBody(req,64*1024);}
catch(e){sendJson(res,e.tooLarge?413:400,{error:'Could not read request body.'});return;}

const verified=verifyHermesSignature(raw,req.headers['x-hermes-signature-256']);
if(!verified.ok){sendJson(res,401,{error:'Invalid or missing X-Hermes-Signature-256.'});return;}
if(verified.unsigned)console.warn('[hermes-webhook] HERMES_WEBHOOK_SECRET is not set — accepting an unsigned delivery. Set it (and secret_env in Hermes\'s hooks.outbound config) to verify authenticity.');

let payload;
try{payload=raw.length?JSON.parse(raw.toString('utf8')):null;}
catch{sendJson(res,400,{error:'Body must be valid JSON.'});return;}
if(!payload||typeof payload!=='object'||Array.isArray(payload)){sendJson(res,400,{error:'Body must be a JSON object.'});return;}

const scopeDir=process.env.MARKUS_PROJECT_DIR;
if(scopeDir&&typeof payload.cwd==='string'&&!payload.cwd.startsWith(scopeDir)){
sendJson(res,202,{ignored:true,reason:'cwd outside MARKUS_PROJECT_DIR'});return;
}

const patch=mapHermesEvent(payload);
if(!patch){sendJson(res,202,{ignored:true,reason:'unmapped hook_event_name: '+String(payload.hook_event_name)});return;}

const result=validateDeskPatch(patch);
if(!result.ok){sendJson(res,500,{error:'Internal mapping produced an invalid patch: '+result.error});return;}
try{sendJson(res,200,await writeDesk('markus',result.value));}
catch{sendJson(res,500,{error:'Could not save desk state.'});}
}

// --- Guni conversation + job lifecycle ------------------------------------
// Guni is the orchestrator. Her state lives in data/guni.json and holds:
//   messages[]   — append-only conversation log
//   currentJob   — the one pending/active job, or null
//
// POST /api/guni/messages
//   No jobId  → create a new pending job (rejected if one already exists).
//   With jobId → answer the current needs_you job (rejected if id mismatch
//                or job is not in needs_you state).
//
// PATCH /api/guni/jobs/current
//   Updates status / pendingQuestion / result on the current job.
//   Used by workers to transition the job (e.g. pending → needs_you).

const JOB_STATUSES=new Set(['pending','needs_you','working','done']);
const MAX_MSG=2000;

// ── Guni message router ────────────────────────────────────────────────────
// Classifies a user message into one of three intents:
//   CHAT     — casual/status question, answered locally from Plantage state.
//   TASK     — concrete action Guni handles through the existing job flow.
//   DELEGATE — task that needs specialist (Chad) execution; job created and
//              dispatched through the normal outbound path.
//
// CHAT never creates a job.  TASK and DELEGATE both use the existing job
// lifecycle unchanged — the distinction only affects how the UI labels the
// intent; the server treats both identically for now.

const CHAT_PATTERNS=[
  // greetings / small talk
  /^(hey|hi|hello|sup|what'?s up|yo)\b/i,
  // state / status questions about Plantage itself
  /\b(how('?s| is| are)|what('?s| is))\b.{0,40}\b(field|plantage|guni|workers?|desks?|status|doing|going)\b/i,
  /\b(field|plantage|guni)\b.{0,30}\b(ok|okay|good|fine|ready|up|down|status|state)\b/i,
  /\bhow are (you|things|we)\b/i,
  // general info questions (no imperative verb + external noun)
  /^(what|who|when|where)\b(?!.{0,60}\b(run|deploy|fix|send|write|build|create|generate|check|update|change|delete|add|remove|install|push|pull)\b)/i,
];

const TASK_PATTERNS=[
  /\b(run|deploy|fix|send|write|build|create|generate|check|update|change|delete|add|remove|install|push|pull|test|release|review|analyse|analyze|migrate|refactor|debug|patch|merge)\b/i,
];

// Returns 'CHAT' | 'TASK' | 'DELEGATE'
// DELEGATE = task + explicit delegation signal ("have chad", "ask chad",
// "tell chad", "forward to", "let chad", "get chad to").
// Default is TASK — only explicit chat signals yield CHAT, so generic
// short phrases ("First job.", "Some task.") are never silently swallowed.
function classifyMessage(text){
  const t=text.trim();
  const delegateRe=/\b(have|ask|tell|let|get)\s+chad\b|\bforward\s+to\b|\bdelegate\b/i;
  if(delegateRe.test(t))return'DELEGATE';
  for(const re of CHAT_PATTERNS)if(re.test(t))return'CHAT';
  return'TASK';
}

// Generates a short local reply for CHAT messages using current guni state.
// Never exposes job IDs, Discord, or infrastructure.
function guniChatReply(text,guni){
  const job=guni.currentJob;
  const t=text.toLowerCase();
  if(/\b(hey|hi|hello|sup|yo)\b/.test(t)&&!/\b(how|what|status)\b/.test(t)){
    return'Hey! The field is quiet right now. What do you need?';
  }
  if(job&&job.status==='working'){
    return`Working on it now — "${job.intent}". I'll let you know when there's an update.`;
  }
  if(job&&job.status==='needs_you'){
    return`Paused on the current task — I need your input before we can continue.`;
  }
  if(job&&job.status==='pending'){
    return`There's a task queued: "${job.intent}". It'll kick off shortly.`;
  }
  if(job&&job.status==='done'){
    return`Last task is done. The field is ready for the next one.`;
  }
  return'The field is clear — no active jobs. Ready when you are.';
}

// ── Worker spawn ───────────────────────────────────────────────────────────
// Fire-and-forget: spawns worker.mjs as a child process for TASK/DELEGATE
// jobs. The worker calls back via PATCH /api/guni/jobs/current to transition
// the job to working → done | needs_you. No stdout is captured here; the
// worker logs its own progress. Failures are surfaced through the job state,
// not as exceptions in this process.

function spawnWorker(jobId, port){
  const workerPath=fileURLToPath(new URL('./worker.mjs',import.meta.url));
  const w=spawn(process.execPath,[workerPath,jobId,String(port)],{
    stdio:['ignore','pipe','pipe'],
    env:process.env,
    detached:false
  });
  w.stdout.on('data',d=>process.stdout.write('[worker] '+d.toString()));
  w.stderr.on('data',d=>process.stderr.write('[worker-err] '+d.toString()));
  w.on('close',code=>{if(code!==0)console.error('[worker] exited with code',code);});
  w.on('error',err=>console.error('[worker] spawn error:',err.message));
}

function validateGuniMessage(body){
if(!body||typeof body!=='object'||Array.isArray(body))return{ok:false,error:'Body must be a JSON object.'};
const text=body.text;
if(typeof text!=='string'||!text.trim())return{ok:false,error:'text must be a non-empty string.'};
if(text.trim().length>MAX_MSG)return{ok:false,error:'text too long (max '+MAX_MSG+' chars).'};
const out={text:text.trim()};
if('jobId' in body){
if(typeof body.jobId!=='string'||!body.jobId.trim())return{ok:false,error:'jobId must be a non-empty string.'};
out.jobId=body.jobId.trim();
}
return{ok:true,value:out};
}

async function handleGuniMessages(req,res){
if(req.method!=='POST'){res.writeHead(405,{'Allow':'POST'});res.end();return;}
let raw;
try{raw=await readBody(req);}
catch(e){sendJson(res,e.tooLarge?413:400,{error:'Could not read request body.'});return;}
let parsed;
try{parsed=raw.length?JSON.parse(raw.toString('utf8')):{};}
catch{sendJson(res,400,{error:'Body must be valid JSON.'});return;}
const v=validateGuniMessage(parsed);
if(!v.ok){sendJson(res,400,{error:v.error});return;}
let guni;
try{guni=await readDesk('guni');}
catch{sendJson(res,500,{error:'Could not read Guni state.'});return;}
const messages=Array.isArray(guni.messages)?guni.messages:[];
const now=new Date().toISOString();
if(v.value.jobId){
// Answer mode — must match current needs_you job exactly.
const job=guni.currentJob;
if(!job||job.id!==v.value.jobId){
sendJson(res,409,{error:'jobId does not match the current pending job.'});return;
}
if(job.status!=='needs_you'){
sendJson(res,409,{error:'Current job is not waiting for a user answer.'});return;
}
const msg={id:'msg_'+crypto.randomUUID(),role:'user',text:v.value.text,jobId:job.id,createdAt:now};
const updatedJob={...job,status:'working',pendingQuestion:null,answer:v.value.text,updatedAt:now};
const next={...guni,messages:[...messages,msg],currentJob:updatedJob,lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,200,{message:msg,guni:next});
}else{
// Classify before deciding whether to create a job.
const intent=classifyMessage(v.value.text);
if(intent==='CHAT'){
// Answer locally from current state — no job created.
const replyText=guniChatReply(v.value.text,guni);
const userMsg={id:'msg_'+crypto.randomUUID(),role:'user',text:v.value.text,intent:'CHAT',createdAt:now};
const replyMsg={id:'msg_'+crypto.randomUUID(),role:'assistant',text:replyText,intent:'CHAT',createdAt:now};
const next={...guni,messages:[...messages,userMsg,replyMsg],lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,200,{message:userMsg,reply:replyMsg,guni:next});
return;
}
// TASK or DELEGATE — create a job using the existing lifecycle.
const job=guni.currentJob;
if(job&&job.status!=='done'){
sendJson(res,409,{error:'A job is already active ('+job.status+'). It must be done before creating a new one.'});return;
}
const newJob={id:'job_'+crypto.randomUUID(),status:'pending',intent:v.value.text,
createdAt:now,updatedAt:now,pendingQuestion:null,answer:null,result:null,jobIntent:intent};
const msg={id:'msg_'+crypto.randomUUID(),role:'user',text:v.value.text,jobId:newJob.id,intent,createdAt:now};
const next={...guni,messages:[...messages,msg],currentJob:newJob,lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,201,{message:msg,job:newJob,guni:next});
// Fire-and-forget: spawn the local coding worker for this job.
spawnWorker(newJob.id,_serverPort);
}
}

// --- Discord outbound dispatch -------------------------------------------
async function sendDiscordMessage(text,opts={}){
if(process.env.DISCORD_MOCK==='1'){
if(opts.mockFail)return{ok:false,error:'Mock Discord failure (test-only).'};
return{ok:true,id:'mock-msg-'+crypto.randomUUID()};
}
const token=process.env.DISCORD_BOT_TOKEN;
const channelId=process.env.DISCORD_CHAD_CHANNEL_ID;
if(!token||!channelId)return{ok:false,error:'DISCORD_BOT_TOKEN and DISCORD_CHAD_CHANNEL_ID must be set.'};
try{
const r=await fetch(`https://discord.com/api/v10/channels/${encodeURIComponent(channelId)}/messages`,{
method:'POST',
headers:{'Authorization':'Bot '+token,'Content-Type':'application/json','User-Agent':'CottonfieldBot/1.0'},
body:JSON.stringify({content:text})
});
if(!r.ok){
const detail=await r.text().catch(()=>'');
return{ok:false,error:'Discord returned '+r.status+': '+detail.slice(0,200)};
}
const data=await r.json();
if(typeof data.id!=='string')return{ok:false,error:'Discord response missing message id.'};
return{ok:true,id:data.id};
}catch(e){
return{ok:false,error:'Discord request failed: '+(e.message||String(e))};
}
}

function validateGuniDispatch(body){
if(!body||typeof body!=='object'||Array.isArray(body))return{ok:false,error:'Body must be a JSON object.'};
if(typeof body.jobId!=='string'||!body.jobId.trim())return{ok:false,error:'jobId is required.'};
if(typeof body.instruction!=='string'||!body.instruction.trim())return{ok:false,error:'instruction is required.'};
if(body.instruction.trim().length>1000)return{ok:false,error:'instruction too long (max 1000 chars).'};
return{ok:true,value:{
jobId:body.jobId.trim(),
instruction:body.instruction.trim(),
mockFail:process.env.DISCORD_MOCK==='1'&&body._mockFail===true
}};
}

async function handleGuniDispatch(req,res){
if(req.method!=='POST'){res.writeHead(405,{'Allow':'POST'});res.end();return;}
let raw;
try{raw=await readBody(req);}
catch(e){sendJson(res,e.tooLarge?413:400,{error:'Could not read request body.'});return;}
let parsed;
try{parsed=raw.length?JSON.parse(raw.toString('utf8')):{};}
catch{sendJson(res,400,{error:'Body must be valid JSON.'});return;}
const v=validateGuniDispatch(parsed);
if(!v.ok){sendJson(res,400,{error:v.error});return;}
let guni;
try{guni=await readDesk('guni');}
catch{sendJson(res,500,{error:'Could not read Guni state.'});return;}
if(!guni.currentJob){sendJson(res,404,{error:'No current job.'});return;}
if(v.value.jobId!==guni.currentJob.id){
sendJson(res,409,{error:'jobId does not match the current job.'});return;
}
if(guni.currentJob.outboundDiscordMessageId){
sendJson(res,409,{error:'Job already dispatched (outboundDiscordMessageId is set). Dispatch is not repeatable.'});return;
}
const msgText=`[Cottonfield Job: ${v.value.jobId}]\n${v.value.instruction}\n\nPlease include this jobId in your reply: ${v.value.jobId}`;
const sent=await sendDiscordMessage(msgText,{mockFail:v.value.mockFail});
if(!sent.ok){sendJson(res,502,{error:'Discord send failed: '+sent.error});return;}
const now=new Date().toISOString();
const updatedJob={...guni.currentJob,outboundDiscordMessageId:sent.id,dispatchedAt:now,dispatchedMessage:msgText,updatedAt:now};
const next={...guni,currentJob:updatedJob,lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,200,{job:updatedJob,guni:next});
}

// --- Guni follow-up reply dispatch ---------------------------------------
// Sends the user's answer to a needs_you question back to Chad.
// Separate from the initial dispatch because outboundDiscordMessageId is
// already set; this route guards against repeat sends via followUpDispatchedAt.

function validateGuniFollowUpReply(body){
if(!body||typeof body!=='object'||Array.isArray(body))return{ok:false,error:'Body must be a JSON object.'};
if(typeof body.jobId!=='string'||!body.jobId.trim())return{ok:false,error:'jobId is required.'};
if(typeof body.answer!=='string'||!body.answer.trim())return{ok:false,error:'answer is required.'};
if(body.answer.trim().length>1000)return{ok:false,error:'answer too long (max 1000 chars).'};
return{ok:true,value:{
jobId:body.jobId.trim(),
answer:body.answer.trim(),
mockFail:process.env.DISCORD_MOCK==='1'&&body._mockFail===true
}};
}

async function handleGuniFollowUpReply(req,res){
if(req.method!=='POST'){res.writeHead(405,{'Allow':'POST'});res.end();return;}
let raw;
try{raw=await readBody(req);}
catch(e){sendJson(res,e.tooLarge?413:400,{error:'Could not read request body.'});return;}
let parsed;
try{parsed=raw.length?JSON.parse(raw.toString('utf8')):{};}
catch{sendJson(res,400,{error:'Body must be valid JSON.'});return;}
const v=validateGuniFollowUpReply(parsed);
if(!v.ok){sendJson(res,400,{error:v.error});return;}
let guni;
try{guni=await readDesk('guni');}
catch{sendJson(res,500,{error:'Could not read Guni state.'});return;}
if(!guni.currentJob){sendJson(res,404,{error:'No current job.'});return;}
if(v.value.jobId!==guni.currentJob.id){
sendJson(res,409,{error:'jobId does not match the current job.'});return;
}
// Only valid immediately after a needs_you → working transition
if(guni.currentJob.status!=='working'||!guni.currentJob.answer){
sendJson(res,409,{error:'Job is not in a resumed state (needs_you → working transition required).'});return;
}
// Idempotency — one follow-up send per job
if(guni.currentJob.followUpDispatchedAt){
sendJson(res,409,{error:'Follow-up reply already dispatched for this job.'});return;
}
const msgText=`[Cottonfield Job: ${v.value.jobId}]\nUser answer: ${v.value.answer}\n\nPlease include this jobId in your reply: ${v.value.jobId}`;
const sent=await sendDiscordMessage(msgText,{mockFail:v.value.mockFail});
if(!sent.ok){sendJson(res,502,{error:'Discord send failed: '+sent.error});return;}
const now=new Date().toISOString();
const updatedJob={...guni.currentJob,followUpDiscordMessageId:sent.id,followUpDispatchedAt:now,updatedAt:now};
const next={...guni,currentJob:updatedJob,lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,200,{job:updatedJob,guni:next});
}

// --- Chad inbound reply ingestion ----------------------------------------
// Receives Discord message payloads from our own Discord listener process.
// Validates channel + author, dedupes by Discord message ID, correlates to
// the current Guni job, and updates job state accordingly.

function isQuestion(text){
const t=text.trim();
if(t.endsWith('?'))return true;
return/\b(which|what|how|when|where|who|could you|can you|do you|should i|please clarify|please confirm|any preference|let me know)\b/i.test(t);
}

function extractJobId(text){
// Matches [Cottonfield Job: job_xxx], jobId: job_xxx, or bare job_xxx
const m=text.match(/\[Cottonfield Job:\s*(job_[a-zA-Z0-9_-]+)\]/i)||
text.match(/jobId[:\s]+(job_[a-zA-Z0-9_-]+)/i)||
text.match(/\b(job_[a-zA-Z0-9_-]+)\b/);
return m?m[1]:null;
}

function validateChadInbound(body){
if(!body||typeof body!=='object'||Array.isArray(body))return{ok:false,error:'Body must be a JSON object.'};
if(typeof body.id!=='string'||!body.id.trim())return{ok:false,error:'id is required.'};
if(typeof body.channel_id!=='string'||!body.channel_id.trim())return{ok:false,error:'channel_id is required.'};
if(!body.author||typeof body.author!=='object'||Array.isArray(body.author))return{ok:false,error:'author is required.'};
if(typeof body.author.id!=='string'||!body.author.id.trim())return{ok:false,error:'author.id is required.'};
if(typeof body.content!=='string')return{ok:false,error:'content must be a string.'};
const refMsgId=(body.message_reference&&typeof body.message_reference.message_id==='string'&&body.message_reference.message_id.trim())||null;
return{ok:true,value:{
id:body.id.trim(),
channelId:body.channel_id.trim(),
authorId:body.author.id.trim(),
content:body.content,
referencedMessageId:refMsgId
}};
}

async function handleChadInbound(req,res){
if(req.method!=='POST'){res.writeHead(405,{'Allow':'POST'});res.end();return;}
let raw;
try{raw=await readBody(req,64*1024);}
catch(e){sendJson(res,e.tooLarge?413:400,{error:'Could not read request body.'});return;}
// Optional HMAC — same pattern as Hermes webhook
const secret=process.env.CHAD_WEBHOOK_SECRET;
if(secret){
const header=req.headers['x-chad-signature-256'];
if(typeof header!=='string'||!header.startsWith('sha256=')){sendJson(res,401,{error:'Invalid or missing X-Chad-Signature-256.'});return;}
const expected=crypto.createHmac('sha256',secret).update(raw).digest('hex');
const provided=header.slice('sha256='.length);
const a=Buffer.from(expected,'utf8'),b=Buffer.from(provided,'utf8');
if(a.length!==b.length||!crypto.timingSafeEqual(a,b)){sendJson(res,401,{error:'Invalid or missing X-Chad-Signature-256.'});return;}
}
let payload;
try{payload=raw.length?JSON.parse(raw.toString('utf8')):null;}
catch{sendJson(res,400,{error:'Body must be valid JSON.'});return;}
const v=validateChadInbound(payload);
if(!v.ok){sendJson(res,400,{error:v.error});return;}
const msg=v.value;
// Channel filter
const expectedChannel=process.env.DISCORD_CHAD_CHANNEL_ID;
if(!expectedChannel){sendJson(res,500,{error:'DISCORD_CHAD_CHANNEL_ID is not set.'});return;}
if(msg.channelId!==expectedChannel){sendJson(res,202,{ignored:true,reason:'wrong channel'});return;}
// Own bot filter (checked before Chad bot filter for explicit safety)
const ownBotId=process.env.DISCORD_OWN_BOT_USER_ID;
if(ownBotId&&msg.authorId===ownBotId){sendJson(res,202,{ignored:true,reason:'own bot'});return;}
// Author filter — must be Chad's bot exactly
const expectedAuthor=process.env.DISCORD_CHAD_BOT_USER_ID;
if(!expectedAuthor){sendJson(res,500,{error:'DISCORD_CHAD_BOT_USER_ID is not set.'});return;}
if(msg.authorId!==expectedAuthor){sendJson(res,202,{ignored:true,reason:'wrong author'});return;}
// Read Guni state
let guni;
try{guni=await readDesk('guni');}
catch{sendJson(res,500,{error:'Could not read Guni state.'});return;}
// Dedup by Discord message ID
const processed=Array.isArray(guni.processedDiscordMessageIds)?guni.processedDiscordMessageIds:[];
if(processed.includes(msg.id)){sendJson(res,202,{ignored:true,reason:'already processed'});return;}
const now=new Date().toISOString();
const newProcessed=[...processed,msg.id];
// Correlate to current job (only if job exists and is not already done)
const job=guni.currentJob;
let matched=false;
if(job&&job.id&&job.status!=='done'){
const extractedJobId=extractJobId(msg.content);
if(extractedJobId===job.id)matched=true;
if(!matched&&msg.referencedMessageId&&job.outboundDiscordMessageId&&
msg.referencedMessageId===job.outboundDiscordMessageId)matched=true;
}
if(!matched){
// Store as unassigned — never mutate currentJob
const unassigned=Array.isArray(guni.unassignedReplies)?guni.unassignedReplies:[];
const next={...guni,processedDiscordMessageIds:newProcessed,
unassignedReplies:[...unassigned,{discordMessageId:msg.id,content:msg.content,receivedAt:now}],
lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,202,{correlated:false,reason:'no matching job found'});
return;
}
// Determine reply type and update job
const question=isQuestion(msg.content);
// When Chad asks a new question on the same job, reset the follow-up dispatch
// guard so the next user answer can be dispatched. The original outbound
// Discord message ID (and job ID) are intentionally kept.
const updatedJob=question
?{...job,status:'needs_you',pendingQuestion:msg.content.trim(),
  followUpDiscordMessageId:null,followUpDispatchedAt:null,updatedAt:now}
:{...job,status:'done',result:msg.content.trim(),updatedAt:now};
const next={...guni,currentJob:updatedJob,processedDiscordMessageIds:newProcessed,lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,200,{correlated:true,job:updatedJob,guni:next});
}

async function handleGuniJobPatch(req,res){
if(req.method!=='PATCH'){res.writeHead(405,{'Allow':'PATCH'});res.end();return;}
let raw;
try{raw=await readBody(req);}
catch(e){sendJson(res,e.tooLarge?413:400,{error:'Could not read request body.'});return;}
let parsed;
try{parsed=raw.length?JSON.parse(raw.toString('utf8')):{};}
catch{sendJson(res,400,{error:'Body must be valid JSON.'});return;}
if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)){sendJson(res,400,{error:'Body must be a JSON object.'});return;}
if('status' in parsed&&!JOB_STATUSES.has(parsed.status)){
sendJson(res,400,{error:'status must be one of: '+[...JOB_STATUSES].join(', ')});return;
}
let guni;
try{guni=await readDesk('guni');}
catch{sendJson(res,500,{error:'Could not read Guni state.'});return;}
if(!guni.currentJob){sendJson(res,404,{error:'No current job.'});return;}
if(typeof parsed.jobId!=='string'||!parsed.jobId.trim()){
sendJson(res,400,{error:'jobId is required.'});return;
}
if(parsed.jobId.trim()!==guni.currentJob.id){
sendJson(res,409,{error:'jobId does not match the current job.'});return;
}
const patch={};
if('status' in parsed)patch.status=parsed.status;
if('pendingQuestion' in parsed){
if(parsed.pendingQuestion!==null&&typeof parsed.pendingQuestion!=='string'){
sendJson(res,400,{error:'pendingQuestion must be a string or null.'});return;
}
patch.pendingQuestion=parsed.pendingQuestion===null?null:String(parsed.pendingQuestion).slice(0,500).trim()||null;
}
if('result' in parsed){
if(parsed.result!==null&&typeof parsed.result!=='string'){
sendJson(res,400,{error:'result must be a string or null.'});return;
}
patch.result=parsed.result;
}
if(Object.keys(patch).length===0){sendJson(res,400,{error:'No recognized fields to update.'});return;}
const now=new Date().toISOString();
const updatedJob={...guni.currentJob,...patch,updatedAt:now};
const next={...guni,currentJob:updatedJob,lastUpdate:now};
try{await writeFile(deskFile('guni'),JSON.stringify(next,null,2));}
catch{sendJson(res,500,{error:'Could not save Guni state.'});return;}
sendJson(res,200,{job:updatedJob,guni:next});
}

let _serverPort=Number(process.env.PORT)||4174;

http.createServer(async(req,res)=>{
const url=new URL(req.url,'http://localhost');
if(url.pathname==='/webhooks/hermes'){await handleHermesWebhook(req,res);return;}
if(url.pathname==='/webhooks/chad'){await handleChadInbound(req,res);return;}
if(url.pathname==='/api/guni/messages'){await handleGuniMessages(req,res);return;}
if(url.pathname==='/api/guni/jobs/current/dispatch'){await handleGuniDispatch(req,res);return;}
if(url.pathname==='/api/guni/jobs/current/reply'){await handleGuniFollowUpReply(req,res);return;}
if(url.pathname==='/api/guni/jobs/current'){await handleGuniJobPatch(req,res);return;}
if(url.pathname==='/api/guni'){
if(req.method!=='GET'){res.writeHead(405,{'Allow':'GET'});res.end();return;}
try{sendJson(res,200,await readDesk('guni'));}
catch{sendJson(res,500,{error:'Could not read Guni state.'});}
return;
}
const apiMatch=url.pathname.match(/^\/api\/desks\/([a-z0-9_-]+)$/i);
if(apiMatch){await handleApi(req,res,apiMatch[1].toLowerCase());return;}

const file=files[url.pathname];
if(!file){res.writeHead(404);res.end('Not found');return;}
try{
const body=await readFile(fileURLToPath(new URL('./dist/'+file,import.meta.url)));
res.writeHead(200,{'Content-Type':types[file.split('.').pop()]+'; charset=utf-8','Cache-Control':'no-store'});
res.end(body);
}catch{res.writeHead(500);res.end('Could not load prototype');}
}).listen(Number(process.env.PORT)||4174,'127.0.0.1',()=>console.log('AI Office: http://127.0.0.1:4174'));
