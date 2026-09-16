import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditItem({ product, onUpdated, onCancel }) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Men",
        subCategory: "Topwear",
        price: "",
        sizes: [],
        bestseller: false,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                description: product.description || "",
                category: product.category || "Men",
                subCategory: product.subCategory || "Topwear",
                price: product.price || "",
                sizes: product.sizes || [],
                bestseller: product.bestseller || false,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSizeChange = (size) => {
        setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((item) => item !== size)
                : [...prev.sizes, size],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/products/${product._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update product"
                );
            }

            await Swal.fire({
                title: "Updated!",
                text: "Product updated successfully.",
                icon: "success",
                confirmButtonColor: "#111827",
            });

            onUpdated(data.product);

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: error.message || "Failed to update product.",
                icon: "error",
                confirmButtonColor: "#111827",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h2 className="text-2xl font-semibold">
                        Edit Product
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Update product information
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-300 rounded-xl p-5 sm:p-7 max-w-4xl"
            >

                {/* Product Name */}
                <div className="mb-5">

                    <label className="block font-medium mb-2">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                    />

                </div>

                {/* Description */}
                <div className="mb-5">

                    <label className="block font-medium mb-2">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black resize-none"
                    />

                </div>

                {/* Category + Subcategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

                    <div>

                        <label className="block font-medium mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>

                    </div>

                    <div>

                        <label className="block font-medium mb-2">
                            Sub Category
                        </label>

                        <select
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
                        >
                            <option value="Topwear">
                                Topwear
                            </option>

                            <option value="Bottomwear">
                                Bottomwear
                            </option>

                            <option value="Footwear">
                                Footwear
                            </option>

                            <option value="Accessories">
                                Accessories
                            </option>
                        </select>

                    </div>

                </div>

                {/* Price */}
                <div className="mb-5">

                    <label className="block font-medium mb-2">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                    />

                </div>

                {/* Sizes */}
                <div className="mb-6">

                    <label className="block font-medium mb-3">
                        Sizes
                    </label>

                    <div className="flex flex-wrap gap-3">

                        {["S", "M", "L", "XL", "XXL"].map(
                            (size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() =>
                                        handleSizeChange(size)
                                    }
                                    className={`px-5 py-2 rounded-lg border transition ${formData.sizes.includes(size)
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                                        }`}
                                >
                                    {size}
                                </button>
                            )
                        )}

                    </div>

                </div>

                {/* Bestseller */}
                <div className="mb-7">

                    <label className="flex items-center gap-3 cursor-pointer">

                        <input
                            type="checkbox"
                            name="bestseller"
                            checked={formData.bestseller}
                            onChange={handleChange}
                            className="w-5 h-5"
                        />

                        <span className="font-medium">
                            Mark as Bestseller
                        </span>

                    </label>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading
                            ? "Updating..."
                            : "Update Product"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}