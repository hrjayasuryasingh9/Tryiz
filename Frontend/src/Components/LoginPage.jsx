import React, { useState } from "react";
import { AlignJustify, User, ShoppingBag, Plus, Heart } from "lucide-react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { Loader } from "lucide-react";
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { issigningin, login, authUser } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const user = await login(formData);
    if (user) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="w-full h-auto md:h-screen flex flex-col md:flex-row justify-center items-center pt-5">
        <div className="h-screen w-full flex justify-center items-center flex-col md:w-[50%]">
          <h1 className="text-center text-3xl">Welcome Back</h1>
          <h1 className="text-center text-lg py-3 max-w-[80%]">
            Sign in with your email address and your password
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center items-center flex-col"
          >
            <div className="w-[80%] py-5">
              <p className="text-start py-2">Email*</p>
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
              <div className="validator-hint hidden text-[10px]">
                Enter valid email address
              </div>
            </div>
            <div className="w-[80%]">
              <h1 className="py-2">Password*</h1>
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
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </label>
              <p className="validator-hint hidden text-[10px]">
                Must be more than 8 characters, including At least one number At
                least one lowercase letter At least one uppercase letter
              </p>
            </div>
            <div className="text-start w-[80%] py-5 cursor-pointer">
              <a
                className="link link-neutral"
                onClick={() => {
                  navigate("/forgotpassword");
                }}
              >
                Forgot your Password?
              </a>
            </div>
            <div className="text-start w-[80%] pb-5">
              Dont have an Tryiz Account ?
              <a
                className="link link-neutral"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create Account
              </a>
            </div>
            <div className="w-[40%]">
              <button className="btn btn-neutral hover:bg-base-100 w-full rounded-4xl h-13 hover:text-black">
                {issigningin ? (
                  <span>
                    <Loader className="animate-spin size-5" />
                  </span>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-[50%]">
          <div className="flex justify-center items-center flex-col w-full h-full p-4">
            <div className="flex justify-center items-center bg-[#f6f5f3] min-w-[50%] max-w-[100%] flex-col ">
              <div className="flex justify-items-start flex-col p-5">
                <div className="text-black/70 px-5 text-[12px] flex justify-items-start">
                  WHAT YOU FIND IN YOUR TRYIZ ACCOUNT
                </div>
                <div className="text-black text-[13px] mx-5 border-b-1 border-black/25  flex justify-center items-center py-6">
                  <ShoppingBag className="pr-2" />
                  <span>
                    Track your orders,repairs and access your invoices
                  </span>
                </div>
                <div className="text-black text-[13px] mx-5 border-b-1 border-black/25  flex justify-items-start py-6">
                  <ShoppingBag className="pr-2" />
                  <span>Manage your personal information.</span>
                </div>
                <div className="text-black text-[13px] mx-5 border-b-1 border-black/25  flex justify-items-start items-center py-6">
                  <ShoppingBag className="pr-2" />
                  <span>Receive newsletters from Louis Vuitton</span>
                </div>
                <div className="text-black text-[13px] mx-5  border-black/25  flex justify-items-start py-6">
                  <ShoppingBag className="pr-2" />
                  <span>Create, view and share your wishlist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
