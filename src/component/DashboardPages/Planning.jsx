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
        {["Planning", "Calendar","RACI"].map((tab) => (
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
        <div>
          <TimeLine/>
        </div>
      )}
      {activeTab === "Calendar" && <Calender />}
      {/* {activeTab === "Dependencies" && <Dependance />} */}
      {/* {activeTab === "Timeline" && <TimeLine />} */}
      {activeTab === "RACI" && <RACI />}

    </div>
  );
};

export default Planning;