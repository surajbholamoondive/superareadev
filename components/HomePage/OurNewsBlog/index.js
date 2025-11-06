import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2'
import LeftRightSlideButtons from '@/utils/leftRightSlideButtons'

import EditModal from '@/components/Admin/WebsiteModeration/EditModal'

import Styles from './index.module.css'
import NewsBlogCard from './NewsBlogCard'

const { addText, blogsText, ourBlogs } = HOME_PAGE_TEXT.ourNewsBlog
const { adminText } = GLOBALLY_COMMON_TEXT.text
const OurNewsBlog = ({ blogs, setBlogs }) => {
  const windowWidth = useWindowWidth()
  const scrollContainerRef = useRef(null)
  const router = useRouter()
  const { pathname } = router
  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const [openModal, setOpenModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [isBlogMode, setIsBlogMode] = useState(false)
  const handleAdd = (e) => {
    e.preventDefault()
    const newIndex = blogs.length + 1
    setEditIndex(newIndex)
    router.push('/admin/create/blog')
    // setOpenModal(true)
    setIsBlogMode(true)
  }
  const [auth] = useAuth()
  const userType = auth?.userResult?.userType

  const sortedBlogs = blogs ? [...blogs].reverse() : []
  return (
    <div className={`${userType !== adminText && Styles.servicesComponent}`}>
      <div
        className={`flex md:justify-between text-center lg:w-[82%] ml-[8%] lg:ml-[6%]`}
      >
        {userType !== adminText && (
          <div>
            <h1
              className={`text-[24px] md:text-[28px] lg:text-[32px] ${Styles.heading}`}
            >
              {ourBlogs}
            </h1>
            <hr className={Styles.underline} />
          </div>
        )}
        <div className="mr-[-35px] mt-[22px]">
          {userType !== adminText && windowWidth > 768 && (
            <LeftRightSlideButtons
              leftFunction={() => scroll(-400)}
              rightFunction={() => scroll(+400)}
            />
          )}
        </div>
      </div>
      {userType === adminText && (
        <div>
          <div className="flex justify-end">
            <button
              className=" bg-primary py-2 px-6 text-white rounded-md"
              onClick={handleAdd}
            >
              {addText}
            </button>
          </div>
          <div className="flex justify-between mt-9">
            <h2>{blogsText}</h2>
            {blogs?.length > 0 && (
              <div>
                <LeftRightSlideButtons
                  leftFunction={() => scroll(-400)}
                  rightFunction={() => scroll(+400)}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className=" relative">
        <div
          className={`${
            userType === adminText ? Styles.webCard : Styles.cardsDiv
          }`}
          ref={scrollContainerRef}
        >
          {sortedBlogs?.map((blogdata, index) => (
            <NewsBlogCard
              descriptionblog={blogdata}
              index={index}
              blogs={blogs}
              setBlogs={setBlogs}
              isBlogMode={isBlogMode}
              setIsBlogMode={setIsBlogMode}
              key={index}
            />
          ))}
        </div>
      </div>
      {openModal && (
        <EditModal
          editIndex={editIndex}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClose={handleCloseModal}
          setBlogs={setBlogs}
          isBlogMode={isBlogMode}
        />
      )}
    </div>
  )
}
export default OurNewsBlog
