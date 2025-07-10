import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useAds } from '../hooks/useAds'
import PostcardGrid from '../components/ads/PostcardGrid'
import AdCreationForm from '../components/ads/AdCreationForm'

const CreateAd = () => {
  const { user } = useAuth()
  const { ads, createAd } = useAds(user?.id)
  const navigate = useNavigate()
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading, setLoading] = useState(false)

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
  }

  const handleAdSubmit = async (adData) => {
    setLoading(true)
    try {
      const { error } = await createAd(adData)
      if (error) {
        alert('Error creating ad: ' + error)
      } else {
        alert('Ad created successfully!')
        navigate('/dashboard')
      }
    } catch (err) {
      alert('Error creating ad: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Ad</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a compelling ad for your business that will appear on our postcard mailer 
            and in our digital directory. Choose your position and customize your message.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Step 1: Position Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PostcardGrid
              onSlotSelect={handleSlotSelect}
              selectedSlot={selectedSlot}
              userAds={ads}
            />
          </motion.div>

          {/* Step 2: Ad Creation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AdCreationForm
              onSubmit={handleAdSubmit}
              loading={loading}
              selectedSlot={selectedSlot}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CreateAd