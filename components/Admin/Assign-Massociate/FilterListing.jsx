import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import {ASSIGN_ASSOCIATE_LISTINGS,All_CITIES,DELETE_FINAL_MESSAGE,DELETE_MESSAGE,GET_REQ,LEAD_REDIRECT_ROUTE,LEAD_TYPE,LEAD_TYPE_VIEWED,LEAD_TYPE_WISHLISTED,PUT_REQ,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import PropertyModal from '@/components/Admin/Direct-Listing/PropertyModal.js'
import DeleteModal from '@/components/Agent/Listing/DeleteModal'
import ListingDeatails from '@/components/MDListing/ListingDetails.jsx'
import NoDataInfo from '../my-m-associates/NoDataInfo.js'
import Style from './Properties.module.css'
import _debounce from 'lodash/debounce'
import { Box, Modal } from '@mui/material'
import AssignAgent from '@/components/SideTray/assignAgent'

const FilterListing = ({
  status,
  clicked,
  setClicked,
  selectedDays,
  selectedCity,
  setAssociateclick
}) => {
  const [listings, setListings] = useState([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [assignedData,setAssignedData]=useState()
  const [userId, setUserId] = useState('')
  const [nextPage, setNextPage] = useState(0)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [auth, setAuth] = useAuth()
  const [propertyData, setPropertyData] = useState(null)
  const [open, setOpen] = useState(false)
  const [noDataModal, setNoDataModal] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const [myStatusMessage, setMyStatusMessage] = useState('')
  const [newagent, setNewagent] = useState('')
  const logger = getLogger()
  const type = auth?.userResult?.userType
  const router = useRouter()

  const containerRef = useRef()
  const [_, setIsScrolling] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const BUFFER_VALUE = 50

  const handleScroll = _debounce(async () => {
    const container = containerRef.current
    if (!container) return

    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - BUFFER_VALUE

    if (isAtBottom && !isLoading &&nextPage!==null ) {
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
  
  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

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
  }, [auth, clicked, userId, selectedDays, selectedCity,setAssociateclick])

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
    setAssignedData(data)
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
        pageNumber: pageNum,
        size: size,
        status,
        ...(selectedCity && selectedCity !== All_CITIES
          ? { city: selectedCity }
          : {}),
        ...(selectedDays ? { days: selectedDays } : '90')
      }
      const response = await makeApiRequest(GET_REQ, ASSIGN_ASSOCIATE_LISTINGS, {
        params: queryParams
      })
      if (response) {
        setIsLoading(false)
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
    }
  }
  const loadMoreProperties = async () => {
    const size = 15
    makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      `${ASSIGN_ASSOCIATE_LISTINGS}?pageNumber=${nextPage}&size=${size}&status=${status}&city${selectedCity}&days${selectedDays}`
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

  const deleteProperty = async (propertyId) => {
    try {
      const response = await makeApiRequest(
        PUT_REQ,
        `property/delete-property?propertyId=${propertyId}`
      )
      setListings(listings.filter((property) => property._id !== id))
      return response?.data
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
  const handlePropertyModalClose = () => {
    setIsEditModalOpen(false)
    setClicked(!clicked)
  }

  return (
    <div className="flex flex-col justify-center items-center ">
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
                setAssociateclick={setAssociateclick}
                handleOpen={() => handleOpen(listing)}
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
          setMyStatusMessage={setMyStatusMessage}
          myStatusMessage={myStatusMessage}
          setIsEditModalOpen={setIsEditModalOpen}
          isEditModalOpen={isEditModalOpen}
          setAssigning={setAssigning}
          assigning={assigning}
          newagent={newagent}
          setNewagent={setNewagent}
        />
         {<Modal
              open={isEditModalOpen}
              onClose={closeEditModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="flex items-center justify-center overflow-y-auto outline-none max-h-[600px]"
            >
              <Box
                className={`bg-[#FFFFFF]  py-4 pb-5 rounded-2xl max-h-fit overflow-hidden overflow-y-scroll  ${Style.customScroll} max-w-fit w-[870px] pr-2 pl-1`}
              >   
              <AssignAgent
                  propertyid={assignedData?._id}
                  closeEditModal={handlePropertyModalClose}
                  setAssigning={setAssigning}
                  assigning={assigning}
                  propertyModalClose={ closeEditModal}
                  myStatusMessage={myStatusMessage}
                  newagent={newagent}
                  setNewagent={setNewagent}
                />
              </Box>
            </Modal>}
        {nextPage !== null && isLoading && <Loading />}
      </div>
    </div>
  )
}
export default FilterListing