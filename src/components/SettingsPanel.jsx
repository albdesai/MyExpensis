import React, { useState } from 'react'
import { Settings as SettingsIcon, X } from 'lucide-react'

export default function SettingsPanel({ settings, onSettingsChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [localSettings, setLocalSettings] = useState(settings)

  const handleChange = (key, value) => {
    const updated = { ...localSettings, [key]: value }
    setLocalSettings(updated)
    onSettingsChange(updated)
  }

  const handleCategoryChange = (index, value) => {
    const updated = [...localSettings.categories]
    updated[index] = value
    handleChange('categories', updated)
  }

  const addCategory = () => {
    const updated = [...localSettings.categories, 'New Category']
    handleChange('categories', updated)
  }

  const removeCategory = (index) => {
    const updated = localSettings.categories.filter((_, i) => i !== index)
    handleChange('categories', updated)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
      >
        <SettingsIcon size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">⚙️ Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-800 p-2 rounded transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Currency */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                <select
                  value={localSettings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="₹">Indian Rupee (₹)</option>
                  <option value="$">US Dollar ($)</option>
                  <option value="€">Euro (€)</option>
                  <option value="£">British Pound (£)</option>
                  <option value="¥">Japanese Yen (¥)</option>
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
                <div className="flex gap-4">
                  {['light', 'dark'].map((theme) => (
                    <label key={theme} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        checked={localSettings.theme === theme}
                        onChange={(e) => handleChange('theme', e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="capitalize font-medium">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Limit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Budget Limit</label>
                <input
                  type="number"
                  value={localSettings.budgetLimit}
                  onChange={(e) => handleChange('budgetLimit', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Savings Goal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Savings Goal</label>
                <input
                  type="number"
                  value={localSettings.savingsGoal}
                  onChange={(e) => handleChange('savingsGoal', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Categories */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Expense Categories</label>
                  <button
                    onClick={addCategory}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {localSettings.categories.map((category, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeCategory(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
