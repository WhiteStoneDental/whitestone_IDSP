'use client'
import React, { useState } from "react";
import { checkCredentials } from "@/FakeDb";  
import { twMerge } from "tailwind-merge";
import Link from "next/link";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState<{username: string, email: string, password: string} | null>(null);

  const handleLogin = async () => {
    const user = await checkCredentials(username, password);
    
    if (user) {
        setUserData({
            username: user.username,
            email: user.email,
            password: user.password
        });
        console.log(user);
        // Do any other logic you need when a user logs in successfully.
    } else {
        setLoginError("Incorrect username or password!");
        console.log(user)
        setUserData(null);
    }
};

  return (
    <div  
      className={twMerge(
        "min-h-screen flex items-center justify-center bg-primary5 bg-[var(--mainphrase-bg)]"
      )}
    >
      <div
        className={twMerge(
          "w-96 p-8 rounded shadow-xl bg-white dark:bg-gray-900 text-black dark:text-white"
        )}
      >
        {!userData ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {loginError && (
              <p className="text-red-500 dark:text-red-400 mb-2">{loginError}</p>
            )}
            <input
              type="text"
              placeholder="Username"
              className={twMerge(
                "w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              )}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={twMerge(
                "w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={twMerge(
                "w-full p-2 rounded mb-4 bg-primary3 dark:bg-primary1 text-black dark:text-gray-200"
              )}
              onClick={handleLogin}
            >
              Login
            </button>
            <Link 
              href="/create-user"
              className={twMerge(
                "w-full p-2 rounded mb-4 bg-primary3 dark:bg-primary1 text-black dark:text-gray-200"
              )}
            >
              Sign Up
            </Link>
          </>

        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">User Info</h1>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Password (hashed):</strong> {userData.password}</p>
          </>
        )}
      </div>
    </div>  
  );
}
