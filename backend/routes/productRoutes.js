import express from "express";

import {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
} from "../controllers/productController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// GET ALL PRODUCTS
router.get("/", getProducts);


// GET ONE PRODUCT
router.get("/:id", getProduct);


// CREATE PRODUCT
router.post(
    "/",
    upload.array("images", 4),
    createProduct
);


// UPDATE PRODUCT
router.put("/:id", updateProduct);


// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;