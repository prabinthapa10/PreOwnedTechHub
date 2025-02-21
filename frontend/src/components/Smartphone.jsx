import React from "react";
import Title from "./Title";
import ProductItems from "./ProductItems";

function Smartphone() {
  return (
    <div>
      <Title title="SmartPhones / Tablets" />
      <div className="w-[90%] m-auto flex justify-center">
        <div className="flex flex-wrap mt-10 gap-10 justify-center">
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
        </div>
      </div>
    </div>
  );
}

export default Smartphone;
