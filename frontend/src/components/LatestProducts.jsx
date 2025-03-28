import React, { useState, useEffect } from "react";
import ProductItems from "./ProductItems";


function LatestProducts({ setAddToCart }) {
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
      <div className="w-[90%] m-auto mt-5 flex bg-white h-[450px] pt-4 justify-center ">
        <div className="flex flex-wrap mt-10 gap-10 justify-center pb-5">
          {products.slice(0, 4).map((product) => (
            <ProductItems
              key={product.id}
              id={product.id}
              name={product.name}
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
    </div>
  );
}

export default LatestProducts;
