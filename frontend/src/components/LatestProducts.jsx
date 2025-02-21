import React from "react";
import ProductItems from "./ProductItems";
import Title from "./Title";

function LatestProducts() {
  return (
    <div>
      <Title title="Latest Products" />
      <div className="w-[90%] m-auto flex justify-center ">
        <div className="flex flex-wrap mt-10 gap-10 justify-center">
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
        </div>
      </div>
    </div>
  );
}

export default LatestProducts;
