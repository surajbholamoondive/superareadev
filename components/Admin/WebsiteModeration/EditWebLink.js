import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  EDIT,
  HOMEPAGE_META_DESCRIPTION,
  HOMEPAGE_META_TITLE,
} from '@/text'

import EditModal from './EditModal'

const EditWebLink = ({ webLink, setWebLink }) => {
  const [linkImage, setLinkImage] = useState(webLink?.linkImage)
  const [title, setTitle] = useState(webLink?.title)
  const [description, setDescription] = useState(webLink?.description)
  const [editWebLink, setEditWebLink] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleEdit = (index) => {
    setOpenModal(true)
    setEditWebLink(true)
    setEditIndex(index)
  }
  useEffect(() => {
    setTitle(webLink?.title)
    setDescription(webLink?.description)
    setLinkImage(webLink?.linkImage)
  }, [webLink])
  return (
    <div>
      {webLink.map((item, index) => (
        <>
          <div className=" flex justify-end mt-2">
            <div>
              <button
                className="bg-primary mt-3 mr-3 py-2 px-6 text-white  text-right rounded-md"
                onClick={() => handleEdit(index)}
              >
                {EDIT}
              </button>
            </div>
          </div>

          <div className="flex mt-2">
            <div className="flex w-[98.6%] mt-2 p-2 border border-black rounded-lg">
              <div className="w-[14%] flex justify-center items-center ">
                <Image
                  src={item.linkImage}
                  height={50}
                  width={50}
                  objectFit="cover"
                  alt="profile icon"
                  className=" rounded-full sm:h-20 sm:w-20 cursor-pointer "
                />
              </div>
              <div className="w-[85%] pr-3 flex flex-col ">
                <label>{HOMEPAGE_META_TITLE}</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`px-2 py-2 mb-3 border rounded-lg ${openModal && 'disabled'}`}
                  disabled={!openModal}
                />
                <label>{HOMEPAGE_META_DESCRIPTION}</label>
                <textarea
                  value={item.description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={2}
                  maxLength={200}
                  className={`w-full px-3 py-2 mb-3 border rounded-lg${openModal && 'disabled'}`}
                  disabled={!openModal}
                />
              </div>
            </div>
          </div>
        </>
      ))}
      {openModal && (
        <EditModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClose={handleCloseModal}
          webLink={webLink[editIndex]}
          setWebLink={setWebLink}
          editWebLink={editWebLink}
        />
      )}
    </div>
  )
}

export default EditWebLink
