import React from "react";
import { NavLink } from "react-router-dom";

function Categories() {
  const image = [
    { id: "laptop", src: "/images/logo/laptop.png", link: "/products/laptop" },
    {
      id: "smartPhone",
      src: "/images/logo/SmartphoneTablet.png",
      link: "/products/phone",
    },
    {
      id: "smartWatch",
      src: "/images/logo/SmartWatch.png",
      link: "/products/smartwatch",
    },
  ];

  return (
    <div>
      <div className="flex justify-center items-center h-[50px] font-barriecito">
        <p className="font-bold text-3xl font-avantgarde">Shop By Categories</p>
      </div>
<div className="felx h-[120px] w-[50%] m-auto  bg-white">
<div className="flex justify-center space-x-[80px]  mt-8 pt-2">
        {image.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl w-[150px] transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <NavLink to={item.link}>
              <img
                className="w-full h-full object-cover border border-white rounded-2xl"
                src={item.src}
                alt={item.id}
              />
            </NavLink>
          </div>
        ))}
      </div>
</div>
    </div>
  );
}

export default Categories;
