"use client"

import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCameraReverseOutline } from "react-icons/io5";

const Setting = () => {
  const [activeSection, setActiveSection] = useState("editProfile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
  ); // Default image

  const fileInputRef = useRef(null); // Ref for hidden file input

  const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Trigger file input click when camera button is clicked
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection and update profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a local URL for the selected file
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="border-t border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
      <h1 className="text-[35px] font-[500] pb-2 mt-4 ml-4 text-gray-900 dark:text-gray-100">Profile</h1>
      <div className="flex items-center justify-center pb-10">
        <div className="w-[715px] h-auto">
          <div className="w-[715px] h-[184px] shadow-2xl bg-blue-900 dark:bg-blue-900 flex items-center justify-center space-x-3 relative">
            <div>
              <div className="relative">
                <img
                  src={profileImage} // Use state for dynamic image
                  className="w-[122px] h-[122px] rounded-full object-cover"
                  alt="Profile"
                />
                <button
                  className="bg-[#FAF1E6] dark:bg-[#2A2F3B] p-2 rounded-full absolute bottom-0 right-0 cursor-pointer"
                  onClick={handleCameraClick} // Trigger file input
                >
                  <IoCameraReverseOutline size={20} className="text-gray-800 dark:text-gray-200" />
                </button>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*" // Restrict to image files
                  className="hidden"
                />
              </div>
            </div>
            <div className="text-[20px] text-[#FAF1E6] dark:text-gray-100">
              <h1>Mohammad Rasif</h1>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-5 py-7 text-[20px] font-[500] relative">
            <div className="relative">
              <h1
                className={`cursor-pointer mt-2 ${activeSection === "editProfile" ? "text-blue-900 dark:text-blue-900" : "text-gray-800 dark:text-gray-400"}`}
                onClick={() => setActiveSection("editProfile")}
              >
                Edit Profile
              </h1>
              {activeSection === "editProfile" && <div className="h-[2px] bg-blue-900 dark:bg-blue-900 w-full mt-1"></div>}
            </div>
            <div className="relative">
              <h1
                className={`cursor-pointer mt-2 ${activeSection === "changePassword" ? "text-blue-900 dark:text-blue-900" : "text-gray-800 dark:text-gray-400"}`}
                onClick={() => setActiveSection("changePassword")}
              >
                Change Password
              </h1>
              {activeSection === "changePassword" && <div className="h-[2px] bg-blue-900 dark:bg-blue-900 w-full mt-1"></div>}
            </div>
          </div>

          {activeSection === "editProfile" && (
            <div className="bg-white dark:bg-[#1E232E] px-32 pt-3 shadow-2xl">
              <h1 className="text-center py-3 text-[20px] font-[500] text-gray-900 dark:text-gray-100">Edit Your Profile</h1>
              <div className="pt-2">
                <h1 className="text-[18px] font-[500] mb-2 mt-3 text-gray-800 dark:text-gray-200">User Name</h1>
                <input
                  type="text"
                  className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-[#1E232E] pl-3"
                  placeholder="info@********.com"
                  readOnly
                />
              </div>

              <div className="flex items-center justify-center">
                <button className="bg-blue-900 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-900 uppercase text-[#FAF1E6] dark:text-gray-100 font-[500] px-20 py-2 rounded-full my-10 transition-colors">
                  Save & Changes
                </button>
              </div>
            </div>
          )}

          {activeSection === "changePassword" && (
            <div className="bg-white dark:bg-[#1E232E] px-32 pt-3 shadow-2xl">
              <h1 className="text-center py-3 text-[20px] font-[500] text-gray-900 dark:text-gray-100">Change Password</h1>
              <div className="pt-2">
                <h1 className="text-[16px] mb-2 mt-3 font-[500] text-gray-800 dark:text-gray-200">Current Password</h1>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-[#1E232E] pl-3"
                    placeholder="****************"
                  />
                  <button
                    type="button"
                    onClick={toggleCurrentPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400"
                  >
                    {showCurrentPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <h1 className="text-[16px] mb-2 mt-3 font-[500] text-gray-800 dark:text-gray-200">New Password</h1>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-[#1E232E] pl-3"
                    placeholder="*****************"
                  />
                  <button
                    type="button"
                    onClick={toggleNewPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400"
                  >
                    {showNewPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <h1 className="text-[16px] mb-2 mt-3 font-[500] text-gray-800 dark:text-gray-200">Confirm Password</h1>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full h-[40px] border border-gray-400 dark:border-gray-600 rounded-md text-[#364636] dark:text-gray-200 bg-white dark:bg-[#1E232E] pl-3"
                    placeholder="**********"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400"
                  >
                    {showConfirmPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-blue-900 dark:bg-blue-900 hover:bg-blue-900 dark:hover:bg-blue-900 text-[#FAF1E6] dark:text-gray-100 font-[500] uppercase px-20 py-2 rounded-full my-10 transition-colors">
                  Save & Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;