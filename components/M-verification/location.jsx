import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import {
  DONE,
  GEOLOCATION_ERROR_TEXT,
  INITIATE_LOCATION_CHECK,
  LOADING,
  LOCATION_CHECK_HEADING_TEXT,
  LOCATION_CHECK_TEXT,
  LOCATION_GETHERING,
  LOCATION_VERIFICATION_TEXT_KM,
  LOCATION_VERIFICATION_TEXT_KM_RANGE,
  PROPERTY_VERIFIED_ROUTE,
  PUT_REQ,
  SECONDS_TEXT,
} from '@/text'
import { NOTIFICATION_TYPE } from "@/textV2"
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'

import Modal from '@/components/popupModal/modal'

import { useNotification } from '@/context/notificationContext'
const OsmMap = dynamic(() => import('@/components/OsmMapCard/OsmMap'), {
  ssr: false,
})

const Location = ({
  onClose,
  property,
  setShowLocationModal,
  setData,
  onLocationVerified,
  userType,
  presentOnLocation,
}) => {
  const [userLocation, setUserLocation] = useState(null)
  const [locationName, setLocationName] = useState('')
  const [locationVerifiedOutsideRange, setLocationVerifiedOutsideRange] =
    useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [distance, setDistance] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [fetchTimeout, setFetchTimeout] = useState(false)
  const router = useRouter()
  const [auth, setAuth] = useAuth()
  const { storeNotification } = useNotification()

  const verifyLocation = async (verificationData) => {
    try {
      const response = await makeApiRequest(
        PUT_REQ,
        `${PROPERTY_VERIFIED_ROUTE}${property?._id}`,
        verificationData
      )


      if (response !== undefined) {
        setIsVerified(true)
      }
      if (response.status === 200) {
        try {
          const locationVerificationStatus = auth?.userResult?._id == response.data.result.result.assignedTo ?
            response?.data?.result?.result?.mVerificationDetails?.agentLocationVerification
              .isLocationVerified :
            response?.data?.result?.result?.mVerificationDetails?.userLocationVerification
              ?.isLocationVerified
          storeNotification({
            userId: auth.userResult._id,
            propertyId: property._id,
            locationVerificationStatus:locationVerificationStatus,
            notificationType: NOTIFICATION_TYPE.S_VERIFICATION,
            subNotificationType: "LOCATION_VERIFICATION"
          })
        } catch (err) {
          console.error("error while sending notification in location", err)
        }
        setData(response?.data?.result?.result)
        onLocationVerified(property._id)

      }
    } catch (error) {
      toast.error(error)
    }
  }
  const checkLocation = () => {
    if (!navigator.geolocation) {
      toast.error(GEOLOCATION_ERROR_TEXT)
      return
    }
    setIsFetching(true)
    const options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0,
    }
    let locationReadings = []
    const locationWatchId = navigator.geolocation.watchPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        locationReadings.push(currentLocation)
        if (locationReadings.length === 2) {
          navigator.geolocation.clearWatch(locationWatchId)
          const averageLocation = averageLocations(locationReadings)
          setIsFetching(false)
          compareLocations(averageLocation)
        }
      },
      (error) => {
        toast.error(error.message)
        setIsFetching(false)
      },
      options
    )
    setLocationVerifiedOutsideRange(false)
  }
  const averageLocations = (locations) => {
    const sumLocation = locations.reduce(
      (acc, loc) => {
        return {
          latitude: acc.latitude + loc.latitude,
          longitude: acc.longitude + loc.longitude,
        }
      },
      { latitude: 0, longitude: 0 }
    )
    return {
      latitude: sumLocation.latitude / locations.length,
      longitude: sumLocation.longitude / locations.length,
    }
  }
  const compareLocations = async (userLocation) => {
    setUserLocation(userLocation);
    const location = await getLocationName(userLocation.latitude, userLocation.longitude);
    setLocationName(location);

    const propertyLocation = {
      latitude: property.coordinates[0],
      longitude: property.coordinates[1],
    };

    const distance = getDistanceFromLatLonInKm(
      propertyLocation.latitude,
      propertyLocation.longitude,
      userLocation.latitude,
      userLocation.longitude
    );
    setDistance(distance);

    const distanceThreshold = 100;
    const isAgent = auth?.userResult?.userType === 'Agent';

    // Check if the location is within the acceptable distance range
    const isLocationVerified = distance <= distanceThreshold;

    const verificationData = {
      isAgent,
      coordinates: [userLocation.latitude, userLocation.longitude],
      locationName: location,
      isLocationVerified,  // Pass the verification flag to the backend
    };

    if (isLocationVerified) {
      setLocationVerifiedOutsideRange(false);
    } else {
      setLocationVerifiedOutsideRange(true);
    }

    await verifyLocation(verificationData); // Call API with verification data
    setIsFetching(false);
    setFetchTimeout(false);
  };

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  const handleClose = () => {
    setShowLocationModal(false)
    onClose()
  }
  const handleStart = () => {
    //router.reload()
    onClose()
  }

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      )
      const data = await response.json()

      if (data.address) {
        const locality =
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.village ||
          data.address.town ||
          data.address.city ||
          'Unknown location'
        return locality
      } else {
        return 'Unknown location'
      }
    } catch (error) {
      console.error('Error fetching location name:', error)
      return 'Unknown location'
    }
  }
  const roundedDistance = Math.round(distance)
  const valueDistance = ` ${roundedDistance} km from the location.`
  const Location = `${locationName}. (Lat. ${userLocation?.latitude?.toFixed(2)}, Long. ${userLocation?.longitude?.toFixed(2)}),`


  return (
    <Modal
      isOpen={true}
      showCloseIcon={!locationVerifiedOutsideRange}
      onClose={onClose}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center ',
        modalWidth: 'w-[80%]',
        modalHeight: 'h-[90%]',
        childrenPaddings: 'p-9 max-sm:p-4',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
      }}
    >
      <div className="flex justify-center ">
        <div className="text-center text-black text-lg font-semibold leading-[30px]">
          {LOCATION_CHECK_HEADING_TEXT}
        </div>
      </div>
      <div className="flex justify-center px-12 max-md:px-2">
        <div className="text-black text-sm">{userType === presentOnLocation ? LOCATION_CHECK_TEXT : 'Please Share your current location'}</div>

      </div>

      <div className="mt-5">
        <OsmMap
          lat={userLocation?.latitude}
          lng={userLocation?.longitude}
          height={200}
          width={'100%'}
        />
      </div>

      {isFetching && (
        <div className=" flex justify-center mt-3">
          <p>
            {LOCATION_GETHERING},{SECONDS_TEXT}
          </p>
        </div>
      )}
      <div className="flex justify-center">
        {userLocation && isVerified !== undefined && (
          <div className="mt-3">
            <div className="flex justify-center">
              {locationVerifiedOutsideRange ? (
                <div className="max-w-[405px] py-1 bg-yellow-300 bg-opacity-5 rounded max-sm:max-w-[300px] max-sm:mt-2">
                  <div className="text-center text-yellow-700 text-base font-medium  leading-[20.95px]">
                    {userType === presentOnLocation
                      ? LOCATION_VERIFICATION_TEXT_KM
                      : "Your location is captured, please continue"}
                  </div>
                </div>
              ) : (
                <div className="max-w-[405px] py-1 bg-red-300 bg-opacity-5 rounded max-sm:max-w-[300px] max-sm:mt-2">
                  <div className="text-center text-green-700 text-base font-medium  leading-[20.95px]">
                    {LOCATION_VERIFICATION_TEXT_KM_RANGE}
                  </div>
                </div>
              )}
            </div>
            <>
              <p className='text-center'>
                {Location}
              </p>
              {distance !== null && (
                <p className='text-center'>
                  {valueDistance}
                </p>
              )}
            </>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {locationVerifiedOutsideRange || (isVerified && !locationVerifiedOutsideRange) ? (
          <div className="bg-red-800 rounded-md h-9  px-6 mt-3">
            <button
              onClick={handleStart}
              type="button"
              className="text-white p-2"
            >
              {DONE}
            </button>
          </div>
        ) : (
          <div className="bg-red-800 rounded-xl justify-center flex h-8 w-64 px-6 py-1 mt-[50px]">
            <button
              onClick={checkLocation}
              disabled={isFetching}
              type="button"
              className={`text-white px-4 flex items-center justify-center ${isFetching ? 'cursor-not-allowed' : ''}`}
            >
              {isFetching ? <>{LOADING}</> : INITIATE_LOCATION_CHECK}
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default Location
