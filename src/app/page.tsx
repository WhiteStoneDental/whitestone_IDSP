//src/app/page.tsx
'use client';
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import ClientComponent from '@/components/ClientComponent';
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })




export default function MainPhrase() {
  return (
    <div className="h-screen bg-gray-10 flex flex-col items-center justify-center min-h-screen">
      <ClientComponent />
      <div className="items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to WhiteStone</h1>
        <p className="text-sm">Your personal dental assistant</p>
      </div>
    </div>
  );
}