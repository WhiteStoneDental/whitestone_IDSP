"use client"
import React, { useState } from 'react';

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="mb-5 font-sans">
            <div
                className="flex items-center justify-between p-3 bg-purple-300 cursor-pointer rounded"
                onClick={toggleAccordion}
            >
                <span className="font-bold text-l">{title}</span>
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
                <div className="p-4 bg-white border rounded-b-lg">
                    <p className="text-black">{content}</p>
                </div>
            )}
        </div>
    );
};

const Accordion = () => {
    const items = [
        { title: 'Bleeding Gums', content: 'Main Symptoms: bleeding, swollen, red, bad breath, tenderness' },
        { title: 'Section 2', content: 'Content' },
        { title: 'Section 3', content: 'Content' },
        { title: 'Section 4', content: 'Content' },
        { title: 'Section 5', content: 'Content' },
        { title: 'Section 6', content: 'Content' },
        { title: 'Section 7', content: 'Content' },
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
