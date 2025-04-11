"use client"

import { Search, Calendar } from "lucide-react"
import { useState } from "react"
import { GiFilmProjector } from "react-icons/gi"

const RiskProject = () => {
    const [searchTerm, setSearchTerm] = useState("")

    // Sample risk data
    const risks = [
        {
            id: 1,
            title: "Database Performance Degradation",
            project: "Project Beta",
            description:
                "The Database May Experience Performance Issues Under High Load, Potentially Causing System Slowdowns.",
            probability: { level: "Medium", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
            status: { state: "Active", color: "bg-green-500 text-white dark:bg-green-600" },
            identifiedDate: "March 10, 2025",
        },
        {
            id: 2,
            title: "Resource Availability",
            project: "Project Beta",
            description:
                "The Database May Experience Performance Issues Under High Load, Potentially Causing System Slowdowns.",
            probability: { level: "Medium", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
            status: { state: "Active", color: "bg-red-500 text-white dark:bg-red-600" },
            identifiedDate: "March 10, 2025",
        },
    ]

    // Filter risks based on search term
    const filteredRisks = risks.filter((risk) => risk.title.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className=" min-h-screen p-6 text-gray-800 dark:text-gray-200">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Risk Project</h1>

                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search Risk Project.."
                        className="w-1/3 pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#4A6CF7]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search
                        className="absolute left-[calc(33%-30px)] top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                        size={18}
                    />
                </div>

                {/* Risk Cards */}
                <div className="space-y-4">
                    {filteredRisks.map((risk) => (
                        <div
                            key={risk.id}
                            className="bg-[#f5efe8af] dark:bg-[#1E232E] p-6 rounded-lg shadow-sm mb-4 border border-gray-100 dark:border-gray-700"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{risk.title}</h2>
                            <div className="flex items-center mb-2">
                                <div className="w-5 h-5  rounded-sm flex items-center justify-center mr-2">
                                    <span className="text-2xl"><GiFilmProjector /> </span>
                                </div>
                                <span className="text-blue-600  dark:text-[#4A6CF7] text-md">{risk.project}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 text-[16px]">{risk.description}</p>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-[15px] text-gray-700 font-bold ml-2 dark:text-gray-300 mb-4">Probability</p>
                                    <span className={`px-4 py-2 rounded-full text-md font-medium ${risk.probability.color}`}>
                                        {risk.probability.level}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[15px] text-gray-700 font-bold ml-4 dark:text-gray-300 mb-4">Status</p>
                                    <span className={`px-4 py-2 rounded-full text-md font-medium ${risk.status.color}`}>
                                        {risk.status.state}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[15px] text-gray-700 font-bold dark:text-gray-300 mb-2">Identified</p>
                                    <div className="flex items-center">
                                        <Calendar size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{risk.identifiedDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredRisks.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No risks found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RiskProject