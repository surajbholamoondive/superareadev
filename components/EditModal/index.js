import React from 'react'
import { useRouter } from 'next/router'
import { useMediaQuery, useTheme, IconButton } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '../popupModal/modal'
import {
  EDIT_PROPERTY,
  TEXT_LISTING_HEADING,
  REVIEW_LISTING_TEXT,
} from '@/text'

const EditModal = ({
  setIsReviewComplete,
  setIsReviewModalVisible,
  editComplete,
  seteEditComplete,
  isReviewModalVisible = true,
  onClose,
  Component,
  type,
  id,
  text,
  setData,
  API_PATH,
}) => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = React.useCallback(() => {
    onClose()
  }, [onClose])

  const renderContent = () => (
    <>
      {text ? (
        <div>
          <div className="flex justify-center text-lg mb-3">
            <h1 className="text-[25px] flex font-extrabold">{text}</h1>
          </div>
          <div className="flex items-center  text-black font-medium text-sm">
            <p>{REVIEW_LISTING_TEXT}</p>
          </div>
          <div className="px-3 py-1 bg-[#F5EBD7] flex items-center rounded-[5px] mt-1 w-[91%]">
            <h3 className="text-[#C88E20] text-sm">{TEXT_LISTING_HEADING}</h3>
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-lg">
          <h1 className="text-[25px] flex font-extrabold">{EDIT_PROPERTY}</h1>
        </div>
      )}
      <div className="mt-3">
        {Component && (
          <Component
            Type={type}
            editComplete={editComplete}
            seteEditComplete={seteEditComplete}
            setData={setData}
            onClose={onClose}
            ID={id}
            setIsReviewComplete={setIsReviewComplete}
            setIsReviewModalVisible={setIsReviewModalVisible}
            isReviewModalVisible={isReviewModalVisible}
            close={handleClose}
            API_PATH={API_PATH}
            isReview={false}
          />
        )}
      </div>
    </>
  )

  return isMobile ? (
    <Drawer open={true} anchor="right" onClose={handleClose}>
      <div className="flex justify-end items-center px-4 py-2">
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {renderContent()}
    </Drawer>
  ) : (
    <Modal
      isOpen={isReviewModalVisible}
      onClose={handleClose}
      inlineStyle={{
        modalColor: 'bg-[#F7FBFC]',
        paragraphStyles: 'text-center',
        modalWidth: 'w-[80%]',
        modalHeight: 'h-[95%]',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
      }}
    >
      {renderContent()}
    </Modal>
  )
}

export default EditModal
