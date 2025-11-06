import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import { GLOBALLY_COMMON_TEXT, SINGLE_PROPERTY_VIEW_TEXT } from '@/textV2'
import getNearbyPlaces from '@/utils/OsmNearbyHelper/OsmNearbyPlaces'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'

import ImagePreviewModal from '@/components/ImageUpload/ImagePreviewModal'
import MapsModal from '@/components/MapModal/MapsModal'
import AgentForm from '@/components/SingleProperty/AgentForm'
import Amenities from '@/components/SingleProperty/Amenities'
import ImageGridSlider from '@/components/SingleProperty/carouselslick'
import Furnishingdetails from '@/components/SingleProperty/furnishingDetalis'
import MDContentSection from '@/components/SingleProperty/MDContentSection'
import OverView from '@/components/SingleProperty/OverView'
import PropertyInformation from '@/components/SingleProperty/PropertyInformation'
import PropertyLabelsSection from '@/components/SingleProperty/PropertyLabelsSection/Index'

import DeleteModal from '../Agent/Listing/DeleteModal'
import AskExplore from '../AskExplore'
import FaqPropertyTemplate from '../FAQTemplate/FaqPropertyTemplate'
import Featured from '../Featured'
import MDButton from '../MDButton/MDButton'
import StickyEmiCalculator from '../StickyEmiCalculator'

const {
  deletedText,
  furnishingDetailsText,
  superAreaAssociateText,
  overViewText,
  ownerOverViewText,
  propertyText,
  propertyInformationText,
  propertyDeletedSuccessText,
} = SINGLE_PROPERTY_VIEW_TEXT?.text
const { adminDirectListingRoute, deletePropertyRoute } =
  SINGLE_PROPERTY_VIEW_TEXT?.routes
