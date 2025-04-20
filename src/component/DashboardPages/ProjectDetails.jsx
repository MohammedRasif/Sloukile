// import React, { useState, useRef, useEffect } from "react";
// import { FaEdit, FaInfoCircle } from "react-icons/fa";
// import { FiX } from "react-icons/fi";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { NavLink } from "react-router-dom";

// const ProjectDetails = () => {
//   const tableData = [
//     {
//       name: "Pappu",
//       kpi: 300,
//       stageName: "Foundation",
//       materialName: "Cloud Hosting",
//       materialCost: "$1500",
//     },
//     {
//       name: "Ramisa",
//       kpi: 300,
//       stageName: "Feature Development",
//       materialName: "Domain & SSL",
//       materialCost: "$100",
//     },
//     {
//       name: "Bijoy",
//       kpi: 300,
//       stageName: "Testing And Refinement",
//       materialName: "Payment Gateway Fees",
//       materialCost: "$500",
//     },
//     {
//       name: "Sajib",
//       kpi: 300,
//       stageName: "Deployment And Launch",
//       materialName: "Other Expenses",
//       materialCost: "$20",
//     },
//   ];

//   const projectBudget = "$1500";

//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const infoRef = useRef(null);

//   const toggleInfoModal = () => {
//     setShowInfoModal((prev) => !prev);
//   };

