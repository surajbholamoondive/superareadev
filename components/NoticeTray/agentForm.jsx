import React, { useState } from 'react'
import Image from 'next/image'
import {
  AREA_MAPS,
  BALCONIES,
  BATHROOM_TEXT,
  BHK,
  DEDICATED_ROOMS,
  FLOORING,
  LIVE_CAMERA_TEXT_FORM,
  QUESTION_1_TEXT,
  QUESTION_2_TEXT,
  QUESTION_3_TEXT,
  QUESTION_4_TEXT,
  QUESTION_5_TEXT,
  QUESTION_6_TEXT,
  QUESTION_7_TEXT,
  SHOW_EACH_BATH,
  WITH,
} from '@/text'

import Modal from '../popupModal/modal'
import { numberFormatter } from '@/utils/utils'

const agentForm = ({ isOpen, onClose, DATA }) => {
  if (!isOpen) return null
  const { mVerificationDetails } = DATA || {}
  const { mVerificationReport } = mVerificationDetails || {}
  const {
    balconies,
    dedicatedRooms,
    flooring,
    locality,
    towerBlock,
    propertySize,
    propertySizeUnit,
    bedroomCount,
    bathroomCount,
    propertyImages,
  } = mVerificationReport || {}
  const displayedArea = mVerificationReport?.areaDetail?.find(area => area.display === true);

  const balconyImages = propertyImages?.filter((image) => {
    const normalizedImageName = image.name.trim()
    return BALCONIES.includes(normalizedImageName)
  })
  const dedicatedRoomImage = propertyImages?.filter((image) => {
    const normalizedImageName = image.name.trim()
    return DEDICATED_ROOMS.includes(normalizedImageName)
  })

  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageList, setImageList] = useState([])
  const openImageViewer = (images, index) => {
    setImageList(images)
    setCurrentImageIndex(index)
    setImageViewerOpen(true)
  }
  const closeImageViewer = () => setImageViewerOpen(false)

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : imageList.length - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex < imageList.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      inlineStyle={{
        modalColor: 'bg-white',
        paragraphStyles: 'text-center ',
        modalWidth: 'w-[70%]',
        modalHeight: 'h-[80%]',
        childrenPaddings: 'p-9',
        headingStyles: 'text-center text-black font-semibold text-[15px]',
      }}
    >
      <div className="overflow-y-auto mix-h-[400px] px-10">
        <h2 className="text-xl font-semibold mb-4 flex justify-center">
          {LIVE_CAMERA_TEXT_FORM}
        </h2>
        <div className="space-y-3 mt-8">
          {DATA && (
            <>
              <p className="bg-lightRedBg bg-opacity-5 rounded-[5px] border border-black border-opacity-30 w-full h-auto px-3 py-1 text-sm">
                {QUESTION_1_TEXT}
              </p>
              <p className="bg-lightRedBg bg-opacity-5 rounded-[5px] border border-black border-opacity-30 w-full h-auto px-3 py-1 text-sm">
                {QUESTION_2_TEXT} (
                <span className="font-semibold">
                  {locality}
                  {towerBlock ? `, ${towerBlock}` : ''}
                </span>
                )
              </p>
              <p className="bg-lightRedBg bg-opacity-5 rounded-[5px] border border-black border-opacity-30 w-full h-auto px-3 py-1 text-sm">
                {QUESTION_3_TEXT}(
                <span className="font-semibold">
                  {numberFormatter(displayedArea?.propertySize)} {AREA_MAPS[displayedArea?.propertySizeUnit]}
                </span>
                )
              </p>
              {bedroomCount && bathroomCount && (
                <p className="bg-lightRedBg bg-opacity-5 rounded-[5px] border border-black border-opacity-30 w-full h-auto px-3 py-1 text-sm">
                  {QUESTION_4_TEXT}{' '}
                  <span className="font-semibold">
                    {bedroomCount} {BHK}
                  </span>
                  &nbsp;
                  {WITH}
                  <span className="font-semibold">
                    &nbsp;{bathroomCount} {BATHROOM_TEXT}
                  </span>
                  {SHOW_EACH_BATH}
                </p>
              )}
              {balconies && (
                <div className="bg-lightRedBg bg-opacity-5 rounded-[5px] border border-black border-opacity-30 w-full  h-auto px-3 py-3 text-sm">
                  {QUESTION_5_TEXT}
                  <div className="flex justify-between">
                    <div className="font-semibold text-[14px] ml-8 mt-3">
                      {Object.keys(balconies).map((key, index) => (
                        <p key={key} className="py-8 gap-2">
                          {key} :
                        </p>
                      ))}
                    </div>
                    <div className=" py-3">
                      {balconyImages.map((image, index) => (
                        <div className="py-1 cursor-pointer" key={index} onClick={() => openImageViewer(balconyImages, index)}>
                          <Image
                            src={image.url}
                            width={50}
                            height={50}
                            alt={image.name}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {dedicatedRooms && dedicatedRooms.length > 0 && (
                <div className="flex  justify-between bg-lightRedBg bg-opacity-5 rounded-[5px] border border-black border-opacity-30 w-full h-auto px-3 py-3 text-sm">
                  <div>
                    {QUESTION_6_TEXT}
                    <div className="font-semibold text-[14px] ml-8 mt-3">
                      {dedicatedRooms.map((room, index) => (
                        <p key={index} className="py-3 ">
                          {room}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-7">
                    {dedicatedRoomImage.map((image, index) => (
                      <div className="py-1 cursor-pointer " key={index} onClick={() => openImageViewer(dedicatedRoomImage, index)}>
                        <Image
                          key={index}
                          src={image.url}
                          width={50}
                          height={50}
                          alt="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {flooring && (
                <div className="bg-lightRedBg bg-opacity-5 rounded-[5px] border border-black border-opacity-30 w-full h-auto px-3 py-1 text-sm">
                  {QUESTION_7_TEXT}
                  <span className="font-semibold">&nbsp;{flooring}&nbsp;</span>
                  {FLOORING}?
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {imageViewerOpen && (
        <Modal isOpen={true} isShow={true} onClose={closeImageViewer}>
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center">
            <button
              onClick={closeImageViewer}
              className="absolute top-5 right-5 text-white text-2xl hover:text-gray-300"
            >
              ✖
            </button>
            <button
              onClick={prevImage}
              className="absolute left-5 text-white text-4xl hover:text-gray-300"
            >
              &lt;
            </button>
            <div className="flex justify-center items-center">
              <Image
                src={imageList[currentImageIndex].url}
                width={800}
                height={800}
                className="max-w-[80vw] max-h-[80vh] object-contain"
                alt="Full View"
              />
            </div>
            <button
              onClick={nextImage}
              className="absolute right-5 text-white text-4xl hover:text-gray-300"
            >
              &gt;
            </button>
          </div>
        </Modal>
      )}
    </Modal>
  )
}

export default agentForm
