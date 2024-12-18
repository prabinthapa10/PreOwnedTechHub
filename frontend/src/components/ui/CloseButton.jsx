import React from "react";
import { IoMdClose } from "react-icons/io";

export default function CloseButton({ close }) {
  return (
    <div>
      <button
        className="absolute top-4 right-4 font-bold hover:text-gray-700"
        onClick={close}
      >
        <IoMdClose size={60} />
      </button>
    </div>
  );
}
