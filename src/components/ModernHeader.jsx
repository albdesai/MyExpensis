import React, { useState } from 'react'
import { Menu, X, Download, Upload, HelpCircle, Settings } from 'lucide-react'

export default function ModernHeader({ onTour, onExport, onImport, onSettings }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white sticky top-0 z-40 shadow-lg">
      {/* Main Header */}
      <div className="px-4 py-4 md:px-6 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="text-3xl md:text-4xl">💰</div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">MyExpensis</h1>
              <p className="text-xs md:text-sm text-blue-100">Smart Finance Tracker</p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onTour}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition text-sm font-medium"
            >
              <HelpCircle size={18} /> Tour
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition text-sm font-medium"
            >
              <Download size={18} /> Export
            </button>
            <label className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg cursor-pointer transition text-sm font-medium">
              <Upload size={18} /> Import
              <input type="file" accept=".json" onChange={onImport} className="hidden" />
            </label>
            <button
              onClick={onSettings}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition text-sm font-medium"
            >
              <Settings size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-white border-opacity-20 space-y-2">
            <button
              onClick={() => {
                onTour()
                setShowMenu(false)
              }}
              className="w-full flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-lg transition text-sm font-medium"
            >
              <HelpCircle size={18} /> Tour
            </button>
            <button
              onClick={() => {
                onExport()
                setShowMenu(false)
              }}
              className="w-full flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-lg transition text-sm font-medium"
            >
              <Download size={18} /> Export Data
            </button>
            <label className="w-full flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-lg cursor-pointer transition text-sm font-medium">
              <Upload size={18} /> Import Data
              <input type="file" accept=".json" onChange={onImport} className="hidden" />
            </label>
            <button
              onClick={() => {
                onSettings()
                setShowMenu(false)
              }}
              className="w-full flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-3 rounded-lg transition text-sm font-medium"
            >
              <Settings size={18} /> Settings
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
