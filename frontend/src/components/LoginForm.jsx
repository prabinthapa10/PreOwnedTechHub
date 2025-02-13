import React, { useState } from "react";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { CgProfile } from "react-icons/cg";
import CloseButton from "./ui/CloseButton";
import axios from "axios";

export default function LoginForm({ setShowLogin, setIsSignUpFormVisible }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Send login request to the backend
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: email,
        password: password,
      });

      // Check if the response contains access token
      if (response.data.access_token) {
        // Store the access token in localStorage
        localStorage.setItem("access_token", response.data.access_token);
        console.log("Access token:", response.data.access_token);
        alert("Login successful!");

        // Optionally, you can store the refresh token as well
        localStorage.setItem("refresh_token", response.data.refresh_token);

        // Clear form fields after successful login
        setEmail("");
        setPassword("");
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed!");
    }
  };

  return (
    <div>
      {/* login box */}
      <div className="bg-white p-8 rounded w-[500px] h-[600px] border-2 flex flex-col space-y-3 items-center shadow-2xl">
        <CloseButton close={() => setIsSignUpFormVisible(false)} />
        <h1 className="text-4xl font-bold mb-4">Login Form</h1>
        <div className="bg-gray-500 w-[150px] h-[150px] flex items-center justify-center rounded-full shadow-md mb-4">
          <CgProfile size={100} className="text-white" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              className="text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button>Login</button>
        </form>
        <p className="mt-4">
          Don't have an account?
          <a
            href="#"
            onClick={() => setShowLogin(false)}
            className="text-blue-500 hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
