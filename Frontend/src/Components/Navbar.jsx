import React, { useState, useEffect } from "react";
import Drawer from "./Drawer";
import {
  AlignJustify,
  User,
  ShoppingBag,
  Plus,
  Heart,
  CalendarArrowUp,
  CircleUser,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../Store/useWishlistStore";
import { useCartStore } from "../Store/useCartStore.js";


const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { authUser, Logoutuser } = useAuthStore();
  const { wishlistProductsId, wishlistCount, getWishlistCount } = useWishlistStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    Logoutuser();
  };
  const toggleDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const {
    cartCount, getCartCount
  } = useCartStore();

  useEffect(() => {
    getCartCount();
    getWishlistCount();
  }, [getCartCount, getWishlistCount, authUser]);
  // console.log(cartCount)
  return (
    <div>
      <div className="fixed navbar bg-base-100 shadow-sm px-5 md:px-20 z-10 h-20">
        <div className="navbar-start">
          <div>
            <a
              className="text-xl not-sm:inline hidden font-bold cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              T R Y I Z
            </a>
          </div>
          <div className="hover:cursor-pointer sm:inline hidden group">
            <div className="flex justify-center align-middle font-semibold">
              <Plus className="size-4 font-bold mt-1.5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
              <span className="mb-0.5">Contact Us</span>
            </div>
          </div>
        </div>
        <div className="navbar-center sm:inline hidden">
          <a
            className="text-3xl font-semibold cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            T R Y I Z
          </a>
        </div>
        <div className="navbar-end gap-2 md:gap-5">
          {authUser ? (
            <div className="gap-2 md:gap-5 flex justify-center items-center">
              <div className="flex justify-center align-middle hover:cursor-pointer">
                <div className="indicator ">
                  <span className="indicator-item badge rounded-full bg-black text-base-100 text-[9px] border-none w-[9px] h-[18px] md:text-[10px] md:w-[13px] md:h-[22px]">
                    {cartCount}
                  </span>
                  <ShoppingBag
                    className="size-5 md:size-6"
                    onClick={() =>
                      authUser
                        ? navigate("/cart")
                        : toast.error("Please login to access your wishlist")
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center align-middle hover:cursor-pointer">
                <div className="indicator ">
                  <span className="indicator-item badge rounded-full bg-black text-base-100 text-[9px] border-none w-[9px] h-[18px] md:text-[10px] md:w-[13px] md:h-[22px]">
                    {wishlistCount}
                  </span>
                  <Heart
                    className="size-5 md:size-6"
                    onClick={() =>
                      authUser
                        ? navigate("/wishlist")
                        : toast.error("Please login to access your wishlist")
                    }
                  />
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex justify-center align-middle hover:cursor-pointer"
                >
                  <User className="size-5.5 md:size-6" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-40 p-2 shadow"
                >
                  <li onClick={() =>
                    authUser
                      ? navigate("/orders")
                      : toast.error("Please login to access your wishlist")
                  }>
                    <a className="text-lg cursor-pointer">
                      <CalendarArrowUp className="size-4" />
                      My orders
                    </a>
                  </li>
                  <li onClick={() =>
                    authUser
                      ? navigate("/profile")
                      : toast.error("Please login to access your wishlist")
                  }>
                    <a className="text-lg cursor-pointer">
                      <CircleUser className="size-4" />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-lg cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <span></span>
          )}

          <div>
            <div
              className="flex justify-center align-middle hover:cursor-pointer"
              onClick={toggleDrawer}
            >
              <AlignJustify className="size-6 md:size-7 sm:inline mt-0.5" />
              <span className="pl-1 font-semibold sm:inline hidden">Menu</span>
            </div>
          </div>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
};

export default Navbar;
