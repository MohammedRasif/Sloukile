"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

// Sample data (unchanged)
const allProjects = [
  {
    id: "539",
    subject: "Organize OpenProject summit",
    type: "PHASE",
    status: "In progress",
    priority: "Normal",
    startDate: new Date("2022-07-10"),
    endDate: new Date("2022-09-15"),
    color: "#00308F",
  },
  {
    id: "540",
    subject: "Find date and location",
    type: "TASK",
    status: "In progress",
    priority: "High",
    startDate: new Date("2022-07-20"),
    endDate: new Date("2022-08-10"),
    color: "#00308F",
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
  },
  {
    id: "546",
    subject: "Book speakers",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-07-15"),
    endDate: new Date("2022-08-05"),
    color: "#00308F",
  },
  {
    id: "547",
    subject: "Plan catering",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-10"),
    endDate: new Date("2022-08-30"),
    color: "#00308F",
  },
  {
    id: "548",
    subject: "Design event logo",
    type: "TASK",
    status: "In progress",
    priority: "High",
    startDate: new Date("2022-07-01"),
    endDate: new Date("2022-07-20"),
    color: "#00308F",
  },
  {
    id: "549",
    subject: "Setup registration portal",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-05"),
    endDate: new Date("2022-08-25"),
    color: "#00308F",
  },
  {
    id: "550",
    subject: "Coordinate volunteers",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-20"),
    endDate: new Date("2022-09-15"),
    color: "#00308F",
  },
  {
    id: "551",
    subject: "Develop workshop materials",
    type: "TASK",
    status: "In progress",
    priority: "Normal",
    startDate: new Date("2022-07-25"),
    endDate: new Date("2022-08-15"),
    color: "#00308F",
  },
  {
    id: "552",
    subject: "Secure sponsorships",
    type: "TASK",
    status: "New",
    priority: "High",
    startDate: new Date("2022-07-10"),
    endDate: new Date("2022-08-01"),
    color: "#00308F",
  },
  {
    id: "553",
    subject: "Plan keynote sessions",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-15"),
    endDate: new Date("2022-09-01"),
    color: "#00308F",
  },
  {
    id: "554",
    subject: "Book accommodation",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-07-20"),
    endDate: new Date("2022-08-10"),
    color: "#00308F",
  },
  {
    id: "555",
    subject: "Arrange transportation",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-01"),
    endDate: new Date("2022-08-20"),
    color: "#00308F",
  },
  {
    id: "556",
    subject: "Create event app",
    type: "TASK",
    status: "In progress",
    priority: "High",
    startDate: new Date("2022-07-15"),
    endDate: new Date("2022-08-05"),
    color: "#00308F",
  },
  {
    id: "557",
    subject: "Setup AV equipment",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-25"),
    endDate: new Date("2022-09-10"),
    color: "#00308F",
  },
  {
    id: "558",
    subject: "Plan networking events",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-10"),
    endDate: new Date("2022-08-30"),
    color: "#00308F",
  },
  {
    id: "559",
    subject: "Develop feedback forms",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-20"),
    endDate: new Date("2022-09-05"),
    color: "#00308F",
  },
  {
    id: "560",
    subject: "Create signage",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-05"),
    endDate: new Date("2022-08-25"),
    color: "#00308F",
  },
  {
    id: "561",
    subject: "Plan security measures",
    type: "TASK",
    status: "New",
    priority: "High",
    startDate: new Date("2022-07-25"),
    endDate: new Date("2022-08-15"),
    color: "#00308F",
  },
  {
    id: "562",
    subject: "Organize team briefing",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-15"),
    endDate: new Date("2022-09-01"),
    color: "#00308F",
  },
  {
    id: "563",
    subject: "Setup ticketing system",
    type: "TASK",
    status: "In progress",
    priority: "Normal",
    startDate: new Date("2022-07-10"),
    endDate: new Date("2022-07-30"),
    color: "#00308F",
  },
  {
    id: "564",
    subject: "Finalize event schedule",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-08-10"),
    endDate: new Date("2022-09-05"),
    color: "#00308F",
  },
]

