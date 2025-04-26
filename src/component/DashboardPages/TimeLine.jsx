"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Link2, FileText, Flag } from "lucide-react"

const allProjects = [
  {
    id: "539",
    subject: "Organize OpenProject summit",
    type: "PHASE",
    status: "progress",
    priority: "Normal",
    startDate: new Date("2022-07-10"),
    endDate: new Date("2022-09-15"),
    color: "#00308F",
    owner: {
      name: "Sarah Johnson",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
      role: "Project Manager",
    },
    description: "Organize and execute the annual OpenProject summit for team members and stakeholders",
    deliverables: [
      { id: "d1", name: "Venue Selection", status: "completed", link: "#" },
      { id: "d2", name: "Agenda Planning", status: "in-progress", link: "#" },
      { id: "d3", name: "Speaker Invitations", status: "in-progress", link: "#" },
    ],
    dependencies: [],
  },
  {
    id: "540",
    subject: "Find date and location",
    type: "TASK",
    status: "progress",
    priority: "High",
    startDate: new Date("2022-07-20"),
    endDate: new Date("2022-08-10"),
    color: "#00308F",
    owner: {
      name: "Michael Chen",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
      role: "Event Coordinator",
    },
    description: "Research and select appropriate dates and venues for the summit",
    deliverables: [
      { id: "d4", name: "Venue Options Document", status: "completed", link: "#" },
      { id: "d5", name: "Date Selection Report", status: "completed", link: "#" },
    ],
    dependencies: ["539"],
  },
  {
    id: "541",
    subject: "Prepare agenda",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-01"),
    endDate: new Date("2022-08-20"),
    color: "#00308F",
    owner: {
      name: "Jessica Lee",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
      role: "Content Manager",
    },
    description: "Create detailed agenda for all summit days including workshops and presentations",
    deliverables: [
      { id: "d6", name: "Draft Agenda", status: "in-progress", link: "#" },
      { id: "d7", name: "Session Descriptions", status: "not-started", link: "#" },
    ],
    dependencies: ["540"],
  },
  {
    id: "543",
    subject: "Research venues",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-07-05"),
    endDate: new Date("2022-07-25"),
    color: "#00308F",
    owner: {
      name: "David Kim",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
      role: "Logistics Coordinator",
    },
    description: "Research potential venues that meet capacity and technical requirements",
    deliverables: [{ id: "d8", name: "Venue Comparison Sheet", status: "completed", link: "#" }],
    dependencies: ["539"],
  },
  {
    id: "544",
    subject: "Create marketing materials",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-15"),
    endDate: new Date("2022-09-05"),
    color: "#00308F",
    owner: {
      name: "Emma Wilson",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
      role: "Marketing Specialist",
    },
    description: "Design and produce all marketing materials for the summit",
    deliverables: [
      { id: "d9", name: "Event Brochure", status: "not-started", link: "#" },
      { id: "d10", name: "Social Media Assets", status: "not-started", link: "#" },
    ],
    dependencies: ["541"],
  },
  {
    id: "545",
    subject: "Send invitations",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-25"),
    endDate: new Date("2022-09-10"),
    color: "#00308F",
    owner: {
      name: "Carlos Rodriguez",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
      role: "Communications Lead",
    },
    description: "Send out invitations to all participants and track responses",
    deliverables: [
      { id: "d11", name: "Invitation Template", status: "not-started", link: "#" },
      { id: "d12", name: "Attendee Tracking Sheet", status: "not-started", link: "#" },
    ],
    dependencies: ["544"],
  },
]

