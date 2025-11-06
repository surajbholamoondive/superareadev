import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'
import EditPage from '@/components/Agent/Edit'
import DeleteModal from '@/components/Agent/Listing/DeleteModal'
import EditModal from '@/components/EditModal'
import ListingDeatails from '@/components/MDListing/ListingDetails'
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
const {verifiedListingRoute,agentLeadsRoute,deletedPropertyRoute}=AGENT_MODULE?.AGENT_MY_LISTING_PAGE?.routes
const {myListingText,propertyDeletedText,}=AGENT_MODULE?.AGENT_MY_LISTING_PAGE?.text
const {getType,enquiredText,wishlistedText,viewedText,loadMoreText,putType}=GLOBALLY_COMMON_TEXT?.text
const agentFilterListing = ({
  status,
  clicked,
  setClicked,
  setNoData,
}) => {
  const [listings, setListings] = useState([])
  const [userId, setUserId] = useState('')
  const [nextPage, setNextPage] = useState(0)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [propertyToEdit, setPropertyToEdit] = useState(null)
  const [data, setData] = useData()
  const [auth] = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const logger = getLogger()
  const type = auth?.userResult?.userType
  const router = useRouter()
  const { query } = router
  const { days = 90, city = '' } = query
  const mVerify = 'm-verify'
  useEffect(() => {
    fetchListingData()
  }, [auth, clicked, userId, query])

  const updateQueryParams = (newParams) => {
    const { page, ...queryParams } = router.query
    const updatedQuery = { ...queryParams, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })
    router.push({ pathname: agentLeadsRoute, query: updatedQuery })
  }

  const fetchListingData = async () => {
    try {
      const pageNum = 1
      const size = 15
      const response = await makeApiRequest(
        getType,
        `${verifiedListingRoute}?pageNumber=${pageNum}&size=${size}&status=${status}&city=${encodeURIComponent(city)}&days=${days}`
      )
      if (response) {
        setIsLoading(false)
      }
      const { data } = response || {}
      const { result } = data || {}
      const { listing } = result || {}
      const { nextPage } = result || 0
      setNextPage(nextPage)
      setListings(listing)
      if(listing.length===0){
        setNoData(true)
      } else {
        setNoData(false)
      }
    } catch (error) {
      logger.error('Error fetching listing data:', error)
    }
  }
  const loadMoreProperties = () => {
    const size = 15
    makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      `${verifiedListingRoute}?pageNumber=${nextPage}&size=${size}&status=${status}`
    ).then((response) => {
      if (response) {
        setIsLoading(false)
        const { data } = response || {}
        const { result } = data || {}
        const { listing } = result || {}
        const { nextPage } = result || 0
        setNextPage(nextPage)
        setListings((prevListing) => [...prevListing, ...listing])
      }
    })
  }
 
  const handleDelete = async (propertyId) => {
    setPropertyToDelete(propertyId)
    setShowDeleteConfirmation(true)
  }
  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
    setPropertyToDelete(null)
  }

  const handleEdit = (ID, property) => {
    setData(property)
    const propertyId = encodeURIComponent(ID)
    const newUrl = `${window.location.pathname}?propertyId=${propertyId}`
    window.history.pushState({ path: newUrl }, '', newUrl)
    setPropertyToEdit(ID)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setData({})
    setIsModalOpen(false)
  }

  const confirmDelete = async () => {
    try {
      const response = await makeApiRequest(
        putType,
        `${deletedPropertyRoute}?propertyId=${propertyToDelete}`
      )
      setListings(
        listings.filter((property) => property._id !== propertyToDelete)
      )
      setClicked(true)
      setShowDeleteConfirmation(false)
      toast.success(propertyDeletedText)
    } catch (error) {
      logger.error('Error deleting property:', error)
    }
  }
  const handleEnquired = (id) => {
    const activity = enquiredText
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
      listingtype:myListingText
    }
    updateQueryParams({ ...params })
  }
  const handleWishlisted = (id) => {
    const activity = wishlistedText
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
      listingtype:myListingText
    }
    updateQueryParams({ ...params })
  }
  const handleViewed = (id) => {
    const activity = viewedText
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
      listingtype:myListingText
    }
    updateQueryParams({ ...params })
  }
  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='overflow-y-auto overflow-x-hidden custom-scrollbar w-fit ' style={{ width: '100%' }}>
      {listings?.map((listing, index) => (
        <div key={index} className="cursor-pointer px-[12px]">
          <ListingDeatails
            setUserId={setUserId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleEnquired={handleEnquired}
            handleWishlisted={handleWishlisted}
            handleViewed={handleViewed}
            property={listing}
            type={type}
            mVerify={mVerify}
            sidetrayDisable={true}
          />
          <div>
            {isModalOpen &&
              propertyToEdit &&
              propertyToEdit === listing._id && (
                <EditModal
                  onClose={handleCloseModal}
                  Component={EditPage}
                  type="user"
                  id={data}
                  setData={setData}
                ></EditModal>
              )}
          </div>
          <DeleteModal
            open={showDeleteConfirmation}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
            propertyId={listing._id}
          />
        </div>
      ))}

      {nextPage && (
        <button
          className="mt-4 rounded-lg flex items-center justify-center  border-[1px] bg-red-800 text-white text-[16px] w-[8vw] h-[5vh] "
          onClick={loadMoreProperties}
        >
          {loadMoreText}
        </button>
      )}
    </div>
  )
}

export default agentFilterListing
