import React, { useState } from 'react'
import { Plus, Trash2, Users, User } from 'lucide-react'

export default function AccountManager({ accounts, onAddAccount, onDeleteAccount, onSelectAccount, currentAccount }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    color: '#3b82f6'
  })

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
    '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'
  ]

  const handleAddAccount = () => {
    if (formData.name.trim()) {
      onAddAccount({
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      })
      setFormData({ name: '', email: '', color: '#3b82f6' })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={24} /> Account Holders
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={20} /> Add Account
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-500">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Account Holder Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., John, Sarah"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      formData.color === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddAccount}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
              >
                Add Account
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            onClick={() => onSelectAccount(account.id)}
            className={`p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
              currentAccount?.id === account.id
                ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg'
                : 'shadow'
            }`}
            style={{ borderLeft: `4px solid ${account.color}`, backgroundColor: '#f9fafb' }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: account.color }}
                >
                  {account.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{account.name}</p>
                  {account.email && <p className="text-xs text-gray-600">{account.email}</p>}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteAccount(account.id)
                }}
                className="text-red-600 hover:text-red-800 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
            {currentAccount?.id === account.id && (
              <p className="text-xs text-blue-600 font-semibold mt-2">✓ Currently Selected</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
