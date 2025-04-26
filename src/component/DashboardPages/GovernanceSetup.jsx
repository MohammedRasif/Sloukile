import { useState } from "react"
import {
  Users,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Building,
  Calendar,
  AlertCircle,
  Edit, // Added Edit icon
} from "lucide-react"

const GovernanceSetup = () => {
  const [expandedSections, setExpandedSections] = useState({
    structure: true,
    impact: true,
  })

  // State for editable text in Governance Structure
  const [structureData, setStructureData] = useState([
    { title: "Executive Steering Committee", description: "Strategic Direction & Final Approval" },
    { title: "Project Sponsor", description: "Resource Allocation & Accountability" },
    { title: "Project Manager", description: "Day-to-day Management & Reporting" },
    [
      { title: "Technical Team", description: "Implementation" },
      { title: "Business Analysts", description: "Requirements" },
      { title: "Quality Assurance", description: "Testing & Validation" },
    ],
  ])

  // State for editable text in Project Impact Analysis
  const [impactData, setImpactData] = useState({
    userImpact: [
      "New workflow requires training",
      "30% productivity improvement expected",
      "Reduced manual data entry",
    ],
    businessImpact: [
      "15% cost reduction in operations",
      "Improved data accuracy and reporting",
      "Competitive advantage in market",
    ],
    timelineImpact: [
      "3-month implementation period",
      "Phased rollout by department",
      "2-week transition support per phase",
    ],
  })

  // State for editable risks table
  const [risks, setRisks] = useState([
    {
      risk: "User resistance to change",
      impact: "High",
      probability: "Medium",
      mitigation: "Early engagement, training, champions program",
    },
    {
      risk: "Integration issues",
      impact: "Medium",
      probability: "Medium",
      mitigation: "Early testing, phased approach, rollback plan",
    },
    {
      risk: "Resource constraints",
      impact: "Medium",
      probability: "High",
      mitigation: "Prioritization, external resources, scope management",
    },
  ])

  // State for modals and form inputs
  const [showLevelModal, setShowLevelModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showImpactModal, setShowImpactModal] = useState({ userImpact: false, businessImpact: false, timelineImpact: false })
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false) // New state for edit modal
  const [editModalData, setEditModalData] = useState({ type: "", index: null, field: "", value: "" }) // Data for edit modal

  const [newLevelInput, setNewLevelInput] = useState({ title: "", description: "" })
  const [newTeamInput, setNewTeamInput] = useState({ title: "", description: "" })
  const [newImpactInput, setNewImpactInput] = useState({ userImpact: "", businessImpact: "", timelineImpact: "" })
  const [newRiskInput, setNewRiskInput] = useState({ risk: "", impact: "Medium", probability: "Medium", mitigation: "" })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Functions to handle adding new items via modal forms
  const addStructureLevel = () => {
    if (newLevelInput.title.trim() && newLevelInput.description.trim()) {
      setStructureData((prev) => [...prev, { title: newLevelInput.title, description: newLevelInput.description }])
      setNewLevelInput({ title: "", description: "" })
      setShowLevelModal(false)
    }
  }

  const addTeam = () => {
    if (newTeamInput.title.trim() && newTeamInput.description.trim()) {
      setStructureData((prev) => {
        const lastItem = prev[prev.length - 1]
        if (Array.isArray(lastItem)) {
          return [...prev.slice(0, -1), [...lastItem, { title: newTeamInput.title, description: newTeamInput.description }]]
        }
        return [...prev, [{ title: newTeamInput.title, description: newTeamInput.description }]]
      })
      setNewTeamInput({ title: "", description: "" })
      setShowTeamModal(false)
    }
  }

  const addImpactItem = (section) => {
    if (newImpactInput[section].trim()) {
      setImpactData((prev) => ({
        ...prev,
        [section]: [...prev[section], newImpactInput[section]],
      }))
      setNewImpactInput((prev) => ({ ...prev, [section]: "" }))
      setShowImpactModal((prev) => ({ ...prev, [section]: false }))
    }
  }

  const addRisk = () => {
    if (newRiskInput.risk.trim() && newRiskInput.mitigation.trim()) {
      setRisks((prev) => [...prev, { ...newRiskInput }])
      setNewRiskInput({ risk: "", impact: "Medium", probability: "Medium", mitigation: "" })
      setShowRiskModal(false)
    }
  }

  // Function to open edit modal
  const openEditModal = (type, index, field, value, teamIndex = null) => {
    setEditModalData({ type, index, field, value, teamIndex })
    setShowEditModal(true)
  }

  // Function to handle edit modal save
  const saveEdit = () => {
    const { type, index, field, value, teamIndex } = editModalData

    if (type === "structure") {
      setStructureData((prev) => {
        const newData = [...prev]
        if (Array.isArray(newData[index])) {
          return newData
        }
        newData[index] = { ...newData[index], [field]: value }
        return newData
      })
    } else if (type === "team") {
      setStructureData((prev) => {
        const newData = [...prev]
        const teams = newData[newData.length - 1]
        if (Array.isArray(teams)) {
          teams[teamIndex] = { ...teams[teamIndex], [field]: value }
        }
        return newData
      })
    } else if (type === "impact") {
      setImpactData((prev) => {
        const newSectionData = [...prev[field]]
        newSectionData[index] = value
        return { ...prev, [field]: newSectionData }
      })
    } else if (type === "risk") {
      setRisks((prev) => {
        const newRisks = [...prev]
        newRisks[index] = { ...newRisks[index], [field]: value }
        return newRisks
      })
    } else if (type === "header") {
      // Handle header edits if needed
    }

    setShowEditModal(false)
    setEditModalData({ type: "", index: null, field: "", value: "" })
  }

  return (
    <div className="container py-6 bg-white dark:bg-[#1E232E] rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center">
          <h1
            className="text-3xl font-bold text-gray-800 dark:text-gray-200 mr-2"
          >
            Governance Setup
          </h1>
          <Edit
            className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
            onClick={() => openEditModal("header", null, "title", "Governance Setup")}
          />
        </div>
        <div className="flex items-center">
          <p
            className="text-gray-600 dark:text-gray-400"
          >
            Communication Flow and Stakeholder Management
          </p>
          <Edit
            className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer ml-2"
            onClick={() => openEditModal("header", null, "subtitle", "Communication Flow and Stakeholder Management")}
          />
        </div>
      </div>

      {/* Governance Structure Section */}
      <div className="mb-8 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div
          className="bg-blue-50 dark:bg-[#3B5AEB]/20 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("structure")}
        >
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mr-2">
              Governance Structure
            </h2>
            <Edit
              className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation() // Prevent section toggle
                openEditModal("header", null, "structureTitle", "Governance Structure")
              }}
            />
          </div>
          {expandedSections.structure ? (
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>

        {expandedSections.structure && (
          <div className="p-4 bg-white dark:bg-[#1E232E]">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-5xl">
                {structureData.map((level, index) => {
                  if (Array.isArray(level)) {
                    return (
                      <div key={index} className="flex justify-center mb-4">
                        <div className="w-full flex justify-between items-start space-x-5">
                          {level.map((team, teamIndex) => (
                            <div key={teamIndex} className="w-1/3 flex flex-col items-center">
                              <div className="h-8 w-1 bg-gray-300 dark:bg-gray-600"></div>
                              <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-2 rounded-lg text-center w-full">
                                <div className="flex items-center justify-center">
                                  <p className="font-bold mr-2">{team.title}</p>
                                  <Edit
                                    className="h-4 w-4 text-blue-100 dark:text-blue-200 cursor-pointer"
                                    onClick={() => openEditModal("team", index, "title", team.title, teamIndex)}
                                  />
                                </div>
                                <div className="flex items-center justify-center">
                                  <p className="text-xs text-blue-100 dark:text-blue-200">{team.description}</p>
                                  <Edit
                                    className="h-4 w-4 text-blue-100 dark:text-blue-200 cursor-pointer ml-2"
                                    onClick={() => openEditModal("team", index, "description", team.description, teamIndex)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div key={index}>
                      <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-3 rounded-lg text-center mb-4">
                        <div className="flex items-center justify-center">
                          <p className="font-bold mr-2">{level.title}</p>
                          <Edit
                            className="h-4 w-4 text-blue-100 dark:text-blue-200 cursor-pointer"
                            onClick={() => openEditModal("structure", index, "title", level.title)}
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <p className="text-sm text-blue-100 dark:text-blue-200">{level.description}</p>
                          <Edit
                            className="h-4 w-4 text-blue-100 dark:text-blue-200 cursor-pointer ml-2"
                            onClick={() => openEditModal("structure", index, "description", level.description)}
                          />
                        </div>
                      </div>
                      {index < structureData.length - 1 && (
                        <div className="flex justify-center mb-4">
                          <div className="w-1 h-8 bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                      )}
                    </div>
                  )
                })}
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => setShowLevelModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Hierarchy Level
                  </button>
                  <button
                    onClick={() => setShowTeamModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Impact Analysis Section */}
      <div className="mb-8 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer bg-white dark:bg-[#2A2F3B]"
          onClick={() => toggleSection("impact")}
        >
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mr-2">
              Project Impact Analysis
            </h2>
            <Edit
              className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                openEditModal("header", null, "impactTitle", "Project Impact Analysis")
              }}
            />
          </div>
          {expandedSections.impact ? (
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>

        {expandedSections.impact && (
          <div className="p-4 bg-white dark:bg-[#1E232E]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* User Impact */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B] shadow-sm">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-2" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mr-2">User Impact</h3>
                  <Edit
                    className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
                    onClick={() => openEditModal("header", null, "userImpactTitle", "User Impact")}
                  />
                </div>
                <ul className="space-y-2">
                  {impactData.userImpact.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 mr-2">{item}</span>
                      <Edit
                        className="h-4 w-4 text-gray-600 dark:text-gray-400 cursor-pointer"
                        onClick={() => openEditModal("impact", index, "userImpact", item)}
                      />
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => setShowImpactModal((prev) => ({ ...prev, userImpact: true }))}
                      className="text-blue-500 hover:text-blue-600 text-sm mt-2"
                    >
                      + Add Item
                    </button>
                  </li>
                </ul>
              </div>

              {/* Business Impact */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B] shadow-sm">
                <div className="flex items-center mb-3">
                  <Building className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mr-2">Business Impact</h3>
                  <Edit
                    className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
                    onClick={() => openEditModal("header", null, "businessImpactTitle", "Business Impact")}
                  />
                </div>
                <ul className="space-y-2">
                  {impactData.businessImpact.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 mr-2">{item}</span>
                      <Edit
                        className="h-4 w-4 text-gray-600 dark:text-gray-400 cursor-pointer"
                        onClick={() => openEditModal("impact", index, "businessImpact", item)}
                      />
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => setShowImpactModal((prev) => ({ ...prev, businessImpact: true }))}
                      className="text-blue-500 hover:text-blue-600 text-sm mt-2"
                    >
                      + Add Item
                    </button>
                  </li>
                </ul>
              </div>

              {/* Timeline Impact */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B] shadow-sm">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mr-2">Timeline Impact</h3>
                  <Edit
                    className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
                    onClick={() => openEditModal("header", null, "timelineImpactTitle", "Timeline Impact")}
                  />
                </div>
                <ul className="space-y-2">
                  {impactData.timelineImpact.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 mr-2">{item}</span>
                      <Edit
                        className="h-4 w-4 text-gray-600 dark:text-gray-400 cursor-pointer"
                        onClick={() => openEditModal("impact", index, "timelineImpact", item)}
                      />
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => setShowImpactModal((prev) => ({ ...prev, timelineImpact: true }))}
                      className="text-blue-500 hover:text-blue-600 text-sm mt-2"
                    >
                      + Add Item
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Risk and Mitigation */}
            <div className="mt-6 border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B]">
              <div className="flex items-center mb-3">
                <h3 className="font-bold text-red-800 dark:text-red-400 mr-2">Key Risks and Mitigation</h3>
                <Edit
                  className="h-5 w-5 text-gray-600 dark:text-gray-400 cursor-pointer"
                  onClick={() => openEditModal("header", null, "riskTitle", "Key Risks and Mitigation")}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#353A47]">
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Risk</th>
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Impact</th>
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Probability</th>
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((risk, index) => (
                      <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#2A2F3B]"}>
                        <td className="py-2 px-4 border-b dark:border-gray-600">
                          <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 mr-2">{risk.risk}</span>
                            <Edit
                              className="h-4 w-4 text-gray-600 dark:text-gray-400 cursor-pointer"
                              onClick={() => openEditModal("risk", index, "risk", risk.risk)}
                            />
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b dark:border-gray-600">
                          <select
                            value={risk.impact}
                            onChange={(e) => updateRiskText(index, "impact", e.target.value)}
                            className={`px-2 py-1 rounded text-xs outline-none ${
                              risk.impact === "High"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                            }`}
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 border-b dark:border-gray-600">
                          <select
                            value={risk.probability}
                            onChange={(e) => updateRiskText(index, "probability", e.target.value)}
                            className={`px-2 py-1 rounded text-xs outline-none ${
                              risk.probability === "High"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                            }`}
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 border-b dark:border-gray-600">
                          <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 mr-2">{risk.mitigation}</span>
                            <Edit
                              className="h-4 w-4 text-gray-600 dark:text-gray-400 cursor-pointer"
                              onClick={() => openEditModal("risk", index, "mitigation", risk.mitigation)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => setShowRiskModal(true)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Risk
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Adding Hierarchy Level */}
      {showLevelModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] shadow-lg  flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Hierarchy Level</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter level title"
                  value={newLevelInput.title}
                  onChange={(e) => setNewLevelInput((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Enter level description"
                  value={newLevelInput.description}
                  onChange={(e) => setNewLevelInput((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowLevelModal(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addStructureLevel}
                className="bg-blue-500 text-white px-4 py-2 rounded Lipstickhover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Team */}
      {showTeamModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] shadow-lg  flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Team</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter team title"
                  value={newTeamInput.title}
                  onChange={(e) => setNewTeamInput((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Enter team description"
                  value={newTeamInput.description}
                  onChange={(e) => setNewTeamInput((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowTeamModal(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addTeam}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding User Impact */}
      {showImpactModal.userImpact && (
        <div className="fixed inset-0 backdrop-blur-[2px] shadow-lg  flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add User Impact</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Impact Item</label>
                <input
                  type="text"
                  placeholder="Enter user impact"
                  value={newImpactInput.userImpact}
                  onChange={(e) => setNewImpactInput((prev) => ({ ...prev, userImpact: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowImpactModal((prev) => ({ ...prev, userImpact: false }))}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => addImpactItem("userImpact")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Business Impact */}
      {showImpactModal.businessImpact && (
        <div className="fixed inset-0 backdrop-blur-[2px] shadow-lg flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Business Impact</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Impact Item</label>
                <input
                  type="text"
                  placeholder="Enter business impact"
                  value={newImpactInput.businessImpact}
                  onChange={(e) => setNewImpactInput((prev) => ({ ...prev, businessImpact: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </ div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowImpactModal((prev) => ({ ...prev, businessImpact: false }))}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => addImpactItem("businessImpact")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    
      {showImpactModal.timelineImpact && (
        <div className="fixed inset-0 backdrop-blur-[2px] shadow-lg  flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Timeline Impact</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Impact Item</label>
                <input
                  type="text"
                  placeholder="Enter timeline impact"
                  value={newImpactInput.timelineImpact}
                  onChange={(e) => setNewImpactInput((prev) => ({ ...prev, timelineImpact: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowImpactModal((prev) => ({ ...prev, timelineImpact: false }))}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => addImpactItem("timelineImpact")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

     
      {showRiskModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] shadow-lg  flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Risk</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Risk</label>
                <input
                  type="text"
                  placeholder="Enter risk"
                  value={newRiskInput.risk}
                  onChange={(e) => setNewRiskInput((prev) => ({ ...prev, risk: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Impact</label>
                <select
                  value={newRiskInput.impact}
                  onChange={(e) => setNewRiskInput((prev) => ({ ...prev, impact: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Probability</label>
                <select
                  value={newRiskInput.probability}
                  onChange={(e) => setNewRiskInput((prev) => ({ ...prev, probability: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Mitigation Strategy</label>
                <input
                  type="text"
                  placeholder="Enter mitigation strategy"
                  value={newRiskInput.mitigation}
                  onChange={(e) => setNewRiskInput((prev) => ({ ...prev, mitigation: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowRiskModal(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addRisk}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] shadow-lg  flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit {editModalData.field}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Value</label>
                <input
                  type="text"
                  value={editModalData.value}
                  onChange={(e) => setEditModalData((prev) => ({ ...prev, value: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GovernanceSetup