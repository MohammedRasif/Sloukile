import { Archive, Calendar, MessageSquare } from "lucide-react";

const SystemInteration = () => {

    const integrations = [
        { id: 1, name: "Microsoft Teams", connected: true },
        { id: 2, name: "Outlook Calendar", connected: true },
        { id: 3, name: "Google Calendar", connected: false },
        { id: 4, name: "Cloud Storage", connected: true },
    ]

    return (
        <div>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">System Integrations</h2>
            <div className=" rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => (
                        <div
                            key={integration.id}
                            className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                {integration.name === "Microsoft Teams" && (
                                    <MessageSquare className="h-5 w-5 text-[#00308F]" />
                                )}
                                {integration.name === "Outlook Calendar" && (
                                    <Calendar className="h-5 w-5 text-[#00308F]" />
                                )}
                                {integration.name === "Google Calendar" && (
                                    <Calendar className="h-5 w-5 text-[#008000]" />
                                )}
                                {integration.name === "Cloud Storage" && (
                                    <Archive className="h-5 w-5 text-[#800080]" />
                                )}
                                <span className="text-gray-900">{integration.name}</span>
                            </div>
                            <span
                                className={`px-2 py-1 text-sm rounded-full ${integration.connected
                                        ? "bg-[#00308F] text-white"
                                        : "border border-gray-300 text-gray-600"
                                    }`}
                            >
                                {integration.connected ? "Connected" : "Not Connected"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SystemInteration;
