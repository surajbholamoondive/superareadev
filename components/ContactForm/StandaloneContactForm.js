import React, { useState } from 'react'
import { HOME_PAGE_TEXT, MY_CONTACT_FORM } from '@/textV2'
import axios from 'axios'
import { toast } from 'react-toastify'

const { userContactRoute } = HOME_PAGE_TEXT.routes
const { formheading, firstname, lastname, email, phoneNo, message } =
  MY_CONTACT_FORM.text

const StandaloneContactForm = ({
  width = 'w-full',
  height = 'auto',
  title = formheading,
  className = '',
  showBorder = true,
  showShadow = true,
  customStyles = {},
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (!formData.firstName.trim()) {
      setIsSubmitting(false)
      return toast.error('First Name is required')
    }
    if (!formData.lastName.trim()) {
      setIsSubmitting(false)
      return toast.error('Last Name is required')
    }
    if (!formData.email.trim()) {
      setIsSubmitting(false)
      return toast.error('Email is required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setIsSubmitting(false)
      return toast.error('Please enter a valid email address')
    }
    if (!formData.phone.trim()) {
      setIsSubmitting(false)
      return toast.error('Phone number is required')
    }

    const digitsOnly = formData.phone.replace(/\D/g, '')
    if (digitsOnly.length < 10) {
      setIsSubmitting(false)
      return toast.error('Please enter a valid phone number')
    }

    const formattedPhone = digitsOnly.startsWith('91')
      ? `+${digitsOnly}`
      : `+91${digitsOnly}`

    if (!formData.message.trim()) {
      setIsSubmitting(false)
      return toast.error('Message cannot be empty')
    }

    // API Call
    try {
      const response = await axios.post(userContactRoute, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formattedPhone,
        message: formData.message,
      })

      console.log('Form submitted successfully:', response.data)

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })

      toast.success('Your message has been sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to submit form. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`${width} ${height} ${className} ${
        showBorder ? 'rounded-3xl border-2  shadow-sm' : ''
      } ${showShadow ? 'shadow-md' : ''} bg-white rounded-3xl p-6 mb-6 mt-4`}
      style={customStyles}
    >
      <h3 className="text-2xl font-bold text-primary mb-6 text-center md:text-left">
        {title}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-newBackground mb-1">
              {firstname} <span className="text-newBackground">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-newBackground mb-1">
              {lastname} <span className="text-newBackground">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-0.5 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Email and Phone Fields */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-newBackground mb-1">
              {email} <span className="text-newBackground">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-newBackground mb-1">
              {phoneNo} <span className="text-newBackground">*</span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-newBackground mb-1">
            {message} <span className="text-newBackground">*</span>
          </label>
          <textarea
            name="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0.5 focus:ring-primary focus:border-primary resize-vertical transition-colors"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`whitespace-nowrap px-6 sm:px-10 lg:px-16 rounded-2xl py-1.5 border border-primary text-primary font-medium ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Get Call Back'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default StandaloneContactForm
