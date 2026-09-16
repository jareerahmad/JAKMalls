
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditItem from "./EditItem";

export default function ListItems() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/products`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();

            setProducts(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    List Items
                </h2>

                <p className="text-gray-500">
                    Loading products...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    List Items
                </h2>

                <p className="text-red-500">
                    {error}
                </p>

                <button
                    onClick={fetchProducts}
                    className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Product?",
            text: "Are you sure you want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        // User clicked Cancel
        if (!result.isConfirmed) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete product"
                );
            }

            // Remove product from current screen
            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product._id !== id
                )
            );

            // Success popup
            Swal.fire({
                title: "Deleted!",
                text: "The product has been deleted successfully.",
                icon: "success",
                confirmButtonColor: "#111827",
            });

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete the product.",
                icon: "error",
                confirmButtonColor: "#111827",
            });
        }
    };

    if (editingProduct) {
        return (
            <EditItem
                product={editingProduct}
                onCancel={() => setEditingProduct(null)}
                onUpdated={(updatedProduct) => {
                    setProducts((prevProducts) =>
                        prevProducts.map((product) =>
                            product._id === updatedProduct._id
                                ? updatedProduct
                                : product
                        )
                    );

                    setEditingProduct(null);
                }}
            />
        );
    }

    return (
        <div className="p-4 sm:p-6">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <div>
                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        List Items
                    </h1>

                    <p className="text-gray-500 mt-1">
                        All products added to JAKMalls
                    </p>
                </div>

                <div className="text-end bg-transparent px-4 py-2 rounded-lg">
                    <span className="font-semibold">
                        {products.length}
                    </span>{" "}
                    Products
                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-xl font-semibold">
                        No Products Found
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Add some products from Add Items.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-300">

                    <table className="w-full min-w-225">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-4">
                                    Image
                                </th>

                                <th className="text-left p-4">
                                    Name
                                </th>

                                <th className="text-left p-4">
                                    Category
                                </th>

                                <th className="text-left p-4">
                                    Sub Category
                                </th>

                                <th className="text-left p-4">
                                    Price
                                </th>

                                <th className="text-left p-4">
                                    Sizes
                                </th>

                                <th className="text-left p-4">
                                    Bestseller
                                </th>

                                <th className="text-left p-4">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => {

                                const imageUrl =
                                    product.images?.[0]
                                        ? `${import.meta.env.VITE_API_URL}${product.images[0]}`
                                        : null;

                                return (
                                    <tr
                                        key={product._id}
                                        className="border-t border-gray-300 hover:bg-gray-50"
                                    >

                                        {/* Image */}
                                        <td className="p-4">

                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                                    No Image
                                                </div>
                                            )}

                                        </td>

                                        {/* Name */}
                                        <td className="p-4">

                                            <p className="font-medium max-w-45 truncate">
                                                {product.name}
                                            </p>

                                        </td>

                                        {/* Category */}
                                        <td className="p-4">
                                            {product.category}
                                        </td>

                                        {/* Sub Category */}
                                        <td className="p-4">
                                            {product.subCategory}
                                        </td>

                                        {/* Price */}
                                        <td className="p-4 font-medium">
                                            ${product.price}
                                        </td>

                                        {/* Sizes */}
                                        <td className="p-4">

                                            <div className="flex gap-1 flex-wrap max-w-30">

                                                {product.sizes?.map(
                                                    (size) => (
                                                        <span
                                                            key={size}
                                                            className="px-2 py-1 bg-gray-100 rounded text-xs"
                                                        >
                                                            {size}
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </td>

                                        {/* Bestseller */}
                                        <td className="p-4">

                                            {product.bestseller ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                                                    No
                                                </span>
                                            )}

                                        </td>

                                        {/* Action */}
                                        <td className="p-4">
                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}