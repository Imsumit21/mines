"use client"

import { useState, useEffect } from "react"

export const useUIState = () => {
  const [activeBetPreset, setActiveBetPreset] = useState<number | null>(1) 
  const [activeTab, setActiveTab] = useState<"manual" | "auto">("manual")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPatternDropdown, setShowPatternDropdown] = useState(false)

  // Handle pattern dropdown click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showPatternDropdown) {
        setShowPatternDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPatternDropdown]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return {
    activeBetPreset,
    setActiveBetPreset,
    activeTab,
    setActiveTab,
    isFullscreen,
    setIsFullscreen,
    showPatternDropdown,
    setShowPatternDropdown,
    toggleFullscreen,
  }
} 