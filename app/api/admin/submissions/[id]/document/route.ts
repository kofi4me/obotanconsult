import {isAdmin,json} from "@/lib/server";
export async function GET(){if(!await isAdmin())return json({error:"Admin access required."},403);return json({error:"Documents are handled by email. Website document downloads are no longer available."},410)}
