import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useData } from '@/context/data'
import { getLogger } from '@/helper/logger'
import styles from '@/pages/login/LoginUser.module.css'
import { storeRecommendedProperties } from '@/utils/helper'
import PhoneNumberInput from '@/utils/PhoneNumerInput'
import {
  getLocalStorageItem,
  makeApiRequest,
  setLocalStorageItem,
  useNavigateToPath,
} from '@/utils/utils'
import { toast } from 'react-toastify'
import MoresLogo from '@/components/Common/MoresLogo'
import Loading from '../loading'
import RightSideImage from '@/pages/register/assets/left-side-image.svg'

import Half from '@/pages/register/assets/half.svg'


import { GLOBALLY_COMMON_TEXT, LOGIN_PAGE } from '@/textV2'
const { agentText, individualText, postType } = GLOBALLY_COMMON_TEXT.text
const { text, routes } = LOGIN_PAGE
const LoginUser = () => {
  const logger = getLogger()
  const navigatePath = useNavigateToPath()
  const [otpSuccess, setOtpSuccess] = useState(false)
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mobileNumber, setMobileNumber] = useState()
  const [selectedRole, setSelectedRole] = useState('Individual')
  const [showBackground, setShowBackground] = useState(true)
  const router = useRouter()
  const [FormDATA, setFormDATA] = useState({
    mobileNumber: mobileNumber,
  })
  const [data, setData] = useData()
  useEffect(() => {
    const { type, value } = data
    if (type === text.phoneText && value) {
      setMobileNumber(value)
      setFormDATA({
        ...FormDATA,
        mobileNumber: value,
      })
    } else {
      setFormDATA({
        ...FormDATA,
        mobileNumber: '',
      })
    }
  }, [data])
  const handleCountryChange = (selectedOption) => {
    setFormDATA({
      ...FormDATA,
      countryCode: selectedOption,
    })
  }
  const handlePhoneNumberChange = (value) => {
    setMobileNumber(value)
    setFormDATA({
      ...FormDATA,
      mobileNumber: value,
    })
  }

  const handleLogin = async (event) => {
    
    event.preventDefault()


    
    if (mobileNumber === '') {
      toast.error(text.invalidInputText)
      return
    }
    if (mobileNumber?.startsWith("+91")) {
      const digits = mobileNumber?.replace("+91", "").replace(/\D/g, "")
      if (digits.length !== 10) {
        toast.error("Phone number must be exactly 10 digits")
        return
      }
    }
    try {
      setLoading(true)
      const payload = {
        ...FormDATA,
        mobileNumber,
        userType: selectedRole,
      }
      const response = await makeApiRequest(postType, routes.userLoginRoute, payload)
      const { responseCode } = response?.data || {}
      const { responseMessage } = response?.data || {}
      const mobileNumberr = response?.data?.result?.OTPResult?.mobileNumber
      const user = response?.data?.result?.OTPResult?._id
      setMobileNumber(mobileNumberr)
      if (responseCode === 200) {
        storeRecommendedProperties(user)
        setLocalStorageItem(text.mobileNumber, mobileNumber)
        setLocalStorageItem(text.userTypeText, selectedRole)
        setLocalStorageItem('userType', selectedRole)
        setLocalStorageItem(text.postingProperty, false)
        const query = {
          source: text.loginText,
        }
        navigatePath(routes.otpVerifyRoute, query)
        setOtpSuccess(true)
        toast.success(responseMessage)
        setLoading(false)
      } else {
        toast.error(responseMessage)
        setLoading(false)
      }
    } catch (error) {
      toast.error(error?.code)
      setLoading(false)
    }
  }
  const { countryCode } = FormDATA
  useEffect(() => {
    const isUserLoggedIn = 'true' === getLocalStorageItem(text.islogin)
    const isAdminLogin = 'true' === getLocalStorageItem(text.isAdminLogin)
    if (isAdminLogin || isUserLoggedIn) {
      setLogin(false)
    }
    if (!isAdminLogin && !isUserLoggedIn) {
      setLogin(true)
    }
    if (isUserLoggedIn || isAdminLogin) {
      router.push(routes.error404Route)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth >= 1000)
    }

    handleResize() 
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    handleLogin(event)
  }
}
  return login ? (
    <div className='bg-primary p-0 md:p-10'>
      <div className="h-screen custom-section "
        style={{
          backgroundImage: showBackground ? `url(${RightSideImage.src})` : `url(${Half.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

        <div className='max-md:flex max-md:w-full max-md:items-center max-md:justify-center md:px-0'>
          <MoresLogo />
        </div>

        <div className="flex flex-col justify-center items-center lg:flex lg:flex-row sm:px-20 relative h-full">
          <div className="flex items-center justify-center lg:w-[45%] md:w-[40%] lg:ml-auto">
            <div className={styles.leftContent}>
              <div className={`${styles.formWrapper}`}>
                <div className={styles.parent}>
                  <h2 className={`${styles.labels}`}>{text.welcomeBackText}</h2>

                  <div className={`${styles.buttonContainer}`}>
                    <div className="flex justify-start"></div>
                    <button
                      className={`py-2 px-6 rounded-l-full w-56 mt-3 ${selectedRole === individualText
                        ? 'bg-primary text-white'
                        : 'bg-lightRedBg text-primaryText'
                        }`}
                      onClick={() => setSelectedRole(individualText)}
                    >
                      {individualText}
                    </button>
                    <button
                      className={`py-2 px-6 rounded-r-full w-56 mt-3 ${selectedRole === agentText
                        ? 'bg-primary text-white'
                        : 'bg-lightRedBg text-primaryText'
                        }`}
                      onClick={() => setSelectedRole(agentText)}
                    >
                      {agentText}
                    </button>
                  </div>

                  <div className={`${styles.labels}`}>
                    <p className="mt-5 leading-5 text-primary">
                      {text.enterMobileNumber}
                    </p>
                  </div>
                  <div className={styles.formContainer}>
                    <form onSubmit={handleLogin} className="mb-5">
                      <div>
                        <div className={`border-[2px] border-solid border-primary rounded-full ${styles.mobileContainer}`} >
                          <PhoneNumberInput
                            dropdownStyle={{ width: '500px' }}
                            className={`${styles.inputMobileField} `}
                            value={mobileNumber}
                            onChange={handlePhoneNumberChange}
                            country={countryCode}
                            onCountryChange={handleCountryChange}
                            onKeyPress={handleKeyPress} 
                          />
                        </div>
                      </div>
                      <button
                        className={`${styles.button} text-md py-2 rounded-sm !mt-10 transition-colors duration-300`}
                        disabled={loading}
                        style={{
                          backgroundColor: "white",
                          color: "#931602",
                          border: "2px solid #931602",
                          width: "100%",
                          borderRadius: "28px"
                        }}
                      >
                        {loading ? text.upperCaseloginText : text.upperCaseloginText}
                      </button>
                      <div className="flex justify-between mt-4">
                        <p>{text.notRegisteredText}</p>
                        <Link
                          href={routes.registerRoute}
                          className="text-primary  cursor-pointer no-underline"
                          onClick={() => {
                            setData('')
                          }}
                        >
                          {text.registerText}
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}
export default LoginUser