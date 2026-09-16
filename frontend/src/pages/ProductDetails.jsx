import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Fetch Product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/products/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch product"
                    );
                }

                setProduct(data);

                // Set first image as the main image
                if (data.images?.length > 0) {
                    setSelectedImage(data.images[0]);
                }

                // Select first available size
                if (data.sizes?.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (error) {
                console.error(error);
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Increase Quantity
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // Decrease Quantity
    const decreaseQuantity = () => {
        setQuantity((prev) =>
            prev > 1 ? prev - 1 : 1
        );
    };

    // Add Product To Cart
    const handleAddToCart = () => {
        // Check size
        if (product.sizes?.length > 0 && !selectedSize) {
            Swal.fire({
                title: "Select Size",
                text: "Please select a size before adding the product to cart.",
                icon: "warning",
                confirmButtonColor: "#111827",
            });

            return;
        }

        const cartItem = {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || "",
            size: selectedSize,
            quantity: quantity,
        };

        // Get existing cart
        const existingCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        // Check whether same product + same size already exists
        const existingItemIndex = existingCart.findIndex(
            (item) =>
                item.productId === cartItem.productId &&
                item.size === cartItem.size
        );

        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity += quantity;
        } else {
            existingCart.push(cartItem);
        }

        // Save cart
        localStorage.setItem(
            "cart",
            JSON.stringify(existingCart)
        );

        window.dispatchEvent(new Event("cartUpdated"));

        // Success popup
        Swal.fire({
            title: "Added to Cart!",
            text: `${product.name} has been added to your cart.`,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Go to Cart",
            cancelButtonText: "Continue Shopping",
            confirmButtonColor: "#111827",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/mycart");
            }
        });
    };

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">
                    Loading product...
                </p>
            </div>
        );
    }

    // Error / Product not found
    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">

                <h2 className="text-2xl font-semibold">
                    Product Not Found
                </h2>

                <p className="text-gray-500 mt-2 text-center">
                    {error || "This product does not exist."}
                </p>

                <button
                    onClick={() => navigate("/collection")}
                    className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Back to Collection
                </button>

            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                {/* =====================================================
                    PRODUCT IMAGE GALLERY
                ====================================================== */}

                <div>

                    <div className="flex flex-col sm:flex-row gap-4">

                        {/* ===============================
                            SMALL IMAGE THUMBNAILS
                        ================================ */}

                        {product.images?.length > 0 && (
                            <div className="flex sm:flex-col gap-3 order-2 sm:order-1 overflow-x-auto sm:overflow-visible">

                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            setSelectedImage(img)
                                        }
                                        className={` shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition ${selectedImage === img
                                            ? "border-black"
                                            : "border-gray-200 hover:border-gray-500"
                                            }`}
                                    >
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}${img}`}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}

                            </div>
                        )}

                        {/* ===============================
                            BIG MAIN IMAGE
                        ================================ */}

                        <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden order-1 sm:order-2">

                            {selectedImage ? (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${selectedImage}`}
                                    alt={product.name}
                                    className="w-full aspect-square object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-square flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    PRODUCT INFORMATION
                ====================================================== */}

                <div className="flex flex-col">

                    {/* Category */}
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {product.category} / {product.subCategory}
                    </p>


                    {/* Product Name */}
                    <h1 className="text-3xl sm:text-4xl font-semibold mt-3">
                        {product.name}
                    </h1>


                    {/* Price */}
                    <p className="text-2xl font-medium mt-5">
                        ${product.price}
                    </p>


                    {/* Description */}
                    <div className="border-t mt-7 pt-7">

                        <h3 className="font-medium mb-3">
                            Description
                        </h3>

                        <p className="text-gray-600 leading-7">
                            {product.description}
                        </p>

                    </div>


                    {/* =================================================
                        SIZE SELECTION
                    ================================================== */}

                    {product.sizes?.length > 0 && (
                        <div className="mt-7">

                            <h3 className="font-medium mb-3">
                                Select Size
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSize(size)
                                        }
                                        className={`px-5 py-3 rounded-lg border transition ${selectedSize === size
                                            ? "bg-black text-white border-black"
                                            : "border-gray-300 hover:border-black"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}

                            </div>

                        </div>
                    )}


                    {/* =================================================
                        QUANTITY
                    ================================================== */}

                    <div className="mt-7">

                        <h3 className="font-medium mb-3">
                            Quantity
                        </h3>

                        <div className="flex items-center border border-gray-300 rounded-lg w-fit">

                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                className="px-5 py-3 text-lg hover:bg-gray-100 transition"
                            >
                                −
                            </button>

                            <span className="px-5 py-3 min-w-12.5 text-center">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={increaseQuantity}
                                className="px-5 py-3 text-lg hover:bg-gray-100 transition"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        ADD TO CART
                    ================================================== */}

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="mt-8 w-full py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        Add to Cart
                    </button>


                    {/* =================================================
                        EXTRA INFORMATION
                    ================================================== */}

                    <div className="border-t mt-8 pt-6 space-y-3 text-sm text-gray-500">

                        <p>
                            ✓ Secure payment
                        </p>

                        <p>
                            ✓ Easy returns
                        </p>

                        <p>
                            ✓ Quality products
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}