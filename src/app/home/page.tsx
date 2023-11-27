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

export default function HomePage() {
  const scans = [
    "Placeholder for Scan Details",
    "Placeholder for Scan Details",
  ];

  const [loading, setLoading] = useState(true);

  


  const isLoggedIn = true;

  return (
    <div className="flex w-full flex-col items-center p-5 h-screen relative" style={{ backgroundImage: "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)" }}>
     <LoginButton/>
      <h1 className="text-white text-4xl mt-20 mb-10 dark:text-white">
        Hello UserName. What are you up to today?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-purple-100 bg-opacity-80 p-5 rounded-xl overflow-hidden">
          <h3 className="text-black font-bold text-xl mb-3 dark:text-black cursor-pointer">
            Past Scans
          </h3>
          <PastScan />
        </div>

        <div className="bg-purple-100 bg-opacity-90 p-10 rounded-xl text-center shadow-xl">
          <h3 className="text-black font-bold text-3xl mb-3 dark:text-black cursor-pointer">
            Start a New Scan
          </h3>
          <div className="mx-auto flex items-center justify-center">
            <StartScanButton />
          </div>
        </div>

        <div className="bg-purple-100 bg-opacity-80 p-5 rounded-xl overflow-hidden">
          <h3 className="text-black font-bold text-xl mb-3 dark:text-black cursor-pointer">
            Learning Resources
          </h3>
          <ResourceButton />
        </div>
      </div>

      {/* "Latest Scans" section */}
      <div className="bg-white p-5 rounded-xl h-screen w-full overflow-hidden mt-10 mb-5">
        <div className="mb-5">
          <h3 className="text-black text-2xl mb-3 dark:text-black">
            Latest Scans
          </h3>
          {isLoggedIn ? (
            <div>
              {/* Placeholder for latest scans if already logged in */}
              <div>
                <IssuesStatus redNumber={3} yellowNumber={2} greenNumber={5} />
                <IssuesStatus redNumber={4} yellowNumber={1} greenNumber={2} />
                <IssuesStatus redNumber={1} yellowNumber={2} greenNumber={3} />
                {/* Add more components or content as needed */}
              </div>
              {/* Add more scan results as needed */}
              <HistoryButton />
            </div>

          ) : (
            // not logged in
            <div>
              Please log in to see your past scans results{" "}
              <span className="underline text-purple-500">
                <Link href="/login/"> Log In here </Link>
              </span>
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
