import Order from "../models/Order.js";
import Product from "../models/Product.js";


// ======================================================
// CREATE ORDER
// ======================================================

export const createOrder = async (req, res) => {
    try {

        const {
            customer,
            items,
            paymentMethod,
            subtotal,
            deliveryFee,
            total,
        } = req.body;


        // Check customer and products

        if (!customer || !items || items.length === 0) {

            return res.status(400).json({
                message: "Customer information and items are required",
            });

        }


        // Create order

        const order = await Order.create({

            // Logged-in user's ID
            user: req.user._id,

            customer,
            items,
            paymentMethod,
            subtotal,
            deliveryFee,
            total,

        });


        res.status(201).json({

            message: "Order placed successfully",

            order,

        });


    } catch (error) {

        console.error(
            "CREATE ORDER ERROR:",
            error
        );

        res.status(400).json({

            message: "Failed to place order",

            error: error.message,

        });

    }
};



// ======================================================
// GET MY ORDERS
// ======================================================

export const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            user: req.user._id,

        }).sort({

            createdAt: -1,

        });


        res.status(200).json(orders);


    } catch (error) {

        console.error(
            "GET MY ORDERS ERROR:",
            error
        );

        res.status(500).json({

            message: "Failed to get your orders",

            error: error.message,

        });

    }

};



// ======================================================
// GET ALL ORDERS
// ======================================================

export const getOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });


        res.status(200).json(orders);


    } catch (error) {

        console.error(
            "GET ORDERS ERROR:",
            error
        );

        res.status(500).json({

            message: "Failed to get orders",

            error: error.message,

        });

    }

};



// ======================================================
// GET SINGLE ORDER
// ======================================================

export const getOrder = async (req, res) => {

    try {

        const order = await Order.findById(
            req.params.id
        );


        if (!order) {

            return res.status(404).json({

                message: "Order not found",

            });

        }


        res.status(200).json(order);


    } catch (error) {

        console.error(
            "GET ORDER ERROR:",
            error
        );

        res.status(500).json({

            message: "Failed to get order",

            error: error.message,

        });

    }

};



// Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Order Placed",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        console.error("UPDATE ORDER STATUS ERROR:", error);

        res.status(500).json({
            message: "Failed to update order status",
            error: error.message,
        });
    }
};



export const getOrderStats = async (req, res) => {
    try {
        // ============================================
        // TOTAL PRODUCTS
        // ============================================

        const totalProducts = await Product.countDocuments();


        // ============================================
        // TOTAL ORDERS
        // ============================================

        const totalOrders = await Order.countDocuments();


        // ============================================
        // PENDING ORDERS
        // ============================================

        const pendingOrders = await Order.countDocuments({
            status: {
                $nin: ["Delivered", "Cancelled"],
            },
        });


        // ============================================
        // TOTAL REVENUE
        // ============================================

        const revenueResult = await Order.aggregate([
            {
                $match: {
                    status: {
                        $ne: "Cancelled",
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$total",
                    },
                },
            },
        ]);


        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;


        // ============================================
        // SEND RESPONSE
        // ============================================

        res.status(200).json({
            totalProducts,
            totalOrders,
            pendingOrders,
            totalRevenue,
        });


    } catch (error) {

        console.error(
            "GET ORDER STATS ERROR:",
            error
        );


        res.status(500).json({
            message: "Failed to get order statistics",
            error: error.message,
        });

    }
};