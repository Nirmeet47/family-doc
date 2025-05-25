'use client'

import { FileText, CreditCard, Car, GraduationCap, Banknote, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { DocumentCard } from '@/components/DocumentCard'
// import { PreviewModal } from '@/components/PreviewModal'

const personDocuments = {
  '1': [
    { id: 1, name: 'Aadhar Card', file: '/docs/person1/aadhar.pdf', icon: CreditCard, color: 'bg-blue-500' },
    { id: 2, name: 'Driving License', file: '/docs/person1/driving-license.pdf', icon: Car, color: 'bg-green-500' },
    { id: 3, name: 'PAN Card', file: '/docs/person1/pan.pdf', icon: CreditCard, color: 'bg-purple-500' },
    { id: 4, name: 'College ID', file: '/docs/person1/college-id.pdf', icon: GraduationCap, color: 'bg-orange-500' },
    { id: 5, name: 'SBI Bank Details', file: '/docs/person1/bank-details.pdf', icon: Banknote, color: 'bg-red-500' },
    { id: 6, name: 'College Results', file: '/docs/person1/results.pdf', icon: Award, color: 'bg-yellow-500' },
  ],
  '2': [
    { id: 1, name: 'Aadhar Card', file: '/docs/person2/aadhar.pdf', icon: CreditCard, color: 'bg-blue-500' },
    { id: 2, name: 'Driving License', file: '/docs/person2/driving-license.pdf', icon: Car, color: 'bg-green-500' },
    { id: 3, name: 'PAN Card', file: '/docs/person2/pan.pdf', icon: CreditCard, color: 'bg-purple-500' },
    { id: 4, name: 'College ID', file: '/docs/person2/college-id.pdf', icon: GraduationCap, color: 'bg-orange-500' },
    { id: 5, name: 'SBI Bank Details', file: '/docs/person2/bank-details.pdf', icon: Banknote, color: 'bg-red-500' },
    { id: 6, name: 'College Results', file: '/docs/person2/results.pdf', icon: Award, color: 'bg-yellow-500' },
  ],
  '3': [
    { id: 1, name: 'Aadhar Card', file: '/docs/person3/aadhar.pdf', icon: CreditCard, color: 'bg-blue-500' },
    { id: 2, name: 'Driving License', file: '/docs/person3/driving-license.pdf', icon: Car, color: 'bg-green-500' },
    { id: 3, name: 'PAN Card', file: '/docs/person3/pan.pdf', icon: CreditCard, color: 'bg-purple-500' },
    { id: 4, name: 'College ID', file: '/docs/person3/college-id.pdf', icon: GraduationCap, color: 'bg-orange-500' },
    { id: 5, name: 'SBI Bank Details', file: '/docs/person3/bank-details.pdf', icon: Banknote, color: 'bg-red-500' },
    { id: 6, name: 'College Results', file: '/docs/person3/results.pdf', icon: Award, color: 'bg-yellow-500' },
  ],
  '4': [
    { id: 1, name: 'Aadhar Card', file: '/docs/person4/aadhar.pdf', icon: CreditCard, color: 'bg-blue-500' },
    { id: 2, name: 'Driving License', file: '/docs/person4/driving-license.pdf', icon: Car, color: 'bg-green-500' },
    { id: 3, name: 'PAN Card', file: '/docs/person4/pan.pdf', icon: CreditCard, color: 'bg-purple-500' },
    { id: 4, name: 'College ID', file: '/docs/person4/college-id.pdf', icon: GraduationCap, color: 'bg-orange-500' },
    { id: 5, name: 'SBI Bank Details', file: '/docs/person4/bank-details.pdf', icon: Banknote, color: 'bg-red-500' },
    { id: 6, name: 'College Results', file: '/docs/person4/results.pdf', icon: Award, color: 'bg-yellow-500' },
  ],
}

const personNames = {
  '1': 'Person 1',
  '2': 'Person 2',
  '3': 'Person 3',
  '4': 'Person 4',
}

// Mock useParams hook for demo
const useParams = () => ({ id: '1' })

export default function DocumentsPage() {
  const params = useParams()
  const personId = params.id as string

  if (!personId || !personDocuments[personId as keyof typeof personDocuments]) {
    return (
      <motion.div 
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center bg-white/90 px-8 py-8 rounded-xl shadow-lg border border-red-200">
          <h1 className="text-3xl font-bold text-red-600 mb-3">Invalid Person ID</h1>
          <p className="text-gray-600">Please select a valid person.</p>
        </div>
      </motion.div>
    )
  }

  const documents = personDocuments[personId as keyof typeof personDocuments]
  const personName = personNames[personId as keyof typeof personNames]

  const handleDownload = async (file: string) => {
    try {
      const response = await fetch(file)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = file.split('/').pop() || 'document.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download:', error)
      alert('Failed to download document')
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <motion.div 
        className="bg-white/95 shadow-sm border-b"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.07 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Document Portal
            </h1>
            <p className="text-xl text-gray-600">
              Documents for <span className="font-semibold text-blue-600">{personName}</span>
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">
                {documents.length} documents available
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              {...doc}
              onDownload={handleDownload}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}