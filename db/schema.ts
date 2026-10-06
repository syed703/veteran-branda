import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
export const enquiries=sqliteTable("enquiries",{
  id:text("id").primaryKey(),
  reference:text("reference").notNull(),
  name:text("name").notNull(),
  phone:text("phone").notNull(),
  email:text("email").notNull(),
  zip:text("zip").notNull(),
  service:text("service").notNull(),
  message:text("message").notNull(),
  status:text("status").notNull().default("new"),
  createdAt:text("created_at").notNull()
},table=>[uniqueIndex("enquiries_reference_unique").on(table.reference)]);
