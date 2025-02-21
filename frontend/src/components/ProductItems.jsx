import React from "react";
import Button from "../components/Button";

function ProductItems({ type }) {
  return (
    <>
      {type == "side" ? (
        <div className="flex w-[380px] h-[180px] bg-white shadow-lg items-center">
          <div className="w-[40%]">
            <div className="text-[14px] w-[50px] text-center bg-[#ff0505] rounded-sm">
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
            <div className="flex flex-col px-2 py-2 text-[14px]">
              <span>naaaaaaaa aaaaaaaaaaaaa aaaaa</span>
              <span>naaaaaaaa aaaaaaaaaaaaa aaaaa</span>
              <p className="mt-3">NPR: 100000</p>
            </div>
            <Button name="Add to Cart" className={"w-full rounded-none"} />
          </div>
        </div>
      ) : (
        <div className="w-[255px] h-[335px] bg-white shadow-lg">
          <div className="text-[14px] w-[50px] text-center bg-[#ff0505] rounded-sm">
            <p>New</p>
          </div>
          <div className="w-[180px] m-auto">
            <img
              className="w-full  h-full  object-cover"
              src="/images/image.png"
              alt=""
            />
          </div>
          <div className="w-[255px] p-2 text-[14px]">
            <span>AAAAAAAAAaa asfd aaaaaaaaaa </span>
            <br />
            <span>AAAAAAAAAaa asfd aaaaa</span>
            <br />
            <span>AAAAAAAAAaa asfd aaaa</span>
            <br />
            <span>AAAAAAAAAaa asfdaaaaaaaaa </span>
            <br />
            <p className="pt-6">NPR: 1,00,000.00 </p>
          </div>
          <Button name={"Add to cart"} className={"rounded-none w-full"} />
        </div>
      )}
    </>
  );
}

export default ProductItems;
