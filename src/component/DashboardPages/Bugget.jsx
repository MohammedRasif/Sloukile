import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Budget = () => {
  // Define budget and expenses data
  const budgetData = {
    budget: {
      total: 50000,
      spent: 47500,
      remaining: 2500,
      percentUsed: 95,
    },
    expenses: [
      {
        description: 'Developer Salaries',
        category: 'Labor',
        date: '6/10/2025',
        amount: 30000,
        status: 'Paid',
      },
      {
        description: 'Software Licenses',
        category: 'Software',
        date: '6/15/2025',
        amount: 15000,
        status: 'Approved',
      },
      {
        description: 'Cloud Hosting',
        category: 'Infrastructure',
        date: '7/1/2025',
        amount: 2500,
        status: 'Pending',
      },
    ],
  };

  // Data for Expense Breakdown (Pie Chart)
  const expenseBreakdownData = [
    { name: 'Labor', value: 95 },
    { name: 'Software', value: 5 },
  ];

  // Colors for Pie Chart
  const COLORS = ['#3B82F6', '#34D399'];

  // Data for Monthly Expenses (Bar Chart)
  const monthlyExpensesData = [
    { month: 'Jun 2025', expenses: 16000 },
    { month: 'Jul 2025', expenses: 4000 },
    { month: 'Jul 2025', expenses: 4000 },
    { month: 'Jul 2025', expenses: 4000 },
    { month: 'Jul 2025', expenses: 4000 },
    { month: 'Jul 2025', expenses: 4000 },
    { month: 'Jul 2025', expenses: 4000 },
    { month: 'Jul 2025', expenses: 4000 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">Budget Management </h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">Track project expenses and budget</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Total Budget</h3>
          <p className="text-[26px] font-bold">${budgetData.budget.total.toLocaleString()}</p>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Spent</h3>
          <p className="text-[26px] font-bold">${budgetData.budget.spent.toLocaleString()}</p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mt-2">
            <div
              className="bg-gray-800 dark:bg-[#4A6CF7] h-3 rounded-full"
              style={{ width: `${budgetData.budget.percentUsed}%` }}
            ></div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Remaining</h3>
          <p className="text-[26px] font-bold">${budgetData.budget.remaining.toLocaleString()}</p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mt-2">
            <div
              className="bg-gray-800 dark:bg-[#4A6CF7] h-3 rounded-full"
              style={{ width: `${100 - budgetData.budget.percentUsed}%` }}
            ></div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Budget Status</h3>
          <div className="flex items-center">
            <span className="bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300 text-[15px] font-medium px-2 py-0.5 rounded-full">
              On Track
            </span>
          </div>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 mt-2">{budgetData.budget.percentUsed}% of budget used</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Expense Breakdown 📊</h3>
          <div className="h-64 flex items-center justify-center">
            <PieChart width={300} height={250}>
              <Pie
                data={expenseBreakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {expenseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E232E',
                  border: 'none',
                  color: '#D1D5DB',
                  borderRadius: '4px',
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: '15px',
                  color: '#6B7280',
                }}
              />
            </PieChart>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Monthly Expenses 📅</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart width={700} height={250} data={monthlyExpensesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 15 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 14 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E232E',
                  border: 'none',
                  color: '#D1D5DB',
                  borderRadius: '4px',
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: '15px',
                  color: '#6B7280',
                }}
              />
              <Bar dataKey="expenses" fill="#A78BFA" />
            </BarChart>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300">Expense Transactions 💸</h3>
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
              Add Expense ➕
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1E232E] divide-y divide-gray-200 dark:divide-gray-700">
              {budgetData.expenses.map((expense, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-[15px]">{expense.description}</td>
                  <td className="px-4 py-4 text-[15px]">{expense.category}</td>
                  <td className="px-4 py-4 text-[15px]">{expense.date}</td>
                  <td className="px-4 py-4 text-[15px]">${expense.amount.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 text-[15px] rounded-full ${
                        expense.status === 'Paid'
                          ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300'
                          : expense.status === 'Approved'
                          ? 'bg-gray-800 dark:bg-[#4A6CF7] text-white'
                          : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300'
                      }`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
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
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Budget;