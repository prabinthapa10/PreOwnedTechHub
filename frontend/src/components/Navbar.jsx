// import React from "react";
// import { Link } from "react-router-dom";
// import InputField from "./InputField";

// function Navbar() {
//   return (
//     <div className="bg-customPurple flex justify-center py-2">
//       <div className="flex justify-between items-center w-[90%]">
//         <Link to={"/"}>
//           <img src="/images/logo.png" className="h-[70px]" alt="" />
//         </Link>
//         <h1 className="font-avantgarde font-bold text-3xl text-center">
//           Pre Owned Tech Hub
//         </h1>
//         <input
//           className="w-[600px] h-[40px] bg-customBg rounded-lg p-4 focus:outline-none"
//           placeholder="Search"
//         />
//         {/* login / profile */}
//         <div className="flex justify-center items-center space-x-3">
//           <img src="/images/profile.png" className="h-[40px]" alt="" />
//           <a className="text-xl">
//             <Link to={"/login"}>Sign In/ Sign Up</Link>
//           </a>
//         </div>
//         {/* cart items */}
//         <img src="/images/cart.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [profile, setProfile] = useState(null);

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
        <Link to={"/"}>
          <img src="/images/logo.png" className="h-[70px]" alt="" />
        </Link>
        <h1 className="font-avantgarde font-bold text-3xl text-center">
          Pre Owned Tech Hub
        </h1>
        <input
          className="w-[600px] h-[40px] bg-customBg rounded-lg p-4 focus:outline-none"
          placeholder="Search"
        />
        {/* login / profile */}
        <div className="flex justify-center items-center space-x-3">
          <img src="/images/profile.png" className="h-[40px]" alt="" />
          {profile ? (
            <span className="text-xl">
              {profile.first_name} {profile.last_name}
            </span>
          ) : (
            <a className="text-xl">
              <Link to={"/login"}>Sign In/ Sign Up</Link>
            </a>
          )}
        </div>
        {/* cart items */}
        <img src="/images/cart.png" alt="" />
      </div>
    </div>
  );
}

export default Navbar;