const {
  putType,
  amenitiesText,
  deletePropertyText,
  deleteModalText,
  adminText,
  aprrovedText,
  deleteType,
} = GLOBALLY_COMMON_TEXT?.text
const OsmMapWithNearby = dynamic(
  () => import('@/components/OsmMapCard/OsmMapWithNearby'),
  { ssr: false }
)
const SinglePropertyFullView = ({
  propertyData,
  latitude,
  longitude,
  alreadySeen,
  totalViews,
  showRecommendation = true,
  isVisiable = true,
}) => {
  const {
    _id,
    propertyTitle,
    propertyDescription,
    propertyImages,
    propertyCoverImage,
    furnishingDetails,
    postedBy,
    amenities,
    propertyVideos,
    coordinates,
    assignedTo,
    isAgentRequired,
    approvalStatus,
  } = propertyData || {}

  const osmMapRef = useRef(null)
  const router = useRouter()
  const [auth] = useAuth()
  const { userType } = auth?.userResult || {}
  const userId = auth?.userResult?._id
  let { id } = router?.query
  if (Array.isArray(id) && id.length) {
    id = id[id.length - 1]
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [nearby, setNearby] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const logger = getLogger()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const nearby = await getNearbyPlaces(coordinates[0], coordinates[1])
        setNearby(nearby)
      } catch (error) {
        logger.error(error)
      }
    }
    fetchData()
  }, [coordinates])
  function handleAddressClick() {
    osmMapRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const coverImage = {
    url: propertyCoverImage
      ? propertyCoverImage
      : 'https://media.istockphoto.com/id/697705574/photo/3d-rendering-of-modern-cozy-house-summer-evening.jpg?s=2048x2048&w=is&k=20&c=3N7_B5OIy_LYLyBBuZZs5Ly87pS8IV_33Xh0XIWoRJE=',
    alt: 'Real estate Cover Image, mores cover image',
  }
  const rightImages = []
  propertyImages?.forEach((element) => {
    rightImages.push(element)
  })

  const handleImageClick = (index) => {
    let clickedImage
    if (index === 0) {
      clickedImage = coverImage
    } else if (index > 0 && index <= rightImages.length) {
      clickedImage = rightImages[index - 1]
    } else {
      return
    }
    if (clickedImage) {
      setSelectedImageIndex(index)
      setIsModalOpen(true)
    }
  }

  function handleMapClick() {
    setModalOpen(true)
  }

  const divRef = useRef(null)
  const handleClick = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true)
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  const confirmDelete = async (propertyId) => {
    try {
      await deleteProperty(propertyId)
    } catch (error) {
      logger.error(error)
    }
    setShowDeleteConfirmation(false)
  }

  const deleteProperty = async (propertyId) => {
    try {
      const response = await makeApiRequest(
        putType,
        `${deletePropertyRoute}?propertyId=${propertyId}`
      )
      toast.success(propertyDeletedSuccessText)
      router.push(adminDirectListingRoute)
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
  return (
    <div>
      <div>
        <div className="max-w-[1400px] m-auto md:mb-0 sm:mb-3 lg:mb-0">
          <ImageGridSlider
            id={_id}
            isProject={false}
            coverImage={coverImage}
            rightImages={rightImages}
            propertyVideos={propertyVideos}
            localityLat={latitude}
            localityLng={longitude}
            alreadySeen={alreadySeen}
            totalViews={totalViews}
            onImageClick={handleImageClick}
            onMapClick={() => handleAddressClick()}
          />
        </div>
        <ImagePreviewModal
          isOpen={isModalOpen}
          images={[...rightImages]}
          propertyVideos={propertyVideos}
          selectedIndex={selectedImageIndex}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedImageIndex(0)
          }}
          onNext={() => {
            setSelectedImageIndex((prevIndex) =>
              prevIndex === rightImages.length - 1 ? 0 : prevIndex + 1
            )
          }}
          onPrevious={() => {
            setSelectedImageIndex((prevIndex) =>
              prevIndex === 0 ? rightImages.length - 1 : prevIndex - 1
            )
          }}
          onSelect={(index) => {
            setSelectedImageIndex(index)
          }}
        />

        <PropertyLabelsSection
          propertyDetail={propertyData}
          handleClick={handleClick}
        />
        <div className="flex flex-col md:flex-row gap-2 max-w-[1400px] m-auto">
          <div className="w-full md:w-[60%]">
            {propertyData && (
              <MDContentSection
                title={propertyInformationText}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  bgColor: 'var(--secondary-bg)',
                  fontWeight: 'bold',
                }}
              >
                <PropertyInformation propertyDetail={propertyData} />
              </MDContentSection>
            )}
            <MDContentSection
              title={overViewText}
              inlineStyle={{
                textColor: 'var(--secondary-color)',
                bgColor: 'var(--secondary-bg)',
                fontWeight: 'bold',
              }}
            >
              <OverView details={propertyDescription} />
            </MDContentSection>

            {amenities && Object.keys(amenities).length > 0 && (
              <MDContentSection
                title={amenitiesText}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  bgColor: 'var(--secondary-bg)',
                  fontWeight: 'bold',
                }}
              >
                <Amenities amenities={amenities} />
              </MDContentSection>
            )}
            {furnishingDetails && Object.keys(furnishingDetails).length > 0 && (
              <MDContentSection
                title={furnishingDetailsText}
                inlineStyle={{
                  textColor: 'var(--secondary-color)',
                  bgColor: 'var(--secondary-bg)',
                  fontWeight: 'bold',
                }}
              >
                <Furnishingdetails furnishingDetails={furnishingDetails} />
              </MDContentSection>
            )}
            {propertyData && (
              <div className={` ${divRef && 'mt-5'}`} ref={divRef} id="contact">
                <MDContentSection
                  title={
                    isAgentRequired ? superAreaAssociateText : ownerOverViewText
                  }
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    bgColor: 'var(--secondary-bg)',
                    fontWeight: 'bold',
                  }}
                >
                  <AgentForm
                    isAgentReq={isAgentRequired}
                    agent={assignedTo ? assignedTo : postedBy}
                    id={_id}
                  />
                </MDContentSection>
              </div>
            )}
            <div
              className="mt-6 px-1 md:px-7 max-w-[1400px]"
              ref={osmMapRef}
              onClick={handleMapClick}
            >
              <OsmMapWithNearby
                height={420}
                localityLat={coordinates[0]}
                localityLng={coordinates[1]}
                nearby={nearby}
                property={propertyTitle}
              />
            </div>
            <div id="faqs">
              <MDContentSection
                title={`${propertyData?.propertyTitle} FAQs`}
                inlineStyle={{ textColor: '#931602' }}
              >
                <FaqPropertyTemplate propertyData={propertyData} />
              </MDContentSection>
            </div>
          </div>
          <div className="w-full md:w-[40%] min-h-[100vh] md:mt-3 mt-0 px-3 md:px-7  ">
            <StickyEmiCalculator />
            <Featured />
            <AskExplore />
            {userType === adminText &&
              isVisiable &&
              approvalStatus?.status !== deletedText && (
                <div className="flex justify-end my-16 mx-10">
                  <MDButton
                    text={deleteType}
                    inlineCSS={{
                      backgroundColor: 'rgba(147, 22, 2, 0.9)',
                      hover: true,
                      borderStyle: '1px solid #931602',
                      borderRadius: '5px',
                    }}
                    onClick={() => openDeleteConfirmation()}
                  />
                  <DeleteModal
                    open={showDeleteConfirmation}
                    id={_id}
                    cancelDelete={cancelDelete}
                    confirmDelete={() => confirmDelete(_id)}
                    footText={deletePropertyText}
                    headText={deleteModalText}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <MapsModal
          localityLat={coordinates[0]}
          localityLng={coordinates[1]}
          nearby={nearby}
          property={propertyTitle}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  )
}

export default SinglePropertyFullView
