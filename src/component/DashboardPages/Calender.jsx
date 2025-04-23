
const Calender = () => {
    const calendarEvents = [
        {
            id: 1,
            event: "Kickoff Meeting",
            date: "2025-05-01",
        },
        {
            id: 2,
            event: "Design Review",
            date: "2025-06-10",
        },
        {
            id: 3,
            event: "Development Start",
            date: "2025-07-01",
        },
    ];
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Project Calendar
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Visualize milestones and deadlines across your project timeline.
                </p>
                <div className="space-y-2">
                    {calendarEvents.map((event) => (
                        <div
                            key={event.id}
                            className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-600"
                        >
                            <span className="text-gray-800 dark:text-gray-200">
                                {event.event}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                {event.date}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calender;
