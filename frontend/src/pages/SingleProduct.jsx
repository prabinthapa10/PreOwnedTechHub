import React from "react";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ProductItems from "../components/ProductItems";
import Title from "../components/Title";

function SingleProduct() {
  const addToCart = (e) => {
    e.stopPropagation();
    alert("Added successfully!");
  };
  return (
    <div className="bg-customBg">
      <Navbar />
      <NavMenu />
      <div className="bg-white w-[90%] h-[550px] mt-10 m-auto flex justify-center ">
        {/* Left Box */}
        <div className="flex ">
          <div className="border w-[100px] h-[35%] mt-[30px] ">
            <ul className="">
              <li className="border-b p-3 text-gray-800 hover:bg-gray-200">
                Hello
              </li>
              <li className="border-b p-3 text-gray-800 hover:bg-gray-200">
                Hello
              </li>
              <li className="border-b p-3 text-gray-800 hover:bg-gray-200">
                Hello
              </li>
              <li className="p-3 text-gray-800 hover:bg-gray-200">Hello</li>
            </ul>
          </div>
          <div className="h-[500px] mt-6 shadow-lg rounded-lg">
            <img
              className="object-cover h-[300px] "
              src="/images/Laptops/Acer.png"
              alt="Laptop Image"
            />
          </div>
        </div>

        {/* Right Box */}
        <div className="w-[60%] h-[500px] p-6 mt-6 shadow-lg rounded-lg ">
          <h1 className="font-bold text-2xl mb-4 text-gray-800">
            Lenovo LOQ 15IRH8 (12th Gen Intel Core i5 12450H Processor | 8GB
            DDR5 RAM | 512GB SSD | NVIDIA GeForce RTX 2050 4GB Graphics Card |
            15.6-inch FHD 144Hz Display | 1 Year Warranty)
          </h1>
          <p className="text-gray-600 mb-4">Reviews ****</p>
          <p className="font-bold text-xl text-gray-900">PRICE: NPR 1,00,000</p>

          <ul className="bg-gray-100 p-4 mt-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Key Specifications: ASUS F15
            </h3>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🎮</span>
              <span className="text-sm text-gray-700">
                Intel Core i7-12700H Processor
              </span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🖥️</span>
              <span className="text-sm text-gray-700">
                15.6" FHD, 144Hz Display
              </span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🎮</span>
              <span className="text-sm text-gray-700">
                NVIDIA RTX 3050 Ti Graphics
              </span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🎮</span>
              <span className="text-sm text-gray-700">
                NVIDIA RTX 3050 Ti Graphics
              </span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">💾</span>
              <span className="text-sm text-gray-700">
                16GB RAM | 512GB SSD
              </span>
            </li>
          </ul>
          <div onClick={addToCart}>
            <Button name="Add to Cart" className={"w-full rounded-none"} />
          </div>
        </div>
      </div>
      <div className="m-auto mt-10">
        <Title title="Similar Products" />
        <div className="flex justify-center gap-[50px] mt-10 h-[400px] bg-white w-[90%] m-auto pt-10">
          <ProductItems />
          <ProductItems />
          <ProductItems />
          <ProductItems />
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default SingleProduct;
