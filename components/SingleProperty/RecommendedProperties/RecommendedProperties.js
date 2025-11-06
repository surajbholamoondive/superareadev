import { useEffect, useRef, useState } from 'react'
import useWindowWidth from '@/context/useWindowWidth'
import axios from 'axios'
import { getLogger } from '@/helper/logger'
import FeaturedSection from '@/components/HomePage/FeaturedPropertiesSection/FeaturedSection'
import { HOME_PAGE_TEXT } from '@/textV2'
const { propertyText } = HOME_PAGE_TEXT.text


const RecommendedProperties = ({ property_id, user_id, project_id, recommendation_type }) => {

  const [recommendedData, setRecommendedData] = useState()
  const scrollContainerRef = useRef(null)
  const windowWidth = useWindowWidth()
  const Logger = getLogger();

  const fetchPropertyAPI = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_engine}?listing_id=${property_id}&user_id=${user_id}&recommendation_type=${recommendation_type}`
      )
      setRecommendedData(data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
  const fetchProjectAPI = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_engine}?listing_id=${project_id}&user_id=${user_id}`
      )
      setRecommendedData(data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }
  useEffect(() => {
    if (recommendation_type == propertyText) {
      fetchPropertyAPI();
    }
    else {
      fetchProjectAPI();
    }
  }, [property_id, user_id, recommendation_type])

  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset
  }
  return (
    <>
      {recommendedData &&
        <div className="flex justify-center">
          <FeaturedSection data={recommendedData} />
        </div>
      }
    </>
  )
}

export default RecommendedProperties
