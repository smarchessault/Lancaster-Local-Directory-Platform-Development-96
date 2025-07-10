import React from 'react'
import { motion } from 'framer-motion'
import { useAds } from '../hooks/useAds'
import AdGrid from '../components/ads/AdGrid'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMapPin, FiTrendingUp, FiUsers } = FiIcons

const Home = () => {
  const { ads, loading, error } = useAds()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Lancaster Loves Local
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover amazing local businesses and exclusive offers in Lancaster. 
              Supporting our community, one business at a time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-5 h-5" />
                <span>Local Businesses</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
                <span>Exclusive Offers</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUsers} className="w-5 h-5" />
                <span>Community Driven</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Local Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the best local businesses in Lancaster with exclusive offers and deals.
            </p>
          </motion.div>

          <AdGrid ads={ads} loading={loading} error={error} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Promote Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Lancaster Loves Local and reach thousands of potential customers 
              through our innovative postcard and digital directory platform.
            </p>
            <motion.a
              href="/auth"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home