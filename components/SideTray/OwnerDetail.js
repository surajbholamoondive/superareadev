import React from 'react'
import Image from 'next/image'
import {
  ADDRESS,
  DATE_OF_BIRTH,
  EMAIL_TEXT,
  GENDER,
  KYC,
  LANGUAGE_PREFERENCES,
  NOT_AVAILABLE,
  PERSONAL_DETAILS,
} from '@/text'
import { OtpVerify } from '@/utils/utils'

import style from '@/components/Admin/my-m-associates/index.module.css'
import { MDLabel } from '@/components/MDLabel/MDLabel'

import ekycicon from '../../assets/Kyc/e-kyc icon.svg'
import eKycpending from '../../assets/Kyc/eKycpending.svg'
import User_cicrle_light from '../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import closeIcon from '../../assets/userDashboard/close.svg'
import locationIcon from '../../assets/userDashboard/location.svg'
import mobileIcon from '../../assets/userDashboard/phoneflip.svg'
import userLogo from '../../assets/userDashboard/user-profile.svg'

const OwnerDetail = ({ ownerDetail, closeEditModal }) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    address,
    languagePreferences,
    city,
    isKycVerified,
    dateOfBirth,
    mobileNumber,
    profileImage,
    userType,
  } = ownerDetail || {}

  const formattedDateOfBirth = dateOfBirth
    ? new Date(dateOfBirth).toLocaleDateString()
    : NOT_AVAILABLE

  return (
    <div className="pb-2">
      <div className="flex justify-between items-center pb-2 px-6 relative max-md:h-[80%]">
        <div className="text-center text-[20px] h-fit">
          <h3 className="ml-6">{`${userType} Details`}</h3>
        </div>
        <div
          onClick={() => closeEditModal(false)}
          className={`absolute top-0 right-0 flex justify-center items-center cursor-pointer rounded-full bg-transparent border border-gray-400 p-1  ${style.buttonEditModal}`}
        >
          <button onClick={() => closeEditModal(false)}>
            <Image
              onClick={() => closeEditModal(false)}
              src={closeIcon}
              alt="close"
              width={15}
              height={15}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>
      <div
        className={`bg-white px-3 md:px-2 rounded-lg w-[320px] md:w-[400px]`}
      >
        <div className="h-[70%] md:h-[80%] sm:w-[320px] md:w-[80%] items-center m-auto mb-2">
          <div className="md:h-fit flex mb-6 max-md:flex">
            <div className="flex md:items-center md:mr-3 md:pt-2 rounded-full md:w-[30%] max-md:w-[60px] max-md:mr-2 max-md:mt-2">
              {profileImage ? (
                <img
                  className=" rounded-full object-cover w-[60px] h-[60px]"
                  src={profileImage}
                />
              ) : (
                <Image
                  src={User_cicrle_light}
                  className="object-cover rounded-full w-[60px] h-[60px]"
                />
              )}
            </div>
            <div className="w-fit">
              <div className="flex mt-2 font-semibold text-xs gap-2 ">
                <Image src={userLogo} height={12} width={12} alt="user" />
                <p>{firstName ? `${firstName} ${lastName}` : NOT_AVAILABLE}</p>
              </div>
              <div className="flex mt-2 font-semibold text-xs gap-2">
                <Image
                  src={locationIcon}
                  height={12}
                  width={12}
                  alt="location"
                />
                <p
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {city ? city : NOT_AVAILABLE}
                </p>
              </div>
              <div className="flex mt-2 font-semibold text-xs gap-2 items-center whitespace-nowrap">
                <Image src={mobileIcon} height={12} width={12} alt="mobile" />
                <MDLabel mobileNumber={mobileNumber} />
                <div>
                  <OtpVerify />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[65%] text-left max-md:h-fit">
            <div>
              <h3>{PERSONAL_DETAILS}</h3>
              <hr className="bg-gray-400"></hr>
            </div>
            <div className=" w-[100%] ">
              <div className="flex justify-between max-md:flex-col">
                <div className="w-[40%] mt-4">
                  <h4 className="text-gray-500">{EMAIL_TEXT}</h4>
                  <p className="mt-2 break-words">
                    {email ? email : NOT_AVAILABLE}
                  </p>
                </div>
                <div className="w-[40%] mt-4 ml-2">
                  <h4 className="text-gray-500">{GENDER}</h4>
                  <p className="mt-2 capitalize">
                    {gender ? gender : NOT_AVAILABLE}
                  </p>
                </div>
              </div>
              <div className="flex  justify-between max-md:flex-col max-md:w-[80%]">
                <div className="w-[40%] mt-4">
                  <h4 className="text-gray-500">{DATE_OF_BIRTH}</h4>
                  <p className="mt-2">{formattedDateOfBirth}</p>
                </div>
                <div className="w-[40%] mt-4">
                  <h4 className="text-gray-500">{KYC}</h4>
                  <div className="flex gap-1 mt-2 items-center max-md:gap-3">
                    {isKycVerified ? (
                      <>
                        <Image
                          src={ekycicon}
                          height={100}
                          width={100}
                          alt="tag"
                        />
                      </>
                    ) : (
                      <Image
                        src={eKycpending}
                        height={100}
                        width={100}
                        alt="tag"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between max-md:flex-col w-full gap-4">
                <div className="w-[40%] max-md:w-full mt-4 pr-4">
                  <h4 className="text-gray-500">{ADDRESS}</h4>
                  <p className="mt-2 break-words">
                    {address ? address : NOT_AVAILABLE}
                  </p>
                </div>
                <div className="w-[40%] mt-4 pr-2 max-md:w-[100%] h-[60px] pb-2">
                  <h4 className="text-gray-500 whitespace-nowrap">
                    {LANGUAGE_PREFERENCES}
                  </h4>
                  {languagePreferences && languagePreferences.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {languagePreferences?.map((language, index) => (
                        <button
                          key={index}
                          className="px-1 py-1 mb-2 bg-languageBackground text-black rounded-full font-semibold"
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="capitalize mt-2">{NOT_AVAILABLE}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OwnerDetail
