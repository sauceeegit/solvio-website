// Listener unit tests — no real Discord, no real HTTP.
// Run: node --test listener.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {shouldForwardMessage,createMessageHandler} from './discord-listener.mjs';

// ── shouldForwardMessage ───────────────────────────────────────────────────

test('forward: correct channel, non-own author',()=>{
assert.equal(shouldForwardMessage(
{channel_id:'ch_test',author:{id:'bot_chad'}},'ch_test','bot_own'),true);
});

test('no forward: wrong channel',()=>{
assert.equal(shouldForwardMessage(
{channel_id:'ch_wrong',author:{id:'bot_chad'}},'ch_test','bot_own'),false);
});

test('no forward: own bot',()=>{
assert.equal(shouldForwardMessage(
{channel_id:'ch_test',author:{id:'bot_own'}},'ch_test','bot_own'),false);
});

test('no forward: missing author field',()=>{
assert.equal(shouldForwardMessage(
{channel_id:'ch_test'},'ch_test','bot_own'),false);
});

test('no forward: null message',()=>{
assert.equal(shouldForwardMessage(null,'ch_test','bot_own'),false);
});

test('forward: ownBotId null — any author on correct channel passes',()=>{
assert.equal(shouldForwardMessage(
{channel_id:'ch_test',author:{id:'anyone'}},'ch_test',null),true);
});

// ── createMessageHandler ───────────────────────────────────────────────────

test('HELLO → sends IDENTIFY with correct token and intents',async()=>{
const sent=[];
const h=createMessageHandler({
token:'tok_test',channelId:'ch_test',ownBotId:'bot_own',serverUrl:'http://srv',
sendFn:(m)=>sent.push(m),forwardFn:async()=>{}
});
await h({op:10,d:{heartbeat_interval:9999999},s:null,t:null});
h.cleanup();
const identify=sent.find(m=>m.op===2);
assert.ok(identify,'IDENTIFY must be sent after HELLO');
assert.equal(identify.d.token,'tok_test');
assert.equal(typeof identify.d.intents,'number');
});

test('HELLO → does not forward any messages itself',async()=>{
const forwarded=[];
const h=createMessageHandler({
token:'t',channelId:'ch_test',ownBotId:null,serverUrl:'http://srv',
sendFn:()=>{},forwardFn:async(m)=>forwarded.push(m)
});
await h({op:10,d:{heartbeat_interval:9999999},s:null,t:null});
h.cleanup();
assert.equal(forwarded.length,0);
});

test('MESSAGE_CREATE on correct channel is forwarded',async()=>{
const forwarded=[];
const h=createMessageHandler({
token:'t',channelId:'ch_test',ownBotId:'bot_own',serverUrl:'http://srv',
sendFn:()=>{},forwardFn:async(m)=>forwarded.push(m)
});
await h({op:0,d:{channel_id:'ch_test',author:{id:'bot_chad'},content:'Build done.'},s:1,t:'MESSAGE_CREATE'});
h.cleanup();
assert.equal(forwarded.length,1);
assert.equal(forwarded[0].content,'Build done.');
});

test('MESSAGE_CREATE on wrong channel is not forwarded',async()=>{
const forwarded=[];
const h=createMessageHandler({
token:'t',channelId:'ch_test',ownBotId:'bot_own',serverUrl:'http://srv',
sendFn:()=>{},forwardFn:async(m)=>forwarded.push(m)
});
await h({op:0,d:{channel_id:'ch_other',author:{id:'bot_chad'},content:'hello'},s:1,t:'MESSAGE_CREATE'});
h.cleanup();
assert.equal(forwarded.length,0);
});

test('MESSAGE_CREATE from own bot is not forwarded',async()=>{
const forwarded=[];
const h=createMessageHandler({
token:'t',channelId:'ch_test',ownBotId:'bot_own',serverUrl:'http://srv',
sendFn:()=>{},forwardFn:async(m)=>forwarded.push(m)
});
await h({op:0,d:{channel_id:'ch_test',author:{id:'bot_own'},content:'I sent this'},s:2,t:'MESSAGE_CREATE'});
h.cleanup();
assert.equal(forwarded.length,0);
});

test('sequence number tracked and included in heartbeat reply',async()=>{
const sent=[];
const h=createMessageHandler({
token:'t',channelId:'ch_test',ownBotId:null,serverUrl:'http://srv',
sendFn:(m)=>sent.push(m),forwardFn:async()=>{}
});
await h({op:10,d:{heartbeat_interval:9999999},s:null,t:null});
// dispatch updates sequence to 42
await h({op:0,d:{channel_id:'ch_other',author:{id:'x'}},s:42,t:'MESSAGE_CREATE'});
// server requests immediate heartbeat
await h({op:1,d:null,s:null,t:null});
h.cleanup();
const hb=sent.filter(m=>m.op===1);
assert.ok(hb.length>0,'heartbeat reply must be sent');
assert.equal(hb[hb.length-1].d,42);
});

test('INVALID_SESSION returns invalidSession:true',async()=>{
const h=createMessageHandler({
token:'t',channelId:'ch',ownBotId:null,serverUrl:'http://x',
sendFn:()=>{},forwardFn:async()=>{}
});
const result=await h({op:9,d:false,s:null,t:null});
h.cleanup();
assert.equal(result&&result.invalidSession,true);
});

test('cleanup is idempotent — calling twice does not throw',()=>{
const h=createMessageHandler({
token:'t',channelId:'ch',ownBotId:null,serverUrl:'http://x',
sendFn:()=>{},forwardFn:async()=>{}
});
h.cleanup();
assert.doesNotThrow(()=>h.cleanup());
});
