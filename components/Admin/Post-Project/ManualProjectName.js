import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  ADMIN_DIRECT_LISTINGS_TEXT,
  COMPONENTS,
  GLOBALLY_COMMON_TEXT,
} from '@/textV2'
import initializeGoogleMaps from '@/utils/googleMapsLoader'
import { toast } from 'react-toastify'

import MDLabelAndInput from '@/components/MDLabelAndInput'

import CloseIcon from '../../../assets/ButtonIcons/newbackButton.svg'

const MapSelectionView = dynamic(
  () => import('@/components/Admin/Post-Project/MapSelectionView'),
  { ssr: false }
)

const { symbols, text } = GLOBALLY_COMMON_TEXT
const { ok } = ADMIN_DIRECT_LISTINGS_TEXT.text
const { projectBuildingText, latitudeText, longitudeText } = text

const ManualProjectName = ({
  setSelectDropdown,
  inputValue,
  projectData,
  isOpen,
  onClose,
  setProjectData,
  onFormSubmit,
  isNotInList,
  setIsNotInList,
  setDraftData,
}) => {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [isMapViewOpen, setIsMapViewOpen] = useState(false)
  const geocoderRef = useRef(null)
  const { POST_PROJECT_COMPO } = COMPONENTS
  const { stepOneText } = POST_PROJECT_COMPO

  useEffect(() => {
    const initGeocoder = async () => {
      if (!geocoderRef.current) {
        geocoderRef.current = await initializeGoogleMaps()
      }
    }
    initGeocoder()
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setLatitude('')
      setLongitude('')
      setIsNotInList(false)
      setIsMapViewOpen(false)
    }
  }, [isOpen, setIsNotInList])

  const handleDeveloperDetailChange = (keyName, value) => {
    setProjectData({
      ...projectData,
      [keyName]: value,
    })
  }

  const handleLatLngSubmit = () => {
    if (!latitude) {
      toast.error(stepOneText.latitudeError)
      return
    }
    if (!longitude) {
      toast.error(stepOneText.longitudeError)
      return
    }
    if (!geocoderRef.current) {
      toast.error(stepOneText.mapServiceError)
      return
    }

    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)

    // Basic range validation
    if (lat < -90 || lat > 90) {
      toast.error('Latitude must be between -90 and 90')
      return
    }
    if (lng < -180 || lng > 180) {
      toast.error('Longitude must be between -180 and 180')
      return
    }

    const latLng = { lat, lng }

    geocoderRef.current.geocode({ location: latLng }, (results, status) => {
      if (status === ok && results.length > 0) {
        const place = results[0]
        const addressInfo = {
          locality: '',
          sublocality: '',
          city: '',
          state: '',
          latitude: latLng.lat,
          longitude: latLng.lng,
        }

        let subLocalityAddress = ''
        place.address_components.forEach((component) => {
          const types = component.types
          if (types.includes('neighborhood')) {
            subLocalityAddress = component.long_name
          }
          if (types.includes('sublocality')) {
            addressInfo.sublocality = subLocalityAddress
              ? `${subLocalityAddress}, ${component.long_name}`
              : component.long_name
          } else if (types.includes('locality')) {
            addressInfo.locality = component.long_name
          } else if (types.includes('administrative_area_level_1')) {
            addressInfo.state = component.long_name
          }
        })

        setProjectData((prevData) => ({
          ...prevData,
          locality: addressInfo.sublocality,
          city: addressInfo.locality,
          state: addressInfo.state,
          coordinates: [addressInfo.latitude, addressInfo.longitude],
          projectTitle:
            inputValue || place.formatted_address.split(',')[0].trim(),
        }))
        setSelectDropdown(true)
        setIsNotInList(false)
        setLatitude('')
        setLongitude('')
        onClose()
      }
    })
  }

  const handleMapSelection = (addressInfo) => {
    setProjectData((prevData) => ({
      ...prevData,
      locality: addressInfo.sublocality,
      city: addressInfo.locality,
      state: addressInfo.state,
      coordinates: [addressInfo.latitude, addressInfo.longitude],
      projectTitle:
        addressInfo.projectTitle || inputValue || projectData?.projectTitle,
    }))
    setSelectDropdown(true)
    setIsNotInList(false)
    setIsMapViewOpen(false)
    onClose()
  }

  const handleClose = () => {
    setLatitude('')
    setLongitude('')
    setIsNotInList(false)
    setIsMapViewOpen(false)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[9999]">
          <div className="bg-white rounded-lg flex flex-col w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] min-w-[280px] max-w-[600px] max-h-[80vh] overflow-y-auto shadow-2xl relative">
            {/* Close button */}
            <Image
              src={CloseIcon}
              width={30}
              height={30}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={handleClose}
              alt="close"
            />

            {/* Project Name */}
            <div className="mt-6 px-6">
              <MDLabelAndInput
                label={projectBuildingText}
                labelClass="text-headingColor"
                inputType="text"
                isRequired={true}
                cssClass="w-full h-[38px]"
                inputState={inputValue || projectData?.projectTitle}
                onChangeFunction={(value) =>
                  handleDeveloperDetailChange('projectTitle', value)
                }
              />
            </div>

            {/* Lat / Lng fields */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-7 mt-4 px-6">
              <div className="flex items-center w-full sm:w-auto">
                <label className="mr-2 text-headingColor">
                  {latitudeText}
                  <span className="text-red-500 ml-1">{symbols.asterisk}</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => {
                    const val = e.target.value
                    if (/^-?\d*\.?\d*$/.test(val)) setLatitude(val)
                  }}
                  className="w-full sm:w-[120px] h-[35px] border border-gray-300 rounded px-2"
                  required
                />
              </div>

              <div className="flex items-center w-full sm:w-auto">
                <label className="mr-2 text-headingColor">
                  {longitudeText}
                  <span className="text-red-500 ml-1">{symbols.asterisk}</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => {
                    const val = e.target.value
                    if (/^-?\d*\.?\d*$/.test(val)) setLongitude(val)
                  }}
                  className="w-full sm:w-[120px] h-[35px] border border-gray-300 rounded px-2"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4 mb-6 px-6">
              <button
                onClick={handleLatLngSubmit}
                className="bg-primary text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                {stepOneText.submitCoordinates}
              </button>
              <button
                onClick={() => setIsMapViewOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Select on Map
              </button>
            </div>
          </div>
        </div>
      )}

      {isMapViewOpen && (
        <MapSelectionView
          onSelectLocation={handleMapSelection}
          onClose={() => setIsMapViewOpen(false)}
        />
      )}
    </>
  )
}

export default ManualProjectName
