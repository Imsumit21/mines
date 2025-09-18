"use client"

import React from "react"
import { motion } from "framer-motion"
import { Gem } from "lucide-react"

interface LoadingScreenProps {
  isOpen: boolean
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isOpen }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[200] bg-gray-900/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="flex flex-col items-center px-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <motion.div
          className="flex items-center justify-center mb-4 sm:mb-6"
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative">
            <Gem className="text-[#00CC66] w-12 h-12 sm:w-16 sm:h-16 absolute" style={{ filter: "blur(8px)", opacity: 0.6 }} />
            <Gem className="text-[#00CC66] w-12 h-12 sm:w-16 sm:h-16 relative" />
          </div>
        </motion.div>

        <div className="flex space-x-2 mb-3 sm:mb-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-indigo-600"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.p
          className="text-indigo-300 text-sm sm:text-base font-medium font-[var(--font-raleway)]"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading Game...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen 