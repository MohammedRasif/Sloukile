"use client"

import { useState, useEffect } from "react"
import {
  FaCogs,
  FaTasks,
  FaUsers,
  FaDollarSign,
  FaExclamationTriangle,
  FaSitemap,
  FaShareAlt,
  FaRocket,
  FaClipboardList,
  FaChevronDown,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaHistory,
  FaCalendarAlt,
} from "react-icons/fa"
import { IoIosTimer } from "react-icons/io"
import { MdAccountBalance } from "react-icons/md"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share"
import { format } from "date-fns"

// Initial project data
const initialProjectData = {
  title: "Downtown Commercial Tower Construction",
  orchestrator: "Emily Thompson",
  manager: "Rahul Patel",
  objective:
    "The Downtown Commercial Tower Construction project aims to build a state-of-the-art, sustainable commercial building in the city center, optimizing resource use, ensuring timely completion, and delivering a high-quality, eco-friendly structure that enhances urban development and tenant satisfaction.",

  scopeItems: [
    {
      capability: "Site Preparation and Foundation",
      description:
        "Clearing and grading the site, followed by laying a reinforced concrete foundation to support the multi-story commercial structure.",
      endGame:
        "Expected outcomes:\n• Completion of site clearing within 4 weeks\n• Foundation ready for structural work: 95% quality compliance\n• Cost savings: $500K through optimized excavation\n• Zero safety incidents\n• 100% adherence to local regulations\n• Reduced environmental impact via sustainable practices",
    },
    {
      capability: "Structural Framework",
      description:
        "Erecting the steel and concrete framework for the building, including columns, beams, and floors, to ensure structural integrity.",
      endGame: "",
    },
    {
      capability: "Building Envelope and Facade",
      description:
        "Installing exterior walls, windows, and cladding to create a weather-tight and energy-efficient building envelope with a modern aesthetic.",
      endGame: "",
    },
    {
      capability: "Interior Fit-Out and Systems",
      description:
        "Completing interior construction, including electrical, plumbing, HVAC, and tenant-specific fit-outs to meet commercial leasing requirements.",
      endGame: "",
    },
  ],

  interdependencies: [
    {
      item: "Availability of Skilled Labor",
      description:
        "The project relies on the availability of qualified construction workers, including masons, electricians, and HVAC technicians, to meet tight deadlines.",
    },
    {
      item: "Timely Material Supply",
      description:
        "Delays in the delivery of critical materials like steel, concrete, and glass could impact the construction schedule and increase costs.",
    },
  ],

  keyRisks: [
    {
      risk: "Weather-Related Delays",
      description:
        "Adverse weather conditions, such as heavy rain or extreme heat, could halt outdoor construction activities and delay the project timeline.",
    },
    {
      risk: "Regulatory Compliance Issues",
      description:
        "Failure to meet building codes or obtain necessary permits on time could result in fines or construction halts.",
    },
    {
      risk: "Labor Shortages",
      description:
        "A lack of skilled workers due to market demand or labor disputes could slow progress and increase labor costs.",
    },
    {
      risk: "Material Cost Volatility",
      description:
        "Fluctuations in the prices of key materials like steel or cement could exceed the allocated budget, impacting financial planning.",
    },
  ],

  deliverables: [
    { name: "Spend Scope Baseline", date: "02/21" },
    { name: "Peripherals Definition", date: "02/21" },
    { name: "Peripherals Scoping", date: "04/21" },
    { name: "Solution Design", date: "05/21" },
    { name: "RFP", date: "07/21" },
    { name: "Implementation/Run", date: "TBD" },
  ],

  resources: [{ role: "Project Manager", required: "Yes", name: "Sami Loukile", fte: "0.2" }],
}

// Charter sections with icons
const charterSections = [
  { label: "Overview", icon: <FaClipboardList /> },
  { label: "Government Setup", icon: <MdAccountBalance /> },
  { label: "Planning", icon: <FaCogs /> },
  { label: "Tasks", icon: <FaTasks /> },
  { label: "Team", icon: <FaUsers /> },
  { label: "Timeline", icon: <IoIosTimer /> },
  { label: "Budget", icon: <FaDollarSign /> },
  { label: "Risks", icon: <FaExclamationTriangle /> },
  { label: "RACI", icon: <FaSitemap /> },
  { label: "Strategy", icon: <FaRocket /> },
]

