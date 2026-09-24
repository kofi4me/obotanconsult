export function documentEmailLink(service:string,reference:string,name:string,isBusiness=false){
 const subject=`${service} — ${isBusiness?"Supporting documents":"CV"} — Booking ${reference}`;
 const body=`Hello Obotan Consult,\r\n\r\nName: ${name}\r\nService: ${service}\r\nBooking reference: ${reference}\r\n\r\nI am sending my ${isBusiness?"supporting documents":"CV"} for my consultation.\r\n\r\nPlease attach your file before sending this email.`;
 return `mailto:obotanconsult@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
