"use client";
import React, { useState } from 'react';
import Link from 'next/link';

function ChangeUsername() {
  const [newUsername, setNewUsername] = useState('');

  const handleUsernameChange = () => {
    console.log("Updated Username:", newUsername);
  };

  return (
    <div className="p-4">
      <Link href="/user" passHref>
        <button className="text-blue-500">{'<'}</button>
      </Link>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">New Username</label>
        <div className="relative">
          <input 
            type="text" 
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            className="mt-2 px-4 py-2 w-full rounded-md border border-gray-300"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button className="flex-1 px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button onClick={handleUsernameChange} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md">
          Save
        </button>
      </div>
    </div>
  );
}

export default ChangeUsername;
