import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const useAuthStore = create((set, get) => ({
  authUser: false,
  issigningin: false,
  isCheckingAuth: false,
  issendingforgotpasswordrequest: false,
  isResettingPassword: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  SignIn: async (data) => {
    try {
      set({ issigningin: true });
      const response = await axiosInstance.post("/auth/signup", data);
      console.log(response);
      const user = response.data;
      if (user) {
        toast.success("Please Verify Your Email Before Login");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      return false;
    } finally {
      set({ issigningin: false });
    }
  },
  login: async (credentials) => { // renamed from data to credentials to avoid shadowing
    try {
      set({ issigningin: true });
      const response = await axiosInstance.post("/auth/login", credentials);

      // Destructure correctly from API response
      const { data: userData, accessToken } = response.data;

      console.log(accessToken);
      console.log(userData);

      if (userData && accessToken) {
        // Store user in state
        set({ authUser: userData });

        // Store token in localStorage
        localStorage.setItem("accessToken", accessToken);

        toast.success("Login Successfully");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ issigningin: false });
    }
  },


  Logoutuser: async () => {
    try {
      await axiosInstance.get("/auth/logout");

      // Clear state & localStorage
      set({ authUser: null });
      localStorage.removeItem("accessToken");

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },
  forgotPasswrod: async (email) => {
    try {
      set({ issendingforgotpasswordrequest: true });
      const data = { email: email };
      const response = await axiosInstance.post("/auth/forgotpassword", data);
      toast.success(response.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
        console.error("Axios error:", error);
      }
    } finally {
      set({ issendingforgotpasswordrequest: false });
    }
  },
  resetPassword: async (token, password) => {
    try {
      set({ isResettingPassword: true });
      const data = { password: password };
      const response = await axiosInstance.post(
        `/auth/changepassword?token=${token}`,
        data
      );
      toast.success(
        "The password changed successfully,Please Continue with login"
      );
      return response;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
        console.error("Axios error:", error);
      }
    } finally {
      set({ isResettingPassword: false });
    }
  },
}));
