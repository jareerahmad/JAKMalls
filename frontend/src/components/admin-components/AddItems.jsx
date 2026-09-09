
import { useState } from "react";
import Swal from "sweetalert2";
import {
    ImagePlus,
    Upload,
} from "lucide-react";

export default function AddItems() {

    const [images, setImages] = useState([null, null, null, null]);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "Men",
        subCategory: "Topwear",
        price: "",
        sizes: [],
        bestseller: false,
    });


    // ================================
    // Handle input changes
    // ================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // ================================
    // Handle image upload
    // ================================
    const handleImageChange = (index, e) => {
        const file = e.target.files[0];

        if (!file) return;

        const updatedImages = [...images];

        updatedImages[index] = {
            file: file,
            preview: URL.createObjectURL(file),
        };

        setImages(updatedImages);
    };


    // ================================
    // Handle size selection
    // ================================
    const handleSizeChange = (size) => {

        setProduct((prev) => {

            const alreadySelected = prev.sizes.includes(size);

            return {
                ...prev,
                sizes: alreadySelected
                    ? prev.sizes.filter((item) => item !== size)
                    : [...prev.sizes, size],
            };
        });
    };


    // ================================
    // Submit form
    // ================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Product information
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("category", product.category);
            formData.append("subCategory", product.subCategory);
            formData.append("price", product.price);
            formData.append("sizes", JSON.stringify(product.sizes));
            formData.append("bestseller", product.bestseller);

            // Images
            images.forEach((image) => {
                if (image?.file) {
                    formData.append("images", image.file);
                }
            });

            const response = await fetch(
                "http://localhost:5000/api/products",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create product");
            }

            Swal.fire({
                title: "Added!",
                text: "The product has been added successfully.",
                icon: "success",
                confirmButtonColor: "#111827",
            });

            // Reset form
            setProduct({
                name: "",
                description: "",
                category: "Men",
                subCategory: "Topwear",
                price: "",
                sizes: [],
                bestseller: false,
            });

            setImages([null, null, null, null]);

        } catch (error) {
            console.error("Error:", error);

            alert(error.message);
        }
    };

    const sizes = ["S", "M", "L", "XL", "XXL"];

    return (
        <div className="w-full min-h-full bg-pink-50">

            <form
                onSubmit={handleSubmit}
                className="w-full px-5 py-8 sm:px-8 md:px-10 lg:px-[4vw] lg:py-12"
            >

                {/* ============================================
                    PAGE TITLE
                ============================================ */}

                <div className="mb-8">

                    <p className="text-xs font-semibold uppercase tracking-widest text-pink-600">
                        Products
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Add New Product
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Add a new product to your JAKMalls store by
                        providing its images, details, category, price
                        and available sizes.
                    </p>

                </div>


                {/* ============================================
                    FORM CARD
                ============================================ */}

                <div className="max-w-4xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">


                    {/* ========================================
                        UPLOAD IMAGES
                    ======================================== */}

                    <div>

                        <h2 className="text-lg font-semibold text-slate-800">
                            Upload Images
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Upload up to four images of your product.
                        </p>


                        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

                            {images.map((image, index) => (

                                <label
                                    key={index}
                                    className="group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-pink-400 hover:bg-pink-50"
                                >

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            handleImageChange(index, e)
                                        }
                                    />


                                    {image ? (
                                        <>
                                            {image && (
                                                <img
                                                    src={image.preview}
                                                    alt={`Product ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </>
                                    ) : (

                                        <div className="flex flex-col items-center gap-2 text-center">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                                                <ImagePlus size={20} />
                                            </div>

                                            <span className="text-xs font-medium text-slate-500">
                                                Upload
                                            </span>

                                        </div>

                                    )}

                                </label>

                            ))}

                        </div>

                    </div>


                    {/* ========================================
                        PRODUCT NAME
                    ======================================== */}

                    <div className="mt-8">

                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Product Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                            required
                        />

                    </div>


                    {/* ========================================
                        DESCRIPTION
                    ======================================== */}

                    <div className="mt-6">

                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Product Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Write a description for your product..."
                            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                            required
                        />

                    </div>


                    {/* ========================================
                        CATEGORY / SUB CATEGORY / PRICE
                    ======================================== */}

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Category */}
                        <div>

                            <label
                                htmlFor="category"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Product Category
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>

                        </div>


                        {/* Sub Category */}
                        <div>

                            <label
                                htmlFor="subCategory"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Sub Category
                            </label>

                            <select
                                id="subCategory"
                                name="subCategory"
                                value={product.subCategory}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                            >
                                <option value="Topwear">Topwear</option>
                                <option value="Bottomwear">Bottomwear</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Accessories">Accessories</option>
                            </select>

                        </div>


                        {/* Price */}
                        <div>

                            <label
                                htmlFor="price"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Product Price
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="25"
                                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                                required
                            />

                        </div>

                    </div>


                    {/* ========================================
                        PRODUCT SIZES
                    ======================================== */}

                    <div className="mt-7">

                        <p className="mb-3 text-sm font-semibold text-slate-700">
                            Product Sizes
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {sizes.map((size) => {

                                const selected =
                                    product.sizes.includes(size);

                                return (
                                    <button
                                        type="button"
                                        key={size}
                                        onClick={() =>
                                            handleSizeChange(size)
                                        }
                                        className={`flex h-10 min-w-11 items-center justify-center rounded-md px-3 text-sm font-medium transition
                                            ${selected
                                                ? "bg-pink-600 text-white"
                                                : "bg-slate-100 text-slate-700 hover:bg-pink-100 hover:text-pink-700"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                );

                            })}

                        </div>

                    </div>


                    {/* ========================================
                        BESTSELLER
                    ======================================== */}

                    <div className="mt-7">

                        <label className="flex cursor-pointer items-center gap-3">

                            <input
                                type="checkbox"
                                checked={product.bestseller}
                                onChange={(e) =>
                                    setProduct((prev) => ({
                                        ...prev,
                                        bestseller: e.target.checked,
                                    }))
                                }
                                className="h-4 w-4 rounded border-slate-300 accent-pink-600"
                            />

                            <span className="text-sm font-medium text-slate-700">
                                Add to bestseller
                            </span>

                        </label>

                    </div>


                    {/* ========================================
                        ACTION BUTTONS
                    ======================================== */}

                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                        <button
                            type="reset"
                            onClick={() => {
                                setProduct({
                                    name: "",
                                    description: "",
                                    category: "Men",
                                    subCategory: "Topwear",
                                    price: "",
                                    sizes: [],
                                    bestseller: false,
                                });

                                setImages([
                                    null,
                                    null,
                                    null,
                                    null,
                                ]);

                                alert("item added")
                            }}
                            className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            Clear
                        </button>


                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-lg bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
                        >
                            <Upload size={17} />

                            Add Product
                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
}