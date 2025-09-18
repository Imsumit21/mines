"use client"

import React from "react"

interface GameStatsProps {
  revealedCells: number
  minesCount: number
  currentMultiplier: number
  gemChance: number
}

const GameStats: React.FC<GameStatsProps> = ({
  revealedCells,
  minesCount,
  currentMultiplier,
  gemChance
}) => {
  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-1 sm:mb-2">
      <div className="bg-gray-800 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center border border-gray-700">
        <div className="text-xs text-gray-300 font-[var(--font-raleway)]">Revealed</div>
        <div className="text-sm sm:text-base font-medium text-white font-[var(--font-raleway)]">
          {revealedCells}/{25 - minesCount}
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center border border-gray-700">
        <div className="text-xs text-gray-300 font-[var(--font-raleway)]">Multiplier</div>
        <div className="text-sm sm:text-base font-medium text-[#00CC66] font-[var(--font-raleway)]">{currentMultiplier}×</div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center border border-gray-700">
        <div className="text-xs text-gray-300 font-[var(--font-raleway)]">Gem Chance</div>
        <div className="text-sm sm:text-base font-medium text-[#00CC66] font-[var(--font-raleway)]">{(gemChance * 100).toFixed(1)}%</div>
      </div>
    </div>
  )
}

export default GameStats 