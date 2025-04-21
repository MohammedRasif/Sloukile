import React, { useState } from 'react';

const Reporting = ({ projectData }) => {
  const [reports, setReports] = useState(projectData.reports);

  const addReport = () => {
    const newReport = {
      id: reports.length + 1,
      title: 'New Report',
      date: new Date().toLocaleDateString(),
      summary: 'New report summary',
    };
    setReports([...reports, newReport]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">Reports 📊</h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">
            Project reports and summaries for {projectData.name}
          </p>
        </div>
        <button
          onClick={addReport}
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
          Add Report ➕
        </button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[#1E232E]">
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
    </div>
  );
};

export default Reporting;