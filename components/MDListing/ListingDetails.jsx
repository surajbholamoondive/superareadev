import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import pendingInfo from '@/assets/ButtonIcons/info-circle 1.svg'
import redInfo from '@/assets/ButtonIcons/redInfo.svg'
import blackPencil from '@/assets/ButtonIcons/Editpencilblack.svg'
import { useAuth } from '@/context/auth'
import { COMMERCIAL_LAND, PLOT } from '@/text'
import {
  GLOBALLY_COMMON_TEXT,
  SEARCH_RESULT_CARD_TEXTS,
  USER_MODULE,
} from '@/textV2'
import DateDisplay from '@/utils/CreatedAtDateConversion/createdAtDateConversion'
import { Modal } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import EditModal from '@/components/EditModal'
import DownArrow from '../../assets/DownArrow/DownArrow.svg'
import DownArrowPending from '../../assets/DownArrow/DownArrowPending.svg'
import shieldIcon from '../../assets/logo/verification-logo.svg'
import edit from '../../assets/moreIcon/Edit.svg'
import infoIcon from '../../assets/moreIcon/info-circle.svg'
import del from '../../assets/moreIcon/trash.svg'
import checkIcon from '../../assets/userDashboard/check.svg'
import ApprovedStepsBottomTray from '../BottomStepsTray/ApproveSteps'
import BottomStepsTray from '../BottomStepsTray/BottomStepsTray'
import NoticeTray from '../NoticeTray/NoticeTray'
import SearchResultCardComponent from '../SearchResultCardComponent/SearchResultCardComponent'
import SideTray from '../SideTray'

