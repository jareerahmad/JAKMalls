import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    CirclePlus,
    SquareCheckBig,
    ListOrdered,
    LayoutDashboard,
} from "lucide-react";

import Swal from "sweetalert2";

import AddItems from "../components/admin-components/AddItems";
import ListItems from "../components/admin-components/ListItems";
import AdminOrders from "../components/admin-components/AdminOrders";


export default function Adminpanel() {

    const navigate = useNavigate();


    // ============================================================
    // ACTIVE COMPONENT
    // ============================================================

    const [activeComponent, setActiveComponent] = useState("home");


    // ============================================================
    // AUTH CHECK
    // ============================================================

    const [checkingAuth, setCheckingAuth] = useState(true);


    // ============================================================
    // DASHBOARD STATS
    // ============================================================

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
    });


    const [loadingStats, setLoadingStats] = useState(true);


    // ============================================================
    // CHECK ADMIN AUTHENTICATION
    // ============================================================

    useEffect(() => {

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");


        if (!token || !storedUser) {

            navigate("/login", {
                replace: true,
            });

            return;
        }


        try {

            const user = JSON.parse(storedUser);


            if (user.role !== "admin") {

                Swal.fire({
                    title: "Access Denied",
                    text: "You do not have permission to access the Admin Panel.",
                    icon: "error",
                    confirmButtonColor: "#db2777",
                }).then(() => {

                    navigate("/", {
                        replace: true,
                    });

                });

                return;
            }


            setCheckingAuth(false);


        } catch (error) {

            console.error(
                "ADMIN AUTH ERROR:",
                error
            );


            localStorage.removeItem("token");
            localStorage.removeItem("user");


            navigate("/login", {
                replace: true,
            });

        }

    }, [navigate]);


    // ============================================================
    // FETCH DASHBOARD STATS
    // ============================================================

    const fetchStats = async () => {

        try {

            setLoadingStats(true);


            const token = localStorage.getItem("token");


            const response = await fetch(
                "http://localhost:5000/api/orders/stats",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to fetch dashboard statistics"
                );

            }


            setStats({
                totalProducts:
                    data.totalProducts || 0,

                totalOrders:
                    data.totalOrders || 0,

                pendingOrders:
                    data.pendingOrders || 0,

                totalRevenue:
                    data.totalRevenue || 0,
            });


        } catch (error) {

            console.error(
                "DASHBOARD STATS ERROR:",
                error
            );


            Swal.fire({
                title: "Error",
                text: "Failed to load dashboard statistics.",
                icon: "error",
                confirmButtonColor: "#db2777",
            });


        } finally {

            setLoadingStats(false);

        }

    };


    // ============================================================
    // LOAD STATS WHEN DASHBOARD IS OPEN
    // ============================================================

    useEffect(() => {

        if (
            !checkingAuth &&
            activeComponent === "home"
        ) {

            fetchStats();

        }

    }, [
        checkingAuth,
        activeComponent,
    ]);


    // ============================================================
    // LOGOUT
    // ============================================================

    const handleLogout = () => {

        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout from the Admin Panel?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#db2777",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {

            if (result.isConfirmed) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");


                window.dispatchEvent(
                    new Event("authUpdated")
                );


                navigate("/login", {
                    replace: true,
                });

            }

        });

    };


    // ============================================================
    // RENDER ACTIVE COMPONENT
    // ============================================================

    const renderComponent = () => {

        switch (activeComponent) {


            // ====================================================
            // ADD ITEMS
            // ====================================================

            case "addItems":

                return <AddItems />;


            // ====================================================
            // LIST ITEMS
            // ====================================================

            case "listItems":

                return <ListItems />;


            // ====================================================
            // ADMIN ORDERS
            // ====================================================

            case "admin-orders":

                return <AdminOrders />;


            // ====================================================
            // DASHBOARD
            // ====================================================

            default:

                return (

                    <div className="min-h-full w-full bg-pink-50 px-[4vw] py-10">


                        {/* =================================================
                            WELCOME
                        ================================================= */}

                        <div className="flex flex-col gap-3">

                            <p className="text-sm font-semibold uppercase tracking-wider text-pink-600">
                                Dashboard
                            </p>


                            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">

                                Welcome To The Admin Panel Of{" "}

                                <span className="font-extrabold text-pink-700">
                                    JAKMALLS
                                </span>

                            </h1>


                            <p className="max-w-2xl text-sm leading-6 text-slate-500">

                                Manage your products, monitor orders, keep
                                track of your store activity and control
                                your JAKMalls e-commerce platform from one place.

                            </p>

                        </div>



                        {/* =================================================
                            STORE OVERVIEW
                        ================================================= */}

                        <div className="mt-10">

                            <h2 className="text-lg font-bold text-slate-800">
                                Store Overview
                            </h2>


                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">


                                {/* =================================================
                                    TOTAL PRODUCTS
                                ================================================= */}

                                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                                    <p className="text-sm text-slate-500">
                                        Total Products
                                    </p>


                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">

                                        {loadingStats
                                            ? "..."
                                            : stats.totalProducts}

                                    </h3>


                                    <p className="mt-2 text-xs text-pink-600">
                                        Products in your store
                                    </p>

                                </div>



                                {/* =================================================
                                    TOTAL ORDERS
                                ================================================= */}

                                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                                    <p className="text-sm text-slate-500">
                                        Total Orders
                                    </p>


                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">

                                        {loadingStats
                                            ? "..."
                                            : stats.totalOrders}

                                    </h3>


                                    <p className="mt-2 text-xs text-pink-600">
                                        Orders received
                                    </p>

                                </div>



                                {/* =================================================
                                    PENDING ORDERS
                                ================================================= */}

                                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                                    <p className="text-sm text-slate-500">
                                        Pending Orders
                                    </p>


                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">

                                        {loadingStats
                                            ? "..."
                                            : stats.pendingOrders}

                                    </h3>


                                    <p className="mt-2 text-xs text-orange-500">
                                        Need your attention
                                    </p>

                                </div>



                                {/* =================================================
                                    TOTAL REVENUE
                                ================================================= */}

                                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                                    <p className="text-sm text-slate-500">
                                        Total Revenue
                                    </p>


                                    <h3 className="mt-2 text-3xl font-bold text-slate-800">

                                        {loadingStats
                                            ? "..."
                                            : `$ ${Number(
                                                stats.totalRevenue
                                            ).toLocaleString()}`}

                                    </h3>


                                    <p className="mt-2 text-xs text-green-600">
                                        Store earnings
                                    </p>

                                </div>

                            </div>

                        </div>



                        {/* =================================================
                            QUICK ACTIONS
                        ================================================= */}

                        <div className="mt-10">

                            <h2 className="text-lg font-bold text-slate-800">
                                Quick Actions
                            </h2>


                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">


                                {/* =================================================
                                    ADD PRODUCT
                                ================================================= */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveComponent("addItems")
                                    }
                                    className="rounded-xl border border-slate-200 bg-white p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-pink-300 hover:shadow-md"
                                >

                                    <h3 className="font-semibold text-slate-800">
                                        Add New Product
                                    </h3>


                                    <p className="mt-2 text-sm text-slate-500">
                                        Add a new product to your JAKMalls store.
                                    </p>


                                    <p className="mt-4 text-sm font-semibold text-pink-700">
                                        Add Product →
                                    </p>

                                </button>



                                {/* =================================================
                                    MANAGE PRODUCTS
                                ================================================= */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveComponent("listItems")
                                    }
                                    className="rounded-xl border border-slate-200 bg-white p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-pink-300 hover:shadow-md"
                                >

                                    <h3 className="font-semibold text-slate-800">
                                        Manage Products
                                    </h3>


                                    <p className="mt-2 text-sm text-slate-500">
                                        View, edit or remove products from your store.
                                    </p>


                                    <p className="mt-4 text-sm font-semibold text-pink-700">
                                        View Products →
                                    </p>

                                </button>



                                {/* =================================================
                                    MANAGE ORDERS
                                ================================================= */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveComponent("admin-orders")
                                    }
                                    className="rounded-xl border border-slate-200 bg-white p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-pink-300 hover:shadow-md"
                                >

                                    <h3 className="font-semibold text-slate-800">
                                        Manage Orders
                                    </h3>


                                    <p className="mt-2 text-sm text-slate-500">
                                        Check customer orders and update their status.
                                    </p>


                                    <p className="mt-4 text-sm font-semibold text-pink-700">
                                        View Orders →
                                    </p>

                                </button>

                            </div>

                        </div>

                    </div>

                );

        }

    };


    // ============================================================
    // AUTH CHECK SCREEN
    // ============================================================

    if (checkingAuth) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-pink-50">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-700">
                    </div>


                    <p className="mt-4 text-sm text-gray-500">
                        Checking admin access...
                    </p>

                </div>

            </div>

        );

    }


    // ============================================================
    // ADMIN PANEL
    // ============================================================

    return (

        <main className="flex min-h-screen flex-col">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="w-full border-b border-gray-300 bg-white px-[4vw] py-3">

                <div className="flex items-center justify-between">


                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() =>
                            setActiveComponent("home")
                        }
                        className="flex flex-col text-left"
                    >

                        <h1 className="h-7.5 text-3xl font-extrabold">

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


                        <p className="text-[13px] text-pink-400">
                            ADMIN PANEL
                        </p>

                    </button>



                    {/* LOGOUT */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl bg-pink-600 px-5 py-2 text-sm font-medium text-white transition duration-200 hover:bg-pink-700"
                    >
                        Logout
                    </button>

                </div>

            </header>



            {/* =====================================================
                MAIN AREA
            ===================================================== */}

            <div className="flex flex-1">


                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <aside className="w-[7%] min-w-12 border-r border-gray-300 bg-white py-8 sm:w-[14%] sm:min-w-45 sm:pl-[4%]">

                    <div className="flex flex-col gap-3">


                        {/* DASHBOARD */}

                        <button
                            type="button"
                            onClick={() =>
                                setActiveComponent("home")
                            }
                            className={`flex w-full items-center gap-3 rounded-tl-xl border p-3 text-sm font-semibold transition duration-200
                                ${activeComponent === "home"
                                    ? "border-pink-300 bg-pink-100 text-pink-700"
                                    : "border-gray-300 text-slate-700 hover:bg-pink-50"
                                }`}
                        >

                            <LayoutDashboard
                                size={23}
                                strokeWidth={1.8}
                            />


                            <span className="hidden sm:flex">
                                Dashboard
                            </span>

                        </button>



                        {/* ADD ITEMS */}

                        <button
                            type="button"
                            onClick={() =>
                                setActiveComponent("addItems")
                            }
                            className={`flex w-full items-center gap-3 rounded-tl-xl border p-3 text-sm font-semibold transition duration-200
                                ${activeComponent === "addItems"
                                    ? "border-pink-300 bg-pink-100 text-pink-700"
                                    : "border-gray-300 text-slate-700 hover:bg-pink-50"
                                }`}
                        >

                            <CirclePlus
                                size={23}
                                strokeWidth={1.8}
                            />


                            <span className="hidden sm:flex">
                                Add Items
                            </span>

                        </button>



                        {/* ITEMS LIST */}

                        <button
                            type="button"
                            onClick={() =>
                                setActiveComponent("listItems")
                            }
                            className={`flex w-full items-center gap-3 rounded-tl-xl border p-3 text-sm font-semibold transition duration-200
                                ${activeComponent === "listItems"
                                    ? "border-pink-300 bg-pink-100 text-pink-700"
                                    : "border-gray-300 text-slate-700 hover:bg-pink-50"
                                }`}
                        >

                            <SquareCheckBig
                                size={23}
                                strokeWidth={1.8}
                            />


                            <span className="hidden sm:flex">
                                Items List
                            </span>

                        </button>



                        {/* ORDERS */}

                        <button
                            type="button"
                            onClick={() =>
                                setActiveComponent("admin-orders")
                            }
                            className={`flex w-full items-center gap-3 rounded-tl-xl border p-3 text-sm font-semibold transition duration-200
                                ${activeComponent === "admin-orders"
                                    ? "border-pink-300 bg-pink-100 text-pink-700"
                                    : "border-gray-300 text-slate-700 hover:bg-pink-50"
                                }`}
                        >

                            <ListOrdered
                                size={23}
                                strokeWidth={1.8}
                            />


                            <span className="hidden sm:flex">
                                Orders
                            </span>

                        </button>

                    </div>

                </aside>



                {/* =================================================
                    CONTENT
                ================================================= */}

                <section className="min-w-0 w-[93%] bg-pink-50 sm:w-[86%]">

                    {renderComponent()}

                </section>

            </div>



            {/* =====================================================
                FOOTER
            ===================================================== */}

            <footer className="w-full border-t border-[#ffffff1d] bg-black px-[4vw] py-2 text-gray-200">

                <div className="flex flex-col-reverse items-center justify-between gap-1 sm:flex-row">

                    <p className="text-[12px] text-gray-400">
                        © 2026 JAKMalls.com - All Right Reserved.
                    </p>


                    <div className="flex gap-5">

                        <Link to="/">
                            <p className="cursor-pointer text-[12px] text-gray-400 hover:text-gray-200">
                                Home
                            </p>
                        </Link>


                        <Link to="/privacy">
                            <p className="cursor-pointer text-[12px] text-gray-400 hover:text-gray-200">
                                Privacy policy
                            </p>
                        </Link>


                        <Link to="/help">
                            <p className="cursor-pointer text-[12px] text-gray-400 hover:text-gray-200">
                                Help
                            </p>
                        </Link>

                    </div>

                </div>

            </footer>

        </main>

    );

}