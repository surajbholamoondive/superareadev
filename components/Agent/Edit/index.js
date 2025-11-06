import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import {
  makeApiRequest,
  mapAvailableFacilities,
  useNavigateToPath,
} from '@/utils/utils'
import { toast } from 'react-toastify'
import Review from '@/components/EditModal/reviewListing'
import NewStep1 from '@/components/PostProperty/NewStep1'
import NewStep2 from '@/components/PostProperty/NewStep2'
import NewStep3 from '@/components/PostProperty/NewStep3'
import NewStep4 from '@/components/PostProperty/NewStep4'
import NewStep5 from '@/components/PostProperty/NewStep5'
import NewStep6 from '@/components/PostProperty/NewStep6'

import Step5 from '@/components/PostProperty/Step5'
import Stepper from '@/components/Stepper/Stepper'
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT,NOTIFICATION_TYPE } from '@/textV2'
import { useNotification } from '@/context/notificationContext'

const { propertyDetailsText, locationAndProperty, whatyourplan, whatIsYourAgent, reviewAndEdit } = AGENT_MODULE?.AGENT_EDIT_PROPERTY_PAGE?.headings
const { propertyEditedText, editErrorText, propertyReviewedText, capitalSell, capitalRent } = AGENT_MODULE?.AGENT_EDIT_PROPERTY_PAGE?.text
const { editPropertyRoute } = AGENT_MODULE?.AGENT_EDIT_PROPERTY_PAGE?.routes
const { additionalDetailsText, agentText, loginText, putType, residentialText, upForRent } = GLOBALLY_COMMON_TEXT?.text
const { comma } = GLOBALLY_COMMON_TEXT?.symbols
const { backButton, confirmButton, continueButton } = GLOBALLY_COMMON_TEXT?.buttons
const { propertyStatusArray } = GLOBALLY_COMMON_TEXT

