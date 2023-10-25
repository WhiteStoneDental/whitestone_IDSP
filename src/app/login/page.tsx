"use client";
import React, { useState } from "react";
import Link from "next/link";
import { checkCredentials } from "../../FakeDb";
import { twMerge } from "tailwind-merge";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    const isValid = checkCredentials(username, password);
    if (isValid) {
      alert("Logged in");
      window.location.href = "/home";
    } else {
      setLoginError("Incorrect username or password!");
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
          "w-96 p-8 rounded shadow-xl bg-white  dark:bg-gray-900 text-black dark:text-white"
        )}
      >
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
            "w-full p-2 mb-4 border rounded bg-white  text-black dark:bg-gray-800 dark:text-white"
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
      </div>
    </div>
  );
}
