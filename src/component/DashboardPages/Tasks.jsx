const Tasks = () => {
    const tasks = [
      {
        name: "Backend API Development",
        description: "Develop RESTful APIs for the application",
        status: "In Progress",
        priority: "High",
        dueDate: "7/15/2025",
        assignee: "Siam",
        progress: 60,
      },
      {
        name: "Frontend UI Implementation",
        description: "Implement user interface components",
        status: "In Progress",
        priority: "Medium",
        dueDate: "7/20/2025",
        assignee: "Rasif",
        progress: 40,
      },
      {
        name: "UI/UX Design",
        description: "Create UI/UX design for the application",
        status: "Completed",
        priority: "High",
        dueDate: "7/1/2025",
        assignee: "Sajib",
        progress: 100,
      },
      {
        name: "AI Integration",
        description: "Integrate AI features into the application",
        status: "Not Started",
        priority: "Medium",
        dueDate: "8/1/2025",
        assignee: "Ramisa",
        progress: 0,
      },
      {
        name: "Testing and QA",
        description: "Perform testing and quality assurance",
        status: "Not Started",
        priority: "High",
        dueDate: "8/10/2025",
        assignee: "Siam",
        progress: 0,
      },
    ];
  
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">
              Tasks & Milestones 📋
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[15px]">
              Manage project tasks and track progress
            </p>
          </div>
        </div>
  
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search tasks... 🔍"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
  
          <div className="flex items-center">
            <div className="relative w-40 mr-2">
              <select
                className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md appearance-none bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
              >
                <option>All Statuses</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Not Started</option>
              </select>
              <div className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
  
            <button
              className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white px-3 py-2 rounded-md text-[15px] font-medium hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Task ➕
            </button>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1E232E] divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <button
                        className="mr-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100 text-[16px]">
                          {task.name}
                        </div>
                        <div className="text-[15px] text-gray-500 dark:text-gray-400">
                          {task.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          task.status === "Completed"
                            ? "bg-green-500"
                            : task.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                      ></span>
                      <span className="text-[15px]">{task.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 text-[15px] rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300"
                          : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[15px] text-gray-500 dark:text-gray-400">
                    {task.dueDate}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[14px] font-medium mr-2">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="text-[15px]">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                      <div
                        className="bg-gray-800 dark:bg-[#4A6CF7] h-1.5 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-[14px] text-gray-500 dark:text-gray-400">
                      {task.progress}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Tasks;