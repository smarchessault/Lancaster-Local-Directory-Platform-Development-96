import React from 'react'
import { motion } from 'framer-motion'
import Card from '../common/Card'
import Button from '../common/Button'

const PostcardGrid = ({ onSlotSelect, selectedSlot, userAds = [] }) => {
  // Create a 3x3 grid (9 slots total)
  const slots = Array.from({ length: 9 }, (_, i) => i + 1)
  
  // Check if slot is occupied
  const isSlotOccupied = (slotNumber) => {
    return userAds.some(ad => ad.slot_position === slotNumber)
  }

  // Get ad for slot
  const getAdForSlot = (slotNumber) => {
    return userAds.find(ad => ad.slot_position === slotNumber)
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Select Your Postcard Position
        </h3>
        <p className="text-gray-600">
          Choose where you'd like your ad to appear on the 9x12 postcard
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {slots.map((slot) => {
          const isOccupied = isSlotOccupied(slot)
          const ad = getAdForSlot(slot)
          const isSelected = selectedSlot === slot

          return (
            <motion.div
              key={slot}
              whileHover={!isOccupied ? { scale: 1.02 } : {}}
              whileTap={!isOccupied ? { scale: 0.98 } : {}}
              className={`
                aspect-square border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
                ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
                ${isOccupied ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-primary-300'}
              `}
              onClick={() => !isOccupied && onSlotSelect(slot)}
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                {isOccupied && ad ? (
                  <div className="w-full">
                    <div className="text-xs font-medium text-gray-600 mb-1">
                      Occupied
                    </div>
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {ad.business_name}
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="text-2xl font-bold text-gray-400 mb-1">
                      {slot}
                    </div>
                    <div className="text-xs text-gray-500">
                      {isSelected ? 'Selected' : 'Available'}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-50 border-2 border-primary-500 rounded"></div>
            <span>Selected</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">9x12 Postcard</div>
          <div className="text-xs">Each slot: 3x4 inches</div>
        </div>
      </div>
    </Card>
  )
}

export default PostcardGrid