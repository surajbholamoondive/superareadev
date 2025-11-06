import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ADMIN_MODULE } from '@/textV2'
import axios from 'axios'
import { toast } from 'react-toastify'

import uploadImage from '../../../assets/AppModeration/uploadImage.svg'
import cross from '../../../assets/ButtonIcons/cross.svg'
import DeleteConfirm from './DeleteConfirm'
import styles from './index.module.css'
import UploadedImages from './UploadedImages'

const { ADMIN_APP_MODERATION_TAB } = ADMIN_MODULE
const { text } = ADMIN_APP_MODERATION_TAB

const AppModeration = () => {
  const [carouselImages, setCarouselImages] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [title, setTitle] = useState('')
  const [routeId, setRouteId] = useState('')
  const [routeTo, setRouteTo] = useState('')
  const [duration, setDuration] = useState(5)
  const [edit, setEdit] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [open, setOpen] = useState(false)
  const [toBeDeletedImageUrl, setToBeDeletedImageUrl] = useState('')
  const [suggestionResult, setSuggestionResult] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isItemSelected, setIsItemSelected] = useState(false)
  const [sortOption, setSortOption] = useState(text.latest)
  const dropdownRef = useRef(null)
  useEffect(() => {
    fetchCarouselImages()
  }, [])

  useEffect(() => {
    handleSuggestions()
  }, [routeTo])

  const editSectionRef = useRef(null)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 1,
    padding: 10,
    borderRadius: '8px',
  }

  async function fetchCarouselImages() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}admin/app-moderation/get-carousel-images`
      )
      if (data?.responseCode === 200) {
        setCarouselImages(data?.result || [])
      } else if (data?.responseCode === 204) {
        toast.error(text.noImageFoundForCarousel)
      } else {
        toast.error(data?.responseMessage || text.failedToFetchImages)
      }
    } catch (error) {
      console.error(error)
      toast.error(text.failedToFetchImages)
    }
  }

  async function handleUploadCarouselImage(event) {
    const files = event.target.files
    if (!files.length) return

    const file = files[0]

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast.error(text.fileSizeShouldNotExceed)
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error(text.uploadOnlyImageFiles)
      return
    }

    const formData = new FormData()
    formData.append('images', file)

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/aws-image`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      if (data?.responseCode === 200) {
        const imageUrl = data?.result?.imageUrls[0]
        setUploadedImages([{ imageUrl }])
        toast.success(text.imageUploadedSuccessfully)
      } else {
        toast.error(data?.responseMessage || text.failedToUploadImages)
      }
    } catch (error) {
      console.error(error)
      toast.error(text.failedToUploadImages)
    }
  }

  async function handleAddCarouselImage() {
    if (uploadedImages.length === 0) {
      toast.error(text.uploadImageFirst)
      return
    }

    if (!isItemSelected && routeTo !== '') {
      toast.error(text.selectFromList)
      return
    }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}admin/app-moderation/upload-carousel-images`,
        {
          imageUrl: uploadedImages[0].imageUrl,
          title,
          routeTo,
          duration,
          routeId,
        }
      )
      if (data?.responseCode === 200) {
        await fetchCarouselImages()
        resetForm()
        toast.success(text.imageAddedCarousel)
      } else {
        toast.error(data?.responseMessage || text.failedToAddImage)
      }
    } catch (error) {
      console.error(error)
      toast.error(text.failedToAddImage)
    }
  }

  async function handleUpdateCarouselImage() {
    if (!editingImage) {
      toast.error(text.noImageSelectedForUpdate)
      return
    }
    if (!isItemSelected && routeTo !== '') {
      toast.error(text.selectFromList)
      return
    }
    try {
      const updateData = {
        imageId: editingImage._id,
        title,
        routeTo,
        duration,
        routeId,
      }

      if (uploadedImages.length > 0) {
        updateData.imageUrl = uploadedImages[0].imageUrl
      }

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}admin/app-moderation/update-carousel-image`,
        updateData
      )

      if (data?.responseCode === 200) {
        await fetchCarouselImages()
        resetForm()
        toast.success(text.imageUpdatedSuccessfully)
      } else {
        toast.error(data?.responseMessage || text.failedToUpdateImage)
      }
    } catch (error) {
      console.error(error)
      toast.error(text.failedToUpdateImage)
    }
  }

  function resetForm() {
    setUploadedImages([])
    setTitle('')
    setRouteTo('')
    setDuration(5)
    setEdit(false)
    setEditingImage(null)
  }

  async function handlePreviewImageDelete(imageUrl) {
    try {
      const key = imageUrl?.substring(imageUrl.lastIndexOf('/') + 1)
      const { data: s3Response } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        { Bucket: 'superarea-prod-s3', Key: key }
      )
      if (s3Response?.responseCode === 200) {
        setUploadedImages((prevImages) =>
          prevImages.filter((img) => img.imageUrl !== imageUrl)
        )
        toast.success(text.imageDeletedSuccessfully)
      } else {
        toast.error(text.failedToDeleteImageFromS3)
      }
    } catch (error) {
      console.error(error)
      toast.error(text.errorWhileDeletingImage)
    }
  }

  async function handleCarouselImageDelete(imageUrl) {
    try {
      const key = imageUrl?.substring(imageUrl.lastIndexOf('/') + 1)
      const { data: s3Response } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}user/remove-image`,
        { Bucket: 'superarea-prod-s3', Key: key }
      )

      if (s3Response?.responseCode === 200) {
        const { data: dbResponse } = await axios.post(
          `${process.env.NEXT_PUBLIC_API}admin/app-moderation/delete-carousel-images`,
          { imageUrl }
        )

        if (dbResponse?.responseCode === 200) {
          setCarouselImages((prevImages) =>
            prevImages.filter((img) => img.imageUrl !== imageUrl)
          )
          toast.success(text.imageDeletedSuccessfully)
        } else {
          toast.error(dbResponse?.responseMessage || text.failedToDeleteImage)
        }
      } else {
        toast.error(text.failedToDeleteImageFromS3)
      }
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast.error(text.errorWhileDeletingImage)
    }
  }

  function handleEditCarouselImage(image) {
    setEdit(true)
    setEditingImage(image)
    setTitle(image?.title)
    setRouteTo(image?.routeTo)
    setDuration(image?.duration)
    setUploadedImages([{ imageUrl: image.imageUrl }])
    setTimeout(() => {
      editSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  async function handleSuggestions() {
    try {
      if (!routeTo) {
        setSuggestionResult([])
        setShowDropdown(false)
        return
      }
      const searchData = routeTo.replaceAll(',', '')
      const suggestions = await axios.get(
        `/property/dropdown-property-suggestions?type=${searchData}`
      )
      if (isItemSelected) {
        return
      }
      setSuggestionResult([...suggestions?.data])
      setShowDropdown(true)
    } catch (err) {
      console.error(err)
      setShowDropdown(false)
    }
  }

  async function handleListClick(listData) {
    setShowDropdown(false)
    setIsItemSelected(true)
    setRouteTo(listData?.project?.projectTitle)
    setRouteId(listData?.project?.projectId)
  }

  const sortedCarouselImages =
    sortOption === text.latest ? carouselImages : [...carouselImages].reverse()

  return (
    <div>
      <h4 className="pt-4 pb-6 font-semibold" ref={editSectionRef}>
        {text.uploadCarouselImage}
      </h4>
      <div className="border border-gray-200 rounded-lg p-8">
        <div className="flex gap-x-14">
          <div className="flex justify-start items-center gap-4">
            <label htmlFor="carouselImageUpload" className="cursor-pointer">
              <Image
                src={uploadImage}
                alt="Add Images"
                className="rounded-lg object-cover"
                height={160}
                width={160}
              />
            </label>
            <input
              id="carouselImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              multiple={false}
              onChange={handleUploadCarouselImage}
            />
            <div className="mb-3">
              <div>
                <p>{text.titleForImage}</p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-1 w-[300px] rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="gap-2 mt-1">
                <p>{text.duration} (In seconds)</p>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border p-1 w-[130px] rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <div className="gap-2 mt-1">
                <p>{text.routeTo}</p>
                <input
                  type="text"
                  value={routeTo}
                  onChange={(e) => {
                    setIsItemSelected(false)
                    setRouteTo(e.target.value)
                  }}
                  onBlur={() => setShowDropdown(false)}
                  className="border p-1 w-[300px] rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              {suggestionResult.length > 0 && showDropdown && (
                <div ref={dropdownRef} className="absolute z-[9999] bg-white">
                  <ul className={`${styles.ulList} w-[240px] max-sm:w-[220px]`}>
                    {suggestionResult.map((result, index) => (
                      <li
                        key={index}
                        className="p-2 py-3 cursor-pointer"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleListClick(result)}
                      >
                        {result?.project?.projectTitle && (
                          <p>
                            {result?.project?.projectTitle},{' '}
                            {result?.project?.locality},{result?.project?.city}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="font-semibold">{text.imagePreviewSection}</p>
            <div className="flex flex-wrap gap-2">
              {uploadedImages.length > 0 &&
                uploadedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-[120px] h-[120px] border border-[#b7bdc1] rounded-lg mt-2 overflow-hidden"
                  >
                    <Image
                      src={image?.imageUrl}
                      alt={`Uploaded Image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-1 right-1 rounded-full bg-white/70 p-1"
                      onClick={() => handlePreviewImageDelete(image?.imageUrl)}
                    >
                      <Image src={cross} alt="cross" height={20} width={20} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center mt-4">
            {edit ? (
              <div className="flex gap-2 items-center">
                <button
                  className="py-2 px-4 rounded-lg bg-yellow-600 text-white"
                  onClick={handleUpdateCarouselImage}
                >
                  {text.update}
                </button>
                <button
                  className="py-2 px-4 bg-red-700 rounded-lg text-white"
                  onClick={resetForm}
                >
                  {text.cancel}
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="primary-button"
                  onClick={handleAddCarouselImage}
                >
                  {text.add}
                </button>
              </div>
            )}
          </div>
          <div className="items-center">
            <div className="flex justify-between items-center ">
              <p className="mt-8 mb-4 font-semibold">{text.carouselImages}</p>
              <div className="flex gap-x-2 items-center">
                <p className="font-semibold">{text.sortBy}</p>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="text-[0.875rem] border border-gray-400 rounded-lg p-1"
                >
                  <option value={text.latest}>{text.latest}</option>
                  <option value={text.oldest}>{text.oldest}</option>
                </select>
              </div>
            </div>
            <UploadedImages
              carouselImages={sortedCarouselImages}
              handleEditCarouselImage={handleEditCarouselImage}
              setToBeDeletedImageUrl={setToBeDeletedImageUrl}
              setOpen={setOpen}
            />
          </div>
        </div>
      </div>
      <DeleteConfirm
        open={open}
        setOpen={setOpen}
        setToBeDeletedImageUrl={setToBeDeletedImageUrl}
        toBeDeletedImageUrl={toBeDeletedImageUrl}
        handleCarouselImageDelete={handleCarouselImageDelete}
      />
    </div>
  )
}

export default AppModeration
