import React from "react";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import Button from "../components/Button";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Footer from "../components/Footer";

function Contact() {
  const contactInfo = [
    { icon: <LocalPhoneIcon />, text: "+123 456 7890" },
    { icon: <FmdGoodIcon />, text: "123 Main Street, City, Country" },
    { icon: <MailIcon />, text: "support@example.com" },
    { icon: <WhatsAppIcon />, text: "+123 456 7890" },
  ];

  return (
    <div className="bg-customBg">
      <Navbar />
      <div>
        <NavMenu />
      </div>
      {/* content */}
      <div className="w-[90%] mt-5 m-auto">
        {/* form */}
        <div className="flex h-[500px]">
          {/* right */}
          <form className="w-[70%]">
            <h1 className="font-bold text-2xl p-5">Contact Us</h1>
            <div className="flex gap-5">
              <InputField className="w-[353px]" placeHolder="First Name" />
              <InputField className="w-[353px]" placeHolder="Last Name" />
            </div>
            <InputField className="w-[80%]" placeHolder="Email" type="email" />
            <InputField
              className="w-[80%]"
              placeHolder="Phone no."
              type="email"
            />
            <InputField
              className="w-[80%] h-[155px]"
              placeHolder="message"
              type="textarea"
            />
            <Button name="Submit" />
          </form>
          {/* Left */}
          <div className="bg-white rounded-lg flex justify-center items-center w-[26%]">
            <div className="h-[70%] w-[70%]">
              <h1 className="font-bold text-2xl">Need a help?</h1>
              <ul className="flex flex-col gap-4 mt-6">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    {item.icon}
                    {item.text}
                  </li>
                ))}
                <li className="flex flex-col mt-10">
                  <h1 className="font-bold">Follow Us on</h1>
                  <div className="flex space-x-5 mt-4">
                    <FacebookIcon fontSize="large" />
                    <InstagramIcon fontSize="large" />
                    <XIcon fontSize="large" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* map */}
        <div className="mt-[60px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8361.97266357762!2d83.99549411923068!3d28.21410470838929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959434ad2a5bf9%3A0xf4e7f9c749f63113!2sInformatics%20College%20Pokhara!5e0!3m2!1sen!2snp!4v1740820614606!5m2!1sen!2snp"
            className="w-full h-[450px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
