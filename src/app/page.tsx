"use client"

import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"

import { useGameState, useModalState, useUIState, useAutoplay } from "./hooks"

// Import extracted components
import { GameGrid, GameStats } from "./components/game"
import {
  AddFundsModal,
  ResultsModal,
  RulesModal,
  PatternInfoModal,
  HistoryModal,
  HomeModal,
  LoadingScreen
} from "./components/modals"
import {
  Header,
  Sidebar,
  Footer,
  MobileNavigation,
  GameArea
} from "./components/layout"


import { Bodoni_Moda, Raleway } from 'next/font/google'

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
})






export default function GemsAndMines(): React.JSX.Element {
  // Use custom hooks for state management
  const {
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
  } = useGameState()

  const {
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
  } = useModalState()

  const {
    activeBetPreset,
    setActiveBetPreset,
    activeTab,
    setActiveTab,
    isFullscreen,
    setIsFullscreen,
    showPatternDropdown,
    setShowPatternDropdown,
    toggleFullscreen,
  } = useUIState()

  // Initialize autoplay hook
  useAutoplay({
    gameState,
    calculateWinnings,
    startGame,
    setGameState,
    setShowResults,
    setResultsMessage
  })

  // Handle add funds
  const handleAddFunds = () => {
    const numericAmount = parseInt(addAmount);
    if (numericAmount > 0) {
      addFunds(numericAmount);
      setShowAddFundsModal(false)
    }
  }

  // Handle bet preset selection
  const setBetFromPreset = (presetIndex: number) => {
    if (!gameState.isPlaying) {
      const presetAmount = DEFAULT_BET_PRESETS[presetIndex]
      setActiveBetPreset(presetIndex)
      updateBetAmount(presetAmount)
    }
  }

  // Handle bet amount modification
  const modifyBetAmount = (multiplier: number) => {
    if (!gameState.isPlaying) {
      updateBetAmount(gameState.betAmount * multiplier)
      setActiveBetPreset(null)
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className={`min-h-screen min-h-[100dvh] bg-gray-900 text-white flex flex-col ${bodoni.variable} ${raleway.variable} overflow-y-auto`}>
        {!showHome && (
          <div className="w-full flex flex-col px-2 pb-16 md:pb-0 min-h-screen min-h-[100dvh]"> 
            <Header
              wallet={gameState.wallet}
              onAddFunds={() => setShowAddFundsModal(true)}
              onShowHome={() => setShowHome(true)}
              onShowHistory={() => setShowHistory(true)}
              onToggleFullscreen={toggleFullscreen}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2 flex-1 md:h-[calc(100vh-45px)] md:min-h-[calc(100dvh-45px)]">
              <Sidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                betAmount={gameState.betAmount}
                minesCount={gameState.minesCount}
                isPlaying={gameState.isPlaying}
                isGameOver={gameState.isGameOver}
                wallet={gameState.wallet}
                potentialWinnings={gameState.potentialWinnings}
                maxProfit={calculateMaxProfit()}
                currentMultiplier={currentMultiplier}
                onBetAmountChange={updateBetAmount}
                onMinesCountChange={updateMinesCount}
                onStartGame={startGame}
                onTakeWinnings={takeWinnings}
                onPresetClick={setBetFromPreset}
                activeBetPreset={activeBetPreset}
              />
                              <GameArea
                  grid={gameState.grid}
                  revealedCells={gameState.revealedCells}
                                    isPlaying={gameState.isPlaying}
                                    autoplayEnabled={gameState.autoplayEnabled}
                  autoplaySelectedCells={gameState.autoplaySelectedCells}
                                    onCellClick={revealCell}
                                    onAutoplayToggle={toggleAutoplayCell}
                  onResetGame={resetGame}
                  onShowRules={() => setShowRules(true)}
                  revealedCellsCount={gameState.revealedCells.length}
                  minesCount={gameState.minesCount}
                  currentMultiplier={currentMultiplier}
                  gemChance={calculateOdds()}
                />
            </div>
          </div>
        )}

        {!showHome && (
          <MobileNavigation
            onShowHome={() => setShowHome(true)}
            onShowHistory={() => setShowHistory(true)}
          />
        )}

        <Footer isFullscreen={isFullscreen} />

        <AnimatePresence mode="wait">
          <AddFundsModal 
            key="add-funds-modal"
            isOpen={showAddFundsModal}
            onClose={() => setShowAddFundsModal(false)}
            onAddFunds={addFunds}
            addAmount={addAmount}
            setAddAmount={setAddAmount}
          />
          <ResultsModal 
            key="results-modal"
            isOpen={showResults}
            onClose={() => {
              setShowResults(false);
              resetGame();
            }}
            isWin={gameState.isWin}
            resultsMessage={resultsMessage}
            onPlayAgain={() => {
              setShowResults(false);
              resetGame();
              setTimeout(() => {
                startGame();
              }, 50);
            }}
          />
          <RulesModal 
            key="rules-modal"
            isOpen={showRules}
            onClose={() => setShowRules(false)}
          />
          <PatternInfoModal 
            key="pattern-info-modal"
            isOpen={showPatternInfo}
            onClose={() => setShowPatternInfo(false)}
          />
          <HistoryModal 
            key="history-modal"
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
            bettingHistory={gameState.bettingHistory}
          />
          <HomeModal 
            key="home-modal"
            isOpen={showHome}
            onClose={() => setShowHome(false)}
            onStartPlaying={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setShowHome(false);
              }, 1500);
            }}
            onShowRules={() => setShowRules(true)}
            isLoading={isLoading}
          />
          <LoadingScreen 
            key="loading-screen"
            isOpen={isLoading}
          />
        </AnimatePresence>
      </div>
    </>
  )
}

