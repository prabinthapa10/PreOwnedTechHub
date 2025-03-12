import React, { useState, useEffect } from "react";
import ProductItems from "./ProductItems";
import Title from "./Title";

function Laptop({ itemType, numberOfItems, className }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/laptop_list/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="w-[90%] m-auto flex justify-center">
      <div
        className={`w-[90%] flex justify-center flex-wrap m-auto gap-6 mt-10 ${className}`}
      >
        {products.slice(0, numberOfItems).map((product) => (
          <ProductItems
            type={itemType}
            id={product.id}
            name={product.name.slice(0, 20)}
            category={product.category}
            processor={product.processor}
            screen_size={product.screen_size}
            gpu={product.gpu}
            price={product.price}
            image={product.image}
            condition={product.condition}
          />
        ))}
      </div>
    </div>
  );
}

export default Laptop;
