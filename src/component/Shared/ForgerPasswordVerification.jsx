import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../Shared/qwer.png";
import { useForgetpasswordVerificationMutation, useForgetRecentVerificationMutation } from "../../Redux/feature/authApi";

const ForgetPasswordVerification = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [ForgetVerification, { isLoading: isVerificationLoading }] = useForgetpasswordVerificationMutation();
    const [RecentVerification, { isLoading: isResendLoading }] = useForgetRecentVerificationMutation();
    const navigate = useNavigate();

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input if value is entered
            if (value && index < 3) {
                inputRefs[index + 1].current.focus();
            }
        }
    };

    // Handle backspace to move to previous input
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    // Handle OTP submission
    const handleSubmit = async () => {
        const email = localStorage.getItem("email");
        const otpString = otp.join(""); // Concatenate OTP digits (e.g., ["6", "5", "2", "5"] → "6525")

        if (!email) {
            toast.error("Email not found. Please request a new reset link.", {
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

        if (otpString.length !== 4 || !/^\d{4}$/.test(otpString)) {
            toast.error("Please enter a valid 4-digit OTP.", {
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

        const verificationData = {
            email,
            otp: otpString,
        };

        try {
            const res = await ForgetVerification(verificationData).unwrap();
            console.log("backendResponse", res);
            if (res.access_token) {
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);
                console.log("Access Token:", res.access_token);
                console.log("Refresh Token:", res.refresh_token);
            } else {
                console.warn("No access token found in response");
            }
            const successMessage = res.message || "OTP verified successfully!";
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
            navigate("/confrim_password");
        } catch (error) {
            const errorMessage = error.data?.message || "OTP verification failed!";
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

    // Handle Resend OTP
    const handleResendOtp = async () => {
        const email = localStorage.getItem("email");

        if (!email) {
            toast.error("Email not found. Please request a new reset link.", {
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

        const resendData = { email };

        try {
            const res = await RecentVerification(resendData).unwrap();
            console.log("resendOtpResponse", res);
            const successMessage = res.message || "New verification code sent!";
            console.log("Resend Success:", successMessage);
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
            setOtp(["", "", "", ""]); // Clear OTP inputs
        } catch (error) {
            const errorMessage = error.data?.message || "Failed to resend OTP!";
            console.log("Resend Error:", errorMessage);
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#003087] to-[#001B5E]">
            {/* Grid pattern at the bottom */}
            <div className="absolute bottom-0 w-full opacity-20">
                <img src={img1} className="w-full" alt="Grid Pattern" />
            </div>

            {/* OTP Verification Card */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 z-10 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#0a2851]">
                        Verify Your Account
                    </h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Enter the 4-digit OTP sent to your email
                    </p>
                </div>

                {/* OTP Input Fields */}
                <div className="flex justify-center gap-4 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={inputRefs[index]}
                            className="w-12 h-12 text-center text-lg font-medium border border-gray-200 rounded-lg focus:outline-none focus:border-[#003087] focus:ring-2 focus:ring-[#003087] transition-colors"
                        />
                    ))}
                </div>

                {/* Resend OTP Link */}
                <div className="text-center mb-6">
                    <span
                        onClick={handleResendOtp}
                        className="text-sm text-[#003087] font-medium hover:text-[#002470] transition-colors cursor-pointer"
                    >
                        {isResendLoading ? "Resending..." : "Resend OTP"}
                    </span>
                </div>

                {/* Verify Button */}
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isVerificationLoading}
                        className="w-full max-w-xs bg-[#003087] text-white py-3 rounded-full font-medium hover:bg-[#002470] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {isVerificationLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                </div>

                {/* Reset OTP Link */}
                <div className="text-center mb-6 mt-4">
                    <span className="text-sm text-gray-600">
                        Reset OTP?{" "}
                        <span
                            onClick={handleResendOtp}
                            className="text-[#003087] font-medium hover:text-[#002470] transition-colors cursor-pointer"
                        >
                            {isResendLoading ? "Resending..." : "Click here"}
                        </span>
                    </span>
                </div>

                {/* Toast Container */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgetPasswordVerification;