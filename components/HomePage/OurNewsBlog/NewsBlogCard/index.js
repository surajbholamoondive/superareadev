import { useState } from 'react'
import axios from "axios";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'
import { toast } from 'react-toastify'
import EditModal from '@/components/Admin/WebsiteModeration/EditModal'
import Styles from './index.module.css'
import { useAuth } from '@/context/auth'
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2'
const {text}=GLOBALLY_COMMON_TEXT
const {routes,ourNewsBlog}=HOME_PAGE_TEXT
const NewsBlogCard = ({ descriptionblog, index, setBlogs }) => {
  const [openModal, setOpenModal] = useState(false)
  const [editIndex] = useState(index)
  const [isAddMode] = useState(false)
  const router = useRouter()
  const logger = getLogger()
  const { pathname } = router
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleEdit = async () => {
    // setOpenModal(true)
    router.push(`/admin/edit/blog/${descriptionblog._id}`)
  }
const handleDelete = async () => {
  try {
    const blogId = descriptionblog._id;
    const url = `${process.env.NEXT_PUBLIC_API}admin/delete/blog/${blogId}`;
    console.log("Deleting blog:", url);

    const { data } = await axios.delete(url);

    if (data?.responseCode === 200) {
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
      toast.success(data.responseMessage);
    } else {
      toast.error(data?.responseMessage || "Failed to delete blog");
    }
  } catch (error) {
    logger.error(error);
    toast.error("Something went wrong while deleting the blog");
  }
};

  const handleRead = () => {
    router.push(`/blog/${descriptionblog._id}`)
  }
  const [auth] = useAuth()
  const userType = auth?.userResult?.userType
  function formatDateToDDMMYYYY(originalDateString) {
    const dateObject = new Date(originalDateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()
    return `${day}-${month}-${year}`
  }
  return (
    <div
      className={`min-w-[320px] md:w-[50%] lg:w-[35%] h-[280px] md:h-[310px] lg:h-[320px] ${Styles.parentDiv}`}
    >
      <div className={Styles.imageDiv}>
        <Image
          src={descriptionblog.featuredImage[0]}
          width={350}
          height={300}
          className={Styles.imageBlog}
          alt="Breaking news for real estate, latest news headlines for real estate, top property news"
        />
      </div>
      <div className={`${Styles.childDiv} border  px-4 pt-4`}>
        <p className='text-[14px] font-medium mb-[2px]'>{ourNewsBlog.postedOn} {formatDateToDDMMYYYY(descriptionblog?.createdAt)}</p>
        <div className={`overflow-hidden text-ellipsis line-clamp-1 text-[16px] font-semibold`}>{descriptionblog?.title}</div>
        <div className={Styles.storyContainer}>
          <div className={Styles.story}>{descriptionblog?.description}</div>
        </div>
        {userType !== text.adminText ? (
          <div className='flex mt-4'>
            <button
              className={`${Styles.button} mt-5`}
              onClick={handleRead}
            >
              {text.readMoreText}
            </button>
          </div>
        ) : (
          <div className="flex justify-between mt-4 md:mt-9">
            <button
              className="w-1/2 md:w-1/3 p-2 rounded-md border-2  capitalize"
              onClick={handleDelete}
            >
              {text.deleteType}
            </button>
            <button
              className="w-1/2 md:w-1/3 p-2 rounded-md text-white bg-primary "
              onClick={handleEdit}
            >
              {text.editText}
            </button>
          </div>
        )}
      </div>
      {openModal && (
        <EditModal
          editIndex={editIndex}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClose={handleCloseModal}
          descriptionblog={descriptionblog}
          setBlogs={setBlogs}
          isAddMode={isAddMode}
        />
      )}
    </div>
  )
}
export default NewsBlogCard
