import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import toast from "react-hot-toast";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { isResettingPassword, resetPassword } = useAuthStore();
  const [Token, setToken] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const verifyToken = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    setToken(token);
    console.log(token);
    if (!token) {
      toast.error("Your are not allowed to change the password");
      navigate("/");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      toast.error("Passwords didnt match");
      return;
    }
    const response = await resetPassword(Token, formData.password);
    console.log(response);
    if (response.status == 200) {
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div>
      <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center py-5 pt-40 pb-15">
        <div className=" w-full flex justify-center items-center flex-col md:w-[50%] px-2">
          <h1 className="text-center text-3xl">Change Your Password</h1>
          <h1 className="text-center text-lg py-3 max-w-[70%]">
            Please enter your new password to complete the reset process and
            secure your account.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center items-center flex-col"
          >
            <div className="w-[80%] pb-5">
              <h1 className="py-2">New Password*</h1>
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
            <div className="w-[80%] pb-5">
              <h1 className="py-2">Confirm New Password*</h1>
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
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </label>
              <p className="validator-hint hidden text-[10px]">
                Must be more than 8 characters, including At least one number At
                least one lowercase letter At least one uppercase letter
              </p>
            </div>
            <div className="w-[40%] py-5">
              <button className="btn btn-neutral hover:bg-base-100 w-full rounded-4xl h-13 hover:text-black">
                {isResettingPassword ? (
                  <span>
                    <Loader className="animate-spin size-5" />
                  </span>
                ) : (
                  <span>Reset</span>
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

export default ResetPassword;
