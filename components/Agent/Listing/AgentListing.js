import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'
import EditPage from '@/components/Agent/Edit'
import Listing from '@/components/MDListing'
import KycModal from '../modal'
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
const {deletedPropertyRoute,getPostedPropertyRoute}=AGENT_MODULE?.AGENT_MY_LISTING_PAGE?.routes
const {myListingText,propertyDeletedText,}=AGENT_MODULE?.AGENT_MY_LISTING_PAGE?.text
const {putType,postType,agentText,enquiredText,wishlistedText,leadsText,}=GLOBALLY_COMMON_TEXT?.text
const AgentListing = ({data}) => {
  const [properties, setProperties] = useState(data)
  const [clicked,setClicked]=useState(false)
  const [auth] = useAuth()
  const windowWidth = useWindowWidth()
  const route = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [propertyToEdit, setPropertyToEdit] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [DATA, setDATA] = useData({})
  const [isKycUpdateModalOpen, setKycUpdateModalOpen] = useState(false)
  useEffect(() => {
    if (auth?.userResult?.isKycVerified === false) {
      setKycUpdateModalOpen(true)
    }
  }, [auth.userResult])
  const handleModalClose = () => {
    setKycUpdateModalOpen(false)
  }
  const logger = getLogger()
  const type = agentText
  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...route.query, ...newParams }

    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })
    route.push({ pathname: leadsText, query: updatedQuery })
  }

  useEffect(() => {
    makeApiRequest(postType, getPostedPropertyRoute)
      .then((response) => {
        const Result = response?.data?.result
        if (Array.isArray(Result)) {
          setProperties(Result)
        } else {
          logger.error('Property list response is not an array:', Result)
        }
      })
      .catch((error) => {
        logger.error('Error fetching property list:', error)
      })
  }, [])

  useEffect(() => {
    makeApiRequest(postType, getPostedPropertyRoute)
      .then((response) => {
        const Result = response?.data?.result
        if (Array.isArray(Result)) {
          setProperties(Result)
        } else {
          logger.error('Property list response is not an array:', Result)
        }
      })
      .catch((error) => {
        logger.error('Error fetching property list:', error)
      })
  }, [clicked])

  const handleEdit = (ID, property) => {
    setDATA(property)
    const propertyId = encodeURIComponent(ID)
    const newUrl = `${window.location.pathname}?propertyId=${propertyId}`
    window.history.pushState({ path: newUrl }, '', newUrl)
    setPropertyToEdit(ID)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const confirmDelete = async (propertyIndex) => {
    try {
      const response = await makeApiRequest(putType, `${deletedPropertyRoute}?propertyId=${propertyToDelete}`);
      setClicked(true);
      setShowDeleteConfirmation(false);
      if(response){
        const filteredData = properties.filter((property, index) => index !== propertyIndex)
        setProperties(filteredData)
        toast.success(propertyDeletedText);
      }
    } catch (error) {
      logger.error('Error deleting property:', error);
    }
  };
  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
    setPropertyToDelete(null)
  }
  const handleDelete = async (propertyId) => {
    setPropertyToDelete(propertyId)
    setShowDeleteConfirmation(true)
  }
  const handleEnquired = (id) => {
    const activity = enquiredText
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
      listingtype: myListingText,

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
      listingtype: myListingText,

    }
    updateQueryParams({ ...params })
  }
  return (
    <div className='m-auto rounded-md'>
      {isKycUpdateModalOpen && <KycModal onClose={handleModalClose} />}
              <Listing
                properties={properties}
                data={data}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                propertyToEdit={propertyToEdit}
                handleWishlisted={handleWishlisted}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleEnquired={handleEnquired}
                EditPage={EditPage}
                type={type}
                showDeleteConfirmation={showDeleteConfirmation}
                cancelDelete={cancelDelete}
                confirmDelete={confirmDelete}
              />
    </div>
  )
}

export default AgentListing
