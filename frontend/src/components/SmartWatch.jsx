import React, { useState, useEffect } from "react";
import ProductItems from "./ProductItems";

function SmartWatch({numberOfItems}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/smartwatch_list/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <div className="w-[90%] m-auto flex justify-center">
        <div className="flex flex-wrap mt-10 gap-10 justify-center">
          {products.slice(0, numberOfItems).map((product) => (
            <ProductItems
              id={product.id}
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
    </div>
  );
}

export default SmartWatch;
