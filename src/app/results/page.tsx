"use client";
import NavBar from "@/components/NavBar";
import Accordion from "@/components/Accordion";
import LoginButton from "@/components/LoginButton";

import { twMerge } from "tailwind-merge";
import ResultsAccordion from "@/components/ResultsAccordion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ResultsPage({ params }: { params: { data: string } }) {
  const [results, setResults] = useState<OpenAIResult>({} as OpenAIResult);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("results");
    let imgURL = localStorage.getItem("imageURL");
    if (!data || !imgURL) {
      console.log("no data");
      return;
    }
    console.log(data);
    setResults(JSON.parse(data));
    setImgSrc(imgURL);
  }, []);

  return (
    <div
      className={twMerge("flex flex-col p-5")}
      style={{
        backgroundImage:
          "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
      }}
    >
      <div
        className={twMerge(
          "flex flex-col items-center mt-20 mb-5 font-bold text-6xl text-center text-white"
        )}
      >
        Scan Results
      </div>
      <div className="bg-white p-5 rounded-xl h-full w-full overflow-hidden mb-10 dark:bg-[var(--mainphrase-bg)]">
        <div
          className={twMerge(
            "placeholder-content text-black dark:text-white text-center font-bold text-xl mb-5"
          )}
        >
          {results.date}
        </div>
        {imgSrc && (
          <div className="mx-auto flex items-center justify-center mb-5">
            <Image src={imgSrc} alt="webcam image" width={600} height={600} />
          </div>
        )}
        <hr className="border-t border-white dark:border-white border-solid my-5"></hr>
        <ResultsAccordion results={results} />
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}

type Issue = {
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
