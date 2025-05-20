"use client"

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-[#f5efe8af] dark:bg-[#1E232E] h-full fixed transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-[320px]" : "w-20"
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-4 flex justify-end"
                    >
                        {isSidebarOpen ? (
                            <GoSidebarExpand className="h-7 w-7 text-gray-600 dark:text-gray-300 cursor-pointer transition-transform duration-300 hover:scale-110" />
                        ) : (
                            <GoSidebarCollapse className="h-7 w-7 text-gray-600 dark:text-gray-300 cursor-pointer transition-transform duration-300 hover:scale-110" />
                        )}
                    </button>
                    {/* Sidebar Content */}
                    <DashboardSidebar isSidebarOpen={isSidebarOpen} />
                </div>
            </div>

            {/* Main Content Area */}
            <div
                className={`flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-[320px] w-[calc(100%-320px)]" : "ml-20 w-[calc(100%-80px)]"
                    }`}
            >
                {/* Navbar - Fixed & Only Navbar BG */}
                <div
                    className="fixed top-0 z-50 bg-white dark:bg-[#1E232E] border-b border-gray-200 dark:border-gray-600 transition-all duration-300 ease-in-out"
                    style={{
                        left: isSidebarOpen ? "320px" : "80px",
                        width: isSidebarOpen ? "calc(100% - 320px)" : "calc(100% - 80px)",
                    }}
                >
                    <DashboardNavbar />
                </div>

                {/* Outlet (Main Content) */}
                <div className="h-full mt-16 overflow-auto bg-white dark:bg-[#252c3b] transition-colors duration-300">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;