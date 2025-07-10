import React from 'react'
import { Link } from 'react-router-dom'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiHeart, FiMail, FiMapPin } = FiIcons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LLL</span>
              </div>
              <span className="text-xl font-bold">Lancaster Loves Local</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Supporting local businesses in Lancaster through innovative marketing solutions 
              that connect businesses with their community.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-500" />
              <span>in Lancaster</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">
                  For Businesses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span>hello@lancasterloveslocal.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>Lancaster, PA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Lancaster Loves Local. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer