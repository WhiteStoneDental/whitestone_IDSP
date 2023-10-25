"use client";

import ScanButton from "@/components/ScanButton";
import dynamic from "next/dynamic";

const FaceLandmarkCanvas = dynamic(
  () => {
    return import("@/components/FaceLandmarker");
  },
  { ssr: false }
);

export default function Scan() {
  return (
    <div className="flex flex-col items-center px-2 pt-10 min-h-screen">
      <div className="flex justify-center w-full">
        <FaceLandmarkCanvas />
      </div>
    </div>
  );
}
