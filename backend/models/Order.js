import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        customer: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
        },

        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                name: {
                    type: String,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                },

                image: {
                    type: String,
                    default: "",
                },

                size: {
                    type: String,
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],

        paymentMethod: {
            type: String,
            enum: ["Cash on Delivery"],
            default: "Cash on Delivery",
        },

        subtotal: {
            type: Number,
            required: true,
        },

        deliveryFee: {
            type: Number,
            required: true,
        },

        total: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Order Placed",
                "Packed",
                "Shipped",
                "Out for Delivery",
                "Delivered",
                "Cancelled",
            ],
            default: "Order Placed",
        },
    },

    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;