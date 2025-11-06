import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import useWindowWidth from '@/context/useWindowWidth'
import styles from '@/pages/otp-verify/OtpVerification.module.css'
import {
  getLocalStorageItem,
  handlePaste,
  makeApiRequest,
  setLocalStorageItem,
  startTimer,
  useNavigateToPath,
} from '@/utils/utils'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import MoresLogo from '@/components/Common/MoresLogo'
import RightSideImage from '@/pages/register/assets/left-side-image.svg'
import Half from '@/pages/register/assets/half.svg'
import { GLOBALLY_COMMON_TEXT, LOGIN_PAGE } from '@/textV2'
const { text, routes } = LOGIN_PAGE
const { events, symbols } = GLOBALLY_COMMON_TEXT
const { postType, putType, redirectUrl, emailText, verifyText, verifyingText } = GLOBALLY_COMMON_TEXT.text
const VerifyOTP = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', ''])
  const router = useRouter()
  const navigatePath = useNavigateToPath()
  const [auth, setAuth] = useAuth()
  const [backendError, setError] = useState('')
  const [resendOtpMessage, setResendOtpMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [enteredMobileNumber, setEnteredMobileNumber] = useState('')
  const [data, setData] = useData()
  const [showBackground, setShowBackground] = useState(true)

  const [phone, setPhone] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [userType, setUserType] = useState('')
  const { source } = router?.query
  const windowWidth = useWindowWidth()
  useEffect(() => {
    const savedPhone = getLocalStorageItem(text.phoneText)
    if (savedPhone) {
      setPhone(savedPhone)
      setIsEdit(true)
    }
  }, [])
  useEffect(() => {
    const savedUserType = getLocalStorageItem('userType')
    if (savedUserType) {
      setUserType(savedUserType)
    }
  }, [])
  const handleEdit = () => {
    var enterData = {}
    if (enteredMobileNumber.includes(symbols.atTheRate)) {
      enterData = {
        email: enteredMobileNumber,
      }
      setData({
        type: emailText,
        value: enteredMobileNumber,
      })
    } else {
      enterData = {
        phone: enteredMobileNumber,
      }
      setData({
        type: text.phoneText,
        value: enteredMobileNumber,
      })
    }
    navigatePath(`/${source}`)
  }
  const otpInputsRef = useRef([
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
  ])
  let timerInterval
  useEffect(() => {
    startTimer()
    return () => {
      clearInterval(timerInterval)
    }
  }, [])
  useEffect(() => {
    const mobileNumber = getLocalStorageItem(text.mobileNumber)
    setEnteredMobileNumber(mobileNumber)
  }, [enteredMobileNumber])
  const [timer, setTimer] = useState(30)
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true)
  const [shouldRestartTimer, setShouldRestartTimer] = useState(false)
  useEffect(() => {
    const [timerInterval, getCurrentTimer] = startTimer(
      30,
      setResendButtonDisabled
    )
    const timerUpdate = setInterval(() => {
      setTimer(getCurrentTimer())
    }, 1000)
    return () => {
      clearInterval(timerInterval)
      clearInterval(timerUpdate)
    }
  }, [shouldRestartTimer])
  const handleOTPChange = (index, value) => {
    if (otp.join('').length === 6) {
      return
    }
    const newOTP = [...otp]
    if (newOTP[index] === '') {
      newOTP[index] = value
    } else {
      newOTP[index + 1] = value
    }
    if (value === '' && index > 0) {
      otpInputsRef.current[index - 1].focus()
    }
  }
  const handleKeyDown = (e, index) => {
  if (e.key === 'Enter') {
    console.log("working enter in otp")
    e.preventDefault()
    handleVerifyOTP()
    return
  }
    if (otp.join('').length === 6 && e.key !== events.backspace) {
      e.preventDefault()
      return
    }


    if (e.key === events.backspace) {
      e.preventDefault()
      const newOTP = [...otp]
      newOTP[index] = ''
      setOTP(newOTP)
      if (index > 0) {
        otpInputsRef.current[index - 1].focus()
      }
    } else if (e.key === events.arrowLeft) {
      if (index > 0) {
        otpInputsRef.current[index - 1].focus()
      }
    } else if (e.key === events.arrowRight) {
      if (index < otp.length - 1) {
        otpInputsRef.current[index + 1].focus()
      }
    } else if (e.key === text.vText && (e.ctrlKey || e.metaKey)) {
    } else if (/^\d$/.test(e.key)) {
      const newOTP = [...otp]
      if (index < 5) {
        otpInputsRef.current[index + 1].focus()
      }
      if (newOTP[index] === '') {
        newOTP[index] = e.key
      } else {
        newOTP[index + 1] = e.key
      }
      setOTP(newOTP)
    } else {
      e.preventDefault()
    }
  }
  const handleVerifyOTP = async () => {
    const mobileNumber = getLocalStorageItem(text.mobileNumber)
    const IsLogin = getLocalStorageItem(text.islogin)
    const PostingProperty = getLocalStorageItem(text.postingProperty)
    const isRedirected = getLocalStorageItem(redirectUrl)
    const enteredOTP = otp.join('')
    if (enteredOTP.length == 0) {
      toast.error(text.provideOTP)
      return
    }
    if (enteredOTP.length !== 6) {
      toast.error(text.enterCompleteOtp)
      return
    }
    const payload = {
      mobileNumber,
      otp: enteredOTP,
      userType,
    }
    try {
      setLoading(true)
      const response = await makeApiRequest(
        postType,
        routes.verifyOtpRoute,
        payload
      )
      const { responseCode, result, responseMessage } = response?.data || {}
      const { token } = result || {}
      if (responseCode === 200) {
        Cookies.set('token', token, { expires: 45 })
        Cookies.set(
          'isAccountVerified',
          result?.userResult?.isAccountVerified,
          { expires: 45 }
        )
        setAuth(result)
        setLocalStorageItem(
          text.mobileNumber,
          result?.userResult?.mobileNumber
        )
        // removeLocalStorageItem(MOBILE_NUMBER_TEXT)
        toast.success(responseMessage)
        setLoading(false)
        if (source === text.loginText && isRedirected) {
          setLocalStorageItem(text.islogin, 'true')
          setLocalStorageItem(text.isAdminLogin, 'false')
          router.push(isRedirected)
          setLocalStorageItem(redirectUrl, '')
        } else if (source === text.loginText) {
          if (!result?.userResult?.isAccountVerified) {
            setLocalStorageItem(text.islogin, 'true')
            setLocalStorageItem(text.isAdminLogin, 'false')
            router.push(routes.registerFormRoute)
          } else {
            setLocalStorageItem(text.islogin, 'true')
            setLocalStorageItem(text.isAdminLogin, 'false')
            router.push(symbols.slash)
          }
        } else {
          router.push(routes.registerFormRoute)
          setLocalStorageItem(text.islogin, 'true')
          setLocalStorageItem(text.isAdminLogin, 'false')
        }
      } else {
        setLocalStorageItem(text.islogin, 'false')
        setLocalStorageItem(text.isAdminLogin, 'false')
        toast.error(responseMessage)
        setLoading(false)
        throw new Error(text.verificationFailed)
      }
    } catch (error) {
      toast.error(error?.code)
      setLoading(false)
    }
  }
  const handleResendOTP = async () => {
    const mobileNumber = getLocalStorageItem(text.mobileNumber)
    const userType = getLocalStorageItem(text.userTypeText)
    if (!mobileNumber) {
      return
    }
    const payload = {
      mobileNumber: mobileNumber,
      userType: userType,
    }
    try {
      setLoading(false)
      const response = await makeApiRequest(putType, routes.userResendOtpRoute, payload)
      const { responseCode } = response?.data || {}
      const { responseMessage } = response?.data || {}
      if (responseCode === 200) {
        const newOTP = Array.from({ length: 6 }, () => '')
        setOTP(newOTP)
        otpInputsRef.current.forEach((inputRef) => {
          if (inputRef && inputRef.current) {
            inputRef.current.value = ''
          }
        })
        setShouldRestartTimer((prev) => !prev)
        setResendButtonDisabled(true)
        toast.success(text.otpSentSuccessfully)
        setLoading(false)
        setTimeout(() => {
          setResendOtpMessage('')
        }, 30000)
        navigatePath(routes.otpVerifyRoute)
      } else {
        setError(responseMessage)
        toast.error(responseMessage)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }
  const formatTime = (seconds) => {
    return seconds < 10 ? `00:0${seconds}` : `00:${seconds}`
  }


  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth >= 1000)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return (
   <div className="bg-primary p-0 sm:p-10">
      <div className="h-screen custom-section relative"
        style={{
          backgroundImage: showBackground ? `url(${RightSideImage.src})` : `url(${Half.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

        <div className='px-24 md:px-0 '>
          <MoresLogo />
        </div>

        <div className="flex flex-col justify-center items-center lg:flex lg:flex-row sm:px-20 relative h-full ">
          <div className="flex items-center justify-center lg:w-[45%] md:w-[40%] lg:ml-auto " style={{ width:"320px" }}>
            <div className={styles.leftContent}>
              <div className={`${styles.formWrapper}`}>
                <div className={styles.parent}>
                  <h2 className={`${styles.labels}`}>
                    {text.verifyOtp}
                  </h2>
                  <p className="mt-5 leading-5">
                    {text.enterSixDigitOtp}
                  </p>

                  <div className="flex mt-8 w-full justify-between">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder=""
                        className="w-1/5 mx-1 py-1 text-center"
                        style={{
                          background: 'none',
                          border: 'none',
                          borderBottom: '2px solid gray',
                          outline: 'none',
                        }}
                        value={value}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onPaste={(e) => handlePaste(e, setOTP, otpInputsRef)}
                        ref={(input) => (otpInputsRef.current[index] = input)}
                      />
                    ))}
                  </div>

                  {timer > 0 ? (
                    <div className="flex w-full text-end text-primary justify-end mt-4">
                      <p>{timer > 0 && formatTime(timer)}</p>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full items-center mt-4">
                      <div className="text-black">
                        <p>{text.didNotGet}</p>
                      </div>
                      <button
                        onClick={handleResendOTP}
                        className={`rounded focus:outline-none ${resendButtonDisabled
                          ? 'text-gray-500 tracking-wide'
                          : 'text-primary tracking-wide'
                          }`}
                        disabled={resendButtonDisabled}
                      >
                        {text.resendOtpText}
                      </button>
                    </div>
                  )}

                  <div className={styles.buttonContainer}>
                    <button
                      className={`${styles.button} bg-button text-md text-white py-2 rounded-lg mt-5`}
                      onClick={handleVerifyOTP}
                      disabled={loading}
                    >
                      {loading ? verifyingText : verifyText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}
export default VerifyOTP
