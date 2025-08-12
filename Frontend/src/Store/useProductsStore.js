import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useProductsStore = create((set, get) => ({
  Products: [],
  product:{},
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
  getProduct: async (id) => {
  set({ isProductLoading: true });
  try {
    const res = await axiosInstance.get(`/products/getproduct/${id}`);
    let product = res.data.data;

    // Duplicate the first image as the 4th image
    if (product.images && product.images.length >= 1) {
      product.images = [...product.images, product.images[0]];
    }

    set({ product: product });
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch product");
  } finally {
    set({ isProductLoading: false });
  }
}
}));
