import React from 'react'
import { Home, BarChart3, Users, Settings, HelpCircle, TrendingUp } from 'lucide-react'

export default function MobileNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'accounts', icon: Users, label: 'Accounts', color: 'text-blue-600' },
    { id: 'tracker', icon: Home, label: 'Tracker', color: 'text-green-600' },
    { id: 'family', icon: TrendingUp, label: 'Family', color: 'text-purple-600' },
    { id: 'charts', icon: BarChart3, label: 'Charts', color: 'text-orange-600' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition ${
                isActive
                  ? `${tab.color} border-t-2 border-current`
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-semibold">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
