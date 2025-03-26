import img from "./Group 1171275910.png";
import "../Shared/banner.css"


const Contact = () => {
    return (
        <div id="contact" className="container mx-auto flex flex-col md:flex-row  py-10 px-5 mt-28">
            {/* About Section */}

            <div className="w-full md:w-1/2 p-5 roboto">
                <h3 className="text-[#00308F] text-[20px] font-semibold  mb-3">About Us</h3>
                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-[55px]">Our Mission & Vision</h1>
                <p className="text-gray-700 text-lg mb-7">
                    We're on a mission to revolutionize project management through artificial intelligence, making complex project execution simple, predictable, and efficient.
                </p>
                <ul className="space-y-6">
                    <li className="flex items-start">
                        <span className="text-white bg-[#00308F] text-2xl py-1 mt-1 px-3 rounded-sm mr-2">✔</span>
                        <div>
                            <span className="font-semibold text-[#00308F]">Founded in 2023</span>
                            <p className="text-gray-600">Started by a team of project management experts and AI specialists.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-white bg-[#00308F] text-2xl py-1 mt-1 px-3 rounded-sm mr-2">✔</span>
                        <div>
                            <span className="font-semibold text-[#00308F]">Global Team</span>
                            <p className="text-gray-600">Our diverse team spans 12 countries and brings expertise from various industries.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <span className="text-white bg-[#00308F] text-2xl py-1 mt-1 px-3 rounded-sm mr-2">✔</span>
                        <div>
                            <span className="font-semibold text-[#00308F]">Customer-Centric</span>
                            <p className="text-gray-600">We've helped over 500 companies transform their project management processes.</p>
                        </div>
                    </li>
                </ul>
                {/* Updated Button with Loading Animation */}
                <button
                    className="bg-blue-900 mt-20 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-full  min-w-[180px] mx-auto"
                    onClick={() => {/* Add your loading logic here */ }}
                >
                    <div className="flex items-center">
                        {/* Normal state text */}
                        <span className="mr-2 text-[18px]">Get started</span>


                        {/* Loading animation (hidden by default) */}
                        <div className="loading-animation  flex items-center justify-center left-0   ">
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
            <div className="w-full md:w-1/2 p-5">
                <img src={img} alt="AI Project Management" className="w-full h-auto rounded-lg " />
            </div>
        </div>
    );
};

export default Contact;