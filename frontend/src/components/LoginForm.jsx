import React from "react";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { CgProfile } from "react-icons/cg";
import CloseButton from "./ui/CloseButton";

export default function LoginForm({ setShowLogin, setIsSignUpFormVisible }) {
  return (
    <div>
      {/* login box */}
      <div className="bg-white p-8 rounded w-[500px] h-[600px] border-2 flex flex-col space-y-3 items-center shadow-2xl">
        <CloseButton close={() => setIsSignUpFormVisible(false)} />
        <h1 className="text-4xl font-bold mb-4">Login Form</h1>
        <div className="  bg-gray-500 w-[150px] h-[150px] flex items-center justify-center rounded-full shadow-md mb-4 ">
          <CgProfile size={100} className="text-white" />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <InputField id="email" placeholder="Email" />
          </div>

          <div>
            <label
              className="text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <InputField id="password" placeholder="Password" />
          </div>

          <Button text="Login" />
        </div>
        <p className="mt-4">
          Don't have an account?
          <a
            href="#"
            onClick={() => setShowLogin(false)}
            className="text-blue-500 hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
