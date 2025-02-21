import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import NavMenu from "../components/NavMenu";
import Categories from "../components/Categories";
import TopProducts from "../components/TopProducts";
import LatestProducts from "../components/LatestProducts";
import Smartphone from "../components/Smartphone";
import SmartWatch from "../components/SmartWatch";

export default function Home() {
  return (
    <div className="min-h-screen">
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
        <LatestProducts />
      </div>
      <div className="mt-10">
        <TopProducts />
      </div>
      <div className="mt-10">
        <Smartphone />
      </div>
      <div className="mt-10">
        <SmartWatch />
      </div>
    </div>
  );
}