export default function Repoting() {
  const [selectedSection, setSelectedSection] = useState("Overview")
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    scope: true,
    interdependencies: true,
    risks: true,
    deliverables: true,
    resources: true,
  })

  // State for version history
  const [versionHistory, setVersionHistory] = useState([
    {
      id: 1,
      date: new Date(2025, 4, 3), // May 3, 2025
      author: "Emily Thompson",
      changes: "Initial project charter creation",
      data: initialProjectData,
    },
  ])

  // Current version being displayed
  const [currentVersionId, setCurrentVersionId] = useState(1)

  // Current project data (based on selected version)
  const [projectData, setProjectData] = useState(initialProjectData)

  // Editing states
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  const [editData, setEditData] = useState({})
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes, set to true

  // Dialog states
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false)
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false)
  const [addItemType, setAddItemType] = useState("")
  const [newItemData, setNewItemData] = useState({})
  const [deleteItemData, setDeleteItemData] = useState({ type: "", index: -1 })
  const [changeDescription, setChangeDescription] = useState("")

  // Load the selected version data
  useEffect(() => {
    const selectedVersion = versionHistory.find((v) => v.id === currentVersionId)
    if (selectedVersion) {
      setProjectData(selectedVersion.data)
    }
  }, [currentVersionId, versionHistory])

  const handleSectionClick = (section) => {
    setSelectedSection(section.label)
    setIsShareDropdownOpen(false)
  }

  const toggleShareDropdown = () => {
    setIsShareDropdownOpen((prev) => !prev)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Start editing a section
  const handleEditSection = (section) => {
    setIsEditing(true)
    setEditingSection(section)

    switch (section) {
      case "overview":
        setEditData({
          title: projectData.title,
          orchestrator: projectData.orchestrator,
          manager: projectData.manager,
          objective: projectData.objective,
        })
        break
      case "scope":
        setEditData({ scopeItems: [...projectData.scopeItems] })
        break
      case "interdependencies":
        setEditData({ interdependencies: [...projectData.interdependencies] })
        break
      case "risks":
        setEditData({ keyRisks: [...projectData.keyRisks] })
        break
      case "deliverables":
        setEditData({ deliverables: [...projectData.deliverables] })
        break
      case "resources":
        setEditData({ resources: [...projectData.resources] })
        break
      default:
        setEditData({})
    }
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingSection(null)
    setEditData({})
  }

  // Save changes and create a new version
  const handleSaveChanges = () => {
    // Create updated project data
    const updatedData = { ...projectData }

    switch (editingSection) {
      case "overview":
        updatedData.title = editData.title
        updatedData.orchestrator = editData.orchestrator
        updatedData.manager = editData.manager
        updatedData.objective = editData.objective
        break
      case "scope":
        updatedData.scopeItems = editData.scopeItems
        break
      case "interdependencies":
        updatedData.interdependencies = editData.interdependencies
        break
      case "risks":
        updatedData.keyRisks = editData.keyRisks
        break
      case "deliverables":
        updatedData.deliverables = editData.deliverables
        break
      case "resources":
        updatedData.resources = editData.resources
        break
    }

    // Open dialog to add version description
    setProjectData(updatedData)
    setIsVersionDialogOpen(true)
  }

  // Create a new version
  const createNewVersion = () => {
    const newVersion = {
      id: versionHistory.length + 1,
      date: new Date(),
      author: "Emily Thompson", // In a real app, this would be the current user
      changes: changeDescription,
      data: projectData,
    }

    setVersionHistory([...versionHistory, newVersion])
    setCurrentVersionId(newVersion.id)
    setIsVersionDialogOpen(false)
    setChangeDescription("")
    setIsEditing(false)
    setEditingSection(null)
  }

  // Handle adding a new item
  const handleAddItem = (type) => {
    setAddItemType(type)

    switch (type) {
      case "scope":
        setNewItemData({ capability: "", description: "", endGame: "" })
        break
      case "interdependencies":
        setNewItemData({ item: "", description: "" })
        break
      case "risks":
        setNewItemData({ risk: "", description: "" })
        break
      case "deliverables":
        setNewItemData({ name: "", date: "" })
        break
      case "resources":
        setNewItemData({ role: "", required: "Yes", name: "", fte: "" })
        break
    }

    setIsAddItemDialogOpen(true)
  }

  // Save new item (add to top)
  const saveNewItem = () => {
    const updatedData = { ...projectData }

    switch (addItemType) {
      case "scope":
        updatedData.scopeItems = [newItemData, ...projectData.scopeItems]
        break
      case "interdependencies":
        updatedData.interdependencies = [newItemData, ...projectData.interdependencies]
        break
      case "risks":
        updatedData.keyRisks = [newItemData, ...projectData.keyRisks]
        break
      case "deliverables":
        updatedData.deliverables = [newItemData, ...projectData.deliverables]
        break
      case "resources":
        updatedData.resources = [newItemData, ...projectData.resources]
        break
    }

    // Update project data and open version dialog
    setProjectData(updatedData)
    setIsAddItemDialogOpen(false)
    setIsVersionDialogOpen(true)
    setChangeDescription(`Added new ${addItemType} item`)
  }

  // Open delete confirmation dialog
  const handleDeleteItem = (type, index) => {
    setDeleteItemData({ type, index })
    setIsDeleteDialogOpen(true)
  }

  // Confirm deletion
  const confirmDeleteItem = () => {
    const { type, index } = deleteItemData
    const updatedData = { ...projectData }

    switch (type) {
      case "scope":
        updatedData.scopeItems = projectData.scopeItems.filter((_, i) => i !== index)
        break
      case "interdependencies":
        updatedData.interdependencies = projectData.interdependencies.filter((_, i) => i !== index)
        break
      case "risks":
        updatedData.keyRisks = projectData.keyRisks.filter((_, i) => i !== index)
        break
      case "deliverables":
        updatedData.deliverables = projectData.deliverables.filter((_, i) => i !== index)
        break
      case "resources":
        updatedData.resources = projectData.resources.filter((_, i) => i !== index)
        break
    }

    // Update project data and open version dialog
    setProjectData(updatedData)
    setIsDeleteDialogOpen(false)
    setIsVersionDialogOpen(true)
    setChangeDescription(`Deleted ${type} item`)
  }

  // Cancel deletion
  const cancelDeleteItem = () => {
    setIsDeleteDialogOpen(false)
    setDeleteItemData({ type: "", index: -1 })
  }

  // Handle editing item in a list
  const handleEditItem = (type, index, field, value) => {
    const updatedEditData = { ...editData }

    switch (type) {
      case "scope":
        updatedEditData.scopeItems[index][field] = value
        break
      case "interdependencies":
        updatedEditData.interdependencies[index][field] = value
        break
      case "risks":
        updatedEditData.keyRisks[index][field] = value
        break
      case "deliverables":
        updatedEditData.deliverables[index][field] = value
        break
      case "resources":
        updatedEditData.resources[index][field] = value
        break
    }

    setEditData(updatedEditData)
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = `Project Charter: ${selectedSection || "Overview"}`

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full bg-white dark:bg-[#1E232E]">
      <div className="w-full bg-white dark:bg-[#1E232E] shadow-lg rounded-lg overflow-hidden">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-[#00308F] dark:bg-[#4A6CF7] text-white">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">Program Charter: {projectData.title}</h1>
          <div className="flex items-center space-x-4">
            {/* Version selector */}
            <button
              onClick={() => setIsVersionHistoryOpen(true)}
              className="flex items-center px-3 py-1.5 bg-transparent border border-white rounded-md text-white hover:bg-white/20 dark:hover:bg-gray-600/20"
            >
              <FaHistory className="mr-2" /> Version History
            </button>

            {/* Weekly update button */}
            {isAdmin && (
              <button
                className="flex items-center px-3 py-1.5 bg-transparent border border-white rounded-md text-white hover:bg-white/20 dark:hover:bg-gray-600/20"
                onClick={() => {
                  setChangeDescription("Weekly update")
                  setIsVersionDialogOpen(true)
                }}
              >
                <FaCalendarAlt className="mr-2" /> Weekly Update
              </button>
            )}

            {/* Share button */}
            <div className="relative">
              <FaShareAlt className="text-xl cursor-pointer hover:text-gray-300 dark:hover:text-gray-200" onClick={toggleShareDropdown} />
              {isShareDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-[#1E232E] rounded-lg shadow-lg p-4 flex flex-wrap gap-2 z-50 border border-gray-300 dark:border-gray-700">
                  <FacebookShareButton url={shareUrl} quote={shareTitle}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={shareTitle}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <EmailShareButton url={shareUrl} subject={shareTitle}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Version badge */}
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <span className="px-2 py-1 text-xs font-semibold rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 mr-2">
              Version {currentVersionId}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {format(versionHistory.find((v) => v.id === currentVersionId).date, "MMM d, yyyy")}
            </span>
          </div>
          {isAdmin && currentVersionId === versionHistory.length && !isEditing && (
            <button
              className="flex items-center px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleEditSection("overview")}
            >
              <FaEdit className="mr-2" /> Edit Charter
            </button>
          )}
        </div>

        {/* Project info */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700">
          {isEditing && editingSection === "overview" ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Edit Project Overview</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Project Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Project Orchestrator</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                    value={editData.orchestrator}
                    onChange={(e) => setEditData({ ...editData, orchestrator: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Project Manager</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                    value={editData.manager}
                    onChange={(e) => setEditData({ ...editData, manager: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Objective</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                    value={editData.objective}
                    onChange={(e) => setEditData({ ...editData, objective: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleCancelEdit}
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                  <button
                    className="flex items-center px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                    onClick={handleSaveChanges}
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
                <div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Project Orchestrator:</span> {projectData.orchestrator}
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Project Manager:</span> {projectData.manager}
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-gray-700 dark:text-gray-300 font-bold mb-2">Program Goal/Objective:</h2>
                <p className="text-gray-600 dark:text-gray-400">{projectData.objective}</p>
              </div>
            </>
          )}
        </div>

        {/* Main content */}
        <div className="p-4">
          {/* Scope/Capabilities Section */}
          <div className="mb-6 border rounded-lg overflow-hidden border-gray-300 dark:border-gray-700">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("scope")}
            >
              <h2 className="font-bold">Scope/Capabilities to deliver</h2>
              <div className="flex items-center">
                {isAdmin && currentVersionId === versionHistory.length && !isEditing && (
                  <>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddItem("scope")
                      }}
                    >
                      <FaPlus className="mr-1" /> Add
                    </button>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditSection("scope")
                      }}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </>
                )}
                {expandedSections.scope ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>

            {expandedSections.scope && (
              <div className="overflow-x-auto">
                {isEditing && editingSection === "scope" ? (
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Scope Items</h3>
                    {editData.scopeItems.map((item, index) => (
                      <div key={index} className="mb-6 p-4 border rounded-lg border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Scope Item #{index + 1}</h4>
                          <button
                            className="flex items-center px-2 py-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              const updatedItems = [...editData.scopeItems]
                              updatedItems.splice(index, 1)
                              setEditData({ ...editData, scopeItems: updatedItems })
                            }}
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Capability</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.capability}
                              onChange={(e) => handleEditItem("scope", index, "capability", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.description}
                              onChange={(e) => handleEditItem("scope", index, "description", e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End Game</label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.endGame}
                              onChange={(e) => handleEditItem("scope", index, "endGame", e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mb-4"
                      onClick={() => {
                        setEditData({
                          ...editData,
                          scopeItems: [{ capability: "", description: "", endGame: "" }, ...editData.scopeItems],
                        })
                      }}
                    >
                      <FaPlus className="mr-2" /> Add Scope Item
                    </button>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                      <button
                        className="flex items-center px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                        onClick={handleSaveChanges}
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
                          Scope/Capabilities to deliver
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">Short description</th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">End-game</th>
                        {isAdmin && currentVersionId === versionHistory.length && (
                          <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700 w-24">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.scopeItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200">
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.capability}</td>
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.description}</td>
                          <td className="p-3 border border-gray-300 dark:border-gray-700 whitespace-pre-line">{item.endGame}</td>
                          {isAdmin && currentVersionId === versionHistory.length && (
                            <td className="p-3 border border-gray-300 dark:border-gray-700 text-center">
                              <button
                                className="p-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                onClick={() => handleDeleteItem("scope", index)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Critical Interdependencies Section */}
          <div className="mb-6 border rounded-lg overflow-hidden border-gray-300 dark:border-gray-700">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("interdependencies")}
            >
              <h2 className="font-bold">Critical Interdependencies</h2>
              <div className="flex items-center">
                {isAdmin && currentVersionId === versionHistory.length && !isEditing && (
                  <>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddItem("interdependencies")
                      }}
                    >
                      <FaPlus className="mr-1" /> Add
                    </button>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditSection("interdependencies")
                      }}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </>
                )}
                {expandedSections.interdependencies ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>

            {expandedSections.interdependencies && (
              <div className="overflow-x-auto">
                {isEditing && editingSection === "interdependencies" ? (
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Interdependencies</h3>
                    {editData.interdependencies.map((item, index) => (
                      <div key={index} className="mb-6 p-4 border rounded-lg border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Interdependency #{index + 1}</h4>
                          <button
                            className="flex items-center px-2 py-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              const updatedItems = [...editData.interdependencies]
                              updatedItems.splice(index, 1)
                              setEditData({ ...editData, interdependencies: updatedItems })
                            }}
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Item</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.item}
                              onChange={(e) => handleEditItem("interdependencies", index, "item", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.description}
                              onChange={(e) => handleEditItem("interdependencies", index, "description", e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mb-4"
                      onClick={() => {
                        setEditData({
                          ...editData,
                          interdependencies: [{ item: "", description: "" }, ...editData.interdependencies],
                        })
                      }}
                    >
                      <FaPlus className="mr-2" /> Add Interdependency
                    </button>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                      <button
                        className="flex items-center px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                        onClick={handleSaveChanges}
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">Item</th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">Description</th>
                        {isAdmin && currentVersionId === versionHistory.length && (
                          <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700 w-24">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.interdependencies.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200">
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.item}</td>
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.description}</td>
                          {isAdmin && currentVersionId === versionHistory.length && (
                            <td className="p-3 border border-gray-300 dark:border-gray-700 text-center">
                              <button
                                className="p-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                onClick={() => handleDeleteItem("interdependencies", index)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Key Risks Section */}
          <div className="mb-6 border rounded-lg overflow-hidden border-gray-300 dark:border-gray-700">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("risks")}
            >
              <h2 className="font-bold">Key Risks</h2>
              <div className="flex items-center">
                {isAdmin && currentVersionId === versionHistory.length && !isEditing && (
                  <>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddItem("risks")
                      }}
                    >
                      <FaPlus className="mr-1" /> Add
                    </button>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditSection("risks")
                      }}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </>
                )}
                {expandedSections.risks ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>

            {expandedSections.risks && (
              <div className="overflow-x-auto">
                {isEditing && editingSection === "risks" ? (
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Risks</h3>
                    {editData.keyRisks.map((item, index) => (
                      <div key={index} className="mb-6 p-4 border rounded-lg border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Risk #{index + 1}</h4>
                          <button
                            className="flex items-center px-2 py-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              const updatedItems = [...editData.keyRisks]
                              updatedItems.splice(index, 1)
                              setEditData({ ...editData, keyRisks: updatedItems })
                            }}
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Risk</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.risk}
                              onChange={(e) => handleEditItem("risks", index, "risk", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.description}
                              onChange={(e) => handleEditItem("risks", index, "description", e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mb-4"
                      onClick={() => {
                        setEditData({
                          ...editData,
                          keyRisks: [{ risk: "", description: "" }, ...editData.keyRisks],
                        })
                      }}
                    >
                      <FaPlus className="mr-2" /> Add Risk
                    </button>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                      <button
                        className="flex items-center px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                        onClick={handleSaveChanges}
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">Risk</th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
                          Description / Mitigation (if available)
                        </th>
                        {isAdmin && currentVersionId === versionHistory.length && (
                          <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700 w-24">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.keyRisks.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200">
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.risk}</td>
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.description}</td>
                          {isAdmin && currentVersionId === versionHistory.length && (
                            <td className="p-3 border border-gray-300 dark:border-gray-700 text-center">
                              <button
                                className="p-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                onClick={() => handleDeleteItem("risks", index)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Key Deliverables Section */}
          <div className="mb-6 border rounded-lg

 overflow-hidden border-gray-300 dark:border-gray-700">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("deliverables")}
            >
              <h2 className="font-bold">Key Deliverables</h2>
              <div className="flex items-center">
                {isAdmin && currentVersionId === versionHistory.length && !isEditing && (
                  <>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddItem("deliverables")
                      }}
                    >
                      <FaPlus className="mr-1" /> Add
                    </button>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditSection("deliverables")
                      }}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </>
                )}
                {expandedSections.deliverables ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>

            {expandedSections.deliverables && (
              <div className="overflow-x-auto">
                {isEditing && editingSection === "deliverables" ? (
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Deliverables</h3>
                    {editData.deliverables.map((item, index) => (
                      <div key={index} className="mb-6 p-4 border rounded-lg border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Deliverable #{index + 1}</h4>
                          <button
                            className="flex items-center px-2 py-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              const updatedItems = [...editData.deliverables]
                              updatedItems.splice(index, 1)
                              setEditData({ ...editData, deliverables: updatedItems })
                            }}
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Deliverable</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.name}
                              onChange={(e) => handleEditItem("deliverables", index, "name", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.date}
                              onChange={(e) => handleEditItem("deliverables", index, "date", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mb-4"
                      onClick={() => {
                        setEditData({
                          ...editData,
                          deliverables: [{ name: "", date: "" }, ...editData.deliverables],
                        })
                      }}
                    >
                      <FaPlus className="mr-2" /> Add Deliverable
                    </button>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                      <button
                        className="flex items-center px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                        onClick={handleSaveChanges}
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700">
                          Deliverable
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700">Date</th>
                        {isAdmin && currentVersionId === versionHistory.length && (
                          <th className="p-4 text-center font-semibold text-gray-700 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700 w-24">
                            Actions
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.deliverables.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                        >
                          <td className="p-4 flex items-center">{item.name}</td>
                          <td className="p-4">{item.date}</td>
                          {isAdmin && currentVersionId === versionHistory.length && (
                            <td className="p-4 text-center">
                              <button
                                className="p-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                onClick={() => handleDeleteItem("deliverables", index)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Resource Requirements Section */}
          <div className="mb-6 border rounded-lg overflow-hidden border-gray-300 dark:border-gray-700">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("resources")}
            >
              <h2 className="font-bold">Resource Requirements</h2>
              <div className="flex items-center">
                {isAdmin && currentVersionId === versionHistory.length && !isEditing && (
                  <>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddItem("resources")
                      }}
                    >
                      <FaPlus className="mr-1" /> Add
                    </button>
                    <button
                      className="flex items-center px-2 py-1 text-white hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] mr-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditSection("resources")
                      }}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </>
                )}
                {expandedSections.resources ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>

            {expandedSections.resources && (
              <div className="overflow-x-auto">
                {isEditing && editingSection === "resources" ? (
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Resources</h3>
                    {editData.resources.map((item, index) => (
                      <div key={index} className="mb-6 p-4 border rounded-lg border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">Resource #{index + 1}</h4>
                          <button
                            className="flex items-center px-2 py-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                              const updatedItems = [...editData.resources]
                              updatedItems.splice(index, 1)
                              setEditData({ ...editData, resources: updatedItems })
                            }}
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Role</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.role}
                              onChange={(e) => handleEditItem("resources", index, "role", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Required</label>
                            <select
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.required}
                              onChange={(e) => handleEditItem("resources", index, "required", e.target.value)}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.name}
                              onChange={(e) => handleEditItem("resources", index, "name", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">FTE</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                              value={item.fte}
                              onChange={(e) => handleEditItem("resources", index, "fte", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 mb-4"
                      onClick={() => {
                        setEditData({
                          ...editData,
                          resources: [{ role: "", required: "Yes", name: "", fte: "" }, ...editData.resources],
                        })
                      }}
                    >
                      <FaPlus className="mr-2" /> Add Resource
                    </button>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes className="mr-2" /> Cancel
                      </button>
                      <button
                        className="flex items-center px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                        onClick={handleSaveChanges}
                      >
                        <FaSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">Role</th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">Required</th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">Name(s)</th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">FTE</th>
                        {isAdmin && currentVersionId === versionHistory.length && (
                          <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700 w-24">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.resources.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200">
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.role}</td>
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.required}</td>
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.name}</td>
                          <td className="p-3 border border-gray-300 dark:border-gray-700">{item.fte}</td>
                          {isAdmin && currentVersionId === versionHistory.length && (
                            <td className="p-3 border border-gray-300 dark:border-gray-700 text-center">
                              <button
                                className="p-1 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                                onClick={() => handleDeleteItem("resources", index)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Version History Dialog */}
        {isVersionHistoryOpen && (
          <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Version History</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {versionHistory.map((version) => (
                  <div
                    key={version.id}
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${currentVersionId === version.id ? "bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-600" : "border-gray-300 dark:border-gray-600"
                      }`}
                    onClick={() => setCurrentVersionId(version.id)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Version {version.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{format(version.date, "MMM d, yyyy")}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Author: {version.author}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Changes: {version.changes}</p>
                      </div>
                      {currentVersionId === version.id && (
                        <span className="text-[#00308F] dark:text-[#4A6CF7] font-semibold">Current</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setIsVersionHistoryOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Version Description Dialog */}
        {isVersionDialogOpen && (
          <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Save New Version</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Change Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                  value={changeDescription}
                  onChange={(e) => setChangeDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe the changes made"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsVersionDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                  onClick={createNewVersion}
                >
                  Save Version
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Item Dialog */}
        {isAddItemDialogOpen && (
          <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add New {addItemType.charAt(0).toUpperCase() + addItemType.slice(1)} Item</h2>
              <div className="grid gap-4">
                {addItemType === "scope" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Capability</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.capability}
                        onChange={(e) => setNewItemData({ ...newItemData, capability: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.description}
                        onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">End Game</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.endGame}
                        onChange={(e) => setNewItemData({ ...newItemData, endGame: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </>
                )}
                {addItemType === "interdependencies" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Item</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.item}
                        onChange={(e) => setNewItemData({ ...newItemData, item: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.description}
                        onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </>
                )}
                {addItemType === "risks" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Risk</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.risk}
                        onChange={(e) => setNewItemData({ ...newItemData, risk: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.description}
                        onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </>
                )}
                {addItemType === "deliverables" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Deliverable</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.name}
                        onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                        value={newItemData.date}
                        onChange={(e) => setNewItemData({ ...newItemData, date: e.target.value })}
                      />
                    </div>
                  </>
                )}
                {addItemType === "resources" && (
  <>
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Role</label>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
        value={newItemData.role}
        onChange={(e) => setNewItemData({ ...newItemData, role: e.target.value })}
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Required</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
        value={newItemData.required}
        onChange={(e) => setNewItemData({ ...newItemData, required: e.target.value })}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
        value={newItemData.name}
        onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">FTE</label>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
        value={newItemData.fte}
        onChange={(e) => setNewItemData({ ...newItemData, fte: e.target.value })}
      />
    </div>
  </>
)}
</div>
<div className="flex justify-end space-x-2 mt-4">
  <button
    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    onClick={() => setIsAddItemDialogOpen(false)}
  >
    Cancel
  </button>
  <button
    className="px-3 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
    onClick={saveNewItem}
  >
    Add Item
  </button>
</div>
</div>
</div>
)}

{/* Delete Confirmation Dialog */}
{isDeleteDialogOpen && (
<div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
  <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Confirm Deletion</h2>
    <p className="mb-4 text-gray-600 dark:text-gray-400">Are you sure you want to delete this {deleteItemData.type} item?</p>
    <div className="flex justify-end space-x-2">
      <button
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={cancelDeleteItem}
      >
        Cancel
      </button>
      <button
        className="px-3 py-2 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={confirmDeleteItem}
      >
        Delete
      </button>
    </div>
  </div>
</div>
)}
</div>
</div>
)
}