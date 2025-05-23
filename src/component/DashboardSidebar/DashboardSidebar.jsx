"use client"

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import img from "../Navbar/image 3.png"; // Ensure correct path
import img1 from "../Navbar/Group (2).png"; // Ensure correct path
import img3 from "../Shared/closeSidebar.png";
import { Bot, Briefcase, Clock, Settings } from "lucide-react";
import { BiSolidDashboard } from "react-icons/bi";
import { useDarkMode } from "../../context/ThemeContext";
import { RiTeamFill } from "react-icons/ri";
import { MdCompost } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const DashboardSidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isProjectActive = location.pathname.startsWith("/dashboard/Project");
    const { darkMode } = useDarkMode();

    // Common NavLink styling function
    const navLinkStyle = (isActive) => `
        flex items-center gap-3 px-4 py-3 relative transition-all duration-200 group
        ${isActive
            ? "bg-white dark:bg-gray-800 shadow-sm text-[#00308F] dark:text-blue-400 rounded-md scale-105 before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-[#00308F] dark:before:bg-blue-400 before:rounded-l-md"
            : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#00308F] dark:hover:text-blue-400 rounded-md"
        }
        ${isSidebarOpen ? "justify-start" : "justify-center"}
    `;

    // Handle logo click: toggle sidebar and navigate to home
    const handleLogoClick = () => {
        toggleSidebar(); // Toggle sidebar state
        navigate("/"); // Navigate to home page
    };

    return (
        <div className="text-[#00308F] dark:text-white flex flex-col h-full">
            <div className="flex items-center justify-center pt-5 pb-6">
                <div onClick={handleLogoClick} className="cursor-pointer">
                    <img
                        src={isSidebarOpen ? (darkMode ? img1 : img) : img3}
                        alt="Logo"
                        className={`${isSidebarOpen ? "h-[34px]" : "h-[24px]"
                            } w-auto`}
                    />
                </div>
            </div>
            <div className="flex flex-col h-full justify-between px-2">
                {/* Top Navigation Links */}
                <div className="flex flex-col gap-1">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) => navLinkStyle(isActive)}
                    >
                        <BiSolidDashboard className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Dashboard</h1>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/chat"
                        className={({ isActive }) => navLinkStyle(isActive)}
                    >
                        <Bot className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Ai Assistant</h1>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/Project"
                        className={() => navLinkStyle(isProjectActive)}
                    >
                        <Briefcase className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Project</h1>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/team"
                        className={({ isActive }) => navLinkStyle(isActive)}
                    >
                        <RiTeamFill className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Team</h1>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/post_project"
                        className={({ isActive }) => navLinkStyle(isActive)}
                    >
                        <MdCompost className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Post Project</h1>
                        )}
                    </NavLink>
                </div>
                {/* Bottom Navigation Links */}
                <div className="flex flex-col gap-1">
                    <NavLink
                        to="/dashboard/manageSubscription"
                        className={({ isActive }) => navLinkStyle(isActive)}
                    >
                        <Clock className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Manage subscription</h1>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/setting"
                        className={({ isActive }) => navLinkStyle(isActive)}
                    >
                        <Settings className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Setting</h1>
                        )}
                    </NavLink>
                    <NavLink
                        to="/dashboard/setting"
                        className={({ isActive }) => navLinkStyle(isActive)}
                    >
                        <FaRegUserCircle className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                        {isSidebarOpen && (
                            <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-108">Sami Loukile</h1>
                        )}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;