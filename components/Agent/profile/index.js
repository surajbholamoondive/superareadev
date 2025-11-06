import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/auth'
import withProtectedRoute from '@/utils/RouteProtection/routes.js'
import { makeApiRequest, OtpVerify } from '@/utils/utils'
import { formattedDateOfBirth, formattedAgentSince } from '@/utils/helper'
import { Link } from '@mui/material'
import ReviewDetails from '@/components/User/profile/ReviewListing'
import AgentApproved from '../../../assets/Kyc/Approved.svg'
import tag from '../../../assets/Kyc/tagNew.svg'
import pending from '../../../assets/M-verification/pending.svg'
import rejected from '../../../assets/M-verification/rejected.svg'
import User_cicrle_light from '../../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import checkIcon from '../../../assets/userDashboard/check.svg'
import locationIcon from '../../../assets/userDashboard/location.svg'
import mobileIcon from '../../../assets/userDashboard/phoneflip.svg'
import userLogo from '../../../assets/userDashboard/user-profile.svg'
import listingIcon from '../../../assets/userDashboard/threeLine1.svg'
import ProfileEditModal from './ProfileEditModal'
import { MDLabel } from '@/components/MDLabel/MDLabel'
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { APPROVED_STATUS, RESTRICTED_STATUS } from '@/text'
// 
const { personalDetailsText, LanguagePreferencesText } =
  AGENT_MODULE?.AGENT_PROFILE_PAGE?.headings
const {
  dateOfBirthLabel,
  emailLabel,
  genderLabel,
  kycLabel,
  viewText,
  officeAddressLabel,
} = AGENT_MODULE?.AGENT_PROFILE_PAGE?.inputLabels
const { editProfileButton, initiateKycButton } =
  AGENT_MODULE?.AGENT_PROFILE_PAGE?.buttons
const { getPostedPropertyRoute, agentListingRoute } =
  AGENT_MODULE?.AGENT_PROFILE_PAGE?.routes
const {
  additionalDetailsText,
  myListingText,
  reraText,
  postType,
  verifiedText,
  workingsinceText,
} = GLOBALLY_COMMON_TEXT?.text
const { zeroListingText } = GLOBALLY_COMMON_TEXT?.temporaryText

