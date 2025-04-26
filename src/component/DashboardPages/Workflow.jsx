"use client"

import { useState } from "react"
import {
  PlusCircle,
  Search,
  Lightbulb,
  Sun,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react"

export default function Workflow() {
  // Default workflow items representing approval stages
  const [workflowItems, setWorkflowItems] = useState([
    {
      name: "STAGE 01",
      value: "Initial Review",
      amount: "Project proposal is reviewed by department head",
      icon: <Search className="w-5 h-5 text-cyan-500" />,
      step: "01",
      status: "approved",
      approver: {
        name: "Sarah Johnson",
        role: "Department Head",
        avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
        date: "2023-05-15",
        comments: "Proposal meets department guidelines. Approved for next stage.",
      },
    },
    {
      name: "STAGE 02",
      value: "Technical Assessment",
      amount: "Technical team evaluates feasibility and resource requirements",
      icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
      step: "02",
      status: "approved",
      approver: {
        name: "Michael Chen",
        role: "Technical Lead",
        avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
        date: "2023-05-22",
        comments: "Technical requirements are well-defined. Resources are available.",
      },
    },
    {
      name: "STAGE 03",
      value: "Budget Review",
      amount: "Finance team reviews budget allocation and cost estimates",
      icon: <Sun className="w-5 h-5 text-indigo-600" />,
      step: "03",
      status: "in-review",
      approver: {
        name: "Jessica Lee",
        role: "Finance Manager",
        avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
        date: "",
        comments: "",
      },
    },
    {
      name: "STAGE 04",
      value: "Executive Approval",
      amount: "Executive committee reviews and provides final approval",
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      step: "04",
      status: "pending",
      approver: {
        name: "Robert Williams",
        role: "Executive Director",
        avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/people/kitchen-bar.jpg",
        date: "",
        comments: "",
      },
    },
    {
      name: "STAGE 05",
      value: "Implementation",
      amount: "Project is approved for implementation and resource allocation",
      icon: <Target className="w-5 h-5 text-purple-500" />,
      step: "05",
      status: "pending",
      approver: {
        name: "Amanda Garcia",
        role: "Project Director",
        avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
        date: "",
        comments: "",
      },
    },
  ])

  // State for form visibility and input values
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    value: "",
    amount: "",
  })

  // State for approval dialog
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [approvalComment, setApprovalComment] = useState("")
  const [approvalAction, setApprovalAction] = useState("approve")

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
          status: "pending",
          approver: {
            name: "Not Assigned",
            role: "Not Assigned",
            avatar: "/placeholder.svg?height=40&width=40",
            date: "",
            comments: "",
          },
        },
      ])
      setNewItem({ name: "", value: "", amount: "" })
      setSelectedIcon(0)
      setShowForm(false)
    }
  }

  // Open approval dialog
  const openApprovalDialog = (item) => {
    setSelectedItem(item)
    setApprovalComment("")
    setApprovalAction("approve")
    setShowApprovalDialog(true)
  }

  // Handle approval submission
  const handleApprovalSubmit = () => {
    const today = new Date().toISOString().split("T")[0]

    setWorkflowItems((prev) =>
      prev.map((item) =>
        item.step === selectedItem.step
          ? {
              ...item,
              status: approvalAction,
              approver: {
                ...item.approver,
                date: today,
                comments: approvalComment,
              },
            }
          : item,
      ),
    )

    setShowApprovalDialog(false)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" /> Approved
          </span>
        )
      case "rejected":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        )
      case "in-review":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
            <Clock className="w-3 h-3 mr-1" /> In Review
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-gray-500 rounded hover:bg-gray-600">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </span>
        )
    }
  }

  // Get color based on index
  const getColor = (index) => {
    const colors = ["bg-[#00308F]", "bg-[#00308F]", "bg-[#00308F]", "bg-[#00308F]", "bg-[#00308F]"]
    return colors[index % colors.length]
  }

  return (
    <div className="py-6 container mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Project Approval Workflow</h2>
          <p className="text-gray-600 mt-1">Review and approve projects through multiple stages</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <PlusCircle size={18} />
          Add Approval Stage
        </button>
      </div>

      {/* Workflow items in arrow style */}
      <div className="flex flex-nowrap overflow-x-auto pb-8 gap-0 -mx-2">
        {workflowItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-64  px-2 relative ">
            {/* Arrow card with gradient */}
            <div className="relative h-96 border border-gray-300 shadow-xl rounded-[10px]">
              {/* Card with arrow shape */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
                {/* Content area */}
                <div className="flex-1 p-5 flex flex-col items-center">
                  {/* Status badge */}
                  <div className="self-end -mt-2 mb-2 ">{getStatusBadge(item.status)}</div>

                  {/* Text content */}
                  <h3 className="font-bold text-gray-800 text-center mb-2 text-2xl">{item.name}</h3>
                  <p className="text-gray-700 font-medium text-center mb-1 text-xl">{item.value}</p>
                  <p className="text-md text-gray-500 text-center mb-4">{item.amount}</p>

                  {/* Approver info */}
                  <div className="w-full mt-auto">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 mr-2 rounded-full overflow-hidden">
                        <img
                          src={item.approver.avatar || "/placeholder.svg"}
                          alt={item.approver.name}
                          className="h-full w-full object-cover"
                        />
                        {!item.approver.avatar && (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-600 text-xs">
                            {item.approver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{item.approver.name}</p>
                        <p className="text-xs text-gray-500">{item.approver.role}</p>
                      </div>
                    </div>

                    {item.approver.date && (
                      <p className="text-xs text-gray-500 mb-1">Reviewed on: {item.approver.date}</p>
                    )}

                    {item.approver.comments && <p className="text-xs text-gray-600 italic">{item.approver.comments}</p>}

                    {item.status === "pending" || item.status === "in-review" ? (
                      <button
                        onClick={() => openApprovalDialog(item)}
                        className="w-full mt-2 border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Review & Approve
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Arrow part with gradient */}
                <div
                  className={`h-12 bg-gradient-to-r ${getColor(index)} flex items-center justify-center text-white font-bold`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl">{item.step}</span>
                    <span className="text-xs ml-1 uppercase">STAGE</span>
                  </div>
                </div>

                {/* Arrow point */}
                <div
                  className={`absolute -left-10  transform -translate-y-1/2 w-20 h-20 bg-gradient-to-r ${getColor(index)} rotate-45 z-10`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add workflow form */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border border-gray-300 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add New Approval Stage</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Stage Title
                </label>
                <input
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="Enter title (e.g. STAGE 06)"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                  Approval Type
                </label>
                <input
                  id="value"
                  name="value"
                  value={newItem.value}
                  onChange={handleInputChange}
                  placeholder="Enter approval type"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="amount"
                  name="amount"
                  value={newItem.amount}
                  onChange={handleInputChange}
                  placeholder="Enter description of this approval stage"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Add Stage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Approval Dialog */}
      {showApprovalDialog && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50  ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border border-gray-300 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              {selectedItem ? `Review: ${selectedItem.value}` : "Review Stage"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Action</label>
                <select
                  value={approvalAction}
                  onChange={(e) => setApprovalAction(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="approve">Approve</option>
                  <option value="in-review">Mark as In Review</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Comments</label>
                <textarea
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  placeholder="Add your review comments"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApprovalDialog(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprovalSubmit}
                  className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}