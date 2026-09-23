import {database,bucket,isAdmin,json} from "@/lib/server";
export const dynamic="force-dynamic";
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
 if(!await isAdmin())return json({error:"Admin access required."},403);
 try{const {id}=await params;const r=await database().prepare("SELECT file_key,file_name FROM submissions WHERE id=?").bind(id).first<{file_key:string|null;file_name:string}>();if(!r?.file_key)return json({error:"Document not found."},404);const file=await bucket().get(r.file_key);if(!file)return json({error:"Document not found."},404);return new Response(file.body,{headers:{"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="document.pdf"; filename*=UTF-8''${encodeURIComponent(r.file_name).replace(/'/g,"%27")}`,"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"sandbox"}})}catch{return json({error:"The document is temporarily unavailable."},503)}
}
