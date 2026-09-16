
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Mycart() {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    // Load cart
    const loadCart = () => {
        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCart(savedCart);
    };

    useEffect(() => {
        loadCart();
    }, []);

    // Update cart everywhere
    const saveCart = (updatedCart) => {
        setCart(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    // Increase quantity
    const increaseQuantity = (index) => {
        const updatedCart = [...cart];

        updatedCart[index].quantity += 1;

        saveCart(updatedCart);
    };

    // Decrease quantity
    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];

        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            return;
        }

        saveCart(updatedCart);
    };

    // Remove product
    const removeItem = async (index) => {
        const result = await Swal.fire({
            title: "Remove Item?",
            text: "Do you want to remove this item from your cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Remove",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        const updatedCart = cart.filter(
            (_, itemIndex) => itemIndex !== index
        );

        saveCart(updatedCart);

        Swal.fire({
            title: "Removed!",
            text: "Item removed from your cart.",
            icon: "success",
            confirmButtonColor: "#111827",
        });
    };

    // Calculate subtotal
    const subtotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price) *
            Number(item.quantity),
        0
    );

    // Empty cart
    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">

                <div className="text-6xl mb-5">
                    🛒
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold">
                    Your Cart is Empty
                </h1>

                <p className="text-gray-500 mt-2 text-center">
                    You haven't added any products to your cart yet.
                </p>

                <Link
                    to="/collection"
                    className="mt-6 px-7 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Continue Shopping
                </Link>

            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Page Title */}
            <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl font-semibold">
                    Your Cart
                </h1>

                <p className="text-gray-500 mt-2">
                    Review your items before checkout.
                </p>

            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* =========================================
                    CART ITEMS
                ========================================== */}

                <div className="lg:col-span-2 space-y-4">

                    {cart.map((item, index) => {

                        const imageUrl = item.image
                            ? `${import.meta.env.VITE_API_URL}${item.image}`
                            : "";

                        const itemTotal =
                            Number(item.price) *
                            Number(item.quantity);

                        return (
                            <div
                                key={`${item.productId}-${item.size}-${index}`}
                                className="border rounded-xl p-4 sm:p-5 bg-white"
                            >

                                <div className="flex gap-4">

                                    {/* Image */}
                                    <div className="w-24 h-28 sm:w-32 sm:h-36 bg-gray-100 rounded-lg overflow-hidden shrink-0">

                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                                No Image
                                            </div>
                                        )}

                                    </div>


                                    {/* Information */}
                                    <div className="flex-1 min-w-0">

                                        <div className="flex justify-between gap-3">

                                            <div>

                                                <h2 className="font-medium text-lg truncate">
                                                    {item.name}
                                                </h2>

                                                {item.size && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Size: {item.size}
                                                    </p>
                                                )}

                                                <p className="text-gray-600 mt-2">
                                                    ${item.price}
                                                </p>

                                            </div>

                                            {/* Remove */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(index)
                                                }
                                                className="text-sm text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>

                                        </div>


                                        {/* Quantity */}
                                        <div className="flex items-center justify-between mt-6">

                                            <div className="flex items-center border border-gray-300 rounded-lg">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(index)
                                                    }
                                                    className="px-4 py-2 hover:bg-gray-100"
                                                >
                                                    −
                                                </button>

                                                <span className="px-4 py-2 min-w-11.25 text-center">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(index)
                                                    }
                                                    className="px-4 py-2 hover:bg-gray-100"
                                                >
                                                    +
                                                </button>

                                            </div>


                                            {/* Item Total */}
                                            <p className="font-semibold">
                                                ${itemTotal.toFixed(2)}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>


                {/* =========================================
                    ORDER SUMMARY
                ========================================== */}

                <div>

                    <div className="border rounded-xl p-6 bg-white sticky top-24">

                        <h2 className="text-xl font-semibold mb-6">
                            Order Summary
                        </h2>


                        <div className="flex justify-between text-gray-600 mb-4">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                ${subtotal.toFixed(2)}
                            </span>

                        </div>


                        <div className="flex justify-between text-gray-600 mb-4">

                            <span>
                                Shipping
                            </span>

                            <span>
                                Free
                            </span>

                        </div>


                        <div className="border-t pt-4">

                            <div className="flex justify-between text-lg font-semibold">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ${subtotal.toFixed(2)}
                                </span>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={() => navigate("/orders")}
                            className="w-full mt-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
                        >
                            Proceed to Checkout
                        </button>


                        <Link
                            to="/collection"
                            className="block text-center mt-4 text-sm text-gray-500 hover:text-black"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}