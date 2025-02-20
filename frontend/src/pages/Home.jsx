import React, { useState } from "react";
import Header from "../components/Header";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import Navbar from "../components/Navbar";
import HeroSecion from "../components/HeroSecion";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
        <HeroSecion />
      </div>
    </div>
  );
}
