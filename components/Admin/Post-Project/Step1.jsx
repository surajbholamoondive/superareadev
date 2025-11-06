import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import postProjectForm from '@/content/JSON/postProjectForm'
import { getLogger } from '@/helper/logger'
import {
  NEARBY_MAP_PREVEIEW,
  PROJECT_BUILDING_TEXT,
  PROJECT_KEYS,
  PROJECT_RATING,
  PROJECT_SIZE,
  PROJECT_SIZE_TOOLTIP,
  PROJECT_SIZE_UNIT,
  PROJECT_SUB_TYPE_TEXT,
  PROJECT_TOOLTIP_TEXT,
  PROJECT_TYPE_TEXT,
  PROPERTY_TYPES,
  TEXT_ABOUT_DEVELOPER,
  TEXT_DEVELOPER_NAME,
  TEXT_DEVELOPER_RATING,
  TEXT_DEVELOPER_SINCE,
  TEXT_UPLOAD_DEVELOPER_LOGO,
  UPLOAD_PHOTO_UNIT,
  VIDEO_UPLOAD_ERROR,
} from '@/text'

import processNearbyObject from '@/utils/OsmNearbyHelper/OsmClosestNearbyPlaces'
import getNearbyPlaces from '@/utils/OsmNearbyHelper/OsmNearbyPlaces'
import { capitalizeFirstLetter, numberFormatter } from '@/utils/utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import ImageUploader from '@/components/ImageUpload/Upload'
import CityLookUpComponent from '@/components/LookUpComponent/CityLookupComponent'
import DeveloperLookUpComponent from '@/components/LookUpComponent/DeveloperLookup'
import LocalityLookUpComponent from '@/components/LookUpComponent/LocalityLookup'
import StateLookupComponent from '@/components/LookUpComponent/StateLookupComponent'
import MDGoogleLocationPicker from '@/components/MDGoogleLocationPicker/MDGoogleLocationPicker'
import MDLabelAndInput from '@/components/MDLabelAndInput'
import CustomModal from '@/components/Modal/CustomModal'
import TooltipComponent from '@/components/Tooltip'
import HoverRating from './HoverRating'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import DeveloperDescriptionEditor from './DeveloperDescription'
const { POST_PROJECT_COMPO } = COMPONENTS
const { stepOneText } = POST_PROJECT_COMPO
const { text, symbols } = GLOBALLY_COMMON_TEXT
const OsmMapWithNearby = dynamic(
  () => import('@/components/OsmMapCard/OsmMapWithoutNearbyToggleTray'),
  { ssr: false }
)

