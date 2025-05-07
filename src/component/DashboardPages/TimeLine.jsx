"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Plus, Edit, Trash2 } from "lucide-react"
import { GoDash } from "react-icons/go"
import { FiPlus } from "react-icons/fi"

// Initial project data structure
const initialProjects = [
  {
    id: "540",
    title: "Venue Selection",
    dateline: "07/08/2022",
    milestones: [
      {
        name: "Venue Options Document",
        completed: true,
        details: {
          id: "540-1",
          subject: "Venue Options Document",
          type: "PHASE",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-05"),
          endDate: new Date("2022-08-05"),
          color: "#00308F",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
      {
        name: "Date Selection Report",
        completed: false,
        details: {
          id: "540-2",
          subject: "Date Selection Report",
          type: "MILESTONE",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-25"),
          color: "#406dc7",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
      {
        name: "Date Selection Report",
        completed: false,
        details: {
          id: "540-3",
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-10"),
          endDate: new Date("2022-07-30"),
          color: "#406dc7",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
      {
        name: "Date Selection Report",
        completed: false,
        details: {
          id: "540-4",
          subject: "Date Selection Report",
          type: "MILESTONE",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-15"),
          color: "#406dc7",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
      {
        name: "Date Selection Report",
        completed: false,
        details: {
          id: "540-5",
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-20"),
          endDate: new Date("2022-08-10"),
          color: "#406dc7",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
      {
        name: "Date Selection Report",
        completed: false,
        details: {
          id: "540-6",
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-07"),
          endDate: new Date("2022-08-05"),
          color: "#406dc7",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
      {
        name: "Date Selection Report",
        completed: false,
        details: {
          id: "540-7",
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-10"),
          endDate: new Date("2022-08-02"),
          color: "#406dc7",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
      {
        name: "Date Selection Report",
        completed: false,
        details: {
          id: "540-8", // Changed from 540-5 to avoid duplicate
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-13"),
          endDate: new Date("2022-08-10"),
          color: "#406dc7",
          owner: {
            name: "Michael Chen",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
            role: "Event Coordinator",
          },
        },
      },
    ],
    dependencies: ["539"],
  },
  {
    id: "541",
    title: "Agenda Preparation",
    dateline: "30/07/2022",
    milestones: [
      {
        name: "Draft Agenda",
        completed: false,
        details: {
          id: "541-1",
          subject: "Draft Agenda",
          type: "PHASE",
          status: "in-progress",
          priority: "Normal",
          startDate: new Date("2022-07-10"),
          endDate: new Date("2022-08-10"),
          color: "#00308F",
          owner: {
            name: "Jessica Lee",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
            role: "Content Manager",
          },
        },
      },
      {
        name: "Session Descriptions",
        completed: false,
        details: {
          id: "541-2",
          subject: "Session Descriptions",
          type: "TASK",
          status: "not-started",
          priority: "Normal",
          startDate: new Date("2022-07-10"),
          endDate: new Date("2022-07-03"),
          color: "#406dc7",
          owner: {
            name: "Jessica Lee",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
            role: "Content Manager",
          },
        },
      },
      {
        name: "Session Descriptions",
        completed: false,
        details: {
          id: "541-3",
          subject: "Session Descriptions",
          type: "MILESTONE",
          status: "not-started",
          priority: "Normal",
          startDate: new Date("2022-08-10"),
          color: "#406dc7",
          owner: {
            name: "Jessica Lee",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
            role: "Content Manager",
          },
        },
      },
      {
        name: "Session Descriptions",
        completed: false,
        details: {
          id: "541-4",
          subject: "Session Descriptions",
          type: "TASK",
          status: "not-started",
          priority: "Normal",
          startDate: new Date("2022-07-13"),
          endDate: new Date("2022-08-08"),
          color: "#406dc7",
          owner: {
            name: "Jessica Lee",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
            role: "Content Manager",
          },
        },
      },
      {
        name: "Session Descriptions",
        completed: false,
        details: {
          id: "541-5",
          subject: "Session Descriptions",
          type: "TASK",
          status: "not-started",
          priority: "Normal",
          startDate: new Date("2022-07-14"),
          endDate: new Date("2022-08-01"),
          color: "#406dc7",
          owner: {
            name: "Jessica Lee",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
            role: "Content Manager",
          },
        },
      },
      {
        name: "Session Descriptions",
        completed: false,
        details: {
          id: "541-6",
          subject: "Session Descriptions",
          type: "MILESTONE",
          status: "not-started",
          priority: "Normal",
          startDate: new Date("2022-07-27"),
          color: "#406dc7",
          owner: {
            name: "Jessica Lee",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
            role: "Content Manager",
          },
        },
      },
      {
        name: "Session Descriptions",
        completed: false,
        details: {
          id: "541-7",
          subject: "Session Descriptions",
          type: "TASK",
          status: "not-started",
          priority: "Normal",
          startDate: new Date("2022-07-25"),
          endDate: new Date("2022-08-20"),
          color: "#406dc7",
          owner: {
            name: "Jessica Lee",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
            role: "Content Manager",
          },
        },
      },
    ],
    dependencies: ["540"],
  },
]

const availableYears = [2021, 2022, 2023]

const quarters = [
  { name: "Q1", months: [0, 1, 2] },
  { name: "Q2", months: [3, 4, 5] },
  { name: "Q3", months: [6, 7, 8] },
  { name: "Q4", months: [9, 10, 11] },
]

export default function TimeLine() {
  // State for projects data
  const [allProjects, setAllProjects] = useState(initialProjects)

  const [selectedYear, setSelectedYear] = useState(2022)
  const [selectedQuarter, setSelectedQuarter] = useState(2)
  const [filteredProjects, setFilteredProjects] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [expandedProjects, setExpandedProjects] = useState(allProjects.map((project) => project.id))
  const [expandedMilestones, setExpandedMilestones] = useState(() => {
    const milestoneIds = []
    allProjects.forEach((project) => {
      project.milestones.forEach((_, index) => {
        milestoneIds.push(`${project.id}-${index}`)
      })
    })
    return milestoneIds
  })

  // State for add/edit project popup
  const [showProjectPopup, setShowProjectPopup] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProjectId, setCurrentProjectId] = useState(null)

  // State for project form data
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    dateline: "",
    milestones: [],
  })

  // State for milestone form data
  const [milestoneFormData, setMilestoneFormData] = useState({
    name: "",
    completed: false,
    details: {
      subject: "",
      type: "TASK",
      status: "not-started",
      priority: "Normal",
      startDate: "",
      endDate: "",
      color: "#406dc7",
      owner: {
        name: "",
        avatar: "",
        role: "",
      },
    },
  })

  // State for delete confirmation popup
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const currentQuarter = quarters[selectedQuarter]
    const quarterStartMonth = currentQuarter.months[0]
    const quarterEndMonth = currentQuarter.months[2]

    const newStartDate = new Date(selectedYear, quarterStartMonth, 1)
    const newEndDate = new Date(selectedYear, quarterEndMonth + 1, 0)

    if (isNaN(newStartDate) || isNaN(newEndDate)) {
      console.error("Invalid date range calculated:", { newStartDate, newEndDate })
      return
    }

    setStartDate(newStartDate)
    setEndDate(newEndDate)

    const projects = allProjects.filter((project) => {
      return project.milestones.some((milestone) => {
        const milestoneStart = new Date(milestone.details.startDate)
        const milestoneEnd = milestone.details.endDate ? new Date(milestone.details.endDate) : milestoneStart
        return (
          (milestoneStart.getFullYear() === selectedYear || milestoneEnd.getFullYear() === selectedYear) &&
          ((milestoneStart.getMonth() >= quarterStartMonth && milestoneStart.getMonth() <= quarterEndMonth) ||
            (milestoneEnd.getMonth() >= quarterStartMonth && milestoneEnd.getMonth() <= quarterEndMonth) ||
            (milestoneStart.getMonth() < quarterStartMonth && milestoneEnd.getMonth() > quarterEndMonth))
        )
      })
    })

    setFilteredProjects(projects)
  }, [selectedYear, selectedQuarter, allProjects])

  const months = []
  let currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const monthName = currentDate.toLocaleString("en-US", { month: "short" })
    const year = currentDate.getFullYear()
    months.push({ name: `${monthName} ${year}`, month: currentDate.getMonth(), year })
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  }

  const allDays = []
  currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    allDays.push({
      date: new Date(currentDate),
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  const daysByMonth = months.map((month) => ({
    ...month,
    days: allDays.filter((day) => day.month === month.month && day.year === month.year),
  }))

  const parseDate = (dateString) => {
    if (!dateString) return null
    const [day, month, year] = dateString.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  const formatDate = (date) => {
    if (!date) return ""
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const calculatePosition = (date) => {
    if (!date || isNaN(date)) return 0
    const diffTime = Math.abs(date - startDate)
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateWidth = (startDate, endDate) => {
    if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) return 1
    const diffTime = Math.abs(endDate - startDate)
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1)
  }

  const calculateProgress = (milestone) => {
    if (milestone.completed || milestone.details.status === "completed") return 100
    if (!milestone.details.startDate || !milestone.details.endDate) return 0

    const startDate = new Date(milestone.details.startDate)
    const endDate = new Date(milestone.details.endDate)
    const today = new Date(2022, 7, 1) // Simulate August 1, 2022 for testing

    if (isNaN(startDate) || isNaN(endDate)) return 0
    if (today < startDate) return 0
    if (today > endDate) return 100

    const totalDuration = endDate.getTime() - startDate.getTime()
    const elapsedDuration = today.getTime() - startDate.getTime()
    return Math.min(100, Math.round((elapsedDuration / totalDuration) * 100))
  }

  const prevQuarter = () => {
    if (selectedQuarter > 0) {
      setSelectedQuarter(selectedQuarter - 1)
    } else {
      setSelectedQuarter(3)
      setSelectedYear(selectedYear - 1)
    }
  }

  const nextQuarter = () => {
    if (selectedQuarter < 3) {
      setSelectedQuarter(selectedQuarter + 1)
    } else {
      setSelectedQuarter(0)
      setSelectedYear(selectedYear + 1)
    }
  }

  const toggleProject = (projectId) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const toggleMilestoneDetails = (milestoneIndex, projectId) => {
    const uniqueId = `${projectId}-${milestoneIndex}`
    setExpandedMilestones((prev) =>
      prev.includes(uniqueId) ? prev.filter((id) => id !== uniqueId) : [...prev, uniqueId],
    )
  }

  // Open add project popup
  const openAddProjectPopup = () => {
    setProjectFormData({
      title: "",
      dateline: "",
      milestones: [],
    })
    setMilestoneFormData({
      name: "",
      completed: false,
      details: {
        subject: "",
        type: "TASK",
        status: "not-started",
        priority: "Normal",
        startDate: "",
        endDate: "",
        color: "#406dc7",
        owner: {
          name: "",
          avatar: "",
          role: "",
        },
      },
    })
    setIsEditing(false)
    setShowProjectPopup(true)
  }

  // Open edit project popup
  const openEditProjectPopup = (projectId) => {
    const project = allProjects.find((p) => p.id === projectId)
    if (!project) return

    // Create a deep copy of the project with properly formatted dates for the form
    const formattedMilestones = project.milestones.map((milestone) => {
      const startDate = milestone.details.startDate ? new Date(milestone.details.startDate) : null
      const endDate = milestone.details.endDate ? new Date(milestone.details.endDate) : null

      return {
        ...milestone,
        details: {
          ...milestone.details,
          startDate: startDate ? startDate.toISOString().split("T")[0] : "",
          endDate: endDate ? endDate.toISOString().split("T")[0] : "",
        },
      }
    })

    setProjectFormData({
      title: project.title,
      dateline: project.dateline,
      milestones: formattedMilestones,
    })
    setCurrentProjectId(projectId)
    setIsEditing(true)
    setShowProjectPopup(true)
  }

  // Open delete project confirmation
  const openDeleteProjectConfirm = (projectId) => {
    setCurrentProjectId(projectId)
    setShowDeleteConfirm(true)
  }

  // Handle project form input changes
  const handleProjectChange = (e) => {
    const { name, value } = e.target
    setProjectFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle milestone form input changes
  const handleMilestoneChange = (e) => {
    const { name, value } = e.target

    if (name.includes("details.")) {
      const detailField = name.split(".")[1]
      setMilestoneFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          [detailField]: value,
        },
      }))
    } else if (name.includes("owner.")) {
      const ownerField = name.split(".")[1]
      setMilestoneFormData((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          owner: {
            ...prev.details.owner,
            [ownerField]: value,
          },
        },
      }))
    } else {
      setMilestoneFormData((prev) => ({
        ...prev,
        [name]: name === "completed" ? e.target.checked : value,
      }))
    }
  }

  // Add milestone to project form
  const addMilestone = () => {
    if (!milestoneFormData.name || !milestoneFormData.details.subject) {
      alert("Milestone name and subject are required!")
      return
    }

    // Generate a unique ID for the milestone
    const milestoneId = `milestone-${Date.now()}`

    // Create a new milestone with the form data
    const newMilestone = {
      ...milestoneFormData,
      details: {
        ...milestoneFormData.details,
        id: milestoneId,
        // Keep dates as strings in the form
        startDate: milestoneFormData.details.startDate || "",
        endDate: milestoneFormData.details.endDate || "",
      },
    }

    // Add the milestone to the project form data
    setProjectFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone],
    }))

    // Reset the milestone form
    setMilestoneFormData({
      name: "",
      completed: false,
      details: {
        subject: "",
        type: "TASK",
        status: "not-started",
        priority: "Normal",
        startDate: "",
        endDate: "",
        color: "#406dc7",
        owner: {
          name: "",
          avatar: "",
          role: "",
        },
      },
    })
  }

  // Remove milestone from project form
  const removeMilestone = (index) => {
    setProjectFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }))
  }

  // Save project (add or update)
  const saveProject = () => {
    if (!projectFormData.title || !projectFormData.dateline) {
      alert("Project title and dateline are required!")
      return
    }

    if (projectFormData.milestones.length === 0) {
      alert("At least one milestone is required!")
      return
    }

    // Process milestones to ensure dates are properly formatted
    const processedMilestones = projectFormData.milestones.map((milestone) => {
      return {
        ...milestone,
        details: {
          ...milestone.details,
          startDate: milestone.details.startDate ? new Date(milestone.details.startDate) : new Date(),
          endDate: milestone.details.endDate ? new Date(milestone.details.endDate) : null,
        },
      }
    })

    const updatedProjectData = {
      ...projectFormData,
      milestones: processedMilestones,
    }

    if (isEditing) {
      // Update existing project
      setAllProjects((prev) =>
        prev.map((project) => (project.id === currentProjectId ? { ...project, ...updatedProjectData } : project)),
      )
    } else {
      // Add new project
      const newId = `${Math.floor(Math.random() * 1000)}`
      const newProject = {
        id: newId,
        ...updatedProjectData,
        dependencies: [],
      }
      setAllProjects((prev) => [...prev, newProject])

      // Expand the new project by default
      setExpandedProjects((prev) => [...prev, newId])
    }

    // Close the popup
    setShowProjectPopup(false)
    alert(isEditing ? "Project updated successfully!" : "Project added successfully!")
  }

  // Delete project
  const deleteProject = () => {
    setAllProjects((prev) => prev.filter((project) => project.id !== currentProjectId))
    setShowDeleteConfirm(false)
    alert("Project deleted successfully!")
  }

  // Close all popups
  const closePopup = () => {
    setShowProjectPopup(false)
    setShowDeleteConfirm(false)
  }

  const today = new Date(2022, 7, 1) // Simulate August 1, 2022 for testing
  const isCurrentQuarter = today >= startDate && today <= endDate
  const todayPosition = isCurrentQuarter ? calculatePosition(today) : -1

  const rowHeight = 40
  const subRowHeight = 40
  const getRowHeight = (project) => {
    const isExpanded = expandedProjects.includes(project.id)
    if (!isExpanded) return rowHeight
    return rowHeight + project.milestones.length * subRowHeight
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg flex flex-col">
      <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Project Timeline</h1>
            <p className="text-blue-100 dark:text-blue-200 text-sm mt-1">
              Track project progress, milestones, and deliverables
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openAddProjectPopup}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Timeline</span>
            </button>
            <div className="flex items-center bg-blue-700 dark:bg-[#3B5AEB] rounded-md p-2">
              <Calendar className="h-4 w-4 mr-2" />
              <select
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year} className="text-gray-800 dark:text-gray-200">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {quarters[selectedQuarter].name} {selectedYear}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevQuarter}
            title="Previous Quarter"
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="bg-blue-50 dark:bg-[#3B5AEB] text-blue-800 dark:text-blue-200 px-3 py-1 rounded-md font-medium">
            {quarters[selectedQuarter].name}
          </div>
          <button
            onClick={nextQuarter}
            title="Next Quarter"
            className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Table section - Sticky on the left */}
        <div className="w-[400px] flex-shrink-0 border-r border-gray-300 dark:border-gray-600 sticky left-0 z-20 bg-white dark:bg-gray-800">
          <div className="flex bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 sticky top-0 z-30">
            <div className="w-[150px] p-2 font-medium text-gray-700 dark:text-gray-200 pl-8 text-sm">Activity</div>
            <div className="w-[70px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Type</div>
            <div className="w-[80px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Status</div>
            <div className="w-[50px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm pl-3">Priority</div>
            <div className="w-[50px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Actions</div>
          </div>
          <div className="h-8 border-b border-gray-300 dark:border-gray-600"></div>

          {filteredProjects.length ? (
            filteredProjects.map((project) => {
              const isExpanded = expandedProjects.includes(project.id)

              return (
                <div key={project.id} style={{ height: `${getRowHeight(project)}px` }}>
                  <div className="flex items-center h-10 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <div className="w-[150px] px-2 pl-2 flex items-center">
                      <button onClick={() => toggleProject(project.id)} className="focus:outline-none mr-1 font-bold">
                        {isExpanded ? (
                          <FiPlus className="h-4 w-4 text-white dark:text-black bg-gray-800 dark:bg-gray-200 cursor-pointer" />
                        ) : (
                          <GoDash className="h-4 w-4 text-white dark:text-black bg-gray-800 dark:bg-gray-200 font-bold  cursor-pointer" />
                        )}
                      </button>
                      <span className="text-[13px] text-gray-800 dark:text-gray-200 truncate font-bold">
                        {project.title}
                      </span>
                    </div>
                    <div className="w-[70px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3"></div>
                    <div className="w-[80px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3"></div>
                    <div className="w-[50px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3"></div>
                    <div className="w-[50px] px-2 pt-3 flex space-x-1">
                      <button
                        onClick={() => openEditProjectPopup(project.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Project"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDeleteProjectConfirm(project.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="milestone-section">
                      {project.milestones.map((milestone, index) => {
                        const isMilestoneExpanded = expandedMilestones.includes(`${project.id}-${index}`)
                        return (
                          <div key={`${project.id}-${index}`}>
                            <div className="flex h-10 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="w-[150px] px-2 pl-8 flex items-center">
                                <span className="text-[13px] text-gray-800 dark:text-gray-200 truncate">
                                  {milestone.name}
                                </span>
                                {milestone.completed}
                              </div>
                              <div className="w-[70px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3">
                                {milestone.details.type}
                              </div>
                              <div className="w-[80px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3">
                                {milestone.details.status.charAt(0).toUpperCase() + milestone.details.status.slice(1)}
                              </div>
                              <div className="w-[50px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3 pl-3">
                                {milestone.details.priority}
                              </div>
                              <div className="w-[50px] px-2 pt-3">
                                {/* No edit/delete for individual milestones in this version */}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">No projects in this quarter</div>
          )}
        </div>

        {/* Chart section - Scrollable horizontally */}
        <div className="flex-grow overflow-x-auto">
          <div className="relative" style={{ minWidth: `${allDays.length * 25}px` }}>
            <div className="flex border-b border-gray-300 dark:border-gray-600 sticky top-0 z-10 bg-white dark:bg-gray-800">
              {daysByMonth.map((month, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-gray-100 dark:bg-gray-700"
                  style={{ width: `${month.days.length * 25}px` }}
                >
                  <div className="h-9 flex items-center justify-center font-medium text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-600">
                    {month.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex border-b border-gray-300 dark:border-gray-600 h-8 sticky top-9 z-10 bg-white dark:bg-gray-800">
              {allDays.map((day, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[25px] flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600"
                >
                  {day.day}
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${allDays.length}, 25px)` }}>
                {allDays.map((_, index) => (
                  <div key={index} className="h-full border-r border-gray-200 dark:border-gray-600"></div>
                ))}
              </div>
              {filteredProjects.length ? (
                filteredProjects.map((project) => {
                  const isExpanded = expandedProjects.includes(project.id)
                  const projectDateline = parseDate(project.dateline)

                  return (
                    <div key={project.id} className="relative" style={{ height: `${getRowHeight(project)}px` }}>
                      {/* Project dateline red line */}
                      {projectDateline && !isNaN(projectDateline) && (
                        <div
                          className="absolute top-10 bottom-0 w-px bg-red-500 z-30"
                          style={{
                            left: `${calculatePosition(projectDateline) * 25 + 12.5}px`,
                          }}
                          title={`Project Dateline: ${projectDateline.toLocaleDateString()}`}
                        >
                          <div className="h-2 w-2 rounded-full bg-red-500 absolute top-0 -ml-1"></div>
                        </div>
                      )}

                      <div className="relative h-10"></div>

                      {isExpanded && (
                        <div className="mt-0">
                          {project.milestones.map((milestone, index) => {
                            const milestoneProgress = calculateProgress(milestone)
                            const milestoneStart = new Date(milestone.details.startDate)
                            const milestoneEnd = milestone.details.endDate
                              ? new Date(milestone.details.endDate)
                              : milestoneStart

                            return (
                              <div key={`${project.id}-${index}`} className="relative h-10">
                                {milestone.details.type === "MILESTONE" ? (
                                  <div
                                    className="absolute bg-green-500 h-5 w-5 transform z-20"
                                    style={{
                                      left: `${calculatePosition(milestoneStart) * 25}px`,
                                      top: "50%",
                                      transform: "translateY(-50%) rotate(45deg)",
                                    }}
                                    title={`${milestone.name}\nStart: ${milestoneStart.toLocaleDateString()}`}
                                  ></div>
                                ) : (
                                  <div
                                    className="absolute h-6 rounded-lg flex items-center px-2 text-white text-xs font-medium z-20 shadow-md overflow-hidden"
                                    style={{
                                      left: `${calculatePosition(milestoneStart) * 25}px`,
                                      width: `${
                                        milestone.details.endDate
                                          ? calculateWidth(milestoneStart, milestoneEnd) * 25
                                          : 25
                                      }px`,
                                      backgroundColor: milestone.details.color,
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                    }}
                                    title={`${milestone.name}\nStatus: ${milestone.details.status}\nPriority: ${
                                      milestone.details.priority
                                    }\nProgress: ${milestoneProgress}%`}
                                  >
                                    <div
                                      className="absolute top-0 left-0 bottom-0 opacity-50"
                                      style={{
                                        width: `${milestoneProgress}%`,
                                        backgroundColor: `${milestone.details.color}80`,
                                      }}
                                    ></div>
                                    <span className="z-10 relative truncate">{milestone.name}</span>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <div className="h-40 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No projects to display in this quarter
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Project Popup */}
      {showProjectPopup && (
        <div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={projectFormData.title}
                    onChange={handleProjectChange}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Dateline (DD/MM/YYYY)</label>
                  <input
                    type="text"
                    name="dateline"
                    value={projectFormData.dateline}
                    onChange={handleProjectChange}
                    placeholder="DD/MM/YYYY"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h3 className="text-lg font-medium dark:text-white mb-2">Add Milestone</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Milestone Name</label>
                    <input
                      type="text"
                      name="name"
                      value={milestoneFormData.name}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Subject</label>
                    <input
                      type="text"
                      name="details.subject"
                      value={milestoneFormData.details.subject}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Type</label>
                    <select
                      name="details.type"
                      value={milestoneFormData.details.type}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    >
                      <option value="TASK">Task</option>
                      <option value="MILESTONE">Milestone</option>
                      <option value="PHASE">Phase</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Status</label>
                    <select
                      name="details.status"
                      value={milestoneFormData.details.status}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    >
                      <option value="not-started">Not Started</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Priority</label>
                    <select
                      name="details.priority"
                      value={milestoneFormData.details.priority}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="details.startDate"
                      value={milestoneFormData.details.startDate}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">End Date</label>
                    <input
                      type="date"
                      name="details.endDate"
                      value={milestoneFormData.details.endDate}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Color</label>
                    <input
                      type="color"
                      name="details.color"
                      value={milestoneFormData.details.color}
                      onChange={handleMilestoneChange}
                      className="w-full p-1 h-10 border rounded dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Owner Name</label>
                    <input
                      type="text"
                      name="owner.name"
                      value={milestoneFormData.details.owner.name}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium dark:text-gray-300 mb-1">Owner Role</label>
                    <input
                      type="text"
                      name="owner.role"
                      value={milestoneFormData.details.owner.role}
                      onChange={handleMilestoneChange}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium dark:text-gray-300 mb-1">Completed</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="completed"
                      checked={milestoneFormData.completed}
                      onChange={handleMilestoneChange}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm dark:text-gray-300">Mark as completed</span>
                  </div>
                </div>

                <button
                  onClick={addMilestone}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Milestone
                </button>
              </div>

              {/* Display added milestones */}
              {projectFormData.milestones.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h3 className="text-lg font-medium dark:text-white mb-2">
                    {isEditing ? "Project Milestones" : "Added Milestones"}
                  </h3>
                  <div className="max-h-60 overflow-y-auto border rounded dark:border-gray-600">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {projectFormData.milestones.map((milestone, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {milestone.name}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {milestone.details.type}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {milestone.details.status.charAt(0).toUpperCase() + milestone.details.status.slice(1)}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                              <button
                                onClick={() => removeMilestone(index)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button onClick={saveProject} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {isEditing ? "Update Project" : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Confirm Delete</h2>
            <p className="mb-6 dark:text-gray-300">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
              >
                Cancel
              </button>
              <button onClick={deleteProject} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
