import React, { useState, useEffect } from "react";
import ProductItems from "../components/ProductItems";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product_list/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch(() => {});
  }, []);
  return (
    <>
      <Navbar />
      <div className="mt-1">
        <NavMenu />
      </div>
      <div className="w-[90%] m-auto justify-center gap-10 flex flex-wrap mt-10">
        {products.map((product) => (
          <ProductItems
            category={product.category}
            processor={product.processor}
            screen_size={product.screen_size}
            gpu={product.gpu}
            price={product.price}
            image={product.image}
            condition = {product.conditon}
          />
        ))}
      </div>
    </>
  );
}

export default Products;
