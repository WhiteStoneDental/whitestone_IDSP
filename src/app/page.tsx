"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLetsGoClick = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.href = "/home";
    }, 3000);
  };

  if (loading) {
    console.log("line 12"); //hitting this line ok
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <h2 className="font-lg">Loading White Stone...</h2>
        </div>
      </>
    );
  }

  return (
    <div
      className={twMerge("flex flex-col p-5 h-screen sm:p-3")}
      style={{
        backgroundImage:
          "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg text-center items-center justify-center max-h-screen overflow-y-scroll sm:p-4">
        <div className="items-center flex justify-center mb-4">
          <Image
            src="/image/blackLogo.png"
            alt="WhiteStone Logo"
            width={450}
            height={65}
            className= "object-contain"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mt-4 sm:text-1.5xl">
          Your Personal Dental Assistant
        </h1>
        <p className="text-gray-600 mt-4 text-xl sm:text-lg">
          Find out about the evolution of oral health care
        </p>
        <hr className="my-5"></hr>
        <div className="text-center items-center justify-center flex flex-col sm:flex-row">
          <div className="sm:flex-initial sm:mr-10 max-w-4xl">
            <h1 className="text-4xl font-extrabold text-purple-500 mt-10 sm:text-2xl">
              Why WhiteStone?
            </h1>
            <p className="text-black mt-5 text-lg text-center sm:text-base">
              When we started our work on WhiteStone we had one question we
              asked ourselves.
            </p>
            <p className="text-black text-2xl mt-4 sm:text-xl">
              <b>
                "How can we make dental care more accessible for those who need
                it?"
              </b>
            </p>
            {/* <div className="text-center items-center justify-center flex"> */}
              <p className="text-black mt-5 text-lg text-justify max-w-2xl sm:text-base">
                After careful planning, we felt that putting the right tools in
                the hands of those individuals for free will achieve our goal.{" "}
                <b>1 in 3 Canadians lack proper access to dental care</b> and
                dental care knowledge. We hope with WhiteStone that we can lower
                the amount of individuals that are in dire need of dental health
                information and care resources.
              </p>
            {/* </div> */}
          </div>
        </div>
        <hr className="my-10"></hr>
        <div className="text-center items-center justify-center flex flex-col sm:flex-row">
          {/* <div className="mt-4 flex text-center items-center justify-center max-w-3xl"> */}
            <div className="sm:flex-initial sm:mr-10 max-w-4xl">
              <h1 className="text-4xl font-extrabold text-purple-500">
                Bringing Back Smiles
              </h1>
              <p className="text-black mt-5 text-justify px-3 text-lg">
                Our Goal with WhiteStone is create an{" "}
                <b>affordable alternative</b> to in person oral consultation.
                WhiteStone utilizes machine learning technology paired with your
                phone or computers camera to scan and quickly determine any
                possible oral afflictions you may be facing, then recommend your
                next steps for possible healthcare actions to improve your oral
                health.
              </p>
            </div>
            <Image
              src="/image/ScanPic.png"
              alt="Placeholder"
              width={260}
              height={260}
              className="object-contain"
            />
          </div>
          {/* </div> */}
        <hr className="mt-4"/>
        <div className="text-center items-center justify-center flex flex-col sm:flex-row">
          {/* <div className="mt-4 flex text-center items-center justify-center max-w-3xl"> */}
            <Image
              src="/image/ScanDetails.png"
              alt="Placeholder"
              width={280}
              height={280}
              className="object-contain"
            />
            <div className="sm:flex-initial sm:ml-10 max-w-4xl">
              <h1 className="text-4xl font-extrabold text-purple-500">
                Track Your Progress
              </h1>
              <p className="text-black mt-5 text-justify px-3 text-lg sm:text-base">
                Follow your own dental health journey as the WhiteStone app
                tracks and documents each new scan. With a log of your previous
                dental scans, you can <b>gain dental care insights</b> into what
                oral care practices have been effective for you.{" "}
              </p>
            </div>
          {/* </div> */}
        </div>
        <hr className="mt-4"/>
        <div className="text-center items-center justify-center flex flex-col sm:flex-row">
          {/* <div className="mt-4 flex text-center items-center justify-center max-w-3xl"> */}
            <div className="sm:flex-initial sm:mr-10 max-w-4xl">
              <h1 className="text-4xl font-extrabold text-purple-500">
                Learn About Your Teeth
              </h1>
              <p className="text-black mt-5 text-justify px-3 text-lg sm:text-base">
                Find informational <b>dental care resources</b> relating
                directly to your scan results in the app. Pair the effective
                dental scans with relevant oral care practices to immediately
                improve the health of your teeth.
              </p>
            </div>
            <Image
              src="/image/HealthResources.png"
              alt="Placeholder"
              width={270}
              height={270}
              className="object-contain"
            />
          {/* </div> */}
        </div>
        <hr className="mt-4"/>
        <div className="flex text-center items-center justify-center mt-10 space-x-4 sm:flex-col sm:space-x-0 sm:space-y-4">
          <div
            className={`bg-white-200 rounded-md ${
              loading ? "opacity-50" : ""
            }`}
          >
            {" "}
           <div className="mb-10">
  <div className="bg-purple-200 rounded-md mb-3">
    <p className="text-gray-700 mb-2 mt-2 text-sm sm:text-base">Try Our Demo</p>
    <Link href="/scan">
      <div className={`cursor-pointer bg-purple-500 text-white px-4 py-2 sm:px-10 sm:py-3 rounded-full w-full sm:w-auto text-center ${loading ? "pointer-events-none" : ""}`}>
        Check It Out
      </div>
    </Link>
  </div>

  <div className="bg-purple-200 rounded-md">
    <p className="text-gray-700 mb-2 mt-2 text-sm sm:text-base">Check the web app</p>
    <button
      className={`bg-purple-500 text-white px-4 py-2 sm:px-20 sm:py-3 rounded-full w-full sm:w-auto text-center ${loading ? "pointer-events-none" : ""}`}
      onClick={handleLetsGoClick}
    >
      {loading ? "Loading..." : "Let's Go"}
    </button>
  </div>
</div>

<div className="mt-6">
  <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
    Contact Us
  </h1>
  <p className="text-black mt-2 text-sm sm:text-base">
    <b>Email:</b>
    <Link href="mailto:White.Stone.23@gmail.com">
      <div className="cursor-pointer">White.Stone.23@gmail.com</div>
    </Link>
  </p>
  <p className="text-black mt-2 text-sm sm:text-base">
    <b>Blog:</b>
    <Link href="https://whitestone23.wixsite.com/whitestone">
      <div className="cursor-pointer">WhiteStone</div>
    </Link>
  </p>
</div>


</div>
      </div>
    </div>
    </div>
  );
}
