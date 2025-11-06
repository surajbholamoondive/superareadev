import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import { GLOBALLY_COMMON_TEXT, USER_MODULE, ASSIGNED_LISTING_TEXT } from '@/textV2'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'
import EditPage from '@/components/Agent/Edit'
import Steps from '@/components/M-verification/Steps'
import Listing from '@/components/MDListing'
import MDSelectDropdown from "@/components/MDSelectDropdown/MDSelectDropdown";
const { upForRent, sellText, rentText, getType, postType, putType, enquiredText } = GLOBALLY_COMMON_TEXT?.text
const { oldestText, newestText } = ASSIGNED_LISTING_TEXT.text
const { text, routes } = USER_MODULE?.USER_MY_LISTING_PAGE
const { myListingText, propertyDeletedText } = text
const { deletedPropertyRoute, getMyListingRoute } = routes

const userListing = ({ Data }) => {
  const router = useRouter();
  const [DATA, setDATA] = useState({})
  const [properties, setProperties] = useState(Data)
  const [sortBy, setSortBy] = useState(router.query['sort-by'] || 'newest')
  const [auth] = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [propertyToEdit, setPropertyToEdit] = useState(null)
  const [open, setOpen] = useState(false)
  const route = useRouter()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [showVerification] = useState(false)
  const logger = getLogger()
  const [data, setData] = useData()
  const [clicked, setClicked] = useState(false)
  const windowWidth = useWindowWidth()
  const type = auth?.userResult?.userType
  const updateQueryParams = (newParams) => {
  const updatedQuery = { ...route.query, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })
    route.push({ pathname: 'enquiries-received', query: updatedQuery })
  }
  useEffect(() => {
    if (router.query) {
      handleListingData();
    }
  }, [router.query,]);
  useEffect(() => {
    handleListingData()
  }, [isModalOpen, clicked])

  const handleListingData = async () => {
    try {
      const queryParams = {
        'sort-by': sortBy,
      };
      const response = await makeApiRequest(getType, getMyListingRoute, { params: queryParams });
      const Result = response?.data?.result;
      setProperties(Result);
    } catch (error) {
      console.log(error)
      logger.error(error);
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await makeApiRequest(
        putType,
        `${deletedPropertyRoute}?propertyId=${propertyToDelete}`
      )
      setClicked(true)
      setShowDeleteConfirmation(false)
      toast.success(propertyDeletedText)
    } catch (error) {
      logger.error(error)
    }
  }

  const handleEnquired = (id) => {
    const activity = enquiredText
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
      sortingOrder: -1,
      listingtype: myListingText
    }
    updateQueryParams({ ...params })
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
  }
  const handleDelete = (propertyId) => {
    setPropertyToDelete(propertyId)
    setShowDeleteConfirmation(true)
  }

  const handleEdit = (ID, property) => {
    const { propertyStatus } = property
    if (propertyStatus) {
      setDATA({
        ...DATA,
        listing: propertyStatus === upForRent ? rentText : sellText,
      })
    }
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

  if (showVerification) {
    return (
      <Steps id={data?._id} DATA={data} property={data} setData={setData} />
    )
  }

  const handleSortChange = (value) => {
    if (setSortBy !== undefined) {
      setSortBy(value);
      try {
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query, 'sort-by': value || '',
          },
        });
      } catch (error) {
        logger.error(error);
      }
    }
  }
  const values = {
    'oldest': oldestText,
    'newest': newestText
  }
  const dropdownValues = Object.keys(values);
  const closeModal = () => {
    setOpen(false)
  }
  return (
    <div className="w-full m-auto rounded-md">
      <div className='flex justify-between'>
        {/* <h2 className='text-primary font-thin'>{text.my} <span className='text-[1.5rem] font-black text-primary'>{text.listings}</span></h2> */}
        <h2 className='text-primary font-thin'></h2>
        <div className='mb-2'>
          <MDSelectDropdown values={dropdownValues} onClick={handleSortChange} icon="https://cdn-icons-png.flaticon.com/256/60/60995.png" byDefaultText={sortBy ? sortBy : 'Sort-by'} inlineCSS={{
            width: '100px',
            textAlign: 'left',
            padding: '7.95px',
            borderRadius: '6.5px',
            marginLeft: '6px',
            marginRight: '23px',
            height: "30px",
            dropdownFontSize: '14px',
          }} />
        </div>
      </div>
      <Listing
        properties={properties}
        data={data}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        propertyToEdit={propertyToEdit}
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
export default userListing
