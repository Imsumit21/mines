"use client"

import React from "react"
import { motion } from "framer-motion"
import Cell from "./Cell"

type CellType = "gem" | "mine" | "empty"

interface GameGridProps {
  grid: CellType[]
  revealedCells: number[]
  isPlaying: boolean
  autoplayEnabled: boolean
  autoplaySelectedCells: number[]
  onCellClick: (index: number) => void
  onAutoplayToggle: (index: number) => void
}

const GameGrid: React.FC<GameGridProps> = ({
  grid,
  revealedCells,
  isPlaying,
  autoplayEnabled,
  autoplaySelectedCells,
  onCellClick,
  onAutoplayToggle
}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-[min(95vw,60vh)] md:max-w-[min(60vh,600px)] aspect-square mx-auto px-1">
        <motion.div 
          className="overflow-hidden rounded-md bg-gray-900/30 p-1 sm:p-2 w-full h-full"
          layout="preserve-aspect"
          layoutRoot
          transition={{ duration: 0 }}
        >
          <div className="grid grid-cols-5 gap-[2px] sm:gap-1 md:gap-1.5 aspect-square w-full h-full">
            {Array(25)
              .fill(null)
              .map((_, index) => {
                const isRevealed = revealedCells.includes(index);
                const cellType = isRevealed ? grid[index] : "unknown";
                const isAutoplaySelected = autoplayEnabled && !isPlaying && autoplaySelectedCells.includes(index);
                
                return (
                  <Cell 
                    key={`cell-${index}-${isRevealed ? 'revealed' : 'hidden'}-${cellType}`}
                    index={index}
                    isRevealed={isRevealed}
                    cellType={cellType}
                    isPlaying={isPlaying}
                    isAutoplaySelected={isAutoplaySelected}
                    autoplayEnabled={autoplayEnabled}
                    onCellClick={onCellClick}
                    onAutoplayToggle={onAutoplayToggle}
                  />
                );
              })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GameGrid 