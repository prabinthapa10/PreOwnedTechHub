import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../components/Button";
import Toastify from "../components/Toastify";
import { toast } from "react-toastify";

function Navbar({ setSearch, handleSearch }) {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const token = localStorage.getItem("access_token");

  const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("access_token");

    // Optionally clear profile state
    setProfile(null);

    // Redirect to login page after logout
    navigate("/");

    // Close the dropdown
    setOpenDropdown(false);
  };

  useEffect(() => {
    // Get the access token (assuming it's stored in localStorage)
    const token = localStorage.getItem("access_token");

    if (token) {
      // Fetch the profile data with the access token
      fetch("http://127.0.0.1:8000/api/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    } else {
      console.log("No access token found.");
    }
  }, []);

  const handleCartClick = () => {
    token ? navigate("/cart") : toast.error("login required");
  };

  return (
    <div className="bg-customPurple flex justify-center py-2 font-rokkit">
      <Toastify />
      <div className="flex justify-between items-center w-[90%]">
        {/* logo */}
        <Link to={"/"}>
          <img src="/images/logo/logo.png" className="h-[70px]" alt="" />
        </Link>

        <Link to={"/"}>
          <h1 className="font-avantgarde font-bold text-3xl text-center">
            Pre Owned Tech Hub
          </h1>
        </Link>
        {/* Search bar */}
        <div className="flex items-center space-x-2">
          <input
            className="w-[500px] h-[40px] bg-customBg rounded-sm p-4 focus:outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:bg-white"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div onClick={handleSearch}>
            <Button name={<SearchIcon />} className="bg-blue" />
          </div>
        </div>

        {/* login / profile */}
        <div
          className={"flex justify-center items-center space-x-3 relative p-2 "}
        >
          <div
            className="flex items-center space-x-2 cursor-pointer "
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <PersonIcon style={{ fontSize: 30 }} />
            {profile ? (
              <span className={`text-xl w-[100px] text-center`}>
                {profile.first_name} {profile.last_name}
              </span>
            ) : (
              <Link to="/login" className="text-xl">
                Sign In/Sign Up
              </Link>
            )}
          </div>

          {openDropdown && profile && (
            <ul className="absolute bg-white border border-gray-300 shadow-md mt-2 rounded-md w-40 top-[50px] right-[50px]">
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                <Link to="/profile">My Profile</Link>
              </li>
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>

        {/* cart items */}
        <div onClick={handleCartClick} style={{ cursor: "pointer" }}>
          <AddShoppingCartIcon style={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
