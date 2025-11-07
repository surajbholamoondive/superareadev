import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import featureData from '@/assets/HomePage/FeatureHighlights'
import { useAuth } from '@/context/auth'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import { fetchFeaturedData, fetchRecommendedData } from '@/utils/helper'
import { makeApiRequest } from '@/utils/utils'
import { NextSeo } from 'next-seo'

import Unauthorized from '@/components/UnauthorizedSection/unauthorized'

// ✅ Use Cloudinary URLs directly to avoid hydration mismatch
const buildingImage = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244383/assets/Images/HomePage/building.png"
const backgroundImage = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244381/assets/Images/HomePage/mapBackground.png"

// ✅ Lazy-loaded components
const SearchSection = dynamic(() => import('@/components/HomePage/SearchSection'), { ssr: true })
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: true })
const SuperAI = dynamic(() => import('@/components/Chatbot/superAIMobile'), { ssr: false })
const FeaturedSection = dynamic(() => import('@/components/HomePage/FeatureHighlights/FeatureHighlights'), { ssr: true })
const Unique = dynamic(() => import('@/components/Unique/Unique'), { ssr: true })
const CityGrid = dynamic(() => import('@/components/HomePage/CityGrid'), { ssr: true })
const FeaturedProperties = dynamic(() => import('@/components/HomePage/FeaturedPropertiesSection/FeaturedProperties'), { ssr: true })
const Services = dynamic(() => import('@/components/HomePage/Services/Services'), { ssr: true })
const BlogSection = dynamic(() => import('@/components/Blog/BlogSection'), { ssr: true })
const QR = dynamic(() => import('@/components/NonLoggedHomepage/QRCode'), { ssr: true })
const NonLoggedUserHeader = dynamic(() => import('@/components/NonLoggedHomepage/NonLoggedUserHeader'), { ssr: true })
const UniqueData = dynamic(() => import('@/components/NonLoggedHomepage/Unique'), { ssr: true })
const NonLoggedServices = dynamic(() => import('@/components/NonLoggedHomepage/NonLoggedServices'), { ssr: true })
const StandOut = dynamic(() => import('@/components/NonLoggedHomepage/StandOut'), { ssr: true })

const { text, homepageSeoKeywords, routes } = GLOBALLY_COMMON_TEXT
const { websiteLink } = routes

// ✅ Simple loader component (no CLS, minimal paint)
const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fff',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid #ccc',
        borderTopColor: '#0070f3',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <style jsx>{`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
)

const Home = ({ articles, moderationData }) => {
  const [propertyData, setPropertyData] = useState()
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [auth] = useAuth()
  const userType = auth?.userResult?.userType

  useEffect(() => {
    if (!auth) return

    const fetchListings = async () => {
      const user_id = auth?.userResult?._id
      const [featuredListings, recommendedListings] = await Promise.all([
        fetchFeaturedData(),
        fetchRecommendedData(user_id),
      ])

      setFeaturedProperties(featuredListings || [])
      setPropertyData(recommendedListings || [])
    }

    fetchListings()
  }, [auth])

  // ✅ Wait for auth with loader (prevents CLS + blank screen)
  if (auth === undefined) return <Loader />

  const { description, title, linkImage } = moderationData?.result?.websiteDescription || {}

  return userType === text.adminText ? (
    <Unauthorized />
  ) : (
    <div>
      <NextSeo
        title={title}
        description={description}
        keywords={homepageSeoKeywords}
        openGraph={{
          title,
          description,
          url: websiteLink,
          images: [{ url: linkImage, width: 300, height: 200, alt: 'SuperArea - Real Estate App' }],
          type: 'website',
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@YourTwitterHandle',
          title,
          description,
          image: linkImage,
        }}
      />

      {auth?.token ? (
        <section className="py-2">
          <SearchSection />
          <Marquee text="REAL ESTATE REIMAGINED" />
          <div className="md:hidden">
            <SuperAI />
          </div>
          <FeaturedSection data={featureData.card1} />
          <Unique />
          <FeaturedSection data={featureData.card2} />
          <CityGrid />
          <FeaturedSection data={featureData.card3} />

          <div
            className="custom-section w-[93%] lg:w-[93%]"
            style={{
              backgroundImage: `url(${buildingImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '600px',
            }}
          >
            {propertyData?.length > 0 && (
              <FeaturedProperties recommendProperties={propertyData} />
            )}
            {featuredProperties?.length > 0 && (
              <FeaturedProperties featuredProperties={featuredProperties} />
            )}
          </div>

          <Services />
          <BlogSection />
        </section>
      ) : (
        <section
          className="bg-primary"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            minHeight: '800px',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <QR />
          <NonLoggedUserHeader />
          <UniqueData />
          <NonLoggedServices />
          <StandOut />
        </section>
      )}
    </div>
  )
}

export default Home

export async function getStaticProps() {
  try {
    const response = await makeApiRequest(
      GLOBALLY_COMMON_TEXT.text.getType,
      GLOBALLY_COMMON_TEXT.routes.adminModerationRoute
    )
    const allData = response?.data || response

    return {
      props: {
        moderationData: allData || null,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching data in getStaticProps:', error)
    return { props: { moderationData: null } }
  }
}
