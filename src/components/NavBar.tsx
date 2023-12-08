"use client";

import Link from 'next/link';
import Image from 'next/image';
import Home from '@/../public/Home.svg'
import Settings from '@/../public/Settings.svg'
import Resources from '@/../public/Resources.svg'
import HomeDark from '@/../public/Home-dark.svg'
import SettingsDark from '@/../public/Settings-dark.svg'
import ResourcesDark from '@/../public/Resources-dark.svg'
import HistoryIcon from './IconHistory';
import ScanIcon from "./IconScan";
import { useEffect, useState } from 'react'


export default function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setIsDarkMode(darkMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <nav className={`items-center fixed bottom-0 left-0 right-0 flex justify-between py-2.5 px-4 shadow-t ${isDarkMode ? 'dark:bg-[var(--mainphrase-bg)]' : 'bg-white text-black'}`}>
      <Link href="/settings">
        <div className="flex flex-col items-center text-sm">
          <i className="fas fa-home text-2xl mb-1"></i>
          <Image src={isDarkMode ? SettingsDark : Settings} alt="Settings icon" className="w-8 h-8 mb-1" />
        </div>
      </Link>
      <Link href="/history">
        <div className="flex flex-col items-center text-sm">
          <HistoryIcon color={isDarkMode ? '#F6DFFF' : '#641A99'} />
        </div>
      </Link>
      <Link href="/home">
        <div className="flex flex-col items-center text-sm">
          <i className="fas fa-search text-2xl mb-1"></i>
          <Image src={isDarkMode ? HomeDark : Home} alt="Home icon" className="w-8 h-8 mb-1" />
        </div>
      </Link>
      <Link href="/scan">
        <div className="flex flex-col items-center text-sm">
          <ScanIcon size={35} color={isDarkMode ? '#F6DFFF' : '#641A99'} />
        </div>
      </Link>
      <Link href="/resources">
        <div className="flex flex-col items-center text-sm">
          <i className="fas fa-user text-2xl mb-1"></i>
          <Image src={isDarkMode ? ResourcesDark : Resources} alt="Resources icon" className="w-8 h-8 mb-1" />
        </div>
      </Link>
    </nav>
  );
}