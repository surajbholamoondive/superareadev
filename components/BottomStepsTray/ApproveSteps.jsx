import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { useData } from '@/context/data'
import { GLOBALLY_COMMON_TEXT, MY_LISTING_TEXT } from '@/textV2'
import { toast } from 'react-toastify'

import isKycVerifiedImage from '../../assets/M-verification/isKycVerified.svg'
import ListingRejected from '../../assets/M-verification/LiatingRejected.svg'
import ListingApproved from '../../assets/M-verification/ListingApproved.svg'
import pending from '../../assets/M-verification/pending.svg'
import ReviewDetails from '../User/profile/ReviewListing'
import styles from './approveSteps.module.css'

const { agentText } = GLOBALLY_COMMON_TEXT.text
const {
  superVerificationTab,
  kycCompleteNote,
  listingStatusText,
  ekycVerificationText,
} = MY_LISTING_TEXT.bottomStepsTray
const { agentListingRoute, userListingRoute } = MY_LISTING_TEXT.routes
export default function ApproveSteps({
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
  const isKycVerifieded = DATA?.postedBy?.isKycVerified
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false)
  const [showKYCModal, setShowKYCModal] = useState(false)
  const [showLiveCameraModal, setShowLiveCameraModal] = useState(false)
  const [editComplete, seteEditComplete] = useState(false)

  const [verified, setVerified] = useState(false)
  const { mVerificationDetails } = DATA
  const { liveCameraVerification } = mVerificationDetails
  const { ScheduleMeetingTime } = liveCameraVerification || {}
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
  const router = useRouter()
  const { asPath, query } = router
  const handleStepClick = (callback) => {
    if (asPath === agentListingRoute || asPath === userListingRoute) {
      callback()
    }
  }

  const capitalizeName = (name) => {
    if (!name) return ''
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }

  const isAgent = userType === agentText
  return (
    <div className="max-md:grid max-md:grid-cols-2 relative w-[100%] ">
      <div className="max-md:relative max-md:h-[60px] ">
        <div className="cursor-pointer relative group border flex">
          {query?.page === superVerificationTab && !isKycVerifieded && (
            <div className="flex justify-center"></div>
          )}
          <div
            className={` ${isKycVerifieded ? `${styles.step1Completed}` : `${styles.step1}`} `}
            onClick={() => handleStepClick(openKYCModal)}
          >
            <div className={`${styles.child1} flex flex-col justify-center items-center`}>
              <p className="text-xs font-semibold mb-1 text-center ">
                {ekycVerificationText}
              </p>
              <div className="flex items-center justify-center gap-2 w-[60%] md:w-[100%]">
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
            <div className="flex justify-center"></div>
          )}
        </div>
      </div>
      <div className="max-md:relative max-md:h-[60px]">
        <div className={`relative group cursor-not-allowed`}>
          <div className="flex justify-center"></div>
          <div
            className={`${DATA?.approvalStatus?.status === 'approved' ? `${styles.step4Completed}` : `${styles.step4}`}`}
          >
            <div className={styles.child4}>
              {DATA?.approvalStatus?.status === 'approved' ? (
                <div className="flex flex-col justify-center items-center max-sm:mr-5 sm:mr-20 ">
                  <p className={`text-xs font-semibold mb-1 `}>
                    {listingStatusText}
                  </p>
                  <div className="flex items-center mt-[2px] w-[50%] md:w-[70%]">
                    <Image
                      src={ListingApproved}
                      width={110}
                      height={100}
                      alt="ListingApproved"
                    />
                  </div>
                </div>
              ) : DATA?.approvalStatus?.status === 'rejected' ? (
                <div className="flex flex-col justify-center items-center max-sm:mr-5 sm:mr-20 ">
                  <p className={`text-xs font-semibold mb-1 `}>
                    {listingStatusText}
                  </p>
                  <div className="flex items-center mt-[4px]">
                    <Image
                      src={ListingRejected}
                      width={88}
                      height={88}
                      alt="ListingRejected"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center max-sm:mr-5 sm:mr-20 ">
                  <p className={`text-xs font-semibold mb-1 `}>
                    {listingStatusText}
                  </p>
                  <div className="flex items-center justify-center w-[60%] md:w-[100%]">
                    <Image
                      src={pending}
                      width={88}
                      height={100}
                      alt="pending"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
