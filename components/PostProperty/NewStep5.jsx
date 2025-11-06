import React, { useState } from 'react'
import { postPropertyMap } from '@/content/JSON/PostPropertyMap'
import { numberFormatter } from '@/utils/utils'

import ImageUploader from '../ImageUpload/Upload'
import TooltipComponent from '../Tooltip'
import RadioButtonGroup from './RadioButtonGroup'

export default function NewStep5({
  DATA,
  setDATA,
  setDeclarationOne,
  SetDeclarationTwo,
  declarationOne,
  declarationTwo,
  isReview = false,
  isPreleasedOrRented,
  setPreleasedOrRented,
  isReraApproved,
  setReraApproved,
}) {
 
  const [photoURLs, setPhotoURLs] = useState(DATA?.propertyImages || [])
  const [pgRules, setPgRules] = useState(DATA?.pgRules || [])
  const [suitableFor, setSuitableFor] = useState([])
  const [balconies, setBalconies] = useState(DATA?.balconies || {})
  const [pgServices, setPgServices] = useState(DATA?.pgServices || [])
  const balconyArray = ['Room-attached', 'Individual', 'Connected']
  const areaUnits = ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare']
  const lengthUnits = ['Feet', 'Meter', 'Yard', 'Inch']

  const ownershipType = {
    'Free hold':
      'Freehold property implies exclusive ownership of the building and the ground it occupies, and the owner owns all rights to sell, transfer, or alter the property according to law.',
    Leasehold:
      ' In the leasehold property, the purchaser acquires rights to occupy the property for a stipulated amount of time (e.g., 99 years), while the property is owned by another entity, typically the state or landlord.',
    'Co-operative Society':
      'Co-operative Society property is owned by a group of people who form a society. Each member owns a share in the society and has the right to live in a specific unit in the building.',
    'Power of attorney': `Power of Attorney (PoA) is a legal document that lets someone you trust make decisions or handle property and money matters for you when you can't be there yourself.`,
    'Trust/Institutional Ownership':
      'Owned by a trust, society, company or institution',
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
      <div className="w-40 mt-1 ">
        <label>{label}</label>
        <br />
        <select
          className="w-full border border-gray-600  rounded-md h-[30px] text-[0.875rem] focus:outline-none my-1"
          value={value}
          onChange={(e) => onChangeFunc(e.target.value)}
        >
          <option value="">{defaultValue}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const handleBalconyToggle = (optionValue) => {
    const updatedBalconies = { ...balconies }
    if (DATA.balconies && DATA.balconies.hasOwnProperty(optionValue)) {
      delete DATA.balconies[optionValue]
      setDATA({ ...DATA })
      setBalconies({ ...DATA.balconies })
      return
    }
    if (!updatedBalconies.hasOwnProperty(optionValue)) {
      updatedBalconies[optionValue] = 1
    }

    setBalconies(updatedBalconies)

    setDATA((prevData) => {
      const updatedData = { ...prevData }
      updatedData.balconies = { ...updatedBalconies }
      return updatedData
    })
  }

  const updatePropertyData = (key, value) => {
    setDATA((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  const handleNumberChange = (key, formattedValue) => {
    const rawValue = formattedValue.replace(/,/g, '')
    if (!isNaN(rawValue)) {
      updatePropertyData(key, rawValue)
    }
  }

  const renderInputFields = (label, name, type, required, index) => {
    return (
      <div className="flex flex-col p-0.5 gap-y-1" key={index}>
        {type === 'month' ? (<React.Fragment></React.Fragment>) :
          <label>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        }
        {type === 'month' ? (
          <div>
            {/* <input
              type="month"
              value={
                DATA[name] ? new Date(DATA[name]).toISOString().slice(0, 7) : ''
              }
              min="1990-01"
              max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
              onChange={(e) => {
                setDATA({
                  ...DATA,
                  [name]: e.target.value
                    ? new Date(e.target.value).toISOString()
                    : '',
                })
              }}
              className="border border-gray-500 rounded-md px-2 py-2 h-[30px] w-[180px]"
            /> */}
          </div>
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
            className="border border-gray-500 rounded-md p-2 h-[29px] w-[180px]"
          />
        )}
        {name === 'salePrice' && (
          <div>
            <label className="font-medium">Price Includes</label>
            {[
              { value: 'allInclusive', label: 'All Inclusive' },
              { value: 'negotiable', label: 'Negotiable' },
              { value: 'taxesExtra', label: 'Taxes and Govt. Charges Extra' },
              { value: 'otherCharges', label: 'Other Charges' },
            ].map(({ value, label }) => (
              <div className="flex flex-row items-center gap-1 m-1" key={value}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleSelection(value)}
                  className={`cursor-pointer ${selectedValues.includes(value) ? 'bg-maroon-500' : ''}`}
                />
                <label>{label}</label>
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
                <div className="flex flex-row items-center gap-x-1" key={value}>
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
                  <label>{label}</label>
                </div>
              ))}
            </RadioButtonGroup>
          </div>
        )}
      </div>
    )
  }




  const renderInputFieldsBuildMonth = (label, name, type, required, index) => {
    return (
      <div className="flex flex-col p-1 gap-y-1" key={index}>
        {type === 'month' ? (
          <label>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        ) : (
          <div></div>
        )}
        {type === 'month' ? (
          <div >
            <input
              type="month"
              value={
                DATA[name] ? new Date(DATA[name]).toISOString().slice(0, 7) : ''
              }
              min="1990-01"
              max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
              onChange={(e) => {
                setDATA({
                  ...DATA,
                  [name]: e.target.value
                    ? new Date(e.target.value).toISOString()
                    : '',
                });
              }}
              className="border border-gray-500 rounded-md px-2 py-2 h-[30px] w-[180px]"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
  const renderButtons = (buttons, title, onClick, category, required) => {
    if (!buttons || buttons.length === 0) {
      return null
    }
    return (
      <div>
        <div className="flex flex-row mb-1">
          <span className="font-medium text-base">{title}</span>
          {required && <span className="text-red-500">*</span>}
        </div>
        <div className="flex flex-row gap-3 flex-wrap mb-2">
          {buttons.map((button) => {
   
            const isButtonActive = String(DATA[category]) === String(button);




            return (
              <div className="flex items-center">
                <button
                  className={`flex flex-row items-center text-center justify-center px-4 py-1 rounded-full ${isButtonActive
                      ? 'bg-primary  text-white'
                      : 'border border-newBackground  text-gray-600'
                    }`}
                  key={button}
                  onClick={() => onClick(category, button)}
                >
                  <span>{button}</span>
                </button>
                {title === 'Ownership Type' && (
                  <TooltipComponent tooltipText={ownershipType[button]} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderBalconyButtons = (buttons, title) => {
    if (!buttons || buttons.length === 0) {
      return null
    }
    const balconyOptions = balconyArray.map((balcony) => ({
      label: balcony,
      value: balcony,
    }))
    const handlePhotoSelectbalconies = async (files, balcony) => {
      const formData = new FormData()
      files.forEach((file, index) => {
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
        const mappedNewPhotoUrls = newPhotoUrls.map((url) => ({
          name: balcony,
          url: url,
        }))
        const updatedPhotoURLs = [...photoURLs, ...mappedNewPhotoUrls]
        setPhotoURLs(updatedPhotoURLs)
        setDATA({
          ...DATA,
          propertyImages: updatedPhotoURLs,
        })
        setImageKey((prev) => prev + 1)
        toast(response?.data?.responseMessage)
      } catch (error) {
        logger.error(error)
      }
    }
    return (
      <div className="">
        <h4 className="text-left">{title}</h4>
        <div className={`${!isReview && `flex flex-wrap`} -mt-1 mb-3`}>
          {balconyOptions.map((option) => (
            <div className=" gap-2 flex flex-wrap mt-2 ">
              <div key={option.value} className="flex gap-2">
                <button
                  className={`px-4 mr-2 rounded-full py-1 border-primary whitespace-nowrap ${DATA?.balconies?.[option.value] ? 'bg-primary text-white' : 'bg-white text-gray-600'} border border-primary`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '160px', // Ensuring a minimum width
                  }}
                  onClick={() => handleBalconyToggle(option.value)}
                >
                  {option.label}
                </button>

                {DATA?.balconies?.[option.value] && (
                  <div className="flex">
                    <div className="flex justify-around ">
                      <button
                        className="px-[10px] py-1 bg-primary rounded-md text-white"
                        onClick={() => {
                          const updatedBalconies = { ...balconies }
                          if (updatedBalconies[option.value] <= 1) {
                            delete updatedBalconies[option.value]
                          } else {
                            updatedBalconies[option.value]--
                          }
                          setBalconies(updatedBalconies)
                          setDATA((prevData) => {
                            const updatedData = { ...prevData }
                            updatedData.balconies = { ...updatedBalconies }
                            return updatedData
                          })
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        name={option.value}
                        className="w-10 border rounded-lg px-2 py-1 h-[30px] text-center focus:outline-none focus:border-primary mx-1"
                        value={balconies[option.value] || 0}
                        readOnly
                      />
                      <button
                        className="px-[9.6px] mr-3 py-1  rounded-md bg-primary text-white"
                        onClick={() => {
                          const updatedBalconies = { ...balconies }
                          updatedBalconies[option.value] =
                            (updatedBalconies[option.value] || 0) + 1
                          setBalconies(updatedBalconies)
                          setDATA((prevData) => {
                            const updatedData = { ...prevData }
                            updatedData.balconies = { ...updatedBalconies }
                            return updatedData
                          })
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {isReview && DATA?.balconies?.[option.value] && (
                <div className="max-w-[250px]">
                  <ImageUploader
                    onFileSelect={(files) =>
                      handlePhotoSelectbalconies(files, option.value)
                    }
                    photoURLs={propertyImages.filter(
                      (image) => image.name === option.value
                    )}
                    deletePhoto={deletePhoto}
                    onlyButton="true"
                    upload={balconyAvailability[option.value]}
                    key={imageKey}
                    setUpload={(uploadStatus) =>
                      setBalconyAvailability((prev) => ({
                        ...prev,
                        [option.value]: uploadStatus,
                      }))
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handlePgRules = (value) => {
    setPgRules((prev = []) => {
      let updatedData
      if (prev.includes(value)) {
        updatedData = prev.filter((item) => item !== value)
      } else if (DATA && DATA?.pgRules && DATA?.pgRules?.length !== 0) {
        updatedData = [...DATA?.pgRules, value]
      } else {
        updatedData = [...prev, value]
      }

      setDATA((prevData) => ({
        ...prevData,
        pgRules: updatedData,
      }))

      return updatedData
    })
  }

  const handlePgServices = (value) => {
    setPgServices((prev = []) => {
      let updatedData
      if (prev.includes(value)) {
        updatedData = prev.filter((item) => item !== value)
      } else if (DATA && DATA?.pgServices && DATA?.pgServices?.length !== 0) {
        updatedData = [...DATA?.pgServices, value]
      } else {
        updatedData = [...prev, value]
      }

      setDATA((prevData) => ({
        ...prevData,
        pgServices: updatedData,
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

  const handleSuitableFor = (value) => {
    setSuitableFor((prev = []) => {
      let updatedData
      if (prev.includes(value)) {
        updatedData = prev.filter((item) => item !== value)
      } else if (DATA && DATA?.suitableFor && DATA?.suitableFor?.length !== 0) {
        updatedData = [...DATA?.suitableFor, value]
      } else {
        updatedData = [...prev, value]
      }
      setDATA((prevData) => ({
        ...prevData,
        suitableFor: updatedData,
      }))
      return updatedData
    })
  }
  const renderFacadeFields = (label, name, index) => {
    const isLengthField = ['entranceWidth', 'ceilingHeight'].includes(name)
    const showPicker = isLengthField

    const handleNumericInput = (e) => {
      const value = e.target.value
      // Only allow numbers and decimal point
      const numericValue = value.replace(/[^0-9.]/g, '')

      // Prevent multiple decimal points
      const parts = numericValue.split('.')
      const cleanValue =
        parts.length > 2
          ? parts[0] + '.' + parts.slice(1).join('')
          : numericValue

      updatePropertyData(name, cleanValue)
    }

    const handleKeyDown = (e) => {
      // Prevent 'e', 'E', '+', '-' which are allowed in number inputs but not desired
      if (['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault()
      }
    }

    return (
      <div className="flex flex-col gap-y-1 px-1" key={index}>
        <label className="text-sm font-medium">{label}</label>
        <div className={`flex flex-row items-center`}>
          {/* Numeric Input */}
          <input
            type="text" // Changed from "number" to "text" for better control
            onChange={handleNumericInput}
            onKeyDown={handleKeyDown}
            value={DATA?.[name] || ''}
            placeholder="Enter number"
            className={`border border-gray-500 rounded-md p-2 h-[29px]`}
          />

          {/* Dropdown for selecting units */}
          {showPicker && (
            <div>
              <select
                onChange={(e) =>
                  updatePropertyData(`${name}Unit`, e.target.value)
                }
                value={DATA?.[`${name}Unit`] || ''}
                className="border border-gray-500 rounded-md h-[29px] w-[65px] items-center outline-none -ml-4"
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

  return (
    <div className="px-5">
      <div className="flex flex-wrap">
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs && (
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs?.additionalInputField && (
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs?.additionalInputField?.map((obj, index) => (
              renderInputFieldsBuildMonth(obj?.field?.label, obj?.field?.name, obj?.field?.type, obj?.required, index)
            ))
          )
        )}
      </div>
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.preLeasedOrRented &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.preLeasedOrRented?.list,
          'PreLeased Or Rented',
          (category, value) => {
            setPreleasedOrRented(value === 'Yes' ? true : false)
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'preLeasedOrRented',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.preLeasedOrRented?.required
        )}
      {isPreleasedOrRented && (
       <div className="flex flex-col mx:flex-row">
          {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.inputs &&
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.inputs?.rentedOrLeasedStepTwoInputField.map((obj, index) => 
              renderInputFields(
                obj?.field?.label,
                obj?.field?.name,
                obj?.field?.type,
                obj?.required,
                index
              )
            )}
        </div>
      )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.reraApproved &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.reraApproved?.list,
          'Rera Approved',
          (category, value) => {
            setReraApproved(value === 'Yes' ? true : false)
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'reraApproved',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.reraApproved?.required
        )}





      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.category &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.category?.list,
          'Cateory',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'category',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.category?.required
        )}
      {isReraApproved &&
        postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.inputs &&
        postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.inputs?.reraApprovedInput.map((obj, index) =>
          renderInputFields(
            obj?.field?.label,
            obj?.field?.name,
            obj?.field?.type,
            obj?.required,
            index
          )
        )}
      <div className="flex flex-wrap gap-x-2">
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.facing &&
          renderConditionalSelect(
            'Facing',
            DATA?.facing,
            (value) => {
              setDATA({
                ...DATA,
                facing: value,
              })
            },
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.facing?.list,
            'Select Facing'
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.flooring &&
          renderConditionalSelect(
            'Flooring',
            DATA?.flooring,
            (value) => {
              setDATA({
                ...DATA,
                flooring: value,
              })
            },
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.flooring?.list,
            'Select Flooring'
          )}
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.balconyView &&
          renderConditionalSelect(
            'Balcony View',
            DATA?.balconyView,
            (value) => {
              setDATA({
                ...DATA,
                balconyView: value,
              })
            },
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.balconyView?.list,
            'Select Balcony View'
          )}
      </div>
      <div className="flex flex-wrap">
        {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.inputs &&
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.inputs?.additionalInputField &&
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.inputs?.additionalInputField?.map((obj, index) =>
            renderInputFields(
              obj?.field?.label,
              obj?.field?.name,
              obj?.field?.type,
              obj?.required,
              index
            )
          )}
      </div>
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.inputs?.shopFacadeInputField && (
          <div>
            <h4> Shop Facade Size</h4>
            <div className="flex my-2">
              {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
                DATA?.propertySubType
              ]?.inputs?.shopFacadeInputField.map((obj, index) =>
                renderFacadeFields(
                  obj?.field?.label,
                  obj?.field?.name,
                  obj?.field?.type,
                  index
                )
              )}
            </div>
          </div>
        )}
      {/* {
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.locatedInside && (
            renderButtons(postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.locatedInside?.list,
              'Located Inside',
              (category, value) => {
                setDATA((prev) => {
                  return {
                    ...prev,
                    [category]: value
                  }
                })
              },
              'locatedInside'
            )
          )
      } */}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.liftAvailability &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.liftAvailability?.list,
          'Lift Availability',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'liftAvailability',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.liftAvailability?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.parkingAvailable &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.parkingAvailable?.list,
          'Parking Available',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'parkingAvailability',
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.parkingAvailable?.required
        )}
      {DATA?.parkingAvailability === 'Yes' &&
        (postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.coveredParking
          ? renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.coveredParking?.list,
            'Covered Parking',
            (category, value) => {
              if (value === '5+') {
                value = 5
              }
              setDATA((prev) => {
                return {
                  ...prev,
                  [category]: value,
                }
              })
            },
            'coveredParking'
          )
          : renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.publicParking?.list,
            'Public Parking',
            (category, value) => {
              if (value === '5+') {
                value = 5
              }
              setDATA((prev) => {
                return {
                  ...prev,
                  [category]: value,
                }
              })
            },
            'publicParking'
          ))}
      {(DATA?.coveredParking === '5+' ||
        (parseInt(DATA?.coveredParking, 10) || 0) >= 5) &&
        DATA?.parkingAvailability === 'Yes' && (
          <div className="flex-row items-center ml-2 my-2 gap-2 ">
            <button
              className="px-2.5 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  coveredParking: (parseInt(DATA?.coveredParking, 10) || 5) - 1,
                })
              }}
            >
              <p className="text-white w-[7px]">-</p>
            </button>

            <input
              type="text"
              className="w-10 border border-black rounded-md px-2 py-1 h-6 text-center text-gray-600 mx-1"
              value={String(
                DATA?.coveredParking === '5+'
                  ? 5
                  : parseInt(DATA?.coveredParking, 10) || 5
              )}
              editable={false}
            />

            <button
              className="px-2.5 mr-3 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  coveredParking: (parseInt(DATA?.coveredParking, 10) || 5) + 1,
                })
              }}
            >
              <p className="text-white">+</p>
            </button>
          </div>
        )}
      {(DATA?.publicParking === '5+' ||
        (parseInt(DATA?.publicParking, 10) || 0) >= 5) &&
        DATA?.parkingAvailability === 'Yes' && (
          <div className="flex-row items-center ml-2 my-2 gap-2">
            <button
              className="px-2.5 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  publicParking: (parseInt(DATA?.publicParking, 10) || 5) - 1,
                })
              }}
            >
              <p className="text-white w-[7px]">-</p>
            </button>

            <input
              type="text"
              className="w-10 border border-black rounded-md px-2 py-1 h-6 text-center text-gray-600 mx-1"
              value={String(
                DATA?.publicParking === '5+'
                  ? 5
                  : parseInt(DATA?.publicParking, 10) || 5
              )}
              editable={false}
            />

            <button
              className="px-2.5 mr-3 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  publicParking: (parseInt(DATA?.publicParking, 10) || 5) + 1,
                })
              }}
            >
              <p className="text-white">+</p>
            </button>
          </div>
        )}
      {DATA?.parkingAvailability === 'Yes' &&
        (postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.uncoveredParking
          ? renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.uncoveredParking?.list,
            'Uncovered Parking',
            (category, value) => {
              if (value === '5+') {
                value = 5
              }
              setDATA((prev) => {
                return {
                  ...prev,
                  [category]: value,
                }
              })
            },
            'uncoveredParking',
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.uncoveredParking?.required
          )
          : renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.privateParking?.list,
            'Private Parking',
            (category, value) => {
              if (value === '5+') {
                value = 5
              }
              setDATA((prev) => {
                return {
                  ...prev,
                  [category]: value,
                }
              })
            },
            'privateParking',
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.privateParking?.required
          ))}
      {(DATA?.uncoveredParking === '5+' ||
        (parseInt(DATA?.uncoveredParking, 10) || 0) >= 5) &&
        DATA?.parkingAvailability === 'Yes' && (
          <div className="flex-row items-center ml-2 my-2 gap-2">
            <button
              className="px-2.5 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  uncoveredParking:
                    (parseInt(DATA?.uncoveredParking, 10) || 5) - 1,
                })
              }}
            >
              <p className="text-white w-[7px]">-</p>
            </button>

            <input
              type="text"
              className="w-10 border border-black rounded-md px-2 py-1 h-6 text-center text-gray-600 mx-1"
              value={String(
                DATA?.uncoveredParking === '5+'
                  ? 5
                  : parseInt(DATA?.uncoveredParking, 10) || 5
              )}
              editable={false}
            />

            <button
              className="px-2.5 mr-3 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  uncoveredParking:
                    (parseInt(DATA?.uncoveredParking, 10) || 5) + 1,
                })
              }}
            >
              <p className="text-white">+</p>
            </button>
          </div>
        )}
      {(DATA?.privateParking === '5+' ||
        (parseInt(DATA?.privateParking, 10) || 0) >= 5) &&
        DATA?.parkingAvailability === 'Yes' && (
          <div className="flex-row items-center ml-2 my-2 gap-2">
            <button
              className="px-2.5 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  privateParking: (parseInt(DATA?.privateParking, 10) || 5) - 1,
                })
              }}
            >
              <p className="text-white w-[7px]">-</p>
            </button>

            <input
              type="text"
              className="w-10 border border-black rounded-md px-2 py-1 h-6 text-center text-gray-600 mx-1"
              value={String(
                DATA?.privateParking === '5+'
                  ? 5
                  : parseInt(DATA?.privateParking, 10) || 5
              )}
              editable={false}
            />

            <button
              className="px-2.5 mr-3 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  privateParking: (parseInt(DATA?.privateParking, 10) || 5) + 1,
                })
              }}
            >
              <p className="text-white">+</p>
            </button>
          </div>
        )}
      {DATA?.parkingAvailability === 'Yes' &&
        (postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
          DATA?.propertySubType
        ]?.mechanicalParking
          ? renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.mechanicalParking?.list,
            'Mechanical Parking',
            (category, value) => {
              if (value === '5+') {
                value = 5
              }
              setDATA((prev) => {
                return {
                  ...prev,
                  [category]: value,
                }
              })
            },
            'mechanicalParking',
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.mechanicalParking?.required
          )
          : renderButtons(
            postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
              DATA?.propertySubType
            ]?.multilevelParking?.list,
            'Multilevel Parking',
            (category, value) => {
              if (value === '5+') {
                value = 5
              }
              setDATA((prev) => {
                return {
                  ...prev,
                  [category]: value,
                }
              })
            },
            'multilevelParking',
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
              DATA?.propertySubType
            ]?.multilevelParking?.required
          ))}
      {(DATA?.mechanicalParking === '5+' ||
        (parseInt(DATA?.mechanicalParking, 10) || 0) >= 5) &&
        DATA?.parkingAvailability === 'Yes' && (
          <div className="flex-row items-center ml-2 my-2 gap-2">
            <button
              className="px-2.5 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  mechanicalParking:
                    (parseInt(DATA?.mechanicalParking, 10) || 5) - 1,
                })
              }}
            >
              <p className="text-white w-[7px]">-</p>
            </button>

            <input
              type="text"
              className="w-10 border border-black rounded-md px-2 py-1 h-6 text-center text-gray-600 mx-1"
              value={String(
                DATA?.mechanicalParking === '5+'
                  ? 5
                  : parseInt(DATA?.mechanicalParking, 10) || 5
              )}
              editable={false}
            />

            <button
              className="px-2.5 mr-3 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  mechanicalParking:
                    (parseInt(DATA?.mechanicalParking, 10) || 5) + 1,
                })
              }}
            >
              <p className="text-white">+</p>
            </button>
          </div>
        )}
      {(DATA?.multilevelParking === '5+' ||
        (parseInt(DATA?.multilevelParking, 10) || 0) >= 5) &&
        DATA?.parkingAvailability === 'Yes' && (
          <div className="flex-row items-center ml-2 my-2 gap-2">
            <button
              className="px-2.5 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  multilevelParking:
                    (parseInt(DATA?.multilevelParking, 10) || 5) - 1,
                })
              }}
            >
              <p className="text-white w-[7px]">-</p>
            </button>

            <input
              type="text"
              className="w-10 border border-black rounded-md px-2 py-1 h-6 text-center text-gray-600 mx-1"
              value={String(
                DATA?.multilevelParking === '5+'
                  ? 5
                  : parseInt(DATA?.multilevelParking, 10) || 5
              )}
              editable={false}
            />

            <button
              className="px-2.5 mr-3 py-1 rounded-full bg-primary"
              onClick={() => {
                setDATA({
                  ...DATA,
                  multilevelParking:
                    (parseInt(DATA?.multilevelParking, 10) || 5) + 1,
                })
              }}
            >
              <p className="text-white">+</p>
            </button>
          </div>
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.sewage &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.sewage?.list,
          'Sewage',
          (category, value) => {
            setDATA((prev) => {
         
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'sewage',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.sewage?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.gasPipeline &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.gasPipeline?.list,
          'Gas Pipeline',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'gasPipeline',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.gasPipeline?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.ownershipType &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.ownershipType?.list,
          'Ownership Type',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'ownershipType',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.ownershipType?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.waterSupply &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.waterSupply?.list,
          'Water Supply',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'waterSupply',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.waterSupply?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.powerBackup &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.powerBackup?.list,
          'Power Backup',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'powerBackup',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.powerBackup?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.streetLighting &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.streetLighting?.list,
          'Street Lighting',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'streetLighting',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.streetLighting?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.loanAvailability &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.loanAvailability?.list,
          'Loan Availability',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'loanAvailability',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.loanAvailability?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.electricitySupply &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.electricitySupply?.list,
          'Electricity Supply',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'electricitySupply',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.electricitySupply?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.pantry &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.pantry?.list,
          'Pantry',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'pantry',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.pantry?.required
        )}

      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.balconies &&
        renderBalconyButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.balconies?.list,
          'Balconies'
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.SuitableForBusinessType &&
        renderArrayButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.SuitableForBusinessType?.list,
          'Suitable For',
          (category, value) => handleSuitableFor(value),
          'suitableFor'
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.locatedNear &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.locatedNear?.list,
          'Located Near',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'locatedNear',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.locatedNear?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.locatedInside &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.locatedInside?.list,
          'Located Inside',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'locatedInside',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.locatedInside?.required
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.pgRules &&
        renderArrayButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.pgRules?.list,
          'PG Rules',
          (category, value) => handlePgRules(value),
          'pgRules'
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.pgServices &&
        renderArrayButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.pgServices?.list,
          'PG Services',
          (category, value) => handlePgServices(value),
          'pgServices'
        )}
      {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
        DATA?.propertySubType
      ]?.washroom &&
        renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[
            DATA?.propertySubType
          ]?.washroom?.list,
          'Washroom',
          (category, value) => {
            setDATA((prev) => {
              return {
                ...prev,
                [category]: value,
              }
            })
          },
          'washroom',
          postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
            DATA?.propertySubType
          ]?.washroom?.required
        )}
    </div>
  )
}
