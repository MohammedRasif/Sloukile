import React from "react";
import img from "./Group 1171275910.png";

const Contact = () => {
    return (
        <div 
        id="contact"
        className="w-full lg:-mt-0 md:-mt-0 -mt-40">
            <div className="absolute w-full hidden md:block">
                <img src={img} className="h-[100vh] w-full mt-20 " alt="" />
            </div>
            <div className="w-full relative max-w-2xl bg-white rounded-[30px] top-56 left-1/2 transform -translate-x-1/2 p-6 sm:p-14  shadow-lg z-50 border-2 border-gray-200">
                {/* Heading Section */}
                <h1 className="text-4xl sm:text-5xl font-bold text-[#00BF63] text-center mb-4">
                    Contact Us
                </h1>
                <p className="text-lg sm:text-xl text-[#062960] text-center mb-6">
                    Have questions or need support? We're here to help!
                </p>

                {/* Form Section */}
                <form className="lg:space-y-6 md:space-y-6 space-y-3">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-[#062960]">
                                What is your name? *
                            </label>
                            <input
                                type="text"
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-[#00BF63] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-[#062960]">
                                What is your Email? *
                            </label>
                            <input
                                type="email"
                                required
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-[#00BF63] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Phone and Company Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-[#062960]">
                                What is your phone number?
                            </label>
                            <input
                                type="tel"
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-[#00BF63] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-[#062960]">
                                What is your company?
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-[#00BF63] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Message Area */}
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-[#062960]">
                            Write your message here
                        </label>
                        <textarea
                            rows="4"
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 sm:p-3 focus:ring-2 focus:ring-[#00BF63] focus:border-transparent"
                        ></textarea>
                    </div>

                    {/* Checkbox and Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                required
                                className="h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-[#00BF63]"
                            />
                            <label className="ml-2 text-sm sm:text-base text-[#062960] font-medium">
                                I have read and accept the Terms of <br />{" "}
                                <span className="text-[#00BF63]">Service & Privacy Policy</span> *
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#00BF63] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#b3a002] transition duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