const allMilestones = [
  {
    date: new Date("2022-09-05"),
    title: "Project management workshop",
    description: "Workshop focusing on project management methodologies",
    owner: {
      name: "Sarah Johnson",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
      role: "Project Manager",
    },
    deliverables: [{ id: "md1", name: "Workshop Materials", status: "in-progress", link: "#" }],
  },
  {
    date: new Date("2022-09-25"),
    title: "Core conference",
    description: "Main conference event with keynote speakers and breakout sessions",
    owner: {
      name: "Michael Chen",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/people/kitchen-bar.jpg",
      role: "Event Coordinator",
    },
    deliverables: [
      { id: "md2", name: "Conference Schedule", status: "not-started", link: "#" },
      { id: "md3", name: "Speaker Profiles", status: "not-started", link: "#" },
    ],
  },
  {
    date: new Date("2022-10-10"),
    title: "OpenProject Summit",
    description: "Annual summit bringing together all project stakeholders",
    owner: {
      name: "Jessica Lee",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
      role: "Content Manager",
    },
    deliverables: [{ id: "md4", name: "Summit Agenda", status: "not-started", link: "#" }],
  },
  {
    date: new Date("2022-08-11"),
    title: "Pre-conference Meeting",
    description: "Final planning meeting before the conference",
    owner: {
      name: "David Kim",
      avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
      role: "Logistics Coordinator",
    },
    deliverables: [
      { id: "md5", name: "Meeting Minutes", status: "not-started", link: "#" },
      { id: "md6", name: "Action Items", status: "not-started", link: "#" },
    ],
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
  const [selectedYear, setSelectedYear] = useState(2022)
  const [selectedQuarter, setSelectedQuarter] = useState(2)
  const [filteredProjects, setFilteredProjects] = useState([])
  const [filteredMilestones, setFilteredMilestones] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showProjectDetails, setShowProjectDetails] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showMilestoneDetails, setShowMilestoneDetails] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState(null)

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
      const projectStart = new Date(project.startDate)
      const projectEnd = new Date(project.endDate)

      return (
        (projectStart.getFullYear() === selectedYear || projectEnd.getFullYear() === selectedYear) &&
        ((projectStart.getMonth() >= quarterStartMonth && projectStart.getMonth() <= quarterEndMonth) ||
          (projectEnd.getMonth() >= quarterStartMonth && projectEnd.getMonth() <= quarterEndMonth) ||
          (projectStart.getMonth() < quarterStartMonth && projectEnd.getMonth() > quarterEndMonth))
      )
    })

    const milestones = allMilestones.filter((milestone) => {
      const milestoneDate = new Date(milestone.date)
      return (
        milestoneDate.getFullYear() === selectedYear &&
        milestoneDate.getMonth() >= quarterStartMonth &&
        milestoneDate.getMonth() <= quarterEndMonth
      )
    })

    setFilteredProjects(projects)
    setFilteredMilestones(milestones)
  }, [selectedYear, selectedQuarter])

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

  const daysByMonth = months.map((month) => {
    return {
      ...month,
      days: allDays.filter((day) => day.month === month.month && day.year === month.year),
    }
  })

  const calculatePosition = (date) => {
    const diffTime = Math.abs(date - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const calculateWidth = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
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

  const openProjectDetails = (project) => {
    setSelectedProject(project)
    setShowProjectDetails(true)
  }

  const openMilestoneDetails = (milestone) => {
    setSelectedMilestone(milestone)
    setShowMilestoneDetails(true)
  }

  const getStatusStyle = (status) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("complete")) {
      return "bg-green-500 text-white px-2 py-1 rounded text-xs"
    } else if (statusLower.includes("progress") || statusLower.includes("progress")) {
      return "bg-blue-500 text-white px-2 py-1 rounded text-xs"
    } else if (statusLower.includes("not") || statusLower === "new") {
      return "bg-gray-500 text-white px-2 py-1 rounded text-xs"
    }
    return "bg-gray-500 text-white px-2 py-1 rounded text-xs"
  }

  const today = new Date()
  const isCurrentQuarter = today >= startDate && today <= endDate
  const todayPosition = isCurrentQuarter ? calculatePosition(today) : -1

  // Limit to 10 projects
  const displayedProjects = filteredProjects.slice(0, 10)

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      {/* Header with title and filters */}
      <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Project Timeline</h1>
            <p className="text-blue-100 dark:text-blue-200 text-sm mt-1">
              Track project progress, milestones, and deliverables
            </p>
          </div>
          <div className="flex items-center space-x-4">
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

      {/* Quarter navigation */}
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

      <div className="flex
       h-[35vh]
       ">
        {/* Table section */}
        <div className="w-[400px] flex-shrink-0 border-r border-gray-300 dark:border-gray-600 overflow-y-auto">
          {/* Header */}
          <div className="flex bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 sticky top-0 z-10">
            <div className="w-[200px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Project Name</div>
            <div className="w-[70px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Status</div>
            <div className="w-[60px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Priority</div>
            <div className="w-[70px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Owner</div>
          </div>

          {/* Empty row to align with days */}
          <div className="h-8 border-b border-gray-300 dark:border-gray-600"></div>

          {/* Table rows - Limited to 10 projects */}
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center h-10 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => openProjectDetails(project)}
              >
                <div className="w-[200px] px-2 flex items-center">
                  <span className="text-[13px] text-gray-800 dark:text-gray-200">{project.subject}</span>
                </div>
                <div className="w-[70px] px-2">
                  {project.status && (
                    <span className="text-xs text-gray-600 dark:text-gray-300">{project.status}</span>
                  )}
                </div>
                <div className="w-[60px] px-2">
                  {project.priority && (
                    <span className="text-xs text-gray-600 dark:text-gray-300">{project.priority}</span>
                  )}
                </div>
                <div className="w-[70px] px-2">
                  <img
                    src={project.owner.avatar || "/placeholder.svg"}
                    alt={project.owner.name}
                    className="h-6 w-6 rounded-full"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">No projects in this quarter</div>
          )}
        </div>

        {/* Timeline section */}
        <div className="flex-grow overflow-x-auto overflow-y-auto">
          {/* Months header */}
          <div className="flex border-b border-gray-300 dark:border-gray-600 sticky top-0 z-10 bg-white dark:bg-gray-800">
            {daysByMonth.map((month, monthIndex) => (
              <div
                key={monthIndex}
                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700"
                style={{ width: `${month.days.length * 25}px` }}
              >
                <div className="h-9 flex items-center justify-center font-medium text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-600">
                  {month.name}
                </div>
              </div>
            ))}
          </div>

          {/* Days header */}
          <div className="flex border-b border-gray-300 dark:border-gray-600 h-8 sticky top-9 z-10 bg-white dark:bg-gray-800">
            {allDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="flex-shrink-0 w-[25px] flex items-center justify-center text-xs text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600"
              >
                {day.day}
              </div>
            ))}
          </div>

          {/* Timeline grid with bars */}
          <div className="relative">
            {/* Background grid */}
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${allDays.length}, 25px)` }}>
              {allDays.map((_, index) => (
                <div key={index} className="h-full border-r border-gray-200 dark:border-gray-600"></div>
              ))}
            </div>

            {/* Today marker (red vertical line) */}
            {isCurrentQuarter && (
              <div
                className="absolute top-0 bottom-0 w-px bg-red-500 dark:bg-red-400 z-10"
                style={{ left: `${todayPosition * 25 + 12.5}px` }}
              ></div>
            )}

            {/* Empty rows for no projects case */}
            {displayedProjects.length === 0 && (
              <div className="h-40 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No projects to display in this quarter
              </div>
            )}

            {/* Project rows - Limited to 10 projects */}
            {displayedProjects.map((project, index) => {
              const projectStart = new Date(Math.max(project.startDate, startDate))
              const projectEnd = new Date(Math.min(project.endDate, endDate))

              const left = calculatePosition(projectStart) * 25
              const width = calculateWidth(projectStart, projectEnd) * 25

              return (
                <div key={project.id} className="h-10 relative">
                  <div
                    className="absolute h-6 rounded flex items-center px-2 text-white text-xs font-medium z-20 cursor-pointer"
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: project.color === "#00308F" ? "#4A6CF7" : project.color,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => openProjectDetails(project)}
                    title={`${project.subject}\nStatus: ${project.status}\nOwner: ${project.owner.name}\n${project.startDate.toLocaleDateString()} - ${project.endDate.toLocaleDateString()}`}
                  >
                    {project.subject}
                  </div>
                </div>
              )
            })}

            
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{selectedProject.subject}</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProject.owner.avatar || "/placeholder.svg"}
                  alt={selectedProject.owner.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{selectedProject.owner.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedProject.owner.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Status</p>
                  <span className={getStatusStyle(selectedProject.status)}>{selectedProject.status}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Priority</p>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.priority}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Start Date</p>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.startDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">End Date</p>
                  <p className="text-gray-600 dark:text-gray-300">{selectedProject.endDate.toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Description</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedProject.description}</p>
              </div>

              {selectedProject.dependencies && selectedProject.dependencies.length > 0 && (
                <div>
                  <p className="font-medium flex items-center gap-1 text-gray-800 dark:text-gray-200">
                    <Link2 className="w-4 h-4" /> Dependencies
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedProject.dependencies.map((depId) => {
                      const dep = allProjects.find((p) => p.id === depId)
                      return (
                        <span
                          key={depId}
                          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs text-gray-600 dark:text-gray-300"
                        >
                          {dep ? dep.subject : `Task #${depId}`}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
                <div>
                  <p className="font-medium flex items-center gap-1 text-gray-800 dark:text-gray-200">
                    <FileText className="w-4 h-4" /> Deliverables
                  </p>
                  <div className="space-y-2 mt-2">
                    {selectedProject.deliverables.map((deliverable) => (
                      <div
                        key={deliverable.id}
                        className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-300">{deliverable.name}</span>
                        <span className={getStatusStyle(deliverable.status)}>{deliverable.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowProjectDetails(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestone Details Modal */}
      {showMilestoneDetails && selectedMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{selectedMilestone.title}</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedMilestone.owner.avatar || "/placeholder.svg"}
                  alt={selectedMilestone.owner.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{selectedMilestone.owner.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMilestone.owner.role}</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Date</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMilestone.date.toLocaleDateString()}</p>
              </div>

              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Description</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMilestone.description}</p>
              </div>

              {selectedMilestone.deliverables && selectedMilestone.deliverables.length > 0 && (
                <div>
                  <p className="font-medium flex items-center gap-1 text-gray-800 dark:text-gray-200">
                    <Flag className="w-4 h-4" /> Deliverables
                  </p>
                  <div className="space-y-2 mt-2">
                    {selectedMilestone.deliverables.map((deliverable) => (
                      <div
                        key={deliverable.id}
                        className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-300">{deliverable.name}</span>
                        <span className={getStatusStyle(deliverable.status)}>{deliverable.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowMilestoneDetails(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}