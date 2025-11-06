import React, { useState } from 'react'
import Image from 'next/image'
import { GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'
import { makeApiRequest } from '@/utils/utils'
import { Step, StepConnector, StepLabel, Stepper } from '@mui/material'
import Box from '@mui/material/Box'
import { withStyles } from '@mui/styles'
import { toast } from 'react-toastify'

import Modal from '@/components/popupModal/modal'
import OtpVerify from '@/components/User/profile/OtpVerify'

import Aadhar from '../../../assets/Kyc/adharimage.svg'

const {
  enterAadharNumber,
  aadharInfoNote,
  failedToGenrateNote,
  initiateVerification,
  eKycVerification,
  needNote,
  otpVerificationText,
  statusText,
  verifyingWithDots,
} = USER_MODULE?.USER_PROFILE_PAGE?.text
const { personalDetailsText, aadharDetailsText } =
  USER_MODULE?.USER_PROFILE_PAGE?.headings
const { genrateOptRoute } = USER_MODULE?.USER_PROFILE_PAGE?.routes
const { postType } = GLOBALLY_COMMON_TEXT?.text
const { aadharPlaceHolder } = USER_MODULE?.USER_PROFILE_PAGE?.placeholders

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
const KycModal = ({ onClose, closeProfileModal }) => {
  const steps = [
    personalDetailsText,
    aadharDetailsText,
    otpVerificationText,
    statusText,
  ]
  const [activeStep, setActiveStep] = useState(1)
  const [aadhaar, setAadhaar] = useState('')
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')

  const formatAadhaarNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, '')
    const spaced = numbersOnly.replace(/(\d{4})(?=\d)/g, '$1 ')
    return spaced
  }

  const handleAadhaarChange = (event) => {
    const formattedNumber = formatAadhaarNumber(event.target.value)
    setAadhaar(formattedNumber)
    setAadhaarNumber(event.target.value.replace(/\s+/g, ''))
  }

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }
  if (activeStep === 2) {
    return (
      <OtpVerify
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        transactionId={transactionId}
        onClose={onClose}
        closeProfileModal={closeProfileModal}
      />
    )
  }

  const generateOtp = async () => {
      if (!aadhaarNumber || aadhaarNumber.trim() === '') {
    toast.error('Please enter Aadhaar number');
    return;
  }
    setLoading(true)
    setError('')

    try {
      const response = await makeApiRequest(postType, genrateOptRoute, {
        aadhaarNumber: aadhaarNumber,
      })
      setTransactionId(response.data.transactionId)
      setOtpSent(true)
      toast.success(response?.data?.Responsee)
      handleNext()
    } catch (error) {
      console.log('error', error)

      let errorMessage = failedToGenrateNote
      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.error?.error?.message
      ) {
        errorMessage = error?.response?.data?.error?.error?.message
      } else if (!error.response) {
        errorMessage = 'Invalid Aadhaar Number.'
      }
      toast.error(errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose(false)
  }
  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center',
        modalWidth: 'w-[65%] max-sm:w-full',
        modalHeight: 'h-[90%] max-sm:h-full',
        childrenPaddings: 'p-9 max-sm:px-4',
        headingStyles: 'text-center text-black',
      }}
    >
      <div className="text-center relative mt-3">
        <h2 className="text-xl font-semibold text-[var(--secondary-color)]">
          {eKycVerification}
        </h2>
        <p className="text-sm text-black mt-1">{needNote}</p>
      </div>

      <Box className="my-8 w-full max-sm:mb-3">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <CustomStepLabel>{label}</CustomStepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className="bg-red-800 bg-opacity-10 rounded px-4 py-2 mx-auto mb-4 w-full max-w-md">
        <p className="text-red-800 text-sm text-left">{aadharInfoNote}</p>
      </div>

      <div className="flex justify-center mb-4">
        <Image
          src={Aadhar}
          width={350}
          height={400}
          alt="Aadhar"
          className="max-sm:w-[250px] max-sm:h-auto object-contain"
        />
      </div>

      <div className="text-center mt-6">
        <p className="text-sm" style={{ color: 'var(--secondary-color)' }}>
          {enterAadharNumber}
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={aadhaar}
          onChange={handleAadhaarChange}
          maxLength="14"
          placeholder={aadharPlaceHolder}
          className="text-center border border-gray-200 shadow-md rounded-lg p-2 text-lg w-full max-w-xs"
          style={{ borderColor: 'var(--secondary-color)', borderWidth: '2px' }}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="button"
          className="border border-[var(--secondary-color)] text-[var(--secondary-color)] px-8 py-2 rounded-full text-sm w-full max-w-xs"
          onClick={generateOtp}
          disabled={loading}
        >
          {loading ? verifyingWithDots : initiateVerification}
        </button>
      </div>
    </Modal>
  )
}

export default KycModal