// Milestone data (unchanged)
const allMilestones = [
  {
    date: new Date("2022-09-05"),
    title: "Project management workshop",
  },
  {
    date: new Date("2022-09-25"),
    title: "Core conference",
  },
  {
    date: new Date("2022-10-10"),
    title: "OpenProject Summit",
  },
  {
    date: new Date("2022-10-25"),
    title: "Post-conference",
  },
  {
    date: new Date("2022-04-30"),
    title: "Q2 Kickoff",
  },
  {
    date: new Date("2022-03-12"),
    title: "Q1 Review",
  },
  {
    date: new Date("2022-08-11"),
    title: "Pre-conference Meeting",
  },
  {
    date: new Date("2022-01-09"),
    title: "Annual Planning",
  },
  {
    date: new Date("2022-03-15"),
    title: "Budget Approval",
  },
  {
    date: new Date("2022-12-20"),
    title: "Year-end Review",
  },
]

// Available years in the data
const availableYears = [2021, 2022, 2023]

// Quarters definition
const quarters = [
  { name: "Q1", months: [0, 1, 2] }, // Jan, Feb, Mar
  { name: "Q2", months: [3, 4, 5] }, // Apr, May, Jun
  { name: "Q3", months: [6, 7, 8] }, // Jul, Aug, Sep
  { name: "Q4", months: [9, 10, 11] }, // Oct, Nov, Dec
]

