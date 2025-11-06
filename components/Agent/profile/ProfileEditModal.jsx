import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ArrowIcon from '@/assets/ButtonIcons/downArrow.svg'
import { useAuth } from '@/context/auth'
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { handleEditProfile, handleLanguageToggle } from '@/utils/helper'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import dayjs from 'dayjs'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { toast } from 'react-toastify'

import CountryStateCity from '@/components/CountryStateCity/CountryStateCity'
import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'

import checkIcon from '../../../assets/userDashboard/check.svg'
import close from '../../../assets/userDashboard/close.svg'
import styles from './index.module.css'

const {
  otpVerified,
  lastNameRequired,
  firstNameRequired,
  emailRequired,
  updateImageText,
  nameNote,
  reraComingSoonText,
} = AGENT_MODULE?.AGENT_PROFILE_PAGE?.text
const { genderLabel } = AGENT_MODULE?.AGENT_PROFILE_PAGE?.inputLabels
const { personalDetailsText, LanguagePreferencesText } =
  AGENT_MODULE?.AGENT_PROFILE_PAGE?.headings
const { doneButton } = AGENT_MODULE?.AGENT_PROFILE_PAGE?.buttons
const { emailRegex } = GLOBALLY_COMMON_TEXT?.regexs
const { languagesArray } = GLOBALLY_COMMON_TEXT
const DEFAULT_USER_IMAGE = '/User_cicrle_light.svg'

