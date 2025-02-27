import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import SmartWatch from "../components/SmartWatch";

function SmartwatchPage() {
  return (
    <>
      <Navbar />
      <NavMenu />
      <div>
        <SmartWatch />
      </div>
      <div className="mt-[100px]">
        <Footer />
      </div>
    </>
  );
}

export default SmartwatchPage;
