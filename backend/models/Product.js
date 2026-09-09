import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
            enum: ["Men", "Women", "Kids"],
        },

        subCategory: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        sizes: {
            type: [String],
            default: [],
        },

        bestseller: {
            type: Boolean,
            default: false,
        },

        images: {
            type: [String],
            default: [],
        },
    },

    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;