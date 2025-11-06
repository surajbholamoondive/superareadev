import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import Location from '@/components/M-verification/location'
import TopBar from '@/components/SearchResultPage/TopBar/TopBar'
import VideoRecorder from '@/components/LiveCamera'
import withProtectedRoute from '@/utils/RouteProtection/routes'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const {agentText,liveRecordingText}=GLOBALLY_COMMON_TEXT.text
const LobbyScreens = ({ onClose }) => {
  const [auth, setAuth] = useAuth()
  const { userResult } = auth || {}
  const { mobileNumber, userType} = userResult || {} 
  const [email, setEmail] = useState(mobileNumber)
  const [room, setRoom] = useState()
  const [decodedData, setDecodedData] = useState(null)
  const router = useRouter()
  const roomId = router?.query?.room
  const searchParams = useSearchParams()
  const encodedData = searchParams.get('data')
  const { openLocationModal } = router.query
  const [showLocationModal, setShowLocationModal] = useState(true)
  const [isLocationVerified, setIsLocationVerified] = useState(
    decodedData?.mVerificationDetails?.isLocationVerified
  )
  useEffect(() => {
    if (openLocationModal === 'true') {
      setShowLocationModal(true)
    }
  }, [openLocationModal])

  const handleCloseShowLocationModal = () => {
    setShowLocationModal(false)
  }

  const handleLocationVerified = (propertyId) => {
    if (isLocationVerified) {
      setIsLocationVerified(true)
    }
  }

  useEffect(() => {
    if (encodedData) {
      try {
        const decoded = decodeURIComponent(encodedData)
        const data = JSON.parse(decoded)
        setDecodedData(data)
      } catch (error) {
        console.error(error)
      }
    }
  }, [encodedData])

  useEffect(() => {
    if (auth?.token === '') {
      return
    }
    setEmail(mobileNumber)
  }, [auth])

  return (
    <div>
      <TopBar label={liveRecordingText} />
      {showLocationModal && (
        <Location
          onClose={handleCloseShowLocationModal}
          setShowLocationModal={setShowLocationModal}
          property={decodedData}
          setData={setDecodedData}
          isLocationVerified={isLocationVerified}
          setIsLocationVerified={setIsLocationVerified}
          onLocationVerified={handleLocationVerified}
        />
      )}
      <div className="w-fit lg:w-[100%] max-w-[1300px] m-auto h-fit my-4">
        <VideoRecorder propertyId={roomId} />
      </div>
    </div>
  )
}

export default withProtectedRoute(LobbyScreens, [agentText])
