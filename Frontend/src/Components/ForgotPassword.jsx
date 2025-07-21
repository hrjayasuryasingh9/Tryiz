import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import Footer from "./Footer";
import { useAuthStore } from "../Store/useAuthStore";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const { forgotPasswrod, issendingforgotpasswordrequest } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswrod(email);
  };
  return (
    <div>
      <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center py-5 pt-40 pb-15">
        <div className=" w-full flex justify-center items-center flex-col md:w-[50%] ">
          <h1 className="text-center text-3xl">Change Your Password</h1>
          <h1 className="text-center text-lg py-3 max-w-[70%]">
            Please complete your email address to receive a link to reset your
            password.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center items-center flex-col"
          >
            <div className="w-[80%] pb-5">
              <p className="text-start pb-2">Email*</p>
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden text-[10px]">
                Enter valid email address
              </div>
            </div>
            <div className="text-start w-[80%] pb-2">
              Do you remember your Tryiz Account password ?
              <a
                className="link link-neutral"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </a>
            </div>
            <div className="w-[40%] py-5">
              <button className="btn btn-neutral hover:bg-base-100 w-full rounded-4xl h-13 hover:text-black">
                {issendingforgotpasswordrequest ? (
                  <span>
                    <Loader className="animate-spin size-5" />
                  </span>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
