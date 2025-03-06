import React from "react";
import Laptop from "../components/Laptop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";
import Title from "../components/Title";

function LaptopPage() {
  return (
    <div className="">
      <Navbar />
      <div className="mt-1">
        <NavMenu toActive="laptop" />
      </div>
      <div>
        <Title titleFor="page" title="Laptop" />
      </div>
      <Laptop
        numberOfItems="8"
        className="flex flex-wrap mt-10 gap-[40px] justify-center"
      />
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
}

export default LaptopPage;
