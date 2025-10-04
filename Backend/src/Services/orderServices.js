import prisma from "../../prisma/prismaclient.js";
import Razorpay from "razorpay";

// Initialize Razorpay client
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create a new order:
 * - Calculates total amount from cart/items
 * - Creates Razorpay order
 * - Creates order in database along with order_items
 */
const createOrder = async (userId, items) => {
    // Fetch user to check for address
    const user = await prisma.users.findUnique({
        where: { id: userId },
    });

    if (!user?.address || user.address.trim() === "") {
        throw new Error("Please add a delivery address before placing an order.");
    }

    // Calculate total amount
    const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(amount * 100), // in paise
        currency: "INR",
        receipt: `order_rcpt_${Date.now()}`,
    });

    // Save order in DB
    const order = await prisma.orders.create({
        data: {
            user_id: userId,
            amount,
            status: "pending",
            razorpay_order_id: razorpayOrder.id,
            order_items: {
                create: items.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: { order_items: true },
    });

    return { order, razorpayOrder };
};


/**
 * Update order after payment
 */
const updateOrderPayment = async (razorpay_order_id, payment_id, signature, status = "paid") => {
    const order = await prisma.orders.updateMany({
        where: { razorpay_order_id },
        data: {
            razorpay_payment_id: payment_id,
            razorpay_signature: signature,
            status,
        },
    });
    return order;
};

/**
 * Get all orders for a user
 */
const getUserOrders = async (userId) => {
    return await prisma.orders.findMany({
        where: { user_id: userId },
        include: {
            order_items: {
                include: {
                    products: {
                        include: { images: true }
                    }
                }
            }
        },
        orderBy: { created_at: "desc" },
    });
};

/**
 * Get order by its ID
 */
const getOrderById = async (orderId) => {
    return await prisma.orders.findUnique({
        where: { id: orderId },
        include: { order_items: { include: { products: true } } },
    });
};

export { createOrder, updateOrderPayment, getUserOrders, getOrderById };
