import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../common/Card'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMapPin, FiPhone, FiGlobe, FiEye } = FiIcons

const AdCard = ({ ad }) => {
  const analytics = ad.ad_analytics?.[0] || {}
  const scanCount = analytics.scan_count || 0

  return (
    <Card hover className="overflow-hidden">
      <Link to={`/o/${ad.id}`}>
        <div className="relative">
          {/* Ad Visual */}
          {ad.ad_visual_url ? (
            <img
              src={ad.ad_visual_url}
              alt={ad.business_name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <div className="text-center">
                {ad.logo_url && (
                  <img
                    src={ad.logo_url}
                    alt={ad.business_name}
                    className="w-16 h-16 object-contain mx-auto mb-2"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-900">{ad.business_name}</h3>
              </div>
            </div>
          )}

          {/* Scan Count Badge */}
          {scanCount > 0 && (
            <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
              <SafeIcon icon={FiEye} className="w-3 h-3 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">{scanCount}</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{ad.business_name}</h3>
          
          {ad.offer_text && (
            <p className="text-accent-600 font-medium mb-3">{ad.offer_text}</p>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            {ad.contact_phone && (
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span>{ad.contact_phone}</span>
              </div>
            )}
            
            {ad.contact_website && (
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                <span className="truncate">{ad.contact_website}</span>
              </div>
            )}
            
            {ad.contact_address && (
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>{ad.contact_address}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default AdCard