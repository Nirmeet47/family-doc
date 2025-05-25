'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  file: string
}

export function PreviewModal({ isOpen, onClose, file }: PreviewModalProps) {
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Loading Spinner */}
            {loading && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* PDF Preview */}
            {!error && (
              <object
                data={file}
                type="application/pdf"
                className="w-full h-full"
                onLoad={() => setLoading(false)}
              >
                <div className="flex items-center justify-center h-full">
                  <p className="text-center text-gray-600 p-4">
                    Unable to preview PDF.
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline ml-2"
                    >
                      Open in new tab
                    </a>
                  </p>
                </div>
              </object>
            )}

            {/* Error fallback */}
            {error && (
              <div className="relative inset-0 flex items-center justify-center">
                <div className="text-center text-red-500">
                  <p className="font-semibold">Failed to load document</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
