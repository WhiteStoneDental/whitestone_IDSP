'use server'
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10; // cost factor.

/**
 * Validate password based on given criteria
 * @param {string} password - The password to validate.
 * @return {boolean} - True if the password matches the criteria, otherwise false.
 */
export async function validatePassword(password: string): Promise<boolean> {
    if (typeof password !== 'string') return false;

    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 8;
    return hasNumber && hasSpecialChar && hasUpperCase && hasMinLength;
}


/**
 * Hash a password using bcryptjs.
 * @param {string} password - The plain-text password.
 * @return {Promise<string>} - The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    if (typeof password !== 'string' || !validatePassword(password)) {
        throw new Error('Password does not meet the criteria.');
    }

    return bcrypt.hash(password, SALT_ROUNDS);
  
}

/**
 * Verify a password against a hash.
 * @param {string} password - The plain-text password.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @return {Promise<boolean>} - True if the passwords match, otherwise false.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}
