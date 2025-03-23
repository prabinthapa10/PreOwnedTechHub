import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";
import NPR from "../components/NPR";
import axios from "axios";

function OrderPage() {
  const [cartItems, setCartItems] = useState([]);
  const [orderDetail, setOrderDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const token = localStorage.getItem("access_token");
  const location = useLocation();

  const grandTotal = location.state?.grandTotal || 0;
  const discount = location.state?.discount || 0;
  const total = location.state?.total || 0;
  const country = location.state?.country || "";
  const state = location.state?.state || "";
  const city = location.state?.city || "";
  const contact = location.state?.phone || "";

  // get user detials
  useEffect(() => {
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

  // get order detials
  useEffect(() => {
    if (token) {
      // Fetch the profile data with the access token
      fetch("http://127.0.0.1:8000/api/order/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrderDetails(data);
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

  const purchase_order_id = orderDetail?.purchase_order_id;
  const name = `${userDetails.first_name} ${userDetails.last_name}`;

  console.log(name);

  const makePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payment/initiate/",
        {
          return_url: "http://localhost:5173//success_payment",
          website_url: "http://localhost:5173/products",
          amount: grandTotal,
          purchase_order_id: purchase_order_id,
          purchase_order_name: "Test Order",
          name: name,
          email: userDetails.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        console.error("Payment URL not received");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

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

          {/* Right Box - Details */}
          <div className="w-[35%] border border-gray-200 bg-white rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-4">Order Information</h2>

            <div className="text-lg">
              <p>
                <strong>Name: </strong>
                <span>
                  {userDetails.first_name} {userDetails.last_name}
                </span>
              </p>
              <p>
                <strong>Phone Number:</strong> {contact}
              </p>
              <p>
                <strong>Shipping Address:</strong> {country}, {state}, {city}
              </p>
            </div>
          </div>
        </div>

        {/*Payment  Button */}
        <div className="mt-6 flex justify-end" onClick={makePayment}>
          <Button name="Make Payment" />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
