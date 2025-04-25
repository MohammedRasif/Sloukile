"use client"

import { useState } from "react"
import { PlusCircle, X, Search, Lightbulb, Sun, Clock, Target } from "lucide-react"

export default function Workflow() {
  // Default workflow items
  const [workflowItems, setWorkflowItems] = useState([
    {
      name: "OPTIONS 01",
      value: "Task 1",
      amount: "High priority task with details",
      icon: <Search className="w-5 h-5 text-cyan-500" />,
      step: "01",
    },
    {
      name: "OPTIONS 02",
      value: "Task 2",
      amount: "Medium priority with specifications",
      icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
      step: "02",
    },
    {
      name: "OPTIONS 03",
      value: "Task 3",
      amount: "Low priority implementation details",
      icon: <Sun className="w-5 h-5 text-indigo-600" />,
      step: "03",
    },
    {
      name: "OPTIONS 04",
      value: "Task 4",
      amount: "High priority with deadline",
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      step: "04",
    },
    {
      name: "OPTIONS 05",
      value: "Task 5",
      amount: "Medium priority final step",
      icon: <Target className="w-5 h-5 text-purple-500" />,
      step: "05",
    },
  ])

  // State for form visibility and input values
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    value: "",
    amount: "",
  })

  // Icons for selection with corresponding colors
  const icons = [
    { name: "Search", icon: <Search className="w-5 h-5 text-cyan-500" /> },
    { name: "Lightbulb", icon: <Lightbulb className="w-5 h-5 text-blue-500" /> },
    { name: "Sun", icon: <Sun className="w-5 h-5 text-indigo-600" /> },
    { name: "Clock", icon: <Clock className="w-5 h-5 text-purple-600" /> },
    { name: "Target", icon: <Target className="w-5 h-5 text-purple-500" /> },
  ]

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  // Selected icon for new item
  const [selectedIcon, setSelectedIcon] = useState(0)

  // Add new workflow item
  const handleAddItem = (e) => {
    e.preventDefault()
    if (newItem.name.trim() && newItem.value.trim() && newItem.amount.trim()) {
      const nextStep = (workflowItems.length + 1).toString().padStart(2, "0")
      setWorkflowItems((prev) => [
        ...prev,
        {
          ...newItem,
          icon: icons[selectedIcon].icon,
          step: nextStep,
        },
      ])
      setNewItem({ name: "", value: "", amount: "" })
      setSelectedIcon(0)
      setShowForm(false)
    }
  }

  // Get color based on index
  const getColor = (index) => {
    const colors = [
      "bg-[#00308F]",
      "bg-[#00308F]",
      "bg-[#00308F]",
      "bg-[#00308F]",
      "bg-[#00308F]",
    ]
    return colors[index % colors.length]
  }

  // Get icon background color
  const getIconBgColor = (index) => {
    const colors = [
      "bg-[#00308F]",
      "bg-[#00308F]",
      "bg-[#00308F]",
      "bg-[#00308F]",
      "bg-[#00308F]",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="py-6 container mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">Workflow Process</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={18} />
          Add Workflow
        </button>
      </div>

      {/* Workflow items in arrow style */}
      <div className="flex flex-nowrap overflow-x-auto pb-8 gap-0 -mx-2">
        {workflowItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-64 px-2 relative">
            {/* Arrow card with gradient */}
            <div className="relative h-64">
              {/* Card with arrow shape */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
                {/* Content area */}
                <div className="flex-1 p-5 flex flex-col items-center">
                  {/* Text content */}
                  <h3 className="font-bold text-gray-800 text-center mb-2 text-2xl">{item.name}</h3>
                  <p className=" text-gray-700 font-medium text-center mb-1 text-xl">{item.value}</p>
                  <p className="text-md  text-gray-500 text-center">{item.amount}</p>
                </div>

                {/* Arrow part with gradient */}
                <div
                  className={`h-16 bg-gradient-to-r ${getColor(index)} flex items-center justify-center text-white font-bold`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl">{item.step}</span>
                    <span className="text-xs ml-1 uppercase">STEP</span>
                  </div>
                </div>

                {/* Arrow point */}
                <div
                  className={`absolute -left-20 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r ${getColor(index)} rotate-45 z-10`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add workflow form */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-4">Add New Workflow Item</h3>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter title (e.g. OPTIONS 06)"
                  required
                />
              </div>

              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  id="value"
                  name="value"
                  value={newItem.value}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subtitle"
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={newItem.amount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-blue-700">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}