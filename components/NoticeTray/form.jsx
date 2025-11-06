import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import {
  ACKNOWLEADGE_REMARK_TEXT,
  AGENT,
  APPROVE_BUTTON,
  APPROVE_SMALL,
  AREA_MAPS,
  BALCONIES,
  BATHROOM_TEXT,
  BEDROOM_COUNT,
  BHK,
  COMMA,
  DEDICATED_ROOMS,
  ENTER_STATUS_REASON,
  FLOOR,
  FLOORING,
  FORM_SUBMIT,
  NOT_VERIFIED_TEXT,
  OWNER,
  POST_TEXT,
  QUESTION_1_TEXT,
  QUESTION_2_TEXT,
  QUESTION_3_TEXT,
  QUESTION_4_TEXT,
  QUESTION_5_TEXT,
  QUESTION_6_TEXT,
  QUESTION_7_TEXT,
  QUESTION_8_TEXT,
  REJECT_BUTTON,
  REJECT_TEXT,
  REPRESENTATIVE,
  REVISE,
  SHOW_EACH_BATH,
  SMALL_UNIT,
  VERIFIED_QUESTION,
  WITH,
} from '@/text'
import { NOTIFICATION_TYPE } from "@/textV2"
import { useNotification } from '@/context/notificationContext'

import { makeApiRequest, numberFormatter } from '@/utils/utils'
import { toast } from 'react-toastify'

import Modal from '../popupModal/modal'

