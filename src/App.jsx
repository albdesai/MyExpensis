import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Download, Upload, TrendingUp, PieChart as PieChartIcon, BarChart3, Target, AlertCircle } from 'lucide-react'
import MonthlyTracker from './components/MonthlyTracker'
import CategoryBreakdown from './components/CategoryBreakdown'
import SummaryDashboard from './components/SummaryDashboard'
import Charts from './components/Charts'
import BudgetPlanner from './components/BudgetPlanner'
import SettingsPanel from './components/SettingsPanel'

export default function App() {
  const [activeTab, setActiveTab] = useState('tracker')
  const [data, setData] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [settings, setSettings] = useState({
    currency: '₹',
    theme: 'light',
    budgetLimit: 50000,
    savingsGoal: 10000,
    categories: ['Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment', 'Healthcare', 'Other']
  })

  useEffect(() => {
    const savedData = localStorage.getItem('expenseData')
    if (savedData) {
      setData(JSON.parse(savedData))
    }
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenseData', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
  }, [settings])

  const addMonth = (newEntry) => {
    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...newEntry, id: editingId } : item))
      setEditingId(null)
    } else {
      setData([...data, { ...newEntry, id: Date.now() }])
    }
  }

  const deleteMonth = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  const editMonth = (id) => {
    setEditingId(id)
    setActiveTab('tracker')
  }

  const downloadData = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `expense_tracker_${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const uploadData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const uploadedData = JSON.parse(e.target.result)
          setData(uploadedData)
          alert('Data imported successfully!')
        } catch (error) {
          alert('Error importing data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const editingData = editingId ? data.find(item => item.id === editingId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">💰 Expense Tracker</h1>
              <p className="text-gray-600 mt-2">Track your salary, EMIs, and expenses</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={downloadData}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                <Download size={20} /> Export
              </button>
              <label className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition">
                <Upload size={20} /> Import
                <input type="file" accept=".json" onChange={uploadData} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'tracker'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp size={20} /> Monthly Tracker
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'categories'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <PieChartIcon size={20} /> Categories
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'charts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 size={20} /> Charts
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'summary'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 Summary
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === 'budget'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Target size={20} /> Budget Planner
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'tracker' && (
          <MonthlyTracker
            data={data}
            onAdd={addMonth}
            onDelete={deleteMonth}
            onEdit={editMonth}
            editingData={editingData}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        )}

        {activeTab === 'categories' && (
          <CategoryBreakdown data={data} />
        )}

        {activeTab === 'charts' && (
          <Charts data={data} />
        )}

        {activeTab === 'summary' && (
          <SummaryDashboard data={data} />
        )}

        {activeTab === 'budget' && (
          <BudgetPlanner data={data} settings={settings} />
        )}
      </div>

      {/* Settings Panel */}
      <SettingsPanel settings={settings} onSettingsChange={setSettings} />
    </div>
  )
}
