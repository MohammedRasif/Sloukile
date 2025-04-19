import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import img1 from "../Shared/qwer.png";
import { useConfrimPasswordMutation } from "../../Redux/feature/authApi";

const ConfirmPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [confirmPasswordMutation, { isLoading }] = useConfrimPasswordMutation();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!newPassword) {
            toast.error("Please enter a valid password.", {
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

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!", {
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

        const passwordData = {
            new_password: newPassword,
            email: email,
        };

        try {
            const res = await confirmPasswordMutation(passwordData).unwrap();
            console.log("backendResponse", res);
            const successMessage = res.message || "Password reset successfully!";
            console.log("Success:", successMessage);
            setPopupMessage(successMessage);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate("/login");
                localStorage.removeItem("email");
            }, 1500);
        } catch (error) {
            const errorMessage = error.data?.message || "Failed to reset password!";
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
                <img src={img1} className="w-full" alt="Grid Pattern" />
            </div>

            {/* Set New Password Card */}
            <div className="w-full max-w-md bg-white rounded-lg p-8 z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#0a2851]">Set New Password</h1>
                    <p className="text-gray-600 mt-2 text-sm">Create a new password for your account</p>
                </div>

                {/* Password Input Fields */}
                <div className="space-y-4 mb-6">
                    {/* New Password Field */}
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-[#003087] text-white py-3 rounded-full font-medium mb-4 hover:bg-[#002470] transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {isLoading ? "Setting Password..." : "Set New Password"}
                </button>

                {/* Success Popup */}
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-[#003087] text-center">
                            <p className="text-lg font-bold text-[#0a2851]">{popupMessage}</p>
                        </div>
                    </div>
                )}

                {/* Toast Container */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default ConfirmPassword;