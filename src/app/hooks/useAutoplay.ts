"use client"

import { useEffect } from "react"

interface UseAutoplayProps {
  gameState: any
  calculateWinnings: (revealedCount: number) => number
  startGame: () => void
  setGameState: (updater: (prev: any) => any) => void
  setShowResults: (show: boolean) => void
  setResultsMessage: (message: string) => void
}

export const useAutoplay = ({
  gameState,
  calculateWinnings,
  startGame,
  setGameState,
  setShowResults,
  setResultsMessage
}: UseAutoplayProps) => {
  useEffect(() => {
    if (gameState.isPlaying && gameState.autoplayEnabled && gameState.autoplayRoundsLeft > 0) {
      const timer = setTimeout(() => {
        let currentGameState = { ...gameState }
        let hitMine = false

        for (const cellIndex of gameState.autoplaySelectedCells) {
          if (currentGameState.revealedCells.includes(cellIndex)) continue

          const cellType = currentGameState.grid[cellIndex]
          const newRevealedCells = [...currentGameState.revealedCells, cellIndex]

          if (cellType === "mine") {
            hitMine = true
            currentGameState = {
              ...currentGameState,
              revealedCells: newRevealedCells,
              isGameOver: true,
              isWin: false,
              isPlaying: false,
              autoplayRoundsLeft: 0,
            }
            break
          } else {
            const potentialWinnings = calculateWinnings(newRevealedCells.length)
            currentGameState = {
              ...currentGameState,
              revealedCells: newRevealedCells,
              potentialWinnings,
            }
          }
        }

        if (hitMine) {
          setGameState((prev: any) => {
            const newHistory = [...prev.bettingHistory]
            newHistory.unshift({
              betAmount: prev.betAmount,
              minesCount: prev.minesCount,
              winAmount: null,
              isWin: false,
              date: new Date(),
            })

            if (newHistory.length > 50) newHistory.pop()

            return {
              ...currentGameState,
              bettingHistory: newHistory,
            }
          })

          setShowResults(true)
          setResultsMessage("Autoplay hit a mine! Better luck next time.")
        } else {
          setGameState((prev: any) => {
            const newHistory = [...prev.bettingHistory]
            newHistory.unshift({
              betAmount: prev.betAmount,
              minesCount: prev.minesCount,
              winAmount: currentGameState.potentialWinnings,
              isWin: true,
              date: new Date(),
            })

            if (newHistory.length > 50) newHistory.pop()

            return {
              ...prev,
              wallet: prev.wallet + currentGameState.potentialWinnings,
              isPlaying: false,
              autoplayRoundsLeft: currentGameState.autoplayRoundsLeft - 1,
              bettingHistory: newHistory,
            }
          })

          const newRoundsLeft = currentGameState.autoplayRoundsLeft - 1

          if (newRoundsLeft > 0) {
            setTimeout(() => startGame(), 1000)
          } else {
            setGameState((prev: any) => ({
              ...prev,
              isPlaying: false,
              isGameOver: true,
              isWin: true,
              autoplayRoundsLeft: 0,
            }))
            setShowResults(true)
            setResultsMessage(`Autoplay complete! You won ${currentGameState.potentialWinnings.toFixed(2)} INR!`)
          }
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [gameState, calculateWinnings, startGame, setGameState, setShowResults, setResultsMessage])
} 