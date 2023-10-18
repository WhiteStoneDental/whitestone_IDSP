import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ScanButtonProps {
    details: string;
}

export default function ScanButton({ details }: ScanButtonProps) {
    return (
        <div className={twMerge('bg-gray-100 p-3 rounded-xl mb-3')}>
            <div className={twMerge('w-full h-32 bg-gray-300 rounded-xl mb-3 ')}></div>
            <div className={twMerge('dark:text-black')} >{details}</div>
        </div>
    );
}
