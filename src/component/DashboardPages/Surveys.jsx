import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"

// Initial sample data for surveys
const initialSurveys = [
    {
        id: "1",
        name: "Employee Satisfaction",
        audience: "All Employees",
        status: "Draft",
        createdDate: "2025-05-15 06:00 PM +06",
    },
    {
        id: "2",
        name: "Customer Feedback",
        audience: "Customers",
        status: "In Progress",
        createdDate: "2025-05-16 03:30 PM +06",
    },
    {
        id: "3",
        name: "Team Performance",
        audience: "Team Leads",
        status: "Completed",
        createdDate: "2025-05-17 06:08 PM +06",
    },
]

const Surveys = () => {
    // State for surveys data
    const [surveys, setSurveys] = useState(initialSurveys)

    // State for add/edit form
    const [showFormPopup, setShowFormPopup] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentSurveyId, setCurrentSurveyId] = useState(null)

    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        audience: "All Employees",
        status: "Draft",
        createdDate: "",
    })

    // State for delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [surveyToDelete, setSurveyToDelete] = useState(null)

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Open add survey form
    const openAddForm = () => {
        setFormData({
            name: "",
            audience: "All Employees",
            status: "Draft",
            createdDate: "",
        })
        setIsEditing(false)
        setShowFormPopup(true)
    }

    // Open edit survey form
    const openEditForm = (survey) => {
        setFormData({
            name: survey.name,
            audience: survey.audience,
            status: survey.status,
            createdDate: survey.createdDate,
        })
        setCurrentSurveyId(survey.id)
        setIsEditing(true)
        setShowFormPopup(true)
    }

    // Save survey (add or update)
    const saveSurvey = () => {
        if (!formData.name || !formData.createdDate) {
            alert("Survey Name and Created Date are required!")
            return
        }

        if (isEditing) {
            // Update existing survey
            setSurveys((prev) =>
                prev.map((survey) =>
                    survey.id === currentSurveyId ? { ...survey, ...formData } : survey
                )
            )
        } else {
            // Add new survey
            const newSurvey = {
                id: `${Date.now()}`, // Simple unique ID
                ...formData,
            }
            setSurveys((prev) => [...prev, newSurvey])
        }

        setShowFormPopup(false)
        alert(isEditing ? "Survey updated successfully!" : "Survey added successfully!")
    }

    // Open delete confirmation
    const openDeleteConfirm = (surveyId) => {
        setSurveyToDelete(surveyId)
        setShowDeleteConfirm(true)
    }

    // Delete survey
    const deleteSurvey = () => {
        setSurveys((prev) => prev.filter((survey) => survey.id !== surveyToDelete))
        setShowDeleteConfirm(false)
        alert("Survey deleted successfully!")
    }

    // Close popups
    const closePopup = () => {
        setShowFormPopup(false)
        setShowDeleteConfirm(false)
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    
                </div>
                <button
                    onClick={openAddForm}
                    className="flex items-center gap-1 bg-[#00308F]  text-white px-3 py-1.5 rounded-md transition-colors"
                >
                    <span>Add Survey</span>
                </button>
            </div>

            {/* Surveys Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Survey Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Target Audience
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Created Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {surveys.length > 0 ? (
                            surveys.map((survey) => (
                                <tr key={survey.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {survey.name}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {survey.audience}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {survey.status}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {survey.createdDate}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openEditForm(survey)}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                title="Edit Survey"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteConfirm(survey.id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                title="Delete Survey"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                                    No surveys available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Survey Popup */}
            {showFormPopup && (
                <div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white border border-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">
                            {isEditing ? "Edit Survey" : "Add New Survey"}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Survey Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Target Audience</label>
                                <select
                                    name="audience"
                                    value={formData.audience}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="All Employees">All Employees</option>
                                    <option value="Customers">Customers</option>
                                    <option value="Team Leads">Team Leads</option>
                                    <option value="Managers">Managers</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Created Date</label>
                                <input
                                    type="datetime-local"
                                    name="createdDate"
                                    value={formData.createdDate}
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
                                onClick={saveSurvey}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {isEditing ? "Update Survey" : "Add Survey"}
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
                            Are you sure you want to delete this survey? This action cannot be undone.
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closePopup}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteSurvey}
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

export default Surveys