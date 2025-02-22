import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <div className="h-[300px] bg-white pt-[50px]">
      <div className="w-[90%]  m-auto">
        <ul className="flex ml-[20px] space-x-[150px]">
          <li>
            <p className="font-bold text-xl">Customer Service</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>FAQ</li>
              <li>Returns & refunds</li>
              <li>Terms and conditions</li>
            </ul>
          </li>
          <li>
            <p className="font-bold text-xl">Pre-Owned Tech Hub</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>Store Locations</li>
              <li>Store hours</li>
              <li>Store events</li>
              <li>Fabrikam store support</li>
            </ul>
          </li>
          <li>
            <p className="font-bold text-xl">About Us</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>Our story</li>
              <li>Careers with Us</li>
              <li>News</li>
            </ul>
          </li>
          <li>
            <p className="font-bold text-xl">Customers</p>
            <ul className="mt-5 flex gap-5">
              <li>
                <FacebookIcon style={{ fontSize: 50 }} />
              </li>
              <li>
                <TwitterIcon style={{ fontSize: 50 }} />
              </li>
              <li>
                <InstagramIcon style={{ fontSize: 50 }} />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
