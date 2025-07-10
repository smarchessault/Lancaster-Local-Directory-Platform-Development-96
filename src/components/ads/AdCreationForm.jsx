import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { QRCodeSVG } from 'qrcode.react'
import { motion } from 'framer-motion'
import Card from '../common/Card'
import Button from '../common/Button'
import Input from '../common/Input'
import { uploadLogo } from '../../config/supabase'
import { useAuth } from '../../context/AuthContext'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUpload, FiX } = FiIcons

const AdCreationForm = ({ onSubmit, loading, selectedSlot }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    business_name: '',
    offer_text: '',
    contact_phone: '',
    contact_website: '',
    contact_address: '',
    logo_url: '',
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg']
    },
    maxFiles: 1
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedSlot) {
      alert('Please select a postcard position first')
      return
    }

    let logoUrl = formData.logo_url

    // Upload logo if file is selected
    if (logoFile) {
      setUploadingLogo(true)
      const { data, error } = await uploadLogo(logoFile, user.id)
      setUploadingLogo(false)
      
      if (error) {
        alert('Error uploading logo: ' + error.message)
        return
      }
      
      logoUrl = data.publicUrl
    }

    const adData = {
      ...formData,
      logo_url: logoUrl,
      slot_position: selectedSlot,
      user_id: user.id,
      ad_size: '1x3', // Default size for now
    }

    await onSubmit(adData)
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    setFormData(prev => ({ ...prev, logo_url: '' }))
  }

  // Generate QR code URL (this would be the actual offer page URL)
  const qrCodeUrl = `https://lancasterloveslocal.com/o/preview-${Date.now()}`

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Business Information
            </h3>

            <Input
              label="Business Name *"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
              required
              placeholder="Your Business Name"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Offer Text *
              </label>
              <textarea
                name="offer_text"
                value={formData.offer_text}
                onChange={handleInputChange}
                required
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., 25% Off Your Entire Purchase!"
              />
            </div>

            <Input
              label="Phone Number"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleInputChange}
              placeholder="(555) 123-4567"
            />

            <Input
              label="Website"
              name="contact_website"
              value={formData.contact_website}
              onChange={handleInputChange}
              placeholder="www.yourbusiness.com"
            />

            <Input
              label="Address"
              name="contact_address"
              value={formData.contact_address}
              onChange={handleInputChange}
              placeholder="123 Main St, Lancaster, PA"
            />

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Logo
              </label>
              {!logoPreview ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-300 hover:border-primary-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <SafeIcon icon={FiUpload} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {isDragActive 
                      ? 'Drop the logo here...' 
                      : 'Drag & drop a logo, or click to select'
                    }
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, SVG up to 5MB
                  </p>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-32 h-32 object-contain border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ad Preview
            </h3>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 aspect-[3/4]">
              <div className="h-full flex flex-col">
                {/* Logo */}
                {logoPreview && (
                  <div className="flex-shrink-0 mb-3">
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="w-16 h-16 object-contain mx-auto"
                    />
                  </div>
                )}

                {/* Business Name */}
                <div className="text-center mb-3">
                  <h4 className="text-lg font-bold text-gray-900">
                    {formData.business_name || 'Your Business Name'}
                  </h4>
                </div>

                {/* Offer */}
                <div className="text-center mb-3 flex-grow">
                  <p className="text-accent-600 font-semibold">
                    {formData.offer_text || 'Your Special Offer'}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="text-center text-sm text-gray-600 space-y-1 mb-3">
                  {formData.contact_phone && (
                    <div>{formData.contact_phone}</div>
                  )}
                  {formData.contact_website && (
                    <div>{formData.contact_website}</div>
                  )}
                  {formData.contact_address && (
                    <div>{formData.contact_address}</div>
                  )}
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <QRCodeSVG
                    value={qrCodeUrl}
                    size={64}
                    level="M"
                    includeMargin={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            loading={loading || uploadingLogo}
            disabled={!selectedSlot}
            size="lg"
          >
            {uploadingLogo ? 'Uploading Logo...' : 'Create Ad'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default AdCreationForm