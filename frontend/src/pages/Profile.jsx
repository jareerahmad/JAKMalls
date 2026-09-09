
import { useEffect, useState } from "react";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        setUser(JSON.parse(storedUser));

    }, [navigate]);


    const handleLogout = () => {

        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#db2777",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
        }).then((result) => {

            if (result.isConfirmed) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.dispatchEvent(
                    new Event("authUpdated")
                );

                navigate("/login");
            }

        });

    };


    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">
                    Loading profile...
                </p>
            </div>
        );
    }


    return (

        <div className="min-h-screen bg-slate-50 px-5 py-12">

            <div className="mx-auto max-w-4xl">


                {/* ================= HEADER ================= */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-slate-900">
                        My Profile
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage your account information
                    </p>

                </div>


                {/* ================= PROFILE CARD ================= */}

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">


                    {/* ================= PROFILE HEADER ================= */}

                    <div className="bg-pink-700 px-6 py-10 sm:px-10">

                        <div className="flex flex-col items-center gap-4 sm:flex-row">


                            {/* Avatar */}

                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-pink-700 shadow-lg">

                                <User
                                    size={45}
                                    strokeWidth={1.5}
                                />

                            </div>


                            {/* User Name */}

                            <div className="text-center sm:text-left">

                                <h2 className="text-2xl font-bold text-white">
                                    {user.name}
                                </h2>

                                <p className="mt-1 text-pink-100">
                                    {user.email}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================= ACCOUNT INFORMATION ================= */}

                    <div className="p-6 sm:p-10">

                        <h3 className="mb-6 text-xl font-semibold text-slate-900">
                            Account Information
                        </h3>


                        <div className="grid gap-5 sm:grid-cols-2">


                            {/* Name */}

                            <div className="rounded-xl border border-slate-200 p-5">

                                <div className="mb-3 flex items-center gap-3">

                                    <div className="rounded-lg bg-pink-50 p-2 text-pink-700">

                                        <User size={20} />

                                    </div>

                                    <span className="text-sm text-slate-500">
                                        Full Name
                                    </span>

                                </div>

                                <p className="font-semibold text-slate-900">
                                    {user.name}
                                </p>

                            </div>


                            {/* Email */}

                            <div className="rounded-xl border border-slate-200 p-5">

                                <div className="mb-3 flex items-center gap-3">

                                    <div className="rounded-lg bg-pink-50 p-2 text-pink-700">

                                        <Mail size={20} />

                                    </div>

                                    <span className="text-sm text-slate-500">
                                        Email Address
                                    </span>

                                </div>

                                <p className="break-all font-semibold text-slate-900">
                                    {user.email}
                                </p>

                            </div>


                            {/* Role */}

                            <div className="rounded-xl border border-slate-200 p-5">

                                <div className="mb-3 flex items-center gap-3">

                                    <div className="rounded-lg bg-pink-50 p-2 text-pink-700">

                                        <Shield size={20} />

                                    </div>

                                    <span className="text-sm text-slate-500">
                                        Account Role
                                    </span>

                                </div>

                                <p className="font-semibold capitalize text-slate-900">
                                    {user.role}
                                </p>

                            </div>


                            {/* Account ID */}

                            <div className="rounded-xl border border-slate-200 p-5">

                                <div className="mb-3 flex items-center gap-3">

                                    <div className="rounded-lg bg-pink-50 p-2 text-pink-700">

                                        <User size={20} />

                                    </div>

                                    <span className="text-sm text-slate-500">
                                        Account ID
                                    </span>

                                </div>

                                <p className="break-all font-mono text-sm font-semibold text-slate-900">
                                    {user.id}
                                </p>

                            </div>

                        </div>


                        {/* ================= ACTIONS ================= */}

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">


                            {/* Orders */}

                            <button
                                onClick={() => navigate("/orders")}
                                className="rounded-xl bg-pink-700 px-6 py-3 font-semibold text-white transition hover:bg-pink-800"
                            >
                                View My Orders
                            </button>


                            {/* Logout */}

                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                            >

                                <LogOut size={18} />

                                Logout

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Profile;