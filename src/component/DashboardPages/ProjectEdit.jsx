"use client"
import { useRef, useState } from "react"
import { FaInfoCircle } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import { NavLink } from "react-router-dom"

const ProjectEdit = () => {
    // Initial data stored in state
    const [tableData, setTableData] = useState([
        {
            name: "Pappu",
            kpi: "300",
            stageName: "Foundation",
            materialName: "Cloud Hosting",
            materialCost: "$1500",
        },
        {
            name: "Ramisa",
            kpi: "300",
            stageName: "Feature Development",
            materialName: "Domain & SSL",
            materialCost: "$100",
        },
        {
            name: "Bijoy",
            kpi: "300",
            stageName: "Testing And Refinement",
            materialName: "Payment Gateway Fees",
            materialCost: "$500",
        },
        {
            name: "Sajib",
            kpi: "300",
            stageName: "Deployment And Launch",
            materialName: "Other Expenses",
            materialCost: "$20",
        },
    ])

    const [showInfoModal, setShowInfoModal] = useState(false);
    const infoRef = useRef(null);

    const toggleInfoModal = () => {
        setShowInfoModal((prev) => !prev);
    };

    const [projectBudget, setProjectBudget] = useState("1500$")

    // Function to handle changes to table data
    const handleDataChange = (index, field, value) => {
        const newData = [...tableData]
        newData[index][field] = value
        setTableData(newData)
    }

    return (
        <div className="border-t border-gray-300">
            <div className="p-6 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-[500]">
                        Website Redesign
                    </h1>
                    <div className="flex gap-2">

                        <div ref={infoRef} className="relative">
                            <button className="text-[30px] text-[#00308F] cursor-pointer mt-2" onClick={toggleInfoModal}>
                                <FaInfoCircle />
                            </button>
                            {showInfoModal && (
                                <>
                                    {/* Blurred Backdrop */}
                                    <div
                                        className="fixed inset-0 bg-transparent backdrop-blur-sm z-40"
                                        onClick={toggleInfoModal}
                                    ></div>
                                    {/* Modal Content */}
                                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white border border-gray-300 rounded-md shadow-lg p-6 py-20 px-10 z-50">
                                        <FiX
                                            className="absolute right-2 top-2 text-gray-600 hover:text-red-600 cursor-pointer text-xl"
                                            onClick={toggleInfoModal}
                                        />
                                        <p className="text-gray-700 text-xl ">
                                            Hello [User Name], your project [Project Name] has been successfully created. AI has automatically set up your milestones and tasks. Check your dashboard for details and next steps
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 text-left bg-[#f5efe8af] text-black border border-gray-300">Name</th>
                                <th className="p-3 text-left bg-[#f5efe8af] text-black border border-gray-300">Kpi</th>
                                <th className="p-3 text-left bg-[#f5efe8af] text-black border border-gray-300">Stage Name</th>
                                <th className="p-3 text-left bg-[#f5efe8af] text-black border border-gray-300">Material/Tools Name</th>
                                <th className="p-3 text-left bg-[#f5efe8af] text-black border border-gray-300">Material/Tools Cost</th>
                                <th className="p-3 text-left bg-[#f5efe8af] text-black border border-gray-300">Project Budget</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="p-3 border border-gray-300">
                                        <input
                                            type="text"
                                            value={row.name}
                                            onChange={(e) => handleDataChange(rowIndex, "name", e.target.value)}
                                            className="bg-transparent w-full focus:outline-none"
                                        />
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        <input
                                            type="text"
                                            value={row.kpi}
                                            onChange={(e) => handleDataChange(rowIndex, "kpi", e.target.value)}
                                            className="bg-transparent w-full focus:outline-none"
                                            placeholder="Enter multiple KPI values"
                                        />
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        <input
                                            type="text"
                                            value={row.stageName}
                                            onChange={(e) => handleDataChange(rowIndex, "stageName", e.target.value)}
                                            className="bg-transparent w-full focus:outline-none"
                                        />
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        <input
                                            type="text"
                                            value={row.materialName}
                                            onChange={(e) => handleDataChange(rowIndex, "materialName", e.target.value)}
                                            className="bg-transparent w-full focus:outline-none"
                                        />
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        <input
                                            type="text"
                                            value={row.materialCost}
                                            onChange={(e) => handleDataChange(rowIndex, "materialCost", e.target.value)}
                                            className="bg-transparent w-full focus:outline-none"
                                        />
                                    </td>
                                    {rowIndex === 0 && (
                                        <td className="p-3 border border-gray-300 text-[#00308F]" rowSpan={tableData.length}>
                                            <div className="flex justify-center items-center h-full">
                                                <input
                                                    type="text"
                                                    value={projectBudget}
                                                    onChange={(e) => setProjectBudget(e.target.value)}
                                                    className="text-3xl font-bold text-center bg-transparent focus:outline-none"
                                                />
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 space-x-5">
                    <button className="border-2 border-gray-400 text-white rounded-sm px-10 py-2 font-[500] bg-[#00308F] hover:bg-[#00218f] cursor-pointer">Save</button>
                    <NavLink to="/dashboard/ProjectDetails">
                        <button className="border-2 border-[#00308F] hover:bg-gray-100 text-[#00308F] rounded-sm px-10 py-2 font-[500] cursor-pointer">Cencel</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default ProjectEdit

