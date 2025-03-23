import React from "react";

function Title({ titleFor, title }) {
  return (
    <div className="font-barriecito">
      {titleFor === "page" ? (
        <div className="h-[60px] flex items-center text-2xl  bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400">
          <h1 className="w-[90%] m-auto font-bold">{title}</h1>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center bg-customBg h-[50px]">
            <p className="font-bold text-3xl font-avantgarde">{title}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Title;
