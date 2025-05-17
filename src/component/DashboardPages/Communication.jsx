"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, X, Trash2, Share2, Link, Mail, Eye, Send } from "lucide-react"
import Meeting from "./Meeting"
import StatusReporting from "./StatusReporting"
import TrainingMaterial from "./TrainingMaterial"
import Surveys from "./Surveys"

export default function Communication() {
  const [activeTab, setActiveTab] = useState("newsletters")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add") // "add" or "edit"
  const [currentReport, setCurrentReport] = useState(null)
  const [formError, setFormError] = useState("")
  const [openShareRow, setOpenShareRow] = useState(null) // Track which row's share dropdown is open
  const shareDropdownRef = useRef(null) // Ref for dropdown to handle outside clicks
  const [communications, setCommunications] = useState([
    {
      title: "Project Kickoff Newsletter",
      type: "Newsletter",
      audience: "All Stakeholders",
      status: "Published",
      lastModified: "03-May-2023",
    },
    {
      title: "SteerCo Monthly Report",
      type: "Status Report",
      audience: "Steering Committee",
      status: "Draft",
      lastModified: "01-May-2023",
    },
    {
      title: "Workshop Agenda: Risk Planning",
      type: "Agenda",
      audience: "Working Group",
      status: "Scheduled",
      lastModified: "30-Apr-2023",
    },
    {
      title: "New Member Training Pack",
      type: "Training Material",
      audience: "Project Team",
      status: "Published",
      lastModified: "25-Apr-2023",
    },
  ])

  // Newsletter form data
  const [newsletterData, setNewsletterData] = useState({
    recipients: [],
    subject: "Task Update: [Project Name]",
    taskDetails: "",
    additionalContent: "",
  })

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setOpenShareRow(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Modal handlers
  const openAddModal = () => {
    setModalMode("add")
    setNewsletterData({
      recipients: [],
      subject: "Task Update: [Project Name]",
      taskDetails: "",
      additionalContent: "",
    })
    setFormError("")
    setIsModalOpen(true)
  }

  const openEditModal = (report) => {
    setModalMode("edit")
    setCurrentReport(report)
    setFormError("")
    setIsModalOpen(true)
  }

  const openDeleteModal = (report) => {
    setCurrentReport(report)
    setIsDeleteModalOpen(true)
  }

  const toggleShareDropdown = (title) => {
    setOpenShareRow(openShareRow === title ? null : title)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentReport(null)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setCurrentReport(null)
  }

  const handleNewsletterInputChange = (e) => {
    const { name, value } = e.target
    setNewsletterData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSendNewsletter = () => {
    // Validate and send newsletter
    if (!newsletterData.subject || !newsletterData.taskDetails) {
      setFormError("Subject and Task Details are required.")
      return
    }

    // Add the newsletter to communications
    const newNewsletter = {
      title: newsletterData.subject,
      type: "Newsletter",
      audience:
        newsletterData.recipients.length > 0 ? `${newsletterData.recipients.length} Recipients` : "No Recipients",
      status: "Published",
      lastModified: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }

    setCommunications([...communications, newNewsletter])
    closeModal()
  }

  const handleDelete = () => {
    setCommunications(communications.filter((c) => !(c.title === currentReport.title && c.type === currentReport.type)))
    closeDeleteModal()
  }

  const handleEmailShare = (title) => {
    const shareUrl = `https://yourapp.com/newsletter/${encodeURIComponent(title)}`
    const subject = encodeURIComponent(title)
    const body = encodeURIComponent(`Check out this newsletter: ${shareUrl}`)
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`
    try {
      window.location.href = mailtoUrl
      setOpenShareRow(null) // Close dropdown after action
    } catch (error) {
      console.error("Email share failed:", error)
      alert("Failed to open email client. Please check your email settings.")
    }
  }

  const handleTeamsShare = (title) => {
    const shareUrl = `https://yourapp.com/newsletter/${encodeURIComponent(title)}`
    const teamsUrl = `https://teams.microsoft.com/share?href=${encodeURIComponent(shareUrl)}&msgText=${encodeURIComponent(title)}`
    try {
      window.open(teamsUrl, "_blank")
      setOpenShareRow(null) // Close dropdown after action
    } catch (error) {
      console.error("Teams share failed:", error)
      alert("Failed to open Microsoft Teams. Please ensure Teams is installed and you are logged in.")
    }
  }

  const handleCopyLink = async (title) => {
    const shareUrl = `https://yourapp.com/newsletter/${encodeURIComponent(title)}`
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        alert("Link copied to clipboard!")
      } else {
        console.warn("Clipboard API not supported. Falling back to prompt.")
        prompt("Copy this link:", shareUrl)
      }
      setOpenShareRow(null) // Close dropdown after action
    } catch (error) {
      console.error("Copy link failed:", error)
      prompt("Copy this link:", shareUrl)
    }
  }

  const tabs = [
    { id: "newsletters", label: "Newsletters" },
    { id: "status-reporting", label: "Status Reporting" },
    { id: "meeting-minutes", label: "Meeting Minutes" },
    { id: "training-material", label: "Training Material" },
    { id: "surveys", label: "Surveys" },
  ]

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
        <div className="flex gap-2">
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <Plus className="h-4 w-4 mr-2" /> Create New Communication
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="mb-4 flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium ${activeTab === tab.id ? "text-gray-900 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between mb-4"></div>

          {activeTab === "newsletters" && (
            <div className="bg-white rounded-md shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Audience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {communications
                    .filter((comm) => comm.type === "Newsletter")
                    .map((comm) => (
                      <tr key={comm.title}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comm.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comm.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comm.audience}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${comm.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : comm.status === "Draft"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                          >
                            {comm.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comm.lastModified}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 relative">
                          <button
                            onClick={() => openEditModal(comm)}
                            className="text-blue-600 hover:text-blue-800 bg-gray-200 py-1 px-2 rounded-sm cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(comm)}
                            className="text-red-600 hover:text-red-800 bg-gray-200 py-1 px-2 rounded-sm cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleShareDropdown(comm.title)}
                            className="text-[#00308F] hover:text-blue-900 bg-gray-200 py-1 px-2 rounded-sm cursor-pointer"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                          {openShareRow === comm.title && (
                            <div
                              ref={shareDropdownRef}
                              className="absolute right-0 top-10 bg-white border border-gray-300 shadow-lg rounded-md p-2 flex gap-2 z-50"
                            >
                              <button
                                onClick={() => handleEmailShare(comm.title)}
                                className="text-gray-700 hover:text-[#00308F] p-1"
                                title="Share via Email"
                              >
                                <Mail className="h-6 w-6" />
                              </button>
                              <button
                                onClick={() => handleTeamsShare(comm.title)}
                                className="text-gray-700 hover:text-[#00308F] p-1"
                                title="Share via Microsoft Teams"
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4h-2a2 2 0 01-2-2v-6a2 2 0 012-2h2m-2 0V4a2 2 0 012-2h2a2 2 0 012 2v4h-2z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleCopyLink(comm.title)}
                                className="text-gray-700 hover:text-[#00308F] p-1"
                                title="Copy Link for Portal"
                              >
                                <Link className="h-6 w-6" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "meeting-minutes" && <Meeting />}
          {activeTab === "status-reporting" && <StatusReporting />}
          {activeTab === "training-material" && <TrainingMaterial/>}
          {activeTab === "surveys" && <Surveys/>}
        </div>
      </div>

      {/* Newsletter Creation Modal - Styled like the image */}
      {isModalOpen && (
        <div className="fixed inset-0  backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 overflow-hidden border border-gray-300">
            <div className="flex flex-col h-full">
              {/* Header with title */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center">
                <Mail className="h-5 w-5 text-[#00308F] mr-2" />
                <h2 className="text-xl font-bold text-[#00308F]">Task Update Newsletter</h2>
              </div>

              {/* Content area */}
              <div className="flex flex-col md:flex-row h-full">
                {/* Left side - Form */}
                <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
                  {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}

                  {/* Recipients */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <svg
                        className="h-5 w-5 text-gray-500 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <label className="text-sm font-medium text-gray-700">Select Recipients</label>
                    </div>
                    <div className="relative">
                      <select className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select users...</option>
                        <option value="team">Project Team</option>
                        <option value="stakeholders">All Stakeholders</option>
                        <option value="steering">Steering Committee</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">0 recipients selected</p>
                  </div>

                  {/* Subject Line */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                    <input
                      type="text"
                      name="subject"
                      value={newsletterData.subject}
                      onChange={handleNewsletterInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Task Update Details */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Update Details</label>
                    <textarea
                      name="taskDetails"
                      value={newsletterData.taskDetails}
                      onChange={handleNewsletterInputChange}
                      rows={5}
                      placeholder="Describe the recent task updates..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  {/* Additional Content */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Content</label>
                    <textarea
                      name="additionalContent"
                      value={newsletterData.additionalContent}
                      onChange={handleNewsletterInputChange}
                      rows={5}
                      placeholder="Add any additional information or context..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                </div>

                {/* Right side - Preview */}
                <div className="w-full md:w-1/2 bg-gray-50 p-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 h-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Newsletter Template</h3>
                      <button className="text-blue-600 flex items-center text-sm">
                        <Eye className="h-4 w-4 mr-1" /> Preview
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">This newsletter will include:</p>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <span className="text-gray-700 mr-2">•</span>
                        <span className="text-sm">Greeting to recipients</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-700 mr-2">•</span>
                        <span className="text-sm">Task update introduction</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-700 mr-2">•</span>
                        <span className="text-sm">Task update details</span>
                        <span className="text-red-500 ml-1">X</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-700 mr-2">•</span>
                        <span className="text-sm">Additional content</span>
                        <span className="text-red-500 ml-1">X</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-700 mr-2">•</span>
                        <span className="text-sm">Sign-off</span>
                      </li>
                    </ul>

                    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 mb-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Tips:</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li className="flex items-start">
                          <span className="text-yellow-800 mr-2">•</span>
                          <span>Keep your update concise and focused</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-800 mr-2">•</span>
                          <span>Highlight key achievements or milestones</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-800 mr-2">•</span>
                          <span>Include next steps or action items if applicable</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-800 mr-2">•</span>
                          <span>Use a professional but friendly tone</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with buttons */}
              <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendNewsletter}
                    className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-blue-800 flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" /> Send Newsletter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Confirm Delete</h2>
              <button onClick={closeDeleteModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Are you sure you want to delete "{currentReport?.title}"?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
