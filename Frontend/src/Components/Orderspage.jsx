// src/Pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useOrderStore } from "../Store/useOrdersStire";
import { ChevronDown, ChevronUp } from "lucide-react";

const statusSteps = ["pending", "paid", "shipped", "delivered", "cancelled"];

const OrdersPage = () => {
    const { orders, loading, getOrders } = useOrderStore();
    const [expandedOrders, setExpandedOrders] = useState({});

    useEffect(() => {
        getOrders();
    }, [getOrders]);

    const toggleOrder = (orderId) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    return (
        <div className="bg-gray-50 min-h-screen px-5 md:px-20 pt-25 ">
            <h1 className="text-2xl font-semibold border-b border-gray-300 pb-4">
                My Orders
            </h1>

            {loading ? (
                <div className="mt-6 space-y-5">
                    {Array(3).fill().map((_, i) => (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-xl p-6 shadow-md bg-white animate-pulse"
                        >
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        </div>
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 text-lg">
                    You don’t have any orders yet 📦
                </div>
            ) : (
                <div className="mt-6 space-y-6">
                    {orders.map((order) => {
                        const currentStepIndex = statusSteps.indexOf(order.status);
                        const isExpanded = expandedOrders[order.id] || false;

                        return (
                            <div
                                key={order.id}
                                className="border border-gray-300 rounded-xl  p-6 "
                            >
                                {/* Header */}
                                <div
                                    className="flex justify-between items-center mb-4 cursor-pointer"
                                    onClick={() => toggleOrder(order.id)}
                                >
                                    <div>
                                        <p className="font-semibold text-lg">
                                            Order #{order.id}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span className="font-medium">
                                            {isExpanded ? "Hide Details" : "View Details"}
                                        </span>
                                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                    </div>
                                </div>

                                {/* Status Stepper */}
                                <div className="flex flex-col md:flex-row items-start md:items-center w-full mb-3">
                                    {statusSteps.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex;
                                        const isLast = index === statusSteps.length - 1;

                                        return (
                                            <React.Fragment key={step}>
                                                {/* Step Circle and Label */}
                                                <div className="flex flex-row md:flex-col items-start md:items-center relative">
                                                    <div
                                                        className={`w-9 h-9 sm:w-11 sm:h-11 mb-3 md:mb-0 flex items-center justify-center rounded-full font-bold text-white transition-all duration-300 ${isCompleted ? "bg-black shadow-lg" : "bg-gray-300"
                                                            }`}
                                                    >
                                                        {index + 1}
                                                    </div>

                                                    <p className="text-xs sm:text-sm ml-3 md:ml-0 md:mt-2 capitalize">
                                                        {step}
                                                    </p>

                                                    {/* Vertical line for mobile */}
                                                    {!isLast && (
                                                        <div className="md:hidden w-1 h-full absolute top-9 left-4 sm:left-5">
                                                            <div
                                                                className={`w-1 h-full rounded-full transition-all duration-300 ${isCompleted ? "bg-black" : "bg-gray-300"
                                                                    }`}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Horizontal line for desktop */}
                                                {/* Horizontal line for desktop */}
                                                {!isLast && (
                                                    <div className="hidden md:flex flex-1 items-center relative">
                                                        <div
                                                            className={`absolute -top-3 w-full h-1 -translate-y-1/2 rounded-full transition-all duration-300 ${isCompleted ? "bg-black" : "bg-gray-300"
                                                                }`}
                                                        ></div>
                                                    </div>
                                                )}

                                            </React.Fragment>
                                        );
                                    })}
                                </div>






                                {/* Products - collapsible */}
                                {isExpanded && (
                                    <div className="space-y-3 mb-4">
                                        {order.order_items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-4 border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                                            >
                                                <img
                                                    src={item.products.images[0]?.image_url}
                                                    alt={item.products.name}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h2 className="font-medium text-sm line-clamp-1">
                                                        {item.products.name}
                                                    </h2>
                                                    <p className="text-gray-500 text-xs">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-medium">
                                                    ₹ {item.price * item.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Footer / Summary */}
                                <div className="flex justify-between items-center border-t pt-3 border-gray-300">
                                    <p className="text-sm text-gray-500">
                                        Razorpay Order ID: {order.razorpay_order_id}
                                    </p>
                                    <p className="font-bold text-lg">Total: ₹ {order.amount}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
