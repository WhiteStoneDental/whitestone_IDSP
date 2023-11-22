'use client';

import { useState, useEffect } from 'react';
import SaveButton from '@/components/SaveButton';
import CancelButton from '@/components/CancelButton';
import NavBar from '@/components/NavBar';
import LoginButton from "@/components/LoginButton";
import ArrowIconMin from '@/components/ArrowIconMin';
import Switch from "react-switch";
import { twMerge } from "tailwind-merge";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Simulate fetching user data from your backend or a data source
    // and populate the userData state.
    // Replace this with an actual fetch request.
    setUserData({
      username: 'SampleUser',
      email: 'sample@example.com',
      password: '******',
    });
  }, [3000]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    try {
      // Send a request to your server to update the user's data
      // Replace this with your actual update API endpoint and method (e.g., POST).
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Data updated successfully, you can provide user feedback here
        alert('User data updated successfully!');
      } else {
        // Handle errors and provide user feedback on failure
        alert(`User data update failed: ${response.statusText}`);
      }
    } catch (error) {
      // Handle network or other errors and provide user feedback
      alert(`An error occurred while updating user data: ${error.message}`);
    }
  };

  return (
    <div
      className={twMerge("flex flex-col p-5 min-h-screen")}
      style={{
        backgroundImage:
          "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
      }}
    >
      <LoginButton />
      <div className="flex flex-col p-5">
        <div className="relative mx-auto mb-5">
          <div className="rounded-full border-4 border-white">
            <img
              src="/image-placeholder.jpg"
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />

          </div>
        </div>
        <input className="relative mx-auto" type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>

      <div className="bg-white p-5 rounded-xl h-screen w-full overflow-hidden">
        <h1 className="text-4xl mt-30 mb-10">Account Information</h1>
        <div className="mb-10">
          <label className="text-xl">Name</label>
          <div className='relative flex'>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            disabled={true}
            style={{ backgroundColor: '#fff' }}
          />
          <img src="/edit-icon.svg" alt="Home" className="w-6 h-6 mb-1 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </div>
        </div>
        <div className="mb-10">
          <div className={twMerge(
            "mb-4 flex flex-row justify-between"
          )}>
            <button className="text-xl">Username</button>
            <ArrowIconMin />
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className={twMerge(
            "mb-4 flex flex-row justify-between"
          )}>
            <button className="text-xl">Email</button>
            <ArrowIconMin />
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className={twMerge(
            "mb-4 flex flex-row justify-between"
          )}>
            <button className="text-xl">Password</button>
            <ArrowIconMin />
          </div>
          <div className="border-t border-gray-300 my-4"></div>
        </div>
        <div className="mb-4">
          <h1 className="text-4xl mt-30 mb-10">Display</h1>
          <label className={twMerge(
            "mb-4 flex flex-row justify-between"
          )}>
            <span className="text-xl">Dark mode</span>
            <Switch uncheckedIcon={false}/>
          </label>
          <div className="border-t border-gray-300 my-4"></div>
          <div>

          </div>
        </div>
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
