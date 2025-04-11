import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ProjectDetails = () => {
  const tableData = [
    {
      name: "Pappu",
      kpi: 300,
      stageName: "Foundation",
      materialName: "Cloud Hosting",
      materialCost: "$1500",
    },
    {
      name: "Ramisa",
      kpi: 300,
      stageName: "Feature Development",
      materialName: "Domain & SSL",
      materialCost: "$100",
    },
    {
      name: "Bijoy",
      kpi: 300,
      stageName: "Testing And Refinement",
      materialName: "Payment Gateway Fees",
      materialCost: "$500",
    },
    {
      name: "Sajib",
      kpi: 300,
      stageName: "Deployment And Launch",
      materialName: "Other Expenses",
      materialCost: "$20",
    },
  ];

  const projectBudget = "$1500";

  const [showInfoModal, setShowInfoModal] = useState(false);
  const infoRef = useRef(null);

  const toggleInfoModal = () => {
    setShowInfoModal((prev) => !prev);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false); // Explicitly close the modal
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setShowInfoModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 mx-auto border-t border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <NavLink to="/dashboard/Project">
            <MdOutlineKeyboardBackspace className="text-4xl mt-1 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#00308F] dark:hover:text-[#4A6CF7] transition-colors" />
          </NavLink>
          <h1 className="text-3xl font-[500] text-gray-800 dark:text-gray-100">
            Website Redesign
          </h1>
        </div>
        <div className="flex gap-2">
          <NavLink to="/dashboard/ProjectEdit">
            <button className="text-[30px] mt-2 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#00308F] dark:hover:text-[#4A6CF7] transition-colors">
              <FaEdit />
            </button>
          </NavLink>
          <div ref={infoRef} className="relative">
            <button
              className="text-[30px] text-[#00308F] dark:text-[#4A6CF7] cursor-pointer mt-2 hover:text-[#002266] dark:hover:text-[#3B5AEB] transition-colors"
              onClick={toggleInfoModal}
            >
              <FaInfoCircle />
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                Name
              </th>
              <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                Kpi
              </th>
              <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                Stage Name
              </th>
              <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                Material/Tools Name
              </th>
              <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                Material/Tools Cost
              </th>
              <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                Project Budget
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                  {row.name}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                  {row.kpi}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                  {row.stageName}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                  {row.materialName}
                </td>
                <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                  {row.materialCost}
                </td>
                {index === 0 && (
                  <td
                    className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]"
                    rowSpan={tableData.length}
                  >
                    <div className="flex justify-center text-[#00308F] dark:text-[#4A6CF7] items-center h-full">
                      <span className="text-3xl font-bold">{projectBudget}</span>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Backdrop */}
      {showInfoModal && (
        <div
          className="fixed inset-0 backdrop-blur-[3px]  z-50"
          onClick={closeInfoModal} // Close when clicking backdrop
        />
      )}

      {/* Modal Content */}
      {showInfoModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white dark:bg-[#2A2F3B] border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl p-8 z-50 transition-all duration-300 animate-fade-in">
        <button
          className="absolute right-4 top-4 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer"
          onClick={closeInfoModal}
        >
          <FiX className="text-xl" />
        </button>
        <p className="text-gray-700 dark:text-gray-200 text-lg font-serif leading-relaxed tracking-wide">
          Hello [User Name], your project [Project Name] has been successfully created. AI has automatically set up your milestones and tasks. Check your dashboard for details and next steps.
        </p>
      </div>
      )}
    </div>
  );
};

export default ProjectDetails;