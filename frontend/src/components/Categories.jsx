import React from "react";

function Categories() {
  const image = [
    { id: "laptop", src: "/images/logo/laptop.png" },
    { id: "smartP", src: "/images/logo/SmartphoneTablet.png" },
    { id: "laptop", src: "/images/logo/SmartWatch.png" },
  ];
  return (
    <div>
      <div className="flex justify-center items-center bg-customGray h-[50px]">
        <p className="font-bold text-xl font-avantgarde">Shop By Categories</p>
      </div>
      <div className="flex justify-center space-x-[80px] mt-8">
        {image.map((src) => (
          <>
            <div className="bg-white rounded-2xl w-[150px] ">
              <img
                className="w-full h-full object-cover border border-white rounded-2xl"
                src={src.src}
                alt=""
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Categories;
