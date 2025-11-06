import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import estrataLogo from '../../assets/logo/main-logo.svg'
import { makeApiRequest, setLocalStorageItem } from '@/utils/utils'
import { toast } from 'react-toastify'
import userTieSolid from '../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import checkIcon from '../../assets/userDashboard/Check_ring_light.svg'
import locationIcon from '../../assets/userDashboard/location.svg'
import emailIcon from '../../assets/userDashboard/email.svg'
import mobileIcon from '../../assets/userDashboard/phoneflip.svg'
import pendingIcon from '../../assets/userDashboard/pending.svg'
import userLogo from '../../assets/userDashboard/user-profile.svg'
import { MDLabel } from '../MDLabel/MDLabel'
import Styles from './style.module.css'
import { COMPONENTS, GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'
const { addToEnquiryRoute, listingsText, emailText,agentFormText, contactSuperArea, enquirySentText, getACallBackButton, loginToaster, mobileNumberText, enquiredOwnProperty, adminEnquiresProject, projectText, serviceSince, yourInformation, otpText, locationText, addressText} = COMPONENTS?.SINGLE_PROPERTY_VIEW_COMPO?.agentFormComponent
const { redirectUrl, superAreaEmail, superAreanumber, superAreaAddress, putType, pendingText, workingsinceText } = GLOBALLY_COMMON_TEXT?.text
const { LanguagePreferencesText } = USER_MODULE?.USER_PROFILE_PAGE.headings
const { servingYear } = GLOBALLY_COMMON_TEXT.temporaryText
const { addressLabel, emailLabel, kycLabel, verifiedLabel, viewText } = USER_MODULE?.USER_PROFILE_PAGE.inputLabels
const { loginRoute } = GLOBALLY_COMMON_TEXT?.routes
 
export default function AgentForm({ isAgentReq, agent, id, listingType }) {
  
  const { adminEmail, adminMobile, adminAddress } = GLOBALLY_COMMON_TEXT.text;
  const [view] = useState(true)
  const windowWidth = useWindowWidth()
  const [expanded, setExpanded] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [auth, setAuth] = useAuth()
  const { userResult } = auth || {}
  const [isBlurred, setIsBlurred] = useState(false);
 
  const handleClick = () => {
    setIsBlurred(true);
    setTimeout(() => {
      setIsBlurred(false);
    }, 800);
    userEnquiryHandle(auth?.userResult?._id, id, listingType);
  };
  const route = useRouter()
  const logger = getLogger()
  const togglePoints = () => {
    setExpanded(!expanded)
  }
  const userEnquiryHandle = (userId, id, listingType) => {
    const ADD_TO_ENQUIRED_PROJECT = 'activity/add-to-enquired-project'
    let urlWithId = `${addToEnquiryRoute}/${id}/${userId}`
    if (listingType === projectText) {
      urlWithId = `${ADD_TO_ENQUIRED_PROJECT}/${id}`
    }
    makeApiRequest(putType, urlWithId)
      .then((response) => {
        const result = response?.data?.result
        if (result) {
          toast.success(enquirySentText)
        } else {
          if (response?.data?.responseMessage == enquiredOwnProperty) {
            toast.error(enquiredOwnProperty)
          }
          else if (response?.data?.responseMessage == adminEnquiresProject) {
            toast.error(adminEnquiresProject)
          }
          else {
            setTimeout(() => {
              toast.error(loginToaster)
            }, 1000)
            setLocalStorageItem(redirectUrl, route.asPath)
            route.push(loginRoute)
          }
        }
      })
      .catch((error) => {
        logger.log(error)
      })
  }
 
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value)
  }
 
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption)
  }
 
  const {
    profileImage,
    firstName,
    lastName,
    mobileNumber,
    city,
    isMobileVerified,
    languagePreferences,
    isKycVerified,
    agentReraInfo,
    agentSince,
    isNumberPublic,
    email,
  } = agent || {}
  const formatMobileNumber = (mobileNumber) => {
    if (!mobileNumber) return ''
    const firstTwoDigits = mobileNumber.slice(0, 5)
    const lastTwoDigits = mobileNumber.slice(-2)
    const middleDigits = '*'.repeat(mobileNumber.length - 7)
    return firstTwoDigits + middleDigits + lastTwoDigits
  }
  const dateObject = new Date(agentSince)
  const year = dateObject.getFullYear()
  const window = useWindowWidth()
  return (
    <div id={agentFormText}>
      {view && (
        <div>
          <div className="py-2">
            <div className="flex justify-evenly max-md:flex-wrap g-4 items-center">
              {agent ?
                <>
                  {isAgentReq ?
                    <>
                      <div className="w-full md:w-[35%] lg:w-[27%] xl:w-[30%] mb-4 md:mb-0">
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center">
                          <div className="flex justify-center md:justify-start items-center ">
                            <Image
                              src={profileImage ? profileImage : userTieSolid}
                              width={90}
                              height={90}
                              alt="Agent profile image, mores agent profiles"
                              className={`ring-sky-600 mr-1 ${(profileImage === '/User_cicrle_light.svg') ? Styles.defaultImage : Styles.agentImage}`}
                            />
                            <div className={` ${window < 770 && 'ml-[5%]'} ml-1 mt-1 `}>
                              <div className="flex gap-1">
                                <Image
                                  alt="User Profile Logo, mores user profile"
                                  src={userLogo}
                                  height={12}
                                  width={12}
                                />
                                <p className='capitalize'>
                                  {firstName} {lastName}
                                </p>
                              </div>
                              <div className="flex gap-1 items-center mt-2">
                                <Image
                                  src={locationIcon}
                                  height={12}
                                  width={12}
                                  alt="mores location icon, real estate locations"
                                />
                                <p className="tracking-wider">{city}</p>
                              </div>
                              {/* <div className="flex gap-1 items-center mt-2">
                                <Image
                                  src={listingIcon}
                                  height={12}
                                  width={12}
                                  alt="city, listing icon, mores city listing"
                                />
                                <p className="tracking-wider">{listingsText}</p>
                                <p className="text-primary ml-2underline">
                                  {viewText}
                                </p>
                                <Image
                                  src={rightArrow}
                                  height={5}
                                  width={5}
                                  alt="right arrow icon"
                                />
                              </div> */}
                              <div className="flex gap-1 items-center mt-2">
                                <Image
                                  src={mobileIcon}
                                  height={12}
                                  width={12}
                                  alt="mobile phone icon"
                                />
                                {isNumberPublic ? (
                                  <MDLabel
                                    mobileNumber={mobileNumber}
                                  />
                                ) : (
                                  <p>
                                    {formatMobileNumber(mobileNumber)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-[5px] w-full md:w-[30%] lg:w-[27%] xl:w-[30%] xl:mr-20 items-center justify-center rounded-lg ">
                        <div className="flex flex-col ">
 
                          <div className="flex items-center lg:justify-between  md:justify-between gap-4 mt-2">
                            <div>
                              <p className="text-gray-500">{kycLabel}</p>
                            </div>
                            {isKycVerified ? (
                              <div className="flex items-center text gap-1 md:sm:text-start">
                                <Image
                                  src={checkIcon}
                                  height={15}
                                  width={15}
                                  alt="KYC icon, real estate KYC"
                                />
                                <p className="text-primary">{verifiedLabel}</p>
                              </div>
                            ) : (
                              <div className=" flex gap-1 mr-3">
                                <Image
                                  src={pendingIcon}
                                  height={15}
                                  width={15}
                                  alt="Approval pending icon"
                                />
                                <p className="text-[#C88E20] capitalize">{pendingText}</p>
                              </div>
                            )}
                          </div>
                          <div className=" flex items-center text-gray-500 justify-between mt-2">
                            <div>
                              <p>{workingsinceText}</p>
                            </div>
                            <div className="flex items-center">
                              <p className="text-black text-bold ">
                                {agentSince && year}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 max-md:w-full">
                          <p className="text-gray-500">
                            {LanguagePreferencesText}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 ">
                            {languagePreferences?.map((language, index) => (
                              <p
                                key={index}
                                className="px-2 py-1 bg-nearbySelectedBackground text-black rounded-full font-bold"
                              >
                                {language}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='pl-2 max-md:p-0 max-md:mt-4 w-[35%]  min-w-[250px] max-md:w-[100%]'>
                        <div className={` border-[2px] rounded-lg p-4 w-[100%]`} >
                          {userResult && (
                            <div>
                              <h4 className='pb-2 font-bold' >{yourInformation}</h4>
                              <p>
                                {userResult.firstName} {userResult.lastName}
                              </p>
                              <p className="mt-2 mb-2">{userResult.email}</p>
                              <div className=" flex flex-wrap  items-center mt-1 lg:gap-4 mb-2 ">
                                <MDLabel
                                  mobileNumber={userResult.mobileNumber}
                                  inlineStyle={{ containerClass: 'font-bold' }}
                                />
                                <div className="flex gap-1 text-primary">
                                  <Image
                                    src={checkIcon}
                                    height={15}
                                    width={15}
                                    alt="Mobile number verification icon"
                                  />
                                  <p>{`${otpText} ${verifiedLabel}`}</p>
                                </div>
                              </div>
                            </div>
                          )}
                          <button
                            onClick={handleClick}
                            className={`${isBlurred ? 'bg-gray-500 cursor-default' : 'bg-primary'} mt-2 text-white font-bold rounded-md h-10 w-full mb-[6px] `}
                          >
                            {getACallBackButton}
                          </button>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div className={`flex items-center w-[98%]  justify-evenly  ${Styles.ownerCard}`}>
                        <div className="w-full md:w-[40%] lg:w-[30%] xl:w-[30%] mb-4 md:mb-0">
                          <div className={`flex items-center`}>
                            <div className='relative w-[90px] h-[90px] rounded-full flex flex-shrink-0 border border-primary '>
                              <Image
                                src={profileImage ? profileImage : userTieSolid}
                                fill
                                alt="Agent profile image, mores agent profiles"
                                className={`mr-1 rounded-full`}
                              />
                            </div>
                            <div className={` ${window < 770 && 'ml-[5%]'} w-[100%] ml-1 mt-1 `}>
                              <div className="flex gap-1">
                                <Image
                                  alt="User Profile Logo, mores user profile"
                                  src={userLogo}
                                  height={12}
                                  width={12}
                                />
                                <p className='capitalize'>
                                  {firstName} {lastName}
                                </p>
                              </div>
                              <div className="flex gap-1 items-center mt-2">
                                <Image
                                  src={locationIcon}
                                  height={12}
                                  width={12}
                                  alt="mores location icon, real estate locations"
                                />
                                <p className="tracking-wider">{city}</p>
                              </div>
                              <div className="flex gap-1 items-center mt-2">
                                <Image
                                  src={mobileIcon}
                                  height={12}
                                  width={12}
                                  alt="mobile phone icon"
                                />
                                {isNumberPublic ? (
                                  <MDLabel
                                    inlineStyle={{ containerClass: '' }}
                                    mobileNumber={mobileNumber}
                                  />
                                ) : (
                                  formatMobileNumber(mobileNumber)
                                )}
                              </div>
                              <div className="flex gap-1 items-start mt-2">
                                <div className='pt-[5px]'>
                                  <Image
                                    src={emailIcon}
                                    height={12}
                                    width={12}
                                    alt="email-icon"
                                  />
                                </div>
                                <div className="w-[75%]">
                                  <p className="tracking-wider overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                                    {email}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`ml-[5px] md:w-[28%] lg:w-[27%] xl:w-[30%] xl:mr-20 items-center justify-center rounded-lg ${Styles.ownerDetails} `}>
                          <div className="flex flex-col">
                            <div className="flex items-center justify-between mr-3  mt-2">
                              <div>
                                <p className="text-gray-500 ">{kycLabel}</p>
                              </div>
                              {isKycVerified ? (
                                <div className="flex items-center text gap-1">
                                  <Image
                                    src={checkIcon}
                                    height={15}
                                    width={15}
                                    alt="KYC icon, real estate KYC"
                                  />
                                  <p className="text-primary ">{verifiedLabel}</p>
                                </div>
                              ) : (
                                <div className=" flex gap-1 mr-3">
                                  <Image
                                    src={pendingIcon}
                                    height={15}
                                    width={15}
                                    alt="Approval pending icon"
                                  />
                                  <p className="text-[#C88E20] capitalize ">{pendingText}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 max-md:w-full">
                            <p className="text-gray-500 ">
                              {LanguagePreferencesText}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2 ">
                              {languagePreferences?.map((language, index) => (
                                <p
                                  key={index}
                                  className="px-2 py-1 bg-languageBackground text-black rounded-full font-semibold"
                                >
                                  {language}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className={`pl-2 max-md:p-0 max-md:mt-4 w-[35%]  min-w-[250px] ${Styles.userCard}`}>
                          <div className={` border-[2px] rounded-lg p-4 w-[100%]`} >
                            {userResult && (
 
                              <div>
                                <p className='font-bold pb-2 text-[17px]' >{yourInformation}</p>
                                <p>
                                  {userResult.firstName} {userResult.lastName}
                                </p>
                                <p className="mt-2 mb-2">{userResult.email}</p>
                                <div className=" flex flex-wrap  items-center mt-1 lg:gap-4 mb-2 ">
                                  <MDLabel
                                    mobileNumber={userResult.mobileNumber}
                                    inlineStyle={{ containerClass: '' }}
                                  />
                                  <div className="flex ml-2 gap-2 text-primary">
                                    <Image
                                      src={checkIcon}
                                      height={15}
                                      width={15}
                                      alt="Mobile number verification icon"
                                    />
                                    <p className=" ">{`${otpText} ${verifiedLabel}`}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            <button
                              onClick={handleClick}
                              className={`${isBlurred ? 'bg-gray-500 cursor-default' : 'bg-primary'} mt-2  text-white font-bold rounded-md h-10 w-full mb-[6px] `}
                            >
                              {getACallBackButton}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                </>
                :
                <div className={`justify-evenly items-start w-[100%] gap-4 flex-wrap flex ${Styles.contactMores} `}>
                  <div className={`min-w-[100px] flex items-center justify-start h-[140px] pt-8 ${Styles.logo}`}>
                    <Image
                      src={estrataLogo}
                      width={120}
                      height={100}
                      quality={100}
                      alt={contactSuperArea}
                    />
                  </div>
                  <div className={`flex flex-col gap-2 justify-evenly w-[340px] ${Styles.details}`} >
                    <div className='flex justify-between w-[100%]'>
                      <p className="text-gray-500 w-[30%]"> {addressText} </p>
                      <p className="w-[60%]">{adminAddress} </p>
                    </div>
                    <div className='flex max-sm:gap-4 justify-between w-[100%]'>
                      <p className="text-gray-500 W-[300px] w-[30%]">{mobileNumberText}</p>
                      <p className=' w-[60%]'>{adminMobile}</p>
                    </div>
                    <div className='flex max-sm:gap-4 justify-between w-[100%]'>
                      <p className="text-gray-500 w-[30%]">{emailText}</p>
                      <p className='w-[60%]'>{adminEmail}</p>
                    </div>
                  </div>
                  <div className={`flex gap-2 flex-col justify-evenly  w-[250px] ${Styles.details}`} >
                    <div className={`flex w-[100%] gap-2 ${Styles.serving}`}>
                      <p className="text-gray-500">{serviceSince}</p>
                      <p className='w-[110px]  max-lg:ml-6 max-sm:ml-2'>{servingYear}</p>
                    </div>
                    <div className='flex justify-between items-center gap-4 w-[100%]'>
                      <p className="text-gray-500 ">{locationText}</p>
                      <div className={`flex w-[210px] gap-2 text-[14px] max-sm:mr-5 ${Styles.languagediv}`}>
                        <button className="px-4 py-1 bg-nearbySelectedBackground rounded-full">
                          Noida
                        </button>
                        <button className="px-4 py-1 max-sm:mt-0 bg-nearbySelectedBackground rounded-full">
                          Banglore
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={`w-[310px] max-md:w-[340px] border-[2px] rounded-lg p-4 ${Styles.details}`} >
                    {userResult && (
                      <div>
                        <h3>{yourInformation}</h3>
                        <p>
                          {userResult.firstName} {userResult.lastName}
                        </p>
                        <p className="text-sm mt-1">{userResult.email}</p>
                        <div className=" flex flex-wrap  items-center mt-1 lg:gap-4 mb-2 ">
                          <MDLabel
                            mobileNumber={userResult.mobileNumber}
                            inlineStyle={{ containerClass: '' }}
                          />
                          <div className="flex mt-1 ml-2 gap-2 text-primary">
                            <Image
                              src={checkIcon}
                              height={15}
                              width={15}
                              alt="Mobile number verification icon"
                            />
                            <p>{`${otpText} ${verifiedLabel}`}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleClick}
                      className={`${isBlurred ? 'bg-gray-500 cursor-default' : 'bg-primary'} mt-2 text-white rounded-md h-10 w-full mb-[6px]`}
                    >
                      {getACallBackButton}
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}