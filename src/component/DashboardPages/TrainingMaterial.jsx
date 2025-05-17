import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"

// Initial sample data for training materials
const initialMaterials = [
    {
        id: "1",
        name: "User Guide",
        audience: "End Users",
        format: "PDF",
        status: "Draft",
    },
    {
        id: "2",
        name: "Admin Manual",
        audience: "Administrators",
        format: "PDF",
        status: "Not Started",
    },
    {
        id: "3",
        name: "Video Tutorials",
        audience: "End Users",
        format: "MP4",
        status: "Not Started",
    },
]

const TrainingMaterial = () => {
    // State for training materials data
    const [materials, setMaterials] = useState(initialMaterials)

    // State for add/edit form
    const [showFormPopup, setShowFormPopup] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentMaterialId, setCurrentMaterialId] = useState(null)

    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        audience: "End Users",
        format: "PDF",
        status: "Not Started",
    })

    // State for delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [materialToDelete, setMaterialToDelete] = useState(null)

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Open add material form
    const openAddForm = () => {
        setFormData({
            name: "",
            audience: "End Users",
            format: "PDF",
            status: "Not Started",
        })
        setIsEditing(false)
        setShowFormPopup(true)
    }

    // Open edit material form
    const openEditForm = (material) => {
        setFormData({
            name: material.name,
            audience: material.audience,
            format: material.format,
            status: material.status,
        })
        setCurrentMaterialId(material.id)
        setIsEditing(true)
        setShowFormPopup(true)
    }

    // Save material (add or update)
    const saveMaterial = () => {
        if (!formData.name) {
            alert("Material Name is required!")
            return
        }

        if (isEditing) {
            // Update existing material
            setMaterials((prev) =>
                prev.map((material) =>
                    material.id === currentMaterialId ? { ...material, ...formData } : material
                )
            )
        } else {
            // Add new material
            const newMaterial = {
                id: `${Date.now()}`, // Simple unique ID
                ...formData,
            }
            setMaterials((prev) => [...prev, newMaterial])
        }

        setShowFormPopup(false)
        alert(isEditing ? "Material updated successfully!" : "Material added successfully!")
    }

    // Open delete confirmation
    const openDeleteConfirm = (materialId) => {
        setMaterialToDelete(materialId)
        setShowDeleteConfirm(true)
    }

    // Delete material
    const deleteMaterial = () => {
        setMaterials((prev) => prev.filter((material) => material.id !== materialToDelete))
        setShowDeleteConfirm(false)
        alert("Material deleted successfully!")
    }

    // Close popups
    const closePopup = () => {
        setShowFormPopup(false)
        setShowDeleteConfirm(false)
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg ">
            <div className="flex justify-between items-center mb-6">
                <h1 ></h1>
                <button
                    onClick={openAddForm}
                    className="flex items-center gap-1 bg-[#00308F]  text-white px-3 py-1.5 rounded-md transition-colors"
                >
                    <span>Add Material</span>
                </button>
            </div>

            {/* Materials Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Audience
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Format
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {materials.length > 0 ? (
                            materials.map((material) => (
                                <tr key={material.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {material.name}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {material.audience}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {material.format}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                        {material.status}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => openEditForm(material)}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                title="Edit Material"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteConfirm(material.id)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                title="Delete Material"
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
                                    No training materials available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Material Popup */}
            {showFormPopup && (
                <div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white border border-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">
                            {isEditing ? "Edit Material" : "Add New Material"}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Name</label>
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
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Audience</label>
                                <select
                                    name="audience"
                                    value={formData.audience}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="End Users">End Users</option>
                                    <option value="Administrators">Administrators</option>
                                    <option value="Trainers">Trainers</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium dark:text-gray-300 mb-1">Format</label>
                                <select
                                    name="format"
                                    value={formData.format}
                                    onChange={handleFormChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="PDF">PDF</option>
                                    <option value="MP4">MP4</option>
                                    <option value="DOCX">DOCX</option>
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
                                    <option value="Not Started">Not Started</option>
                                    <option value="Draft">Draft</option>
                                    <option value="In Review">In Review</option>
                                    <option value="Completed">Completed</option>
                                </select>
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
                                onClick={saveMaterial}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {isEditing ? "Update Material" : "Add Material"}
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
                            Are you sure you want to delete this material? This action cannot be undone.
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closePopup}
                                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteMaterial}
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

export default TrainingMaterial