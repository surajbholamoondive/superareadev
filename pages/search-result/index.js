import { useEffect, useState, useCallback } from 'react'
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
import { FeaturedPropertiesSkeleton } from '@/components/HomePage/FeaturedPropertiesSection/FeaturedPropertySkeleton'
import { SearchResultCardSkeleton } from '@/components/SearchResultCardComponent/SearchResultCardSkeleton'

const { text } = SEARCH_RESULT_PAGE_TEXT
const {
  adminText,
  commercialText,
  residentialText,
  industrialText,
  agriculturalText,
} = GLOBALLY_COMMON_TEXT.text

// ✅ Skeleton loader for featured properties section
// const FeaturedPropertiesSkeleton = () => (
//   <div className="w-full animate-pulse">
//     <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
//     <div className="h-64 bg-gray-200 rounded-lg"></div>
//   </div>
// )

// ✅ Skeleton loader for main content
const ContentSkeleton = () => (
  <div className="w-full space-y-4 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
    ))}
  </div>
)

const SearchResultPage = () => {
  // ✅ Initialize arrays to prevent undefined checks
  const [propertyData, setPropertyData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [propertyResult, setPropertyResult] = useState([])
  const [filteredData, setFilteredData] = useState([])
  
  const router = useRouter()
  const { query } = router
  const [auth] = useAuth()
  const user = auth?.userResult?._id
  
  const [totalPropertyCount, setTotalPropertyCount] = useState(0)
  const [filterQuery, setFilterQuery] = useState({})
  const [appliedFilter, setAppliedFilter] = useState([])
  const [residential, setResidential] = useState(false)
  const [commercial, setCommercial] = useState(false)
  const [industrial, setIndustrial] = useState(false)
  const [agricultural, setAgricultural] = useState(false)
  const [noMoreToShow, setNoMoreToShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true)
  const windowWidth = useWindowWidth()
  const [currentPage, setCurrentPage] = useState(1)
  const [loadMore] = useState(false)
  const [nextPageAvailable, setNextPageAvailable] = useState(1)
  const userType = auth?.userResult?.userType
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(true)
  }, [])

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  // ✅ Memoized load more function
  const loadMoreProperties = useCallback(() => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)

    makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      process.env.NEXT_PUBLIC_SEARCH_PROPERTY_API_PATH,
      { params: { ...query, page: nextPage, size: 10, userID: user } }
    ).then((response) => {
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
  }, [currentPage, query, user])

  const updateState = useCallback((newFilterQuery) => {
    setFilterQuery(newFilterQuery)
  }, [])

  // ✅ Fetch query data with proper error handling
  const fetchQueryData = useCallback(async () => {
    setLoading(true)
    setNoMoreToShow(false)

    setResidential(false)
    setCommercial(false)
    setIndustrial(false)
    setAgricultural(false)

    if (Object.keys(query).length === 0) {
      setLoading(false)
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
      const response = await makeApiRequest(
        process.env.NEXT_PUBLIC_GET_METHOD,
        process.env.NEXT_PUBLIC_SEARCH_PROPERTY_API_PATH,
        { params: { ...query, page: pageNum, size: size, userID: user } }
      )

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
    } catch (error) {
      console.error(error)
      setPropertyResult([])
      setTotalPropertyCount(0)
    } finally {
      setLoading(false)
    }
  }, [query, user, residentialText, commercialText, industrialText, agriculturalText])

  useEffect(() => {
    fetchQueryData()
  }, [fetchQueryData])

  // ✅ Sync filtered data with property results
  useEffect(() => {
    if (propertyResult) {
      setFilteredData(propertyResult)
    } else {
      setFilteredData([])
    }
  }, [propertyResult])

  // ✅ Fetch featured and recommended data separately
  useEffect(() => {
    const fetchAllListings = async () => {
      if (!auth?.userResult?._id) {
        setIsLoadingFeatured(false)
        return
      }

      setIsLoadingFeatured(true)
      try {
        const user_id = auth?.userResult?._id
        const [featuredListings, recommendedListings] = await Promise.all([
          fetchFeaturedData(),
          fetchRecommendedData(user_id),
        ])

        setFeaturedProperties(featuredListings || [])
        setPropertyData(recommendedListings || [])
        setProjectData(recommendedListings || [])
      } catch (error) {
        console.error('Failed to fetch listings:', error)
      } finally {
        setIsLoadingFeatured(false)
      }
    }

    fetchAllListings()
  }, [auth?.userResult?._id])

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
            {windowWidth <= 1024 && (
              <div className="flex justify-between mb-2 px-2">
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

            {/* ✅ Show skeleton while loading to prevent CLS */}
            {/* {true ? ( */}
            {loading ? (
              <div className='w-full'>
                   <div className=" mt-6 md:mt-0 ml-2 mr-6 md:mr-4 lg:mr-0">
                       <div
          className={` lg:min-w-[700px] mt-0 lg:mt-2 max-sm:mt-4`}
          style={{
            maxHeight: '1200px',
            minHeight: '400px',
            position: 'relative',
            overflow: 'auto'
          }}
        >
<div className="rounded-xl mr-3 ml-1">
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />
              <SearchResultCardSkeleton />


            </div>
            </div>
            </div>
            </div>



            ) : (
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
            )}
          </div>
        </div>

        {/* ✅ MUI Drawer optimized for performance */}
        {windowWidth <= 1024 && (
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            variant="temporary"
            style={{ zIndex: 100 }}
            keepMounted={false} // ✅ Only mount when opened
            disablePortal={false}
            ModalProps={{
              keepMounted: false, // ✅ Improve performance
            }}
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

      {/* ✅ Always reserve space for featured section to prevent CLS */}
      <div
        className="custom-section relative"
        style={{
          minHeight: '600px',
          position: 'relative',
        }}
      >
        {/* ✅ Use Next.js Image for better optimization */}
        <Image
          src={FilterBackground}
          alt="Background"
          fill
          sizes="100vw"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
          priority={false}
          quality={75}
        />

        <div className="relative z-10">
          {isLoadingFeatured ? (
            <FeaturedPropertiesSkeleton />
          ) : (
            <>
              {propertyData.length > 0 && (
                <div className="lg:w-[85%] m-auto">
                  <FeaturedProperties recommendProperties={propertyData} />
                </div>
              )}
              {featuredProperties.length > 0 && (
                <div className="lg:w-[85%] m-auto">
                  <FeaturedProperties featuredProperties={featuredProperties} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResultPage
