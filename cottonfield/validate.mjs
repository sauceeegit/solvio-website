export const ALLOWED_STATUSES=['working','needs_you','paused','done'];

export function validateDeskPatch(body){
if(!body||typeof body!=='object'||Array.isArray(body))return{ok:false,error:'Body must be a JSON object.'};
const patch={};
if('status' in body){
if(!ALLOWED_STATUSES.includes(body.status))return{ok:false,error:'status must be one of: '+ALLOWED_STATUSES.join(', ')+'.'};
patch.status=body.status;
}
if('needsHuman' in body){
if(typeof body.needsHuman!=='boolean')return{ok:false,error:'needsHuman must be a boolean.'};
patch.needsHuman=body.needsHuman;
}
if('humanAction' in body){
if(body.humanAction!==null&&typeof body.humanAction!=='string')return{ok:false,error:'humanAction must be a string or null.'};
patch.humanAction=body.humanAction;
}
if('currentTask' in body){
if(body.currentTask!==null&&typeof body.currentTask!=='string')return{ok:false,error:'currentTask must be a string or null.'};
patch.currentTask=body.currentTask;
}
if('currentStage' in body){
if(body.currentStage!==null&&typeof body.currentStage!=='string')return{ok:false,error:'currentStage must be a string or null.'};
patch.currentStage=body.currentStage;
}
if('result' in body){
if(body.result!==null&&typeof body.result!=='string')return{ok:false,error:'result must be a string or null.'};
patch.result=body.result;
}
if('agent' in body){
if(typeof body.agent!=='string'||!body.agent.trim())return{ok:false,error:'agent must be a non-empty string.'};
patch.agent=body.agent.trim();
}
if(Object.keys(patch).length===0)return{ok:false,error:'No recognized fields to update.'};
return{ok:true,value:patch};
}
