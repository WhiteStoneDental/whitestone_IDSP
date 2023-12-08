"use client";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
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

export default function History() {
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
      const date = new Date();
      newResult.result[
        "date"
      ] = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      newResults.push(newResult);
    }
    console.log(newResults);
    setResults(newResults);
  }, []);

  return (
    <div className="flex flex-col gradient-bg overflow-y-auto   items-center relative p-8">
      <div
        className="bg-white p-5 rounded-xl h-auto w-9/12 mt-10 mb-5 dark:bg-[var(--mainphrase-bg)]"
        id="history"
      >
        <h1 className="text-black font-bold text-center text-2xl mb-5 dark:text-white">
          History
        </h1>
        <div id="all-scans-content ">
          {results?.map((resultObject, index) => (
            <div className="gap-4 mt-1" key={String(index)}>
              <div className="pl-20 pr-20 p-5">
                <h3 className="text-black font-bold text-sm sm:text-xl sm:font-bold dark:text-white mb-3">
                  {resultObject.result.date}
                </h3>
                {resultObject.result.mild && (
                  <>
                    <div className="grid grid-cols-1 gap-2">
                      {resultObject.result.mild.map((issue) => (
                        <div key={issue.id}>
                          <div
                            className={`rounded-full w-3 h-3 inline-block ${getDotColor(
                              "yellow"
                            )} mr-2`}
                          />
                          <span className="font-bold text-black text-sm dark:text-white mb-3">
                            Mild Issue: {issue.issue_title}
                          </span>
                          <h3 className="text-black text-sm dark:text-white mb-3">
                            {issue.issue_description}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {resultObject.result.moderate && (
                  <>
                    <div className="grid grid-cols-1 gap-2">
                      {resultObject.result.moderate.map((issue) => (
                        <div key={issue.id}>
                          <div
                            className={`rounded-full w-3 h-3 inline-block ${getDotColor(
                              "orange"
                            )} mr-2`}
                          />
                          <span className="font-bold text-black text-sm dark:text-white mb-3">
                            Moderate Issue: {issue.issue_title}
                          </span>
                          <h3 className="text-black text-sm dark:text-white mb-3">
                            {issue.issue_description}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {resultObject.result.severe && (
                  <>
                    <div className="grid grid-cols-1 gap-2">
                      {resultObject.result.severe.map((issue) => (
                        <div key={issue.id}>
                          <div
                            className={`rounded-full w-3 h-3 inline-block ${getDotColor(
                              "red"
                            )} mr-2`}
                          />
                          <span className="font-bold text-black text-sm dark:text-white mb-3">
                            Severe Issue: {issue.issue_title}
                          </span>
                          <h3 className="text-black text-sm dark:text-white mb-3">
                            {issue.issue_description}
                          </h3>
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
