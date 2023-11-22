'use client'
import React, { useState } from "react";
import Link from 'next/link';
import { twMerge } from "tailwind-merge";
import { registerUser } from "../../utils/userService";

function RegisterUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 8;

    const passwordCriteria = [
        { label: "At least 8 characters", isValid: hasMinLength },
        { label: "Contains a number", isValid: hasNumber },
        { label: "Contains an uppercase letter", isValid: hasUpperCase },
        { label: "Contains a special character", isValid: hasSpecialChar }
    ];
    const isFormValid = () => username && email && password && hasNumber && hasSpecialChar && hasUpperCase && hasMinLength;

    const handleRegister = async () => {
      setRegisterError(""); 
  
      if (isFormValid()) {
          try {
              const errorMessage = await registerUser(username, email, password);
              if (errorMessage) {
                  setRegisterError(errorMessage);
              } else {
       
                  setRegisterError("Registration successful! Please log in.");
              }
          } catch (error) {
              console.error("Registration error:", error);
              setRegisterError("An unexpected error occurred. Please try again.");
          }
      } else {
          setRegisterError("Please make sure all fields are filled out correctly.");
      }
    };
  
  
    return (
        <div className={twMerge("min-h-screen flex items-center justify-center bg-primary5 bg-[var(--mainphrase-bg)]")}>
            <div className={twMerge("w-96 p-8 rounded shadow-xl bg-white dark:bg-gray-900 text-black dark:text-white")}>
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                {registerError && (
                    <p className="text-red-500 dark:text-red-400 mb-2">{registerError}</p>
                )}
                <input
                  type="text"
                  placeholder="Username"
                  className={twMerge("w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={twMerge("w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={twMerge("w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <hr></hr>
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide Password" : "Show Password "}
                </button>
                <hr></hr>
                <ul className="mb-4 text-sm ">
                  {passwordCriteria.map((criteria, index) => (
                    <li key={index} className={criteria.isValid ? "text-green-500" : ""}>
                      {criteria.label}
                    </li>
                  ))}
                </ul>
                <button
    className={twMerge([
      "w-full",
      "p-2",
      "rounded",
      "mb-4",
      isFormValid() ? "bg-primary3 dark:bg-primary1 text-black dark:text-gray-200" : "",
      !isFormValid() ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-600" : "",
    ])}
    onClick={handleRegister}
    disabled={!isFormValid()}
>
    Sign Up
</button>

                {/* {registerError === "" && (
                    <Link href="/login">
                        Go to Login
                    </Link>
                )} */}
            </div>
        </div>
    );
}

export default RegisterUser;
