"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { submitImage } from "../../../util/send-to-api";

export default function ScanPage() {
  const [message, setMessage] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      console.log(message);
      console.log(imageURL);
      const streamIterator = await submitImage("/api/route", message, imageURL);
      let result = "";
      for await (const chunk of streamIterator) {
        result += chunk;
      }
      setResult(result);
    } catch (error) {
      console.error("Error submitting image:", error);
      setResult("Error submitting image");
    }
  };

  return (
    <div className="flex flex-col p-5 h-screen items-center gradient-bg">
      <input
        type="text"
        placeholder="What is your question"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
      />
      <input
        type="text"
        placeholder="Enter an image url"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
      />
      <div>
        <button
          className="text-white text-4xl mb-5 dark:text-white"
          onClick={handleSubmit}
        >
          Start your scan
        </button>
      </div>
      {result && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
