import { useEffect, useMemo, useState } from "react";

import {
    ChevronDown,
    ChevronUp,
    Package,
    User,
    MapPin,
    CreditCard,
    CalendarDays,
} from "lucide-react";

import Swal from "sweetalert2";


export default function AdminOrders() {


    // ============================================================
    // ORDERS
    // ============================================================

    const [orders, setOrders] = useState([]);


    // ============================================================
    // LOADING
    // ============================================================

    const [loading, setLoading] = useState(true);


    // ============================================================
    // FILTER
    // ============================================================

    const [filter, setFilter] = useState("All");


    // ============================================================
    // EXPANDED ORDER
    // ============================================================

    const [expandedOrder, setExpandedOrder] = useState(null);


    // ============================================================
    // UPDATING STATUS
    // ============================================================

    const [updatingOrderId, setUpdatingOrderId] = useState(null);



    // ============================================================
    // STATUS OPTIONS
    // ============================================================

    const statusOptions = [
        "Order Placed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
    ];



    // ============================================================
    // FETCH ORDERS
    // ============================================================

    const fetchOrders = async () => {

        try {

            setLoading(true);


            const token =
                localStorage.getItem("token");


            if (!token) {
                return;
            }


            const response = await fetch(
                "http://localhost:5000/api/orders",
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
                    "Failed to fetch orders"
                );

            }


            setOrders(data);


        } catch (error) {

            console.error(
                "FETCH ORDERS ERROR:",
                error
            );


            Swal.fire({
                title: "Error",
                text: "Failed to load orders.",
                icon: "error",
                confirmButtonColor: "#db2777",
            });


        } finally {

            setLoading(false);

        }

    };



    // ============================================================
    // LOAD ORDERS
    // ============================================================

    useEffect(() => {

        fetchOrders();

    }, []);



    // ============================================================
    // FILTER ORDERS
    // ============================================================

    const filteredOrders = useMemo(() => {

        if (filter === "All") {
            return orders;
        }


        if (filter === "Pending") {

            return orders.filter(
                (order) =>
                    ![
                        "Delivered",
                        "Cancelled",
                    ].includes(order.status)
            );

        }


        if (filter === "Delivered") {

            return orders.filter(
                (order) =>
                    order.status === "Delivered"
            );

        }


        if (filter === "Cancelled") {

            return orders.filter(
                (order) =>
                    order.status === "Cancelled"
            );

        }


        return orders;

    }, [
        orders,
        filter,
    ]);



    // ============================================================
    // CHANGE ORDER STATUS
    // ============================================================

    const handleStatusChange = async (
        orderId,
        newStatus
    ) => {

        try {

            setUpdatingOrderId(orderId);


            const token =
                localStorage.getItem("token");


            const response = await fetch(
                `http://localhost:5000/api/orders/${orderId}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to update order status"
                );

            }


            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order._id === orderId
                        ? {
                            ...order,
                            status: newStatus,
                        }
                        : order
                )
            );


            Swal.fire({
                title: "Updated!",
                text: "Order status updated successfully.",
                icon: "success",
                confirmButtonColor: "#db2777",
                timer: 1500,
                showConfirmButton: false,
            });


        } catch (error) {

            console.error(
                "UPDATE STATUS ERROR:",
                error
            );


            Swal.fire({
                title: "Error",
                text:
                    error.message ||
                    "Failed to update order status.",
                icon: "error",
                confirmButtonColor: "#db2777",
            });

        } finally {

            setUpdatingOrderId(null);

        }

    };



    // ============================================================
    // STATUS COLOR
    // ============================================================

    const getStatusClass = (status) => {

        switch (status) {

            case "Order Placed":
                return "bg-blue-100 text-blue-700";

            case "Packed":
                return "bg-purple-100 text-purple-700";

            case "Shipped":
                return "bg-indigo-100 text-indigo-700";

            case "Out for Delivery":
                return "bg-orange-100 text-orange-700";

            case "Delivered":
                return "bg-green-100 text-green-700";

            case "Cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };



    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }


        return new Date(date).toLocaleDateString(
            "en-PK",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );

    };



    // ============================================================
    // FORMAT TIME
    // ============================================================

    const formatTime = (date) => {

        if (!date) {
            return "";
        }


        return new Date(date).toLocaleTimeString(
            "en-PK",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    };



    // ============================================================
    // LOADING SCREEN
    // ============================================================

    if (loading) {

        return (

            <div className="flex min-h-125 items-center justify-center bg-pink-50">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-700">
                    </div>


                    <p className="mt-4 text-sm text-slate-500">
                        Loading orders...
                    </p>

                </div>

            </div>

        );

    }



    // ============================================================
    // MAIN
    // ============================================================

    return (

        <div className="min-h-full w-full bg-pink-50 px-[4vw] py-8">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex flex-col gap-2">

                <p className="text-sm font-semibold uppercase tracking-wider text-pink-600">
                    Order Management
                </p>


                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                    Customer Orders
                </h1>


                <p className="max-w-2xl text-sm leading-6 text-slate-500">

                    View all customer orders, check order details
                    and update the current order status.

                </p>

            </div>



            {/* =====================================================
                FILTERS
            ===================================================== */}

            <div className="mt-8 flex flex-wrap gap-2">


                {/* ALL */}

                <button
                    type="button"
                    onClick={() =>
                        setFilter("All")
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition duration-200
                        ${filter === "All"
                            ? "bg-pink-700 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-pink-300 hover:text-pink-700"
                        }`}
                >

                    All

                    <span className="ml-2 opacity-70">
                        {orders.length}
                    </span>

                </button>



                {/* PENDING */}

                <button
                    type="button"
                    onClick={() =>
                        setFilter("Pending")
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition duration-200
                        ${filter === "Pending"
                            ? "bg-pink-700 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-pink-300 hover:text-pink-700"
                        }`}
                >

                    Pending

                    <span className="ml-2 opacity-70">

                        {
                            orders.filter(
                                (order) =>
                                    ![
                                        "Delivered",
                                        "Cancelled",
                                    ].includes(
                                        order.status
                                    )
                            ).length
                        }

                    </span>

                </button>



                {/* DELIVERED */}

                <button
                    type="button"
                    onClick={() =>
                        setFilter("Delivered")
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition duration-200
                        ${filter === "Delivered"
                            ? "bg-pink-700 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-pink-300 hover:text-pink-700"
                        }`}
                >

                    Delivered

                    <span className="ml-2 opacity-70">

                        {
                            orders.filter(
                                (order) =>
                                    order.status ===
                                    "Delivered"
                            ).length
                        }

                    </span>

                </button>



                {/* CANCELLED */}

                <button
                    type="button"
                    onClick={() =>
                        setFilter("Cancelled")
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition duration-200
                        ${filter === "Cancelled"
                            ? "bg-pink-700 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-pink-300 hover:text-pink-700"
                        }`}
                >

                    Cancelled

                    <span className="ml-2 opacity-70">

                        {
                            orders.filter(
                                (order) =>
                                    order.status ===
                                    "Cancelled"
                            ).length
                        }

                    </span>

                </button>

            </div>



            {/* =====================================================
                ORDER COUNT
            ===================================================== */}

            <div className="mt-6">

                <p className="text-sm text-slate-500">

                    Showing{" "}

                    <span className="font-semibold text-slate-800">
                        {filteredOrders.length}
                    </span>{" "}

                    {filteredOrders.length === 1
                        ? "order"
                        : "orders"}

                </p>

            </div>



            {/* =====================================================
                NO ORDERS
            ===================================================== */}

            {filteredOrders.length === 0 ? (

                <div className="mt-6 rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

                    <Package
                        size={50}
                        strokeWidth={1.5}
                        className="mx-auto text-pink-300"
                    />


                    <h2 className="mt-4 text-lg font-bold text-slate-800">

                        No Orders Found

                    </h2>


                    <p className="mt-2 text-sm text-slate-500">

                        There are no orders in the{" "}

                        <span className="font-semibold">
                            {filter}
                        </span>{" "}

                        category.

                    </p>

                </div>

            ) : (

                /* =================================================
                   ORDERS LIST
                ================================================= */

                <div className="mt-6 flex flex-col gap-4">


                    {filteredOrders.map(
                        (order, index) => {

                            const isExpanded =
                                expandedOrder ===
                                order._id;


                            return (

                                <div
                                    key={order._id}
                                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                                >


                                    {/* =========================================
                                        ORDER HEADER
                                    ========================================= */}

                                    <div className="p-5">

                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">


                                            {/* ORDER INFORMATION */}

                                            <div className="flex items-start gap-4">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-pink-700">

                                                    <Package
                                                        size={22}
                                                    />

                                                </div>


                                                <div>

                                                    <p className="text-xs text-slate-400">
                                                        Order #{index + 1}
                                                    </p>


                                                    <h2 className="mt-1 text-sm font-bold text-slate-800">

                                                        {order._id}

                                                    </h2>


                                                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">

                                                        <span className="flex items-center gap-1">

                                                            <CalendarDays
                                                                size={14}
                                                            />

                                                            {formatDate(
                                                                order.createdAt
                                                            )}

                                                            {" "}

                                                            {formatTime(
                                                                order.createdAt
                                                            )}

                                                        </span>


                                                        <span>
                                                            •
                                                        </span>


                                                        <span>
                                                            {order.items?.length || 0}{" "}
                                                            {order.items?.length === 1
                                                                ? "item"
                                                                : "items"}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>



                                            {/* RIGHT SIDE */}

                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">


                                                {/* TOTAL */}

                                                <div className="sm:text-right pr-5">

                                                    <p className="text-xs text-slate-400">
                                                        Total
                                                    </p>


                                                    <p className="text-lg font-bold text-slate-800">

                                                        ${" "}
                                                        {Number(
                                                            order.total || 0
                                                        ).toLocaleString()}

                                                    </p>

                                                </div>



                                                {/* STATUS */}

                                                <select
                                                    value={order.status}
                                                    disabled={
                                                        updatingOrderId ===
                                                        order._id
                                                    }
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            order._id,
                                                            event.target.value
                                                        )
                                                    }
                                                    className={`rounded-lg border-0 px-3 py-2 text-sm font-semibold outline-none ring-1 ring-inset ring-transparent focus:ring-pink-400 ${getStatusClass(
                                                        order.status
                                                    )}`}
                                                >

                                                    {statusOptions.map(
                                                        (status) => (

                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </option>

                                                        )
                                                    )}

                                                </select>



                                                {/* VIEW DETAILS */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setExpandedOrder(
                                                            isExpanded
                                                                ? null
                                                                : order._id
                                                        )
                                                    }
                                                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-pink-300 hover:text-pink-700"
                                                >

                                                    {isExpanded
                                                        ? "Hide Details"
                                                        : "View Details"}


                                                    {isExpanded ? (

                                                        <ChevronUp
                                                            size={17}
                                                        />

                                                    ) : (

                                                        <ChevronDown
                                                            size={17}
                                                        />

                                                    )}

                                                </button>

                                            </div>

                                        </div>

                                    </div>



                                    {/* =========================================
                                        ORDER DETAILS
                                    ========================================= */}

                                    {isExpanded && (

                                        <div className="border-t border-slate-200 bg-slate-50 p-5">


                                            {/* CUSTOMER */}

                                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">


                                                {/* CUSTOMER INFORMATION */}

                                                <div className="rounded-xl border border-slate-200 bg-white p-5">

                                                    <div className="flex items-center gap-2">

                                                        <User
                                                            size={19}
                                                            className="text-pink-700"
                                                        />

                                                        <h3 className="font-bold text-slate-800">
                                                            Customer Information
                                                        </h3>

                                                    </div>


                                                    <div className="mt-4 space-y-2 text-sm">

                                                        <p>
                                                            <span className="font-semibold text-slate-700">
                                                                Name:
                                                            </span>{" "}

                                                            {order.customer?.firstName}{" "}
                                                            {order.customer?.lastName}

                                                        </p>


                                                        <p>
                                                            <span className="font-semibold text-slate-700">
                                                                Email:
                                                            </span>{" "}

                                                            {order.customer?.email || "N/A"}

                                                        </p>


                                                        <p>
                                                            <span className="font-semibold text-slate-700">
                                                                Phone:
                                                            </span>{" "}

                                                            {order.customer?.phone || "N/A"}

                                                        </p>

                                                    </div>

                                                </div>



                                                {/* DELIVERY ADDRESS */}

                                                <div className="rounded-xl border border-slate-200 bg-white p-5">

                                                    <div className="flex items-center gap-2">

                                                        <MapPin
                                                            size={19}
                                                            className="text-pink-700"
                                                        />

                                                        <h3 className="font-bold text-slate-800">
                                                            Delivery Address
                                                        </h3>

                                                    </div>


                                                    <div className="mt-4 text-sm leading-6 text-slate-600">

                                                        <p>
                                                            {order.customer?.address}
                                                        </p>


                                                        <p>
                                                            {order.customer?.city},{" "}
                                                            {order.customer?.state}
                                                        </p>


                                                        <p>
                                                            {order.customer?.postalCode}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>



                                            {/* PAYMENT */}

                                            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">

                                                <div className="flex items-center gap-2">

                                                    <CreditCard
                                                        size={19}
                                                        className="text-pink-700"
                                                    />

                                                    <h3 className="font-bold text-slate-800">
                                                        Payment Information
                                                    </h3>

                                                </div>


                                                <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">

                                                    <div>

                                                        <p className="text-xs text-slate-400">
                                                            Payment Method
                                                        </p>

                                                        <p className="mt-1 font-semibold text-slate-700">
                                                            {order.paymentMethod || "N/A"}
                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-xs text-slate-400">
                                                            Subtotal
                                                        </p>

                                                        <p className="mt-1 font-semibold text-slate-700">

                                                            ${" "}
                                                            {Number(
                                                                order.subtotal || 0
                                                            ).toLocaleString()}

                                                        </p>

                                                    </div>


                                                    <div>

                                                        <p className="text-xs text-slate-400">
                                                            Delivery Fee
                                                        </p>

                                                        <p className="mt-1 font-semibold text-slate-700">

                                                            ${" "}
                                                            {Number(
                                                                order.deliveryFee || 0
                                                            ).toLocaleString()}

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>



                                            {/* ITEMS */}

                                            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">

                                                <h3 className="font-bold text-slate-800">
                                                    Ordered Items
                                                </h3>


                                                <div className="mt-4 flex flex-col gap-3">


                                                    {order.items?.map(
                                                        (item, itemIndex) => (

                                                            <div
                                                                key={`${order._id}-${itemIndex}`}
                                                                className="flex flex-col gap-4 rounded-lg border border-slate-200 p-3 sm:flex-row sm:items-center"
                                                            >


                                                                {/* IMAGE */}

                                                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">

                                                                    {item.image ? (

                                                                        <img
                                                                            src={`http://localhost:5000${item.image}`}
                                                                            alt={item.name}
                                                                            className="h-full w-full object-cover"
                                                                        />

                                                                    ) : (

                                                                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                                                            No Image
                                                                        </div>

                                                                    )}

                                                                </div>



                                                                {/* PRODUCT */}

                                                                <div className="min-w-0 flex-1">

                                                                    <h4 className="font-semibold text-slate-800">
                                                                        {item.name}
                                                                    </h4>


                                                                    <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500">

                                                                        <span>
                                                                            Size:{" "}
                                                                            {item.size}
                                                                        </span>


                                                                        <span>
                                                                            Quantity:{" "}
                                                                            {item.quantity}
                                                                        </span>

                                                                    </div>

                                                                </div>



                                                                {/* PRICE */}

                                                                <div className="sm:text-right">

                                                                    <p className="text-xs text-slate-400">
                                                                        Price
                                                                    </p>


                                                                    <p className="font-bold text-slate-800">

                                                                        ${" "}
                                                                        {Number(
                                                                            item.price || 0
                                                                        ).toLocaleString()}

                                                                    </p>

                                                                </div>

                                                            </div>

                                                        )
                                                    )}

                                                </div>



                                                {/* TOTAL */}

                                                <div className="mt-5 flex justify-end border-t border-slate-200 pt-4">

                                                    <div className="text-right">

                                                        <p className="text-sm text-slate-500">
                                                            Order Total
                                                        </p>


                                                        <p className="text-2xl font-bold text-pink-700">

                                                            ${" "}
                                                            {Number(
                                                                order.total || 0
                                                            ).toLocaleString()}

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}