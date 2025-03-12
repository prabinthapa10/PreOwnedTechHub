import React, { useState } from "react";
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
  const [quantity, setQuantity] = useState(initialQuantity);

  // Increase Quantity
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  // Decrease Quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(id, newQuantity);
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

        {/* Delete */}
        <div>
          <button>
            <strong className="text-red-500 mr-10">Delete</strong>
          </button>
        </div>
      </li>
    </div>
  );
}

export default CartItems;
