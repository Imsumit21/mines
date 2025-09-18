"use client"

import { useState, useEffect } from "react"

export const useModalState = () => {
  const [showResults, setShowResults] = useState(false)
  const [resultsMessage, setResultsMessage] = useState("")
  const [showRules, setShowRules] = useState(false)
  const [showPatternInfo, setShowPatternInfo] = useState(false)
  const [showAddFundsModal, setShowAddFundsModal] = useState(false)
  const [addAmount, setAddAmount] = useState<string>("100")
  const [showHistory, setShowHistory] = useState(false)
  const [showHome, setShowHome] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Handle body overflow when modals are open
  useEffect(() => {
    const isAnyModalOpen = showAddFundsModal || showResults || showRules ||
      showPatternInfo || showHistory || showHome;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showAddFundsModal, showResults, showRules, showPatternInfo, showHistory, showHome]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoading]);

  return {
    showResults,
    setShowResults,
    resultsMessage,
    setResultsMessage,
    showRules,
    setShowRules,
    showPatternInfo,
    setShowPatternInfo,
    showAddFundsModal,
    setShowAddFundsModal,
    addAmount,
    setAddAmount,
    showHistory,
    setShowHistory,
    showHome,
    setShowHome,
    isLoading,
    setIsLoading,
  }
} 