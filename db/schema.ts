// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import {sqliteTable,text,integer,index,uniqueIndex} from "drizzle-orm/sqlite-core";
export const submissions=sqliteTable("submissions",{
 id:text("id").primaryKey(), service:text("service").notNull(), name:text("name").notNull(), email:text("email").notNull(), phone:text("phone").notNull().default(""), field:text("field").notNull(), notes:text("notes").notNull().default(""), evidence:text("evidence").notNull(), fileKey:text("file_key"), fileName:text("file_name"), fileSize:integer("file_size"), slot:integer("slot").notNull(), reservedSlot:integer("reserved_slot"), status:text("status").notNull().default("new"), adminNotes:text("admin_notes").notNull().default(""), consentVersion:text("consent_version").notNull(), createdAt:integer("created_at").notNull(), updatedAt:integer("updated_at").notNull()
},t=>[uniqueIndex("idx_submissions_reserved_slot").on(t.reservedSlot),index("idx_submissions_created_at").on(t.createdAt)]);
export const rateLimits=sqliteTable("rate_limits",{key:text("key").primaryKey(),count:integer("count").notNull(),expires:integer("expires").notNull()});
