"use client";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import history from "./history.json";


interface HistoryItem {
  id: number;
  date: string;
  diseaseAnalysis?: {
    gingivitis?: {
      count: number;
      level: string;
    };
    cavities?: {
      count: number;
      level: string;
    };
    plaque?: string;
    gumRecession?: string;
  };
}

interface HistoryData {
  oralScans: HistoryItem[];
}

export default function History() {

  const [loading, setLoading] = useState(true);

  const isLoggedIn = true;

  console.log(history);

  return (
    <div className="flex flex-col gradient-bg overflow-y-auto w-full items-center relative p-8">
      <div
        className="bg-white p-5 rounded-xl h-screen w-screen-full-xlg overflow-hidden mt-20 dark:bg-[var(--mainphrase-bg)]"
        id="history"
      >
      <h1 className="text-black font-bold text-2xl mb-5 dark:text-white">History</h1>
      <div id="latest-scans-content">
          {history.oralScans.slice(0, 4).map((scan) => (
            <div key={scan.id} className="gap-4 mt-1">
              <div className="  pl-20 pr-20 p-5 ">
                <h3 className="text-black font-bold text-xl  dark:text-white mb-3">
                  {scan.date}
                </h3>
                {scan.diseaseAnalysis && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {scan.diseaseAnalysis.gingivitis && (
                        <h3 className="text-black  text-sm  dark:text-white ">
                          Gingivitis: {scan.diseaseAnalysis.gingivitis.level} (
                          {scan.diseaseAnalysis.gingivitis.count})
                        </h3>
                      )}
                      {scan.diseaseAnalysis.cavities && (
                        <h3 className="text-black text-sm  dark:text-white ">
                          Cavities: {scan.diseaseAnalysis.cavities.level} (
                          {scan.diseaseAnalysis.cavities.count})
                        </h3>
                      )}
                      {scan.diseaseAnalysis.gumRecession && (
                        <h3 className="text-black text-sm  dark:text-white">
                          Gum Recession:{" "}
                          {scan.diseaseAnalysis.gumRecession.level} (
                          {scan.diseaseAnalysis.gumRecession.count})
                        </h3>
                      )}
                    </div>
                      <hr className="mt-3" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      <div className="mt-auto">
        <NavBar />
      </div>
    </div>
  );
}
