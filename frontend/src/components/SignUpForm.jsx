import React, { useState } from "react";
import CloseButton from "./ui/CloseButton";
import axios from "axios";

export default function SignUpForm({ setShowLogin, setIsSignUpFormVisible }) {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "", // Ensure it's included in state
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        address: formData.address,
        gender: formData.gender,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      alert("User registered successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <div>
      {/* Signup Box */}
      <div className="bg-white p-8 rounded w-[500px] h-[650px] border-2 flex flex-col space-y-3 items-center shadow-2xl">
        <CloseButton close={() => setIsSignUpFormVisible(false)} />
        <h1 className="text-4xl font-bold mb-4">Sign Up Form</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full"
        >
          <div className="flex justify-between space-x-2">
            <input
              name="firstName"
              size="medium"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <input
              name="lastName"
              size="medium"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <a
            href="#"
            onClick={() => setShowLogin(true)}
            className="text-blue-500 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
