import React from "react";

function InputField({ id, label, placeHolder, type, value, onChange, className }) {
  return (
    <div className="p-3">
      <label className="text-gray-700 font-semibold mr-4" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={`px-2 py-1 bg-transparent outline-none ${className}`}
      />
    </div>
  );
}

export default InputField;
