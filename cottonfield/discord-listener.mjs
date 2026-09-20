// Discord Gateway listener — watches DISCORD_CHAD_CHANNEL_ID and forwards
// matching MESSAGE_CREATE payloads to POST /webhooks/chad on server.mjs.
// Node 22+ native WebSocket is used — no npm dependencies.
//
// Run alongside server.mjs:
//   PORT=4174 node discord-listener.mjs

import {fileURLToPath} from 'node:url';

// Discord Gateway opcodes
const OP_DISPATCH=0,OP_HEARTBEAT=1,OP_IDENTIFY=2,OP_INVALID_SESSION=9,OP_HELLO=10;
// Intents: GUILDS(1)|GUILD_MESSAGES(512)|MESSAGE_CONTENT(32768 — privileged)|DIRECT_MESSAGES(4096)
const INTENTS=1|512|32768|4096;
const GATEWAY='wss://gateway.discord.gg/?v=10&encoding=json';

// Pure filter: listener-side pre-screen before server validates author identity.
// Drops wrong-channel and own-bot; everything else goes to the server.
export function shouldForwardMessage(msg,channelId,ownBotId){
if(!msg||typeof msg!=='object')return false;
if(msg.channel_id!==channelId)return false;
if(!msg.author||typeof msg.author!=='object')return false;
if(ownBotId&&msg.author.id===ownBotId)return false;
return true;
}

// Testable message-handler factory. sendFn and forwardFn are injected so
// tests can replace them without touching WebSocket or real HTTP.
export function createMessageHandler({token,channelId,ownBotId,serverUrl,sendFn,forwardFn}){
let heartbeatTimer=null;
let sequence=null;

async function handle(payload){
const{op,d,s,t}=payload;
if(s!=null)sequence=s;
if(op===OP_HELLO){
  if(heartbeatTimer)clearInterval(heartbeatTimer);
  heartbeatTimer=setInterval(()=>sendFn({op:OP_HEARTBEAT,d:sequence}),d.heartbeat_interval);
  sendFn({op:OP_IDENTIFY,d:{token,intents:INTENTS,properties:{os:'linux',browser:'cottonfield',device:'cottonfield'}}});
}else if(op===OP_HEARTBEAT){
  // Server requests an immediate heartbeat
  sendFn({op:OP_HEARTBEAT,d:sequence});
}else if(op===OP_DISPATCH&&t==='READY'){
  console.log('[chad-listener] Ready. Watching channel',channelId);
}else if(op===OP_DISPATCH&&t==='MESSAGE_CREATE'){
  if(shouldForwardMessage(d,channelId,ownBotId))await forwardFn(d,serverUrl);
}else if(op===OP_INVALID_SESSION){
  return{invalidSession:true};
}
}
handle.cleanup=()=>{if(heartbeatTimer){clearInterval(heartbeatTimer);heartbeatTimer=null;}};
return handle;
}

// Forwards one Discord message payload to the local server.
// Never throws — logs and returns {ok:false} on any failure so the
// caller (Gateway event loop) can continue processing the next event.
export async function forwardToServer(msg,serverUrl){
try{
const r=await fetch(serverUrl,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(msg)
});
if(!r.ok){
  console.error('[chad-listener] Server rejected message:',r.status,await r.text().catch(()=>''));
  return{ok:false};
}
const body=await r.json().catch(()=>({}));
if(body.correlated)console.log('[chad-listener] Correlated to job',body.job?.id,'→',body.job?.status);
else if(body.ignored)console.log('[chad-listener] Ignored:',body.reason);
return{ok:true,body};
}catch(e){
console.error('[chad-listener] Failed to forward:',e.message);
return{ok:false};
}
}

// Main listener. Returns a stop() handle for clean shutdown.
export function startListener(opts={}){
const token=opts.token??process.env.DISCORD_BOT_TOKEN;
const channelId=opts.channelId??process.env.DISCORD_CHAD_CHANNEL_ID;
const ownBotId=opts.ownBotId??process.env.DISCORD_OWN_BOT_USER_ID??null;
const port=process.env.PORT||4174;
const serverUrl=opts.serverUrl??`http://127.0.0.1:${port}/webhooks/chad`;

if(!token){console.error('[chad-listener] DISCORD_BOT_TOKEN is required.');process.exit(1);}
if(!channelId){console.error('[chad-listener] DISCORD_CHAD_CHANNEL_ID is required.');process.exit(1);}

let handler=null;
let reconnectDelay=1000;
let stopping=false;

function connect(){
if(stopping)return;
console.log('[chad-listener] Connecting to Discord Gateway…');
const ws=new WebSocket(GATEWAY);

ws.addEventListener('open',()=>{
  reconnectDelay=1000;
  handler=createMessageHandler({
    token,channelId,ownBotId,serverUrl,
    sendFn:(data)=>{if(ws.readyState===1)ws.send(JSON.stringify(data));},
    forwardFn:forwardToServer
  });
});

ws.addEventListener('message',async(event)=>{
  let payload;try{payload=JSON.parse(event.data);}catch{return;}
  if(!handler)return;
  const result=await handler(payload);
  if(result&&result.invalidSession){
    console.warn('[chad-listener] Invalid session — reconnecting fresh.');
    handler.cleanup();handler=null;
    ws.close();
  }
});

ws.addEventListener('close',(event)=>{
  if(stopping)return;
  if(handler){handler.cleanup();handler=null;}
  console.warn(`[chad-listener] Disconnected (${event.code}). Reconnecting in ${reconnectDelay}ms…`);
  setTimeout(connect,reconnectDelay);
  reconnectDelay=Math.min(reconnectDelay*2,30000);
});

ws.addEventListener('error',(err)=>{
  console.error('[chad-listener] WebSocket error:',err.message||String(err));
});
}

connect();
return{stop(){stopping=true;if(handler)handler.cleanup();}};
}

// Only run when executed directly, not when imported by tests
const __filename=fileURLToPath(import.meta.url);
if(process.argv[1]===__filename)startListener();
