import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CartItems from "../components/CartItems";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("access_token");
  const [noOfItems, setNoOfItems] = useState(0);
  const [removed, setRemoved] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  // Fetch cart items
  useEffect(() => {
    if (!token) {
      console.log("No token found, user is not logged in.");
      setCartItems([]);
      return;
    }

    fetch("http://127.0.0.1:8000/api/add_to_cart/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCartItems(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
      });
    setRemoved(false);
  }, [token, removed]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      );
      const updatedTotal = updatedItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      setGrandTotal(updatedTotal);

      return updatedItems;
    });
  };

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    setTotal(total);
    setGrandTotal(total - discount);
    setNoOfItems(cartItems.length);
  }, [cartItems, discount]);

  const handleProceed = () => {
    navigate("/orderpage", { state: { grandTotal, discount, total } });
  };

  const handleCode = () => {
    if (discount > 0) {
      setMessage("Discount already applied");
      return;
    }

    if (code === "SAVE10") {
      setMessage("Discount of 10% applied");
      setDiscount(grandTotal * 0.1);
    } else if (code === "SAVE20") {
      setMessage("Discount of 20% applied");
      setDiscount(grandTotal * 0.2);
    } else {
      setMessage("Invalid Code ❌");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-[85%] m-auto mt-10 mb-[100px] flex justify-between">
        {/* left box */}
        <div className="w-[69%] border border-gray-200 bg-white rounded-3xl">
          <h1 className="font-bold text-3xl m-5">
            Cart <span className="text-[12px]">({noOfItems} products)</span>
          </h1>
          <div className="flex font-bold w-[95%] m-auto justify-around">
            <div className=" w-[35%] m-auto">
              <p className="w-[40px] m-auto">Product</p>
            </div>
            <div className="flex w-[65%] justify-around">
              <span>Quantity</span>
              <span>Price</span>
              <span>Total Price</span>
              <span>Action</span>
            </div>
          </div>
          <ul className=" pb-[40px]">
            {cartItems.map((item) => (
              <div key={item.id}>
                <CartItems
                  id={item.id}
                  productId={item.product.id}
                  name={item.product.name}
                  price={item.product.price}
                  image={item.product.image}
                  initialQuantity={item.quantity}
                  onQuantityChange={handleQuantityChange}
                  setRemoved={setRemoved}
                />
              </div>
            ))}
          </ul>
        </div>
        {/* right box */}
        <div className="w-[30%] h-auto bg-[#f3e8ff] rounded-3xl shadow-lg p-6">
          <div className="w-[80%] m-auto">
            <p className="font-bold text-center text-lg text-gray-700">
              Order Summary
            </p>

            <div className="w-[90%] m-auto mt-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between text-gray-600">
                <span>Total:</span>
                <span>
                  <strong className="text-[12px]">NPR. </strong>
                  {total}
                </span>
              </div>

              {/* Promo Code Section */}
              <div className="mt-3">
                <span className="text-gray-600">Promo Code:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="text"
                    className="w-[120px] border border-gray-300 focus:ring-2 focus:ring-purple-400 
                focus:outline-none px-3 py-1 rounded-lg text-sm"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter code"
                  />
                  <button
                    className="bg-[#b48ff1] text-white border border-[#9c7dd9] px-3 py-1 rounded-lg 
                hover:bg-[#a37be8] transition duration-200 shadow-md text-sm"
                    onClick={handleCode}
                  >
                    Apply
                  </button>
                </div>
                <span className="text-[12px] text-red-500 mt-1 block">
                  {message}
                </span>
              </div>

              {/* Discount */}
              <div className="flex justify-between text-gray-600">
                <span>Discount:</span>
                <strong className="text-green-600">NPR {discount}</strong>
              </div>

              <hr className="border-gray-300 mt-4" />

              {/* Grand Total */}
              <div className="flex justify-between font-bold text-gray-700 mt-3">
                <span>Total:</span>
                <strong>NPR {grandTotal - discount}</strong>
              </div>

              {/* Proceed to Payment Button */}
              <div className="mt-6">
                <button
                  onClick={handleProceed}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg 
              hover:bg-purple-700 transition duration-200 shadow-md"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
