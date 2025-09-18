"use client"

import React from "react"
import { motion } from "framer-motion"
import { Play, HelpCircle, Gem } from "lucide-react"

interface HomeModalProps {
  isOpen: boolean
  onClose: () => void
  onStartPlaying: () => void
  onShowRules: () => void
  isLoading: boolean
}

const HomeModal: React.FC<HomeModalProps> = ({
  isOpen,
  onClose,
  onStartPlaying,
  onShowRules,
  isLoading
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Do nothing for home modal backdrop click
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[150] px-2 sm:px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-gray-900/95"></div>
      <motion.div
        className="bg-gray-800/90 rounded-lg p-4 sm:p-6 w-full max-w-2xl border border-gray-700 shadow-xl relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <Gem className="text-[#00CC66] w-12 h-12 sm:w-16 sm:h-16" />
            </motion.div>
            <motion.h1
              className="text-3xl sm:text-4xl font-bold ml-2 font-[var(--font-bodoni)]"
              initial={{ y: -5 }}
              animate={{ y: 5 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              Gems & Mines
            </motion.h1>
          </div>

          <p className="text-gray-300 text-base sm:text-lg mb-5 sm:mb-6 font-[var(--font-raleway)]">
            A thrilling game of risk and reward. Uncover gems to win, but beware of hidden mines!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-[#1c3e94]/40 p-3 sm:p-4 rounded-lg border border-[#1c3e94]">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white font-[var(--font-bodoni)]">Massive Rewards</h3>
              <p className="text-gray-300 text-sm sm:text-base font-[var(--font-raleway)]">Reveal gems strategically to maximize your potential winnings.</p>
            </div>

            <div className="bg-emerald-900/40 p-3 sm:p-4 rounded-lg border border-[#00CC66]">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white font-[var(--font-bodoni)]">Multiple Patterns</h3>
              <p className="text-gray-300 text-sm sm:text-base font-[var(--font-raleway)]">Choose from various mine patterns for different gameplay challenges.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
            <motion.button
              onClick={onStartPlaying}
              className="py-2 sm:py-3 px-6 sm:px-8 bg-[#1c3e94] hover:bg-[#1c3e94]/80 text-white font-medium rounded-md transition-colors flex items-center justify-center text-base sm:text-lg font-[var(--font-raleway)] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Start Playing
            </motion.button>

            <motion.button
              onClick={onShowRules}
              className="py-2 sm:py-3 px-6 sm:px-8 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition-colors flex items-center justify-center text-base sm:text-lg font-[var(--font-raleway)] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              How to Play
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeModal 