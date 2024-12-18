import React from "react";

export default function InputField({ size = "large", placeholder, id }) {
  // conditonal expression check if large or not
  const sizeClasses = size === "large" ? "w-[434px] h-10" : "w-[200px] h-10 ";
  return (
    <div>
      <input
        id={id}
        type="text"
        className={`border border-gray-300 p-2 rounded-md text-base ${sizeClasses}`}
        placeholder={placeholder}
      />
    </div>
  );
}
