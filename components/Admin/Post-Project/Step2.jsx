import React, { useEffect, useRef, useState } from 'react'
import postProjectForm from '@/content/JSON/postProjectForm'
import { getLogger } from '@/helper/logger'
import {
  CONVERSION_FACTORS,
  DEDICATED_ROOMS_OPTIONS,
  PROJECT_SIZE_UNIT,
  PROJECT_STEP_2_AREA_CHECKS,
  PROJECT_STEP_2_CHECKS,
  PROJECT_STEP_2_LAND_CHECKS,
} from '@/text'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { getPricePerUnit } from '@/utils/helper'
import { formatNumberWithUnit, numberFormatter } from '@/utils/utils'
import axios from 'axios'
import { toast } from 'react-toastify'

import FloorPlanPricing from '@/components/Detail-Section/FloorPlanPrice'
import ImageUploader from '@/components/ImageUpload/Upload'
import MDLabelAndInput from '@/components/MDLabelAndInput'
import MDNote from '@/components/MDNote/MDNote'
import TooltipComponent from '@/components/Tooltip'

const { text, symbols, unitConversion } = GLOBALLY_COMMON_TEXT
const { POST_PROJECT_COMPO } = COMPONENTS
const { stepTwoText } = POST_PROJECT_COMPO
const {
  displayUnitSize,
  primaryArea,
  secondaryArea,
  tertiaryArea,
  displayReraCarpetArea,
  reraArea,
} = GLOBALLY_COMMON_TEXT.text

