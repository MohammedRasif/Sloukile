import { useState } from "react";
import Calender from "./Calender";
import Dependance from "./Dependance";
import TimeLine from "./Timeline";
import RACI from "./RACI";

// Static dummy data for milestones, now including tasks
const initialMilestonesData = [
  {
    id: "1",
    title: "Project Initiation",
    deadline: "2023-06-15",
    status: "completed",
    tasks: [
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
          Informed: [ "Ramisa"],
        },
        subtasks: [
          { id: 1, title: "Wireframe design", completed: true },
          { id: 2, title: "Prototype creation", completed: true },
          { id: 3, title: "User testing", completed: true },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Design Phase",
    deadline: "2023-07-30",
    status: "in-progress",
    tasks: [
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
    ],
  },
  {
    id: "3",
    title: "Development Phase",
    deadline: "2023-09-30",
    status: "not-started",
    tasks: [
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
    ],
  },
];

// Function to get status badge styling
const getStatusBadge = (status) => {
  let bgColor, textColor;
  switch (status) {
    case "Completed":
    case "completed":
      bgColor = "bg-green-500";
      textColor = "text-white";
      break;
    case "In Progress":
    case "in-progress":
      bgColor = "bg-blue-500";
      textColor = "text-white";
      break;
    case "Not Started":
    case "not-started":
      bgColor = "bg-slate-500";
      textColor = "text-white";
      break;
    default:
      bgColor = "bg-gray-200";
      textColor = "text-gray-800";
      break;
  }
  return `inline-block px-2 py-1 rounded text-xs font-medium ${bgColor} ${textColor}`;
};

// Function to get priority badge styling
const getPriorityBadge = (priority) => {
  return `px-2 py-1 text-xs rounded-full ${
    priority === "High"
      ? "bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300"
      : priority === "Medium"
      ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300"
      : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
  }`;
};

const Planning = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("Planning");

  // State for milestones data
  const [milestones, setMilestones] = useState(initialMilestonesData);

  // State to track which milestones are open
  const [openMilestones, setOpenMilestones] = useState([]);

  // State to track which task is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // State for adding new milestone
  const [showAddMilestoneForm, setShowAddMilestoneForm] = useState(false);
  const [newMilestoneData, setNewMilestoneData] = useState({
    title: "",
    deadline: "",
    status: "not-started",
  });

  // Toggle milestone open/close state
  const toggleMilestone = (milestoneId) => {
    setOpenMilestones((prev) =>
      prev.includes(milestoneId)
        ? prev.filter((id) => id !== milestoneId)
        : [...prev, milestoneId]
    );
  };

  // Start editing a task
  const startEditing = (task, milestoneId, taskIndex) => {
    setEditingTaskId(`${milestoneId}-${taskIndex}`);
    setEditFormData({ ...task });
  };

  // Handle form input changes for editing task
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited task
  const saveEdit = (milestoneId) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.map((task, idx) =>
                `${milestoneId}-${idx}` === editingTaskId ? { ...editFormData } : task
              ),
            }
          : milestone
      )
    );
    setEditingTaskId(null);
    setEditFormData(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditFormData(null);
  };

  // Handle form input changes for new milestone
  const handleNewMilestoneChange = (e) => {
    const { name, value } = e.target;
    setNewMilestoneData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new milestone
  const addMilestone = () => {
    if (!newMilestoneData.title.trim() || !newMilestoneData.deadline) {
      alert("Title and deadline are required!");
      return;
    }

    const newId = (parseInt(milestones[milestones.length - 1].id) + 1).toString();
    const newMilestone = {
      id: newId,
      title: newMilestoneData.title,
      deadline: newMilestoneData.deadline,
      status: newMilestoneData.status,
      tasks: [],
    };

    setMilestones((prev) => [...prev, newMilestone]);
    setNewMilestoneData({ title: "", deadline: "", status: "not-started" });
    setShowAddMilestoneForm(false);
  };

  // Cancel adding milestone
  const cancelAddMilestone = () => {
    setNewMilestoneData({ title: "", deadline: "", status: "not-started" });
    setShowAddMilestoneForm(false);
  };

  // Confirm a subtask
  const handleConfirmSubtask = (milestoneId, taskIndex, subtaskId) => {
    setMilestones((prev) =>
      prev.map((milestone) => {
        if (milestone.id !== milestoneId) return milestone;
        return {
          ...milestone,
          tasks: milestone.tasks.map((task, idx) => {
            if (idx !== taskIndex) return task;
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
          }),
        };
      })
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Tab Navigation (Styled as Buttons) */}
      <nav className="flex flex-wrap gap-3 sm:gap-4 overflow-x-auto pb-2">
        {["Planning", "Calendar","Timeline","RACI"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-200 shadow-sm cursor-pointer ${
              activeTab === tab
                ? "bg-gray-800 dark:bg-[#4A6CF7] text-white shadow-md"
                : "bg-gray-100 dark:bg-[#2A2F3B] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#353A47] hover:shadow-md"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      {activeTab === "Planning" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Milestones
            </h2>
            <button
              onClick={() => setShowAddMilestoneForm(true)}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#353A47]"
            >
              <span>➕</span>
              <span>Add Milestone</span>
            </button>
          </div>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E232E]"
              >
                {/* Milestone Header */}
                <div
                  className="px-4 py-3 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleMilestone(milestone.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xl text-gray-800 dark:text-gray-100">
                      {milestone.title}
                    </span>
                    <span className={getStatusBadge(milestone.status)}>
                      {milestone.status.charAt(0).toUpperCase() +
                        milestone.status.slice(1).replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>📅</span>
                    <span>{new Date(milestone.deadline).toLocaleDateString()}</span>
                    <span>
                      {openMilestones.includes(milestone.id) ? "▼" : "▶"}
                    </span>
                  </div>
                </div>

                {/* Tasks Section */}
                {openMilestones.includes(milestone.id) && (
                  <div className="px-4 py-2">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                          Tasks
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {milestone.tasks.map((task, taskIndex) => (
                          <div
                            key={taskIndex}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E232E] shadow-sm"
                          >
                            {editingTaskId === `${milestone.id}-${taskIndex}` ? (
                              /* Edit Form */
                              <div className="p-4 space-y-3">
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleEditChange}
                                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Description
                                  </label>
                                  <input
                                    type="text"
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditChange}
                                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Due Date
                                  </label>
                                  <input
                                    type="text"
                                    name="dueDate"
                                    value={editFormData.dueDate}
                                    onChange={handleEditChange}
                                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Assignee
                                  </label>
                                  <input
                                    type="text"
                                    name="assignee"
                                    value={editFormData.assignee}
                                    onChange={handleEditChange}
                                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Status
                                  </label>
                                  <select
                                    name="status"
                                    value={editFormData.status}
                                    onChange={handleEditChange}
                                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                  >
                                    <option value="Completed">Completed</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Not Started">Not Started</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Priority
                                  </label>
                                  <select
                                    name="priority"
                                    value={editFormData.priority}
                                    onChange={handleEditChange}
                                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                  >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                  </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => saveEdit(milestone.id)}
                                    className="px-3 py-1 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                {/* Task Header */}
                                <div className="px-4 pt-3 flex justify-between items-start">
                                  <div>
                                    <h4 className="text-base font-medium text-gray-800 dark:text-gray-100">
                                      {task.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {task.description}
                                    </p>
                                  </div>
                                  <span className={getStatusBadge(task.status)}>
                                    {task.status}
                                  </span>
                                </div>

                                {/* Task Content */}
                                <div className="px-4 py-2">
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Due Date
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <span>📅</span>
                                        {task.dueDate}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Assignee
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium">
                                          {task.assignee.charAt(0)}
                                        </span>
                                        {task.assignee}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Priority
                                      </p>
                                      <span className={getPriorityBadge(task.priority)}>
                                        {task.priority}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Progress
                                      </p>
                                      <div className="w-72 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                                        <div
                                          className="bg-gray-800 dark:bg-[#4A6CF7] h-1.5 rounded-full"
                                          style={{ width: `${task.progress}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {task.progress}%
                                      </span>
                                    </div>
                                  </div>
                                  {/* <div className="mt-2">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                      RACI
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                      <span className="inline-block px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#2A2F3B]">
                                        R: {task.raci.Responsible}
                                      </span>
                                      <span className="inline-block px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#2A2F3B]">
                                        A: {task.raci.Accountable}
                                      </span>
                                      <span className="inline-block px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#2A2F3B]">
                                        C: {task.raci.Consulted.join(", ")}
                                      </span>
                                      <span className="inline-block px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#2A2F3B]">
                                        I: {task.raci.Informed.join(", ")}
                                      </span>
                                    </div>
                                  </div> */}
                                  <div className="mt-2">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                      Subtasks
                                    </p>
                                    <div className="mt-1 space-y-1">
                                      {task.subtasks.map((subtask) => (
                                        <div
                                          key={subtask.id}
                                          className="flex items-center justify-between"
                                        >
                                          <span
                                            className={`text-sm ${
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
                                                handleConfirmSubtask(
                                                  milestone.id,
                                                  taskIndex,
                                                  subtask.id
                                                )
                                              }
                                              className="text-xs bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 cursor-pointer"
                                            >
                                              Confirm
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Task Footer */}
                                <div className="px-4 pb-3 flex justify-end gap-2">
                                  <button
                                    onClick={() => startEditing(task, milestone.id, taskIndex)}
                                    className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer "
                                  >
                                    <span>✏️</span>
                                    <span>Edit</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Milestone Form */}
      {showAddMilestoneForm && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Add New Milestone
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newMilestoneData.title}
                  onChange={handleNewMilestoneChange}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                  placeholder="Enter milestone title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={newMilestoneData.deadline}
                  onChange={handleNewMilestoneChange}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Status
                </label>
                <select
                  name="status"
                  value={newMilestoneData.status}
                  onChange={handleNewMilestoneChange}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={addMilestone}
                  className="px-3 py-1 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={cancelAddMilestone}
                  className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Calendar" && <Calender />}

      {/* {activeTab === "Dependencies" && <Dependance />} */}
      {activeTab === "Timeline" && <TimeLine />}
      {activeTab === "RACI" && <RACI />}

    </div>
  );
};

export default Planning;