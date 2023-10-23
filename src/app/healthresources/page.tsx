import { useTheme } from "next-themes";
import { twMerge } from 'tailwind-merge';
import { BaseButton } from "@/components/BaseButton";
import ArrowIcon from "@/components/ArrowIcon";

export default function HealthResourcesPage() {

    return (
        <div className={twMerge('flex flex-col items-center mb-5')}>
            <h1 className={twMerge('text-black text-4xl mb-5 dark:text-white')}>Health Resources</h1>
            <p>Learn more about gingivitis</p>
            <div>
                <BaseButton>
                    bleeding gums
                    <ArrowIcon />
                </BaseButton>
            </div>
        </div>
    );
}