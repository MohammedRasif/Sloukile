import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Budget = () => {
  // Define budget and expenses data for a construction project
  const budgetData = {
    budget: {
      total: 500000,
      spent: 475000,
      remaining: 25000,
      percentUsed: 95,
    },
    expenses: [
      {
        description: "Construction Workers' Wages",
        category: "Labor Cost",
        date: "2025-05-01",
        amount: 200000,
        status: "Paid",
      },
      {
        description: "Concrete and Cement",
        category: "Material Cost",
        date: "2025-05-10",
        amount: 150000,
        status: "Paid",
      },
      {
        description: "Steel Reinforcement",
        category: "Material Cost",
        date: "2025-05-15",
        amount: 100000,
        status: "Approved",
      },
      {
        description: "Electricians' Fees",
        category: "Labor Cost",
        date: "2025-06-01",
        amount: 25000,
        status: "Pending",
      },
    ],
  };

  // Data for Expense Breakdown (Pie Chart)
  const expenseBreakdownData = [
    {
      name: "Labor Cost",
      value: budgetData.expenses
        .filter((exp) => exp.category === "Labor Cost")
        .reduce((sum, exp) => sum + exp.amount, 0),
    },
    {
      name: "Material Cost",
      value: budgetData.expenses
        .filter((exp) => exp.category === "Material Cost")
        .reduce((sum, exp) => sum + exp.amount, 0),
    },
  ];

  // Colors for Pie Chart
  const COLORS = ["#3B82F6", "#34D399"];

  // Data for Monthly Expenses (Bar Chart) - 12 months
  const monthlyExpensesData = [
    { name: "May 2025", pv: 250000 },
    { name: "Jun 2025", pv: 125000 },
    { name: "Jul 2025", pv: 135000 },
    { name: "Aug 2025", pv: 170000 },
    { name: "Sep 2025", pv: 110000 },
    { name: "Oct 2025", pv: 190000 },
    { name: "Nov 2025", pv: 225000 },
    { name: "Dec 2025", pv: 100000 },
    { name: "Jan 2026", pv: 185000 },
    { name: "Feb 2026", pv: 100000 },
    { name: "Mar 2026", pv: 175000 },
    { name: "Apr 2026", pv: 150000 },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">
            Budget Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">
            Track project expenses and budget for construction
          </p>
        </div>
      </div>

      {/* Budget Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Total Budget</h3>
          <p className="text-[26px] font-bold text-gray-800 dark:text-gray-100">
            ${budgetData.budget.total.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Spent</h3>
          <p className="text-[26px] font-bold text-gray-800 dark:text-gray-100">
            ${budgetData.budget.spent.toLocaleString()}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mt-2">
            <div
              className="bg-gray-800 dark:bg-[#4A6CF7] h-3 rounded-full"
              style={{ width: `${budgetData.budget.percentUsed}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Remaining</h3>
          <p className="text-[26px] font-bold text-gray-800 dark:text-gray-100">
            ${budgetData.budget.remaining.toLocaleString()}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mt-2">
            <div
              className="bg-gray-800 dark:bg-[#4A6CF7] h-3 rounded-full"
              style={{ width: `${100 - budgetData.budget.percentUsed}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Budget Status</h3>
          <div className="flex items-center">
            <span className="bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300 text-[15px] font-medium px-2 py-0.5 rounded-full">
              On Track
            </span>
          </div>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 mt-2">
            {budgetData.budget.percentUsed}% of budget used
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Expense Breakdown Section */}
        <div className="w-full md:w-1/3 bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mt-4 mb-4">
            Expense Breakdown 📊
          </h3>
          <div className="flex items-center justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={expenseBreakdownData}
                dataKey="value"
                nameKey="name"
                cx="60%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {expenseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E232E",
                  border: "none",
                  color: "#D1D5DB",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{
                  fontSize: "15px",
                  color: "#6B7280",
                  marginTop: "20px",
                }}
              />
            </PieChart>
          </div>
        </div>

        {/* Monthly Expenses Section */}
        <div className="w-full md:w-2/3 bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">
            Monthly Expenses 📅
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={monthlyExpensesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E232E",
                  border: "none",
                  color: "#D1D5DB",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="pv"
                fill="#8884d8"
                background={{ fill: "#eee" }}
                name="Monthly Expenses"
                radius={[8, 8, 8, 8]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Transactions Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300">
            Expense Transactions 💸
          </h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md px-3 py-1.5 text-[15px] hover:bg-gray-700 dark:hover:bg-[#3B5AEB]">
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
              Add Expense
            </button>
          </div>
        </div>

        {/* Categorized Expense Cards */}
        <div className="grid gap-6">
          {/* Labor Cost Section */}
          <div>
            <h4 className="text-[20px] font-bold text-gray-800 dark:text-gray-100 mb-3">
              Labor Cost
            </h4>
            <div className="grid gap-4">
              {budgetData.expenses
                .filter((expense) => expense.category === "Labor Cost")
                .map((expense, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="text-gray-800 dark:text-gray-200 font-semibold">
                        {expense.description}
                      </h5>
                      <span
                        className={`px-2 py-1 text-[15px] rounded-full ${
                          expense.status === "Paid"
                            ? "bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300"
                            : expense.status === "Approved"
                            ? "bg-gray-800 dark:bg-[#4A6CF7] text-white"
                            : "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300"
                        }`}
                      >
                        {expense.status}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-1">
                      Date: {expense.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-[15px] mt-1">
                      Amount: ${expense.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Material Cost Section */}
          <div>
            <h4 className="text-[20px] font-bold text-gray-800 dark:text-gray-100 mb-3">
              Material Cost
            </h4>
            <div className="grid gap-4">
              {budgetData.expenses
                .filter((expense) => expense.category === "Material Cost")
                .map((expense, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="text-gray-800 dark:text-gray-200 font-semibold">
                        {expense.description}
                      </h5>
                      <span
                        className={`px-2 py-1 text-[15px] rounded-full ${
                          expense.status === "Paid"
                            ? "bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300"
                            : expense.status === "Approved"
                            ? "bg-gray-800 dark:bg-[#4A6CF7] text-white"
                            : "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300"
                        }`}
                      >
                        {expense.status}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-[15px] mt-1">
                      Date: {expense.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-[15px] mt-1">
                      Amount: ${expense.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;