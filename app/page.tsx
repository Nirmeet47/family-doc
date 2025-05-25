'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, ChevronRight } from 'lucide-react'

const familyMembers = [
  { id: 1, name: 'Person1' },
  { id: 2, name: 'Person2' },
  { id: 3, name: 'Person3' },
  { id: 4, name: 'Person4' },
]

export default function Home() {
  return (
    <motion.main 
      className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Family Document Manager
          </h1>
          <p className="mt-4 text-gray-600">
            Securely manage and access your family&#39;s important documents
          </p>
        </div>
        
        <div className="grid gap-6">
          {familyMembers.map((member, index) => (
            <Link href={`/documents/${member.id}`} key={member.id}>
              <motion.div
                className="group p-6 bg-white rounded-xl shadow-lg border border-transparent hover:border-blue-500 cursor-pointer transition-all duration-200"
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors duration-200">
                      <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {member.name}
                      </h2>
                      <p className="text-gray-600 group-hover:text-blue-500 transition-colors duration-200">
                        View documents
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.main>
  )
}