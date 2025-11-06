import React from 'react'
import Image from 'next/image'
import { makeApiRequest } from '@/utils/utils'

import Alert from '../../assets/M-verification/Alert.svg'
import { toast } from 'react-toastify'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const{putType}=GLOBALLY_COMMON_TEXT.text
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  DATA,
  setIsConfirmModalOpen,
  isConfirmModalOpen,
}) => {
  if (!isOpen) return null

  const handleConfirm = async () => {
    try {
      const response = await makeApiRequest(
        putType,
        `/property/edit-by-agent/${DATA?._id}`
      )
      if (response.status === 200) {
        toast("Thank You.")
        setIsConfirmModalOpen(false)
        onClose()
      }
    } catch (error) {
      console.error('Error updating property:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[9999]">
      <div className="bg-white w-96 h-60 p-6 rounded-lg shadow-lg flex items-center">
        <div>
          <div className=" flex justify-center items-center mb-2 ">
            <Image src={Alert} width={60} height={60} alt="Alert" />
          </div>
          <p className="text-center">
            Would you like to allow the assigned agent to edit and review the
            listing?
          </p>
          <div className="flex justify-around mt-4">
            <button
              className="bg-[#931602]  border border-solid  text-white px-4 py-2 rounded-md w-[80px] cursor-pointer"
              onClick={handleConfirm}
            >
              Yes
            </button>
            {/* <button
              className="bg-[#018191] text-white px-4 py-2 rounded"
              onClick={() => {
                setIsConfirmModalOpen(false)
              }}
            >
              No
            </button> */}
            <button
              onClick={() => {
                setIsConfirmModalOpen(false)
              }}
              className="border border-solid border-black text-black px-4 py-2 rounded-md w-[80px] cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