const Profile = () => {
  const [verified] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [listings, setListings] = useState()
  const [showKYCModal, setShowKYCModal] = useState(false)
  const [auth] = useAuth()
  const Data = auth.userResult

  useEffect(() => {
    makeApiRequest(postType, getPostedPropertyRoute)
      .then((response) => {
        const Result = response?.data?.result
        setListings(Result.length)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [auth])

  const {
    firstName = '',
    lastName = '',
    city = '',
    mobileNumber = '',
    isKycVerified = '',
    agentSince = '',
    dateOfBirth = '',
    gender = '',
    agentReraInfo = '',
    email = '',
    languagePreferences = [],
    approvalStatus = '',
    agentOfficeDetails = '',
    state = ''
  } = Data || {}

  const newformattedDateOfBirth = formattedDateOfBirth(dateOfBirth)
  const newformattedAgentSince = formattedAgentSince(agentSince)

  const handleCloseKYCModal = () => setShowKYCModal(false)

  return (
    <section className="bg-[var(--primary-bg)] ">
      {/*     
      <div className="bg-[var(--primary-bg)] border-2 border-[var(--secondary-color)] rounded-xl p-8 max-w-[1000px] mx-auto"> */}
      <div className="text-left ">
        <h1 className="text-[var(--secondary-color)] text-[var(--font-size-title)] font-[var(--font-weight-bold)] uppercase max-[640px]:text-[35px] ">
          Welcome {firstName || '---'},
        </h1>
        <p className="text-[var(--subheading-color)] text-[var(--font-size-small)]">
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div className="relative flex-shrink-0">
          {auth?.userResult?.profileImage ? (
            <img
              className="w-[90px] h-[90px] rounded-full object-cover"
              src={auth?.userResult?.profileImage}
              alt="user"
            />
          ) : (
            <Image
              src={User_cicrle_light}
              width={90}
              height={90}
              alt="user"
            />
          )}
          <div className="absolute bottom-0 justify-center right-0">
            {approvalStatus === APPROVED_STATUS ? (
              <Image src={AgentApproved} height={40} width={40} alt="verified" />
            ) : approvalStatus === RESTRICTED_STATUS ? (
              <Image src={rejected} height={40} width={40} alt="rejected" />
            ) : (
              <Image src={pending} height={40} width={40} alt="pending" />
            )}
          </div>
        </div>


        
        <div className="order-3 max-[500px]:order-1">
          <button
            className="text-[var(--secondary-color)] bg-[var(--primary-bg)] px-10 py-[6px] border border-[var(--secondary-color)] rounded-xl cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            {editProfileButton}
          </button>
        </div>



        <div className="flex-1 mt-5 order-2 max-[640px]:order-3 max-[640px]:basis-full">
          <div className="flex items-center gap-2 mb-2">
            <Image src={userLogo} height={14} width={14} alt="userLogo" />
            <p>{firstName ? `${firstName} ${lastName}` : '---'}</p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Image src={locationIcon} height={14} width={14} alt="location" />
            <div className="flex gap-1">
              <p>{city || '---'},</p>
              <p>{state || '---'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Image src={listingIcon} height={14} width={14} alt="listing" />
            <p>{listings ? `${listings} listings` : zeroListingText}</p>
            <div className="flex items-center gap-1 ml-2">
              <Link href={agentListingRoute} className='no-underline'>
                <p className="text-[var(--secondary-color)]">
                  {viewText}
                </p>
              </Link>
              {/* <Image src={rightArrow} height={8} width={8} alt="right" color='red'/> */}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Image src={mobileIcon} height={14} width={14} alt="mobile" />
            <MDLabel mobileNumber={mobileNumber} />
            {verified && <OtpVerify />}
          </div>
        </div>
      </div>


      <div className="mt-6">
        <h3 className="text-[var(--secondary-color)] text-[var(--font-size-h2)] font-[var(--font-weight-bold)] mb-2">
          {personalDetailsText}
        </h3>
        <hr className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <h4 className="text-[var(--subheading-color)]">{emailLabel}</h4>
            <p>{email}</p>
          </div>
          <div>
            <h4 className="text-[var(--subheading-color)]">{workingsinceText}</h4>
            <p>{newformattedAgentSince}</p>
          </div>
          <div>
            <h4 className="text-[var(--subheading-color)]">{reraText}</h4>
            <div className="flex items-center gap-1">
              {agentReraInfo && (
                <Image src={checkIcon} height={12} width={12} alt="check" />
              )}
              <p>{agentReraInfo || '---'}</p>
            </div>
          </div>
          <div>
            <h4 className="text-[var(--subheading-color)]">{kycLabel}</h4>
            {isKycVerified ? (
              <div className="flex items-center gap-1">
                <Image src={tag} height={15} width={15} alt="tag" />
                <p className="text-newBackground ">
                  {verifiedText}
                </p>
              </div>
            ) : (
              <button
                className="border border-[var(--secondary-color)] text-[var(--secondary-color)] px-3 py-1 rounded cursor-pointer"
                onClick={() => setShowKYCModal(true)}
              >
                {initiateKycButton}
              </button>
            )}
            {showKYCModal && <ReviewDetails onClose={handleCloseKYCModal} />}
          </div>
          <div>
            <h4 className="text-[var(--subheading-color)]">{dateOfBirthLabel}</h4>
            <p>{newformattedDateOfBirth}</p>
          </div>
          <div>
            <h4 className="text-[var(--subheading-color)]">{genderLabel}</h4>
            <p>{gender || '---'}</p>
          </div>
          <div>
            <h4 className="text-[var(--subheading-color)]">{officeAddressLabel}</h4>
            <p className="break-words whitespace-pre-wrap">{agentOfficeDetails || '---'}</p>
          </div>
          <div>
            <h4 className="text-[var(--subheading-color)]">{LanguagePreferencesText}</h4>
            <div className="flex flex-wrap gap-2">
              {languagePreferences?.map((language, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-languageBackground text-black rounded-full"
                  
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="mt-6">
        <h3 className="text-[var(--secondary-color)] text-[var(--font-size-h2)] font-[var(--font-weight-bold)] mb-2">
          {additionalDetailsText}
        </h3>
        <hr className="mb-4" />
        <div>
          <h4 className="text-[var(--subheading-color)]">{myListingText}</h4>
          <p>{listings || '0'}</p>
        </div>
      </div>
      {/* </div> */}

      {modalOpen && <ProfileEditModal onClose={setModalOpen} />}
    </section>
  )
}

export default withProtectedRoute(Profile, ['Agent'])
