"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { twMerge } from "tailwind-merge";
import { submitImage } from "../../../util/send-to-api";

const FaceLandmarkCanvas = dynamic(
  () => {
    return import("@/components/FaceLandmarker");
  },
  { ssr: false }
);

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
        <FaceLandmarkCanvas />
      </div>
    </div>
  );
}
