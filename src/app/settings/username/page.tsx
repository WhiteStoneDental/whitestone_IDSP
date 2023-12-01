import SaveButton from "@/components/SaveButton";
import CancelButton from "@/components/CancelButton";
import NavBar from "@/components/NavBar";

export default function ChangeUsernamePage() {
  return (
    <div className="flex flex-col items-center mb-5">
      <h1 className="text-black text-4xl mt-30 mb-10 dark:text-white">
        Change Username
      </h1>
      <div>
        <input
          className="w-70vw h-12 px-5 rounded-lg ml-100 mr-50 bg-white shadow-inner ring-1 ring-black/5"
          placeholder="johndoe123"
        />
      </div>
      <div className="flex items-end">
        <CancelButton />
        <SaveButton />
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
