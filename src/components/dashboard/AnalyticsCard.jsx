import React from 'react'
import Card from '../common/Card'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiEye, FiPhone, FiGlobe, FiTrendingUp } = FiIcons

const AnalyticsCard = ({ ad }) => {
  const analytics = ad.ad_analytics?.[0] || {}
  const scanCount = analytics.scan_count || 0
  const callClicks = analytics.call_clicks || 0
  const websiteClicks = analytics.website_clicks || 0
  const totalEngagement = scanCount + callClicks + websiteClicks

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{ad.business_name}</h3>
          <p className="text-sm text-gray-600">Position #{ad.slot_position}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          ad.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {ad.is_active ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg mb-2">
            <SafeIcon icon={FiEye} className="w-5 h-5 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{scanCount}</div>
          <div className="text-xs text-gray-600">QR Scans</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mb-2">
            <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalEngagement}</div>
          <div className="text-xs text-gray-600">Total Engagement</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mb-2">
            <SafeIcon icon={FiPhone} className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{callClicks}</div>
          <div className="text-xs text-gray-600">Call Clicks</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mb-2">
            <SafeIcon icon={FiGlobe} className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{websiteClicks}</div>
          <div className="text-xs text-gray-600">Website Clicks</div>
        </div>
      </div>

      {ad.offer_text && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 font-medium">{ad.offer_text}</p>
        </div>
      )}
    </Card>
  )
}

export default AnalyticsCard