import React, { useState } from 'react'
import Image from 'next/image'
import { getLogger } from '@/helper/logger'
import {
  COMPONENTS,
  GLOBALLY_COMMON_TEXT,
  SINGLE_PROPERTY_VIEW_TEXT,
} from '@/textV2'
import {
  formatNumberWithUnitExtended,
  numberFormatter,
} from '@/utils/utils'

import cross from '../../assets/ButtonIcons/cross.svg'
import { postPropertyMap } from '../../content/JSON/PostPropertyMap'
import MDLabelAndInput from '../MDLabelAndInput'
import TooltipComponent from '../Tooltip'
import RadioButtonGroup from './RadioButtonGroup'

const { stepThreeText } = COMPONENTS.POST_PROPERTY_COMPO
const {
  text,
  AreaTypesArray,
  units,
  propertyTypes,
  propertySizeUnits,
  propertySubTypeMap,
} = GLOBALLY_COMMON_TEXT
const { possesionDateText, areaTypeText } =
  SINGLE_PROPERTY_VIEW_TEXT.propertyInformationComponent

export default function NewStep3({
  DATA,
  setDATA,
  declarationTwo,
  declarationOne,
  setDeclarationTwo,
  setDeclarationOne,
  anyConstructionDone,
  setAnyConstructionDone,
}) {
  const [roomUploads, setRoomUploads] = useState({})
  const logger = getLogger()
  const [isAvailableAreaType, setIsAvailableAreaType] = useState(true)
  const [constructedRooms, setConstructedRooms] = useState(
    DATA?.constructedRooms || []
  )
  const [dedicatedRooms, setDedicatedRooms] = useState(
    DATA?.dedicatedRooms || []
  )
  const [view, setView] = useState(DATA?.view || [])
  const lengthUnits = ['Feet', 'Meter', 'Yard', 'Inch']

  const updatePropertyData = (key, value) => {
    setDATA((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const recalculatePricePerUnit = (newPrice) => {
    setDATA((prevDATA) => {
      const salePriceValue = parseFloat(
        (typeof newPrice === 'string'
          ? newPrice.replace(/\D/g, '')
          : newPrice) || 0
      )

      const updatedPricePerUnitMap = {}

      prevDATA?.areaDetail?.forEach((item, index) => {
        const perUnitPrice =
          item?.propertySize > 0 ? salePriceValue / item?.propertySize : 0
        updatedPricePerUnitMap[index] = parseFloat(perUnitPrice.toFixed(2))
      })

      return {
        ...prevDATA,
        pricePerUnitMap: updatedPricePerUnitMap,
      }
    })
  }
  const handleNumberChange = (key, formattedValue) => {
    const rawValue = formattedValue.replace(/,/g, '')
    if (!isNaN(rawValue)) {
      updatePropertyData(key, rawValue)
    }
    if (key === 'salePrice') {
      recalculatePricePerUnit(rawValue)
    }
  }
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

  const renderInputFields = (label, name, type, required, index) => {
    const selectedValues = DATA?.salePriceOptions || []

    const toggleSelection = (option) => {
      const updatedSelections = selectedValues.includes(option)
        ? selectedValues.filter((item) => item !== option)
        : [...selectedValues, option]
      updatePropertyData('salePriceOptions', updatedSelections)
    }

    const getFloorOptions = () => {
      const totalFloors = parseInt(DATA?.totalFloors) || 0
      const floors = [
        { label: 'Lower Basement', value: -3 },
        { label: 'Basement', value: -2 },
        { label: 'Upper Basement', value: -1 },
        { label: 'Lower Ground Floor', value: -0.5 },
        { label: 'Ground', value: 0 },
        { label: 'Upper Ground Floor', value: 0.5 },
      ]
      for (let i = 1; i <= Math.min(totalFloors, 160); i++) {
        floors.push({ label: i.toString(), value: i })
      }
      return floors
    }

    const handleTotalFloorsChange = (e) => {
      const value = Math.min(parseInt(e.target.value) || 0, 160)
      updatePropertyData(name, value.toString())
    }

    return (
      <div className="flex flex-col p-1 gap-y-1" key={index}>
        <label className="flex">
          {label}
          {required && <span className="text-red-500 ml-[2px]">*</span>}
        </label>

        {type === 'month' ? (
          <div>
            <input
              type="month"
              value={
                DATA[name] ? new Date(DATA[name]).toISOString().slice(0, 7) : ''
              }
              min="1990-01"
              max="2023-12"
              onChange={(e) => {
                setDATA({
                  ...DATA,
                  [name]: e.target.value
                    ? new Date(e.target.value).toISOString()
                    : '',
                })
              }}
              className="border border-gray-500 rounded-md px-2 py-2 h-[30px] w-[180px]"
            />
          </div>
        ) : name === 'totalFloors' ? (
          <input
            type="number"
            onChange={handleTotalFloorsChange}
            value={DATA?.[name] || ''}
            className="border border-gray-500 rounded-md p-2 h-[29px] w-[200px]"
            min="0"
            max="160"
          />
        ) : name === 'floorNumber' ? (
          <select
            value={DATA?.[name] || ''}
            onChange={(e) => updatePropertyData(name, e.target.value)}
            className="border border-gray-500 rounded-md h-[29px] w-[200px]"
          >
            <option value="" disabled>
              Select Floor
            </option>
            {getFloorOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={
              type === 'number' && label === 'Unit Number' ? 'number' : 'text'
            }
            onChange={(e) => {
              if (type === 'number' && label !== 'Unit Number') {
                handleNumberChange(name, e.target.value)
              } else {
                updatePropertyData(name, e.target.value)
              }
            }}
            value={
              DATA?.[name]
                ? type === 'number' && label !== 'Unit Number'
                  ? numberFormatter(DATA?.[name])
                  : DATA?.[name]
                : ''
            }
            className="border border-gray-500 rounded-md p-2 h-[29px] w-[200px]"
          />
        )}

        {(name === 'salePrice' || name === 'rentPrice') && (
          <div className="ml-1 flex items-center max-w-[180px]">
            {(() => {
              const formattedValue = formatNumberWithUnitExtended(
                DATA?.rentPrice || DATA?.salePrice
              )
              return (
                formattedValue !== 'NaN' &&
                parseFloat(formattedValue) > 0 && (
                  <p className="truncate text-ellipsis">{formattedValue}</p>
                )
              )
            })()}
          </div>
        )}

        {name === 'salePrice' && (
          <div>
            <label className="font-medium">Price Includes</label>
            {[
              { value: 'allInclusive', label: 'All Inclusive' },
              { value: 'negotiable', label: 'Negotiable' },
              { value: 'taxesExtra', label: 'Taxes and Govt. Charges' },
              { value: 'otherCharges', label: 'Other Charges' },
            ].map(({ value, label }) => (
              <div className="flex flex-row items-center gap-1 m-1" key={value}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleSelection(value)}
                  className="cursor-pointer"
                />
                <label className="text-sm">{label}</label>
              </div>
            ))}
          </div>
        )}

        {name === 'maintenanceAmount' && (
          <div>
            <RadioButtonGroup
              onValueChange={(value) =>
                updatePropertyData('maintenanceType', value)
              }
              value={DATA?.maintenanceType || ''}
            >
              {[
                { value: 'monthly', label: 'Monthly' },
                { value: 'annually', label: 'Annualy' },
                { value: 'oneTime', label: 'One Time' },
              ].map(({ value, label }) => (
                <div className="flex flex-row items-center" key={value}>
                  <input
                    type="radio"
                    name="maintenanceType"
                    value={value}
                    checked={DATA?.maintenanceType === value}
                    onChange={(e) =>
                      updatePropertyData('maintenanceType', e.target.value)
                    }
                    className="cursor-pointer"
                  />
                  <label className="text-sm">{label}</label>
                </div>
              ))}
            </RadioButtonGroup>
          </div>
        )}
      </div>
    )
  }

  const renderDimensionFields = (
    label,
    name,
    type,
    dateFormatterFunction,
    pickerOpenSetter,
    index
  ) => {
    const isLengthField = ['lengthOfPlot', 'breadthOfPlot', 'height'].includes(
      name
    )
    const showPicker = isLengthField
    return (
      <div className="flex flex-col gap-y-1 px-1" key={index}>
        <label className="font-medium">{label}</label>
        <div className="flex flex-row items-center">
          <input
            type="number"
            onChange={(e) => updatePropertyData(name, e.target.value)}
            value={DATA?.[name] || ''}
            className={`border border-gray-500 rounded-md p-2 w-[120px] h-[30px]`}
          />

          {/* Dropdown for selecting units */}
          {showPicker && (
            <div className="w-1/4">
              <select
                onChange={(e) =>
                  updatePropertyData(`${name}Unit`, e.target.value)
                }
                value={DATA?.[`${name}Unit`] || ''}
                className="border border-gray-500 rounded-md p-1 text-sm -ml-4 h-[30px] w-[100px] outline-none text-gray-600"
              >
                <option value="" disabled>
                  Select Unit
                </option>
                {(lengthUnits || []).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderButtons = (
    buttons,
    title,
    onPress,
    category,
    required = false
  ) => {
    if (!buttons || buttons.length === 0) {
      return null
    }
    return (
      <div>
        <div className="flex flex-row mb-1">
          <span className="font-medium text-base flex">
            {title}{' '}
            {title === 'Possession Status' && (
              <TooltipComponent tooltipText={'Possesion Status'} />
            )}{' '}
          </span>
          {required && <span className="text-red-500 ml-[2px]">*</span>}
        </div>
        <div className="flex flex-row gap-3 flex-wrap mb-2">
          {buttons.map((button) => {
            const isButtonActive = DATA[category] === button
            return (
              <button
                className={`flex flex-row items-center text-center justify-center px-4 py-1 rounded-full ${
                  isButtonActive
                    ? 'bg-primary  text-white'
                    : 'border border-newBackground  text-gray-600'
                }`}
                key={button}
                onClick={() => onPress(category, button)}
              >
                <span>{button}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const handleDedicatedRooms = (value) => {
    setDedicatedRooms((prev = []) => {
      let updatedData
      if (prev.includes(value)) {
        updatedData = prev.filter((item) => item !== value)
        setRoomUploads((prevUploads) => {
          const newUploads = { ...prevUploads }
          delete newUploads[value]
          return newUploads
        })
      } else {
        updatedData = [...prev, value]
      }

      setDATA((prevData) => ({
        ...prevData,
        dedicatedRooms: updatedData,
      }))
      return updatedData
    })
  }

  const renderArrayButtons = (
    buttons,
    title,
    onClick,
    category,
    file = false
  ) => {
    if (!buttons || buttons.length === 0) {
      return null
    }
    return (
      <div className="rounded-md ">
        <h4 className={`text-left`}>{title}</h4>
        <div className={`${!file && 'flex flex-wrap'} mb-3 gap-3`}>
          {buttons.map((button) => {
            const isButtonActive =
              Array.isArray(DATA[category]) && DATA[category].includes(button)
            return (
              <div
                className={`${file && 'flex justify-start mb-2 gap-2 flex-wrap'}`}
              >
                <button
                  className={`px-4 py-1 rounded-full ${isButtonActive ? 'bg-primary text-white' : 'bg-white text-gray-600'} border border-primary whitespace-nowrap`}
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
                {file && (
                  <div
                    className={`flex items-center max-w-[250px] ${isButtonActive ? 'ml-2' : ''}`}
                  >
                    {isButtonActive && (
                      <ImageUploader
                        onFileSelect={(files) =>
                          handlePhotoSelect(files, button)
                        }
                        photoURLs={propertyImages.filter(
                          (image) => image.name === button
                        )}
                        deletePhoto={deletePhoto}
                        onlyButton="true"
                        upload={roomUploads[button]}
                        key={imageKey}
                        setUpload={(uploadStatus) =>
                          setRoomUploads((prev) => ({
                            ...prev,
                            [button]: uploadStatus,
                          }))
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const handleView = (value) => {
    setView((prev = []) => {
      let updatedData
      if (prev.includes(value)) {
        updatedData = prev.filter((item) => item !== value)
        setRoomUploads((prevUploads) => {
          const newUploads = { ...prevUploads }
          delete newUploads[value]
          return newUploads
        })
      } else {
        updatedData = [...prev, value]
      }

      setDATA((prevData) => ({
        ...prevData,
        view: updatedData,
      }))
      return updatedData
    })
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

  const getFilteredAreaTypes = (index) => {
    const selectedAreaTypes = DATA?.areaDetail
      .filter((_, i) => i !== index)
      .map((item) => item.areaType)
    return AreaTypesArray.filter(
      (areaType) => !selectedAreaTypes.includes(areaType)
    )
  }

  const getLabelFromValue = (value) => {
    const unit = propertySizeUnits.find((unit) => unit.value === value)
    return unit ? unit.label : units.suqareFeets
  }

  const handlePricePerUnitChange = () => {}

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
        (typeof prevDATA?.salePrice === 'string'
          ? prevDATA?.salePrice?.replace(/\D/g, '')
          : prevDATA?.salePrice) || 0
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
            ...prevDATA?.areaDetail[0],
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

  const addAreaDetail = () => {
    setDATA((prevDATA) => {
      const updatedAreaDetail = Array.isArray(prevDATA?.areaDetail)
        ? [...prevDATA?.areaDetail]
        : []
      const filteredAreaTypes = getFilteredAreaTypes(updatedAreaDetail.length)
      if (filteredAreaTypes.length === 1) {
        setIsAvailableAreaType(false)
      }
      const newAreaType = filteredAreaTypes.length > 0 && filteredAreaTypes[0]
      updatedAreaDetail.push({
        areaType: newAreaType,
        propertySize: null,
        propertySizeUnit: 'squareFeet',
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
    const updatedData = data.filter((_, i) => i !== index)
    const updatedPricePerUnitMap = {}
    Object.keys(DATA?.pricePerUnitMap || {}).forEach((key) => {
      const keyIndex = parseInt(key)
      if (keyIndex !== index) {
        updatedPricePerUnitMap[keyIndex < index ? keyIndex : keyIndex - 1] =
          DATA.pricePerUnitMap[keyIndex]
      }
    })
    const prevDisplayTrue = data[index]?.display
    if (updatedData.length === 1) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: [{ ...updatedData[0], display: true }],
        pricePerUnitMap: updatedPricePerUnitMap,
      }))
    } else if (prevDisplayTrue && updatedData.length > 0) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: updatedData.map((item, i) => ({
          ...item,
          display: i === 0,
        })),
        pricePerUnitMap: updatedPricePerUnitMap,
      }))
    } else {
      setDATA((prevDATA) => ({
        ...prevDATA,
        areaDetail: updatedData,
        pricePerUnitMap: updatedPricePerUnitMap,
      }))
    }

    const filteredAreaTypes = getFilteredAreaTypes(updatedData.length)
    setIsAvailableAreaType(filteredAreaTypes.length < AreaTypesArray.length)
  }

  const handleConstructedRooms = (value) => {
    setConstructedRooms((prev = []) => {
      let updatedData
      if (prev.includes(value)) {
        updatedData = prev.filter((item) => item !== value)
        // setRoomUploads((prevUploads) => {
        //   const newUploads = { ...prevUploads }
        //   delete newUploads[value]
        //   return newUploads
        // })
      } else {
        updatedData = [...prev, value]
      }

      setDATA((prevData) => ({
        ...prevData,
        constructedRooms: updatedData,
      }))
      return updatedData
    })
  }

  return (
    <div className="bg-white px-11">
      <div className="flex flex-wrap">
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.inputs?.stepThreeInput.map((obj, index) =>
          renderInputFields(
            obj?.field?.label,
            obj?.field?.name,
            obj?.field?.type,
            obj?.required,
            index
          )
        )}
      </div>
      {postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
        DATA?.propertySubType
      ]?.areaFields === undefined ? (
        DATA?.listing === text.capitalizeSellText && (
          <div className="w-fit border-solid border-2 border-gray-200 rounded-xl p-3 my-4">
            {DATA?.areaDetail?.map((item, index) => (
              <div
                key={index}
                className="flex justify-start flex-wrap gap-x-[30.5px]"
              >
                <MDLabelAndInput
                  label={areaTypeText}
                  dropdownState={item.areaType}
                  dropdownArray={getFilteredAreaTypes(index)}
                  tooltipText="Enter the floor type"
                  dropdownClass="text-[0.875rem] py-[5px] w-[170px] h-[29px]"
                  cssClass="text-[0.875rem]"
                  labelClass="text-[1rem]"
                  onSelectFunction={(value) =>
                    handleAreaChange(index, value, DATA?.areaDetail)
                  }
                />
                <div className="w-[160px]">
                  <MDLabelAndInput
                    label={stepThreeText.unitSizeText}
                    isInputNumber="true"
                    maxLengthInput="5"
                    inputState={item?.propertySize}
                    dropdownState={item?.propertySizeUnit}
                    dropdownArray={propertySizeUnits}
                    cssClass="text-[0.875rem] h-[29px] w-[100px]"
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
                    className={`mt-2 flex mx-auto ${item.display ? 'rounded-full bg-primary outline outline-offset-2 outline-primary/20 w-3 h-3' : 'bg-white rounded-lg border-solid border-2 border-primary w-4 h-4'}`}
                    onClick={() => handleDisplayChange(index, DATA?.areaDetail)}
                  ></button>
                </div>
                {DATA?.areaDetail?.length > 1 && (
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
            {DATA?.areaDetail?.length <= 3 && (
              <div onClick={addAreaDetail}>
                <p className="text-primary mt-1">
                  {stepThreeText.additionalArea}
                </p>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="my-4">
          <div className="px-1">
            <MDLabelAndInput
              label={
                DATA?.propertySubType === 'Plot/Land' ||
                DATA?.propertySubType === 'Commercial Land'
                  ? 'Plot Size'
                  : 'Unit Size'
              }
              isInputNumber="true"
              maxLengthInput="5"
              inputState={DATA?.propertySize}
              dropdownState={DATA?.propertySizeUnit}
              dropdownArray={propertySizeUnits}
              cssClass="text-[0.875rem] h-[29px] w-[130px]"
              dropdownClass="text-[0.875rem] py-[5px] w-[86px] h-[29px]"
              labelClass="mb-[0px] text-[1rem]"
              onChangeFunction={(value) =>
                handleAreaSizeDataChange('propertySize', value)
              }
              onSelectFunction={(value) =>
                handleAreaUnitDataChange('propertySizeUnit', value)
              }
            />
          </div>
        </div>
      )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.inputs?.dimensionFields && (
        <div className="flex gap-x-1 mb-2">
          {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.inputs?.dimensionFields.map((obj, index) =>
            renderDimensionFields(
              obj?.field?.label,
              obj?.field?.name,
              obj?.field?.type,
              index
            )
          )}
        </div>
      )}
      {renderButtons(
        postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
          DATA?.propertySubType
        ]?.possessionStatus?.list,
        'Possession Status',
        (category, value) => {
          setDATA((prev) => {
            return {
              ...prev,
              [category]: value,
            }
          })
        },
        'possessionStatus',
        postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
          DATA?.propertySubType
        ]?.possessionStatus?.required
      )}
      {(DATA?.possessionStatus === 'Newly Launched' ||
        DATA?.possessionStatus === 'Under Construction' ||
        DATA?.propertySubType === propertyTypes.pgText ||
        DATA?.possessionStatus === 'Near Possession') && (
        <div className="mb-4">
          <h3 className={`text-left mb-1`}>{possesionDateText}</h3>
          <input
            type="date"
            min="2000-01-01"
            max="2050-12-31"
            className="border rounded-md border-gray-500 p-1"
            value={
              DATA?.possessionDate
                ? new Date(DATA.possessionDate).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
            }
            onChange={(e) => {
              setDATA({
                ...DATA,
                possessionDate: e.target.value
                  ? new Date(e.target.value).toISOString()
                  : '',
              })
            }}
          />
        </div>
      )}
      {postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
        DATA?.propertySubType
      ]?.numberOfOpenSides &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.numberOfOpenSides?.list,
          'Number of open sides',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'numberOfOpenSides',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.numberOfOpenSides?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
        DATA?.propertySubType
      ]?.boundaryWallMade &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.boundaryWallMade?.list,
          'Boundary Wall',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'boundaryWallMade',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.boundaryWallMade?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
        DATA?.propertySubType
      ]?.anyConstructionDone &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.anyConstructionDone?.list,
          'Construction Done',
          (category, value) => {
            setAnyConstructionDone(value === 'Yes' ? true : false)
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'anyConstructionDone',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.anyConstructionDone?.required
        )}
      {anyConstructionDone &&
        postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
          DATA?.propertySubType
        ]?.constructedRooms &&
        renderArrayButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.constructedRooms?.list,
          'Constructed Rooms',
          (category, value) => handleConstructedRooms(value),
          'constructedRooms'
        )}
      {postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
        DATA?.propertySubType
      ]?.cornerShop &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.cornerShop?.list,
          'Corner Shop',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'cornerShop',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.cornerShop?.required
        )}
      {/* {
                postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.personalWashroom && (
                    renderButtons(postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.personalWashroom?.list,
                    'Personal Washroom',
                    (category, value) => {
                        setDATA((prev) => {
                        return {
                            ...prev,
                            [category]: value
                        }
                        })
                    },
                    'personalWashroom'
                    )
                )
            } */}
      <div className="flex">
        {renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.bedroomCount?.list,
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
          'bedroomCount',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.bedroomCount?.required
        )}
        {(DATA?.bedroomCount === '4+' ||
          (parseInt(DATA?.bedroomCount, 10) || 0) >= 4) && (
          <div className="flex items-center ml-2 mt-4">
            <button
              className="px-[10px] py-1 rounded-full bg-primary text-white w-[1.7rem]"
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
              className="w-10 border border-black rounded-md px-2 py-1 h-[25px] text-center focus:outline-none focus:border-primary text-gray-600 mx-1"
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
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.dedicatedRooms &&
        renderArrayButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.dedicatedRooms?.list,
          'Dedicated Rooms',
          (category, value) => handleDedicatedRooms(value),
          'dedicatedRooms'
        )}
      <div>
        {renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.bathroomCount?.list,
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
          'bathroomCount',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.bathroomCount?.required
        )}
        {(DATA?.bathroomCount === '4+' ||
          (parseInt(DATA?.bathroomCount, 10) || 0) >= 4) && (
          <div className="flex items-center ml-2 mt-4">
            <button
              className="px-[10px] py-1 rounded-full bg-primary text-white w-[1.7rem]"
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
              className="w-10 border border-black rounded-md px-2 py-1 h-[25px] text-center focus:outline-none focus:border-primary text-gray-600 mx-1"
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
        {postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
          DATA?.propertySubType
        ]?.view &&
          renderArrayButtons(
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.view?.list,
            'View',
            (category, value) => handleView(value),
            'view'
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.availableFrom &&
          renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.availableFrom?.list,
            'Available From',
            (category, value) => {
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'availableFrom',
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.availableFrom?.required
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.pgRoomType &&
          renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.pgRoomType?.list,
            'Room Type',
            (category, value) => {
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'pgRoomType',
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.pgRoomType?.required
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.pgFoodAvailability &&
          renderMultipleSelectButtons(
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.pgFoodAvailability?.list,
            'Food Availability',
            (category, value) => handlePgFoodAvailability(value),
            'pgFoodAvailability'
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.pgFoodCharges &&
          renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.pgFoodCharges?.list,
            'Food Charges',
            (category, value) => {
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'pgFoodCharges',
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.pgFoodCharges?.required
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.pgNoticePeriod &&
          renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.pgNoticePeriod?.list,
            'Notice Period',
            (category, value) => {
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'pgNoticePeriod',
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.pgNoticePeriod?.required
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.publicTransportation &&
          renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.publicTransportation?.list,
            'Public Transportation',
            (category, value) => {
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'publicTransportation',
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.publicTransportation?.required
          )}
      </div>
    </div>
  )
}
