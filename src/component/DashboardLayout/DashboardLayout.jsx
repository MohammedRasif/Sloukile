import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Sidebar Toggle Icons
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-[#f5efe8af] dark:bg-[#1E232E] h-full fixed transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-[320px]" : "w-16"
                    }`}
            >
                <div className="h-full flex flex-col justify-between">
                    {/* Sidebar Content */}
                    {isSidebarOpen && <DashboardSidebar />}

                    {/* Toggle Button */}
                    <button
                        className="absolute top-4 right-[10px] bg-[#e6d8c6] dark:bg-[#00308F] dark:hover:bg-[#00308F] dark:hover:text-white dark:text-white text-[#00308F] rounded-full p-2 hover:bg-[#e6d8c6] hover:text-[#062960] cursor-pointer transition font-bold"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? (
                            <GoSidebarExpand size={24} className="font-extrabold" />
                        ) : (
                            <GoSidebarCollapse size={24} className="font-extrabold" />
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                className={`flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-[320px] w-[calc(100%-320px)]" : "ml-16 w-[calc(100%-64px)]"
                    }`}
            >
                {/* Navbar - Fixed & Only Navbar BG White */}
                <div
                    className="fixed top-0 z-50 bg-white dark:bg-[#1E232E] w-full transition-all duration-300"
                    style={{
                        left: isSidebarOpen ? "320px" : "64px",
                        width: isSidebarOpen ? "calc(100%-320px)" : "calc(100%-64px)",
                    }}
                >
                    <DashboardNavbar />
                </div>

                {/* Outlet (Main Content) */}
                <div className="h-full mt-16 overflow-auto bg-gray-200 dark:bg-[#252c3b]  ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;