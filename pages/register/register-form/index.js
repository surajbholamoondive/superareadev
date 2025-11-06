import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import KeyImage from '@/pages/register/assets/key.svg'
import { GLOBALLY_COMMON_TEXT, REGISTERATION_TEXT } from '@/textV2'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/utils'
import axios from 'axios'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { formatPhoneNumberIntl } from 'react-phone-number-input/input'
import { toast } from 'react-toastify'
import { useNotification } from '@/context/notificationContext'
import {NOTIFICATION_TYPE} from "@/textV2"

const CountryStateCity = dynamic(() => import('@/components/CountryStateCity/CountryStateCity'))
const MoresLogo = dynamic(() => import('@/components/Common/MoresLogo'))
import RightSideImage from '@/pages/register/assets/left-side-image.svg'
import Half from '@/pages/register/assets/half.svg'
import styles from './RegisterAs.module.css'

const { text, routes } = REGISTERATION_TEXT
const { individualText, agentText } = GLOBALLY_COMMON_TEXT.text

const capitalizeWords = (str) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}

const RegisterUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [auth, setAuth] = useAuth()
  const [login, setLogin] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [isFirstNameFilled, setIsFirstNameFilled] = useState(true)
  const [isLastNameFilled, setIsLastNameFilled] = useState(true)
  const [cityName, setCityName] = useState('')
  const [stateName, setStateName] = useState('')
  const windowWidth = useWindowWidth()
  const [isMobileNumberFilled, setIsMobileNumberFilled] = useState(true)
  const [isEmailFilled, setIsEmailFilled] = useState(true)
  const [isCityNameFilled, setIsCityNameFilled] = useState(true)
  const [isStateNameFilled, setIsStateNameFilled] = useState(true)
  const router = useRouter()
  const [otpSuccess, setOtpSuccess] = useState(false)
  const Result = auth?.userResult?.userType
  const today = dayjs()
  const [selectedDate, setSelectedDate] = useState(null)
  const [initialState, setInitialState] = useState('')
  const [initialCity, setInitialCity] = useState('')
  const [error, setError] = useState(null)
  const [isDOBNameFilled, setIsDOBNameFilled] = useState(true)
  const [showBackground, setShowBackground] = useState(true)
  const logger = getLogger()
  
  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate': {
        return text.futureDateError
      }
      case 'invalidDate': {
        return text.yourDateIsInvalid
      }
      default: {
        return ''
      }
    }
  }, [error])
  
  const {storeNotification} = useNotification()

  useEffect(() => {
    const isUserLoggedIn = 'true' === getLocalStorageItem(text.isLoginText)
    const isAdminLoggedIn = 'true' === getLocalStorageItem(text.isAdminLogin)
    if (!isUserLoggedIn && !isAdminLoggedIn) {
      setLogin(false)
      router.push(routes.route404)
    } else {
      setLogin(true)
    }
    setMobileNumber(getLocalStorageItem(text.mobileNumber))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth >= 1000)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  let dob
  if (selectedDate) {
    dob = selectedDate.toString()
  } else {
    dob = ''
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/
    let validForm = true
    
    if (!firstName) {
      setIsFirstNameFilled(false)
      validForm = false
    } else {
      setIsFirstNameFilled(true)
    }

    if (!lastName) {
      setIsLastNameFilled(false)
      validForm = false
    } else {
      setIsLastNameFilled(true)
    }

    if (!mobileNumber) {
      if (auth?.userResult?.mobileNumber !== undefined) {
        setIsMobileNumberFilled(true)
      } else {
        setIsMobileNumberFilled(false)
        validForm = false
      }
    } else {
      setIsMobileNumberFilled(true)
    }

    if (!emailRegex.test(email)) {
      toast.error(text.enterValidEmail)
      setIsEmailFilled(false)
      validForm = false
      return
    }
    if (!email) {
      if (auth?.userResult?.email !== undefined) {
        setIsEmailFilled(true)
      } else {
        setIsEmailFilled(false)
        validForm = false
      }
    } else {
      setIsEmailFilled(true)
    }
    if (!cityName) {
      setIsCityNameFilled(false)
      validForm = false
    } else {
      setIsCityNameFilled(true)
    }
    if (!stateName) {
      setIsStateNameFilled(false)
      validForm = false
    } else {
      setIsStateNameFilled(true)
    }

    if (!selectedDate) {
      setIsDOBNameFilled(false)
      validForm = false
    } else {
      setIsDOBNameFilled(true)
    }
    
    const userType = getLocalStorageItem(text.userTypeText)
    if (validForm && isEmailFilled && isMobileNumberFilled) {
      let payload = {
        firstName,
        lastName,
        city: cityName,
        state: stateName,
        email: email,
        userType,
        dateOfBirth: dob,
      }
      try {
        const response = await axios.put('user/register-form', payload, {
          headers: {
            token: `${Cookies.get('token')}`,
          },
        })
        if (response.data?.responseCode === 200) {
          setOtpSuccess(true)
          toast.success(text.registerSuccessfully)
          const Data = response?.data?.result
          setAuth({ ...auth, userResult: Data })
          setLocalStorageItem(text.isLoginText, 'true')
          setLocalStorageItem(text.isAdminLogin, 'false')
          setLocalStorageItem(text.isRegisterComplete, 'true')
          Cookies.set('isAccountVerified', 'true', { expires: 45 })
          if (auth?.userResult?.userType === agentText) {
            storeNotification({
              userId: auth?.userResult?._id,
              text: text.ProfileUnderReview,
              notificationType: NOTIFICATION_TYPE.ADMIN_NOTIFICATIONS,
              time: 'high',
            })
            router.push('/')
          }
          router.push('/')
        }
      } catch (error) {
        console.error('Error registering user:', error)
      }
    }
  }

  const handlePlaceSelect = async (place) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=geometry&key=${process.env.NEXT_PUBLIC_apiGooglePlace}`
      )
      const location = response.data.result.geometry.location
      setCoordinates({
        lat: location.lat,
        lng: location.lng,
      })
    } catch (error) {
      logger.error(error)
    }
  }

  const handleChange = (setter) => (e) => {
    setter(capitalizeWords(e.target.value))
  }

  const handleCityChange = (newCity, newState) => {
    setCityName(newCity)
    setStateName(newState)
  }

  return login ? (
 <div className="bg-primary p-0 sm:p-10">
      <div className="h-screen custom-section relative"
        style={{
          backgroundImage: showBackground ? `url(${RightSideImage.src})` : `url(${Half.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

        <div className='px-36 md:px-0'>
          <MoresLogo />
        </div>

        <div className="flex flex-col justify-center items-center lg:flex lg:flex-row sm:px-20 relative h-full">
          <div className="flex items-center justify-center lg:w-[45%] md:w-[40%] lg:ml-auto">
            <div className={styles.leftContent}>
              <div className={`${styles.formWrapper}`}>
                <div className={styles.parent}>
                  <h2 className={`${styles.labels}`}>{text.registerText}</h2>
                  
                  <div className={`${styles.labels}`}>
                    <p className="mt-3 leading-5">
                      {`${text.continueRegistration} ${Result ? Result : individualText}.`}
                    </p>
                  </div>

                  <div className={styles.formContainer}>
                    <form className="mt-2 px-2" onSubmit={handleRegister}>
                      <div className="relative flex flex-col justify-center">
                        <div className="flex">
                          <input
                            type="text"
                            className={`${styles.nameInputField} flex-grow outline-none`}
                            style={{ border: !isFirstNameFilled && '1px solid red' }}
                            placeholder="First Name"
                            value={firstName}
                            onChange={handleChange(setFirstName)}
                          />
                          <input
                            type="text"
                            className={`${styles.nameInputField} flex-grow outline-none`}
                            style={{ border: !isLastNameFilled && '1px solid red' }}
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleChange(setLastName)}
                          />
                        </div>
                        <input
                          type="text"
                          className={`${styles.mobileNumberField} mt-4`}
                          style={{ border: !isMobileNumberFilled && '1px solid red' }}
                          placeholder={formatPhoneNumberIntl(mobileNumber)}
                          value={formatPhoneNumberIntl(mobileNumber)}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          defaultValue={auth?.userResult?.mobileNumber}
                          disabled={true}
                        />
                        <input
                          type="text"
                          className={`${styles.inputField} mt-4 outline-none`}
                          style={{ border: !isEmailFilled && '1px solid red' }}
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          defaultValue={auth?.userResult?.email}
                        />

                        <div className=" w-[100%] px-1.5 max-md:w-[100%] mt-1 mb-1 ">
                          <input
                            type="date"
                            className={`w-full px-2 py-2 border rounded `}
                            max={today.format('YYYY-MM-DD')}
                            onChange={(e) => setSelectedDate(dayjs(e.target.value))}
                          />
                        </div>
                        <div className={`${styles.cityInputField} mt-6`}>
                          <CountryStateCity
                            onCityChange={handleCityChange}
                            initialState={initialState}
                            initialCity={initialCity}
                            inlineCSS={{
                              gap: '10px',
                            }}
                          />
                        </div>
                        <div className="px-1">
                          <button
                            className="w-full lg:h-[45px] md:h-[50px] h-[47px] bg-button text-white py-2 rounded-lg mt-4"
                            type="submit"
                          >
                            {text.registerText}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Image positioned absolute */}
          <div className="absolute bottom-10 right-10">
            <Image src={KeyImage} height={80} alt="KeyImage" width={80} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default RegisterUser