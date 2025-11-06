import React, { useState } from 'react'
import Image from 'next/image'
import { getLogger } from '@/helper/logger'
import {
  AGENT_CANNOT_BE_ASSIGNED_FIRST,
  APPROVE_BUTTON,
  APPROVE_SMALL,
  CANNOT_UPDATE_WITH_SAME,
  ENTER_STATUS_REASON,
  MODIFIED_TEXT,
  PENDING_TEXT,
  PREVIEW_TEXT,
  PROPERTY_STATUS_CHANGED,
  REJECT_BUTTON,
  REJECT_TEXT,
  REMARK_TEXT,
  STATUS_CHANGE_ROUTE,
  TEXT_BOX_ERROR,
  TIME_SENSITIVITY_HIGH,
} from '@/text'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import { toast } from 'react-toastify'
import style from './index.module.css'
import SinglePropertyFullView from '@/components/SingleProperty'
import close from '../../../assets/ButtonIcons/newbackButton.svg'
import NOTIFICATION_TYPE from '@/textV2'
import { useNotification } from '@/context/notificationContext'

const PropertyModal = ({
  open,
  handleClose,
  propertyData,
  clicked,
  setClicked,
  myStatusMessage,
  setMyStatusMessage,
  setIsEditModalOpen,
  isEditModalOpen,
  setAssigning,
  assigning,
  setNewagent,
  newagent

}) => {
  const [statusMessage, setStatusMessage] = useState('')
  const [status, setStatus] = useState('')
  const logger = getLogger()
  const CurrentListingStatus = propertyData?.approvalStatus?.status;
  const handleChange = (event) => {
    setStatusMessage(event.target.value)
  }

  const { _id, postedBy } = propertyData || {}
  const { storeNotification } = useNotification()


  const handlePropertyModalClose = () => {
    setStatusMessage('')
    setClicked(!clicked);
    setStatus("approved");
    handleClose();
  }
  const handleStatusChange = (newStatus, statusMessage) => {
    if (CurrentListingStatus === newStatus) {
      toast.error(CANNOT_UPDATE_WITH_SAME)
      return
    }
    else if (statusMessage.length === 0) {
      toast.error(TEXT_BOX_ERROR)
    }
    else if (newStatus === APPROVE_SMALL && !assigning && propertyData?.isAgentRequired) {
      handleClose();
      if (!propertyData?.assignedTo) {
        setIsEditModalOpen(true)
        setMyStatusMessage(statusMessage)
        toast.success(AGENT_CANNOT_BE_ASSIGNED_FIRST)
        setNewagent("assignment")

        const bodyData = {
          status: newStatus,
          statusMessage: statusMessage,
        }
        axios
          .post(`${STATUS_CHANGE_ROUTE}/${_id}`, bodyData)
          .then((response) => {
            toast.success(PROPERTY_STATUS_CHANGED)
            setStatusMessage('')
            setClicked(!clicked);
            setStatus(newStatus);
            handleClose();
            storeNotification({
              userId: postedBy._id.toString(),
              propertyId: _id.toString(),
              notificationType: NOTIFICATION_TYPE.LISTING_STATUS,
              text: statusMessage,
              timeSensitivity: TIME_SENSITIVITY_HIGH,
              listingStatus: newStatus,
            })
          })
          .catch((error) => {
            logger.error('Error:', error)
          })
      }
    }
    else {
      const bodyData = {
        status: newStatus,
        statusMessage: statusMessage,
      }
      axios
        .post(`${STATUS_CHANGE_ROUTE}/${_id}`, bodyData)
        .then((response) => {
          toast.success(PROPERTY_STATUS_CHANGED)
          setStatusMessage('')
          setClicked(!clicked);
          setStatus(newStatus);
          handleClose();
          storeNotification({
              userId: postedBy._id.toString(),
              propertyId: _id.toString(),
              notificationType: NOTIFICATION_TYPE.LISTING_STATUS,
              text: statusMessage,
              timeSensitivity: TIME_SENSITIVITY_HIGH,
              listingStatus: newStatus,
            })
        })
        .catch((error) => {
          logger.error('Error:', error)
        })
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="w-full mx-auto pb-50 py-5 flex justify-center  h-[80vh] mb-10 mt-5"
    >
      <div className="fixed inset-0 flex items-center justify-center  bg-white bg-opacity-10">
        <div
          className={`relative  h-[90%] w-[90vw] bg-white overflow-hidden rounded-xl`}
        >

          <div className={` h-[100%] relative overflow-y-scroll  ${style.customScroll}`}>
            <Image
              src={close}
              width={38}
              height={38}
              alt="Close"
              className="sticky ml-17  top-1 left-[98%] bottom-2  cursor-pointer rounded-full  text-xl"
              onClick={handleClose}
            />
            <div className=" flex items-center justify-center  text-2xl text-black font-black">
              {PREVIEW_TEXT}
            </div>
            <SinglePropertyFullView
              className={'w-[100%] h-fit mt-15'}
              isVisiable={false}
              propertyData={propertyData}
              showRecommendation={false}
            />
            <div className=" flex flex-col justify-center items-center mt-2 text-bold">
              {' '}
              <label className={`self-start mt-15 pl-[37px] mb-2 font-extrabold `}>{REMARK_TEXT}</label>
              <input
                onChange={handleChange}
                placeholder={ENTER_STATUS_REASON}
                required
                maxLength={200}
                className={` mx-5  border border-solid border-black flex-col  focus:border-black focus:outline-none justify-center items-center h-[28%] w-[94%] rounded-lg pl-2 pb-16 px-2 `}

              />
            </div>
            <div className="flex h-50 gap-2 mt-10 mb-5 justify-center">
              <button
                onClick={() => handleStatusChange(REJECT_TEXT, statusMessage)}
                className={`border-solid  rounded-md ${CurrentListingStatus !== REJECT_TEXT ? 'bg-[#931602]' : 'bg-gray-400'} border-[1px] h-[33px] w-[10vw] text-white`}
              >
                {REJECT_BUTTON}
              </button>
              <button
                onClick={() => handleStatusChange(PENDING_TEXT, statusMessage)}
                className={` border-solid  rounded-md ${(CurrentListingStatus !== PENDING_TEXT ? 'bg-[#C88E20] text-white' : 'bg-gray-300')} border-[1px] h-[33px] w-[10vw] text-white`}
              >
                {MODIFIED_TEXT}
              </button>
              <button
                onClick={() =>
                  handleStatusChange(APPROVE_SMALL, statusMessage)
                }
                className={` border-solid ${(CurrentListingStatus !== APPROVE_SMALL ? 'bg-primary text-white' : 'bg-gray-300')}  rounded-md  border-[1px]  h-[33px] w-[10vw] text-white`}
              >
                {APPROVE_BUTTON}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default PropertyModal