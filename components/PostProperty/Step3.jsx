import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import postPropertyFormCondition from '@/content/JSON/postPropertyFormCondition'
import { getLogger } from '@/helper/logger'
import { getPricePerUnit } from '@/utils/helper'
import { formatIndianNumber, makeApiRequest } from '@/utils/utils'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import axios from 'axios'
import { toast } from 'react-toastify'

import ImageUploads from '@/components/ImageUpload/Upload'
import VideoUploader from '@/components/ImageUpload/videoUpload'

import cross from '../../assets/ButtonIcons/cross.svg'
import pdf from '../../assets/ImageComponent/pdf.svg'
import roomOptions from '../ImageUpload/constant'
import MDLabelAndInput from '../MDLabelAndInput'
import TooltipComponent from '../Tooltip'
import Styles from './index.module.css'
import styles from './PropertyDetails.module.css'
import photo from './services/assets/photos.svg'
import video from './services/assets/Videoss.svg'
import { COMPONENTS, GLOBALLY_COMMON_TEXT, SINGLE_PROPERTY_VIEW_TEXT } from '@/textV2'
import DocumentUploader from '../DocumentUpload/DocumentUpload'
const { stepThreeText } = COMPONENTS.POST_PROPERTY_COMPO
const { text, AreaTypesArray, units, propertyTypes, propertySizeUnits ,propertySubTypeMap} = GLOBALLY_COMMON_TEXT
const { possesionDateText, areaTypeText } = SINGLE_PROPERTY_VIEW_TEXT.propertyInformationComponent
export default function Step3({
  DATA,
  setDATA,
  trigger,
  setPropertyDetails,
  setDeclarationOne,
  setDeclarationTwo,
  review

}) {
  const [videoURLs, setVideoURLs] = useState([])
  const [photoURLs, setPhotoURLs] = useState(DATA?.propertyImages || [])
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [modalContentType, setModalContentType] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [orderedPhotoURLs, setOrderedPhotoURLs] = useState([])
  const [pgRules, setPgRules] = useState([])
  const [photoUploadLoading, setPhotoUploadLoading] = useState(false)
  const [videoUploadLoading, setVideoUploadLoading] = useState(false)
  const [pgServices, setPgServices] = useState([])
  const [suitableFor, setSuitableFor] = useState([])
  const [pgFoodAvailability, setPgFoodAvailability] = useState([])
  const [balconies, setBalconies] = useState(DATA?.balconies || {})
  const [documentURLs, setDocumentURLs] = useState([]);
  const [documentUploadLoading, setDocumentUploadLoading] = useState(false);
  const [documentKey, setDocumentKey] = useState(0);
  const [generatedDescription, setGeneratedDescription] = useState('')
  const isVideoUploadDisabled = DATA?.propertyVideos?.length >= 1
  const { propertyCoverImage, propertyImages, propertyVideos } = DATA || {}
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadError, setUploadError] = useState('')
  const logger = getLogger()
  const [imageKey, setImageKey] = useState(0)
  const [videoKey, setVideoKey] = useState(0)
  const [pricePerUnitMap, setPricePerUnitMap] = useState({})
  const [isAvailableAreaType, setIsAvailableAreaType] = useState(true)

  useEffect(() => {
    const {
      propertySubType,
      salePrice,
      rentPrice,
      rentDepositAmount,
      maintenanceAmount,
      unitNumber,
      towerBlock,
      floorNumber,
      plotNumber,
      bedroomCount,
      bathroomCount,
      pgAvailableFrom,
      pgFoodAvailability,
      pgFoodCharges,
      pgNoticePeriod,
      propertyImages,
      areaDetail = [],
      pgRoomType,
      propertySizeUnit,
      propertySize,
    } = DATA || {}

    const isAreaDetailValid = (item) => {
      const { propertySize, propertySizeUnit, areaType } = item || {}
      return (
        propertySizeUnit &&
        propertySizeUnit !== '' &&
        propertySize &&
        propertySize !== '' &&
        areaType &&
        areaType !== ''
      )
    }

    const checkPropertyDetails = () => {
      if (DATA?.listing === text.capitalizeSellText) {
        let requiredField = false;
        let allRequiredField = false;
        if (areaDetail && areaDetail.length > 0) {
          requiredField = areaDetail.every((item) => {
            const { propertySize, propertySizeUnit, areaType } = item || {};
            if (propertySize !== null && propertySize !== '' && propertySizeUnit !== undefined && propertySizeUnit !== '' && areaType !== undefined && areaType !== '') {
              return true
            }
          });
        }

        switch (propertySubType) {
          case propertyTypes.apartmentText:
          case propertyTypes.penthouseText:
          case stepThreeText.builderFloorText:
            case propertySubTypeMap?.serviceApartment:
              case propertySubTypeMap?.factory:
                case propertySubTypeMap?.hospitality:
            allRequiredField =
              salePrice &&
              salePrice !== '' &&
              bedroomCount &&
              bedroomCount !== '' &&
              bathroomCount &&
              bathroomCount !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              floorNumber &&
              floorNumber !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.showroomText:
            allRequiredField =
              salePrice &&
              salePrice !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              floorNumber &&
              floorNumber !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.warehouseText:
          case propertyTypes.shopText:
            case propertySubTypeMap?.Shop:
            allRequiredField =
              salePrice &&
              salePrice !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              floorNumber &&
              floorNumber !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.officeSpace:
            allRequiredField =
              salePrice &&
              salePrice !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              floorNumber &&
              floorNumber !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.houseOrVilla:
            allRequiredField =
              salePrice &&
              salePrice !== '' &&
              bedroomCount &&
              bedroomCount !== '' &&
              bathroomCount &&
              bathroomCount !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break


          case propertyTypes.plotText:
          case propertyTypes.commercialLandText:
            case propertySubTypeMap?.CommercialLand: 
            case propertySubTypeMap.agricultureFarmLand:
            allRequiredField =
              salePrice &&
              salePrice !== '' &&
              plotNumber &&
              plotNumber !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break
            case propertySubTypeMap?.farmhouse :
              case propertySubTypeMap?.Warehouse:
                case propertySubTypeMap.industrialShed:
              allRequiredField =
                salePrice &&
                salePrice !== '' &&
                propertyImages &&
                propertyImages.length !== 0
              break
                case propertySubTypeMap.industrialBuilding:
                allRequiredField=
                salePrice &&
                salePrice !== '' &&
                plotNumber &&
                plotNumber !== '' &&
                propertyImages &&
                propertyImages.length !== 0&& 
                bedroomCount &&
                bedroomCount !== '' &&
                bathroomCount &&
                bathroomCount !== '' 
                break
                case  propertySubTypeMap?.manufacturing:
                  allRequiredField=
                salePrice &&
                salePrice !== '' &&
                propertyImages &&
                propertyImages.length !== 0&& 
                bedroomCount &&
                bedroomCount !== '' &&
                bathroomCount &&
                bathroomCount !== '' 
                break
          default:
            allRequiredField = false
        }

        setPropertyDetails(requiredField && allRequiredField);
      } else if (DATA?.listing === text.capitalizeRentText) {
        let valid = false;

        switch (propertySubType) {
          case propertyTypes.apartmentText:
          case stepThreeText.builderFloorText:
          case propertyTypes.penthouseText:
          case propertyTypes.warehouseText:
          case propertyTypes.shopText:
            valid =
              propertySize &&
              propertySize !== '' &&
              rentPrice &&
              rentPrice !== '' &&
              rentDepositAmount &&
              rentDepositAmount !== '' &&
              bedroomCount &&
              bedroomCount !== '' &&
              bathroomCount &&
              bathroomCount !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              floorNumber &&
              floorNumber !== '' &&
              maintenanceAmount &&
              maintenanceAmount !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.showroomText:
            valid =
              propertySize &&
              propertySize !== '' &&
              rentPrice &&
              rentPrice !== '' &&
              rentDepositAmount &&
              rentDepositAmount !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              floorNumber &&
              floorNumber !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.officeSpace:
            valid =
              propertySize &&
              propertySize !== '' &&
              rentPrice &&
              rentPrice !== '' &&
              rentDepositAmount &&
              rentDepositAmount !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              floorNumber &&
              floorNumber !== '' &&
              propertySize &&
              propertySize !== '' &&
              maintenanceAmount &&
              maintenanceAmount !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.houseOrVilla:
            valid =
              propertySize &&
              propertySize !== '' &&
              rentPrice &&
              rentPrice !== '' &&
              rentDepositAmount &&
              rentDepositAmount !== '' &&
              bedroomCount &&
              bedroomCount !== '' &&
              bathroomCount &&
              bathroomCount !== '' &&
              unitNumber &&
              unitNumber !== '' &&
              towerBlock &&
              towerBlock !== '' &&
              propertySize &&
              propertySize !== '' &&
              maintenanceAmount &&
              maintenanceAmount !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.plotText:
          case propertyTypes.commercialLandText:
            case propertySubTypeMap?.CommercialLand: 
            case propertySubTypeMap.manufacturing:
              case propertySubTypeMap.factory:
                case propertySubTypeMap.Warehouse:
                  case propertySubTypeMap.industrialShed:
                    case propertySubTypeMap.industrialBuilding:
                      case propertySubTypeMap.agricultureFarmLand:
                        case propertySubTypeMap.farmhouse:  
            valid =
              propertySize &&
              propertySize !== '' &&
              rentPrice &&
              rentPrice !== '' &&
              propertySize &&
              propertySize !== '' &&
              rentDepositAmount &&
              rentDepositAmount !== '' &&
              maintenanceAmount &&
              maintenanceAmount !== '' &&
              plotNumber &&
              plotNumber !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          case propertyTypes.pgText:
            valid =
              rentPrice &&
              rentPrice !== '' &&
              rentDepositAmount &&
              rentDepositAmount !== '' &&
              maintenanceAmount &&
              maintenanceAmount !== '' &&
              pgAvailableFrom &&
              pgAvailableFrom !== '' &&
              pgFoodAvailability &&
              pgFoodAvailability?.length > 0 &&
              pgFoodCharges &&
              pgFoodCharges !== '' &&
              pgRoomType &&
              pgRoomType !== '' &&
              pgNoticePeriod &&
              pgNoticePeriod !== '' &&
              propertyImages &&
              propertyImages.length !== 0
            break

          default:
            valid = false
        }

        setPropertyDetails(valid)
      }
    }
    checkPropertyDetails()
  }, [DATA, setDATA])

  useEffect(() => {
    setDeclarationOne(true)
    setDeclarationTwo(true)
  }, [])

  useEffect(() => {
    setDeclarationOne(true)
    setDeclarationTwo(true)
  }, [])

  useEffect(() => {
    const { salePrice, propertySizeUnit, propertySize } = DATA
    if (salePrice && propertySizeUnit && propertySize) {
      const calculatepricePerUnit = async () => {
        try {
          const price = await getPricePerUnit(
            propertySizeUnit,
            propertySize,
            salePrice
          )
          if (price) {
            setDATA((prevData) => ({
              ...prevData,
              pricePerUnit: price,
            }))
          }
        } catch (error) {
          logger.error(error)
        }
      }

      calculatepricePerUnit()
    }
  }, [DATA.salePrice, DATA.propertySizeUnit, DATA.propertySize])

  useEffect(() => {
    handleUnitChange
  }, [DATA?.salePrice, DATA?.areaDetail])

  useEffect(() => {
    handlePricePerUnitChange
  }, [DATA?.salePrice, DATA?.areaDetail])

  const handlePhotoSelect = async (newFiles) => {
    const hdImagesMarked = {}
    const formData = new FormData()
    newFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file)
      const image = new window.Image()
      image.src = URL.createObjectURL(file)
      image.onload = function () {
        const naturalWidth = this.naturalWidth
        const naturalHeight = this.naturalHeight
        const isHDImage = naturalWidth >= 1920 && naturalHeight >= 1080
        hdImagesMarked[file.name] = isHDImage
      }
    })
    try {
      setPhotoUploadLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/aws-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const newPhotoUrls = response.data.result.imageUrls
      const newPhotoNames = response.data.result.imageNames
      const mappedNewPhotoUrls = newPhotoUrls.map((url, index) => ({
        name: 'Other',
        url: url,
        key: newPhotoNames[index],
      }))
      const updatedPhotoURLs = [...photoURLs, ...mappedNewPhotoUrls]
      setPhotoURLs(updatedPhotoURLs)
      setDATA({
        ...DATA,
        propertyImages: updatedPhotoURLs,
        hdImagesMap: hdImagesMarked,
      })
      toast(response?.data?.responseMessage)
      setPhotoUploadLoading(false)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
      setImageKey((prev) => prev + 1)
    } catch (error) {
      console.error('Error uploading images:', error)
      setPhotoUploadLoading(false)
    }
  }
  const handleImageNameChange = (index, newName) => {
    const updatedPhotoURLs = [...photoURLs]
    updatedPhotoURLs[index].name = newName
    setPhotoURLs(updatedPhotoURLs)
    setDATA({ ...DATA, propertyImages: updatedPhotoURLs })
  }
  const handleBlur = (event, type) => {
    const { name, value } = event.target

    const shouldFormatNumber = type === 'number' && name !== 'unitNumber'
    const rawValue = shouldFormatNumber ? value.replace(/\D/g, '') : value
    const formattedValue = shouldFormatNumber
      ? formatIndianNumber(rawValue)
      : rawValue

    const updatedData = {
      ...DATA,
      [name]: formattedValue,
    }

    if (
      name === 'floorNumber' &&
      updatedData.totalFloors < parseInt(rawValue, 10)
    ) {
      toast.error('Floor number cannot be greater than total floors')
      setDATA({
        ...DATA,
        floorNumber: ""
      })
      return
    }

    setDATA(updatedData)
  }

  const handleVideoSelect = async (selectedFiles) => {
    const validVideoFiles = selectedFiles.filter((file) =>
      file.type.startsWith('video/')
    )

    if (validVideoFiles.length === 0) {
      toast.error(stepThreeText.validFileText)
      return
    }

    const formData = new FormData()
    validVideoFiles.forEach((file, index) => {
      formData.append(`video${index}`, file)
    })

    try {
      setVideoUploadLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/aws-video`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.data.responseCode === 200) {
        const videoUrls = response?.data?.result
        const mappedVideoUrls = videoUrls.map((url, index) => ({
          id: index,
          url: url,
        }))

        setVideoURLs(mappedVideoUrls)
        setDATA({
          ...DATA,
          propertyVideos: mappedVideoUrls,
        })
        toast(response?.data?.responseMessage)
      } else {
        toast.error(response?.data?.responseMessage)
      }
      setVideoKey((prev) => prev + 1)
    } catch (error) {
      logger.error('Error uploading videos:', error)
      toast.error(error?.response?.data?.responseMessage)
    } finally {
      setVideoUploadLoading(false)
    }
  }
  const handleAreaSizeDataChange = (keyName, value) => {
    setDATA({
      ...DATA,
      [keyName]: value,
      propertySizeUnit: DATA?.propertySizeUnit
        ? DATA?.propertySizeUnit
        : 'squareFeet',
    })
  }
  const handleAreaUnitDataChange = (keyName, value) => {
    setDATA({
      ...DATA,
      [keyName]: value,
    })
  }

  const getLabelFromValue = (value) => {
    const unit = propertySizeUnits.find((unit) => unit.value === value)
    return unit ? unit.label : units.suqareFeets
  }

  const deletePhoto = async (index, url) => {
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
        const updatedPhotoURLs = propertyImages.filter(
          (photo, photoIndex) => photo?.url !== url
        )
        setPhotoURLs(updatedPhotoURLs)
        setDATA((prevData) => ({
          ...prevData,
          propertyImages: updatedPhotoURLs,
        }))
        toast.info(response.data?.responseMessage)
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      } else {
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('An error occurred while deleting photo:', error)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
    }
  }
  const handleSetCover = (url) => {
    const index = DATA?.propertyImages.findIndex((photo) => photo.url === url)
    if (index === -1) return
    let newOrderedPhotoURLs = [...DATA?.propertyImages]
    const selectedImage = newOrderedPhotoURLs.splice(index, 1)[0]
    newOrderedPhotoURLs.unshift(selectedImage)
    setOrderedPhotoURLs(newOrderedPhotoURLs)
    setCoverImageUrl(url)

    setDATA((prevDATA) => ({
      ...prevDATA,
      propertyCoverImage: url,
      propertyImages: [...newOrderedPhotoURLs],
    }))
  }

  const deleteVideo = async (index, url) => {
    const key = url?.substring(url.lastIndexOf('/') + 1)
    const BUCKET_NAME = 'superarea-prod-s3'

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-video`,
        {
          Bucket: BUCKET_NAME,
          Key: key,
        }
      )

      if (response.status === 200) {
        setVideoURLs((prevURLs) => prevURLs.filter((_, i) => i !== index))
        setDATA({
          ...DATA,
          propertyVideos: DATA?.propertyVideos?.filter((_, i) => i !== index),
        })
        toast.info(response?.data?.responseMessage)
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      } else {
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('An error occurred while deleting video:', error)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
    }
  }

  const handlePgFoodAvailability = (value) => {
    setPgFoodAvailability((prev = []) => {
      let updatedData
      if (prev.includes(value)) {
        updatedData = prev.filter((item) => item !== value)
      } else if (
        DATA &&
        DATA?.pgFoodAvailability &&
        DATA?.pgFoodAvailability.length !== 0
      ) {
        updatedData = [...DATA?.pgFoodAvailability, value]
      } else {
        updatedData = [...prev, value]
      }

      setDATA((prevData) => ({
        ...prevData,
        pgFoodAvailability: updatedData,
      }))

      return updatedData
    })
  }

  const renderButtons = (buttons, title, onClick, category) => {
    if (!buttons || buttons.length === 0) {
      return null
    }

    return (
      <div>
        <div className="flex mb-1">
          <h4 className={`${styles.property_label}`}>{title}</h4>
          <span className="text-red-500  ml-[2px]">*</span>
        </div>
        <div className="flex gap-3 flex-wrap mb-2">
          {buttons.map((button) => {
            const isButtonActive = DATA[category] == button ? true : false
            return (
              <button
                className={`px-3 py-2 h-[25px] w-fit rounded-full ${isButtonActive
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600'
                  } border-2 border-primary`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={button}
                onClick={() => onClick(category, button)}
              >
                {button}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderConditionalSelect = (
    label,
    value,
    onChangeFunc,
    options,
    defaultValue
  ) => {
    if (!options || options.length === 0) {
      return null
    }
    return (
      <div className="w-[180px] mb-3">
        <label className={`${styles.property_label}`}>{label}</label>
        <span className="text-red-500  ml-[2px]">*</span>
        <select
          className="w-[160px]  border border-black text-[0.875rem]  rounded-md h-[30px] focus:outline-none focus:border-primary mt-1"
          value={value}
          onChange={(e) => onChangeFunc(e.target.value)}
        >
          <option value="" className="text-[#5F5F5F]">
            {defaultValue}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const renderArrayButtons = (buttons, title, onClick, category) => {
    if (!buttons || buttons.length === 0) {
      return null
    }

    return (
      <div className="rounded-md ">
        <div className="flex">
          <h3 className={`${styles.property_label}`}>{title}</h3>
          <span className="text-red-500  ml-[2px]">*</span>
        </div>
        <div className="flex gap-3 flex-wrap mb-4">
          {buttons.map((button) => {
            const isButtonActive =
              Array.isArray(DATA[category]) && DATA[category].includes(button)
            return (
              <button
                className={`px-3 mt-2 py-2 h-[25px] w-fit rounded-full ${isButtonActive
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600'
                  } border-2 border-primary`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={button}
                onClick={() => onClick(category, button)}
              >
                {button}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const addAreaDetail = () => {
    setDATA((prevDATA) => {
      const updatedAreaDetail = Array.isArray(prevDATA.areaDetail)
        ? [...prevDATA.areaDetail]
        : []
      const filteredAreaTypes = getFilteredAreaTypes(updatedAreaDetail.length)
      if (filteredAreaTypes.length === 1) {
        setIsAvailableAreaType(false)
      }
      const newAreaType = filteredAreaTypes.length > 0 && filteredAreaTypes[0]
      updatedAreaDetail.push({
        areaType: newAreaType,
        propertySize: null,
        propertySizeUnit: "squareFeet",
        display: false,
      })
      return {
        ...prevDATA,
        areaDetail: updatedAreaDetail,
      }
    })
  }
  const handleDeleteAreaType = (index, data) => {
    // Filter out the deleted index from data
    const updatedData = data.filter((_, i) => i !== index);
    const updatedPricePerUnitMap = {};
    Object.keys(DATA?.pricePerUnitMap || {}).forEach((key) => {
      const keyIndex = parseInt(key);
      if (keyIndex !== index) {
        updatedPricePerUnitMap[keyIndex < index ? keyIndex : keyIndex - 1] = DATA.pricePerUnitMap[keyIndex];
      }
    });
    const prevDisplayTrue = data[index]?.display;
    if (updatedData.length === 1) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: [{ ...updatedData[0], display: true }],
        pricePerUnitMap: updatedPricePerUnitMap,
      }));
    } else if (prevDisplayTrue && updatedData.length > 0) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: updatedData.map((item, i) => ({
          ...item,
          display: i === 0,
        })),
        pricePerUnitMap: updatedPricePerUnitMap,
      }));
    } else {
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: updatedData,
        pricePerUnitMap: updatedPricePerUnitMap,
      }));
    }
 
    const filteredAreaTypes = getFilteredAreaTypes(updatedData.length);
    setIsAvailableAreaType(filteredAreaTypes.length < AreaTypesArray.length);
  };

  const handleDisplayChange = (index, data) => {
    if (data?.length > 1) {
      const updatedAreaDetail = data?.map((item, i) => ({
        ...item,
        display: i === index,
      }))
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: updatedAreaDetail,
      }))
    } else if (data?.length === 1) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: [
          {
            ...prevDATA.areaDetail[0],
            display: true,
          },
        ],
      }))
    }
  }

  const handleAreaUnitChange = (index, value, data) => {
    if (data?.length > 1) {
      const updatedAreaDetail = data?.map((item, i) =>
        i === index ? { ...item, propertySizeUnit: value } : item
      )
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: updatedAreaDetail,
      }))
    } else {
      setDATA((prevDATA) => {
        const updatedAreaDetail = [
          {
            ...prevDATA.areaDetail[0],
            propertySizeUnit: value,
          },
        ]
        return {
          ...prevDATA,
          areaDetail: updatedAreaDetail,
        }
      })
    }
  }

  const handleAreaChange = (index, value, data) => {
    if (Array.isArray(data) && data.length > 0) {
      const updatedAreaDetail = data.map((item, i) =>
        i === index ? { ...item, areaType: value } : item
      )
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: updatedAreaDetail,
      }))
    } else {
      setDATA((prevDATA) => {
        const updatedAreaDetail = [
          {
            ...prevDATA.areaDetail[0],
            areaType: value,
          },
        ]
        return {
          ...prevDATA,
          areaDetail: updatedAreaDetail,
        }
      })
    }
  }

  const handleUnitChange = (index, value, data) => {
    setDATA((prevDATA) => {
      const salePriceValue = parseFloat(
        prevDATA?.salePrice?.replace(/\D/g, '') || prevDATA?.salePrice
      )

      if (index === 4 && !data) {
        const updatedPricePerUnitMap = {}
        prevDATA?.areaDetail?.forEach((item, i) => {
          const perUnitPrice =
            item?.propertySize > 0 ? salePriceValue / item?.propertySize : 0
          updatedPricePerUnitMap[i] = parseFloat(perUnitPrice.toFixed(2)) // Round to 2 decimal places
        })
        return {
          ...prevDATA,
          pricePerUnitMap: updatedPricePerUnitMap,
        }
      }

      let updatedAreaDetail
      if (data?.length > 1) {
        updatedAreaDetail = data?.map((item, i) =>
          i === index ? { ...item, propertySize: value } : item
        )
      } else {
        updatedAreaDetail = [
          {
            ...prevDATA.areaDetail[0],
            propertySize: value,
          },
        ]
      }

      const perUnitPrice = value > 0 ? salePriceValue / value : 0
      return {
        ...prevDATA,
        areaDetail: updatedAreaDetail,
        pricePerUnitMap: {
          ...(prevDATA.pricePerUnitMap || {}),
          [index]: parseFloat(perUnitPrice.toFixed(2)), // Round to 2 decimal places
        },
      }
    })
  }

  const handlePricePerUnitChange = () => { }

  const getFilteredAreaTypes = (index) => {
    const selectedAreaTypes = DATA.areaDetail
      .filter((_, i) => i !== index)
      .map((item) => item.areaType)
    return AreaTypesArray.filter(
      (areaType) => !selectedAreaTypes.includes(areaType)
    )
  }

  const handleDocumentSelect = async (newFiles) => {
    const formData = new FormData();
    newFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {
      setDocumentUploadLoading(true);
      const isPdf = newFiles[0].type === 'application/pdf';
      const apiEndpoint = isPdf
        ? `${process.env.NEXT_PUBLIC_API}user/aws-brochure`
        : `${process.env.NEXT_PUBLIC_API}user/aws-image`;

      const response = await makeApiRequest(
        'POST',
        apiEndpoint,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const newDocs = isPdf
        ? [{ name: newFiles[0].name, url: response.data.result.brochureUrl }]
        : response.data.result.imageUrls.map((url, index) => ({
            name: newFiles[index].name,
            url,
          }));

      const updatedDocumentURLs = [...documentURLs, ...newDocs];
      setDocumentURLs(updatedDocumentURLs);

      setDATA({
        ...DATA,
        propertyDocuments: updatedDocumentURLs,
      });

      toast.success(response?.data?.responseMessage);
      setDocumentUploadLoading(false);
      setDocumentKey(prev => prev + 1);
    } catch (error) {
      console.error('Upload error:', error);
      setDocumentUploadLoading(false);
      toast.error('Failed to upload document');
    }
  }

  const handleDocumentRemove = async (index) => {
    const url = documentURLs[index].url;
    const key = url?.substring(url.lastIndexOf('/') + 1);
    const BUCKET_NAME = 'superarea-prod-s3';
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        {
          Bucket: BUCKET_NAME,
          Key: key,
        }
      );
  
      if (response.status === 200) {
        const updatedDocumentURLs = documentURLs.filter(
          (doc, docIndex) => docIndex !== index
        );
        setDocumentURLs(updatedDocumentURLs);
        setDATA((prevData) => ({
          ...prevData,
          propertyDocuments: updatedDocumentURLs,
        }));
        toast.info(response.data?.responseMessage);
        setTimeout(() => {
          setUploadMessage('');
        }, 3000);
      } else {
        setTimeout(() => {
          setUploadMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('An error occurred while deleting document:', error);
      setTimeout(() => {
        setUploadMessage('');
      }, 3000);
    }
  }

  return (
    <div className="bg-white px-11">
      {
        <div className="mt-2 justify-start md:flex md:flex-wrap">
          {postPropertyFormCondition[DATA?.listing]?.[
            trigger
          ]?.nonHiddenInput.map((inputField, index) => {
            const isInputDisplayed = [
              'salePrice',
              (
                DATA?.propertySubType === 'Plot/Land' ||
                DATA?.propertySubType === "Manufacturing" ||
                DATA?.propertySubType === propertySubTypeMap.industrialBuilding ||
                DATA?.propertySubType === propertySubTypeMap.agricultureFarmLand
              ) && 'plotNumber'
            ].includes(inputField.name);
            return (
              isInputDisplayed &&
              inputField.name !== 'propertySize' && (
                <div className="w-[180px] md:w-1/2 lg:w-1/4" key={index}>
                  <div className="flex">
                    <label className={`${styles.property_label}`}>
                      {inputField.name === stepThreeText.pricePerUnit
                        ? `Price/${getLabelFromValue(DATA?.propertySizeUnit)}`
                        : inputField.label}
                    </label>
                    <label className={`block ${styles.property_label}`} />
                    <span className="text-red-500  ml-[2px]">*</span>
                    <div>
                      <TooltipComponent tooltipText={inputField.tooltipText} />
                    </div>
                    {inputField.required && (
                      <span className="text-red-500  ml-[2px]"> *</span>
                    )}
                  </div>
                  {/* Input field rendering */}
                  <input
                    className={`w-full h-[30px] border border-black p-[6px] rounded-md mb-3 focus:outline-primary ${inputField.name === 'pricePerUnit' && 'cursor-not-allowed'}`}
                    key={inputField.id}
                    type="text"
                    name={inputField?.name}
                    placeholder={inputField?.placeholder}
                    value={DATA[inputField?.name]}
                    required={inputField?.required}
                    maxLength={inputField?.maxLength}
                    style={{ width: `${inputField?.width}px` }}
                    onChange={(event) => {
                      const { name, value } = event.target
                      if (name === 'salePrice') {
                        setDATA((prevData) => ({
                          ...prevData,
                          salePrice: value,
                        }))
                        handleUnitChange(4, value)
                      } else {
                        setDATA((prevData) => ({
                          ...prevData,
                          [name]: value,
                        }))
                      }
                    }}
                    onBlur={(event) => {
                      inputField.name !== 'pricePerUnit' &&
                        handleBlur(event, inputField.type)
                    }}
                  />
                </div>
              )
            )
          })}
          {postPropertyFormCondition[DATA?.listing]?.[trigger]?.hiddenInput.map(
            (inputField, index) => {
              const isInputDisplayed = [
                'rentPrice',
                'salePrice',
                'unitNumber',
                'towerBlock',
                'plotNumber',
                'floorNumber',
                'propertySize',
                'rentDepositAmount',
                'maintenanceAmount',
              ].includes(inputField.name)
              return (
                isInputDisplayed &&(
                  <div className="w-[180px] md:w-1/2lg:w-1/4" key={index}>
                    <div className="flex">
                      <label className={`${styles.property_label}`}>
                        {inputField.label}
                      </label>
                      <label
                        className={`block font-bold ${styles.property_label}`}
                      />
                      <span className="text-red-500 ml-[2px]"> *</span>
                      <div>
                        <TooltipComponent
                          tooltipText={inputField.tooltipText}
                        />
                      </div>
                      {inputField.required && (
                        <span className="text-red-500  ml-[2px]"> *</span>
                      )}
                    </div>
                    {/* Input field rendering */}
                    {inputField.type === 'month' ? (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          className={`${styles.datePicker}`}
                          views={['year', 'month']}
                          label={inputField.placeholder}
                          minDate={new Date('1990-01-01')}
                          maxDate={new Date('2023-12-31')}
                          value={
                            DATA[inputField.name]
                              ? new Date(DATA[inputField.name])
                              : null
                          }
                          onChange={(newValue) => {
                            setDATA({
                              ...DATA,
                              [inputField.name]: newValue
                                ? newValue.toISOString()
                                : '',
                            })
                          }}
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                        />
                      </LocalizationProvider>
                    ) : (
                      <input
                        className={`w-full h-[30px] border border-black p-[6px] rounded-md  mb-3 focus:outline-primary ${inputField.name === 'pricePerUnit' && 'cursor-not-allowed'}`}
                        key={inputField.id}
                        type="text"
                        name={inputField?.name}
                        placeholder={inputField?.placeholder}
                        value={DATA[inputField?.name]}
                        required={inputField?.required}
                        maxLength={inputField?.maxLength}
                        style={{ width: `${inputField?.width}px` }}
                        disabled={inputField?.name === 'pricePerUnit'}
                        onChange={(event) => {
                          const { name, value } = event.target
                          setDATA((prevData) => ({
                            ...prevData,
                            [name]: value,
                          }))
                        }}
                        onBlur={(event) => {
                          inputField.name !== 'pricePerUnit' &&
                            handleBlur(event, inputField.type)
                        }}
                      />
                    )}
                  </div>
                )
              )
            }
          )}
        </div>
      }
      {postPropertyFormCondition[DATA?.listing]?.[trigger]?.hiddenInput
        .length != 0 && (
          <div className="text-primary text-left py-1 px-2 bg-noteBackground rounded-md max-w-[500px]">
            {stepThreeText.hiddenNote}
          </div>
        )}

      {/* area details for sell */}
      {DATA?.listing === text.capitalizeSellText && (
        <div className=" w-fit border-solid border-2 border-gray-200 rounded-xl p-3 my-4">
          {
            DATA?.areaDetail?.map((item, index) => (
              <div
                key={index}
                className=" flex justify-start flex-wrap gap-x-[30.5px]"
              >
                <MDLabelAndInput
                  label={areaTypeText}
                  dropdownState={item.areaType}
                  dropdownArray={getFilteredAreaTypes(index)}
                  tooltipText="Enter the floor type"
                  dropdownClass=" text-[0.875rem] py-[5px] w-[170px] h-[29px] "
                  cssClass="text-[0.875rem]"
                  labelClass="text-[1rem]"
                  onSelectFunction={(value) =>
                    handleAreaChange(index, value, DATA?.areaDetail)
                  }
                />
                <div className="w-[160px] ">
                  <MDLabelAndInput
                    label={stepThreeText.unitSizeText}
                    isInputNumber="true"
                    maxLengthInput="5"
                    inputState={item?.propertySize}
                    dropdownState={item?.propertySizeUnit}
                    dropdownArray={propertySizeUnits}
                    cssClass="text-[0.875rem] h-[29px] w-[100px] "
                    dropdownClass="text-[0.875rem] py-[5px] w-[86px] h-[29px]"
                    labelClass="mb-[0px] text-[1rem]"
                    onChangeFunction={(value) =>
                      handleUnitChange(index, value, DATA?.areaDetail)
                    }
                    onSelectFunction={(value) =>
                      handleAreaUnitChange(index, value, DATA?.areaDetail)
                    }
                  />
                </div>
                <MDLabelAndInput
                  label={`${text.priceText}/${getLabelFromValue(item?.propertySizeUnit)}`}
                  inputState={DATA?.pricePerUnitMap?.[index] || ''}
                  cssClass="w-[150px] h-[29px] cursor-not-allowed"
                  onChangeFunction={handlePricePerUnitChange}
                  isdisabled={true}
                  isRequired={false}
                />
                <div className="mt-1">
                  <label>{stepThreeText.displayText}</label>
                  <button
                    className={`  mt-2 flex mx-auto  ${item.display ? 'rounded-full bg-primary outline outline-offset-2 outline-primary/20 w-3 h-3' : 'bg-white rounded-lg border-solid border-2 border-primary w-4 h-4'}`}
                    onClick={() => handleDisplayChange(index, DATA?.areaDetail)}
                  ></button>
                </div>
                {DATA?.areaDetail.length > 1 && (
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        handleDeleteAreaType(index, DATA?.areaDetail)
                      }
                    >
                      <Image
                        src={cross}
                        alt="Description of the image"
                        height={30}
                        width={30}
                      />
                    </button>
                  </div>
                )}
              </div>
            ))}
          {DATA?.areaDetail.length <= 2 && (
            <div onClick={addAreaDetail}>
              <p className="text-primary mt-1">{stepThreeText.additionalArea} </p>
            </div>
          )}
        </div>
      )}
      
      {/* Render possession status buttons */}
      {postPropertyFormCondition[DATA?.listing]?.[trigger]?.possessionStatus &&
        renderButtons(
          postPropertyFormCondition[DATA?.listing]?.[trigger]?.possessionStatus,
          'Possession Status',
          (category, value) => {
            setDATA({
              ...DATA,
              [category]: value,
            })
          },
          'possessionStatus'
        )}

    {(DATA?.possessionStatus === 'Newly Launched' ||
      DATA?.possessionStatus === 'Under Construction' ||
      DATA?.propertySubType === propertyTypes.pgText) && (
      <div className="mb-4">
        <h3 className={`${styles.property_label} mb-1`}>
          {possesionDateText}
        </h3>
        <input
          type="date"
          className={`${styles.datePicker}`}
          min="2000-01-01"
          max="2050-12-31"
          value={
            DATA?.possessionDate
              ? new Date(DATA.possessionDate).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
          onChange={(e) => {
            setDATA({
              ...DATA,
              possessionDate: e.target.value ? new Date(e.target.value).toISOString() : '',
            });
          }}
        />
      </div>
    )}

      {/* Render bedroom buttons */}
      {DATA?.propertySubType !== 'Showroom' && (
        <div className="flex">
          {renderButtons(
            postPropertyFormCondition[DATA?.listing]?.[trigger]?.bedroomCount,
            'Bedroom',
            (category, value) => {
              if (value === '4+') {
                value = 4
              }
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'bedroomCount'
          )}

          {(DATA?.bedroomCount === '4+' ||
            (parseInt(DATA?.bedroomCount, 10) || 0) >= 4) && (
              <div className="flex items-center ml-2 mt-4">
                <button
                  className="px-[10px] py-1 rounded-full bg-primary text-white"
                  onClick={() => {
                    setDATA({
                      ...DATA,
                      bedroomCount: (parseInt(DATA?.bedroomCount, 10) || 4) - 1,
                    })
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  name="4"
                  className="w-10 border border-black rounded-md px-2 py-1 h-[25px] text-center focus:outline-none focus:border-primary text-gray-600"
                  value={
                    (DATA?.bedroomCount === '4+'
                      ? 4
                      : parseInt(DATA?.bedroomCount, 10)) || 4
                  }
                  readOnly
                />
                <button
                  className="px-[9.6px] mr-3 py-1 rounded-full bg-primary text-white"
                  onClick={() => {
                    setDATA({
                      ...DATA,
                      bedroomCount: (parseInt(DATA?.bedroomCount, 10) || 4) + 1,
                    })
                  }}
                >
                  +
                </button>
              </div>
            )}
        </div>
      )}

      {/* Render bathroom buttons */}
      {DATA?.propertySubType !== 'Showroom' && (
        <div className="flex">
          {renderButtons(
            postPropertyFormCondition[DATA?.listing]?.[trigger]?.bathroomCount,
            'Bathroom',
            (category, value) => {
              if (value === '4+') {
                value = 4
              }
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'bathroomCount'
          )}

          {(DATA?.bathroomCount === '4+' ||
            (parseInt(DATA?.bathroomCount, 10) || 0) >= 4) && (
              <div className="flex items-center ml-2 mt-4">
                <button
                  className="px-[10px] py-1 rounded-full bg-primary text-white"
                  onClick={() => {
                    setDATA({
                      ...DATA,
                      bathroomCount: (parseInt(DATA?.bathroomCount, 10) || 4) - 1,
                    })
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  name="4"
                  className="w-10 border border-black rounded-md px-2 py-1 h-[25px] text-center focus:outline-none focus:border-primary text-gray-600"
                  value={
                    (DATA?.bathroomCount === '4+'
                      ? 4
                      : parseInt(DATA?.bathroomCount, 10)) || 4
                  }
                  readOnly
                />
                <button
                  className="px-[9.6px] mr-3 py-1 rounded-full bg-primary text-white"
                  onClick={() => {
                    setDATA({
                      ...DATA,
                      bathroomCount: (parseInt(DATA?.bathroomCount, 10) || 4) + 1,
                    })
                  }}
                >
                  +
                </button>
              </div>
            )}
        </div>
      )}

      {/* Render Available from buttons */}
      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger]?.availableFrom,
        'Available From',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'pgAvailableFrom'
      )}

      {/* Render pg room type buttons */}
      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger]?.pgRoomType,
        'Room Type',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'pgRoomType'
      )}

      {/* Render pg food availability buttons */}

      {renderArrayButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger]?.pgFoodAvailability,
        'Food Availability', // Add a title or an empty string if no title is needed
        (category, value) => handlePgFoodAvailability(value),
        'pgFoodAvailability'
      )}

      {/* Render pg food charges buttons */}
      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger]?.pgFoodCharges,
        'Food Charges',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'pgFoodCharges'
      )}

      {/* Render pg notice period buttons */}
      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger]?.pgNoticePeriod,
        'Notice Period',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'pgNoticePeriod'
      )}

      {/* Render public transportation buttons */}
      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger]
          ?.publicTransportation,
        'Public Transportation',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'publicTransportation'
      )}

      <div className={`mt-4`}>
        <div className="flex">
          <label className="block mb-2">
            {text.uploadPhotoVedio}
          </label>
          <span className="text-red-500  ml-[2px]"> *</span>
        </div>
        <div className={`justify-center`}>
          <div className={`mt-2  ${Styles.subparent} max-w-[80%] `}>
            <ImageUploads 
            review={review}
              icon={
                <div className="flex items-center justify-center rounded-full bg-lightRedBg p-3 w-[90px]  h-[90px] min-md:m-auto">
                  <Image src={photo} alt="Photo" width={55} height={55} />
                </div>
              }
              Text="Upload images for better property listings. Listings with more than 5 photos receive more views. Accepted formats are .jpg and .png. "
              Heading={text.uploadImageText}
              onFileSelect={handlePhotoSelect}
              key={imageKey}
              handleImageNameChange={handleImageNameChange}
              roomOptions={roomOptions}
              onFileRemove={deletePhoto}
              photoURLs={propertyImages}
              deletePhoto={deletePhoto}
              onSetCover={handleSetCover}
              coverImageUrl={propertyCoverImage}
              loading={photoUploadLoading}
            />
          </div>
          <div className="flex justify-end">
            <div className="grid grid-cols-3 gap-6"></div>
          </div>
          <div className="mt-2 max-w-[80%] ml-1">
            {' '}
            <VideoUploader
              icon={
                <div className="flex items-center justify-center rounded-full bg-lightRedBg p-3 w-[90px] h-[90px] min-md:m-auto">
                  <Image src={video} alt="Photo" width={55} height={55} />
                </div>
              }
              Heading={text.uploadVedioText}
              Text="Upload videos for better property listings. Listings with videos receive more views. Accepted formats are .mp4 and .mpeg."
              onFileSelect={(files) => handleVideoSelect(files)}
              key={videoKey}
              onFileRemove={(index) => deleteVideo(index, videoURLs[index].url)}
              deleteVideo={(index, url) => deleteVideo(index, url)}
              isUploadDisabled={isVideoUploadDisabled}
              videoURLs={propertyVideos}
              loading={videoUploadLoading}
            />
          </div>
          <div className="mt-2 max-w-[80%] ml-1">
            {' '}
          <DocumentUploader
        icon={
          <div className="flex items-center justify-start rounded-full bg-lightRedBg p-3 w-[90px] h-[90px] min-md:m-auto">
            <Image src={pdf} alt="Document" width={55} height={55} className="mx-auto" />
          </div>
        }
          Text="Upload documents for better property listings. Listings with documents receive more views. Accepted formats are .pdf and .png"
          Heading="Upload Documents"
          key={documentKey}
          onFileSelect={handleDocumentSelect}
          deleteDocument={handleDocumentRemove}
          documentURLs={documentURLs}
          loading={documentUploadLoading}
    />
          </div>
        </div>
        {uploadMessage && (
          <div
            className={`text-center mt-2 ${uploadMessage.includes('Error')
              ? 'text-primary'
              : 'text-green-500'
              }`}
          >
            {uploadMessage}
          </div>
        )}
        {uploadError && (
          <div className="text-center mt-2 text-red-500">{uploadError}</div>
        )}
      </div>
    </div>
  )
}
