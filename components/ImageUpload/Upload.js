import React, { useState } from 'react';
import PropTypes from 'prop-types';
import previewImage from '@/assets/ImageComponent/preview.svg'
import faTrash from '@/assets/ImageComponent/trash.svg'
import Image from 'next/image';
import roomOptions from './constant'
import ImagePreviewModal from './ImagePreviewModal'
import Styles from './backround.module.css'
import Loading from '@/pages/loading';
import { toast } from 'react-toastify';
import { COMPONENTS } from '@/textV2';
const { uploadOneImage, imageNumber, maxSize } = COMPONENTS.POST_PROPERTY_COMPO.stepFourText
const ImageUploader = ({
  onFileSelect,
  photoURLs = [],
  deletePhoto,
  onSetCover,
  coverImageUrl,
  handleImageNameChange,
  loading,
  icon,
  Text,
  key,
  Heading,
  textColor = "primary",
  textSize = "[0.875rem]",
  textAlign = "start",
  width = "120px",
  buttonLabel = "Attach Photos",
  buttonColor = "#931602",
  onlyButton,
  upload,
  setUpload,
  review
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const openPreview = (index) => {
    setCurrentPreviewIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const showNextImage = () => {
    setCurrentPreviewIndex((currentPreviewIndex + 1) % photoURLs.length);
  };

  const showPreviousImage = () => {
    setCurrentPreviewIndex((currentPreviewIndex - 1 + photoURLs.length) % photoURLs.length);
  };

  const handleSetAsCover = (imageUrl) => {
    onSetCover(imageUrl);
  };

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
    
  };
  

  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length + photoURLs.length < imageNumber) {
      toast.error(uploadOneImage);
      return;
    }
    const newPreviewImages = newFiles.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
    onFileSelect(newFiles);
    if (newFiles && setUpload != undefined) {
      setUpload(true)
    }
  };

  return (
    <div className={onlyButton && 'flex'}>
      {!onlyButton ?
        <div className={`flex items-center gap-4 bg-nearbySelectedBackground border-[1px] border-primary rounded-3xl md:w-[600px] p-4 max-md:p-2 max-md:px-2 mb-3 ${Styles.dashed}`}>
        <div className={`flex gap-4 p-0 sm:p-4 w-[100%] flex-col sm:flex-row ${Styles.parent}`}>
            <div className="max-md:flex max-md:justify-between max-md:items-center max-md:gap-4">
              {icon}
              <div className="w-[100px] max-sm:mr-1  h-8 lg:px-2 py-2 bg-nearbySelectedBackground rounded justify-center items-start ml-9 inline-flex md:hidden max-md:mx-auto">
                <div className=" lg:text-center text-primary text-[0.625rem] font-bold leading-normal">{maxSize}</div>
              </div>
            </div>
            <div className='flex flex-col gap-2 justify-start'>
              <div className='flex justify-between gap-4'>
                <div className='text-left'>
                  <h4 className='font-bold text-primary mb-2'>{Heading} <span className="text-red-500"> *</span></h4>
                  <p className={`h-[55px] break-keep text-${textColor} text-${textSize}  text-${textAlign}  font-normal leading-[128%] tracking-[0.14px]`}>
                    {Text}
                  </p>
                </div>
                <div className=" w-[12.2rem] h-8 px-2 py-2 md:px-0 bg-nearbySelectedBackground rounded justify-center items-start gap-2 inline-flex max-md:hidden">
                  <div className=" text-center text-primary font-bold leading-normal text-[0.625rem]">{maxSize}</div>
                </div>
              </div>
              <label
  style={{ ...inlineStyle }} 
  className="bg-red-600 max-[480px]:mt-12"
>
                {buttonLabel}
                <input type="file" className="hidden" key={key} onChange={handleChange} multiple accept="image/jpeg,image/png" />
              </label>
            </div>
          </div>
        </div>
        :
        <div>
          <input
            type="file"
            id="fileInput"
            key={key}
            onChange={handleChange}
            className="w-[90px] h-auto border-none outline-none"
            disabled={upload}
          />
        </div>
      }

      <div className={`grid md:grid-cols-4 justify-center xl:grid-cols-5 xl:gap-7 2xl:grid-cols-5 max-md:grid-cols-2`}>
        {loading && (
          <div className="loader-container">
            <Loading />
          </div>
        )}
        {photoURLs?.map((photoURL, index) => (
          <div key={`uploaded_${index}`} className="space-y-2">
            <div
              style={{
                backgroundImage: `url(${photoURL?.url})`,
                backgroundSize: "cover",
              }}
              className={`relative ${onlyButton ? 'ml-2 md:w-20 md:h-20' : review ? 'ml-1 w-20 h-20 md:w-20 md:h-20 lg:w-28 lg:h-28' : 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32'} rounded-lg overflow-hidden ${index === 0 && 'ring-2 ring-primary'}`}>
              <div className=' flex justify-between'>
                <button
                  onClick={() => openPreview(index)}
                  className={`px-0.5 ${onlyButton ? 'w-5 h-5' : 'w-6 h-6'}  bg-black bg-opacity-60 rounded-full border backdrop-blur-sm`}
                >
                  <Image
                    src={previewImage}
                    alt={` Photo ${index}`}
                  />
                </button>
                <button
                  onClick={() => deletePhoto(index, photoURL.url, setUpload)}
                  className={`px-0.5 ${onlyButton ? 'w-5 h-5' : 'w-6 h-6'}  bg-black bg-opacity-60 rounded-full border backdrop-blur-sm`}
                >
                  <Image
                    src={faTrash}
                    alt={` Photo ${index}`}
                  />
                </button>
              </div>
            </div>
            {!onlyButton &&
              <div className=" bottom-0 left-0 w-fit px-0.5 bg-white bg-opacity-75">
                <select value={photoURL.name}
                  onChange={(e) => handleImageNameChange(index, e.target.value)}
                  className=" mt-1 block max-md:w-[90px] max-md:text-ellipsis w-[110px] text-ellipsis rounded-sm  border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-[0.875rem] custom-scrollbar">
                  {roomOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="flex items-center mt-1 mr-[20%] justify-center">
                  <input
                    id="cover-checkbox"
                    type="checkbox"
                    checked={!photoURL.url === coverImageUrl ? true : index === 0}
                    onChange={() => handleSetAsCover(photoURL.url)}
                    className="w-4 h-3 bg-cyan-800 mr-1 ml-1"
                  />
                  <label
                    htmlFor="cover-checkbox"
                    className="text-gray-700 max-lg:w-[90px] text-ellipsis overflow-hidden whitespace-nowrap w-[120px] dark:text-gray-300 text-[0.875rem]"
                  >
                    Set as Cover
                  </label>

                </div>
              </div>
            }
          </div>
        ))}
      </div>
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        images={photoURLs}
        selectedIndex={currentPreviewIndex}
        onClose={closePreview}
        onNext={showNextImage}
        onPrevious={showPreviousImage}
      />
    </div>
  );
};

ImageUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
  photoURLs: PropTypes.array,
  deletePhoto: PropTypes.func,
  onSetCover: PropTypes.func.isRequired,
  handleImageNameChange: PropTypes.func.isRequired,
  icon: PropTypes.element,
  Text: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.string,
  textAlign: PropTypes.string,
  width: PropTypes.string,
  buttonColor: PropTypes.string,
};

export default ImageUploader;
