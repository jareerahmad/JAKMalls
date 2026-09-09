
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
    User,
    ShoppingCart,
    Menu,
    X,
} from "lucide-react";

function Navbar() {

    const navigate = useNavigate();

    // ================= CART =================

    const [cartCount, setCartCount] = useState(0);
    const [accountOpen, setAccountOpen] = useState(false);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const totalQuantity = cart.reduce(
            (total, item) => total + Number(item.quantity || 0),
            0
        );

        setCartCount(totalQuantity);
    };


    // ================= AUTH =================

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const checkAuth = () => {

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
        } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
        }
    };


    // ================= MENU =================

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };


    // ================= USE EFFECT =================

    useEffect(() => {

        updateCartCount();
        checkAuth();

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );

        window.addEventListener(
            "authUpdated",
            checkAuth
        );

        return () => {

            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );

            window.removeEventListener(
                "authUpdated",
                checkAuth
            );
        };

    }, []);


    // ================= LOGOUT =================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setCurrentUser(null);

        window.dispatchEvent(
            new Event("authUpdated")
        );

        closeMenu();

        navigate("/login");
    };


    // ================= NAVIGATION ITEMS =================

    const navItems = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Collection",
            path: "/collection",
        },
        {
            name: "About",
            path: "/about",
        },
        {
            name: "Contact",
            path: "/contact",
        },
    ];


    return (
        <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">

            {/* ================= NAVBAR ================= */}

            <nav className="px-5 sm:px-8 lg:px-10 py-3 flex justify-between items-center">


                {/* ================= LOGO ================= */}

                <div className="p-2">

                    <h1 className="text-3xl font-extrabold">

                        <Link
                            to="/"
                            onClick={closeMenu}
                        >

                            <span className="text-pink-700">
                                JAK
                            </span>

                            <span className="text-[22px] text-black">
                                Malls
                            </span>

                            <span className="text-pink-700">
                                .
                            </span>

                        </Link>

                    </h1>

                </div>


                {/* ================= DESKTOP LINKS ================= */}

                <div className="hidden lg:flex items-center gap-5 font-medium">

                    <div className="font-medium flex gap-5">

                        {navItems.map((item) => (

                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/"}
                                className={({ isActive }) =>
                                    `group relative px-4 py-3 text-sm font-medium
                                    ${isActive
                                        ? "text-pink-700"
                                        : "text-slate-700 transition hover:text-pink-700"
                                    }`
                                }
                            >

                                {({ isActive }) => (

                                    <>

                                        {item.name}

                                        <span
                                            className={`absolute bottom-1 left-4 right-4 h-0.5 origin-left rounded-full bg-pink-700 transition-transform duration-300 ${isActive
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                                }`}
                                        />

                                    </>

                                )}

                            </NavLink>

                        ))}

                    </div>


                    {/* ================= ADMIN PANEL ================= */}

                    {isLoggedIn &&
                        currentUser?.role === "admin" && (

                            <Link
                                to="/adminpanel"
                                className="px-5 py-2 text-sm font-semibold text-pink-700 border-2 border-pink-700 rounded-full transition-all duration-300 hover:bg-pink-700 hover:text-white"
                            >
                                Admin Panel
                            </Link>

                        )}

                </div>


                {/* ================= DESKTOP ICONS ================= */}

                <div className="hidden lg:flex items-center gap-5">


                    {/* ================= USER ================= */}

                    <div className="group relative">

                        <button
                            className="text-slate-700 hover:text-pink-700 transition duration-200"
                            aria-label="Account"
                        >

                            <User
                                size={21}
                                strokeWidth={1.8}
                            />

                        </button>


                        {/* ================= ACCOUNT DROPDOWN ================= */}

                        <div className="invisible absolute right-0 top-full w-36 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                            {isLoggedIn ? (

                                <>

                                    {/* User Name */}

                                    <div className="border-b border-slate-100 px-3 py-2 mb-1">

                                        <p className="text-xs text-slate-400">
                                            Signed in as
                                        </p>

                                        <p className="text-sm font-semibold text-slate-800 truncate">
                                            {currentUser?.name}
                                        </p>

                                    </div>


                                    {/* Profile */}

                                    <Link
                                        to="/profile"
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        My Profile
                                    </Link>


                                    {/* Orders */}

                                    <Link
                                        to="/orders"
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        My Orders
                                    </Link>


                                    {/* Logout */}

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full rounded-lg px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                                    >
                                        Logout
                                    </button>

                                </>

                            ) : (

                                <>

                                    {/* Login */}

                                    <Link
                                        to="/login"
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        Login
                                    </Link>


                                    {/* Register */}

                                    <Link
                                        to="/register"
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        Register
                                    </Link>

                                </>

                            )}

                        </div>

                    </div>


                    {/* ================= CART ================= */}

                    <Link to="/mycart">

                        <button
                            className="relative text-slate-700 hover:text-pink-700 transition duration-200"
                            aria-label="Shopping Cart"
                        >

                            <ShoppingCart
                                size={21}
                                strokeWidth={1.8}
                            />


                            {/* Cart Counter */}

                            {cartCount > 0 && (

                                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-pink-700 text-[9px] text-white">

                                    {cartCount}

                                </span>

                            )}

                        </button>

                    </Link>

                </div>


                {/* ================= MOBILE ICONS ================= */}

                <div className="flex lg:hidden items-center gap-5">


                    {/* ================= USER ================= */}

                    <div className="relative">

                        <button
                            onClick={() => setAccountOpen(!accountOpen)}
                            className="text-slate-700 hover:text-pink-700 transition duration-200"
                            aria-label="Account"
                        >
                            <User
                                size={21}
                                strokeWidth={1.8}
                            />
                        </button>


                        {/* ================= ACCOUNT DROPDOWN ================= */}

                        <div
                            className={`absolute right-0 top-full z-50 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-300
        ${accountOpen
                                    ? "visible translate-y-0 opacity-100"
                                    : "invisible translate-y-2 opacity-0"
                                }`}
                        >

                            {isLoggedIn ? (

                                <>

                                    {/* User Name */}

                                    <div className="mb-1 border-b border-slate-100 px-3 py-2">

                                        <p className="text-xs text-slate-400">
                                            Signed in as
                                        </p>

                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {currentUser?.name}
                                        </p>

                                    </div>


                                    {/* Profile */}

                                    <Link
                                        to="/profile"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            closeMenu();
                                        }}
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        My Profile
                                    </Link>


                                    {/* Orders */}

                                    <Link
                                        to="/orders"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            closeMenu();
                                        }}
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        My Orders
                                    </Link>


                                    {/* Logout */}

                                    <button
                                        onClick={() => {
                                            setAccountOpen(false);
                                            handleLogout();
                                        }}
                                        className="block w-full rounded-lg px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                                    >
                                        Logout
                                    </button>

                                </>

                            ) : (

                                <>

                                    {/* Login */}

                                    <Link
                                        to="/login"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            closeMenu();
                                        }}
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        Login
                                    </Link>


                                    {/* Register */}

                                    <Link
                                        to="/register"
                                        onClick={() => {
                                            setAccountOpen(false);
                                            closeMenu();
                                        }}
                                        className="block w-full rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-gray-100 hover:text-pink-700"
                                    >
                                        Register
                                    </Link>

                                </>

                            )}

                        </div>

                    </div>


                    {/* ================= CART ================= */}

                    <Link to="/mycart">

                        <button
                            className="relative text-slate-700 hover:text-pink-700 transition duration-200"
                            aria-label="Shopping Cart"
                        >

                            <ShoppingCart
                                size={21}
                                strokeWidth={1.8}
                            />


                            {/* Cart Counter */}

                            {cartCount > 0 && (

                                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-pink-700 text-[9px] text-white">

                                    {cartCount}

                                </span>

                            )}

                        </button>

                    </Link>


                    {/* ================= MENU ================= */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-slate-700 hover:text-pink-700 transition duration-200"
                        aria-label="Toggle Menu"
                    >

                        {menuOpen ? (
                            <X size={25} />
                        ) : (
                            <Menu size={25} />
                        )}

                    </button>

                </div>

            </nav>


            {/* ================= MOBILE MENU ================= */}

            {menuOpen && (

                <div className="lg:hidden border-t border-slate-100 bg-white">

                    <div className="px-7 py-5">

                        <div className="flex flex-col">


                            {/* Home */}

                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="border-b border-slate-100 py-4 text-sm font-medium text-pink-700"
                            >
                                Home
                            </Link>


                            {/* Collection */}

                            <Link
                                to="/collection"
                                onClick={closeMenu}
                                className="border-b border-slate-100 py-4 text-sm font-medium text-slate-700 hover:text-pink-700"
                            >
                                Collection
                            </Link>


                            {/* About */}

                            <Link
                                to="/about"
                                onClick={closeMenu}
                                className="border-b border-slate-100 py-4 text-sm font-medium text-slate-700 hover:text-pink-700"
                            >
                                About
                            </Link>


                            {/* Contact */}

                            <Link
                                to="/contact"
                                onClick={closeMenu}
                                className="border-b border-slate-100 py-4 text-sm font-medium text-slate-700 hover:text-pink-700"
                            >
                                Contact
                            </Link>


                            {/* Admin Panel */}

                            {isLoggedIn &&
                                currentUser?.role === "admin" && (

                                    <Link
                                        to="/adminpanel"
                                        onClick={closeMenu}
                                        className="py-4 text-sm font-medium text-pink-700"
                                    >
                                        Admin Panel
                                    </Link>

                                )}

                        </div>

                    </div>

                </div>

            )}

        </header>
    );
}

export default Navbar;