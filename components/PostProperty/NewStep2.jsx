import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Loading from '@/pages/loading'
import processNearbyObject from '@/utils/OsmNearbyHelper/OsmClosestNearbyPlaces'
import getNearbyPlaces from '@/utils/OsmNearbyHelper/OsmNearbyPlaces'
import { capitalizeFirstLetter } from '@/utils/utils'
import { postPropertyMap } from "../../content/JSON/PostPropertyMap"
import CityLookUpComponent from '../LookUpComponent/CityLookupComponent'
import LocalityLookUpComponent from '../LookUpComponent/LocalityLookup'
import PropertyLookUpComponent from '../LookUpComponent/Propertylookup'
import CustomModal from '../Modal/CustomModal'
import TooltipComponent from '../Tooltip'
import Amenities from './Amenities'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import StateLookupComponent from '../LookUpComponent/StateLookupComponent'
const OsmMapWithoutNearbyToggleTray = dynamic(
  () => import('@/components/OsmMapCard/OsmMapWithoutNearbyToggleTray'),
  { ssr: false }
)
const { stepTwoText, stepThreeText } = COMPONENTS.POST_PROPERTY_COMPO
const { text, propertyTypes, propertySubTypeMap } = GLOBALLY_COMMON_TEXT

export default function NewStep2({ DATA, setDATA, setDeclarationOne, setDeclarationTwo, setReraApproved, isReraApproved, isPreleasedOrRented, setPreleasedOrRented, setSelectDropdown,setLocationVarified,loader,
  setLoader  }) {
  const [city, setCity] = useState()
  const [state, setState] = useState(DATA?.state || '')
  const [propertyTitle, setPropertyTitle] = useState(DATA?.propertyTitle || '')
  const [locality, setLocality] = useState()
  const [subLocality, setSubLocality] = useState(DATA?.subLocality || '')
  const [cityLatitude, setCityLatitude] = useState(null)
  const [cityLongitude, setCityLongitude] = useState(null)
  const [selected, setSelected] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContentType, setModalContentType] = useState(null)
  const [nearby, setNearby] = useState([])
  // const [loader, setLoader] = useState(false)
  
  const handleCityChange = (cityName) => {
    const capitalizedCity = capitalizeFirstLetter(cityName)
    setCity(capitalizedCity)
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
    setDeclarationOne(true)
    setDeclarationTwo(true)
  }, [city, propertyTitle, locality])

  const updatePropertyData = (key, value) => {
    setDATA(prev => ({
      ...prev,
      [key]: value
    }))
  }
  const renderInputFields = (label, name, type, required = false, index) => {
    return (
      type === 'month' ? (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
          <input
            type="month"
            value={DATA[name] ? new Date(DATA[name]).toISOString().slice(0, 7) : ''}
            min="1990-01"
            max="2023-12"
            onChange={(e) => {
              setDATA({
                ...DATA,
                [name]: e.target.value ? new Date(e.target.value).toISOString() : '',
              });
            }}
            className="border border-gray-500 rounded-md px-2 py-2 h-[30px] w-[180px]"
          />
        </div>
      ) : type === 'number' ? (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label>
            {label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="number"
            value={DATA[name] ?? ''}
            onChange={(e) => updatePropertyData(name, e.target.value)}
            className="border border-gray-500 rounded-md px-2 py-2 h-[30px] w-[180px]"
          />
        </div>
      ) : label === 'Rera Number' ? (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label>
            {label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            value={DATA[name] ?? ''}
            onChange={(e) => updatePropertyData(name, e.target.value)}
            className="border border-gray-500 rounded-md px-2 py-2 h-[30px] w-[180px]"
          />
        </div>
      ) : (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label>
            {label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            value={DATA[name] ?? ''}
            onChange={(e) => updatePropertyData(name, e.target.value)}
            className="border border-gray-500 rounded-md px-2 py-2 w-[180px] h-[29px]"
          />
        </div>
      )
    );
  }

  const renderButtons = (buttons, title, onPress, category) => {
    if (!buttons || buttons.length === 0) {
      return null;
    }
    return (
      <div>
        <div className="flex flex-row mb-1">
          <label className="font-medium">{title}</label>
        </div>
        <div className="flex flex-row gap-3 flex-wrap mb-2">
          {buttons.map((button) => {
            const isButtonActive = DATA[category] === button;
            return (
              <button
                className={`flex flex-row items-center text-center justify-center px-4 py-1 rounded-full ${isButtonActive
                    ? 'bg-primary text-white'
                    : 'border border-newBackground  text-gray-600'
                  }`}
                key={button}
                onClick={() => onPress(category, button)}
              >
                <span className="text-base">{button}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
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

  useEffect(() => { 
    if (DATA?.latitude) {
      async function fetchData() {
        setLoader(true)
        const nearby = await getNearbyPlaces(DATA?.latitude, DATA?.longitude)
        setNearby(nearby)
        const nearArray = processNearbyObject(nearby)
        setDATA({
          ...DATA,
          nearbyPlaces: nearArray,
        })
        setLocationVarified(true)
        setLoader(false)
      }
      fetchData()
    }
  }, [DATA?.latitude, DATA?.longitude])

  const handleSublocalityChange = (e) => {
    setSubLocality(e.target.value)
    setDATA({ ...DATA, subLocality: e.target.value })
  }  



  return (
    <div className="bg-white px-[38px] ">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 lg:w-1/3  px-2 ">
          <label className='text-left'>
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
            setSelectDropdown={setSelectDropdown}
            setLoader={setLoader}
            Loader={loader}
            city={city}
            setDATA={setDATA}
            propertyTitle={propertyTitle}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 ">
          <label className='text-left'>
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
          <label className='text-left'>
            {stepTwoText.subLocalityName}
          </label>
          <br />
          {/* <LocalityLookUpComponent
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
                /> */}
          <input
            type="text"
            //we are setting the value of the input field by a state variable that has been passed by a prop
            //and now we will control the state using the set funciton for the same state variable that has been passed as a prop
            value={subLocality}
            spellCheck="false"
            onChange={handleSublocalityChange}
            className={`border border-gray-600 w-[240px]  rounded-md px-1 py-2 h-[30px] focus:outline-none focus:border-primary`}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 px-2 ]">
          <label className='text-left'>
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
        <div className="w-full md:w-1/2 lg:w-1/3 px-2">
          <label className='text-left'>
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
          setSelectDropdown={setSelectDropdown}
          setPropertyTitle={setPropertyTitle}
          propertyTitle={propertyTitle}
          setLocality={setLocality}
          setDATA={setDATA}
          setCityLatitude={setCityLatitude}
          setCityLongitude={setCityLongitude}
          city={city}
          setCity={setCity}
        />
      )}
      <div className=" my-1 flex">
        <label className='text-left'>
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
        <div>
          <div className="mt-0 flex flex-wrap">
            {postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs?.stepTwoInput && (
              postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs?.stepTwoInput?.map((obj, index) => (
                renderInputFields(obj?.field?.label, obj?.field?.name, obj?.field?.type, obj?.required, index)
              ))
            )
            }
          </div>
          {/* {
                        postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.category && (
                        renderButtons(postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.category?.list,
                        'Cateory',
                        (category, value) => {
                        setDATA((prev) => {
                        return {
                            ...prev,
                            [category]: value
                        }
                        })
                    },
                            'category'
                            )
                        )
                     } */}
          {/* {
                        postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.ownershipType && (
                        renderButtons(postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.ownershipType?.list,
                        'Ownership Type',
                            (category, value) => {
                                setDATA((prev) => {
                                return {
                                    ...prev,
                                    [category]: value
                                }
                                })
                            },
                            'ownershipType'
                            )
                        )
                     } */}
          {/* {
                        postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.preLeasedOrRented && (
                            renderButtons(postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.preLeasedOrRented?.list,
                            'PreLeased Or Rented',
                            (category, value) => {
                                setPreleasedOrRented(value==='Yes' ? true:false)
                                setDATA((prev) => {
                                return {
                                    ...prev,
                                    [category]: value
                                }
                                })
                            },
                            'preLeasedOrRented'
                            )
                        )
                     }
                     {
                        isPreleasedOrRented && (
                            <div className='flex'> 
                            {
                                 postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs && (
                                    postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs?.rentedOrLeasedStepTwoInputField.map((obj, index) => (
                                    renderInputFields(obj?.field?.label, obj?.field?.name, obj?.field?.type, index)
                                    ))
                                )
                            }
                            </div>
                        )
                     }
                     {
                        postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.reraApproved && (
                            renderButtons(postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.reraApproved?.list,
                            'Rera Approved',
                            (category, value) => {
                                setReraApproved(value==='Yes'? true:false)
                                setDATA((prev) => {
                                return {
                                    ...prev,
                                    [category]: value
                                }
                                })
                            },
                            'reraApproved'
                            )
                        )
                     }
                     {
                        isReraApproved && (
                        postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs && (
                            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs?.reraApprovedInput.map((obj, index) => (
                            renderInputFields(obj?.field?.label, obj?.field?.name, obj?.field?.type, index)
                            ))
                        )
                        )
                     } */}
          {
            !postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.noBuildingAmenities && (
              <div className=" flex flex-col gap-2 w-full mt-3 ml-2">
                <label className='text-left text-primary'>
                  {text.amenitiesText}
                </label>
                <Amenities
                  DATA={DATA}
                  setDATA={setDATA}
                />
              </div>
            )
          }
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}