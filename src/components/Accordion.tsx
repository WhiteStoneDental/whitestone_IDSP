"use client";
import Link from "next/link";
import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: JSX.Element;
  link?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  link,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };
// const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, link }) => {
//   const [isOpen, setIsOpen] = useState(false);
 
 
//   const toggleAccordion = () => setIsOpen(!isOpen);
 

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
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
        <div className="p-4 bg-white border rounded-b-lg dark:bg-[var(--mainphrase-bg)]">
          <p className="text-black dark:text-white">{content}</p>
          {link && (
            <div className="text-right underline text-purple-700 hover:text-purple-900">
              <Link href={link}>
                <a>Read more</a>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


const Accordion: React.FC = () => {
  const items = [
    {
      title: 'Tooth Decay and Cavities',
      content: (
        <ul className="list-disc list-inside space-y-2">
          Main Symptoms:
          <p></p>
          <li>Toothache</li>
          <li>Sensitivity</li>
          <li>Visible holes</li>
          <li>Staining</li>
          <p></p>
          Causes include:
          <p></p>
          <li>Poor oral hygiene</li>
          <li>Sugary diet</li>
          <li>Lack of fluoride</li>
        </ul>
      ),
    },
    {
      title: 'Gingivitis',
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Early stage of gum disease.</li>
          <li>Characterized by red, swollen gums that bleed easily.</li>
          <li>Often caused by plaque buildup.</li>
        </ul>
      ),
    },
    {
      title: 'Periodontitis',
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Advanced stage of gum disease.</li>
          <li>Characterized by receding gums and bone loss.</li>
          <li>Can lead to tooth loss.</li>
        </ul>
      ),
    },
    {
      title: 'Bad Breath',
      content: (
        <ul className="list-disc list-inside space-y-2">
          Also known as halitosis.
          <p></p>
          <p></p>
          Can be caused by:
          <p></p>
          <li>Food particles</li>
          <li>Tobacco products</li>
          <li>Poor dental hygiene</li>
          <li>Dry mouth</li>
          <li>Infections in the mouth.</li>
        </ul>
      ),
    },
    {
      title: 'Tooth Sensitivity',
      content: (
        <ul className="list-disc list-inside space-y-2">
          Main Symptoms:
          <p></p>
          <li>Pain</li>
          <p></p>
          Discomfort when:
          <p></p>
          <li>Consuming hot, cold, sweet, acidic foods and drinks</li>
          <p></p>
          Can be caused by:
          <p></p>
          <li>Tooth decay</li>
          <li>Worn enamel</li>
          <li>Gum disease</li>
          <li>Exposed tooth roots</li>
        </ul>
      ),
    },
    {
      title: 'Dry Mouth',
      content: (
        <ul className="list-disc list-inside space-y-2">
          Discomfort or pain in teeth when:
          <p></p>
          <li>Encountering certain substances and temperatures</li>
          <p></p>
          Causes includes: 
          <p></p>
          <li>Worn tooth enamel</li>
          <li>Exposed tooth roots</li>
          <li>Cavities</li>
          <li>Cracked teeth</li>
          <li>Worn fillings</li>
          <li>An exposed tooth root</li>
        </ul>
      ),
    },
    {
      title: 'Oral Cancer',
      content: (
        <ul className="list-disc list-inside space-y-2">
          Includes:
          <p></p>
          <li>Cancer of the mouth</li>
          <li>Tongue</li>
          <li>Cheek</li>
          <li>Throat</li>
          <li>Lips</li>
          <p></p>
          Risk factors:
          <p></p>
          <li>Tobacco use</li>
          <li>Heavy alcohol use</li>
          <li>HPV infection</li>
          <li>Poor diet</li>
          <li>Sun exposure to lips</li>
          <p></p>
          Symptoms:
          <li>Sores, lumps, or rough areas in the mouth</li>
        </ul>
      ),
    },
    {
      title: 'Wisdom Teeth Issues',
      content: (
        <ul className="list-disc list-inside space-y-2">
          Problems occur when these teeth are:
          <p></p>
          <li>Misaligned</li>
          <li>Impacted</li>
          <li>Partially erupted</li>
          <p></p>
          Can cause pain, infection, crowding or damage to other teeth.
        </ul>
      ),
    },
    {
      title: 'Bruxism',
      content: (
        <ul className="list-disc list-inside space-y-2">
          Often caused by stress, anxiety, or misaligned teeth.
          <p></p>
          <p></p>
          Symptoms includes:
          <p></p>
          <li>Worn-down teeth</li>
          <li>Jaw pain</li>
          <li>Headaches</li>
          <li>Earaches</li>
          <li>Damaged teeth</li>
        </ul>
      ),
    },
    {
      title: 'Orthodontic Problems',
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>Misaligned teeth and jaws, overbites, underbites, spacing issues.</li>
          Can lead to:
          <li>Difficulty chewing</li>
          <li>Speech problems</li>
          <li>Oral hygiene challenges</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
 };

export default Accordion;