export default function GanttChart() {
  // State for filtering
  const [selectedYear, setSelectedYear] = useState(2022)
  const [selectedQuarter, setSelectedQuarter] = useState(2) // Default to Q3 (0-based index)

  // Filter projects and milestones based on selected year and quarter
  const [filteredProjects, setFilteredProjects] = useState([])
  const [filteredMilestones, setFilteredMilestones] = useState([])

  // Date range for the current view
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  // Update filtered data when year or quarter changes
  useEffect(() => {
    const currentQuarter = quarters[selectedQuarter]
    const quarterStartMonth = currentQuarter.months[0]
    const quarterEndMonth = currentQuarter.months[2]

    const newStartDate = new Date(selectedYear, quarterStartMonth, 1)
    const newEndDate = new Date(selectedYear, quarterEndMonth + 1, 0) // Last day of the end month

    setStartDate(newStartDate)
    setEndDate(newEndDate)

    // Filter projects that fall within the selected quarter
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

    // Filter milestones that fall within the selected quarter
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

  // Generate months for the timeline
  const months = []
  let currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const monthName = currentDate.toLocaleString("en-US", { month: "short" })
    const year = currentDate.getFullYear()
    months.push({ name: `${monthName} ${year}`, month: currentDate.getMonth(), year })
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  }

  // Generate all days for the timeline
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

  // Group days by month
  const daysByMonth = months.map((month) => {
    return {
      ...month,
      days: allDays.filter((day) => day.month === month.month && day.year === month.year),
    }
  })

  // Calculate position for bars and milestones
  const calculatePosition = (date) => {
    const diffTime = Math.abs(date - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Calculate width for bars
  const calculateWidth = (startDate, endDate) => {
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  // Navigate to previous quarter
  const prevQuarter = () => {
    if (selectedQuarter > 0) {
      setSelectedQuarter(selectedQuarter - 1)
    } else {
      setSelectedQuarter(3) // Go to Q4
      setSelectedYear(selectedYear - 1)
    }
  }

  // Navigate to next quarter
  const nextQuarter = () => {
    if (selectedQuarter < 3) {
      setSelectedQuarter(selectedQuarter + 1)
    } else {
      setSelectedQuarter(0) // Go to Q1
      setSelectedYear(selectedYear + 1)
    }
  }

  // Today's date for the red line
  const today = new Date()
  const isCurrentQuarter = today >= startDate && today <= endDate
  const todayPosition = isCurrentQuarter ? calculatePosition(today) : -1

  return (
    <div className="w-full bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-600 shadow-sm rounded-lg overflow-hidden">
      {/* Header with title and filters */}
      <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Project Timeline</h1>
            <p className="text-blue-100 dark:text-blue-200 text-sm mt-1">Track project progress and milestones</p>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer">
            <div className="flex items-center bg-blue-700 dark:bg-[#3B5AEB] rounded-md p-2 cursor-pointer">
              <Calendar className="h-4 w-4 mr-2 cursor-pointer" />
              <select
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year} className="text-gray-800 dark:text-gray-200 cursor-pointer">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quarter navigation */}
      <div className="bg-gray-50 dark:bg-[#2A2F3B] border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {quarters[selectedQuarter].name} {selectedYear}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={prevQuarter} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-[#353A47]" title="Previous Quarter">
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="bg-blue-50 dark:bg-[#3B5AEB] text-blue-800 dark:text-blue-200 px-3 py-1 rounded-md font-medium">
            {quarters[selectedQuarter].name}
          </div>
          <button onClick={nextQuarter} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-[#353A47]" title="Next Quarter">
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Table section */}
        <div className="w-[400px] flex-shrink-0 border-r border-gray-300 dark:border-gray-600">
          {/* Header */}
          <div className="flex bg-gray-100 dark:bg-[#2A2F3B] border-b border-gray-300 dark:border-gray-600">
            <div className="w-[200px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Project Name</div>
            <div className="w-[70px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Status</div>
            <div className="w-[60px] p-2 font-medium text-gray-700 dark:text-gray-200 text-sm">Priority</div>
          </div>

          {/* Empty row to align with days */}
          <div className="h-8 border-b border-gray-300 dark:border-gray-600"></div>

          {/* Table rows */}
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="flex items-center h-10 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#353A47]">
                <div className="w-[200px] px-2 flex items-center">
                  <span className="text-[13px] text-gray-800 dark:text-gray-200">{project.subject}</span>
                </div>
                <div className="w-[70px] px-2">
                  {project.status && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">{project.status}</span>
                    </div>
                  )}
                </div>
                <div className="w-[60px] px-2">
                  {project.priority && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600 dark:text-gray-300">{project.priority}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">No projects in this quarter</div>
          )}
        </div>

        {/* Timeline section */}
        <div className="flex-grow overflow-x-auto">
          {/* Months header */}
          <div className="flex border-b border-gray-300 dark:border-gray-600">
            {daysByMonth.map((month, monthIndex) => (
              <div
                key={monthIndex}
                className="flex-shrink-0 bg-gray-100 dark:bg-[#2A2F3B]"
                style={{ width: `${month.days.length * 25}px` }}
              >
                <div className="h-9 flex items-center justify-center font-medium text-gray-700 dark:text-gray-200 border-r border-gray-300 dark:border-gray-600">
                  {month.name}
                </div>
              </div>
            ))}
          </div>

          {/* Days header */}
          <div className="flex border-b border-gray-300 dark:border-gray-600 h-8">
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
            {filteredProjects.length === 0 && (
              <div className="h-40 flex items-center justify-center text-gray-500 dark:text-gray-400">
                No projects to display in this quarter
              </div>
            )}

            {/* Project rows */}
            {filteredProjects.map((project, index) => {
              // Calculate position relative to the current view
              const projectStart = new Date(Math.max(project.startDate, startDate))
              const projectEnd = new Date(Math.min(project.endDate, endDate))

              const left = calculatePosition(projectStart) * 25
              const width = calculateWidth(projectStart, projectEnd) * 25

              return (
                <div key={project.id} className="h-10 relative">
                  {/* Project bar */}
                  <div
                    className="absolute h-6 rounded flex items-center px-2 text-white text-xs font-medium z-20"
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: project.color === "#00308F" ? "#4A6CF7" : project.color, // Use #4A6CF7 in dark mode
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {project.subject}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}