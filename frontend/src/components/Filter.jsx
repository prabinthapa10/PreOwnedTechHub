import Button from "../components/Button";
import React, { useState } from "react";

function Filter({
  filterFor,
  selectedFilters = { category: [], priceRange: [], brand: [], condition: [] },
  setSelectedFilters,
}) {
  const categories =
    filterFor === "laptop"
      ? ["Gaming Laptops", "2-in-1 Laptops"]
      : filterFor === "phone"
      ? ["Android", "iPhones", "Gaming Phones"]
      : filterFor === "watch"
      ? ["Luxury Smartwatches", "Budget Smartwatches"]
      : ["Laptop", "Phones", "SmartWatch"];

  const priceRanges =
    filterFor === "laptop"
      ? ["Under $500", "$500 - $1000", "$1000 - $2000", "Over $2000"]
      : filterFor === "phone"
      ? ["Under $200", "$200 - $500", "$500 - $1000", "Over $1000"]
      : filterFor === "watch"
      ? ["Under $200", "$200 - $500", "$500 - $1000", "Over $1000"]
      : ["Under $500", "$500 - $1000", "$1000 - $2000", "Over $2000"]; //

  const brands =
    filterFor === "laptop"
      ? ["Apple", "Dell", "HP", "Lenovo", "Asus"]
      : filterFor === "phone"
      ? ["Apple", "Samsung", "OnePlus", "Google", "Xiaomi"]
      : ["Apple", "Garmin", "Fitbit", "Samsung", "Fossil"];

  const conditions =
    filterFor === "laptop"
      ? ["New", "Refurbished", "Used"]
      : filterFor === "phone"
      ? ["New", "Refurbished", "Used"]
      : filterFor === "watch"
      ? ["New", "Refurbished"]
      : ["New", "Refurbished", "Used"];

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prevFilters) => {
      let updatedFilter;

      if (type === "priceRange") {
        // Ensure priceRange is an array (toggle selection)
        updatedFilter = prevFilters.priceRange.includes(value)
          ? prevFilters.priceRange.filter((item) => item !== value)
          : [...prevFilters.priceRange, value];
      } else {
        updatedFilter = prevFilters[type].includes(value)
          ? prevFilters[type].filter((item) => item !== value)
          : [...prevFilters[type], value];
      }

      return { ...prevFilters, [type]: updatedFilter };
    });
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      category: [],
      priceRange: [],
      brand: [],
      condition: [],
    });
  };
  return (
    <div className="max-w-[400px] p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="font-medium">Category</h3>
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={category}
              checked={selectedFilters.category.includes(category)}
              onChange={() => handleFilterChange("category", category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-medium">Price</h3>
        {priceRanges.map((price) => (
          <label key={price} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={price}
              checked={selectedFilters.priceRange.includes(price)}
              onChange={() => handleFilterChange("priceRange", price)}
            />
            <span>{price}</span>
          </label>
        ))}
      </div>

      {/* Brands */}
      <div className="mb-4">
        <h3 className="font-medium">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={brand}
              checked={selectedFilters.brand.includes(brand)}
              onChange={() => handleFilterChange("brand", brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* conditions */}
      <div>
        <h3 className="font-medium">Conditions</h3>
        {conditions.map((condition) => (
          <label key={condition} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={condition}
              checked={selectedFilters.condition.includes(condition)}
              onChange={() => handleFilterChange("condition", condition)}
            />
            <span>{condition}</span>
          </label>
        ))}
      </div>

      {/* Reset Button */}
      <div className="mt-4" onClick={handleResetFilters}>
        <button
          className="bg-customPurple text-sm p-2 w-full text-center rounded-md
        hover:bg-gray-400 transition duration-200 ease-in-out"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
