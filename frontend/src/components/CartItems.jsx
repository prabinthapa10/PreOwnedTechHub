import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import NPR from "./NPR";

function CartItems({
  id,
  name,
  image,
  price,
  initialQuantity,
  onQuantityChange,
}) {
  useEffect(() => {
    console.log("Cart Item ID:", id);
  }, [id]);

  const totalPrice = price * initialQuantity;

  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = async (newQuantity) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update_cart_items/${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating quantity:", errorData);
        return;
      }

      setQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Increase Quantity
  const increaseQuantity = () => {
    updateQuantity(quantity + 1);
  };

  // Decrease Quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  };

  const removeFromCart = async (id) => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/add_to_cart/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error(errorData || "Error removing from cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-[95%] m-auto mt-6 border border-gray-200 p-5 rounded-md shadow-lg">
      <li className="flex justify-between items-center">
        {/* Product */}
        <div className="flex items-center space-x-3">
          <img
            className="w-[130px] rounded-md"
            src={`http://127.0.0.1:8000/${image}`}
            alt={name}
          />
          <div>
            <p className="font-semibold w-[80px]">{name}</p>
            <p className="text-gray-500">White</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center space-x-3">
          <button onClick={decreaseQuantity}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <p className="w-6 text-center">{quantity}</p>
          <button onClick={increaseQuantity}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <p className="font-bold">
            <NPR />
            {price}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <p className="font-bold">
            <NPR />
            {totalPrice}
          </p>
        </div>

        {/* Delete */}
        <div>
          <button onClick={() => removeFromCart(id)}>
            <strong className="text-red-500 mr-10">Delete</strong>
          </button>
        </div>
      </li>
    </div>
  );
}

export default CartItems;