const ProfileEditModal = ({ onClose }) => {
  const [auth, setAuth] = useAuth()
  const today = dayjs()
  const agentSince = auth?.userResult?.agentSince
  const userDOB = auth?.userResult?.dateOfBirth
  const userType = 'Agent'
  const [agentSinceDate, setAgenSinceDate] = useState(
    agentSince ? dayjs(agentSince) : null
  )
  const [selectedDate, setSelectedDate] = useState(
    userDOB ? dayjs(userDOB) : null
  )
  const [selectedImage, setSelectedImage] = useState(
    auth?.userResult?.profileImage
      ? auth?.userResult?.profileImage
      : DEFAULT_USER_IMAGE
  )
  const [error, setError] = useState(null)
  const [initialState, setInitialState] = useState('')
  const [initialCity, setInitialCity] = useState('')
  useEffect(() => {
    setSelectedDate(userDOB ? dayjs(userDOB) : null)
  }, [userDOB])

  let dob
  if (auth?.userResult?.dateOfBirth) {
    dob = auth?.userResult?.dateOfBirth.toString()
  } else {
    dob = ''
  }
  let agentDate
  if (auth?.userResult?.agentSince) {
    agentDate = auth?.userResult?.agentSince.toString()
  } else {
    agentDate = ''
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
    agentSince: agentDate,
    profileImage: profileImage,
    agentOfficeDetails: auth?.userResult?.agentOfficeDetails || '',
    languagePreferences: auth?.userResult?.languagePreferences || [],
  })

  useEffect(() => {
    const cityState = userData?.city
    const state = userData?.state
    setInitialState(state)
    setInitialCity(cityState)
  }, [userData?.city, userData?.state])
  const languages = languagesArray
  const currentDate = new Date().toISOString().slice(0, 10)
  const maxDate = currentDate
  const changeGender = (value) => {
    setUserData({ ...userData, gender: value })
  }
  const validateForm = () => {
    let isValid = true

    toast.dismiss()

    if (!userData.firstName) {
      toast.error(firstNameRequired)
      isValid = false
    }
    if (!userData.lastName) {
      toast.error(lastNameRequired)
      isValid = false
    }
    if (!userData.email) {
      toast.error(emailRequired)
      isValid = false
    } else if (!emailRegex.test(userData.email)) {
      toast.error('Invalid email format')
      isValid = false
    }
    if (!userData.mobileNumber) {
      toast.error('Mobile number is required')
      isValid = false
    }

    return isValid
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])
  const verify = auth?.userResult?.isKycVerified

  async function handleImageChange(event) {
    const imageFile = event.target.files[0]
    const formData = new FormData()
    formData.append('profileImage', imageFile)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/aws-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const newPhotoUrl = response.data.result.imageUrls[0]
      setSelectedImage(newPhotoUrl)
      setUserData({
        ...userData,
        profileImage: newPhotoUrl,
      })
    } catch (err) {
      console.error(err)
    }
  }
  const genders = ['Male', 'Female', 'Other']

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate': {
        return 'You cannot enter the future dates'
      }
      case 'invalidDate': {
        return 'Your Date is not valid'
      }
      default: {
        return ''
      }
    }
  }, [error])

  const handleCityChange = (newCity, newState) => {
    setUserData({
      ...userData,
      city: newCity || userData?.city,
      state: newState || userData?.state,
    })
  }
  return (
    <div className="fixed inset-0 bg-newBackground bg-opacity-50 h-full w-full z-[1101]">
      <div
        className={`mx-auto px-7 h-fit max-h-[95%] top-[50%] left-[50%] overflow-y-scroll mt-[20px] border w-[55%] max-lg:w-[80%] max-md:w-[90%] shadow-lg rounded-md bg-white ${styles.modalScroll} z-[9999] min-w-[375px]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="flex justify-end -mb-4 mt-2">
            <Image
              src={close}
              width={30}
              height={30}
              alt="Close"
              className="rounded-full p-2 border border-gray-400 cursor-pointer "
              onClick={() => {
                onClose(false)
              }}
            />
          </div>
          <div className="flex flex-col items-center">
            {auth?.userResult?.profileImage != '' ? (
              <div className="h-20 w-20 m-auto rounded-full flex justify-center">
                <Image
                  src={selectedImage}
                  height={120}
                  width={120}
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
                widht={90}
                objectFit="cover"
                alt="profile icon"
              />
            )}

            <label
              className=" leading-6  text-primary underline cursor-pointer mt-1"
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
            <h3 className="text-left  my-4">{personalDetailsText}</h3>
            <div className="flex mt-2  justify-between gap-1 max-lg:flex-col">
              <div className="w-[45%] max-lg:w-[100%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'First Name'}

                  <input
                    type="text"
                    placeholder="First name*"
                    className="px-2 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[1px] focus:border-[#931602]"
                    value={userData?.firstName}
                    onChange={(e) => {
                      setUserData({ ...userData, firstName: e.target.value })
                    }}
                  />
                </label>
              </div>
              <div className="w-[45%] max-lg:w-[100%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'Last Name'}

                  <input
                    type="text"
                    placeholder="Last name*"
                    className="px-2 py-2 border border-gray-300 rounded-md w-full  focus:outline-none focus:border-[1px] focus:border-[#931602]"
                    value={userData?.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>
            <p className="text-primary px-1 py-1 bg-noteBackground mt-1 rounded-md text-start">
              {nameNote}
            </p>
            <div className="flex mt-3  justify-between gap-1 max-md:flex-col">
              <div className="w-[45%] max-lg:w-[100%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'Mobile Number'}
                  <div className="flex justify-between px-2 py-2 border border-gray-300 rounded-md w-full">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="w-full bg-transparent focus:outline-none"
                      value={formatPhoneNumberIntl(userData?.mobileNumber)}
                      disabled
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          mobileNumber: e.target.value,
                        })
                      }
                      readOnly
                    />

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Image
                        src={checkIcon}
                        height={15}
                        width={15}
                        alt="Icon"
                      />
                      <p className="text-primary tracking-wide whitespace-nowrap">
                        {otpVerified}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              <div className="w-[45%] max-lg:w-[100%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'Email'}
                  <input
                    type="text"
                    placeholder="Email*"
                    value={userData?.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="px-2 py-2 border border-gray-300 rounded-md w-full  focus:outline-none focus:border-[1px] focus:border-[#931602]"
                  />
                </label>
              </div>
            </div>
            <div className="flex mt-3 justify-between gap-1 max-lg:flex-col">
              <div className="w-[45%] max-lg:w-[100%] ">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'Working Since'}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      defaultValue={agentSinceDate}
                      maxDate={today}
                      views={['year', 'month']}
                      onError={(newError) => setError(newError)}
                      className={`${styles.datePicker}`}
                      slotProps={{
                        textField: {
                          helperText: errorMessage,
                          placeholder: 'Working Since (YYYY)',
                          size: 'small',
                        },
                      }}
                      onChange={(newValue) => {
                        setSelectedDate(newValue)
                        setUserData({ ...userData, agentSince: newValue })
                      }}
                    />
                  </LocalizationProvider>
                </label>
              </div>
              <div className="w-[45%] max-lg:w-[100%] max-lg:mt-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'RERA Verified'}
                  <button className="border border-primary rounded-md  py-2 w-full bg-profileInputLandmark text-start px-2 ">
                    {reraComingSoonText}
                  </button>
                </label>
              </div>
            </div>
            <div className="flex mt-3 justify-between gap-1 max-lg:flex-col">
              <div className="w-[45%] max-lg:w-[100%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'Gender'}
                  <MDSelectDropdown
                    inlineCSS={{
                      width: '100%',
                      height: '38.5px',
                      padding: '0px 4px',
                      dropdownFontSize: '14px',
                      fontSize: '14px',
                      padding: '0px 8px',
                    }}
                    values={genders}
                    byDefaultText={userData?.gender || genderLabel}
                    onClick={changeGender}
                    icon={ArrowIcon}
                    iconSize={'16px'}
                  />
                </label>
              </div>
              <div
                className={`w-[45%] max-lg:w-[100%] max-lg:mt-1 ${styles.innerInput}`}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  {'Date of Birth'}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      defaultValue={selectedDate}
                      maxDate={today}
                      className={`${styles.datePicker}`}
                      onError={(newError) => setError(newError)}
                      slotProps={{
                        textField: {
                          helperText: errorMessage,
                          placeholder: 'Date of birth (MM/DD/YYYY)',
                          size: 'small',
                        },
                      }}
                      onChange={(newValue) => {
                        setSelectedDate(newValue)
                        setUserData({ ...userData, dateOfBirth: newValue })
                      }}
                    />
                  </LocalizationProvider>
                </label>
              </div>
            </div>

            <div className="flex mt-3  justify-between gap-1">
              <div className="w-full">
                <CountryStateCity
                  onCityChange={handleCityChange}
                  initialState={initialState}
                  initialCity={initialCity}
                  inlineCSS={{
                    gap: '60px',
                  }}
                />
              </div>
            </div>
            <div className="w-full mt-3 ">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                {'Office Address'}
                <input
                  type="text"
                  className="w-full h-[38px] border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:border-[1px] focus:border-[#931602]"
                  placeholder="Office Address"
                  value={userData?.agentOfficeDetails}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      agentOfficeDetails: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <h3 className="text-left  mt-6 mb-4 ">
              {LanguagePreferencesText}
              <span className="text-primary">*</span>
            </h3>

            <div className="grid grid-cols-6 gap-3 max-lg:grid-cols-3 mt-2 ">
              {languages.map((language) => (
                <button
                  key={language}
                  className={`px-1 py-2 border rounded-lg border-primary ${
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

            <div className="flex justify-center my-6">
              <button
                className="px-7 py-2 mt-2 mb-1 bg-primary text-white rounded text-[1rem] "
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
    </div>
  )
}
export default ProfileEditModal
