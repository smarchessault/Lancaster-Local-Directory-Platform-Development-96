import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../config/supabase'
import { useAnalytics } from '../hooks/useAnalytics'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPhone, FiGlobe, FiMapPin, FiClock, FiStar } = FiIcons

const OfferPage = () => {
  const { adId } = useParams()
  const { incrementScanCount, incrementCallClicks, incrementWebsiteClicks } = useAnalytics()
  const [ad, setAd] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (adId) {
      fetchAd()
      // Increment scan count when page loads
      incrementScanCount(adId)
    }
  }, [adId])

  const fetchAd = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('id', adId)
        .eq('is_active', true)
        .single()

      if (error) throw error
      setAd(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCallClick = () => {
    incrementCallClicks(adId)
  }

  const handleWebsiteClick = () => {
    incrementWebsiteClicks(adId)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Offer Not Found</h1>
          <p className="text-gray-600">This offer may have expired or been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Business Info */}
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  {ad.logo_url && (
                    <img
                      src={ad.logo_url}
                      alt={ad.business_name}
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{ad.business_name}</h1>
                    <div className="flex items-center space-x-1 mt-1">
                      <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">Local Business</span>
                    </div>
                  </div>
                </div>

                {/* Special Offer */}
                <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon icon={FiClock} className="w-5 h-5 text-accent-600" />
                    <span className="text-sm font-medium text-accent-800">Special Offer</span>
                  </div>
                  <p className="text-xl font-bold text-accent-900">{ad.offer_text}</p>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                  
                  {ad.contact_phone && (
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{ad.contact_phone}</span>
                    </div>
                  )}

                  {ad.contact_website && (
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{ad.contact_website}</span>
                    </div>
                  )}

                  {ad.contact_address && (
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiMapPin} className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{ad.contact_address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 bg-gray-50">
                <div className="sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Get in Touch</h3>
                  
                  <div className="space-y-4">
                    {ad.contact_phone && (
                      <Button
                        onClick={handleCallClick}
                        className="w-full flex items-center justify-center space-x-2"
                        size="lg"
                      >
                        <SafeIcon icon={FiPhone} className="w-5 h-5" />
                        <span>Call Now</span>
                      </Button>
                    )}

                    {ad.contact_website && (
                      <Button
                        onClick={handleWebsiteClick}
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2"
                        size="lg"
                      >
                        <SafeIcon icon={FiGlobe} className="w-5 h-5" />
                        <span>Visit Website</span>
                      </Button>
                    )}

                    {ad.contact_address && (
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-center space-x-2"
                        size="lg"
                      >
                        <SafeIcon icon={FiMapPin} className="w-5 h-5" />
                        <span>Get Directions</span>
                      </Button>
                    )}
                  </div>

                  <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                      Found this offer through Lancaster Loves Local? 
                      <br />
                      <span className="font-medium">Mention this ad when you visit!</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default OfferPage