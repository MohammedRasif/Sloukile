import React, { useState, useRef, useEffect } from 'react';
import { AiFillProduct } from 'react-icons/ai';
import { FiSearch, FiTrash2, FiEdit, FiList } from 'react-icons/fi'; // Importing icons
import { FaFilter } from 'react-icons/fa'; // Importing filter icon
import { NavLink, useNavigate } from 'react-router-dom'; // For navigation

const Project = () => {
  // Updated projects array with status
  const initialProjects = [
    { name: "Website Redesign", status: "completed" },
    { name: "AI & Automation Projects", status: "inProgress" },
    { name: "Mobile App Development Projects", status: "completed" },
    { name: "Marketing & Branding Projects", status: "inProgress" },
    { name: "Business & Productivity Tools", status: "completed" },
    { name: "AI Chatbot for Customer Support", status: "inProgress" },
    { name: "AI-Driven HR Recruitment Tool", status: "completed" },
    { name: "e-Commerce Platform Development", status: "inProgress" },
    { name: "Mobile App for Task Management", status: "completed" },
    { name: "Real Estate Listing Website", status: "inProgress" },
    { name: "AI-Powered Language App", status: "completed" },
    { name: "Business Analytics Dashboard", status: "inProgress" },
    { name: "Doctor Appointment System", status: "completed" },
    { name: "Business Analytics Dashboard", status: "inProgress" },
    { name: "Social Media Campaign Manager", status: "completed" },
    { name: "AI-Powered SEO Optimization", status: "inProgress" }
  ];

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'completed', 'inProgress'
  const [showFilterPopup, setShowFilterPopup] = useState(false); // Filter popup visibility

  const filterRef = useRef(null); // Ref for filter icon/popup
  const navigate = useNavigate(); // Navigation hook

  const cardsPerPage = 12;

  // Filter projects based on search term and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic (for grid view only)
  const totalPages = Math.ceil(filteredProjects.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle card/row click for navigation
  const handleCardClick = (index) => {
    navigate(`/dashboard/ProjectDetails`, { state: { projectName: filteredProjects[startIndex + index].name } });
  };

  // Handle delete icon click (show popup)
  const handleDeleteClick = (index) => {
    setSelectedProjectIndex(index);
    setShowPopup(true);
  };

  // Handle delete confirmation
  const handleDelete = () => {
    const updatedProjects = projects.filter((_, i) => i !== selectedProjectIndex);
    setProjects(updatedProjects);
    setShowPopup(false);
    setSelectedProjectIndex(null);
  };

  // Handle edit (simple alert for now)
  const handleEdit = (index) => {
    alert(`Edit project: ${projects[index].name}`);
  };

  // Close popup without deleting
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProjectIndex(null);
  };

  // Toggle view mode
  const toggleViewMode = (mode) => {
    setViewMode(mode);
    setCurrentPage(1); // Reset pagination when switching views
  };

  // Toggle filter popup
  const toggleFilterPopup = () => {
    setShowFilterPopup((prev) => !prev);
  };

  // Handle filter selection
  const handleFilterSelect = (status) => {
    setFilterStatus(status);
    setShowFilterPopup(false);
    setCurrentPage(1); // Reset pagination when filtering
  };

  // Close filter popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="border-t border-gray-300">
      <div className="container mx-auto p-6">
        {/* Search Input Field with Icons */}
        <div className="relative mb-6 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search your project name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CBB702]"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="absolute top-2 right-5 flex items-center space-x-2">
            {/* Filter Icon and Popup */}
            <div ref={filterRef} className="relative z-50">
              <FaFilter
                className="cursor-pointer text-[24px] text-gray-600 hover:text-[#CBB702]"
                onClick={toggleFilterPopup}
              />
              {showFilterPopup && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleFilterSelect('completed')}
                  >
                    Completed Project
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleFilterSelect('inProgress')}
                  >
                    In Progress
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleFilterSelect('all')}
                  >
                    All Projects
                  </button>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-3 text-[28px] border px-3 py-1 rounded-md border-gray-300 z-50">
              <AiFillProduct
                className={`cursor-pointer ${viewMode === 'grid' ? 'text-[#CBB702]' : 'text-gray-600'}`}
                onClick={() => toggleViewMode('grid')}
              />
              <FiList
                className={`cursor-pointer ${viewMode === 'table' ? 'text-[#CBB702]' : 'text-gray-600'}`}
                onClick={() => toggleViewMode('table')}
              />
            </div>
          </div>
        </div>

        {/* Project Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 mt-5">
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <div
                  key={index}
                  className="relative bg-yellow-100 border border-yellow-200 py-16 px-16 rounded-lg text-center hover:bg-yellow-200 transition duration-200 cursor-pointer"
                  onClick={() => handleCardClick(index)}
                >
                  <FiEdit
                    className="absolute top-2 right-9 text-gray-600 hover:text-blue-600 cursor-pointer"
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleEdit(startIndex + index);
                    }}
                  />
                  <FiTrash2
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600 cursor-pointer"
                    size={20}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleDeleteClick(startIndex + index);
                    }}
                  />
                  <h1 className="text-xl font-[500]">{project.name}</h1>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No projects found.</p>
            )}
          </div>
        ) : (
          <div className="mt-5 max-h-[70vh] overflow-y-auto">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-200 hover:bg-gray-300 transition duration-200 py-[20px] px-4 mb-1 rounded cursor-pointer"
                  onClick={() => handleCardClick(index)}
                >
                  <span className="text-[20px] text-gray-800 truncate font-[500]">{project.name}</span>
                  <div className="flex space-x-2">
                    <FiEdit
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                      size={20}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleEdit(index);
                      }}
                    />
                    <FiTrash2
                      className="text-gray-600 hover:text-red-600 cursor-pointer"
                      size={20}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleDeleteClick(index);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-sm py-4">
                No projects found.
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls (Only for Grid View) */}
        {viewMode === 'grid' && totalPages > 1 && (
          <div className="fixed bottom-5 left-5/9 transform -translate-x-1/2">
            <div className="flex justify-center space-x-2 mb-6">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? 'bg-[#CBB702] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition duration-200`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add New Project Button */}
        <NavLink to="/dashboard">
        <button className="bg-[#0A3161] fixed bottom-11 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-200 cursor-pointer">
          Add New Project
        </button>
        </NavLink>

        {/* Popup for Delete Confirmation */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center shadow-2xl bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="mb-6">Do you want to delete "{projects[selectedProjectIndex]?.name}"?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;