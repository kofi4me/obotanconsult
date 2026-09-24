import {database,json,sameOrigin,limitedBody,rateLimit} from "@/lib/server";
import {findService,evidenceOptions,DISCLOSURE_VERSION} from "@/lib/services";
import {isOfficeSlot,slotInfo} from "@/lib/schedule";
export const dynamic="force-dynamic";
export async function POST(request:Request){


 try{
  const bytes=await limitedBody(request,64*1024);
  if(!sameOrigin(request))return json({error:"Please submit using the form on this website."},403);
  if(!request.headers.get("content-type")?.startsWith("multipart/form-data"))return json({error:"Please use the consultation form."},400);
  if(!await rateLimit(request))return json({error:"Too many attempts. Please try again in an hour."},429);
  const form=await new Response(bytes,{headers:{"Content-Type":request.headers.get("content-type")!}}).formData();
  for(const value of form.values())if(value instanceof File)return json({error:"Please email documents after booking; uploads are not accepted."},400);
  const str=(key:string)=>String(form.get(key)||"").trim();
  const service=findService(str("service")),name=str("name"),email=str("email").toLowerCase(),phone=str("phone"),field=str("field"),notes=str("notes"),slot=Number(str("slot")),id=str("id");
  if(!service||!name||name.length>120||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||phone.length>60||!field||field.length>200||notes.length>5000||str("consent")!=="yes"||!/^\w{8}-[\w-]{27}$/.test(id))return json({error:"Please check your contact details, project information and consent."},400);
  if(service.slug==="business-docs"&&!notes)return json({error:"Please describe your project."},400);
  if(str("website"))return json({error:"Unable to accept this submission."},400);
  let selected:unknown;try{selected=JSON.parse(str("evidence"))}catch{return json({error:"Please check your evidence selections."},400)}
  const options=evidenceOptions(service);if(!Array.isArray(selected)||selected.length>40||selected.some(x=>typeof x!=="string"||!options.some(o=>o.id===x)))return json({error:"Invalid evidence selections."},400);
  const selectedIds=selected as string[];const evidence=options.filter(o=>selectedIds.includes(o.id));
  const prior=await database().prepare("SELECT id,slot,email,service FROM submissions WHERE id=?").bind(id).first<{id:string;slot:number;email:string;service:string}>();
  if(prior){if(prior.email!==email||prior.service!==service.slug)return json({error:"Please refresh and try again."},409);return json({reference:prior.id,appointment:slotInfo(prior.slot)})}
  if(!isOfficeSlot(slot))return json({error:"Please choose a future appointment from the available times."},400);
  if(await database().prepare("SELECT id FROM submissions WHERE reserved_slot=?").bind(slot).first())return json({error:"That appointment was just booked. Please choose another time."},409);
  await database().prepare("INSERT INTO submissions (id,service,name,email,phone,field,notes,evidence,file_key,file_name,file_size,slot,reserved_slot,status,admin_notes,consent_version,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,'new','',?,?,?)").bind(id,service.slug,name,email,phone,field,notes,JSON.stringify(evidence),null,null,null,slot,slot,DISCLOSURE_VERSION,Date.now(),Date.now()).run();
  return json({reference:id,appointment:slotInfo(slot)},201);
 }catch(error){
  const message=error instanceof Error?error.message:"";
  if(message.includes("UNIQUE constraint"))return json({error:"This time may have just been booked. Refresh availability and try again."},409);
  if(message==="BODY_TOO_LARGE")return json({error:"The booking form is too large. Please shorten your notes; send documents by email."},413);
  console.error("submission_save_failed");return json({error:"We could not save your booking. Your information is still on this page; please try again."},503);
 }
}


