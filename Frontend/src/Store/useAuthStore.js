import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import { verification } from "../../../Backend/src/Services/userServices";
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
  login: async (data) => {
    try {
      set({ issigningin: true });

      const response = await axiosInstance.post("/auth/login", data);
      const user = response.data;
      if (user) {
        set({ authUser: user });
        toast.success("Login Successfuly");
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
  Logoutuser: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
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
