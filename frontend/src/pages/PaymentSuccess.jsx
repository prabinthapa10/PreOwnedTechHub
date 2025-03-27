import axios from "axios";
import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { X } from "lucide-react";

function PaymentSuccess() {
  const handleOkClick = () => {
    window.location.href = "/profile";
  };
  const query = new URLSearchParams(window.location.search);
  const pidx = query.get("pidx");
  const totalAmount = query.get("total_amount");
  const status = query.get("status");
  const transactionId = query.get("transaction_id");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const paymentDetails = async () => {
      if (pidx && transactionId) {
        setSuccess(true)
        const pidxValue = {
          pidx: pidx,
        };
        const token = localStorage.getItem("access_token");
        try {
          const response = await axios.post(
            "http://localhost:8000/api/payment/verify/",
            { pidx },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("✅ Payment Verified:", response.data);
        } catch (error) {
          console.error(
            "❌ Error verifying payment:",
            error.response?.data || error
          );
        }
      } else {
        setSuccess(false);
      }
    };
    paymentDetails();
  }, [pidx, transactionId]);

  return (
    <>
      {success ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <div className="flex justify-center mb-6">
              <CheckCircle
                className="text-green-500"
                size={64}
                strokeWidth={1.5}
              />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Payment Completed
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for purchasing via Khalti Payment Gateway! Your payment
              has been confirmed successfully.
            </p>
            <button
              onClick={handleOkClick}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-3 bg-red-100 rounded-full animate-pulse"></div>
                <X
                  className="text-red-500 relative z-10"
                  size={64}
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Error</h1>
            <p className="text-gray-600 mb-6">This payment cancelled</p>
            <button
              onClick={handleOkClick}
              className="text-purple-600 font-semibold hover:bg-purple-50 px-6 py-2 rounded-md transition-colors duration-300"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentSuccess;
