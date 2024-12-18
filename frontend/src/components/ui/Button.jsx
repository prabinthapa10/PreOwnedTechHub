import React from "react";

export default function Button({ text, onClick }) {
  return (
    <>
      <button
        className="bg-customPurple hover:bg-hoverPurple text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
