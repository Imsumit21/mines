"use client"

import React from "react"
import { Plus, Minus, Bomb, Gem } from "lucide-react"

interface MinesControlsProps {
  minesCount: number
  isPlaying: boolean
  onMinesCountChange: (count: number) => void
}

const MinesControls: React.FC<MinesControlsProps> = ({
  minesCount,
  isPlaying,
  onMinesCountChange
}) => {
  const updateMinesCount = (count: number) => {
    if (!isPlaying) {
      const newCount = Math.max(1, Math.min(count, 24))
      onMinesCountChange(newCount)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-white mb-1.5 font-[var(--font-raleway)]">Number of Mines</label>
      <div className="flex items-center mb-2">
        <button
          onClick={() => updateMinesCount(minesCount - 1)}
          disabled={isPlaying}
          className="h-9 w-9 bg-[#1c3e94] rounded-l-md text-white hover:bg-[#1c3e94]/80 disabled:opacity-50 cursor-pointer flex items-center justify-center"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          value={minesCount}
          onChange={(e) => updateMinesCount(Number.parseInt(e.target.value) || 1)}
          disabled={isPlaying}
          className="flex-1 h-9 px-2 bg-gray-700 text-center text-white focus:outline-none focus:ring-1 focus:ring-[#1c3e94] disabled:opacity-50 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none touch-manipulation"
          min="1"
          max="24"
        />
        <button
          onClick={() => updateMinesCount(minesCount + 1)}
          disabled={isPlaying}
          className="h-9 w-9 bg-[#1c3e94] rounded-r-md text-white hover:bg-[#1c3e94]/80 disabled:opacity-50 cursor-pointer flex items-center justify-center"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <div className="bg-gray-800 rounded-md p-3 flex flex-col items-center border border-gray-700">
          <div className="text-xs text-gray-300 mb-1 font-[var(--font-raleway)]">Mines</div>
          <div className="text-lg font-semibold text-red-500 flex items-center font-[var(--font-raleway)]">
            <Bomb className="w-4 h-4 mr-1" /> {minesCount}
          </div>
        </div>

        <div className="bg-gray-800 rounded-md p-3 flex flex-col items-center border border-gray-700">
          <div className="text-xs text-gray-300 mb-1 font-[var(--font-raleway)]">Gems</div>
          <div className="text-lg font-semibold text-[#00CC66] flex items-center font-[var(--font-raleway)]">
            <Gem className="w-4 h-4 mr-1 text-[#00CC66]" /> {25 - minesCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinesControls 