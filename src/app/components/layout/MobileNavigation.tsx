"use client"

import React from "react"
import { Home, History, Star } from "lucide-react"

interface MobileNavigationProps {
  onShowHome: () => void
  onShowHistory: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  onShowHome,
  onShowHistory
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex items-center justify-around py-2 z-20 shadow-lg">
      <button
        onClick={onShowHome}
        className="flex flex-col items-center p-1.5 text-gray-400 hover:text-white active:text-white active:bg-gray-700 rounded-md cursor-pointer"
      >
        <Home size={16} />
        <span className="text-[10px] mt-0.5 font-[var(--font-raleway)]">Home</span>
      </button>
      <button
        onClick={onShowHistory}
        className="flex flex-col items-center p-1.5 text-gray-400 hover:text-white active:text-white active:bg-gray-700 rounded-md cursor-pointer"
        title="Betting History"
      >
        <History size={16} />
        <span className="text-[10px] mt-0.5 font-[var(--font-raleway)]">History</span>
      </button>
      <button className="flex flex-col items-center p-1.5 text-white bg-gray-700 rounded-md cursor-pointer">
        <Star size={16} />
        <span className="text-[10px] mt-0.5 font-[var(--font-raleway)]">Games</span>
      </button>
    </div>
  )
}

export default MobileNavigation 