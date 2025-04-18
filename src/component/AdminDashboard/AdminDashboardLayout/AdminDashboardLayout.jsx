import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminDashboardSidebar from "../AdminDashboardSidebar/AdminDashboardSidebar";
import AdminDashboardNavbar from "../AdminDashboardNavbar/AdminDashboardNavbar";

const AdminDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-[#f5efe8af] dark:bg-[#1E232E] h-full fixed ease-in-out ${isSidebarOpen ? "w-[320px]" : "w-16"
                    }`}
            >
                <div className="h-full flex flex-col justify-between">
                    {/* Sidebar Content */}
                    <AdminDashboardSidebar />


                </div>
            </div>

            {/* Main Content Area */}
            <div
                className={`flex flex-col  ${isSidebarOpen ? "ml-[320px] w-[calc(100%-320px)]" : "ml-16 w-[calc(100%-64px)]"
                    }`}
            >
                {/* Navbar - Fixed & Only Navbar BG White */}
                <div
                    className="fixed top-0 z-50 bg-white dark:bg-[#1E232E]    w-full border-b border-gray-200 dark:border-gray-600 "
                    style={{
                        left: isSidebarOpen ? "320px" : "64px",
                        width: isSidebarOpen ? "calc(100%-320px)" : "calc(100%-64px)",
                    }}
                >
                    <AdminDashboardNavbar />
                </div>

                {/* Outlet (Main Content) */}
                <div className="h-full mt-16 overflow-auto bg-white dark:bg-[#252c3b]  ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;



