import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/auth'
import { useNotification } from '@/context/notificationContext'
import { getLogger } from '@/helper/logger'
import { ARROW_LEFT, ARROW_RIGHT, BACKSPACE, LETTER_V } from '@/text'
import  { GLOBALLY_COMMON_TEXT, USER_MODULE, NOTIFICATION_TYPE } from '@/textV2'
import { makeApiRequest, setLocalStorageItem } from '@/utils/utils'
import { Step, StepConnector, StepLabel, Stepper } from '@mui/material'
import Box from '@mui/material/Box'
import { withStyles } from '@mui/styles'
import { toast } from 'react-toastify'

import Modal from '@/components/popupModal/modal'

import otp1 from '../../../assets/Kyc/Aadhaar.svg'
import Verify from './Verify'

const { postType } = GLOBALLY_COMMON_TEXT?.text
const { headings, text } = USER_MODULE?.USER_PROFILE_PAGE
const { personalDetailsText } = headings
const {
  aadharDetailsText,
  authText,
  sixDigitCode,
  otpVerificationText,
  failedToGenrateNote,
  networkErrorNote,
  eKycVerification,
  needNote,
  statusText,
  userOtpSubmitRoute,
  verifyText,
  verifyingWithDots,
} = text
const CustomConnector = withStyles({
  active: {
    '& $line': {
      borderColor: 'var(--secondary-color)',
      borderTopWidth: 3,
    },
  },
  completed: {
    '& $line': {
      borderColor: 'var(--secondary-color)',
      borderTopWidth: 3,
    },
  },
  line: {
    borderColor: 'var(--secondary-color)',
    borderTopWidth: 3,
  },
})(StepConnector)
const CustomStepLabel = withStyles({
  root: {
    '& .MuiStepIcon-root': {
      color: 'gray', // default icon color (inactive)
    },
    '& .MuiStepIcon-root.Mui-active': {
      color: 'var(--secondary-color)', // active step icon background
    },
    '& .MuiStepIcon-root.Mui-completed': {
      color: 'var(--secondary-color)', // completed step icon background
    },
  },
})(StepLabel)

const OtpVerify = ({ onClose, transactionId, closeProfileModal }) => {
  const logger = getLogger()
  const steps = [
    personalDetailsText,
    aadharDetailsText,
    otpVerificationText,
    statusText,
  ]
  const [auth, setAuth] = useAuth()
  const user = auth?.userResult?._id
  const [activeStep, setActiveStep] = useState(2)
  const [otp, setOTP] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { storeNotification } = useNotification()

  const handleChange = (element, index) => {
    if (otp.join('').length === 6) {
      return
    }
    const newOTP = [...otp]
    if (newOTP[index] === '') {
      newOTP[index] = element
    } else {
      newOTP[index + 1] = element
    }
    if (element === '' && index > 0) {
      otpInputsRef.current[index - 1].focus()
    }
  }

  const otpInputsRef = useRef([
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
    { current: null },
  ])
  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  if (activeStep === 3) {
    return (
      <Verify
        setActiveStep={setActiveStep}
        onClose={onClose}
        closeProfileModal={closeProfileModal}
      />
    )
  }
  const submitOtp = async () => {
    setLoading(true)
    setError('')
    const fullOtp = otp.join('')
    try {
      const response = await makeApiRequest(postType, '/user/submit-otp', {
        otp: fullOtp,
        transactionId: transactionId,
      })
      const data = response?.data?.result
      if (response.status === 200) {
        setLocalStorageItem(authText, JSON.stringify(data))
        handleNext()
        toast.success(response.data.message || 'OTP verified successfully')
        storeNotification({
          userId: auth?.userResult?._id,
          notificationType: NOTIFICATION_TYPE.E_KYC,
          time: 'high',
        })
        setAuth(data)
      }
    } catch (error) {
      let errorMessage = failedToGenrateNote
      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error?.error?.message
      ) {
        errorMessage = error?.response?.data?.error?.error?.message
      } else if (!error.response) {
        errorMessage = networkErrorNote
      }
    } finally {
      setLoading(false)
    }
  }
  const handlePaste = (e, setOTP, otpInputsRef) => {
    e.preventDefault()
    const clipboardData = e.clipboardData || window.clipboardData
    const pastedData = clipboardData.getData('Text')
    if (/^\d{6}$/.test(pastedData)) {
      const newOTP = pastedData.split('').slice(0, 6)
      setOTP(newOTP)
      otpInputsRef.current[5].focus()
    }
  }

  const handleClose = () => {
    onClose(false)
  }

  const handleKeyDown = (e, index) => {
    if (otp.join('').length === 6 && e.key !== BACKSPACE) {
      e.preventDefault()
      return
    }
    if (e.key === BACKSPACE) {
      e.preventDefault()
      const newOTP = [...otp]
      newOTP[index] = ''
      setOTP(newOTP)
      if (index > 0) {
        otpInputsRef.current[index - 1].focus()
      }
    } else if (e.key === ARROW_LEFT) {
      if (index > 0) {
        otpInputsRef.current[index - 1].focus()
      }
    } else if (e.key === ARROW_RIGHT) {
      if (index < otp.length - 1) {
        otpInputsRef.current[index + 1].focus()
      }
    } else if (e.key === LETTER_V && (e.ctrlKey || e.metaKey)) {
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

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center',
        modalWidth: 'w-[65%] max-sm:w-full', // responsive width
        modalHeight: 'h-[90%] max-sm:h-fit',
        childrenPaddings: 'p-9 max-sm:px-4 max-sm:py-6',
        headingStyles: 'text-center text-black text-lg max-sm:text-base',
      }}
    >
      <div className="text-center relative">
        <div className="items-center mt-4">
          <div className="h-20 m-auto rounded-full justify-center">
            <div className="leading-8 text-black">
              <h2 className="text-xl font-semibold max-sm:text-lg">
                {eKycVerification}
              </h2>
            </div>
            <div className="text-black text-sm max-sm:text-xs mt-2">
              <p>{needNote}</p>
            </div>
          </div>
        </div>
      </div>

      <Box sx={{ width: '100%' }} className="my-6 max-sm:my-4">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomConnector />}
        >
          {steps.map((label) => (
            <Step key={label} completed={activeStep > steps.indexOf(label)}>
              <CustomStepLabel>{label}</CustomStepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className="flex justify-center">
        <Image
          src={otp1}
          width={120}
          height={140}
          alt="Otp"
          className="max-sm:w-[80px] max-sm:h-auto"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <p className="w-72 text-center font-medium max-sm:w-[90%] text-[var(--secondary-color)] text-base max-sm:text-sm">
          {sixDigitCode}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {otp.map((data, index) => (
            <input
              className="w-12 h-12 border border-gray-800 rounded-md text-center bg-transparent outline-none mt-4 max-sm:w-10 max-sm:h-10"
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onChange={(e) => handleChange(e.target, index)}
              onPaste={(e) => handlePaste(e, setOTP, otpInputsRef)}
              ref={(input) => (otpInputsRef.current[index] = input)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="border border-[var(--secondary-color)] text-[var(--secondary-color)] px-8 py-2 rounded-full max-sm:px-6 max-sm:py-1 text-sm"
          onClick={submitOtp}
          disabled={loading}
        >
          {loading ? verifyingWithDots : verifyText}
        </button>
      </div>
    </Modal>
  )
}
export default OtpVerify