const {
  adminText,
  aprrovedText,
  pendingText,
  reviseText,
  rejectedText,
  verifiedText,
} = GLOBALLY_COMMON_TEXT?.text
const {
  assignedListingText,
  listingApprovalText,
  listingApprovedText,
  listingPendingText,
  listingRejectedText,
  mVerificationText,
} = USER_MODULE?.USER_MY_LISTING_PAGE?.text
const ListingDeatails = ({
  setUserId,
  bottomTrayDisabled = false,
  setPropertyId,
  property,
  index,
  type,
  propertyToEdit,
  isModalOpen,
  handleViewed,
  EditPage,
  handleEnquired,
  handleEdit,
  handleDelete,
  handleWishlisted,
  handleCloseModal,
  handleOpen,
  mVerify,
  setAssociateclick,
  sidetrayDisable,
}) => {
  const [openSection, setOpenSection] = useState(
    property?.approvalStatus?.status === pendingText
      ? listingApprovalText
      : property?.mVerifiedStatus === pendingText
        ? mVerificationText
        : null
  )



  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null)
    } else {
      setOpenSection(section)
    }
  }
  const [open, setOpen] = useState(false)
  const [auth] = useAuth()
  const { userResult } = auth || {}
  const [isReviewComplete, setIsReviewComplete] = useState(
    property?.mVerificationDetails?.mVerificationReport
  )
  const isLand =
    property?.propertySubType === PLOT ||
    property?.propertySubType === COMMERCIAL_LAND
  let statusText
  let statusClass
  if (property?.approvalStatus?.status === aprrovedText) {
    statusText = listingApprovedText
    statusClass = 'text-[#C88E20] bg-[#DDBB78]'
  } else if (property?.approvalStatus?.status === rejectedText) {
    statusText = listingRejectedText
    statusClass = ' text-red-800 bg-[#FFC3BB]'
  } else if (property?.approvalStatus?.status === reviseText) {
    statusText = listingPendingText
    statusClass = 'text-[#C88E20] bg-[#DDBB78] '
  } else {
    statusText = listingPendingText
    statusClass = 'text-[#C88E20] bg-[#DDBB78] '
  }
  const closeModal = () => {
    setOpen(false)
    setOpenSection(null)
  }
  const { areaDetail } = property || {}
  const filteredDetail = areaDetail?.filter((detail) => detail.display)
  let propertySize, propertySizeUnit

  if (property?.propertySize) {
    propertySize = property?.propertySize
    propertySizeUnit = property?.propertySizeUnit
  }
  else if (filteredDetail?.length > 0) {
     ({ propertySize, propertySizeUnit } = filteredDetail[0])
  }

  let imageArray = []
  property?.propertyImages?.forEach((element) => {
    imageArray.push(element.url)
  })
  property?.projectImages?.forEach((element) => {
    imageArray.push(element.url)
  })
  const addresslabel = property?.addressLabel || ''
  const bedroomCount = property?.bedroomCount || ''
  const slug = property?.slug;
  const bathroomCount = property?.bathroomCount || ''
  const furnishingStatus = property?.furnishingStatus || ''
  const propertyTitle = property?.propertyTitle || ''
  const salePrice = property?.salePrice || ''
  const rentPrice = property?.rentPrice || ''
  const projectDescription = property?.projectDescription || ''
  const propertyDescription = property?.propertyDescription || ''
  const propertyType = property?.propertyType || ''
  const projectType = property?.projectType || ''
  const propertySubType = property?.propertySubType || ''
  const projectSubType = property?.projectSubType || ''
  const postedBy = property?.postedBy?.userType || ''
  const postedByUser = property?.postedBy?._id || ''
  const firstName = property?.postedBy?.firstName || ''
  const lastName = property?.postedBy?.lastName || ''
  const isKycVerified = property?.postedBy?.isKycVerified || ''
  const projectName = property?.projectName || ''
  const addressLabel = property?.addressLabel || ''
  const mVerifiedStatus = property?.mVerifiedStatus || ''
  const assignedTo = property?.assignedTo || ''
  const createdAt = property?.createdAt || ''
  const profileImage = property?.postedBy?.profileImage || ''
  const daysAgo = DateDisplay(createdAt)
  const router = useRouter()
  const mScore = property?.mScore || ''
  const path = router.asPath
  const query = router.query


  return (
    <div style={{ width: '100%', overflow: 'auto' }}>

    
      <div key={index} className="flex item-center h-fit gap-3 mb-4">
        <div className={`mt-5 rounded-xl h-fit`} style={{ width: '100%' }}>
          {projectName && projectName != '' ? (
            <SearchResultCardComponent
              isProject={true}
              addresslabel={addressLabel}
            /> 
          ) : (
            <SearchResultCardComponent
              isProject={false}
              addresslabel={addresslabel}
              bedroomCount={bedroomCount}
              bathroomCount={bathroomCount}
              furnishingStatus={furnishingStatus}
              propertyTitle={propertyTitle}
              salePrice={salePrice}
              rentPrice={rentPrice}
              propertySize={propertySize}
              projectDescription={projectDescription}
              propertyDescription={propertyDescription}
              propertyType={propertyType}
              projectType={projectType}
              propertySubType={propertySubType}
              projectSubType={projectSubType}
              postedBy={postedBy}
              firstName={firstName}
              lastName={lastName}
              daysAgo={daysAgo}
              imageArray={imageArray}
              profileImage={profileImage}
              mVerifiedStatus={mVerifiedStatus}
              myListing={true}
              assignedTo={assignedTo}
              mScoreValue={mScore}
              mScore={true}
              propertySizeUnit={propertySizeUnit}   
              propertyUrl = {slug}
              />
            )}



          <div style={{
            border: '2px solid var(--secondary-color)',
            marginTop: '10px',
            // padding: '0.6rem',
            padding: '1rem',

            borderRadius: '1rem',
          }}>

            <div className="flex items-center  justify-between gap-2 w-full px-3 pb-4 pt-2 max-sm:flex-col max-sm:justify-around max-sm:px-2 ">
              <div className="flex gap-3">
                <div
                  className={`flex items-center rounded-md text-[#931602] text-[14px] max-lg:text-[12px] border border-transparent  bg-opacity-30 gap-1 box-content p-1 ${statusClass}`}

                  style={{ backgroundColor: 'var(--secondary-bg)' }}

                >
                  <p style={{ color: 'var(--secondary-color)', fontWeight: 600 }}>{statusText}</p>
                  {property?.approvalStatus?.status === aprrovedText && (
                    <Tooltip title={property?.approvalStatus.statusMessage}>
                      <Image
                        alt="Info Icon"
                        width={15}
                        height={15}
                        src={infoIcon}
                      />
                    </Tooltip>
                  )}
                  {property?.approvalStatus?.status === rejectedText && (
                    <Tooltip title={property?.approvalStatus.statusMessage}>
                      <Image
                        alt="Info Icon"
                        width={15}
                        height={15}
                        src={redInfo}
                      />
                    </Tooltip>
                  )}
                  {(property?.approvalStatus?.status === reviseText ||
                    property?.approvalStatus?.status === pendingText ||
                    !property?.approvalStatus?.status) && (
                      <Tooltip title={property?.approvalStatus?.statusMessage}>
                        <Image
                          alt="Info Icon"
                          width={15}
                          height={15}
                          src={pendingInfo}
                        />
                      </Tooltip>
                    )}
                  {type === adminText &&
                    property?.approvalStatus === aprrovedText && isKycVerified && (
                      <Image
                        onClick={handleOpen}
                        src={edit}
                        height={15}
                        width={15}
                        alt="Pencil Icon"
                      />
                    )}
                  {type === adminText &&
                    property?.approvalStatus === rejectedText && isKycVerified && (
                      <Image
                        onClick={handleOpen}
                        src={blackPencil}
                        height={15}
                        width={15}
                        alt="Pencil Icon"
                      />
                    )}
                  {type === adminText &&
                    property?.approvalStatus === reviseText && isKycVerified && (
                      <Image
                        onClick={handleOpen}
                        src={blackPencil}
                        height={15}
                        width={15}
                        alt="Pencil Icon"
                      />
                    )}
                  {type === adminText && isKycVerified && (
                    <Image
                      onClick={handleOpen}
                      src={blackPencil}
                      height={15}
                      width={15}
                      alt="Pencil Icon"
                    />
                  )}

                  {property?.postedBy?._id === auth?.userResult?._id && (
                    <>
                      {property?.approvalStatus.status === aprrovedText ? (
                        <button
                          onClick={() => toggleSection(listingApprovalText)}
                        >
                          <Image
                            alt="Arrow"
                            src={DownArrow}
                            width={10}
                            height={10}
                            className={`transition-all duration-500 ${openSection === listingApprovalText ? 'rotate-180' : ''}`}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleSection(listingApprovalText)}
                        >
                          <Image
                            alt="Pending arrow"
                            src={DownArrowPending}
                            width={10}
                            height={10}
                            className={`transition-all duration-500 ${openSection === listingApprovalText ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </>
                  )}
                </div>
                {property?.propertyStatus === 'up for sale' && !isLand && (
                  <div
                    className={`flex items-center rounded-md text-primary text-[14px] border border-transparent  gap-2 ${mVerifiedStatus === aprrovedText
                      ? 'bg-[#59B4C3] bg-opacity-30'
                      : 'bg-[#e9d0cc] '
                      }`}
                  >
                    <div className="flex items-center justify-between box-content mx-1 gap-1">
                      <Link
                        href={
                          SEARCH_RESULT_CARD_TEXTS.routes.superVerificationPath
                        }
                      >
                        <Image
                          alt="shield Icon"
                          src={shieldIcon}
                          width={13}
                          height={13}
                        />
                      </Link>
                      {mVerifiedStatus === aprrovedText ? (
                        <>
                          <Image
                            alt="check Icon"
                            src={checkIcon}
                            height={16}
                            width={16}
                          />
                          <span className="text-primary text-[14px] capitalize">
                            {verifiedText}
                          </span>
                          <Tooltip
                            title={property?.mVerificationDetails?.statusMessage}
                          >
                            <Image
                              alt="Info Icon"
                              width={15}
                              height={15}
                              src={infoIcon}
                            />
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <span className="text-[#C88E20] text-[14px] capitalize" style={{ fontWeight: 600 }}>
                            {pendingText}
                          </span>
                          <Tooltip
                            title={property?.mVerificationDetails?.statusMessage}
                          >
                            <Image
                              alt="Info Icon"
                              width={15}
                              height={15}
                              src={pendingInfo}
                            />
                          </Tooltip>
                        </>
                      )}
                      {property?.approvalStatus?.status === aprrovedText && (
                        <>
                          {(type !== adminText || mVerify) &&
                            (mVerifiedStatus === aprrovedText ? (
                              <button
                                onClick={() => toggleSection(mVerificationText)}
                              >
                                <Image
                                  alt="Arrow"
                                  src={DownArrow}
                                  width={10}
                                  height={10}
                                  className={`transition-all duration-500 ${openSection === mVerificationText ? 'rotate-180' : ''}`}
                                />
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleSection(mVerificationText)}
                              >
                                <Image
                                  alt="Pending arrow"
                                  src={DownArrowPending}
                                  width={10}
                                  height={10}
                                  className={`transition-all duration-500 ${openSection === mVerificationText ? 'rotate-180' : ''}`}
                                />
                              </button>
                            ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex item-center bg-grey-500 gap-4 max-sm:hidden ">
                {(userResult?._id === postedByUser ||
                  property?.mVerificationDetails?.isEditByAgent) && (
                    <button
                      onClick={() => {
                        handleEdit(property?._id, property)
                      }}
                    >
                      <Image alt="Edit Icon" src={edit} width={20} height={20} />
                    </button>
                  )}
                {userResult?._id === postedByUser && (
                  <button onClick={() => handleDelete(property?._id)}>
                    <Image alt="Delete Icon" src={del} width={17} height={17} />
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {openSection === listingApprovalText && !bottomTrayDisabled && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="lg:mb-[60px] max-lg:mb-[65px] max-md:mb-0">
                    <div className="max-md:mt-2">
                      <ApprovedStepsBottomTray
                        DATA={property}
                        userType={auth?.userResult?.userType}
                        isReviewComplete={isReviewComplete}
                        setIsReviewComplete={setIsReviewComplete}
                      />
                      {open && <Modal onClose={closeModal} />}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


            {<AnimatePresence>
              {openSection === mVerificationText &&
                !bottomTrayDisabled &&
                property?.approvalStatus?.status === aprrovedText &&
                property?.propertyStatus === 'up for sale' &&
                (query.page === assignedListingText || property?.isAgentRequired === true) && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="lg:mb-[60px] max-lg:mb-[65px] max-md:mb-0">
                      <NoticeTray
                        DATA={property}
                        isReviewComplete={isReviewComplete}
                        setIsReviewComplete={setIsReviewComplete}
                      />
                      <div className="max-md:mt-2">
                        <BottomStepsTray
                          DATA={property}
                          userType={auth?.userResult?.userType}
                          isReviewComplete={isReviewComplete}
                          setIsReviewComplete={setIsReviewComplete}
                        />
                        {open && <Modal onClose={closeModal} />}
                      </div>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>}


          </div>

          <div className="lg:hidden pt-[1px]">
            <SideTray
              setUserId={setUserId}
              setPropertyId={setPropertyId}
              id={property?._id}
              property={property}
              Viewed={handleViewed}
              Enquired={handleEnquired}
              Wishlisted={handleWishlisted}
              type={type}
              mVerify={mVerify}
            />
          </div>
          <div>
            {isModalOpen && propertyToEdit === property._id && (
              <EditModal
                onClose={handleCloseModal}
                Component={EditPage}
                type={type}
                id={property}
              ></EditModal>
            )}
          </div>
        </div>
        <div className="max-lg:hidden">
          <SideTray
            setUserId={setUserId}
            setPropertyId={setPropertyId}
            id={property?._id}
            property={property}
            Viewed={handleViewed}
            Enquired={handleEnquired}
            Wishlisted={handleWishlisted}
            type={type}
            mVerify={mVerify}
            setAssociateclick={setAssociateclick}
            sidetrayDisable={sidetrayDisable}
          />
        </div>
      </div>
    </div>
  )
}

export default ListingDeatails
