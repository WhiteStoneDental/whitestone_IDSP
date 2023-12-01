import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhiteStone 🦷",
  description: "Your Personal Dental Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
      </head>
      <body className={`${mulish.className}  `}>{children}</body>
    </html>
  );
}
