import { useTheme } from "next-themes";
import { twMerge } from 'tailwind-merge';
import { BaseButton } from "@/components/BaseButton";
import ArrowIcon from "@/components/ArrowIcon";
import FooterButtons from "@/components/FooterButtons";

export default function HealthResourcesPage() {
    return (
        <div className={twMerge('flex flex-col p-5 bg-gradient-to-br from-24008C to-641A99 via-9D32A5 h-screen')}>
            <header>
                <div className={twMerge('flex flex-col items-center mb-5')}>
                    <h1 className={twMerge('text-black text-4xl mb-5 dark:text-white')}>Health Resources</h1>
                </div>
            </header>

            <main className={twMerge('flex flex-col items-center flex-grow pb-16')}>
                <p>Learn more about gingivitis</p>
                <div className={twMerge('mt-4')}>
                    <BaseButton>
                        bleeding gums
                        <ArrowIcon />
                    </BaseButton>
                </div>
            </main>

            <footer>
                <FooterButtons />
            </footer>
        </div>
    );
}
