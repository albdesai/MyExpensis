import React from 'react'
import { Target, TrendingUp, AlertCircle } from 'lucide-react'

export default function BudgetPlanner({ data, settings }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 text-lg">No data to display. Add months to see budget planning.</p>
      </div>
    )
  }

  const latestMonth = data[data.length - 1]
  const calculateExpenses = (item) => {
    return item.emiHome + item.emiCar + item.emiPersonal + item.rent + 
           item.groceries + item.utilities + item.transportation + 
           item.entertainment + item.healthcare + item.other
  }

  const totalExpenses = calculateExpenses(latestMonth)
  const remaining = latestMonth.salary - totalExpenses
  const budgetLimit = settings.budgetLimit
  const savingsGoal = settings.savingsGoal
  const currency = settings.currency

  const budgetUsed = (totalExpenses / budgetLimit) * 100
  const savingsAchieved = remaining >= savingsGoal
  const budgetExceeded = totalExpenses > budgetLimit

  return (
    <div className="space-y-6">
      {/* Budget Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Limit */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Monthly Budget</h3>
            <Target className="text-blue-500" size={24} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Budget Limit</span>
                <span className="font-bold text-blue-600">{currency}{budgetLimit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${budgetExceeded ? 'bg-red-500' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{budgetUsed.toFixed(1)}% used</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-gray-600">Spent</p>
                <p className="text-lg font-bold text-blue-600">{currency}{totalExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className={`p-3 rounded ${budgetExceeded ? 'bg-red-50' : 'bg-green-50'}`}>
                <p className="text-xs text-gray-600">Remaining</p>
                <p className={`text-lg font-bold ${budgetExceeded ? 'text-red-600' : 'text-green-600'}`}>
                  {currency}{Math.max(0, budgetLimit - totalExpenses).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {budgetExceeded && (
              <div className="bg-red-50 border border-red-200 rounded p-3 flex gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-sm text-red-700">Budget exceeded by {currency}{(totalExpenses - budgetLimit).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
            )}
          </div>
        </div>

        {/* Savings Goal */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Savings Goal</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Monthly Goal</span>
                <span className="font-bold text-green-600">{currency}{savingsGoal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${savingsAchieved ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${Math.min((remaining / savingsGoal) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{((remaining / savingsGoal) * 100).toFixed(1)}% achieved</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded">
                <p className="text-xs text-gray-600">Saved</p>
                <p className="text-lg font-bold text-green-600">{currency}{Math.max(0, remaining).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className={`p-3 rounded ${savingsAchieved ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <p className="text-xs text-gray-600">To Goal</p>
                <p className={`text-lg font-bold ${savingsAchieved ? 'text-green-600' : 'text-yellow-600'}`}>
                  {currency}{Math.max(0, savingsGoal - remaining).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {savingsAchieved ? (
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm text-green-700 font-semibold">✅ Savings goal achieved!</p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex gap-2">
                <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
                <p className="text-sm text-yellow-700">Need {currency}{(savingsGoal - remaining).toLocaleString('en-IN', { maximumFractionDigits: 0 })} more to reach goal</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Budget Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
        <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Budget Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-600 mb-2">Ideal Expense Ratio</p>
            <p className="text-2xl font-bold text-purple-600">70-80%</p>
            <p className="text-xs text-gray-500 mt-2">Current: {((totalExpenses / latestMonth.salary) * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-600 mb-2">Ideal Savings Rate</p>
            <p className="text-2xl font-bold text-green-600">20-30%</p>
            <p className="text-xs text-gray-500 mt-2">Current: {((remaining / latestMonth.salary) * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-600 mb-2">EMI to Income</p>
            <p className="text-2xl font-bold text-blue-600">Max 50%</p>
            <p className="text-xs text-gray-500 mt-2">Current: {(((latestMonth.emiHome + latestMonth.emiCar + latestMonth.emiPersonal) / latestMonth.salary) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Monthly Trend</h3>
        <div className="space-y-3">
          {data.slice(-3).reverse().map((item, index) => {
            const itemExpenses = calculateExpenses(item)
            const itemRemaining = item.salary - itemExpenses
            return (
              <div key={index} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">{item.month}</span>
                  <span className={`text-sm font-bold ${itemRemaining >= savingsGoal ? 'text-green-600' : 'text-orange-600'}`}>
                    {currency}{itemRemaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })} saved
                  </span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="text-gray-600">Salary: {currency}{item.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  <span className="text-gray-600">Spent: {currency}{itemExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
