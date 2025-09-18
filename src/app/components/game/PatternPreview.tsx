"use client"

import React from "react"

type MinePattern = "random" | "corners" | "cross" | "diamond" | "border" | "center"

interface PatternPreviewProps {
  pattern: MinePattern
}

const PatternPreview: React.FC<PatternPreviewProps> = ({ pattern }) => {
  const patternLayouts: Record<MinePattern, number[]> = {
    random: [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    corners: [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    cross: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    diamond: [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    border: [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    center: [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  }

  const layout = patternLayouts[pattern]

  return (
    <div className="grid grid-cols-5 gap-0.5">
      {layout.map((cell, idx) => (
        <div key={idx} className={`w-2 h-2 rounded-sm ${cell ? "bg-red-500" : "bg-[#058c42]"}`} />
      ))}
    </div>
  )
}

export default PatternPreview 