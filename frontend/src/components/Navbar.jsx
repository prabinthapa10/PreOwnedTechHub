import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [profile, setProfile] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="bg-customPurple flex justify-center py-2">
        <div className="flex justify-between items-center w-[90%]">
          {/* logo */}
          <Link to={"/"}>
            <img src="/images/logo.png" className="h-[70px]" alt="" />
          </Link>

          <h1 className="font-avantgarde font-bold text-3xl text-center">
            Pre Owned Tech Hub
          </h1>
          {/* serch bar */}
          <input
            className="w-[600px] h-[40px] bg-customBg rounded-lg p-4 focus:outline-none"
            placeholder="Search"
          />
          {/* login / profile */}
          <div
            className={`flex justify-center items-center space-x-3 relative p-2 ${
              isActive
                ? "border-gray-500 shadow-md scale-505 rounded-md text-center bg-[#af65daba]"
                : ""
            }`}
            onClick={() => setisActive(!isActive)}
          >
            <div
              className="flex items-center space-x-2 cursor-pointer "
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <img
                src="/images/profile.png"
                className="h-[40px]"
                alt="Profile"
              />
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
          <img src="/images/cart.png" alt="" />
        </div>
    </div>
  );
}

export default Navbar;
