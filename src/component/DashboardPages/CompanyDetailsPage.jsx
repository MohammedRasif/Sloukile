// const CompanyDetailsPage = () => {
//     return (
//       <div className="p-10 border-t border-gray-300 h-full bg-gray-50">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-[500] text-gray-800">Company Details</h1>
//           <p className="text-gray-600 mt-2">Please fill in your company information below</p>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Company Name */}
//             <div className="mt-2">
//               <label className="text-[18px] font-[400] text-gray-700">🏢 Company Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Enter company name" 
//                 className="border-[2px] border-gray-300 rounded-md py-[9px] w-full mt-2 pl-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#00308F] focus:border-transparent transition duration-200" 
//               />
//             </div>

//             {/* Company Email */}
//             <div className="mt-2">
//               <label className="text-[18px] font-[400] text-gray-700">📧 Company Email</label>
//               <input 
//                 type="email" 
//                 placeholder="Enter company email" 
//                 className="border-[2px] border-gray-300 rounded-md py-[9px] w-full mt-2 pl-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#00308F] focus:border-transparent transition duration-200" 
//               />
//             </div>

//             {/* Company Website */}
//             <div className="mt-2">
//               <label className="text-[18px] font-[400] text-gray-700">🌐 Company Website</label>
//               <input 
//                 type="url" 
//                 placeholder="Enter company website (e.g., https://example.com)" 
//                 className="border-[2px] border-gray-300 rounded-md py-[9px] w-full mt-2 pl-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#00308F] focus:border-transparent transition duration-200" 
//               />
//             </div>

//             {/* Company Phone */}
//             <div className="mt-2">
//               <label className="text-[18px] font-[400] text-gray-700">📞 Company Phone</label>
//               <input 
//                 type="tel" 
//                 placeholder="Enter company phone (e.g., +123-456-7890)" 
//                 className="border-[2px] border-gray-300 rounded-md py-[9px] w-full mt-2 pl-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#00308F] focus:border-transparent transition duration-200" 
//               />
//             </div>

//             {/* Company Type */}
//             <div className="mt-2">
//               <label className="text-[18px] font-[400] text-gray-700">🏭 Company Type</label>
//               <select 
//                 className="border-[2px] border-gray-300 rounded-md py-[9px] w-full mt-2 pl-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#00308F] focus:border-transparent transition duration-200"
//               >
//                 <option value="">Select company type</option>
//                 <option value="private">Private</option>
//                 <option value="public">Public</option>
//                 <option value="non-profit">Non-Profit</option>
//                 <option value="government">Government</option>
//               </select>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="mt-6">
//             <label className="text-[18px] font-[400] text-gray-700">📝 Company Description</label>
//             <textarea
//               name="description"
//               id="description"
//               className="border-[2px] border-gray-300 rounded-md py-[9px] w-full mt-2 pl-3 resize-y bg-white focus:outline-none focus:ring-2 focus:ring-[#00308F] focus:border-transparent transition duration-200"
//               rows="4"
//               placeholder="Enter company description..."
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="mt-8 flex justify-end">
//             <button 
//               className="bg-[#00308F] px-10 py-3 rounded-md font-[500] text-xl text-white hover:bg-[#002266] transition duration-200 shadow-md"
//             >
//               Submit Information
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   export default CompanyDetailsPage;
import { FaProjectDiagram, FaUsers, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"

const CompanyDetailsPage = () => {
  const projects = [
    { name: "Project Alpha", progress: 70, status: "In Progress", color: "orange" },
    { name: "Project Beta", progress: 75, status: "In Progress", color: "blue" },
    { name: "Project Gamma", progress: 90, status: "In Progress", color: "green" },
    { name: "Project Delta", progress: 30, status: "Alert Risk", color: "red" },
    { name: "Project Delta", progress: 30, status: "Alert Risk", color: "red" },
  ]

  const getStatusBgColor = (status, color) => {
    if (status === "Alert Risk") return "bg-red-100 text-red-600"
    if (color === "orange") return "bg-orange-100 text-orange-600"
    if (color === "blue") return "bg-blue-100 text-blue-600"
    if (color === "green") return "bg-green-100 text-green-600"
    return "bg-gray-100 text-gray-600"
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Project Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 font-semibold text-2xl">Active Project</p>
              <h2 className="text-blue-800 text-4xl font-bold mt-1">12</h2>
              <p className="text-md text-gray-500 mt-1">+2 From Last Month</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <FaProjectDiagram className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Team Members Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 font-semibold text-2xl">Team Members</p>
              <h2 className="text-blue-800 text-4xl font-bold mt-1">30</h2>
              <p className="text-md text-gray-500 mt-1">+4 From Last Month</p>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <FaUsers className="text-indigo-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 font-semibold text-2xl">Completed</p>
              <h2 className="text-blue-800 text-4xl font-bold mt-1">12</h2>
              <p className="text-md text-gray-500 mt-1">+2 From Last Month</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <FaCheckCircle className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Risk Score Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 font-semibold text-2xl">Risk Score</p>
              <h2 className="text-red-500 text-4xl font-bold mt-1">Low</h2>
              <p className="text-md text-gray-500 mt-1">2 Projects Need Attention</p>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <FaExclamationTriangle className="text-red-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Status Chart */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Project Status</h3>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-md font-medium text-gray-700">{project.name}</span>
                <span
                  className={`text-sm font-medium ${
                    project.color === "red"
                      ? "text-red-500"
                      : project.color === "green"
                        ? "text-green-500"
                        : project.color === "orange"
                          ? "text-orange-500"
                          : "text-blue-500"
                  }`}
                >
                  {project.progress}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
                <div
                  className={`h-2.5 rounded-full ${
                    project.color === "red"
                      ? "bg-red-500"
                      : project.color === "green"
                        ? "bg-green-500"
                        : project.color === "orange"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>

                {/* Status Badge */}
                <div
                  className="absolute top-[-30px]"
                  style={{
                    left: `${project.status === "Alert Risk" ? 30 : project.progress}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <span
                    className={`text-xs px-3 py-1  rounded-full ${
                      project.status === "Alert Risk"
                        ? "bg-red-500 text-white"
                        : project.color === "green"
                          ? "bg-green-500 text-white"
                          : project.color === "orange"
                            ? "bg-orange-400 text-white"
                            : "bg-blue-600 text-white"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompanyDetailsPage
