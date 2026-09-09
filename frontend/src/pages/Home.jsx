
import { useEffect, useState } from "react";
import image from "../assets/home back image.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
    RefreshCcw,
    RotateCcw,
    Headphones,
} from "lucide-react";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/products"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                setProducts(data);
            } catch (error) {
                console.error("Home products error:", error);
                setError("Unable to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Show latest 12 products
    const latestProducts = products.slice(0, 12);

    // Show products marked as bestseller by admin
    const bestSellers = products
        .filter((product) => product.bestseller === true)
        .slice(0, 8);

    return (
        <main className="flex flex-col items-center justify-start gap-20">

            {/* =======================================
                HERO CONTENT
            ======================================= */}

            <div className="h-110 w-[86%] flex flex-row">

                <img
                    src={image}
                    alt="Home Image"
                    className="h-full w-full object-cover"
                />

                <div className="absolute lg:pt-20 lg:pl-25 sm:pt-15 sm:pl-13 pt-13 pl-7 flex flex-col gap-3">

                    <div className="pb-6">
                        <p className="text-[14px] text-pink-700 font-semibold">
                            SHOP MORE, SAVE MORE
                        </p>
                    </div>

                    <h1 className="flex items-center font-semibold gap-2">
                        <hr
                            style={{
                                width: "50px",
                                height: "2px",
                                backgroundColor: "black",
                                border: "none",
                                margin: "10px 0",
                            }}
                        />

                        OUR BESTSELLERS
                    </h1>

                    <h1 className="bold font-serif sm:text-[50px] text-[38px] text-pink-700">
                        Latest Arrivals
                    </h1>

                    <Link to="/collection">
                        <h1 className="flex items-center font-semibold gap-2 cursor-pointer">
                            SHOP NOW

                            <hr
                                style={{
                                    width: "50px",
                                    height: "1px",
                                    backgroundColor: "black",
                                    border: "none",
                                    margin: "10px 0",
                                }}
                            />
                        </h1>
                    </Link>

                </div>
            </div>


            {/* =======================================
                LATEST COLLECTIONS
            ======================================= */}

            <div className="pl-[7%] pr-[7%] flex flex-col justify-center items-center gap-7 w-full">

                <div className="flex flex-col justify-center items-center gap-3">

                    <div className="flex items-center justify-center font-semibold gap-3">

                        <h1 className="sm:text-3xl text-gray-800 flex gap-2 text-[22px]">
                            <span className="text-gray-500">
                                LATEST
                            </span>

                            COLLECTIONS
                        </h1>

                        <hr
                            style={{
                                width: "50px",
                                height: "2px",
                                backgroundColor: "#1e2939",
                                border: "none",
                                margin: "10px 0",
                            }}
                        />

                    </div>

                    <div className="text-center">
                        <p className="text-gray-700">
                            Explore top quality products, with reasonable price
                            and the latest arrivals — all in one place.
                        </p>
                    </div>

                </div>


                {/* Products */}

                {loading ? (
                    <p className="text-gray-500">
                        Loading products...
                    </p>
                ) : error ? (
                    <p className="text-red-500">
                        {error}
                    </p>
                ) : latestProducts.length === 0 ? (
                    <p className="text-gray-500">
                        No products available yet.
                    </p>
                ) : (

                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[2vw] w-full">

                        {latestProducts.map((product) => (

                            <Link
                                to={`/product/${product._id}`}
                                key={product._id}
                                className="min-w-0"
                            >

                                <div className="sm:min-h-70 min-h-60 h-auto">

                                    <img
                                        src={
                                            product.images?.[0]
                                                ? `http://localhost:5000${product.images[0]}`
                                                : image
                                        }
                                        alt={product.name}
                                        className="sm:h-55 h-45 w-full object-cover border-none"
                                    />

                                    <p className="mt-2 min-w-0 wrap-break-word text-sm font-medium text-slate-800">
                                        {product.name}
                                    </p>

                                    <p className="mt-1 min-w-0 wrap-break-word text-sm text-slate-700">
                                        ${product.price}
                                    </p>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </div>


            {/* =======================================
                BEST SELLERS
            ======================================= */}

            <div className="pl-[7%] pr-[7%] flex flex-col justify-center items-center gap-7 w-full">

                <div className="flex flex-col justify-center items-center gap-3">

                    <div className="flex items-center justify-center font-semibold gap-3">

                        <h1 className="sm:text-3xl text-gray-800 flex gap-2 text-[22px]">
                            <span className="text-gray-500">
                                BEST
                            </span>

                            SELLERS
                        </h1>

                        <hr
                            style={{
                                width: "50px",
                                height: "2px",
                                backgroundColor: "#1e2939",
                                border: "none",
                                margin: "10px 0",
                            }}
                        />

                    </div>

                    <div className="text-center">
                        <p className="text-gray-700">
                            Top quality products, by our best sellers with
                            reasonable price and the latest arrivals.
                        </p>
                    </div>

                </div>


                {/* Best Seller Products */}

                {loading ? (
                    <p className="text-gray-500">
                        Loading products...
                    </p>
                ) : bestSellers.length === 0 ? (
                    <p className="text-gray-500">
                        No best sellers available yet.
                    </p>
                ) : (

                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-[2vw] w-full">

                        {bestSellers.map((product) => (

                            <Link
                                to={`/product/${product._id}`}
                                key={product._id}
                                className="min-w-0"
                            >

                                <div className="sm:min-h-70 min-h-60 h-auto">

                                    <img
                                        src={
                                            product.images?.[0]
                                                ? `http://localhost:5000${product.images[0]}`
                                                : image
                                        }
                                        alt={product.name}
                                        className="sm:h-55 h-45 w-full object-cover border-none"
                                    />

                                    <p className="mt-2 min-w-0 wrap-break-word text-sm font-medium text-slate-800">
                                        {product.name}
                                    </p>

                                    <p className="mt-1 min-w-0 wrap-break-word text-sm text-slate-700">
                                        ${product.price}
                                    </p>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </div>


            {/* =======================================
                WEBSITE FEATURES
            ======================================= */}

            <div className="px-[7%] flex sm:flex-row flex-col justify-center items-center lg:gap-20 gap-7.5">

                {/* Easy Exchange Policy */}
                <div>
                    <RefreshCcw
                        className="w-12 h-12 m-auto mb-5 text-slate-800"
                        strokeWidth={1.5}
                    />

                    <p className="font-semibold text-slate-800 text-center">
                        Easy Exchange Policy
                    </p>

                    <p className="text-slate-600 text-center text-[14px]">
                        We offer hassle free exchange policy
                    </p>
                </div>


                {/* 7 Days Return Policy */}
                <div>
                    <RotateCcw
                        className="w-12 h-12 m-auto mb-5 text-slate-800"
                        strokeWidth={1.5}
                    />

                    <p className="font-semibold text-slate-800 text-center">
                        7 Days Return Policy
                    </p>

                    <p className="text-slate-600 text-center text-[14px]">
                        We provide 7 days free return policy
                    </p>
                </div>


                {/* Best Customer Support */}
                <div>
                    <Headphones
                        className="w-12 h-12 m-auto mb-5 text-slate-800"
                        strokeWidth={1.5}
                    />

                    <p className="font-semibold text-slate-800 text-center">
                        Best customer support
                    </p>

                    <p className="text-slate-600 text-center text-[14px]">
                        we provide 24/7 customer support
                    </p>
                </div>

            </div>


            {/* =======================================
                SUBSCRIPTION
            ======================================= */}

            <div className="px-[7%] mb-20 flex max-w-3xl flex-col items-center text-center">

                <h2 className="text-2xl font-semibold text-slate-800">
                    Subscribe Now
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
                    Subscribe to our newsletter to get updates about our latest arrivals.
                </p>

                <form
                    className="mt-8 flex w-full flex-col sm:flex-row"
                    onSubmit={(e) => {
                        e.preventDefault();

                        const email = e.target.email.value.trim();

                        if (!email) {
                            Swal.fire({
                                icon: "warning",
                                title: "Email Required",
                                text: "Please enter your email address.",
                                confirmButtonColor: "#000000",
                            });

                            return;
                        }

                        Swal.fire({
                            icon: "success",
                            title: "Successfully Subscribed!",
                            text: `Thank you for subscribing with ${email}`,
                            confirmButtonColor: "#000000",
                        });

                        e.target.reset();
                    }}
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="h-12 w-full border border-slate-200 px-5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400 sm:text-base"
                    />

                    <button
                        type="submit"
                        className="h-12 w-full bg-black px-8 text-sm font-medium text-white transition duration-300 hover:bg-pink-700 sm:w-52"
                    >
                        SUBSCRIBE
                    </button>

                </form>

            </div>

        </main>
    );
}