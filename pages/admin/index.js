import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'

import {
  getLocalStorageItem,
  makeApiRequest,
  setLocalStorageItem,
} from '@/utils/utils'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import MoresLogo from '@/components/Common/MoresLogo'
import RightSideImage from '@/pages/register/assets/left-side-image.svg'

import Half from '@/pages/register/assets/half.svg'

import Loading from '../loading'
import styles from './index.module.css'
import OTP from './OTP'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2'
const { text } = GLOBALLY_COMMON_TEXT
const { ADMIN_LOGIN_PAGE } = ADMIN_MODULE
const { text: loginPageText, routes } = ADMIN_LOGIN_PAGE
const Admin = () => {
  const [auth, setAuth] = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [noDataModal, setNoDataModal] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [validRecoveryEmail, setValidRecoveryEmail] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [otp, setOTP] = useState(['', '', '', '', '', ''])
  const [resetOTP, setResetOTP] = useState()
  const [page, setPage] = useState('')
  const [showBackground, setShowBackground] = useState(true)

  const logger = getLogger(loginPageText.adminLoginText)
  const router = useRouter()
  useEffect(() => {
    const isAdminLoggedIn = 'true' === getLocalStorageItem(loginPageText.isAdminLogin)
    const isLogin = 'true' === getLocalStorageItem(loginPageText.isLogin)
    if (isAdminLoggedIn || isLogin) {
      router.push(routes.error)
    } else {
      setShow(true)
    }
  }, [])
  const otpInputsRef = useRef([
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
  ])
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
    e.preventDefault()
    handleAdminLogin(e)
    return
  }
    if (otp.join('').length === 6 && e.key !== loginPageText.backSpaceText) {
      e.preventDefault()
      return
    }
    if (e.key === loginPageText.backSpaceText) {
      e.preventDefault()
      const newOTP = [...otp]
      newOTP[index] = ''
      setOTP(newOTP)
      if (index > 0) {
        otpInputsRef.current[index - 1].focus()
      }
    } else if (e.key === loginPageText.arrowLeftText) {
      if (index > 0) {
        otpInputsRef.current[index - 1].focus()
      }
    } else if (e.key === loginPageText.arrowRightText) {
      if (index < otp.length - 1) {
        otpInputsRef.current[index + 1].focus()
      }
    } else if (e.key === loginPageText.letterV && (e.ctrlKey || e.metaKey)) {
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

  const handleOTP = async () => {
    try {
      const response = await makeApiRequest(text.postType, routes.sendForgetOtp, {
        email: recoveryEmail,
      })
      if (response?.data?.responseCode === 200) {
        setPage(loginPageText.otp)
        toast.success(loginPageText.otpSentSuccessfully)
      } else if (!response) {
        toast.error(loginPageText.emailDoesNotMatch)
      }
    } catch (error) {
      toast.error(loginPageText.somethingWentWrong)
      logger.error(error)
    }
  }
  const closeEditModal = () => {
    setNoDataModal(false)
  }
  const handleVerify = async () => {
    try {
      if (resetOTP.length === 6) {
        const response = await makeApiRequest(
          text.postType,
          routes.verifyOtp,
          { otp: resetOTP, email: recoveryEmail }
        )
        const { responseCode } = response?.data
        if (responseCode === 200) {
          toast.success(loginPageText.otpVerified)
          setPage(loginPageText.password)
        } else if (responseCode === 400) {
          toast.error(loginPageText.incorrectOtp)
        } else {
          toast.error(loginPageText.somethingWentWrong)
        }
      } else if (resetOTP.length === 0 || resetOTP.length <= 6) {
        toast.error(loginPageText.enterOtp)
      }
    } catch (error) {
      logger.error(error.message)
    }
  }
  const handlePasswordReset = async () => {
    try {
      if (newPassword === confirmNewPassword) {
        const response = await makeApiRequest(text.postType, routes.passwordReset, {
          password: newPassword,
        })
        if (response?.status === 200) {
          setPage('')
          setNewPassword('')
          setConfirmNewPassword('')
          toast.success(loginPageText.passwordChangedSuccessfully)
          setRecoveryEmail('')
        }
        return response.data
      } else {
        toast.error(loginPageText.passwordDoesNotMatch)
      }
    } catch (error) {
      logger.error(error.message)
    }
  }
  const handleRecoveryEmail = (event) => {
    setRecoveryEmail(event.target.value)
  }
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail)
  const handleCheckEmail = () => {
    setNoDataModal(false)
    if (isValid) {
      handleOTP()
      setIsLoading(true)
    } else {
      toast.error(loginPageText.incorrectEmail)
    }
  }
  const handleAdminLogin = async (event) => {
    const enteredOTP = otp.join('')

    event.preventDefault()
    if (enteredOTP.length === 0) {
      toast.error(loginPageText.authenticationCodeError)
      return
    }
    if (enteredOTP.length !== 6) {
      toast.error(loginPageText.completeAuthenticationCodeError)
      return
    }
    try {
      setLoading(true)
      const { data } = await makeApiRequest(text.postType, routes.adminLogin, {
        email,
        password,
        otp: enteredOTP,
      })
      const { responseCode, responseMessage, result } = data || {}
      const { userResult, token } = result || {}
      if (responseCode == 200) {
        Cookies.set('token', token, { expires: 45 })
        setLocalStorageItem(loginPageText.isLogin, 'false')
        setLocalStorageItem(loginPageText.isAdminLogin, 'true')
        toast.success(responseMessage)
        setAuth({
          userResult: userResult,
          token: token,
        })
        router.push(routes.adminDashboard)
      } else {
        toast.error(responseMessage)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      logger.error(err)
    }
  }
  if (page === loginPageText.otp) {
    return show ? (
      <div className="bg-primary p-10">
        <div className="h-screen custom-section "
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
              <OTP
                page={page}
                setPage={setPage}
                setResetOTP={setResetOTP}
                handleVerify={handleVerify}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    )
  }
  if (page === loginPageText.password) {
    return show ? (
      <div className="bg-primary p-10">
        <div className="h-screen custom-section "
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
                <div className={styles.formWrapper}>
                  <div className={styles.parent}>
                    <h2 className={`${styles.labels}`}>
                      {loginPageText.resetPassword}
                    </h2>
                    <div className={`${styles.labels}`}>
                      <p className=" leading-5">
                        {loginPageText.enterNewPassword}
                      </p>
                      <div className={styles.formContainer}>
                        <input
                          type="password"
                          value={newPassword}
                          required
                          className={styles.mobileContainer}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <div className={`${styles.labels}`}>
                          <p className=" leading-5">
                            {loginPageText.confirmNewPassword}{' '}
                          </p>
                        </div>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          required
                          minLength="8"
                          className={styles.mobileContainer}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                        <button
                          onClick={handlePasswordReset}
                          className={`${styles.button} ${newPassword && confirmNewPassword ? 'bg-button cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} ${loading && 'cursor-wait'}  text-md text-white py-2 rounded-lg mt-5`}
                        >
                          {loading ? text.loginText : loginPageText.submit}
                        </button>
                      </div>
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
  if (isLoading) {
     <Loading />
  }
  if (page === '') {
    return show ? (
      <div className='bg-primary p-10'>
        <div className="h-screen custom-section "
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
                <div className={styles.formWrapper}>
                  <div className={styles.parent}>
                    <h2 className={`${styles.labels}`}>{loginPageText.adminLoginText}</h2>
                    <div className={`${styles.labels}`}>
                      <p className=" leading-5">
                        {loginPageText.enterEmailId}
                      </p>
                    </div>
                    <div className={styles.formContainer}>
                      <form onSubmit={handleAdminLogin}>
                        <div>
                          <input
                            type="email"
                            value={email}
                            required
                            className={styles.mobileContainer}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className=" flex-col h-fit">
                          <h4 className=" mt-2">
                            {loginPageText.enterPassword}
                          </h4>
                          <input
                            type="password"
                            value={password}
                            required
                            minLength="8"
                            className={styles.mobileContainer}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <p
                            onClick={() => {
                              setNoDataModal(true)
                            }}
                            className="flex justify-end w-full self-end hover:font-semibold hover:cursor-pointer"
                          >
                            {loginPageText.forgotPassword}
                          </p>
                        </div>
                        <h4 className=''>{loginPageText.authenticationCode}</h4>
                        <div className='w-full flex  justify-center'>
                          {otp.map((value, index) => (
                            <input
                              type="text"
                              maxLength="1"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder=""
                              className="w-1/5 mx-2 py-1 text-center"
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
                              key={index}
                            />
                          ))}
                        </div>
                        <button
                          className={`${styles.button} ${email && password ? 'cursor-pointer' : 'bg-button cursor-not-allowed'} ${loading ? 'cursor-wait bg-gray-400' : 'bg-button'} text-white py-2 rounded-lg mt-10`}
                        >
                          {loading ? text.loginText : text.loginText}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {noDataModal && (
            <Modal
              open={noDataModal}
              onClose={closeEditModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className="flex items-center justify-center overflow-y-auto outline-none"
            >
              <Box className="bg-[#FFFFFF] px-3 py-4 rounded w-1/3 max-h-[90vh] overflow-y-auto">
                <h3 className="text-center mb-2">
                  {loginPageText.registeredEmailId}
                </h3>
                <div className="flex-col justify-center items-center">
                  <div className={`flex justify-center`}>
                    <input
                      type="text-center"
                      onChange={handleRecoveryEmail}
                      value={recoveryEmail}
                      placeholder="Enter Email"
                      className={`p-2 border border-solid border-black rounded-lg w-[250px]  ${styles.enterEmail}`}
                    ></input>
                  </div>
                  <p className="text-red-500  text-center ">
                    {recoveryEmail.length > 0 &&
                      !isValid &&
                      'enter valid email'}
                  </p>
                  <div className=" flex gap-10 justify-center m-4  ">
                    <div
                      onClick={closeEditModal}
                      className="flex items-center justify-center border border-1px h-10 w-20 rounded-md text-slate-500 bg-white cursor-pointer "
                    >
                      <button>{loginPageText.goBack}</button>
                    </div>
                    <div
                      onClick={handleCheckEmail}
                      className="flex items-center justify-center border border-1px h-10 w-20 rounded-md bg-[#931602] font-medium text-white cursor-pointer"
                    >
                      <button>{loginPageText.submit}</button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </div>
      </div>
    ) : (
      <Loading />
    )
  }
}
export default Admin
