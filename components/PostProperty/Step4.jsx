import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import postPropertyFormCondition from '@/content/JSON/postPropertyFormCondition'
import { getLogger } from '@/helper/logger'
import axios from 'axios'
import { toast } from 'react-toastify'
import ImageUploader from '../ImageUpload/Upload'
import styles from './PropertyDetails.module.css'
import { COMPONENTS } from '@/textV2'
import TooltipComponent from '../Tooltip'
const { balconyArray } = COMPONENTS.POST_PROPERTY_COMPO.stepFourText
export default function Step4({
  DATA,
  setDATA,
  trigger,
  setPropertyDetails,
  isReview = false,
  setDeclarationOne,
  setDeclarationTwo,
}) {
  useEffect(() => {
    setPropertyDetails(true)
    setDeclarationOne(true)
    setDeclarationTwo(true)
    if (typeof DATA.salePrice === 'string' && DATA.salePrice.includes(',')) {
      setDATA({
        ...DATA,
        salePrice: DATA.salePrice.replace(/\D/g, ''), // Removes all non-numeric characters
      })
    } else if (
      typeof DATA.rentPrice === 'string' &&
      DATA.rentPrice.includes(',')
    ) {
      setDATA({
        ...DATA,
        rentPrice: DATA.rentPrice.replace(/\D/g, ''), // Removes all non-numeric characters
      })
    }
    if (
      typeof DATA.rentDepositAmount === 'string' &&
      DATA.rentDepositAmount.includes(',')
    ) {
      setDATA({
        ...DATA,
        rentDepositAmount: DATA.rentDepositAmount.replace(/\D/g, ''), // Removes all non-numeric characters
      })
    } else if (
      typeof DATA.maintenanceAmount === 'string' &&
      DATA.maintenanceAmount.includes(',')
    ) {
      setDATA({
        ...DATA,
        maintenanceAmount: DATA.maintenanceAmount.replace(/\D/g, ''), // Removes all non-numeric characters
      })
    }
  }, [])

  useEffect(() => {
    if (typeof DATA?.salePrice === 'string' && DATA?.salePrice.includes(',')) {
      setDATA({
        ...DATA,
        salePrice: DATA?.salePrice.replace(/\D/g, ''), // Removes all non-numeric characters
      })
    }
    else if (typeof DATA?.rentPrice === 'string' && DATA?.rentPrice.includes(',')) {
      setDATA({
        ...DATA,
        rentPrice: DATA?.rentPrice.replace(/\D/g, ''), // Removes all non-numeric characters
      })
    }
    else if (typeof DATA?.rentDepositAmount === 'string' && DATA?.rentDepositAmount.includes(',')) {
      setDATA({
        ...DATA,
        rentDepositAmount: DATA?.rentDepositAmount.replace(/\D/g, ''), // Removes all non-numeric characters
      })
    }
    else if (typeof DATA?.maintenanceAmount === 'string' && DATA?.maintenanceAmount.includes(',')) {
      setDATA({
        ...DATA,
        maintenanceAmount: DATA?.maintenanceAmount.replace(/\D/g, ''),
      })
    }
  }, [DATA])
  const logger = getLogger()
  const searchParams = useSearchParams()
  const path = searchParams.get('propertyId')
  const [dedicatedRooms, setDedicatedRooms] = useState(
    DATA?.dedicatedRooms || []
  )
  const [pgRules, setPgRules] = useState([])
  const [pgServices, setPgServices] = useState([])
  const [suitableFor, setSuitableFor] = useState([])
  const [pgFoodAvailability, setPgFoodAvailability] = useState([])
  const [balconies, setBalconies] = useState(DATA?.balconies || {})
  const [generatedDescription, setGeneratedDescription] = useState('')
  const [upload, setUpload] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [parkingAvailability, setParkingAvailability] = useState(false)
  const [balconyAvailability, setBalconyAvailability] = useState({})
  const [photoURLs, setPhotoURLs] = useState(DATA?.propertyImages || [])
  const [roomUploads, setRoomUploads] = useState({})
  const [imageKey, setImageKey] = useState(0)
  const router = useRouter()
  const currentPath = router.asPath
  const { propertyImages } = DATA || {}
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
      <div className="px-5">
        <h4 className={`${styles.property_label}`}>{title}</h4>
        <div className={`${!isReview && `flex flex-wrap`} -mt-1 mb-3`}>
          {balconyOptions.map((option) => (
            <div className=" gap-2 flex flex-wrap mt-2 ">
              <div key={option.value} className="flex gap-2">
                <button
                  className={`px-4 h-[27px] mr-2  rounded-full border-2 border-primary whitespace-nowrap ${DATA?.balconies?.[option.value] ? 'bg-primary text-white' : 'bg-white text-gray-600'} border-2 border-primary`}
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
                    <div className="flex gap-2 h-[30px]">
                      <button
                        className="px-[10px] py-1  rounded-md bg-primary text-white"
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
                        className="w-10 border rounded-lg px-2 py-1 h-[30px] text-center focus:outline-none focus:border-primary"
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

    const renderButtons = (buttons, title, onClick, category) => {
    if (!buttons || buttons.length === 0) {
      return null
    }

    return (
      <div className="px-5">
        <h4 className={`${styles.property_label}`}>{title}</h4>
        <div className="flex mb-4">
          {buttons.map((button) => {
            const isButtonActive = DATA[category] == button ? true : false
            return (
              <button
                className={`px-3 mt-1 py-2 h-[25px] w-fit  rounded-full ${isButtonActive
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
      <div className="rounded-md px-5">
        <h4 className={`${styles.property_label}`}>{title}</h4>
        <div className={`${!file && 'flex flex-wrap'} mb-3 gap-3`}>
          {buttons.map((button) => {
            const isButtonActive =
              Array.isArray(DATA[category]) && DATA[category].includes(button)
            return (
              <div
                className={`${file && 'flex justify-start mb-2 gap-2 flex-wrap'}`}
              >
                <button
                  className={`px-3 py-2 h-[25px] w-[140px] rounded-full ${isButtonActive ? 'bg-primary text-white' : 'bg-white text-gray-600'} border-2 border-primary whitespace-nowrap`}
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
      <div className="w-40 mt-1 px-5">
        <label className={`${styles.property_label} `}>{label}</label>
        <br />
        <select
          className="w-full border border-gray-600  rounded-md h-[30px] text-[0.875rem] focus:outline-none focus:border-primary my-1"
          value={value}
          onChange={(e) => onChangeFunc(e.target.value)}
        >
          <option value="">{defaultValue}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const handlePhotoSelect = async (files, category) => {
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
        name: category,
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
      logger.error('Error uploading images:', error)
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
          (_, photoIndex) => photoURLs[photoIndex]?.url !== url
        )
        setPhotoURLs(updatedPhotoURLs)
        setDATA((prevData) => ({
          ...prevData,
          propertyImages: updatedPhotoURLs,
        }))
        toast.info(response.data?.responseMessage)
        setUpload(false)
      } else {
        setTimeout(() => { }, 3000)
      }
    } catch (error) {
      logger.error('An error occurred while deleting photo:', error)
      setTimeout(() => { }, 3000)
    }
  }

  const handlePhotoSelects = async (files, category) => {
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
        name: category,
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
      logger.error('Error uploading images:', error)
    }
  }

  const handlePhotoSelectparkingAvailability = async (files, category) => {
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
      const mappedNewPhotoUrls = newPhotoUrls.map((url, index) => ({
        name: category,
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
      logger.error('Error uploading images:', error)
    }
  }

  const handleInputField = (isRequired, label, tooltipText, placeholder, FieldName, inputType, unit = []) => {
    return (
      <div className='mb-2 ml-5'>
        <div className='flex items-center '>
          <label className='text-[#343434]'>{label}</label>
          {isRequired && <span className='text-primary'>*</span>}
          <TooltipComponent tooltipText={tooltipText} />
        </div>
        <div className='flex items-center space-x-2'>
          <input
            type={inputType || 'text'}
            className='border rounded-md border-gray-600 h-7 px-2 focus:outline-none text-gray-600 text-[0.875rem]'
            name={FieldName}
            placeholder={placeholder}
            value={DATA[FieldName]?.size || ''}
            onChange={(event) => {
              const { value } = event.target;
              setDATA((prevData) => ({
                ...prevData,
                [FieldName]: { ...prevData[FieldName], size: value },
              }));
            }}
          />
          {unit.length > 0 && (
            <select
              className='border rounded-md border-gray-600 h-7 px-2 focus:outline-none text-gray-600 text-[0.875rem]'
              value={DATA[FieldName]?.unit || ''}
              onChange={(event) => {
                const { value } = event.target;
                setDATA((prevData) => ({
                  ...prevData,
                  [FieldName]: { ...prevData[FieldName], unit: value },
                }));
              }}
            >
              <option  value='' disabled><p>Select Unit</p></option>
              {unit.map((item, index) => (
                <option  key={index} value={item}><p>{item}</p></option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="px-5">
      <div className={`flex flex-wrap gap-3 mb-2`}>
        {postPropertyFormCondition[DATA?.listing]?.[trigger]?.facing &&
          renderConditionalSelect(
            'Facing',
            DATA.facing,
            (value) => {
              setDATA({
                ...DATA,
                facing: value,
              })
            },
            postPropertyFormCondition[DATA?.listing]?.[trigger].facing,
            'Select Facing'
          )}
        {postPropertyFormCondition[DATA?.listing]?.[trigger]?.flooring &&
          renderConditionalSelect(
            'Flooring',
            DATA.flooring,
            (value) => {
              setDATA({
                ...DATA,
                flooring: value,
              })
            },
            postPropertyFormCondition[DATA?.listing]?.[trigger].flooring,
            'Select Flooring'
          )}
        <div className="max-w-[400px] gap-2 lg:flex md:flex">
          {postPropertyFormCondition[DATA?.listing]?.[trigger]?.balconyView &&
            renderConditionalSelect(
              'Balcony View',
              DATA.balconyView,
              (value) => {
                setDATA({
                  ...DATA,
                  balconyView: value,
                })
              },
              postPropertyFormCondition[DATA?.listing]?.[trigger].balconyView,
              'Select Balcony View'
            )}
            {
              DATA?.preleasedOrRented==='Yes'&&
              <div>
                
              </div>

            }
          {isReview && (
            <div className="flex flex-wrap w-40 mt-7">
              <ImageUploader
                onFileSelect={(files) => handlePhotoSelects(files, 'Balcony')}
                photoURLs={propertyImages.filter(
                  (image) => image.name === 'Balcony'
                )}
                deletePhoto={deletePhoto}
                onlyButton="true"
                upload={upload}
                setUpload={setUpload}
                key={imageKey}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-2">
  {postPropertyFormCondition[DATA?.listing]?.[trigger]?.step4InputField?.map(
    (input, key) => (
      <div key={key} className="flex min-w-[200px]">
        {handleInputField(
          false,
          input?.label,
          input?.tooltipText,
          input?.placeholder,
          input?.name,
          input?.type,
          input?.unit
        )}
      </div>
    )
  )}
</div>



      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].officeSpaceType,
        'Office Space Type',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'officeSpaceType'
      )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].pantry,
        'Pantry',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'pantry'
      )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].personalWashroom,
        'Personal Washroom',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'personalWashroom'
      )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].liftAvailability,
        'Lift Availability',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'liftAvailability'
      )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].powerBackup,
        'Power Backup',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'powerBackup'
      )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger]
          .electricityChargesIncluded,
        'Electricity Charges Included',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'propertyElectricityCharges'
      )}

      {postPropertyFormCondition[DATA?.listing]?.[trigger]?.sewage &&
        renderButtons(
          postPropertyFormCondition[DATA?.listing]?.[trigger]?.sewage,
          'Sewage',
          (category, value) => {
            setDATA({
              ...DATA,
              [category]: value,
            })
          },
          'sewage'
        )}

      {renderArrayButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].pgRules,
        'PG Rules',
        (category, value) => handlePgRules(value),
        'pgRules'
      )}

      {renderArrayButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].pgServices,
        'PG Services',
        (category, value) => handlePgServices(value),
        'pgServices'
      )}

      <div className="flex">
        {renderButtons(
          postPropertyFormCondition[DATA?.listing]?.[trigger].parkingAvailable,
          'Parking Available',
          (category, value) => {
            setDATA({
              ...DATA,
              [category]: value,
            })
          },
          'parkingAvailability'
        )}
        {DATA?.parkingAvailability === 'Yes' && isReview && (
          <div className="flex w-fit pt-5 mt-1 pl-3">
            <ImageUploader
              onFileSelect={(files) =>
                handlePhotoSelectparkingAvailability(
                  files,
                  'parkingAvailability'
                )
              }
              photoURLs={propertyImages.filter(
                (image) => image.name === 'parkingAvailability'
              )}
              deletePhoto={deletePhoto}
              onlyButton="true"
              upload={parkingAvailability}
              setUpload={setParkingAvailability}
              key={imageKey}
            />
          </div>
        )}
      </div>

      {DATA?.parkingAvailability === 'Yes' && (
        <div>
          {/* Render covered parking buttons */}
          {renderButtons(
            postPropertyFormCondition[DATA?.listing]?.[trigger]
              ?.coveredParkingCount,
            'Covered Parking',
            (category, value) => {
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'coveredParkingCount'
          )}
          {/* Render Uncovered parking buttons */}
          {renderButtons(
            postPropertyFormCondition[DATA?.listing]?.[trigger]
              ?.uncoveredParkingCount,
            'Open/Uncovered Parking',
            (category, value) => {
              setDATA({
                ...DATA,
                [category]: value,
              })
            },
            'uncoveredParkingCount'
          )}
        </div>
      )}

      {renderBalconyButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].balconies,
        'Balconies'
      )}

      {renderArrayButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].suitableFor,
        'Suitable For',
        (category, value) => handleSuitableFor(value),
        'suitableFor'
      )}

      {renderArrayButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].dedicatedRooms,
        'Dedicated Rooms',
        (category, value) => handleDedicatedRooms(value),
        'dedicatedRooms',
        isReview && true
      )}

      {postPropertyFormCondition[DATA?.listing]?.[trigger]?.loanAvailability &&
        renderButtons(
          postPropertyFormCondition[DATA?.listing]?.[trigger].loanAvailability,
          'Loan Availability',
          (category, value) => {
            setDATA({
              ...DATA,
              [category]: value,
            })
          },
          'loanAvailability'
        )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].gasPipeline,
        'Gas Pipeline',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'gasPipeline'
      )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].waterSupply,
        'Water Supply',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'waterSupply'
      )}

      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].electricitySupply,
        'Electricity Supply',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'electricitySupply'
      )}
      {renderButtons(
        postPropertyFormCondition[DATA?.listing]?.[trigger].streetLighting,
        'Street Lighting',
        (category, value) => {
          setDATA({
            ...DATA,
            [category]: value,
          })
        },
        'streetLighting'
      )}
    </div>
  )
}
