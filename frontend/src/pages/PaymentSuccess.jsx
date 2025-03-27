import axios from "axios";
import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";

function PaymentSuccess() {
  const handleOkClick = () => {
    window.location.href = "/profile";
  };
  const query = new URLSearchParams(window.location.search);
  const pidx = query.get("pidx");
  const totalAmount = query.get("total_amount");
  const status = query.get("status");
  const transactionId = query.get("transaction_id");

  useEffect(() => {
    const paymentDetails = async () => {
      if (pidx && transactionId) {
        console.log("Payment Success");

        const pidxValue = {
          pidx: pidx,
        };
        const token = localStorage.getItem("access_token");
        try {
          const response = await axios.post(
            "http://localhost:8000/api/payment/verify/", // Django API endpoint
            { pidx }, // Request body
            {
              headers: {
                Authorization: `Bearer ${token}`, // Ensure token is passed correctly
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
      }
    };
    paymentDetails();
  }, [pidx, transactionId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500" size={64} strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Payment Completed
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for purchasing via Khalti Payment Gateway! Your payment has
          been confirmed successfully.
        </p>
        <button
          onClick={handleOkClick}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
