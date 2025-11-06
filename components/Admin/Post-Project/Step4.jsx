import React, { useState } from 'react'
import Image from 'next/image'

import { makeApiRequest } from '@/utils/utils'
import axios from 'axios'
import { toast } from 'react-toastify'
import ImageUploader from '@/components/ImageUpload/Upload'
import VideoUploader from '@/components/ImageUpload/videoUpload'
import pdf from '../../../assets/ImageComponent/pdf.svg'
import photo from '../../../assets/ImageComponent/photos.svg'
import faTrash from '../../../assets/ImageComponent/trash.svg'
import video from '../../../assets/ImageComponent/Videos.svg'
import roomOptions from '../../ImageUpload/constant'
import styles from './index.module.css'
import PdfToImage from './pdf'
import { GLOBALLY_COMMON_TEXT, COMPONENTS } from '@/textV2'
import DocumentUploader from '@/components/DocumentUpload/DocumentUpload'
const { text } = GLOBALLY_COMMON_TEXT
const { POST_PROJECT_COMPO } = COMPONENTS
const { stepFourText, routes } = POST_PROJECT_COMPO
export default function Step4({ projectData, setProjectData }) {
  const [videoURLs, setVideoURLs] = useState([])
  const [photoURLs, setPhotoURLs] = useState(projectData?.projectImages || [])
  const [brochureURLs, setBrochureURLs] = useState(
    projectData?.projectBrochurePdf || null
  )
  const [coverImageUrl, setCoverImageUrl] = useState(
    projectData?.projectCoverImage || ''
  )
  const [photoUploadLoading, setPhotoUploadLoading] = useState(false)
  const [brochureUploadLoading, setBrochureUploadLoading] = useState(false)
  const [videoUploadLoading, setVideoUploadLoading] = useState(false)
  const isVideoUploadDisabled = projectData?.projectVideos?.length >= 1
  const {
    projectCoverImage,
    projectImages,
    projectVideos,
    projectBrochurePdf,
  } = projectData || {}
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [orderedPhotoURLs, setOrderedPhotoURLs] = useState([])
  const [imageKey, setImageKey] = useState(0)
  const [videoKey, setVideoKey] = useState(0)
  const [brochureKey, setbrochureKey] = useState(0)
  const [documentUploadLoading, setDocumentUploadLoading] = useState(false);
  const [documentURLs, setDocumentURLs] = useState([]);
  const [sitePlanUploadLoading, setSitePlanUploadLoading] = useState(false);
  const [sitePlanURLs, setSitePlanURLs] = useState(projectData?.sitePlanDocuments || []);
  const [paymentSlipUploadLoading, setPaymentSlipUploadLoading] = useState(false);
  const [paymentSlipURLs, setPaymentSlipURLs] = useState(projectData?.paymentSlipDocuments || []);

  const handlePhotoSelect = async (newFiles) => {
    const formData = new FormData()
    newFiles.forEach((file, index) => {
      formData.append(`images[${index}]`, file)
    })
    try {
      setPhotoUploadLoading(true)
      const response = await makeApiRequest(
        text.postType,
        `${process.env.NEXT_PUBLIC_API}user/aws-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      const newPhotoUrls = response.data.result.imageUrls
      const mappedNewPhotoUrls = newPhotoUrls.map((url, index) => ({
        name: 'Other',
        url: url,
      }))
      const updatedPhotoURLs = [...photoURLs, ...mappedNewPhotoUrls]
      setPhotoURLs(updatedPhotoURLs)
      setProjectData({
        ...projectData,
        projectImages: updatedPhotoURLs,
      })
      toast(response?.data?.responseMessage)
      setPhotoUploadLoading(false)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
      setImageKey(prev => prev + 1)
    } catch (error) {
      setPhotoUploadLoading(false)
    }
  }
  const handleBrochureSelect = async (selectedFiles) => {
    if (selectedFiles.length === 0) {
      toast.error(stepFourText.noFileSelected)
      return
    }
    if (selectedFiles[0].type !== 'application/pdf') {
      toast.error(stepFourText.pdfSelectOnly)
      return
    }
    const formData = new FormData()
    formData.append('brochure', selectedFiles[0])
    try {
      setBrochureUploadLoading(true)
      const response = await makeApiRequest(
        text.postType,
        `${process.env.NEXT_PUBLIC_API}user/aws-brochure`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (response.status === 200) {
        const { result } = response?.data || {}
        const newPhotoUrls = result?.brochureUrl
        setBrochureURLs(newPhotoUrls)
        setProjectData({
          ...projectData,
          projectBrochurePdf: newPhotoUrls,
        })
        setBrochureUploadLoading(false)
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
        setbrochureKey(prev => prev + 1)
        toast.success(stepFourText.brochureUploadSuccess)
      } else {
        toast.error(stepFourText.errorUploadingBrochure)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setBrochureUploadLoading(false)
    }
  }
  const deleteBrochure = async () => {
    try {
      const key = brochureURLs.substring(brochureURLs.lastIndexOf('/') + 1)
      const BUCKET_NAME = 'superarea-prod-s3'
      const response = await makeApiRequest(
        text.postType,
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        { Bucket: BUCKET_NAME, Key: key },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (response.status === 200) {
        setBrochureURLs('');
        setProjectData({
          ...projectData,
          projectBrochurePdf: '',
        });
        toast.success(stepFourText.brochureDeletedSuccessfully)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleVideoSelect = async (selectedFiles) => {
    const validVideoFiles = selectedFiles.filter((file) =>
      file.type.startsWith('video/')
    )
    if (validVideoFiles.length === 0) {
      toast.error(stepFourText.validVideoFileWarning)
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
            'Content-Type': 'multipart/form-data', // Set the content type for video upload
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
        setProjectData({
          ...projectData,
          projectVideos: mappedVideoUrls,
        })
        setVideoUploadLoading(false)
        toast(response?.data?.responseMessage)
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      } else {
        console.error('Error uploading videos:', response.data.responseMessage)
        toast.error(response?.data?.responseMessage)
        setVideoUploadLoading(false)
        setTimeout(() => {
          setUploadMessage('')
        }, 3000)
      }
      setVideoKey(prev => prev + 1)
    } catch (error) {
      console.error('Error uploading videos:', error)
      toast.error(error?.response?.data?.responseMessage)
      setVideoUploadLoading(false)
      setTimeout(() => {
        setUploadMessage('')
      }, 3000)
    }
  }
  const deletePhoto = async (index, url) => {
    const key = url?.substring(url.lastIndexOf('/') + 1)
    const BUCKET_NAME = stepFourText.moreBucketS3
    try {
      const { status, data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}${routes.removeImage}`,
        {
          Bucket: BUCKET_NAME,
          Key: key,
        }
      )
      if (status === 200) {
        const updatedPhotoURLs = projectImages.filter(
          (photo, photoIndex) => photo?.url !== url
        )
        setPhotoURLs(updatedPhotoURLs)
        setProjectData((prevData) => ({
          ...prevData,
          projectImages: updatedPhotoURLs,
        }))
        toast.info(data?.responseMessage)
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
    const index = projectData?.projectImages.findIndex(
      (photo) => photo.url === url
    )
    if (index === -1) return // Image not found
    let newOrderedPhotoURLs = [...projectData?.projectImages]
    const selectedImage = newOrderedPhotoURLs.splice(index, 1)[0] // Remove the selected image
    newOrderedPhotoURLs.unshift(selectedImage) // Add it to the beginning

    setOrderedPhotoURLs(newOrderedPhotoURLs) // Update the ordered array
    setCoverImageUrl(url) // Update the cover image URL
    setProjectData((prevDATA) => ({ ...prevDATA, projectCoverImage: url, projectImages: [...newOrderedPhotoURLs] }))
  }
  const handleImageNameChange = (index, newName) => {
    const updatedPhotoURLs = [...photoURLs]
    updatedPhotoURLs[index].name = newName
    setPhotoURLs(updatedPhotoURLs)
    // Update the DATA state if needed
    setProjectData({ ...projectData, projectImages: updatedPhotoURLs })
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
        setVideoURLs()
        setProjectData({
          ...projectData,
          projectVideos: projectData?.projectVideos?.filter(
            (_, i) => i !== index
          ),
        })
        toast.info(response?.data?.responseMessage)
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

  const handleDocumentSelect = async (newFiles, key) => {
    if (newFiles.length === 0) {
      toast.error("No file selected");
      return;
    }

    const formData = new FormData();
    newFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    try {

      if (key === stepFourText.sitePlanDocuments) {
        setSitePlanUploadLoading(true);
      } else if (key === stepFourText.paymentSlipDocuments) {
        setPaymentSlipUploadLoading(true);
      }

      const isPdf = newFiles[0].type === 'application/pdf';
      const apiEndpoint = isPdf
        ? `${process.env.NEXT_PUBLIC_API}user/aws-brochure`
        : `${process.env.NEXT_PUBLIC_API}user/aws-image`;

      const response = await makeApiRequest('POST', apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      const newDocs = isPdf
        ? [{ name: newFiles[0].name, url: response.data.result.brochureUrl }]
        : response.data.result.imageUrls.map((url, index) => ({
          name: newFiles[index].name,
          url,
          key: response.data.result.imageNames[index],
        }));

      if (key === stepFourText.sitePlanDocuments) {
        const updatedSitePlanURLs = [...sitePlanURLs, ...newDocs];
        setSitePlanURLs(updatedSitePlanURLs);
        setProjectData({
          ...projectData,
          sitePlanDocuments: updatedSitePlanURLs,
        });
        setSitePlanUploadLoading(false);
      } else if (key === stepFourText.paymentSlipDocuments) {
        const updatedPaymentSlipURLs = [...paymentSlipURLs, ...newDocs];
        setPaymentSlipURLs(updatedPaymentSlipURLs);
        setProjectData({
          ...projectData,
          paymentSlipDocuments: updatedPaymentSlipURLs,
        });
        setPaymentSlipUploadLoading(false);
      }

      toast.success("Document uploaded successfully");
    } catch (error) {
      if (key === stepFourText.sitePlanDocuments) {
        setSitePlanUploadLoading(false);
      } else if (key === stepFourText.paymentSlipDocuments) {
        setPaymentSlipUploadLoading(false);
      }
      toast.error("Error uploading documents");
    }
  };

  const handleDocumentRemove = async (index, url, key) => {
    try {
      const keyFromUrl = url?.substring(url.lastIndexOf('/') + 1);
      const BUCKET_NAME = 'superarea-prod-s3';

      const response = await makeApiRequest(
        text.postType,
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        { Bucket: BUCKET_NAME, Key: keyFromUrl },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {

        if (key === stepFourText.sitePlanDocuments) {
          const updatedSitePlanURLs = sitePlanURLs.filter((_, i) => i !== index);
          setSitePlanURLs(updatedSitePlanURLs);
          setProjectData({
            ...projectData,
            sitePlanDocuments: updatedSitePlanURLs,
          });
        } else if (key === stepFourText.paymentSlipDocuments) {
          const updatedPaymentSlipURLs = paymentSlipURLs.filter((_, i) => i !== index);
          setPaymentSlipURLs(updatedPaymentSlipURLs);
          setProjectData({
            ...projectData,
            paymentSlipDocuments: updatedPaymentSlipURLs,
          });
        }
        toast.success("Document deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting document");
    }
  };

  return (
    <div className="px-7 py-1">
      <div className={`mt-2 ${styles.firstparent}`}>
        <div className={`justify-center ${styles.parent}`}>
          <div className={`mt-2 ${styles.subparent} max-w-[80%] ml-5`}>
            <ImageUploader
              icon={
                <div className="flex items-center justify-start rounded-full bg-iconBackground p-3 w-[90px] h-[90px] min-md:m-auto">
                  <Image src={photo} alt="Photo" width={55} height={55} className='mx-auto' />
                </div>
              }
              Text={stepFourText.imageUploadText}
              Heading={stepFourText.uploadImage}
              key={imageKey}
              onFileSelect={handlePhotoSelect}
              handleImageNameChange={handleImageNameChange}
              roomOptions={roomOptions}
              onFileRemove={deletePhoto}
              photoURLs={projectImages}
              deletePhoto={deletePhoto}
              onSetCover={handleSetCover}
              coverImageUrl={coverImageUrl}
              loading={photoUploadLoading}
            />
          </div>
          <div className="flex justify-end">
            <div className="grid grid-cols-3 gap-6"></div>
          </div>
          <div className="mt-2 max-w-[80%] ml-5">
            <VideoUploader
              icon={
                <div className="flex items-center justify-start rounded-full bg-iconBackground p-3 w-[90px] h-[90px] min-md:m-auto bg-black ">
                  <Image src={video} alt="Video" width={55} height={55} className='mx-auto' />
                </div>
              }
              Text={stepFourText.uploadVideoText}
              onFileSelect={(files) => handleVideoSelect(files)}
              onFileRemove={(index) => deleteVideo(index, videoURLs[index].url)}
              deleteVideo={(index, url) => deleteVideo(index, url)}
              isUploadDisabled={isVideoUploadDisabled}
              videoURLs={projectVideos}
              key={videoKey}
              loading={videoUploadLoading}
              Heading={stepFourText.uploadVideo}
            />
          </div>
          <div className={`mt-2 ${styles.subparent} max-w-[80%] ml-5`}>
            <ImageUploader
              icon={
                <div className="flex items-center justify-center rounded-full bg-iconBackground p-3 w-[90px] h-[90px] min-md:m-auto bg-black">
                  <Image src={pdf} alt="Photo" width={55} height={55} className='mx-auto p-1' />
                </div>
              }
              Text={stepFourText.brochureHeading}
              key={brochureKey}
              Heading={stepFourText.uploadBrochure}
              onFileSelect={handleBrochureSelect}
              onFileRemove={deleteBrochure}
              brochureURLs={projectBrochurePdf}
              buttonLabel={stepFourText.attachPdf}
              deletePhoto={deleteBrochure}
              loading={brochureUploadLoading}
            />
          </div>
          {brochureURLs?.length > 0 && (
            <div className="mt-4 max-w-[80%] flex justify-start">
              <div className="relative border shadow-sm border-gray-400 ml-5 rounded-md">
                <PdfToImage pdfUrl={brochureURLs} width={200} height={140} />
                <div className="absolute top-1 right-1">
                  <button
                    onClick={() => deleteBrochure()}
                    className="p-1 text-white bg-gray-600 rounded"
                  >
                    <Image src={faTrash} width={15} height={15} alt="Photo" />
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className={`mt-2 ${styles.subparent} max-w-[80%] ml-5`}>
            <DocumentUploader
              icon={
                <div className="flex items-center justify-center rounded-full bg-iconBackground p-3 w-[90px] h-[90px] min-md:m-auto bg-black">
                  <Image src={pdf} alt="Photo" width={55} height={55} className='mx-auto p-1' />
                </div>
              }
              Text={stepFourText.sitePlanText}
              Heading={stepFourText.sitePlanHeading}
              onFileSelect={(files) => handleDocumentSelect(files, stepFourText.sitePlanDocuments)}
              deleteDocument={(index) => handleDocumentRemove(index, sitePlanURLs[index]?.url, stepFourText.sitePlanDocuments)}
              documentURLs={sitePlanURLs}
              loading={sitePlanUploadLoading}
            />
          </div>

          <div className={`mt-2 ${styles.subparent} max-w-[80%] ml-5`}>
            <DocumentUploader
              icon={
                <div className="flex items-center justify-center rounded-full bg-iconBackground p-3 w-[90px] h-[90px] min-md:m-auto bg-black">
                  <Image src={pdf} alt="Photo" width={55} height={55} className='mx-auto p-1' />
                </div>
              }
              Text={stepFourText.paymentSlipText}
              Heading={stepFourText.paymentSlipHeading}
              onFileSelect={(files) => handleDocumentSelect(files, stepFourText.paymentSlipDocuments)}
              deleteDocument={(index) => handleDocumentRemove(index, paymentSlipURLs[index]?.url, stepFourText.paymentSlipDocuments)}
              documentURLs={paymentSlipURLs}
              loading={paymentSlipUploadLoading}
            />
          </div>

        </div>
        {uploadMessage && (
          <div
            className={`text-center mt-2 ${uploadMessage.includes('Error')
              ? 'text-red-500'
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
