import React, { useState, useEffect } from "react";
import ProductItems from "../components/ProductItems";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import Title from "../components/Title";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = () => {
    console.log(`Fetching products with search query: "${search}"`);

    fetch(`http://127.0.0.1:8000/api/product_list/?search=${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar setSearch={setSearch} handleSearch={fetchProducts} />
      <div className="mt-1">
        <NavMenu />
      </div>
      <div>
        <Title titleFor="page" title="Products" />
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
            condition={product.conditon}
          />
        ))}
      </div>
    </>
  );
}

export default Products;
