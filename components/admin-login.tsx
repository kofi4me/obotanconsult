'use client';
import {useState,type FormEvent} from 'react';
export function AdminLogin(){
  const [error,setError]=useState(''),[busy,setBusy]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setBusy(true);setError('');const data=new FormData(event.currentTarget);
    try{const response=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:data.get('email'),password:data.get('password')})});const result=await response.json() as {error?:string};if(!response.ok)throw new Error(result.error);window.location.replace('/admin')}catch(e){setError(e instanceof Error?e.message:'Unable to sign in.');setBusy(false)}
  }
  return <form onSubmit={submit} className="admin-password-form"><label htmlFor="admin-email">Admin email</label><input id="admin-email" name="email" type="email" autoComplete="username" required defaultValue="obotanconsult@gmail.com"/><label htmlFor="admin-password">Password</label><input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={128}/>{error&&<p role="alert" className="notice">{error}</p>}<button className="cta" disabled={busy}>{busy?'Signing in…':'Sign in'}</button><p className="micro">Use your Obotan website password. This is separate from your Gmail password.</p></form>;
}
export function AdminLogout(){const [error,setError]=useState('');return <div><button className="text-link" onClick={async()=>{try{const response=await fetch('/api/auth/logout',{method:'POST'});if(!response.ok)throw new Error();window.location.replace('/admin')}catch{setError('Sign-out failed. Please retry.')}}}>Sign out</button>{error&&<p role="alert">{error}</p>}</div>}

