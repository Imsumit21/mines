"use client"

import React from "react"
import { Plus, Minus } from "lucide-react"

interface BetControlsProps {
  betAmount: number
  isPlaying: boolean
  wallet: number
  onBetAmountChange: (amount: number) => void
  onPresetClick: (presetIndex: number) => void
  activeBetPreset: number | null
}

const BetControls: React.FC<BetControlsProps> = ({
  betAmount,
  isPlaying,
  wallet,
  onBetAmountChange,
  onPresetClick,
  activeBetPreset
}) => {
  const DEFAULT_BET_PRESETS = [10, 50, 100]

  const updateBetAmount = (amount: number) => {
    if (!isPlaying) {
      const newAmount = Math.max(1, Math.min(amount, wallet, 10000))
      onBetAmountChange(newAmount)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-white mb-1.5 font-[var(--font-raleway)]">Bet Amount</label>
      
      <div className="flex items-center mb-2">
        <button
          onClick={() => updateBetAmount(Math.max(1, betAmount - (betAmount < 10 ? 1 : 10)))}
          disabled={isPlaying}
          className="h-9 w-9 bg-[#1c3e94] rounded-l-md text-white hover:bg-[#1c3e94]/80 disabled:opacity-50 cursor-pointer flex items-center justify-center"
        >
          <Minus size={16} />
        </button>
        <div className="relative flex-1">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => updateBetAmount(Number.parseInt(e.target.value) || 1)}
            disabled={isPlaying}
            className="w-full h-9 px-2 bg-gray-700 text-center text-white focus:outline-none focus:ring-1 focus:ring-[#1c3e94] disabled:opacity-50 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none touch-manipulation"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-gray-300 text-sm">INR</span>
          </div>
        </div>
        <button
          onClick={() => updateBetAmount(betAmount + (betAmount < 10 ? 1 : 10))}
          disabled={isPlaying}
          className="h-9 w-9 bg-[#1c3e94] rounded-r-md text-white hover:bg-[#1c3e94]/80 disabled:opacity-50 cursor-pointer flex items-center justify-center"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {DEFAULT_BET_PRESETS.map((preset, index) => (
          <button
            key={index}
            onClick={() => onPresetClick(index)}
            disabled={isPlaying}
            className={`py-1.5 rounded-md text-xs font-medium cursor-pointer
              ${betAmount === preset
                ? "bg-[#1c3e94] text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
              } disabled:opacity-50 transition-colors`}
          >
            {preset} INR
          </button>
        ))}
      </div>
    </div>
  )
}

export default BetControls 