import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import img1 from "../Shared/qwer.png";
import { useLoginMutation } from "../../Redux/feature/authApi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [Login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            return;
        }

        const loginData = {
            email,
            password,
        };

        try {
            const res = await Login(loginData).unwrap();
            console.log("backendResponse", res);
            if (res.access_token) {
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);
                console.log("Access Token:", res.access_token);
                console.log("Refresh Token:", res.refresh_token);
            } else {
                console.warn("No access token found in response");
            }
            const successMessage = res.message || "Login successful!";
            console.log("Success:", successMessage);
            toast.success(successMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#00BF63",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            navigate("/");
        } catch (error) {
            const errorMessage = error.data?.message || "Login failed!";
            console.log("Error:", errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#003087]">
            {/* Grid pattern at the bottom */}
            <div className="absolute bottom-0 w-full opacity-20">
                <img src={img1} className="" alt="Grid Pattern" />
            </div>

            {/* Login Card */}
            <div className="w-full max-w-3xl bg-white rounded-lg p-8 z-10 py-20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#0a2851]">Login</h1>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 mx-20">
                    <div>
                        <label className="font-semibold pl-1 pb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                    </div>

                    <div className="relative">
                        <label className="font-semibold pl-1 pb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Remember me & Forgot Password */}
                <div className="flex items-center justify-between mt-4 mb-6 mx-20">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 border-gray-300 rounded accent-[#003087]"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                            Remember me
                        </label>
                    </div>
                    <NavLink
                        to="/forget_Password"
                        className="text-sm text-[#ff3b30] font-medium"
                    >
                        Forgot Password
                    </NavLink>
                </div>

                {/* Login Button */}
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-[40vh] bg-[#003087] text-white py-3 rounded-full font-medium mb-4 hover:bg-[#002470] transition-colors cursor-pointer disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </div>

                {/* Register Link */}
                <div className="text-center mb-6">
                    <span className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <NavLink to="/register" className="text-[#003087] font-medium">
                            Register
                        </NavLink>
                    </span>
                </div>

                {/* Google Button */}
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="w-[40vh] text-[20px] flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <FcGoogle size={35} />
                        Continue with Google
                    </button>
                </div>

                {/* Toast Container */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;