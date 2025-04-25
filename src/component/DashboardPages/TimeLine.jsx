"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

// Sample data
const allProjects = [
  {
    id: "539",
    subject: "Organize OpenProject summit",
    type: "PHASE",
    status: "In progress",
    priority: "Normal",
    startDate: new Date("2022-09-10"),
    endDate: new Date("2022-10-15"),
    color: "#2c5cc5", // Blue color
  },
  {
    id: "540",
    subject: "Find date and location",
    type: "TASK",
    status: "In progress",
    priority: "High",
    startDate: new Date("2022-09-20"),
    endDate: new Date("2022-09-30"),
    color: "#4dabf7", // Light blue color
  },
  {
    id: "541",
    subject: "Prepare agenda",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-10-01"),
    endDate: new Date("2022-10-10"),
    color: "#4dabf7", // Light blue color
  },
  {
    id: "543",
    subject: "Research venues",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2022-09-20"),
    color: "#4dabf7", // Light blue color
  },
  {
    id: "544",
    subject: "Create marketing materials",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-10-05"),
    endDate: new Date("2022-10-15"),
    color: "#4dabf7", // Light blue color
  },
  {
    id: "545",
    subject: "Send invitations",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-10-10"),
    endDate: new Date("2022-10-25"),
    color: "#4dabf7", // Light blue color
  },
  {
    id: "546",
    subject: "Book speakers",
    type: "TASK",
    status: "New",
    priority: "Normal",
    startDate: new Date("2022-09-10"),
    endDate: new Date("2022-09-23"),
    color: "#4dabf7", // Light blue color
  },
  // Adding projects for other quarters
  {
    id: "547",
    subject: "Q1 Planning Session",
    type: "PHASE",
    status: "Completed",
    priority: "High",
    startDate: new Date("2022-01-10"),
    endDate: new Date("2022-01-20"),
    color: "#2c5cc5",
  },
  {
    id: "548",
    subject: "Q2 Strategy Meeting",
    type: "PHASE",
    status: "Completed",
    priority: "Normal",
    startDate: new Date("2022-04-05"),
    endDate: new Date("2022-04-15"),
    color: "#2c5cc5",
  },
  {
    id: "549",
    subject: "Mid-year Review",
    type: "TASK",
    status: "Completed",
    priority: "High",
    startDate: new Date("2022-06-10"),
    endDate: new Date("2022-06-20"),
    color: "#4dabf7",
  },
  {
    id: "550",
    subject: "Year-end Planning",
    type: "PHASE",
    status: "Planned",
    priority: "High",
    startDate: new Date("2022-12-01"),
    endDate: new Date("2022-12-15"),
    color: "#2c5cc5",
  },
]

// Milestone data
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
    <div className="w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      {/* Header with title and filters */}
      <div className=" bg-[#00308F] text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Project Timeline</h1>
            <p className="text-blue-100 text-sm mt-1">Track project progress and milestones</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-blue-700 rounded-md p-2">
              <Calendar className="h-4 w-4 mr-2" />
              <select
                className="bg-transparent text-white text-sm focus:outline-none"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year} className="text-gray-800">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quarter navigation */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {quarters[selectedQuarter].name} {selectedYear}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={prevQuarter} className="p-1 rounded hover:bg-gray-200" title="Previous Quarter">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md font-medium">
            {quarters[selectedQuarter].name}
          </div>
          <button onClick={nextQuarter} className="p-1 rounded hover:bg-gray-200" title="Next Quarter">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Table section */}
        <div className="w-[400px] flex-shrink-0 border-r border-gray-300">
          {/* Header */}
          <div className="flex bg-gray-100 border-b border-gray-300">
            <div className="w-[200px] p-2 font-medium text-gray-700 text-sm">Project Name</div>
            {/* <div className="w-[70px] p-2 font-medium text-gray-700 text-sm">TYPE</div> */}
            <div className="w-[70px] p-2 font-medium text-gray-700 text-sm">STATUS</div>
            <div className="w-[60px] p-2 font-medium text-gray-700 text-sm">PRIORITY</div>

          </div>

          {/* Empty row to align with days */}
          <div className="h-8 border-b border-gray-300"></div>

          {/* Table rows */}
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="flex items-center h-10 border-b border-gray-300 hover:bg-gray-50">
                <div className="w-[200px] px-2 flex items-center ">
                  <span className="text-[13px]">{project.subject}</span>
                </div>
                {/* <div className="w-[70px] px-2">
                  {project.type && (
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${project.type === "PHASE" ? "bg-blue-100 text-blue-800" : "bg-cyan-100 text-cyan-800"
                        }`}
                    >
                      {project.type}
                    </span>
                  )}
                </div> */}
                <div className="w-[70px] px-2">
                  {project.status && (
                    <div className="flex items-center">
                      
                      <span className="text-xs">{project.status}</span>
                    </div>
                  )}
                </div>
                <div className="w-[60px] px-2">
                  {project.priority && (
                    <div className="flex items-center">
                      
                      <span className="text-xs">{project.priority}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No projects in this quarter</div>
          )}
        </div>

        {/* Timeline section */}
        <div className="flex-grow overflow-x-auto">
          {/* Months header */}
          <div className="flex border-b border-gray-300">
            {daysByMonth.map((month, monthIndex) => (
              <div
                key={monthIndex}
                className="flex-shrink-0 bg-gray-100"
                style={{ width: `${month.days.length * 25}px` }}
              >
                <div className="h-9 flex items-center justify-center font-medium text-gray-700 border-r border-gray-300">
                  {month.name}
                </div>
              </div>
            ))}
          </div>

          {/* Days header */}
          <div className="flex border-b border-gray-300 h-8">
            {allDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="flex-shrink-0 w-[25px] flex items-center justify-center text-xs text-gray-600 border-r border-gray-200"
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
                <div key={index} className="h-full border-r border-gray-200"></div>
              ))}
            </div>

            {/* Today marker (red vertical line) */}
            {isCurrentQuarter && (
              <div
                className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
                style={{ left: `${todayPosition * 25 + 12.5}px` }}
              ></div>
            )}

            {/* Empty rows for no projects case */}
            {filteredProjects.length === 0 && (
              <div className="h-40 flex items-center justify-center text-gray-500">
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
                <div key={project.id} className="h-10 border-b border-gray-300 relative hover:bg-gray-50">
                  {/* Project bar */}
                  <div
                    className="absolute h-6 rounded flex items-center px-2 text-white text-xs font-medium z-20"
                    style={{
                      left: `${left}px`,
                      width: `${width}px`,
                      backgroundColor: project.color,
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
