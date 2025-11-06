import React, { useState } from 'react'
import Image from 'next/image'
import { getLogger } from '@/helper/logger'
import {
  BLOG,
  CREATE_BLOG,
  CREATE_TESTIMONIAL,
  DEFAULT_USER_IMAGE,
  EDIT_TESTIMONIAL,
  POST_TEXT,
  TESTIMONIAL,
  UPLOAD_IMAGE,
  UPLOAD_PHOTO_ADMIN,
  WEB_LINK_UPDATE,
  WEBSITE_DESCRIPTION,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import axios from 'axios'
import { RxCross1 } from 'react-icons/rx'
import { toast } from 'react-toastify'

import UploadArrow from '../../../assets/DownArrow/UploadArrow.svg'

const EditModal = ({
  openModal,
  setOpenModal,
  onClose,
  testimonial,
  setTestimonials,
  editIndex,
  isAddMode,
  descriptionblog,
  setBlogs,
  isBlogMode,
  webLink,
  setWebLink,
  editWebLink,
}) => {
  const [newProfileImage, setNewProfileImage] = useState('')
  const [profileImage, setProfileImage] = useState(
    testimonial?.profileImage ||
    descriptionblog?.backgroundImage ||
    webLink?.linkImage ||
    DEFAULT_USER_IMAGE
  )
  const [name, setName] = useState(
    testimonial?.name || descriptionblog?.title || ''
  )
  const [position, setPosition] = useState(testimonial?.position || '')
  const [description, setDescription] = useState(
    testimonial?.description || descriptionblog?.description || ''
  )
  const [editTitle, setEditTitle] = useState(webLink?.title)
  const [editDescription, setEditDescription] = useState(webLink?.description)
  const logger = getLogger()
const handleSubmit = async () => {
  try {

    const { data } = await makeApiRequest(
  POST_TEXT,
  `${EDIT_TESTIMONIAL}/${testimonial._id}/${editIndex}/${TESTIMONIAL}`, 
  { name, description, profileImage, position }
)



    setTestimonials(data?.result?.testimonial)
    toast.success(data?.responseMessage)
    setOpenModal(false)
  } catch (error) {
    logger.error(error)
  }
}




  const handleImageUpdate = async (event) => {
    const imageFile = event.target.files[0]
    const formData = new FormData()
    formData.append('testimonialImage', imageFile)
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}${UPLOAD_IMAGE}`,
        formData
      )
      toast.success(data?.responseMessage)
      const newPhotoUrl = data.result.imageUrls[0]
      if (isAddMode) {
        setNewProfileImage(newPhotoUrl)
      }
      setProfileImage(newPhotoUrl)
    } catch (error) {
      logger.error(error)
    }
  }


  const handleUpdateWebLink = async () => {
    try {
      const { data } = await makeApiRequest(
        POST_TEXT,
        `${WEB_LINK_UPDATE}/${webLink._id}/0/${WEBSITE_DESCRIPTION}`,
        {
          title: editTitle,
          description: editDescription,
          linkImage: profileImage,
        }
      )
      setWebLink(data?.result?.websiteDescription)
      toast.success(data?.responseMessage)
      setOpenModal(false)
    } catch (error) {
      logger.error(error)
    }
  }
  const addTestimonial = async () => {
    try {
      const { data } = await makeApiRequest(
        POST_TEXT,
        `${CREATE_TESTIMONIAL}`,
        { name, position, description, profileImage }
      )
      setTestimonials(data?.result?.testimonial)
      toast.success(data?.responseMessage)
      setOpenModal(false)
    } catch (error) {
      logger.error(error)
    }
  }
  const addBlog = async () => {
    try {
      const { data } = await makeApiRequest(POST_TEXT, `${CREATE_BLOG}`, {
        description,
        title: name,
        backgroundImage: profileImage,
      })
      setBlogs(data?.result?.blog)
      toast.success(data?.responseMessage)
      setOpenModal(false)
    } catch (error) {
      logger.error(error)
    }
  }
  const handleSubmitBlogs = async () => {
    try {
      const { data } = await makeApiRequest(
        POST_TEXT,
        `${EDIT_TESTIMONIAL}/${editIndex}/${BLOG}`,
        { description, title: name, backgroundImage: profileImage }
      )
      setBlogs(data?.result?.blog)
      setOpenModal(false)
    } catch (error) {
      logger.error(error)
    }
  }


  
  const handleClick = () => {



    // Validation for Testimonial
    if (!isBlogMode && !editWebLink) {
      if (!name?.trim()) return toast.error("Name is required")
      if (!position?.trim()) return toast.error("position is required")
      if (!description?.trim()) return toast.error("Description is required")
    }

    // Validation for Blog
    if (isBlogMode || descriptionblog) {
      if (!name?.trim()) return toast.error("Title is required")
      if (!description?.trim()) return toast.error("Description is required")
      if (!profileImage) return toast.error("Background image is required")
    }

    // Validation for WebLink
    if (editWebLink) {
      if (!editTitle?.trim()) return toast.error("Title is required")
      if (!editDescription?.trim()) return toast.error("Description is required")
      if (!profileImage) return toast.error("Link image is required")
    }


    if (isAddMode) {


      addTestimonial()
    } else if (isBlogMode) {


      addBlog()
    } else if (descriptionblog) {


      handleSubmitBlogs()
    } else if (editWebLink) {


      handleUpdateWebLink()
    } else {


      handleSubmit()
    }
  }

  return (
    openModal && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-[1100] flex justify-center items-center backdrop-blur-1xl ">
        <div
          className={`w-[40%] h-fit bg-white rounded-xl ${(descriptionblog || isBlogMode) && 'p-12'} px-6 py-5 flex flex-col`}
        >
          <RxCross1
            onClick={onClose}
            className={` self-end cursor-pointer -mr-4 border-solid border-2 border-gray-300  rounded-full w-8 h-8 p-2 -mt-4 ${(descriptionblog || isBlogMode) && ' mb-1 w-8 h-8'}`}
          />
          <div className={`flex ${(descriptionblog || isBlogMode) && 'flex-col '}`}>
            {(descriptionblog || isBlogMode) ? (
              <div className="w-full flex flex-col justify-end items-end">
                <div className="relative w-full h-40 ">
                  <Image
                    src={profileImage}
                    layout="fill"
                    objectFit="cover"
                    alt="profile icon"
                    className=" cursor-pointer rounded-lg"
                  />
                </div>
                <div className="flex justify-center items-center gap-1 ">
                  <Image
                    src={UploadArrow}
                    width={5}
                    height={5}
                    alt="menu-icon"
                    className={`w-[12px] h-[20px] mt-4`}
                  />
                  <label
                    className=" underline cursor-pointer mt-3 flex"
                    htmlFor="profileImageInput"
                  >
                    {UPLOAD_PHOTO_ADMIN}
                  </label>
                </div>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpdate}
                />
              </div>
            ) : (
              <div className="w-[20%] max-xl:w-[30%] max-lg:w-[30%] max-2xl:w-[20%] flex flex-col  ">
                <Image
                  src={profileImage}
                  height={40}
                  width={40}
                  objectFit="cover"
                  alt="profile icon"
                  className="rounded-full sm:h-16 sm:w-20 cursor-pointer"
                />
                <div className="flex justify-center items-center gap-1 ">
                  <Image
                    src={UploadArrow}
                    width={5}
                    height={5}
                    alt="menu-icon"
                    className={`w-[12px] h-[12px] mt-2`}
                  />
                  <label
                    className="underline cursor-pointer mt-1 flex"
                    htmlFor="profileImageInput"
                  >
                    {UPLOAD_PHOTO_ADMIN}
                  </label>
                </div>
                <input
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpdate}
                />
              </div>
            )}
            <div
              className={`flex flex-col w-[80%] max-xl:w-[80%] pt-2 max-lg:w-[70%] max-2xl:w-[100%] ${!descriptionblog && 'max-2xl:w-full'} justify-center items-center ${(descriptionblog || isBlogMode) && 'mt-4 w-full justify-center items-center -mb-8'}`}
            >
              <input
                type="text"
                placeholder={isAddMode ? 'Name' : 'Title'}
                value={editWebLink ? editTitle : name}
                onChange={(e) => {
                  editWebLink
                    ? setEditTitle(e.target.value)
                    : setName(e.target.value)
                }}
                className={`w-full px-2 py-2 mb-5 border rounded-lg  `}
              />
              {!descriptionblog && !isBlogMode && !editWebLink && (
                <input
                  type="text"
                  placeholder="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-2 py-2 mb-5 border rounded-lg  "
                />
              )}
            </div>
          </div>
          <textarea
            value={editWebLink ? editDescription : description}
            onChange={(e) =>
              editWebLink
                ? setEditDescription(e.target.value)
                : setDescription(e.target.value)
            }
            placeholder="Description (max 800 characters)"
            rows={5}
            maxLength={800}
            className={`w-full px-2 py-2 mb-5 border border-gray-300 rounded-lg mt-5 `}
          />
          <button
            type="submit"
            className="w-1/4 mx-auto text-white px-4 py-2 rounded-md bg-[#931602] "
            onClick={handleClick}
          >
            {isAddMode || isBlogMode ? 'Done' : 'Update'}
          </button>
        </div>
      </div>
    )
  )
}

export default EditModal
