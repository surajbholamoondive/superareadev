import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import useWindowWidth from '@/context/useWindowWidth'
import { makeApiRequest, useNavigateToPath } from '@/utils/utils'
import { toast } from 'react-toastify'
import Step5 from '@/components/PostProperty/Step5'
import Stepper from '@/components/Stepper/Stepper'
import { GLOBALLY_COMMON_TEXT, USER_MODULE, NOTIFICATION_TYPE, COMPONENTS } from '@/textV2'
import LoggedOutPropertyPostModal from '@/components/MobileNumberverify/index'
import NewStep1 from '@/components/PostProperty/NewStep1'
import NewStep2 from '@/components/PostProperty/NewStep2'
import NewStep3 from '@/components/PostProperty/NewStep3'
import NewStep4 from '@/components/PostProperty/NewStep4'
import NewStep5 from '@/components/PostProperty/NewStep5'
import NewStep6 from '@/components/PostProperty/NewStep6'
import { useNotification } from '@/context/notificationContext'
import { generateValidationForStep } from '@/utils/DynamicPostPropertyChecks/dynamicChecksCreator'
import CheckComparator from '@/utils/PostPropertyCheckValidator/CheckComparator'

const { headings, text, routes } = USER_MODULE?.USER_ADD_PROPERTY_PAGE
const { propertyDetailsText, locationAndProperty, whatyourplan, postPropertyText } = headings
const { propertyAddedText, reasonText, accountRestrictionReason, aditionalDetailsText } = text
const { addpropertyRoute, addDraftRoute, getDraftRoute } = routes
const { aprrovedText, loginText, residentialText, restrictedText, camelSquareFeet } = GLOBALLY_COMMON_TEXT?.text
const { backButton, continueButton } = GLOBALLY_COMMON_TEXT?.buttons

