"use client"

import React from "react"
import { ManualControls, AutoControls } from "../controls"

interface SidebarProps {
  activeTab: "manual" | "auto"
  onTabChange: (tab: "manual" | "auto") => void
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

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
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
    <div className="md:col-span-1 overflow-y-visible md:overflow-y-auto pr-1 order-2 md:order-1 md:h-full">
      <div className="bg-gray-800 rounded-lg overflow-visible md:overflow-hidden md:h-full">
        <div className="flex border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
          <button
            className={`flex-1 py-2 text-center font-medium font-[var(--font-raleway)] cursor-pointer ${activeTab === "manual" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            onClick={() => onTabChange("manual")}
          >
            Manual
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium font-[var(--font-raleway)] cursor-pointer ${activeTab === "auto" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            onClick={() => onTabChange("auto")}
          >
            Auto
          </button>
        </div>

        <div className="p-1.5 overflow-y-visible md:overflow-y-auto md:max-h-full">
          {activeTab === "manual" ? (
            <ManualControls
              betAmount={betAmount}
              minesCount={minesCount}
              isPlaying={isPlaying}
              isGameOver={isGameOver}
              wallet={wallet}
              potentialWinnings={potentialWinnings}
              maxProfit={maxProfit}
              currentMultiplier={currentMultiplier}
              onBetAmountChange={onBetAmountChange}
              onMinesCountChange={onMinesCountChange}
              onStartGame={onStartGame}
              onTakeWinnings={onTakeWinnings}
              onPresetClick={onPresetClick}
              activeBetPreset={activeBetPreset}
            />
          ) : (
            <AutoControls onSwitchToManual={() => onTabChange("manual")} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar 