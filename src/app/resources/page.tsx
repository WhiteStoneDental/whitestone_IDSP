import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";

import NavBar from "@/components/NavBar";

export default function ResourcePage() {
    const isLoggedIn = false;

    return (
        <div
            className="flex flex-col p-5 h-screen"
            style={{
                backgroundImage:
                    "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
            }}
        >
            <div className="flex flex-col items-center mb-5">
                <h1 className="text-white text-4xl mb-5 dark:text-white">
                    Health Resources
                </h1>
            </div>

            <div className="bg-white p-5 rounded-xl h-screen w-full overflow-hidden flex flex-col items-center">
                <h1 className="text-3xl mt-30 mb-90">Learn more about oral health</h1>

                <div className="flex flex-row justify-around p-10">
                    <div className="mr-2">Bleeding gums</div>
                    <div className="w-6 h-6"> <ArrowIcon /></div>
                    <br/>
                </div>

                <div className="flex flex-row justify-around p-10">
                    <div className="mr-2">Swollen and red gums</div>
                    <div className="w-6 h-6"> <ArrowIcon /></div>
                    <br/>
                </div>

                <div className="flex flex-row justify-around p-10">
                    <div className="mr-2">Gum sensitivity</div>
                    <div className="w-6 h-6"> <ArrowIcon /></div>
                    <br/>
                </div>
            </div>


            <div>
                <NavBar />
            </div>
        </div>
    );
}
