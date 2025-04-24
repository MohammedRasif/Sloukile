import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main styles
import "react-date-range/dist/theme/default.css"; // Theme styles
import "./Calender.css"; // Custom styles

const Calender = () => {
  // Sample project events data
  const [projectEvents, setProjectEvents] = useState([
    {
      id: 1,
      projectName: "Alpha Project",
      title: "Kickoff Meeting",
      description: "Initial project kickoff with stakeholders to discuss objectives and scope.",
      date: "2025-05-01",
    },
    {
      id: 2,
      projectName: "Alpha Project",
      title: "Team Introduction",
      description: "Introduce team members and assign roles for the project.",
      date: "2025-05-01",
    },
    {
      id: 3,
      projectName: "Beta Project",
      title: "Requirement Analysis",
      description: "Analyze project requirements with the product team.",
      date: "2025-05-15",
    },
    {
      id: 4,
      projectName: "Beta Project",
      title: "Stakeholder Feedback",
      description: "Collect feedback from stakeholders on initial requirements.",
      date: "2025-05-15",
    },
    {
      id: 5,
      projectName: "Alpha Project",
      title: "Wireframe Design",
      description: "Begin designing wireframes for the project UI.",
      date: "2025-05-25",
    },
    {
      id: 6,
      projectName: "Alpha Project",
      title: "Design Kickoff",
      description: "Kick off the design phase with the creative team.",
      date: "2025-05-25",
    },
  ]);

  // State for selected date range
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // State for form inputs
  const [formData, setFormData] = useState({
    projectName: "",
    title: "",
    description: "",
  });

  // State for form visibility
  const [showForm, setShowForm] = useState(false);

  // Handle date range selection
  const handleRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new event
  const addEvent = () => {
    if (
      !formData.projectName.trim() ||
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    const startDate = dateRange[0].startDate;
    const startDateString = formatDate(startDate);

    // Create new event for the start date of the range
    const newEvent = {
      id: projectEvents.length + 1,
      projectName: formData.projectName,
      title: formData.title,
      description: formData.description,
      date: startDateString,
    };

    setProjectEvents((prev) => [...prev, newEvent]);
    setFormData({ projectName: "", title: "", description: "" });
    setShowForm(false);
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Filter events within the selected date range
  const startDateString = formatDate(dateRange[0].startDate);
  const endDateString = formatDate(dateRange[0].endDate);
  const eventsInRange = projectEvents.filter((event) => {
    return event.date >= startDateString && event.date <= endDateString;
  });

  // Custom day content renderer to add event marker
  const renderDayContent = (date) => {
    const dateString = formatDate(date);
    const hasEvent = projectEvents.some((event) => event.date === dateString);
    const dayNumber = date.getDate();

    return (
      <div className="relative flex items-center justify-center h-full">
        <span>{dayNumber}</span>
        {hasEvent && (
          <span className="absolute bottom-1 w-4 h-4 bg-blue-500 rounded-full"></span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Project Calendar
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Select a date range to view or add project events.
        </p>

        {/* Date Range Picker */}
        <div className="flex items-center justify-center">
        <div className="mb-6 w-[100vh]">
          <DateRange
            editableDateInputs={true}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            className="border-none bg-transparent w-full"
            showDateDisplay={false} // Hides the default range display
            dayContentRenderer={renderDayContent} // Custom day renderer for event markers
            weekStartsOn={1} // Start the week on Monday
          />
        </div>
        </div>

        {/* Add Event Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#353A47]"
          >
            <span>➕</span>
            <span>Add Event</span>
          </button>
        </div>

        {/* Add Event Form */}
        {showForm && (
          <div className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
              Add New Event
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 h-24"
                  placeholder="Enter event description"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={addEvent}
                  className="px-3 py-1 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Events for Selected Date Range */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
            Events from {dateRange[0].startDate.toDateString()} to{" "}
            {dateRange[0].endDate.toDateString()}
          </h3>
          {eventsInRange.length > 0 ? (
            <div className="grid gap-4">
              {eventsInRange.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <h4 className="text-gray-800 dark:text-gray-200 font-semibold">
                    {event.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Project: {event.projectName}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">{event.date}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No events scheduled in this date range.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calender;