const editPage = ({
  isReviewModalVisible,
  setIsReviewModalVisible,
  setIsReviewComplete,
  Type,
  ID,
  onClose,
  setData,
  API_PATH,
  editComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const windowWidth = useWindowWidth()
  const [auth] = useAuth()
  const router = useRouter()
  const currentPath = router.query
  const searchParams = useSearchParams()
  const [propertyId, setPropertyId] = useState([])
  const [sellOrRent, setSellOrRent] = useState(false)
  const [propertyDetails, setPropertyDetails] = useState(false)
  const [listing, setListing] = useState('Rent')
  const [additionalDetails, setAdditionalDetails] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [onConfirm, setonConfirm] = useState(false)
  const [declarationOne, setDeclarationOne] = useState(false)
  const [declarationTwo, setDeclarationTwo] = useState(false)


  // new state
  const [isOthersClicked, setOthersClicked] = useState(false)
  const [isPreleasedOrRented, setPreleasedOrRented] = useState(false)
  const [isReraApproved, setReraApproved] = useState(false)
  const [anyConstructionDone, setAnyConstructionDone] = useState(false)
const [loader, setLoader] = useState(false)

  const {storeNotification}=useNotification()

  const [DATA, setDATA] = useState({})
  const [trigger, setTrigger] = useState(
    DATA?.propertySubType ? DATA?.propertySubType : residentialText
  )
  const navigatePath = useNavigateToPath()
  const pathname = usePathname()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const propertyIdParam = params.get('propertyId')
    setPropertyId(propertyIdParam)
  }, [])
  const edit = true
  const API_PATHS = API_PATH || editPropertyRoute
  const logger = getLogger()
  useEffect(() => {
    if (ID && ID.availableFacilities) {
      const facilitiesStatus = mapAvailableFacilities(ID.availableFacilities)
      setDATA({
        ...ID,
        listing: ID.propertyStatus === upForRent ? capitalRent : capitalSell,
        ...facilitiesStatus,
      })
    }
  }, [ID])

  // const handleNext = () => {

  //   window.scrollTo({ top: 5, behavior: 'smooth' })
  //   if (DATA?.propertyTitle) {
  //     const combinedAddress = DATA?.locality + comma + DATA?.city
  //     setDATA({
  //       ...DATA,
  //       addressLabel: combinedAddress,
  //       propertySearchRegex: combinedAddress,
  //     })
  //   }
  //   if (currentStep < steps.length - 1) {
  //     if (currentStep === 0) {
  //       setCurrentStep(1)
  //     } else if (currentStep === 1) {
  //       setCurrentStep(2)
  //     } else if (currentStep === 2) {
  //       setCurrentStep(3)
  //     } else if (currentStep === 3) {
  //       setCurrentStep(4)
  //     }
  //   }
  //   setTrigger(
  //     DATA?.propertySubType ? DATA?.propertySubType : DATA?.propertyType
  //   )
  // }
  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (DATA?.propertyTitle) {
      const combinedAddress =
        DATA?.propertyTitle + comma + DATA?.locality + comma + DATA?.city
      setDATA({
        ...DATA,
        addressLabel: combinedAddress,
        propertySearchRegex: combinedAddress,
      })
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
    setTrigger(
      DATA?.propertySubType ? DATA?.propertySubType : DATA?.propertyType
    )
  }

  // const handleBack = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  //   if (currentStep > 0) {
  //     setCurrentStep(currentStep - 1)
  //   }
  //   setTrigger(
  //     DATA?.propertySubType ? DATA?.propertySubType : DATA?.propertyType
  //   )
  // }
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
    setTrigger(
      DATA?.propertySubType ? DATA?.propertySubType : DATA?.propertyType
    )
  }
  const handleFinish = async (id, API_PATHS) => {
    if (DATA.propertySizeType && DATA.propertySize) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        propertySize: convertToSquareFeet(
          DATA.propertySizeType,
          DATA.propertySize
        ),
      }))
    }
    if (!auth.userResult) {
      toast.error(loginText)
      return
    }
    try {
      setIsEditModalOpen(true)
      const res = await makeApiRequest(putType, `${API_PATHS}/${id}`, DATA)
      if (res?.data?.responseCode === 200) {
        if (propertyId != null) {
          onClose()
        }
        setDATA(res?.data?.result?.result)
        if (API_PATHS === API_PATH) {
          if (DATA?.postedBy?._id === auth?.userResult?._id) {
            setIsReviewComplete(true)
            if (DATA?.isAgentRequired === true) {
              setIsReviewComplete(true)
              setIsEditModalOpen(true)
            }
          } else {
            router.reload()
            onClose()
          }
          storeNotification({
            userId:auth?.userResult?._id,
            propertyId:DATA?._id,
            notificationType:NOTIFICATION_TYPE.S_VERIFICATION,
            subNotificationType :"REVIEW_LISTING"})
        } else {
          toast.success(propertyEditedText)
          setIsReviewComplete(true)
        }
      }
    } catch (error) {
      logger.error(editErrorText, error)
    }
  }
  const handleCloseModal = () => {
    setIsEditModalOpen(false)
    setIsReviewComplete(true)
  }
  const handleStepOneClick = () => {
    // alert('step 1 clicked')
    // return
    handleNext()
  }


  const steps = [
    {
      title: Type === agentText ? whatIsYourAgent : whatyourplan,
      // buttons: [{ label: continueButton, onClick: handleNext }],
      buttons: [{ label: 'Continue', onClick: [handleStepOneClick] }],
      component: (
        // <Step1
        //   sellOrRent={sellOrRent}
        //   setSellOrRent={setSellOrRent}
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   listing={
        //     ID?.propertyStatus === propertyStatusArray[0]
        //       ? propertyStatusArray[5]
        //       : propertyStatusArray[4]
        //   }
        //   setListing={setListing}
        //   setPropertyDetails={setPropertyDetails}
        //   showCard={Type === agentText ? false : true}
        //   edit={edit}
        //   setDeclarationOne={setDeclarationOne}
        //   setDeclarationTwo={setDeclarationTwo}
        //   declarationOne={declarationOne}
        //   declarationTwo={declarationTwo}
        // />
        <NewStep1
          sellOrRent={sellOrRent}
          setSellOrRent={setSellOrRent}
          DATA={DATA}
          setDATA={setDATA}
          edit={true}
          trigger={trigger}
          setTrigger={setTrigger}
          listing={listing}
          setListing={setListing}
          setPropertyDetails={setPropertyDetails}
          showCard={true}
          isOthersClicked={isOthersClicked}
          setOthersClicked={setOthersClicked}
          setDeclarationOne={setDeclarationOne}
          setDeclarationTwo={setDeclarationTwo}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
        />
      ),
    },
    {
      title: locationAndProperty,
      // buttons: [
      //   { label: backButton, onClick: handleBack },
      //   { label: continueButton, onClick: handleNext },
      // ],
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleNext] },
      ],
      component: (
        // <Step2
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   listing={listing}
        //   setListing={setListing}
        //   setPropertyDetails={setPropertyDetails}
        //   setDeclarationOne={setDeclarationOne}
        //   setDeclarationTwo={setDeclarationTwo}
        //   declarationOne={declarationOne}
        //   declarationTwo={declarationTwo}
        // />
        <NewStep2
          DATA={DATA}
          setDATA={setDATA}
          trigger={trigger}
          setTrigger={setTrigger}
          listing={listing}
          setListing={setListing}
          setPropertyDetails={setPropertyDetails}
          setDeclarationOne={setDeclarationOne}
          setDeclarationTwo={setDeclarationTwo}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
          isOthersClicked={isOthersClicked}
          setOthersClicked={setOthersClicked}
          setReraApproved={setReraApproved}
          isReraApproved={isReraApproved}
          setPreleasedOrRented={setPreleasedOrRented}
          isPreleasedOrRented={isPreleasedOrRented}
                loader={loader}
  setLoader={setLoader}
        />
      ),
    },
    {
      title: propertyDetailsText,
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleNext] },
      ],
      component: (
        // <Step3
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   setPropertyDetails={setPropertyDetails}
        //   listing={listing}
        //   setListing={setListing}
        //   setDeclarationOne={setDeclarationOne}
        //   setDeclarationTwo={setDeclarationTwo}
        //   declarationOne={declarationOne}
        //   declarationTwo={declarationTwo}
        //   review={true}
        // />
        <NewStep3
          DATA={DATA}
          setDATA={setDATA}
          setDeclarationTwo={setDeclarationTwo}
          setDeclarationOne={setDeclarationOne}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
          setAnyConstructionDone={setAnyConstructionDone}
          anyConstructionDone={anyConstructionDone}
        />
      ),
    },
    {
      // title: additionalDetailsText,
      title: "Media Upload",
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleNext] },
      ],
      component: (
        // <Step4
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   setAdditionalDetails={setAdditionalDetails}
        //   setPropertyDetails={setPropertyDetails}
        //   listing={listing}
        //   setListing={setListing}
        //   isReview={setIsReviewComplete && true}
        //   setDeclarationOne={setDeclarationOne}
        //   setDeclarationTwo={setDeclarationTwo}
        //   declarationOne={declarationOne}
        //   declarationTwo={declarationTwo}
        // />
        <NewStep4
          DATA={DATA}
          setDATA={setDATA}
          review={true}
        />
      ),
    },
    {
      title: additionalDetailsText,
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleNext] },
      ],
      component: (
        // <Step4
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   setPropertyDetails={setPropertyDetails}
        //   listing={listing}
        //   setListing={setListing}
        //   setDeclarationOne={setDeclarationOne}
        //   setDeclarationTwo={setDeclarationTwo}
        //   declarationOne={declarationOne}
        //   declarationTwo={declarationTwo}
        // />
        <NewStep5
          setDATA={setDATA}
          DATA={DATA}
          setDeclarationOne={setDeclarationOne}
          setDeclarationTwo={setDeclarationTwo}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
          setReraApproved={setReraApproved}
          isReraApproved={isReraApproved}
          setPreleasedOrRented={setPreleasedOrRented}
          isPreleasedOrRented={isPreleasedOrRented}
        />
      ),
    },
    {
      title: 'Tags and Labels',
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleNext] },
      ],
      component: (
        // <Step4
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   setPropertyDetails={setPropertyDetails}
        //   listing={listing}
        //   setListing={setListing}
        //   setDeclarationOne={setDeclarationOne}
        //   setDeclarationTwo={setDeclarationTwo}
        //   declarationOne={declarationOne}
        //   declarationTwo={declarationTwo}
        // />
        <NewStep6
          setDATA={setDATA}
          DATA={DATA}
          setDeclarationOne={setDeclarationOne}
          setDeclarationTwo={setDeclarationTwo}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
        />
      ),
    },
    {
      title: "Review Property",
      // buttons: [
      //   { label: backButton, onClick: [handleBack] },
      //   { label: "Review Property", onClick: [handleFinish] },
      // ],
      buttons: [
        { label: backButton, onClick: [handleBack] },
        {
          label: confirmButton,
          onClick: [() => {
            handleFinish(DATA?._id, API_PATHS)
          }],
        },
      ],
      component: (
        <Step5
          DATA={DATA}
          setDATA={setDATA}
          trigger={trigger}
          setTrigger={setTrigger}
          setPropertyDetails={setPropertyDetails}
          setAdditionalDetails={setAdditionalDetails}
          listing={listing}
          setListing={setListing}
          setDeclarationOne={setDeclarationOne}
          setDeclarationTwo={setDeclarationTwo}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
        />
      ),
    },
  ]
  return (
    <div>
      <Stepper
        ButtonDisable={true}
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setDATA={setDATA}
        DATA={DATA}
        setPropertyDetails={setPropertyDetails}
        propertyDetails={propertyDetails}
        edit={edit}
        declarationOne={declarationOne}
        declarationTwo={declarationTwo}
      />
      {isEditModalOpen &&
        DATA?.postedBy?._id === auth?.userResult?._id && (
          <Review
            onClose={handleCloseModal}
            isReviewModalVisible={isReviewModalVisible}
            setIsReviewModalVisible={setIsReviewModalVisible}
            editComplete={editComplete}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsReviewComplete={setIsReviewComplete}
            DATA={DATA}
            setData={setData}
            setDATA={setDATA}
            close={onClose}
          />
        )}
    </div>
  )
}

export default editPage
