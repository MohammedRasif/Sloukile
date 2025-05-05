import { useState, useEffect } from "react"
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
      icon: <Search className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
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
      icon: <Lightbulb className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
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
      icon: <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
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
      icon: <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
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
      icon: <Target className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
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
  const [approvalAction, setApprovalAction] = useState("")
  const [commentError, setCommentError] = useState("")
  const [approverError, setApproverError] = useState("")
  const [actionError, setActionError] = useState("")
  const [selectedApprover, setSelectedApprover] = useState("")
  const [approvalPoints, setApprovalPoints] = useState({ "approve": 0, "reject": 0 })

  // Dynamic approvers list from workflowItems
  const approvers = workflowItems.map((item) => ({
    name: item.approver.name,
    role: item.approver.role,
  }))

  // Icons for selection with corresponding colors
  const icons = [
    { name: "Search", icon: <Search className="w-5 h-5 text-cyan-500 dark:text-cyan-400" /> },
    { name: "Lightbulb", icon: <Lightbulb className="w-5 h-5 text-blue-500 dark:text-blue-400" /> },
    { name: "Sun", icon: <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> },
    { name: "Clock", icon: <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
    { name: "Target", icon: <Target className="w-5 h-5 text-purple-500 dark:text-purple-400" /> },
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
    setApprovalAction("")
    setSelectedApprover("")
    setCommentError("")
    setApproverError("")
    setActionError("")
    setShowApprovalDialog(true)
  }

  // Handle approval submission
  const handleApprovalSubmit = (updatedItem) => {
    const today = new Date().toISOString().split("T")[0]
    setWorkflowItems((prev) =>
      prev.map((item) =>
        item.step === updatedItem.step
          ? {
              ...item,
              status: approvalAction,
              approver: {
                ...updatedItem.approver,
                date: today,
                comments: approvalComment,
              },
            }
          : item,
      ),
    )
  }

  // Extended handleApprovalSubmit with validation and points
  const handleApprovalSubmitExtended = () => {
    let hasError = false

    // Validate action
    if (!approvalAction) {
      setActionError("Please select an approval action")
      hasError = true
    } else {
      setActionError("")
    }

    // Validate comment
    if (!approvalComment.trim()) {
      setCommentError("Comment is required")
      hasError = true
    } else {
      setCommentError("")
    }

    // Validate approver
    if (!selectedApprover) {
      setApproverError("Please select an approver")
      hasError = true
    } else {
      setApproverError("")
    }

    if (hasError) return

    // Update points
    setApprovalPoints((prev) => ({
      ...prev,
      [approvalAction]: prev[approvalAction] + (approvalAction === "approve" ? 10 : 5),
    }))

    // Call handleApprovalSubmit with updated approver
    handleApprovalSubmit({
      ...selectedItem,
      approver: {
        ...selectedItem.approver,
        name: selectedApprover,
        role: approvers.find((a) => a.name === selectedApprover)?.role || "Not Assigned",
      },
    })

    // Reset states and close dialog
    setSelectedApprover("")
    setShowApprovalDialog(false)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-green-500 dark:bg-green-600 rounded hover:bg-green-600 dark:hover:bg-green-700">
            <CheckCircle className="w-3 h-3 mr-1" /> Approved
          </span>
        )
      case "reject":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-orange-500 dark:bg-orange-600 rounded hover:bg-orange-600 dark:hover:bg-orange-700">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        )
      case "in-review":
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-[#00308F] dark:bg-[#00308F] rounded hover:bg-[#002070] dark:hover:bg-[#002070]">
            <Clock className="w-3 h-3 mr-1" /> In Review
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-gray-500 dark:bg-gray-600 rounded hover:bg-gray-600 dark:hover:bg-gray-700">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </span>
        )
    }
  }

  // Get color based on index
  const getColor = (index) => {
    const colors = [
      "from-[#00308F] to-[#002070]",
      "from-[#00308F] to-[#002070]",
      "from-[#00308F] to-[#002070]",
      "from-[#00308F] to-[#002070]",
      "from-[#00308F] to-[#002070]",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="py-6 container mx-auto ">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Project Approval Workflow</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review and approve projects through multiple stages</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#00308F] dark:bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-[#002070] dark:hover:bg-[#002070] transition-colors cursor-pointer"
        >
          <PlusCircle size={18} />
          Add Approval Stage
        </button>
      </div>

      {/* Workflow items in arrow style */}
      <div className="flex flex-nowrap overflow-x-auto pb-8 gap-0 -mx-2">
        {workflowItems.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-64 px-2 relative">
            {/* Arrow card with gradient */}
            <div className="relative h-80 border border-gray-300 dark:border-gray-700 shadow-xl rounded-[10px]">
              {/* Card with arrow shape */}
              <div className="absolute inset-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col overflow-hidden">
                {/* Content area */}
                <div className="flex-1 p-5 flex flex-col items-center">
                  {/* Status badge */}
                  <div className="self-end -mt-2 mb-2">{getStatusBadge(item.status)}</div>

                  {/* Text content */}
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-center mb-2 text-2xl">{item.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-center mb-1 text-xl">{item.value}</p>
                  <p className="text-md text-gray-500 dark:text-gray-400 text-center mb-4">{item.amount}</p>

                  {/* Approver info */}
                  <div className="w-full mt-auto">
                    {item.approver.date && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reviewed on: {item.approver.date}</p>
                    )}
                    {item.approver.comments && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">{item.approver.comments}</p>
                    )}
                    {item.status === "pending" || item.status === "in-review" ? (
                      <button
                        onClick={() => openApprovalDialog(item)}
                        className="w-full mt-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        Review & Approve
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Arrow part with gradient */}
                <div
                  className={`h-12 bg-gradient-to-r ${getColor(index)} dark:from-[#00308F] dark:to-[#002070] flex items-center justify-center text-white font-bold`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl">{item.step}</span>
                    <span className="text-xs ml-1 uppercase">STAGE</span>
                  </div>
                </div>

                {/* Arrow point */}
                <div
                  className={`absolute -left-10 transform -translate-y-1/2 w-20 h-20 bg-gradient-to-r ${getColor(index)} dark:from-[#00308F] dark:to-[#002070] rotate-45 z-10`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add workflow form */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700 shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Add New Approval Stage</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stage Title
                </label>
                <input
                  id="name"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="Enter title (e.g. STAGE 06)"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#00308F]"
                />
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Approval Type
                </label>
                <input
                  id="value"
                  name="value"
                  value={newItem.value}
                  onChange={handleInputChange}
                  placeholder="Enter approval type"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#00308F]"
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="amount"
                  name="amount"
                  value={newItem.amount}
                  onChange={handleInputChange}
                  placeholder="Enter description of this approval stage"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#00308F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Icon</label>
                <select
                  value={selectedIcon}
                  onChange={(e) => setSelectedIcon(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#00308F]"
                >
                  {icons.map((icon, index) => (
                    <option key={icon.name} value={index}>
                      {icon.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00308F] dark:bg-[#00308F] text-white rounded-md hover:bg-[#002070] dark:hover:bg-[#002070] transition-colors cursor-pointer"
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
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-[#E6E9F0] to-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-[#00308F] dark:text-gray-200 mb-4 bg-gradient-to-r from-[#00308F] to-[#002070] dark:from-[#00308F] dark:to-[#002070] bg-clip-text text-transparent">
              {selectedItem ? `Review` : ""}
            </h3>
            <div className="space-y-5">
              {/* Approver Selection */}
              <div expect>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Person</label>
                <select
                  value={selectedApprover}
                  onChange={(e) => setSelectedApprover(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#00308F] transition-colors"
                >
                  <option value="">Select an approver</option>
                  {approvers.map((approver) => (
                    <option key={approver.name} value={approver.name}>
                      {approver.name} ({approver.role})
                    </option>
                  ))}
                </select>
                {approverError && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1 animate-shake">{approverError}</p>
                )}
              </div>

              {/* Action Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Action</label>
                <div className="flex gap-6">
                  {[
                    { value: "approve", label: "Approve" },
                    { value: "reject", label: "Reject" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-[#E6E9F0] dark:hover:bg-gray-700 p-1 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={approvalAction === option.value}
                        onChange={() => {
                          setApprovalAction(option.value)
                          setActionError("")
                        }}
                        className="h-4 w-4 text-[#00308F] dark:text-[#00308F] border-gray-300 dark:border-gray-600 rounded-full focus:ring-[#00308F] dark:focus:ring-[#00308F] accent-[#00308F] dark:accent-[#00308F] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                    </label>
                  ))}
                </div>
                {actionError && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1 animate-shake">{actionError}</p>
                )}
              </div>

              {/* Comment Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comments (Required)</label>
                <textarea
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  placeholder="Add your review comments"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#00308F] transition-colors"
                />
                {commentError && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1 animate-shake">{commentError}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApprovalDialog(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprovalSubmitExtended}
                  className="px-4 py-2 bg-gradient-to-r from-[#00308F] to-[#002070] dark:from-[#00308F] dark:to-[#002070] text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
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