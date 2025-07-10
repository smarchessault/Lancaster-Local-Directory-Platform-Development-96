import React from 'react'
import { motion } from 'framer-motion'
import AdCard from './AdCard'
import LoadingSpinner from '../common/LoadingSpinner'

const AdGrid = ({ ads, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading ads: {error}</p>
      </div>
    )
  }

  if (!ads || ads.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No active ads found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad, index) => (
        <motion.div
          key={ad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <AdCard ad={ad} />
        </motion.div>
      ))}
    </div>
  )
}

export default AdGrid