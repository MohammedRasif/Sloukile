import { ArrowRight } from "lucide-react";
import img from "./image_1__1_-removebg-preview 1.png";
import { NavLink } from "react-router-dom";

const Login = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
            {/* Left Side */}
            <div className="hidden md:block">
            <div className="bg-[#000524] lg:w-1/2 w-full h-auto lg:h-screen flex flex-col justify-center items-center text-center py-10 ">
                <img src={img} className="h-[100px] w-[300px] lg:h-[150px] lg:w-[510px] mb-4 " alt="" />
                <h1 className="text-2xl lg:text-[51.25px] font-[500] text-white">Nice to meet you :)</h1>
                <h1 className="text-lg lg:text-[30px] text-white7">Just register to join with us</h1>
            </div>
            </div>

            {/* Right Side */}
            <div className="lg:w-1/2 w-full px-6 sm:px-10 md:px-16 lg:px-32 py-10">
                <div className="text-center lg:text-left">
                    {/* Register Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
                        <div>
                            <h1 className="text-3xl lg:text-5xl font-bold text-[#1a3b6e]">Login</h1>
                            <div className="h-[8px] w-12 lg:w-20 bg-[#00BF63] mt-4 lg:mt-8 rounded-xl"></div>
                        </div>
                        <div className="flex items-center text-[#00BF63] mt-4 lg:mt-0">
                            <NavLink to="/register" className="text-sm">Create a new accout</NavLink >
                            <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                    </div>

                    {/* Google Button */}
                    <div className="lg:mb-6 flex justify-center">
                        <button type="button" className="flex items-center justify-center gap-2 bg-[#e74c3c] text-white py-3 px-6 lg:px-10 rounded-full mb-10">
                            <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center">
                                <span className="text-[#e74c3c] font-bold text-lg">G</span>
                            </div>
                            <span>GOOGLE</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center mb-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">Or register with email</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4 lg:space-y-8">
                        <input type="text" placeholder="Name" className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm lg:text-base" />
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm lg:text-base" />
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-start gap-2 mt-4 lg:mt-6">
                            <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 mt-1 accent-[#00BF63]" />
                            <span className="text-md lg:text-md text-gray-500 font-[500] ">Remember me </span>
                        </div>
                        <div>
                            <NavLink><h1 className="font-[500] lg:mt-8 mt-4">Forgot Password</h1></NavLink>
                        </div>
                    </div>

                    {/* Continue Button */}
                    <div className="mt-6">
                        <button type="button" className="w-full bg-[#1A2042] text-white py-3 rounded-md uppercase font-medium text-sm lg:text-base">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
