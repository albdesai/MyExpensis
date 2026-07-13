import React from 'react'

export default function CategoryBreakdown({ data }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 text-lg">No data to display. Add months to see category breakdown.</p>
      </div>
    )
  }

  const latestMonth = data[data.length - 1]

  const categories = [
    { name: 'Home Loan EMI', value: latestMonth.emiHome, color: 'bg-red-100', textColor: 'text-red-700' },
    { name: 'Car Loan EMI', value: latestMonth.emiCar, color: 'bg-red-100', textColor: 'text-red-700' },
    { name: 'Personal Loan EMI', value: latestMonth.emiPersonal, color: 'bg-red-100', textColor: 'text-red-700' },
    { name: 'Rent', value: latestMonth.rent, color: 'bg-orange-100', textColor: 'text-orange-700' },
    { name: 'Groceries', value: latestMonth.groceries, color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { name: 'Utilities', value: latestMonth.utilities, color: 'bg-blue-100', textColor: 'text-blue-700' },
    { name: 'Transportation', value: latestMonth.transportation, color: 'bg-purple-100', textColor: 'text-purple-700' },
    { name: 'Entertainment', value: latestMonth.entertainment, color: 'bg-pink-100', textColor: 'text-pink-700' },
    { name: 'Healthcare', value: latestMonth.healthcare, color: 'bg-green-100', textColor: 'text-green-700' },
    { name: 'Other', value: latestMonth.other, color: 'bg-gray-100', textColor: 'text-gray-700' },
  ]

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.value, 0)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 Expense Breakdown</h2>
        <p className="text-gray-600 mb-6">Latest Month: <span className="font-semibold">{latestMonth.month}</span></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categories List */}
          <div className="space-y-3">
            {categories.map((category, index) => {
              const percentage = totalExpenses > 0 ? ((category.value / totalExpenses) * 100).toFixed(1) : 0
              return (
                <div key={index} className={`${category.color} rounded-lg p-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${category.textColor}`}>{category.name}</span>
                    <span className={`font-bold ${category.textColor}`}>₹{category.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color.replace('100', '500')}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs mt-1 ${category.textColor}`}>{percentage}% of total</p>
                </div>
              )
            })}
          </div>

          {/* Summary Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-blue-700">₹{totalExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">Total EMIs</p>
              <p className="text-3xl font-bold text-red-700">
                ₹{(latestMonth.emiHome + latestMonth.emiCar + latestMonth.emiPersonal).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {((latestMonth.emiHome + latestMonth.emiCar + latestMonth.emiPersonal) / totalExpenses * 100).toFixed(1)}% of total
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-200">
              <p className="text-sm text-gray-600 mb-1">Other Expenses</p>
              <p className="text-3xl font-bold text-orange-700">
                ₹{(totalExpenses - (latestMonth.emiHome + latestMonth.emiCar + latestMonth.emiPersonal)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {((totalExpenses - (latestMonth.emiHome + latestMonth.emiCar + latestMonth.emiPersonal)) / totalExpenses * 100).toFixed(1)}% of total
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">Remaining Balance</p>
              <p className="text-3xl font-bold text-green-700">
                ₹{(latestMonth.salary - totalExpenses).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {latestMonth.salary > 0 ? ((latestMonth.salary - totalExpenses) / latestMonth.salary * 100).toFixed(1) : 0}% savings rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
