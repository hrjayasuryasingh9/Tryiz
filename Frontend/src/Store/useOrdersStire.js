// src/Store/useOrderStore.js
import { create } from "zustand";
import { toast } from "react-hot-toast"; // make sure you have this installed
import { axiosInstance } from "../lib/axios";

export const useOrderStore = create((set) => ({
    orders: [],
    loading: false,
    error: null,
    currentOrder: null,

    // Checkout - creates order
    checkout: async (items) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.post("/orders/create", { items });
            set({ currentOrder: res.data.order, loading: false });
            return res.data; // includes razorpayOrder
        } catch (err) {
            const message = err.response?.data?.message || "Checkout failed";
            set({ error: message, loading: false });
            toast.error(message);
            throw err;
        }
    },

    // Update payment
    updatePayment: async (paymentData) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.post("/orders/update-payment", paymentData);
            set({ loading: false });
            toast.success("Payment successful!");
            return res.data;
        } catch (err) {
            const message = err.response?.data?.message || "Payment update failed";
            set({ error: message, loading: false });
            toast.error(message);
            throw err;
        }
    },

    // Fetch all orders
    getOrders: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.get("/orders");
            set({ orders: res.data.data, loading: false });
            // toast.success("Orders fetched successfully!");
        } catch (err) {
            const message = err.response?.data?.message || "Failed to fetch orders";
            set({ error: message, loading: false });
            toast.error(message);
        }
    },

    // Fetch single order
    getOrderById: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.get(`/orders/${id}`);
            set({ currentOrder: res.data.data, loading: false });
            // toast.success("Order details fetched!");
            return res.data.data;
        } catch (err) {
            const message = err.response?.data?.message || "Order not found";
            set({ error: message, loading: false });
            toast.error(message);
        }
    },
}));

export default useOrderStore;
