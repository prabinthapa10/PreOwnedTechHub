import React from "react";

function Title({ titleFor, title }) {
  return (
    <div className="font-rokkit">
      {titleFor === "page" ? (
        <div className="h-[60px] flex items-center justify-center text-3xl bg-gray-100 w-full mt-3">
          <h1 className="font-bold px-5 py-3 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 rounded-lg">
            {title}
          </h1>
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
