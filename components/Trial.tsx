// {/* <div className="relative h-72 cursor-pointer perspective" onClick={() => setIsFlipped(!isFlipped)}>
//   <div className="relative w-full h-full transition-transform duration-700 ease-in-out" style={{
//     transformStyle: 'preserve-3d',
//     transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
//   }}>
//     {/* Front */}
//     <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg">
//       <div className="p-6 h-full flex flex-col">
//               <motion.div 
//                 className={`${color} rounded-lg p-4 mb-4 flex items-center justify-center`}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <IconComponent className="w-8 h-8 text-white" />
//               </motion.div>
              
//               <h3 className="text-xl font-semibold text-gray-900 mb-2 flex-grow">
//                 {name}
//               </h3>
              
//               <div className="flex items-center justify-between">
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                   Available
//                 </span>
//                 <div className="text-xs text-gray-500">
//                   PDF Document
//                 </div>
//               </div>
              
//               <motion.div 
//                 className="mt-4 text-center"
//                 animate={{ opacity: isHovered ? 1 : 0.7 }}
//               >
//                 <p className="text-sm text-gray-500">
//                   Click to view options
//                 </p>
//                 <motion.div 
//                   className="mt-2 h-1 bg-gray-200 rounded-full"
//                   animate={{ 
//                     backgroundColor: isHovered ? 'rgb(96, 165, 250)' : 'rgb(229, 231, 235)',
//                     width: isHovered ? '100%' : '80%'
//                   }}
//                   transition={{ duration: 0.2 }}
//                 />
//               </motion.div>
//             </div>
//     </div>

//     {/* Back */}
//     <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg transform rotate-y-180">
//       <div className="p-6 h-full flex flex-col justify-center space-y-4">
//               <div className="text-center mb-6">
//                 <IconComponent className={`w-12 h-12 mx-auto text-gray-600 mb-3`} />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                   {name}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Choose an action below
//                 </p>
//               </div>
              
//               <motion.button
//                 onClick={handlePreview}
//                 className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
//                 disabled={isLoading}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 {isLoading ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <Eye className="w-4 h-4" />
//                 )}
//                 <span>Preview</span>
//               </motion.button>
              
//               <motion.button
//                 onClick={handleDownload}
//                 className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium disabled:opacity-50"
//                 disabled={isLoading}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 {isLoading ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <Download className="w-4 h-4" />
//                 )}
//                 <span>Download</span>
//               </motion.button>
              
//               <motion.button
//                 onClick={() => setIsFlipped(false)}
//                 className="text-gray-500 hover:text-gray-700 text-sm py-2 transition-colors duration-200"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 ← Back to overview
//               </motion.button>
//             </div>
//     </div>
//   </div>
// </div> */}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  file: string
}

export function PreviewModal({ isOpen, onClose, file }: PreviewModalProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Reset loading state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      setError(null)
    }
  }, [isOpen])

  // Handle file loading errors
  const handleError = () => {
    setLoading(false)
    setError('Failed to load the document. Please try again or download the file.')
  }

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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {loading && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!error && (
              <iframe
                src={`${file}#toolbar=0`}
                className="w-full h-full"
                onLoad={() => setLoading(false)}
                onError={handleError}
              />
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-red-500">
                  <p className="font-semibold">Failed to load document</p>
                  <p className="text-sm mt-1">{error}</p>
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-4 block"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}