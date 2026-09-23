import {database,json} from "@/lib/server";
import {officeSlots} from "@/lib/schedule";
export const dynamic="force-dynamic";
export async function GET(){try{const r=await database().prepare("SELECT reserved_slot FROM submissions WHERE reserved_slot > ?").bind(Date.now()).all<{reserved_slot:number}>();const used=new Set(r.results.map(x=>x.reserved_slot));return json({slots:officeSlots().filter(s=>!used.has(s.start))})}catch{console.error("slots_unavailable");return json({error:"Appointment availability is temporarily unavailable. Please try again."},503)}}
