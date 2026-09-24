import {env} from "cloudflare:workers";
import {getChatGPTUser} from "@/app/chatgpt-auth";
export const ADMIN_EMAIL="obotanconsult@gmail.com";
export function database(){if(!env.DB)throw new Error("Database unavailable");return env.DB}
export async function isAdmin(){const user=await getChatGPTUser();return !!user&&user.email.trim().toLowerCase()===ADMIN_EMAIL}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}})}
export function sameOrigin(request:Request){const origin=request.headers.get("origin");return origin===new URL(request.url).origin&&request.headers.get("sec-fetch-site")!=="cross-site"}
export async function limitedBody(request:Request,maxBytes:number){
 if(Number(request.headers.get("content-length"))>maxBytes)throw new Error("BODY_TOO_LARGE");
 const reader=request.body?.getReader();if(!reader)throw new Error("EMPTY_BODY");let size=0;const chunks:Uint8Array[]=[];
 while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();throw new Error("BODY_TOO_LARGE")}chunks.push(value)}
 const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.byteLength}return bytes;
}
export async function rateLimit(request:Request){
 const now=Date.now(),hour=Math.floor(now/3600000),ip=request.headers.get("cf-connecting-ip")||"local";
 const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`${hour}:${ip}`));
 const key=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,"0")).join("");
 const r=await database().prepare("INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(key,now+3600000).first<{count:number}>();
 await database().prepare("DELETE FROM rate_limits WHERE expires < ?").bind(now).run();return (r?.count||99)<=8;
}
