//src/app/home/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Head from 'next/head';
import { redirect } from "next/navigation"
import  StartScanButton  from "@/components/StartButton"
import HistoryButton from "@/components/HistoryButton"
import ResourceButton from "@/components/ResourceButton"
import ScanButton from "@/components/ScanButton"
import FooterButtons from "@/components/FooterButtons";

export default function HomePage() {
  const scans = ['Placeholder for Scan Details', 'Placeholder for Scan Details'];

  return (
    <div className={twMerge('flex flex-col p-5 bg-gradient-to-br from-24008C to-641A99 via-9D32A5 h-screen')}>
      
      <div className={twMerge('flex flex-col items-center mb-5')}>
        <h1 className={twMerge('text-black text-4xl mb-5 dark:text-white')}>Start Your Scan</h1>
        <StartScanButton />
      </div>
      
      <div className={twMerge('bg-white p-5 rounded-xl mb-5')}>
        <div className={twMerge('flex items-center mb-5')}>
          <div className={twMerge('bg-gray-300 rounded-full w-12 h-12 mr-5')}></div>
          <h2 className={twMerge('text-lg dark:text-black')}>Placeholder for Username</h2>
        </div>
        
        <div className={twMerge('mb-5')}>
          <h3 className={twMerge('text-black text-xl mb-3 dark:text-black')}>Previous Scans</h3>
          <div >
            
      {scans.map((details, index) => (
        <ScanButton key={index} details={details} />
      ))}
    </div>
          <HistoryButton />
        </div>
        <div>
        <Link href="/healthresources"><ResourceButton/></Link>
          <div className={twMerge('placeholder-content dark:text-black')}>Placeholder for Health Information</div>
        </div>
      </div>
      <FooterButtons />
    </div>
  );
}
