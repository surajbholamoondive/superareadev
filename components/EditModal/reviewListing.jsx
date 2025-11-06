import React from 'react'
import Image from 'next/image'
import { useData } from '@/context/data'
import {
  BACK_LISTING_BUTTON,
  REVIEW_LISTING_STEP_END_TEXT,
  REVIEW_LISTING_STEP1_HEADING,
  REVIEW_LISTING_STEP1_TEXT,
  REVIEW_LISTING_STEP2_HEADING,
  REVIEW_LISTING_STEP2_TEXT,
  REVIEW_LISTING_STEP3_HEADING,
  REVIEW_LISTING_STEP3_TEXT,
  UNDER_REVIEW_TEXT,
  PROCEED_TEXT,
} from '@/text'

import reviewForm from '../../assets/Kyc/reviewForm.svg'
import Modal from '../popupModal/modal'
import { useRouter } from 'next/router'

const reviewListing = ({
  setDATA,
  DATA,
  onClose,
  close,
  setIsReviewComplete
}) => {
  const [data, setData] = useData()

  const router = useRouter()

  const handleClose = () => {
    setIsReviewComplete(true)
    onClose()
    close()
    setDATA(DATA)
    setData({})
  }

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center ',
        modalWidth: 'w-[80%]',
        modalHeight: 'h-[99%]',
        childrenPaddings: 'p-3',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
      }}
    >
      <div className="flex justify-center mt-8">
        <Image src={reviewForm} width={220} height={220} alt="reviewForm" />
      </div>
      <div className="px-32"></div>
      <div className="flex justify-center mt-4">
        <div className="text-cyan-700 text-[14px] font-[12px] ">
          {UNDER_REVIEW_TEXT}
        </div>
      </div>
      <div className="flex mt-4 px-20">
        <div className="text-[16px] font-semibold">
{PROCEED_TEXT}        </div>
      </div>
       <div className=" mt-6 px-20">
        <h1 className="text-[16px] font-semibold ">{REVIEW_LISTING_STEP1_TEXT}</h1>
        <p className="text-[14px] font-medium px-2">
          {REVIEW_LISTING_STEP1_HEADING}
        </p>
      </div>
      <div className=" mt-6 px-20">
        <h1 className="text-[16px] font-semibold ">{REVIEW_LISTING_STEP2_TEXT}</h1>
        <p className="text-[14px] font-medium px-2">
          {REVIEW_LISTING_STEP2_HEADING}
        </p>
      </div>
      <div className=" mt-6 px-20">
        <h1 className="text-[16px] font-semibold ">{REVIEW_LISTING_STEP3_TEXT}</h1>
        <p className="text-[14px] font-medium px-2">
          {REVIEW_LISTING_STEP3_HEADING}
        </p>
      </div>
      <div className=" mt-6 px-20">
        <p className="text-[16px] font-semibold px-2">
          {REVIEW_LISTING_STEP_END_TEXT}
        </p>
      </div>
      <div className="flex justify-center py-6">
        <div className="w-[234px] h-12 bg-red-800 rounded-lg">
          <button
            className="text-white text-[14px] font-semibold ml-16 py-3.5"
            onClick={handleClose}
          >
            {BACK_LISTING_BUTTON}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default reviewListing
