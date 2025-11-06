import { useState } from 'react';
import Image from 'next/image';
import { getLogger } from '@/helper/logger';
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2';
import { makeApiRequest } from '@/utils/utils';
import axios from 'axios';
import { toast } from 'react-toastify';



import ImageUploads from '@/components/ImageUpload/Upload';
import VideoUploader from '@/components/ImageUpload/videoUpload';



import pdf from '../../assets/ImageComponent/pdf.svg';
import DocumentUploader from '../DocumentUpload/DocumentUpload';
import roomOptions from '../ImageUpload/constant';
import Styles from './index.module.css';
import photo from './services/assets/photos.svg';
import video from './services/assets/Videoss.svg';


const { stepThreeText } = COMPONENTS.POST_PROPERTY_COMPO
const { text} = GLOBALLY_COMMON_TEXT

export default function NewStep4({DATA, setDATA, review }){
    const [videoURLs, setVideoURLs] = useState([])
    const [photoURLs, setPhotoURLs] = useState(DATA?.propertyImages || [])
    const [coverImageUrl, setCoverImageUrl] = useState('')
    const [orderedPhotoURLs, setOrderedPhotoURLs] = useState([])
    const [photoUploadLoading, setPhotoUploadLoading] = useState(false)
    const [videoUploadLoading, setVideoUploadLoading] = useState(false)
    const [documentURLs, setDocumentURLs] = useState(DATA?.propertyDocuments || []);
    const [documentUploadLoading, setDocumentUploadLoading] = useState(false);
    const [documentKey, setDocumentKey] = useState(0);
    const isVideoUploadDisabled = DATA?.propertyVideos?.length >= 1
    const { propertyCoverImage, propertyImages, propertyVideos } = DATA || {}
    const [uploadMessage, setUploadMessage] = useState('')
    const [uploadError, setUploadError] = useState('')
    const logger = getLogger()
    const [imageKey, setImageKey] = useState(0)
    const [videoKey, setVideoKey] = useState(0)

    const handlePhotoSelect = async (newFiles) => {
    const hdImagesMarked = {}
    const formData = new FormData()
    newFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file)
      const image = new window.Image()
      image.src = URL.createObjectURL(file)
      image.onload = function () {
        const naturalWidth = this.naturalWidth
        const naturalHeight = this.naturalHeight
        const isHDImage = naturalWidth >= 1920 && naturalHeight >= 1080
        hdImagesMarked[file.name] = isHDImage
      }
    })
    try {
      setPhotoUploadLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/aws-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const newPhotoUrls = response.data.result.imageUrls
      const newPhotoNames = response.data.result.imageNames
      const mappedNewPhotoUrls = newPhotoUrls.map((url, index) => ({
        name: 'Other',
        url: url,
        key: newPhotoNames[index],
      }))
      const updatedPhotoURLs = [...photoURLs, ...mappedNewPhotoUrls]
      setPhotoURLs(updatedPhotoURLs)
      setDATA({
        ...DATA,
        propertyImages: updatedPhotoURLs,
        hdImagesMap: hdImagesMarked,
      })
      toast.success(response?.data?.responseMessage)
      setPhotoUploadLoading(false)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
      setImageKey((prev) => prev + 1)
    } catch (error) {
      console.error('Error uploading images:', error)
      setPhotoUploadLoading(false)
    }
  }

    const handleImageNameChange = (index, newName) => {
    const updatedPhotoURLs = [...photoURLs]
    updatedPhotoURLs[index].name = newName
    setPhotoURLs(updatedPhotoURLs)
    setDATA({ ...DATA, propertyImages: updatedPhotoURLs })
  }

    const deletePhoto = async (index, url) => {
    const key = url?.substring(url.lastIndexOf('/') + 1)
    const BUCKET_NAME = 'superarea-prod-s3'
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        {
          Bucket: BUCKET_NAME,
          Key: key,
        }
      )
      if (response.status === 200) {
        const updatedPhotoURLs = propertyImages.filter(
          (photo, photoIndex) => photo?.url !== url
        )
        setPhotoURLs(updatedPhotoURLs)
        setDATA((prevData) => ({
          ...prevData,
          propertyImages: updatedPhotoURLs,
        }))
        toast.success(response.data?.responseMessage)
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      } else {
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('An error occurred while deleting photo:', error)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
    }
  }

    const handleSetCover = (url) => {
    const index = DATA?.propertyImages.findIndex((photo) => photo.url === url)
    if (index === -1) return
    let newOrderedPhotoURLs = [...DATA?.propertyImages]
    const selectedImage = newOrderedPhotoURLs.splice(index, 1)[0]
    newOrderedPhotoURLs.unshift(selectedImage)
    setOrderedPhotoURLs(newOrderedPhotoURLs)
    setCoverImageUrl(url)

    setDATA((prevDATA) => ({
      ...prevDATA,
      propertyCoverImage: url,
      propertyImages: [...newOrderedPhotoURLs],
    }))
  }

    const handleVideoSelect = async (selectedFiles) => {
      const validVideoFiles = selectedFiles.filter((file) =>
        file.type.startsWith('video/')
      )
  
      if (validVideoFiles.length === 0) {
        toast.error(stepThreeText.validFileText)
        return
      }
  
      const formData = new FormData()
      validVideoFiles.forEach((file, index) => {
        formData.append(`video${index}`, file)
      })
  
      try {
        setVideoUploadLoading(true)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}user/aws-video`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
  
        if (response.data.responseCode === 200) {
          const videoUrls = response?.data?.result
          const mappedVideoUrls = videoUrls.map((url, index) => ({
            id: index,
            url: url,
          }))
  
          setVideoURLs(mappedVideoUrls)
          setDATA({
            ...DATA,
            propertyVideos: mappedVideoUrls,
          })
          toast.success(response?.data?.responseMessage)
        } else {
          toast.error(response?.data?.responseMessage)
        }
        setVideoKey((prev) => prev + 1)
      } catch (error) {
        logger.error('Error uploading videos:', error)
        toast.error(error?.response?.data?.responseMessage)
      } finally {
        setVideoUploadLoading(false)
      }
  }

    const deleteVideo = async (index, url) => {
    const key = url?.substring(url.lastIndexOf('/') + 1)
    const BUCKET_NAME = 'superarea-prod-s3'

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-video`,
        {
          Bucket: BUCKET_NAME,
          Key: key,
        }
      )

      if (response.status === 200) {
        setVideoURLs((prevURLs) => prevURLs.filter((_, i) => i !== index))
        setDATA({
          ...DATA,
          propertyVideos: DATA?.propertyVideos?.filter((_, i) => i !== index),
        })
        toast.success(response?.data?.responseMessage)
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      } else {
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('An error occurred while deleting video:', error)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
    }
  }

    const handleDocumentSelect = async (newFiles) => {
      const formData = new FormData();
      newFiles.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
  
      try {
        setDocumentUploadLoading(true);
        const isPdf = newFiles[0].type === 'application/pdf';
        const apiEndpoint = isPdf
          ? `${process.env.NEXT_PUBLIC_API}user/aws-brochure`
          : `${process.env.NEXT_PUBLIC_API}user/aws-image`;
  
        const response = await makeApiRequest(
          'POST',
          apiEndpoint,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        const newDocs = isPdf
          ? [{ name: newFiles[0].name, url: response.data.result.brochureUrl }]
          : response.data.result.imageUrls.map((url, index) => ({
              name: newFiles[index].name,
              url,
            }));
  
        const updatedDocumentURLs = [...documentURLs, ...newDocs];
        setDocumentURLs(updatedDocumentURLs);
  
        setDATA({
          ...DATA,
          propertyDocuments: updatedDocumentURLs,
        });
  
        toast.success(response?.data?.responseMessage);
        setDocumentUploadLoading(false);
        setDocumentKey(prev => prev + 1);
      } catch (error) {
        console.error('Upload error:', error);
        setDocumentUploadLoading(false);
        toast.error('Failed to upload document');
      }
  }

    const handleDocumentRemove = async (index) => {
    const url = documentURLs[index].url;
    const key = url?.substring(url.lastIndexOf('/') + 1);
    const BUCKET_NAME = 'superarea-prod-s3';
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        {
          Bucket: BUCKET_NAME,
          Key: key,
        }
      );
  
      if (response.status === 200) {
        const updatedDocumentURLs = documentURLs.filter(
          (doc, docIndex) => docIndex !== index
        );
        setDocumentURLs(updatedDocumentURLs);
        setDATA((prevData) => ({
          ...prevData,
          propertyDocuments: updatedDocumentURLs,
        }))
        toast.success(response.data?.responseMessage);
        setTimeout(() => {
          setUploadMessage('');
        }, 3000);
      } else {
        setTimeout(() => {
          setUploadMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('An error occurred while deleting document:', error);
      setTimeout(() => {
        setUploadMessage('');
      }, 3000);
    }
  }

    return(
    <div className="bg-white px-11">
        <div className='mt-4'>
        <div className={`justify-center`}>
          <div className={`mt-2 ${Styles.subparent} max-w-[90%]`}>
            <ImageUploads 
            review={review}
              icon={
                <div className="flex items-center justify-center rounded-full bg-lightRedBg p-3 w-[90px] h-[90px] min-md:m-auto">
                  <Image src={photo} alt="Photo" width={55} height={55} />
                </div>
              }
              Text="Upload images for better property listings. Listings with more than 5 photos receive more views. Accepted formats are .jpg and .png. "
              Heading={text.uploadImageText}
              onFileSelect={handlePhotoSelect}
              key={imageKey}
              handleImageNameChange={handleImageNameChange}
              roomOptions={roomOptions}
              onFileRemove={deletePhoto}
              photoURLs={propertyImages}
              deletePhoto={deletePhoto}
              onSetCover={handleSetCover}
              coverImageUrl={propertyCoverImage}
              loading={photoUploadLoading}
            />
          </div>
          <div className="flex justify-end">
            <div className="grid grid-cols-3 gap-6"></div>
          </div>
          <div className="mt-2 max-w-[90%] ml-1">
            {' '}
            <VideoUploader
              icon={
                <div className="flex items-center justify-center rounded-full bg-lightRedBg p-3 w-[90px] h-[90px] min-md:m-auto">
                  <Image src={video} alt="Photo" width={55} height={55} />
                </div>
              }
              Heading={text.uploadVedioText}
              Text="Upload videos for better property listings. Listings with videos receive more views. Accepted formats are .mp4 and .mpeg."
              onFileSelect={(files) => handleVideoSelect(files)}
              key={videoKey}
              onFileRemove={(index) => deleteVideo(index, videoURLs[index].url)}
              deleteVideo={(index, url) => deleteVideo(index, url)}
              isUploadDisabled={isVideoUploadDisabled}
              videoURLs={propertyVideos}
              loading={videoUploadLoading}
            />
          </div>
          <div className="mt-2 max-w-[90%] ml-1">
            {' '}
            <DocumentUploader
        icon={
          <div className="flex items-center justify-start rounded-full bg-lightRedBg p-3 w-[90px] h-[90px] min-md:m-auto">
            <Image src={pdf} alt="Document" width={55} height={55} className="mx-auto" />
          </div>
        }
          Text="Upload documents for better property listings. Listings with documents receive more views. Accepted formats are .pdf and .png"
          Heading="Upload Documents"
          key={documentKey}
          onFileSelect={handleDocumentSelect}
          deleteDocument={handleDocumentRemove}
          documentURLs={documentURLs}
          loading={documentUploadLoading}
    />
          </div>
        </div>
        {uploadMessage && (
          <div
            className={`text-center mt-2 ${uploadMessage.includes('Error')
              ? 'text-primary'
              : 'text-green-500'
              }`}
          >
            {uploadMessage}
          </div>
        )}
        {uploadError && (
          <div className="text-center mt-2 text-red-500">{uploadError}</div>
        )}
      </div>
    </div>
    )

}