"use client";


import React, { useState } from 'react';


interface CollapsibleListItemProps {
 title: string;
 content: JSX.Element;
}


const CollapsibleListItem: React.FC<CollapsibleListItemProps> = ({ title, content }) => {
 const [isOpen, setIsOpen] = useState(false);


 const toggleItem = () => setIsOpen(!isOpen);


 return (
   <div className="mb-4">
     <button
       className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
       onClick={toggleItem}
     >
       <span className="font-semibold">{title}</span>
       <svg
         className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
         fill="none"
         stroke="currentColor"
         viewBox="0 0 24 24"
       >
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
       </svg>
     </button>
     <div className={`${isOpen ? 'block' : 'hidden'} px-4 pt-4 pb-2 text-gray-800 bg-white rounded-b-lg`}>
       {content}
     </div>
   </div>
 );
};


const CollapsibleList: React.FC = () => {
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
       <CollapsibleListItem key={index} title={item.title} content={item.content} />
     ))}
   </div>
 );
};


export default CollapsibleList;


