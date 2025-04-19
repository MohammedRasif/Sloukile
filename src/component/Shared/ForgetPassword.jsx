import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../Shared/qwer.png";
import { useForgetPasswordMutation } from "../../Redux/feature/authApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [ForgetPassword, { isLoading }] = useForgetPasswordMutation();
  const navigation = useNavigate()

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email.", {
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

    const userData = { email };

    try {
      const res = await ForgetPassword(userData).unwrap();
      console.log("backendResponse", res);
      const successMessage = res.message || "Password reset email sent!";
      console.log("Success:", successMessage);
      localStorage.setItem("email", email); // Store email in localStorage
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

      navigation("/forgetPassword_verification")
    } catch (error) {
      const errorMessage = error.data?.message || "Failed to send reset email!";
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

      {/* Forget Password Card */}
      <div className="w-full max-w-md bg-white rounded-lg p-8 z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0a2851]">Forget Password</h1>
          <p className="text-gray-600 mt-2 text-sm">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Email Input Field */}
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-[10px] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-[#003087]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#003087] text-white py-3 rounded-full font-medium mb-4 hover:bg-[#002470] transition-colors cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {/* Back to Login */}
        <div className="text-center">
          <NavLink to="/login" className="text-sm text-[#003087] font-medium">
            Back to Login
          </NavLink>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgetPassword;