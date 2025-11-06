import React, { useEffect, useState,useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import {All_CITIES,DELETE_FINAL_MESSAGE,DELETE_MESSAGE,FILTERED_LISTING,GET_REQ,LEAD_REDIRECT_ROUTE,LEAD_TYPE,LEAD_TYPE_VIEWED,LEAD_TYPE_WISHLISTED,PUT_REQ,} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import PropertyModal from '@/components/Admin/Direct-Listing/PropertyModal.js'
import DeleteModal from '@/components/Agent/Listing/DeleteModal'
import ListingDeatails from '@/components/MDListing/ListingDetails.jsx'
import NoDataInfo from '../my-m-associates/NoDataInfo.js/index.js'
import Style from './Properties.module.css'
import _debounce from 'lodash/debounce'

const FilterListing = ({
  status,
  clicked,
  setClicked,
  selectedDays,
  selectedCity
}) => {
  const [listings, setListings] = useState([])
  const [userId, setUserId] = useState('')
  const [nextPage, setNextPage] = useState(0)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [auth, setAuth] = useAuth()
  const [propertyData, setPropertyData] = useState(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [noDataModal, setNoDataModal] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const logger = getLogger()
  const type = auth?.userResult?.userType
  const router = useRouter()

  const containerRef = useRef()
  const [_, setIsScrolling] = useState(false)
  const BUFFER_VALUE = 50

  const handleScroll = _debounce(async () => {
    const container = containerRef.current
    if (!container) return

    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - BUFFER_VALUE

    if (isAtBottom && !isLoadingMore &&nextPage!==null ) {
      setIsLoading(true)
      try {
        await loadMoreProperties()
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    }
    setIsScrolling(container.scrollTop > 0)
  }, 200)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

   useEffect(() => {
    fetchListingData()
  }, [auth, clicked, userId, selectedCity,selectedDays])
const updateQueryParams = (newParams) => {
    const { page, ...queryParams } = router.query
    const updatedQuery = { ...queryParams, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })
    router.push({ pathname: LEAD_REDIRECT_ROUTE, query: updatedQuery })
  }
  const handleOpen = (data) => {
    setOpen(true)
    setPropertyData(data)
  }
  const handleClose = () => {
    setOpen(false)
    setPropertyData(null)
  }
  const fetchListingData = async () => {
    try {
      const pageNum = 1
      const size = 15

      const queryParams = {
        pageNum: pageNum,
        size: size,
        status,
        ...(selectedCity && selectedCity !== All_CITIES
          ? { city: selectedCity }
          : 'All Cities'),
        ...(selectedDays && selectedDays ? { days: selectedDays } : '90'),
      }
      const response = await makeApiRequest(GET_REQ, FILTERED_LISTING, {
        params: queryParams,
      })
      if (response) {
        setIsInitialLoading(false)
      }
      const { data } = response || {}
      const { result } = data || {}
      const { listing } = result || {}
      const { nextPage } = result || 0
      setNextPage(nextPage)
      setListings(listing)
      if (listing.length === 0) {
        setNoDataModal(true)
      } else {
        setNoDataModal(false)
      }
    } catch (error) {
      logger.error('Error fetching listing data:', error)
      setIsInitialLoading(false)
    }
  }
  

  const loadMoreProperties = async() => {
    const size = 15
    setIsLoadingMore(true)
    makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      `${FILTERED_LISTING}?pageNumber=${nextPage}&size=${size}&status=${status}`
    ).then((response) => {
      if (response) {
        setIsLoading(false)
        const { data } = response || {}
        const { result } = data || {}
        const { listing } = result || {}
        const { nextPage } = result || 0
        setNextPage(nextPage)
        setListings((prevListing) => [...prevListing, ...listing])
        setIsLoadingMore(false)
      }
    })
  }
  const deleteProperty = async (propertyId) => {
    try {
      const response = await makeApiRequest(
        PUT_REQ,
        `property/delete-property?propertyId=${propertyId}`
      )
      return response?.data
      setListings(listings.filter((property) => property._id !== propertyId))
    } catch (error) {
      logger.error('error deleting property:', error)
      throw error
    }
  }
  const handleDelete = async (id) => {
    setPropertyToDelete(id)
    setShowDeleteConfirmation(true)
  }
  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
    setPropertyToDelete(null)
  }

  const confirmDelete = () => {
    deleteProperty(propertyToDelete)
    setShowDeleteConfirmation(false)
    setClicked(!clicked)
  }
  const handleEnquired = (id) => {
    const activity = LEAD_TYPE
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    }
    updateQueryParams({ ...params })
  }
  const handleWishlisted = (id) => {
    const activity = LEAD_TYPE_WISHLISTED
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    }
    updateQueryParams({ ...params })
  }
  const handleViewed = (id) => {
    const activity = LEAD_TYPE_VIEWED
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    }
    updateQueryParams({ ...params })
  }
  if (isInitialLoading) {
    return <Loading />
  }
  

  return (
    <div className=" flex flex-col justify-center items-center">
      <div
        className={` ${Style.propertiesContainer} lg:min-w-[700px] my-2 max-sm:mt-4 p-4 `}
        ref={containerRef}
        style={{
          maxHeight: '1200px',
          minHeight: '400px',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
      {noDataModal ? (
        <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[574px] flex items-center ">
          <NoDataInfo />
        </div>
      ) : (
        listings?.map((listing, index) => (
          <div key={index} className=" cursor-pointer">
            <ListingDeatails
              setUserId={setUserId}
              handleDelete={handleDelete}
              handleEnquired={handleEnquired}
              handleWishlisted={handleWishlisted}
              handleViewed={handleViewed}
              property={listing}
              type={type}
              handleOpen={() => handleOpen(listing)}
              bottomTrayDisabled={true}
            />
            <DeleteModal
              open={showDeleteConfirmation}
              id={listing?._id}
              cancelDelete={cancelDelete}
              confirmDelete={confirmDelete}
              footText={DELETE_FINAL_MESSAGE}
              headText={DELETE_MESSAGE}
            />
          </div>
        ))
      )}
      <PropertyModal
        open={open}
        handleClose={handleClose}
        propertyData={propertyData}
        type={type}
        clicked={clicked}
        setClicked={setClicked}
        listings={listings}
      />
  {nextPage !== null && isLoadingMore && <Loading />}
  </div>
    </div>
  )
}
export default FilterListing