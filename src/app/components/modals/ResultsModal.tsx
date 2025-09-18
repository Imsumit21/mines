"use client"

import React from "react"
import { motion } from "framer-motion"
import { RefreshCw, Award, Bomb } from "lucide-react"

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
  isWin: boolean
  resultsMessage: string
  onPlayAgain: () => void
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  isWin,
  resultsMessage,
  onPlayAgain
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[200] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className={`bg-gray-800/90 rounded-lg p-5 w-full max-w-md border-2 shadow-xl ${isWin ? "border-[#058c42]" : "border-red-500"}`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex flex-col items-center text-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            {isWin ? (
              <Award className="w-16 h-16 text-yellow-400" />
            ) : (
              <Bomb className="w-16 h-16 text-red-500" />
            )}
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-2 font-[var(--font-bodoni)]">{isWin ? "You Won!" : "Game Over"}</h2>

          <p className="text-gray-300 font-[var(--font-raleway)]">{resultsMessage}</p>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors flex items-center justify-center font-[var(--font-raleway)] cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Play Again
        </button>
      </motion.div>
    </motion.div>
  )
}

export default ResultsModal 