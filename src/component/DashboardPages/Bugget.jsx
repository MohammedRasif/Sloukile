import React, { useState } from "react";
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
import Papa from "papaparse";
import { CiExport } from "react-icons/ci";

const Budget = () => {
  // State for budget and expenses
  const [budgetData, setBudgetData] = useState({
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
  });

  // State for new expense form
  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "Labor Cost",
    date: "",
    amount: "",
    status: "Pending",
  });

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
  const COLORS = ["#00308F", "#34D399"];

  // Data for Monthly Expenses (Bar Chart)
  const monthlyExpensesData = [
    { name: "May 2025", actual: 250000, forecast: 240000 },
    { name: "Jun 2025", actual: 125000, forecast: 130000 },
    { name: "Jul 2025", actual: 135000, forecast: 140000 },
    { name: "Aug 2025", actual: 170000, forecast: 160000 },
    { name: "Sep 2025", actual: 110000, forecast: 120000 },
    { name: "Oct 2025", actual: 190000, forecast: 180000 },
    { name: "Nov 2025", actual: 225000, forecast: 200000 },
    { name: "Dec 2025", actual: 100000, forecast: 110000 },
    { name: "Jan 2026", actual: 185000, forecast: 190000 },
    { name: "Feb 2026", actual: 100000, forecast: 100000 },
    { name: "Mar 2026", actual: 175000, forecast: 170000 },
    { name: "Apr 2026", actual: 150000, forecast: 160000 },
  ];

  // Purchasing Summary
  const purchasingSummary = [
    {
      category: "Labor Cost",
      totalSpent: budgetData.expenses
        .filter((exp) => exp.category === "Labor Cost")
        .reduce((sum, exp) => sum + exp.amount, 0),
    },
    {
      category: "Material Cost",
      totalSpent: budgetData.expenses
        .filter((exp) => exp.category === "Material Cost")
        .reduce((sum, exp) => sum + exp.amount, 0),
    },
  ];

  // Variance Analysis
  const varianceData = monthlyExpensesData.map((month) => ({
    name: month.name,
    variance: month.actual - month.forecast,
  }));

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleAddExpense = (e) => {
    e.preventDefault();
    const amount = parseFloat(newExpense.amount);
    if (!newExpense.description || !newExpense.date || isNaN(amount) || amount <= 0) {
      alert("Please fill in all fields with valid data.");
      return;
    }

    const newExpenseData = {
      description: newExpense.description,
      category: newExpense.category,
      date: newExpense.date,
      amount: amount,
      status: newExpense.status,
    };

    const updatedExpenses = [...budgetData.expenses, newExpenseData];
    const newSpent = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const newRemaining = budgetData.budget.total - newSpent;
    const newPercentUsed = (newSpent / budgetData.budget.total) * 100;

    setBudgetData({
      budget: {
        total: budgetData.budget.total,
        spent: newSpent,
        remaining: newRemaining,
        percentUsed: newPercentUsed,
      },
      expenses: updatedExpenses,
    });

    setNewExpense({
      description: "",
      category: "Labor Cost",
      date: "",
      amount: "",
      status: "Pending",
    });

    console.log("Added new expense:", newExpenseData);
  };

  // Export budget data as CSV
  const exportBudgetData = () => {
    const csvData = [
      ["Description", "Category", "Date", "Amount", "Status"],
      ...budgetData.expenses.map((exp) => [
        exp.description,
        exp.category,
        exp.date,
        exp.amount,
        exp.status,
      ]),
    ];

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "budget_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Exported budget data as CSV");
  };

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
        <div>
          <button
           
            className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md text-[15px] font-medium hover:bg-gray-700 dark:hover:bg-[#3B5AEB] cursor-pointer"
          >
            <CiExport />

            Export
          </button>
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
              className="bg-[#00308F] h-3 rounded-full"
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
              className="bg-[#00308F] h-3 rounded-full"
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
            {budgetData.budget.percentUsed.toFixed(1)}% of budget used
          </p>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="mb-6 bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Add New Expense</h3>
        <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[15px] text-gray-500 dark:text-gray-400">Description</label>
            <input
              type="text"
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-[15px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00308F]"
              required
            />
          </div>
          <div>
            <label className="text-[15px] text-gray-500 dark:text-gray-400">Category</label>
            <select
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-[15px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00308F]"
            >
              <option value="Labor Cost">Labor Cost</option>
              <option value="Material Cost">Material Cost</option>
            </select>
          </div>
          <div>
            <label className="text-[15px] text-gray-500 dark:text-gray-400">Date</label>
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-[15px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00308F]"
              required
            />
          </div>
          <div>
            <label className="text-[15px] text-gray-500 dark:text-gray-400">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-[15px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00308F]"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="text-[15px] text-gray-500 dark:text-gray-400">Status</label>
            <select
              name="status"
              value={newExpense.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-[15px] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00308F]"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-[#00308F] text-white rounded-md px-3 py-1.5 text-[15px] hover:bg-[#002070] flex items-center"
            >
              <svg
                className="h-4 w-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Expense
            </button>
          </div>
        </form>
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
                cx="50%"
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
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              <Bar dataKey="actual" fill="#00308F" name="Actual Expenses" radius={[8, 8, 8, 8]} />
              <Bar dataKey="forecast" fill="#34D399" name="Forecasted Expenses" radius={[8, 8, 8, 8]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Variance Analysis Section */}
      <div className="mb-6 bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">
          Variance Analysis 📈
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={varianceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              formatter={(value) => [`$${value.toLocaleString()}`, "Variance"]}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="variance"
              fill={varianceData.some((d) => d.variance < 0) ? "#EF4444" : "#00308F"}
              name="Variance (Actual - Forecast)"
              radius={[8, 8, 8, 8]}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[15px] text-gray-500 dark:text-gray-400 mt-4">
          Positive variance indicates spending above forecast; negative variance indicates spending below forecast.
        </p>
      </div>

      {/* Purchasing Summary Section */}
      <div className="mb-6 bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">
          Purchasing Summary 💰
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchasingSummary.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
            >
              <h4 className="text-[16px] font-semibold text-gray-800 dark:text-gray-200">{item.category}</h4>
              <p className="text-[15px] text-gray-600 dark:text-gray-300 mt-1">
                Total Spent: ${item.totalSpent.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Transactions Section */}
      <div className="mb-4">
        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">
          Expense Transactions 💸
        </h3>
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
                            ? "bg-[#00308F] text-white"
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
                            ? "bg-[#00308F] text-white"
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