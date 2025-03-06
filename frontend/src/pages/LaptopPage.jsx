import React, { useState, useEffect } from "react";
import ProductItems from "../components/ProductItems";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import Title from "../components/Title";
import Filter from "../components/Filter";

function LaptopPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: [],
    brand: [],
    condition: [],
  });
  const fetchProducts = () => {
    let url = `http://127.0.0.1:8000/api/laptop_list/?search=${search}`;

    if (selectedFilters.category.length) {
      url += `&category=${selectedFilters.category.join(",")}`;
    }

    // Extract min/max price correctly
    const priceMapping = {
      "Under $500": [0, 500],
      "$500 - $1000": [500, 1000],
      "$1000 - $2000": [1000, 2000],
      "Over $2000": [2000, Infinity],
    };

    let minPrice = null;
    let maxPrice = null;

    selectedFilters.priceRange.forEach((range) => {
      const [min, max] = priceMapping[range] || [];
      if (min !== undefined && max !== undefined) {
        if (minPrice === null || min < minPrice) minPrice = min;
        if (maxPrice === null || max > maxPrice) maxPrice = max;
      }
    });

    if (minPrice !== null) url += `&min_price=${minPrice}`;
    if (maxPrice !== null && maxPrice !== Infinity)
      url += `&max_price=${maxPrice}`;

    if (selectedFilters.brand.length) {
      url += `&brand=${selectedFilters.brand.join(",")}`;
    }

    if (selectedFilters.condition.length) {
      url += `&condition=${selectedFilters.condition.join(",")}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [search, selectedFilters]);
  return (
    <div className="">
      <Navbar setSearch={setSearch} handleSearch={fetchProducts} />
      <div className="mt-1">
        <NavMenu toActive="laptop" />
      </div>
      <div>
        <Title titleFor="page" title="Laptop" />
      </div>
      <div className="flex">
        <Filter
          filterFor="laptop"
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <div className="w-[90%] m-auto justify-center gap-10 flex flex-wrap mt-10">
          {products.map((product) => (
            <ProductItems
              key={product.id}
              id={product.id}
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
      </div>

      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
}

export default LaptopPage;
