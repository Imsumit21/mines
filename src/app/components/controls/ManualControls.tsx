"use client"

import React from "react"
import { Play, DollarSign } from "lucide-react"
import BetControls from "./BetControls"
import MinesControls from "./MinesControls"

interface ManualControlsProps {
  betAmount: number
  minesCount: number
  isPlaying: boolean
  isGameOver: boolean
  wallet: number
  potentialWinnings: number
  maxProfit: number
  currentMultiplier: number
  onBetAmountChange: (amount: number) => void
  onMinesCountChange: (count: number) => void
  onStartGame: () => void
  onTakeWinnings: () => void
  onPresetClick: (presetIndex: number) => void
  activeBetPreset: number | null
}

const ManualControls: React.FC<ManualControlsProps> = ({
  betAmount,
  minesCount,
  isPlaying,
  isGameOver,
  wallet,
  potentialWinnings,
  maxProfit,
  currentMultiplier,
  onBetAmountChange,
  onMinesCountChange,
  onStartGame,
  onTakeWinnings,
  onPresetClick,
  activeBetPreset
}) => {
  return (
    <div className="space-y-2 md:space-y-1.5 pb-1 md:pb-0">
      <BetControls
        betAmount={betAmount}
        isPlaying={isPlaying}
        wallet={wallet}
        onBetAmountChange={onBetAmountChange}
        onPresetClick={onPresetClick}
        activeBetPreset={activeBetPreset}
      />

      <MinesControls
        minesCount={minesCount}
        isPlaying={isPlaying}
        onMinesCountChange={onMinesCountChange}
      />

      {!isPlaying && (
        <div className="bg-gray-800 rounded-md p-3 border border-gray-700 mb-2">
          <div className="text-xs text-gray-300 mb-1 font-[var(--font-raleway)]">Max Profit</div>
          <div className="font-semibold text-green-500 font-[var(--font-raleway)]">{maxProfit.toFixed(2)} INR</div>
        </div>
      )}

      {isPlaying && (
        <div className="bg-gray-800 rounded-md p-3 flex items-center justify-between border border-gray-700 mb-2">
          <div>
            <div className="text-xs text-gray-300 font-[var(--font-raleway)]">Current Multiplier</div>
            <div className="text-xl font-semibold text-[#00CC66] font-[var(--font-raleway)]">{currentMultiplier}×</div>
          </div>
          <div>
            <div className="text-xs text-gray-300 font-[var(--font-raleway)]">Payout</div>
            <div className="text-xl font-semibold text-green-400 font-[var(--font-raleway)]">
              {potentialWinnings.toFixed(2)} INR
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onStartGame}
        disabled={wallet < betAmount}
        className="w-full py-3 sm:py-2.5 px-3 bg-[#1c3e94] hover:bg-[#1c3e94]/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors flex items-center justify-center text-sm font-[var(--font-raleway)] cursor-pointer mb-2 sm:mb-1.5 mt-2 sm:mt-0"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Game
      </button>
      <button
        onClick={onTakeWinnings}
        disabled={!isPlaying || isGameOver}
        className="w-full py-3 sm:py-2.5 px-3 bg-[#00CC66] hover:bg-[#00CC66]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors flex items-center justify-center text-sm font-[var(--font-raleway)] cursor-pointer"
      >
        <DollarSign className="w-4 h-4 mr-2" />
        Cash Out: {potentialWinnings.toFixed(2)} INR
      </button>
    </div>
  )
}

export default ManualControls 