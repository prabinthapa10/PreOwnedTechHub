import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function ProductItems({ type }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/specific_product");
  };

  const addToCart = (e) => {
    e.stopPropagation();
    alert("Added successfully!");
  };

  return (
    <>
      {type == "side" ? (
        <div
          className="flex w-[380px] h-[200px] bg-white shadow-lg items-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={handleClick}
        >
          <div className="w-[40%]">
            <div className="text-[11px] w-[50px] text-center bg-[#ff0505] rounded-sm">
              <p>New</p>
            </div>
            <div className="w-[150px] h-[130px] mt-3">
              <img
                className="w-full  h-full  object-cover"
                src="/images/image.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col w-[60%]">
            <div className="flex flex-col px-2 py-2 text-[13px] leading-tight bg-gray-100 rounded-lg shadow-md">
              <span>
                🎮 **High Performance:** AMD Ryzen 7 / Intel i7 12th-Gen
              </span>
              <span>
                🖥️ **Fast Display:** 15.6" / 17.3" FHD, 144Hz-240Hz refresh rate
              </span>
              <span>🎮 **RTX Graphics:** NVIDIA RTX 3050 / 3060 / 4060</span>
              <p className="mt-6">💰Price: NPR 100,000</p>
            </div>
            <div onClick={addToCart}>
              <Button name="Add to Cart" className={"w-full rounded-none"} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-[255px] h-[330px] bg-white shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          onClick={handleClick}
        >
          <div className="text-[11px] w-[50px] text-center bg-[#ff0505] rounded-sm">
            <p>New</p>
          </div>
          <div className="w-[180px] m-auto">
            <img
              className="w-full  h-full  object-cover"
              src="/images/image.png"
              alt=""
            />
          </div>
          <div className="w-[255px] mt-3 p-2 text-[13px] leading-tight bg-gray-100 rounded-lg shadow-md">
            <span>
              🎮 **High Performance:** AMD Ryzen 7 / Intel i7 12th-Gen
            </span>
            <span>
              🖥️ **Fast Display:** 15.6" / 17.3" FHD, 144Hz-240Hz refresh rate
            </span>
            <span>🎮 **RTX Graphics:** NVIDIA RTX 3050 / 3060 / 4060</span>
            <br />
            <p className="mt-6">💰Price: NPR 100,000</p>
          </div>
          <div onClick={addToCart}>
            <Button name={"Add to cart"} className={"rounded-none w-full"} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItems;
