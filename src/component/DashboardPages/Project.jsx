import { Calendar, Users, FileText, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Project = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Item deleted!");
    setIsPopupOpen(false);
  };

  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "Website redesign and development",
      budget: 1500,
      progress: 75,
      status: "In Progress",
      dueDate: "Apr 15",
      members: 5,
      created: "15 Mar",
    },
    ...Array(6)
      .fill()
      .map((_, i) => ({
        id: i + 2,
        title: "Project Alpha",
        description: "Website redesign and development",
        budget: 1000,
        progress: 75,
        status: "In Progress",
        dueDate: "Apr 15",
        members: 5,
        created: "15 Mar",
      })),
  ];

  return (
    <div className="p-6 min-h-screen text-gray-800 dark:text-gray-200 roboto">
       {/* Header */}
       <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Project
          </h1>
        </div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search your project name"
            className="w-full p-2 pl-10 border border-[#00308F] rounded-lg bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        </div>
        <NavLink to="/dashboard/chat">
          <button className="flex items-center gap-2 bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-[#00218f] dark:bg-[#4A6CF7] dark:hover:bg-[#3B5AEB] transition-colors">
            <PlusCircle size={20} />
            Add New Employee
          </button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {projects.map((project) => (
          <NavLink
            key={project.id}
            to="/dashboard/ProjectDetails"
            className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 block hover:bg-[#f5efe8af] dark:hover:bg-[#353A47] transition-colors"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[22px] font-bold text-gray-800 dark:text-gray-100">
                {project.title}
              </h3>
              <button
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={handleDeleteClick}
              >
                <RiDeleteBin6Line size={22} className="text-red-500 dark:text-red-400 cursor-pointer" />
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.description}</p>

            <div className="mb-3">
              <p className="text-md font-medium text-[#00308F] dark:text-[#4A6CF7] mb-1">
                Budget: ${project.budget.toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                <p className="text-sm text-[#00308F] dark:text-[#4A6CF7] font-medium">
                  {project.progress}%
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div
                  className="bg-[#00308F] dark:bg-[#4A6CF7] h-3 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full">
                {project.status}
              </span>
              <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>Due: {project.dueDate}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{project.members} members</span>
              </div>
              <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
                <FileText className="h-3.5 w-3.5 mr-1" />
                <span>Created: {project.created}</span>
              </div>
            </div>
          </NavLink>
        ))}

        <div className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center h-[265px]">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            Create A New Project
          </h3>
          <NavLink to="/dashboard/chat">
            <button className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add New Project</span>
            </button>
          </NavLink>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-[3px] shadow-md"></div>
          <div className="relative bg-white dark:bg-[#1E232E] rounded-xl shadow-sm p-8 w-[400px] max-w-[90vw] border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 dark:bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors font-medium cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;

