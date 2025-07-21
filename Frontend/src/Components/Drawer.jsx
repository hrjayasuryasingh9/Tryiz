// Components/Drawer.jsx
import React from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus } from "lucide-react";

const Drawer = ({ isOpen, onClose }) => {
  const { authUser, Logoutuser } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleSignUp = () => {
    onClose();
    navigate("/signup");
  };
  const handleLogout = () => {
    onClose();
    Logoutuser();
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 pl-3 h-full w-90 bg-base-200 shadow-lg z-50 transform transition-transform duration-500 md:w-140 md:pl-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center bg-base-200">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="text-xl btn btn-neutral btn-circle p-3"
          >
            X
          </button>
        </div>
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 text-xl font-semibold">
          {/* Sidebar content here */}
          {!authUser ? (
            <div>
              <li>
                <a onClick={handleLogin}>
                  <LogIn className="size-5" />
                  Login
                </a>
              </li>
              <li>
                <a onClick={handleSignUp}>
                  <UserPlus className="size-5" />
                  Signup
                </a>
              </li>
            </div>
          ) : (
            <li>
              <a className="text-lg cursor-pointer" onClick={handleLogout}>
                <LogOut className="size-5" />
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Drawer;
