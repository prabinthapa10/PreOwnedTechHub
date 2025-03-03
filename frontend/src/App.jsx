import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import SmartwatchPage from "./pages/SmartwatchPage";
import LaptopPage from "./pages/LaptopPage";
import SmartphonePage from "./pages/SmartphonePage";
import Contact from "./pages/Contact";
import SubmtiProduct from "./pages/SubmitProduct";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/specific_product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/laptop" element={<LaptopPage />} />
          <Route path="/products/smartwatch" element={<SmartwatchPage />} />
          <Route path="/products/phone" element={<SmartphonePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/submit_product" element={<SubmtiProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
