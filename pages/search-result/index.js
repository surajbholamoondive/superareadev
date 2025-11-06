import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ArrowIcon from '@/assets/ButtonIcons/leftArrow.svg'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import { GLOBALLY_COMMON_TEXT, SEARCH_RESULT_PAGE_TEXT } from '@/textV2'
import { fetchFeaturedData, fetchRecommendedData } from '@/utils/helper'
import { makeApiRequest } from '@/utils/utils'
import Drawer from '@mui/material/Drawer'

import FeaturedProperties from '@/components/HomePage/FeaturedPropertiesSection/FeaturedProperties'
import OptimizedFilterSection from '@/components/SearchResultPage/FilterSection/OptimizedFilterSection'
import SortByDropdown from '@/components/SearchResultPage/FilterSection/SortByDropdown'
import Properties from '@/components/SearchResultPage/PropertiesContainer/Properties'

import FilterBackground from '../../assets/SearchFilterIcons/Background-filter.svg'
import Unauthorized from '../unauthorized'
import styles from './index.module.css'

const { text } = SEARCH_RESULT_PAGE_TEXT
const {
  adminText,
  commercialText,
  residentialText,
  industrialText,
  agriculturalText,
} = GLOBALLY_COMMON_TEXT.text

const SearchResultPage = () => {
  const [propertyData, setPropertyData] = useState()
  const [projectData, setProjectData] = useState()
  const router = useRouter()
  const { query } = router
  const [auth] = useAuth()
  const user = auth?.userResult?._id
  const [propertyResult, setPropertyResult] = useState([])
  const [totalPropertyCount, setTotalPropertyCount] = useState()
  const [filterQuery, setFilterQuery] = useState({})
  const [appliedFilter, setAppliedFilter] = useState([])
  const [residential, setResidential] = useState(false)
  const [commercial, setCommercial] = useState(false)
  const [industrial, setIndustrial] = useState(false)
  const [agricultural, setAgricultural] = useState(false)

  const [noMoreToShow, setNoMoreToShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filteredData, setFilteredData] = useState()
  const windowWidth = useWindowWidth()
  const [currentPage, setCurrentPage] = useState(1)
  const [loadMore] = useState(false)
  const [nextPageAvailable, setNextPageAvailable] = useState(1)
  const userType = auth?.userResult?.userType
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [featuredProperties, setFeaturedProperties] = useState([])



  console.log("filterQuery ::::::::::::::::::: ", filterQuery)

  console.log("query ::::::::::::: ", query)
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  const loadMoreProperties = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)

    makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      process.env.NEXT_PUBLIC_SEARCH_PROPERTY_API_PATH,
      { params: { ...query, page: nextPage, size: 10, userID: user } }
    ).then((response) => { 
      console.log("response",response)
      const { data } = response || {}
      const { result } = data || {}
      const { propertyResult: newPropertyResult = [] } = result || {}

      if (newPropertyResult.length === 0) {
        setNoMoreToShow(true)
      }

      setPropertyResult((prevProperties) => [
        ...prevProperties,
        ...newPropertyResult,
      ])
      setNextPageAvailable(result?.nextPageNumber)
    })
  }

  const updateState = (newFilterQuery) => {
    setFilterQuery(newFilterQuery)
  }

  useEffect(() => {
    fetchQueryData()
  }, [query])

  const fetchQueryData = async () => {
    setLoading(true)
    setNoMoreToShow(false)

    setResidential(false)
    setCommercial(false)
    setIndustrial(false)
    setAgricultural(false)

    if (Object.keys(query).length === 0) {
      return
    }

    // Set property type based on query
    if (query.propertyType === residentialText) {
      setResidential(true)
    } else if (query.propertyType === commercialText) {
      setCommercial(true)
    } else if (query.propertyType === industrialText) {
      setIndustrial(true)
    } else if (query.propertyType === agriculturalText) {
      setAgricultural(true)
    }

    const pageNum = query.page || 1
    const size = 10

    try {
      await makeApiRequest(
        process.env.NEXT_PUBLIC_GET_METHOD,
        process.env.NEXT_PUBLIC_SEARCH_PROPERTY_API_PATH,
        { params: { ...query, page: pageNum, size: size, userID: user } }
      ).then((response) => {
        console.log("response",response)
        const { data } = response || {}
        const { result } = data || {}
        const { propertyResult, totalPropertyCount } = result || {}
        if (!result.propertyResult) {
          setPropertyResult([])
          setTotalPropertyCount(0)
        } else {
          setPropertyResult(propertyResult)
          setTotalPropertyCount(totalPropertyCount)
          setNextPageAvailable(result?.nextPageNumber)
        }

        if (response) {
          setLoading(false)
        }
      })
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (propertyResult) {
        setFilteredData(propertyResult)
      } else {
        setFilteredData([])
      }
    }
    fetchData()
  }, [propertyResult, auth])

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

  return userType === adminText ? (
    <Unauthorized />
  ) : (
    <div className={`${styles.section}`}>
      <div className="mb-4 rounded-3xl relative custom-section">
        <div className="flex justify-center items-center gap-2 mb-2">
          <h2 className="text-primary">{text.new}</h2>
          <h2 className="text-primary font-normal">{text.projects}</h2>
        </div>

   <div className="flex items-start justify-between max-lg:flex-col">
  {windowWidth > 1024 && (
    <OptimizedFilterSection
      dataToFilter={propertyResult}
      filteredData={filteredData}
      setFilteredData={setFilteredData}
      totalPropertyCount={totalPropertyCount}
      setCommercial={setCommercial}
      commercial={commercial}
      setIndustrial={setIndustrial}
      industrial={industrial}
      setAgricultural={setAgricultural}
      agricultural={agricultural}
      setResidential={setResidential}
      residential={residential}
      handleDrawerClose={handleDrawerClose}
    />
  )}


  <div className="flex flex-col w-full">
    {(windowWidth <= 1024) && (
      <div className="flex justify-between mb-2 px-2">
        {/* Filter button opens drawer in mobile */}
        <button
          onClick={handleDrawerOpen}
          className="text-primary h-[45px] w-[8rem] flex justify-evenly font-semibold bg-white px-2 py-2 border rounded-lg"
        >
          Filter
          <Image
            src={ArrowIcon}
            width={20}
            height={20}
            className="ml-2 transform rotate-90"
            alt="arrow"
          />
        </button>

     
        {totalPropertyCount !== 0 && (
          <SortByDropdown
            tofilter={filteredData}
            updateState={updateState}
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
            appliedFilter={appliedFilter}
            setAppliedFilter={setAppliedFilter}
          />
        )}
      </div>
    )}

    <Properties
      dataToFilter={filteredData}
      totalPropertyCount={totalPropertyCount}
      loadMoreProperties={loadMoreProperties}
      appliedFilter={appliedFilter}
      loadMore={loadMore}
      nextPageAvailable={nextPageAvailable}
      noMoreToShow={noMoreToShow}
      isLoadingMain={loading}
    />
  </div>
</div>


{windowWidth <= 1024 && (
  <Drawer
    anchor="left"
    open={isDrawerOpen}
    onClose={handleDrawerClose}
    variant="temporary"
    style={{ zIndex: 100 }}
  >
    <OptimizedFilterSection
      dataToFilter={propertyResult}
      filteredData={filteredData}
      setFilteredData={setFilteredData}
      totalPropertyCount={totalPropertyCount}
      setCommercial={setCommercial}
      commercial={commercial}
      setIndustrial={setIndustrial}
      industrial={industrial}
      setAgricultural={setAgricultural}
      agricultural={agricultural}
      setResidential={setResidential}
      residential={residential}
      handleDrawerClose={handleDrawerClose}
    />
  </Drawer>
)}



      </div>
      {propertyData && projectData && (
        <div
          className="custom-section"
          style={{
            backgroundImage: `url(${FilterBackground.src})`,
            backgroundSize: 'contain',
          }}
        >
          {propertyData && propertyData.length > 0 && (
            <div className="lg:w-[85%] m-auto">
              <FeaturedProperties recommendProperties={propertyData} />
            </div>
          )}
          {featuredProperties && featuredProperties.length > 0 && (
            <div className="lg:w-[85%] m-auto">
              <FeaturedProperties featuredProperties={featuredProperties} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchResultPage
