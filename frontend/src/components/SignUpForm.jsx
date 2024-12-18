import React from "react";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import CloseButton from "./ui/CloseButton";

export default function SignUpForm({ setShowLogin, setIsSignUpFormVisible }) {
  const showLogin = () => {
    setShowLogin(true);
  };
  return (
    <div>
      {/* signup box */}
      <div className="bg-white p-8 rounded w-[500px] h-[600px] border-2 flex flex-col space-y-3 items-center shadow-2xl">
        <CloseButton close={() => setIsSignUpFormVisible(false)} />
        <h1 className="text-4xl font-bold mb-4">Sign Up Form</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <InputField size="medium" placeholder="First Name" />
            <InputField size="medium" placeholder="Last Name" />
          </div>
          <InputField placeholder="Email" />
          <InputField placeholder="Phone Number" />
          <InputField placeholder="Address" />
          <InputField placeholder="Password" />
          <InputField placeholder="Confirm Password" />
          <Button text="Sign Up" />
        </div>
        <p className="mt-4">
          Already have an account?
          <a
            href="#"
            onClick={showLogin}
            className="text-blue-500 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
