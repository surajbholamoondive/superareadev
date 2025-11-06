import React, { useState } from 'react'
import Image from 'next/image'
import { Step, StepConnector, StepLabel, Stepper } from '@mui/material'
import Box from '@mui/material/Box'
import { withStyles } from '@mui/styles'
import Modal from '@/components/popupModal/modal'
import ProfileEditComponent from '@/components/ProfileUpdateComponent/ProfileEditComponent'
import alert from '../../../assets/Kyc/e-kyc.svg'
import KycModal from './KycModal'
import { USER_MODULE } from '@/textV2'
import styles from './ReviewListing.module.css'
const {text,headings}=USER_MODULE?.USER_PROFILE_PAGE
const {aadharDetailsText,kycModalText,kycStepOneNote,eKycVerification,needNote,otpVerificationText,statusText}=text
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
})(StepConnector);
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
  }
})(StepLabel);

const ReviewDetails = ({ onClose, closeProfileModal, setIsReviewComplete }) => {
  const steps = [headings?.personalDetailsText ,aadharDetailsText, otpVerificationText, statusText]
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }
  if (activeStep === 1) {
    return (
      <KycModal
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onClose={onClose}
        closeProfileModal={closeProfileModal}
      />
    )
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
        modalWidth: 'w-[80%] max-sm:w-full',
        modalHeight: 'h-[90%] max-sm:h-full',
        childrenPaddings: 'p-9 max-sm:px-4',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
      }}
    >
      <div className="text-center max-sm:mb-5">
        <div className="items-center">
          <div className="h-20 m-auto rounded-full justify-center">
            <div
              className="font-poppins text-2xl text-black"
              style={{ color: 'var(--secondary-color)' }}
            >
              <span style={{ fontWeight: '900', fontSize: '1.5rem' }}>
                {eKycVerification.split(' ')[0]}
              </span>{' '}
              <span style={{ fontSize: '1.5rem' }}>
                {eKycVerification.split(' ').slice(1).join(' ')}
              </span>
            </div>

            <div className="text-black text-sm font-normal mt-1 max-sm:px-2">
              {needNote}
            </div>
          </div>
        </div>
      </div>

      <Box
        sx={{ width: '100%' }}
        className="mt-8 max-sm:max-w-full max-sm:px-2 max-sm:flex max-sm:justify-center"
      >
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

      <div className="flex justify-center items-center mt-10 px-4">
  <div className={`${styles.container} flex flex-row max-sm:flex-col max-sm:items-center`}>
    <Image
      src={alert}
      width={150}
      height={150}
      alt="alert"
      className="mr-10 max-sm:mr-0 max-sm:mb-4"
    />
    <div className="w-[480px] max-sm:w-full max-sm:text-center">
      <p className="leading-5 text-[14px] max-sm:px-2">
        {kycModalText}
      </p>
      <p
        className="bg-[#93160217] mt-4 w-[90%] max-sm:w-full rounded-[6px] leading-5 px-2 py-2 text-[14px]"
        style={{ color: 'var(--secondary-color)' }}
      >
        {kycStepOneNote}
      </p>
    </div>
  </div>
</div>


      <div className="flex justify-center mb-4 mt-10 max-sm:px-4">
        <ProfileEditComponent
          fields={[
            { name: 'firstName', enabled: true },
            { name: 'lastName', enabled: true },
            { name: 'email' },
            { name: 'mobileNumber', enabled: false },
          ]}
          buttonText={'Update Profile'}
          sectionHeading={'Edit Personal Details'}
          onClick={handleNext}
        />
      </div>
    </Modal>
  )
}

export default ReviewDetails