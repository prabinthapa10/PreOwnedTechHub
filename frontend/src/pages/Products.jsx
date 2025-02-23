import React, { useState, useEffect } from "react";
import ProductItems from "../components/ProductItems";
import Button from "../components/Button";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product_list/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);
  return (
    <div className="flex">
      {products.slice(0, 1).map((product) => (
        <div>
          <div className="w-[255px] h-[330px] bg-white shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="text-[11px] w-[50px] text-center bg-[#ff0505] rounded-sm">
              <p>New</p>
            </div>
            <div className="w-[180px] h-[124px] border m-auto">
              <img
                className="w-full h-full object-cover"
                src={`http://127.0.0.1:8000/${product.image}`}
                alt="Product Image"
              />
            </div>
            <div className="w-[255px] h-[137.5px] mt-3 p-2 text-[13px] leading-tight bg-gray-100 rounded-lg shadow-md">
              <span>🎮 **High Performance:** {product.processor}</span>
              <span>🖥️ **Fast Display:** {product.screen_size}</span>
              <span>🎮 **RTX Graphics:** {product.gpu}</span>
              <br />
              <p className="mt-6">💰Price: NPR {product.price}</p>
            </div>
            <div>
              <Button name={"Add to cart"} className={"rounded-none w-full"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
