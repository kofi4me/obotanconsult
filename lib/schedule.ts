export const TIME_ZONE = "America/New_York";
export const DURATION_MINUTES = 40;
export type Slot = { start: number; date: string; dayLabel: string; timeLabel: string; fullLabel: string };
const partsFormatter = new Intl.DateTimeFormat("en-US",{timeZone:TIME_ZONE,year:"numeric",month:"2-digit",day:"2-digit",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});
export function isOfficeSlot(start:number, now=Date.now()){
 if(!Number.isSafeInteger(start)||start<=now||start>now+56*86400000||start%60000!==0)return false;
 const p=Object.fromEntries(partsFormatter.formatToParts(start).map(x=>[x.type,x.value]));
 const minutes=Number(p.hour)*60+Number(p.minute);
 const begins=p.weekday==="Sat"?540:["Wed","Thu"].includes(p.weekday)?1080:-1;
 const ends=p.weekday==="Sat"?720:1320;
 return begins>=0&&minutes>=begins&&minutes+40<=ends&&(minutes-begins)%40===0;
}
export function slotInfo(start:number):Slot {
 const p=Object.fromEntries(partsFormatter.formatToParts(start).map(x=>[x.type,x.value]));
 return {start,date:`${p.year}-${p.month}-${p.day}`,dayLabel:new Intl.DateTimeFormat("en-US",{timeZone:TIME_ZONE,weekday:"short",month:"short",day:"numeric"}).format(start),timeLabel:new Intl.DateTimeFormat("en-US",{timeZone:TIME_ZONE,hour:"numeric",minute:"2-digit",timeZoneName:"short"}).format(start),fullLabel:new Intl.DateTimeFormat("en-US",{timeZone:TIME_ZONE,weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"}).format(start)};
}
export function officeSlots(now=Date.now()) {
 const slots:Slot[]=[];
 for(let t=Math.ceil(now/1200000)*1200000;t<now+56*86400000;t+=1200000)if(isOfficeSlot(t,now))slots.push(slotInfo(t));
 return slots;
}
export function calendarFile(start:number,reference:string){
 const utc=(n:number)=>new Date(n).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z");
 return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Obotan Consult//Consultations//EN","BEGIN:VEVENT",`UID:${reference}@obotan-consult`,`DTSTAMP:${utc(Date.now())}`,`DTSTART:${utc(start)}`,`DTEND:${utc(start+40*60000)}`,"SUMMARY:Obotan Consult - document consultation","DESCRIPTION:40-minute research and writing consultation. Obotan will contact you with meeting details. Non-attorney service. No legal advice or petition filing.","END:VEVENT","END:VCALENDAR"].join("\r\n");
}
