import img from "./Group 1171275910.png";
import "../Shared/banner.css";

const Contact = () => {
    return (
        <div
            id="contact"
            className="container mx-auto flex flex-col md:flex-row py-10 px-5 mt-28"
        >
            {/* About Section */}
            <div className="w-full md:w-1/2 p-5 roboto">
                <h3 className="text-[#00308F] text-[16px] sm:text-[20px] font-semibold mb-3">
                    About Us
                </h3>
                <h1 className="text-[32px] sm:text-[40px] md:text-[55px] font-bold text-gray-900 mb-6">
                    Our Mission & Vision
                </h1>
                <p className="text-gray-700 text-base sm:text-lg mb-7">
                    We're on a mission to revolutionize project management through artificial intelligence, making complex project execution simple, predictable, and efficient.
                </p>
                <ul className="space-y-4 sm:space-y-6">
                    <li className="flex items-start">
                        <span className="text-white bg-[#00308F] text-xl sm:text-2xl py-1 mt-1 px-2 sm:px-3 rounded-sm mr-2">
                            ✔
                        </span>
                        <div>
                            <span className="font-semibold text-[#00308F] text-sm sm:text-base">
                                Founded in 2023
                            </span>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Started by a team of project management experts and AI specialists.
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-white bg-[#00308F] text-xl sm:text-2xl py-1 mt-1 px-2 sm:px-3 rounded-sm mr-2">
                            ✔
                        </span>
                        <div>
                            <span className="font-semibold text-[#00308F] text-sm sm:text-base">
                                Global Team
                            </span>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Our diverse team spans 12 countries and brings expertise from various industries.
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-white bg-[#00308F] text-xl sm:text-2xl py-1 mt-1 px-2 sm:px-3 rounded-sm mr-2">
                            ✔
                        </span>
                        <div>
                            <span className="font-semibold text-[#00308F] text-sm sm:text-base">
                                Customer-Centric
                            </span>
                            <p className="text-gray-600 text-sm sm:text-base">
                                We've helped over 500 companies transform their project management processes.
                            </p>
                        </div>
                    </li>
                </ul>
                {/* Updated Button with Loading Animation */}
                <button
                    className="bg-blue-900 mt-10 sm:mt-20 hover:bg-blue-800 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full min-w-[150px] sm:min-w-[180px] block"
                    onClick={() => {
                        /* Add your loading logic here */
                    }}
                >
                    <div className="flex items-center justify-center">
                        {/* Normal state text */}
                        <span className="mr-2 text-[16px] sm:text-[18px]">Get started</span>

                        {/* Loading animation (hidden by default) */}
                        <div className="loading-animation flex items-center justify-center">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </button>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 p-5 order-first md:order-last">
                <img
                    src={img}
                    alt="AI Project Management"
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
};

export default Contact;