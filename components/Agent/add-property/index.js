import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import { useData } from '@/context/data';
import useWindowWidth from '@/context/useWindowWidth';
import { makeApiRequest, useNavigateToPath } from '@/utils/utils';
import { toast } from 'react-toastify';
import KycModal from '@/components/Agent/modal';
import Step5 from '@/components/PostProperty/Step5';
import Stepper from '@/components/Stepper/Stepper';
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT, NOTIFICATION_TYPE } from '@/textV2';
import NewStep1 from '@/components/PostProperty/NewStep1';
import NewStep2 from '@/components/PostProperty/NewStep2';
import NewStep3 from '@/components/PostProperty/NewStep3';
import NewStep4 from '@/components/PostProperty/NewStep4';
import NewStep5 from '@/components/PostProperty/NewStep5';
import NewStep6 from '@/components/PostProperty/NewStep6';
import { generateValidationForStep } from '@/utils/DynamicPostPropertyChecks/dynamicChecksCreator';
import CheckComparator from '@/utils/PostPropertyCheckValidator/CheckComparator';
import { useNotification } from '@/context/notificationContext'
const { headings, text, routes } = AGENT_MODULE?.AGENT_ADD_PROPERTY_PAGE
const { addpropertyRoute, getDraftRoute, addDraftRoute } = routes
const { propertyAddedText, aditionalDetailsText, reasonText, agentRestrictionReasonText } = text
const { locationAndProperty, whatyourplan, propertyDetailsText } = headings
const { comma } = GLOBALLY_COMMON_TEXT?.symbols
const { postType, camelSquareFeet, restrictedText, loginText, residentialText } = GLOBALLY_COMMON_TEXT?.text
const { carpetArea } = GLOBALLY_COMMON_TEXT?.units
const PostProperty = () => {
  const [declarationOne, setDeclarationOne] = useState(false)
  const [declarationTwo, setDeclarationTwo] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useData()
  const windowWidth = useWindowWidth()
  const [auth] = useAuth()
  const { userResult } = auth || {}
  const [propertyId, setPropertyId] = useState([])
  const [isKycUpdateModalOpen, setKycUpdateModalOpen] = useState(false)
  const [sellOrRent, setSellOrRent] = useState(false)
  const [propertyDetails, setPropertyDetails] = useState(false)
  const [listing, setListing] = useState('Rent')
  const [additionalDetails, setAdditionalDetails] = useState(false)
  const [isPreleasedOrRented, setPreleasedOrRented] = useState(false)
  const [isReraApproved, setReraApproved] = useState(false)
  const [anyConstructionDone, setAnyConstructionDone] = useState(false)
  const [isOthersClicked, setOthersClicked] = useState(false)
  const [postButtonDisabled, setPostButtonDisabled] = useState(false)
  const [selectDropdown, setSelectDropdown] = useState(false)
  const [locationVarified,setLocationVarified]=useState(false)
  const [loader, setLoader] = useState(false)
  
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

  const { storeNotification } = useNotification()

  const [trigger, setTrigger] = useState(
    DATA?.propertySubType ? DATA?.propertySubType : residentialText
  )

  const mergeDraft = (draft = {}, currentData) => {
    const merged = { ...currentData };
    merged.areaDetail = draft.areaDetail && Array.isArray(draft.areaDetail) && draft.areaDetail.length > 0
      ? draft.areaDetail
      : currentData.areaDetail;
    return {
      ...merged,
      ...draft,
    };
  };

  const isLand = DATA?.propertySubType === 'Plot/Land' || DATA?.propertySubType === 'Commercial Land' || DATA?.propertySubType === 'Farmhouse' || DATA?.propertySubType === 'Plot' || DATA?.propertySubType === 'Factory' || DATA?.propertySubType === 'Industrial Shed' || DATA?.propertySubType === 'Agricultural/Farm Land'


  const handleGetDraft = async () => {
    try {
      const { data } = await makeApiRequest('get', getDraftRoute);
      if (data?.responseCode === 200) {
        setDATA(prevData => ({
          ...prevData,
          ...mergeDraft(data?.result?.draft, prevData),
        }));
      }
      if (data?.result?.draft?.propertyTitle && data?.result?.draft?.propertyTitle !== '') {
        setSelectDropdown(true)
      }
    } catch (error) {
      console.error('Error fetching draft:', error);
      setDATA(prevData => ({
        ...prevData,
        ...mergeDraft({}, prevData),
      }));
    }
  };

  useEffect(() => {
    handleGetDraft();
  }, []);

  useEffect(() => {
    if (auth?.userResult?.isKycVerified === false) {
      setKycUpdateModalOpen(true)
    }

  }, [auth.userResult])

  const handleModalClose = () => {
    setKycUpdateModalOpen(false)
  }
  const navigatePath = useNavigateToPath()


  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (DATA?.propertyTitle) {
      const combinedAddress = DATA?.locality + comma + DATA?.city
      const regexAddress =
        DATA?.propertyTitle + comma + DATA?.locality + comma + DATA?.city
      setDATA({
        ...DATA,
        addressLabel: combinedAddress,
        propertySearchRegex: regexAddress,
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
  const handleFinish = async () => {
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
      setPostButtonDisabled(true)
      const res = await makeApiRequest(postType, `${addpropertyRoute}`, DATA)
      if (res) {
        setDATA({
          DATA: null,
        })


        const M_verify = res?.data?.result?.propertyResult?._id
        setPropertyId(M_verify)
        toast.success(propertyAddedText)
        setData('')
        navigatePath(`listing`)

        if (!auth?.userResult?.isKycVerified) {
          storeNotification({
            userId: auth?.userResult?._id,
            notificationType: NOTIFICATION_TYPE.E_KYC
          })
        }

        storeNotification({
          userId: auth?.userResult?._id,
          notificationType: NOTIFICATION_TYPE.POST_PROPERTY,
          propertyId: M_verify
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setPostButtonDisabled(false)
    }
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
      }))
    }
    if (!auth.userResult) {
      toast.error(loginText)
      return
    }
    try {

  

      const res = await makeApiRequest('put', `${addDraftRoute}`, DATA)



      if (res) {
        const M_verify = res?.data?.result?.property_Result?._id
        setPropertyId(M_verify)
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

    useEffect(()=>{
      console.log("location varified",locationVarified)
    },[locationVarified])

  const steps = [
    {
      title: whatyourplan,
      buttons: [{ label: 'Continue', onClick: [handleStepOneClick, saveDraft] }],
      component: (
        // <Step1
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   listing={listing}
        //   setListing={setListing}
        //   setPropertyDetails={setPropertyDetails}
        //   showCard={false}
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
          trigger={trigger}
          setTrigger={setTrigger}
          listing={listing}
          setListing={setListing}
          setPropertyDetails={setPropertyDetails}
          showCard={false}
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
        { label: 'Back', onClick: [handleBack] },
        { label: 'Continue', onClick: [handleStepTwoClick, saveDraft] },
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
          setSelectDropdown={setSelectDropdown}
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
          setLocationVarified={setLocationVarified}
                loader={loader}
  setLoader={setLoader}
        />
      ),
    },
    {
      title: propertyDetailsText,
      buttons: [
        { label: 'Back', onClick: [handleBack] },
        { label: 'Continue', onClick: [handleStepThreeClick, saveDraft] },
      ],
      component: (
        // <Step3
        //   DATA={DATA}
        //   setDATA={setDATA}
        //   trigger={trigger}
        //   setTrigger={setTrigger}
        //   setPropertyDetails={setPropertyDetails}
        //   propertyDetails={propertyDetails}
        //   listing={listing}
        //   setListing={setListing}
        //   setDeclarationOne={setDeclarationOne}
        //   setDeclarationTwo={setDeclarationTwo}
        //   declarationOne={declarationOne}
        //   declarationTwo={declarationTwo}
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
        { label: 'Back', onClick: [handleBack] },
        { label: 'Continue', onClick: [handleStepFourCheck, saveDraft] },
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
        { label: 'Back', onClick: [handleBack] },
        { label: 'Continue', onClick: [handleStepFiveCheck, saveDraft] },
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
        { label: 'Back', onClick: [handleBack] },
        { label: 'Continue', onClick: [handleNext, saveDraft] },
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
      title: 'Review & Post Property',
      buttons: [
        { label: 'Back', onClick: [handleBack] },
        { label: 'Post Property', onClick: [handleFinish] },
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

  if (userResult?.approvalStatus === restrictedText) {
    return (
      <div className="w-full bg-white h-full border rounded-lg flex justify-center items-center text-sm">
        <div className="text-center text-[#931602]">
          <p>{agentRestrictionReasonText}</p>
          <p>
            {reasonText}
            {userResult?.statusMessage}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {isKycUpdateModalOpen && <KycModal onClose={handleModalClose} />}
      <div>
        <Stepper
          ButtonDisable={true}
          postButtonDisabled={postButtonDisabled}
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setDATA={setDATA}
          DATA={DATA}
          setPropertyDetails={setPropertyDetails}
          propertyDetails={propertyDetails}
          declarationOne={declarationOne}
          declarationTwo={declarationTwo}
        />
      </div>
    </div>
  )
}
export default PostProperty