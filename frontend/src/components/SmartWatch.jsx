import React from "react";
import Title from "./Title";
import ProductItems from "./ProductItems";


function SmartWatch() {
  return (
    <div>
       <Title title="Smart Watches"/> 
      <div className="w-[90%] m-auto flex justify-center">
        <div className="flex flex-wrap mt-10 gap-10 justify-center">
          <ProductItems type="side"/>
          <ProductItems type="side"/>
          <ProductItems type="side"/>
          <ProductItems type="side"/>
          <ProductItems type="side"/>
          <ProductItems type="side"/>
        </div>
      </div>
    </div>
  );
}

export default SmartWatch;
