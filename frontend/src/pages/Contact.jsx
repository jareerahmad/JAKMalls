import contact_image from "../assets/contact_image.png"
import Swal from "sweetalert2";

export default function Contact() {
    return (
        <main className="pt-10 pb-25 flex flex-col items-center gap-14">
            <div className="flex items-center justify-center font-semibold gap-3">
                <h1 className="sm:text-3xl text-gray-800 flex gap-2 text-[22px]">
                    <span className="text-gray-500">CONTACT</span>
                    US
                </h1>
                <hr style={{ width: '50px', height: '2px', backgroundColor: '#1e2939', border: 'none', margin: '10px 0' }} />
            </div>

            <div className="px-[7vw] flex sm:flex-row flex-col w-full h-auto gap-[6vw]">
                <div className="sm:w-[45vw] w-full">
                    <img src={contact_image} alt="Contact Image"
                        className="w-full sm:h-90 h-70 object-cover"
                    />
                </div>

                <div className="flex flex-col gap-6 sm:w-[35vw] w-full">
                    <h3 className="font-bold text-[21px]">Our Store</h3>
                    <p className="text-[14px] text-gray-600">T/5043 Third Street XXX Station <br /> Peshawar, KPK, Pakistan</p>
                    <div className="">
                        <p className="text-[14px] text-gray-600">Tel: 92 3XX XXXXXXX</p>
                        <p className="text-[14px] text-gray-600">Email: admin@jakmalls.com</p>
                    </div>

                    <h3 className="font-bold text-[21px]">Careers at JAKMalls</h3>
                    <p className="text-[14px] text-gray-600">JAKMalls notify prople on different ocassions upon there need so don't miss out any opportunity.</p>
                </div>
            </div>

            {/* =======================================
                SUBSCRIPTION
                =======================================
            */}

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
    )
};