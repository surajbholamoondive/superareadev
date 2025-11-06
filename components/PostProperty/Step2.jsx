import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import postPropertyFormCondition from '@/content/JSON/postPropertyFormCondition'
import Loading from '@/pages/loading'
import processNearbyObject from '@/utils/OsmNearbyHelper/OsmClosestNearbyPlaces'
import getNearbyPlaces from '@/utils/OsmNearbyHelper/OsmNearbyPlaces'
import { capitalizeFirstLetter, formatIndianNumber } from '@/utils/utils'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import CityLookUpComponent from '../LookUpComponent/CityLookupComponent'
import LocalityLookUpComponent from '../LookUpComponent/LocalityLookup'
import PropertyLookUpComponent from '../LookUpComponent/Propertylookup'
import CustomModal from '../Modal/CustomModal'
import TooltipComponent from '../Tooltip'
import Amenities from './Amenities'
import styles from './PropertyDetails.module.css'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import StateLookupComponent from '../LookUpComponent/StateLookupComponent'
const OsmMapWithoutNearbyToggleTray = dynamic(
  () => import('@/components/OsmMapCard/OsmMapWithoutNearbyToggleTray'),
  { ssr: false }
)
const { stepTwoText, stepThreeText } = COMPONENTS.POST_PROPERTY_COMPO
const { text, propertyTypes, propertySubTypeMap } = GLOBALLY_COMMON_TEXT
export default function Step2({
  DATA,
  setDATA,
  trigger,
  setTrigger,
  listing,
  setListing,
  setPropertyDetails,
  setDeclarationOne,
  setDeclarationTwo,
}) {
  const [city, setCity] = useState()
  const [state, setState] = useState()
  const [propertyTitle, setPropertyTitle] = useState()
  const [locality, setLocality] = useState()

  const [cityLatitude, setCityLatitude] = useState(null)
  const [cityLongitude, setCityLongitude] = useState(null)
  const [selected, setSelected] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState(null)
  const [nearby, setNearby] = useState([])
  const [loader, setLoader] = useState(false)
  const handleCityChange = (cityName) => {
    const capitalizedCity = capitalizeFirstLetter(cityName)
    setCity(capitalizedCity)
  }
  const renderConditionalSelect = (
    label,
    value,
    onChangeFunc,
    options,
    defaultValue,
    tooltipText,
    isRequired = false
  ) => {
    if (!options || options.length === 0) {
      return null
    }
    return (
      <div className="w-45 mt-1 px-2">
        <label className={`${styles.property_label} flex gap-2`}>{label}
          {isRequired && <span className='text-primary'>*</span>}
          <TooltipComponent tooltipText={tooltipText} /></label>
        <select
          className="w-full border border-gray-600  rounded-md h-[30px] text-[0.875rem] focus:outline-none focus:border-primary my-1 text-gray-600"
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
  useEffect(() => {
    let updates = {}
    if (city) {
      updates.city = city
    }

    if (propertyTitle) {
      updates.propertyTitle = propertyTitle
    }
    if (locality) {
      updates.locality = locality
    }
    if (Object.keys(updates).length > 0) {
      setDATA((prevDATA) => ({
        ...prevDATA,
        ...updates,
      }))
    }
  }, [city, propertyTitle, locality])
  useEffect(() => {
    async function fetchData() {
      setLoader(true)
      const nearby = await getNearbyPlaces(DATA?.latitude, DATA?.longitude)
      setNearby(nearby)
      const nearArray = processNearbyObject(nearby)
      setDATA({
        ...DATA,
        nearbyPlaces: nearArray,
      })
      setLoader(false)
    }
    fetchData()
  }, [DATA?.latitude, DATA?.longitude])
  useEffect(() => {
    const { propertySubType, city, locality, totalFloors, builtDate, category, preleasedOrRented, ownershipType } =
      DATA || {}
    if (DATA?.listing === text.capitalizeSellText) {
      if (
        propertySubType === propertyTypes.apartmentText ||
        propertySubType === propertyTypes.houseOrVilla ||
        propertySubType === stepThreeText.builderFloorText ||
        propertySubType === propertyTypes.penthouseText ||
        propertySubType === propertyTypes.officeSpace ||
        propertySubType === propertyTypes.warehouseText ||
        propertySubType === propertyTypes.showroomText ||
        propertySubType === propertyTypes.shopText ||
        propertySubType === propertySubTypeMap?.serviceApartment ||
        propertySubType === propertySubTypeMap?.Shop ||
        propertySubType === propertySubTypeMap?.factory
      ) {
        if (
          city &&
          city != '' &&
          locality &&
          locality != '' &&
          totalFloors &&
          totalFloors != '' &&
          builtDate &&
          builtDate != ''
        ) {
          setPropertyDetails(true)
        } else {
          setPropertyDetails(false)
        }
      } else if (
        propertySubType === propertyTypes.plotText ||
        propertySubType === propertyTypes.commercialLandText ||
        propertySubType === propertySubTypeMap?.farmhouse ||
        propertySubType === propertySubTypeMap?.CommercialLand ||
        propertySubType === propertySubTypeMap?.Warehouse ||
        propertySubType === propertySubTypeMap.industrialShed ||
        propertySubType === propertySubTypeMap.agricultureFarmLand
      ) {
        if (city && city != '' && locality && locality != '') {
          setPropertyDetails(true)
        } else {
          setPropertyDetails(false)
        }
      }
      else if (propertySubType === propertySubTypeMap?.hospitality) {
        if (
          city &&
          city != '' &&
          locality &&
          locality != '' &&
          totalFloors &&
          totalFloors != '' &&
          builtDate &&
          builtDate != '' &&
          ownershipType &&
          ownershipType != '' &&
          preleasedOrRented &&
          preleasedOrRented != '' &&
          category &&
          category != ''
        ) {
          setPropertyDetails(true)
        } else {
          setPropertyDetails(false)
        }
      }
      else if (propertySubType === propertySubTypeMap?.manufacturing ||
        propertySubType === propertySubTypeMap.industrialBuilding
      ) {
        if (city &&
          city != '' &&
          locality &&
          locality != '' &&
          totalFloors &&
          totalFloors != '') {
          setPropertyDetails(true)
        }
        else { setPropertyDetails(false) }
      }
      else {
        setPropertyDetails(false)
      }
    }
    else if (DATA?.listing === text.capitalizeRentText) {
      if (
        propertySubType === propertyTypes.apartmentText ||
        propertySubType === propertyTypes.houseOrVilla ||
        propertySubType === stepThreeText.builderFloorText ||
        propertySubType === propertyTypes.penthouseText ||
        propertySubType === propertyTypes.officeSpace ||
        propertySubType === propertyTypes.warehouseText ||
        propertySubType === propertyTypes.showroomText ||
        propertySubType === propertyTypes.shopText ||
        propertySubType === propertySubTypeMap.factory
      ) {
        if (
          city &&
          city != '' &&
          locality &&
          locality != '' &&
          totalFloors &&
          totalFloors != '' &&
          builtDate &&
          builtDate != ''
        ) {
          setPropertyDetails(true)
        } else {
          setPropertyDetails(false)
        }
      }
      else if (propertySubType === propertySubTypeMap.industrialBuilding
      ) {
        if (city && city != '' &&
          locality && locality != ''
          && totalFloors && totalFloors != '') {
          setPropertyDetails(true)
        }
        else {
          setPropertyDetails(false)
        }
      }
      else if (
        propertySubType === propertyTypes.plotText ||
        propertySubType === propertyTypes.commercialLandText ||
        propertySubType === propertySubTypeMap?.Warehouse ||
        propertySubType === propertySubTypeMap.CommercialLand ||
        propertySubType === propertySubTypeMap.industrialShed
      ) {
        if (city && city != '' && locality && locality != '') {
          setPropertyDetails(true)
        } else {
          setPropertyDetails(false)
        }
      }
      else if (propertySubType === propertyTypes.pgText ||
        propertySubType === propertySubTypeMap.manufacturing ||
        propertySubType === propertySubTypeMap.farmhouse

      ) {
        if (city && city != '' && locality && locality != '') {
          setPropertyDetails(true)
        }
      }

    } else {
      setPropertyDetails(false)
    }


  }, [DATA, setDATA])

  useEffect(() => {
    setDeclarationOne(true)
    setDeclarationTwo(true)
  }, [])

  const handleModalOpen = (type) => {
    setModalContentType(type)
    setModalOpen(true)
  }

  const handleModalInput = (value) => {
    if (modalContentType === 'city') {
      setCity(value)
    } else if (modalContentType === 'property') {
      setPropertyTitle(value)
    } else if (modalContentType === 'locality') {
      setLocality(value)
    } else if (modalContentType === 'state') {
      setState(value)
    }
  }


  return (
    <div className="bg-white px-[38px] ">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3  px-2 ">
          <label className={`${styles.property_label}`}>
            {stepTwoText.locationAndBuilding}
          </label>
          <span className="text-red-500 ml-[2px]">*</span>
          <br />
          <PropertyLookUpComponent
            setState={setState}
            setPropertyTitle={setPropertyTitle}
            setLocality={setLocality}
            setLocalitySelected={setSelected}
            setModalOpen={() => handleModalOpen('property')}
            DATA={DATA}
            setLoader={setLoader}
            Loader={loader}
            city={city}
            setDATA={setDATA}
            propertyTitle={propertyTitle}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 ">
          <label className={`${styles.property_label}`}>
            {stepTwoText.localityName}
          </label>
          <span className="text-red-500  ml-[2px]">*</span>
          <br />
          <LocalityLookUpComponent
            setLocality={setLocality}
            setModalOpen={() => handleModalOpen('locality')}
            locality={locality}
            setSelected={setSelected}
            state={state}
            DATA={DATA}
            setDATA={setDATA}
            city={city}
            cssClass="w-[240px]"
            dropdownWidth="w-[240px]"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 ">
          <label className={`${styles.property_label} `}>
            {stepTwoText.cityNameText}
          </label>
          <span className="text-red-500  ml-[2px]">*</span>
          <br />
          <CityLookUpComponent
            setCity={handleCityChange}
            setLocality={setLocality}
            setState={setState}
            setPropertyTitle={setPropertyTitle}
            setModalOpen={() => handleModalOpen('city')}
            city={city}
            DATA={DATA}
            setDATA={setDATA}
            cssClass="w-[240px]"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 ">
          <label className={`${styles.property_label}`}>
            {stepTwoText.stateName}
          </label>
          <span className="text-red-500  ml-[2px]">*</span>
          <br />

          <StateLookupComponent
            setState={setState}
            setModalOpen={() => handleModalOpen('state')}
            state={state}
            DATA={DATA}
            setDATA={setDATA}
            cssClass="w-[240px]"
            dropdownWidth="w-[240px]"


          />
        </div>
      </div>
      {modalOpen && (
        <CustomModal
          closeModal={() => setModalOpen(false)}
          onInput={handleModalInput}
          modalContentType={modalContentType}
          DATA={DATA}
          setLocality={setLocality}
          setDATA={setDATA}
          setCityLatitude={setCityLatitude}
          setCityLongitude={setCityLongitude}
          city={city}
          setCity={setCity}
        />
      )}
      <div className=" my-1 flex">
        <label className={`${styles.property_label}  pl-2`}>
          {stepTwoText.nearbyMapPreview}
        </label>
        <TooltipComponent tooltipText="This is the nearby map preview, based on the location provided by you" />
      </div>
      <div className="px-2">
        <OsmMapWithoutNearbyToggleTray
          height={200}
          localityLat={DATA?.latitude || cityLatitude}
          localityLng={DATA?.longitude || cityLongitude}
          property={DATA?.propertyTitle}
          nearby={nearby}
        />
      </div>
      {!loader ? (
        <div className="mt-0 flex flex-wrap">
          {postPropertyFormCondition[DATA?.listing]?.[
            trigger
          ]?.hiddenInput?.map((inputField, index) => {
            let isInputDisplayed = ['totalFloors', 'builtDate'].includes(inputField.name)
            return (
              isInputDisplayed && (
                <div
                  className="w-full md:w-1/2 lg:w-1/3 px-2 mt-8"
                  key={index}
                >
                  <div className="flex">
                    <label
                      className={`${styles.property_label}  mr-1`}
                    >
                      {inputField.label}
                    </label>
                    <span className="text-red-500 ">*</span>
                    <div>
                      <TooltipComponent tooltipText={inputField.tooltipText} />
                    </div>
                  </div>
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
                      className="w-full h-[30px] border border-gray-600 p-[6px] rounded-md  mb-3 focus:outline-primary"
                      key={inputField.id}
                      type="text"
                      name={inputField.name}
                      placeholder={inputField.placeholder}
                      value={
                        inputField.type === 'number'
                          ? formatIndianNumber(DATA[inputField.name])
                          : DATA[inputField.name]
                      }
                      required={inputField.required}
                      maxLength={inputField.maxLength} // Set the maximum length
                      style={{ width: `${inputField.width}px` }}
                      onChange={(event) => {
                        const inputValue = event.target.value.replace(/,/g, '')
                        if (!isNaN(inputValue)) {
                          setDATA({
                            ...DATA,
                            [event.target.name]: inputValue,
                          })
                        }
                      }}
                    />
                  )}
                </div>
              )
            )
          })}
          {postPropertyFormCondition[DATA?.listing]?.[
            trigger
          ]?.nonHiddenInput.map((inputField, index) => {
            const isInputDisplayed = ['totalFloors', 'builtDate'].includes(
              inputField.name
            )
            return (
              isInputDisplayed && (
                <div
                  className="  w-full md:w-1/2 lg:w-1/3 px-2 mt-4"
                  key={index}
                >
                  <div className="flex ">
                    <label
                      className={`${styles.property_label} mr-1 mb-1`}
                    >
                      {inputField.label}
                    </label>
                    <span className="text-red-500">*</span>
                    <div>
                      <TooltipComponent tooltipText={inputField.tooltipText} />
                    </div>
                  </div>

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
                              ? newValue?.toISOString()
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
                      className="w-full h-[30px] border border-gray-600 p-[6px] rounded-md  mb-3 focus:outline-primary"
                      key={inputField.id}
                      type="text"
                      name={inputField.name}
                      placeholder={inputField.placeholder}
                      value={
                        inputField.type === 'number'
                          ? formatIndianNumber(DATA[inputField.name])
                          : DATA[inputField.name]
                      }
                      required={inputField.required}
                      maxLength={inputField.maxLength} // Set the maximum length
                      style={{ width: `${inputField.width}px` }}
                      onChange={(event) => {
                        const inputValue = event.target.value.replace(/,/g, '')
                        if (!isNaN(inputValue)) {
                          setDATA({
                            ...DATA,
                            [event.target.name]: inputValue,
                          })
                        }
                      }}
                    />
                  )}
                </div>
              )
            )
          })}

          <div className='mt-2'>
            {postPropertyFormCondition[DATA?.listing]?.[trigger]?.locatedInside &&
              renderConditionalSelect(
                'Located Inside',
                DATA.locatedInside,
                (value) => {
                  setDATA({
                    ...DATA,
                    locatedInside: value,
                  })
                },
                postPropertyFormCondition[DATA?.listing]?.[trigger].locatedInside,
                'Select Location',
                'Where is the property located like inside Resdential project, Mall etc.'
              )}
          </div>

          <div className='flex flex-wrap justify-start gap-4 py-2'>
            <div className='mt-2'>
              {postPropertyFormCondition[DATA?.listing]?.[trigger]?.category &&
                renderConditionalSelect(
                  'Category',
                  DATA.category,
                  (value) => {
                    setDATA({
                      ...DATA,
                      category: value,
                    })
                  },
                  postPropertyFormCondition[DATA?.listing]?.[trigger].category,
                  'Select category',
                  'Kindly select the catagory under which the property falls in.',
                  true
                )}
            </div>

            <div className='mt-2'>
              {postPropertyFormCondition[DATA?.listing]?.[trigger]?.ownershipType &&
                renderConditionalSelect(
                  'Ownership type',
                  DATA.ownershipType,
                  (value) => {
                    setDATA({
                      ...DATA,
                      ownershipType: value,
                    })
                  },
                  postPropertyFormCondition[DATA?.listing]?.[trigger].ownershipType,
                  'Select ownership type',
                  'Discribe the ownership type of the property.',
                  true
                )}
            </div>

            <div className='mt-2'>
              {postPropertyFormCondition[DATA?.listing]?.[trigger]?.preleasedOrRented &&
                renderConditionalSelect(
                  'Is it Preleased or rented',
                  DATA.preleasedOrRented,
                  (value) => {
                    setDATA({
                      ...DATA,
                      preleasedOrRented: value,
                    })
                  },
                  postPropertyFormCondition[DATA?.listing]?.[trigger].preleasedOrRented,
                  'Select "Yes" or "No"',
                  'If the property is leased or rented than select "Yes" if not please select "No"',
                  true
                )}
            </div>
          </div>

          {DATA.propertySubType != propertyTypes.plotText &&
            DATA.propertySubType != propertyTypes.commercialLandText && DATA.propertySubType != propertySubTypeMap?.manufacturing && DATA.propertySubType != propertySubTypeMap?.Warehouse && DATA.propertySubType != propertySubTypeMap?.agricultureFarmLand && (
              <div className=" flex flex-col gap-2 w-full mt-3 ml-2">
                <label className={`${styles.property_label}`}>
                  {text.amenitiesText}
                </label>
                <Amenities
                  DATA={DATA}
                  setDATA={setDATA}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  listing={listing}
                  setListing={setListing}
                />
              </div>
            )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}
