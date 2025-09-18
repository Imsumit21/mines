"use client"

import React from "react"
import { Gem, Wallet, Plus, Home, History } from "lucide-react"

interface HeaderProps {
  wallet: number
  onAddFunds: () => void
  onShowHome: () => void
  onShowHistory: () => void
  onToggleFullscreen: () => void
}

const Header: React.FC<HeaderProps> = ({
  wallet,
  onAddFunds,
  onShowHome,
  onShowHistory,
  onToggleFullscreen
}) => {
  return (
    <header className="py-1 border-b border-gray-800 sticky top-0 bg-gray-900 z-20 h-[40px] md:h-[45px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Gem className="text-[#058c42] w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            <h1 className="text-base sm:text-lg font-bold font-[var(--font-bodoni)]">Gems & Mines</h1>
          </div>

          <div className="hidden sm:flex space-x-1">
            <button
              onClick={onShowHome}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <Home size={16} />
            </button>
            <button
              onClick={onShowHistory}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800 cursor-pointer"
              title="Betting History"
            >
              <History size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-1 sm:mr-2 bg-gray-800 rounded-md px-2 py-1 border border-gray-700">
            <Wallet className="text-[#058c42] w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="font-medium text-xs sm:text-sm font-[var(--font-raleway)]">{wallet.toFixed(0)} INR</span>
            <button
              onClick={onAddFunds}
              className="ml-1 text-[#1c3e94] hover:text-[#1c3e94]/80 cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={onToggleFullscreen}
            className="mr-1 p-1 bg-gray-800 border border-gray-700 rounded-md text-indigo-400 hover:text-indigo-300 cursor-pointer hidden sm:block"
            title="Toggle Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
              <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
              <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
            </svg>
          </button>

          <div className="flex items-center bg-gray-800 rounded-md border border-gray-700 p-1 px-2 cursor-pointer hover:bg-gray-700 ml-1">
            <img 
              src="https://randomuser.me/api/portraits/men/43.jpg" 
              alt="John Yadav" 
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full mr-1 sm:mr-2"
            />
            <span className="font-medium text-xs font-[var(--font-raleway)] hidden sm:block">John Yadav</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 