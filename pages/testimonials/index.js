import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getLogger } from '@/helper/logger'
import { ADMIN_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { makeApiRequest } from '@/utils/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import BackgroundImage from '../../assets/NonLoggedUserImages/backgroundImage.svg'
import profile from '../../assets/Testimonials/profile.svg'
import quote from '../../assets/Testimonials/quote.svg'
import Loading from '../loading'
import StarRating from '@/components/Testimonial/StarRating'

const { text } = GLOBALLY_COMMON_TEXT
const { ADMIN_WEBSITE_MODERATION_TAB } = ADMIN_MODULE
const { routes } = ADMIN_WEBSITE_MODERATION_TAB

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const logger = getLogger()

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const allData = await makeApiRequest(text.getType, routes.moderationData)
      const testimonialData = allData?.data?.result?.testimonial || []
      setTestimonials(testimonialData)
      setLoading(false)
    } catch (error) {
      logger.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const getCurrentTestimonials = () => {
    if (testimonials.length === 0) return []

    const indices = [
      (currentIndex - 1 + testimonials.length) % testimonials.length,
      currentIndex,
      (currentIndex + 1) % testimonials.length,
    ]

    return indices.map((index) => testimonials[index])
  }

  const currentTestimonials = getCurrentTestimonials()

  return (
    <section
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        paddingBottom: '11px',
      }}
    >
      <div className="bg-white  mx-auto  w-[93%] lg:w-[93%] py-9 px-6 lg:px-9 overflow-hidden rounded-lg  ">
        <div className="relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block">
              <h4 className="text-3xl lg:text-4xl font-bold text-[#121212] ">
                What Our Clients Say About Us
              </h4>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="relative">
              {/* Navigation Arrows with proper spacing */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-12 -translate-x-8 z-20 rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-600" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-12 translate-x-8 z-20 rounded-full p-2 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={24} className="text-gray-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-6 items-center px-4">
                {/* Left Card */}
                <div className="hidden md:block">
                  <div className="border border-[#931602] rounded-xl p-3 flex flex-col justify-between gap-3 bg-white shadow-sm transform scale-95 opacity-90 min-h-[190px] w-full ">
                    <div className="flex justify-between items-start">
                      <Image
                        width={32}
                        height={32}
                        src={quote}
                        alt="quotes"
                        className="text-[#931602]"
                      />
                      <StarRating rating={currentTestimonials[1]?.rating} />
                    </div>
                    <p className="text-sm text-[#0F1125] line-clamp-3">
                      {currentTestimonials[0]?.description}
                    </p>
                    <hr className="border-t border-[#931602] w-48 font-bold" />
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden ">
                        <Image
                          width={40}
                          height={40}
                          src={currentTestimonials[0]?.profileImage || profile}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5 className="font-bold text-[#0F1125] text-sm">
                          {currentTestimonials[0]?.name}
                        </h5>
                        <p className="text-xs text-[#717276]">
                          {currentTestimonials[0]?.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Card */}
                <div className="border border-[#931602] rounded-xl p-3 flex flex-col justify-between gap-3 bg-white shadow-xl transform scale-105 z-10 relative min-h-[205px] w-full">
                  <div className="flex justify-between items-start">
                    <Image
                      width={34}
                      height={34}
                      src={quote}
                      alt="quotes"
                      className="text-[#931602]"
                    />
                    <StarRating rating={currentTestimonials[1]?.rating} />
                  </div>
                  <p className="text-sm text-[#0F1125] line-clamp-4">
                    {currentTestimonials[1]?.description}
                  </p>
                  <hr className="border-t border-[#931602] w-48 font-bold" />
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden ">
                      <Image
                        width={42}
                        height={42}
                        src={currentTestimonials[1]?.profileImage || profile}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="font-bold text-[#0F1125] text-sm">
                        {currentTestimonials[1]?.name}
                      </h5>
                      <p className="text-xs text-[#717276]">
                        {currentTestimonials[1]?.position}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Card */}
                <div className="hidden md:block">
                  <div className="border border-[#931602] rounded-xl p-3 flex flex-col justify-between gap-3 bg-white shadow-sm transform scale-95 opacity-90 min-h-[190px] w-full">
                    <div className="flex justify-between items-start">
                      <Image
                        width={32}
                        height={32}
                        src={quote}
                        alt="quotes"
                        className="text-[#931602]"
                      />
                      <StarRating rating={currentTestimonials[2]?.rating} />
                    </div>
                    <p className="text-sm text-[#0F1125] line-clamp-3">
                      {currentTestimonials[2]?.description}
                    </p>
                    <hr className="border-t border-[#931602] w-48 font-bold" />
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          width={40}
                          height={40}
                          src={currentTestimonials[2]?.profileImage || profile}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5 className="font-bold text-[#0F1125] text-sm">
                          {currentTestimonials[2]?.name}
                        </h5>
                        <p className="text-xs text-[#717276]">
                          {currentTestimonials[2]?.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-12 gap-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-[#931602]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel