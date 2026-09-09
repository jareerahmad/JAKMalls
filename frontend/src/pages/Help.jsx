
import { useState } from "react";
import {
    Search,
    ShoppingBag,
    Truck,
    RotateCcw,
    CreditCard,
    UserRound,
    ChevronDown,
    MessageCircle,
    Mail,
    Phone,
    HelpCircle,
} from "lucide-react";

export default function Help() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const categories = [
        {
            icon: ShoppingBag,
            title: "Orders",
            description: "Track and manage your orders",
        },
        {
            icon: Truck,
            title: "Shipping",
            description: "Delivery and shipping information",
        },
        {
            icon: RotateCcw,
            title: "Returns",
            description: "Returns, exchanges and refunds",
        },
        {
            icon: CreditCard,
            title: "Payments",
            description: "Payment and billing questions",
        },
        {
            icon: UserRound,
            title: "Account",
            description: "Manage your JAKMalls account",
        },
        {
            icon: HelpCircle,
            title: "Other Help",
            description: "Something else? We're here",
        },
    ];

    const faqs = [
        {
            question: "How can I track my order?",
            answer:
                "Once your order has been shipped, you will receive a confirmation with your tracking information. You can use the tracking number to check your delivery status.",
        },
        {
            question: "How long does delivery take?",
            answer:
                "Delivery time depends on your location and the shipping method selected during checkout. You will see the estimated delivery time before completing your order.",
        },
        {
            question: "Can I return or exchange a product?",
            answer:
                "Yes. JAKMalls offers a 7-day return policy on eligible products. Items should be unused and in their original condition and packaging.",
        },
        {
            question: "How will I receive my refund?",
            answer:
                "After your returned product has been inspected and approved, your refund will be processed using the applicable payment method.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "JAKMalls supports the payment methods available at checkout. Available options may vary depending on your location.",
        },
        {
            question: "Can I cancel my order?",
            answer:
                "You may be able to cancel your order if it has not yet been processed or shipped. Contact our support team as soon as possible if you need to cancel an order.",
        },
        {
            question: "How do I create a JAKMalls account?",
            answer:
                "Click the account icon in the navigation bar and choose the sign-up option. Enter your details and follow the instructions to create your account.",
        },
        {
            question: "What should I do if I receive a damaged product?",
            answer:
                "Please contact our customer support team as soon as possible with your order details and photos of the damaged product. We will help you with the next steps.",
        },
    ];

    return (
        <main className="w-full bg-white">

            {/* =====================================================
                HERO
            ===================================================== */}
            <section className="bg-pink-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

                <div className="mx-auto max-w-4xl text-center">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-700">
                        JAKMalls Help Center
                    </p>

                    <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        How can we
                        <span className="text-pink-700"> help you?</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                        Find answers to your questions about orders, shipping,
                        returns, payments and more.
                    </p>


                    {/* Search */}
                    {/* <div className="mx-auto mt-8 flex max-w-2xl items-center overflow-hidden rounded-full border border-slate-200 bg-white px-5 shadow-sm">

                        <Search
                            size={21}
                            className="shrink-0 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search for help..."
                            className="h-14 w-full bg-transparent px-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
                        />

                        <button
                            className="hidden rounded-full bg-pink-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-pink-800 sm:block"
                        >
                            Search
                        </button>

                    </div> */}

                </div>

            </section>


            {/* =====================================================
                QUICK HELP
            ===================================================== */}
            <section className="px-5 py-16 sm:px-8 lg:px-12">

                <div className="mx-auto max-w-7xl">

                    <div className="mb-10 text-center">

                        <p className="text-sm font-semibold uppercase tracking-widest text-pink-700">
                            Quick Help
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                            What can we help with?
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Choose a topic to quickly find the information
                            you're looking for.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {categories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <button
                                    key={category.title}
                                    className="group rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pink-100 hover:shadow-md"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-700 transition group-hover:bg-pink-700 group-hover:text-white">
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold text-slate-800">
                                        {category.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {category.description}
                                    </p>

                                </button>
                            );
                        })}

                    </div>

                </div>

            </section>


            {/* =====================================================
                FAQ
            ===================================================== */}
            <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-12">

                <div className="mx-auto max-w-4xl">

                    <div className="mb-10 text-center">

                        <p className="text-sm font-semibold uppercase tracking-widest text-pink-700">
                            Frequently Asked Questions
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Common questions
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Here are some of the questions our customers ask
                            most often.
                        </p>

                    </div>


                    {/* FAQ Items */}
                    <div className="space-y-3">

                        {faqs.map((faq, index) => (
                            <div
                                key={faq.question}
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                            >

                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                                >

                                    <span className="text-sm font-semibold text-slate-800 sm:text-base">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        size={20}
                                        className={`shrink-0 text-slate-500 transition-transform duration-300 ${openFaq === index
                                            ? "rotate-180 text-pink-700"
                                            : ""
                                            }`}
                                    />

                                </button>


                                {openFaq === index && (
                                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">

                                        <p className="text-sm leading-7 text-slate-500">
                                            {faq.answer}
                                        </p>

                                    </div>
                                )}

                            </div>
                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                SUPPORT
            ===================================================== */}
            <section className="px-5 py-16 sm:px-8 lg:px-12">

                <div className="mx-auto max-w-7xl">

                    <div className="rounded-3xl bg-pink-700 px-6 py-12 text-center sm:px-10 lg:px-16">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
                            <MessageCircle size={28} />
                        </div>

                        <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                            Still need help?
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-pink-100 sm:text-base">
                            Our customer support team is ready to help you
                            with any questions or concerns.
                        </p>


                        {/* Support Options */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

                            <a
                                href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-pink-700 transition hover:bg-slate-100 sm:w-auto">
                                    <MessageCircle size={18} />
                                    Chat with us
                                </button>
                            </a>

                            <a
                                href="mailto:support@jakmalls.com" target="_blank" rel="noopener noreferrer">
                                <button className="flex w-full items-center justify-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                                    <Mail size={18} />
                                    Email us
                                </button>
                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CONTACT INFORMATION
            ===================================================== */}
            <section className="border-t border-slate-100 px-5 py-12 sm:px-8 lg:px-12">

                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center sm:grid-cols-3">

                    {/* Email */}
                    <div className="flex flex-col items-center">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-700">
                            <Mail size={20} />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-slate-800">
                            Email Support
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            support@jakmalls.com
                        </p>

                    </div>


                    {/* Phone */}
                    <div className="flex flex-col items-center">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-700">
                            <Phone size={20} />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-slate-800">
                            Call Us
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            +92 313 1234567
                        </p>

                    </div>


                    {/* Support */}
                    <div className="flex flex-col items-center">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-pink-700">
                            <MessageCircle size={20} />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-slate-800">
                            Customer Support
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Available 24/7
                        </p>

                    </div>

                </div>

            </section>

        </main>
    );
}