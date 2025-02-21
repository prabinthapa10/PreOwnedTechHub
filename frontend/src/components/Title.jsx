import React from "react";

function Title({title}) {
  return (
    <div className="flex flex-col items-center justify-center bg-customGray h-[50px]">
      <p className="font-bold text-xl font-avantgarde">{title}</p>
    </div>
  );
}

export default Title;
