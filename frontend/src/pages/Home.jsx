import React from "react";
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

export default function Home() {
  return (
    <div className="">
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
          <LatestProducts />
        </div>
        <div className="mt-10">
          <Title title="Top Products" />
          <TopProducts />
        </div>
        <div className="mt-10">
          <Title title="Smartphone/Tablets" />
          <Smartphone />
        </div>
        <div className="mt-10">
          <Title title="Laptops" />
          <Laptop itemType="side" numberOfItems="6" />
        </div>
        <div className="mt-10">
          <Title title="Smartwatch" />
          <SmartWatch numberOfItems="8" />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
