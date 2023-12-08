import { serial, text, varchar, pgTable } from "drizzle-orm/pg-core";

export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  scan: text("scan").notNull(),
});

export type Scan = typeof scans.$inferSelect;
