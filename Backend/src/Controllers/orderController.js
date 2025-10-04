import * as orderServices from "../Services/orderServices.js";

// Checkout & create order
const checkout = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = req.body.items; // [{ product_id, quantity, price }]
        const result = await orderServices.createOrder(userId, items);

        res.status(200).json({
            message: "Order created successfully",
            order: result.order,
            razorpayOrder: result.razorpayOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

// Update payment after Razorpay callback
const updatePayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const updated = await orderServices.updateOrderPayment(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        res.status(200).json({ message: "Payment updated successfully", updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get orders for logged-in user
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderServices.getUserOrders(userId);

        res.status(200).json({ data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = Number(req.params.id);
        const order = await orderServices.getOrderById(orderId);

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { checkout, updatePayment, getOrders, getOrderById };
