"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import ArrowIconMin from "@/components/ArrowIconMin";
import Image from "next/image";
import CustomSwitch from "@/components/CustomSwitch";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   const savedTheme = localStorage.getItem("darkMode");
  //   return savedTheme === "true" ? true : false;
  // });

  // useEffect(() => {
  //   setUserData({
  //     username: "SampleUser",
  //     email: "sample@example.com",
  //     password: "******",
  //   });
  // }, [3000]);

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.body.classList.add("dark");
  //     localStorage.setItem("darkMode", "true");
  //   } else {
  //     document.body.classList.remove("dark");
  //     localStorage.setItem("darkMode", "false");
  //   }
  // }, [isDarkMode]);

  // const handleThemeChange = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    try {
      // Send a request to your server to update the user's data
      // Replace this with your actual update API endpoint and method (e.g., POST).
      const response = await fetch("/api/updateUser", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Data updated successfully, you can provide user feedback here
        alert("User data updated successfully!");
      } else {
        // Handle errors and provide user feedback on failure
        alert(`User data update failed: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        // Now TypeScript knows that 'error' is of type Error and has a 'message' property
        alert(`An error occurred while updating user data: ${error.message}`);
      } else {
        // Handle cases where the error is not an Error instance
        alert("An unknown error occurred while updating user data.");
      }
    }
  };
  return (
    <div className="flex flex-col p-5 max-h-screen items-center gradient-bg">
      {/* <LoginButton /> */}
      <div className="flex flex-col p-5">
        <div className="relative mx-auto mb-5">
          <div className="rounded-full border-4 border-white">
            <Image
              src="/image-placeholder.jpg"
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover mx-auto"
              width={24}
              height={24}
            />
          </div>
        </div>
        <input
          className="relative mx-auto hidden"
          id="files"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <label
          className="relative mx-auto bg-white rounded-md font-bold w-36 h-6 text-center text-black"
          htmlFor="files"
        >
          Change Photo
        </label>
      </div>

      <div className="bg-white p-10 rounded-xl h-screen max-w-screen-lg overflow-hidden dark:bg-[var(--mainphrase-bg)]">
        <h1 className="text-4xl mt-30 mb-10">Account Information</h1>
        <div className="mb-10">
          <label className="text-xl">Name</label>
          <div className="relative flex">
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              disabled={true}
            />
            <Image
              src="/edit-icon.svg"
              alt="Home"
              width={6}
              height={6}
              className="w-6 h-6 mb-1 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-10">
          <div className="mb-4 flex flex-row justify-between">
            <button className="items-center	text-xl flex min-w-full object-right justify-between mt-2">
              Username <ArrowIconMin />
            </button>
          </div>
          <div className="border-t border-gray-300 my-1"></div>
          <div className="mb-4 flex flex-row justify-between">
            <button className="items-center	text-xl flex min-w-full object-right justify-between mt-2">
              Email <ArrowIconMin />
            </button>
          </div>
          <div className="border-t border-gray-300 my-1"></div>
          <div className="mb-4 flex flex-row justify-between">
            <button className="items-center	text-xl flex min-w-full object-right justify-between mt-2">
              Password <ArrowIconMin />
            </button>
          </div>
          <div className="border-t border-gray-300 my-1"></div>
        </div>
        <div className="mb-4">
          <h1 className="text-4xl mt-30 mb-10 font-bold">Display</h1>
          <label className="mb-4 flex flex-row justify-between">
            <span className="text-xl">Dark mode</span>
            <CustomSwitch />
          </label>
          <div className="border-t border-gray-300 my-4"></div>
          <div></div>
        </div>
        {/* <div className="mb-4">
          <h1 className="text-4xl mt-30 mb-10">Display</h1>
          <label className=
            "mb-4 flex flex-row justify-between"
          >
            <span className="text-xl">Dark mode</span>
             <Switch
          onChange={handleThemeChange}
          checked={isDarkMode}
          uncheckedIcon={false}
          />
          </label>
          <div className="border-t border-gray-300 my-4"></div>
          <div>

          </div>
        </div> */}
        {/* <div>
          <SaveButton />
          <CancelButton />
        </div> */}
      </div>

      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default SettingsPage;
