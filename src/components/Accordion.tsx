// src/components/Accordion.tsx
'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface AccordionItemProps {
  title: string;
  symptoms: string;
  details: string;
  treatment: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, symptoms, details, treatment }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="mb-5 font-sans">
      <div
        className="flex items-center justify-between p-3 bg-white-300 cursor-pointer rounded"
        onClick={toggleAccordion}
      >
        <span className="font-bold text-l text-black dark:text-white">
          {title}
        </span>
        <svg
          className="w-4 h-4 transform transition-transform"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15a.5.5 0 0 1-.354-.854l7-7a.5.5 0 0 0-.708-.708L8 13.293 1.062 6.354a.5.5 0 0 0-.708.708l7 7a.5.5 0 0 1-.354.854z"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="p-4 bg-white border rounded-b-lg dark: dark:bg-[var(--mainphrase-bg)]">
          <p className="text-black dark:text-white"><strong>Main Symptoms:</strong> {symptoms}</p>
          <p className="text-black dark:text-white mt-2"><strong>Treatment:</strong> {treatment}</p>
          <p className="text-black dark:text-white mt-2"><strong>Details:</strong> {details}</p>
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const [data, setData] = useState<{ issues: AccordionItemProps[] } | null>(null);

  useEffect(() => {
    import("../../public/data/dentalIssues.json").then((module) => {
      setData(module.default);
    });
  }, []);

  if (!data) {
    return null;
  }

  const items = data.issues;

  return (
    <div className="w-full max-w-md mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          symptoms={item.symptoms}
          treatment={item.treatment}
          details={item.details}
        />
      ))}
    </div>
  );
};

export default Accordion;
