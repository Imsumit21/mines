"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

type CellType = "gem" | "mine" | "empty"
type MinePattern = "random" | "corners" | "cross" | "diamond" | "border" | "center"

interface GameState {
  isPlaying: boolean
  betAmount: number
  minesCount: number
  grid: CellType[]
  revealedCells: number[]
  potentialWinnings: number
  isGameOver: boolean
  isWin: boolean
  autoplayEnabled: boolean
  autoplayRounds: number
  autoplaySelectedCells: number[]
  autoplayRoundsLeft: number
  patternType: MinePattern
  wallet: number
  maxProfit: number
  bettingHistory: {
    betAmount: number
    minesCount: number
    winAmount: number | null
    isWin: boolean
    date: Date
  }[]
}

const DEFAULT_BET_PRESETS = [5, 10, 25, 50, 100]
const TOTAL_CELLS = 25
const HOUSE_EDGE = 0.99

const combination = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0
  const effectiveK = Math.min(k, n - k)
  if (effectiveK === 0) return 1

  let result = 1
  for (let i = 1; i <= effectiveK; i++) {
    result = (result * (n - effectiveK + i)) / i
  }
  return result
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    betAmount: 10,
    minesCount: 5,
    grid: Array(TOTAL_CELLS).fill("empty"),
    revealedCells: [],
    potentialWinnings: 0,
    isGameOver: false,
    isWin: false,
    autoplayEnabled: false,
    autoplayRounds: 1,
    autoplaySelectedCells: [],
    autoplayRoundsLeft: 0,
    patternType: "random",
    wallet: 1000,
    maxProfit: 0,
    bettingHistory: [],
  })

  // Load saved state from localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem("gems_mines_wallet")
    if (savedWallet) {
      setGameState((prev) => ({
        ...prev,
        wallet: JSON.parse(savedWallet),
      }))
    }

    const savedHistory = localStorage.getItem("gems_mines_history")
    if (savedHistory) {
      setGameState((prev) => ({
        ...prev,
        bettingHistory: JSON.parse(savedHistory),
      }))
    }
  }, [])

  // Save wallet to localStorage
  useEffect(() => {
    localStorage.setItem("gems_mines_wallet", JSON.stringify(gameState.wallet))
  }, [gameState.wallet])

  // Save betting history to localStorage
  useEffect(() => {
    localStorage.setItem("gems_mines_history", JSON.stringify(gameState.bettingHistory))
  }, [gameState.bettingHistory])

  const calculateMultiplier = useCallback(
    (revealedSafeCells: number): number => {
      if (revealedSafeCells === 0) return 1

      const safeCells = TOTAL_CELLS - gameState.minesCount
      if (revealedSafeCells > safeCells) return 0

      const numerator = combination(TOTAL_CELLS, revealedSafeCells)
      const denominator = combination(safeCells, revealedSafeCells)

      return (numerator / denominator) * HOUSE_EDGE
    },
    [gameState.minesCount],
  )

  const calculateMaxProfit = useCallback(() => {
    const safeCells = TOTAL_CELLS - gameState.minesCount
    const multiplier = calculateMultiplier(safeCells)

    return Math.floor(gameState.betAmount * multiplier * 100) / 100
  }, [calculateMultiplier, gameState.betAmount, gameState.minesCount])

  const generateGrid = useCallback((): CellType[] => {
    const grid: CellType[] = Array(TOTAL_CELLS).fill("gem")
    let minesPlaced = 0

    switch (gameState.patternType) {
      case "corners":
        const cornerIndices = [0, 4, 20, 24, 1, 3, 5, 9, 15, 19, 21, 23] 
        for (const idx of cornerIndices) {
          if (minesPlaced < gameState.minesCount) {
            grid[idx] = "mine"
            minesPlaced++
          }
        }
        break

      case "cross":
        const crossIndices = [2, 7, 12, 17, 22, 10, 11, 13, 14] 
        for (const idx of crossIndices) {
          if (minesPlaced < gameState.minesCount) {
            grid[idx] = "mine"
            minesPlaced++
          }
        }
        break

      case "diamond":
        const diamondIndices = [2, 6, 8, 12, 16, 18, 22] 
        for (const idx of diamondIndices) {
          if (minesPlaced < gameState.minesCount) {
            grid[idx] = "mine"
            minesPlaced++
          }
        }
        break

      case "border":
        const borderIndices = [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 24]
        for (const idx of borderIndices) {
          if (minesPlaced < gameState.minesCount) {
            grid[idx] = "mine"
            minesPlaced++
          }
        }
        break

      case "center":
        const centerIndices = [6, 7, 8, 11, 12, 13, 16, 17, 18] 
        for (const idx of centerIndices) {
          if (minesPlaced < gameState.minesCount) {
            grid[idx] = "mine"
            minesPlaced++
          }
        }
        break

      case "random":
      default:
        break
    }

    while (minesPlaced < gameState.minesCount) {
      const randomIndex = Math.floor(Math.random() * TOTAL_CELLS)
      if (grid[randomIndex] !== "mine") {
        grid[randomIndex] = "mine"
        minesPlaced++
      }
    }

    return grid
  }, [gameState.minesCount, gameState.patternType])

  const calculateWinnings = useCallback(
    (revealedCount: number): number => {
      if (revealedCount === 0) return gameState.betAmount

      const multiplier = calculateMultiplier(revealedCount)
      const rawWinnings = gameState.betAmount * multiplier

      return Math.floor(rawWinnings * 100) / 100
    },
    [calculateMultiplier, gameState.betAmount],
  )

  const startGame = useCallback(() => {
    if (gameState.wallet < gameState.betAmount || gameState.isPlaying) return

    const maxProfit = calculateMaxProfit()

    setGameState((prev) => ({
      ...prev,
      wallet: prev.wallet - prev.betAmount,
      isPlaying: true,
      grid: generateGrid(),
      revealedCells: [],
      potentialWinnings: prev.betAmount,
      isGameOver: false,
      isWin: false,
      autoplayRoundsLeft: prev.autoplayEnabled ? prev.autoplayRounds : 0,
      maxProfit: maxProfit,
    }))
  }, [
    gameState.wallet,
    gameState.betAmount,
    gameState.isPlaying,
    gameState.autoplayEnabled,
    gameState.autoplayRounds,
    generateGrid,
    calculateMaxProfit,
  ])

  const revealCell = useCallback(
    (index: number) => {
      if (!gameState.isPlaying || gameState.revealedCells.includes(index)) return

      const cellType = gameState.grid[index]
      
      if (cellType === "mine") {
        setGameState((prev) => {
          const newRevealedCells = [...prev.revealedCells, index];
          const newHistory = [...prev.bettingHistory]
          newHistory.unshift({
            betAmount: prev.betAmount,
            minesCount: prev.minesCount,
            winAmount: null,
            isWin: false,
            date: new Date(),
          })

          if (newHistory.length > 50) {
            newHistory.pop()
          }

          return {
            ...prev,
            revealedCells: newRevealedCells,
            isGameOver: true,
            isWin: false,
            isPlaying: false,
            autoplayRoundsLeft: 0,
            bettingHistory: newHistory,
          }
        })
      } else {
        setGameState((prev) => {
          const newRevealedCells = [...prev.revealedCells, index];
          const potentialWinnings = calculateWinnings(newRevealedCells.length);
          
          return {
            ...prev,
            revealedCells: newRevealedCells,
            potentialWinnings,
          }
        })
      }
    },
    [gameState.isPlaying, gameState.revealedCells, gameState.grid, calculateWinnings],
  )

  const takeWinnings = useCallback(() => {
    if (!gameState.isPlaying || gameState.isGameOver) return

    setGameState((prev) => {
      const newHistory = [...prev.bettingHistory]
      newHistory.unshift({
        betAmount: prev.betAmount,
        minesCount: prev.minesCount,
        winAmount: prev.potentialWinnings,
        isWin: true,
        date: new Date(),
      })

      if (newHistory.length > 50) {
        newHistory.pop()
      }

      return {
        ...prev,
        wallet: prev.wallet + prev.potentialWinnings,
        isPlaying: false,
        isGameOver: true,
        isWin: true,
        autoplayRoundsLeft: 0,
        bettingHistory: newHistory,
      }
    })
  }, [gameState.isPlaying, gameState.isGameOver, gameState.potentialWinnings])

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      grid: Array(TOTAL_CELLS).fill("empty"),
      revealedCells: [],
      potentialWinnings: 0,
      isGameOver: false,
      isWin: false,
      autoplayRoundsLeft: 0,
    }))
  }, [])

  const updateBetAmount = useCallback((amount: number) => {
    if (!gameState.isPlaying) {
      const newAmount = Math.max(1, Math.min(amount, gameState.wallet, 10000))
      setGameState((prev) => ({
        ...prev,
        betAmount: newAmount,
      }))
    }
  }, [gameState.isPlaying, gameState.wallet])

  const updateMinesCount = useCallback((count: number) => {
    if (!gameState.isPlaying) {
      const newCount = Math.max(1, Math.min(count, 24))
      setGameState((prev) => ({
        ...prev,
        minesCount: newCount,
      }))
    }
  }, [gameState.isPlaying])

  const toggleAutoplayCell = useCallback(
    (index: number) => {
      if (gameState.isPlaying) return

      setGameState((prev) => {
        const isSelected = prev.autoplaySelectedCells.includes(index)
        let newSelectedCells = [...prev.autoplaySelectedCells]

        if (isSelected) {
          newSelectedCells = newSelectedCells.filter((i) => i !== index)
        } else {
          newSelectedCells.push(index)
        }

        return {
          ...prev,
          autoplaySelectedCells: newSelectedCells,
        }
      })
    },
    [gameState.isPlaying],
  )

  const calculateOdds = useCallback(() => {
    const revealedSafeCells = gameState.revealedCells.reduce((safeCount, index) => {
      return gameState.grid[index] === "mine" ? safeCount : safeCount + 1
    }, 0)

    const revealedMines = gameState.revealedCells.length - revealedSafeCells
    const remainingCells = TOTAL_CELLS - gameState.revealedCells.length
    const remainingMines = Math.max(gameState.minesCount - revealedMines, 0)

    if (remainingCells <= 0 || remainingMines >= remainingCells) return 0

    return (remainingCells - remainingMines) / remainingCells
  }, [gameState.grid, gameState.minesCount, gameState.revealedCells])

  const currentMultiplier = useMemo(() => {
    if (gameState.revealedCells.length === 0) return 1
    return Number.parseFloat((gameState.potentialWinnings / gameState.betAmount).toFixed(2))
  }, [gameState.revealedCells.length, gameState.potentialWinnings, gameState.betAmount])

  const addFunds = useCallback((amount: number) => {
    setGameState((prev) => ({
      ...prev,
      wallet: prev.wallet + amount,
    }))
  }, [])

  return {
    gameState,
    setGameState,
    startGame,
    revealCell,
    takeWinnings,
    resetGame,
    updateBetAmount,
    updateMinesCount,
    toggleAutoplayCell,
    calculateMaxProfit,
    calculateOdds,
    currentMultiplier,
    addFunds,
    calculateWinnings,
    DEFAULT_BET_PRESETS,
  }
} 
