import React, { useState } from "react";
import Header from "../components/Header";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      {/* Main content with optional blur effect */}
      <div>
        <Navbar />
      </div>
    </div>
  );
}
