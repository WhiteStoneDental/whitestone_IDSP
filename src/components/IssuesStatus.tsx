import React from 'react';
import  ArrowIcon  from './ArrowIconMin';


const isDarkBackground = true;
interface StatusIndicatorProps {
    color: string;
    number: number;
    label: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ color, number, label }) => (
    <div className="flex items-center mr-4">
        <span className={`h-1.5 w-2 md:h-4 md:w-4 rounded-full bg-${color}-500 mr-1`}></span>
        <span className={`text-${color}-500`}>{number}</span>
        <span className="text-sm ml-1">{label}</span>
    </div>
);

interface IssuesStatusProps {
    redNumber: number;
    yellowNumber: number;
    greenNumber: number;
}

const IssuesStatus: React.FC<IssuesStatusProps> = ({ redNumber, yellowNumber, greenNumber }) => (
    <div className="mb-4 p-4 border-b">
        <p className="mb-1">Date/Month/Year</p>
        <div className="mb-1 flex items-center">
            <StatusIndicator color="red" number={redNumber} label="Severe Issues" />
            <StatusIndicator color="yellow" number={yellowNumber} label="Moderate Issues" />
            <StatusIndicator color="green" number={greenNumber} label="No Issues" />
            <ArrowIcon />
                 </div>
    </div>
);

export default IssuesStatus;
