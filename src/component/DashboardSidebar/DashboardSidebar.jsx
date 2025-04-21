import { NavLink, useLocation } from "react-router-dom";
import img from "../Navbar/image 3.png";
import img1 from "../Navbar/Group (2).png";
import { Bot, Briefcase, Clock, Settings, Users } from "lucide-react";
import { BiSolidDashboard } from "react-icons/bi";
import { useDarkMode } from "../../context/ThemeContext";
import { RiTeamFill } from "react-icons/ri";
import { GoAlertFill } from "react-icons/go";

const DashboardSidebar = () => {
  const location = useLocation();
  const isProjectActive = location.pathname.startsWith('/dashboard/Project');
 const { darkMode, setDarkMode } = useDarkMode();

 
  // Common NavLink styling function
  const navLinkStyle = (isActive) => `
    flex items-center gap-3 px-6 py-3  relative 
    ${isActive
      ? 'bg-white shadow-sm text-[#00308F] rounded-md m-2 scale-105 before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-[#00308F] before:rounded-l-md'
      : 'hover:bg-gray-100 hover:text-[#00308F] rounded-md mr-3'
    }
  `;

  return (
    <div className="text-[#00308F] dark:text-white">
      <NavLink to="/">
        <div className="flex items-center justify-center pt-10 pb-6">
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
          to="/dashboard"
          end
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <BiSolidDashboard className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Dashboard</h1>
        </NavLink>

        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <Bot className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Ai Assistant</h1>
        </NavLink>

        <NavLink
          to="/dashboard/Project"
          className={() => navLinkStyle(isProjectActive)}
        >
          <Briefcase className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Project</h1>
        </NavLink>

        <NavLink
          to="/dashboard/planing"
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <Users className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Planing</h1>
        </NavLink>
        <NavLink
          to="/dashboard/team"
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <RiTeamFill className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Team</h1>
        </NavLink>

        <NavLink
          to="/dashboard/taskProgress"
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <Clock className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Task Progress</h1>
        </NavLink>

        <NavLink
          to="/dashboard/risks"
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <GoAlertFill className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Risks</h1>
        </NavLink>

        <NavLink
          to="/dashboard/manageSubscription"
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <Clock className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Manage subscription</h1>
        </NavLink>

        <NavLink
          to="/dashboard/setting"
          className={({ isActive }) => navLinkStyle(isActive)}
        >
          <Settings className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <h1 className="text-lg font-medium transition-transform duration-200 group-hover:scale-105">Setting</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;