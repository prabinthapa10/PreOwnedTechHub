import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import Button from "../components/Button";
import NPR from "../components/NPR";
import { Country, State, City } from "country-state-city";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const location = useLocation();
  const grandTotal = location.state?.grandTotal || 0;
  const discount = location.state?.discount || 0;
  const total = location.state?.total || 0;

  const [selectedCountry, setSelectedCountry] = useState(null);

  console.log(discount, total, grandTotal);

  // Handle order submission (static, no backend call)
  const handleSubmitOrder = () => {
    alert("Order placed successfully!");
  };

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      console.log("No token found, user is not logged in.");
      setCartItems([]);
      return;
    }
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/add_to_cart/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Check if response is successful (status code 200)
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
      }
    };

    fetchCartItems();
  }, []);

  const handleCountryChange = (country) => {
    selectedCountry(country);
    setState(State.getStatesOfCountry(country.isoCode));
  };

  return (
    <div>
      <Navbar />
      <div className="mt-1">
        <NavMenu />
      </div>

      {/* Content Section */}
      <div className="w-[85%] m-auto mt-10 mb-[100px]">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="flex justify-between mt-10">
          {/* Left Box - Cart Summary */}
          <div className="w-[60%] border border-gray-200 bg-white rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div>{item.product.name}</div>
                <div>
                  {item.quantity} x <NPR /> {item.product.price}
                </div>
                <div>
                  <NPR /> {(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
              {/* Discount & Total Section */}
              <div className="flex justify-between text-gray-700 text-lg mt-2">
                <span>Subtotal:</span>
                <span className="font-medium">NPR {total}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Discount:</span>
                <span className="text-green-600 font-semibold">
                  NPR {discount}
                </span>
              </div>

              <hr className="my-4 border-gray-300" />

              {/* Grand Total Section */}
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Grand Total:</span>
                <span className="text-purple-600">NPR {grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Right Box - Shipping Info */}
          <div className="w-[35%] border border-gray-200 bg-white rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <form>
              <div className="mb-4">
                <div className="mb-4">
                  <label className="block">Country</label>
                  <select
                    name="country"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) =>
                      handleCountryChange(
                        countries.find(
                          (country) => country.isoCode === e.target.value
                        )
                      )
                    }
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your address"
                />
              </div>

              <div className="mb-4">
                <label className="block">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="mb-4">
                <label className="block">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your zip code"
                />
              </div>

              <div className="mb-4">
                <label className="block">City</label>
                <input
                  type="text"
                  name="city"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your city"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-6 flex justify-end" onClick={handleSubmitOrder}>
          <Button name="Place Order" />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
