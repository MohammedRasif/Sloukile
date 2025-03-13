"use client"

import { useState } from "react"
import { PlusCircle, X } from "lucide-react"
import { FiSearch } from "react-icons/fi"

const AddEmploye = () => {
  const [employees, setEmployees] = useState([
    { name: "Pappu", skills: "UI/UX", currentAssignment: 6 },
    { name: "Ramisa", skills: "AI", currentAssignment: 7 },
    { name: "Bijoy", skills: "Frontend", currentAssignment: 4 },
    { name: "Sajib", skills: "UI/UX", currentAssignment: 5 },
    { name: "Rasif", skills: "Frontend", currentAssignment: 2 },
    { name: "Tuhin", skills: "Flutter", currentAssignment: 0 },
    { name: "Rafi", skills: "Flutter", currentAssignment: 9 },
    { name: "Rafsun", skills: "AI", currentAssignment: 100 },
    { name: "Pail", skills: "Backend", currentAssignment: 60 },
    { name: "Nil", skills: "UI/UX", currentAssignment: 4 },
    { name: "Siam", skills: "Backend", currentAssignment: 3 },
    { name: "Shuvo", skills: "Backend", currentAssignment: 3 },
    { name: "Mahmud", skills: "AI", currentAssignment: 6 },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    skills: "",
    currentAssignment: 0,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEmployee({
      ...newEmployee,
      [name]: name === "currentAssignment" ? Number.parseInt(value) || 0 : value,
    })
  }

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.skills) {
      setEmployees([...employees, newEmployee])
      setNewEmployee({ name: "", skills: "", currentAssignment: 0 })
      setShowModal(false)
    }
  }

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.skills.toLowerCase().includes(searchLower) ||
      employee.currentAssignment.toString().includes(searchLower)
    )
  })

  return (
    <div className="border-t border-gray-300 text-center">
      <div className="container mx-auto py-6">
        <div className=" mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search your project name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CBB702]"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yellow-500">
                <th className="border border-yellow-400 p-3 ">Name</th>
                <th className="border border-yellow-400 p-3 ">Skills</th>
                <th className="border border-yellow-400 p-3 ">Current Assignment</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index} className="border-b border-yellow-100">
                  <td className="border border-yellow-400 p-3">{employee.name}</td>
                  <td className="border border-yellow-400 p-3">{employee.skills}</td>
                  <td className="border border-yellow-400 p-3">{employee.currentAssignment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal/Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur effect */}
          <div className="fixed inset-0 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>

          {/* Modal content */}
          <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-left">Add New Employee</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-left">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-left">Skills</label>
                <select
                  name="skills"
                  value={newEmployee.skills}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Skill</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Flutter">Flutter</option>
                  <option value="AI">AI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-left">Current Assignment</label>
                <input
                  type="number"
                  name="currentAssignment"
                  value={newEmployee.currentAssignment}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="mt-10 ml-5 flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
      >
        <PlusCircle size={20} />
        Add New Employee
      </button>
    </div>
  )
}

export default AddEmploye

