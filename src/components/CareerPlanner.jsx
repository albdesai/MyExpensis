import React, { useState } from 'react'
import { TrendingUp, Plus, Trash2, Target, Lightbulb } from 'lucide-react'

export default function CareerPlanner({ data, settings }) {
  const [careerGoals, setCareerGoals] = useState(() => {
    const saved = localStorage.getItem('careerGoals')
    return saved ? JSON.parse(saved) : []
  })
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear() + 1,
    targetSalary: 0,
    jobTitle: '',
    strategy: '',
    expectedIncrease: 0
  })

  const currency = settings.currency

  const currentSalary = data.length > 0 ? data[data.length - 1].salary : 0

  const handleAddGoal = () => {
    if (formData.targetSalary > 0) {
      const newGoal = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      const updated = [...careerGoals, newGoal]
      setCareerGoals(updated)
      localStorage.setItem('careerGoals', JSON.stringify(updated))
      setFormData({
        year: new Date().getFullYear() + 1,
        targetSalary: 0,
        jobTitle: '',
        strategy: '',
        expectedIncrease: 0
      })
      setShowForm(false)
    }
  }

  const handleDeleteGoal = (id) => {
    const updated = careerGoals.filter(goal => goal.id !== id)
    setCareerGoals(updated)
    localStorage.setItem('careerGoals', JSON.stringify(updated))
  }

  const sortedGoals = [...careerGoals].sort((a, b) => a.year - b.year)

  const projectedSavings = (salary, expenses) => {
    return Math.max(0, salary - expenses)
  }

  const calculateProjection = (goal) => {
    const yearsFromNow = goal.year - new Date().getFullYear()
    const salaryIncrease = goal.targetSalary - currentSalary
    const annualIncrease = yearsFromNow > 0 ? salaryIncrease / yearsFromNow : salaryIncrease
    return {
      yearsFromNow,
      salaryIncrease,
      annualIncrease,
      monthlyIncrease: annualIncrease / 12
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm">Current Salary</p>
            <p className="text-4xl font-bold">{currency}{currentSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            <p className="text-blue-100 text-sm mt-2">Monthly</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Annual</p>
            <p className="text-3xl font-bold">{currency}{(currentSalary * 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          </div>
        </div>
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <Plus size={20} /> Add Career Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Set Your Career Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Salary ({currency})</label>
              <input
                type="number"
                value={formData.targetSalary}
                onChange={(e) => setFormData({ ...formData, targetSalary: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title/Role</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="e.g., Senior Manager, Team Lead"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Increase (%)</label>
              <input
                type="number"
                value={formData.expectedIncrease}
                onChange={(e) => setFormData({ ...formData, expectedIncrease: parseFloat(e.target.value) })}
                placeholder="e.g., 20"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Strategy to Achieve</label>
              <textarea
                value={formData.strategy}
                onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                placeholder="e.g., Learn new skills, switch companies, get promotion, etc."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddGoal}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Career Goals List */}
      {sortedGoals.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">🎯 Your Career Goals</h3>
          {sortedGoals.map((goal) => {
            const projection = calculateProjection(goal)
            const isAchievable = projection.yearsFromNow > 0
            const percentageIncrease = ((goal.targetSalary - currentSalary) / currentSalary * 100).toFixed(1)

            return (
              <div key={goal.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{goal.jobTitle || 'Career Goal'}</h4>
                    <p className="text-gray-600 text-sm">Target Year: {goal.year}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <p className="text-xs text-gray-600">Target Salary</p>
                    <p className="text-xl font-bold text-blue-600">{currency}{goal.targetSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded">
                    <p className="text-xs text-gray-600">Increase Needed</p>
                    <p className="text-xl font-bold text-green-600">{currency}{(goal.targetSalary - currentSalary).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    <p className="text-xs text-gray-600 mt-1">{percentageIncrease}%</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded">
                    <p className="text-xs text-gray-600">Years to Goal</p>
                    <p className="text-xl font-bold text-purple-600">{projection.yearsFromNow}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded">
                    <p className="text-xs text-gray-600">Monthly Increase</p>
                    <p className="text-xl font-bold text-orange-600">{currency}{projection.monthlyIncrease.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>

                {goal.strategy && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">📋 Strategy:</p>
                    <p className="text-sm text-gray-700">{goal.strategy}</p>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Progress to Goal</span>
                    <span className="text-sm font-bold text-gray-800">{((currentSalary / goal.targetSalary) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                      style={{ width: `${Math.min((currentSalary / goal.targetSalary) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Savings Projection */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-3">💰 Projected Savings with New Salary</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Monthly Savings</p>
                      <p className="font-bold text-green-600">{currency}{(goal.targetSalary * 0.25).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Annual Savings</p>
                      <p className="font-bold text-green-600">{currency}{(goal.targetSalary * 3).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">By {goal.year}</p>
                      <p className="font-bold text-blue-600">{currency}{(goal.targetSalary * 3 * projection.yearsFromNow).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Wealth</p>
                      <p className="font-bold text-purple-600">{currency}{(goal.targetSalary * 3 * projection.yearsFromNow + (currentSalary * 0.25 * 12 * (new Date().getFullYear() - 2024))).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <Target size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No career goals yet. Add your first goal to start planning!</p>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
        <div className="flex items-start gap-4">
          <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Tips for Salary Growth</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-800 mb-2">📚 Skill Development</p>
                <p className="text-gray-700">Learn in-demand skills, get certifications, and stay updated with industry trends. Invest 5-10% of salary in learning.</p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-800 mb-2">🏢 Job Switching</p>
                <p className="text-gray-700">Companies often offer 20-40% higher salary for experienced professionals. Switch every 2-3 years for maximum growth.</p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-800 mb-2">🎯 Negotiation</p>
                <p className="text-gray-700">Research market rates, document achievements, and negotiate confidently. Most companies have 10-20% negotiation room.</p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-800 mb-2">🚀 Side Income</p>
                <p className="text-gray-700">Build passive income through freelancing, consulting, or side projects. Can add 20-50% to main income.</p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-800 mb-2">📊 Performance</p>
                <p className="text-gray-700">Document your achievements, take on challenging projects, and seek promotions. Internal promotions offer 15-25% raises.</p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="font-semibold text-gray-800 mb-2">🤝 Networking</p>
                <p className="text-gray-700">Build professional relationships, attend industry events, and maintain connections. 70% of jobs come through networking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Growth Timeline */}
      {sortedGoals.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📈 Your Salary Growth Timeline</h3>
          <div className="space-y-4">
            {/* Current */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-24 text-right">
                <p className="font-bold text-gray-800">Now</p>
              </div>
              <div className="flex-grow">
                <div className="bg-blue-500 rounded-lg p-4 text-white">
                  <p className="font-bold">{currency}{currentSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}/month</p>
                </div>
              </div>
            </div>

            {/* Goals */}
            {sortedGoals.map((goal, index) => (
              <div key={goal.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-24 text-right">
                  <p className="font-bold text-gray-800">{goal.year}</p>
                </div>
                <div className="flex-grow">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 text-white">
                    <p className="font-bold">{currency}{goal.targetSalary.toLocaleString('en-IN', { maximumFractionDigits: 0 })}/month</p>
                    <p className="text-sm text-green-100">+{((goal.targetSalary - currentSalary) / currentSalary * 100).toFixed(1)}% increase</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
