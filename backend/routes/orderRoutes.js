import express from "express";

import {
    createOrder,
    getOrders,
    getOrder,
    getMyOrders,
    updateOrderStatus,
    getOrderStats,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();


// ============================================================
// CUSTOMER
// ============================================================

router.post(
    "/",
    authMiddleware,
    createOrder
);


router.get(
    "/my-orders",
    authMiddleware,
    getMyOrders
);


// ============================================================
// ADMIN
// ============================================================

// Dashboard statistics
router.get(
    "/stats",
    authMiddleware,
    adminMiddleware,
    getOrderStats
);


// Get all orders
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getOrders
);


// Get single order
router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    getOrder
);


// Update order status
router.put(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
);


export default router;