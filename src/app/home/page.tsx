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
  const [results, setResults] = useState<OpenAIResult | null>(null);

  useEffect(() => {
    let resultsData = localStorage.getItem("results");
    if (!resultsData) {
      console.log("No data in local storage");
      return;
    }

    const parsedResults = JSON.parse(resultsData);
    // console.log(parsedResults);
    setResults(parsedResults);
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
        className="bg-white p-5 rounded-xl h-screen w-9/12 mt-10 mb-5 dark:bg-[var(--mainphrase-bg)]"
        id="latest-scans"
      >
        <h3 className="text-black font-bold text-2xl mb-5 text-center dark:text-white">
          Latest Scans
        </h3>
        <div id="all-scans-content">
          {results ? (
            <div className="gap-4 mt-1">
              <div className="p-5 sm:pl-20 sm:pr-20">
                <h3 className="text-black font-bold text-xl dark:text-white mb-3">
                  {results.date}
                </h3>
                {results.mild && (
                  <>
                    <div className="grid grid-cols-1 gap-2">
                      {results.mild.map((issue) => (
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
                {results.moderate && (
                  <>
                    <div className="grid grid-cols-1  gap-2">
                      {results.moderate.map((issue) => (
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
                {results.severe && (
                  <>
                    <div className="grid grid-cols-1  gap-2">
                      {results.severe.map((issue) => (
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
          ) : (
            <NoScans />
          )}
        </div>
      </div>

      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
