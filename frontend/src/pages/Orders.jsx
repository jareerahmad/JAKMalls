import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Order() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const subtotal = cart.reduce(
        (total, item) =>
            total + Number(item.price) * Number(item.quantity),
        0
    );

    const deliveryFee = subtotal > 0 ? 6 : 0;

    const total = subtotal + deliveryFee;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            Swal.fire({
                title: "Cart is Empty",
                text: "Please add some products before placing an order.",
                icon: "warning",
                confirmButtonColor: "#db2777",
            });

            return;
        }

        const orderData = {
            customer: formData,
            items: cart.map((item) => ({
                productId: item.productId,
                name: item.name,
                price: Number(item.price),
                image: item.image || "",
                size: item.size,
                quantity: Number(item.quantity),
            })),
            paymentMethod,
            subtotal,
            deliveryFee,
            total,
        };

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                Swal.fire({
                    title: "Login Required",
                    text: "Please login before placing your order.",
                    icon: "warning",
                    confirmButtonColor: "#db2777",
                }).then(() => {
                    navigate("/login");
                });

                return;
            }

            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(orderData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to place order"
                );
            }

            // Clear cart
            localStorage.removeItem("cart");

            // Update navbar cart counter
            window.dispatchEvent(new Event("cartUpdated"));

            Swal.fire({
                title: "Order Placed!",
                text: "Your order has been placed successfully.",
                icon: "success",
                confirmButtonColor: "#db2777",
            }).then(() => {
                navigate("/orders");
            });

        } catch (error) {
            console.error("ORDER ERROR:", error);

            Swal.fire({
                title: "Order Failed",
                text: error.message || "Something went wrong.",
                icon: "error",
                confirmButtonColor: "#db2777",
            });
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-semibold text-gray-800 mb-3">
                    Your Cart is Empty
                </h1>

                <p className="text-gray-500 mb-6 text-center">
                    Add some products to your cart before proceeding to checkout.
                </p>

                <button
                    onClick={() => navigate("/collection")}
                    className="bg-pink-700 hover:bg-pink-800 text-white px-6 py-3 rounded-lg transition"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-10">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
                        Checkout
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Enter your shipping information to place your order.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >

                    {/* Customer Information */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">

                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Shipping Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="03XXXXXXXXX"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600"
                                />
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter complete delivery address"
                                    rows="4"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600 resize-none"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600"
                                />
                            </div>

                            {/* State */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State / Province
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Enter province"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600"
                                />
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Postal Code
                                </label>

                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="Postal code"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600"
                                />
                            </div>

                        </div>

                        {/* Payment */}
                        <div className="mt-8">

                            <h2 className="text-xl font-semibold text-gray-800 mb-5">
                                Payment Method
                            </h2>

                            <label className="flex items-center gap-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-pink-500 transition">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Cash on Delivery"
                                    checked={paymentMethod === "Cash on Delivery"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="accent-pink-700"
                                />

                                <div>
                                    <p className="font-medium text-gray-800">
                                        Cash on Delivery
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Pay when your order arrives.
                                    </p>
                                </div>
                            </label>

                        </div>

                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm p-6 h-fit">

                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Order Summary
                        </h2>

                        {/* Products */}
                        <div className="space-y-4 mb-6">

                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 border-b border-gray-100 pb-4"
                                >
                                    <img
                                        src={
                                            item.image
                                                ? `http://localhost:5000${item.image}`
                                                : "/placeholder.jpg"
                                        }
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-800">
                                            {item.name}
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Size: {item.size}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="text-sm font-medium text-gray-800">
                                        ${" "}
                                        {(
                                            Number(item.price) *
                                            Number(item.quantity)
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            ))}

                        </div>

                        {/* Price Details */}
                        <div className="space-y-4 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    ${subtotal.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Delivery Fee
                                </span>

                                <span className="font-medium">
                                    ${deliveryFee.toLocaleString()}
                                </span>
                            </div>

                            <div className="border-t pt-4 flex justify-between text-lg">
                                <span className="font-semibold">
                                    Total
                                </span>

                                <span className="font-semibold text-pink-700">
                                    ${total.toLocaleString()}
                                </span>
                            </div>

                        </div>

                        {/* Place Order */}
                        <button
                            type="submit"
                            className="w-full mt-7 bg-pink-700 hover:bg-pink-800 text-white py-3 rounded-lg font-medium transition"
                        >
                            Place Order
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/mycart")}
                            className="w-full mt-3 border border-gray-300 hover:border-pink-600 hover:text-pink-700 py-3 rounded-lg transition"
                        >
                            Back to Cart
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}