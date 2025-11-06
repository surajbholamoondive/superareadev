import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic' 
import featureData from '@/assets/HomePage/FeatureHighlights'
import { useAuth } from '@/context/auth'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import { fetchFeaturedData, fetchRecommendedData } from '@/utils/helper'
import { makeApiRequest } from '@/utils/utils'
import { NextSeo } from 'next-seo'

import Unauthorized from '@/components/UnauthorizedSection/unauthorized'
import BackgroundImage from '../assets/NonLoggedUserImages/backgroundImage.svg'
import building from '../assets/Images/HomePage/building.png'

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

const Home = ({ articles, moderationData }) => {
  const [propertyData, setPropertyData] = useState()
  const [projectData, setProjectData] = useState()
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [auth] = useAuth()
  const userType = auth?.userResult?.userType

  useEffect(() => {
    const fetchRecommendedListings = async () => {
      const user_id = auth?.userResult?._id
      const RecommendedListings = await fetchRecommendedData(user_id)
      setPropertyData(RecommendedListings)
      setProjectData(RecommendedListings)
    }
    const fetchFeaturedListings = async () => {
      const user_id = auth?.userResult?._id
      const featuredListings = await fetchFeaturedData()
      setFeaturedProperties(featuredListings)
    }
    fetchFeaturedListings()
    fetchRecommendedListings()
  }, [auth])

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
          title: title,
          description: description,
          url: websiteLink,
          images: [
            {
              url: linkImage,
              width: 300,
              height: 200,
              alt: 'SuperArea - Real Estate App',
            },
          ],
          type: 'website',
        }}
        twitter={{
          cardType: 'summary_large_image',
          site: '@YourTwitterHandle',
          title: title,
          description: description,
          image: linkImage,
        }}
      />
      {auth?.token ? (
        <section className=" py-2">
          <SearchSection />
          <Marquee text="REAL ESTATE REIMAGINED" />
          <div className="md:hidden">
            <SuperAI />
          </div>
          <FeaturedSection data={featureData.card1} />
          {<Unique />}

          <FeaturedSection data={featureData.card2} />
          <CityGrid />
          <FeaturedSection data={featureData.card3} />
          <div
            className="custom-section w-[93%] lg:w-[93%]"
            style={{
              backgroundImage: `url(${building.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {propertyData && propertyData.length > 0 && (
              <div>
                <FeaturedProperties recommendProperties={propertyData} />
              </div>
            )}
            {featuredProperties && featuredProperties.length > 0 && (
              <div>
                <FeaturedProperties featuredProperties={featuredProperties} />
              </div>
            )}
          </div>
          <Services />
          <BlogSection/>
        </section>
      ) : (
        <section
          className="bg-primary"
          style={{
            backgroundImage: `url(${BackgroundImage.src})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        >
          <div>
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
      text.getType,
      routes.adminModerationRoute
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

    return {
      props: {
        moderationData: null,
      },
    }
  }
}