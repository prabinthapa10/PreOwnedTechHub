import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ProductItems from "../components/ProductItems";
import Title from "../components/Title";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

function SingleProduct() {
  const { id } = useParams();
  const productId = id;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
    console.log("Token:", storedToken);
    console.log(productId);
  }, []);

  const addToCart = async (e) => {
    if (!productId) return toast.error("Invalid product ID");
    if (!token) return toast.error("You need to log in first!");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add_to_cart/",
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added Successfully");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
    }
  };

  const [product, setProduct] = useState([]);
  // for specific product
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/specific_product/${productId}/`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log("Fetched product:", data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // for similar product

  return (
    <div className="bg-customBg">
      <ToastContainer />
      <Navbar />
      <div className="mt-1">
        <NavMenu />s
      </div>
      <div className="bg-white w-[90%] h-[550px] mt-10 m-auto flex justify-center ">
        {/* Left Box */}
        <div className="flex ">
          <div className="border w-[100px] h-[35%] mt-[30px] ">
            <ul className="">
              <li className="border-b p-3 text-gray-800 hover:bg-gray-200">
                {product.name}
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
              src={`http://127.0.0.1:8000/${product.image}`}
              alt="Laptop Image"
            />
          </div>
        </div>

        {/* Right Box */}
        <div className="w-[60%] h-[500px] p-6 mt-6 shadow-lg rounded-lg ">
          <h1 className="font-bold h-[90px] text-2xl mb-4 text-gray-800">
            Lenovo LOQ 15IRH8 (12th Gen Intel Core i5 12450H Processor | 8GB
            DDR5 RAM | 512GB SSD | NVIDIA GeForce RTX 2050 4GB Graphics Card |
            15.6-inch FHD 144Hz Display | 1 Year Warranty)
          </h1>
          <p className="text-gray-600 mb-4">Reviews ****</p>
          <p className="font-bold text-xl text-gray-900">PRICE: NPR 1,00,000</p>

          <ul className="bg-gray-100 p-4 mt-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Key Specifications: {product.name}
            </h3>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🎮</span>
              <span className="text-sm text-gray-700">{product.processor}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🖥️</span>
              <span className="text-sm text-gray-700">
                {product.screen_size}
              </span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🎮</span>
              <span className="text-sm text-gray-700">{product.gpu}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">🎮</span>
              <span className="text-sm text-gray-700">{product.gpu}</span>
            </li>
            <li className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700 mr-2">💾</span>
              <span className="text-sm text-gray-700">{product.ram}</span>
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
