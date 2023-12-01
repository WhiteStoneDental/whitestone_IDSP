import React from "react";

interface ScanButtonProps {
  details: string;
}

export default function ScanButton({ details }: ScanButtonProps) {
  return (
    <div className="bg-gray-100 p-3 rounded-xl mb-3">
      <div className="w-full h-32 bg-gray-300 rounded-xl mb-3"></div>
      <div>{details}</div>
    </div>
  );
}
