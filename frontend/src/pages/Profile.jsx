import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {
  const [activeDiv, setActiveDiv] = useState("profileDetails");
  const linkList = [
    { id: "profileDetails", label: "My Profile" },
    { id: "ordersDetails", label: "My Orders" },
    { id: "wishDetails", label: "My Wishlist" },
    { id: "addressDetails", label: "Address Book" },
  ];

  return (
    <div className="bg-customBg">
      <Navbar />
      {/* profile content */}
      <div className="flex justify-center mt-5">
        <div className="flex space-x-2 h-[250px] w-[90%]">
          {/* left box */}
          <div className="w-[20%] bg-white p-4 shadow-md border-r border-purple-300">
            <ul className="flex flex-col">
              {linkList.map((item) => (
                <li
                  key={item.id}
                  className={`p-3 font-semibold rounded-md cursor-pointer transition-all border-b-2 ${
                    activeDiv === item.id
                      ? "bg-purple-500 text-white border-purple-700"
                      : "bg-white text-purple-700 border-purple-300 hover:bg-purple-100"
                  }`}
                  onClick={() => setActiveDiv(item.id)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* right box */}
          <div className="w-[80%] h-[600px] border-4 border-purple-300 bg-white shadow-lg rounded-lg p-6">
            {activeDiv === "profileDetails" && (
              <div className="text-purple-700 text-xl font-semibold">
                Profile Details
              </div>
            )}
            {activeDiv === "ordersDetails" && (
              <div className="text-purple-700 text-xl font-semibold">
                Orders Details
              </div>
            )}
            {activeDiv === "wishDetails" && (
              <div className="text-purple-700 text-xl font-semibold">
                Wishlist Details
              </div>
            )}
            {activeDiv === "addressDetails" && (
              <div className="text-purple-700 text-xl font-semibold">
                Address Details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
