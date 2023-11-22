import { twMerge } from "tailwind-merge";
import NavBar from "@/components/NavBar";
import Accordion from "@/components/Accordian";

export default function ResourcePage() {


    return (
        <div
            className={twMerge("flex flex-col p-5 h-screen")}
            style={{
                backgroundImage:
                    "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
            }}
        >
            <div className={twMerge("flex flex-col items-center mb-5 font-bold text-6xl text-center")}>
                Health Resources
            </div>
            <div className={twMerge("bg-white p-5 rounded-xl h-screen w-full overflow-hidden")}>

                <div className={twMerge("placeholder-content dark:text-black text-center font-bold text-xl mt-5 mb-8")}>
                    Learn More About Oral Health
                </div>
                <Accordion />
            </div>
            <div>
                <NavBar />
            </div>
        </div>
    );
}
