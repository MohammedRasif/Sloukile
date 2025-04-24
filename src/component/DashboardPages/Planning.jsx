import { useState } from "react";
import Calender from "./Calender";
import Dependance from "./Dependance";

// Static dummy data for milestones
const initialMilestonesData = [
  {
    id: "1",
    title: "Project Initiation",
    deadline: "2023-06-15",
    status: "completed",
    subMilestones: [
      {
        id: "1-1",
        title: "Define Project Scope",
        description: "Outline the boundaries and deliverables of the project",
        output: "Project Scope Document",
        deadline: "2023-06-01",
        status: "completed",
        dependencies: [],
      },
      {
        id: "1-2",
        title: "Stakeholder Analysis",
        description: "Identify and analyze project stakeholders",
        output: "Stakeholder Matrix",
        deadline: "2023-06-10",
        status: "completed",
        dependencies: ["1-1"],
      },
      {
        id: "1-3",
        title: "Initial Resource Planning",
        description: "Estimate required resources for the project",
        output: "Resource Plan",
        deadline: "2023-06-15",
        status: "completed",
        dependencies: ["1-1"],
      },
    ],
  },
  {
    id: "2",
    title: "Design Phase",
    deadline: "2023-07-30",
    status: "in-progress",
    subMilestones: [
      {
        id: "2-1",
        title: "Requirements Gathering",
        description: "Collect detailed requirements from stakeholders",
        output: "Requirements Document",
        deadline: "2023-07-10",
        status: "completed",
        dependencies: ["1-2"],
      },
      {
        id: "2-2",
        title: "System Architecture Design",
        description: "Design the overall system architecture",
        output: "Architecture Diagram",
        deadline: "2023-07-20",
        status: "in-progress",
        dependencies: ["2-1"],
      },
      {
        id: "2-3",
        title: "UI/UX Design",
        description: "Create user interface and experience designs",
        output: "UI/UX Mockups",
        deadline: "2023-07-30",
        status: "not-started",
        dependencies: ["2-1"],
      },
    ],
  },
  {
    id: "3",
    title: "Development Phase",
    deadline: "2023-09-30",
    status: "not-started",
    subMilestones: [
      {
        id: "3-1",
        title: "Frontend Development",
        description: "Develop the user interface components",
        output: "Frontend Code",
        deadline: "2023-08-30",
        status: "not-started",
        dependencies: ["2-2", "2-3"],
      },
      {
        id: "3-2",
        title: "Backend Development",
        description: "Develop the server-side components",
        output: "Backend Code",
        deadline: "2023-09-15",
        status: "not-started",
        dependencies: ["2-2"],
      },
      {
        id: "3-3",
        title: "Integration",
        description: "Integrate frontend and backend components",
        output: "Integrated System",
        deadline: "2023-09-30",
        status: "not-started",
        dependencies: ["3-1", "3-2"],
      },
    ],
  },
];

// Function to get status badge styling
const getStatusBadge = (status) => {
  let bgColor, textColor;
  switch (status) {
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

const Planning = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("planning");

  // State for milestones data
  const [milestones, setMilestones] = useState(initialMilestonesData);

  // State to track which milestones are open
  const [openMilestones, setOpenMilestones] = useState([]);

  // State to track which sub-milestone is being edited
  const [editingSubMilestoneId, setEditingSubMilestoneId] = useState(null);
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

  // Start editing a sub-milestone
  const startEditing = (subMilestone) => {
    setEditingSubMilestoneId(subMilestone.id);
    setEditFormData({ ...subMilestone });
  };

  // Handle form input changes for editing sub-milestone
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited sub-milestone
  const saveEdit = (milestoneId) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              subMilestones: milestone.subMilestones.map((sm) =>
                sm.id === editingSubMilestoneId ? { ...editFormData } : sm
              ),
            }
          : milestone
      )
    );
    setEditingSubMilestoneId(null);
    setEditFormData(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingSubMilestoneId(null);
    setEditFormData(null);
  };

  // Delete a sub-milestone
  const deleteSubMilestone = (milestoneId, subMilestoneId) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              subMilestones: milestone.subMilestones.filter(
                (sm) => sm.id !== subMilestoneId
              ),
            }
          : milestone
      )
    );
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
      subMilestones: [],
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

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Tab Navigation (Styled as Buttons) */}
      <nav className="flex flex-wrap gap-3 sm:gap-4 overflow-x-auto pb-2">
        {["planning", "calendar", "dependencies"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition-all duration-200 shadow-sm ${
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
      {activeTab === "planning" && (
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

                {/* Sub-Milestones Section */}
                {openMilestones.includes(milestone.id) && (
                  <div className="px-4 py-2">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                          Sub-Milestones
                        </h3>
                        <div
                          className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-700 dark:text-gray-300 text-sm font-medium cursor-not-allowed"
                        >
                          <span>➕</span>
                          <span>Add Sub-Milestone</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {milestone.subMilestones.map((subMilestone) => (
                          <div
                            key={subMilestone.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E232E] shadow-sm"
                          >
                            {editingSubMilestoneId === subMilestone.id ? (
                              /* Edit Form */
                              <div className="p-4 space-y-3">
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    name="title"
                                    value={editFormData.title}
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
                                    Expected Output
                                  </label>
                                  <input
                                    type="text"
                                    name="output"
                                    value={editFormData.output}
                                    onChange={handleEditChange}
                                    className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                    Deadline
                                  </label>
                                  <input
                                    type="date"
                                    name="deadline"
                                    value={editFormData.deadline}
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
                                    <option value="completed">Completed</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="not-started">Not Started</option>
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
                                {/* Sub-Milestone Header */}
                                <div className="px-4 pt-3 flex justify-between items-start">
                                  <div>
                                    <h4 className="text-base font-medium text-gray-800 dark:text-gray-100">
                                      {subMilestone.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {subMilestone.description}
                                    </p>
                                  </div>
                                  <span className={getStatusBadge(subMilestone.status)}>
                                    {subMilestone.status.charAt(0).toUpperCase() +
                                      subMilestone.status.slice(1).replace("-", " ")}
                                  </span>
                                </div>

                                {/* Sub-Milestone Content */}
                                <div className="px-4 py-2">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Expected Output
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {subMilestone.output}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Deadline
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <span>📅</span>
                                        {new Date(subMilestone.deadline).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  {subMilestone.dependencies.length > 0 && (
                                    <div className="mt-2">
                                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                        Dependencies
                                      </p>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {subMilestone.dependencies.map((depId) => {
                                          const depName =
                                            milestones
                                              .flatMap((m) => m.subMilestones)
                                              .find((sm) => sm.id === depId)?.title || depId;
                                          return (
                                            <span
                                              key={depId}
                                              className="inline-block px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#2A2F3B]"
                                            >
                                              {depName}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Sub-Milestone Footer */}
                                <div className="px-4 pb-3 flex justify-end gap-2">
                                  <button
                                    onClick={() => startEditing(subMilestone)}
                                    className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                  >
                                    <span>✏️</span>
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => deleteSubMilestone(milestone.id, subMilestone.id)}
                                    className="flex items-center gap-1 px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-red-500 dark:text-red-400 text-sm hover:bg-red-50 dark:hover:bg-red-900/20"
                                  >
                                    <span>🗑️</span>
                                    <span>Delete</span>
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

      {activeTab === "calendar" && <Calender />}

      {activeTab === "dependencies" && <Dependance />}
    </div>
  );
};

export default Planning;