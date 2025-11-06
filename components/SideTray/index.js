import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Wishlist from '@/assets/AmenitiesIcons/heartSideTray.svg'
import blackPencil from '@/assets/ButtonIcons/Editpencilblack.svg'
import eye from '@/assets/moreIcon/viewed.svg'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import { INDIVIDUAL_TEXT } from '@/text'
import { GLOBALLY_COMMON_TEXT, MY_LISTING_TEXT } from '@/textV2'
import DateDisplay from '@/utils/CreatedAtDateConversion/createdAtDateConversion'
import { makeApiRequest } from '@/utils/utils'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Tooltip from '@mui/material/Tooltip'


import User from '../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import MoresLogo from '../../assets/logo/logo-icon.svg'
import MoresIcon from '../../assets/logo/main-logo.svg'
import enquired from '../../assets/moreIcon/Enquired.svg'
import AssignAgent from './assignAgent'
import styles from './index.module.css'
import OwnerDetail from './OwnerDetail'

const {
  assignAssociateText,
  assignedAssociateText,
  associateText,
  directListing,
  notAssignedyetText,
  unauthorizedText,
} = MY_LISTING_TEXT?.sidetray
const {
  adminText,
  agentText,
  individualText,
  enquiredText,
  wishlistedText,
  superAreaText,
  viewedText,
  postType,
} = GLOBALLY_COMMON_TEXT?.text
const SideTray = ({
  id,
  setPropertyId,
  Enquired,
  Wishlisted,
  type,
  Viewed,
  property,
  setUserId,
  mVerify,
  setAssociateclick,
  sidetrayDisable,
}) => {
  const router = useRouter()
  const [propertyViews, setPropertyViews] = useState(0)
  const [propertyWishlisted, setPropertyWishlisted] = useState(0)
  const [propertyEnquired, setPropertyEnquired] = useState(0)
  const logger = getLogger()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false)
  const { firstName, lastName, profileImage } = property?.postedBy || ''
  const [auth] = useAuth()
  const { userType } = auth?.userResult || {}
  const isAuthorizedForView = type === adminText && !sidetrayDisable
  const isAuthorizedForWishlist =
    type === adminText || (type === agentText && !sidetrayDisable)
  const unauthorizedMessage = unauthorizedText
  const openEditModal = () => {
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }
  const closeOwnerModal = () => {
    setIsOwnerModalOpen(false)
  }
  const daysAgo = DateDisplay(property?.createdAt)
  useEffect(() => {
    fetchPropertyCounts(property)
  }, [])

  const fetchPropertyCounts = async (property) => {
    try {
      const response = await makeApiRequest(
        postType,
        '/property/get-passed-sidetrayCounts',
        { _id: property._id }
      )
      setPropertyViews(response?.data?.result.PropertyViewersCount)
      setPropertyWishlisted(response?.data?.result.PropertyWishlistedCount)
      setPropertyEnquired(response?.data?.result.PropertyEnquiredCount)
    } catch (err) {
      logger.error(err)
    }
  }
  const {
    firstName: FirstName,
    lastName: LastName,
    profileImage: ProfileImage,
  } = property?.mVerificationDetails?.liveCameraVerification?.assignedTo ||
  property?.assignedTo ||
  ''

  const handleChangeUserType = () => {
    setIsOwnerModalOpen(true)
  }
  return (
    <>
      <div>
        <div className="flex-col max-md:flex-col max-lg:gap-3 max-lg:flex max-lg:flex-row max-lg:justify-center items-center mt-5">
          <div className="max-lg:flex  max-lg:justify-evenly max-lg:gap-3 max-lg:items-center ">
            <div className="flex gap-1 bg-nearbySelectedBackground items-center rounded-lg border-2 border-primary py-1 px-[2px] h-10 w-[135px] mb-4   lg:hidden">
              <div className="relative h-7 w-7   ">
                <Image
                  alt="User icon"
                  src={profileImage ? profileImage : User}
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="flex-col">
                <p className=" break-words line-clamp-1  h-[14px] text-[12px]">
                  {' '}
                  {`${firstName && firstName} ${lastName && lastName}`}
                </p>
                <p className="text-[9px] text-primary mt-[4px] line-clamp-1">
                  {' '}
                  {daysAgo}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start rounded-lg border-2 border-[#931602]  py-2 h-10 w-[145px] mb-4  leading-tight">
              <>
                {mVerify ? (
                  <>
                    {property?.mVerificationDetails?.liveCameraVerification
                      ?.assignedTo || property?.assignedTo ? (
                      <div className="flex items-center gap-[3px]">
                        <div className="relative rounded-full h-7 w-7 ">
                          <Image
                            alt="User icon"
                            src={ProfileImage || User}
                            fill
                            className="rounded-full "
                          />
                        </div>
                        <div className="flex-col">
                          <div className=" font-bold text-[12px] h-[14px]">
                            <p className="text-[12px]">{`${FirstName && FirstName} ${LastName && LastName}`}</p>
                          </div>
                          <span className="text-[9px] text-primary">
                            {assignAssociateText}
                          </span>
                        </div>
                        {type === adminText && (
                          <Image
                            className={`${property?.mVerificationDetails?.liveCameraVerification?.assignedTo ? '' : ''}`}
                            onClick={openEditModal}
                            src={blackPencil}
                            height={14}
                            width={14}
                            alt="Pencil Icon"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="relative rounded-full w-[25px] h-[25px]">
                          <Image alt="User icon" src={User} fill />
                        </div>
                        <div
                          className={`flex items-center text-[9px] ${type === adminText ? '-pb-2 ' : ''}`}
                        >
                          <div
                            className={`${type !== adminText ? 'pt-[4.2px]' : ''}`}
                          >
                            <p className="font-bold h-[12px] text-[12px] capitalize">
                              {notAssignedyetText}
                            </p>
                            <p
                              className={`text-[9px]  ${type === adminText && !property?.mVerificationDetails?.liveCameraVerification?.assignedTo ? '' : 'pt-[1.5px]'}`}
                            >
                              {type === adminText &&
                              !property?.mVerificationDetails
                                ?.liveCameraVerification?.assignedTo
                                ? assignAssociateText
                                : associateText}
                            </p>
                          </div>
                          {type === adminText && (
                            <Image
                              className={`cursor-pointer ml-1 ${property?.mVerificationDetails?.liveCameraVerification?.assignedTo ? '' : ''}`}
                              onClick={openEditModal}
                              src={blackPencil}
                              height={14}
                              width={14}
                              alt="Pencil Icon"
                            />
                          )}
                          <div
                            className={`${type !== adminText ? 'pt-[8px]' : ''}`}
                          >
                            <div
                              className={`flex align-baseline gap-1 ${type !== adminText ? '-mt-[9.5px] ml-[1px]' : ''} ${type === adminText && !property?.mVerificationDetails?.liveCameraVerification?.assignedTo ? '-mt-[6px] mb-1 ' : ''}`}
                            >
                              {type === adminText &&
                              !property?.mVerificationDetails
                                ?.liveCameraVerification?.assignedTo ? null : (
                                <Image
                                  src={MoresIcon}
                                  alt="MoresIcon"
                                  width={8}
                                  height={8}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : !property?.isAgentRequired ? (
                  <div className="flex items-center pl-2">
                    <Image
                      alt="Mores logo"
                      src={MoresLogo}
                      width={21}
                      height={19}
                      className="mr-2"
                    />
                    <div className="flex-col">
                      <div className="flex items-center font-bold text-[12px]">
                        <p className="text-[12px]">{superAreaText}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-[9px]">{directListing}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {property?.assignedTo ? (
                      <div className="flex items-center gap-1 px-1">
                        <div className="relative h-7 w-7">
                          <Image
                            alt="User icon"
                            src={property.assignedTo.profileImage || User}
                            fill
                            className="rounded-full m-auto"
                          />
                        </div>
                        <div className=" flex-col relative  ">
                          <div className="font-bold text-[12px] flex">
                            <p className="text-[12px]">
                              {(() => {
                                const fullName =
                                  `${property?.assignedTo?.firstName || ''} ${property?.assignedTo?.lastName || ''}`
                                    .toLowerCase()
                                    .replace(/\b\w/g, (char) =>
                                      char.toUpperCase()
                                    )
                                    .trim()

                                return fullName.length > 13
                                  ? fullName.slice(0, 11) + '...'
                                  : fullName
                              })()}
                            </p>

                            {property?.postedBy?._id ===
                              auth?.userResult?._id && (
                              <Image
                                src={eye}
                                width={12}
                                height={20}
                                alt="view icon"
                                className="absolute  top-1 -right-4 cursor-pointer "
                                onClick={() => handleChangeUserType()}
                              />
                            )}
                          </div>
                          <p className="text-primary text-[9px]">
                            {assignedAssociateText}
                          </p>
                        </div>

                        {type === adminText && (
                          <Image
                            className={`${property?.assignedTo ? '' : ''}`}
                            onClick={openEditModal}
                            src={blackPencil}
                            height={14}
                            width={14}
                            alt="Pencil Icon"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="relative w-[25px] h-[25px] rounded-full">
                          <Image
                            alt="User icon"
                            src={User}
                            fill
                            className="ml-[2px]"
                          />
                        </div>
                        <div
                          className={`flex items-center ${type === adminText ? '-pb-2 ' : ''}`}
                        >
                          <div>
                            <p className={`text-[12px]  capitalize`}>
                              {' '}
                              {notAssignedyetText}
                            </p>
                            <p
                              className={`text-[9px]  ${type === adminText && !property?.assignedTo ? '' : 'pt-[1.5px]'}`}
                            >
                              {type === adminText && !property?.assignedTo
                                ? assignAssociateText
                                : associateText}
                            </p>
                          </div>
                          {type === adminText && (
                            <div className="ml-1">
                              <Image
                                className={`cursor-pointer ${property?.assignedTo ? '' : ''}`}
                                onClick={openEditModal}
                                src={blackPencil}
                                height={14}
                                width={14}
                                alt="Pencil Icon"
                              />
                            </div>
                          )}

                          <div
                            className={`${type !== adminText ? 'pt-[8px]' : ''}`}
                          >
                            <div
                              className={`flex align-baseline gap-1 ${type !== adminText ? '-mt-[9.5px] ml-[1px]' : ''} ${type === adminText && !property?.assignedTo ? '-mt-[6px] mb-1 ' : ''}`}
                            >
                              {/* {type === adminText && !property?.assignedTo ? null : <Image src={MoresIcon} alt="MoresIcon" width={8} height={8} />} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>{' '}
            </div>
          </div>
          <div className=" max-lg:flex max-lg:items-center max-lg:gap-2 max-lg:justify-evenly max-lg:-mt-5">
            <Tooltip
              title={!isAuthorizedForView ? unauthorizedMessage : ''}
              placement="top"
            >
              <div
                onClick={() => {
                  isAuthorizedForView && !sidetrayDisable && Viewed(id)
                }}
                className={`flex  justify-between items-center rounded-lg border-2 +    ${
                  isAuthorizedForView
                    ? 'border-[#8B0000] bg-transparent cursor-pointer'
                    : 'border-[#8B0000] bg-transparent cursor-not-allowed'
                }  py-2 px-2 h-10 mb-4 mt-[20px] text-xs`}
              >
                <div className="flex items-center">
                  <Image
                    alt="icon"
                    src={eye}
                    width={20}
                    height={10}
                    className="mr-2"
                  />
                  <p className="max-sm:hidden sm:pr-2 capitalize">
                    {viewedText}{' '}
                  </p>
                </div>
                <div className="flex items-center h-fit gap-2">
                  <p>{propertyViews || 0}</p>
                </div>
              </div>
            </Tooltip>
            <Tooltip
              title={!isAuthorizedForWishlist && unauthorizedMessage}
              placement="top"
            >
              <div
                onClick={() => {
                  isAuthorizedForWishlist && !sidetrayDisable && Wishlisted(id)
                }}
                className={`flex  justify-between items-center rounded-lg border-2 +    ${
                  isAuthorizedForWishlist
                    ? 'border-[#8B0000] bg-transparent cursor-pointer'
                    : 'border-[#8B0000] bg-transparent cursor-not-allowed'
                }  py-2 px-2 h-10 mb-4 mt-[20px] text-xs`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt="wishlist icon"
                    src={Wishlist}
                    width={20}
                    height={10}
                    className="max-lg:mr-2"
                  />
                  <p className="max-sm:hidden sm:pr-2 capitalize">
                    {wishlistedText}{' '}
                  </p>
                </div>
                <div className="flex items-center h-fit gap-2">
                  <div>{propertyWishlisted || 0}</div>
                </div>
              </div>
            </Tooltip>
            <Tooltip
              title={sidetrayDisable && unauthorizedMessage}
              placement="top"
            >
              <div
                onClick={() => !sidetrayDisable && Enquired(id)}
                className={`flex  justify-between items-center rounded-lg border-2 +    ${
                  !sidetrayDisable
                    ? 'border-[#8B0000] bg-transparent cursor-pointer'
                    : 'border-[#8B0000] bg-transparent cursor-not-allowed'
                }  py-2 px-2 h-10 mb-4 mt-[20px] text-xs`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt="Enquire icon"
                    src={enquired}
                    width={20}
                    height={10}
                    className="max-lg:mr-2"
                  />
                  <p className="max-sm:hidden sm:pr-2 capitalize">
                    {enquiredText}{' '}
                  </p>
                </div>
                <div className="flex items-center h-fit gap-2">
                  <div>{propertyEnquired || 0}</div>
                </div>
              </div>
            </Tooltip>
          </div>
          <div className="flex gap-1  items-center rounded-lg border-2 border-primary py-1 px-[2px] h-fit w-[145px] mb-4 mt-[20px] text-xs max-lg:hidden">
            <div className="relative h-7 w-7 ">
              <Image
                alt="User icon"
                src={profileImage ? profileImage : User}
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex-col relative">
              <div className="flex">
                <p className=" line-clamp-1 break-words text-[12px] h-[15px] capitalize">
                  {' '}
                  {`${firstName && firstName}`}
                </p>
                {auth?.userResult?._id !== property?.postedBy?._id && (
                  <Image
                    src={eye}
                    width={12}
                    height={20}
                    alt="view icon"
                    className="absolute top-1 right-1 cursor-pointer"
                    onClick={() => handleChangeUserType()}
                  />
                )}
              </div>
              <p
                className="text-[9px] text-primary line-clamp-1"
                style={{ color: 'var(--subheading-color)' }}
              >
                {' '}
                {daysAgo}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal
          open={isEditModalOpen}
          onClose={closeEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center overflow-y-auto outline-none"
        >
          <Box
            className={`bg-[#FFFFFF] py-4 pb-5 rounded-2xl max-h-[500px] overflow-hidden overflow-y-scroll ${styles.customScroll} w-[75%] pr-2 pl-1`}
          >
            <AssignAgent
              propertyid={property._id}
              setuserId={setUserId}
              setPropertyId={setPropertyId}
              closeEditModal={setIsEditModalOpen}
              mVerify={mVerify}
              setAssociateclick={setAssociateclick}
            />
          </Box>
        </Modal>
      )}

      {isOwnerModalOpen && (
        <Modal
          open={isOwnerModalOpen}
          onClose={closeOwnerModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center overflow-y-auto outline-none "
        >
          <Box
            className={`bg-backgroundWhiteColor py-4 pb-7 rounded-2xl max-h-fit overflow-hidden overflow-y-scroll focus:outline-0 ${styles.customScroll} max-w-fit w-[870px] pr-2 pl-1`}
          >
            <OwnerDetail
              closeEditModal={setIsOwnerModalOpen}
              ownerDetail={
                userType === INDIVIDUAL_TEXT
                  ? property?.assignedTo
                  : property?.postedBy
              }
            />
          </Box>
        </Modal>
      )}
    </>
  )
}
export default SideTray
