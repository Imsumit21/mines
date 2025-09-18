"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { X, Plus, Minus } from "lucide-react"

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
  onAddFunds: (amount: number) => void
  addAmount: string
  setAddAmount: (amount: string) => void
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  onClose,
  onAddFunds,
  addAmount,
  setAddAmount
}) => {
  const [localAmount, setLocalAmount] = useState(addAmount);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setLocalAmount(addAmount);
  }, [addAmount]);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '' || /^\d+$/.test(value)) {
      setLocalAmount(value);
    }
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleIncrement = () => {
    const currentValue = parseInt(localAmount);
    setLocalAmount((isNaN(currentValue) ? 0 : currentValue + 100).toString());
    inputRef.current?.focus();
  };

  const handleDecrement = () => {
    const currentValue = parseInt(localAmount);
    setLocalAmount((isNaN(currentValue) || currentValue <= 100 ? 0 : currentValue - 100).toString());
    inputRef.current?.focus();
  };

  const handleAddFundsWithValidation = () => {
    const numericAmount = parseInt(localAmount);
    if (isNaN(numericAmount) || numericAmount < 100) {
      setLocalAmount("100");
      inputRef.current?.focus();
      return;
    }
    
    setAddAmount(localAmount);
    onAddFunds(numericAmount);
    onClose();
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
        layout="position"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white font-[var(--font-bodoni)]">Add Funds</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1 font-[var(--font-raleway)]">
              Amount (INR)
            </label>
            <div className="flex items-center overflow-hidden rounded-md ring-1 ring-gray-600 focus-within:ring-green-500 transition">
              <button
                onClick={handleDecrement}
                className="h-10 px-3 bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
                aria-label="Decrease amount"
                type="button"
              >
                <Minus size={14} />
              </button>
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={localAmount}
                onChange={handleAmountChange}
                className="flex-1 h-10 px-2 bg-gray-700 text-center text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none touch-manipulation"
                autoFocus
              />
              <button
                onClick={handleIncrement}
                className="h-10 px-3 bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
                aria-label="Increase amount"
                type="button"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddFundsWithValidation}
            className="w-full py-2 px-4 bg-[#058c42] hover:bg-[#058c42]/80 text-white font-medium rounded-md transition-colors flex items-center justify-center font-[var(--font-raleway)] cursor-pointer"
          >
            Add Funds
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AddFundsModal 