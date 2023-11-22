import { useTheme } from "next-themes";
import { twMerge } from 'tailwind-merge';
import SaveButton from "@/components/SaveButton";
import CancelButton from "@/components/CancelButton";
import NavBar from "@/components/NavBar";

export default function ChangeEmailPage() {

    return (
        <div className={twMerge('flex flex-col items-center mb-5')}>
            <h1 className={twMerge('text-black text-4xl mb-5 dark:text-white')}>Change Email</h1>
            <p>Your current email is johndoe123@gmail.com</p>
            <div>
             <input className="w-300 h-12 px-5 rounded-lg bg-white shadow-inner ring-1 ring-black/5" placeholder="New Email Address"/>
            </div>
            <div>
                <CancelButton />
                <SaveButton />
            </div>
            <div>
                <NavBar/>
            </div>
        </div>
    );
}