"use client";
import { useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const ProjectEdit = () => {
  const [tableData, setTableData] = useState([
    {
      name: "Pappu",
      kpi: "300",
      stageName: "Foundation",
      materialName: "Cloud Hosting",
      materialCost: "$1500",
    },
    {
      name: "Ramisa",
      kpi: "300",
      stageName: "Feature Development",
      materialName: "Domain & SSL",
      materialCost: "$100",
    },
    {
      name: "Bijoy",
      kpi: "300",
      stageName: "Testing And Refinement",
      materialName: "Payment Gateway Fees",
      materialCost: "$500",
    },
    {
      name: "Sajib",
      kpi: "300",
      stageName: "Deployment And Launch",
      materialName: "Other Expenses",
      materialCost: "$20",
    },
  ]);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const infoRef = useRef(null);

  const toggleInfoModal = () => {
    setShowInfoModal((prev) => !prev);
  };

  const [projectBudget, setProjectBudget] = useState("1500$");

  const handleDataChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  return (
    <div className="border-t border-gray-300 dark:border-gray-700  text-gray-800 dark:text-gray-200">
      <div className="p-6 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-[500] text-gray-800 dark:text-gray-100">
            Website Redesign
          </h1>
          <div className="flex gap-2">
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
                      milestones and tasks. Check your dashboard for details and
                      next steps
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
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        handleDataChange(rowIndex, "name", e.target.value)
                      }
                      className="bg-transparent w-full focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                    <input
                      type="text"
                      value={row.kpi}
                      onChange={(e) =>
                        handleDataChange(rowIndex, "kpi", e.target.value)
                      }
                      className="bg-transparent w-full focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter multiple KPI values"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                    <input
                      type="text"
                      value={row.stageName}
                      onChange={(e) =>
                        handleDataChange(rowIndex, "stageName", e.target.value)
                      }
                      className="bg-transparent w-full focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                    <input
                      type="text"
                      value={row.materialName}
                      onChange={(e) =>
                        handleDataChange(rowIndex, "materialName", e.target.value)
                      }
                      className="bg-transparent w-full focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
                    <input
                      type="text"
                      value={row.materialCost}
                      onChange={(e) =>
                        handleDataChange(rowIndex, "materialCost", e.target.value)
                      }
                      className="bg-transparent w-full focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </td>
                  {rowIndex === 0 && (
                    <td
                      className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E] text-[#00308F] dark:text-[#4A6CF7]"
                      rowSpan={tableData.length}
                    >
                      <div className="flex justify-center items-center h-full">
                        <input
                          type="text"
                          value={projectBudget}
                          onChange={(e) => setProjectBudget(e.target.value)}
                          className="text-3xl font-bold text-center bg-transparent focus:outline-none text-[#00308F] dark:text-[#4A6CF7]"
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 space-x-5">
          <button className="border-2 border-gray-400 dark:border-gray-600 text-white rounded-sm px-10 py-2 font-[500] bg-[#00308F] dark:bg-[#4A6CF7] hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] cursor-pointer transition-colors">
            Save
          </button>
          <NavLink to="/dashboard/ProjectDetails">
            <button className="border-2 border-[#00308F] dark:border-[#4A6CF7] hover:bg-gray-100 dark:hover:bg-[#353A47] text-[#00308F] dark:text-[#4A6CF7] rounded-sm px-10 py-2 font-[500] cursor-pointer transition-colors">
              Cancel
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;