import { FaProjectDiagram, FaUsers, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const CompanyDetailsPage = () => {
  const projects = [
    { name: "Project Alpha", progress: 70, status: "In Progress", color: "orange" },
    { name: "Project Beta", progress: 75, status: "In Progress", color: "blue" },
    { name: "Project Gamma", progress: 90, status: "In Progress", color: "green" },
    { name: "Project Delta", progress: 30, status: "Alert Risk", color: "red" },
    { name: "Project Delta", progress: 30, status: "Alert Risk", color: "red" },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Project Card */}
        <div className="bg-white dark:bg-[#1E232E] dark:border-gray-700 p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-semibold text-2xl">Active Project</p>
              <h2 className="text-blue-800 dark:text-blue-400 text-4xl font-bold mt-1">12</h2>
              <p className="text-md text-gray-500 dark:text-gray-300 mt-1">+2 From Last Month</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <FaProjectDiagram className="text-blue-600 dark:text-blue-300 text-xl" />
            </div>
          </div>
        </div>

        {/* Team Members Card */}
        <div className="bg-white dark:bg-[#1E232E] dark:border-gray-700 p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-semibold text-2xl">Team Members</p>
              <h2 className="text-blue-800 dark:text-blue-400 text-4xl font-bold mt-1">30</h2>
              <p className="text-md text-gray-500 dark:text-gray-300 mt-1">+4 From Last Month</p>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
              <FaUsers className="text-indigo-600 dark:text-indigo-300 text-xl" />
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white dark:bg-[#1E232E] dark:border-gray-700 p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-semibold text-2xl">Completed</p>
              <h2 className="text-blue-800 dark:text-blue-400 text-4xl font-bold mt-1">12</h2>
              <p className="text-md text-gray-500 dark:text-gray-300 mt-1">+2 From Last Month</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <FaCheckCircle className="text-blue-600 dark:text-blue-300 text-xl" />
            </div>
          </div>
        </div>

        {/* Risk Score Card */}
        <div className="bg-white dark:bg-[#1E232E] dark:border-gray-700 p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-700 dark:text-gray-100 font-semibold text-2xl">Risk Score</p>
              <h2 className="text-red-500 dark:text-red-400 text-4xl font-bold mt-1">Low</h2>
              <p className="text-md text-gray-500 dark:text-gray-300 mt-1">2 Projects Need Attention</p>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
              <FaExclamationTriangle className="text-red-500 dark:text-red-300 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Status Chart */}
      <div className="mt-6 bg-white dark:bg-[#1E232E] dark:border-gray-700 p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Project Status</h3>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-md font-medium text-gray-700 dark:text-gray-100">{project.name}</span>
                <span
                  className={`text-sm font-medium ${
                    project.color === "red"
                      ? "text-red-500 dark:text-red-400"
                      : project.color === "green"
                      ? "text-green-500 dark:text-green-400"
                      : project.color === "orange"
                      ? "text-orange-500 dark:text-orange-400"
                      : "text-blue-500 dark:text-blue-400"
                  }`}
                >
                  {project.progress}%
                </span>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 relative">
                <div
                  className={`h-2.5 rounded-full ${
                    project.color === "red"
                      ? "bg-red-500 dark:bg-red-400"
                      : project.color === "green"
                      ? "bg-green-500 dark:bg-green-400"
                      : project.color === "orange"
                      ? "bg-orange-500 dark:bg-orange-400"
                      : "bg-blue-500 dark:bg-blue-400"
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
                    className={`text-xs px-3 py-1 rounded-full ${
                      project.status === "Alert Risk"
                        ? "bg-red-500 dark:bg-red-400 text-white dark:text-gray-900"
                        : project.color === "green"
                        ? "bg-green-500 dark:bg-green-400 text-white dark:text-gray-900"
                        : project.color === "orange"
                        ? "bg-orange-400 dark:bg-orange-300 text-white dark:text-gray-900"
                        : "bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-900"
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
  );
};

export default CompanyDetailsPage;