//   const closeInfoModal = () => {
//     setShowInfoModal(false); // Explicitly close the modal
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (infoRef.current && !infoRef.current.contains(event.target)) {
//         setShowInfoModal(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="p-6 mx-auto border-t border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-2">
//           <NavLink to="/dashboard/Project">
//             <MdOutlineKeyboardBackspace className="text-4xl mt-1 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#00308F] dark:hover:text-[#4A6CF7] transition-colors" />
//           </NavLink>
//           <h1 className="text-3xl font-[500] text-gray-800 dark:text-gray-100">
//             Website Redesign
//           </h1>
//         </div>
//         <div className="flex gap-2">
//           <NavLink to="/dashboard/ProjectEdit">
//             <button className="text-[30px] mt-2 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#00308F] dark:hover:text-[#4A6CF7] transition-colors">
//               <FaEdit />
//             </button>
//           </NavLink>
//           <div ref={infoRef} className="relative">
//             <button
//               className="text-[30px] text-[#00308F] dark:text-[#4A6CF7] cursor-pointer mt-2 hover:text-[#002266] dark:hover:text-[#3B5AEB] transition-colors"
//               onClick={toggleInfoModal}
//             >
//               <FaInfoCircle />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="relative overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
//                 Name
//               </th>
//               <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
//                 Kpi
//               </th>
//               <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
//                 Stage Name
//               </th>
//               <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
//                 Material/Tools Name
//               </th>
//               <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
//                 Material/Tools Cost
//               </th>
//               <th className="p-3 text-left bg-[#f5efe8af] dark:bg-[#2A2F3B] text-black dark:text-gray-200 border border-gray-300 dark:border-gray-700">
//                 Project Budget
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, index) => (
//               <tr key={index}>
//                 <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
//                   {row.name}
//                 </td>
//                 <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
//                   {row.kpi}
//                 </td>
//                 <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
//                   {row.stageName}
//                 </td>
//                 <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
//                   {row.materialName}
//                 </td>
//                 <td className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]">
//                   {row.materialCost}
//                 </td>
//                 {index === 0 && (
//                   <td
//                     className="p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E232E]"
//                     rowSpan={tableData.length}
//                   >
//                     <div className="flex justify-center text-[#00308F] dark:text-[#4A6CF7] items-center h-full">
//                       <span className="text-3xl font-bold">{projectBudget}</span>
//                     </div>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Backdrop */}
//       {showInfoModal && (
//         <div
//           className="fixed inset-0 backdrop-blur-[3px]  z-50"
//           onClick={closeInfoModal} // Close when clicking backdrop
//         />
//       )}

//       {/* Modal Content */}
//       {showInfoModal && (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white dark:bg-[#2A2F3B] border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl p-8 z-50 transition-all duration-300 animate-fade-in">
//         <button
//           className="absolute right-4 top-4 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer"
//           onClick={closeInfoModal}
//         >
//           <FiX className="text-xl" />
//         </button>
//         <p className="text-gray-700 dark:text-gray-200 text-lg font-serif leading-relaxed tracking-wide">
//           Hello [User Name], your project [Project Name] has been successfully created. AI has automatically set up your milestones and tasks. Check your dashboard for details and next steps.
//         </p>
//       </div>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;







import React, { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useDarkMode } from '../../context/ThemeContext';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('Tasks');
  const { darkMode } = useDarkMode();

  const tabs = ['Tasks', 'Team', 'Risks', 'Budget', 'AI Insights'];

  // Sample tasks data
  const tasks = [
    { id: 1, name: 'User Research', assignee: 'Jane Doe', phase: 'Research & Planning', dueDate: '2025-02-01', status: 'Completed' },
    { id: 2, name: 'Wireframes', assignee: 'Jane Doe', phase: 'Design', dueDate: '2025-02-15', status: 'Completed' },
    { id: 3, name: 'UI Design', assignee: 'Jane Doe', phase: 'Design', dueDate: '2025-03-15', status: 'In Progress' },
    { id: 4, name: 'Frontend Development', assignee: 'John Smith', phase: 'Development', dueDate: '2025-04-30', status: 'In Progress' },
  ];

  // Sample team data
  const team = [
    { id: 1, name: 'Jane Doe', role: 'UX Designer', email: 'jane@example.com' },
    { id: 2, name: 'John Smith', role: 'Frontend Developer', email: 'john@example.com' },
    { id: 3, name: 'Sarah Johnson', role: 'Project Manager', email: 'sarah@example.com' },
    { id: 4, name: 'Mike Wilson', role: 'Backend Developer', email: 'mike@example.com' },
  ];

  // Sample risks data
  const risks = [
    { id: 1, description: 'Delayed API integration', impact: 'High', mitigation: 'Early coordination with backend team' },
    { id: 2, description: 'Resource constraints', impact: 'Medium', mitigation: 'Prioritize critical features' },
    { id: 3, description: 'Scope creep', impact: 'High', mitigation: 'Strict change management process' },
  ];

  // Sample budget data
  const budget = {
    total: 120000,
    spent: 45000,
    remaining: 75000,
    categories: [
      { name: 'Design', allocated: 40000, spent: 20000 },
      { name: 'Development', allocated: 60000, spent: 15000 },
      { name: 'Testing', allocated: 20000, spent: 10000 },
    ],
  };

  // Sample AI insights data
  const aiInsights = [
    {
      title: 'Schedule Optimization',
      description: 'Based on current progress, consider allocating more resources to UI Design to meet the deadline.',
    },
    {
      title: 'Budget Efficiency',
      description: 'Your team is currently under budget by 12%. Consider reallocating funds to accelerate development.',
    },
    {
      title: 'Risk Alert',
      description: 'Similar projects typically face integration challenges at this stage. Consider scheduling a technical review.',
    },
  ];

  return (
    <div className={`min-h-screen roboto ${darkMode ? 'dark bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto">
        {/* Project Header */}
        <div className="flex items-center space-x-2 py-5">
          <NavLink to="/dashboard/Project">
            <MdOutlineKeyboardBackspace className="text-4xl mt-1 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#00308F] dark:hover:text-[#4A6CF7] transition-colors" />
          </NavLink>
          <h1 className="text-3xl font-[500] text-gray-800 dark:text-gray-100">
            Website Redesign
          </h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`cursor-pointer px-6 py-4 text-md font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-black dark:border-gray-100 text-black dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-[#1E232E]">
          {activeTab === 'Tasks' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tasks</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">All tasks for this project</p>
                </div>
                <button className="bg-black dark:bg-gray-700 text-white dark:text-gray-100 px-4 py-2 rounded-md flex items-center text-sm">
                  <Plus size={16} className="mr-1" /> Add Task
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Task Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Assignee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Phase</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.name}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.assignee}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.phase}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.dueDate}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              task.status === 'Completed'
                                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-gray-500 dark:text-gray-300">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Team' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Team Members</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the team section. It shows all team members assigned to this project.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 bg-white dark:bg-[#1E232E] shadow-sm border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-800 dark:text-gray-100">{member.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{member.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Risks' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Project Risks</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the risks section. It identifies potential risks and mitigation strategies.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Risk Description</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Impact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((risk) => (
                      <tr key={risk.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{risk.description}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              risk.impact === 'High'
                                ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                            }`}
                          >
                            {risk.impact}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{risk.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Budget' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Project Budget</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">This is the budget section. It shows budget allocation and spending.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-[#1E232E] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-300">Total Budget</p>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">${budget.total.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-[#1E232E] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-300">Spent</p>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">${budget.spent.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-[#1E232E] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-300">Remaining</p>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">${budget.remaining.toLocaleString()}</p>
                </div>
              </div>
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-3">Budget Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Allocated</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Spent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.categories.map((category, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{category.name}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">${category.allocated.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">${category.spent.toLocaleString()}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">${(category.allocated - category.spent).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'AI Insights' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">AI Insights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the AI insights section. It provides AI-generated recommendations and analysis for your project.
              </p>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      index === 0
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700'
                        : index === 1
                        ? 'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700'
                        : 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700'
                    }`}
                  >
                    <h3
                      className={`font-medium mb-2 ${
                        index === 0
                          ? 'text-blue-800 dark:text-blue-400'
                          : index === 1
                          ? 'text-green-800 dark:text-green-400'
                          : 'text-yellow-800 dark:text-yellow-400'
                      }`}
                    >
                      {insight.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        index === 0
                          ? 'text-blue-700 dark:text-blue-400'
                          : index === 1
                          ? 'text-green-700 dark:text-green-400'
                          : 'text-yellow-700 dark:text-yellow-400'
                      }`}
                    >
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;