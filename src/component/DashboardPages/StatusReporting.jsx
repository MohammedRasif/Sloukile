import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"

// Initial sample data for status reports
const initialReports = [
    {
        id: "1",
        projectName: "Venue Selection",
        status: "In Progress",
        progress: 75,
        lastUpdated: "2025-05-15",
    },
    {
        id: "2",
        projectName: "Agenda Preparation",
        status: "Not Started",
        progress: 0,
        lastUpdated: "2025-05-10",
    },
    {
        id: "3",
        projectName: "Budget Planning",
        status: "Completed",
        progress: 100,
        lastUpdated: "2025-05-12",
    },
]

const StatusReporting = () => {
    // State for reports data
    const [reports, setReports] = useState(initialReports)

    // State for add/edit form
    const [showFormPopup, setShowFormPopup] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentReportId, setCurrentReportId] = useState(null)

    // State for form data
    const [formData, setFormData] = useState({
        projectName: "",
        status: "Not Started",
        progress: 0,
        lastUpdated: "",
    })

    // State for delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [reportToDelete, setReportToDelete] = useState(null)

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "progress" ? parseInt(value) || 0 : value,
        }))
    }

    // Open add report form
    const openAddForm = () => {
        setFormData({
            projectName: "",
            status: "Not Started",
            progress: 0,
            lastUpdated: "",
        })
        setIsEditing(false)
        setShowFormPopup(true)
    }

    // Open edit report form
    const openEditForm = (report) => {
        setFormData({
            projectName: report.projectName,
            status: report.status,
            progress: report.progress,
            lastUpdated: report.lastUpdated,
        })
        setCurrentReportId(report.id)
        setIsEditing(true)
        setShowFormPopup(true)
    }

    // Save report (add or update)
    const saveReport = () => {
        if (!formData.projectName || !formData.lastUpdated) {
            alert("Project Name and Last Updated date are required!")
            return
        }

        if (formData.progress < 0 || formData.progress > 100) {
            alert("Progress must be between 0 and 100!")
            return
        }

        if (isEditing) {
            // Update existing report
            setReports((prev) =>
                prev.map((report) =>
                    report.id === currentReportId ? { ...report, ...formData } : report
                )
            )
        } else {
            // Add new report
            const newReport = {
                id: `${Date.now()}`, // Simple unique ID
                ...formData,
            }
            setReports((prev) => [...prev, newReport])
        }

        setShowFormPopup(false)
        alert(isEditing ? "Report updated successfully!" : "Report added successfully!")
    }

    // Open delete confirmation
    const openDeleteConfirm = (reportId) => {
        setReportToDelete(reportId)
        setShowDeleteConfirm(true)
    }

    // Delete report
    const deleteReport = () => {
        setReports((prev) => prev.filter((report) => report.id !== reportToDelete))
        setShowDeleteConfirm(false)
        alert("Report deleted successfully!")
    }

    // Close popups
    const closePopup = () => {
        setShowFormPopup(false)
        setShowDeleteConfirm(false)
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800  dark:border-gray-600 rounded-lg ">
            <div className="flex justify-between items-center mb-6">
            <div>

            </div>
                <button
                    onClick={openAddForm}
                    className="flex items-center gap-1 bg-[#00308F]  text-white px-3 py-1.5 rounded-md transition-colors mt-2"
                >
                    <span>Add Report</span>
                </button>
            </div>

            {/* Reports Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Report ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Project Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Progress (%)
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Last Updated
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {report.id}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {report.projectName}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {report.status}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {report.progress}%
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {report.lastUpdated}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openEditForm(report)}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                title="Edit Report"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteConfirm(report.id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                title="Delete Report"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                                    No reports available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Report Popup */}
            {showFormPopup && (
                <div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white border border-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">
                            {isEditing ? "Edit Report" : "Add New Report"}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On Hold">On Hold</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Progress (%)</label>
                                <input
                                    type="number"
                                    name="progress"
                                    value={formData.progress}
                                    onChange={handleFormChange}
                                    min="0"
                                    max="100"
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Last Updated</label>
                                <input
                                    type="date"
                                    name="lastUpdated"
                                    value={formData.lastUpdated}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={closePopup}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveReport}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {isEditing ? "Update Report" : "Add Report"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">Confirm Delete</h2>
                        <p className="mb-6 dark:text-gray-300">
                            Are you sure you want to delete this report? This action cannot be undone.
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closePopup}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteReport}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
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

export default StatusReporting