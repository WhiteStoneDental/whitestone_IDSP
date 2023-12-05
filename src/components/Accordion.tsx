"use client";
import React, { useState } from "react";
import Link from "next/link";

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

  return (
    <div className="mb-5 font-sans">
      <div
        className="flex items-center justify-between px-4 py-2 text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="font-semibold text-l text-black dark:text-white">
          {title}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 15a.5.5 0 0 1-.354-.854l7-7a.5.5 0 0 0-.708-.708L8 13.293 1.062 6.354a.5.5 0 0 0-.708.708l7 7a.5.5 0 0 1-.354.854z"
          />
        </svg>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} px-4 pt-4 pb-2 text-gray-800 bg-white rounded-b-lg`}>
        <p className="text-black dark:text-white">{content}</p>
        {link && (
          <div className="text-right underline text-purple-700 hover:text-purple-900">
            <Link href={link}>
              <a>Read more</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Accordion: React.FC = () => {
  const issues = [
    {
      title: "Tooth Decay",
      symptoms: "Tooth decay occurs when bacteria form a film, called plaque, on the surface of teeth. The bacteria produce acids from the sugars in food. The acids eat away at and permanently damage the enamel, or outer layer, of the tooth. The acids then start working on the softer dentin layer beneath the enamel. This breakdown of the tooth can lead to cavities or holes in your teeth. It can also cause toothaches, including pain when you eat and drink hot, cold, or sweet things.",
      treatment: "removing the decayed portion and restoring the tooth with fillings, crowns, or other dental procedures.",
      details: "Tooth decay is also known as dental caries or dental cavities. It is the most common dental problem that dentists see in patients. Practically everyone, at some point in their life, has experienced tooth decay."
    },

    {
      title: "Gum Disease",
      symptoms: "Gums that are red, swollen, and bleed easily. You may also experience bad breath and sensitive teeth that hurt when you chew.",
      treatment: "Gingivitis can be treated by a thorough cleaning from your dental health professional. To prevent it from coming back, you will have to practice twice-daily brushing and flossing. Left untreated, gingivitis can become a more severe form of gum disease called periodontitis. This is when pockets in the gum become infected. This can lead to damage of the bone and tissue that hold the teeth, as these, too, become infected. ",
      details: "Tooth erosion is the gradual loss of tooth enamel, often caused by acid. Symptoms include tooth sensitivity, discoloration, and rounded edges. Common causes include acidic foods, beverages, or conditions like acid reflux. It can also lead to shrinking and receding gums, loose permanent teeth, a change in bite, an unpleasant taste in the mouth, and persistent bad breath."
    },
    {
      title: "Bad Breath",
      symptoms: "Bad breath can be persistent and distressing, caused by various factors.",
      treatment: "Treatment involves a complete assessment by a dentist and a course of action tailored to the individual case.",
      details: "Bad breath, or halitosis, can be caused by poor oral hygiene, dry mouth, medication, infection, acid reflux, cancer, and certain foods like garlic and onion. Proper diagnosis is essential to determine the underlying cause and to provide effective treatment."
    },
    {
      title: "Tooth Sensitivity",
      symptoms: "Intense pain when consuming hot or cold foods and drinks, due to exposure of the dentin and its tubes leading to the nerve.",
      treatment: "Use of special toothpaste and mouthwashes for sensitive teeth, fluoride treatments, crowns, gum grafts, or root canals, depending on severity.",
      details: "Tooth sensitivity, or dentin hypersensitivity, can be caused by enamel wear exposing dentin, tooth decay, gum disease, root infection, cracked or broken teeth, worn-down crowns or fillings, enamel erosion, or naturally thin enamel. The treatment chosen depends on the underlying cause and severity of the condition."
    },
    {
      title: "Cracked or Broken Teeth",
      symptoms: "Pain that varies depending on the extent of the damage. The severity of the crack or break can influence the level of discomfort.",
      treatment: "Treatment options include veneers, crowns, or tooth-colored fillings, depending on the extent of the damage.",
      details: "Cracked or broken teeth can be caused by injury, chewing hard foods, mouth piercings, or teeth grinding during sleep. It's important to have any crack or break examined and treated by a dentist as soon as possible to prevent further damage and manage pain."
    },
    {
      title: "Receding Gums",
      symptoms: "Exposure of the delicate root of the tooth, making it susceptible to damage, potentially leading to tooth loss.",
      treatment: "Dental care includes thorough cleaning by a professional, instruction in proper brushing techniques, and in severe cases, a gum graft or surgery.",
      details: "Receding gums can be caused by poor oral hygiene, brushing too hard, high blood pressure, hormonal fluctuations in women, smoking, or genetics. It's a condition that exposes tooth roots and can lead to serious dental issues, emphasizing the need for proper dental care and treatment."
    },
    {
      title: "Root Infection",
      symptoms: "Chronic, persistent throbbing toothache, pain while chewing and biting, sensitivity to hot and cold foods and drinks, and potential facial swelling around the infection.",
      treatment: "Treatment typically involves a root canal procedure, which is safe and generally causes minimal pain due to the use of anesthetics.",
      details: "Root infections occur due to cavities, cracks, or fractures in the tooth, leading to bacterial infection of the tooth's root. This can cause damage to tissues and nerves, and possibly lead to abscesses. Despite common fears, modern root canal treatments are safe and relatively pain-free."
    },
    {
      title: "Enamel Erosion",
      symptoms: "Discoloration and rounded appearance of teeth, increased sensitivity, and susceptibility to cracks, chips, and cupping.",
      treatment: "Preventive measures include reducing sugary and acidic food intake, using softer toothbrushes, and dental veneers for aesthetic improvement.",
      details: "Enamel erosion occurs gradually, often due to the consumption of sugary and acidic foods like soda and sweets. Excessive or aggressive tooth brushing can also contribute to this condition. While lost enamel cannot be restored, preventive steps can be taken to halt further erosion and improve the appearance of affected teeth."
    },
    {
      title: "Dry Mouth",
      symptoms: "A persistent feeling of dryness in the mouth and throat, which can occur in individuals of any age.",
      treatment: "Relief can be found by regularly sipping water, avoiding drying substances like alcohol, tobacco, caffeine, and sweets.",
      details: "Dry mouth is not necessarily a natural part of aging but is more common in the elderly. It can be caused by factors such as cancer treatments, salivary gland disease, nerve damage, diabetes, HIV/AIDS, and certain medications. Managing the condition involves staying hydrated and avoiding substances that exacerbate dryness."
    },
    {
      title: "Teeth Grinding",
      symptoms: "Damaged teeth, jaw pain, headaches, and earaches. Grinding often occurs during sleep but can also happen while awake.",
      treatment: "Use of a custom-made mouthguard at night to minimize grinding and protect teeth. Treatment may also involve correcting bite issues.",
      details: "Teeth grinding can be caused by dental conditions like a new filling or crown that is higher than other teeth, an abnormal bite, sleep disorders, stress, or anxiety. Treating these underlying issues can help ease or stop grinding."
    }
  ];

  const items = issues.map(issue => ({
    title: issue.title,
    content: (
      <div>
        <div className="mb-2"><strong>Symptoms:</strong> {issue.symptoms}</div>
        <div className="mb-2"><strong>Treatment:</strong> {issue.treatment}</div>
        <div><strong>Details:</strong> {issue.details}</div>
      </div>
    ),
  }));

  return (
    <div className="w-full max-w-md mx-auto">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};


export default Accordion;
