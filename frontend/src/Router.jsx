
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Adminpanel from "./admin/Adminpanel";

import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Mycart from "./pages/Mycart";

import Help from "./pages/Help";
import Privacy from "./pages/Privacy";


function Layout() {
    const location = useLocation();

    // Check if current page is admin panel
    const isAdminPage = location.pathname === "/adminpanel";

    return (
        <>
            <ScrollToTop />

            {/* Hide Navbar on Admin Panel */}
            {!isAdminPage && <Navbar />}

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/collection" element={<Collection />} />

                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/product/:id" element={<ProductDetails />} />

                <Route path="/mycart" element={<Mycart />} />

                <Route path="/orders" element={<Orders />} />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route path="/help" element={<Help />} />

                <Route path="/privacy" element={<Privacy />} />

                {/* Admin */}
                <Route path="/adminpanel" element={<Adminpanel />} />

            </Routes>

            {/* Hide Footer on Admin Panel */}
            {!isAdminPage && <Footer />}
        </>
    );
}


export default function Router() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}