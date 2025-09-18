"use client"

import React from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import PatternPreview from "../game/PatternPreview"

type MinePattern = "random" | "corners" | "cross" | "diamond" | "border" | "center"

interface PatternInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

const PatternInfoModal: React.FC<PatternInfoModalProps> = ({
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
      className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[100] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="bg-gray-800/90 rounded-lg p-5 w-full max-w-md border border-gray-700 shadow-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white font-[var(--font-bodoni)]">Mine Patterns</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 font-[var(--font-raleway)]">
          {(["random", "corners", "cross", "diamond", "border", "center"] as MinePattern[]).map((pattern) => (
            <div key={pattern} className="flex items-center space-x-4">
              <div className="w-24 h-24 flex items-center justify-center bg-gray-900 rounded-md p-2">
                <PatternPreview pattern={pattern} />
              </div>
              <div>
                <h3 className="text-white font-medium capitalize font-[var(--font-bodoni)]">{pattern}</h3>
                <p className="text-gray-300 text-sm">
                  {pattern === "random" && "Mines are placed randomly across the grid."}
                  {pattern === "corners" && "Mines are concentrated in the corners and edges."}
                  {pattern === "cross" && "Mines form a cross pattern in the center of the grid."}
                  {pattern === "diamond" && "Mines are arranged in a diamond shape."}
                  {pattern === "border" && "Mines are placed around the border of the grid."}
                  {pattern === "center" && "Mines are concentrated in the center area."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PatternInfoModal 