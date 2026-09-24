import {NextResponse,type NextRequest} from 'next/server';
export function middleware(request:NextRequest){
 const response=NextResponse.next();
 const path=request.nextUrl.pathname;
 if(path==='/admin'||path.startsWith('/admin/')||path.startsWith('/api/admin/')||path.startsWith('/api/auth/')){
  response.headers.set('Cache-Control','no-store');
  response.headers.set('X-Frame-Options','DENY');
  response.headers.set('Content-Security-Policy',"frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'");
  response.headers.set('Referrer-Policy','no-referrer');
  response.headers.set('X-Content-Type-Options','nosniff');
 }
 return response;
}
