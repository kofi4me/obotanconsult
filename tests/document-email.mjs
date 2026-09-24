import assert from 'node:assert/strict';
import {documentEmailLink} from '../lib/document-email.ts';
const link=new URL(documentEmailLink('EB-2 NIW','ref-123','A & B? #name'));
assert.equal(link.origin,'https://mail.google.com');
assert.equal(link.searchParams.get('to'),'obotanconsult@gmail.com');
assert.equal(link.searchParams.get('view'),'cm');
assert.equal(link.searchParams.get('su'),'EB-2 NIW — CV — Booking ref-123');
assert(link.searchParams.get('body').includes('Name: A & B? #name'));
assert(link.searchParams.get('body').includes('Booking reference: ref-123'));
assert.equal([...link.searchParams.keys()].length,5);
assert(new URL(documentEmailLink('Business Docs','ref-456','Client',true)).searchParams.get('su').includes('Supporting documents'));
console.log('PASS: email recipient, encoding, service, reference and business document wording');

