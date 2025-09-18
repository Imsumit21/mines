"use client"

import React from "react"

interface AutoControlsProps {
  onSwitchToManual: () => void
}

const AutoControls: React.FC<AutoControlsProps> = ({ onSwitchToManual }) => {
  return (
    <div className="relative h-full">
      <div className="flex flex-col items-center justify-center h-full p-4 py-12">
        <div className="relative w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-500/90 h-3 w-3 rounded-full" />
            <div className="border-t-[12px] border-l-[24px] border-r-[24px] border-t-yellow-500/90 border-l-transparent border-r-transparent mx-1 h-0" />
            <div className="bg-yellow-500/90 h-3 w-3 rounded-full" />
          </div>
          
          <div className="bg-gray-800/90 border border-gray-700 rounded-lg p-6 text-center shadow-xl">
            <h2 className="text-2xl font-bold mb-3 font-[var(--font-bodoni)]">Coming Soon!</h2>
            <p className="text-gray-300 text-base font-[var(--font-raleway)]">
              We're currently working on implementing Auto Mode. Please check back later!
            </p>
            
            <button
              onClick={onSwitchToManual}
              className="mt-6 px-6 py-2 bg-[#1c3e94] hover:bg-[#1c3e94]/80 text-white font-medium rounded-md transition-colors font-[var(--font-raleway)] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutoControls 