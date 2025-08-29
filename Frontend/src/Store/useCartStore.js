// src/Store/useCartStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    cartCount: 0,
    // 🔥 loader states
    loadingCart: false,         // for fetching cart
    addingCartId: null,         // for specific product being added
    updatingCartId: null,       // for updating item quantity
    deletingCartId: null,       // for deleting item

    // ✅ Get cart items
    getCartItems: async () => {
        try {
            // set({ loadingCart: true });
            const res = await axiosInstance.get("/cart/getcartitems", { withCredentials: true });
            console.log(res.data.data)
            set({ cart: res.data.data, loadingCart: false });
        } catch (error) {
            console.error("Error fetching cart items:", error);
            set({ loadingCart: false });
        }
    },

    // ✅ Add item to cart
    addCartItem: async (pid, quantity = 1) => {
        try {
            set({ addingCartId: pid });
            await axiosInstance.post("/cart/addcartitem", { pid, quantity }, { withCredentials: true });
            toast.success(
                "Product Added to the cart"
            );
            // ✅ use pid
            await get().getCartItems();
            await get().getCartCount();
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
            console.error("Axios error:", error);
        }
        finally {
            set({ addingCartId: null });
        }
    },

    // ✅ Update item quantity
    updateCartItem: async (id, quantity) => {
        try {
            set({ updatingCartId: id });
            await axiosInstance.patch(`/cart/updatecartitem/${id}`, { quantity }, { withCredentials: true });
            await get().getCartItems();
        } catch (error) {
            console.error("Error updating cart item:", error);
        } finally {
            set({ updatingCartId: null });
        }
    },

    // ✅ Delete cart item
    deleteCartItem: async (id) => {
        try {
            set({ deletingCartId: id });
            await axiosInstance.delete(`/cart/deletecartitem/${id}`, { withCredentials: true });
            await get().getCartItems();
            // await get().getCartCount();
        } catch (error) {
            console.error("Error deleting cart item:", error);
        } finally {
            set({ deletingCartId: null });
        }
    },

    // ✅ Get cart count
    getCartCount: async () => {
        try {
            const res = await axiosInstance.get("/cart/getcartcount", { withCredentials: true });
            // console.log(res)
            set({ cartCount: res.data.data });
        } catch (error) {
            console.error("Error getting cart count:", error);
        }
    },
}));
