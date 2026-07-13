import React from 'react'
import { Users, TrendingUp, PieChart as PieChartIcon } from 'lucide-react'

export default function FamilyDashboard({ data, accounts, settings }) {
  if (data.length === 0 || accounts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">Add accounts and expenses to see family dashboard</p>
      </div>
    )
  }

  const currency = settings.currency

  // Group data by account
  const dataByAccount = {}
  accounts.forEach((account) => {
    dataByAccount[account.id] = data.filter((item) => item.accountId === account.id)
  })

  // Calculate totals
  const calculateExpenses = (item) => {
    return item.emiHome + item.emiCar + item.emiPersonal + item.rent +
           item.groceries + item.utilities + item.transportation +
           item.entertainment + item.healthcare + item.other
  }

  const familyTotals = {
    salary: 0,
    expenses: 0,
    remaining: 0,
    members: 0
  }

  const memberStats = accounts.map((account) => {
    const accountData = dataByAccount[account.id]
    if (accountData.length === 0) return null

    const latestMonth = accountData[accountData.length - 1]
    const totalExpenses = calculateExpenses(latestMonth)
    const remaining = latestMonth.salary - totalExpenses

    familyTotals.salary += latestMonth.salary
    familyTotals.expenses += totalExpenses
    familyTotals.remaining += remaining
    familyTotals.members += 1

    return {
      account,
      salary: latestMonth.salary,
      expenses: totalExpenses,
      remaining,
      savingsRate: latestMonth.salary > 0 ? ((remaining / latestMonth.salary) * 100).toFixed(1) : 0
    }
  }).filter(Boolean)

  const familySavingsRate = familyTotals.salary > 0 ? ((familyTotals.remaining / familyTotals.salary) * 100).toFixed(1) : 0

  return (
    <div className="space-y-6">
      {/* Family Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Users size={32} /> Family Financial Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-purple-100 text-sm">Total Family Salary</p>
            <p className="text-3xl font-bold">{currency}{familyTotals.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Total Expenses</p>
            <p className="text-3xl font-bold">{currency}{familyTotals.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Total Savings</p>
            <p className="text-3xl font-bold">{currency}{familyTotals.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Family Savings Rate</p>
            <p className="text-3xl font-bold">{familySavingsRate}%</p>
          </div>
        </div>
      </div>

      {/* Member Comparison */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <PieChartIcon size={24} /> Member Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Member</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Salary</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Expenses</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Savings</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Savings Rate</th>
              </tr>
            </thead>
            <tbody>
              {memberStats.map((stat) => (
                <tr key={stat.account.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: stat.account.color }}
                      />
                      <span className="font-semibold text-gray-800">{stat.account.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-800 font-semibold">
                    {currency}{stat.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">
                    {currency}{stat.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-right text-green-600 font-semibold">
                    {currency}{stat.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-4 py-3 text-right text-blue-600 font-bold">{stat.savingsRate}%</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                <td className="px-4 py-3 text-gray-800">Total</td>
                <td className="px-4 py-3 text-right text-gray-800">
                  {currency}{familyTotals.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </td>
                <td className="px-4 py-3 text-right text-red-600">
                  {currency}{familyTotals.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </td>
                <td className="px-4 py-3 text-right text-green-600">
                  {currency}{familyTotals.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </td>
                <td className="px-4 py-3 text-right text-blue-600">{familySavingsRate}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memberStats.map((stat) => (
          <div key={stat.account.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderColor: stat.account.color }}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: stat.account.color }}
              >
                {stat.account.name.charAt(0).toUpperCase()}
              </div>
              <h4 className="text-lg font-bold text-gray-800">{stat.account.name}</h4>
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-gray-600">Monthly Salary</p>
                <p className="text-lg font-bold text-blue-600">{currency}{stat.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="bg-red-50 p-3 rounded">
                <p className="text-xs text-gray-600">Total Expenses</p>
                <p className="text-lg font-bold text-red-600">{currency}{stat.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-xs text-gray-600">Savings</p>
                <p className="text-lg font-bold text-green-600">{currency}{stat.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-xs text-gray-600">Savings Rate</p>
                <p className="text-lg font-bold text-purple-600">{stat.savingsRate}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Family Insights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-green-500">
        <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Family Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded p-4">
            <p className="text-gray-600 mb-2">Average Salary</p>
            <p className="text-2xl font-bold text-blue-600">
              {currency}{(familyTotals.salary / familyTotals.members).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-gray-600 mb-2">Average Savings</p>
            <p className="text-2xl font-bold text-green-600">
              {currency}{(familyTotals.remaining / familyTotals.members).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-gray-600 mb-2">Expense Ratio</p>
            <p className="text-2xl font-bold text-orange-600">
              {((familyTotals.expenses / familyTotals.salary) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
