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
    <div className="p-6 mx-auto border-t border-gray-300 dark:border-gray-700  text-gray-800 dark:text-gray-200">
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
            {showInfoModal && (
              <>
                {/* Blurred Backdrop */}
                <div
                  className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40"
                  onClick={toggleInfoModal}
                ></div>
                {/* Modal Content */}
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white dark:bg-[#2A2F3B] border border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-6 py-20 px-10 z-50">
                  <FiX
                    className="absolute right-2 top-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 cursor-pointer text-xl transition-colors"
                    onClick={toggleInfoModal}
                  />
                  <p className="text-gray-700 dark:text-gray-300 text-xl">
                    Hello [User Name], your project [Project Name] has been
                    successfully created. AI has automatically set up your
                    milestones and tasks. Check your dashboard for details and next
                    steps
                  </p>
                </div>
              </>
            )}
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
    </div>
  );
};

export default ProjectDetails;