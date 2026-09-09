
import about_image from "../assets/about_image.png"
import Swal from "sweetalert2";

export default function About() {
    return (
        <main className="py-10 flex flex-col items-center gap-18">
            <div className="flex items-center justify-center font-semibold gap-3">
                <h1 className="sm:text-3xl text-gray-800 flex gap-2 text-[22px]">
                    <span className="text-gray-500">ABOUT</span>
                    US
                </h1>
                <hr style={{ width: '50px', height: '2px', backgroundColor: '#1e2939', border: 'none', margin: '10px 0' }} />
            </div>

            <div className="px-[7vw] min-h-100 h-auto flex lg:flex-row flex-col gap-[4vw]">
                <div className="lg:h-100 h-100 lg:w-[40vw] w-full">
                    <img src={about_image} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="h-full lg:w-[40vw] w-full flex flex-col gap-5">
                    <p className="text-[15px]">JAKMalls was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                    <p className="text-[15px]">Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                    <h3 className="font-bold">Our Mission</h3>
                    <p className="text-[15px]">Our mission at JAKMalls is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                </div>
            </div>

            <div className="px-[7vw] flex flex-col gap-8">
                <div className="flex items-center self-start font-semibold gap-3">
                    <h1 className="sm:text-2xl text-gray-800 flex gap-2 text-[20px]">
                        <span className="text-gray-500">WHY</span>
                        CHOOSE US
                    </h1>
                    <hr style={{ width: '50px', height: '2px', backgroundColor: '#1e2939', border: 'none', margin: '10px 0' }} />
                </div>

                <div className="w-full grid lg:grid-cols-3 grid-cols-1">
                    <div className="flex flex-col gap-4 p-10 border border-gray-300 h-50">
                        <h3 className="font-semibold">Quality Assurance:</h3>
                        <p className="text-[14px] text-gray-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
                    </div>

                    <div className="flex flex-col gap-4 p-10 border border-gray-300 h-50">
                        <h3 className="font-semibold">Convenience:</h3>
                        <p className="text-[14px] text-gray-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                    </div>

                    <div className="flex flex-col gap-4 p-10 border border-gray-300 h-50">
                        <h3 className="font-semibold">Exceptional Customer Service:</h3>
                        <p className="text-[14px] text-gray-600">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                    </div>
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