import { ArrowRight, Check } from "lucide-react";
import img from "./image_1__1_-removebg-preview 1.png"
const Login = () => {
    return (
        <div className="flex items-center justify-center ">
            <div className="bg-[#062960] w-1/2 h-screen flex flex-col justify-center items-center text-center">
                <img src={img} className="h-[426.87px] w-[510px] mb-4" alt="" />
                <h1 className="text-[51.25px] font-[500] text-[#CBB702]">Nice to meet you :)</h1>
                <h1 className="text-[30px] text-[#CBB702]">Just register to join with us</h1>
            </div>
            <div className="w-1/2 px-32">
                <div className="">
                    <div className="flex justify-between items-center mb-20">
                        <div>
                            <h1 className="text-5xl font-bold text-[#1a3b6e]">Register</h1>
                            <div className="h-1 w-16 bg-[#dbb929] mt-8"></div>
                        </div>
                        <div className="flex items-center text-[#dbb929]">
                            <span className="text-sm">Already have account?</span>
                            <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                    </div>

                    <div className="mb-6 flex  justify-center ">
                        <button
                            type="button"
                            className=" flex items-center justify-center gap-2 bg-[#e74c3c] text-white py-3 px-10 rounded-full mb-10"
                        >
                            <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center">
                                <span className="text-[#e74c3c] font-bold text-lg">G</span>
                            </div>
                            <span>GOOGLE</span>
                        </button>
                    </div>

                    <div className="flex items-center mb-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">Or register with email</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    <div className="space-y-10">
                        <div>
                            <input type="text" placeholder="Name" className="w-full px-4 py-3 border border-gray-300 rounded-md" />
                        </div>

                        <div>
                            <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-md" />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="password"
                                    placeholder="Repeat Password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div>
                                <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 mt-1 checked:!text-white accent-[#CBB702DE]" />
                            </div>

                            <div className="text-md">
                                I have read and accept the <span className="text-[#dbb929]">Terms of Service & Privacy Policy</span> *
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="button" className="w-full bg-[#dbb929] text-white py-3 rounded-md uppercase font-medium">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
