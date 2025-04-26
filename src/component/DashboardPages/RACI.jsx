"use client"

import { useState } from "react"
import { Search, Download, Edit, Plus, Trash2 } from "lucide-react"

const RACICell = ({ value, onEdit }) => {
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

  return (
    <div className="relative w-full h-full">
      <div className={`w-full h-full flex items-center justify-center font-bold py-3 ${getStyle(value)}`}>
        {value || "-"}
      </div>
      <div className="absolute top-1 right-1">
        <button
          onClick={onEdit}
          className="bg-[#00308F] p-1 rounded hover:bg-blue-600 text-white"
          title="Edit Assignment"
        >
          <Edit className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function RACI() {
  const [raciData, setRaciData] = useState({
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
  })
  const [roles, setRoles] = useState(["PROJECT MANAGER", "TEAM LEAD", "DEVELOPER", "TESTER", "STAKEHOLDER"])
  const [activities, setActivities] = useState(["TASK 1", "TASK 2", "TASK 3", "TASK 4", "TASK 5"])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredActivities, setFilteredActivities] = useState(activities)
  const [showEditCellModal, setShowEditCellModal] = useState({ show: false, activity: "", role: "", value: "" })
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showAddRoleModal, setShowAddRoleModal] = useState(false)
  const [newTaskName, setNewTaskName] = useState("")
  const [newRoleName, setNewRoleName] = useState("")

  // Handle search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toUpperCase()
    setSearchTerm(term)
    if (term === "") {
      setFilteredActivities(activities)
    } else {
      const filtered = activities.filter((activity) => activity.toUpperCase().includes(term))
      setFilteredActivities(filtered)
    }
  }

  // Handle downloading the RACI matrix as CSV
  const handleDownload = () => {
    let csvContent = "TASK/ACTIVITIES," + roles.join(",") + "\n"
    activities.forEach((activity) => {
      const row = [activity]
      roles.forEach((role) => {
        row.push(raciData[activity]?.[role] || "-")
      })
      csvContent += row.join(",") + "\n"
    })
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "raci_matrix.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle editing RACI cell
  const editCell = () => {
    if (showEditCellModal.value === "-" || !["R", "A", "C", "I"].includes(showEditCellModal.value)) {
      setRaciData((prev) => {
        const newData = { ...prev }
        delete newData[showEditCellModal.activity][showEditCellModal.role]
        return newData
      })
    } else {
      setRaciData((prev) => {
        const newData = { ...prev }
        newData[showEditCellModal.activity][showEditCellModal.role] = showEditCellModal.value
        return newData
      })
    }
    setShowEditCellModal({ show: false, activity: "", role: "", value: "" })
  }

  // Handle adding a new task
  const addTask = () => {
    if (newTaskName.trim() && !activities.includes(newTaskName.toUpperCase())) {
      const newTask = newTaskName.toUpperCase()
      setActivities((prev) => [...prev, newTask])
      setFilteredActivities((prev) => [...prev, newTask])
      setRaciData((prev) => ({
        ...prev,
        [newTask]: {},
      }))
      setNewTaskName("")
      setShowAddTaskModal(false)
    }
  }

  // Handle adding a new role
  const addRole = () => {
    if (newRoleName.trim() && !roles.includes(newRoleName.toUpperCase())) {
      const newRole = newRoleName.toUpperCase()
      setRoles((prev) => [...prev, newRole])
      setRaciData((prev) => {
        const newData = { ...prev }
        activities.forEach((activity) => {
          newData[activity] = { ...newData[activity], [newRole]: "" }
        })
        return newData
      })
      setNewRoleName("")
      setShowAddRoleModal(false)
    }
  }

  // Handle deleting a task
  const deleteTask = (task) => {
    if (activities.length <= 1) {
      alert("Cannot delete the last task. At least one task is required.")
      return
    }
    setActivities((prev) => prev.filter((activity) => activity !== task))
    setFilteredActivities((prev) => prev.filter((activity) => activity !== task))
    setRaciData((prev) => {
      const newData = { ...prev }
      delete newData[task]
      return newData
    })
  }

  // Handle deleting a role
  const deleteRole = (role) => {
    if (roles.length <= 1) {
      alert("Cannot delete the last role. At least one role is required.")
      return
    }
    setRoles((prev) => prev.filter((r) => r !== role))
    setRaciData((prev) => {
      const newData = { ...prev }
      activities.forEach((activity) => {
        delete newData[activity][role]
      })
      return newData
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">RACI Matrix</h1>
        <p className="text-gray-600">Responsibility Assignment Matrix for Project Tasks</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="flex items-center gap-2 bg-[#00308F] text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </button>
          <button
            onClick={() => setShowAddRoleModal(true)}
            className="flex items-center gap-2 bg-[#00308F] text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            Add Role
          </button>
          
        </div>
      </div>

      <div className="rounded-xl shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white font-bold p-3 text-center border border-blue-600">
                TASK/<br />ACTIVITIES
              </th>
              {roles.map((role, index) => (
                <th key={index} className="bg-blue-500 text-white font-bold p-3 text-center border border-blue-600">
                  <div className="flex items-center justify-center gap-2">
                    {role}
                    <button
                      onClick={() => deleteRole(role)}
                      className="text-white hover:text-red-200"
                      title={`Delete ${role}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity, activityIndex) => (
              <tr key={activityIndex}>
                <td className="bg-blue-500 text-white font-bold p-3 text-center border border-blue-600">
                  <div className="flex items-center justify-center gap-2">
                    {activity}
                    <button
                      onClick={() => deleteTask(activity)}
                      className="text-white hover:text-red-200"
                      title={`Delete ${activity}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                {roles.map((role, roleIndex) => (
                  <td key={roleIndex} className="p-0 border border-blue-600">
                    <RACICell
                      value={raciData[activity]?.[role] || ""}
                      onEdit={() =>
                        setShowEditCellModal({
                          show: true,
                          activity,
                          role,
                          value: raciData[activity]?.[role] || "",
                        })
                      }
                    />
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

      {/* Modal for Editing RACI Cell */}
      {showEditCellModal.show && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit RACI Assignment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Assignment for {showEditCellModal.activity} - {showEditCellModal.role}
                </label>
                <select
                  value={showEditCellModal.value || "-"}
                  onChange={(e) => setShowEditCellModal((prev) => ({ ...prev, value: e.target.value === "-" ? "" : e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="-">-</option>
                  <option value="R">R (Responsible)</option>
                  <option value="A">A (Accountable)</option>
                  <option value="C">C (Consulted)</option>
                  <option value="I">I (Informed)</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowEditCellModal({ show: false, activity: "", role: "", value: "" })}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editCell}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding New Task */}
      {showAddTaskModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Task Name</label>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Enter task name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setNewTaskName("")
                  setShowAddTaskModal(false)
                }}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding New Role */}
      {showAddRoleModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add New Role</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Role Name</label>
                <input
                  type="text"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Enter role name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setNewRoleName("")
                  setShowAddRoleModal(false)
                }}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addRole}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}