import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import featureData from '@/assets/HomePage/FeatureHighlights'
import { useAuth } from '@/context/auth'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import { fetchFeaturedData, fetchRecommendedData } from '@/utils/helper'
import { makeApiRequest } from '@/utils/utils'
import { NextSeo } from 'next-seo'
import Unauthorized from '@/components/UnauthorizedSection/unauthorized'

const buildingImage = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244383/assets/Images/HomePage/building.png"
const backgroundImage = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244381/assets/Images/HomePage/mapBackground.png"

// ✅ Add loading fallbacks to prevent CLS
const LoadingFallback = ({ height = '400px' }) => (
  <div style={{ minHeight: height, backgroundColor: '#f5f5f5' }} />
)

// ✅ Dynamic imports with proper fallbacks
const SearchSection = dynamic(() => import('@/components/HomePage/SearchSection'), { 
  ssr: true,
  loading: () => <LoadingFallback height="300px" />
})
const Marquee = dynamic(() => import('@/components/Marquee'), { 
  ssr: true,
  loading: () => <LoadingFallback height="60px" />
})
const SuperAI = dynamic(() => import('@/components/Chatbot/superAIMobile'), { ssr: false })
const FeaturedSection = dynamic(() => import('@/components/HomePage/FeatureHighlights/FeatureHighlights'), { 
  ssr: true,
  loading: () => <LoadingFallback height="500px" />
})
const Unique = dynamic(() => import('@/components/Unique/Unique'), { 
  ssr: true,
  loading: () => <LoadingFallback height="600px" />
})
const CityGrid = dynamic(() => import('@/components/HomePage/CityGrid'), { 
  ssr: true,
  loading: () => <LoadingFallback height="400px" />
})
const FeaturedProperties = dynamic(() => import('@/components/HomePage/FeaturedPropertiesSection/FeaturedProperties'), { 
  ssr: true,
  loading: () => <LoadingFallback height="500px" />
})
const Services = dynamic(() => import('@/components/HomePage/Services/Services'), { 
  ssr: true,
  loading: () => <LoadingFallback height="500px" />
})
const BlogSection = dynamic(() => import('@/components/Blog/BlogSection'), { 
  ssr: true,
  loading: () => <LoadingFallback height="400px" />
})
const QR = dynamic(() => import('@/components/NonLoggedHomepage/QRCode'), { 
  ssr: true,
  loading: () => <LoadingFallback height="300px" />
})
const NonLoggedUserHeader = dynamic(() => import('@/components/NonLoggedHomepage/NonLoggedUserHeader'), { 
  ssr: true,
  loading: () => <LoadingFallback height="400px" />
})
const UniqueData = dynamic(() => import('@/components/NonLoggedHomepage/Unique'), { 
  ssr: true,
  loading: () => <LoadingFallback height="600px" />
})
const NonLoggedServices = dynamic(() => import('@/components/NonLoggedHomepage/NonLoggedServices'), { 
  ssr: true,
  loading: () => <LoadingFallback height="500px" />
})
const StandOut = dynamic(() => import('@/components/NonLoggedHomepage/StandOut'), { 
  ssr: true,
  loading: () => <LoadingFallback height="400px" />
})

const { text, homepageSeoKeywords, routes } = GLOBALLY_COMMON_TEXT
const { websiteLink } = routes

// ✅ Improved loader with no animation (faster paint)
const Loader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#fff',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e0e0e0',
        borderTopColor: '#0070f3',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

const Home = ({ articles, moderationData }) => {
  const [propertyData, setPropertyData] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [auth] = useAuth()
  const userType = auth?.userResult?.userType

  useEffect(() => {
    if (!auth?.token) {
      setIsDataLoading(false)
      return
    }

    const fetchListings = async () => {
      try {
        const user_id = auth?.userResult?._id
        const [featuredListings, recommendedListings] = await Promise.all([
          fetchFeaturedData(),
          fetchRecommendedData(user_id),
        ])

        setFeaturedProperties(featuredListings || [])
        setPropertyData(recommendedListings || [])
      } catch (error) {
        console.error('Failed to fetch listings:', error)
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchListings()
  }, [auth])

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

          {/* ✅ Reserve space with min-height to prevent CLS */}
          <div
            className="custom-section w-[93%] lg:w-[93%] relative"
            style={{
              minHeight: '600px',
              position: 'relative',
            }}
          >
            {/* ✅ Use Next.js Image for better optimization */}
            <Image
              src={buildingImage}
              alt="Building background"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={false}
              quality={75}
            />
            
            <div className="relative z-10">
              {/* ✅ Always render container to prevent layout shift */}
              {isDataLoading ? (
                <LoadingFallback height="500px" />
              ) : (
                <>
                  {propertyData?.length > 0 && (
                    <FeaturedProperties recommendProperties={propertyData} />
                  )}
                  {featuredProperties?.length > 0 && (
                    <FeaturedProperties featuredProperties={featuredProperties} />
                  )}
                </>
              )}
            </div>
          </div>

          <Services />
          <BlogSection />
        </section>
      ) : (
        <section
          className="bg-primary relative"
          style={{
            minHeight: '800px',
            position: 'relative',
          }}
        >
          {/* ✅ Use Next.js Image instead of inline background */}
          <Image
            src={backgroundImage}
            alt="Map background"
            fill
            sizes="100vw"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            priority
            quality={75}
          />
          
          <div className="relative z-10">
            <QR />
            <NonLoggedUserHeader />
            <UniqueData />
            <NonLoggedServices />
            <StandOut />
          </div>
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
