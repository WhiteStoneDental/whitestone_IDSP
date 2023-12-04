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

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = true;

  console.log(history);

  return (
    <div
      className="flex flex-col items-center p-8 h-full relative overflow-y-auto gradient-bg"
    >
      {/* <LoginButton/> */}

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
        className="bg-white p-5 rounded-xl h-screen max-w-screen-lg overflow-hidden mt-10 mb-5 dark:bg-[var(--mainphrase-bg)]"
        id="latest-scans"
      >
        <h3 className="text-black font-bold text-2xl mb-5 dark:text-white">
          Latest Scans
        </h3>
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
