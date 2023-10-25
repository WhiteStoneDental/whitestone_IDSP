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

  const isLoggedIn = false;

  return (
    <div
      className={twMerge("flex flex-col p-5 h-screen")}
      style={{
        backgroundImage:
          "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
      }}
    >
      <div className={twMerge("flex flex-col items-center mb-5")}>
        <h1 className={twMerge("text-white text-4xl mb-5 dark:text-white")}>
          Start Your Scan
        </h1>
        <StartScanButton />
      </div>

      <div className={twMerge("bg-white p-5 rounded-xl h-screen w-full overflow-hidden" )}>
        <div className={twMerge("mb-5")}>
          <Link href="/login/">
            <h3
              className={twMerge(
                "text-black text-xl mb-3 dark:text-black cursor-pointer"
              )}
            >
              Past Scans- Log In
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
            <p className={twMerge(
              "text-black "
            )}>No Past Scans</p>
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
