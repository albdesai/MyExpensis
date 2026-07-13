import React, { useState, useEffect } from 'react'
import { Trash2, Edit2 } from 'lucide-react'

export default function MonthlyTracker({ data, onAdd, onDelete, onEdit, editingData, editingId, setEditingId }) {
  const [formData, setFormData] = useState({
    month: '',
    salary: 0,
    emiHome: 0,
    emiCar: 0,
    emiPersonal: 0,
    rent: 0,
    groceries: 0,
    utilities: 0,
    transportation: 0,
    entertainment: 0,
    healthcare: 0,
    other: 0,
  })

  useEffect(() => {
    if (editingData) {
      setFormData(editingData)
    } else {
      setFormData({
        month: '',
        salary: 0,
        emiHome: 0,
        emiCar: 0,
        emiPersonal: 0,
        rent: 0,
        groceries: 0,
        utilities: 0,
        transportation: 0,
        entertainment: 0,
        healthcare: 0,
        other: 0,
      })
    }
  }, [editingData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'month' ? value : parseFloat(value) || 0
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.month) {
      alert('Please enter a month')
      return
    }
    onAdd(formData)
    setFormData({
      month: '',
      salary: 0,
      emiHome: 0,
      emiCar: 0,
      emiPersonal: 0,
      rent: 0,
      groceries: 0,
      utilities: 0,
      transportation: 0,
      entertainment: 0,
      healthcare: 0,
      other: 0,
    })
  }

  const totalEMI = formData.emiHome + formData.emiCar + formData.emiPersonal
  const totalExpenses = totalEMI + formData.rent + formData.groceries + formData.utilities + 
                       formData.transportation + formData.entertainment + formData.healthcare + formData.other
  const remaining = formData.salary - totalExpenses
  const savingsRate = formData.salary > 0 ? ((remaining / formData.salary) * 100).toFixed(2) : 0

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingId ? '✏️ Edit Month' : '➕ Add New Month'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Month Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Month</label>
            <input
              type="text"
              name="month"
              value={formData.month}
              onChange={handleChange}
              placeholder="e.g., January 2024"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* EMIs Section */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-4">EMIs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Home Loan EMI</label>
                <input
                  type="number"
                  name="emiHome"
                  value={formData.emiHome}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Car Loan EMI</label>
                <input
                  type="number"
                  name="emiCar"
                  value={formData.emiCar}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Loan EMI</label>
                <input
                  type="number"
                  name="emiPersonal"
                  value={formData.emiPersonal}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded border border-red-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Total EMI:</span> ₹{totalEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          {/* Other Expenses Section */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-4">Other Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rent</label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Groceries</label>
                <input
                  type="number"
                  name="groceries"
                  value={formData.groceries}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Utilities</label>
                <input
                  type="number"
                  name="utilities"
                  value={formData.utilities}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Transportation</label>
                <input
                  type="number"
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Entertainment</label>
                <input
                  type="number"
                  name="entertainment"
                  value={formData.entertainment}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Healthcare</label>
                <input
                  type="number"
                  name="healthcare"
                  value={formData.healthcare}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Other</label>
                <input
                  type="number"
                  name="other"
                  value={formData.other}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-50 p-4 rounded-lg">
            <div>
              <p className="text-xs text-gray-600">Total Expenses</p>
              <p className="text-lg font-bold text-gray-800">₹{totalExpenses.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Remaining</p>
              <p className={`text-lg font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{remaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Savings Rate</p>
              <p className="text-lg font-bold text-blue-600">{savingsRate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Expense Ratio</p>
              <p className="text-lg font-bold text-orange-600">{formData.salary > 0 ? ((totalExpenses / formData.salary) * 100).toFixed(2) : 0}%</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              {editingId ? '💾 Update' : '➕ Add Month'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setFormData({
                    month: '',
                    salary: 0,
                    emiHome: 0,
                    emiCar: 0,
                    emiPersonal: 0,
                    rent: 0,
                    groceries: 0,
                    utilities: 0,
                    transportation: 0,
                    entertainment: 0,
                    healthcare: 0,
                    other: 0,
                  })
                }}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Data Table */}
      {data.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Month</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Salary</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total EMI</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Other Exp.</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total Exp.</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Remaining</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Savings %</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const itemTotalEMI = item.emiHome + item.emiCar + item.emiPersonal
                  const itemOtherExp = item.rent + item.groceries + item.utilities + item.transportation + item.entertainment + item.healthcare + item.other
                  const itemTotalExp = itemTotalEMI + itemOtherExp
                  const itemRemaining = item.salary - itemTotalExp
                  const itemSavingsRate = item.salary > 0 ? ((itemRemaining / item.salary) * 100).toFixed(2) : 0
                  
                  return (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 font-semibold">{item.month}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800">₹{item.salary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="px-4 py-3 text-sm text-right text-red-600 font-semibold">₹{itemTotalEMI.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="px-4 py-3 text-sm text-right text-orange-600 font-semibold">₹{itemOtherExp.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800 font-bold">₹{itemTotalExp.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      <td className={`px-4 py-3 text-sm text-right font-bold ${itemRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{itemRemaining.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-blue-600 font-semibold">{itemSavingsRate}%</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => onEdit(item.id)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No data yet. Add your first month to get started!</p>
        </div>
      )}
    </div>
  )
}
