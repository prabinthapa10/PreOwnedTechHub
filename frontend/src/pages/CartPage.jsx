import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CartItems from "../components/CartItems";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useSyncExternalStore } from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("access_token");
  const [noOfItems, setNoOfItems] = useState(0);
  const [removed, setRemoved] = useState(null);

  // Calculate Sub Total dynamically
  // const calculateSubTotal = () => {
  //   if (!productDetails || productDetails.length === 0) return 0;

  //   return productDetails.reduce((total, item) => {
  //     // Ensure item is defined and contains the price and quantity properties
  //     if (!item || item.price === undefined || item.quantity === undefined) {
  //       return total;
  //     }

  //     // Otherwise, use the price and quantity values
  //     const price = item.price || 0;
  //     const quantity = item.quantity || 0;

  //     return total + price * quantity;
  //   }, 0);
  // };

  // // 10% discunt
  // const calculateDiscount = () => {
  //   return calculateSubTotal() * 0.1;
  // };

  // // 12% task
  // const calculateTax = () => {
  //   const tax = (calculateSubTotal() - calculateDiscount()) * 0.12;
  //   return Number(tax.toFixed(2));
  // };

  // // Example of fixed shipping cost
  // const shippingCost = 200;

  // // Calculate the Grand Total dynamically
  // const calculateGrandTotal = () => {
  //   const subTotal = calculateSubTotal();
  //   const discount = calculateDiscount();
  //   const tax = calculateTax();
  //   const shipping = shippingCost;

  //   const total = subTotal - discount + tax + shipping;
  //   return Number(total.toFixed(2));
  // };

  // // Order summary with dynamically calculated values
  // const orderSummary = [
  //   { id: 1, name: "Sub Total :", value: calculateSubTotal() },
  //   { id: 2, name: "Discount(10%) :", value: calculateDiscount() },
  //   { id: 3, name: "Tax(12%) : ", value: calculateTax() },
  //   { id: 4, name: "Shipping : ", value: shippingCost },
  // ];
  // const grandTotal = calculateGrandTotal();

  console.log(cartItems);
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
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product === id ? { ...item, quantity: newQuantity } : item
      )
    );
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
              <>
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
              </>
            ))}
          </ul>
        </div>
        {/* right box */}
        {/* <div className="w-[30%] h-[380px] bg-[#b48ff130]  rounded-3xl">
          <div className="w-[80%]  m-auto mt-5 ">
            <p className="font-bold w-[135px] m-auto">Order Summary</p>
            <div className="w-[90%] m-auto mt-6">
              {orderSummary.map((item) => (
                <>
                  <div className="flex justify-between mt-2">
                    <span>{item.name} </span>{" "}
                    <span>
                      <strong className="text-[12px]">NPR. </strong>
                      {item.value}
                    </span>
                  </div>
                </>
              ))}
              <hr className="mt-9" />
              <div className="flex justify-between mt-2">
                <strong>Total: </strong>
                <strong>NPR {grandTotal}</strong>
              </div>
              <div className="mt-8">
                <Button name="Proceed To Payment" className="w-full" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
