import React, { useState } from "react";
import Header from "./Header";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

export default function Home() {
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Toggle the visibility of the SignUpForm
  const toggleSignUpForm = () => {
    setIsSignUpFormVisible(!isSignUpFormVisible);
    setShowLogin(false);
  };

  return (
    <div>
      {/* Main content with optional blur effect */}
      <div className={isSignUpFormVisible ? "blur-sm" : ""}>
        <Header onSignUpClick={toggleSignUpForm} />
      </div>

      {/* Modal for SignUpForm */}
      {isSignUpFormVisible ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {showLogin ? (
            <LoginForm
              setShowLogin={setShowLogin}
              setIsSignUpFormVisible={setIsSignUpFormVisible}
            />
          ) : (
            <SignUpForm
              setShowLogin={setShowLogin}
              setIsSignUpFormVisible={setIsSignUpFormVisible}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}
