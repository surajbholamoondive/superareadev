import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { PUT_REQ } from '@/text'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import initializeGoogleMaps from '@/utils/googleMapsLoader'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'

import closeIcon from '../../../assets/ButtonIcons/newbackButton.svg'

const { symbols, text } = GLOBALLY_COMMON_TEXT

const EditLatLong = ({
  isOpen,
  onClose,
  setProjectData,
  isNotInList,
  setIsNotInList,
  propertyId,
}) => {
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const geocoderRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

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
    }
  }, [isOpen, setIsNotInList])
  const updatePropertyLocation = async (addressInfo) => {
    try {
      setIsLoading(true)
      const response = await makeApiRequest(
        PUT_REQ,
        `property/update-location/${propertyId}`,
        {
          locality: addressInfo.sublocality,
          city: addressInfo.locality,
          state: addressInfo.state,
          coordinates: [addressInfo.latitude, addressInfo.longitude],
        }
      )

      if (response?.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage)
        setProjectData((prevData) => ({
          ...prevData,
          locality: addressInfo.sublocality,
          city: addressInfo.locality,
          state: addressInfo.state,
          coordinates: [addressInfo.latitude, addressInfo.longitude],
        }))
        onClose()
      } else {
        toast.error(response?.data?.responseMessage)
      }
    } catch (error) {
      toast.error(response?.data?.responseMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLatLngSubmit = () => {
    if (!latitude) {
      toast.error(text.latitudeToast)
      return
    }
    if (!longitude) {
      toast.error(text.longitudeToast)
      return
    }
    if (!geocoderRef.current) {
      toast.error(text.mapServiceNotInitialized)
      return
    }

    const latLng = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    }
    geocoderRef.current.geocode({ location: latLng }, (results, status) => {
      const place = results[0]
      const addressInfo = {
        locality: '',
        sublocality: '',
        city: '',
        state: '',
        latitude: latLng.lat,
        longitude: latLng.lng,
      }

      var subLocalityAddress = ''
      place.address_components.forEach((component) => {
        const types = component.types
        if (types.includes('neighborhood')) {
          subLocalityAddress = component.long_name
        }
        if (types.includes('sublocality')) {
          if (subLocalityAddress) {
            addressInfo.sublocality =
              subLocalityAddress + ',' + component.long_name
          } else {
            addressInfo.sublocality = component.long_name
          }
        } else if (types.includes('locality')) {
          addressInfo.locality = component.long_name
        } else if (types.includes('administrative_area_level_1')) {
          addressInfo.state = component.long_name
        }
      })
      updatePropertyLocation(addressInfo)
    })
  }

  const handleClose = () => {
    setLatitude('')
    setLongitude('')
    setIsNotInList(false)
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[9999] rounded-lg">
          <div className="bg-red-200 rounded-lg flex flex-col w-[90%]  px-3 md:w-[60%] lg:w-[40%] min-w-[280px] max-w-[600px] h-auto min-h-[240px] max-h-[80vh] overflow-hidden shadow-2xl mx-auto relative">
            <Image
              src={closeIcon}
              width={30}
              height={30}
              className="absolute top-2 right-2 text-secondary"
              onClick={handleClose}
              alt="close"
            />

            <div className="flex flex-col justify-between h-full my-auto">
              <div className="flex  justify-center items-center">
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 px-7 w-full">
                  <div>
                    <label className=" block mb-1">
                      {text.latitudeText}
                      <span className="text-red-500 ml-1">
                        {symbols.asterisk}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-[200px] h-[35px] border border-gray-600 rounded px-2 bg-transparent focus:outline-none focus:border-gray-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1">
                      {text.longitudeText}
                      <span className="text-red-500 ml-1">
                        {symbols.asterisk}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-[200px] h-[35px] border border-gray-600 rounded px-2 bg-transparent focus:outline-none focus:border-gray-600"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mb-4 mt-6">
                <button
                  onClick={handleLatLngSubmit}
                  className="bg-primary text-white items-center px-4 py-1 rounded w-fit"
                >
                  {text.submitCoordinates}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default EditLatLong