export default function Step2({
  projectData,
  setProjectData,
  unitList,
  setUnitList,
  activeInput,
  setActiveInput,
  isplotRange,
  setIsPlotRange,
  isProjectEdit,
}) {
  const logger = getLogger()
  const [upload, setUpload] = useState(false)
  let isLand =
    projectData.projectSubType === stepTwoText.residentialPlot ||
    projectData.projectSubType === stepTwoText.residentialLand ||
    projectData.projectSubType === stepTwoText.farmHouse ||
    projectData.projectSubType === stepTwoText.commercialLand ||
    projectData.projectSubType === stepTwoText.warehouse ||
    projectData.projectSubType === stepTwoText.godown ||
    projectData.projectSubType === stepTwoText.scoPlot ||
    projectData.projectSubType === stepTwoText.industrialLand ||
    projectData.projectSubType === stepTwoText.industrialShed ||
    projectData.projectSubType === stepTwoText.agriculturalLand

  const isIndustrialLand =
    projectData?.projectType === stepTwoText.agricultural &&
    projectData?.projectSubType === stepTwoText.farmHouse

  let isShop =
    (projectData?.projectType === stepTwoText.commercial ||
      projectData?.projectType === stepTwoText.industrial ||
      projectData?.projectType === stepTwoText.residential) &&
    (projectData.projectSubType === stepTwoText.commercialOfficeSpace ||
      projectData?.projectSubType === stepTwoText.officeSpaceInItPark ||
      projectData.projectSubType === stepTwoText.commercialShop ||
      projectData.projectSubType === stepTwoText.commercialShowroom ||
      projectData.projectSubType === stepTwoText.mallRetailLockable ||
      projectData.projectSubType === stepTwoText.mallRetailUnlockable ||
      projectData.projectSubType === stepTwoText.highStreetRetailLockable ||
      projectData.projectSubType === stepTwoText.highStreetRetailUnlockable ||
      projectData.projectSubType === stepTwoText.officeSpace ||
      projectData.projectSubType === stepTwoText.foodCourt ||
      projectData.projectSubType === stepTwoText.banquet ||
      projectData.projectSubType === stepTwoText.kiosk ||
      projectData.projectSubType === stepTwoText.anchorStore ||
      projectData.projectSubType === stepTwoText.hyperMarket ||
      projectData.projectSubType === stepTwoText.foodKiosk ||
      projectData.projectSubType === stepTwoText.atmSpace ||
      projectData.projectSubType === stepTwoText.retailSpace ||
      projectData.projectSubType === stepTwoText.industrialBuilding)

  let isBusiness =
    projectData?.projectType === stepTwoText.commercial &&
    (projectData.projectSubType === stepTwoText.studioApartment ||
      projectData?.projectSubType === stepTwoText.businessSuites ||
      projectData.projectSubType === stepTwoText.hotelApartment)

  useEffect(() => {
    setIsPlotRange(false)
  }, [isShop, isBusiness, isIndustrialLand])

  const modalRef = useRef(null)
  const [editingTemp, setEditingTemp] = useState({ active: false, index: null })
  const [imageKey, setImageKey] = useState(0)
  const [otherOptionInput, setOtherOptionInput] = useState('')
  const [pricePerUnitCarpetArea, setPricePerUnitCarpetArea] = useState()
  const [pricePerUnitBulitUpArea, setPricePerUnitBulitUpArea] = useState()
  const [pricePerUnitSuperBulitUpArea, setPricePerUnitSuperBulitUpArea] =
    useState()
  const [selectedDedicatedRooms, setSelectedDedicatedRooms] = useState([])
  const [otherDedicatedRoomValue, setOtherDedicatedRoomValue] = useState('')
  const [dedicatedRoomsState, setDedicatedRoomsState] = useState(
    stepTwoText.dedicatedRoomOptions
  )
  const [pricePerReraUnitCarpetArea, setPricePerReraUnitCarpetArea] = useState()

  const getInitialUnitDetail = (isLand) => {
    if (isLand) {
      return {
        primaryArea: {
          areaSize: projectData?.primaryArea?.areaSize || null,
          areaUnit: projectData?.primaryArea?.areaUnit || text.camelSquareFeet,
          areaType: projectData?.primaryArea?.areaType || stepTwoText.plotArea,
          pricePerUnit: projectData?.primaryArea?.pricePerUnit || null,
          displayUnitSize: projectData?.primaryArea?.displayUnitSize || true,
        },
        reraArea: {
          reraCarpetArea: projectData?.reraArea?.reraCarpetArea || null,
          reraCarpetAreaUnit:
            projectData?.reraArea?.reraCarpetAreaUnit || text.camelSquareFeet,
          reraCarpetAreaPricePerUnit:
            projectData?.reraArea?.reraCarpetAreaPricePerUnit || null,
          displayReraCarpetArea:
            projectData?.reraArea?.displayReraCarpetArea || false,
        },
        salePrice: projectData?.salePrice || null,
        plotSalePrice: projectData?.plotSalePrice || null,
        plotMinPrice: projectData?.plotMinPrice || null,
        plotMaxPrice: projectData?.plotMaxPrice || null,
        minPrice: projectData?.minPrice || null,
        maxPrice: projectData?.maxPrice || null,
        activeInput: projectData?.activeInput || false,
        isplotRange: projectData?.isplotRange || false,
        bedroomCount: projectData?.bedroomCount
          ? projectData?.bedroomCount
          : '',
        bathroomCount: projectData?.bathroomCount
          ? projectData?.bathroomCount
          : '',
        unitTitle: projectData?.unitTitle ? projectData?.unitTitle : '',
        unitCount: projectData?.unitCount ? projectData?.unitCount : '',
        roadFacingPlotLength: null,
        roadFacingPlotBreadth: null,
        roadFacingPlotLengthPerUnit: stepTwoText.acre,
        roadFacingPlotBreadthPerUnit: stepTwoText.acre,
        plotHeight: null,
        plotHeightPerUnit: stepTwoText.acre,
        plotAreaLength: null,
        plotAreaBreadth: null,
        plotAreaLengthPerUnit: stepTwoText.acre,
        plotAreaBreadthPerUnit: stepTwoText.acre,
      }
    }

    return {
      primaryArea: {
        areaSize: projectData?.primaryArea?.areaSize || null,
        areaUnit: projectData?.primaryArea?.areaUnit || text.camelSquareFeet,
        areaType: projectData?.primaryArea?.areaType || stepTwoText.carpetArea,
        pricePerUnit: projectData?.primaryArea?.pricePerUnit || null,
        displayUnitSize: projectData?.primaryArea?.displayUnitSize || true,
      },
      secondaryArea: {
        areaSize: projectData?.secondaryArea?.areaSize || null,
        areaUnit: projectData?.secondaryArea?.areaUnit || text.camelSquareFeet,
        areaType:
          projectData?.secondaryArea?.areaType || stepTwoText.builtUpArea,
        pricePerUnit: projectData?.secondaryArea?.pricePerUnit || null,
        displayUnitSize: projectData?.secondaryArea?.displayUnitSize || false,
      },
      tertiaryArea: {
        areaSize: projectData?.tertiaryArea?.areaSize || null,
        areaUnit: projectData?.tertiaryArea?.areaUnit || text.camelSquareFeet,
        areaType:
          projectData?.tertiaryArea?.areaType || stepTwoText.superBuiltUpArea,
        pricePerUnit: projectData?.tertiaryArea?.pricePerUnit || null,
        displayUnitSize: projectData?.tertiaryArea?.displayUnitSize || false,
      },
      reraArea: {
        reraCarpetArea: projectData?.reraArea?.reraCarpetArea || null,
        reraCarpetAreaUnit:
          projectData?.reraArea?.reraCarpetAreaUnit || text.camelSquareFeet,
        reraCarpetAreaPricePerUnit:
          projectData?.reraArea?.reraCarpetAreaPricePerUnit || null,
        displayReraCarpetArea:
          projectData?.reraArea?.displayReraCarpetArea || false,
      },
      salePrice: projectData?.salePrice || null,
      plotSalePrice: projectData?.plotSalePrice || null,
      plotMinPrice: projectData?.plotMinPrice || null,
      plotMaxPrice: projectData?.plotMaxPrice || null,
      minPrice: projectData?.minPrice || null,
      maxPrice: projectData?.maxPrice || null,
      activeInput: projectData?.activeInput || false,
      isplotRange: projectData?.isplotRange || false,
      bedroomCount: projectData?.bedroomCount ? projectData?.bedroomCount : '',
      bathroomCount: projectData?.bathroomCount
        ? projectData?.bathroomCount
        : '',
      unitTitle: projectData?.unitTitle ? projectData?.unitTitle : '',
      unitCount: projectData?.unitCount ? projectData?.unitCount : '',
      furnishingStatus: projectData?.furnishingStatus
        ? projectData?.furnishingStatus
        : '',
      washroomCount: projectData?.washroomCount
        ? projectData?.washroomCount
        : '',
      pantryArea: projectData?.pantryArea ? projectData?.pantryArea : '',
      dedicatedRoom: projectData?.dedicatedRoom
        ? projectData?.dedicatedRoom
        : [],
    }
  }

  const [unitDetail, setUnitDetail] = useState(getInitialUnitDetail(isLand))
  const [formattedMinPrice, setFormattedMinPrice] = useState('')
  const [formattedMaxPrice, setFormattedMaxPrice] = useState('')
  const [formattedSalesPrice, setFormattedSalesPrice] = useState('')
  const [plotMinPrice, setPlotMinPrice] = useState('')
  const [plotMaxPrice, setPlotMaxPrice] = useState('')
  const [plotSalePrice, setPlotSalePrice] = useState('')
  useEffect(() => {
    setFormattedSalesPrice(
      projectData?.salePrice > 0
        ? projectData.salePrice
        : unitDetail?.salePrice > 0
          ? unitDetail.salePrice
          : undefined
    )
    setFormattedMinPrice(
      projectData?.minPrice > 0
        ? projectData.minPrice
        : unitDetail?.minPrice > 0
          ? unitDetail.minPrice
          : undefined
    )
    setFormattedMaxPrice(
      projectData?.maxPrice > 0
        ? projectData?.maxPrice
        : unitDetail?.maxPrice > 0
          ? unitDetail?.maxPrice
          : undefined
    )
    setPlotSalePrice(
      projectData?.plotSalePrice > 0
        ? projectData.plotSalePrice
        : unitDetail?.plotSalePrice > 0
          ? unitDetail.plotSalePrice
          : undefined
    )
    setPlotMinPrice(
      projectData?.plotMinPrice > 0
        ? projectData.plotMinPrice
        : unitDetail?.plotMinPrice > 0
          ? unitDetail.plotMinPrice
          : undefined
    )
    setPlotMaxPrice(
      projectData?.plotMaxPrice > 0
        ? projectData?.plotMaxPrice
        : unitDetail?.plotMaxPrice > 0
          ? unitDetail?.plotMaxPrice
          : undefined
    )
  })

  const calculatePricePerUnit = async () => {
    const salePrice = unitDetail?.salePrice
    const primaryAreaDetail = unitDetail?.primaryArea || {}
    const secondaryAreaDetail = unitDetail?.secondaryArea || {}
    const tertiaryAreaDetail = unitDetail?.tertiaryArea || {}
    const reraAreaDetail = unitDetail?.reraArea || {}
    if (!salePrice) {
      return
    }
    if (primaryAreaDetail?.areaSize && primaryAreaDetail?.areaUnit) {
      const pricePerUnitPrimaryArea = await getPricePerUnit(
        primaryAreaDetail?.areaUnit,
        primaryAreaDetail?.areaSize,
        salePrice
      )
      setPricePerUnitCarpetArea(pricePerUnitPrimaryArea)
    }
    if (secondaryAreaDetail?.areaSize && secondaryAreaDetail?.areaUnit) {
      const pricePerUnitSecondaryArea = await getPricePerUnit(
        secondaryAreaDetail?.areaUnit,
        secondaryAreaDetail?.areaSize,
        salePrice
      )
      setPricePerUnitBulitUpArea(pricePerUnitSecondaryArea)
    }
    if (tertiaryAreaDetail?.areaSize && tertiaryAreaDetail?.areaUnit) {
      const pricePerUnitTertiaryArea = await getPricePerUnit(
        tertiaryAreaDetail?.areaUnit,
        tertiaryAreaDetail?.areaSize,
        salePrice
      )
      setPricePerUnitSuperBulitUpArea(pricePerUnitTertiaryArea)
    }
    if (reraAreaDetail?.reraCarpetArea && reraAreaDetail?.reraCarpetAreaUnit) {
      const pricePerUnitReraArea = await getPricePerUnit(
        reraAreaDetail?.reraCarpetAreaUnit,
        reraAreaDetail?.reraCarpetArea,
        salePrice
      )
      setPricePerReraUnitCarpetArea(pricePerUnitReraArea)
    }
  }
  useEffect(() => {
    calculatePricePerUnit()
  }, [
    unitDetail?.primaryArea,
    unitDetail?.secondaryArea,
    unitDetail?.tertiaryArea,
    unitDetail?.salePrice,
    unitDetail?.reraArea,
  ])

  useEffect(() => {
    if (!(projectData?.activeInput || unitDetail?.activeInput)) {
      setPricePerUnitBulitUpArea('')
      setPricePerUnitCarpetArea('')
      setPricePerUnitSuperBulitUpArea('')
      setPricePerReraUnitCarpetArea('')
    } else if (activeInput) {
      setProjectData({
        ...projectData,
        primaryArea: {
          ...projectData?.primaryArea,
          pricePerUnit: null,
          displayUnitSize: false,
        },
        secondaryArea: {
          ...projectData?.secondaryArea,
          pricePerUnit: null,
          displayUnitSize: false,
        },
        tertiaryArea: {
          ...projectData?.tertiaryArea,
          pricePerUnit: null,
          displayUnitSize: false,
        },
        reraArea: {
          ...projectData?.reraArea,
          reraCarpetAreaPricePerUnit: null,
          displayReraCarpetArea: false,
        },
      })
      setUnitDetail({
        ...unitDetail,
        primaryArea: {
          ...unitDetail?.primaryArea,
          pricePerUnit: null,
          displayUnitSize: false,
        },
        secondaryArea: {
          ...unitDetail?.secondaryArea,
          pricePerUnit: null,
          displayUnitSize: false,
        },
        tertiaryArea: {
          ...unitDetail?.tertiaryArea,
          pricePerUnit: null,
          displayUnitSize: false,
        },
        reraArea: {
          ...unitDetail?.reraArea,
          reraCarpetAreaPricePerUnit: null,
          displayReraCarpetArea: false,
        },
      })
    }
  }, [activeInput])
  const { projectType, projectSubType } = projectData || {}
  const [photoURLs, setPhotoURLs] = useState([])
  const { imageUrl } = unitDetail || {}
  const { projectArea, projectAreaUnit } = projectData || {}

  const checkFields = () => {
    if (isLand) {
      for (const check of PROJECT_STEP_2_LAND_CHECKS) {
        const key = Object.keys(check)[0]
        if (isplotRange) {
          return true
        }
        if (
          key === 'areaDetail' &&
          unitDetail[key]?.[0]?.unitArea === undefined
        ) {
          toast.error(check[key])
          return false
        }
        if (!unitDetail[key] || unitDetail[key] === '') {
          toast.error(check[key])
          return false
        }
      }

      // if (!unitDetail?.primaryArea?.areaSize) {
      //   toast.error(stepTwoText.unitSizeMissing);
      //   return false;
      // }
      return true
    }

    if (!isLand) {
      for (const check of PROJECT_STEP_2_LAND_CHECKS) {
        const key = Object.keys(check)[0]
        if (
          key === 'areaDetail' &&
          unitDetail[key]?.[0]?.unitArea === undefined
        ) {
          toast.error(check[key])
          return false
        }
        if (!unitDetail[key] || unitDetail[key] === '') {
          toast.error(check[key])
          return false
        }
      }
      // if (!unitDetail?.primaryArea?.areaSize) {
      //   toast.error(stepTwoText.unitSizeMissing);
      //   return false;
      // }
      return true
    }
    if (
      (projectData?.projectType === stepTwoText.commercial ||
        projectData?.projectType === stepTwoText.residential ||
        projectData?.projectType === stepTwoText.industrial ||
        projectData?.projectType === stepTwoText.agricultural) &&
      [
        stepTwoText.warehouse,
        stepTwoText.commercialShop,
        stepTwoText.commercialShowroom,
        stepTwoText.commercialOfficeSpace,
        stepTwoText.kiosk,
        stepTwoText.mallRetailLockable,
        stepTwoText.mallRetailUnlockable,
        stepTwoText.highStreetRetailLockable,
        stepTwoText.highStreetRetailUnlockable,
        stepTwoText.officeSpaceInItPark,
        stepTwoText.godown,
        stepTwoText.residentialPlot,
        stepTwoText.scoPlot,
        stepTwoText.foodCourt,
        stepTwoText.atmSpace,
        stepTwoText.industrialLand,
        stepTwoText.agriculturalLand,
        stepTwoText.foodKiosk,
        stepTwoText.businessSuites,
        stepTwoText.banquet,
        stepTwoText.anchorStore,
        stepTwoText.hyperMarket,
        stepTwoText.industrialShed,
        stepTwoText.industrialBuilding,
        stepTwoText.retailSpace,
        stepTwoText.residentialLand,
      ].includes(projectData?.projectSubType)
    ) {
      for (const check of PROJECT_STEP_2_LAND_CHECKS) {
        const key = Object.keys(check)[0]
        if (
          key === 'areaDetail' &&
          unitDetail[key]?.[0]?.unitArea === undefined
        ) {
          toast.error(check[key])
          return false
        }
        if (!unitDetail[key] || unitDetail[key] === '') {
          toast.error(check[key])
          return false
        }
      }
      for (let i = 0; i < PROJECT_STEP_2_AREA_CHECKS.length; i++) {
        const areaCheck = PROJECT_STEP_2_AREA_CHECKS[i]
        const areaKey = Object.keys(areaCheck)[0]
        if (i === 0 && !unitDetail?.primaryArea?.areaSize) {
          toast.error(areaCheck[areaKey])
          return false
        }
      }
      return true
    }
    for (const check of PROJECT_STEP_2_CHECKS) {
      const key = Object.keys(check)[0]
      if (
        (key === 'bedroomCount' || key === 'bathroomCount') &&
        !unitDetail[key]
      ) {
        toast.error(check[key])
        return false
      }
      if (!unitDetail[key] || unitDetail[key] === '') {
        toast.error(check[key])
        return false
      }
    }
    for (let i = 0; i < PROJECT_STEP_2_AREA_CHECKS.length; i++) {
      const areaCheck = PROJECT_STEP_2_AREA_CHECKS[i]
      const areaKey = Object.keys(areaCheck)[0]
      if (i === 0 && !unitDetail?.primaryArea?.areaSize) {
        toast.error(areaCheck[areaKey])
        return false
      }
    }
    return true
  }
  useEffect(() => {
    if (unitDetail?.dedicatedRoom && Array.isArray(unitDetail.dedicatedRoom)) {
      const newState = { ...dedicatedRoomsState }
      unitDetail.dedicatedRoom.forEach((room) => {
        if (DEDICATED_ROOMS_OPTIONS.includes(room)) {
          newState[room] = true
        } else if (room !== stepTwoText.others) {
          setOtherDedicatedRoomValue(room)
          newState[stepTwoText.others] = true
        }
      })
      setDedicatedRoomsState(newState)
    } else if (
      unitDetail?.dedicatedRoom &&
      typeof unitDetail.dedicatedRoom === 'string'
    ) {
      const newState = { ...dedicatedRoomsState }
      if (DEDICATED_ROOMS_OPTIONS.includes(unitDetail.dedicatedRoom)) {
        newState[unitDetail.dedicatedRoom] = true
      } else if (unitDetail.dedicatedRoom !== stepTwoText.others) {
        setOtherDedicatedRoomValue(unitDetail.dedicatedRoom)
        newState[stepTwoText.others] = true
      }
      setDedicatedRoomsState(newState)
    } else {
      setDedicatedRoomsState(stepTwoText.dedicatedRoomOptions)
      setOtherDedicatedRoomValue('')
    }
  }, [unitDetail?.dedicatedRoom])

  const renderButtons = (
    buttons,
    title,
    onClick,
    category,
    isRequired = true
  ) => {
    if (!buttons || buttons.length === 0) {
      return null
    }

    const selectedValue =
      unitDetail?.[category]?.toString() || projectData?.[category]?.toString()
    return (
      <div>
        <p className={`text-[1rem]`}>
          {title}
          {isRequired && (
            <span className="text-red-500 ml-1 mt-1 font-normal">
              {symbols.asterisk}
            </span>
          )}
        </p>

        <div className="flex flex-wrap mb-4">
          {buttons.map((button) => {
            const buttonStr = button.toString()
            const isButtonActive = selectedValue === buttonStr
            return (
              <button
                className={`px-2 mt-2 mr-4 py-4 h-[25px] min-w-[70px] text-[14px] rounded-full ${
                  isButtonActive
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600'
                } border-2 border-primary mx-1`}
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
  const isUnitSizeGtrProject = () => {
    const projectAreaInSqft = projectArea * CONVERSION_FACTORS[projectAreaUnit]
    const { primaryArea, secondaryArea, reraArea } = unitDetail || {}
    const firstArea = primaryArea || {}
    const secondArea = secondaryArea || {}
    const reraAreaDetail = reraArea || {}

    const unitAreaInSqftFirst =
      firstArea.areaSize * CONVERSION_FACTORS[firstArea.areaUnit]
    const unitAreaInSqftSecond =
      secondArea.areaSize * CONVERSION_FACTORS[secondArea.areaUnit]
    const unitAreaInSqftRera =
      reraAreaDetail.reraCarpetArea *
      CONVERSION_FACTORS[reraAreaDetail.reraCarpetAreaUnit]
    if (
      unitAreaInSqftFirst > projectAreaInSqft ||
      unitAreaInSqftSecond > projectAreaInSqft ||
      unitAreaInSqftRera > projectAreaInSqft
    ) {
      toast.error(stepTwoText.unitSizeGreaterThanProjectSize)
      return false
    } else {
      return true
    }
  }

  const isNewDataDuplicate = (unitList, unitDetail) => {
    // if (isplotRange) return false
    // for (const item of unitList) {
    //   if (
    //     Number(item.bedroomCount) == Number(unitDetail.bedroomCount) &&
    //     Number(item.bathroomCount) == Number(unitDetail.bathroomCount) &&
    //     (
    //       Number(item.salePrice) == Number(unitDetail.salePrice)
    //       ||
    //       (Number(item.minPrice) == Number(unitDetail.minPrice) &&
    //         Number(item.maxPrice) == Number(unitDetail.maxPrice)))
    //     &&
    //     Number(item.primaryArea.areaSize) === Number(unitDetail.primaryArea.areaSize)
    //   ) {
    //     item.unitCount = parseInt(item.unitCount) + parseInt(unitDetail.unitCount);
    //     return true;
    //   }
    // }
    return false
  }
  const handleAddUnitButton = () => {
    setUpload(false)
    const check = checkFields()
    const unitSizeCheck = isUnitSizeGtrProject()
    if (!unitSizeCheck || !check) {
      return
    }

    let updatedUnitList = [...unitList]

    if (editingTemp.active && editingTemp.index !== null) {
      updatedUnitList[editingTemp.index] = unitDetail
      setEditingTemp({ active: false, index: null })
    } else {
      const isDuplicate = isNewDataDuplicate(unitList, unitDetail)
      if (isDuplicate) {
        // toast.success(stepTwoText.unitTextNote);

        resetUnitDetail()
        setProjectData({
          ...projectData,
          roadFacingPlotLength: '',
          roadFacingPlotBreadth: '',
          openSides: '',
          roadFacingPlotLengthPerUnit: '',
          roadFacingPlotBreadthPerUnit: '',
          plotAreaLength: '',
          plotAreaBreadth: '',
          plotAreaLengthPerUnit: '',
          plotAreaBreadthPerUnit: '',
          plotHeight: '',
          plotHeightPerUnit: '',
          unitTitle: '',
          unitCount: '',
          boundaryWalls: '',
          bedroomCount: '',
          bathroomCount: '',
          dedicatedRoom: [],
          furnishingStatus: '',
          washroomCount: '',
          pantryArea: '',
          salePrice: '',
          plotMinPrice: '',
          plotMaxPrice: '',
          plotSalePrice: '',
          minPrice: '',
          activeInput: false,
          isplotRange: originalIsPlotRange, 
          maxPrice: '',
          primaryArea: isLand
            ? {
                areaSize: null,
                areaUnit: text.camelSquareFeet,
                areaType: stepTwoText.plotArea,
                pricePerUnit: null,
                displayUnitSize: false,
              }
            : {
                areaSize: null,
                areaUnit: text.camelSquareFeet,
                areaType: stepTwoText.carpetArea,
                pricePerUnit: null,
                displayUnitSize: false,
              },
          secondaryArea: {
            areaSize: null,
            areaUnit: text.camelSquareFeet,
            areaType: stepTwoText.builtUpArea,
            pricePerUnit: null,
            displayUnitSize: false,
          },
          tertiaryArea: {
            areaSize: null,
            areaUnit: text.camelSquareFeet,
            areaType: stepTwoText.superBuiltUpArea,
            pricePerUnit: null,
            displayUnitSize: false,
          },
          reraArea: {
            reraCarpetArea: null,
            reraCarpetAreaUnit: text.camelSquareFeet,
            reraCarpetAreaPricePerUnit: null,
            displayReraCarpetArea: false,
          },
        })
        return
      }
      updatedUnitList.push(unitDetail)
    }
    setUnitList(updatedUnitList)
    setProjectData((prev) => ({
      ...prev,
      projectUnits: updatedUnitList,
    }))
    resetUnitDetail()
    setIsPlotRange(false)
    setProjectData((prev) => ({
      ...prev,
      roadFacingPlotLength: '',
      roadFacingPlotBreadth: '',
      openSides: '',
      roadFacingPlotLengthPerUnit: '',
      roadFacingPlotBreadthPerUnit: '',
      activeInput: false,
      isplotRange: isplotRange,
      plotAreaLength: '',
      plotAreaBreadth: '',
      plotAreaLengthPerUnit: '',
      plotAreaBreadthPerUnit: '',
      plotHeight: '',
      plotHeightPerUnit: '',
      unitTitle: '',
      unitCount: '',
      boundaryWalls: '',
      bedroomCount: '',
      bathroomCount: '',
      dedicatedRoom: [],
      furnishingStatus: '',
      washroomCount: '',
      pantryArea: '',
      salePrice: '',
      plotMinPrice: '',
      plotMaxPrice: '',
      plotSalePrice: '',
      minPrice: '',
      maxPrice: '',
      plotHeight: '',
      plotHeightPerUnit: '',
      primaryArea: isLand
        ? {
            areaSize: null,
            areaUnit: text.camelSquareFeet,
            areaType: stepTwoText.plotArea,
            pricePerUnit: null,
            displayUnitSize: false,
          }
        : {
            areaSize: null,
            areaUnit: text.camelSquareFeet,
            areaType: stepTwoText.carpetArea,
            pricePerUnit: null,
            displayUnitSize: false,
          },
      secondaryArea: {
        areaSize: null,
        areaUnit: text.camelSquareFeet,
        areaType: stepTwoText.builtUpArea,
        pricePerUnit: null,
        displayUnitSize: false,
      },
      tertiaryArea: {
        areaSize: null,
        areaUnit: text.camelSquareFeet,
        areaType: stepTwoText.superBuiltUpArea,
        pricePerUnit: null,
        displayUnitSize: false,
      },
      reraArea: {
        reraCarpetArea: null,
        reraCarpetAreaUnit: text.camelSquareFeet,
        reraCarpetAreaPricePerUnit: null,
        displayReraCarpetArea: false,
      },
    }))
    setOtherOptionInput('')
    setPhotoURLs([])
    setPricePerUnitCarpetArea('')
    setPricePerUnitBulitUpArea('')
    setPricePerUnitSuperBulitUpArea('')
    setPricePerReraUnitCarpetArea('')
    setActiveInput(false)
    setSelectedDedicatedRooms([])
  }

  const resetUnitDetail = () => {
    let updatedUnitDetail = getInitialUnitDetail(isLand)
    updatedUnitDetail.bedroomCount = ''
    updatedUnitDetail.bathroomCount = ''
    updatedUnitDetail.unitCount = ''
    updatedUnitDetail.unitTitle = ''
    updatedUnitDetail.furnishingStatus = ''
    updatedUnitDetail.washroomCount = ''
    updatedUnitDetail.pantryArea = ''
    updatedUnitDetail.dedicatedRoom = []
    updatedUnitDetail.salePrice = ''
    updatedUnitDetail.activeInput = false
    updatedUnitDetail.isplotRange = isplotRange
    updatedUnitDetail.minPrice = ''
    updatedUnitDetail.maxPrice = ''
    updatedUnitDetail.plotHeight = ''
    updatedUnitDetail.plotHeightPerUnit = ''
    updatedUnitDetail.plotSalePrice = ''
    updatedUnitDetail.plotMinPrice = ''
    updatedUnitDetail.plotMaxPrice = ''

    if (isLand) {
      updatedUnitDetail.primaryArea.areaSize = null
      updatedUnitDetail.primaryArea.areaUnit = text.camelSquareFeet
      updatedUnitDetail.primaryArea.areaType = stepTwoText.plotArea
      updatedUnitDetail.primaryArea.pricePerUnit = null
      updatedUnitDetail.primaryArea.displayUnitSize = true
      updatedUnitDetail.reraArea.reraCarpetArea = null
      updatedUnitDetail.reraArea.reraCarpetAreaUnit = text.camelSquareFeet
      updatedUnitDetail.reraArea.reraCarpetAreaPricePerUnit = null
      updatedUnitDetail.reraArea.displayReraCarpetArea = false
    } else {
      updatedUnitDetail.primaryArea.areaSize = null
      updatedUnitDetail.primaryArea.areaUnit = text.camelSquareFeet
      updatedUnitDetail.primaryArea.areaType = stepTwoText.carpetArea
      updatedUnitDetail.primaryArea.pricePerUnit = null
      updatedUnitDetail.primaryArea.displayUnitSize = true
      updatedUnitDetail.reraArea.reraCarpetArea = null
      updatedUnitDetail.reraArea.reraCarpetAreaUnit = text.camelSquareFeet
      updatedUnitDetail.reraArea.reraCarpetAreaPricePerUnit = null
      updatedUnitDetail.reraArea.displayReraCarpetArea = false
      if (updatedUnitDetail.secondaryArea || updatedUnitDetail.tertiaryArea) {
        updatedUnitDetail.secondaryArea.areaSize = null
        updatedUnitDetail.secondaryArea.areaUnit = text.camelSquareFeet
        updatedUnitDetail.secondaryArea.areaType = stepTwoText.builtUpArea
        updatedUnitDetail.secondaryArea.pricePerUnit = null
        updatedUnitDetail.secondaryArea.displayUnitSize = false
        updatedUnitDetail.tertiaryArea.areaSize = null
        updatedUnitDetail.tertiaryArea.areaUnit = text.camelSquareFeet
        updatedUnitDetail.tertiaryArea.areaType = stepTwoText.superBuiltUpArea
        updatedUnitDetail.tertiaryArea.pricePerUnit = null
        updatedUnitDetail.tertiaryArea.displayUnitSize = false
      }
    }
    setUnitDetail(updatedUnitDetail)
    setDedicatedRoomsState(stepTwoText.dedicatedRoomOptions)
    setOtherDedicatedRoomValue('')
  }

  const handlePhotoSelect = async (e) => {
    const formData = new FormData()
    e.forEach((file, index) => {
      formData.append(`images[${index}]`, file)
    })
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
      const newPhotoUrls = response.data.result.imageUrls
      setUnitDetail({
        ...unitDetail,
        imageUrl: newPhotoUrls,
      })
      const mappedNewPhotoUrls = newPhotoUrls.map((url, index) => ({
        name: 'Floor Plan',
        url: url,
      }))
      const updatedPhotoURLs = [...photoURLs, ...mappedNewPhotoUrls]
      setPhotoURLs(updatedPhotoURLs)
      setUnitDetail({
        ...unitDetail,
        imageUrl: updatedPhotoURLs,
      })
      toast(response?.unitDetail?.responseMessage)
      setImageKey((prev) => prev + 1)
    } catch (error) {
      logger.error(stepTwoText.imageUploadError)
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
        const updatedPhotoURLs = photoURLs.filter(
          (_, photoIndex) => photoIndex !== index
        )
        setPhotoURLs(updatedPhotoURLs)
        setUnitDetail((prevData) => ({
          ...prevData,
          imageUrl: updatedPhotoURLs,
        }))
        toast.info(response.unitDetail?.responseMessage)
        setUpload(false)
      }
    } catch (error) {
      logger.error(stepTwoText.photoDeleteError)
    }
  }
  const handleProjectDataChange = (keyName, value) => {
    setUnitDetail({
      ...unitDetail,
      [keyName]: value,
    })

    setProjectData((prevstate) => ({
      ...prevstate,
      [keyName]: value,
    }))
  }
  const handleProjectAreaChange = (keyName, value, area) => {
    if (keyName === displayUnitSize || keyName === displayReraCarpetArea) {
      if (value === true) {
        setUnitDetail((prev) => ({
          ...prev,
          primaryArea: {
            ...prev.primaryArea,
            displayUnitSize: area === primaryArea ? true : false,
          },
          secondaryArea: {
            ...prev.secondaryArea,
            displayUnitSize: area === secondaryArea ? true : false,
          },
          tertiaryArea: {
            ...prev.tertiaryArea,
            displayUnitSize: area === tertiaryArea ? true : false,
          },
          reraArea: {
            ...prev.reraArea,
            displayReraCarpetArea: area === reraArea ? true : false,
          },
        }))
      } else {
        setUnitDetail((prev) => ({
          ...prev,
          [area]: {
            ...prev[area],
            displayUnitSize: false,
          },
          reraArea: {
            ...prev.reraArea,
            displayReraCarpetArea: false,
          },
        }))
      }
    } else {
      setUnitDetail((prev) => ({
        ...prev,
        [area]: {
          ...prev[area],
          [keyName]: value,
        },
        reraArea: {
          ...prev.reraArea,
          [keyName]: value,
        },
      }))
    }
  }

  const handleDelete = (unitIndex) => {
    {
      unitList[unitIndex]?.imageUrl &&
        deletePhoto(0, unitList[unitIndex]?.imageUrl[0]?.url)
    }
    const arr = unitList.filter((item, index) => index !== unitIndex)
    setUnitList(arr)
  }
  const handlePrepopulate = (unitIndex) => {
    const originalIsPlotRange = unitList[unitIndex]?.isplotRange

    setUnitDetail({
      ...unitList[unitIndex],
      salePrice: '',
      minPrice: '',
      maxPrice: '',
      activeInput: false,
      isplotRange: originalIsPlotRange,
      plotMinPrice: '',
      plotMaxPrice: '',
      plotSalePrice: '',
      plotHeight: '',
      plotHeightPerUnit: '',
      imageUrl: [],
      primaryArea: isLand
        ? {
            areaSize: null,
            areaUnit: text.camelSquareFeet,
            areaType: stepTwoText.plotArea,
            pricePerUnit: null,
            displayUnitSize: false,
          }
        : {
            areaSize: null,
            areaUnit: text.camelSquareFeet,
            areaType: stepTwoText.carpetArea,
            pricePerUnit: null,
            displayUnitSize: false,
          },
      secondaryArea: {
        areaSize: null,
        areaUnit: text.camelSquareFeet,
        areaType: stepTwoText.builtUpArea,
        pricePerUnit: null,
        displayUnitSize: false,
      },
      tertiaryArea: {
        areaSize: null,
        areaUnit: text.camelSquareFeet,
        areaType: stepTwoText.superBuiltUpArea,
        pricePerUnit: null,
        displayUnitSize: false,
      },
      reraArea: {
        reraCarpetArea: null,
        reraCarpetAreaUnit: text.camelSquareFeet,
        reraCarpetAreaPricePerUnit: null,
        displayReraCarpetArea: false,
      },
    })

    setProjectData({
      ...projectData,
      openSides: unitList[unitIndex]?.openSides,
      roadFacingPlotLength: unitList[unitIndex]?.roadFacingPlotLength,
      roadFacingPlotBreadth: unitList[unitIndex]?.roadFacingPlotBreadth,
      roadFacingPlotLengthPerUnit:
        unitList[unitIndex]?.roadFacingPlotLengthPerUnit,

      roadFacingPlotBreadthPerUnit:
        unitList[unitIndex]?.roadFacingPlotBreadthPerUnit,
      plotHeight: unitList[unitIndex]?.plotHeight,
      plotHeightPerUnit: unitList[unitIndex]?.plotHeightPerUnit,
      plotAreaLength: unitList[unitIndex]?.plotAreaLength,
      plotAreaBreadth: unitList[unitIndex]?.plotAreaBreadth,
      plotAreaLengthPerUnit: unitList[unitIndex]?.plotAreaLengthPerUnit,
      plotAreaBreadthPerUnit: unitList[unitIndex]?.plotAreaBreadthPerUnit,
      unitTitle: unitList[unitIndex]?.unitTitle,
      unitCount: unitList[unitIndex]?.unitCount,
      boundaryWalls: unitList[unitIndex]?.boundaryWalls,
      bedroomCount: unitList[unitIndex]?.bedroomCount,
      bathroomCount: unitList[unitIndex]?.bathroomCount,
      dedicatedRoom: unitList[unitIndex]?.dedicatedRoom,
      furnishingStatus: unitList[unitIndex]?.furnishingStatus,
      washroomCount: unitList[unitIndex]?.washroomCount,
      pantryArea: unitList[unitIndex]?.pantryArea,
    })

    const newState = { ...dedicatedRoomsState }
    Object.keys(newState).forEach((key) => {
      newState[key] = false
    })

    if (Array.isArray(unitList[unitIndex]?.dedicatedRoom)) {
      unitList[unitIndex].dedicatedRoom.forEach((room) => {
        if (DEDICATED_ROOMS_OPTIONS.includes(room)) {
          newState[room] = true
        } else if (room !== 'Others') {
          setOtherDedicatedRoomValue(room)
          newState['Others'] = true
        }
      })
    }
    setDedicatedRoomsState(newState)
    setEditingTemp({ active: false, index: unitIndex })
  }

  const divRef = useRef(null)
  const handleClick = () => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleEdit = (unitIndex) => {
    setUnitDetail(unitList[unitIndex])
    setEditingTemp({ active: true, index: unitIndex })
    const editingUnit = unitList[unitIndex]
    if (editingUnit.isplotRange !== undefined) {
      setIsPlotRange(editingUnit.isplotRange)
      setProjectData((prevstate) => ({
        ...prevstate,
        isplotRange: editingUnit.isplotRange,
      }))
    }

    const newState = { ...dedicatedRoomsState }
    Object.keys(newState).forEach((key) => {
      newState[key] = false
    })
    if (Array.isArray(unitList[unitIndex]?.dedicatedRoom)) {
      unitList[unitIndex].dedicatedRoom.forEach((room) => {
        if (DEDICATED_ROOMS_OPTIONS.includes(room)) {
          newState[room] = true
        }
      })
    }
    setDedicatedRoomsState(newState)
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBlurProjectSize = (value, category) => {
    if (!value) {
      setProjectData((prev) => ({
        ...prev,
        [category]: '',
      }))
      setFormattedMaxPrice('')
      setFormattedMinPrice('')
      return
    }
    const rawValue = value.toString().replace(/,/g, '')
    const regex = /^\d+(\.\d{0,2})/
    let newValue = rawValue
    if (!regex.test(rawValue)) {
      const extracted = rawValue.match(/\d+(\.\d{0,2})?/)
      newValue = extracted ? extracted[0] : ''
    }
    const [integerPart, decimalPart] = newValue.split('.')
    const formattedInteger = numberFormatter(integerPart)
    setProjectData((prev) => ({
      ...prev,
      [category]: newValue,
    }))
    setFormattedMinPrice(
      formattedInteger + (decimalPart ? '.' + decimalPart : '')
    )
    setFormattedMaxPrice(
      formattedInteger + (decimalPart ? '.' + decimalPart : '')
    )
  }

  return (
    <div ref={modalRef} className="px-7 border-gray-100 py-3 ">
      <MDNote
        type="success"
        inlineCSS={{
          width: 'fit-content',
          padding: '5px',
          backgroundColor: '#9316020f',
        }}
      >
        <p>{stepTwoText.addUnitNote}</p>
      </MDNote>

      {(isLand || projectData?.projectType === 'Commercial') && (
        <div className="flex gap-2 mt-4">
          <p>{stepTwoText.plotRange}</p>
          <div
            className={`w-10 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center relative ${isplotRange ? 'bg-gray-200' : 'bg-gray-200'}`}
            onClick={() => {
              const newPlotRange = !isplotRange
              setProjectData((prev) => ({
                ...prev,
                isplotRange: newPlotRange,
              }))
              setUnitDetail((prev) => ({
                ...prev,
                isplotRange: newPlotRange,
              }))
              setIsPlotRange(!isplotRange)
            }}
          >
            <div
              className={`w-4 h-4 bg-primary rounded-full shadow-md absolute transform transition-transform duration-300 ${isplotRange ? 'translate-x-5' : 'translate-x-1'}`}
            />
          </div>
        </div>
      )}

      {isplotRange ? (
        <>
          <div className="mb-4 mt-3 mr-9">
            <MDLabelAndInput
              label={stepTwoText.unitTitle}
              labelClass="text-headingColor"
              inputState={
                projectData?.unitTitle
                  ? projectData?.unitTitle
                  : unitDetail?.unitTitle
              }
              cssClass="w-[232px] h-[38px]"
              tooltipText={stepTwoText.unitTitleTooltip}
              onChangeFunction={(value) =>
                handleProjectDataChange('unitTitle', value)
              }
            />
          </div>
          <div className="mb-4 mr-9">
            <MDLabelAndInput
              label={stepTwoText.numberOfUnits}
              labelClass="text-headingColor"
              isInputNumber="true"
              maxLengthInput="4"
              inputState={
                projectData?.unitCount
                  ? projectData?.unitCount
                  : unitDetail?.unitCount
              }
              cssClass="w-[232px] h-[38px]"
              onChangeFunction={(value) =>
                handleProjectDataChange('unitCount', value)
              }
              isRequired={false}
            />
          </div>

          <div className="mt-3">
            <label className="text-headingColor">
              {stepTwoText.plotAreaRange}
            </label>
            <div className=" flex gap-10">
              <MDLabelAndInput
                inputState={
                  projectData?.plotAreaLength
                    ? projectData?.plotAreaLength
                    : unitDetail?.plotAreaLength
                }
                cssClass="w-[280px] h-[38px]"
                dropdownArray={PROJECT_SIZE_UNIT}
                dropdownState={
                  projectData?.plotAreaLengthPerUnit
                    ? projectData?.plotAreaLengthPerUnit
                    : unitDetail?.plotAreaLengthPerUnit
                }
                dropdownClass=" border-1 border-headingColor"
                onChangeFunction={(value) => {
                  handleProjectDataChange('plotAreaLength', value)
                }}
                isRequired={false}
                onSelectFunction={(value) => {
                  setUnitDetail({
                    ...unitDetail,
                    ['plotAreaLengthPerUnit']: value,
                  })
                  setProjectData((prevstate) => ({
                    ...prevstate,
                    ['plotAreaLengthPerUnit']: value,
                  }))
                }}
              />
              <MDLabelAndInput
                inputState={
                  projectData?.plotAreaBreadth
                    ? projectData?.plotAreaBreadth
                    : unitDetail?.plotAreaBreadth
                }
                cssClass="w-[272px] h-[38px]"
                dropdownArray={PROJECT_SIZE_UNIT}
                dropdownState={
                  projectData?.plotAreaBreadthPerUnit
                    ? projectData?.plotAreaBreadthPerUnit
                    : unitDetail?.plotAreaBreadthPerUnit
                }
                dropdownClass=" border-1 border-headingColor"
                onChangeFunction={(value) => {
                  handleProjectDataChange('plotAreaBreadth', value)
                }}
                isRequired={false}
                onSelectFunction={(value) => {
                  setUnitDetail({
                    ...unitDetail,
                    ['plotAreaBreadthPerUnit']: value,
                  })
                  setProjectData((prevstate) => ({
                    ...prevstate,
                    ['plotAreaBreadthPerUnit']: value,
                  }))
                }}
              />
            </div>

            <div className="mt-3 w-fit">
              <label className="text-headingColor">
                {stepTwoText.plotPriceRange}
              </label>
              <div>
                <div className="flex gap-10">
                  <MDLabelAndInput
                    isInputNumber="true"
                    inputState={numberFormatter(
                      plotMinPrice > 0 ? plotMinPrice : ''
                    )}
                    cssClass="w-[280px] h-[38px]"
                    onChangeFunction={(value) => {
                      const rawValue = value.replace(/,/g, '')
                      handleProjectDataChange('plotMinPrice', rawValue)
                    }}
                    inputType="text"
                    onBlur={() =>
                      handleBlurProjectSize(
                        unitDetail?.plotMinPrice,
                        'plotMinPrice'
                      )
                    }
                    isRequired={false}
                  />
                  <MDLabelAndInput
                    isInputNumber="true"
                    inputState={numberFormatter(
                      plotMaxPrice > 0 ? plotMaxPrice : ''
                    )}
                    cssClass="w-[280px] h-[38px]"
                    onChangeFunction={(value) => {
                      const rawValue = value.replace(/,/g, '')
                      handleProjectDataChange('plotMaxPrice', rawValue)
                    }}
                    inputType="text"
                    onBlur={() =>
                      handleBlurProjectSize(
                        unitDetail?.plotMaxPrice,
                        'plotMaxPrice'
                      )
                    }
                    isRequired={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            {isLand &&
              renderButtons(
                postProjectForm[projectData?.projectType]?.[
                  projectData?.projectSubType
                ]?.projectUnits?.openSides,
                stepTwoText.selectNumberOfOpenSides,
                (category, value) => {
                  setUnitDetail({
                    ...unitDetail,
                    [category]: value,
                  })
                  setProjectData((prevstate) => ({
                    ...prevstate,
                    [category]: value,
                  }))
                },
                'openSides',
                false
              )}
          </div>
          <div className="my-3">
            {isLand &&
              renderButtons(
                postProjectForm[projectData?.projectType]?.[projectSubType]
                  ?.projectUnits?.boundaryWalls,
                stepTwoText.boundaryWallsMade,
                (category, value) => {
                  if (unitDetail?.[category] != value) {
                    setUnitDetail({
                      ...unitDetail,
                      [category]: value,
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      [category]: value,
                    }))
                  } else {
                    setUnitDetail({
                      ...unitDetail,
                      [category]: '',
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      [category]: '',
                    }))
                  }
                },
                'boundaryWalls',
                false
              )}
          </div>
          <div className="flex mt-4">
            {renderButtons(
              postProjectForm[projectType][projectSubType]?.projectUnits
                ?.bedroomCount,
              stepTwoText.numberOfBedroom,
              (category, value) => {
                const numValue =
                  value === '4+'
                    ? 4
                    : value === stepTwoText.studio
                      ? stepTwoText.studio
                      : Number(value)
                setUnitDetail({
                  ...unitDetail,
                  [category]: String(numValue),
                })
                setProjectData((prevstate) => ({
                  ...prevstate,
                  [category]: String(numValue),
                }))
              },
              'bedroomCount',
              false
            )}
            {Number(unitDetail?.bedroomCount) >= 4 && (
              <div className="flex items-center ml-2 mt-3">
                <button
                  className="px-[10px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bedroomCount || 4) - 1
                    setUnitDetail({
                      ...unitDetail,
                      bedroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bedroomCount: String(newValue),
                    }))
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  name="4"
                  className="w-[60px] border rounded-full h-[25px] text-center text-[13px] focus:outline-none focus:border-primary"
                  value={Number(unitDetail?.bedroomCount || 4)}
                  readOnly
                />
                <button
                  className="px-[9px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bedroomCount || 4) + 1
                    setUnitDetail({
                      ...unitDetail,
                      bedroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bedroomCount: String(newValue),
                    }))
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <div className="flex" ref={divRef}>
            {renderButtons(
              postProjectForm[projectType][projectSubType]?.projectUnits
                ?.bathroomCount,
              stepTwoText.numberOfBathroom,
              (category, value) => {
                const numValue =
                  value === '4+'
                    ? 4
                    : value === stepTwoText.shared
                      ? stepTwoText.shared
                      : Number(value)
                setUnitDetail({
                  ...unitDetail,
                  [category]: String(numValue),
                })
                setProjectData((prevstate) => ({
                  ...prevstate,
                  [category]: String(numValue),
                }))
              },
              'bathroomCount',
              false
            )}
            {Number(unitDetail?.bathroomCount) >= 4 && (
              <div className="flex items-center ml-2 mt-3">
                <button
                  className="px-[9px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bathroomCount || 4) - 1
                    setUnitDetail({
                      ...unitDetail,
                      bathroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bathroomCount: String(newValue),
                    }))
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  name="4"
                  className="w-[60px] border rounded-full h-[25px] text-center text-[13px] focus:outline-none focus:border-primary"
                  value={Number(unitDetail?.bathroomCount || 4)}
                  readOnly
                />
                <button
                  className="px-[9px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bathroomCount || 4) + 1
                    setUnitDetail({
                      ...unitDetail,
                      bathroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bathroomCount: String(newValue),
                    }))
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
          {(isShop || isBusiness) &&
            renderButtons(
              postProjectForm[projectData?.projectType]?.[
                projectData?.projectSubType
              ]?.furnishingStatus,
              stepTwoText.selectFurnishingStatus,
              (category, value) => {
                setUnitDetail({
                  ...unitDetail,
                  [category]: value,
                })
              },
              'furnishingStatus',
              false
            )}
          {(isShop || isBusiness) &&
            renderButtons(
              postProjectForm[projectType][projectSubType]?.projectUnits
                ?.washroomCount,
              stepTwoText.numberOfWashroom,
              (category, value) => {
                setUnitDetail({
                  ...unitDetail,
                  [category]: value,
                })
              },
              'washroomCount',
              false
            )}
          {(isShop || isBusiness || isLand) &&
            renderButtons(
              postProjectForm[projectData?.projectType]?.[
                projectData?.projectSubType
              ]?.projectUnits?.pantryArea,
              stepTwoText.selectPantryArea,
              (category, value) => {
                setUnitDetail({
                  ...unitDetail,
                  [category]: value,
                })
              },
              'pantryArea',
              false
            )}
        </>
      ) : (
        <div>
          <div className="flex mt-4">
            {renderButtons(
              postProjectForm[projectType][projectSubType]?.projectUnits
                ?.bedroomCount,
              stepTwoText.numberOfBedroom,
              (category, value) => {
                const numValue =
                  value === '4+'
                    ? 4
                    : value === stepTwoText.studio
                      ? stepTwoText.studio
                      : Number(value)
                setUnitDetail({
                  ...unitDetail,
                  [category]: String(numValue),
                })
                setProjectData((prevstate) => ({
                  ...prevstate,
                  [category]: String(numValue),
                }))
              },
              'bedroomCount',
              false
            )}
            {Number(unitDetail?.bedroomCount) >= 4 && (
              <div className="flex items-center ml-2 mt-3">
                <button
                  className="px-[10px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bedroomCount || 4) - 1
                    setUnitDetail({
                      ...unitDetail,
                      bedroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bedroomCount: String(newValue),
                    }))
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  name="4"
                  className="w-[60px] border rounded-full h-[25px] text-center text-[13px] focus:outline-none focus:border-primary"
                  value={Number(unitDetail?.bedroomCount || 4)}
                  readOnly
                />
                <button
                  className="px-[9px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bedroomCount || 4) + 1
                    setUnitDetail({
                      ...unitDetail,
                      bedroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bedroomCount: String(newValue),
                    }))
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
          <div className="flex" ref={divRef}>
            {renderButtons(
              postProjectForm[projectType][projectSubType]?.projectUnits
                ?.bathroomCount,
              stepTwoText.numberOfBathroom,
              (category, value) => {
                const numValue =
                  value === '4+'
                    ? 4
                    : value === stepTwoText.shared
                      ? stepTwoText.shared
                      : Number(value)
                setUnitDetail({
                  ...unitDetail,
                  [category]: String(numValue),
                })
                setProjectData((prevstate) => ({
                  ...prevstate,
                  [category]: String(numValue),
                }))
              },
              'bathroomCount',
              false
            )}
            {Number(unitDetail?.bathroomCount) >= 4 && (
              <div className="flex items-center ml-2 mt-3">
                <button
                  className="px-[9px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bathroomCount || 4) - 1
                    setUnitDetail({
                      ...unitDetail,
                      bathroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bathroomCount: String(newValue),
                    }))
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  name="4"
                  className="w-[60px] border rounded-full h-[25px] text-center text-[13px] focus:outline-none focus:border-primary"
                  value={Number(unitDetail?.bathroomCount || 4)}
                  readOnly
                />
                <button
                  className="px-[9px] text-[20px] rounded-full bg-primary text-white"
                  onClick={() => {
                    const newValue = Number(unitDetail?.bathroomCount || 4) + 1
                    setUnitDetail({
                      ...unitDetail,
                      bathroomCount: String(newValue),
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      bathroomCount: String(newValue),
                    }))
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
          {!isLand && ((!isShop && !isBusiness) || isIndustrialLand) && (
            <div className="my-2 ">
              <p className="mb-2 text-[1rem]">
                {stepTwoText.selectDedicatedRooms}
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(dedicatedRoomsState).map((room) => (
                  <button
                    key={room}
                    className={`px-3 py-[5px] rounded-full border-2 border-primary text-sm ${dedicatedRoomsState[room] ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                    onClick={() => {
                      const newState = { ...dedicatedRoomsState }
                      if (room === stepTwoText.others) {
                        newState[room] = !newState[room]
                        if (!newState[room]) {
                          setOtherDedicatedRoomValue('')
                        }
                      } else {
                        newState[room] = !newState[room]
                      }
                      setDedicatedRoomsState(newState)
                      const selectedRooms = Object.keys(newState).filter(
                        (key) => newState[key]
                      )
                      const updatedRooms = [...selectedRooms]
                      if (
                        newState[stepTwoText.others] &&
                        otherDedicatedRoomValue
                      ) {
                        const othersIndex = updatedRooms.indexOf(
                          stepTwoText.others
                        )
                        if (othersIndex !== -1) {
                          updatedRooms.splice(othersIndex, 1)
                        }
                        updatedRooms.push(otherDedicatedRoomValue)
                      }
                      setUnitDetail({
                        ...unitDetail,
                        dedicatedRoom: updatedRooms,
                      })
                      setProjectData((prevstate) => ({
                        ...prevstate,
                        dedicatedRoom: updatedRooms,
                      }))
                    }}
                  >
                    {room}
                  </button>
                ))}
              </div>
              {dedicatedRoomsState[stepTwoText.others] && (
                <MDLabelAndInput
                  label={stepTwoText.enterDedicatedRoom}
                  inputState={otherDedicatedRoomValue}
                  cssClass="w-[280px] h-[38px] mt-3"
                  isRequired={false}
                  onChangeFunction={(value) => {
                    setOtherDedicatedRoomValue(value)
                    const selectedRooms = Object.keys(
                      dedicatedRoomsState
                    ).filter((key) => dedicatedRoomsState[key])
                    const updatedRooms = [...selectedRooms]
                    const othersIndex = updatedRooms.indexOf(stepTwoText.others)
                    if (othersIndex !== -1) {
                      updatedRooms.splice(othersIndex, 1)
                    }
                    if (value) {
                      updatedRooms.push(value)
                    }
                    setUnitDetail({
                      ...unitDetail,
                      dedicatedRoom: updatedRooms,
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      dedicatedRoom: updatedRooms,
                    }))
                  }}
                />
              )}
            </div>
          )}
          {(isShop || isBusiness) &&
            renderButtons(
              postProjectForm[projectData?.projectType]?.[
                projectData?.projectSubType
              ]?.furnishingStatus,
              stepTwoText.selectFurnishingStatus,
              (category, value) => {
                setUnitDetail({
                  ...unitDetail,
                  [category]: value,
                })
              },
              'furnishingStatus',
              false
            )}
          {(isShop || isBusiness) &&
            renderButtons(
              postProjectForm[projectType][projectSubType]?.projectUnits
                ?.washroomCount,
              stepTwoText.numberOfWashroom,
              (category, value) => {
                setUnitDetail({
                  ...unitDetail,
                  [category]: value,
                })
              },
              'washroomCount',
              false
            )}
          {(isShop || isBusiness || isLand) &&
            renderButtons(
              postProjectForm[projectData?.projectType]?.[
                projectData?.projectSubType
              ]?.projectUnits?.pantryArea,
              stepTwoText.selectPantryArea,
              (category, value) => {
                setUnitDetail({
                  ...unitDetail,
                  [category]: value,
                })
              },
              'pantryArea',
              false
            )}
          <div>
            {isLand &&
              renderButtons(
                postProjectForm[projectData?.projectType]?.[
                  projectData?.projectSubType
                ]?.projectUnits?.openSides,
                stepTwoText.selectNumberOfOpenSides,
                (category, value) => {
                  setUnitDetail({
                    ...unitDetail,
                    [category]: value,
                  })
                  setProjectData((prevstate) => ({
                    ...prevstate,
                    [category]: value,
                  }))
                },
                'openSides',
                false
              )}
          </div>
          <div className="my-2  flex gap-x-9 gap-y-2  flex-wrap ">
            {isLand && (
              <MDLabelAndInput
                label={stepTwoText.lengthOfRoadFacingPlots}
                labelClass="text-headingColor"
                inputState={
                  projectData?.roadFacingPlotLength
                    ? projectData?.roadFacingPlotLength
                    : unitDetail?.roadFacingPlotLength
                }
                cssClass="w-[280px] h-[38px]"
                dropdownArray={PROJECT_SIZE_UNIT}
                dropdownState={
                  projectData?.roadFacingPlotLengthPerUnit
                    ? projectData?.roadFacingPlotLengthPerUnit
                    : unitDetail?.roadFacingPlotLengthPerUnit
                }
                dropdownClass=" border-1 border-headingColor"
                onChangeFunction={(value) => {
                  handleProjectDataChange('roadFacingPlotLength', value)
                }}
                isRequired={false}
                onSelectFunction={(value) => {
                  setUnitDetail({
                    ...unitDetail,
                    ['roadFacingPlotLengthPerUnit']: value,
                  })
                  setProjectData((prevstate) => ({
                    ...prevstate,
                    ['roadFacingPlotLengthPerUnit']: value,
                  }))
                }}
              />
            )}
            {isLand && (
              <MDLabelAndInput
                label={stepTwoText.breadthOfRoadFacingPlots}
                labelClass="text-headingColor"
                inputState={
                  projectData?.roadFacingPlotBreadth
                    ? projectData?.roadFacingPlotBreadth
                    : unitDetail?.roadFacingPlotBreadth
                }
                cssClass="w-[272px] h-[38px]"
                dropdownArray={PROJECT_SIZE_UNIT}
                dropdownState={
                  projectData?.roadFacingPlotBreadthPerUnit
                    ? projectData?.roadFacingPlotBreadthPerUnit
                    : unitDetail?.roadFacingPlotBreadthPerUnit
                }
                dropdownClass=" border-1 border-headingColor"
                onChangeFunction={(value) => {
                  handleProjectDataChange('roadFacingPlotBreadth', value)
                }}
                isRequired={false}
                onSelectFunction={(value) => {
                  setUnitDetail({
                    ...unitDetail,
                    ['roadFacingPlotBreadthPerUnit']: value,
                  })
                  setProjectData((prevstate) => ({
                    ...prevstate,
                    ['roadFacingPlotBreadthPerUnit']: value,
                  }))
                }}
              />
            )}
            {isLand && (
              <MDLabelAndInput
                label={'Height'}
                labelClass="text-headingColor"
                inputState={
                  projectData?.plotHeight
                    ? projectData?.plotHeight
                    : unitDetail?.plotHeight
                }
                cssClass="w-[272px] h-[38px]"
                dropdownArray={PROJECT_SIZE_UNIT}
                dropdownState={
                  projectData?.plotHeightPerUnit
                    ? projectData?.plotHeightPerUnit
                    : unitDetail?.plotHeightPerUnit
                }
                dropdownClass=" border-1 border-headingColor"
                onChangeFunction={(value) => {
                  handleProjectDataChange('plotHeight', value)
                }}
                isRequired={false}
                onSelectFunction={(value) => {
                  setUnitDetail({
                    ...unitDetail,
                    ['plotHeightPerUnit']: value,
                  })
                  setProjectData((prevstate) => ({
                    ...prevstate,
                    ['plotHeightPerUnit']: value,
                  }))
                }}
              />
            )}
          </div>
          <div className="my-3">
            {isLand &&
              renderButtons(
                postProjectForm[projectData?.projectType]?.[projectSubType]
                  ?.projectUnits?.boundaryWalls,
                stepTwoText.boundaryWallsMade,
                (category, value) => {
                  if (unitDetail?.[category] != value) {
                    setUnitDetail({
                      ...unitDetail,
                      [category]: value,
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      [category]: value,
                    }))
                  } else {
                    setUnitDetail({
                      ...unitDetail,
                      [category]: '',
                    })
                    setProjectData((prevstate) => ({
                      ...prevstate,
                      [category]: '',
                    }))
                  }
                },
                'boundaryWalls',
                false
              )}
          </div>
          <div className="flex xl:w-fit flex-wrap pb-6 gap-y-4 ">
            <div className="mb-4 mt-3 mr-9">
              <MDLabelAndInput
                label={stepTwoText.unitTitle}
                labelClass="text-headingColor"
                inputState={
                  projectData?.unitTitle
                    ? projectData?.unitTitle
                    : unitDetail?.unitTitle
                }
                cssClass="w-[232px] h-[38px]"
                tooltipText={stepTwoText.unitTitleTooltip}
                onChangeFunction={(value) =>
                  handleProjectDataChange('unitTitle', value)
                }
              />
            </div>
            <div className="mt-3 mr-9">
              <MDLabelAndInput
                label={stepTwoText.numberOfUnits}
                labelClass="text-headingColor"
                isInputNumber="true"
                maxLengthInput="4"
                inputState={
                  projectData?.unitCount
                    ? projectData?.unitCount
                    : unitDetail?.unitCount
                }
                cssClass="w-[232px] h-[38px]"
                // tooltipText={stepTwoText.numberOfUnitsTooltip}
                onChangeFunction={(value) =>
                  handleProjectDataChange('unitCount', value)
                }
                isRequired={false}
              />
            </div>
            <div className="mt-3 flex gap-5">
              <div>
                <div className="flex justify-between items-center gap-4">
                  {activeInput ||
                  unitDetail?.primaryArea?.pricePerUnit ||
                  unitDetail?.secondaryArea?.pricePerUnit ||
                  unitDetail?.tertiaryArea?.pricePerUnit ? (
                    <p>{stepTwoText.sellPrice}</p>
                  ) : (
                    <p>{stepTwoText.basicSellPrice}</p>
                  )}

                  {!activeInput && (
                    <div className=" text-sm">
                      {(() => {
                        const formattedValue = formatNumberWithUnit(
                          formattedSalesPrice ||
                            unitDetail?.salePrice ||
                            projectData?.salePrice
                        )
                        return formattedValue !== 'NaN' &&
                          parseFloat(formattedValue) > 0 &&
                          unitDetail?.salePrice
                          ? formattedValue
                          : ''
                      })()}
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center gap-10 ">
                  {projectData?.activeInput || unitDetail?.activeInput ? (
                    <div>
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                          <MDLabelAndInput
                            isInputNumber="true"
                            inputState={numberFormatter(
                              formattedMinPrice > 0 ? formattedMinPrice : ''
                            )}
                            cssClass="!w-[107px] h-[38px] text-right"
                            onChangeFunction={(value) => {
                              const rawValue = value.replace(/,/g, '')
                              handleProjectDataChange('minPrice', rawValue)
                            }}
                            inputType="text"
                            onBlur={() =>
                              handleBlurProjectSize(
                                unitDetail?.minPrice,
                                'minPrice'
                              )
                            }
                            isRequired={false}
                          />

                          {activeInput && (
                            <div className="text-sm text-right">
                              {(() => {
                                const formattedValue = formatNumberWithUnit(
                                  formattedMinPrice ||
                                    unitDetail?.minPrice ||
                                    projectData?.minPrice
                                )
                                return formattedValue !== 'NaN' &&
                                  parseFloat(formattedValue) > 0 &&
                                  unitDetail?.minPrice
                                  ? formattedValue
                                  : ''
                              })()}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <MDLabelAndInput
                            isInputNumber="true"
                            inputState={numberFormatter(
                              formattedMaxPrice > 0 ? formattedMaxPrice : ''
                            )}
                            cssClass="!w-[107px] h-[38px] text-right"
                            onChangeFunction={(value) => {
                              const rawValue = value.replace(/,/g, '')
                              handleProjectDataChange('maxPrice', rawValue)
                            }}
                            inputType="text"
                            onBlur={() =>
                              handleBlurProjectSize(
                                unitDetail?.maxPrice,
                                'maxPrice'
                              )
                            }
                            isRequired={false}
                          />

                          {activeInput && (
                            <div className="text-sm text-right">
                              {(() => {
                                const formattedValue = formatNumberWithUnit(
                                  formattedMaxPrice ||
                                    unitDetail?.maxPrice ||
                                    projectData?.maxPrice
                                )
                                return formattedValue !== 'NaN' &&
                                  parseFloat(formattedValue) > 0 &&
                                  unitDetail?.maxPrice
                                  ? formattedValue
                                  : ''
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <MDLabelAndInput
                      isInputNumber="true"
                      inputState={numberFormatter(
                        formattedSalesPrice > 0 ? formattedSalesPrice : ''
                      )}
                      cssClass="w-[230px] h-[38px]"
                      onChangeFunction={(value) => {
                        const rawValue = value.replace(/,/g, '')
                        handleProjectDataChange('salePrice', rawValue)
                      }}
                      inputType="text"
                      onBlur={() =>
                        handleBlurProjectSize(
                          unitDetail?.salePrice,
                          'salePrice'
                        )
                      }
                      isRequired={false}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label className="text-headingColor">
                  {stepTwoText.priceRange}
                </label>
                <div
                  className={`w-10 h-6 rounded-full cursor-pointer transition-colors duration-300 flex items-center my-2 relative ${projectData?.activeInput || unitDetail?.activeInput ? 'bg-secondary' : 'bg-gray-200'}`}
                  onClick={() => {
                    const newActiveInput = !(
                      projectData?.activeInput || unitDetail?.activeInput
                    )
                    setProjectData((prev) => ({
                      ...prev,
                      activeInput: newActiveInput,
                      ...(newActiveInput
                        ? { salePrice: '' }
                        : { minPrice: '', maxPrice: '' }),
                    }))
                    setActiveInput(newActiveInput)
                    setPricePerUnitBulitUpArea('')
                    setPricePerUnitCarpetArea('')
                    setPricePerUnitSuperBulitUpArea('')
                    setPricePerReraUnitCarpetArea('')
                    setUnitDetail((prev) => ({
                      ...prev,
                      activeInput: newActiveInput,
                      ...(newActiveInput
                        ? { salePrice: '' }
                        : { minPrice: '', maxPrice: '' }),
                    }))
                  }}
                >
                  <div
                    className={`w-4 h-4 bg-primary rounded-full shadow-md absolute transform transition-transform duration-300 ${projectData?.activeInput || unitDetail?.activeInput ? 'translate-x-5' : 'translate-x-1'}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col gap-10">
            <div className="flex">
              <div className="mr-14">
                <MDLabelAndInput
                  label={
                    isLand
                      ? stepTwoText.unitSizePlotArea
                      : stepTwoText.unitSizeCarpetArea
                  }
                  labelClass="text-headingColor"
                  isInputNumber="true"
                  maxLengthInput="5"
                  inputState={
                    projectData?.primaryArea?.areaSize ||
                    unitDetail?.primaryArea?.areaSize
                  }
                  dropdownArray={PROJECT_SIZE_UNIT}
                  dropdownState={
                    projectData?.primaryArea?.areaUnit ||
                    unitDetail?.primaryArea?.areaUnit
                  }
                  cssClass="w-[280px] h-[38px]"
                  tooltipText={stepTwoText.sizeOfIndividualUnit}
                  onChangeFunction={(value) =>
                    handleProjectAreaChange('areaSize', value, 'primaryArea')
                  }
                  onSelectFunction={(value) =>
                    handleProjectAreaChange('areaUnit', value, 'primaryArea')
                  }
                  isRequired={false}
                />
              </div>

              <div className="flex flex-col ">
                <div className="flex justify-between items-center">
                  <div>
                    <label className={`mt-1 text-headingColor`}>
                      {stepTwoText.price}
                    </label>
                    {/* <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span> */}
                  </div>
                  <div>
                    {(() => {
                      const formattedValue = formatNumberWithUnit(
                        pricePerUnitCarpetArea ||
                          unitDetail?.primaryArea?.pricePerUnit ||
                          projectData?.primaryArea?.pricePerUnit
                      )
                      return formattedValue !== 'NaN' &&
                        parseFloat(formattedValue) > 0 &&
                        unitDetail?.primaryArea?.areaSize
                        ? formattedValue
                        : ''
                    })()}
                  </div>
                </div>
                <div>
                  <MDLabelAndInput
                    labelClass="text-headingColor"
                    inputState={
                      !(projectData?.activeInput || unitDetail?.activeInput) &&
                      unitDetail?.salePrice &&
                      unitDetail.primaryArea.areaSize
                        ? pricePerUnitCarpetArea
                        : projectData?.primaryArea?.pricePerUnit ||
                          unitDetail?.primaryArea?.pricePerUnit
                    }
                    cssClass={`w-[250px] h-[38px]  ${!(projectData?.activeInput || unitDetail?.activeInput) && 'cursor-not-allowed'}`}
                    onChangeFunction={(value) => {
                      (projectData?.activeInput || unitDetail?.activeInput) &&
                        handleProjectAreaChange(
                          'pricePerUnit',
                          value,
                          'primaryArea'
                        )
                    }}
                    isRequired={false}
                    isdisabled={
                      !(projectData?.activeInput || unitDetail?.activeInput)
                    }
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  handleProjectAreaChange(
                    'displayUnitSize',
                    !unitDetail?.primaryArea?.displayUnitSize,
                    'primaryArea'
                  )
                }}
                className={`ml-16 mt-8 w-4 h-4 rounded-full border-2 border-primary cursor-pointer flex items-center justify-center ${unitDetail?.primaryArea?.displayUnitSize ? 'bg-white' : 'bg-white'}`}
              >
                {unitDetail?.primaryArea?.displayUnitSize && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
            </div>
            {!isLand && (
              <div>
                <div className="flex mt-10">
                  <div className="mr-14">
                    <MDLabelAndInput
                      label={stepTwoText.unitSizeBuiltUpArea}
                      labelClass="text-headingColor"
                      isInputNumber="true"
                      maxLengthInput="5"
                      inputState={
                        projectData?.secondaryArea?.areaSize ||
                        unitDetail?.secondaryArea?.areaSize
                      }
                      dropdownArray={PROJECT_SIZE_UNIT}
                      dropdownState={
                        projectData?.secondaryArea?.areaUnit ||
                        unitDetail?.secondaryArea?.areaUnit
                      }
                      cssClass="w-[280px] h-[38px]"
                      tooltipText={stepTwoText.sizeOfIndividualUnit}
                      onChangeFunction={(value) =>
                        handleProjectAreaChange(
                          'areaSize',
                          value,
                          'secondaryArea'
                        )
                      }
                      isRequired={false}
                      onSelectFunction={(value) =>
                        handleProjectAreaChange(
                          'areaUnit',
                          value,
                          'secondaryArea'
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className={`mt-1 text-headingColor`}>
                          {stepTwoText.price}
                        </label>
                        {/* <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span> */}
                      </div>

                      <div>
                        {(() => {
                          const formattedValue = formatNumberWithUnit(
                            pricePerUnitBulitUpArea ||
                              unitDetail?.secondaryArea?.pricePerUnit ||
                              projectData?.secondaryArea?.pricePerUnit
                          )
                          return formattedValue !== 'NaN' &&
                            parseFloat(formattedValue) > 0 &&
                            unitDetail?.secondaryArea?.areaSize
                            ? formattedValue
                            : ''
                        })()}
                      </div>
                    </div>
                    <div>
                      <MDLabelAndInput
                        labelClass="text-headingColor"
                        inputState={
                          !(
                            projectData?.activeInput || unitDetail?.activeInput
                          ) &&
                          unitDetail?.salePrice &&
                          unitDetail.secondaryArea.areaSize
                            ? pricePerUnitBulitUpArea
                            : projectData?.secondaryArea?.pricePerUnit ||
                              unitDetail?.secondaryArea?.pricePerUnit
                        }
                        cssClass={`w-[250px] h-[38px]  ${!(projectData?.activeInput || unitDetail?.activeInput) && 'cursor-not-allowed'}`}
                        onChangeFunction={(value) => {
                          (projectData?.activeInput ||
                            unitDetail?.activeInput) &&
                            handleProjectAreaChange(
                              'pricePerUnit',
                              value,
                              'secondaryArea'
                            )
                        }}
                        isRequired={false}
                        isdisabled={
                          !(projectData?.activeInput || unitDetail?.activeInput)
                        }
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      handleProjectAreaChange(
                        'displayUnitSize',
                        !unitDetail?.secondaryArea?.displayUnitSize,
                        'secondaryArea'
                      )
                    }}
                    className={`ml-16 mt-9 w-4 h-4  rounded-full border-2 border-primary cursor-pointer flex items-center justify-center ${unitDetail?.secondaryArea?.displayUnitSize ? 'bg-white' : 'bg-white'}`}
                  >
                    {unitDetail?.secondaryArea?.displayUnitSize && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
                <div className="flex mt-10">
                  <div className="flex">
                    <div className="mr-14">
                      <MDLabelAndInput
                        label={stepTwoText.unitSizeSuperBuiltUpArea}
                        labelClass="text-headingColor"
                        isInputNumber="true"
                        maxLengthInput="5"
                        inputState={
                          projectData?.tertiaryArea?.areaSize ||
                          unitDetail?.tertiaryArea?.areaSize
                        }
                        dropdownArray={PROJECT_SIZE_UNIT}
                        dropdownState={
                          projectData?.tertiaryArea?.areaUnit ||
                          unitDetail?.tertiaryArea?.areaUnit
                        }
                        cssClass=" w-[280px] h-[38px]"
                        tooltipText={stepTwoText.sizeOfIndividualUnit}
                        onChangeFunction={(value) =>
                          handleProjectAreaChange(
                            'areaSize',
                            value,
                            'tertiaryArea'
                          )
                        }
                        onSelectFunction={(value) =>
                          handleProjectAreaChange(
                            'areaUnit',
                            value,
                            'tertiaryArea'
                          )
                        }
                        isRequired={false}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex justify-between items-center">
                        <div>
                          <label className={`mt-1 text-headingColor`}>
                            {stepTwoText.price}
                          </label>
                          {/* <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span> */}
                        </div>

                        <div>
                          {(() => {
                            const formattedValue = formatNumberWithUnit(
                              pricePerUnitSuperBulitUpArea ||
                                unitDetail?.tertiaryArea?.pricePerUnit ||
                                projectData?.tertiaryArea?.pricePerUnit
                            )
                            return formattedValue !== 'NaN' &&
                              parseFloat(formattedValue) > 0 &&
                              unitDetail?.tertiaryArea?.areaSize
                              ? formattedValue
                              : ''
                          })()}
                        </div>
                      </div>
                      <div>
                        <MDLabelAndInput
                          labelClass="text-headingColor"
                          inputState={
                            !(
                              projectData?.activeInput ||
                              unitDetail?.activeInput
                            ) &&
                            unitDetail?.salePrice &&
                            unitDetail.tertiaryArea.areaSize
                              ? pricePerUnitSuperBulitUpArea
                              : projectData?.tertiaryArea?.pricePerUnit ||
                                unitDetail?.tertiaryArea?.pricePerUnit
                          }
                          cssClass={`w-[250px] h-[38px]  ${!(projectData?.activeInput || unitDetail?.activeInput) && 'cursor-not-allowed'} `}
                          onChangeFunction={(value) => {
                            (projectData?.activeInput ||
                              unitDetail?.activeInput) &&
                              handleProjectAreaChange(
                                'pricePerUnit',
                                value,
                                'tertiaryArea'
                              )
                          }}
                          isRequired={false}
                          isdisabled={
                            !(
                              projectData?.activeInput ||
                              unitDetail?.activeInput
                            )
                          }
                        />
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        handleProjectAreaChange(
                          'displayUnitSize',
                          !unitDetail?.tertiaryArea?.displayUnitSize,
                          'tertiaryArea'
                        )
                      }}
                      className={`ml-16 mt-9 w-4 h-4 rounded-full border-2 border-primary cursor-pointer flex items-center justify-center ${unitDetail?.tertiaryArea?.displayUnitSize ? 'bg-white' : 'bg-white'}`}
                    >
                      {unitDetail?.tertiaryArea?.displayUnitSize && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isLand && (
              <div className="flex mt-10">
                <div className="mr-14">
                  <MDLabelAndInput
                    label={stepTwoText.reraCarpetArea}
                    labelClass="text-headingColor"
                    isInputNumber="true"
                    maxLengthInput="5"
                    inputState={
                      projectData?.reraArea?.reraCarpetArea ||
                      unitDetail?.reraArea?.reraCarpetArea
                    }
                    dropdownArray={PROJECT_SIZE_UNIT}
                    dropdownState={
                      projectData?.reraArea?.reraCarpetAreaUnit ||
                      unitDetail?.reraArea?.reraCarpetAreaUnit
                    }
                    cssClass=" w-[280px] h-[38px]"
                    tooltipText={stepTwoText.sizeOfIndividualUnit}
                    onChangeFunction={(value) =>
                      handleProjectAreaChange(
                        'reraCarpetArea',
                        value,
                        'reraArea'
                      )
                    }
                    onSelectFunction={(value) =>
                      handleProjectAreaChange(
                        'reraCarpetAreaUnit',
                        value,
                        'reraArea'
                      )
                    }
                    isRequired={false}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <div>
                      <label className={`mt-1 text-headingColor`}>
                        {stepTwoText.price}
                      </label>
                      {/* <span className="text-red-500 ml-1 mt-1">{symbols.asterisk}</span> */}
                    </div>

                    <div>
                      {(() => {
                        const formattedValue = formatNumberWithUnit(
                          pricePerReraUnitCarpetArea ||
                            unitDetail?.reraArea?.reraCarpetAreaPricePerUnit ||
                            projectData?.reraArea?.reraCarpetAreaPricePerUnit
                        )
                        return formattedValue !== 'NaN' &&
                          parseFloat(formattedValue) > 0 &&
                          unitDetail?.reraArea?.reraCarpetArea
                          ? formattedValue
                          : ''
                      })()}
                    </div>
                  </div>
                  <div>
                    <MDLabelAndInput
                      labelClass="text-headingColor"
                      inputState={
                        !(
                          projectData?.activeInput || unitDetail?.activeInput
                        ) &&
                        unitDetail?.salePrice &&
                        unitDetail.reraArea.reraCarpetArea
                          ? pricePerReraUnitCarpetArea
                          : projectData?.reraArea?.reraCarpetAreaPricePerUnit ||
                            unitDetail?.reraArea?.reraCarpetAreaPricePerUnit
                      }
                      cssClass={`w-[250px] h-[38px]  ${!(projectData?.activeInput || unitDetail?.activeInput) && 'cursor-not-allowed'} `}
                      onChangeFunction={(value) => {
                        (projectData?.activeInput ||
                          unitDetail?.activeInput) &&
                          handleProjectAreaChange(
                            'reraCarpetAreaPricePerUnit',
                            value,
                            'reraArea'
                          )
                      }}
                      isRequired={false}
                      isdisabled={
                        !(projectData?.activeInput || unitDetail?.activeInput)
                      }
                    />
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => {
                      handleProjectAreaChange(
                        'displayReraCarpetArea',
                        !unitDetail?.reraArea?.displayReraCarpetArea,
                        'reraArea'
                      )
                    }}
                    className={`ml-16 mt-8 w-4 h-4 rounded-full border-2 border-primary cursor-pointer flex items-center justify-center  ${unitDetail?.reraArea?.displayReraCarpetArea ? 'bg-white' : 'bg-white'}`}
                  >
                    {unitDetail?.reraArea?.displayReraCarpetArea && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`w-[260px] h-[100px] mt-6`}>
        <h5 className="mb-1 flex text-headingColor">
          {stepTwoText.uploadUnitFoorPlan}
          <div className="pt-1">
            <TooltipComponent tooltipText={stepTwoText.uploadUnitFoorPlan} />{' '}
          </div>
        </h5>
        <ImageUploader
          onFileSelect={handlePhotoSelect}
          photoURLs={imageUrl}
          deletePhoto={deletePhoto}
          onlyButton="true"
          upload={upload}
          key={imageKey}
          setUpload={setUpload}
        />
      </div>
      <button
        className="bg-primary text-white tracking-wide py-2 px-5 rounded-md mt-2"
        onClick={handleAddUnitButton}
      >
        {editingTemp.active ? stepTwoText.updateUnit : stepTwoText.addUnit}
      </button>
      <div className="mt-10">
        {unitList.length > 0 && (
          <FloorPlanPricing
            projectUnits={unitList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleClick={handleClick}
            handlePrepopulate={handlePrepopulate}
            activeInput={activeInput}
            isplotRange={isplotRange}
            isShowEdit={isProjectEdit}
          />
        )}
      </div>
    </div>
  )
}