const { stepFive } = COMPONENTS.POST_PROPERTY_COMPO
const { comma } = GLOBALLY_COMMON_TEXT?.symbols
const { carpetArea } = GLOBALLY_COMMON_TEXT?.units
export default function AddProperty() {
  const [declarationOne, setDeclarationOne] = useState(false)
  const [declarationTwo, setDeclarationTwo] = useState(false)
  const [DATA, setDATA] = useState({
    areaDetail: [
      {
        areaType: carpetArea,
        propertySize: null,
        propertySizeUnit: "squareFeet",
        display: true,
      },
    ],
    postedAs: ''
  })
const [loader, setLoader] = useState(false)
  const navigatePath = useNavigateToPath()
  const [data, setData] = useData()
  const windowWidth = useWindowWidth()
  const [currentStep, setCurrentStep] = useState(0)
  const [auth] = useAuth() || {}
  const { userResult } = auth || {}
  const { approvalStatus, statusMessage } = userResult || {}
  const [propertyId, setPropertyId] = useState([])
  const [isLoggedOutPropertyPostOpen, setIsloggedOutPropertyPostOpen] = useState(false)
  const [sellOrRent, setSellOrRent] = useState(false)
  const [propertyDetails, setPropertyDetails] = useState(false)
  const [listing, setListing] = useState('Rent')
  const [trigger, setTrigger] = useState(DATA?.propertySubType ? DATA?.propertySubType : residentialText)
  const [additionalDetails, setAdditionalDetails] = useState(false)
  const [isPreleasedOrRented, setPreleasedOrRented] = useState(false)
  const [isReraApproved, setReraApproved] = useState(false)
  const [anyConstructionDone, setAnyConstructionDone] = useState(false)
  const [isOthersClicked, setOthersClicked] = useState(false)
  const [postButtonDisabled, setPostButtonDisabled] = useState(false)
  const [selectDropdown, setSelectDropdown] = useState(false)
  const [role, setRole] = useState(null)
  const [locationVarified,setLocationVarified]=useState(false)


  const { storeNotification } = useNotification()

  const mergeDraft = (draft = {}, currentData) => {
    const merged = { ...currentData }
    merged.areaDetail = draft.areaDetail && Array.isArray(draft.areaDetail) && draft.areaDetail.length > 0
      ? draft.areaDetail
      : currentData.areaDetail
    return {
      ...merged,
      ...draft,
    }
  }
  const handleGetDraft = async () => {
    try {
      const { data } = await makeApiRequest('get', getDraftRoute)
      if (data?.responseCode === 200) {
        setDATA(prevData => ({
          ...prevData,
          ...mergeDraft(data?.result?.draft, prevData),
        }))
      }
      if (data?.result?.draft?.propertyTitle && data?.result?.draft?.propertyTitle !== '') {
        setSelectDropdown(true)
      }
    } catch (error) {
      console.error('Error fetching draft:', error)
      setDATA(prevData => ({
        ...prevData,
        ...mergeDraft({}, prevData),
      }))
    }
  }
  useEffect(() => {
    handleGetDraft()
  }, [])

  function convertToSquareFeet(areaType, areaValue) {
    const conversionFactors = {
      'square meters': 10.764,
      acres: 43560,
      'square yards': 9,
      'square feet': 1,
    }
    const conversionFactor = conversionFactors[areaType]
    if (conversionFactor !== undefined) {
      const squareFeet = areaValue * conversionFactor
      return squareFeet
    } else {
      console.error('Invalid area type. Conversion factor not defined.')
      return null
    }
  }

  const handleFinish = async () => {
    if (!DATA?.propertyDescription) {
      toast.error('Please provide a property description')
      return
    }
    if (!DATA?.postedAs) {
      toast.error('Please select a role')
      return
    }
    if (!declarationOne || !declarationTwo) {
      toast.error('Please accept the declaration')
      return
    } else {
      setDATA((prevDATA) => ({
        ...prevDATA,
        declaration: stepFive.reviewedDeclearationText
      }))
    }

    if (DATA.propertySizeType && DATA.propertySize) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        propertySize: convertToSquareFeet(
          DATA.propertySizeType,
          DATA.propertySize
        ),
        approvalStatus: {
          status: aprrovedText,
        },
      }))
    }
    if (!auth.userResult) {
      toast.error(loginText)
      return
    }
    try {
      setPostButtonDisabled(true)
      const res = await makeApiRequest('post', `${addpropertyRoute}`, DATA)
      if (res) {

        const propertyId = res.data.result.propertyResult._id


        if (!auth?.userResult?.isKycVerified) {
          storeNotification({
            userId: auth?.userResult?._id,
            notificationType: NOTIFICATION_TYPE.E_KYC
          })
        }
        storeNotification({
          userId: auth?.userResult?._id,
          notificationType: NOTIFICATION_TYPE.POST_PROPERTY,
          propertyId: propertyId
        })



        setDATA({
          DATA: null,
        })

        // const M_verify = res?.data?.result?.property_Result?._id

        // setPropertyId(M_verify)
        toast.success(propertyAddedText)
        setData('')
        navigatePath('listing')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setPostButtonDisabled(false)
    }
  }

  const isLand = DATA?.propertySubType === 'Plot/Land' || DATA?.propertySubType === 'Commercial Land' || DATA?.propertySubType === 'Farmhouse' || DATA?.propertySubType === 'Plot' || DATA?.propertySubType === 'Factory' || DATA?.propertySubType === 'Industrial Shed' || DATA?.propertySubType === 'Agricultural/Farm Land'

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

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
    setTrigger(
      DATA?.propertySubType ? DATA?.propertySubType : DATA?.propertyType
    )
  }

  const handleStepOneClick = () => {
    if (isLand) {
      setDATA(prevData => {
        const { furnishingStatus, ...restData } = prevData
        return restData
      })
    }
    const mandatoryFields = generateValidationForStep(DATA, 1, userResult?.userType)
    const canProceed = CheckComparator(DATA, mandatoryFields)
    if (!canProceed) {
      return
    }
    handleNext()
  }

  const handleStepTwoClick = () => {


    if (!selectDropdown) {
      return (
        toast.error('Please select a place from dropdown')
      )
    }

    if(!locationVarified){
      toast.error("Please wait for amenities to load")
      return
    }

    const mandatoryFields = generateValidationForStep(DATA, 2)
    const canProceed = CheckComparator(DATA, mandatoryFields)
    if (!canProceed) {
      return
    }
    handleNext()
  }

  const handleStepThreeClick = () => {
      const mandatoryFields = generateValidationForStep(DATA, 3)
      const canProceed = CheckComparator(DATA, mandatoryFields)
      if (!canProceed) {
        return
      }
      handleNext()
  }

  const handleStepFourCheck = () => {
    const imageUrl = DATA['propertyImages']?.[0]?.['url']
    if (!imageUrl) {
      toast.error('Please upload an image')
      return
    }
    handleNext()
  }

  const handleStepFiveCheck = () => {
    const mandatoryFields = generateValidationForStep(DATA, 5)
    const canProceed = CheckComparator(DATA, mandatoryFields)
    if (!canProceed) {
      return
    }
    handleNext()
  }

  const saveDraft = async () => {
    if (DATA.propertySizeType && DATA.propertySize) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        propertySize: convertToSquareFeet(
          DATA.propertySizeType,
          DATA.propertySize
        ),
        approvalStatus: {
          status: aprrovedText,
        },
      }))
    }
    if (!auth.userResult) {
      toast.error(loginText)
      return
    }
    try {

      const res = await makeApiRequest('put', `${addDraftRoute}`, DATA)

      if (res) {
        // if (auth?.userResult?.isKycVerified === true) {
        //   storeNotification({
        //     userId: auth?.userResult?._id,
        //     text: `Your property <strong>${DATA?.propertyTitle}</strong> is pending admin approval. You'll be notified once it's reviewed and approved.`,
        //     notificationType: 'admin push notification',
        //     time: 'high'
        //   })
        // } else {
        //   storeNotification({
        //     userId: auth?.userResult?._id,
        //     text: `Your property <strong>${DATA?.propertyTitle}</strong> will be reviewed for admin approval once you complete the e-KYC."`,
        //     notificationType: 'admin push notification',
        //     time: 'high'
        //   })
        // }

        // const M_verify = res?.data?.result?.property_Result?._id

        // setPropertyId(M_verify)
        toast.success('Draft Added Successfully')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(()=>{
    if(locationVarified && DATA.propertyTitle){
      setLocationVarified(false)
    }
  },[DATA.propertyTitle])



  const steps = [
    {
      title: whatyourplan,
      buttons: [{ label: 'Continue', onClick: [handleStepOneClick, saveDraft] }],
      component: (
        <NewStep1
          sellOrRent={sellOrRent}
          setSellOrRent={setSellOrRent}
          DATA={DATA}
          setDATA={setDATA}
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
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleStepTwoClick, saveDraft] },
      ],
      component: (
        <NewStep2
          DATA={DATA}
          setDATA={setDATA}
          trigger={trigger}
          setTrigger={setTrigger}
          listing={listing}
          setListing={setListing}
          setSelectDropdown={setSelectDropdown}
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
          setLocationVarified={setLocationVarified}
           loader={loader}
  setLoader={setLoader}
        />
      ),
    },
    {
      title: propertyDetailsText,
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleStepThreeClick, saveDraft] },
      ],

      component: (
        // <Step3
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   listing={listing}
        //   setListing={setListing}
        //   setPropertyDetails={setPropertyDetails}
        //   propertyDetails={propertyDetails}
        //   setAdditionalDetails={setAdditionalDetails}
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
      title: "Media Upload",
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleStepFourCheck, saveDraft] },
      ],
      component: (
        <NewStep4
          DATA={DATA}
          setDATA={setDATA}
          review={true}
        />
      )
    },
    {
      title: aditionalDetailsText,
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: continueButton, onClick: [handleStepFiveCheck, saveDraft] },
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
        { label: continueButton, onClick: [handleNext, saveDraft] },
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
      title: postPropertyText,
      buttons: [
        { label: backButton, onClick: [handleBack] },
        { label: postPropertyText, onClick: [handleFinish] },
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
          setRole={setRole}
          role={role}
          setDeclarationOne={setDeclarationOne}
          setDeclarationTwo={setDeclarationTwo}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
        />
      ),
    },
  ]

  if (approvalStatus === restrictedText) {
    return (
      <div className="w-full bg-white h-full border rounded-lg flex justify-center items-center text-sm">
        <div className="text-center text-[#931602]">
          <p>{accountRestrictionReason}</p>
          <p>
            {reasonText}
            {statusMessage}
          </p>
        </div>
      </div>
    )
  }


  return (
    <div className="flex rounded-md">
      <div className={`${windowWidth > 1024 ? `w-full` : `w-[100%]`}`}>
        <Stepper
          ButtonDisable={true}
          postButtonDisabled={postButtonDisabled}
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setDATA={setDATA}
          DATA={DATA}
          setPropertyDetails={setPropertyDetails}
          propertyDetails={sellOrRent && propertyDetails}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
        />
        <LoggedOutPropertyPostModal
          open={isLoggedOutPropertyPostOpen}
          onClose={setIsloggedOutPropertyPostOpen}
        />
      </div>
    </div>
  )
}