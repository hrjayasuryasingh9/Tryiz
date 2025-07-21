import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useProductsStore = create((set, get) => ({
  Products: [],
  isProductLoading: false,
  getProducts: async () => {
    set({ isProductLoading: false });
    try {
      const product = await axiosInstance.get("products/getproducts");
      console.log(product.data.data);
      set({ Products: product.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isProductLoading: false });
    }
  },
}));
