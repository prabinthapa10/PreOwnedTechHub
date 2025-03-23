import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const purchase_order_id = searchParams.get("purchase_order_id");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (token && purchase_order_id && amount) {
      verifyPayment(token, amount, purchase_order_id);
    }
  }, [token, purchase_order_id, amount]);

  // Function to verify payment with the backend
  const verifyPayment = async (token, amount, purchase_order_id) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/khalti-verify/",
        {
          token: token,
          amount: amount,
          purchase_order_id: purchase_order_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        setPaymentStatus("Payment Verified Successfully!");
      } else {
        setPaymentStatus("Payment Verification Failed!");
      }
    } catch (error) {
      setError("Error verifying payment: " + error.message);
    }
  };

  return (
    <div>
      {paymentStatus && <p>{paymentStatus}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PaymentSuccess;
