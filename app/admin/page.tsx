import {getChatGPTUser,chatGPTSignInPath,chatGPTSignOutPath} from "@/app/chatgpt-auth";
import {ADMIN_EMAIL} from "@/lib/server";
import {AdminWorkspace} from "@/components/admin-workspace";
import {Button} from "@/components/ui/button";
import {LockKeyhole} from "lucide-react";
export const dynamic="force-dynamic";
export default async function Admin(){const user=await getChatGPTUser();const allowed=user?.email.trim().toLowerCase()===ADMIN_EMAIL;
 if(!allowed)return <main id="main" className="wrap page-top"><div className="admin-login panel"><LockKeyhole size={32}/><p className="eyebrow">OBOTAN CONSULT / PRIVATE WORKSPACE</p><h1>Admin access</h1><p className="lead">Review client documents, manage consultations and keep track of writing requests.</p>{user?<div className="notice">This account does not have admin access. Sign out and use the designated Obotan account.</div>:<p className="micro">Only Obotan’s designated administrator can access this workspace. Clients do not need to sign in.</p>}<div className="hero-actions"><Button asChild className="cta"><a href={user?chatGPTSignOutPath("/admin"):chatGPTSignInPath("/admin")} target="_top">{user?"Sign out":"Admin sign in with ChatGPT"}</a></Button><a className="text-link" href="/">Client home</a></div></div></main>;
 return <main id="main" className="wrap page-top"><div className="admin-heading"><div><p className="eyebrow">OBOTAN CONSULT / ADMIN</p><h1>Your consultation desk.</h1><p className="lead">Review the evidence. Prepare the conversation.</p></div><a className="text-link" href={chatGPTSignOutPath("/")} target="_top">Sign out</a></div><AdminWorkspace/></main>;
}
