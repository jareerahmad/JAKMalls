import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="flex flex-col w-full h-auto items-center bg-black">
            <div className="py-22 w-[86%] flex lg:flex-row lg:gap-0 gap-12 flex-col items-start justify-between">

                <div className="lg:w-[30%] sm:w-[65%] w-[95%] flex flex-col gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                        JAKMalls.
                    </h3>

                    <p className="text-white text-[15px]">
                        JAKMalls is a leading online shoping place for thousends of people,
                        we deliver good quality products with zero compromize on Quality.
                        So, feel free to order products from our company.
                    </p>
                </div>

                <div className="lg:w-[55%] w-full flex sm:justify-between sm:gap-0 gap-[25%] justify-center ">
                    <ul className="space-y-3">

                        <h3 className="pb-3 text-sm font-bold uppercase tracking-widest text-white">
                            Quick Links
                        </h3>

                        <li>
                            <Link
                                to="/"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/collection"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                Collection
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/mycart"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                My cart
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/login"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                Login
                            </Link>
                        </li>
                    </ul>

                    <ul className="space-y-3">

                        <h3 className="pb-3 text-sm font-bold uppercase tracking-widest text-white">
                            Company
                        </h3>

                        <li>
                            <Link
                                to="/about"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contact"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                Contact Us
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/privacy"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                Privacy policy
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/help"
                                className="group flex items-center text-sm text-slate-300 transition hover:text-white"
                            >
                                <span className="mr-2 text-pink-500 transition group-hover:translate-x-1">
                                    →
                                </span>
                                Help
                            </Link>
                        </li>
                    </ul>

                    <ul className="hidden sm:flex flex-col space-y-3">

                        <h3 className="pb-3 text-sm font-bold uppercase tracking-widest text-white">
                            Get in touch
                        </h3>

                        <p className="group flex items-center text-sm text-slate-300 transition hover:text-white">KPK, Peshawar</p>
                        <p className="group flex items-center text-sm text-slate-300 transition hover:text-white">92 3XX XXXXXXX</p>
                        <p className="group flex items-center text-sm text-slate-300 transition hover:text-white">jakmalls@email.com</p>
                    </ul>
                </div>
            </div>

            <div className="hidden py-5 w-[86%] text-center sm:flex justify-center items-center border-t border-[#ffffff1d]">
                <h1 className="text-3xl font-extrabold">
                    <Link to="/">
                        <span className="text-9xl text-pink-700">JAK</span>
                        <span className="text-7xl text-white">Malls</span>
                        <span className="text-9xl text-pink-700">.</span>
                    </Link>
                </h1>
            </div>

            <div className="py-2 px-[7%] w-full text-white flex sm:flex-row flex-col-reverse gap-1 justify-between items-center border-t border-[#ffffff1d]">
                <p className="text-[12px]">© 2026 JAKMalls.com - All Right Reserved.</p>

                <p className="text-[13px] flex gap-2">
                    DEVELOPED BY
                    <span className="text-pink-700">JAREX ENTERPRISES</span>
                </p>
            </div>
        </footer>
    )
}