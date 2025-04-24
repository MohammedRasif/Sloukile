import { useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Default calendar styles
import "./Calender.css"; // For custom calendar styling
 
const Calender = () => {
  // Sample project events data with two events on some dates and events on May 15, May 25
  const projectEvents = [
    {
      id: 1,
      event: "Kickoff Meeting",
      date: "2025-05-01",
      details: "Initial project kickoff with stakeholders to discuss objectives and scope.",
    },
    {
      id: 2,
      event: "Team Introduction",
      date: "2025-05-01",
      details: "Introduce team members and assign roles for the project.",
    },
    {
      id: 3,
      event: "Requirement Analysis",
      date: "2025-05-15",
      details: "Analyze project requirements with the product team.",
    },
    {
      id: 4,
      event: "Stakeholder Feedback",
      date: "2025-05-15",
      details: "Collect feedback from stakeholders on initial requirements.",
    },
    {
      id: 5,
      event: "Wireframe Design",
      date: "2025-05-25",
      details: "Begin designing wireframes for the project UI.",
    },
    {
      id: 6,
      event: "Design Kickoff",
      date: "2025-05-25",
      details: "Kick off the design phase with the creative team.",
    },
  ];
 
  // State to track selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
 
  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
 
  // Filter events for the selected date
  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };
 
  const selectedDateString = formatDate(selectedDate);
  const eventsOnSelectedDate = projectEvents.filter(
    (event) => event.date === selectedDateString
  );
 
  return (
    <div className="space-y-6 p-6">
      <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Project Calendar
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Select a date to view project milestones and details.
        </p>
 
        {/* Calendar Component */}
        <div className="mb-6">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="border-none bg-transparent text-gray-800 dark:text-gray-200"
            tileClassName={({ date }) => {
              const dateString = formatDate(date);
              return projectEvents.some((event) => event.date === dateString)
                ? "highlight" // Custom class for dates with events
                : null;
            }}
          />
        </div>
 
        {/* Project Details for Selected Date */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
            Events on {selectedDate.toDateString()}
          </h3>
          {eventsOnSelectedDate.length > 0 ? (
            <div className="grid gap-4">
              {eventsOnSelectedDate.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <h4 className="text-gray-800 dark:text-gray-200 font-semibold">
                    {event.event}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">{event.date}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {event.details}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No events scheduled for this date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Calender;