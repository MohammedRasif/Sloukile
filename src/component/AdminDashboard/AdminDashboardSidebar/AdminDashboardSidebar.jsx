import { NavLink, useLocation } from "react-router-dom";
import img from "../../Navbar/image 3.png";
import img1 from "../../Navbar/Group (2).png";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { GoAlertFill } from "react-icons/go";
import { useDarkMode } from "../../../context/ThemeContext";

const AdminDashboardSidebar = () => {
    const location = useLocation();
    const { darkMode } = useDarkMode();

    // Common NavLink styling function
    const navLinkStyle = (isActive) => `
        flex items-center gap-3 px-6 py-3 relative 
        ${
            isActive
                ? 'bg-white shadow-sm text-[#00308F] rounded-md m-2 scale-105 before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-[#00308F] before:rounded-l-md'
                : 'hover:bg-gray-100 hover:text-[#00308F] rounded-md mr-3'
        }
    `;

    return (
        <div className="text-[#00308F] dark:text-white">
            <NavLink to="/">
                <div className="flex items-center justify-center mt-10 pb-6">
                    <div>
                        <img
                            src={darkMode ? img1 : img}
                            alt="Logo"
                            className="h-[30px] sm:h-[80px] md:h-[34px] w-auto"
                        />
                    </div>
                </div>
            </NavLink>
            <div className="flex flex-col gap-1">
                <NavLink
                    to="/admin_dashboard"
                    end
                    className={({ isActive }) => navLinkStyle(isActive)}
                >
                    <BiSolidDashboard className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                    <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Dashboard</h1>
                </NavLink>

                <NavLink
                    to="/admin_dashboard/user_management"
                    className={({ isActive }) => navLinkStyle(isActive)}
                >
                    <FaUsers className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                    <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">User Management</h1>
                </NavLink>

                <NavLink
                    to="/admin_dashboard/notification"
                    className={({ isActive }) => navLinkStyle(isActive)}
                >
                    <GoAlertFill className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                    <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Notifications</h1>
                </NavLink>

                <NavLink
                    to="/admin_dashboard/subscription"
                    className={({ isActive }) => navLinkStyle(isActive)}
                >
                    <HiMiniCurrencyDollar className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                    <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Subscriptions & Billing</h1>
                </NavLink>

                {/* <NavLink
                    to="/admin_dashboard/setting"
                    className={({ isActive }) => navLinkStyle(isActive)}
                >
                    <Settings className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                    <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Setting</h1>
                </NavLink> */}
            </div>
        </div>
    );
};

export default AdminDashboardSidebar;