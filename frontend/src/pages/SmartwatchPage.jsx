import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import Title from "../components/Title";
import Filter from "../components/Filter";
import ProductItems from "../components/ProductItems";
import { Portal } from "@mui/material";

function SmartwatchPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: [],
    brands: [],
    conditions: [],
    ram: [],
    storage: [],
  });
  const fetchProducts = () => {
    let url = `http://127.0.0.1:8000/api/smartwatch_list/?search=${search}`;

    if (selectedFilters.category.length) {
      url += `&category=${selectedFilters.category.join("&category=")}`;
    }

    if (selectedFilters.brands.length) {
      url += `&brand=${selectedFilters.brands.join("&brand=")}`;
    }

    const priceMapping = {
      "Under 50000": [0, 50000],
      "50000 - 100000": [50000, 100000],
      "100000 - 200000": [100000, 200000],
      "Over 200000": [200000, Infinity],
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

    if (selectedFilters.conditions.length) {
      url += `&condition=${selectedFilters.conditions.join(",")}`;
    }

    if (selectedFilters.ram.length) {
      url += `&ram=${selectedFilters.ram.join("&ram=")}`;
    }
    if (selectedFilters.storage.length) {
      url += `&storage=${selectedFilters.storage.join("&storage=")}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, [search, selectedFilters]);

  return (
    <>
      <Navbar setSearch={setSearch} handleSearch={fetchProducts} />
      <NavMenu />
      <div>
        <Title titleFor="page" title="Smart Watch" />
      </div>
      <div className="flex">
        <Filter
          product="smartwatch"
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <div className="w-[90%] m-auto justify-center gap-10 flex flex-wrap mt-10">
          {products.map((product) => (
            <ProductItems
              key={product.id}
              id={product.id}
              name={product.name}
              storage={product.storage}
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
    </>
  );
}

export default SmartwatchPage;
