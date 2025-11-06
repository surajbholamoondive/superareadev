import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { USER_MODULE } from '@/textV2'
import { Step, StepConnector, StepLabel, Stepper } from '@mui/material'
import Box from '@mui/material/Box'
import { withStyles } from '@mui/styles'

import Modal from '@/components/popupModal/modal'

import tag from '../../../assets/Kyc/tag.svg'

const CustomConnector = withStyles({
  active: {
    '& $line': {
      borderColor: '#0168A2',
      borderTopWidth: 3,
    },
  },
  completed: {
    '& $line': {
      borderColor: '#0168A2',
      borderTopWidth: 3,
    },
  },
  line: {
    borderColor: '#0168A2',
    borderTopWidth: 3,
  },
})(StepConnector)

const { headings, routes, text, buttons } = USER_MODULE?.USER_PROFILE_PAGE
const { personalDetailsText } = headings
const { userListingRoute, agentProfileRoute, userProfileRoute } = routes
const {
  nameNote,
  aadharDetailsText,
  agentText,
  statusText,
  eKycSuccessfulNote,
  eKycSuccessfulText,
  eKycVerification,
  detailsUpdatedNote,
  needNote,
  otpVerificationText,
  individualText,
} = text

const Verify = ({ onClose, closeProfileModal }) => {
  const steps = [
    personalDetailsText,
    aadharDetailsText,
    otpVerificationText,
    statusText,
  ]
  const [activeStep, setActiveStep] = React.useState(3)
  const [otp, setOtp] = useState(new Array(6).fill(''))

  const router = useRouter()
  const [auth] = useAuth()
  const pathName = router.asPath
  const firstName = auth?.userResult?.firstName ?? ''
  const lastName = auth?.userResult?.lastName ?? ''
  const fullName = `${firstName} ${lastName}`
  const handleChange = (element, index) => {
    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)

    if (element.nextSibling && element.value) {
      element.nextSibling.focus()
    }
  }
  if (activeStep === 4) {
    return <Verify />
  }
  const redirectToMyListing = () => {
    const { userType } = auth?.userResult || {}
    onClose(false)
    if (pathName === userListingRoute) {
      return
    }

    if (userType === individualText) {
      router.reload()
      router.push(userProfileRoute)
    } else if (userType === agentText) {
      router.reload()
      router.push(agentProfileRoute)
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
        paragraphStyles: 'text-center ',
        modalWidth: 'w-[65%]',
        modalHeight: 'h-[90%]',
        childrenPaddings: 'p-9',
        headingStyles: 'text-center text-black',
      }}
    >
      <div className="text-center ">
        <div className=" items-center">
          <div className="h-20 m-auto rounded-full justify-center">
            <div className="leading-10 text-black">
              <h2>{eKycVerification}</h2>
            </div>
            <div className="text-black leading-normal">
              <p>{needNote}</p>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ width: '100%' }} className="my-6">
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="flex justify-center">
        <Image src={tag} width={100} height={100} alt="tag" />
      </div>
      <div className="mt-7 flex justify-center">
        <div className="text-cyan-700">
          <h2> {eKycSuccessfulText} </h2>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="w-[400px] text-center text-black">
          <p>
            {' '}
            {fullName} {eKycSuccessfulNote}{' '}
          </p>
        </div>
      </div>
      <div className="flex justify-center text-start mt-2">
        <div className="w-[586px] bg-cyan-700 bg-opacity-5 rounded ml-5 mr-5">
          <p className=" px-10  text-cyan-700 ">{detailsUpdatedNote}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-6">
          <button
            type="button"
            className="w-72 bg-primary text-[1rem] text-white py-2.5 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out leading-normal focus:shadow-outline"
            onClick={redirectToMyListing}
          >
            {buttons?.backToProfile}
          </button>
        </div>
      </div>
    </Modal>
  )
}
export default Verify
