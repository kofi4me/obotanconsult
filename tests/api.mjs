import assert from 'node:assert/strict';
const base='http://127.0.0.1:8787';
const admin={'oai-authenticated-user-id':'local-test-admin','oai-authenticated-user-email':'obotanconsult@gmail.com'};
const made=[];let assertions=0;const testIp=crypto.randomUUID();
const expect=(actual,value,label)=>{assert.equal(actual,value,label);assertions++};
async function request(path,opts={}){const response=await fetch(base+path,{...opts,signal:AbortSignal.timeout(30000),headers:{...opts.headers,Connection:"close"}});await response.clone().arrayBuffer();return response}
function payload(slot,overrides={}){const f=new FormData();for(const [k,v] of Object.entries({id:crypto.randomUUID(),service:'eb1a',name:'OBOTAN LOCAL TEST',email:'test@example.invalid',phone:'',field:'Test research',notes:'Disposable local test record',evidence:'["1-0"]',slot:String(slot),consent:'yes',...overrides}))f.set(k,v);return f}
function cv(f,bytes='%PDF-1.4\n1 0 obj << /Type /Catalog >> endobj\n%%EOF'){f.set('cv',new Blob([bytes],{type:'application/pdf'}),'test-cv.pdf');return f}
async function post(f,origin=base){const r=await request('/api/submissions',{method:'POST',headers:{Origin:origin,'cf-connecting-ip':testIp},body:f});const data=await r.json();if(r.status===201)made.push(data.reference);return {r,data}}
try{
 expect((await request('/api/admin/submissions')).status,403,'anonymous admin list blocked');
 expect((await request('/api/admin/submissions/test/document')).status,403,'anonymous document blocked');
 expect((await request('/api/admin/submissions',{headers:{...admin,'oai-authenticated-user-email':'other@example.invalid'}})).status,403,'non-admin user blocked');
 const slots=(await (await request('/api/slots')).json()).slots;assert(slots.length>0);

 expect((await post(cv(payload(slots[0].start)))).r.status,400,'file uploads rejected');
 expect((await post(cv(payload(slots[0].start),'not a PDF'))).r.status,400,'invalid PDF rejected');
 expect((await post(payload(slots[0].start+60000))).r.status,400,'off-grid appointment rejected');
 const form=payload(slots[0].start);const first=await post(form);expect(first.r.status,201,'booking saved without a CV');
 const retry=await post(form);expect(retry.r.status,200,'retry idempotent');expect(retry.data.reference,first.data.reference,'same reference');
 expect((await post(payload(slots[0].start))).r.status,409,'duplicate slot rejected');
 const raced=await Promise.all([post(payload(slots[1].start)),post(payload(slots[1].start))]);expect(raced.filter(x=>x.r.status===201).length,1,'only one concurrent reservation');expect(raced.filter(x=>x.r.status===409).length,1,'concurrent loser gets conflict');
 const list=await (await request('/api/admin/submissions',{headers:admin})).json();const row=list.submissions.find(x=>x.id===first.data.reference);assert(row);expect(row.name,'OBOTAN LOCAL TEST','admin sees saved submission');
 const document=await request(`/api/admin/submissions/${row.id}/document`,{headers:admin});expect(document.status,410,'document download retired');expect(row.file_name,null,'no file stored');
 const bad=await request(`/api/admin/submissions/${row.id}`,{method:'PATCH',headers:{...admin,Origin:'https://example.invalid','Content-Type':'application/json'},body:JSON.stringify({status:'cancelled',adminNotes:'test',updatedAt:row.updated_at})});expect(bad.status,403,'admin cross-site edit blocked');
 const patch=await request(`/api/admin/submissions/${row.id}`,{method:'PATCH',headers:{...admin,Origin:base,'Content-Type':'application/json'},body:JSON.stringify({status:'cancelled',adminNotes:'test',updatedAt:row.updated_at})});expect(patch.status,200,'admin cancellation saved');
 const free=(await (await request('/api/slots')).json()).slots;assert(free.some(x=>x.start===slots[0].start));assertions++;
 expect((await post(cv(payload(slots[2].start)))).r.status,429,'repeated submission limit enforced');
 expect((await post(cv(payload(slots[0].start)),'https://example.invalid')).r.status,403,'cross-site submission blocked');
 console.log(`PASS: ${assertions} booking, email workflow, authorization, conflict and cancellation assertions.`);
}finally{for(const id of made){const r=await request(`/api/admin/submissions/${id}`,{method:'DELETE',headers:{...admin,Origin:base}});assert.equal(r.status,200,'test record cleanup')}console.log('Local test records removed.');}




