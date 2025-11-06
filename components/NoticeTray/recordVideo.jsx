import React, { useState } from 'react'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import {
  ADMIN_TYPE,
  FORM_SUBMIT,
  LIVE_CAMERA_RECORDING,
  POST_TEXT,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'

import Modal from '@/components/popupModal/modal'


const ReportVideo = ({ isOpen, onClose, DATA }) => {
  const [previewIsOpen, setPreviewIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [imagesForPreview, setImagesForPreview] = useState([])
  const [remark, setRemark] = useState('')
  const logger = getLogger()
  const [auth] = useAuth()
  const admin = auth?.userResult?.userType === ADMIN_TYPE
  if (!isOpen) return null
  const handleClose = () => onClose()
  const handleImageClick = (image) => {
    setSelectedIndex(0)
    setImagesForPreview([image])
    setPreviewIsOpen(true)
  }
  const handleClosePreview = () => setPreviewIsOpen(false)
  const handleStatusChange = async (newStatus) => {
    const payload = {
      status: newStatus,
      remark: remark,
    }
    try {
      const response = await makeApiRequest(
        POST_TEXT,
        `${process.env.NEXT_PUBLIC_API}property/admin-form-submit/${DATA?._id}`,
        {
          body: JSON.stringify(payload),
        }
      )
      if (response.status === 200) {
        toast.success(FORM_SUBMIT)
        onClose()
      } else {
        logger.error(error)
      }
    } catch (error) {
      logger.error(error)
    }
  }
  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      heading={LIVE_CAMERA_RECORDING}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center',
        modalWidth: 'w-[70%]',
        modalHeight: 'h-fit',
        childrenPaddings: 'px-12',
        headingStyles: 'text-center mt-3 text-black font-semibold text-xl',
      }}
    >
      <div className="bg-opacity-60 p-1 rounded-lg mt-2 pb-12">
        <div className="flex justify-evenly mt-3 px-3 ">
          <video
            className="rounded-lg shadow-lg"
            width="300"
            height="200"
            controls
          >
            <source
              src={
                DATA?.mVerificationDetails?.liveCameraVerification?.liveCameraVideoUrl?.[0]?.[0]?.url
              }
              type="video/webm"
            />
          </video>
        </div>
      </div>
    </Modal>
  )
}

export default ReportVideo
