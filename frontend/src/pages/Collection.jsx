import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, X } from "lucide-react";

import image from "../assets/home back image.png";

const API_URL = import.meta.env.VITE_API_URL;

export default function Collection() {
    // =========================================================
    // DROPDOWN STATES
    // =========================================================

    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    // =========================================================
    // SEARCH
    // =========================================================

    const [search, setSearch] = useState("");

    // =========================================================
    // FILTER STATES
    // =========================================================

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("all");

    // =========================================================
    // SORT STATE
    // =========================================================

    const [sortBy, setSortBy] = useState("relevant");

    // =========================================================
    // PRODUCT DATA
    // =========================================================

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================================================
    // GET PRODUCTS FROM BACKEND
    // =========================================================

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/api/products`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch products"
                    );
                }

                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);

                setError(
                    error.message ||
                    "Unable to load products."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // =========================================================
    // CHECKBOX HANDLER
    // =========================================================

    const handleCategoryChange = (category) => {
        setSelectedCategories((previous) => {
            if (previous.includes(category)) {
                return previous.filter(
                    (item) => item !== category
                );
            }

            return [...previous, category];
        });
    };

    // =========================================================
    // TYPE HANDLER
    // =========================================================

    const handleTypeChange = (type) => {
        setSelectedTypes((previous) => {
            if (previous.includes(type)) {
                return previous.filter(
                    (item) => item !== type
                );
            }

            return [...previous, type];
        });
    };

    // =========================================================
    // PRICE FILTER
    // =========================================================

    const checkPrice = (price) => {
        const numericPrice = Number(price);

        if (selectedPrice === "all") {
            return true;
        }

        if (selectedPrice === "under30") {
            return numericPrice < 30;
        }

        if (selectedPrice === "30to50") {
            return (
                numericPrice >= 30 &&
                numericPrice <= 50
            );
        }

        if (selectedPrice === "50to70") {
            return (
                numericPrice > 50 &&
                numericPrice <= 70
            );
        }

        if (selectedPrice === "above70") {
            return numericPrice > 70;
        }

        return true;
    };

    // =========================================================
    // FILTER + SEARCH + SORT
    // =========================================================

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            // -------------------------------------------------
            // Search
            // -------------------------------------------------

            const productName = product.name || "";

            const matchesSearch = productName
                .toLowerCase()
                .includes(search.toLowerCase());

            // -------------------------------------------------
            // Category
            // -------------------------------------------------

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(
                    product.category
                );

            // -------------------------------------------------
            // Sub Category / Type
            // -------------------------------------------------

            const matchesType =
                selectedTypes.length === 0 ||
                selectedTypes.includes(
                    product.subCategory
                );

            // -------------------------------------------------
            // Price
            // -------------------------------------------------

            const matchesPrice = checkPrice(
                product.price
            );

            return (
                matchesSearch &&
                matchesCategory &&
                matchesType &&
                matchesPrice
            );
        });

        // =====================================================
        // SORT
        // =====================================================

        if (sortBy === "lowToHigh") {
            result.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );
        }

        if (sortBy === "highToLow") {
            result.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );
        }

        return result;
    }, [
        products,
        search,
        selectedCategories,
        selectedTypes,
        selectedPrice,
        sortBy,
    ]);

    // =========================================================
    // CLEAR ALL FILTERS
    // =========================================================

    const clearFilters = () => {
        setSearch("");
        setSelectedCategories([]);
        setSelectedTypes([]);
        setSelectedPrice("all");
        setSortBy("relevant");
    };

    // =========================================================
    // CHECK WHETHER ANY FILTER IS ACTIVE
    // =========================================================

    const hasActiveFilters =
        search !== "" ||
        selectedCategories.length > 0 ||
        selectedTypes.length > 0 ||
        selectedPrice !== "all";

    // =========================================================
    // FILTER COMPONENT
    // =========================================================

    const FilterContent = () => (
        <div className="flex flex-col gap-6">

            {/* =================================================
                CATEGORIES
            ================================================= */}

            <div className="border border-gray-200 bg-white p-4">
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-800">
                    Categories
                </h2>

                <div className="flex flex-col gap-3">
                    {["Men", "Women", "Kids"].map(
                        (category) => (
                            <label
                                key={category}
                                className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        category
                                    )}
                                    onChange={() =>
                                        handleCategoryChange(
                                            category
                                        )
                                    }
                                    className="h-4 w-4 accent-pink-700"
                                />

                                {category}
                            </label>
                        )
                    )}
                </div>
            </div>

            {/* =================================================
                SUB CATEGORY / TYPE
            ================================================= */}

            <div className="border border-gray-200 bg-white p-4">
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-800">
                    Type
                </h2>

                <div className="flex flex-col gap-3">
                    {[
                        "Topwear",
                        "Bottomwear",
                        "Footwear",
                        "Accessories",
                    ].map((type) => (
                        <label
                            key={type}
                            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                        >
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(
                                    type
                                )}
                                onChange={() =>
                                    handleTypeChange(type)
                                }
                                className="h-4 w-4 accent-pink-700"
                            />

                            {type}
                        </label>
                    ))}
                </div>
            </div>

            {/* =================================================
                PRICE
            ================================================= */}

            <div className="border border-gray-200 bg-white p-4">
                <h2 className="mb-4 text-sm font-semibold uppercase text-gray-800">
                    Price
                </h2>

                <div className="flex flex-col gap-3">

                    {/* ALL */}

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                        <input
                            type="radio"
                            name="price"
                            checked={
                                selectedPrice === "all"
                            }
                            onChange={() =>
                                setSelectedPrice("all")
                            }
                            className="accent-pink-700"
                        />

                        All prices
                    </label>

                    {/* UNDER 30 */}

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                        <input
                            type="radio"
                            name="price"
                            checked={
                                selectedPrice ===
                                "under30"
                            }
                            onChange={() =>
                                setSelectedPrice(
                                    "under30"
                                )
                            }
                            className="accent-pink-700"
                        />

                        Under $30
                    </label>

                    {/* 30 - 50 */}

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                        <input
                            type="radio"
                            name="price"
                            checked={
                                selectedPrice ===
                                "30to50"
                            }
                            onChange={() =>
                                setSelectedPrice(
                                    "30to50"
                                )
                            }
                            className="accent-pink-700"
                        />

                        $30 - $50
                    </label>

                    {/* 50 - 70 */}

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                        <input
                            type="radio"
                            name="price"
                            checked={
                                selectedPrice ===
                                "50to70"
                            }
                            onChange={() =>
                                setSelectedPrice(
                                    "50to70"
                                )
                            }
                            className="accent-pink-700"
                        />

                        $50 - $70
                    </label>

                    {/* ABOVE 70 */}

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                        <input
                            type="radio"
                            name="price"
                            checked={
                                selectedPrice ===
                                "above70"
                            }
                            onChange={() =>
                                setSelectedPrice(
                                    "above70"
                                )
                            }
                            className="accent-pink-700"
                        />

                        Above $70
                    </label>
                </div>
            </div>

            {/* =================================================
                CLEAR FILTERS
            ================================================= */}

            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 rounded-full border border-pink-700 px-4 py-2.5 text-sm font-semibold text-pink-700 transition hover:bg-pink-700 hover:text-white"
                >
                    <X size={16} />

                    Clear Filters
                </button>
            )}
        </div>
    );

    // =========================================================
    // JSX
    // =========================================================

    return (
        <main className="min-h-screen bg-white">

            {/* =================================================
                SEARCH BAR
            ================================================= */}

            <div className="border-y border-gray-100 bg-white p-4 shadow-sm">
                <div className="relative mx-auto w-full max-w-3xl">

                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search our collection..."
                        className="h-11 w-full rounded-full border border-gray-300 bg-white pl-11 pr-12 text-sm text-gray-700 outline-none transition focus:border-pink-700 focus:ring-2 focus:ring-pink-100"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-700"
                            aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div className="flex w-full flex-col gap-8 px-[5vw] py-10 sm:flex-row sm:gap-[4vw]">

                {/* =================================================
                    DESKTOP FILTER SIDEBAR
                ================================================= */}

                <aside className="hidden w-[14vw] min-w-40 shrink-0 sm:block">
                    <h1 className="mb-6 text-xl font-semibold text-gray-800">
                        FILTERS
                    </h1>

                    <FilterContent />
                </aside>

                {/* =================================================
                    PRODUCTS SECTION
                ================================================= */}

                <section className="min-w-0 flex-1">

                    {/* =================================================
                        TOP BAR
                    ================================================= */}

                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        {/* TITLE */}

                        <div>
                            <div className="flex items-center gap-3">

                                <h1 className="text-[22px] font-semibold text-gray-800 sm:text-[26px]">

                                    <span className="text-gray-500">
                                        ALL
                                    </span>{" "}

                                    COLLECTIONS

                                </h1>

                                <span className="hidden h-0.5 w-12 bg-slate-800 sm:block" />
                            </div>

                            <p className="mt-1 text-sm text-gray-400">
                                {filteredProducts.length}{" "}
                                {filteredProducts.length === 1
                                    ? "product"
                                    : "products"}
                            </p>
                        </div>

                        {/* =================================================
                            MOBILE FILTER + SORT
                        ================================================= */}

                        <div className="flex items-center gap-3 sm:hidden">

                            {/* FILTER BUTTON */}

                            <button
                                type="button"
                                onClick={() =>
                                    setFilterOpen(
                                        !filterOpen
                                    )
                                }
                                className="flex items-center gap-2 rounded-full border border-pink-700 px-5 py-2.5 text-sm font-semibold text-pink-700 transition hover:bg-pink-700 hover:text-white"
                            >
                                FILTERS

                                <ChevronDown
                                    size={17}
                                    className={`transition-transform duration-200 ${filterOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />
                            </button>

                            {/* MOBILE SORT */}

                            <div className="relative">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSortOpen(
                                            !sortOpen
                                        )
                                    }
                                    className="flex items-center gap-2 rounded-full bg-pink-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-800"
                                >
                                    Sort

                                    <ChevronDown
                                        size={17}
                                        className={`transition-transform duration-200 ${sortOpen
                                            ? "rotate-180"
                                            : ""
                                            }`}
                                    />
                                </button>

                                {sortOpen && (
                                    <SortMenu
                                        sortBy={sortBy}
                                        setSortBy={
                                            setSortBy
                                        }
                                        setSortOpen={
                                            setSortOpen
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        {/* =================================================
                            DESKTOP SORT
                        ================================================= */}

                        <div className="relative hidden sm:block">

                            <button
                                type="button"
                                onClick={() =>
                                    setSortOpen(
                                        !sortOpen
                                    )
                                }
                                className="flex items-center gap-2 rounded-full bg-pink-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-800"
                            >
                                Sort by:

                                <span className="font-normal">
                                    {sortBy === "relevant"
                                        ? "Relevant"
                                        : sortBy ===
                                            "lowToHigh"
                                            ? "Low to High"
                                            : "High to Low"}
                                </span>

                                <ChevronDown
                                    size={18}
                                    className={`transition-transform duration-200 ${sortOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />
                            </button>

                            {sortOpen && (
                                <SortMenu
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    setSortOpen={
                                        setSortOpen
                                    }
                                />
                            )}
                        </div>
                    </div>

                    {/* =================================================
                        MOBILE FILTER PANEL
                    ================================================= */}

                    {filterOpen && (
                        <div className="mb-8 sm:hidden">
                            <FilterContent />
                        </div>
                    )}

                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {loading && (
                        <div className="flex min-h-80 items-center justify-center">
                            <div className="text-center">

                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-pink-200 border-t-pink-700" />

                                <p className="mt-4 text-sm text-gray-500">
                                    Loading products...
                                </p>

                            </div>
                        </div>
                    )}

                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {!loading && error && (
                        <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 px-5 text-center">

                            <h2 className="text-lg font-semibold text-red-700">
                                Failed to load products
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-red-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    window.location.reload()
                                }
                                className="mt-5 rounded-full bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-800"
                            >
                                Try Again
                            </button>

                        </div>
                    )}

                    {/* =================================================
                        PRODUCT GRID
                    ================================================= */}

                    {!loading &&
                        !error &&
                        filteredProducts.length > 0 && (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-[2vw] lg:grid-cols-4">

                                {filteredProducts.map(
                                    (product) => {

                                        const productImage =
                                            product.images?.[0]
                                                ? `${API_URL}${product.images[0]}`
                                                : image;

                                        return (

                                            <Link
                                                to={`/product/${product._id}`}
                                                key={product._id}
                                                className="group min-w-0"
                                            >

                                                <div className="min-w-0">

                                                    {/* IMAGE */}

                                                    <div className="aspect-3/4 w-full overflow-hidden bg-gray-100">

                                                        <img
                                                            src={
                                                                productImage
                                                            }
                                                            alt={
                                                                product.name ||
                                                                "Product"
                                                            }
                                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                            onError={(
                                                                e
                                                            ) => {
                                                                e.currentTarget.src =
                                                                    image;
                                                            }}
                                                        />

                                                    </div>

                                                    {/* PRODUCT NAME */}

                                                    <p className="mt-3 line-clamp-2 wrap-break-word text-sm font-medium leading-5 text-slate-800">
                                                        {
                                                            product.name
                                                        }
                                                    </p>

                                                    {/* PRICE */}

                                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                                        $
                                                        {Number(
                                                            product.price
                                                        ).toFixed(
                                                            2
                                                        )}
                                                    </p>

                                                    {/* CATEGORY */}

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {
                                                            product.category
                                                        }
                                                    </p>

                                                </div>
                                            </Link>
                                        );
                                    }
                                )}

                            </div>
                        )}

                    {/* =================================================
                        NO PRODUCTS
                    ================================================= */}

                    {!loading &&
                        !error &&
                        filteredProducts.length ===
                        0 && (
                            <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 px-5 text-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">

                                    <Search
                                        size={22}
                                        className="text-gray-400"
                                    />

                                </div>

                                <h2 className="mt-4 text-lg font-semibold text-slate-700">
                                    No products found
                                </h2>

                                <p className="mt-1 max-w-sm text-sm text-gray-400">
                                    Try changing your
                                    search or removing
                                    some filters.
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        clearFilters
                                    }
                                    className="mt-5 rounded-full bg-pink-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-800"
                                >
                                    Clear Filters
                                </button>

                            </div>
                        )}

                </section>
            </div>
        </main>
    );
}


// =============================================================
// SORT MENU COMPONENT
// =============================================================

function SortMenu({
    sortBy,
    setSortBy,
    setSortOpen,
}) {
    const options = [
        {
            label: "Relevant",
            value: "relevant",
        },
        {
            label: "Low to High",
            value: "lowToHigh",
        },
        {
            label: "High to Low",
            value: "highToLow",
        },
    ];

    return (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg">

            {options.map((option) => (
                <button
                    type="button"
                    key={option.value}
                    onClick={() => {
                        setSortBy(option.value);
                        setSortOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition ${sortBy === option.value
                        ? "bg-pink-50 font-semibold text-pink-700"
                        : "text-slate-700 hover:bg-pink-50 hover:text-pink-700"
                        }`}
                >
                    {option.label}
                </button>
            ))}

        </div>
    );
}