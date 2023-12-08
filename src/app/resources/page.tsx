"use client";

import NavBar from "@/components/NavBar";
import CollapsibleList from "@/components/CollapsibleListItem";
import LoginButton from "@/components/LoginButton";
import Accordion from "@/components/Accordion";

export default function ResourcePage() {
  return (
    <div className="flex flex-col p-5 mb-5 gradient-bg">
      <div className="flex flex-col items-center mt-20 mb-10 font-bold text-6xl text-center text-white">
        Health Resources
      </div>
      <div className="bg-white p-5 rounded-xl h-full w-full overflow-hidden  dark:bg-[var(--mainphrase-bg)]">
        <div className="placeholder-content text-black dark:text-white text-center font-bold text-xl mt-5 mb-8">
          Learn More About Oral Health
        </div>
        <Accordion />
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
