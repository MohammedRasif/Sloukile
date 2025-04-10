import { Calendar, Users, FileText, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Project = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault(); // Prevent NavLink navigation when clicking delete
    e.stopPropagation(); // Stop event from bubbling up to the NavLink
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Item deleted!");
    setIsPopupOpen(false);
  };

  // Sample project data - you can replace this with your actual data
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
    <div className="p-6 bg-white h-screen">
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search your project name"
              className="w-full p-2 pl-10 border border-[#00308F] rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#000524]"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <NavLink to="/dashboard/chat">
            <button className="cursor-pointer flex items-center gap-2 bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-[#00218f]">
              <PlusCircle size={20} />
              Add New Employee
            </button>
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Map through projects */}
        {projects.map((project) => (
          <NavLink
            key={project.id}
            to="/dashboard/ProjectDetails"
            className="hover:bg-[#f9f7f3] bg-[#EDEDED] rounded-lg shadow-sm border border-gray-200 p-5 block"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[22px] font-bold text-gray-800">{project.title}</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleDeleteClick}>
                <RiDeleteBin6Line size={22} className="text-red-500 cursor-pointer" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-3">{project.description}</p>

            <div className="mb-3">
              <p className="text-md font-medium text-[#00308F] mb-1">
                Budget: ${project.budget.toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-sm text-[#00308F] font-medium">{project.progress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-[#00308F] h-3 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
                {project.status}
              </span>
              <div className="flex items-center text-xs text-[#00308F]">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>Due: {project.dueDate}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <div className="flex items-center text-xs text-[#00308F]">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{project.members} members</span>
              </div>
              <div className="flex items-center text-xs text-[#00308F]">
                <FileText className="h-3.5 w-3.5 mr-1" />
                <span>Created: {project.created}</span>
              </div>
            </div>
          </NavLink>
        ))}

        {/* Add New Project Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center h-[250px]">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Create A New Project</h3>
          <NavLink to="/dashboard/chat">
            <button className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00218f] transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add New Project</span>
            </button>
          </NavLink>
        </div>
      </div>

      {/* Popup - Moved outside the NavLink and grid */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background Blur */}
          <div className="absolute inset-0 backdrop-blur-[3px]"></div>

          {/* Popup Content */}
          <div className="relative bg-white rounded-xl shadow-sm p-8 w-[400px] max-w-[90vw] border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium cursor-pointer"
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