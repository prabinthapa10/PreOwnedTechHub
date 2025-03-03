import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import SmartWatch from "../components/SmartWatch";
import Title from "../components/Title";

function SmartwatchPage() {
  return (
    <>
      <Navbar />
      <NavMenu />
      <div>
        <Title titleFor="page" title="Smart Watch" />
      </div>
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
