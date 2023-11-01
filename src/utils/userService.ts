    'use server'
    import { users } from '../db/schema/users';
    import { eq } from "drizzle-orm";
    import { db } from '@/db';
    import { hashPassword, validatePassword } from "../utils/passwordUtility";
    import { NeonDbError } from '@neondatabase/serverless';

    export async function registerUser(username: string, email: string, password: string): Promise<string | null> {
        try {
            // Check if the username already exists
            const existingUsername = await db.select().from(users).where(eq(users.username, username)).execute();
            if (existingUsername.length > 0) {
                return "Username already taken.";
            }

            // Check if the email already exists
            const existingEmail = await db.select().from(users).where(eq(users.email, email)).execute();
            if (existingEmail.length > 0) {
                return "Email already registered.";
            }

            // Validate the user's password
            const isValidPassword = await validatePassword(password);
            if (!isValidPassword) {
                return "Password doesn't meet criteria!";
            }

            // Hash the user's password
            const hashedPassword = await hashPassword(password);

            // Insert the new user
            const insertResult = await db.insert(users).values({
                username: username,
                email: email,
                password: hashedPassword
            }).execute();

            return insertResult ? null : "Error registering user. Try again later.";
        }  catch (error) {
            if (error instanceof NeonDbError && error.code === '23505') {
              if (error.message.includes('users_username_unique')) {
                return 'Username already taken.';
              } else if (error.message.includes('users_email_unique')) {
                return 'Email already registered.';
              }
            }
            console.error('Registration error:', error);
            return 'An unexpected error occurred. Please try again later.';
          }
        }