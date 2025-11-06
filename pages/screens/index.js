import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useSocket } from '@/context/socketProvider'
import TopBar from '@/components/SearchResultPage/TopBar/TopBar'
import MobileIcon from '../../assets/M-verification/camerMobile.svg'
import { SCREENS_TEXT } from '@/textV2'
const {text}=SCREENS_TEXT
const LobbyScreens = ({ onClose }) => {
  const [auth, setAuth] = useAuth()
  const { userResult } = auth || {}
  const { mobileNumber, userType} = userResult || {} 
  const [email, setEmail] = useState(mobileNumber)
  const [room, setRoom] = useState()
  const [decodedData, setDecodedData] = useState(null)
  const socket = useSocket()
  const router = useRouter()
  const roomId = router?.query?.room
  const searchParams = useSearchParams()
  const encodedData = searchParams.get('data')
  const { openLocationModal } = router.query
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [isLocationVerified, setIsLocationVerified] = useState(
    decodedData?.mVerificationDetails?.isLocationVerified
  )
  // useEffect(() => {
  //   if (openLocationModal === 'true') {
  //     setShowLocationModal(true)
  //   }
  // }, [openLocationModal])

  // const handleCloseShowLocationModal = () => {
  //   setShowLocationModal(false)
  // }

  // const handleLocationVerified = (propertyId) => {
  //   if (isLocationVerified) {
  //     setLocationVerified(true)
  //   }
  // }

  console.log('encodedData',encodedData);
  console.log('decodedData state in useEffectt',decodedData);

  useEffect(() => {
    if (encodedData) {
      try {
        console.log('encodedData in useEffectt',encodedData);
        const decoded = decodeURIComponent(encodedData)
        console.log('decoded in useEffectt',encodedData);
        const data = JSON.parse(decoded)
        console.log('data variable in useEffect in index of screen page',data);
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

  useEffect(() => {
    setRoom(roomId)
  }, [roomId])

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault()
      const encodedData = encodeURIComponent(JSON.stringify(decodedData))
      console.log('encodedData variable in handleSubmitForm',encodedData);
      router.push({
        pathname: `/screens/room/${room}`,
        query: { verificationData: encodedData },
      })
      socket.emit('room:join', { email, room })
    },
    [email, room, socket, router ]
  )

  const handleRoomJoin = useCallback((data) => {
    const { email, room } = data
    router.push({
      pathname: `/screens/room/${room}`,
      query: { verificationData: encodedData },
    })
  }, [])

  useEffect(() => {
    socket.on('room:join', handleRoomJoin)
    return () => {
      socket.off('room:join')
    }
  }, [socket, handleRoomJoin])

  return (
    <div>
      <TopBar label={text.liveCameraText} />
      <div className="inset-0 h-fit flex justify-center rounded-md border bg-white mt-[5vh] mb-[6vh] w-[55vw] max-md:w-[90vw] max-lg:w-[80vw] m-auto pt-20 pb-16 px-12 max-lg:pt-10 max-lg:pb-8 max-lg:px-6 max-sm:flex">
        <div className="mb-7 w-[55%] max-md:w-[80%] pt-4">
          <h1 className="font-bold text-lg mb-4 max-md:-mt-10">{text.startLiveCamera}</h1>
          <h2 className="text-[12px] mb-4">{text.cameraDescription}</h2>
          <div className='flex justify-center'>
          <Image 
          src={MobileIcon}
          width={50}
          height={50}
          alt="mobile icon"
          className="w-[180px] my-2 md:hidden"
        />
        </div>
          <form  className="flex flex-col justify-center" onSubmit={handleSubmitForm}>
            <p className="font-bold mb-2 max-md:self-center">{text.enterRoomText}</p>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="border-2 mb-7 p-1 px-2 max-md:self-center rounded-md w-[90%]"
              minLength={1}
              placeholder="ex- 34af56"
              maxLength={8}
            />
        
            <button
              type="submit"
              className="bg-[#931602] text-white py-2 max-md:self-center tracking-wide px-5 font-bold text-sm rounded-md w-[90%]"
            >
              {text.joinCallText}
            </button>
          </form>
        </div>
        <Image 
          src={MobileIcon}
          width={50}
          height={50}
          alt="mobile icon"
          className="w-[200px] max-md:hidden"
        />
      </div>
    </div>
  )
}

export default LobbyScreens
