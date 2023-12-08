"use client";
import NavBar from "@/components/NavBar";
import Accordion from "@/components/Accordion";
import LoginButton from "@/components/LoginButton";

import ResultsAccordion from "@/components/ResultsAccordion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Results() {
  const [results, setResults] = useState<OpenAIResult>({} as OpenAIResult);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("results");
    if (!data) {
      console.log("no data");
      return;
    }
    const jsonData = JSON.parse(data);
    const date = new Date();
    jsonData[jsonData.length - 1]["date"] = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    // jsonData["date"] = "2023-12-08";
    // localStorage.setItem("results", jsonData);
    // console.log(data);
    localStorage.setItem("results", JSON.stringify(jsonData));
    setResults(JSON.parse(jsonData[jsonData.length - 1].result));
    setImgSrc(jsonData[jsonData.length - 1].imageURL);
  }, []);

  const handleDownload = () => {
    const content = JSON.stringify(results, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "scan_results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col p-5 gradient-bg">
      <div className="flex flex-col items-center mt-20 mb-5 font-bold text-6xl text-center text-white">
        Scan Results
      </div>
      <div className="mx-auto bg-white p-5 rounded-xl h-full overflow-hidden mb-10 dark:bg-[var(--mainphrase-bg)]">
        {imgSrc && (
          <div className="mx-auto flex items-center justify-center mb-5">
            <Image src={imgSrc} alt="webcam image" width={400} height={400} />
          </div>
        )}
        <hr className="border-t border-white dark:border-white border-solid my-5"></hr>
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="mb-3 border hover:bg-purple-900 hover:text-white dark:text-white text-black font-bold py-2 px-4 rounded"
          >
            Download Results
          </button>
        </div>
        <div className="placeholder-content text-black dark:text-white text-center font-bold text-xl mb-5">
          {results.date}
        </div>
        <ResultsAccordion results={results} />
        <div>
          <NavBar />
        </div>
      </div>
    </div>
  );
}

export type Issue = {
  id: string;
  issue_title: string;
  issue_description: string;
};

export type OpenAIResult = {
  date: string;
  rating: number;
  mild?: Issue[];
  moderate?: Issue[];
  severe?: Issue[];
  error?: string;
};
