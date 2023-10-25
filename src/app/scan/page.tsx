"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import FaceLandmarker from "@/components/FaceLandmarker";

export default function ScanPage() {
  return (
    <div
      className={twMerge(
        "flex flex-col p-5 h-screen items-center"
      )}
      style={{
        backgroundImage:
          "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
      }}
    >
      <div className={twMerge("flex flex-col items-center mb-5")}>
        <FaceLandmarker />
        <h1 className={twMerge("text-white text-4xl mb-5 dark:text-white")}>
          Start Your Scan
        </h1>
      </div>
    </div>
  );
}
