// components/TextBox.jsx
import React from 'react';

const TextBox = () => {
  return (
    <div className="p-4">
      <label htmlFor="textbox" className="block text-gray-600 font-medium">
        Text Box Label
      </label>
      <input
        type="text"
        id="textbox"
        name="textbox"
        className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-500"
        placeholder="Enter text here"
      />
    </div>
  );
};

export default TextBox;
