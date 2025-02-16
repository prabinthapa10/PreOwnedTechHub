import React from "react";

function Button({ name, className }) {
  return (
    <button className={`bg-customPurple text-white h-12 px-6 py-2 rounded-lg hover:bg-hoverPurple hover:scale-105 transition-all duration-300 ease-in-out ${className}`}>
      {name}
    </button>
  );
}
export default Button;
