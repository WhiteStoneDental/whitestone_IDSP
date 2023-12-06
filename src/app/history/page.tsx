"use client";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";

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

export default function History() {
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

  // console.log(history);

  return (
    <div className="flex flex-col gradient-bg overflow-y-auto w-full items-center relative p-8">
      <div
        className="bg-white p-5 rounded-xl h-screen w-screen-full-xlg overflow-hidden mt-20 dark:bg-[var(--mainphrase-bg)]"
        id="history"
      >
        <h1 className="text-black font-bold text-2xl mb-5 dark:text-white">
          History
        </h1>
        <div id="all-scans-content">
          {results && (
            <div className="gap-4 mt-1">
              <div className="pl-20 pr-20 p-5">
                <h3 className="text-black font-bold text-xl dark:text-white mb-3">
                  {results.date}
                </h3>
                {results.mild && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {results.mild.map((issue) => (
                        <h3
                          className="text-black text-sm dark:text-white"
                          key={issue.id}
                        >
                          Mild Issue: {issue.issue_title}
                        </h3>
                      ))}
                    </div>
                  </>
                )}
                {results.moderate && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {results.moderate.map((issue) => (
                        <h3
                          className="text-black text-sm dark:text-white"
                          key={issue.id}
                        >
                          Moderate Issue: {issue.issue_title}
                        </h3>
                      ))}
                    </div>
                  </>
                )}
                {results.severe && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {results.severe.map((issue) => (
                        <h3
                          className="text-black text-sm dark:text-white"
                          key={issue.id}
                        >
                          Severe Issue: {issue.issue_title}
                        </h3>
                      ))}
                    </div>
                  </>
                )}
              <hr className="mt-3" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
