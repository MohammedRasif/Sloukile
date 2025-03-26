import img from "./Frame 2147224999.png";
import img1 from "./Frame 2147224999 (2).png";

const Pricing = () => {
    return (
        <div id="pricing" className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            {/* Heading Section */}
            <h1 className="text-[12px] sm:text-[16px] lg:text-[20px] text-center text-[#062960] font-semibold">
                Pricing
            </h1>
            <h1 className="text-[24px] sm:text-[40px] md:text-[50px] lg:text-[55px] text-center font-semibold text-[#062960]">
                Our Pricing Plans
            </h1>
            <p className="text-center text-[14px] sm:text-[16px] lg:text-[18px] mt-3 sm:mt-4 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
                Choose a plan that fits your needs, from monthly to annual options. Enjoy premium features, seamless access, and the flexibility to upgrade anytime.
            </p>

            <div className="mt-8 sm:mt-10 lg:mt-12 max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-stretch space-y-6 md:space-y-0 md:space-x-4 lg:-space-x-6 px-4 ">
                {/* Starter Plan */}
                <div className="relative flex flex-col h-full min-h-[500px] sm:min-h-[550px] lg:min-h-[600px] w-full md:w-1/3 ">
                    <div className="relative">
                        <img src={img} className="w-full rounded-md" alt="Starter Plan" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center bg-opacity-40">
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#003399] mb-3 sm:mb-4">Starter</h2>
                            <div className="flex justify-center items-baseline">
                                <span className="text-lg sm:text-xl font-semibold text-[#003399] top-[100px] sm:top-[125px] left-20 sm:left-28">$</span>
                                <span className="text-4xl sm:text-5xl font-bold text-[#003399]">29.00</span>
                            </div>
                            <p className="text-[#003399] mt-1 sm:mt-2 text-sm sm:text-base">Per Month</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3 sm:space-y-4 p-6 sm:p-8 flex-grow bg-white">
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Up To 20 Team Members</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Advanced AI Recommendations</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Risk Assessment & Mitigation</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Resource Optimization</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Priority Email & Chat Support</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">API Access</p>

                        <div className="mt-auto pt-6 sm:pt-8 flex justify-center">
                            <button className="border-2 border-[#003399] text-[#003399] font-semibold py-1 sm:py-2 px-8 sm:px-12 rounded-full hover:bg-[#003399] hover:text-white cursor-pointer transition-all duration-300 text-sm sm:text-base">
                                Select Plan
                            </button>
                        </div>
                    </div>
                    <div className="py-2 sm:py-3 rounded-b-md bg-[#003399]"></div>
                </div>

                {/* Professional Plan - Highlighted */}
                <div className="relative flex flex-col h-full min-h-[550px] bg-white sm:min-h-[600px] lg:min-h-[700px] w-full md:w-1/3 z-10 transform md:-translate-y-4 shadow-xl  rounded-b-xl ">
                    <div className="relative">
                        <img src={img1} className="w-full rounded-md" alt="Professional Plan" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center bg-opacity-40">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Professional</h2>
                            <div className="flex justify-center items-baseline">
                                <span className="text-lg sm:text-xl font-semibold text-white top-[100px] sm:top-[125px] left-20 sm:left-28">$</span>
                                <span className="text-4xl sm:text-5xl font-bold text-white">49.00</span>
                            </div>
                            <p className="text-white mt-1 sm:mt-2 text-sm sm:text-base">Per Month</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3 sm:space-y-4 p-6 sm:p-8 flex-grow bg-white ">
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Up To 50 Team Members</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Advanced AI Recommendations</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Risk Assessment & Mitigation</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Resource Optimization</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Priority Email & Chat Support</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">API Access</p>

                        <div className="mt-auto pt-6 sm:pt-8 flex justify-center">
                            <button className="bg-[#003399] text-white font-semibold py-1 sm:py-2 px-8 sm:px-12 rounded-full hover:bg-[#002277] transition-all duration-300 cursor-pointer text-sm sm:text-base">
                                Select Plan
                            </button>
                        </div>
                    </div>
                    <div className="py-2 sm:py-3 bg-white z-50 rounded-b-md"></div>

                </div>

                {/* Enterprise Plan */}
                <div className="relative flex flex-col h-full min-h-[500px] sm:min-h-[550px] lg:min-h-[650px] w-full md:w-1/3">
                    <div className="relative">
                        <img src={img} className="w-full rounded-md" alt="Enterprise Plan" />
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center bg-opacity-40">
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#003399] mb-3 sm:mb-4">Enterprise</h2>
                            <div className="flex justify-center items-baseline">
                                <span className="text-lg sm:text-xl font-semibold text-[#003399] top-[100px] sm:top-[125px] left-20 sm:left-28">$</span>
                                <span className="text-4xl sm:text-5xl font-bold text-[#003399]">99.00</span>
                            </div>
                            <p className="text-[#003399] mt-1 sm:mt-2 text-sm sm:text-base">Per Month</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3 sm:space-y-4 p-6 sm:p-8 flex-grow bg-white">
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Unlimited Team Members</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Advanced AI Recommendations</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Risk Assessment & Mitigation</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Resource Optimization</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">Priority Email & Chat Support</p>
                        <p className="text-center text-[#003399] font-medium text-sm sm:text-base">API Access</p>

                        <div className="mt-auto pt-6 sm:pt-8 flex justify-center">
                            <button className="border-2 border-[#003399] text-[#003399] font-semibold py-1 sm:py-2 px-8 sm:px-12 rounded-full hover:bg-[#003399] hover:text-white cursor-pointer transition-all duration-300 text-sm sm:text-base">
                                Select Plan
                            </button>
                        </div>
                    </div>
                    <div className="py-2 sm:py-3 bg-[#003399] rounded-b-md"></div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;