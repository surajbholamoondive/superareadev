import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PROJECT_KEYS } from '@/text'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { makeApiRequest, ValidateCustomURL } from '@/utils/utils'
import { toast } from 'react-toastify'

import Stepper from '@/components/Stepper/Stepper'

import ProjectSEO from './ProjectSEO'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import StepRera from './StepRera'

const { POST_PROJECT_COMPO } = COMPONENTS
const { indexFileText, routes } = POST_PROJECT_COMPO
const {
  text,
  projectStep1Check,
  projectStep3Check,
  projectStep3LandCheck,
  projectKeys,
} = GLOBALLY_COMMON_TEXT
const PostProject = () => {
  const router = useRouter()
  const isProjectEdit = true
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [projectData, setProjectData] = useState({
    projectAreaUnit: indexFileText.acres,
    flooring: indexFileText.mosaic,
    approvalStatus: { status: indexFileText.active },
    roadFacingPlotLength: null,
    roadFacingPlotBreadth: null,
    roadFacingPlotBreadthPerUnit: '',
    roadFacingPlotLengthPerUnit: '',
    plotAreaLength: null,
    plotAreaBreadth: null,
    plotAreaLengthPerUnit: '',
    plotAreaBreadthPerUnit: '',
    openSides: '',
    boundaryWalls: '',
    unitCount: '',
    unitTitle: '',
    bedroomCount: '',
    bathroomCount: '',
    dedicatedRoom: '',
    salePrice: '',
    plotSalePrice: '',
    minPrice: '',
    maxPrice: '',
    plotMinPrice: '',
    plotMaxPrice: '',
    activeInput: false,
    isplotRange: false,
    projectReraId: '',
    projectStatus: '',
    projectType: '',
    projectStartDate: '',
    projectCompletionDate: '',
    projectTotalArea: null,
    projectTotalAreaUnit: '',
    projectDocuments: [],
    sanctioningAuthority: '',
    reraExternalLink: '',
    projectSubType: '',
    primaryArea: {
      areaSize: null,
      areaUnit: indexFileText.squareFeet,
      areaType: indexFileText.carpetArea,
      pricePerUnit: null,
      displayUnitSize: false,
    },
    secondaryArea: {
      areaSize: null,
      areaUnit: indexFileText.squareFeet,
      areaType: indexFileText.builtUpArea,
      pricePerUnit: null,
      displayUnitSize: false,
    },
    tertiaryArea: {
      areaSize: null,
      areaUnit: indexFileText.squareFeet,
      areaType: indexFileText.superBuiltUpArea,
      pricePerUnit: null,
      displayUnitSize: false,
    },
    reraArea: {
      reraCarpetArea: null,
      reraCarpetAreaUnit: indexFileText.squareFeet,
      reraCarpetAreaPrice: null,
      displayReraCarpetArea: false,
    },
  })

  const [draftData, setDraftData] = useState({
    projectAreaUnit: indexFileText.acres,
    flooring: indexFileText.mosaic,
    approvalStatus: { status: indexFileText.active },
    roadFacingPlotLength: null,
    roadFacingPlotBreadth: null,
    roadFacingPlotBreadthPerUnit: '',
    roadFacingPlotLengthPerUnit: '',
    plotAreaLength: null,
    plotAreaBreadth: null,
    plotAreaLengthPerUnit: '',
    plotAreaBreadthPerUnit: '',
    plotHeight: null,
    plotHeightPerUnit: '',
    openSides: '',
    boundaryWalls: '',
    unitCount: '',
    unitTitle: '',
    bedroomCount: '',
    bathroomCount: '',
    dedicatedRoom: '',
    salePrice: '',
    plotSalePrice: '',
    minPrice: '',
    maxPrice: '',
    plotMinPrice: '',
    plotMaxPrice: '',
    activeInput: false,
    isplotRange: false,
    projectReraId: '',
    projectStatus: '',
    projectType: '',
    projectStartDate: '',
    projectCompletionDate: '',
    projectTotalArea: null,
    projectTotalAreaUnit: '',
    projectDocuments: [],
    sanctioningAuthority: '',
    reraExternalLink: '',
    projectSubType: '',
    primaryArea: {
      areaSize: null,
      areaUnit: indexFileText.squareFeet,
      areaType: indexFileText.carpetArea,
      pricePerUnit: null,
      displayUnitSize: false,
    },
    secondaryArea: {
      areaSize: null,
      areaUnit: indexFileText.squareFeet,
      areaType: indexFileText.builtUpArea,
      pricePerUnit: null,
      displayUnitSize: false,
    },
    tertiaryArea: {
      areaSize: null,
      areaUnit: indexFileText.squareFeet,
      areaType: indexFileText.superBuiltUpArea,
      pricePerUnit: null,
      displayUnitSize: false,
    },
    reraArea: {
      reraCarpetArea: null,
      reraCarpetAreaUnit: indexFileText.squareFeet,
      reraCarpetAreaPricePerUnit: null,
      displayReraCarpetArea: false,
    },
  })

  const [developerDetail, setDeveloperDetail] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [unitList, setUnitList] = useState([])
  const [landAmenity, setLandAmenity] = useState({})
  const [projectDetails, setProjectDetails] = useState(false)
  const [selectDropdown, setSelectDropdown] = useState(false)
  const [activeInput, setActiveInput] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [isplotRange, setIsPlotRange] = useState(false)
  const isLand =
    projectData?.projectSubType === indexFileText.residentialPlot ||
    projectData?.projectSubType === indexFileText.residentialLand ||
    projectData?.projectSubType === indexFileText.farmHouse ||
    projectData?.projectSubType === indexFileText.commercialLand ||
    projectData?.projectSubType === indexFileText.warehouse ||
    projectData?.projectSubType === indexFileText.godown ||
    projectData?.projectSubType === indexFileText.scoPlot ||
    projectData?.projectSubType === indexFileText.industrialLand ||
    projectData?.projectSubType === indexFileText.industrialShed ||
    projectData?.projectSubType === indexFileText.agriculturalLand

  // useEffect(() => {
  //   if (isLand) {
  //     setProjectData(prev => ({
  //       ...prev,
  //       primaryArea: {
  //         ...prev.primaryArea,
  //         areaType: indexFileText.plotArea,
  //         displayUnitSize: true
  //       }
  //     }));
  //   }
  // }, [projectData.projectSubType, isLand]);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (currentStep < steps.length - 1) {
      if (currentStep === 0) {
        setCurrentStep(1)
      } else if (currentStep === 1) {
        setCurrentStep(2)
      } else if (currentStep === 2) {
        setCurrentStep(3)
      } else if (currentStep === 3) {
        setCurrentStep(4)
      } else if (currentStep === 4) {
        setCurrentStep(5)
      } else if (currentStep === 5) {
        setCurrentStep(6)
      }
    }
  }
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepRera = () => {
    handleNext()
  }
  const handleStepTwo = () => {
    if (unitList?.length === 0) {
      toast.error(indexFileText.missingUnitDetails)
      return
    }
    setProjectData({
      ...projectData,
      projectUnits: unitList,
    })
    handleNext()
  }

  const handleStepOne = () => {
    if (!selectDropdown) {
      toast.error(indexFileText.selectDropdownText)
      return
    }
    if (isLand) {
      setProjectData((prevData) => {
        const { flooring, ...restData } = prevData
        return restData
      })
    }
    const check = checkFieldStepOne()
    if (!check) {
      return
    }
    handleNext()
  }

  const handleStepThree = () => {
    const check = checkFieldStepThree()
    if (!check) {
      return
    }
    setProjectData({
      ...projectData,
      landAmenities: landAmenity,
    })
    handleNext()
  }

  const handlePhotoAndVideoSubmit = () => {
    const { projectImages } = projectData
    if (!projectImages || projectImages.length === 0) {
      toast.error(indexFileText.imageMissing)
      return
    }
    handleNext()
  }

  const handleDescriptionSubmit = () => {
    if (!projectData.projectDescription) {
      toast.error(indexFileText.projectDescriptionMissing)
      return
    }
    handleNext()
  }

  const handleFinish = async () => {
    const { customProjectUrl } = projectData
    if (customProjectUrl && customProjectUrl.trim() !== '') {
      const validationError = ValidateCustomURL(customProjectUrl)
      if (validationError) {
        toast.error(validationError)
        return
      }
    }

    const body = {
      projectData,
      developerDetail,
    }
    setIsSubmitting(true)
    try {
      const response = await makeApiRequest(
        text.postType,
        routes.postProjectRoute,
        body
      )
      if (response?.data?.responseCode == 200) {
        toast.success('Project Posted Succesfully')
        router.push(routes.adminProjectListingRoute)
        setProjectData({})
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const checkFieldStepOne = () => {
    for (const check of projectStep1Check) {
      const key = Object.keys(check)[0]
      if (!projectData[key]) {
        toast.error(check[key])
        return false
      }
    }
    return true
  }
  const checkFieldStepThree = () => {
    let isLand =
      projectData?.projectSubType != indexFileText.residentialPlot ||
      projectData?.projectSubType != indexFileText.residentialLand ||
      projectData?.projectSubType != indexFileText.farmHouse ||
      projectData?.projectSubType != indexFileText.commercialLand ||
      projectData?.projectSubType != indexFileText.warehouse ||
      projectData?.projectSubType != indexFileText.godown ||
      projectData?.projectSubType != indexFileText.scoPlot ||
      projectData?.projectSubType != indexFileText.industrialLand ||
      projectData?.projectSubType != indexFileText.industrialShed ||
      projectData?.projectSubType != indexFileText.agriculturalLand
    if (
      !projectData[PROJECT_KEYS.PROJECT_HIGHLIGHT_TAGS] ||
      projectData[projectKeys.PROJECT_HIGHLIGHT_TAGS].length < 5
    ) {
      toast.error(indexFileText.projectHighlightMissing)
      return false
    }
    // if (!isLand) {
    //   for (const check of projectStep3Check) {
    //     const key = Object.keys(check)[0]
    //     if (!projectData[key]) {
    //       toast.error(check[key])
    //       return false
    //     }
    //   }
    //   return true
    // } else {
    return true
    // }
  }
  const saveDraft = async () => {
    const { customProjectUrl } = draftData
    if (customProjectUrl && customProjectUrl.trim() !== '') {
      const validationError = ValidateCustomURL(customProjectUrl)
      if (validationError) {
        toast.error(validationError)
        return
      }
    }

    const body = {
      projectData: projectData,
      developerDetail: developerDetail,
    }
    try {
      const response = await makeApiRequest('put', routes.saveDraft, body)

      if (response?.data?.responseCode == 200) {
        toast.success(response?.data?.responseMessage)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  const handleGetDraft = async () => {
    const { data } = await makeApiRequest('get', routes.getDraft)
    if (data?.responseCode == 200) {
      setProjectData(data?.result?.draft)
      setDeveloperDetail(data?.result?.draft.developerDetail || {})
      setUnitList(data?.result?.draft?.projectUnits || [])
    }
  }

  useEffect(() => {
    handleGetDraft()
  }, [])

  const steps = [
    {
      title: indexFileText.projectBuildingDetails,
      buttons: [
        {
          label: indexFileText.continueText,
          onClick: [handleStepOne, saveDraft],
        },
      ],
      component: (
        <Step1
          projectData={projectData}
          setProjectData={setProjectData}
          setUnitList={setUnitList}
          setSelectDropdown={setSelectDropdown}
          developerDetail={developerDetail}
          setDeveloperDetail={setDeveloperDetail}
          setDraftData={setDraftData}
          draftData={draftData}
        />
      ),
      isProject: true,
    },
    {
      title: indexFileText.projectReraDetails,
      buttons: [
        { label: indexFileText.back, onClick: [handleBack] },
        {
          label: indexFileText.continueText,
          onClick: [handleStepRera, saveDraft],
        },
      ],
      component: (
        <StepRera
          projectData={projectData}
          setProjectData={setProjectData}
          setDraftData={setDraftData}
        />
      ),
      isProject: true,
    },
    {
      title: indexFileText.projectUnitDetails,
      buttons: [
        { label: indexFileText.back, onClick: [handleBack] },
        {
          label: indexFileText.continueText,
          onClick: [handleStepTwo, saveDraft],
        },
      ],
      component: (
        <Step2
          projectData={projectData}
          setProjectData={setProjectData}
          unitList={unitList}
          setUnitList={setUnitList}
          update={true}
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          isplotRange={isplotRange}
          setIsPlotRange={setIsPlotRange}
          isProjectEdit={isProjectEdit}
          setDraftData={setDraftData}
        />
      ),
      isProject: true,
    },
    {
      title: indexFileText.additionalDetails,
      buttons: [
        { label: indexFileText.back, onClick: [handleBack] },
        {
          label: indexFileText.continueText,
          onClick: [handleStepThree, saveDraft],
        },
      ],
      component: (
        <Step3
          projectData={projectData}
          setProjectData={setProjectData}
          landAmenity={landAmenity}
          setLandAmenity={setLandAmenity}
          setDraftData={setDraftData}
        />
      ),
      isProject: true,
    },
    {
      title: indexFileText.uploadPhotoVideo,
      buttons: [
        { label: indexFileText.back, onClick: [handleBack] },
        {
          label: indexFileText.continueText,
          onClick: [handlePhotoAndVideoSubmit, saveDraft],
        },
      ],
      component: (
        <Step4
          projectData={projectData}
          setProjectData={setProjectData}
          setProjectDetails={setProjectDetails}
          setDraftData={setDraftData}
        />
      ),
      isProject: true,
    },
    {
      title: indexFileText.projectDescriptionCard,
      buttons: [
        { label: indexFileText.back, onClick: [handleBack] },
        {
          label: indexFileText.continueText,
          onClick: [handleDescriptionSubmit, saveDraft],
        },
      ],
      component: (
        <Step5
          projectData={projectData}
          setProjectData={setProjectData}
          setDraftData={setDraftData}
        />
      ),
      isProject: true,
    },
    {
      title: indexFileText.projectSEO,
      buttons: [
        {
          label: indexFileText.back,
          onClick: [handleBack],
          disabled: isSubmitting,
        },
        {
          label: isSubmitting ? 'Posting...' : indexFileText.postProject,
          onClick: [handleFinish],
          disabled: isSubmitting,
          loading: isSubmitting,
        },
      ],
      component: (
        <ProjectSEO
          projectData={projectData}
          setProjectData={setProjectData}
          setDraftData={setDraftData}
        />
      ),
      isProject: true,
    },
  ]
  return (
    <div className="mb-20">
      <Stepper
        ButtonDisable={false}
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  )
}

export default PostProject
