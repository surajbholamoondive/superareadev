import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import {
  BACK,
  COMPLETE_REVIEW_LISTING_TEXT,
  KYC_COMPLETE_TEXT,
  LEARN_MORE,
  LOCATION_VERIFIED,
  M_VERIFICATION_STEP1_TEXT,
  M_VERIFICATION_STEP2_TEXT,
  M_VERIFICATION_STEP3_TEXT,
  M_VERIFICATION_STEP4_TEXT,
  PROPERTY_EDIT_ROUTE,
  REVIEW_LISTING,
  VERIFICATION_STATUS_TEXT,
} from '@/text'
import { getLocalStorageItem } from '@/utils/utils'
import { toast } from 'react-toastify'
import EditPage from '@/components/Agent/Edit/index'
import EditModal from '@/components/EditModal/index'
import Modal from '@/components/M-verification/staticModal'
import listingVerified from '../../assets/Kyc/complete.svg'
import LocationVerified from '../../assets/Kyc/locationVerified.svg'
import editIcon from '../../assets/M-verification/editIcon.svg'
import isKycVerifiedImage from '../../assets/M-verification/isKycVerified.svg'
import pending from '../../assets/M-verification/pending.svg'
import verificationTag from '../../assets/M-verification/verificationTag.svg'
import ReviewDetails from '../User/profile/ReviewListing'
import Location from './location'
import LobbyScreens from './LiveCamera';

