// "use client"

// import { useState } from "react"

// const Planning = () => {
//   const [activeTab, setActiveTab] = useState("projectCharter")

//   const tabs = [
//     { id: "projectCharter", label: "Project Charter" },
//     { id: "governanceSetup", label: "Governance Setup" },
//     { id: "stakeholders", label: "Stakeholders" },
//     { id: "objectives", label: "Objectives" },
//   ]

//   return (
//     <div className="mx-auto p-6 text-black dark:text-gray-200 roboto">
//       <h1 className="text-3xl font-bold text-black dark:text-gray-100 mb-6">
//         Project Planning & Governance 
//       </h1>

//       {/* Navigation Tabs */}
//       <div className="flex bg-gray-100 dark:bg-[#1E232E]  rounded-lg p-1 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
//               activeTab === tab.id
//                 ? "bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-100 shadow-sm"
//                 : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//             }`}
//             onClick={() => setActiveTab(tab.id)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Content Area */}
//       <div className="bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-6">
//         {activeTab === "projectCharter" && <ProjectCharter />}
//         {activeTab === "governanceSetup" && <GovernanceSetup />}
//         {activeTab === "stakeholders" && <Stakeholders />}
//         {activeTab === "objectives" && <Objectives />}
//       </div>
//     </div>
//   )
// }

// const ProjectCharter = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Project Charter </h2>
//       <p className="text-gray-500 dark:text-gray-400 mb-6">
//         Define project objectives, stakeholders, and governance model
//       </p>

//       <div className="grid grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Project Name
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//             placeholder="Taskify"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Project Type
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//             placeholder="Task Management Application"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             Start Date 📅
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md pl-8 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//               placeholder="June 1st, 2025"
//             />
//             <span className="absolute left-2 top-2.5 text-gray-500 dark:text-gray-400">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//                 <line x1="16" x2="16" y1="2" y2="6" />
//                 <line x1="8" x2="8" y1="2" y2="6" />
//                 <line x1="3" x2="21" y1="10" y2="10" />
//               </svg>
//             </span>
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//             End Date 📅
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md pl-8 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//               placeholder="August 30th, 2025"
//             />
//             <span className="absolute left-2 top-2.5 text-gray-500 dark:text-gray-400">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//                 <line x1="16" x2="16" y1="2" y2="6" />
//                 <line x1="8" x2="8" y1="2" y2="6" />
//                 <line x1="3" x2="21" y1="10" y2="10" />
//               </svg>
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Objectives and Goals 
//         </label>
//         <textarea
//           className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//           placeholder="To create a user-friendly and efficient task management application that enhances productivity and organization for users."
//         ></textarea>
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Key Stakeholders 
//         </label>
//         <textarea
//           className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//           placeholder="Project Manager, Development Team, Quality Assurance Team, End Users"
//         ></textarea>
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Governance Model 
//         </label>
//         <textarea
//           className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//           placeholder="Decision-making will be made collectively by the project manager and team members in regular sprint planning and review meetings. SteerCo setup will involve bi-weekly progress review meetings with key stakeholders."
//         ></textarea>
//       </div>

//       <div className="flex justify-end gap-4">
//         <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-[#2A2F3B] hover:bg-gray-100 dark:hover:bg-[#353A47]">
//           Reset 🔄
//         </button>
//         <button className="px-4 py-2 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md hover:bg-gray-700 dark:hover:bg-[#3B5AEB]">
//           Save Project Charter 
//         </button>
//       </div>
//     </div>
//   )
// }

// const GovernanceSetup = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Governance Setup </h2>
//       <p className="text-gray-500 dark:text-gray-400 mb-6">
//         Define project governance structure and decision-making processes
//       </p>

//       <div className="mb-6">
//         <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Decision Making Process 
//         </h3>
//         <textarea
//           className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//           placeholder="Decision-making will be made collectively by the project manager and team members in regular sprint planning and review meetings. Critical decisions will be escalated to the SteerCo for approval."
//         ></textarea>
//       </div>

//       <div className="mb-6">
//         <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Governance Meetings 
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b border-gray-200 dark:border-gray-600">
//                 <th className="text-left py-2 text-gray-700 dark:text-gray-300">Meeting</th>
//                 <th className="text-left py-2 text-gray-700 dark:text-gray-300">Frequency</th>
//                 <th className="text-left py-2 text-gray-700 dark:text-gray-300">Participants</th>
//                 <th className="text-left py-2 text-gray-700 dark:text-gray-300">Purpose</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b border-gray-200 dark:border-gray-600">
//                 <td className="py-3 text-gray-800 dark:text-gray-200">Sprint Planning</td>
//                 <td className="text-gray-800 dark:text-gray-200">Weekly</td>
//                 <td className="text-gray-800 dark:text-gray-200">Project Manager, Development Team</td>
//                 <td className="text-gray-800 dark:text-gray-200">Plan work for upcoming sprint</td>
//               </tr>
//               <tr className="border-b border-gray-200 dark:border-gray-600">
//                 <td className="py-3 text-gray-800 dark:text-gray-200">SteerCo Review</td>
//                 <td className="text-gray-800 dark:text-gray-200">Bi-weekly</td>
//                 <td className="text-gray-800 dark:text-gray-200">Project Manager, Key Stakeholders</td>
//                 <td className="text-gray-800 dark:text-gray-200">Review project progress and address issues</td>
//               </tr>
//               <tr className="border-b border-gray-200 dark:border-gray-600">
//                 <td className="py-3 text-gray-800 dark:text-gray-200">Daily Standup</td>
//                 <td className="text-gray-800 dark:text-gray-200">Daily</td>
//                 <td className="text-gray-800 dark:text-gray-200">Development Team</td>
//                 <td className="text-gray-800 dark:text-gray-200">Share progress and identify blockers</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4 mb-6">
//         <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
//           Add New Governance Meeting ➕
//         </h3>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Meeting Name
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Frequency
//             </label>
//             <select
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//             >
//               <option>Select frequency</option>
//               <option>Daily</option>
//               <option>Weekly</option>
//               <option>Bi-weekly</option>
//               <option>Monthly</option>
//             </select>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Participants
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Purpose
//             </label>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//             />
//           </div>
//         </div>
//         <button className="px-4 py-2 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md hover:bg-gray-700 dark:hover:bg-[#3B5AEB]">
//           Add Meeting ➕
//         </button>
//       </div>
//     </div>
//   )
// }

// const Stakeholders = () => {
//   return (
    
//   )
// }

// const Objectives = () => {
//   return (
   
//   )
// }

// export default Planning