import React, { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import {
  ACKNOWLEADGE_REMARK_TEXT,
  ADMIN_TYPE,
  AREA_MAPS,
  ENTER_STATUS_REASON,
  FORM_SUBMIT,
  LIVE_CAMERA_TEXT_FORM,
  POST_TEXT,
  REJECT_TEXT,
  REVOKE_BUTTON,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'
import Modal from '@/components/popupModal/modal'
import { MY_LISTING_TEXT } from '@/textV2'
const {
  agentLocationText,userLocationText,appointmentText
} = MY_LISTING_TEXT.bottomStepsTray

const Report = ({ isOpen, onClose, DATA }) => {
  const [remark, setRemark] = useState('')
  const logger = getLogger()
  const [auth] = useAuth()
  const admin = auth?.userResult?.userType === ADMIN_TYPE
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageList, setImageList] = useState([])
  if (!isOpen) return null

  const openImageViewer = (images, index) => {
    setImageList(images)
    setCurrentImageIndex(index)
    setImageViewerOpen(true)
  }
  const closeImageViewer = () => setImageViewerOpen(false)

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : imageList.length - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex < imageList.length - 1 ? prevIndex + 1 : 0))
  }
  const handleClose = () => onClose()
  const handleStatusChange = async (newStatus) => {
    const payload = {
      status: newStatus,
      remark: remark,
    }
    try {
      const response = await makeApiRequest(
        POST_TEXT,
        `${process.env.NEXT_PUBLIC_API}property/admin-form-submit/${DATA?._id}`,
        {
          body: JSON.stringify(payload),
        }
      )
      if (response.status === 200) {
        toast.success(FORM_SUBMIT)
        onClose()
      } else {
        logger.error(error)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  const formatUnits = (text) => {
    return text
      .split(' ')
      .map((word) => {
        return AREA_MAPS[word] || word
      })
      .join(' ')
  }

  const formatIndianDateTime = (dateString) => {
    const date = new Date(dateString)

    const options = {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }

    return new Intl.DateTimeFormat('en-IN', options).format(date)
  }
  const dateStr =
    DATA?.mVerificationDetails?.liveCameraVerification?.ScheduleMeetingTime
  const formattedDate = formatIndianDateTime(dateStr)

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180)
    const earthRadius = 6371
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c
    return Math.round((distance / 1000) * 10) / 10
  }

  const agentLat =
    DATA?.mVerificationDetails?.agentLocationVerification?.coordinates[0]
  const agentLong =
    DATA?.mVerificationDetails?.agentLocationVerification?.coordinates[0]
  const userLat =
    DATA?.mVerificationDetails?.userLocationVerification?.coordinates[0]
  const userLong =
    DATA?.mVerificationDetails?.userLocationVerification?.coordinates[0]
  const propertyLat = DATA?.longitude
  const propertyLong = DATA?.longitude
  const propertyName = DATA?.propertyTitle
  const agentLocationStatement = `  ${DATA?.mVerificationDetails?.agentLocationVerification?.locationName} (Lat: ${agentLat}, Long: ${agentLong}),
  ${getDistance(agentLat, agentLong, propertyLat, propertyLong)} km from ${propertyName}.`

  const userLocatonStatement = `${DATA?.mVerificationDetails?.userLocationVerification?.locationName} (Lat: ${userLat}, Long: ${userLong}), ${getDistance(userLat, userLong, propertyLat, propertyLong)} km from ${propertyName}.`
  const scheduleStatement = `${formattedDate}.`
  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      heading={LIVE_CAMERA_TEXT_FORM}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center',
        modalWidth: 'w-[70%]',
        modalHeight: 'h-[95%]',
        childrenPaddings: 'px-12',
        headingStyles: 'text-center mt-3 text-black font-semibold text-xl',
      }}
    >
      <div className="p-1 mt-2 fon">
        <div className="text-black text-[16px] font-medium mb-4">
          <div className="flex gap-1">
            <h5><b>{appointmentText}</b> {scheduleStatement} </h5>{' '}
          </div>
        </div>
        <div className="text-black text-[16px] font-medium mb-4">
        <div className="flex gap-1">
            <h5><b>{agentLocationText}</b> {agentLocationStatement} </h5>{' '}
          </div>
          
        </div>
        <div className="text-black text-[16px] font-medium mb-4">
        <div className="flex gap-1">
            <h5><b>{userLocationText}</b> {userLocatonStatement} </h5>{' '}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 bg-opacity-60 p-1 rounded-lg mt-2">
        <div className="flex justify-evenly mt-3 px-3 ">
          <video
            className="rounded-lg shadow-lg"
            width="300"
            height="200"
            controls
          >
            <source
              src={
                DATA?.mVerificationDetails?.liveCameraVerification
                  ?.liveCameraVideoUrl[0]?.url
              }
              type="video/webm"
            />
          </video>
          <video
            className="rounded-lg shadow-lg"
            width="300"
            height="200"
            controls
          >
            <source
              src={
                DATA?.mVerificationDetails?.liveCameraVerification
                  ?.liveCameraVideoUrl[1]?.url
              }
              type="video/webm"
            />
          </video>
        </div>
      </div>
      <div className="mt-4">
        {DATA?.mVerificationDetails?.liveCameraVerification?.listingFormReport?.questions.map(
          (question, index) => (
            <div key={index} className="mb-4">
              <div className="text-black text-[16px] font-medium">
                {formatUnits(question.text)}
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <div className="col-span-1">
                  {!question?.listingData ? (
                    <div className="flex items-center py-2 gap-2 px-3">
                      <input
                        type="radio"
                        name={index}
                        value="verified"
                        className="mt-0.5 h-4 w-4"
                        checked
                      />
                      <div className="text-black text-sm font-bold">
                        {question.answer}
                      </div>
                    </div>
                  ) : (
                    <>
                      {question?.listingData?.balconies &&
                        Object.keys(question?.listingData?.balconies).map(
                          (balcony, idx) => (
                            <div
                              key={idx}
                              className="flex items-start py-2 gap-2 px-3"
                            >
                              <input
                                type="radio"
                                value="verified"
                                className="form-radio mt-0.5 h-4 w-4"
                                checked
                              />
                              <div className="flex items-center flex-row gap-12">
                                <div className="text-black text-sm font-bold">
                                  {question.answer}
                                </div>
                                <p className="font-bold ">
                                  {balcony}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      {question?.listingData?.dedicatedRooms &&
                        Object.keys(question?.listingData?.dedicatedRooms).map(
                          (dedicatedRoom, idx) => (
                            <div
                              key={idx}
                              className="flex items-start  py-2 gap-2 px-3"
                            >
                              <input
                                type="radio"
                                value="verified"
                                className="form-radio mt-0.5 h-4 w-4 "
                                checked
                              />
                              <div className="flex items-center gap-12">
                                <div className="text-black text-sm font-bold">
                                  {question.answer}
                                </div>
                                <p className="font-bold text-[14px]">
                                  {
                                    question?.listingData?.dedicatedRooms[
                                      dedicatedRoom
                                    ]
                                  }
                                </p>
                              </div>
                            </div>
                          )
                        )}
                    </>
                  )}
                </div>
                <div className="text-center text-black text-[12px] py-2 font-bold">
                  {question.timestamp
                    ? `${new Date(question.timestamp).toLocaleString()}`
                    : null}
                </div>

                <div>
                  {(question?.listingData?.dedicatedRooms ||
                    question?.listingData?.balconies) &&
                    (question?.listingData?.dedicatedRooms
                      ? question?.listingData?.dedicatedRoomImage.map(
                          (dedicatedRoom, idx) => (
                            <div key={idx} className="relative h-8 w-8 mb-2">
                              <Image
                                src={dedicatedRoom?.url}
                                fill
                                alt="Room image"
                                  onClick={() => openImageViewer(question?.listingData?.dedicatedRoomImage, idx)
                                }
                                className="cursor-pointer"
                              />
                            </div>
                          )
                        )
                      : question?.listingData?.balconyImages.map(
                          (balconyImage, idx) => (
                            <div key={idx} className="relative h-8 w-8 mb-2">
                              <Image
                                src={balconyImage?.url}
                                fill
                                alt="Balcony image"
                                  onClick={() => openImageViewer( question?.listingData?.balconyImages, idx)
                                }
                                className="cursor-pointer"
                              />
                            </div>
                          )
                        ))}
                </div>
              </div>
            </div>
          )
        )}

        {auth?.userResult?.userType === ADMIN_TYPE && (
          <>
            <div className="mt-5 text-start text-bold">
              <label className="px-5  mb-4 text-[16px] font-semibold">
                {ACKNOWLEADGE_REMARK_TEXT}
              </label>
              <textarea
                onChange={(e) => setRemark(e.target.value)}
                placeholder={ENTER_STATUS_REASON}
                required
                className="mx-5 border border-solid border-black focus:border-black focus:outline-none h-[20vh] w-[95%] rounded-lg pl-2 pt-2"
                rows="10"
              />
            </div>
            <div className="pb-4 flex gap-2 my-10 justify-center">
              <button
                className="bg-[#931602] rounded-md border-[1px] border-solid h-[6vh] w-[10vw] text-white"
                onClick={() => handleStatusChange(REJECT_TEXT)}
              >
                {REVOKE_BUTTON}
              </button>
            </div>
          </>
        )}
      </div>
        {imageViewerOpen && (
  <Modal isOpen={true} isShow={true} onClose={closeImageViewer}>
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
      <button 
        onClick={closeImageViewer} 
        className="absolute top-5 right-5 text-white text-2xl hover:text-gray-300"
      >
        ✖
      </button>
      <button 
        onClick={prevImage} 
        className="absolute left-5 text-white text-4xl hover:text-gray-300"
      >
        &lt;
      </button>
      <div className="flex justify-center items-center">
        <Image 
          src={imageList[currentImageIndex]?.url} 
          width={800} 
          height={800} 
          className="max-w-[80vw] max-h-[80vh] object-contain"
          alt="Full View"
        />
      </div>
      <button 
        onClick={nextImage} 
        className="absolute right-5 text-white text-4xl hover:text-gray-300"
      >
        &gt;
      </button>
    </div>
  </Modal>
)}
    </Modal>
  )
}

export default Report
