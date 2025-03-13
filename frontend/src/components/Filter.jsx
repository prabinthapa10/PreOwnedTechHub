import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";

function Filter({ product, selectedFilters, setSelectedFilters }) {
  const [filterOptions, setFilterOptions] = useState({
    category: [],
    priceRange: [],
    brands: [],
    conditions: [],
    ram: [],
    storage: [],
  });
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const url = product
          ? `http://127.0.0.1:8000/api/filter_options/?category=${product}`
          : "http://127.0.0.1:8000/api/filter_options/";

        const response = await axios.get(url);

        if (response.data) {
          setFilterOptions({
            category: [].concat(response.data.categories || []),
            priceRange: response.data.priceRange || [],
            brands: response.data.brands || [],
            conditions: response.data.conditions || [],
            ram: response.data.ram || [],
            storage: response.data.storage || [],
          });
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, [product]);

  // Handle checkbox selection
  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prevState) => {
      const newSelection = [...prevState[category]];
      const index = newSelection.indexOf(value);

      if (index > -1) {
        newSelection.splice(index, 1);
      } else {
        newSelection.push(value);
      }

      return { ...prevState, [category]: newSelection };
    });
  };

  // Reset all checkboxes
  const handleReset = () => {
    setSelectedFilters({
      category: [],
      priceRange: [],
      brands: [],
      conditions: [],
      ram: [],
      storage: [],
    });
  };

  return (
    <div className="p-4 w-[200px] border border-gray-300 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Filter Options</h3>

      {Object.keys(filterOptions).map((key) => (
        <div key={key} className="mb-2">
          <h4 className="text-lg font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </h4>
          <ul className="pl-4">
            {filterOptions[key].map((option, index) => (
              <li key={index} className="text-gray-700">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedFilters[key].includes(option)}
                    onChange={() => handleCheckboxChange(key, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-4" onClick={handleReset}>
        <Button name="Reset" />
      </div>
    </div>
  );
}

export default Filter;
