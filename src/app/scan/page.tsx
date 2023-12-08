"use client";

import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";

const FaceLandmarkCanvas = dynamic(
  () => {
    return import("../../components/FaceLandmarker");
  },
  { ssr: false }
);

export default function ScanPage() {
  return (
    <div className="flex flex-col p-5  mb-10 items-center gradient-bg w-full  min-h-screen  ">
      <div className="flex flex-col items-center mb-5 w-full">
        <FaceLandmarkCanvas />
      </div>
      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
