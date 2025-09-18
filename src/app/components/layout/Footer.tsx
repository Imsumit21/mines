"use client"

import React from "react"

interface FooterProps {
  isFullscreen: boolean
}

const Footer: React.FC<FooterProps> = ({ isFullscreen }) => {
  if (isFullscreen) return null;

  return (
    <footer className="hidden md:block border-t border-gray-800 py-2 bg-gray-900 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-xs text-gray-400 text-center leading-tight">
            © 2023 Gems & Mines. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 