import Product from "../models/Product.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get products",
            error: error.message,
        });
    }
};


// GET ONE PRODUCT
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get product",
            error: error.message,
        });
    }
};


// CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            subCategory,
            price,
            sizes,
            bestseller,
        } = req.body;

        // Get uploaded images
        const images =
            req.files?.map((file) => `/uploads/${file.filename}`) || [];

        const product = await Product.create({
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            sizes: JSON.parse(sizes || "[]"),
            bestseller: bestseller === "true",
            images,
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            message: "Failed to create product",
            error: error.message,
        });
    }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // Handle sizes whether they arrive as an array or JSON string
        let sizes = [];

        if (Array.isArray(req.body.sizes)) {
            sizes = req.body.sizes;
        } else if (typeof req.body.sizes === "string") {
            sizes = JSON.parse(req.body.sizes);
        }

        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.subCategory = req.body.subCategory;
        product.price = Number(req.body.price);
        product.sizes = sizes;

        // Handle bestseller
        product.bestseller =
            req.body.bestseller === true ||
            req.body.bestseller === "true";

        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);

        res.status(400).json({
            message: "Failed to update product",
            error: error.message,
        });
    }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message,
        });
    }
};