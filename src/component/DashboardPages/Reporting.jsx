import React, { useState } from 'react';

const Reporting = ({ projectData }) => {
  const [reports, setReports] = useState(projectData.reports || []);
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    summary: '',
    date: new Date().toLocaleDateString(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({ ...prev, [name]: value }));
  };

  const addReport = () => {
    if (newReport.title.trim() && newReport.summary.trim() && newReport.date) {
      const report = {
        id: reports.length + 1,
        title: newReport.title,
        summary: newReport.summary,
        date: newReport.date,
      };
      setReports([...reports, report]);
      setNewReport({
        title: '',
        summary: '',
        date: new Date().toLocaleDateString(),
      });
      setShowAddReportModal(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">Reports</h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">
            Project reports and summaries for {projectData.name}
          </p>
        </div>
        <button
          onClick={() => setShowAddReportModal(true)}
          className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md px-3 py-1.5 text-[15px] hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Report
        </button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[#1E232E]"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-[16px] text-gray-800 dark:text-gray-100">{report.title}</p>
                <p className="text-[15px] text-gray-500 dark:text-gray-400">{report.summary}</p>
                <p className="text-[14px] text-gray-400 dark:text-gray-500 mt-1">{report.date}</p>
              </div>
              <button className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding New Report */}
      {showAddReportModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add New Report</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Report Title</label>
                <input
                  type="text"
                  name="title"
                  value={newReport.title}
                  onChange={handleInputChange}
                  placeholder="Enter report title"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Summary</label>
                <textarea
                  name="summary"
                  value={newReport.summary}
                  onChange={handleInputChange}
                  placeholder="Enter report summary"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={newReport.date}
                  onChange={handleInputChange}
                  placeholder="e.g., 4/26/2025"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setNewReport({
                    title: '',
                    summary: '',
                    date: new Date().toLocaleDateString(),
                  });
                  setShowAddReportModal(false);
                }}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addReport}
                className="bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
              >
                Add Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reporting;