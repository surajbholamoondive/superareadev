import React from 'react'
import Image from 'next/image'
import {
  E_KYC_VERIFICATION_PARAGRAPH_TEXT,
  E_KYC_VERIFICATION_TEXT,
  INTRODUCING,
  LIVE_CAMERA_VIDEO_VERIFICATION_PARAGRAPH_TEXT,
  LIVE_CAMERA_VIDEO_VERIFICATION_TEXT,
  REVIEW_LISTING_VERIFICATION_PARAGRAPH_TEXT,
  REVIEW_LISTING_VERIFICATION_TEXT,
  SCHEDULE_MEETING_VERIFICATION_PARAGRAPH_TEXT,
  SCHEDULE_VERIFICATION_TEXT,
  START_VERIFICATION_BUTTON_TEXT,
  STATIC_PAGE_PARAGRAPH_TEXT,
  STATIC_PAGE_TEXT,
} from '@/text'

import aadhaarMatch from '../../assets/Kyc/aadhaarMatch.svg'
import StepTray from '../../assets/M-verification/4thStepTray.svg'
import ScheduleMeeting from '../../assets/M-verification/ScheduleMeeting.svg'
import LiveCameraVerification from '../../assets/M-verification/LiveCameraVerification.svg'
import verificationTag from '../../assets/M-verification/estrata.svg'
import locationCheck from '../../assets/M-verification/locationCheck.svg'
import stepStart from '../../assets/M-verification/stepStart.svg'
import Modal from '../popupModal/modal'

const staticModal = ({ onClose }) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      inlineStyle={{
        modalColor: 'bg-white ',
        paragraphStyles: 'text-center ',
        modalWidth: 'w-[80%]',
        modalHeight: 'h-[95%]',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
        bgColor : ' bg-black bg-opacity-20'
        
      }}
    >
      <div className="px-10">
        <div className="flex gap-1">
          <div className='flex gap-1'>
          <h1 className="text-black text-[16px] font-semibold">{INTRODUCING}</h1>
          <Image
            src={verificationTag}
            width={16}
            height={16}
            alt="verificationTag"
          />
          <h1 className="text-black text-[16px] font-semibold">-Verification</h1>
          </div>
          <h1 className="text-black text-[16px] ">{STATIC_PAGE_TEXT}</h1>
        </div>
        <p className="text-black text-[14px] w-full font-medium leading-5 mt-2 ">
          {STATIC_PAGE_PARAGRAPH_TEXT}
        </p>
      </div>
      <div>
        <div className="flex justify-center gap-2 mt-5 ">
          <Image
            src={stepStart}
            width={330}
            height={200}
            alt="verificationTag"
          />
        </div>
        <div className="flex justify-center py-8">
          <Image src={StepTray} alt="e-KYC" width={450} height={400} />
        </div>
      </div>

      <div className=" flex justify-between mt-2 px-10">
        <div className=" justify-start  ">
          <h1 className=" text-black text-[16px] font-semibold">
            {E_KYC_VERIFICATION_TEXT}
          </h1>
          <p className="py-2 text-black text-[14px] font-medium w-[490px] ">
            {E_KYC_VERIFICATION_PARAGRAPH_TEXT}
          </p>
        </div>
        <div>
          <Image
            src={aadhaarMatch}
            width={250}
            height={250}
            alt="aadhaarMatch"
          />
        </div>
      </div>
      <div className=" flex justify-between  py-14 px-10">
        <div>
          <Image
            src={locationCheck}
            width={250}
            height={250}
            alt="locationCheck"
          />
        </div>
        <div className=" justify-start w-[490px] ">
          <h1 className=" text-black text-[16px] font-semibold  ">
            {REVIEW_LISTING_VERIFICATION_TEXT}
          </h1>
          <p className=" py-2 text-black text-sm font-medium ">
            {REVIEW_LISTING_VERIFICATION_PARAGRAPH_TEXT}
          </p>
        </div>
      </div>
      <div className=" flex justify-between px-10">
        <div className=" justify-start w-[490px] mt-6 ">
          <h1 className=" text-black text-[16px] font-semibold">
            {SCHEDULE_VERIFICATION_TEXT}
          </h1>
          <p className="py-2 text-black text-sm font-medium w-[490px] ">
            {SCHEDULE_MEETING_VERIFICATION_PARAGRAPH_TEXT}
          </p>
        </div>
        <div>
          <Image
            src={ScheduleMeeting}
            width={250}
            height={250}
            alt="aadhaarMatch"
          />
        </div>
      </div>
      <div className=" flex justify-between px-10">
        <div>
          <Image
            src={LiveCameraVerification}
            width={250}
            height={250}
            alt="locationCheck"
          />
        </div>
        <div className=" justify-start w-[490px] ">
          <h1 className=" text-black text-[16px] font-semibold mt-3  ">
            {LIVE_CAMERA_VIDEO_VERIFICATION_TEXT}{' '}
          </h1>
          <p className=" py-2 text-black text-sm font-medium ">
            {LIVE_CAMERA_VIDEO_VERIFICATION_PARAGRAPH_TEXT}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="text-white w-48 h-12 text-[16px] bg-red-800 rounded-xl "
        >
          {START_VERIFICATION_BUTTON_TEXT}
        </button>
      </div>
    </Modal>
  )
}
export default staticModal
