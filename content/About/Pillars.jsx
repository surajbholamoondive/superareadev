import React from 'react'
import Image from 'next/image'

import SuperScore from '../../assets/AboutPage/a.jpg'
import SupеrEstimatе from '../../assets/AboutPage/SupеrEstimatе.svg'
import SuperVerification from '../../assets/AboutPage/SupеrVеrification.svg'
import virtual from '../../assets/AboutPage/virtual.png'

const innovationData = [
  {
    icon: SuperScore,
    className: "w-[250px] h-[200px] object-contain",
    title: 'SuperScore – Trusted Property Rating',
    description:
      'SuperScore assigns each property a trust rating out of 100, giving you a quick understanding of how reliable a listing is. This score is based on key factors such as location, builder history, amenities, listing details, and photos. Verified listings earn higher scores, making it easier for you to confidently select the right property.',
  },
  {
    icon: SuperVerification,
    className: "w-[300px] h-[250px] object-contain",
    title: 'SuperVerification – Verified Listings Only',
    description:
      'SuperVerification makes sure every listing is real and safe. Properties go through e-KYC, live video checks and exact location tagging. This process filters out fake or inaccurate listings and increases the SuperScore. It helps you browse with more trust and ensures you see only genuine properties on the platform.',
  },
  {
    icon: SupеrEstimatе,
    className: "w-[300px] h-[250px] object-contain",
    title: 'SuperEstimate – Predict Your Property’s Worth',
    description:
      'SuperEstimate uses advanced AI and machine learning to provide accurate property valuations based on current market trends and real-time data. It considers key details like size, number of rooms, parking availability, and nearby sales. The system continuously improves by comparing past estimates with real time sale prices, giving users a fair and smart price range they can trust.',
  },
  {
    icon: virtual,
    className: "w-[230px] h-[160px] object-contain",
    title: 'SuperArea Assistant – 24/7 Expert Help',
    description:
      'SuperArea Assistant is your personal real estate chatbot, available 24/7. It answers all your queries about the real estate world, whether it’s about the properties, listings, pricing, or rent agreements. Easy to use and always available, the assistant helps you through every step of your real estate journey with instant support and expert guidance.',
  },
]

export const Pillars = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 max-w-[1200px] mx-auto">
      <h2 className="text-3xl font-bold text-primary mb-12">
        Innovation Pillars
      </h2>

      <div className="grid gap-12 leading-loose">
        {innovationData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-between md:items-start gap-4 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className=" flex items-start justify-center  md:items-start w-full">
              <Image
                src={item.icon}
                alt={item.title}
                className={item.className}
              />
            </div>
            <div className=" w-full">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-700  text-sm md:text-base leading-loose">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
