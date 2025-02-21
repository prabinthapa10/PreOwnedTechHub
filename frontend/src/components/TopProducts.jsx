import React from "react";
import ProductItems from "./ProductItems";
import Title from "./Title";

function TopProducts() {
  return (
    <div>
      <Title title="Top Products" />
      <div className="w-[90%] flex justify-center flex-wrap m-auto gap-3 mt-10">
        <ProductItems type="side" />
        <ProductItems type="side" />
        <ProductItems type="side" />
        <ProductItems type="side" />
        <ProductItems type="side" />
        <ProductItems type="side" />
      </div>
    </div>
  );
}

export default TopProducts;
