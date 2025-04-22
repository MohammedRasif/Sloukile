
const GovernanceSetup = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Governance Setup </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
                Define project governance structure and decision-making processes
            </p>

            <div className="mb-6">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Decision Making Process
                </h3>
                <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md h-24 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                    placeholder="Decision-making will be made collectively by the project manager and team members in regular sprint planning and review meetings. Critical decisions will be escalated to the SteerCo for approval."
                ></textarea>
            </div>

            <div className="mb-6">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Governance Meetings
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-600">
                                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Meeting</th>
                                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Frequency</th>
                                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Participants</th>
                                <th className="text-left py-2 text-gray-700 dark:text-gray-300">Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-600">
                                <td className="py-3 text-gray-800 dark:text-gray-200">Sprint Planning</td>
                                <td className="text-gray-800 dark:text-gray-200">Weekly</td>
                                <td className="text-gray-800 dark:text-gray-200">Project Manager, Development Team</td>
                                <td className="text-gray-800 dark:text-gray-200">Plan work for upcoming sprint</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-600">
                                <td className="py-3 text-gray-800 dark:text-gray-200">SteerCo Review</td>
                                <td className="text-gray-800 dark:text-gray-200">Bi-weekly</td>
                                <td className="text-gray-800 dark:text-gray-200">Project Manager, Key Stakeholders</td>
                                <td className="text-gray-800 dark:text-gray-200">Review project progress and address issues</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-600">
                                <td className="py-3 text-gray-800 dark:text-gray-200">Daily Standup</td>
                                <td className="text-gray-800 dark:text-gray-200">Daily</td>
                                <td className="text-gray-800 dark:text-gray-200">Development Team</td>
                                <td className="text-gray-800 dark:text-gray-200">Share progress and identify blockers</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4 mb-6">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Add New Governance Meeting 
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Meeting Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Frequency
                        </label>
                        <select
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                        >
                            <option>Select frequency</option>
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Bi-weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Participants
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Purpose
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                        />
                    </div>
                </div>
                <button className="px-4 py-2 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md hover:bg-gray-700 dark:hover:bg-[#3B5AEB]">
                    Add Meeting 
                </button>
            </div>
        </div>
    );
}

export default GovernanceSetup;
