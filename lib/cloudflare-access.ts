import {createRemoteJWKSet,jwtVerify,type JWTVerifyGetKey} from "jose";
export const ADMIN_EMAIL = "obotanconsult@gmail.com";
export function accessConfig(team:unknown,aud:unknown){
 if(typeof team!=="string"||typeof aud!=="string"||!aud.trim())return null;
 try{const url=new URL(team.startsWith("https://")?team:`https://${team}`);
 if(url.protocol!=="https:"||!/^[-a-z0-9]+\.cloudflareaccess\.com$/i.test(url.hostname)||url.port||url.username||url.password||url.pathname!=="/"||url.search||url.hash)return null;
 return {issuer:url.origin,audience:aud.trim()};}catch{return null}
}
export async function verifyAccessToken(token:string,config:{issuer:string;audience:string},key?:JWTVerifyGetKey){
 try{
 const resolver=key||createRemoteJWKSet(new URL(`${config.issuer}/cdn-cgi/access/certs`));
 const {payload}=await jwtVerify(token,resolver,{issuer:config.issuer,audience:config.audience,algorithms:["RS256"],requiredClaims:["sub","email","exp","iat"]});
 if(typeof payload.email!=="string"||payload.email.trim().toLowerCase()!==ADMIN_EMAIL||typeof payload.sub!=="string")return null;
 return {userId:payload.sub,email:ADMIN_EMAIL,displayName:ADMIN_EMAIL,fullName:null};
 }catch{return null}
}
export function accessToken(headers:Headers){
 const assertion=headers.get("cf-access-jwt-assertion");if(assertion)return assertion;
 const cookie=headers.get("cookie")?.split(";").map(c=>c.trim()).find(c=>c.startsWith("CF_Authorization="));
 return cookie?.slice("CF_Authorization=".length)||null;
}
