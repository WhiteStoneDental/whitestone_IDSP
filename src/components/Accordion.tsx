"use client"
import React, { useState } from 'react';

interface AccordionItemProps {
    title: string;
    content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="mb-5 font-sans ">
            <div
                className="flex items-center justify-between p-3 bg-white-300 cursor-pointer rounded"
                onClick={toggleAccordion}
            >
                <span className="font-bold text-l text-black dark:text-white">{title}</span>
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
                    <p className="text-black dark:text-white">{content}</p>
                </div>
            )}
        </div>
    );
};

const Accordion = () => {
    const items = [
        { title: 'Bleeding Gums', content: 'Main Symptoms: bleeding, swollen, red, bad breath, tenderness' },
        { title: 'Swollen and Red Gums', content: 'Content' },
        { title: 'Gum Sensitivity', content: 'Content' },
        { title: 'Gum Inflammation', content: 'Content' },
        { title: 'Gap Between Teeth and Gums', content: 'Content' },
        { title: 'Gum Recession', content: 'Content' },
        { title: 'Cavities', content: 'Content' },
        { title: 'Section 8', content: 'Content' },
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
