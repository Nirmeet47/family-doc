'use client'

import { useState } from 'react'
import { Eye, Download, LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface DocumentCardProps {
  name: string
  file: string
  icon: LucideIcon
  color: string
  onDownload: (file: string) => void
}

export function DocumentCard({
  name,
  file,
  icon: IconComponent,
  color,
  onDownload,
}: DocumentCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePreview = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(file, '_blank')
  }

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)
    try {
      await onDownload(file)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="relative h-72 cursor-pointer perspective" 
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white/90 rounded-2xl shadow-xl border border-gray-100">
            <div className="p-7 h-full flex flex-col">
              <motion.div 
                className={`${color} rounded-lg p-4 mb-4 flex items-center justify-center shadow-sm`}
                whileHover={{ scale: 1.08 }}
              >
                <IconComponent className="w-9 h-9 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 flex-grow">
                {name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Available
                </span>
                <div className="text-xs text-gray-500">
                  PDF Document
                </div>
              </div>
              
              <motion.div 
                className="mt-4 text-center"
                animate={{ opacity: isHovered ? 1 : 0.7 }}
              >
                <p className="text-[13px] text-gray-400">
                  Click to view options
                </p>
                <motion.div 
                  className="mt-2 h-1 bg-blue-100 rounded-full"
                  animate={{ 
                    backgroundColor: isHovered ? 'rgb(59, 130, 246)' : 'rgb(191, 219, 254)',
                    width: isHovered ? '100%' : '80%'
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </div>
          </div>

          {/* Back */}
          <div className="relative w-full h-full backface-hidden bg-white/90 rounded-2xl shadow-xl border border-gray-100 transform rotate-y-180">
            <div className="p-7 h-full flex flex-col justify-center space-y-5">
              <div className="text-center mb-6">
                <IconComponent className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {name}
                </h3>
                <p className="text-[13px] text-gray-400">
                  Choose an action below
                </p>
              </div>
              
              <motion.button
                onClick={handlePreview}
                className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg shadow transition-base font-medium disabled:opacity-50"
                disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span>Preview</span>
              </motion.button>
              
              <motion.button
                onClick={handleDownload}
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg shadow transition-base font-medium disabled:opacity-50"
                disabled={isLoading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>Download</span>
              </motion.button>
              
              <motion.button
                onClick={() => setIsFlipped(false)}
                className="text-gray-400 hover:text-blue-500 text-sm py-2 transition-base"
                whileHover={{ scale: 1.02 }}
              >
                ← Back to overview
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}