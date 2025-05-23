
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Check, Search } from "lucide-react";
import { MdVerified } from "react-icons/md";

const TaskList = () => {
  // Updated tasks with subtasks
  const initialTasks = [
    {
      id: "Foundation",
      title: "Foundation",
      deadline: "2.10.2025",
      description:
        "Establish Project Infrastructure. Design The Core Architecture, And Develop The Basic UI/UX Framework.",
      subtasks: [
        { id: "subtask1", title: "Set up project infrastructure", completed: false },
        { id: "subtask2", title: "Design core architecture", completed: false },
        { id: "subtask3", title: "Develop basic UI/UX framework", completed: false },
      ],
    },
    {
      id: "UserRegistration",
      title: "User Registration And Login",
      deadline: "2.10.2025",
      description: "Implement user authentication system",
      subtasks: [
        { id: "subtask1", title: "Design login UI", completed: false },
        { id: "subtask2", title: "Implement authentication logic", completed: false },
        { id: "subtask3", title: "Test authentication flow", completed: false },
      ],
    },
    {
      id: "UserProfile",
      title: "User Profile Management",
      deadline: "2.10.2025",
      description: "Create user profile management system",
      subtasks: [
        { id: "subtask1", title: "Design profile UI", completed: false },
        { id: "subtask2", title: "Implement profile CRUD operations", completed: false },
        { id: "subtask3", title: "Test profile functionality", completed: false },
      ],
    },
    {
      id: "PaymentGateway",
      title: "Secure Payment Gateway Integration",
      deadline: "2.10.2025",
      description: "Integrate payment processing system",
      subtasks: [
        { id: "subtask1", title: "Select payment gateway", completed: false },
        { id: "subtask2", title: "Integrate payment API", completed: false },
        { id: "subtask3", title: "Test payment transactions", completed: false },
        { id: "subtask4", title: "Ensure security compliance", completed: false },
      ],
    },
    {
      id: "ProductReviews",
      title: "Product Reviews And Ratings",
      deadline: "2.10.2025",
      description: "Implement product review system",
      subtasks: [
        { id: "subtask1", title: "Design review UI", completed: false },
        { id: "subtask2", title: "Implement review submission", completed: false },
        { id: "subtask3", title: "Add rating functionality", completed: false },
      ],
    },
    {
      id: "SearchFunc",
      title: "Search Functionality",
      deadline: "2.10.2025",
      description: "Develop search and filter system",
      subtasks: [
        { id: "subtask1", title: "Design search UI", completed: false },
        { id: "subtask2", title: "Implement search logic", completed: false },
        { id: "subtask3", title: "Add filter options", completed: false },
      ],
    },
  ];

  const [expandedTask, setExpandedTask] = useState("Foundation");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState(null); // Track subtask for confirmation
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track task for subtask confirmation
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [completedTasksList, setCompletedTasksList] = useState([
    "Responsive Design For Various Devices",
  ]);
  const [filteredCompletedTasks, setFilteredCompletedTasks] = useState(completedTasksList);
  const [taskCompletionStatus, setTaskCompletionStatus] = useState(
    initialTasks.reduce((acc, task) => {
      acc[task.id] = task.subtasks.map((subtask) => ({ ...subtask }));
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTasks(initialTasks);
      setFilteredCompletedTasks(completedTasksList);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = initialTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
    );
    setFilteredTasks(filtered);

    const filteredCompleted = completedTasksList.filter((task) =>
      task.toLowerCase().includes(searchLower)
    );
    setFilteredCompletedTasks(filteredCompleted);

    if (filtered.length > 0 && searchTerm.trim()) {
      setExpandedTask(filtered[0].id);
    }
  }, [searchTerm, completedTasksList]);

  const handleSubtaskConfirmClick = (taskId, subtaskId) => {
    setSelectedTaskId(taskId);
    setSelectedSubtask(subtaskId);
    setShowConfirmModal(true);
  };

  const handleIconClick = (e, taskId) => {
    e.stopPropagation();
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleConfirm = () => {
    if (selectedTaskId && selectedSubtask) {
      // Update subtask completion status
      setTaskCompletionStatus((prev) => {
        const updatedTaskSubtasks = prev[selectedTaskId].map((subtask) =>
          subtask.id === selectedSubtask ? { ...subtask, completed: true } : subtask
        );
        const updatedStatus = {
          ...prev,
          [selectedTaskId]: updatedTaskSubtasks,
        };

        // Check if all subtasks are completed
        const allSubtasksCompleted = updatedTaskSubtasks.every((subtask) => subtask.completed);
        if (allSubtasksCompleted) {
          const task = initialTasks.find((t) => t.id === selectedTaskId);
          if (task && !completedTasksList.includes(task.title)) {
            const updatedCompletedTasks = [...completedTasksList, task.title];
            setCompletedTasksList(updatedCompletedTasks);
            setFilteredTasks((prevTasks) => prevTasks.filter((t) => t.id !== selectedTaskId));
            if (searchTerm.trim()) {
              const searchLower = searchTerm.toLowerCase();
              setFilteredCompletedTasks(
                updatedCompletedTasks.filter((task) => task.toLowerCase().includes(searchLower))
              );
            } else {
              setFilteredCompletedTasks(updatedCompletedTasks);
            }
            setExpandedTask(null); // Collapse the task since it's moved
          }
        }

        return updatedStatus;
      });
    }
    setShowConfirmModal(false);
    setSelectedTaskId(null);
    setSelectedSubtask(null);
  };

  const highlightMatch = (text, term) => {
    if (!term || !text.toLowerCase().includes(term.toLowerCase())) {
      return text;
    }
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-[#E7E7E7] dark:bg-[#4A6CF7]/30">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="border-t border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto py-6">
        {/* Search Field */}
        <div className="relative w-full max-w-md mb-5">
          <input
            type="text"
            placeholder="Search Team Member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2A2F3B] text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7] rounded-md"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
        </div>
        <div className="flex gap-4">
          {/* Tasks Column */}
          <div className="w-1/2">
            <div className="bg-[#00308F] dark:bg-[#4A6CF7] p-3 font-semibold text-white shadow-2xl">
              Task
            </div>
            <div className="border border-[#E7E7E7] dark:border-gray-700 bg-[#f5efe8af] dark:bg-[#1E232E]">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="border-b text-[18px] border-[#E7E7E7] dark:border-gray-700 last:border-b-0"
                  >
                    <div
                      className="flex items-center justify-between p-4  hover:bg-gray-50 dark:hover:bg-[#2A2F3B]/80"
                      onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{highlightMatch(task.title, searchTerm)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Deadline: {task.deadline}
                        </div>
                        {expandedTask === task.id && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="mb-2">Description: {task.description}</div>
                            <div className="space-y-2">
                              {taskCompletionStatus[task.id].map((subtask) => (
                                <div
                                  key={subtask.id}
                                  className="flex items-center justify-between p-2  rounded-md"
                                >
                                  <span>{subtask.title}</span>
                                  {subtask.completed ? (
                                    <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                                      <MdVerified />
                                      <span className="text-sm">Complete</span>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSubtaskConfirmClick(task.id, subtask.id);
                                      }}
                                      className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-3 py-1 rounded-md hover:bg-[#000524b4] dark:hover:bg-[#3B5AEB] text-sm cursor-pointer"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleIconClick(e, task.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                      >
                        {expandedTask === task.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300 -mt-28 cursor-pointer" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300 cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No tasks found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>

          {/* Completed Tasks Column */}
          <div className="w-1/2">
            <div className="bg-white dark:bg-[#1E232E] border border-[#E7E7E7] dark:border-gray-700 p-3 font-semibold text-gray-800 dark:text-gray-200 shadow-xl">
              Completed Task
            </div>
            <div className="border border-[#E7E7E7] dark:border-gray-700 bg-white dark:bg-[#345f42]">
              {filteredCompletedTasks.length > 0 ? (
                filteredCompletedTasks.map((task, index) => (
                  <div
                    key={index}
                    className="text-[18px] font-[500] p-4 border-b border-[#E7E7E7] dark:border-gray-700 last:border-b-0 bg-green-100 dark:bg-green-900/30"
                  >
                    <div className="flex items-center gap-2">
                      <span>{highlightMatch(task, searchTerm)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MdVerified className="text-green-600 dark:text-green-400" />
                      <div className="text-[14px] text-green-600 dark:text-green-400">Complete</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No completed tasks found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[3px]"
              onClick={() => setShowConfirmModal(false)}
            ></div>
            <div className="relative z-10 bg-white dark:bg-[#1E232E] rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Confirm Subtask Completion
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to mark this subtask as complete?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md hover:bg-[#000524b4] dark:hover:bg-[#3B5AEB] cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
