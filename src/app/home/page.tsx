import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Head from "next/head";
import StartScanButton from "@/components/StartButton";
import HistoryButton from "@/components/HistoryButton";
import ResourceButton from "@/components/ResourceButton";
import ScanButton from "@/components/ScanButton";

export default function HomePage() {
  const scans = [
    "Placeholder for Scan Details",
    "Placeholder for Scan Details",
  ];

  // Mock logged-in status. Later, this can be replaced by real authentication data.
  const isLoggedIn = false;

  return (
    <div
      className={twMerge(
        "flex flex-col p-5 bg-gradient-to-br from-24008C to-641A99 via-9D32A5 h-screen"
      )}
    >
      <div className={twMerge("flex flex-col items-center mb-5")}>
        <h1 className={twMerge("text-black text-4xl mb-5 dark:text-white")}>
          Start Your Scan
        </h1>
        <StartScanButton />
      </div>

      <div className={twMerge("bg-white p-5 rounded-xl mb-5")}>
        <div className={twMerge("mb-5")}>
          <Link href="/login/">
            <h3 className={twMerge("text-black text-xl mb-3 dark:text-black cursor-pointer")}>
              Past Scans
            </h3>
          </Link>
          {isLoggedIn ? (
            <div>
              {scans.map((details, index) => (
                <ScanButton key={index} details={details} />
              ))}
              <HistoryButton />
            </div>
          ) : (
            <p>No Past Scans</p>
          )}
        </div>

        <div>
          <ResourceButton />
          <div className={twMerge("placeholder-content dark:text-black")}>
            Placeholder for Health Information
          </div>
        </div>
      </div>
    </div>
  );
}