const FormModal = ({ isOpen, DATA }) => {
  const {storeNotification}= useNotification()
  const [auth] = useAuth()
  const [formData, setFormData] = useState({})
  const [remark, setRemark] = useState('')
  const [bathCount, setBathCount] = useState(DATA?.bathroomCount)
  const [bedCount, setBedCount] = useState(DATA?.bedroomCount)
  const [propertysize, setPropertysize] = useState(DATA?.propertySize)
  const [unitSize, setUnitSize] = useState(DATA?.propertySizeUnit)
  const [floor, setFloor] = useState(DATA?.flooring)
  const router = useRouter()
  const logger = getLogger()
  const handleStatusChange = async (newStatus) => {
    if (loading || isSubmitted) return

    setLoading(true)
    const payload = {
      data: verificationStatus,
      status: newStatus,
      remark: remark,
      questions: verificationStatus.questions,
    }
    try {
      const response = await makeApiRequest(
        POST_TEXT,
        `${process.env.NEXT_PUBLIC_API}property/form-submit/${DATA?._id}`,
        {
          body: JSON.stringify(payload),
        }
      )
      
      if (response.status === 200) {
        toast.success(FORM_SUBMIT)
        setIsSubmitted(true)

        if (newStatus == REJECT_TEXT) {
          storeNotification({
            userId: auth?.userResult?._id,
            listingStatus: 'rejected',
            notificationType: NOTIFICATION_TYPE.S_VERIFICATION,
            subNotificationType: "APPROVAL_STATUS",
            propertyId: DATA?._id,
          })
        } else if (newStatus == APPROVE_SMALL) {
          storeNotification({
            userId: auth?.userResult?._id,
            listingStatus: 'approved',
            notificationType: NOTIFICATION_TYPE.S_VERIFICATION,
            subNotificationType: "APPROVAL_STATUS",
            propertyId: DATA?._id,
          })
        } else if (newStatus == REVISE) {
          storeNotification({
            userId: auth?.userResult?._id,
            listingStatus: 'modified',
            notificationType: NOTIFICATION_TYPE.S_VERIFICATION,
            subNotificationType: "APPROVAL_STATUS",
            propertyId: DATA?._id,
          })
        }
      }
    } catch (error) {
      logger.error(error)
    }
  }
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageList, setImageList] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const openImageViewer = (images, index) => {
    setImageList(images)
    setCurrentImageIndex(index)
    setImageViewerOpen(true)
  }
  const closeImageViewer = () => setImageViewerOpen(false)

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imageList.length - 1
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imageList.length - 1 ? prevIndex + 1 : 0
    )
  }

  if (!isOpen) return null
  const { mVerificationDetails } = DATA || {}
  const { mVerificationReport } = mVerificationDetails || {}
  const { ScheduleMeetingTime } =
    mVerificationDetails?.liveCameraVerification || {}

  const formatIndianDateTime = (dateString) => {
    if (!dateString) return 'Invalid Date'
    const date = new Date(dateString)
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }

    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
    formattedDate = formattedDate.replace(/(\d{4})\s/g, '$1, ') + '.'
    return formattedDate
  }
  const dateStr =
    DATA?.mVerificationDetails?.liveCameraVerification?.ScheduleMeetingTime
  const formattedDate = formatIndianDateTime(dateStr)
  const {
    balconies,
    dedicatedRooms,
    flooring,
    locality,
    towerBlock,
    propertySize,
    propertySizeUnit,
    bedroomCount,
    bathroomCount,
    propertyImages,
  } = mVerificationReport || {}

  const [verificationStatus, setVerificationStatus] = useState()
  const displayedArea = mVerificationReport?.areaDetail?.find(
    (area) => area.display === true
  )
  useEffect(() => {
    setVerificationStatus({
      questions: [
        {
          text: QUESTION_1_TEXT,
          questionKey: 'q1',
          answer: NOT_VERIFIED_TEXT,
          timestamp: null,
        },
        {
          text: QUESTION_2_TEXT,
          questionKey: 'q2',
          answer: NOT_VERIFIED_TEXT,
          timestamp: null,
        },
        {
          text: `${QUESTION_3_TEXT} ${displayedArea?.propertySize} ${AREA_MAPS[displayedArea?.propertySizeUnit]}`,
          questionKey: 'q3',
          answer: NOT_VERIFIED_TEXT,
          timestamp: null,
        },
        {
          text: `${QUESTION_4_TEXT} ${bedroomCount} ${BEDROOM_COUNT} ${COMMA} ${bathroomCount} ${BATHROOM_TEXT} ${SMALL_UNIT} ${SHOW_EACH_BATH}`,
          questionKey: 'q4',
          answer: NOT_VERIFIED_TEXT,
          timestamp: null,
        },
        {
          text: QUESTION_5_TEXT,
          questionKey: 'q5',
          answer: NOT_VERIFIED_TEXT,
          timestamp: null,
          listingData: {
            balconies: balconies,
            balconyImages: balconyImages,
          },
        },
        {
          text: QUESTION_6_TEXT,
          questionKey: 'q6',
          answer: NOT_VERIFIED_TEXT,
          timestamp: null,
          listingData: {
            dedicatedRooms: dedicatedRooms,
            dedicatedRoomImage: dedicatedRoomImage,
          },
        },
        {
          text: `${QUESTION_7_TEXT} ${flooring} ${FLOOR}`,
          questionKey: 'q7',
          answer: NOT_VERIFIED_TEXT,
          timestamp: null,
        },
        {
          text: `${QUESTION_8_TEXT}`,
          questionKey: 'q8',
          answer: NOT_VERIFIED_TEXT,
          timestamp: ScheduleMeetingTime || null,
        },
      ],
    })
  }, [
    floor,
    unitSize,
    propertysize,
    bedCount,
    bathCount,
    balconies,
    flooring,
    bathroomCount,
    bedroomCount,
    propertySize,
    propertySizeUnit,
  ])
  const balconyImages = propertyImages?.filter((image) => {
    const normalizedImageName = image.name.trim()
    return BALCONIES.includes(normalizedImageName)
  })
  const dedicatedRoomImage = propertyImages?.filter((image) => {
    const normalizedImageName = image.name.trim()
    return DEDICATED_ROOMS.includes(normalizedImageName)
  })
  const handleVerificationChange = (questionKey, value) => {
    const updatedQuestions = verificationStatus?.questions.map((q) =>
      q.questionKey === questionKey
        ? { ...q, answer: value, timestamp: new Date() }
        : q
    )
    setVerificationStatus((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }
  const renderVerificationQuestion = (text, questionKey) => {
    const currentQuestion = verificationStatus?.questions.find(
      (q) => q.questionKey === questionKey
    )
    if (questionKey === 'q1') {
      return (
        <div className="px-2 ">
          <p className="  text-start text-[14px] mb-2">{text}</p>
          <div className="flex items-center">
            <label className="mx-2 text-sm flex">
              <input
                type="radio"
                name={questionKey}
                value="Owner"
                checked={currentQuestion?.answer === 'Owner'}
                onChange={() => handleVerificationChange(questionKey, 'Owner')}
              />
              <div className="px-1">{OWNER}</div>
            </label>
            <label className="mx-2 text-sm flex">
              <input
                type="radio"
                name={questionKey}
                value="Representative"
                checked={currentQuestion?.answer === 'Representative'}
                onChange={() =>
                  handleVerificationChange(questionKey, 'Representative')
                }
              />
              <div className="px-1">{REPRESENTATIVE}</div>
            </label>
            <label className="mx-2 text-sm flex">
              <input
                type="radio"
                name={questionKey}
                value="Agent"
                checked={currentQuestion?.answer === 'Agent'}
                onChange={() => handleVerificationChange(questionKey, 'Agent')}
              />
              <div className="px-1">{AGENT}</div>
            </label>
          </div>
        </div>
      )
    } else {
      return (
        <div className="px-2 ">
          <p className="  text-start text-[14px] mb-2">{text}</p>
          <div className="flex items-center">
            <label className="mx-2 text-sm flex">
              <input
                type="radio"
                name={questionKey}
                value="verified"
                checked={currentQuestion?.answer === VERIFIED_QUESTION}
                onChange={() =>
                  handleVerificationChange(questionKey, VERIFIED_QUESTION)
                }
              />
              <div className="px-1">{VERIFIED_QUESTION}</div>
            </label>
            <label className="mx-2 text-sm flex">
              <input
                type="radio"
                name={questionKey}
                value="not_verified"
                checked={currentQuestion?.answer === NOT_VERIFIED_TEXT}
                onChange={() =>
                  handleVerificationChange(questionKey, NOT_VERIFIED_TEXT)
                }
              />
              <div className="px-1">{NOT_VERIFIED_TEXT}</div>
            </label>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="">
      <div className="">
        {!isSubmitted ? (
          <div className=" px-2 py-2 space-y-5 mt-2">
            <div className=" space-y-7 mt-2 ">
              {renderVerificationQuestion(QUESTION_1_TEXT, 'q1')}
              {renderVerificationQuestion(
                <>
                  {QUESTION_2_TEXT} (
                  <span className="font-semibold text-[13px]">{`${locality}, ${towerBlock}`}</span>
                  )
                </>,
                'q2'
              )}

              {renderVerificationQuestion(
                <>
                  {QUESTION_3_TEXT} (
                  <span className="font-bold text-[14px]">
                    {`${numberFormatter(displayedArea?.propertySize)} ${AREA_MAPS[displayedArea?.propertySizeUnit]}`}
                  </span>
                  )
                </>,
                'q3'
              )}

              {bedroomCount &&
                bathroomCount &&
                renderVerificationQuestion(
                  <>
                    {QUESTION_4_TEXT}{' '}
                    <span className="font-semibold text-[14px]">
                      {`${bedroomCount} ${BHK} ${WITH} ${bathroomCount} ${BATHROOM_TEXT}`}
                    </span>
                    {`${SHOW_EACH_BATH}`}
                  </>,
                  'q4'
                )}

              {balconies && (
                <div>
                  {renderVerificationQuestion(QUESTION_5_TEXT, 'q5')}
                  <div className="flex">
                    <div className="font-semibold  text-[14px] text-start">
                      {Object.keys(balconies).map((key) => (
                        <p key={key} className=" pt-6 py-6 px-4">
                          {key} :
                        </p>
                      ))}
                    </div>
                    <div className="ml-40 py-3">
                      {balconyImages.map((image, index) => (
                        <div className="py-1" key={index}>
                          <Image
                            src={image.url}
                            width={40}
                            height={40}
                            alt={image.name}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              openImageViewer(balconyImages, index)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {dedicatedRooms && dedicatedRooms.length > 0 && (
                <div>
                  {renderVerificationQuestion(QUESTION_6_TEXT, 'q6')}
                  <div className="flex ">
                    <div className="font-semibold  text-[14px] text-start">
                      {dedicatedRooms.map((room, index) => (
                        <p key={index} className=" pt-6 px-4">
                          {room}
                        </p>
                      ))}
                    </div>

                    <div className="ml-40 py-3">
                      {dedicatedRoomImage.map((image, index) => (
                        <div className="py-1" key={index}>
                          <Image
                            key={index}
                            src={image.url}
                            width={50}
                            height={50}
                            alt={image.name}
                            onClick={() =>
                              openImageViewer(dedicatedRoomImage, index)
                            }
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {flooring &&
                renderVerificationQuestion(
                  <>
                    {QUESTION_7_TEXT}{' '}
                    <span className="font-semibold text-[14px]">{`${flooring}`}</span>{' '}
                    {`${FLOORING}`},
                  </>,
                  'q7'
                )}
              {flooring &&
                renderVerificationQuestion(
                  <>
                    {QUESTION_8_TEXT} {''} {formattedDate}
                    <span className="font-semibold text-[14px]"></span>{' '}
                  </>,
                  'q8'
                )}
            </div>
            <div className="mt-5 text-start text-bold">
              <label className="px-2 mb-4 text-[16px] font-semibold">
                {ACKNOWLEADGE_REMARK_TEXT}
              </label>
              <textarea
                onChange={(e) => setRemark(e.target.value)}
                placeholder={ENTER_STATUS_REASON}
                required
                className="mx-2 border border-solid border-black flex-col focus:border-black focus:outline-none justify-center items-center h-[20vh] w-[100%] rounded-lg pl-2 pt-2 cursor-text sm:h-[15vh] sm:w-[90%] md:h-[10vh] md:w-[85%]"
                rows="10"
              />
            </div>

            <div className="pb-4 flex justify-center my-10 gap-2 text-[14px]">
              <button
                onClick={() => handleStatusChange(REJECT_TEXT)}
                className="border-solid bg-newBackground rounded-md border-[1px] h-[4vh] w-[20vw] text-white sm:w-[60%] md:w-[60%] lg:w-[8vw]"
              >
                {REJECT_BUTTON}
              </button>
              <button
                onClick={() => handleStatusChange(APPROVE_SMALL)}
                className="border-solid bg-newBackground rounded-md border-[1px] h-[4vh] w-[20vw] text-white sm:w-[60%] md:w-[60%] lg:w-[8vw]"
              >
                {APPROVE_BUTTON}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-32 p-10">
            <div className="text-green-600 mb-4">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              Your verification process is complete
            </h2>
            <p className="text-gray-600 text-center mt-2">
              The form has been submitted successfully.
            </p>
          </div>
        )}
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
                  src={imageList[currentImageIndex].url}
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
      </div>
    </div>
  )
}
export default FormModal
