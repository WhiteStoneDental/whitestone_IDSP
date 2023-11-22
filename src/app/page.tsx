import React from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import Link from 'next/link';

export default function Landing() {
    return (
        <div className={twMerge("flex flex-col p-2 md:p-5 h-screen")}
            style={{
                backgroundImage:
                    "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
            }}>
           <div className="bg-white p-4 md:p-8 rounded shadow-lg text-center items-center justify-center max-h-screen overflow-y-scroll">
    <div className="items-center flex justify-center">
        <Image 
            className="object-center" 
            src='/image/blackLogo.png' 
            alt='WhiteStone Logo' 
            layout="intrinsic" 
            width={550} 
            height={50} 
        />
    </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mt-4">
                    Your Personal Dental Assistant
                </h1>
                <p className="text-md md:text-xl text-gray-600 mt-4">
                    Find out about the evolution of oral health care
                </p>
                <hr className='mt-5'></hr>
                <div className='text-center items-center justify-center flex flex-col md:flex-row'>
                    <div className='flex-initial mx-2 md:mr-10 max-w-4xl'>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-purple-500 mt-10">
                            Why WhiteStone?
                        </h1>
                        <p className='text-black mt-5 text-lg text-center'>
                            When we started our work on WhiteStone we had one question we asked ourselves.
                        </p>
                        <p className='text-black text-xl md:text-2xl mt-4'><b>"How can we make dental care more accessible for those who need it?"</b></p>
                        <div className='text-center items-center justify-center flex'>
                            <p className='text-black mt-5 text-lg text-justify max-w-2xl'>After careful planning, we felt that putting the right tools in the hands of those individuals for free will achieve our goal. <b>1 in 3 Canadians lack proper access to dental care</b> and dental care knowledge. We hope with WhiteStone that we can lower the amount of individuals that are in dire need of dental health information and care resources.</p>
                        </div>
                    </div>
                </div>
                <hr className='mt-10'></hr>
                <div className='text-center items-center justify-center flex flex-col md:flex-row'>
                    <div className='mt-4 flex text-center items-center justify-center max-w-3xl'>
                        <div className='flex-initial row mx-2 md:mr-10'>
                            <h1 className="text-2xl md:text-4xl font-extrabold text-purple-500">Bringing Back Smiles</h1>
                            <p className='text-black mt-5 text-justify px-3 text-lg'>Our Goal with WhiteStone is create an <b>affordable alternative</b> to in person oral consultation. WhiteStone utilizes machine learning technology paired with your phone or computers camera to scan and quickly determine any possible oral afflictions you may be facing, then recommend your next steps for possible healthcare actions to improve your oral health.</p>
                        </div>
                        <Image
                            className="h-auto w-full sm:w-64 md:w-80 mx-2"
                            src="/image/Scan Pic.png"
                            alt="Placeholder"
                            layout="responsive"
                            width={260}
                            height={160}
                        />
                    </div>
                </div>
                <hr className='mt-4'></hr>
                <div className='text-center items-center justify-center flex flex-col md:flex-row'>
                    <div className='mt-4 flex text-center items-center justify-center max-w-3xl'>
                        <Image
                            className="h-auto w-full sm:w-64 md:w-80 mx-2"
                            src="/image/Scan Details.png"
                            alt="Placeholder"
                            layout="responsive"
                            width={280}
                            height={170}
                        />
                        <div className='flex-initial row mx-2 md:ml-10'>
                            <h1 className="text-2xl md:text-4xl font-extrabold text-purple-500">Track Your Progress</h1>
                            <p className='text-black mt-5 text-justify px-3 text-lg'>Follow your own dental health journey as the WhiteStone app tracks and documents each new scan. With a log of your previous dental scans, you can <b>gain dental care insights</b> into what oral care practices have been effective for you. </p>
                        </div>
                    </div>
                </div>
                <hr className='mt-4'></hr>
                <div className='text-center items-center justify-center flex flex-col md:flex-row'>
                    <div className='mt-4 flex text-center items-center justify-center max-w-3xl'>
                        <div className='flex-initial row mx-2 md:mr-10'>
                            <h1 className="text-2xl md:text-4xl font-extrabold text-purple-500">Learn About Your Teeth</h1>
                            <p className='text-black mt-5 text-justify px-3 text-lg'>Find informational <b>dental care resources</b> relating directly to your scan results in the app. Pair the effective dental scans with relevant oral care practices to immediately improve the health of your teeth.</p>
                        </div>
                        <Image
                            className="h-auto w-full sm:w-64 md:w-80 mx-2"
                            src="/image/Health Resources.png"
                            alt="Placeholder"
                            layout="responsive"
                            width={270}
                            height={180}
                        />
                    </div>
                </div>
                <hr className='mt-4'></hr>
                <div className='flex text-center items-center justify-center mt-10'>
                    <div className='bg-purple-200 rounded-md'>
                        <p className="text-gray-700 mb-2.5">
                            Try Our Demo
                        </p>
                        <Link href="/scan" className="bg-purple-500 text-white px-5 py-3 rounded-full">
                            Check It Out
                        </Link>
                    </div>
                </div>
                <hr className='mt-10'></hr>
                <div className=''>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mt-6">Contact Us</h1>
                    <p className='text-black mt-2'><b>Email:</b><Link href="mailto:White.Stone.23@gmail.com"> White.Stone.23@gmail.com</Link></p>
                    <p className='text-black mt-2'><b>Blog:</b><Link href="https://whitestone23.wixsite.com/whitestone">WhiteStone</Link></p>
                </div>
            </div>
        </div>
    );
};
