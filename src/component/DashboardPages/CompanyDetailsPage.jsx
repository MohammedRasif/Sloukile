import { useState } from "react";
import { Chart } from "react-google-charts";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const CompanyDetailsPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Program metrics data
  const programMetrics = [
    { title: "Total Projects", value: "5", color: "#00308F", darkColor: "#4A6CF7" },
    { title: "Program Budget", value: "7.2m", color: "#00308F", darkColor: "#4A6CF7" },
    { title: "Committed to Date", value: "4.2m", color: "#00308F", darkColor: "#4A6CF7" },
    { title: "Final Forecast Cost", value: "8.3m", color: "#00308F", darkColor: "#4A6CF7" },
    { title: "Variance to Budget", value: "-1.1m", color: "#00308F", darkColor: "#4A6CF7" },
    { title: "Paid to Date", value: "1.0m", color: "#00308F", darkColor: "#4A6CF7" },
  ];

  // Project locations for map
  const projectLocations = [
    { lat: 37.7749, lng: -122.4194 },
    { lat: 40.7128, lng: -74.006 },
    { lat: 41.8781, lng: -87.6298 },
    { lat: 34.0522, lng: -118.2437 },
    { lat: 39.9526, lng: -75.1652 },
  ];

  // Project phases donut chart data
  const projectPhasesData = [
    ["Phase", "Count"],
    ["Initiation", 1],
    ["Procurement", 1],
    ["Design", 1],
    ["Delivery", 1],
    ["DLP", 1],
  ];

  const projectPhasesOptions = {
    pieHole: 0.4,
    legend: { position: "bottom", textStyle: { color: "#1F2937", dark: "#E5E7EB" } },
    pieSliceText: "none",
    colors: ["#2980b9", "#27ae60", "#f39c12", "#e74c3c", "#f1c40f"],
    chartArea: { width: "90%", height: "80%" },
    backgroundColor: { fill: "transparent" },
  };

  // Finance data
  const financeData = {
    budget: "7,594,387.93",
    estimatedAtCompletion: "8,537,599.74",
    variance: "-943,211.81",
    paid: "1,064,665.99",
  };

  // Health metrics data
  const healthMetrics = [
    { name: "Scope", values: [2, 1, 2] },
    { name: "Time", values: [1, 1, 3] },
    { name: "Cost", values: [1, 2, 2] },
    { name: "Risk", values: [2, 1, 2] },
    { name: "Social", values: [1, 2, 2] },
    { name: "Quality", values: [1, 1, 3] },
    { name: "Ovrl Perf", values: [0, 0, 5] },
  ];

  // Projects table data
  const projectsTableData = [
    {
      name: "Project A - Project",
      completionDate: "Jul 1, 2027",
      budget: "4,200,000.00",
      totalPaid: "725,000.00",
      paymentProgress: 17,
      scopeHealth: "#00308F",
      timeHealth: "#00308F",
      costHealth: "#00308F",
      cashFlowHealth: "#00308F",
      safetyHealth: "#00308F",
      riskHealth: "#00308F",
      qualityHealth: "#00308F",
    },
    {
      name: "Project B - Treatment Plant Expansion Project",
      completionDate: "Dec 5, 2024",
      budget: "840,619.30",
      totalPaid: "159,756.89",
      paymentProgress: 19,
      scopeHealth: "#00308F",
      timeHealth: "#00308F",
      costHealth: "#00308F",
      cashFlowHealth: "Green",
      safetyHealth: "#00308F",
      riskHealth: "#00308F",
      qualityHealth: "#00308F",
    },
    {
      name: "Project C - Wharf Infill Project",
      completionDate: "Oct 15, 2025",
      budget: "850,599.20",
      totalPaid: "25,000.12",
      paymentProgress: 3,
      scopeHealth: "Green",
      timeHealth: "Green",
      costHealth: "Green",
      cashFlowHealth: "#00308F",
      safetyHealth: "Green",
      riskHealth: "Green",
      qualityHealth: "Green",
    },
    {
      name: "Project D - Wastewater Project",
      completionDate: "Dec 31, 2025",
      budget: "703,770.00",
      totalPaid: "47,116.98",
      paymentProgress: 7,
      scopeHealth: "Green",
      timeHealth: "#00308F",
      costHealth: "Green",
      cashFlowHealth: "#00308F",
      safetyHealth: "Green",
      riskHealth: "#00308F",
      qualityHealth: "Green",
    },
    {
      name: "Project E - Disaster Recovery Project",
      System: "Recovery Project",
      completionDate: "Feb 28, 2027",
      budget: "1,000,000.00",
      totalPaid: "55,172.00",
      paymentProgress: 6,
      scopeHealth: "Green",
      timeHealth: "Green",
      costHealth: "Green",
      cashFlowHealth: "Green",
      safetyHealth: "#00308F",
      riskHealth: "#00308F",
      qualityHealth: "Green",
    },
  ];

  // Custom title chart data
  const customTitleData = [
    ["Project", "Budget", "Paid", "Remaining"],
    ["Project A - Project", 4200000, 725000, 3475000],
    ["Project E - Disaster Recovery Project", 1000000, 55172, 944828],
    ["Project D - Wastewater Project", 703770, 47117, 656653],
    ["Project B - Treatment Plant Expansion Project", 840619, 159757, 680862],
    ["Project C - Wharf Infill Project", 850599, 25000, 825599],
  ];

  const customTitleOptions = {
    chartArea: { width: "70%", height: "80%" },
    isStacked: true,
    hAxis: { minValue: 0, format: "short", textStyle: { color: "#1F2937", dark: "#E5E7EB" } },
    vAxis: { textStyle: { color: "#1F2937", dark: "#E5E7EB" } },
    legend: { position: "none" },
    colors: ["#00308F", "#4A6CF7"],
    backgroundColor: { fill: "transparent" },
  };

  // Cash flow chart data
  const generateCashFlowData = () => {
    const months = [
      "Jan '22", "Feb '22", "Mar '22", "Apr '22", "May '22", "Jun '22",
      "Jul '22", "Aug '22", "Sep '22", "Oct '22", "Nov '22", "Dec '22",
      "Jan '23", "Feb '23", "Mar '23", "Apr '23", "May '23", "Jun '23",
      "Jul '23", "Aug '23", "Sep '23", "Oct '23", "Nov '23", "Dec '23",
    ];

    const data = [
      ["Month", "Project A", "Project B", "Project C", "Project D", "Project E"],
    ];

    months.forEach((month, i) => {
      const projectA = i < 5 ? 0 : Math.floor(Math.random() * 100000);
      const projectB = i < 8 ? 0 : Math.floor(Math.random() * 80000);
      const projectC = i < 10 ? 0 : Math.floor(Math.random() * 60000);
      const projectD = i < 12 ? 0 : Math.floor(Math.random() * 50000);
      const projectE = i < 15 ? 0 : Math.floor(Math.random() * 40000);

      data.push([month, projectA, projectB, projectC, projectD, projectE]);
    });

    return data;
  };

  const cashFlowData = generateCashFlowData();

  const cashFlowOptions = {
    chartArea: { width: "85%", height: "70%" },
    isStacked: true,
    legend: { position: "none" },
    hAxis: { slantedText: true, slantedTextAngle: 45, textStyle: { color: "#1F2937", dark: "#E5E7EB" } },
    vAxis: { format: "short", textStyle: { color: "#1F2937", dark: "#E5E7EB" } },
    colors: ["#00308F", "#4A6CF7"],
    backgroundColor: { fill: "transparent" },
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapCenter = {
    lat: 39.8283,
    lng: -98.5795,
  };

  const getHealthColor = (status) => {
    switch (status.toLowerCase()) {
      case "#00308f":
        return "bg-[#00308F] dark:bg-[#4A6CF7]";
      case "green":
        return "bg-green-500 dark:bg-green-600";
      default:
        return "bg-gray-300 dark:bg-gray-600";
    }
  };

  const renderHealthBar = (values) => {
    return (
      <div className="flex h-4 w-full">
        {values.map((value, i) => (
          <div
            key={i}
            className={`h-full ${i === 0 ? "bg-red-500 dark:bg-red-600" : i === 1 ? "bg-yellow-500 dark:bg-yellow-600" : "bg-green-500 dark:bg-green-600"}`}
            style={{ width: `${(value / values.reduce((a, b) => a + b, 0)) * 100}%` }}
          ></div>
        ))}
      </div>
    );
  };

  const renderProgressBar = (percentage, color = "bg-blue-500 dark:bg-blue-600") => {
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };

  return (
    <div className="p-4 text-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-[#1E232E]">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Company Details</h1>

        {/* Program Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {programMetrics.map((metric, index) => (
            <div
              key={index}
              className="p-4 rounded-lg text-white"
              style={{ backgroundColor: metric.color }}
            >
              <div className="text-[20px]">{metric.title}</div>
              <div className="text-4xl font-bold">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Project Phases and Cash Flow */}
        <div className="flex gap-4 mb-4">
          {/* Project Phases */}
          <div className="w-1/4 bg-gray-100 dark:bg-[#1E232E] rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-lg p-4 h-[350px]">
            <h2 className="text-[17px] font-extrabold mb-2 text-gray-800 dark:text-gray-200">Project Phases</h2>
            <div className="h-[310px] -mt-7">
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={projectPhasesData}
                options={projectPhasesOptions}
              />
            </div>
          </div>

          {/* Cash Flow */}
          <div className="w-3/4 bg-gray-100 dark:bg-[#1E232E] rounded-lg border-2 border-gray-300 dark:border-gray-700 shadow-lg py-4 h-[350px]">
            <h2 className="text-[17px] font-extrabold px-4 text-gray-800 dark:text-gray-200">Cash Flow</h2>
            <div className="h-[300px]">
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={cashFlowData}
                options={cashFlowOptions}
              />
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="mb-5">
          <h2 className="text-[24px] font-bold mb-2 text-gray-800 dark:text-gray-200">Projects Table</h2>
          <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 shadow-lg">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-[15px] text-gray-600 dark:text-gray-400">
                  <th className="py-2 px-3 text-left">Name</th>
                  <th className="py-2 px-3 text-left">Completion Date</th>
                  <th className="py-2 px-3 text-left">Budget</th>
                  <th className="py-2 px-3 text-left">Total Paid</th>
                  <th className="py-2 px-3 text-left">Payment Progress</th>
                  <th className="py-2 px-3 text-center">Scope Health</th>
                  <th className="py-2 px-3 text-center">Time Health</th>
                  <th className="py-2 px-3 text-center">Cost Health</th>
                  <th className="py-2 px-3 text-center">Cash Flow Health</th>
                  <th className="py-2 px-3 text-center">Safety Health</th>
                  <th className="py-2 px-3 text-center">Risk Health</th>
                  <th className="py-2 px-3 text-center">Quality Health</th>
                </tr>
              </thead>
              <tbody className="text-base text-gray-800 dark:text-gray-200">
                {projectsTableData.map((project, index) => (
                  <tr key={index} className="border-t bg-gray-100 dark:bg-[#1E232E]">
                    <td className="py-2 px-3 text-[14px] font-medium">{project.name}</td>
                    <td className="py-2 px-3 text-[14px] font-medium">{project.completionDate}</td>
                    <td className="py-2 px-3 text-[14px] font-medium">${project.budget}</td>
                    <td className="py-2 px-3 text-[14px] font-medium">${project.totalPaid}</td>
                    <td className="py-2 px-3 w-32">{renderProgressBar(project.paymentProgress)}</td>
                    <td className="py-2 px-3 text-center">
                      <div className={`inline-block w-4 h-4 rounded-full ${getHealthColor(project.scopeHealth)}`}></div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className={`inline-block w-4 h-4 rounded-full ${getHealthColor(project.timeHealth)}`}></div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className={`inline-block w-4 h-4 rounded-full ${getHealthColor(project.costHealth)}`}></div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className={`inline-block w-4 h-4 rounded-full ${getHealthColor(project.cashFlowHealth)}`}></div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className={`inline-block w-4 h-4 rounded-full ${getHealthColor(project.safetyHealth)}`}></div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className={`inline-block w-4 h-4 rounded-full ${getHealthColor(project.riskHealth)}`}></div>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <div className={`inline-block w-4 h-4 rounded-full ${getHealthColor(project.qualityHealth)}`}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Title Chart */}
        <h2 className="text-[24px] font-bold mb-2 text-gray-800 dark:text-gray-200">Custom Title</h2>
        <div className="p-5 bg-gray-100 dark:bg-[#1E232E] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="h-[350px]">
            <Chart
              chartType="BarChart"
              width="100%"
              height="100%"
              data={customTitleData}
              options={customTitleOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;