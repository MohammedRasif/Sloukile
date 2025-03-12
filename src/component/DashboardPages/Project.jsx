import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Importing search icon for the input field

const Project = () => {
  // Array of project titles from the image
  const initialProjects = [
    "Website Redesign",
    "AI & Automation Projects",
    "Mobile App Development Projects",
    "Marketing & Branding Projects",
    "Business & Productivity Tools",
    "AI Chatbot for Customer Support",
    "AI-Driven HR Recruitment Tool",
    "e-Commerce Platform Development",
    "Mobile App for Task Management",
    "Real Estate Listing Website",
    "AI-Powered Language App",
    "Business Analytics Dashboard",
    "Doctor Appointment System",
    "Business Analytics Dashboard",
    "Social Media Campaign Manager",
    "AI-Powered SEO Optimization"
  ];

  // State for search input and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Number of cards per page (3 rows × 4 columns = 12 cards per page)
  const cardsPerPage = 12;

  // Filter projects based on the search term
  const filteredProjects = initialProjects.filter((project) =>
    project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProjects.length / cardsPerPage);

  // Get the projects for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="border-t border-gray-300">
      <div className="container mx-auto p-6">
        {/* Search Input Field with Icon */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search your project name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CBB702]"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6 mt-5">
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <div
                key={index}
                className="bg-yellow-100 border border-yellow-200 py-20 px-14 rounded-lg text-center hover:bg-yellow-200 transition duration-200 cursor-pointer"
              >
                <h1 className="text-xl font-[500]">{project}</h1>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No projects found.</p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
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
        )}

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Add New Project
        </button>
      </div>
    </div>
  );
};

export default Project;