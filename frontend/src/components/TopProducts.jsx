import React, { useState, useEffect } from "react";
import ProductItems from "./ProductItems";

function TopProducts({ setAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product_list/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="bg-white h-[510px] w-[90%] m-auto">
      <div className=" flex justify-center flex-wrap gap-6 mt-10 pt-10">
        {products.slice(0, 6).map((product) => (
          <ProductItems
            key={product.id}
            id={product.id}
            name={product.name.slice(0, 20)}
            type="side"
            category={product.category}
            processor={product.processor}
            screen_size={product.screen_size}
            gpu={product.gpu}
            price={product.price}
            image={product.image}
            condition={product.condition}
            setAddToCart={setAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default TopProducts;
