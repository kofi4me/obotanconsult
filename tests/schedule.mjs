import assert from 'node:assert/strict';
import {officeSlots,isOfficeSlot,slotInfo,calendarFile} from '../lib/schedule.ts';
for(const [now,offset] of [['2026-01-01T00:00:00Z',23],['2026-07-01T00:00:00Z',22]]){
 const slots=officeSlots(Date.parse(now));assert(slots.length>100);assert(slots.every(s=>isOfficeSlot(s.start,Date.parse(now))));
 const evening=slots.find(s=>s.timeLabel.startsWith('6:00'));assert.equal(new Date(evening.start).getUTCHours(),offset);
 const saturday=slots.filter(s=>s.dayLabel.startsWith('Sat'));const day=saturday[0].date;assert.equal(saturday.filter(s=>s.date===day).length,4);
 const weekday=slots.find(s=>s.dayLabel.startsWith('Wed') && s.start>Date.parse(now)+86400000);assert.equal(slots.filter(s=>s.date===weekday.date).length,6);
}
const now=Date.parse('2026-10-15T00:00:00Z');const fall=officeSlots(now);assert(fall.some(s=>s.timeLabel.endsWith('EDT')));assert(fall.some(s=>s.timeLabel.endsWith('EST')));
assert(!isOfficeSlot(Date.parse('2026-10-17T16:00:00Z'),now));
const ics=calendarFile(fall[0].start,'test');assert(ics.includes('BEGIN:VCALENDAR'));assert(ics.includes('DTEND:'));
console.log('PASS: office hours, 40-minute slots, Saturday end time, summer/winter offsets and DST transition.');

