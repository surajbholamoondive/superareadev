import React, { useState } from 'react'
import Image from 'next/image'
import edit from '@/assets/moreIcon/Edit.svg'
import del from '@/assets/moreIcon/trash.svg'
import { getLogger } from '@/helper/logger'
import {
  ADD,
  DEFAULT_USER_IMAGE,
  DELETE_REQ,
  DELETE_TESTIMONIAL,
  POSTED_ON,
  TESTIMONIAL,
  TESTIMONIAL_TEXT,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import { toast } from 'react-toastify'

import ConfirmDeleteModal from '@/components/Chatbot/ChatBotSubComponents/chats/ConfirmDeleteModal'

import EditModal from './EditModal'

const Testimonial = ({ testimonials, setTestimonials }) => {
  const [openModal, setOpenModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [isAddMode, setIsAddMode] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const logger = getLogger()

  const handleCloseModal = () => setOpenModal(false)

  const handleEdit = (index) => {
    setIsAddMode(false)
    setEditIndex(index)
    setOpenModal(true)
  }

  const handleAdd = () => {
    const newIndex = testimonials.length + 1
    setEditIndex(newIndex)
    setOpenModal(true)
    setIsAddMode(true)
  }

  const handleDelete = async (index) => {
    try {
      const { data } = await makeApiRequest(
        DELETE_REQ,
        `${DELETE_TESTIMONIAL}/${index}/${TESTIMONIAL}`
      )
      setTestimonials(data?.result?.testimonial)
      toast.success(data?.responseMessage)
    } catch (error) {
      logger.error(error)
    } finally {
      setOpenDeleteModal(false)
      setDeleteIndex(null)
    }
  }

  function formatDateToDDMMYYYY(originalDateString) {
    const dateObject = new Date(originalDateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <>
      <div className="flex justify-between items-center mt-2">
        <h2 className="mt-5 mb-3 font-bold text-xl">{TESTIMONIAL_TEXT}</h2>
        <button
          className="bg-primary mt-3 py-2 px-6 text-white rounded-md"
          onClick={handleAdd}
        >
          {ADD}
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {testimonials?.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl shadow-md p-6 flex flex-col items-center text-center relative"
          >
            {/* Delete & Edit icons top right */}
            <div className="absolute top-3 right-3 flex gap-3">
              <Image
                src={del}
                alt="Delete Icon"
                width={18}
                height={18}
                className="cursor-pointer"
                onClick={() => handleDelete(index)}
              />
              <Image
                src={edit}
                alt="Edit Icon"
                width={18}
                height={18}
                className="cursor-pointer"
                onClick={() => handleEdit(index)}
              />
            </div>

            {/* Profile Image */}
            <img
              src={testimonial.profileImage || DEFAULT_USER_IMAGE}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover mb-4"
            />

            {/* Name & Position */}
            <h4 className="font-bold text-lg">{testimonial.name}</h4>
            <p className="text-gray-600 text-sm mb-3">{testimonial.position}</p>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed break-all whitespace-normal line-clamp-3">
              {testimonial.description}
            </p>

            {/* Posted On */}
            <p className="text-xs text-gray-400 mt-3">
              {POSTED_ON} {formatDateToDDMMYYYY(testimonial.createdAt)}
            </p>
          </div>
        ))}
      </div>

      {openModal && (
        <EditModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClose={handleCloseModal}
          testimonial={testimonials[editIndex]}
          setTestimonials={setTestimonials}
          editIndex={editIndex}
          isAddMode={isAddMode}
        />
      )}

      <ConfirmDeleteModal
        open={openDeleteModal}
        message="Do you want to delete this testimonial permanently?"
        onConfirm={() =>handleDelete(index)}
        onCancel={() => setOpenDeleteModal(false)}
      />
    </>
  )
}

export default Testimonial