const Step1 = ({
  projectData,
  setProjectData,
  edit,
  setUnitList,
  setSelectDropdown,
  developerDetail,
  setDeveloperDetail,
}) => {
  const logger = getLogger()
  const [city, setCity] = useState()
  const [state, setState] = useState()
  const [projectTitle, setProjectTitle] = useState(null)
  const [upload, setUpload] = useState(false)
  const [imageKey, setImageKey] = useState(0)
  const [locality, setLocality] = useState()
  const [cityLatitude, setCityLatitude] = useState(null)
  const [cityLongitude, setCityLongitude] = useState(null)
  const [selected, setSelected] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState(null)
  const [nearby, setNearby] = useState([])
  const { POST_PROJECT_COMPO } = COMPONENTS
  const { indexFileText } = POST_PROJECT_COMPO
  const [formattedProjectArea, setFormattedProjectArea] = useState(projectData?.projectArea);

  useEffect(() => {
    setFormattedProjectArea(projectData?.projectArea);
  }, [projectData?.projectArea]);

  const [projectRating, setProjectRating] = useState(projectData?.projectRating)
  const [developerRating, setDeveloperRating] = useState(
    developerDetail?.developerRating || -1
  )
  const handleCityChange = (cityName) => {
    const capitalizedCity = capitalizeFirstLetter(cityName)
    setCity(capitalizedCity)
  }
  const handleStateChange = (stateName) => {
    const capitalizedState = capitalizeFirstLetter(stateName)
    setState(capitalizedState)
  }
  useEffect(() => {
    if (projectData?.projectRating !== undefined) {
      setProjectRating(projectData.projectRating);
    }
  }, [projectData?.projectRating]);

  const renderButtons = (arrValues, disable = false, title, onClick, isRequired = true) => {
    if (!arrValues || arrValues.length === 0) {
      return null
    }
    return (
      <div className="rounded-md">
        <p className={`text-[1rem] mb-1`}>
          {title}
          {isRequired && (
            <span className="text-red-500 ml-1 mt-1 font-normal">{symbols.asterisk}</span>
          )}
        </p>
        <div className="flex flex-wrap ml-[-5px]">
          {arrValues.map((value) => (
            <button
              className={`mt-1 py-4 h-[25px] w-fit px-6 rounded-full ${projectData && Object.values(projectData).includes(value) && edit && 'opacity-30'}
              
              ${projectData && Object.values(projectData).includes(value)
                  ? 'bg-primary text-white'
                  : 'bg-white text-headingColor'
                }  border-2 border-primary mx-1`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={value}
              disabled={disable}
              onClick={() => onClick(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    )
  }
  const handleProjectDataChange = (keyName, value) => {
    if (keyName === PROJECT_KEYS.PROJECT_RATING && value > 5) {
      toast.error(stepOneText.maxRating)
      return
    }
    setProjectData((prevData) => ({
      ...prevData,
      [keyName]: value,
    }))
  }

  const handleBlurProjectSize = (value, category) => {
    if (!value) {
      setProjectData((prevData) => ({
        ...prevData,
        [category]: "",
      }));
      setFormattedProjectArea("");
      return;
    }
    const rawValue = value.toString().replace(/,/g, "");
    const regex = /^\d+(\.\d{0,2})/;
    let newValue = rawValue;
    if (!regex.test(rawValue)) {
      const extracted = rawValue?.match(/\d+(\.\d{0,2})?/);
      newValue = extracted ? extracted[0] : "";
    }
    const [integerPart, decimalPart] = newValue.split(".");
    const formattedInteger = numberFormatter(integerPart);
    setProjectData((prevData) => ({
      ...prevData,
      [category]: newValue,
    }));
    setFormattedProjectArea(formattedInteger + (decimalPart ? "." + decimalPart : ""));
  };

  const handleDeveloperDetailChange = (keyName, value) => {
    setDeveloperDetail({
      ...developerDetail,
      [keyName]: value,
    })
    setProjectData({
      ...projectData,
      developerDetail: {
        ...projectData.developerDetail,
        [keyName]: value
      }
    });
  }

  const handleModalOpen = (type) => {
    setModalContentType(type)
    setModalOpen(true)
  }

  const handleModalInput = (value) => {
    if (modalContentType === text.lowerCaseCity) {
      setCity(value)
    } else if (modalContentType === text.property) {
      setProjectTitle(value)
    } else if (modalContentType === text.lowerCaseLocality) {
      setLocality(value)
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (projectData?.coordinates?.[0] && projectData?.coordinates?.[1]) {
        const nearby = await getNearbyPlaces(
          projectData?.coordinates?.[0],
          projectData?.coordinates?.[1]
        )
        setNearby(nearby)
        const nearArray = processNearbyObject(nearby)
        setProjectData((prevData) => ({
          ...prevData,
          nearbyPlaces: nearArray,
        }))
      }
    }
    fetchData()
  }, [projectData?.coordinates?.[0], projectData?.coordinates?.[1]])


  useEffect(() => {
    const prevProjectType = projectData?.prevProjectType;
    const prevProjectSubType = projectData?.prevProjectSubType;
    if (prevProjectType !== projectData?.projectType || prevProjectSubType !== projectData?.projectSubType) {
      setProjectData({
        ...projectData,
        prevProjectType: projectData?.projectType,
        prevProjectSubType: projectData?.projectSubType,
        roadFacingPlotLength: "",
        roadFacingPlotBreadth: "",
        openSides: "",
        roadFacingPlotLengthPerUnit: "",
        roadFacingPlotBreadthPerUnit: "",
        plotAreaLength: "",
        plotAreaBreadth: "",
        plotAreaLengthPerUnit: "",
        plotAreaBreadthPerUnit: "",
        unitTitle: "",
        unitCount: "",
        boundaryWalls: "",
        bedroomCount: "",
        bathroomCount: "",
        dedicatedRoom: [],
        furnishingStatus: "",
        washroomCount: "",
        pantryArea: "",
        salePrice: "",
        plotMinPrice: "",
        plotMaxPrice: "",
        plotSalePrice: "",
        minPrice: "",
        activeInput: false,
        maxPrice: "",
        primaryArea: {
          areaSize: null,
          areaUnit: indexFileText.squareFeet,
          areaType: indexFileText.carpetArea,
          pricePerUnit: null,
          displayUnitSize: false
        },
        secondaryArea: {
          areaSize: null,
          areaUnit: indexFileText.squareFeet,
          areaType: indexFileText.builtUpArea,
          pricePerUnit: null,
          displayUnitSize: false
        },
        tertiaryArea: {
          areaSize: null,
          areaUnit: indexFileText.squareFeet,
          areaType: indexFileText.superBuiltUpArea,
          pricePerUnit: null,
          displayUnitSize: false
        },
        reraArea: {
          reraCarpetArea: null,
          reraCarpetAreaUnit: indexFileText.squareFeet,
          reraCarpetAreaPricePerUnit: null,
          displayReraCarpetArea: false
        }
      });
    }
  }, [projectData?.projectType, projectData?.projectSubType]);


  const handlePhotoSelect = async (e) => {
    const formData = new FormData()
    e.forEach((file, index) => {
      formData.append(`images[${index}]`, file)
    })
    formData.append('isDeveloperLogo', 'true');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/aws-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const newPhotoUrls = response.data.result.imageUrls.map((url) => ({
        url,
      }))
      setDeveloperDetail({
        ...developerDetail,
        developerLogoUrl: newPhotoUrls,
      })
      toast.success(stepOneText.logoUpload)
      setImageKey((prev) => prev + 1)
    } catch (error) {
      logger.error(stepOneText.imageUploadError)
    }
  }

  const deletePhoto = async (index, url, setUpload) => {
    const key = url?.substring(url.lastIndexOf('/') + 1)
    const BUCKET_NAME = 'superarea-prod-s3'
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        {
          Bucket: BUCKET_NAME,
          Key: key,
        }
      )
      if (response.status === 200) {
        const updatedPhotoUrls = developerDetail.developerLogoUrl.filter(
          (photo, i) => i !== index
        )
        setDeveloperDetail({
          ...developerDetail,
          developerLogoUrl: updatedPhotoUrls,
        })
        toast.success(stepOneText.logoDelete)
        setUpload(false)
      }
    } catch (error) {
      logger.error({ VIDEO_UPLOAD_ERROR })
    }
  }

  return (
    <div className="px-7 py-2">
      <div>
        {renderButtons(
          PROPERTY_TYPES,
          edit ? true : false,
          PROJECT_TYPE_TEXT,
          (value) => {
            setProjectData((prevData) => ({
              ...prevData,
              projectType: value,
              projectSubType: '',
            }))
          }
        )}
      </div>

      <div className="my-3">
        {renderButtons(
          postProjectForm?.landType,
          edit ? true : false,
          stepOneText.landType,
          (value) => {
            setProjectData((prev) => ({
              ...prev,
              landType: value,
            }));
          },
          false
        )}
      </div>
      <div className="my-3">
        {renderButtons(
          postProjectForm[projectData?.projectType]?.projectSubType,
          edit ? true : false,
          PROJECT_SUB_TYPE_TEXT,
          (value) => {
            setProjectData((prevData) => ({
              ...prevData,
              projectSubType: value,
            }));
            setUnitList([]);
          }
        )}
      </div>


      <div className="mb-3">
        <MDLabelAndInput
          label={stepOneText.projectLabel}
          labelClass="text-headingColor"
          inputType="text"
          isRequired={false}
          cssClass="!w-full h-[38px]"
          inputState={projectData?.projectLabel || ""}
          onChangeFunction={(value) =>
            handleProjectDataChange("projectLabel", value)
          }
        />
      </div>
      <div className="flex flex-wrap justify-between w-[90%]">
        <div>
          <label className='text-headingColor'>{TEXT_DEVELOPER_NAME}</label>
          <DeveloperLookUpComponent
            developerDetail={developerDetail}
            setDeveloperDetail={setDeveloperDetail}
            cssClass=" py-3 px-2 h-[38px] w-[240px]"
            dropdownWidth="w-[240px]"
            setDeveloperRating={setDeveloperRating}
            projectData={projectData}
            setProjectData={setProjectData}
          />
        </div>
        <MDLabelAndInput
          labelClass="text-headingColor"
          label={TEXT_DEVELOPER_SINCE}
          inputType="date"
          isRequired={false}
          cssClass=" w-[240px] h-[38px]"
          inputState={developerDetail?.developerSince?.split('T')[0]}
          onChangeFunction={(value) =>
            handleDeveloperDetailChange('developerSince', value)
          }
        />
        <div className="w-[240px]">
          <div className="flex">
            <label className='text-headingColor'>{TEXT_DEVELOPER_RATING}</label>
            <div>
              <TooltipComponent tooltipText={stepOneText.developerRatingTooltip} />
            </div>
          </div>
          <div className="mt-2 rounded-md w-[130px] ">
            <HoverRating
              handleProjectDataChange={handleDeveloperDetailChange}
              projectData={developerDetail}
              valueToChange="developerRating"
              value={developerDetail?.developerRating || developerRating}
              setValue={setDeveloperRating}
            />
          </div>
        </div>
        <div className={`w-full h-[100px] mt-3`}>
          <div className="flex">
            <label className=" text-[1rem] mb-1 text-headingColor">
              {TEXT_UPLOAD_DEVELOPER_LOGO}
            </label>
            <div>
              <TooltipComponent tooltipText={UPLOAD_PHOTO_UNIT} />{' '}
            </div>
          </div>
          <ImageUploader
            onFileSelect={handlePhotoSelect}
            photoURLs={developerDetail?.developerLogoUrl || []}
            deletePhoto={deletePhoto}
            onlyButton="true"
            upload={upload}
            key={imageKey}
            setUpload={setUpload}
          />
        </div>
        <div className="w-[100%] mt-3">
          <div className="flex">
            <label className='text-headingColor'>{TEXT_ABOUT_DEVELOPER}</label>
            <div>
              <TooltipComponent tooltipText={stepOneText.developerRatingTooltip} />
            </div>
          </div>
          <div>
            {/* <textarea
              type="text"
              value={developerDetail?.developerDescription}
              onChange={(e) =>
                handleDeveloperDetailChange(
                  'developerDescription',
                  e.target.value
                )
              }
              className="border text-[0.875rem] border-black p-1 pt-1.5 rounded-md w-[90%] h-32 focus:outline-none focus:border-[#931602] resize-none custom-scrollbar"
            /> */}


            <DeveloperDescriptionEditor
              developerDetail={developerDetail}
              handleDeveloperDetailChange={handleDeveloperDetailChange}
            />
          </div>
          {/* <div>
              <AdvancedEditor
                value={developerDetail?.developerDescription}
                onChange={handleOtherDescriptionChange}
              />
            </div> */}
        </div>
      </div>
      {/* project details */}
      <div>
        <div className="flex flex-wrap mt-5 ">
          <div className="w-[240px] pr-6 mr-6">
            <div className="flex">
              <label className={` mt-1 text-headingColor`}>{PROJECT_BUILDING_TEXT}</label>
              <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span>
              <div className="pt-1">
                <TooltipComponent tooltipText={PROJECT_TOOLTIP_TEXT} />{' '}
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 1000 }}>
              <MDGoogleLocationPicker
                DATA={projectData}
                setDATA={setProjectData}
                setSelectDropdown={setSelectDropdown}
                isProject="true"
                inlineStyles="mt-2 border   w-[240px] h-[38px] px-2 py-2 -mb-4 relative rounded-md border-gray-600 focus:outline-none focus:border-[#931602] focus:border-[1px]"
                dropdownCss="bg-[#f7fffe] w-[240px] border border-gray-400 absolute"
              />
            </div>
          </div>
          <div className="w-[240px] mb-1 pr-6 mr-6">
            <div className="flex">
              <label className={`text-[1rem] mt-1 text-headingColor`}>{text.titleCaseLocality}</label>
              <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span>
              <div className="pt-1">
                <TooltipComponent tooltipText={stepOneText.localityTooltipText} />{' '}
              </div>
            </div>
            <LocalityLookUpComponent
              setLocality={setLocality}
              setModalOpen={() => handleModalOpen('locality')}
              locality={locality}
              setSelected={setSelected}
              DATA={projectData}
              setDATA={setProjectData}
              city={city}
              cssClass=" py-3 px-2 h-[38px] w-[240px] mt-1"
              dropdownWidth="w-[240px]"
            />
          </div>
          <div className="w-[240px] flex">
            <div className="w-full md:w-1/2 pr-4">
              <div className="flex">
                <label className={` mt-1 text-headingColor`}>{text.cityText}</label>
                <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span>
                <div className="pt-1">
                  <TooltipComponent tooltipText={stepOneText.cityTooltipText} />{' '}
                </div>
              </div>
              <CityLookUpComponent
                setCity={handleCityChange}
                setLocality={setLocality}
                setProjectTitle={setProjectTitle}
                setModalOpen={() => handleModalOpen('city')}
                city={city}
                DATA={projectData}
                setDATA={setProjectData}
                cssClass=" px-2 h-[38px] w-[100px] mt-1"
                dropdownWidth="w-[328px]"
              />
            </div>
            <div className="md:w-1/2 w-[80px]">
              <div className="flex">
                <label className={`mt-1 text-headingColor`}>State</label>
                <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span>
                <div className="pt-1">
                  <TooltipComponent tooltipText={stepOneText.stateTooltipText} />{' '}
                </div>
              </div>
              <StateLookupComponent
                setState={handleStateChange}
                setLocality={setLocality}
                setProjectTitle={setProjectTitle}
                setModalOpen={() => handleModalOpen('city')}
                state={state}
                DATA={projectData}
                setDATA={setProjectData}
                cssClass=" px-2 h-[38px] w-[100px] mt-[8px]"
                dropdownWidth="w-[328px]"
              />
            </div>
          </div>
        </div>

        {modalOpen && (
          <CustomModal
            closeModal={() => setModalOpen(false)}
            onInput={handleModalInput}
            modalContentType={modalContentType}
            DATA={projectData}
            setDATA={setProjectData}
            setCityLatitude={setCityLatitude}
            setCityLongitude={setCityLongitude}
            city={city}
            setCity={setCity}
          />
        )}

        <div className="mb-5">
          <div className="flex">
            <label className={` text-headingColor mb-2`}>{NEARBY_MAP_PREVEIEW}</label>
            <div>
              <TooltipComponent tooltipText={stepOneText.locationTooltipText} />
            </div>
          </div>
          <OsmMapWithNearby
            height={200}
            localityLat={projectData?.coordinates?.[0] || cityLatitude}
            localityLng={projectData?.coordinates?.[1] || cityLongitude}
            property={projectData?.projectTitle}
            nearby={nearby}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-8">
        <MDLabelAndInput
          labelClass="text-headingColor"
          label={PROJECT_SIZE}
          isInputNumber="true"
          inputState={formattedProjectArea}
          dropdownArray={PROJECT_SIZE_UNIT}
          cssClass=" w-[230px] h-[38px] text-[1rem]"
          dropdownState={projectData?.projectAreaUnit}
          tooltipText={PROJECT_SIZE_TOOLTIP}
          onChangeFunction={(value) => {
            const rawValue = value.replace(/,/g, "");
            handleProjectDataChange("projectArea", rawValue);
          }
          }
          inputType="text"
          onSelectFunction={(value) =>
            handleProjectDataChange('projectAreaUnit', value)
          }
          onBlur={() => handleBlurProjectSize(projectData?.projectArea, 'projectArea')}

        />
      </div>
      <div className="mt-4 flex flex-wrap gap-7">
        <div>
          <div className="flex items-center">
            <label className="text-headingColor">{PROJECT_RATING}</label>

          </div>
          <div className="rounded-md mt-2 w-[65%]">
            <HoverRating
              handleProjectDataChange={handleProjectDataChange}
              projectData={projectData}
              valueToChange="projectRating"
              value={projectRating}
              setValue={setProjectRating}

            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Step1
