"use client"

import React from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface RulesModalProps {
  isOpen: boolean
  onClose: () => void
}

const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[200] px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="bg-gray-800/90 rounded-lg p-4 sm:p-5 w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto border border-gray-700 shadow-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="sticky top-2 right-2 z-10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-800/95 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition"
            aria-label="Close rules panel"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 text-gray-300 font-[var(--font-raleway)]">
          <h2 className="text-lg sm:text-xl font-bold text-white font-[var(--font-bodoni)]">How to Play</h2>
          <h3 className="text-base sm:text-lg font-semibold text-white font-[var(--font-bodoni)]">Gems & Mines</h3>

          <div>
            <h4 className="font-medium text-white mb-2 font-[var(--font-bodoni)]">Rules:</h4>
            <ul className="list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base font-[var(--font-raleway)]">
              <li>Select bet amount. The minimum stake is 1 INR, the maximum stake is 10,000 INR.</li>
              <li>
                Choose the number of mines (from 1 to 24). The more mines you select, the higher the odds for each gem
                you find.
              </li>
              <li>Press the "Start game" button.</li>
              <li>
                The game screen consists of 25 cells containing gems and mines. Open the cells by clicking on them.
              </li>
              <li>The odds depend on the number of mines and the number of gems left on the screen.</li>
              <li>For each gem you find, the odds of your potential winnings will increase.</li>
              <li>You can finish the round at any point and take your winnings by pressing the "Cash Out" button.</li>
              <li>
                If you open a cell with a mine, the game ends. The winnings you have earned and your stake will be
                lost.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RulesModal 