import React from "react";


export default function Header({ onSignUpClick }) {
  return (
    <div className="bg-[#B3C5EB] flex justify-between items-center p-4">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img src="" alt="Tech Hub Logo" className="w-10 h-10" />
        <h1 className="text-4xl font-avantgarde font-bold">Pre Owned Tech Hub</h1>
        <h1 className="text-xl font-acehsoft">Pre Owned Tech Hub</h1>
      </div>


      {/* User Section */}
      <div className="flex items-center space-x-4">
        <img src="" alt="User Icon" className="w-8 h-8 rounded-full" />
      </div>

      {/* Cart Icon */}
      <img src="" alt="Cart Icon" className="w-8 h-8" />
    </div>
  );
}
