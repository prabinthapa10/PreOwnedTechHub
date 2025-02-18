import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";

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
    confirmPassword: "",
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
      <Navbar />
      {/* Signup Box */}
      <div className="flex justify-center pt-[10px]">
        <div className="bg-white p-5 rounded w-[500px] h-[630px] flex flex-col space-y-3 items-center shadow-2xl">
          <h1 className="text-4xl font-bold mb-4">Sign Up Form</h1>
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="flex justify-between space-x-2">
              <InputField
                id="firstName"
                placeHolder="First Name"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <InputField
                id="lastName"
                placeHolder="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <InputField
              id="email"
              placeHolder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <InputField
              id="phoneNumber"
              placeHolder="Phone Number"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <InputField
              id="address"
              placeHolder="Address"
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="border mx-[10px] p-2 rounded w-[95%]"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <InputField
              id="password"
              placeHolder="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <InputField
              id="confirmPassword"
              placeHolder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <Button name="Sign Up" />
          </form>
          <div>
            <p className="mt-[20px]">
              Already have an account?
              <a className="text-customPurple cursor-pointer">
                <Link to="/login">Log In</Link>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
