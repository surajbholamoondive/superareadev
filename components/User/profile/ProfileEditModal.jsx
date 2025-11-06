import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ArrowIcon from '@/assets/ButtonIcons/downArrow.svg'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import { GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'
import { handleEditProfile, handleLanguageToggle } from '@/utils/helper'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import dayjs from 'dayjs'

import CountryStateCity from '@/components/CountryStateCity/CountryStateCity'
import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'

import checkIcon from '../../../assets/userDashboard/Check_ring_light.svg'
import close from '../../../assets/userDashboard/close.svg'
import styles from './index.module.css'
import { MDLabel } from '@/components/MDLabel/MDLabel'

const { languagesArray, symbols } = GLOBALLY_COMMON_TEXT
const { headings, inputLabels, buttons, text, routes, placeholders } =
  USER_MODULE?.USER_PROFILE_PAGE
const { personalDetailsText, LanguagePreferencesText } = headings
const { genderLabel } = inputLabels
const { doneButton } = buttons
const { uploadImageRoute } = routes
const {
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  dateOfBirthPlaceholder,
  addressPlaceholder,
} = placeholders
const {
  nameNote,
  futureDatesError,
  invalidDateError,
  mobileNumberMask,
  updateImageText,
  otpVerified,
} = text
const DEFAULT_USER_IMAGE = '/User_cicrle_light.svg'
const ProfileEditModal = ({ onClose }) => {
  const [auth, setAuth] = useAuth()
  const today = dayjs()
  const logger = getLogger()
  const userType = 'user'
  const userDOB = auth?.userResult?.dateOfBirth
  const [selectedDate, setSelectedDate] = useState(
    userDOB ? dayjs(userDOB) : null
  )
  const [selectedImage, setSelectedImage] = useState(
    auth?.userResult?.profileImage
      ? auth?.userResult?.profileImage
      : DEFAULT_USER_IMAGE
  )
  const genders = ['Male', 'Female', 'Other']

  const [error, setError] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [initialMask, SetInitialMask] = useState('')
  const [initialState, setInitialState] = useState('')
  const [initialCity, setInitialCity] = useState('')
  useEffect(() => {
    setSelectedDate(userDOB && dayjs(userDOB))
  }, [userDOB, auth])

  let dob
  if (auth?.userResult?.dateOfBirth) {
    dob = auth?.userResult?.dateOfBirth.toString()
  } else {
    dob = ''
  }
  let profileImage
  if (auth?.userResult?.profileImage) {
    profileImage = auth?.userResult?.profileImage.toString()
  } else {
    profileImage = DEFAULT_USER_IMAGE
  }
  const [userData, setUserData] = useState({
    firstName: auth?.userResult?.firstName,
    lastName: auth?.userResult?.lastName,
    email: auth?.userResult?.email,
    dateOfBirth: dob,
    mobileNumber: auth?.userResult?.mobileNumber,
    address: auth?.userResult?.address,
    city: auth?.userResult?.city,
    state: auth?.userResult?.state,
    gender: auth?.userResult?.gender,
    isNumberPublic: auth?.userResult?.isNumberPublic,
    profileImage: profileImage,
    languagePreferences: auth?.userResult?.languagePreferences
      ? auth?.userResult?.languagePreferences
      : [],
  })
  const changeGender = (value) => {
    setUserData({ ...userData, gender: value })
  }
  useEffect(() => {
    const cityState = userData?.city
    const state = userData?.state
    setInitialState(state)
    setInitialCity(cityState)
  }, [userData?.city, userData?.state])
  useEffect(() => {
    SetInitialMask(userData.isNumberPublic)
  }, [userData.isNumberPublic])
  const languages = languagesArray
  const verify = auth?.userResult?.isKycVerified
  const currentDate = new Date().toISOString().slice(0, 10)
  const maxDate = currentDate

  async function handleImageChange(event) {
    setSelectedProfile(event.target.files[0])
    const imageFile = event.target.files[0]
      ? event.target.files[0]
      : selectedProfile
    const formData = new FormData()
    formData.append('profileImage', imageFile)
    formData.append('isUserImage', 'true')
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}${uploadImageRoute}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (response) {
        const newPhotoUrl = response.data.result.imageUrls[0]
        setSelectedImage(newPhotoUrl)
        setUserData({
          ...userData,
          profileImage: newPhotoUrl,
        })
      }
    } catch (err) {
      logger.error(err)
    }
  }

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate': {
        return futureDatesError
      }
      case 'invalidDate': {
        return invalidDateError
      }
      default: {
        return ''
      }
    }
  }, [error])
  const handleCityChange = (newCity, newState) => {
    setUserData({ ...userData, city: newCity, state: newState })
  }
  const handleCheckboxChange = (e) => {
    setUserData({
      ...userData,
      isNumberPublic: e.target.checked,
    })
  }

  const formatMobileNumber = (mobileNumber) => {
    if (!mobileNumber) return ''
    const firstTwoDigits = mobileNumber.slice(0, 5)
    const lastTwoDigits = mobileNumber.slice(-2)
    const middleDigits = '*'.repeat(mobileNumber.length - 7)
    return firstTwoDigits + middleDigits + lastTwoDigits
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-[9999]">
      <div
        className={`mx-auto px-7 h-fit max-h-[95%] top-[50%] left-[50%] overflow-y-scroll mt-[10px] border w-[55%] max-lg:w-[80%] max-md:w-[90%] shadow-lg rounded-md bg-white ${styles.modalScroll} z-[9999] min-w-[375px]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="flex justify-end mt-3">
            <Image
              src={close}
              width={30}
              height={30}
              className="rounded-full p-2 border border-gray-400 cursor-pointer "
              onClick={() => {
                onClose(false)
              }}
              alt="close"
            />
          </div>
          <div className="flex flex-col items-center">
            {auth?.userResult?.profileImage != '' ? (
              <div className="h-20 w-20 m-auto rounded-full flex justify-center">
                <Image
                  src={selectedImage}
                  height={130}
                  width={130}
                  className="rounded-full object-cover"
                  objectFit="cover"
                  alt="profile icon"
                />
              </div>
            ) : (
              <Image
                src={DEFAULT_USER_IMAGE}
                className="rounded-full mt-4"
                height={90}
                width={90}
                objectFit="cover"
                alt="profile icon"
              />
            )}
            <label
              className="leading-6 text-[1rem] text-primary underline cursor-pointer mt-1"
              htmlFor="profileImageInput"
            >
              {updateImageText}
            </label>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <div className="px-4">
            <h3 className="text-left my-4">{personalDetailsText}</h3>
            <div className="flex mt-2 justify-between gap-1 max-md:flex-col">
              <div className="w-[45%] max-md:w-[100%]">
                <input
                  type="text"
                  placeholder={`${firstNamePlaceholder} ${symbols?.asterisk}`}
                  className="px-2 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[1px] focus:border-[#931602]"
                  value={userData?.firstName}
                  disabled={verify}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="w-[45%] max-md:w-[100%]">
                <input
                  type="text"
                  placeholder={`${lastNamePlaceholder} ${symbols?.asterisk}`}
                  className="px-2 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[1px] focus:border-[#931602]"
                  value={userData?.lastName}
                  disabled={verify}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <p className="text-primary bg-noteBackground mt-1 rounded-md text-start px-1 py-1">
              {nameNote}
            </p>
            <div className="flex mt-3 justify-between gap-1 max-md:flex-col">
              <div className="w-[45%] max-md:w-[100%]">
                <div className="flex justify-between px-2 py-2 border border-gray-300 rounded-md w-full">
                  {/* <p>{formatMobileNumber(userData?.mobileNumber)}</p> */}
                  <MDLabel
                    mobileNumber={userData?.mobileNumber}
                    inlineStyle={{ containerClass: 'font-bold' }}
                  />
                  <div className="flex gap-1">
                    <Image src={checkIcon} height={15} width={15} alt="check" />
                    <p className="text-primary tracking-wide">{otpVerified}</p>
                  </div>
                </div>

                <div className="flex mt-2 gap-2 items-start pt-1 rounded-md">
                  <input
                    type="checkbox"
                    className="h-4 w-4 mt-1 px-2 py-2 focus:outline-none focus:border-[1px] focus:border-[#931602]"
                    style={{ accentColor: '#0168A2' }}
                    onChange={handleCheckboxChange}
                    checked={initialMask}
                  />
                  <p className="text-left rounded-md">{mobileNumberMask}</p>
                </div>
              </div>
              <div className="w-[45%] max-md:w-[100%] mt-0">
                <input
                  type="text"
                  placeholder={`${emailPlaceholder} ${symbols?.asterisk}`}
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="px-2 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[1px] focus:border-[#931602]"
                />
              </div>
            </div>
            <div className="flex mt-3 justify-between gap-3 max-md:flex-col">
              <div className="w-[45%] max-md:w-[100%]">
                <MDSelectDropdown
                  inlineCSS={{
                    width: '100%',
                    height: '38.5px',
                    padding: '0px 8px',
                    dropdownFontSize: '14px',
                    fontSize: '14px',
                  }}
                  values={genders}
                  byDefaultText={auth?.userResult?.gender || genderLabel}
                  onClick={changeGender}
                  icon={ArrowIcon}
                  iconSize={'16px'}
                />
              </div>
              <div className="w-[45%] max-md:w-[100%]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    defaultValue={selectedDate}
                    className={`${styles.datePicker}`}
                    maxDate={today}
                    onError={(newError) => setError(newError)}
                    slotProps={{
                      textField: {
                        helperText: errorMessage,
                        placeholder: dateOfBirthPlaceholder,
                        size: 'small',
                      },
                      popper: {
                        style: { zIndex: 10000 },
                      },
                    }}
                    onChange={(newValue) => {
                      setSelectedDate(newValue)
                      setUserData({ ...userData, dateOfBirth: newValue })
                    }}
                    disabled={verify}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="w-full mt-3">
              <input
                type="text"
                className="w-full h-[38px] border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-[1px] focus:border-[#931602]"
                placeholder={addressPlaceholder}
                value={userData?.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between mt-3 ">
              <div className="w-full  ">
                <CountryStateCity
                  onCityChange={handleCityChange}
                  initialState={initialState}
                  initialCity={initialCity}
                  inlineCSS={{ gap: '20px' }}
                />
              </div>
            </div>
          </div>
          <div className="px-4">
            <h3 className="text-left mt-5 mb-3">
              {LanguagePreferencesText} <span className="text-primary"> *</span>
            </h3>
            <div className="grid grid-cols-4 gap-y-3 gap-x-3 max-md:grid-cols-3 mt-2 ">
              {languages.map((language) => (
                <button
                  key={language}
                  className={`px-2 py-2 border rounded-lg border-primary ${
                    userData.languagePreferences.includes(language) &&
                    'bg-primary text-white'
                  }`}
                  onClick={() =>
                    handleLanguageToggle(language, userData, setUserData)
                  }
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button
              className="px-7 py-2 mb-1 bg-primary text-white rounded text-[16px]"
              onClick={() =>
                handleEditProfile(
                  selectedDate,
                  userData,
                  onClose,
                  setAuth,
                  auth,
                  userType
                )
              }
            >
              {doneButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfileEditModal
