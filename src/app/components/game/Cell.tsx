"use client"

import React, { useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gem, Bomb, Play } from "lucide-react"

type CellType = "gem" | "mine" | "empty"

interface CellProps {
  index: number
  isRevealed: boolean
  cellType: CellType | "unknown"
  isPlaying: boolean
  isAutoplaySelected: boolean
  autoplayEnabled: boolean
  onCellClick: (index: number) => void
  onAutoplayToggle: (index: number) => void
}

const Cell = memo(({ 
  index, 
  isRevealed, 
  cellType, 
  isPlaying, 
  isAutoplaySelected, 
  autoplayEnabled, 
  onCellClick, 
  onAutoplayToggle 
}: CellProps) => {

  const handleClick = useCallback(() => {
    if (isPlaying) {
      onCellClick(index);
    } else if (autoplayEnabled) {
      onAutoplayToggle(index);
    }
  }, [isPlaying, autoplayEnabled, index, onCellClick, onAutoplayToggle]);

  return (
    <motion.div
      layoutId={`cell-${index}`}
      className={`relative w-full aspect-square rounded-md flex items-center justify-center cursor-pointer touch-manipulation
         ${isRevealed
          ? cellType === "mine"
            ? "bg-red-600 border border-red-400 shadow-md"
            : "bg-[#00CC66] border border-[#00CC66]/70 shadow-md"
          : isPlaying
            ? "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 border border-gray-600"
            : isAutoplaySelected
              ? "bg-purple-700 border border-purple-500"
              : "bg-gray-800 hover:bg-gray-700 active:bg-gray-600 border border-gray-700"
        } font-[var(--font-raleway)]`}
      onClick={handleClick}
      whileHover={{ scale: isPlaying ? 1.03 : 1.01 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.15, 
        type: "tween", 
        ease: "easeOut",
        layout: { duration: 0 }
      }}
      layout="position"
    >
      <AnimatePresence mode="wait">
        {isRevealed ? (
          <motion.div
            key={`revealed-${index}-${cellType}`}
            initial={{ scale: 0, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className="flex items-center justify-center w-full h-full"
          >
            {cellType === "mine" ? (
              <Bomb className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
            ) : (
              <Gem className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
            )}
          </motion.div>
        ) : isPlaying ? (
          <motion.span 
            key={`unrevealed-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white text-xs xs:text-sm sm:text-base md:text-lg font-medium flex items-center justify-center w-full h-full"
          >
            ?
          </motion.span>
        ) : isAutoplaySelected ? (
          <motion.div
            key={`autoplay-${index}`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="flex items-center justify-center w-full h-full"
          >
            <Play className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div key={`empty-${index}`} className="w-full h-full" />
        )}
      </AnimatePresence>
    </motion.div>
  )
}, (prevProps, nextProps) => {
  return prevProps.isRevealed === nextProps.isRevealed &&
    prevProps.cellType === nextProps.cellType &&
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.isAutoplaySelected === nextProps.isAutoplaySelected &&
    prevProps.autoplayEnabled === nextProps.autoplayEnabled;
});

export default Cell 