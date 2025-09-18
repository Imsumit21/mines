"use client"

import React from "react"
import { RefreshCw, HelpCircle } from "lucide-react"
import { GameGrid, GameStats } from "../game"

interface GameAreaProps {
  grid: any[]
  revealedCells: number[]
  isPlaying: boolean
  autoplayEnabled: boolean
  autoplaySelectedCells: number[]
  onCellClick: (index: number) => void
  onAutoplayToggle: (index: number) => void
  onResetGame: () => void
  onShowRules: () => void
  revealedCellsCount: number
  minesCount: number
  currentMultiplier: number
  gemChance: number
}

const GameArea: React.FC<GameAreaProps> = ({
  grid,
  revealedCells,
  isPlaying,
  autoplayEnabled,
  autoplaySelectedCells,
  onCellClick,
  onAutoplayToggle,
  onResetGame,
  onShowRules,
  revealedCellsCount,
  minesCount,
  currentMultiplier,
  gemChance
}) => {
  return (
    <div className="md:col-span-2 lg:col-span-3 flex items-center justify-center order-1 md:order-2 md:h-full">
      <div className="bg-gray-800 rounded-lg p-1 sm:p-2 shadow-lg md:h-full w-full flex flex-col">
        <GameStats
          revealedCells={revealedCellsCount}
          minesCount={minesCount}
          currentMultiplier={currentMultiplier}
          gemChance={gemChance}
        />

        <div className="flex-1 flex items-center justify-center pb-1 my-2 md:my-0">
          <GameGrid
            grid={grid}
            revealedCells={revealedCells}
            isPlaying={isPlaying}
            autoplayEnabled={autoplayEnabled}
            autoplaySelectedCells={autoplaySelectedCells}
            onCellClick={onCellClick}
            onAutoplayToggle={onAutoplayToggle}
          />
        </div>

        <div className="flex items-center justify-between mt-1 sm:mt-2">
          <button
            onClick={onResetGame}
            disabled={!isPlaying}
            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium rounded-md transition-colors flex items-center justify-center text-xs sm:text-sm font-[var(--font-raleway)] cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Reset
          </button>

          <button
            onClick={onShowRules}
            className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition-colors flex items-center justify-center text-xs sm:text-sm font-[var(--font-raleway)] cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            How to Play
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameArea 