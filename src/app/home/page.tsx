"use client";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import StartScanButton from "@/components/StartButton";
import HistoryButton from "@/components/HistoryButton";
import ResourceButton from "@/components/HealthResourceButton";
import PastScan from "@/components/PastScanButton";
import IssuesStatus from "@/components/IssuesStatus";
import ScanButton from "@/components/ScanButton";
import NavBar from "@/components/NavBar";
import LoginButton from "@/components/LoginButton";
import { useState, useEffect } from "react";
import history from "./history.json";
import NoScans from "@/components/NoScans";
type Issue = {
  id: string;
  issue_title: string;
  issue_description: string;
};

type OpenAIResult = {
  date: string;
  rating: number;
  mild?: Issue[];
  moderate?: Issue[];
  severe?: Issue[];
  error?: string;
};

type LocalStorageJsonResult = {
  imageURL: string;
  result: OpenAIResult;
}[];

type IssueSeverity = "red" | "orange" | "yellow";

const getDotColor = (severity: IssueSeverity) => {
  switch (severity) {
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "yellow":
      return "bg-yellow-400";
    default:
      return "";
  }
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<LocalStorageJsonResult | null>(null);

  useEffect(() => {
    let resultsData = localStorage.getItem("results");
    if (!resultsData) {
      console.log("No data in local storage");
      return;
    }
    const parsedResults = JSON.parse(resultsData);
    const newResults: LocalStorageJsonResult = [];
    for (const result of parsedResults) {
      const newResult = {
        imageURL: result.imageURL,
        result: JSON.parse(result.result),
      };
      // const date = new Date();
      // newResult.result[
      //   "date"
      // ] = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      newResult.result["date"] = "2023-12-08";
      newResults.push(newResult);
    }
    console.log(newResults);
    setResults(newResults);
  }, []);

  const isLoggedIn = true;

  return (
    <div className="flex flex-col items-center p-8 h-screen relative overflow-y-auto gradient-bg">
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
        <div className="bg-purple-100 bg-opacity-60 pl-20 pr-20 p-5 rounded-xl text-center shadow-xl dark:bg-[var(--box-color)]">
          <h3 className="text-black font-bold text-xl mb-3 dark:text-white cursor-pointer">
            History
          </h3>
          <div className="mx-auto flex items-center justify-center">
            <PastScan />
          </div>
        </div>

        <div className="bg-purple-100 bg-opacity-90 pl-20 pr-20 p-5 rounded-xl text-center shadow-xl dark:bg-[var(--box-color)]">
          <h3 className="text-black font-bold text-xl mb-3 dark:text-white cursor-pointer">
            Start Scan
          </h3>
          <div className="mx-auto flex items-center justify-center">
            <StartScanButton />
          </div>
        </div>

        <div className="bg-purple-100 bg-opacity-60 pl-20 pr-20 p-5 rounded-xl text-center shadow-xl dark:bg-[var(--box-color)]">
          <h3 className="text-black font-bold text-xl mb-3 dark:text-white cursor-pointer">
            Resources
          </h3>
          <div className="mx-auto flex items-center justify-center">
            <ResourceButton />
          </div>
        </div>
      </div>

      {/* "Latest Scans" section */}
      <div
        className="bg-white p-5 rounded-xl h-auto w-9/12 mt-10 mb-5 dark:bg-[var(--mainphrase-bg)]"
        id="latest-scans"
      >
        <h3 className="text-black font-bold text-2xl mb-5 text-center dark:text-white">
          Latest Scans
        </h3>
        <div id="all-scans-content">
          {results?.map((resultObject, index) => (
            <div className="gap-4 mt-1" key={String(index)}>
              <div className="p-2 sm:pl-20 sm:pr-20">
                <h3 className="text-black font-bold text-xl dark:text-white mb-3">
                  {resultObject.result.date}
                </h3>
                {resultObject.result.mild && (
                  <>
                    <div className="grid grid-cols-1 gap-2 ">
                      {resultObject.result.mild.map((issue) => (
                        <div key={issue.id}>
                          <div
                            className={`rounded-full w-3 h-3 inline-block ${getDotColor(
                              "yellow"
                            )} mr-2`}
                          />
                          <span className="text-black text-sm dark:text-white">
                            Mild Issue: {issue.issue_title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {resultObject.result.moderate && (
                  <>
                    <div className="grid grid-cols-1  gap-2">
                      {resultObject.result.moderate.map((issue) => (
                        <div key={issue.id}>
                          <div
                            className={`rounded-full w-3 h-3 inline-block ${getDotColor(
                              "orange"
                            )} mr-2`}
                          />
                          <span className="text-black text-sm dark:text-white">
                            Moderate Issue: {issue.issue_title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {resultObject.result.severe && (
                  <>
                    <div className="grid grid-cols-1  gap-2">
                      {resultObject.result.severe.map((issue) => (
                        <div key={issue.id}>
                          <div
                            className={`rounded-full w-3 h-3 inline-block ${getDotColor(
                              "red"
                            )} mr-2`}
                          />
                          <span className="text-black text-sm dark:text-white">
                            Severe Issue: {issue.issue_title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <hr className="mt-3" />
              </div>
            </div>
          ))}
          {!results && <NoScans />}
        </div>
      </div>

      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
