import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

function NavMenu() {
  return (
    <div className="flex bg-customGray h-[50px] items-center font-bold ">
      <ul className="flex justify-evenly w-[70%]">
        <li>
          <MenuIcon style={{ fontSize: 30 }}  />
        </li>
        <li>All Categories</li>
        <li>Home</li>
        <li>Shop</li>
        <li>Blog</li>
        <li>Contact Us</li>
      </ul>
    </div>
  );
}

export default NavMenu;