const Steps = ({ onClose, id, property, DATA, setData }) => {
  const windowWidth = useWindowWidth()
  const [auth, setAuth] = useAuth()
  const router = useRouter();
  const isKycVerified = auth?.userResult?.isKycVerified
  const [modalVisible, setModalVisible] = useState(false)
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false)
  const [showKYCModal, setShowKYCModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [showLiveCameraModal, setShowLiveCameraModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isReviewCompleted, setIsReviewCompleted] = useState(
    DATA?.mVerificationDetails?.mVerificationReport
  )
  const [isKycVerification, setIsKycVerification] = useState(
    DATA?.mVerificationDetails?.isKycVerified || false
  )
  const [locationVerified, setLocationVerified] = useState(
    DATA?.mVerificationDetails?.isLocationVerified
  )
  const [verifiedProperties, setVerifiedProperties] = useState({})
  useEffect(() => {
    const verifiedStatus =
      getLocalStorageItem(`${LOCATION_VERIFIED}_${DATA._id}`) === 'true'
    setVerifiedProperties((prev) => ({
      ...prev,
      [DATA._id]: verifiedStatus,
    }))
  }, [DATA._id])
  const handleOpenShowLocationModal = () => {
    if (isReviewComplete) {
      setShowLocationModal(true)
    } else {
      toast.error(COMPLETE_REVIEW_LISTING_TEXT)
    }
  }
  const handleCloseShowLocationModal = () => setShowLocationModal(false)
  const handleOpenReviewListingModal = () => setShowReviewListingModal(true)
  const handleCloseReviewListingModal = () => setShowReviewListingModal(false)
  const openKYCModal = () => {
    setShowKYCModal(true)
  }
  const handleCloseKYCModal = () => setShowKYCModal(false)
  const openReviewModal = () => {
    if (isKycVerified) {
      setIsReviewModalVisible(true)
    } else {
      toast.error(KYC_COMPLETE_TEXT)
    }
  }
  const completeStep = (stepNumber) => {
    setCurrentStep(stepNumber + 1)
  }
  const openLiveCameraModal = () => {
    router.push('/screens')
  }
  const closeReviewModal = () => {
    setIsReviewModalVisible(false)
  }
  const handleLearnMoreClick = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }
  const goBack = () => {
    router.back()
  }
  const handleKycVerified = () => {
    setIsKycVerification(true)
  }
  const handleReviewComplete = () => {
    setIsReviewCompleted(true)
  }
  const handleLocationVerified = (propertyId) => {
    setLocationVerified(true)
  }
  const isReviewComplete = DATA?.mVerificationDetails?.mVerificationReport
  const isLocationVerified = DATA?.mVerificationDetails?.isLocationVerified
  return (
    <div className="mt-8 px-4 ml-6 bg-white w-[750px] h-[480px] rounded-lg">
      <div className="flex justify-between items-center py-3 px-3 ">
        <div className="w-[102px] h-[40.91px] py-3.5 rounded-md border border-black justify-center items-center inline-flex cursor-pointer">
          <div className="text-black text-base font-semibold " onClick={goBack}>
            {BACK}
          </div>
        </div>
      </div>
      <div className="text-xl font-semibold flex justify-center ">
        <Image
          src={verificationTag}
          width={200}
          height={200}
          alt="verificationTag"
        />
      </div>
      <div className="flex justify-center">
        <p className="text-sm text-gray-600">
          {VERIFICATION_STATUS_TEXT}
          <button
            onClick={handleLearnMoreClick}
            className="text-blue-600 hover:underline"
          >
            {LEARN_MORE}
          </button>
          {modalVisible && <Modal onClose={closeModal} />}
        </p>
      </div>
      <div className="px-3">
        <div className="flex justify-between items-center p-4 rounded shadow">
          <h1 className="text-black text-base font-semibold capitalize">
            {M_VERIFICATION_STEP1_TEXT}
          </h1>
          <div className="flex items-center gap-2">
            {isKycVerified ? (
              <Image
                src={isKycVerifiedImage}
                width={140}
                height={100}
                alt="isKycVerified"
              />
            ) : (
              <>
                <Image src={pending} width={100} height={100} alt="pending" />
                <Image
                  src={editIcon}
                  width={20}
                  height={20}
                  alt="edit"
                  onClick={openKYCModal}
                  className="cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
        {!isKycVerified && showKYCModal && (
          <ReviewDetails
            onClose={handleCloseKYCModal}
            closeProfileModal={onClose}
          />
        )}
        <div className="flex justify-between items-center p-4 rounded shadow my-4">
          <span className="text-black text-base font-semibold capitalize">
            {M_VERIFICATION_STEP2_TEXT}
          </span>
          <div className="flex items-center gap-2">
            {isReviewComplete ? (
              <Image
                src={listingVerified}
                width={130}
                height={100}
                alt="listingVerified"
              />
            ) : (
              <>
                <Image src={pending} width={100} height={100} alt="pending" />
                <Image
                  src={editIcon}
                  width={20}
                  height={20}
                  onClick={openReviewModal}
                  alt="edit"
                  className="cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
        {isReviewModalVisible && (
          <EditModal
            onClose={closeReviewModal}
            Component={EditPage}
            setIsReviewModalVisible={setIsReviewModalVisible}
            isReviewModalVisible={isReviewModalVisible}
            text={REVIEW_LISTING}
            id={DATA}
            setData={setData}
            API_PATH={PROPERTY_EDIT_ROUTE}
          />
        )}
        <div className="flex justify-between items-center p-4 rounded shadow ">
          <span className="text-black text-base font-semibold capitalize">
            {M_VERIFICATION_STEP3_TEXT}
          </span>
          <div className="flex items-center gap-2">
            {isLocationVerified ? (
              <div>
                <Image
                  src={LocationVerified}
                  width={100}
                  height={80}
                  alt="Location Verified"
                />
              </div>
            ) : (
              <>
                <Image src={pending} width={100} height={100} alt="pending" />
                <Image
                  src={editIcon}
                  width={20}
                  height={20}
                  alt="edit"
                  onClick={handleOpenShowLocationModal}
                  className="cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
        {showLocationModal && (
          <Location
            onClose={handleCloseShowLocationModal}
            setShowLocationModal={setShowLocationModal}
            property={DATA}
            setData={setData}
            onLocationVerified={handleLocationVerified}
          />
        )}
        <div className="flex justify-between items-center p-4 rounded shadow my-4">
          <span className="text-black text-base font-semibold capitalize">
            {M_VERIFICATION_STEP4_TEXT}
          </span>
          <div className="flex items-center gap-2">
            <Image src={pending} width={100} height={100} alt="pending" />
            <Image src={editIcon} width={20} height={20} alt="edit" onClick={openLiveCameraModal} className='cursor-pointer'/>
          </div>
          {showLiveCameraModal &&
          <LobbyScreens 
          onClose={openLiveCameraModal}
          /> 
          }
        </div>
      </div>
    </div>
  )
}

export default Steps
