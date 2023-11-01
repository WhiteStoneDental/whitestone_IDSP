import {
        serial,
        varchar,
        pgTable 
    } from "drizzle-orm/pg-core";
    import { eq } from "drizzle-orm";
    
    export const users = pgTable('users', {
        id: serial('id').primaryKey(),
        username: varchar("username", { length: 90 }).notNull().unique(),
        email: varchar("email", { length: 90 }).notNull().unique(),
        password: varchar("password", { length: 255 }).notNull(),
    });
    
    export type Time = typeof users.$inferSelect & {
        createdAt: Date;
    };
