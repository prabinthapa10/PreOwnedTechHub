import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if we are at the /products page (All Categories)
  const isAllCategoriesActive = location.pathname === "/products";

  // Check if we are at any sub-route of /products (Shop or specific categories)
  const isShopActive =
    location.pathname.startsWith("/products/") &&
    location.pathname !== "/products";

  return (
    <div className="flex bg-customGray h-[50px] items-center">
      <ul className="flex justify-evenly items-center text-xl w-[70%]">
        <li>
          <MenuIcon style={{ fontSize: 30 }} className="cursor-pointer" />
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-customPurple"
                : "hover:text-blue-950"
            }
          >
            Home
          </NavLink>
        </li>
        {/* Shop - With Dropdown */}
        <li className="relative" onMouseOver={() => setIsOpen(true)}>
          <NavLink
            className={`${
              isShopActive
                ? "font-bold border-b-2 border-customPurple"
                : "hover:text-blue-950"
            }`}
          >
            All Categories
          </NavLink>
          {isOpen && (
            <ul
              className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20"
              onMouseLeave={() => setIsOpen(false)}
            >
              <li>
                <NavLink
                  to="/products/laptop"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Laptop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/smartwatch"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Smartwatch
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/phone"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Phone
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li>
          <NavLink
            to="/products"
            className={`${
              isAllCategoriesActive
                ? "font-bold border-b-2 border-customPurple"
                : "hover:text-blue-950"
            }`}
          >
            Shop
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/submit_product"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-customPurple"
                : "hover:text-blue-950"
            }
          >
            Submit Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-customPurple"
                : "hover:text-blue-950"
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavMenu;
