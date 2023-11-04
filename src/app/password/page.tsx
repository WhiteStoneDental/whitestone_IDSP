"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  type PasswordField = 'current' | 'new' | 'confirm';

  const togglePasswordVisibility = (field: PasswordField) => {
    setShowPassword(prevState => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      // API call to change password or any other logic
      console.log("Updated Password");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="p-4">
      <Link href="/user" passHref>
        <button className="text-blue-500">{'<'}</button>
      </Link>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Current Password</label>
        <div className="relative">
          <input 
            type={showPassword.current ? "text" : "password"} 
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="mt-2 px-4 py-2 w-full rounded-md border border-gray-300 pr-10"
          />
          <span className="absolute inset-y-0 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => togglePasswordVisibility('current')}>
            {showPassword.current ? '🙈' : '👁️'}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <div className="relative">
          <input 
            type={showPassword.new ? "text" : "password"} 
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="mt-2 px-4 py-2 w-full rounded-md border border-gray-300 pr-10"
          />
          <span className="absolute inset-y-0 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => togglePasswordVisibility('new')}>
            {showPassword.new ? '🙈' : '👁️'}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Retype New Password</label>
        <div className="relative">
          <input 
            type={showPassword.confirm ? "text" : "password"} 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="mt-2 px-4 py-2 w-full rounded-md border border-gray-300 pr-10"
          />
          <span className="absolute inset-y-0 right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => togglePasswordVisibility('confirm')}>
            {showPassword.confirm ? '🙈' : '👁️'}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button className="flex-1 px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button onClick={handlePasswordChange} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
