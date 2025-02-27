import React, { useState, useEffect } from "react";
import ProductItems from "./ProductItems";

function TopProducts() {
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
    <div>
      <div className="w-[90%] flex justify-center flex-wrap m-auto gap-3 mt-10">
        {products.slice(0, 6).map((product) => (
          <ProductItems
            id={product.id}
            type="side"
            category={product.category}
            processor={product.processor}
            screen_size={product.screen_size}
            gpu={product.gpu}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default TopProducts;
