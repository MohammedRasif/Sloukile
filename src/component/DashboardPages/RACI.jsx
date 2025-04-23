"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"

const RACICell = ({ value }) => {
  const getStyle = (val) => {
    switch (val) {
      case "R":
        return "bg-blue-500 text-white"
      case "A":
        return "bg-blue-600 text-white"
      case "C":
        return "bg-orange-400 text-white"
      case "I":
        return "bg-pink-500 text-white"
      default:
        return "bg-gray-100 text-gray-400"
    }
  }

  return value ? (
    <div className={`w-full h-full flex items-center justify-center font-bold py-3 ${getStyle(value)}`}>{value}</div>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 py-3">-</div>
  )
}

export default function RACI() {
  // Updated roles to match the image
  const roles = ["PROJECT MANAGER", "TEAM LEAD", "DEVELOPER", "TESTER", "STAKEHOLDER"]

  // Updated activities to match the image
  const activities = ["TASK 1", "TASK 2", "TASK 3", "TASK 4", "TASK 5"]

  // Updated RACI data to match the image
  const initialRaciData = {
    "TASK 1": {
      "PROJECT MANAGER": "A",
      "TEAM LEAD": "R",
      DEVELOPER: "C",
      TESTER: "I",
      STAKEHOLDER: "A",
    },
    "TASK 2": {
      "PROJECT MANAGER": "A",
      "TEAM LEAD": "R",
      DEVELOPER: "C",
      TESTER: "R",
      STAKEHOLDER: "A",
    },
    "TASK 3": {
      "PROJECT MANAGER": "C",
      "TEAM LEAD": "R",
      DEVELOPER: "C",
      TESTER: "A",
      STAKEHOLDER: "A",
    },
    "TASK 4": {
      "PROJECT MANAGER": "A",
      "TEAM LEAD": "A",
      DEVELOPER: "I",
      TESTER: "I",
      STAKEHOLDER: "C",
    },
    "TASK 5": {
      "PROJECT MANAGER": "A",
      "TEAM LEAD": "R",
      DEVELOPER: "I",
      TESTER: "R",
      STAKEHOLDER: "C",
    },
  }

  const [raciData] = useState(initialRaciData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredActivities, setFilteredActivities] = useState(activities)

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toUpperCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredActivities(activities)
    } else {
      const filtered = activities.filter((activity) => activity.includes(term))
      setFilteredActivities(filtered)
    }
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">RACI Matrix</h1>
        <p className="text-gray-600">Responsibility Assignment Matrix for Project Tasks</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div> */}
        <div>
            
        </div>

       
      </div>

      <div className=" rounded-xl shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white font-bold p-3 text-center border border-blue-600">
                TASK/
                <br />
                ACTIVITIES
              </th>
              {roles.map((role, index) => (
                <th key={index} className="bg-blue-500 text-white font-bold p-3 text-center border border-blue-600">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity, activityIndex) => (
              <tr key={activityIndex}>
                <td className="bg-blue-500 text-white font-bold p-3 text-center border border-blue-600">{activity}</td>
                {roles.map((role, roleIndex) => (
                  <td key={roleIndex} className="p-0 border border-blue-600">
                    <RACICell value={raciData[activity]?.[role] || ""} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded">R</div>
          <span>Responsible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded">A</div>
          <span>Accountable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-orange-400 text-white font-bold rounded">C</div>
          <span>Consulted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white font-bold rounded">I</div>
          <span>Informed</span>
        </div>
      </div>
    </div>
  )
}
