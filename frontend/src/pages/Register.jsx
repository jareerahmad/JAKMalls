import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                title: "Passwords Don't Match",
                text: "Please make sure both passwords are the same.",
                icon: "warning",
                confirmButtonColor: "#db2777",
            });

            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            Swal.fire({
                title: "Account Created!",
                text: "Your account has been created successfully.",
                icon: "success",
                confirmButtonColor: "#db2777",
            }).then(() => {
                navigate("/login");
            });

        } catch (error) {
            Swal.fire({
                title: "Registration Failed",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#db2777",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 sm:p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join JAKMalls today
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            minLength="6"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600 transition"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            minLength="6"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-pink-600 transition"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-700 hover:bg-pink-800 disabled:bg-pink-400 text-white py-3 rounded-lg font-medium transition"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-pink-700 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}