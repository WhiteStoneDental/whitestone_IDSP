import NavBar from "@/components/NavBar";
import Accordion from "@/components/Accordion";
import LoginButton from "@/components/LoginButton";
import { twMerge } from "tailwind-merge";

export default function ResourcePage() {


    return (
        <div
            className={twMerge("flex flex-col p-5 h-screen")}
            style={{
                backgroundImage:
                    "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
            }}
        >
            <div className={twMerge("flex flex-col items-center mt-20 mb-5 font-bold text-6xl text-center text-white")}>
                Health Resources
            </div>
            <div className="bg-white p-5 rounded-xl h-screen w-full overflow-hidden  dark:bg-[var(--mainphrase-bg)]">

                <div className= {twMerge("placeholder-content text-black dark:text-white text-center font-bold text-xl mt-5 mb-8")} >
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
