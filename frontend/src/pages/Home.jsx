import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import NavMenu from "../components/NavMenu";
import Categories from "../components/Categories";
import TopProducts from "../components/TopProducts";
import LatestProducts from "../components/LatestProducts";
import Smartphone from "../components/Smartphone";
import SmartWatch from "../components/SmartWatch";
import Footer from "../components/Footer";
import Laptop from "../components/Laptop";
import Title from "../components/Title";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

export default function Home() {
  const [addToCart, setAddToCart] = useState(null);

  useEffect(() => {
    if (addToCart === null) return;
    if (addToCart) {
      toast.success("Added Successfully");
      console.log("added");
    } else {
      toast.error("Login.");
    }
  }, [addToCart]);
  return (
    <div className="">
      <ToastContainer />
      <div className="mb-[100px]">
        <div>
          <Navbar />
        </div>
        <div className="mt-0.5">
          <NavMenu />
        </div>
        <div className="mt-5">
          <Banner />
        </div>
        <div className="mt-10">
          <Categories />
        </div>
        <div className="mt-10">
          <Title title="Latest Products" />
          <LatestProducts setAddToCart={setAddToCart} />
        </div>
        <div className="mt-10">
          <Title title="Top Products" />
          <TopProducts setAddToCart={setAddToCart} />
        </div>
        <div className="mt-10">
          <Title title="Smartphone/Tablets" />
          <Smartphone setAddToCart={setAddToCart} />
        </div>
        <div className="mt-10">
          <Title title="Laptops" />
          <Laptop
            itemType="side"
            numberOfItems="6"
            setAddToCart={setAddToCart}
          />
        </div>
        <div className="mt-10">
          <Title title="Smartwatch" />
          <SmartWatch numberOfItems="8" setAddToCart={setAddToCart} />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
