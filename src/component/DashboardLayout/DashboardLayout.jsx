import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Sidebar Toggle Icons
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`bg-[#062960] h-full fixed transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-[280px]" : "w-16"
                    }`}
            >
                <div className="h-full flex flex-col justify-between">
                    {/* Sidebar Content */}
                    {isSidebarOpen && <DashboardSidebar />}

                    {/* Toggle Button */}
                    <button
                        className="absolute top-4 right-[16px]  text-white border-2 rounded-full shadow-md p-1 hover:bg-[#e6d8c6] hover:text-[#062960] cursor-pointer transition  "
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                className={`flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-[280px] w-[calc(100%-280px)]" : "ml-16 w-[calc(100%-64px)]"
                    }`}
            >
                {/* Navbar - Fixed & Only Navbar BG White */}
                <div
                    className="fixed top-0 z-50 bg-white  w-full  transition-all duration-300  "
                    style={{
                        left: isSidebarOpen ? "280px" : "64px",
                        width: isSidebarOpen ? "calc(100%-280px)" : "calc(100%-64px)"
                    }}
                >
                    <DashboardNavbar />
                </div>

                {/* Outlet (Main Content) */}
                <div className="h-full mt-16 overflow-auto  bg-gray-200">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
