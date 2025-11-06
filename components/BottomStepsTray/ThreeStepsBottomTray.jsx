import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import { getLocalStorageItem } from '@/utils/utils'
import { toast } from 'react-toastify'
import EditPage from '@/components/Agent/Edit/index'
import EditModal from '@/components/EditModal/index'
import listingVerified from '../../assets/Kyc/complete.svg'
import isKycVerifiedImage from '../../assets/M-verification/isKycVerified.svg'
import pending from '../../assets/M-verification/pending.svg'
import StartRecording from '../../assets/M-verification/Recording.svg'
import Lobby from '../M-verification/LiveCamera'
import ReviewDetails from '../User/profile/ReviewListing'
import styles from './ThreeStepBottomTray.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useNotification } from '@/context/notificationContext'

import { GLOBALLY_COMMON_TEXT, MY_LISTING_TEXT } from '@/textV2'
const {userListingRoute,agentListingRoute,liveCameraRoute}=MY_LISTING_TEXT.routes
const{superVerificationTab,locationVerifiedText,completeStep2,verificationStep2Text,reviewListingText,verificationStep4AgentText,pendingOnAgent,pendingOnUser}=MY_LISTING_TEXT.bottomStepsTray
const {agentText,aprrovedText,individualText,rejectedText}=GLOBALLY_COMMON_TEXT.text
export default function ThreeStepsBottomTray({
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
  const {storeNotifications}=useNotification()
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
  useEffect(() => {
    setIsReviewComplete(DATA?.mVerificationDetails?.mVerificationReport)
    if (isReviewComplete) {
      setVerified(true)
      seteEditComplete(true)
      setIsReviewComplete(true)
    }
  }, [data])

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
  const { asPath, query } = router
  const handleStepClick = (callback) => {
    if (
      asPath === agentListingRoute ||
      asPath === userListingRoute
    ) {
      callback()
    }
  }
  function checkIfModalOpen() {
    const postedBy = DATA?.postedBy?._id
    const agentRequired = DATA?.isAgentRequired
    if (postedBy && agentRequired) {
      return DATA?.assignedTo?._id
    } else {
      return postedBy
    }
  }
  const handleStep3Click = async () => {
    const id = checkIfModalOpen()
    const res = id === auth?.userResult?._id
    if (DATA.mVerificationDetails?.mVerificationReport) {
      if (isAgent || auth.userResult.userType === individualText) {
        const encodedData = encodeURIComponent(JSON.stringify(DATA))
        router.push({
          pathname: liveCameraRoute,
          query: {
            room: DATA._id,
            data: encodedData,
            openLocationModal: res,
          },
        })
      }
    } else {
      toast.error(completeStep2)
    }
  }

  const isAgent = userType === agentText
  return (
    <div className="relative w-[100%] ">
      <div className="max-md:relative max-md:h-[60px] ">
        <div className="cursor-pointer relative group">
          {query?.page === superVerificationTab && !isKycVerifieded && (
            <div className="flex justify-center">
              <div
                className={`${styles.Hover1} absolute hidden group-hover:block text-black font-semibold text-center text-sm  z-50`}
              >
                <p className="mt-5"> {pendingOnUser} </p>
              </div>
            </div>
          )}
          <div
            className={` ${isKycVerifieded ? `${styles.step1Completed}` : `${styles.step1}`}`}
            onClick={() => handleStepClick(openKYCModal)}
          >
            <div className={`${styles.child1} flex flex-col itmes-center`}>
              <p className="text-xs font-semibold mb-1 text-center">
                {locationVerifiedText}
              </p>
              <div className="flex items-center justify-center gap-2">
                {isKycVerifieded ? (
                  <Image
                    src={isKycVerifiedImage}
                    width={120}
                    height={100}
                    alt="isKycVerifieded"
                  />
                ) : (
                  <>
                    <Image
                      src={pending}
                      width={88}
                      height={100}
                      alt="pending"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {!isKycVerifieded && showKYCModal && (
            <ReviewDetails
              onClose={handleCloseKYCModal}
              closeProfileModal={onClose}
            />
          )}
        </div>
        <div
          className={`relative group ${
            query?.page === superVerificationTab ||
            DATA?.postedBy?._id != auth?.userResult?._id
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
        >
          {query?.page !== superVerificationTab && !isReviewComplete && (
            <div className="flex justify-center">
              <div
                className={`${styles.Hover2} absolute hidden group-hover:block text-black font-semibold text-center text-[12px] z-50`}
              >
                <p className="mt-5"> {pendingOnAgent} </p>
              </div>
            </div>
          )}

          <div
            className={`${(!verified && editComplete) || isReviewComplete ? `${styles.step2Completed}` : `${styles.step2}`}`}
            onClick={openReviewModal}
          >
            <div className={styles.child2}>
              <p className="text-xs font-semibold mb-1 text-center">
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
                      width={88}
                      height={100}
                      alt="pending"
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {!editComplete &&
            !verified &&
            isReviewModalVisible &&
            DATA?.assignedTo?._id !== auth?.userResult?._id && (
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
      </div>
      <div className="max-md:relative max-md:h-[60px]">
        <div
          className={`relative group ${
            query?.page === superVerificationTab ||
            DATA?.postedBy?._id != auth?.userResult?._id
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
        >
          {query?.page !== superVerificationTab &&
            DATA?.mVerifiedStatus !== aprrovedText && (
              <div className="flex justify-center">
                <div
                  className={`${styles.Hover4} absolute hidden group-hover:block text-black font-semibold text-center text-[12px]  z-50`}
                >
                  <p className="mt-5"> {pendingOnAgent} </p>
                </div>
              </div>
            )}

          <div
            className={`${styles.step4} ${DATA?.mVerifiedStatus === aprrovedText ? `${styles.step4Completed}` : 'bg-[#F3F3F3]'}`}
            onClick={(e) => {
              if (
                (query?.page === superVerificationTab ||
                  DATA?.postedBy?._id !== auth?.userResult?._id) &&
                DATA?.mVerifiedStatus !== aprrovedText &&
                DATA?.mVerifiedStatus !== rejectedText
              ) {
                handleStep3Click()
              }
            }}
          >
            <div className={styles.child4}>
              {DATA?.mVerifiedStatus === aprrovedText ? (
                <p
                  className={`text-xs font-semibold ${isAgent ? 'mr-16 w-44 mt-[2px] mb-1' : 'mt-1 w-44 mr-14'}`}
                >
                  {verificationStep4AgentText}
                  <div className="flex items-center ml-8 mt-[4px]">
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
                  <p
                    className={`text-xs font-semibold ${isAgent ? 'mr-16 w-44 mt-[2px] mb-1' : 'mt-1 w-44 mr-14'}`}
                  >
                    {verificationStep4AgentText}
                  </p>
                  <div className="flex items-center ml-6 mt-[2px]">
                    <Image
                      src={StartRecording}
                      width={120}
                      height={150}
                      alt="Pending"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {showLiveCameraModal && <Lobby onClose={openLiveCameraModal} />}
        {meetingScheduled && <ScheduleMeeting auth={auth} DATA={DATA} />}
      </div>
    </div>
  )
}
