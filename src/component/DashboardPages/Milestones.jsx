import { useState, useEffect } from "react";

// Static dummy data for milestones, now including tasks
const initialMilestonesData = [
  {
    id: "1",
    title: "Project Initiation",
    deadline: "2023-06-15",
    status: "completed",
    tasks: [
      {
        id: "1-1",
        name: "UI/UX Design",
        description: "Create UI/UX design for the application",
        status: "Completed",
        priority: "High",
        dueDate: "2025-07-01",
        assignee: "Sajib",
        progress: 100,
        raci: {
          Responsible: "Sajib",
          Accountable: "Sajib",
          Consulted: ["Rasif"],
          Informed: ["Ramisa"],
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
        id: "2-1",
        name: "Backend API Development",
        description: "Develop RESTful APIs for the application",
        status: "In Progress",
        priority: "High",
        dueDate: "2025-07-15",
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
        id: "2-2",
        name: "Frontend UI Implementation",
        description: "Implement user interface components",
        status: "In Progress",
        priority: "Medium",
        dueDate: "2025-07-20",
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
        id: "3-1",
        name: "AI Integration",
        description: "Integrate AI features into the application",
        status: "Not Started",
        priority: "Medium",
        dueDate: "2025-08-01",
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
        id: "3-2",
        name: "Testing and QA",
        description: "Perform testing and quality assurance",
        status: "Not Started",
        priority: "High",
        dueDate: "2025-08-10",
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
  switch (status?.toLowerCase()) {
    case "completed":
      bgColor = "bg-green-500";
      textColor = "text-white";
      break;
    case "in-progress":
      bgColor = "bg-blue-500";
      textColor = "text-white";
      break;
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

const Milestones = () => {
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

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showAddMilestoneForm) {
        cancelAddMilestone();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showAddMilestoneForm]);

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
    setEditingTaskId(task.id);
    setEditFormData({ ...task, dueDate: task.dueDate || "" });
  };

  // Handle form input changes for editing task
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate edit form
  const validateEditForm = (formData) => {
    if (!formData.name.trim()) return "Task name is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.dueDate) return "Due date is required";
    if (!formData.assignee.trim()) return "Assignee is required";
    return null;
  };

  // Save edited task
  const saveEdit = (milestoneId) => {
    const error = validateEditForm(editFormData);
    if (error) {
      alert(error);
      return;
    }

    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.map((task) =>
                task.id === editingTaskId ? { ...editFormData } : task
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

  // Validate new milestone form
  const validateNewMilestone = (data) => {
    if (!data.title.trim()) return "Title is required";
    if (!data.deadline) return "Deadline is required";
    return null;
  };

  // Add new milestone
  const addMilestone = () => {
    const error = validateNewMilestone(newMilestoneData);
    if (error) {
      alert(error);
      return;
    }

    const newId = (parseInt(milestones[milestones.length - 1]?.id || 0) + 1).toString();
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
            const progress = task.subtasks.length
              ? Math.round((completedCount / task.subtasks.length) * 100)
              : 0;
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

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Tab Navigation */}
      
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
              aria-label="Add new milestone"
            >
              <span>➕</span>
              <span>Add Milestone</span>
            </button>
          </div>
          {milestones.length === 0 ? (
            <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-[#2A2F3B] rounded-lg">
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                No milestones available
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E232E]"
                >
                  {/* Milestone Header */}
                  <button
                    className="px-4 py-3 flex items-center justify-between cursor-pointer w-full"
                    onClick={() => toggleMilestone(milestone.id)}
                    aria-expanded={openMilestones.includes(milestone.id)}
                    aria-controls={`milestone-${milestone.id}`}
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
                      <span>{formatDate(milestone.deadline)}</span>
                      <span>{openMilestones.includes(milestone.id) ? "▼" : "▶"}</span>
                    </div>
                  </button>

                  {/* Tasks Section */}
                  {openMilestones.includes(milestone.id) && (
                    <div id={`milestone-${milestone.id}`} className="px-4 py-2">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                            Tasks
                          </h3>
                        </div>

                        {milestone.tasks.length === 0 ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No tasks available for this milestone
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 gap-4">
                            {milestone.tasks.map((task, taskIndex) => (
                              <div
                                key={task.id}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E232E] shadow-sm"
                              >
                                {editingTaskId === task.id ? (
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
                                        required
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
                                        required
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Due Date
                                      </label>
                                      <input
                                        type="date"
                                        name="dueDate"
                                        value={editFormData.dueDate}
                                        onChange={handleEditChange}
                                        className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                        required
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
                                        required
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
                                        aria-label="Save task changes"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={cancelEdit}
                                        className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                                        aria-label="Cancel editing task"
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
                                            {formatDate(task.dueDate)}
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
                                      <div className="mt-2">
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
                                      </div>
                                      <div className="mt-2">
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                          Subtasks
                                        </p>
                                        <div className="mt-1 space-y-1">
                                          {task.subtasks.length === 0 ? (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                              No subtasks available
                                            </p>
                                          ) : (
                                            task.subtasks.map((subtask) => (
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
                                                    aria-label={`Confirm subtask: ${subtask.title}`}
                                                  >
                                                    Confirm
                                                  </button>
                                                )}
                                              </div>
                                            ))
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Task Footer */}
                                    <div className="px-4 pb-3 flex justify-end gap-2">
                                      <button
                                        onClick={() => startEditing(task, milestone.id, taskIndex)}
                                        className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                        aria-label={`Edit task: ${task.name}`}
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
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      
      

      {/* Add Milestone Form */}
      {showAddMilestoneForm && (
        <div
          className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="add-milestone-title"
        >
          <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3
              id="add-milestone-title"
              className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100"
            >
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
                  required
                  aria-required="true"
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
                  required
                  aria-required="true"
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
                  aria-label="Add new milestone"
                >
                  Add
                </button>
                <button
                  onClick={cancelAddMilestone}
                  className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                  aria-label="Cancel adding milestone"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Milestones;