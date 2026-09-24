import {getChatGPTUser,chatGPTSignInPath,chatGPTSignOutPath,usesStandaloneAuth} from '@/app/chatgpt-auth';
import {passwordHash} from '@/lib/admin-session';
import {ADMIN_EMAIL} from '@/lib/server';
import {AdminWorkspace} from '@/components/admin-workspace';
import {AdminLogin,AdminLogout} from '@/components/admin-login';
export const dynamic='force-dynamic';
export default async function Admin(){
 const standalone=usesStandaloneAuth();
 const user=await getChatGPTUser();
 if(user?.email.trim().toLowerCase()!==ADMIN_EMAIL)return <main id="main" className="wrap page-top"><div className="admin-login panel"><p className="eyebrow">OBOTAN CONSULT / PRIVATE WORKSPACE</p><h1>Admin sign in</h1><p className="lead">Access client requests, meeting reservations and client details.</p>{standalone?(passwordHash()?<AdminLogin/>:<p className="notice">Admin login is awaiting secure password configuration. Client records remain protected.</p>):<a className="cta" href={user?chatGPTSignOutPath('/admin'):chatGPTSignInPath('/admin')}>{user?'Sign out':'Sign in with ChatGPT'}</a>}</div></main>;
 return <main id="main" className="wrap page-top"><div className="admin-heading"><div><p className="eyebrow">OBOTAN CONSULT / ADMIN</p><h1>Client requests &amp; reservations.</h1><p className="lead">Manage reservations, review client details and track follow-up.</p></div>{standalone?<AdminLogout/>:<a href={chatGPTSignOutPath('/admin')}>Sign out</a>}</div><AdminWorkspace/></main>;
}
