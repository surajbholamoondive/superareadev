import React, { useState } from 'react'
import Image from 'next/image'
import previewImage from '@/assets/ImageComponent/preview.svg'
import faTrash from '@/assets/ImageComponent/trash.svg'
import Loading from '@/pages/loading'
import { COMPONENTS } from '@/textV2'
import PropTypes from 'prop-types'

import PdfToImage from '../Admin/Post-Project/pdf'
import ImagePreviewModal from '../ImageUpload/ImagePreviewModal'
import Styles from './background.module.css'

const { uploadOneImage, imageNumber, maxSize } =
  COMPONENTS.POST_PROPERTY_COMPO.stepFourText

const DocumentUploader = ({
  onFileSelect,
  documentURLs = [],
  deleteDocument,
  loading,
  icon,
  Text,
  Heading,
  key,
  textColor = 'primary',
  textSize = '[0.875rem]',
  textAlign = 'start',
  width = '160px',
  buttonLabel = 'Attach Documents',
  buttonColor = '#931602',
  onlyButton,
}) => {
  const [previewDocuments, setPreviewDocuments] = useState([])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0)
  const openPreview = (index) => {
    setCurrentPreviewIndex(index)
    setIsPreviewOpen(true)
  }

  const closePreview = () => {
    setIsPreviewOpen(false)
  }

  const showNextDocument = () => {
    setCurrentPreviewIndex((currentPreviewIndex + 1) % documentURLs.length)
  }

  const showPreviousDocument = () => {
    setCurrentPreviewIndex(
      (currentPreviewIndex - 1 + documentURLs.length) % documentURLs.length
    )
  }

  const inlineStyle = {
    backgroundColor: buttonColor,
    width: width,
    height: '33px',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: 'rgb(255, 255, 255)',
    padding: '7px 7px',
    borderRadius: '0.25rem',
    cursor: 'pointer',    
  }

  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files)
    if (newFiles.length > 0) {
      const newPreviewDocs = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewDocuments([...previewDocuments, ...newPreviewDocs])
      onFileSelect(newFiles)
    }
  }

  return (
    <div className={onlyButton && 'flex'}>
      {!onlyButton ? (
        <div
          className={`flex items-center gap-4 bg-nearbySelectedBackground border-[1px] border-primary rounded-3xl md:w-[600px] p-4 max-md:p-2 max-md:px-2 mb-3 ${Styles.dashed}`}
        >
         <div className={`flex gap-4 p-0 sm:p-4 w-[100%] flex-col sm:flex-row ${Styles.parent}`}>
            <div className="max-md:flex max-md:justify-between max-md:items-center max-md:gap-4">
              {icon}
              <div className="w-[100px] max-sm:mr-1  h-8 lg:px-2 py-2 bg-nearbySelectedBackground rounded justify-center items-start ml-9 inline-flex md:hidden max-md:mx-auto">
                <div className="lg:text-center text-primary text-[0.625rem] font-bold leading-normal">
                  {maxSize}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <div className="flex justify-between gap-4">
                <div className="text-left">
                  <h4 className="font-bold text-primary mb-2">{Heading}</h4>
                  <p
                    className={` break-keep text-${textColor} text-${textSize} text-${textAlign} font-normal leading-[128%] tracking-[0.14px]  h-[55px] sm:h-auto `}
                  >
                    
                    {Text}
                  </p>
                </div>

                <div className=" w-[12.2rem] h-8 px-2 py-2 md:px-0 bg-nearbySelectedBackground rounded justify-center items-start gap-2 inline-flex max-md:hidden ">
                  <div className=" text-center text-primary font-bold leading-normal text-[0.625rem]">
                    {maxSize}
                  </div>
                </div>
              </div>
              <label
  style={inlineStyle}
  className="bg-red-600 max-[480px]:mt-12 "
>
  {buttonLabel}   
  <input
    type="file"
    className="hidden"
    key={key}
    onChange={handleChange}
    accept="image/*,.pdf"
    multiple
  />
</label>

            </div>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="file"
            id="fileInput"
            key={key}
            onChange={handleChange}
            className="w-[90px] h-auto"
            accept="image/*,.pdf"
            multiple
          />
        </div>
      )}

      <div
        className={`grid md:grid-cols-4 justify-center xl:grid-cols-5 xl:gap-7 2xl:grid-cols-5 max-md:grid-cols-2`}
      >
        {loading && (
          <div className="loader-container">
            <Loading />
          </div>
        )}
        {documentURLs?.map((doc, index) => (
          <div key={`uploaded_${index}`} className="space-y-2">
            <div
              className={`relative ${onlyButton ? 'ml-2 md:w-20 md:h-20' : 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32'} rounded-lg overflow-hidden`}
            >
              {doc.url.endsWith('.pdf') ? (
                <PdfToImage pdfUrl={doc.url} width={200} height={140} />
              ) : (
                <div
                  style={{
                    backgroundImage: `url(${doc.url})`,
                    backgroundSize: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
              <div className="flex justify-between absolute top-0 w-full p-1">
                <button
                  onClick={() => openPreview(index)}
                  className={`px-0.5 ${onlyButton ? 'w-5 h-5' : 'w-6 h-6'} bg-black bg-opacity-60 rounded-full border backdrop-blur-sm`}
                >
                  <Image src={previewImage} alt={`Preview ${index}`} />
                </button>
                <button
                  onClick={() => deleteDocument(index)}
                  className={`px-0.5 ${onlyButton ? 'w-5 h-5' : 'w-6 h-6'} bg-black bg-opacity-60 rounded-full border backdrop-blur-sm`}
                >
                  <Image src={faTrash} alt={`Delete ${index}`} />
                </button>
              </div>
            </div>
            <p className="text-sm truncate">{doc.name || 'Unnamed'}</p>
          </div>
        ))}
      </div>
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        images={documentURLs}
        selectedIndex={currentPreviewIndex}
        onClose={closePreview}
        onNext={showNextDocument}
        onPrevious={showPreviousDocument}
      />
    </div>
  )
}

DocumentUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  documentURLs: PropTypes.array,
  deleteDocument: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  icon: PropTypes.element,
  Text: PropTypes.string,
  Heading: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.string,
  textAlign: PropTypes.string,
  width: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonColor: PropTypes.string,
  onlyButton: PropTypes.bool,
}

export default DocumentUploader
