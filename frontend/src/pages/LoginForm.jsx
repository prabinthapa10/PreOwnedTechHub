import React, { useState } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        navigate("/");

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
    <>
      <Navbar />
      <div className="flex flex-col pt-[50px] items-center h-screen bg-gray-200">
        {/* login box */}
        <div className="bg-white p-8 rounded w-[500px] h-[500px] flex flex-col space-y-3 items-center shadow-2xl">
          <h1 className="text-4xl font-bold mb-[30px]">Login Form</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <InputField
                id="email"
                label={
                  <>
                    <MailIcon /> :
                  </>
                }
                type="email"
                placeHolder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2"
              />
            </div>
            <div>
              <InputField
                id="password"
                label={
                  <>
                    <KeyIcon /> :
                  </>
                }
                type="password"
                placeHolder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2"
              />
            </div>
            <Button name="Login" className="w-full" />
          </form>
          <div>
            <p className="mt-[20px]">
              Don't have an account?
              <a className="text-customPurple cursor-pointer">
                <Link to="/register"> Sign Up</Link>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
