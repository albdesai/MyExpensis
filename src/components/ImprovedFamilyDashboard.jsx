import React, { useState } from 'react'
import { Users, TrendingUp, PieChart as PieChartIcon, AlertCircle, Target, Award, BarChart3, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

export default function ImprovedFamilyDashboard({ data, accounts, settings }) {
  const [viewMode, setViewMode] = useState('overview') // overview, comparison, insights

  if (data.length === 0 || accounts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-12 text-center border-2 border-dashed border-blue-200">
        <Users size={56} className="mx-auto text-blue-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Family Data Yet</h3>
        <p className="text-gray-600 mb-4">Start by creating accounts and adding expenses to see your family dashboard</p>
        <div className="flex gap-2 justify-center text-sm text-gray-500">
          <span>👥 Create accounts</span>
          <span>→</span>
          <span>💰 Add expenses</span>
          <span>→</span>
          <span>📊 View insights</span>
        </div>
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
      savingsRate: latestMonth.salary > 0 ? ((remaining / latestMonth.salary) * 100).toFixed(1) : 0,
      expenseRatio: latestMonth.salary > 0 ? ((totalExpenses / latestMonth.salary) * 100).toFixed(1) : 0
    }
  }).filter(Boolean)

  const familySavingsRate = familyTotals.salary > 0 ? ((familyTotals.remaining / familyTotals.salary) * 100).toFixed(1) : 0
  const familyExpenseRatio = familyTotals.salary > 0 ? ((familyTotals.expenses / familyTotals.salary) * 100).toFixed(1) : 0

  // Sort members by savings rate
  const topSaver = [...memberStats].sort((a, b) => b.savingsRate - a.savingsRate)[0]
  const highestEarner = [...memberStats].sort((a, b) => b.salary - a.salary)[0]

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setViewMode('overview')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            viewMode === 'overview'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setViewMode('comparison')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            viewMode === 'comparison'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          ⚖️ Comparison
        </button>
        <button
          onClick={() => setViewMode('insights')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            viewMode === 'insights'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          💡 Insights
        </button>
      </div>

      {/* OVERVIEW MODE */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* Family Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Salary */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-semibold">Total Family Salary</p>
                  <p className="text-3xl font-bold mt-2">{currency}{(familyTotals.salary / 100000).toFixed(1)}L</p>
                </div>
                <ArrowUpRight size={24} className="text-blue-200" />
              </div>
              <p className="text-xs text-blue-100">{familyTotals.members} members</p>
            </div>

            {/* Total Expenses */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-red-100 text-sm font-semibold">Total Expenses</p>
                  <p className="text-3xl font-bold mt-2">{currency}{(familyTotals.expenses / 100000).toFixed(1)}L</p>
                </div>
                <ArrowDownLeft size={24} className="text-red-200" />
              </div>
              <p className="text-xs text-red-100">{familyExpenseRatio}% of income</p>
            </div>

            {/* Total Savings */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-green-100 text-sm font-semibold">Total Savings</p>
                  <p className="text-3xl font-bold mt-2">{currency}{(familyTotals.remaining / 100000).toFixed(1)}L</p>
                </div>
                <Target size={24} className="text-green-200" />
              </div>
              <p className="text-xs text-green-100">{familySavingsRate}% saved</p>
            </div>

            {/* Savings Rate */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-purple-100 text-sm font-semibold">Family Savings Rate</p>
                  <p className="text-3xl font-bold mt-2">{familySavingsRate}%</p>
                </div>
                <Award size={24} className="text-purple-200" />
              </div>
              <p className="text-xs text-purple-100">Monthly average</p>
            </div>
          </div>

          {/* Member Cards - Improved Design */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={28} /> Family Members
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {memberStats.map((stat) => (
                <div
                  key={stat.account.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden border-t-4"
                  style={{ borderTopColor: stat.account.color }}
                >
                  {/* Header */}
                  <div className="p-4" style={{ backgroundColor: stat.account.color + '15' }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                        style={{ backgroundColor: stat.account.color }}
                      >
                        {stat.account.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">{stat.account.name}</h4>
                        <p className="text-xs text-gray-600">Member</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-4 space-y-3">
                    {/* Salary */}
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <p className="text-xs text-gray-600 font-semibold">Monthly Salary</p>
                      <p className="text-xl font-bold text-blue-600 mt-1">{currency}{stat.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>

                    {/* Expenses */}
                    <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                      <p className="text-xs text-gray-600 font-semibold">Total Expenses</p>
                      <p className="text-xl font-bold text-red-600 mt-1">{currency}{stat.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.expenseRatio}% of salary</p>
                    </div>

                    {/* Savings */}
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <p className="text-xs text-gray-600 font-semibold">Monthly Savings</p>
                      <p className="text-xl font-bold text-green-600 mt-1">{currency}{stat.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.savingsRate}% saved</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-4 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-semibold text-gray-700">Savings Progress</p>
                      <p className="text-xs font-bold text-gray-600">{stat.savingsRate}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(stat.savingsRate, 100)}%`,
                          backgroundColor: stat.account.color
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODE */}
      {viewMode === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Member</th>
                    <th className="px-6 py-4 text-right font-semibold">Salary</th>
                    <th className="px-6 py-4 text-right font-semibold">Expenses</th>
                    <th className="px-6 py-4 text-right font-semibold">Savings</th>
                    <th className="px-6 py-4 text-right font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {memberStats.map((stat, idx) => (
                    <tr key={stat.account.id} className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: stat.account.color }}
                          >
                            {stat.account.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-gray-800">{stat.account.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold text-blue-600">{currency}{stat.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold text-red-600">{currency}{stat.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold text-green-600">{currency}{stat.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold text-sm">{stat.savingsRate}%</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-50 font-bold border-t-2 border-gray-300">
                    <td className="px-6 py-4 text-gray-800">TOTAL</td>
                    <td className="px-6 py-4 text-right text-blue-600">{currency}{familyTotals.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    <td className="px-6 py-4 text-right text-red-600">{currency}{familyTotals.expenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    <td className="px-6 py-4 text-right text-green-600">{currency}{familyTotals.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    <td className="px-6 py-4 text-right text-purple-600">{familySavingsRate}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INSIGHTS MODE */}
      {viewMode === 'insights' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-center gap-3 mb-4">
                <Award size={28} className="text-orange-600" />
                <h4 className="text-lg font-bold text-gray-800">Top Saver</h4>
              </div>
              <p className="text-2xl font-bold text-orange-600">{topSaver.account.name}</p>
              <p className="text-sm text-gray-600 mt-2">Savings Rate: {topSaver.savingsRate}%</p>
              <p className="text-sm text-gray-600">Monthly Savings: {currency}{topSaver.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={28} className="text-green-600" />
                <h4 className="text-lg font-bold text-gray-800">Highest Earner</h4>
              </div>
              <p className="text-2xl font-bold text-green-600">{highestEarner.account.name}</p>
              <p className="text-sm text-gray-600 mt-2">Monthly Salary: {currency}{highestEarner.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-gray-600">Contribution: {((highestEarner.salary / familyTotals.salary) * 100).toFixed(1)}%</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 size={28} className="text-blue-600" />
                <h4 className="text-lg font-bold text-gray-800">Family Average</h4>
              </div>
              <p className="text-2xl font-bold text-blue-600">{currency}{(familyTotals.salary / familyTotals.members / 100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-600 mt-2">Avg Salary per Member</p>
              <p className="text-sm text-gray-600">Avg Savings: {currency}{(familyTotals.remaining / familyTotals.members).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle size={24} className="text-blue-600" /> Smart Recommendations
            </h4>
            <div className="space-y-3">
              {familySavingsRate < 20 && (
                <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                  <p className="font-semibold text-gray-800">⚠️ Low Savings Rate</p>
                  <p className="text-sm text-gray-600 mt-1">Your family is saving only {familySavingsRate}%. Try to increase it to at least 30% for better financial health.</p>
                </div>
              )}
              {familyExpenseRatio > 80 && (
                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="font-semibold text-gray-800">💡 High Expense Ratio</p>
                  <p className="text-sm text-gray-600 mt-1">Your family spends {familyExpenseRatio}% of income. Consider reviewing discretionary expenses.</p>
                </div>
              )}
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <p className="font-semibold text-gray-800">✅ Family Strength</p>
                <p className="text-sm text-gray-600 mt-1">You have {familyTotals.members} earning members with combined monthly savings of {currency}{familyTotals.remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
