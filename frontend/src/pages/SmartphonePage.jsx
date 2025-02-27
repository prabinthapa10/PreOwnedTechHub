import React from "react";
import Smartphone from "../components/Smartphone";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";

function SmartphonePage() {
  return (
    <div>
      <Navbar />
      <div className="mt-1">
        <NavMenu />
      </div>
      <Smartphone />
      <div className="mt-[100px]">
      <Footer />
      </div>
    </div>
  );
}

export default SmartphonePage;
