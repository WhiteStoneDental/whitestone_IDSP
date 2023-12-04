"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";

const FaceLandmarkCanvas = dynamic(
  () => {
    return import("@/components/FaceLandmarker");
  },
  { ssr: false }
);

export default function ScanPage() {
  return (
    <div className="flex flex-col p-5 h-screen items-center gradient-bg">
      <div className="flex flex-col items-center mb-5">
        <FaceLandmarkCanvas />
      </div>
      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
