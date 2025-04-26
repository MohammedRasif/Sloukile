import { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      name: "Backend API Development",
      description: "Develop RESTful APIs for the application",
      status: "In Progress",
      priority: "High",
      dueDate: "7/15/2025",
      assignee: "Siam",
      progress: 60,
      raci: {
        Responsible: "Siam",
        Accountable: "Siam",
        Consulted: ["Rasif"],
        Informed: ["Sajib", "Ramisa"],
      },
      subtasks: [
        { id: 1, title: "Design API schema", completed: true },
        { id: 2, title: "Implement endpoints", completed: true },
        { id: 3, title: "Test APIs", completed: false },
        { id: 4, title: "Deploy to staging", completed: false },
      ],
    },
    {
      name: "Frontend UI Implementation",
      description: "Implement user interface components",
      status: "In Progress",
      priority: "Medium",
      dueDate: "7/20/2025",
      assignee: "Rasif",
      progress: 40,
      raci: {
        Responsible: "Rasif",
        Accountable: "Rasif",
        Consulted: ["Siam", "Sajib"],
        Informed: ["Ramisa"],
      },
      subtasks: [
        { id: 1, title: "Set up React components", completed: true },
        { id: 2, title: "Style components", completed: false },
        { id: 3, title: "Integrate with API", completed: false },
      ],
    },
    {
      name: "UI/UX Design",
      description: "Create UI/UX design for the application",
      status: "Completed",
      priority: "High",
      dueDate: "7/1/2025",
      assignee: "Sajib",
      progress: 100,
      raci: {
        Responsible: "Sajib",
        Accountable: "Sajib",
        Consulted: ["Rasif"],
        Informed: ["Siam", "Ramisa"],
      },
      subtasks: [
        { id: 1, title: "Wireframe design", completed: true },
        { id: 2, title: "Prototype creation", completed: true },
        { id: 3, title: "User testing", completed: true },
      ],
    },
    {
      name: "AI Integration",
      description: "Integrate AI features into the application",
      status: "Not Started",
      priority: "Medium",
      dueDate: "8/1/2025",
      assignee: "Ramisa",
      progress: 0,
      raci: {
        Responsible: "Ramisa",
        Accountable: "Ramisa",
        Consulted: ["Siam"],
        Informed: ["Rasif", "Sajib"],
      },
      subtasks: [
        { id: 1, title: "Research AI models", completed: false },
        { id: 2, title: "Integrate model", completed: false },
        { id: 3, title: "Test AI features", completed: false },
        { id: 4, title: "Optimize performance", completed: false },
      ],
    },
    {
      name: "Testing and QA",
      description: "Perform testing and quality assurance",
      status: "Not Started",
      priority: "High",
      dueDate: "8/10/2025",
      assignee: "Siam",
      progress: 0,
      raci: {
        Responsible: "Siam",
        Accountable: "Siam",
        Consulted: ["Rasif", "Ramisa"],
        Informed: ["Sajib"],
      },
      subtasks: [
        { id: 1, title: "Write test cases", completed: false },
        { id: 2, title: "Perform unit tests", completed: false },
        { id: 3, title: "Conduct QA", completed: false },
      ],
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [openSubtasksIndex, setOpenSubtasksIndex] = useState(null);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleMenuToggle = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleSubtasksToggle = (index) => {
    setOpenSubtasksIndex(openSubtasksIndex === index ? null : index);
  };

  const handleConfirmTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index
          ? {
              ...task,
              status: "Completed",
              progress: 100,
              subtasks: task.subtasks.map((subtask) => ({
                ...subtask,
                completed: true,
              })),
            }
          : task
      )
    );
    setOpenMenuIndex(null);
  };

  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
  };

  const handleConfirmSubtask = (taskIndex, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i !== taskIndex) return task;
        const updatedSubtasks = task.subtasks.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, completed: true } : subtask
        );
        const completedCount = updatedSubtasks.filter((subtask) => subtask.completed).length;
        const progress = Math.round((completedCount / updatedSubtasks.length) * 100);
        const status =
          progress === 100
            ? "Completed"
            : task.status === "Not Started" && progress > 0
            ? "In Progress"
            : task.status;
        return {
          ...task,
          subtasks: updatedSubtasks,
          progress,
          status,
        };
      })
    );
  };

  // Filter tasks based on the selected status
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "All Statuses") return true;
    return task.status === statusFilter;
  });

  // Get status color based on task status (for task table)
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      case "Not Started":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  // Define the static RACI chart grid (4 rows x 5 columns) based on the image
  const raciGrid = [
    ["A", "R", "C", "I", "A"],
    ["A", "R", "C", "R", "A"],
    ["C", "R", "C", "A", "A"],
    ["A", "A", "I", "I", "C"],
    // ["A", "R", "I", "R", "C"], // Removed the last row to match 4x5 grid
  ];

  // Function to get color based on RACI role (for static RACI chart)
  const getRaciColor = (role) => {
    switch (role) {
      case "A":
      case "R":
        return "bg-blue-500"; // In Progress
      case "C":
        return "bg-orange-500"; // Not Started
      case "I":
        return "bg-pink-500"; // Completed
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-10 px-4 sm:px-6 ">
      <div className="container mx-auto">
        {/* Header Section */}
       

        {/* Task Table */}
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
              {filteredTasks.map((task, index) => (
                <tr key={index}>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleSubtasksToggle(index)}
                          className="mr-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 cursor-pointer"
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
                            className={`transform transition-transform ${
                              openSubtasksIndex === index ? "rotate-90" : ""
                            }`}
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
                      {openSubtasksIndex === index && (
                        <div className="mt-2 ml-8">
                          {task.subtasks.map((subtask) => (
                            <div
                              key={subtask.id}
                              className="flex items-center justify-between py-1"
                            >
                              <span
                                className={`text-[14px] ${
                                  subtask.completed
                                    ? "text-gray-500 dark:text-gray-400 line-through"
                                    : "text-gray-800 dark:text-gray-200"
                                }`}
                              >
                                {subtask.title}
                              </span>
                              {!subtask.completed && (
                                <button
                                  onClick={() =>
                                    handleConfirmSubtask(index, subtask.id)
                                  }
                                  className="text-[12px] bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                                >
                                  Confirm
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                          task.status
                        )}`}
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
                  <td className="px-4 py-4 text-right relative">
                    <button
                      onClick={() => handleMenuToggle(index)}
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
                    {openMenuIndex === index && (
                      <div className="absolute right-4 top-16 z-10 bg-white dark:bg-[#2A2F3B] border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
                        <button
                          onClick={() => handleConfirmTask(index)}
                          className="block w-full text-left px-4 py-2 text-[14px] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#353A47] cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleDeleteTask(index)}
                          className="block w-full text-left px-4 py-2 text-[14px] text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[#353A47] cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
};

export default Tasks;