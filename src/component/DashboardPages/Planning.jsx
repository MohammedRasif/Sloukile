"use client"

import { useState } from "react"
import Calender from "./Calender"
import Dependance from "./Dependance"
import TimeLine from "./Timeline"
import RACI from "./RACI"
import Milestones from "./Milestones"

// Static dummy data for projects
const initialProjectsData = [
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
          Informed: ["Ramisa"],
        },
        subtasks: [
          { id: 1, title: "Wireframe design", completed: true },
          { id: 2, title: "Prototype creation", completed: true },
          { id: 3, title: "User testing", completed: true },
        ],
      },
      {
        name: "Agenda Preparation",
        description: "Prepare meeting agenda for kickoff",
        status: "Completed",
        priority: "Medium",
        dueDate: "6/15/2023",
        assignee: "Ramisa",
        progress: 100,
        raci: {
          Responsible: "Ramisa",
          Accountable: "Ramisa",
          Consulted: ["Sajib"],
          Informed: ["Rasif"],
        },
        subtasks: [
          { id: 1, title: "Identify key topics", completed: true },
          { id: 2, title: "Create agenda document", completed: true },
        ],
      },
      {
        name: "Venue Selection",
        description: "Select venue for project kickoff meeting",
        status: "Completed",
        priority: "Low",
        dueDate: "6/10/2023",
        assignee: "Rasif",
        progress: 100,
        raci: {
          Responsible: "Rasif",
          Accountable: "Rasif",
          Consulted: ["Ramisa"],
          Informed: ["Sajib"],
        },
        subtasks: [
          { id: 1, title: "Research venues", completed: true },
          { id: 2, title: "Visit potential locations", completed: true },
          { id: 3, title: "Book selected venue", completed: true },
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
]

// Function to get status badge styling
const getStatusBadge = (status) => {
  let bgColor, textColor
  switch (status) {
    case "Completed":
    case "completed":
      bgColor = "bg-green-500"
      textColor = "text-white"
      break
    case "In Progress":
    case "in-progress":
      bgColor = "bg-blue-500"
      textColor = "text-white"
      break
    case "Not Started":
    case "not-started":
      bgColor = "bg-slate-500"
      textColor = "text-white"
      break
    default:
      bgColor = "bg-gray-200"
      textColor = "text-gray-800"
      break
  }
  return `inline-block px-2 py-1 rounded text-xs font-medium ${bgColor} ${textColor}`
}

// Function to get priority badge styling
const getPriorityBadge = (priority) => {
  return `px-2 py-1 text-xs rounded-full ${
    priority === "High"
      ? "bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300"
      : priority === "Medium"
        ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300"
        : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
  }`
}

const Timeline = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("Timeline")

  // State for projects data
  const [projects, setProjects] = useState(initialProjectsData)

  // State to track which projects are open
  const [openProjects, setOpenProjects] = useState([])

  // State to track which task is being edited
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editFormData, setEditFormData] = useState(null)

  // State for adding/editing project via popup
  const [showProjectPopup, setShowProjectPopup] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [projectData, setProjectData] = useState({
    title: "",
    deadline: "",
    status: "not-started",
    tasks: [],
  })

  // State for adding tasks dynamically in the popup
  const [newTaskData, setNewTaskData] = useState({
    name: "",
    description: "",
    status: "Not Started",
    priority: "Medium",
    dueDate: "",
    assignee: "",
    progress: 0,
    raci: { Responsible: "", Accountable: "", Consulted: [], Informed: [] },
    subtasks: [],
  })

  // State for adding subtasks dynamically
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("")

  // State for task edit/delete popup
  const [showTaskPopup, setShowTaskPopup] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null)

  // Toggle project open/close state
  const toggleProject = (projectId) => {
    setOpenProjects((prev) => (prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]))
  }

  // Start editing a task
  const startEditing = (task, projectId, taskIndex) => {
    setEditingTaskId(`${projectId}-${taskIndex}`)
    setEditFormData({ ...task })
  }

  // Handle form input changes for editing task
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Save edited task
  const saveEdit = (projectId) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map((task, idx) =>
                `${projectId}-${idx}` === editingTaskId ? { ...editFormData } : task,
              ),
            }
          : project,
      ),
    )
    setEditingTaskId(null)
    setEditFormData(null)
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditFormData(null)
  }

  // Handle form input changes for project
  const handleProjectChange = (e) => {
    const { name, value } = e.target
    setProjectData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form input changes for new task
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target
    setNewTaskData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle RACI changes
  const handleRaciChange = (e, field) => {
    const { value } = e.target
    setNewTaskData((prev) => ({
      ...prev,
      raci: {
        ...prev.raci,
        [field]:
          field === "Consulted" || field === "Informed"
            ? value
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item)
            : value,
      },
    }))
  }

  // Add subtask to new task
  const addSubtask = () => {
    if (!newSubtaskTitle.trim()) return
    setNewTaskData((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, { id: prev.subtasks.length + 1, title: newSubtaskTitle, completed: false }],
    }))
    setNewSubtaskTitle("")
  }

  // Add task to project
  const addTask = () => {
    if (!newTaskData.name.trim() || !newTaskData.dueDate) {
      alert("Task name and due date are required!")
      return
    }
    setProjectData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, { ...newTaskData }],
    }))
    setNewTaskData({
      name: "",
      description: "",
      status: "Not Started",
      priority: "Medium",
      dueDate: "",
      assignee: "",
      progress: 0,
      raci: { Responsible: "", Accountable: "", Consulted: [], Informed: [] },
      subtasks: [],
    })
  }

  // Open popup for adding new project
  const openAddProjectPopup = () => {
    setProjectData({ title: "", deadline: "", status: "not-started", tasks: [] })
    setIsEditing(false)
    setShowProjectPopup(true)
  }

  // Open popup for editing project
  const openEditProjectPopup = (project) => {
    setProjectData({
      title: project.title,
      deadline: project.deadline,
      status: project.status,
      tasks: [...project.tasks], // Create a new array to avoid mutation
    })
    setEditingProjectId(project.id)
    setIsEditing(true)
    setShowProjectPopup(true)
  }

  // Save project (add or edit)
  const saveProject = () => {
    if (!projectData.title.trim() || !projectData.deadline) {
      alert("Title and deadline are required!")
      return
    }

    if (isEditing) {
      // Update existing project
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProjectId
            ? {
                ...project,
                title: projectData.title,
                deadline: projectData.deadline,
                status: projectData.status,
                tasks: projectData.tasks,
              }
            : project,
        ),
      )
    } else {
      // Add new project
      const newId = (Number.parseInt(projects[projects.length - 1]?.id || 0) + 1).toString()
      const newProject = {
        id: newId,
        title: projectData.title,
        deadline: projectData.deadline,
        status: projectData.status,
        tasks: projectData.tasks,
      }
      setProjects((prev) => [...prev, newProject])
      setOpenProjects((prev) => [...prev, newId]) // Open the new project by default
    }

    closePopup()
    alert("Project saved successfully!")
  }

  // Delete project
  const deleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((project) => project.id !== projectId))
      setOpenProjects((prev) => prev.filter((id) => id !== projectId))
      closePopup()
    }
  }

  // Close popup
  const closePopup = () => {
    setProjectData({ title: "", deadline: "", status: "not-started", tasks: [] })
    setNewTaskData({
      name: "",
      description: "",
      status: "Not Started",
      priority: "Medium",
      dueDate: "",
      assignee: "",
      progress: 0,
      raci: { Responsible: "", Accountable: "", Consulted: [], Informed: [] },
      subtasks: [],
    })
    setNewSubtaskTitle("")
    setShowProjectPopup(false)
    setIsEditing(false)
    setEditingProjectId(null)
    setShowTaskPopup(false)
    setShowDeleteConfirm(false)
  }

  // Confirm a subtask
  const handleConfirmSubtask = (projectId, taskIndex, subtaskId) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project
        return {
          ...project,
          tasks: project.tasks.map((task, idx) => {
            if (idx !== taskIndex) return task
            const updatedSubtasks = task.subtasks.map((subtask) =>
              subtask.id === subtaskId ? { ...subtask, completed: true } : subtask,
            )
            const completedCount = updatedSubtasks.filter((subtask) => subtask.completed).length
            const progress = Math.round((completedCount / updatedSubtasks.length) * 100)
            const status =
              progress === 100
                ? "Completed"
                : task.status === "Not Started" && progress > 0
                  ? "In Progress"
                  : task.status
            return {
              ...task,
              subtasks: updatedSubtasks,
              progress,
              status,
            }
          }),
        }
      }),
    )
  }

  // Open task edit popup
  const openTaskEditPopup = (projectId, taskIndex) => {
    const project = projects.find((p) => p.id === projectId)
    const task = project.tasks[taskIndex]
    setCurrentTask({ ...task })
    setCurrentProjectId(projectId)
    setCurrentTaskIndex(taskIndex)
    setShowTaskPopup(true)
    setShowDeleteConfirm(false)
  }

  // Open task delete confirmation
  const openTaskDeleteConfirm = (projectId, taskIndex) => {
    const project = projects.find((p) => p.id === projectId)
    const task = project.tasks[taskIndex]
    setCurrentTask({ ...task })
    setCurrentProjectId(projectId)
    setCurrentTaskIndex(taskIndex)
    setShowDeleteConfirm(true)
    setShowTaskPopup(false)
  }

  // Handle task form input changes
  const handleTaskChange = (e) => {
    const { name, value } = e.target
    setCurrentTask((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number.parseInt(value) : value,
    }))
  }

  // Save edited task
  const saveTaskEdit = () => {
    if (!currentTask.name || !currentTask.dueDate) {
      alert("Task name and due date are required!")
      return
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === currentProjectId
          ? {
              ...project,
              tasks: project.tasks.map((task, index) => (index === currentTaskIndex ? currentTask : task)),
            }
          : project,
      ),
    )

    closePopup()
    alert("Task updated successfully!")
  }

  // Delete task
  const deleteTask = () => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === currentProjectId
          ? {
              ...project,
              tasks: project.tasks.filter((_, index) => index !== currentTaskIndex),
            }
          : project,
      ),
    )

    closePopup()
    alert("Task deleted successfully!")
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Tab Navigation (Styled as Buttons) */}
      <nav className="flex flex-wrap gap-3 sm:gap-4 overflow-x-auto pb-2">
        {["Timeline","Planning" ,"Calendar", "Dependencies", "RACI"].map((tab) => (
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

      {/* Add Project Button */}
      {activeTab === "Timeline" && (
        <div className="mb-4 flex gap-4">
          
        </div>
      )}
      {/* Content Area */}
      {activeTab === "Timeline" && (
        <div>
          <TimeLine
            projects={projects}
            openProjects={openProjects}
            toggleProject={toggleProject}
            getStatusBadge={getStatusBadge}
            getPriorityBadge={getPriorityBadge}
            startEditing={startEditing}
            editingTaskId={editingTaskId}
            editFormData={editFormData}
            handleEditChange={handleEditChange}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            handleConfirmSubtask={handleConfirmSubtask}
            openEditProjectPopup={openEditProjectPopup}
            deleteProject={deleteProject}
            openTaskEditPopup={openTaskEditPopup}
            openTaskDeleteConfirm={openTaskDeleteConfirm}
          />
        </div>
      )}
      {activeTab === "Calendar" && <Calender />}
      {activeTab === "Planning" && <Milestones />}
      {activeTab === "Dependencies" && <Dependance />}
      {activeTab === "RACI" && <RACI />}
    </div>
  )
}

export default Timeline
