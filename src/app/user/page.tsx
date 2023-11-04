"use client"
import React, { useState, useRef } from 'react';
import Link from 'next/link';

function User() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/image/avatar.png');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col p-5 bg-gradient-to-br from-24008C to-641A99 via-9D32A5 h-screen">
      <div className="bg-white p-5 rounded-xl mb-5">
        <div className="flex items-center mb-5">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4 cursor-pointer"
            onClick={handleAvatarClick}
          />
          <input 
            type="file" 
            accept="image/*" 
            style={{ display: 'none' }} 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <h2 className="text-lg dark:text-black ml-5">{name}</h2>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300"
          />
        </div>
        <div className="mb-5 flex justify-between items-center">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300"
            />
          </div>
          <Link href="/username" className="ml-2 text-xl">
            &gt;
          </Link>
        </div>
        <div className="mb-5 flex justify-between items-center">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300"
            />
          </div>
          <Link href="/email" className="ml-2 text-xl">
            &gt;
          </Link>
        </div>
        <div className="mb-5 flex justify-between items-center">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="mt-1 px-4 py-2 w-full rounded-md border border-gray-300"
            />
          </div>
          <Link href="/password" className="ml-2 text-xl">
            &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default User;
