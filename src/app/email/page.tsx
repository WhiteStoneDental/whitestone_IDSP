"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function ChangeEmail() {
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  const handleEmailChange = () => {
    console.log("Updated Email:", newEmail);
    setCurrentEmail(newEmail);
    setNewEmail('');  // clear the input field
  };

  return (
    <div className="p-4">
      <Link href="/user" passHref>
        <button className="text-blue-500">{'<'}</button>
      </Link>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Your current email address is</label>
        <p className="text-blue-500 font-bold mb-2">{currentEmail}</p>
        <label className="block text-sm font-medium text-gray-700">New Email Address</label>
        <div className="relative">
          <input 
            type="email" 
            value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            className="mt-2 px-4 py-2 w-full rounded-md border border-gray-300"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button className="flex-1 px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button onClick={handleEmailChange} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}

export default ChangeEmail;
