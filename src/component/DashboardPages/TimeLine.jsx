"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, CheckCircle } from "lucide-react"
import { IoMdNavigate } from "react-icons/io"

// Your project data structure remains unchanged
const allProjects = [
  {
    id: "540",
    title: "Venue Selection",
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
          startDate: new Date("2022-07-20"),
          endDate: new Date("2022-07-30"),
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
          startDate: new Date("2022-07-25"),
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
          id: "540-4",
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
          id: "540-5",
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-25"),
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
          id: "540-6",
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-25"),
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
          startDate: new Date("2022-07-25"),
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
          id: "540-5",
          subject: "Date Selection Report",
          type: "TASK",
          status: "completed",
          priority: "High",
          startDate: new Date("2022-07-25"),
          endDate: new Date("2022-08-05"),
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
          startDate: new Date("2022-08-01"),
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
          startDate: new Date("2022-08-10"),
          endDate: new Date("2022-08-20"),
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
          startDate: new Date("2022-08-10"),
          endDate: new Date("2022-08-20"),
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
          startDate: new Date("2022-08-10"),
          endDate: new Date("2022-08-20"),
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
          id: "541-7",
          subject: "Session Descriptions",
          type: "TASK",
          status: "not-started",
          priority: "Normal",
          startDate: new Date("2022-08-10"),
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
  const [selectedYear, setSelectedYear] = useState(2022)
  const [selectedQuarter, setSelectedQuarter] = useState(2)
  const [filteredProjects, setFilteredProjects] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  // Initialize expandedProjects with all project IDs
  const [expandedProjects, setExpandedProjects] = useState(allProjects.map((project) => project.id))

  // Initialize expandedMilestones with all milestone IDs
  const [expandedMilestones, setExpandedMilestones] = useState(() => {
    const milestoneIds = []
    allProjects.forEach((project) => {
      project.milestones.forEach((_, index) => {
        milestoneIds.push(`${project.id}-${index}`)
      })
    })
    return milestoneIds
  })

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

  const daysByMonth = months.map((month) => ({
    ...month,
    days: allDays.filter((day) => day.month === month.month && day.year === month.year),
  }))

  const calculatePosition = (date) => {
    if (!date || isNaN(date)) return 0
    const diffTime = Math.abs(date - startDate)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateWidth = (startDate, endDate) => {
    if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) return 1
    const diffTime = Math.abs(endDate - startDate)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const calculateProgress = (startDate, endDate) => {
    if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate)) return 0
    const today = new Date()

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

  const toggleProjectDetails = (projectId) => {
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

  const today = new Date()
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
        <div className="w-[450px] flex-shrink-0 border-r border-gray-300 dark:border-gray-600 sticky left-0 z-20 bg-white dark:bg-gray-800">
          <div className="flex bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 sticky top-0 z-30">
            <div className="w-[150px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Subject</div>
            <div className="w-[70px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Type</div>
            <div className="w-[80px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Status</div>
            <div className="w-[50px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Priority</div>
            <div className="w-[50px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Owner</div>
          </div>
          <div className="h-8 border-b border-gray-300 dark:border-gray-600"></div>

          {filteredProjects.length ? (
            filteredProjects.map((project) => {
              const isExpanded = expandedProjects.includes(project.id)

              return (
                <div key={project.id} style={{ height: `${getRowHeight(project)}px` }}>
                  {/* Main Project Row */}
                  <div className="flex items-center h-10 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <div className="w-[150px] px-2 pl-2 flex items-center">
                      <button
                        onClick={() => toggleProjectDetails(project.id)}
                        className="focus:outline-none mr-1 font-bold"
                      >
                        {isExpanded ? (
                          <IoMdNavigate className="h-4 w-4 text-blue-900 dark:text-blue-900 rotate-180 cursor-pointer" />
                        ) : (
                          <IoMdNavigate className="h-4 w-4 text-blue-900 dark:text-blue-900 rotate-270 cursor-pointer" />
                        )}
                      </button>
                      <span className="text-[13px] text-gray-800 dark:text-gray-200 truncate font-bold">
                        {project.title}
                      </span>
                    </div>
                    <div className="w-[70px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3"></div>
                    <div className="w-[80px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3"></div>
                    <div className="w-[50px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3"></div>
                    <div className="w-[50px] px-2 pt-3"></div>
                  </div>

                  {/* Milestones Section */}
                  {isExpanded && (
                    <div className="milestone-section">
                      {project.milestones.map((milestone, index) => {
                        const isMilestoneExpanded = expandedMilestones.includes(`${project.id}-${index}`)
                        return (
                          <div key={index}>
                            <div className="flex h-10 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="w-[150px] px-2 pl-8 flex items-center">
                                <span className="text-[13px] text-gray-800 dark:text-gray-200 truncate">
                                  {milestone.name}
                                </span>
                              </div>
                              <div className="w-[70px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3">
                                {milestone.details.type}
                              </div>
                              <div className="w-[80px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3">
                                {milestone.details.status.charAt(0).toUpperCase() + milestone.details.status.slice(1)}
                              </div>
                              <div className="w-[50px] px-2 text-xs text-gray-600 dark:text-gray-300 pt-3">
                                {milestone.details.priority}
                              </div>
                              <div className="w-[50px] px-2 pt-3">
                                <img
                                  src={milestone.details.owner.avatar || "/placeholder.svg"}
                                  alt={milestone.details.owner.name}
                                  className="h-6 w-6 rounded-full"
                                />
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
              {isCurrentQuarter && (
                <div
                  className="absolute top-0 bottom-0 w-px bg-red-500 dark:bg-red-400 z-10"
                  style={{ left: `${todayPosition * 25 + 12.5}px` }}
                ></div>
              )}
              {filteredProjects.length ? (
                filteredProjects.map((project) => {
                  const isExpanded = expandedProjects.includes(project.id)

                  return (
                    <div key={project.id} className="relative" style={{ height: `${getRowHeight(project)}px` }}>
                      <div className="relative h-10">
                        {/* No project bar, just the title in the table section */}
                      </div>

                      {/* Milestones */}
                      {isExpanded && (
                        <div className="mt-0">
                          {project.milestones.map((milestone, index) => {
                            const milestoneProgress = milestone.details.endDate
                              ? calculateProgress(milestone.details.startDate, milestone.details.endDate)
                              : 0

                            return (
                              <div key={index} className="relative h-10">
                                {milestone.details.type === "MILESTONE" ? (
                                  <div
                                    className="absolute bg-green-500 h-5 w-5 transform  z-20"
                                    style={{
                                      left: `${calculatePosition(milestone.details.startDate) * 25 + 4}px`,
                                      top: "50%",
                                      transform: "translateY(-50%) rotate(45deg)",
                                    }}
                                    title={`${milestone.name}\nStart: ${milestone.details.startDate.toLocaleDateString()}`}
                                  ></div>
                                ) : (
                                  <div
                                    className="absolute h-6 rounded-lg flex items-center px-2 text-white text-xs font-medium z-20 shadow-md overflow-hidden -ml-6"
                                    style={{
                                      left: `${calculatePosition(milestone.details.startDate) * 25}px`,
                                      width: `${calculateWidth(milestone.details.startDate, milestone.details.endDate) * 25}px`,
                                      backgroundColor: milestone.details.color,
                                      top: "50%",
                                      transform: "translateY(-50%)",
                                    }}
                                    title={`${milestone.name}\nStatus: ${milestone.details.status}\nPriority: ${milestone.details.priority}\nProgress: ${milestoneProgress}%`}
                                  >
                                    <div
                                      className="absolute top-0 left-0 bottom-0 opacity-50"
                                      style={{
                                        width: `${milestoneProgress}%`,
                                        backgroundColor: milestone.details.color,
                                      }}
                                    ></div>
                                    <span className="z-10 relative">
                                      {milestone.name}
                                      {milestone.completed && <CheckCircle className="h-3 w-3 ml-1 inline" />}
                                    </span>
                                  </div>
                                )}

                                {/* Milestone deadline marker */}
                                {milestone.details.deadline && (
                                  <div
                                    className="absolute top-0 bottom-0 w-px bg-red-500 z-30"
                                    style={{
                                      left: `${calculatePosition(milestone.details.deadline) * 25}px`,
                                    }}
                                    title={`Deadline: ${milestone.details.deadline.toLocaleDateString()}`}
                                  >
                                    <div className="h-2 w-2 rounded-full bg-red-500 absolute top-5 -ml-1"></div>
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
    </div>
  )
}