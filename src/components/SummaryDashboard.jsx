import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function SummaryDashboard({ data }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 text-lg">No data to display. Add months to see summary.</p>
      </div>
    )
  }

  const calculateExpenses = (item) => {
    return item.emiHome + item.emiCar + item.emiPersonal + item.rent + 
           item.groceries + item.utilities + item.transportation + 
           item.entertainment + item.healthcare + item.other
  }

  const totalAnnualSalary = data.reduce((sum, item) => sum + item.salary, 0)
  const totalAnnualExpenses = data.reduce((sum, item) => sum + calculateExpenses(item), 0)
  const totalAnnualSavings = totalAnnualSalary - totalAnnualExpenses
  const averageMonthlySalary = totalAnnualSalary / data.length
  const averageMonthlyExpenses = totalAnnualExpenses / data.length
  const averageMonthlySavings = totalAnnualSavings / data.length
  const averageSavingsRate = averageMonthlySalary > 0 ? (averageMonthlySavings / averageMonthlySalary * 100) : 0

  const expensesByMonth = data.map(item => calculateExpenses(item))
  const maxExpenseMonth = data[expensesByMonth.indexOf(Math.max(...expensesByMonth))]
  const minExpenseMonth = data[expensesByMonth.indexOf(Math.min(...expensesByMonth))]

  const totalEMIs = data.reduce((sum, item) => sum + item.emiHome + item.emiCar + item.emiPersonal, 0)
  const totalOtherExpenses = totalAnnualExpenses - totalEMIs

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 mb-2">Total Annual Salary</p>
          <p className="text-3xl font-bold text-green-700">₹{totalAnnualSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-600 mt-2">{data.length} months tracked</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-lg p-6 border-l-4 border-red-500">
          <p className="text-sm text-gray-600 mb-2">Total Annual Expenses</p>
          <p className="text-3xl font-bold text-red-700">₹{totalAnnualExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-600 mt-2">{((totalAnnualExpenses / totalAnnualSalary) * 100).toFixed(1)}% of salary</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 mb-2">Total Annual Savings</p>
          <p className="text-3xl font-bold text-blue-700">₹{totalAnnualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-gray-600 mt-2">{((totalAnnualSavings / totalAnnualSalary) * 100).toFixed(1)}% of salary</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 mb-2">Average Savings Rate</p>
          <p className="text-3xl font-bold text-purple-700">{averageSavingsRate.toFixed(2)}%</p>
          <p className="text-xs text-gray-600 mt-2">Monthly average</p>
        </div>
      </div>

      {/* Monthly Averages */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Monthly Averages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <p className="text-sm text-gray-600 mb-2">Average Monthly Salary</p>
            <p className="text-3xl font-bold text-green-700">₹{averageMonthlySalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
            <p className="text-sm text-gray-600 mb-2">Average Monthly Expenses</p>
            <p className="text-3xl font-bold text-red-700">₹{averageMonthlyExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <p className="text-sm text-gray-600 mb-2">Average Monthly Savings</p>
            <p className="text-3xl font-bold text-blue-700">₹{averageMonthlySavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💼 Expense Breakdown (Annual)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
            <p className="text-sm text-gray-600 mb-2">Total EMIs (Annual)</p>
            <p className="text-3xl font-bold text-red-700">₹{totalEMIs.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            <p className="text-xs text-gray-600 mt-2">{((totalEMIs / totalAnnualExpenses) * 100).toFixed(1)}% of total expenses</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <p className="text-sm text-gray-600 mb-2">Other Expenses (Annual)</p>
            <p className="text-3xl font-bold text-orange-700">₹{totalOtherExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            <p className="text-xs text-gray-600 mt-2">{((totalOtherExpenses / totalAnnualExpenses) * 100).toFixed(1)}% of total expenses</p>
          </div>
        </div>
      </div>

      {/* High & Low Months */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Expense Extremes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-red-600" size={20} />
              <p className="text-sm text-gray-600">Highest Expense Month</p>
            </div>
            <p className="text-2xl font-bold text-red-700">{maxExpenseMonth.month}</p>
            <p className="text-xl font-semibold text-red-600 mt-2">
              ₹{Math.max(...expensesByMonth).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="text-green-600" size={20} />
              <p className="text-sm text-gray-600">Lowest Expense Month</p>
            </div>
            <p className="text-2xl font-bold text-green-700">{minExpenseMonth.month}</p>
            <p className="text-xl font-semibold text-green-600 mt-2">
              ₹{Math.min(...expensesByMonth).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">📋 Detailed Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Metric</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Value</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">% of Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 bg-green-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">Total Annual Salary</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-green-700">₹{totalAnnualSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-green-700">100%</td>
              </tr>
              <tr className="border-b border-gray-200 bg-red-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">Total EMIs</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-red-700">₹{totalEMIs.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-red-700">{((totalEMIs / totalAnnualSalary) * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b border-gray-200 bg-orange-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">Other Expenses</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-orange-700">₹{totalOtherExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-orange-700">{((totalOtherExpenses / totalAnnualSalary) * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">Total Expenses</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-gray-800">₹{totalAnnualExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-gray-800">{((totalAnnualExpenses / totalAnnualSalary) * 100).toFixed(2)}%</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">Total Savings</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-blue-700">₹{totalAnnualSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-blue-700">{((totalAnnualSavings / totalAnnualSalary) * 100).toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
