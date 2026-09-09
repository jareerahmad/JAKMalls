
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
} from "lucide-react";

import Swal from "sweetalert2";

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(formData),
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }


            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );


            // Save user information
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            window.dispatchEvent(new Event("authUpdated"));


            Swal.fire({
                title: "Login Successful!",
                text: `Welcome back, ${data.user.name}!`,
                icon: "success",
                confirmButtonColor: "#db2777",
            }).then(() => {

                navigate("/");

            });


        } catch (error) {

            Swal.fire({
                title: "Login Failed",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#db2777",
            });

        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">

                <div className="grid w-full overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-2">


                    {/* =================================================
                        LEFT SIDE - LOGIN FORM
                    ================================================= */}

                    <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-14">


                        {/* Logo */}

                        <div className="mb-8">

                            <Link
                                to="/"
                                className="inline-block"
                            >

                                <h1 className="text-3xl font-extrabold">

                                    <span className="text-pink-700">
                                        JAK
                                    </span>

                                    <span className="text-[22px] text-black">
                                        Malls
                                    </span>

                                    <span className="text-pink-700">
                                        .
                                    </span>

                                </h1>

                            </Link>


                            <p className="mt-1 text-sm text-slate-400">
                                Welcome back to JAKMalls
                            </p>

                        </div>


                        {/* Heading */}

                        <div className="mb-7">

                            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                Sign in to your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Enter your details below to continue
                                shopping with JAKMalls.
                            </p>

                        </div>


                        {/* Login Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >


                            {/* Email */}

                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Email Address
                                </label>


                                <div className="relative">

                                    <Mail
                                        size={19}
                                        strokeWidth={1.8}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />


                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <div className="mb-2 flex items-center justify-between">

                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-slate-700"
                                    >
                                        Password
                                    </label>


                                    {/* <Link
                                        to="/forgot-password"
                                        className="text-xs font-medium text-pink-600 hover:text-pink-700"
                                    >
                                        Forgot password?
                                    </Link> */}

                                </div>


                                <div className="relative">

                                    <Lock
                                        size={19}
                                        strokeWidth={1.8}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />


                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                                    />


                                    {/* Show Password */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-pink-600"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >

                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Remember Me */}

                            <div className="flex items-center justify-between">

                                <label className="flex cursor-pointer items-center gap-2">

                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-slate-300 accent-pink-600"
                                    />

                                    <span className="text-sm text-slate-500">
                                        Remember me
                                    </span>

                                </label>

                            </div>


                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-700 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-pink-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {loading
                                    ? "Signing In..."
                                    : "Sign In"
                                }

                                {!loading && (
                                    <ArrowRight size={18} />
                                )}

                            </button>


                            {/* Divider */}

                            {/* <div className="flex items-center gap-4">

                                <div className="h-px flex-1 bg-slate-200"></div>

                                <span className="text-xs text-slate-400">
                                    OR
                                </span>

                                <div className="h-px flex-1 bg-slate-200"></div>

                            </div> */}


                            {/* Google Button */}

                            {/* <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >

                                <span className="text-lg font-bold">
                                    G
                                </span>

                                Continue with Google

                            </button> */}

                        </form>


                        {/* Register */}

                        <p className="mt-8 text-center text-sm text-slate-500">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="font-semibold text-pink-700 hover:text-pink-800"
                            >
                                Create an account
                            </Link>

                        </p>

                    </div>


                    {/* =================================================
                        RIGHT SIDE - PROMOTIONAL SECTION
                    ================================================= */}

                    <div className="relative hidden overflow-hidden bg-pink-700 lg:flex">


                        {/* Decorative circles */}

                        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pink-600"></div>

                        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-pink-800"></div>


                        <div className="relative z-10 flex w-full flex-col justify-center px-12 py-16 text-white xl:px-16">

                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-pink-200">
                                Welcome Back
                            </p>


                            <h2 className="text-4xl font-bold leading-tight xl:text-5xl">

                                Your style,
                                <br />
                                your choice.

                            </h2>


                            <p className="mt-6 max-w-md text-sm leading-7 text-pink-100">

                                Discover the latest collections,
                                explore products you love and enjoy
                                a simple shopping experience with
                                JAKMalls.

                            </p>


                            {/* Benefits */}

                            <div className="mt-10 space-y-5">


                                <div className="flex items-start gap-4">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                                        ✓
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            Quality Products
                                        </h3>

                                        <p className="mt-1 text-sm text-pink-100">
                                            Carefully selected products for you.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-start gap-4">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                                        ✓
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            Easy Shopping
                                        </h3>

                                        <p className="mt-1 text-sm text-pink-100">
                                            Find what you need with ease.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-start gap-4">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                                        ✓
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            Reliable Support
                                        </h3>

                                        <p className="mt-1 text-sm text-pink-100">
                                            We're here whenever you need us.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );
}