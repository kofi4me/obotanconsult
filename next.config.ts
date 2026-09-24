import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
 async headers(){return [{source:'/admin/:path*',headers:[
  {key:'Cache-Control',value:'no-store'},
  {key:'X-Frame-Options',value:'DENY'},
  {key:'Content-Security-Policy',value:"frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'"},
  {key:'Referrer-Policy',value:'no-referrer'},
  {key:'X-Content-Type-Options',value:'nosniff'},
 ]}]}
};
export default nextConfig;
