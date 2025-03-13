import { NavLink, useLocation } from "react-router-dom";
import img from "./image_1__1_-removebg-preview 1.png";
import { Bot, Briefcase, Clock, FileText, Settings, Users } from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation(); // Hook to get the current URL path

  // Check if the current path starts with /dashboard/Project
  const isProjectActive = location.pathname.startsWith('/dashboard/Project');

  return (
    <div className="text-white">
      <div>
        <img src={img} className="h-40 mt-7 pl-10" alt="" />
      </div>
      <div className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          end // Ensures exact match for /dashboard
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#dbb929] text-black' : 'hover:bg-[#2a4b9b]'
            }`
          }
        >
          <FileText className="h-6 w-6" />
          <h1 className="text-lg font-medium">Company Details Page</h1>
        </NavLink>

        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#dbb929] text-black' : 'hover:bg-[#2a4b9b]'
            }`
          }
        >
          <Bot className="h-6 w-6" />
          <h1 className="text-lg font-medium">Ai Chat</h1>
        </NavLink>

        <NavLink
          to="/dashboard/Project"
          className={() =>
            `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isProjectActive ? 'bg-[#dbb929] text-black' : 'hover:bg-[#2a4b9b]'
            }`
          }
        >
          <Briefcase className="h-6 w-6" />
          <h1 className="text-lg font-medium">Project</h1>
        </NavLink>

        <NavLink
          to="/dashboard/addEmploye"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#dbb929] text-black' : 'hover:bg-[#2a4b9b]'
            }`
          }
        >
          <Users className="h-6 w-6" />
          <h1 className="text-lg font-medium">Add Employee</h1>
        </NavLink>

        <NavLink
          to="/dashboard/taskProgress"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#dbb929] text-black' : 'hover:bg-[#2a4b9b]'
            }`
          }
        >
          <Clock className="h-6 w-6" />
          <h1 className="text-lg font-medium">Task Progress</h1>
        </NavLink>
        <NavLink
          to="/dashboard/manageSubscription"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#dbb929] text-black' : 'hover:bg-[#2a4b9b]'
            }`
          }
        >
          <Clock className="h-6 w-6" />
          <h1 className="text-lg font-medium">Manage subscription</h1>
        </NavLink>

        <NavLink
          to="/dashboard/setting"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#dbb929] text-black' : 'hover:bg-[#2a4b9b]'
            }`
          }
        >
          <Settings className="h-6 w-6" />
          <h1 className="text-lg font-medium">Setting</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;