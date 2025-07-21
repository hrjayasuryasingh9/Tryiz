import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { data } from "react-router-dom";
export const useWishlistStore = create((set, get) => ({
  isgettingWishlist: false,
  addingProductId: null,
  wishlistProductsId: [],
  wishlist: [],
  addToWishlist: async (id) => {
    try {
      set({ addingProductId: id });
      const data = { pid: id };
      const authUser = useAuthStore.getState().authUser;
      if (!authUser) {
        throw new Error("Please Login Or Authenticate yourself");
      }
      const item = await axiosInstance.post("/wishlist/addtowishlist", data);

      const { wishlistProductsId, wishlist } = get();
      const itemdata = item.data.data;
      const updatedWishlist = [...wishlist, itemdata];
      const updatedIds = [...wishlistProductsId, id];
      set({ wishlistProductsId: updatedIds, wishlist: updatedWishlist });
      toast.success("product added to the wishlist successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ addingProductId: null });
    }
  },
  getWishlist: async () => {
    try {
      set({ isgettingWishlist: true });
      const response = await axiosInstance.get("/wishlist/getwishlistitems");
      const wishlist = response.data.data;
      const wishlistProductsId = wishlist.map((item) => item.products.id);
      set({ wishlist: wishlist, wishlistProductsId: wishlistProductsId });
      console.log(wishlist);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isgettingWishlist: false });
    }
  },
  removeitemfromwishlist: async (pid) => {
    try {
      set({ addingProductId: pid });
      const { wishlist, wishlistProductsId } = get();
      const itemToRemove = wishlist.find((item) => item.products.id === pid);
      const response = await axiosInstance.delete(
        `/wishlist/deletewishlistitem/${itemToRemove.id}`
      );
      const updatedWishlist = wishlist.filter(
        (item) => item.products.id !== pid
      );
      const updatedIds = wishlistProductsId.filter((itemId) => itemId !== pid);
      set({ wishlist: updatedWishlist, wishlistProductsId: updatedIds });
      toast.success("Product Removed From The wishlist");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ addingProductId: null });
    }
  },
}));
