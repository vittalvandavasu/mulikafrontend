import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {searchBundledCorpus} from '../src/services/api';
const port=4182;
const server=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,PORT:String(port),NODE_ENV:'production',GEMINI_API_KEY:''},stdio:'pipe',windowsHide:true});
let startup='';server.stderr?.on('data',data=>{startup+=String(data);});
try {
  let ready=false;
  for(let i=0;i<80;i++) {try {const r=await fetch(`http://127.0.0.1:${port}/api/health`);if(r.ok){ready=true;break;}}catch{} await new Promise(resolve=>setTimeout(resolve,100));}
  assert(ready,'Server did not start: '+startup);
  for(const [query,bookFilter] of [['What can you tell me about ginger?','ALL'],['Sleep','ALL'],['Holy basil','ALL'],['I have quantum teleportation','ALL'],['Ginger','nonexistent'],['Ginger','mulika']]) {
    const response=await fetch(`http://127.0.0.1:${port}/api/search`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query,bookFilter,categoryFilter:'ALL'})});
    assert.equal(response.status,200);
    const actual=await response.json();const expected=searchBundledCorpus(query,bookFilter,'ALL');
    assert.equal(actual.status,expected.status,query);
    assert.deepEqual(actual.manuscript_matches.map((entry:{id:string})=>entry.id),expected.manuscript_matches?.map(entry=>entry.id),query);
    assert.deepEqual(actual.pathya_guidance,[]);
    if(!actual.is_abstention) {assert.equal(actual.modern_crossref,'');assert.deepEqual(actual.modern_sources,[]);}
  }
  const invalid=await fetch(`http://127.0.0.1:${port}/api/search`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:' '})});
  assert.equal(invalid.status,400);
  console.log('PASS: live production API and bundled search agree on questions, aliases, no matches and source filters; no unsupported scientific or dietary fallback claims.');
} finally {server.kill();}
