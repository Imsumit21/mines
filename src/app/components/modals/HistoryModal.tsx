"use client"

import React from "react"
import { motion } from "framer-motion"
import { X, History } from "lucide-react"

interface BettingHistory {
  betAmount: number
  minesCount: number
  winAmount: number | null
  isWin: boolean
  date: Date
}

interface HistoryModalProps {
  isOpen: boolean
  onClose: () => void
  bettingHistory: BettingHistory[]
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  bettingHistory
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
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
      <motion.div
        className="bg-gray-800/90 rounded-lg p-4 sm:p-5 w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-hidden border border-gray-700 shadow-xl flex flex-col"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-3 sticky top-0 bg-gray-800/95 pt-1 pb-2 z-20">
          <h2 className="text-lg sm:text-xl font-bold text-white font-[var(--font-bodoni)]">Betting History</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer p-1">
            <X size={20} />
          </button>
        </div>

        {bettingHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-400 flex-1">
            <History className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No betting history yet</p>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1">
            <div className="relative">
              <table className="w-full text-xs sm:text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-700 sticky top-0">
                  <tr>
                    <th scope="col" className="px-3 py-2.5 whitespace-nowrap w-[30%] first:rounded-tl-md">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-2.5 whitespace-nowrap w-[15%]">
                      Bet
                    </th>
                    <th scope="col" className="px-3 py-2.5 whitespace-nowrap w-[10%]">
                      Mines
                    </th>
                    <th scope="col" className="px-3 py-2.5 whitespace-nowrap w-[15%]">
                      Result
                    </th>
                    <th scope="col" className="px-3 py-2.5 whitespace-nowrap w-[20%] last:rounded-tr-md">
                      Profit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {bettingHistory.map((bet, index) => {
                    const profit = bet.isWin && bet.winAmount ? bet.winAmount - bet.betAmount : -bet.betAmount;
                    const date = new Date(bet.date);

                    return (
                      <tr key={index} className="hover:bg-gray-700/50">
                        <td className="px-3 py-2.5 whitespace-nowrap text-xs w-[30%]">
                          {date.toLocaleDateString()}{" "}
                          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap w-[15%]">{bet.betAmount.toFixed(2)} INR</td>
                        <td className="px-3 py-2.5 whitespace-nowrap w-[10%]">{bet.minesCount}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap w-[15%]">
                          <span className={bet.isWin ? "text-green-500" : "text-red-500"}>
                            {bet.isWin ? "Win" : "Loss"}
                          </span>
                        </td>
                        <td className={`px-3 py-2.5 whitespace-nowrap w-[20%] ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {profit >= 0 ? "+" : ""}
                          {profit.toFixed(2)} INR
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HistoryModal 