'use client';

import { useState, useEffect } from 'react';
import SaveButton from '@/components/SaveButton';
import CancelButton from '@/components/CancelButton';
import NavBar from "@/components/NavBar";

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
      className="flex flex-col p-5 h-screen"
      style={{
        backgroundImage:
          "var(--homepage-gradient, gradient-from-24008C via-9D32A5 to-641A99)",
      }}
    >
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-xl">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="text-xl">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="text-xl">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <SaveButton />
            <CancelButton />
          </div>

        </form>
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default SettingsPage;
