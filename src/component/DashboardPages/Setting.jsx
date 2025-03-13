import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoCameraReverseOutline } from "react-icons/io5";

const Setting = () => {
    const [activeSection, setActiveSection] = useState("editProfile");

    return (
        <div className="border-t border-gray-300">
            <h1 className="text-[35px] font-[500] pb-2 mt-4 ml-4">Profile</h1>
            <div className="flex items-center justify-center pb-10">
                <div className="w-[715px] h-auto">
                    <div className="w-[715px] h-[184px] shadow-2xl bg-[#CBB702] flex items-center justify-center space-x-3 relative">
                        <div>
                            <div className="relative">
                                <img
                                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
                                    className="w-[122px] h-[122px] rounded-full object-cover"
                                    alt="Profile"
                                />
                                <button className="bg-[#FAF1E6] p-2 rounded-full absolute bottom-0 right-0 cursor-pointer">
                                    <IoCameraReverseOutline size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="text-[20px] text-[#FAF1E6]">
                            <h1>Admin</h1>
                            <h1>Admin</h1>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-5 py-7 text-[20px] font-[500] relative">
                        <div className="relative">
                            <h1
                                className={`cursor-pointer mt-2 ${activeSection === "editProfile" ? "text-[#CBB702]" : ""}`}
                                onClick={() => setActiveSection("editProfile")}
                            >
                                Edit Profile
                            </h1>
                            {activeSection === "editProfile" && <div className="h-[2px] bg-[#CBB702] w-full mt-1"></div>}
                        </div>
                        <div className="relative">
                            <h1
                                className={`cursor-pointer mt-2 ${activeSection === "changePassword" ? "text-[#CBB702]" : ""}`}
                                onClick={() => setActiveSection("changePassword")}
                            >
                                Change Password
                            </h1>
                            {activeSection === "changePassword" && <div className="h-[2px] bg-[#CBB702] w-full mt-1"></div>}
                        </div>
                    </div>

                    {activeSection === "editProfile" && (
                        <div className="bg-white px-32 pt-3 shadow-2xl">
                            <h1 className="text-center py-3 text-[20px] font-[500]">Edit Your Profile</h1>
                            <div className="pt-2">
                                <h1 className="text-[18px] font-[500] mb-2 mt-3">User Name</h1>
                                <input type="text" className="w-full h-[40px] border border-gray-400 rounded-md text-[#364636] pl-3" placeholder="info@********.com" readOnly />
                            </div>


                            <div className="flex items-center justify-center">
                                <button className="bg-[#CBB702] uppercase text-[#FAF1E6] font-[500] px-20 py-2 rounded-full my-10">
                                    Save & Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeSection === "changePassword" && (
                        <div className="bg-white px-32 pt-3 shadow-2xl">
                            <h1 className="text-center py-3 text-[20px] font-[500]">Change Password</h1>
                            <div className="pt-2">
                                <h1 className="text-[16px] mb-2 mt-3 font-[500]">Current Password</h1>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full h-[40px] border border-gray-400 rounded-md text-[#364636] pl-3"
                                        placeholder="****************"
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <FaEyeSlash size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="pt-2">
                                <h1 className="text-[16px] mb-2 mt-3 font-[500]">New Password</h1>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full h-[40px] border border-gray-400 rounded-md text-[#364636] pl-3"
                                        placeholder="*****************"
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <FaEyeSlash size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="pt-2">
                                <h1 className="text-[16px] mb-2 mt-3 font-[500]">Confirm Password</h1>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full h-[40px] border border-gray-400 rounded-md text-[#364636] pl-3"
                                        placeholder="**********"
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <FaEyeSlash size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="bg-[#CBB702] text-[#FAF1E6] font-[500] uppercase px-20 py-2 rounded-full my-10">
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
