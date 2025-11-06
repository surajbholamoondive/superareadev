import React, { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/auth'
import alert from '../../assets/Kyc/e-kyc.svg'
import close from '../../assets/userDashboard/close.svg'
import ReviewDetails from '../User/profile/ReviewListing'
import { GLOBALLY_COMMON_TEXT, USER_PROFILE_TEXT } from '@/textV2'

const { text } = GLOBALLY_COMMON_TEXT
const { buttons } = USER_PROFILE_TEXT
const { goLiveNote, completeText } = USER_PROFILE_TEXT.text

const Modal = ({ onClose }) => {
  const [showKYCModal, setShowKYCModal] = useState(false)
  const handleOpenKYCModal = () => setShowKYCModal(true)
  const handleCloseKYCModal = () => setShowKYCModal(false)
  const [auth] = useAuth() || {}
  const userType = auth.userResult.userType

  return (
    <div className="fixed inset-0 bg-newBackground bg-opacity-50 flex justify-center items-center z-[999] p-4">
      <div className="w-full max-w-[500px] relative h-fit bg-white rounded-[20px] z-[99] px-4 pb-4 pt-5 sm:px-6">
        
        {/* Close Button */}
        <div className="absolute right-2 top-2" onClick={onClose}>
          <Image
            src={close}
            width={30}
            height={30}
            className="rounded-full p-2 border border-gray-400 cursor-pointer"
            alt="close"
          />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Image
            src={alert}
            width={150}
            height={150}
            className="max-w-[60%] sm:max-w-[200px] h-auto"
            alt="alert"
          />
        </div>

        {/* Text */}
        <div className="px-4 sm:px-10">
          {userType === text?.agentText ? (
            <div className="text-center text-black pb-2">
              <h3 className="pb-2 font-bold text-lg sm:text-xl">
                {completeText.split("e-KYC")[0]}
                <span style={{ color: "var(--secondary-color)", fontWeight: 800 }}>e-KYC</span>
                {completeText.split("e-KYC")[1]}
              </h3>
            </div>
          ) : (
            <div className="text-center text-black">
              <p className="font-bold text-base sm:text-lg">
                {goLiveNote.split("e-KYC")[0]}
                <span style={{ color: "var(--secondary-color)", fontWeight: 800 }}>e-KYC</span>
                {goLiveNote.split("e-KYC")[1]}
              </p>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-4">
          <button
            className="text-[var(--secondary-color)] bg-[var(--primary-bg)] px-6 py-2 sm:px-10 sm:py-[6px] border border-[var(--secondary-color)] rounded-xl cursor-pointer text-sm sm:text-base"
            onClick={handleOpenKYCModal}
          >
            {buttons.initiateKycButton}
          </button>
        </div>

        {/* Nested Modal */}
        {showKYCModal && <ReviewDetails onClose={handleCloseKYCModal} />}
      </div>
    </div>
  )
}

export default Modal
