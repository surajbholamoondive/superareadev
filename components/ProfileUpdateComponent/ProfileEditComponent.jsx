import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import CountryStateCity from '@/components/CountryStateCity/CountryStateCity'
import { GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'

const { femaleText, maleText, otherText } = GLOBALLY_COMMON_TEXT?.text
const { emailRegex } = GLOBALLY_COMMON_TEXT?.regexs
const { headings, text, buttons } = USER_MODULE?.USER_PROFILE_PAGE
const { authText, futureDatesError, selectGender, validEmailNote, invalidDateError, nameNote, profileEditedSuccess } = text
const { personalDetailsText } = headings
const { doneButton } = buttons

export default function ProfileEditComponent({
  fields,
  buttonText = doneButton,
  sectionHeading = personalDetailsText,
  onClick,
}) {
  const today = dayjs()
  const logger = getLogger()
  const [auth, setAuth] = useAuth()
  const [initialState, setInitialState] = useState('')
  const [error, setError] = useState(null)
  const userDob = auth?.userResult?.dateOfBirth
  const [initialCity, setInitialCity] = useState('')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    address: '',
    state:'',
    city: '',
    gender: '',
    mobileNumber: '',
  })
  const [selectedDate, setSelectedDate] = useState(userDob ? dayjs(userDob) : null)

  useEffect(() => {
    let dob = ''
    const { firstName, lastName, email, mobileNumber, address, city, state } = auth?.userResult || ''
    if (auth?.userResult?.dateOfBirth) {
      dob = auth?.userResult?.dateOfBirth.toString()
    }

    const data = {
      firstName,
      lastName,
      email,
      dateOfBirth: dob,
      mobileNumber,
      address,
      gender: auth?.userResult?.gender,
      city,
      state
    }

    setUserData(data)
    setSelectedDate(userDob ? dayjs(userDob) : null)
  }, [auth, userDob])

  useEffect(() => {
    const newState = userData?.state
    setInitialState(newState)
  }, [userData?.state])


   useEffect(() => {
     const cityState = userData?.city
     setInitialCity(cityState)
     if (cityState?.length === 2) {
       setInitialState(cityState[1])
       setInitialCity(cityState[0])
     }
  }, [userData?.city])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
  }

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate':
        return futureDatesError
      case 'invalidDate':
        return invalidDateError
      default:
        return ''
    }
  }, [error])

  const handleCityChange = (newCity, newState) => {
    const cityState = `${newCity}, ${newState}`
    setUserData({ ...userData, city: newCity })
  }

  const handleEditProfile = async () => {
    if (!emailRegex.test(userData.email)) {
      toast.error(validEmailNote)
      return
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}user/edit-profile`,
        userData
      )
      const Result = response?.data?.result
      const responseMessage = response?.data?.responseCode

      if (responseMessage === 200) {
        setAuth({
          ...auth,
          userResult: {
            ...auth.userResult,
            ...userData,
          },
        })
        localStorage.setItem(
          authText,
          JSON.stringify({
            ...auth,
            userResult: {
              ...auth.userResult,
              ...userData,
            },
          })
        )
        toast.success(profileEditedSuccess)
        onClick()
      }
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <div className="px-4 max-w-[800px] mx-auto mt-6">
      <h3 className="text-left text-xl font-semibold mb-6">{sectionHeading}</h3>

    <div className="grid grid-cols-2 gap-6 text-sm max-sm:flex max-sm:flex-col max-sm:gap-y-4">

        {fields.map((fieldName, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {formatFieldName(fieldName?.name)}
            <input
              type="text"
              placeholder={formatFieldName(fieldName?.name)}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
              name={fieldName?.name}
              disabled={fieldName?.enabled === false}
              value={userData ? userData[fieldName?.name] : ''}
              onChange={handleInputChange}
            />
            {fieldName?.name === 'firstName' && (
              <p className="bg-[#93160217] text-[14px] text-red-600 mt-2 px-2 py-1 rounded">
                {nameNote}
              </p>
            )}
            </label>
          </div>
        ))}

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
              {"Date of birth"}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={selectedDate}
              maxDate={today}
              onChange={(newValue) => {
                setSelectedDate(newValue)
                setUserData({ ...userData, dateOfBirth: newValue })
              }}
              onError={(newError) => setError(newError)}
              slotProps={{
                textField: {
                  helperText: errorMessage,
                  fullWidth: true,
                  placeholder: 'Date of birth (MM/DD/YYYY)',
                        size: 'small',
                },
                popper: {
                  style: { zIndex: 10000 },
                },
              }}
            />
          </LocalizationProvider>
          </label>
        </div>

        {/* Gender */}
        <div>
          <label  className="block text-sm font-medium text-gray-700 mb-1">
            {"Gender"}
            <select
              value={userData?.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            >
              <option value="not selected" disabled>
                {selectGender}
              </option>
              <option value="Male">{maleText}</option>
              <option value="Female">{femaleText}</option>
              <option value="Other">{otherText}</option>
            </select>
          </label>
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {"Office Address"}
            <input
              type="text"
              placeholder="Address Line"
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
              value={userData?.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
          </label>

        </div>

        {/* State/City */}
        <div className="col-span-2">
          <CountryStateCity
            onCityChange={handleCityChange}
            initialState={initialState}
            initialCity={initialCity}
          />
        </div>
      </div>

      <div className="flex justify-center my-8">
        <button
          className="border border-[var(--secondary-color)] text-[var(--secondary-color)] px-8 py-2 rounded-full"
          onClick={handleEditProfile}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
