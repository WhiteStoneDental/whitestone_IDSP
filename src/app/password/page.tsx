import SaveButton from "@/components/SaveButton";
import CancelButton from "@/components/CancelButton";
import NavBar from "@/components/NavBar";

export default function ChangePasswordPage() {

    return (
        <div className='flex flex-col items-center mb-5'>
            <h1 className='text-black text-4xl mb-5 dark:text-white'>Change Password</h1>
            <div className='flex flex-col gap-5'>
             <input type="password" className="w-300 h-12 px-5 rounded-lg bg-white shadow-inner ring-1 ring-black/5" placeholder="Current Password"/>
             <input type="password" className="w-300 h-12 px-5 rounded-lg bg-white shadow-inner ring-1 ring-black/5" placeholder="New Password"/>
             <input type="password" className="w-300 h-12 px-5 rounded-lg bg-white shadow-inner ring-1 ring-black/5" placeholder="Retype New Password"/>

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