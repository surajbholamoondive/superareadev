import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  CAMERA_VERIFICATION_TWO_MIN_WARN,
  INTIATE_CAMERA_VERIFICATION,
  LOCATION_CHECK,
  LOCATION_MATCHED,
  LOCATION_VERIFICATION_TEXT,
  PROPERTY_LOCATION_VERIFIED,
} from '@/text'

import Modal from '@/components/popupModal/modal'

import LocationCheck from '../../assets/LocationCheckTick/locationCheckTick.svg'

export default function LocationVerifiedModal({
  setLocationMatched,
  setIsLocationVerified,
  isLocationVerified,
  onClose,
  property,
  setData,
  isOpen,
}) {
  const [disableButton, setDisableButton] = useState(false)
  const [timer, setTimer] = useState(120)
  const router = useRouter()
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(timerInterval)
          return prevTimer
        }
        return prevTimer - 1
      })
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [])
  useEffect(() => {
    if (timer <= 0) {
      setDisableButton(true)
    }
  }, [timer])

  const handleCameraClick = (data) => {
    setIsLocationVerified(true)
    router.push({
      pathname: '/screens',
      query: { data: JSON.stringify(data) },
    })
  }
  const closeModal = () => {
    setLocationMatched(false)
    onClose()
  }

  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center ',
        modalWidth: 'w-[80%]',
        modalHeight: 'h-[90%]',
        childrenPaddings: 'p-9',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
      }}
    >
      <section className="w-[80%] h-[90%] m-auto mt-8">
        <div className="text-center">
          <h1 className="font-semibold text-2xl mt-2">{LOCATION_CHECK}</h1>
          <h2 className="font-normal">{LOCATION_VERIFICATION_TEXT}</h2>
          <h3 className="text-[#C88E20] bg-yellow-600 bg-opacity-5 mt-2">
            {CAMERA_VERIFICATION_TWO_MIN_WARN}
          </h3>
          <h3 className="font-semibold text-xl">
            ({Math.floor(timer / 60)}:{timer % (60).toString().padStart(2, '0')}
            )
          </h3>
        </div>
        <div className="flex justify-center mt-6">
          <Image src={LocationCheck} width={180} height={180} />
        </div>
        <p className="text-primary text-4xl text-center">{LOCATION_MATCHED}</p>
        <div className="w-full text-center my-2">
          <p className="font-semibold ">{PROPERTY_LOCATION_VERIFIED}</p>
        </div>
        <div className="m-auto w-fit mt-6 cursor-pointer">
          <button
            className={`bg-button p-4 text-white font-semibold rounded-lg tracking-wider ${
              disableButton && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => handleCameraClick(property)}
            disabled={disableButton}
          >
            {INTIATE_CAMERA_VERIFICATION}
          </button>
        </div>
      </section>
    </Modal>
  )
}
