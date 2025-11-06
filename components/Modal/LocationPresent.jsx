import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { PUT_REQ } from '@/text'
import { makeApiRequest } from '@/utils/utils'
import locationProperty from '../../assets/M-verification/locationProperty.svg'
import { MY_LISTING_TEXT } from '@/textV2'
const { ownerRepresentativeText, agentText, presentOnLocationText } =
  MY_LISTING_TEXT.bottomStepsTray

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  DATA,
  setIsConfirmModalOpen,
  isConfirmModalOpen,
}) => {
  if (!isOpen) return null
  const router = useRouter()

  const handleSelection = async (selection) => {
    try {
      const response = await makeApiRequest(
        PUT_REQ,
        `/property/present-on-location/${DATA?._id}`,
        { presentOnLocation: selection }
      )
      if (response.status === 200) {
        setIsConfirmModalOpen(false)
        router.reload()
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[9999]">
      <div className="bg-white w-96 h-60 p-6 rounded-lg shadow-lg flex justify-center items-center">
        <div>
          <div className=" flex justify-center items-center mb-2 ">
            <Image src={locationProperty} width={70} height={70} alt="Alert" />
          </div>
          <p className="text-center justify-center">{presentOnLocationText}</p>
          <div className="flex justify-between mt-6">
            <button
              className="bg-primary border border-solid text-white px-4 py-2 rounded-md w-[80px] cursor-pointer"
              onClick={() => handleSelection('Agent')}
            >
              {agentText}
            </button>

            <button
              className="border border-solid border-black text-black px-2 py-2 rounded-md  cursor-pointer"
              onClick={() => handleSelection('Individual')}
            >
              {ownerRepresentativeText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ConfirmationModal
