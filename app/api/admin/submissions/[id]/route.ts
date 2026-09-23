import {database,bucket,isAdmin,json,sameOrigin,limitedBody} from "@/lib/server";
export const dynamic="force-dynamic";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 if(!await isAdmin())return json({error:"Admin access required."},403);if(!sameOrigin(request))return json({error:"Invalid request origin."},403);
 try{const {id}=await params;const body=JSON.parse(new TextDecoder().decode(await limitedBody(request,12000)));
 if(!["new","reviewing","contacted","completed","cancelled"].includes(body.status)||typeof body.adminNotes!=="string"||body.adminNotes.length>5000||!Number.isSafeInteger(body.updatedAt))return json({error:"Invalid status or notes."},400);
 const r=await database().prepare("UPDATE submissions SET status=?,admin_notes=?,reserved_slot=CASE WHEN ?='cancelled' THEN NULL ELSE reserved_slot END,updated_at=? WHERE id=? AND updated_at=? AND (status!='cancelled' OR ?='cancelled') RETURNING id").bind(body.status,body.adminNotes,body.status,Date.now(),id,body.updatedAt,body.status).first();
 if(!r)return json({error:"This record changed or was cancelled. Refresh before editing. Cancelled appointments cannot be restored."},409);return json({saved:true})
 }catch{return json({error:"Unable to save changes. Please try again."},503)}
}
export async function DELETE(request:Request,{params}:{params:Promise<{id:string}>}){
 if(!await isAdmin())return json({error:"Admin access required."},403);if(!sameOrigin(request))return json({error:"Invalid request origin."},403);
 try{const {id}=await params;const r=await database().prepare("SELECT file_key FROM submissions WHERE id=?").bind(id).first<{file_key:string|null}>();if(!r)return json({error:"Record not found."},404);if(r.file_key)await bucket().delete(r.file_key);await database().prepare("DELETE FROM submissions WHERE id=?").bind(id).run();return json({deleted:true})}catch{return json({error:"Deletion could not be completed. Please retry."},503)}
}
