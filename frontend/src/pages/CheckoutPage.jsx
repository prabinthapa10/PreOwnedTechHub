import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import NPR from "../components/NPR";
import axios from "axios";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const location = useLocation();

  const grandTotal = location.state?.grandTotal || 0;
  const discount = location.state?.discount || 0;
  const total = location.state?.total || 0;

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Get the access token (assuming it's stored in localStorage)
    const token = localStorage.getItem("access_token");

    if (token) {
      // Fetch the profile data with the access token
      fetch("http://127.0.0.1:8000/api/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserDetails(data);
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    } else {
      console.log("No access token found.");
    }
  }, []);

  // fetch items from cart
  useEffect(() => {
    if (!token) {
      console.log("No token found, user is not logged in.");
      setCartItems([]);
      return;
    }
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/order/", {
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

  const handleCheckout = async () => {
    navigate("/order");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/",
        {
          total_price: 500, // Replace with actual total
          shipping_address: "123 Main Street, City",
          payment_method: "Credit Card",
        },
        {
          headers: {
            Authorization: "Bearer {token}",
            "Content-Type": "application/json",
          },
        }
      );

    //   console.log("Order Placed:", response.data);
    //   alert("Order placed successfully!");

    //   // Redirect to order confirmation page

    } catch (error) {
      console.error(
        "Error during checkout:",
        error.response?.data || error.message
      );
      alert("Checkout failed. Please try again.");
    }
  };

  //   const makePayment = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8000/api/payment/initiate/",
  //         {
  //           return_url: "http://localhost:5173/profile",
  //           website_url: "http://localhost:5173/products",
  //           amount: grandTotal,
  //           purchase_order_id: `${userDetails.first_name}${total}`,
  //           purchase_order_name: "Test Order",
  //         }
  //       );

  //       // Handle the response (for example, redirecting to the payment gateway)
  //       console.log("Payment initiated successfully:", response.data);
  //     } catch (error) {
  //       console.error("Error initiating payment:", error);
  //     }
  //   };

  return (
    <div>
      <Navbar />
      {/* Content Section */}
      <div className="w-[85%] m-auto mt-10 mb-[100px]">
        <h1 className="text-3xl font-bold">Order</h1>
        <div className="flex justify-between mt-10">
          {/* Left Box - Order Summary */}
          <div className="w-[60%] border border-gray-200 bg-white rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
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
                <span className="font-medium">
                  <NPR /> {total}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Discount:</span>
                <span className="text-green-600 font-semibold">
                  <NPR /> {discount}
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
            <h2 className="text-2xl font-bold mb-4">Fill form Information</h2>
            <form>
              {/* <div className="mb-4">
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
              </div> */}
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
              <div>
                <strong>Payment Method:</strong>
                <div>
                  <label>
                    <input type="radio" name="payment" value="kalti" checked />{" "}
                    Kalti
                  </label>
                  <label>
                    <input type="radio" name="payment" value="esewa" /> Esewa
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/*Payment  Button */}
        <div className="mt-6 flex justify-end" onClick={handleCheckout}>
          <Button name="Proceed Order" />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
