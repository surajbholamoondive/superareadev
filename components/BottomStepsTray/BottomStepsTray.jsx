import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import { getLocalStorageItem, makeApiRequest } from '@/utils/utils'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import dayjs from 'dayjs'
import Countdown from 'react-countdown'
import { toast } from 'react-toastify'

import EditPage from '@/components/Agent/Edit/index'
import EditModal from '@/components/EditModal/index'

import listingVerified from '../../assets/Kyc/complete.svg'
import pending from '../../assets/M-verification/pending.svg'
import Reverify from '../../assets/M-verification/Reverify.svg'
import StartCall from '../../assets/M-verification/StartCall.svg'
import Lobby from '../M-verification/LiveCamera'
import LocationModal from '../M-verification/location'
import styles from './index.module.css'

import 'react-datepicker/dist/react-datepicker.css'

import { AGENT, APPROVED_STATUS } from '@/text'
import { GLOBALLY_COMMON_TEXT, MY_LISTING_TEXT } from '@/textV2'
import { useNotification } from '@/context/notificationContext'
import { NOTIFICATION_TYPE } from '@/textV2'

import LocationPresent from '../Modal/LocationPresent'

const {
  appointmentText,
  dateUpdateNote,
  verificationStep4Text,
  kycCompleteNote,
  locationVerification,
  locationVerifiedText,
  reviewListingText,
  listingPageText,
  verificationStep2Text,
  meetingScheduleText,
  appointmentScheduleText
} = MY_LISTING_TEXT.bottomStepsTray
const {
  agentText,
  aprrovedText,
  individualText,
  pendingText,
  postType,
  putType,
} = GLOBALLY_COMMON_TEXT.text
const {
  meetingTimeRoute,
  savedPropertyRoute,
  propertyRelocationRoute,
  screensRoute,
  videoCallRoute,
  userListingRoute,
  scheduleMeetingRoute,
} = MY_LISTING_TEXT.routes
export default function BottomStepsTray({
  onClose,
  id,
  property,
  DATA,
  userType,
  isReviewComplete,
  setIsReviewComplete,
}) {
  const [auth, setAuth] = useAuth()
  const [data, setData] = useData()
  const [startDate, setStartDate] = useState('')
  const [meetingScheduled, setMeetingScheduled] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const isKycVerifieded = DATA?.postedBy?.isKycVerified
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false)
  const [showKYCModal, setShowKYCModal] = useState(false)
  const [showLiveCameraModal, setShowLiveCameraModal] = useState(false)
  const [editComplete, seteEditComplete] = useState(false)
  const [verifiedProperties, setVerifiedProperties] = useState({})
  const [notificationScheduled, setNotificationScheduled] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false) // Add state here
  const [enableStep4, setEnableStep4] = useState(false)
  const handleCloseLocationModal = () => {
    setShowLocationModal(false)
  }
  const { storeNotification } = useNotification()

  useEffect(() => {
    const verifiedStatus =
      getLocalStorageItem(`${locationVerifiedText}_${DATA._id}`) === 'true'
    setVerifiedProperties((prev) => ({
      ...prev,
      [DATA._id]: verifiedStatus,
    }))
  }, [DATA._id])
  const [verified, setVerified] = useState(false)
  const { mVerificationDetails } = DATA
  const { liveCameraVerification } = mVerificationDetails
  const { ScheduleMeetingTime } = liveCameraVerification || {}
  const [counter, setCounter] = useState(ScheduleMeetingTime)
  const [startMeeting, setStartMeeting] = useState(false)
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [hoverDiv, setHoverDiv] = useState(true)
  const { adminText } = GLOBALLY_COMMON_TEXT.text
  const isAdmin = auth?.userResult?.userType === adminText
  useEffect(() => {
    setIsReviewComplete(DATA?.mVerificationDetails?.mVerificationReport)
    if (isReviewComplete) {
      setVerified(true)
      seteEditComplete(true)
      setIsReviewComplete(true)

    }
  }, [data])



  useEffect(() => {

  }, [])

  useEffect(() => {
    const checkLocationStepStatus = () => {
      const now = dayjs()
      const meetingTime = dayjs(ScheduleMeetingTime)
      const diff = now.diff(meetingTime, 'minute')

      if (diff >= 0 && diff <= 20) {
        setLocationEnabled(true)
      } else {
        setLocationEnabled(false)
      }
    }

    checkLocationStepStatus()
    const interval = setInterval(checkLocationStepStatus, 60 * 1000)

    return () => clearInterval(interval)
  }, [ScheduleMeetingTime])

  const openKYCModal = () => {
    setShowKYCModal(true)
  }
  const handleCloseKYCModal = () => setShowKYCModal(false)
  const openReviewModal = () => {
    if (isKycVerifieded) {
      setIsReviewModalVisible(true)
    } else {
      toast.error(kycCompleteNote)
    }
  }
  const openLiveCameraModal = () => {
    setShowLiveCameraModal(!showLiveCameraModal)
  }
  const closeReviewModal = () => {
    setIsReviewModalVisible(false)
  }
  const router = useRouter()
  const { asPath } = router
  const query = router.query
  const handleStepClick = (callback) => {
    if (query.page === listingPageText || asPath === userListingRoute) {
      callback()
    }
  }
  function checkIfModalOpen() {
    const postedBy = DATA?.postedBy?._id
    const agentRequired = DATA?.isAgentRequired
    if (postedBy && agentRequired) {
      return DATA?.assignedTo
    } else {
      return postedBy
    }
  }
  const handleStep4Click = async (DATA) => {
    if (DATA?.mVerifiedStatus === APPROVED_STATUS) {
      return
    }
    if (presentOnLocation === individualText) {
      if (
        DATA?.mVerificationDetails?.userLocationVerification
          ?.isLocationVerified &&
        DATA?.mVerificationDetails?.agentLocationVerification?.locationName
      ) {
        const id = checkIfModalOpen()
        const res = id === auth?.userResult?._id
        if (!startMeeting) {
          return
        }
        if (isAgent || auth.userResult.userType === individualText) {
          const encodedData = encodeURIComponent(JSON?.stringify(DATA))
          router.push({
            pathname: videoCallRoute,
            query: {
              room: DATA._id,
              data: encodedData,
              openLocationModal: res,
            },
          })
        }
      }
    } else if (presentOnLocation === AGENT) {
      if (
        DATA?.mVerificationDetails?.agentLocationVerification
          ?.isLocationVerified &&
        DATA?.mVerificationDetails?.userLocationVerification?.locationName
      ) {
        const id = checkIfModalOpen()
        const res = id === auth?.userResult?._id
        if (!startMeeting) {
          return
        }
        if (isAgent || auth.userResult.userType === individualText) {
          const encodedData = encodeURIComponent(JSON?.stringify(DATA))
          router.push({
            pathname: videoCallRoute,
            query: {
              room: DATA._id,
              data: encodedData,
              openLocationModal: res,
            },
          })
        }
      }
    }
  }

  const getNotificationTime = (meetingTime) => {
    return dayjs(meetingTime).subtract(15, 'minute').toDate()
  }
  const ScheduleMeeting = ({ auth, DATA }) => {
    useEffect(() => {
      const meetingTime =
        DATA?.mVerificationDetails?.liveCameraVerification?.ScheduleMeetingTime
      if (meetingTime && !notificationScheduled) {
        const notificationTime = getNotificationTime(meetingTime)
        const now = new Date()
        const timeUntilNotification = notificationTime - now
        if (timeUntilNotification > 0) {
          const timer = setTimeout(() => {
            storeNotification({
              userId: auth?.userResult?._id,
              text: 'Your meeting is starting in 15 minutes',
              notificationType: NOTIFICATION_TYPE.S_VERIFICATION,
              subNotificationType: "SCHEDULED_MEETING",
              propertyId: DATA?._id,
              time: 'high',
            })
            setNotificationScheduled(true)
          }, timeUntilNotification)

          return () => clearTimeout(timer)
        }
      }
    }, [DATA, auth, notificationScheduled])
  }
  const reVerifyLocation = async () => {
    try {
      const response = await makeApiRequest(
        putType,
        `${propertyRelocationRoute}${DATA?._id}`
      )
      if (response.status === 200) {
        toast('Thank you for rescheduling the meeting')
      }
    } catch (error) {
      toast.error(error)
    }
  }
  const handleDateChange = async (selectedDate) => {
    setStartDate(dayjs(selectedDate).format('llll'))
    try {
      const response = await makeApiRequest(
        postType,
        `${scheduleMeetingRoute}${DATA?._id}`,
        {
          scheduleMeetingTime: selectedDate,
        }
      )
      const meetingTime = dayjs(
        selectedDate.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      ).format('llll')

      if (response.status === 200) {
        storeNotification({
          userId: auth?.userResult?._id,
          meetingTime: meetingTime,
          notificationType: NOTIFICATION_TYPE.S_VERIFICATION,
          subNotificationType: "SCHEDULED_MEETING",
          propertyId: DATA?._id,
          time: 'high',
        })
        if (
          DATA?.mVerificationDetails?.liveCameraVerification
            ?.ScheduleMeetingTime
        ) {
          reVerifyLocation()
          setOpenVerifyModal(true)
          setMeetingScheduled(true)
          toast.success(dateUpdateNote)
        } else {
          setOpenVerifyModal(true)
          toast.success(dateUpdateNote)
          setMeetingScheduled(true)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const fetchScheduledTime = async () => {
    try {
      const response = await makeApiRequest(
        postType,
        `${meetingTimeRoute}${DATA._id}`
      )
      if (response.status == 200) {
        if (response?.data?.result?.scheduleMeetingTime != undefined) {
          let scheduleTime = dayjs(
            response?.data?.result?.scheduleMeetingTime
          ).format('llll')
          setStartDate(scheduleTime)
          setMeetingScheduled(true)
        } else {
          setStartDate('')
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchScheduledTime()
  }, [])

  const isAgent = userType === agentText
  const assignTo =
    DATA?.mVerificationDetails?.liveCameraVerification?.assignedTo
  const firstName =
    DATA?.mVerificationDetails?.liveCameraVerification?.assignedTo?.firstName
  const lastName =
    DATA?.mVerificationDetails?.liveCameraVerification?.assignedTo?.lastName

  const presentOnLocation = DATA?.mVerificationDetails?.presentOnLocation

  const isPostCreator = DATA?.postedBy?._id === auth?.userResult?._id;

  const getUserLocationData = () => DATA?.mVerificationDetails?.userLocationVerification;
  const getAgentLocationData = () => DATA?.mVerificationDetails?.agentLocationVerification;

  useEffect(() => {
    const fetchData = async () => {
      const userLocation = await getUserLocationData();
      const agentLocation = await getAgentLocationData();


      if (
        agentLocation?.locationName &&
        userLocation?.locationName &&
        (
          (presentOnLocation === AGENT && agentLocation?.isLocationVerified) ||
          (presentOnLocation === individualText && userLocation?.isLocationVerified)
        )
      ) {
        setEnableStep4(true);
      } else {
        setEnableStep4(false);
      }
    };

    fetchData();
  }, []);


  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setStartMeeting(true)
      setHoverDiv(false)
      if (
        enableStep4
      ) {

        return (
          <div>

            <Image
              src={StartCall}
              width={70}
              height={85}
              alt="Start call Image"
            />
          </div>
        )

      }
      else {

        return (
          <div>
            <Image
              src={pending}
              width={85}
              height={100}
              alt="pending"
            />
          </div>
        )
      }
    }
    else {
      return (
        <span className="text-[11px] text-[#931602] mt-[4px]">
          {days !== 0 && `${days} d `}
          {hours !== 0 && `${hours} h `}
          {minutes !== 0 && `${minutes} m `}
          {seconds !== 0 && `${seconds} sec`}
        </span>
      )
    }
  }

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
    const distance = R * c
    return distance
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  const userLat = mVerificationDetails?.userLocationVerification?.coordinates[0]
  const userLong =
    mVerificationDetails?.userLocationVerification?.coordinates[1]
  const agentLat =
    mVerificationDetails?.agentLocationVerification?.coordinates[0]
  const agentLong =
    mVerificationDetails?.agentLocationVerification?.coordinates[0]

  const propertyCoords = { lat: DATA?.latitude, lon: DATA?.longitude }
  const userCoords = { lat: userLat, lon: userLong }
  const agentCoords = { lat: agentLat, lon: agentLong }

  const distanceUserToProperty = getDistanceFromLatLonInKm(
    propertyCoords.lat,
    propertyCoords.lon,
    userCoords.lat,
    userCoords.lon
  )

  const distanceAgentToProperty = getDistanceFromLatLonInKm(
    propertyCoords.lat,
    propertyCoords.lon,
    agentCoords.lat,
    agentCoords.lon
  )

  const isWithinRange =
    distanceUserToProperty <= 0.5 || distanceAgentToProperty <= 0.5

  const shouldShowLocationModal = (locationData, expectedUserType) => {
    if (!locationData?.locationName) {
      return true; // No location name, show modal
    }

    if (userType !== expectedUserType) {
      return false; // Wrong user type, hide modal
    }

    return !locationData.isLocationVerified;
  };

  // Main click handler
  const handleLocationClick = () => {
    // Early returns for edge cases
    if (isAdmin) return null;

    if (!meetingScheduled) {
      toast.error({ meetingScheduleText });
      return;
    }

    let showModal = false;

    if (isPostCreator) {
      // Post creator verifies their own location
      const userLocationData = getUserLocationData();
      showModal = shouldShowLocationModal(userLocationData, presentOnLocation);
    } else {
      // Other users verify agent location
      const agentLocationData = getAgentLocationData();
      showModal = shouldShowLocationModal(agentLocationData, presentOnLocation);
    }

    setShowLocationModal(showModal);
  };

  const VerificationImage = () => {
    const isOwner = DATA?.postedBy?._id === auth?.userResult?._id;

    const verificationDetails = isOwner
      ? DATA?.mVerificationDetails?.userLocationVerification
      : DATA?.mVerificationDetails?.agentLocationVerification;

    let imageSrc = pending;
    let altText = "pending";

    if (verificationDetails?.isLocationVerified) {
      imageSrc = listingVerified;
      altText = "listingVerified";
    } else if (verificationDetails?.locationName) {
      if (userType === presentOnLocation) {
        imageSrc = Reverify;
        altText = "Re-Verify";
      } else {
        imageSrc = listingVerified;
        altText = "listingVerified";
      }
    }

    return (
      <Image
        src={imageSrc}
        width={85}
        height={100}
        alt={altText}
      />
    );
  };

  return (
    <div className="relative w-[100%]">
      <div className="max-md:relative max-md:h-[60px] mb-[4px] md:mb-[0px]">
        {/*  //Step 1 //  */}
        <div className={`${isAdmin ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <div
            className={`${(!verified && editComplete) || isReviewComplete ? `${styles.step1Completed}` : `${styles.step1}`}`}
            onClick={openReviewModal}
          >
            <div
              className={`${styles.child1} flex flex-col gap-[2px] items-center`}
            >
              <p className="text-xs font-semibold text-center text-gray-600">
                {verificationStep2Text}
              </p>
              <div className="flex items-center">
                {isReviewComplete ? (
                  <Image
                    src={listingVerified}
                    width={85}
                    height={100}
                    alt="listingVerified"
                  />
                ) : (
                  <>
                    <Image
                      src={pending}
                      width={85}
                      height={100}
                      alt="pending"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {((!editComplete &&
            !verified &&
            isReviewModalVisible &&
            DATA?.postedBy?._id === auth?.userResult?._id) || (!editComplete &&
              !verified &&
              isReviewModalVisible && DATA?.assignedTo?._id === auth?.userResult?._id)) && (
              <EditModal
                onClose={closeReviewModal}
                Component={EditPage}
                setIsReviewModalVisible={setIsReviewModalVisible}
                isReviewModalVisible={isReviewModalVisible}
                text={reviewListingText}
                id={DATA}
                setData={setData}
                editComplete={editComplete}
                seteEditComplete={seteEditComplete}
                setIsReviewComplete={setIsReviewComplete}
                API_PATH={savedPropertyRoute}
              />
            )}
        </div>
        {/*  //Step 2 //  */}
        <div className={`${isAdmin ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {DATA?.postedBy?._id === auth?.userResult?._id &&
            !meetingScheduled && <div className="flex justify-center"></div>}
          {isAgent && DATA?.postedBy?._id != auth?.userResult?._id ? (
            <div
              className={`${DATA?.mVerifiedStatus === pendingText ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <div
                className={`${meetingScheduled ? styles.step2Completed : styles.step2} `}
                onClick={() => {
                  if (DATA?.mVerifiedStatus === pendingText) {
                    if (isReviewComplete) {
                      setIsDatePickerOpen(true)
                    }
                  } else return
                }}
              >
                <div
                  className={`${styles.child3} flex flex-col gap-[4px] items-center justify-center text-center`}
                >
                  <p className="text-xs font-semibold text-center">
                    {appointmentScheduleText}
                  </p>
                  {startDate != '' ? (
                    <div className="text-[9px] text-center mt-[1px] font-medium line-clamp-1">
                      {startDate.toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </div>
                  ) : (
                    <div>
                      <Image
                        src={pending}
                        width={85}
                        height={100}
                        alt="pending"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={'cursor-not-allowed'}>
              <div
                className={`${meetingScheduled ? styles.step2Completed : styles.step2}`}
              >
                <div
                  className={`${styles.child3} flex flex-col gap-[2px] items-center justify-center text-center`}
                >
                  <p className="text-xs font-semibold text-center">
                    {appointmentScheduleText}
                  </p>
                  {startDate != '' ? (
                    <div className="text-[9px] text-center font-medium mt-[1px] line-clamp-1">
                      {startDate.toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </div>
                  ) : (
                    <div>
                      <Image
                        src={pending}
                        width={85}
                        height={100}
                        alt="pending"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isDatePickerOpen && (
            <div
              className={`absolute -bottom-[20px] z-50 rounded-2xl bg-white ${styles.calendar} `}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={`${styles.customScroll}`}
              >
                <StaticDateTimePicker
                  defaultValue={dayjs()}
                  minDateTime={dayjs()}
                  onClose={() => setIsDatePickerOpen(false)}
                  onAccept={(selectedDate) => {
                    handleDateChange(selectedDate);
                  }}
                  sx={{
                    '.MuiPickersLayout-toolbar': {
                      paddingY: '0px',
                      fontSize: '5px',
                    },
                  }}
                // minutesStep={2}
                />
              </LocalizationProvider>
            </div>
          )}
        </div>
      </div>
      <div className="max-md:relative max-md:h-[60px]">
        {/*  //Step 3 //  */}
        <div className="relative group">
          <div>
            {hoverDiv && meetingScheduled && (
              <div className="flex justify-center">
                <div
                  className={`${styles.Hover4} absolute hidden group-hover:block text-black font-semibold text-center text-[12px]  z-50`}
                >
                  <p className="mt-5">
                    {counter && (
                      <Countdown date={counter} renderer={renderer} />
                    )}
                  </p>
                </div>
              </div>
            )}
            <button
              className={`${DATA?.postedBy?._id !== auth?.userResult?._id &&
                (DATA?.mVerificationDetails?.agentLocationVerification
                  ?.isLocationVerified ||
                  (DATA?.mVerificationDetails?.agentLocationVerification
                    ?.locationName &&
                    auth?.userResult?.userType !== presentOnLocation))
                ? styles.step3Completed
                : DATA?.postedBy?._id === auth?.userResult?._id &&
                  (DATA?.mVerificationDetails?.userLocationVerification
                    ?.isLocationVerified ||
                    (DATA?.mVerificationDetails?.userLocationVerification
                      ?.locationName &&
                      auth?.userResult?.userType !== presentOnLocation))
                  ? styles.step3Completed
                  : styles.step3
                } ${locationEnabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onClick={handleLocationClick}
              disabled={!startMeeting || !locationEnabled}
            >
              <div
                className={`${styles.child3} flex flex-col gap-[2px] items-center justify-center text-center`}
              >
                <p className="text-xs font-semibold text-center">
                  {locationVerification}
                </p>


                <div>
                  <VerificationImage />
                </div>

              </div>
            </button>
            {showLocationModal && (
              <LocationModal
                onClose={() => setShowLocationModal(false)}
                property={DATA}
                onLocationVerified={() => setShowLocationModal(true)}
                userType={userType}
                presentOnLocation={
                  presentOnLocation
                }

              />
            )}
          </div>
        </div>

        {/* step 4 */}
        <div onClick={() => handleStep4Click(DATA)}>
          <div
            onClick={() => {
              handleStep4Click(DATA)
            }}
          >
            <div
              className={` ${DATA?.mVerifiedStatus === aprrovedText ? `${styles.step4Completed}` : `${styles.step4}`}`}
            >
              <div
                className={`${styles.child4} flex flex-col gap-[2px] items-center justify-center`}
              >
                {DATA?.mVerifiedStatus === aprrovedText ? (
                  <p className={`text-[9px] md:text-xs font-semibold w-[150px] text-center`}>
                    {verificationStep4Text}
                    <div className="flex items-center mt-1 ml-[18px]">
                      <Image
                        src={listingVerified}
                        width={100}
                        height={100}
                        alt="listingVerified"
                      />
                    </div>
                  </p>
                ) : (
                  <>
                    <p className={`text-xs font-semibold w-[150px] text-center`}>
                      {verificationStep4Text}
                    </p>
                    {counter && !hoverDiv ? (
                      <Countdown date={counter} renderer={renderer} />
                    ) : (
                      <div className="flex items-center">
                        <Image
                          src={pending}
                          width={85}
                          height={100}
                          alt="Pending"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {showLiveCameraModal && <Lobby onClose={openLiveCameraModal} />}
        </div>
      </div>
      {openVerifyModal && (
        <LocationPresent
          isOpen={setOpenVerifyModal}
          DATA={DATA}
          isConfirmModalOpen={setOpenVerifyModal}
          setIsConfirmModalOpen={setOpenVerifyModal}
        />
      )}
    </div>
  )
}
