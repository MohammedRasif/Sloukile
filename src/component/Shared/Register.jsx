import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import img1 from "../Shared/qwer.png";
import { useRegisterMutation } from "../../Redux/feature/authApi";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            toast.error("Confirm password doesn't match!", {
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
                    fontWeight: "bold",
                    borderRadius: "8px",
                },
            });
            return;
        }

        const userData = {
            full_name: name,
            email,
            password,
        };

        try {
            const res = await register(userData).unwrap();
            console.log("backendResponse", res);
            const successMessage = res.message || "Registration successful!";
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
            localStorage.setItem("userEmail", email); // Store email in localStorage
            navigate("/register_verification");
        } catch (error) {
            const errorMessage = error.data?.message || "Registration failed!";
            const isEmailExists = /email.*exists/i.test(errorMessage);
            console.log("Error:", errorMessage);
            toast.error(isEmailExists ? "User already exists" : errorMessage, {
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
                <img src={img1} alt="background" />
            </div>

            {/* Register Card */}
            <div className="w-full max-w-3xl bg-white rounded-lg p-8 z-10 py-20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#0a2851]">Register</h1>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 mx-20">
                    <div>
                        <label className="font-semibold pl-1 pb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full px-4 py-[10px] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                    </div>
                    <div>
                        <label className="font-semibold pl-1 pb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email"
                            className="w-full px-4 py-[10px] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                    </div>

                    <div className="relative">
                        <label className="font-semibold pl-1 pb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            className="w-full px-4 py-[10px] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 mt-1 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="relative">
                        <label className="font-semibold pl-1 pb-1">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Your Password"
                            className="w-full px-4 py-[10px] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 mt-1 cursor-pointer"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Register Button */}
                <div className="flex items-center justify-center mt-5">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-[40vh] cursor-pointer bg-[#003087] text-white py-3 rounded-full font-medium mb-4 hover:bg-[#002470] transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </div>

                {/* Login Link */}
                <div className="text-center mb-6">
                    <span className="text-sm text-gray-600">
                        Already registered?{" "}
                        <NavLink to="/login" className="text-[#003087] font-medium">
                            Login
                        </NavLink>
                    </span>
                </div>

                {/* Google Button */}
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="w-[40vh] text-[20px] flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
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

export default Register;