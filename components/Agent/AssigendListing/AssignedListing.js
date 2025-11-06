import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import Loading from '@/pages/loading'
import { makeApiRequest } from '@/utils/utils'
import ListingDeatails from '@/components/MDListing/ListingDetails'
import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown.jsx'
import NoDataInfo from '../../Admin/my-m-associates/NoDataInfo.js'
import KycModal from '../modal'
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2.js'
const {getType,enquiredText,wishlistedText,leadsText}=GLOBALLY_COMMON_TEXT?.text
const {text,routes}=AGENT_MODULE?.AGENT_ASSIGNED_LISTING_PAGE
const {assignedListingsText,assignedListingText,newestText,oldestText,sortbyText}=text
const {assignedListingRoute}=routes
import EditPage from '@/components/Agent/Edit'
import { useData } from '@/context/data.js'
import EditModal from '@/components/EditModal/index.js'

const AssignedListing = ({ data }) => {
  const router = useRouter()
  const { query } = router
  const [listings, setListings] = useState(data)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('sort_by')
  const [isKycUpdateModalOpen, setKycUpdateModalOpen] = useState(false)
  const [auth] = useAuth()
  const [selectedValue, setSelectedValue] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [propertyToEdit, setPropertyToEdit] = useState(null)
  const [Data, setData] = useData()

  const dropdownValues = [newestText, oldestText]

  useEffect(() => {
    if (auth?.userResult?.isKycVerified === false) {
      setKycUpdateModalOpen(true)
    }
  }, [auth.userResult])

  const handleModalClose = () => {
    setKycUpdateModalOpen(false)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
  }

  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })
    router.push({ pathname: leadsText, query: updatedQuery })
  }
  const fetchData = async () => {
    const queryParams = {
      ...(sortBy ? { sortBy: sortBy } : ''),
    }
    const { data } = await makeApiRequest(
      getType,
      assignedListingRoute,
      {
        params: queryParams,
      }
    )
    setListings(data?.result?.assignedListing)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [auth, query, sortBy])

  // const handleEdit = () => { }
  const handleEdit = (ID, property) => {
    setData(property)
    const propertyId = encodeURIComponent(ID)
    const newUrl = `${window.location.pathname}?propertyId=${propertyId}`
    window.history.pushState({ path: newUrl }, '', newUrl)
    setPropertyToEdit(ID)
    setIsModalOpen(true)
  }

const handleCloseModal = () => {
  // setData({})
  setIsModalOpen(false)
}

  const handleEnquired = (id) => {
    const activity = enquiredText
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
      listingtype:assignedListingsText
      
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
      listingtype:assignedListingsText
    }
    updateQueryParams({ ...params })
  }

  const handleDelete = () => { }
  return (
    <div className="flex bg-white m-auto rounded-lg ">
      {isKycUpdateModalOpen && <KycModal onClose={handleModalClose} />}
      {loading ? (
        <div className="m-auto">
          <Loading />
        </div>
      ) : listings?.length > 0 ? (
        <div style={{ width: '100%' }}>
          <div className="flex justify-between my-[9px]">
            <div>
              <h3 className='font-bold'>
                {assignedListingText} ({listings?.length})
              </h3>
            </div>
            <MDSelectDropdown
              byDefaultText={sortbyText}
              values={dropdownValues}
              onClick={handleSortChange}
              inlineCSS={{
                 width: '140px',
                textAlign: 'left',
                padding: '7.95px',
                borderRadius: '6.5px',
                marginLeft: '6px',
                marginRight: '23px',
                fontSize: '0.875rem',
                height: "30px",
                dropdownFontSize: '0.875rem'
              }}
            />
          </div>
          <div className=' overflow-y-auto overflow-x-hidden p-2 custom-scrollbar'>
            {listings?.map((listing, index) => (
              <div key={index} className="w-[100%] cursor-pointer">
                <ListingDeatails
                  handleWishlisted={handleWishlisted}
                  handleEnquired={handleEnquired}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  property={listing}
                  type={auth?.userResult?.userType}
                  handleOpen={() => handleOpen(listing)}
                  isBottomTray={true}
                />
                 <div>
            {isModalOpen &&
              propertyToEdit &&
              propertyToEdit === listing._id && (
                <EditModal
                  onClose={handleCloseModal}
                  Component={EditPage}
                  type="user"
                  id={Data}
                  setData={setData}
                ></EditModal>
              )}
          </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[490px] flex items-center ">
          <NoDataInfo />
        </div>
      )}
    </div>
  )
}

export default AssignedListing
