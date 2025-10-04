// src/Pages/CartPage.jsx
import React, { useEffect } from "react";
import { useCartStore } from "../Store/useCartStore";
import { Trash2, Loader2 } from "lucide-react";
import { useOrderStore } from "../Store/useOrdersStire";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const {
        cart,
        loadingCart,
        getCartItems,
        deleteCartItem,
        updateCartItem,
        deletingCartId,
        updatingCartId,
    } = useCartStore();

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    const subtotal = cart.reduce((acc, item) => acc + item.products.price * item.quantity, 0);
    const { checkout, loading } = useOrderStore();
    const navigate = useNavigate();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        const res = await loadRazorpayScript();
        try {
            const items = cart.map((item) => ({
                product_id: item.products.id,
                quantity: item.quantity,
                price: item.products.price,
            }));

            const { razorpayOrder } = await checkout(items);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                order_id: razorpayOrder.id,
                handler: function (response) {
                    window.location.href = "/orders";
                    useOrderStore.getState().updatePayment(response);
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    return (
        <div className="bg-base-100 pt-25 min-h-screen px-5 md:px-20 ">
            <h1 className="text-2xl font-semibold border-b border-black/25 pb-4">My Cart</h1>

            {/* Skeletons */}
            {loadingCart ? (
                <div className="grid md:grid-cols-3 gap-10 mt-6">
                    <div className="md:col-span-2 space-y-5">
                        {Array(3)
                            .fill()
                            .map((_, i) => (
                                <div key={i} className="border rounded-xl p-4 flex items-center gap-4 shadow-md bg-white animate-pulse">
                                    <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="border rounded-xl p-6 shadow-md bg-white animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-full mt-6"></div>
                    </div>
                </div>
            ) : cart.length === 0 ? (
                <div className="text-center py-20 text-lg">Your cart is empty 🛒</div>
            ) : (
                <div className="grid md:grid-cols-3 gap-10 mt-6 pb-40 md:pb-0">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-5">
                        {cart.map((item) => (
                            <div key={item.id} className="border border-gray-300 rounded-xl p-4 flex items-center gap-4  bg-white">
                                <img
                                    src={item.products.images[0]?.image_url}
                                    alt={item.products.name}
                                    onClick={() => navigate(`/product/${item.products.id}`)}
                                    className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                                />
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold line-clamp-2 text-[13px]">{item.products.name}</h2>
                                    <p className="text-black/60">₹ {item.products.price}</p>

                                    <div className="mt-2 flex items-center gap-3">
                                        <select
                                            className="border rounded-lg px-2 py-1"
                                            value={item.quantity}
                                            onChange={(e) => updateCartItem(item.id, Number(e.target.value))}
                                            disabled={updatingCartId === item.id}
                                        >
                                            {[1, 2, 3, 4, 5].map((q) => (
                                                <option key={q} value={q}>{q}</option>
                                            ))}
                                        </select>

                                        <button
                                            onClick={() => deleteCartItem(item.id)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                            disabled={deletingCartId === item.id}
                                        >
                                            {deletingCartId === item.id ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <Trash2 size={20} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <p className="font-medium">₹ {item.products.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="hidden md:block border border-gray-300 h-fit rounded-xl p-6  bg-white">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>₹ {subtotal}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total</span>
                            <span>₹ {subtotal}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-black/80 transition flex justify-center items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                "CheckOut"
                            )}
                        </button>
                    </div>
                </div>
            )}
            {cart.length > 0 && (
                <div className="md:hidden z-20 fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white p-4 shadow-lg">
                    <div className="flex justify-between font-bold text-lg mb-3">
                        <span>Total</span>
                        <span>₹ {subtotal}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-black/80 transition flex justify-center items-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Processing...
                            </>
                        ) : (
                            "CheckOut"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
