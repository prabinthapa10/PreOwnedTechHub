import React, { useState, useEffect } from "react";
import Title from "./Title";
import ProductItems from "./ProductItems";

function Smartphone() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/smartphone_list/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <Title title="SmartPhones / Tablets" />
      <div className="w-[90%] m-auto flex justify-center">
        <div className="flex flex-wrap mt-10 gap-10 justify-center">
          {products.slice(1, 9).map((product) => (
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

export default Smartphone;
