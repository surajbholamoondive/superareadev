import React, { useState } from 'react'
import Image from 'next/image'
import User_cicrle_light from '@/assets/MenuIcons/ProfileDropdown/defaultProfileIcon.svg'
import { useAuth } from '@/context/auth'
import { GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'
import { formattedDateOfBirth } from '@/utils/helper'
import { OtpVerify } from '@/utils/utils'

import { MDLabel } from '@/components/MDLabel/MDLabel'

import tag from '../../../assets/Kyc/tagNew.svg'
import mobileIcon from '../../../assets/userDashboard/phoneflip.svg'
import userLogo from '../../../assets/userDashboard/user-profile.svg'
import ProfileEditModal from './ProfileEditModal'
import ReviewDetails from './ReviewListing'

const profile = () => {
  const [verified] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [auth] = useAuth()
  const [showKYCModal, setShowKYCModal] = useState(false)
  const Data = auth.userResult
  const {
    firstName,
    lastName,
    address,
    city,
    mobileNumber,
    isKycVerified,
    dateOfBirth,
    gender,
    email,
    languagePreferences,
    approvalStatus,
    state,
  } = Data
  const { USER_PROFILE_PAGE } = USER_MODULE
  const { headings, inputLabels, buttons } = USER_PROFILE_PAGE
  const { LanguagePreferencesText } = headings
  const {
    addressLabel,
    dateOfBirthLabel,
    emailLabel,
    genderLabel,
    kycLabel,
    restrictedLabel,
    verifiedLabel,
  } = inputLabels
  const { editProfileButton, initiateKycButton } = buttons
  const { threeDash } = GLOBALLY_COMMON_TEXT?.text
  let newformattedDateOfBirth = formattedDateOfBirth(dateOfBirth)
  function handleClick() {
    setModalOpen(true)
  }
  const handleOpenKYCModal = () => setShowKYCModal(true)
  const handleCloseKYCModal = () => setShowKYCModal(false)
  return (
    <div>
      <div className="text-left md-0 md:mb-5">
        <h1 className="text-[var(--secondary-color)] text-[var(--font-size-title)] font-[var(--font-weight-bold)] uppercase ">
          Welcome {firstName || '---'}
        </h1>
        <p className="text-[var(--subheading-color)] text-[var(--font-size-small)]">
          {new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
      {/* <div
        className={`absolute -bottom-9 max-md:hidden ${styles.mascotContainer}`}
      >
        <div className={styles.mascotImageWrapper}>
          <Image src={mascot} fill alt="mascot" />
        </div>
      </div> */}
      <div className="w-[95%]  h-[65%]  items-center flex max-md:h-fit">
        <div className="h-[80%] w-[100%] items-center mt-0 md:mt-2">
          <div className="h-[20%] flex mb-10 items-center max-md:mt-7 gap-4 ">

            <div className="w-full">
             <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-shrink-0">
                  {auth.userResult.profileImage ? (
                    <img
                      className="w-[90px] h-[90px] rounded-full object-cover"
                      src={auth?.userResult?.profileImage}
                      alt="user"
                    />
                  ) : (
                    <Image src={User_cicrle_light} width={80} height={100} />
                  )}
                </div>
                <div className="order-3 max-[500px]:order-1">

                  <button
                    className="bg-white text-primary hover:text-white hover:bg-primary border border-primary px-4 py-1 rounded-2xl"
                    onClick={handleClick}
                  >
                    {editProfileButton}
                  </button>
                </div>


                <div className="flex-1 mt-2 order-2 max-[640px]:order-3 max-[640px]:basis-full">
                  <div className='flex gap-2'>

                    <Image src={userLogo} height={12} width={12} alt="user" />
                    <p className="mt-[2px]">
                      {firstName ? `${firstName} ${lastName}` : threeDash}
                    </p>
                    {approvalStatus === restrictedLabel && (
                      <span className="bg-[#93160230] py-1 px-2 text-[#931602] rounded-sm capitalize">
                        {restrictedLabel}
                      </span>
                    )}
                  </div>
                  <div className='flex gap-2'>

                    <Image
                      src={mobileIcon}
                      height={13}
                      width={13}
                      alt="mobile"
                    />


                    <MDLabel mobileNumber={mobileNumber} />
                  </div>
                  {verified && (
                    <div className="flex gap-2">
                      <OtpVerify />
                    </div>
                  )}
                </div>
              </div>


            </div>
          </div>


          <div className="h-[65%] max-md:h-fit pb-8">
            <div>
              <h3 className="text-[var(--secondary-color)] text-[var(--font-size-h2)] font-[var(--font-weight-bold)] mb-2">
                {headings?.personalDetailsText}
              </h3>{' '}
              <hr className="bg-gray-400"></hr>
            </div>
            <div className="w-[55%] max-md:w-full">
              <div className="flex justify-between max-md:flex-col">
                <div className="w-[40%] mt-4">
                  <h4 className="text-gray-500">{emailLabel}</h4>
                  <p className="mt-2">{email ? email : threeDash}</p>
                </div>
                <div className="w-[40%] mt-4">
                  <h4 className="text-gray-500">{genderLabel}</h4>
                  <p className="mt-2">{gender ? gender : threeDash}</p>
                </div>
              </div>
              <div className="flex  justify-between max-md:flex-col max-md:w-[80%]">
                <div className="w-[40%] mt-4">
                  <h4 className="text-gray-500">{dateOfBirthLabel}</h4>
                  <p className="mt-2">{newformattedDateOfBirth}</p>
                </div>
                <div className="w-[40%] mt-4">
                  <h4 className="text-gray-500">{kycLabel}</h4>
                  <div className="flex gap-1 mt-1 items-center max-md:gap-3">
                    {isKycVerified ? (
                      <>
                        <Image src={tag} height={15} width={15} alt="tag" />
                        <p className=" text-primary tracking-wide">
                          {verifiedLabel}
                        </p>
                      </>
                    ) : (
                      <p
                        className="p-1 px-4 border-2 border-black rounded-md cursor-pointer"
                        onClick={() => setShowKYCModal(true)}
                      >
                        {initiateKycButton}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between max-md:flex-col ">
                <div className="w-[40%] mt-4 pr-2 break-words max-md:w-[100%]">
                  <h4 className="text-gray-500">{addressLabel}</h4>
                  <p className="mt-2">
                    {address
                      ? `${address}, ${city || ''}, ${state || ''}`
                        .trim()
                        .replace(/^,|,$/g, '')
                      : city && state
                        ? `${city}, ${state}`
                        : threeDash}
                  </p>
                </div>
                <div className="w-[40%] mt-4 pr-2 max-md:w-[100%]">
                  <h4 className="text-gray-500">{LanguagePreferencesText}</h4>
                  <div className="mt-2 flex flex-wrap gap-2 ">
                    {languagePreferences?.map((language, index) => (
                      <button
                        key={index}
                        className="px-2 py-1 bg-languageBackground text-black rounded-full"
                      >
                        {language}
                      </button>
                    ))}
                    {showKYCModal && (
                      <ReviewDetails onClose={handleCloseKYCModal} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {modalOpen && <ProfileEditModal onClose={setModalOpen} />}
          </div>
        </div>
      </div>
    </div>
  )
}
export default profile
