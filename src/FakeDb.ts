'use server'
import { db } from '@/db';
import { users } from './db/schema/users';
import { verifyPassword } from "./utils/passwordUtility";
import { eq } from "drizzle-orm";

export async function checkCredentials(username: string, password: string): Promise<{ username: string, email: string, password: string } | null> {
    const results = await db.select().from(users).where(eq(users.username, username));
    const user = results[0];
    
    if (user) {
        const isPasswordValid = await verifyPassword(password, user.password);
        console.log('Is password valid?', isPasswordValid); 

        if (isPasswordValid) {
            return {
                username: user.username,
                email: user.email,
                password: user.password     
            };
        } else {
            console.log(user);
            return null;
        }
    }


    console.log("User not found or password incorrect");
    return null;
}