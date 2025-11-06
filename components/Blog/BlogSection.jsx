'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/auth'
import axios from 'axios'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { useRouter } from 'next/navigation'
import Loading from '@/pages/loading'
import {
  RightSlideButton,
} from '@/utils/leftRightSlideButtons'
import LeftSlideButton from '@/utils/leftRightSlideButtons'

import Arrow from '../../assets/Blogs/Arrow.svg'
import BackgroundImage from '../../assets/NonLoggedUserImages/backgroundImage.svg'

export default function BlogSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [blogCards, setBlogCards] = useState([])
  const [filteredBlogCards, setFilteredBlogCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const scrollContainerRef = useRef(null)
  const [auth] = useAuth()
  const token = auth?.token
  const router = useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}admin/blog`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.data?.blog && Array.isArray(response.data.blog)) {
          const formattedBlogs = response.data.blog.map((blog) => ({
            ...blog,
            slug:
              blog.slug ||
              blog.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '') ||
              'untitled',
            formattedDate: blog.createdAt
              ? new Date(blog.createdAt)
                  .toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                  .replace(/,\s/, ' • ')
                  .replace(' at', '')
              : 'Date not available',
          }))

          setBlogCards(formattedBlogs)
          setFilteredBlogCards(formattedBlogs)
        } else {
          throw new Error('No valid blog data received')
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setError('Failed to load blogs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [token])

  useEffect(() => {
    if (!searchQuery) {
      setFilteredBlogCards(blogCards)
      return
    }

    const regex = new RegExp(searchQuery, 'i')
    const filteredCards = blogCards.filter(
      (blog) =>
        regex.test(blog.title || '') ||
        (blog.metaDescription && regex.test(blog.metaDescription))
    )

    setFilteredBlogCards(filteredCards)
  }, [searchQuery, blogCards])

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset
    }
  }

  const showAllBlogs = () => {
    router.push('/blogs')
  }

  const totalItems = filteredBlogCards?.length

  // Sabhi screens ke liye sirf 6 cards
  const displayBlogs = filteredBlogCards.slice(0, 6)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        padding: '20px 0',
      }}
    >
      <div className="mx-auto bg-white w-[93%] lg:w-[93%] py-9 px-4 overflow-hidden rounded-lg">
        <div className="text-center mb-10 lg:mt-5">
          <p className="lg:text-3xl text-2xl font-light text-primary">
            Read Our{' '}
            <span className="font-bold lg:text-3xl text-2xl text-primary">
              Latest Blogs
            </span>
          </p>
        </div>

        {isLargeScreen ? (
          <div className="flex items-center justify-between relative">
            <div
              className={`m-2 ${displayBlogs.length >= 4 ? '' : 'invisible'}`}
            >
              <LeftSlideButton leftFunction={() => scroll(-400)} />
            </div>

            <div className="relative w-full overflow-hidden">
              <div
                className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
                ref={scrollContainerRef}
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  width: 'calc(100% + 80px)',
                  marginLeft: '-40px',
                  paddingLeft: '40px',
                  paddingRight: '40px',
                }}
              >
                {displayBlogs.length > 0 ? (
                  displayBlogs.map((card, index) => (
                    <div
                      key={card._id}
                      className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[460px] w-full min-w-[320px] max-w-[320px] mx-auto flex-shrink-0`}
                    >
                      <div className="p-4">
                        <div className="relative overflow-hidden rounded-lg">
                          <Image
                            src={card.featuredImage?.[0] || '/placeholder.jpg'}
                            alt={card.title || 'Blog image'}
                            width={400}
                            height={200}
                            className="w-full h-52 object-cover"
                          />
                        </div>
                      </div>

                      <div className="px-4 pb-4 flex flex-col justify-between flex-grow">
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-semibold text-primary">
                              {card.formattedDate}
                            </p>
                            <Link href={`/blogs/${card.slug}/${card._id}`}>
                              <Image
                                src={Arrow}
                                alt="Arrow icon"
                                width={20}
                                height={20}
                                className="h-5 w-5 ml-2"
                              />
                            </Link>
                          </div>

                          <Link href={`/blogs/${card.slug}/${card._id}`}>
                            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer transition-colors mb-3 leading-tight">
                              {card.title || 'Untitled Blog'}
                            </h3>
                          </Link>

                          <p
                            className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: card.body || 'No content available.',
                            }}
                          />
                        </div>

                        <div className="mt-4">
                          <Link href={`/blogs/${card.slug}/${card._id}`}>
                            <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-200 text-sm font-medium">
                              Read More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm sm:text-base col-span-full text-center text-gray-600 py-8">
                    {searchQuery
                      ? `No blogs found for "${searchQuery}".`
                      : 'No blogs available at the moment.'}
                  </p>
                )}
              </div>
              <div>
                {filteredBlogCards.length > 6 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={showAllBlogs}
                      className="text-primary transition-all duration-200"
                    >
                      View More
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`m-2 ${displayBlogs.length >= 4 ? '' : 'invisible'}`}
            >
              <RightSlideButton rightFunction={() => scroll(400)} />
            </div>
          </div>
        ) : (
          <div className="w-full px-2 sm:px-4">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              centeredSlides={true}
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="dot ${className}"></span>`
                },
              }}
              loop={false}
              className="w-full pb-8"
            >
              {displayBlogs.length > 0 ? (
                displayBlogs.map((card) => (
                  <SwiperSlide
                    key={card._id}
                    className="flex justify-center w-full px-2"
                  >
                    <div className="w-full sm:w-[100%] px-2 flex justify-center">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[460px] w-full max-w-[320px]">
                        <div className="p-4">
                          <div className="relative overflow-hidden rounded-lg">
                            <Image
                              src={
                                card.featuredImage?.[0] || '/placeholder.jpg'
                              }
                              alt={card.title || 'Blog image'}
                              width={400}
                              height={200}
                              className="w-full h-52 object-cover"
                            />
                          </div>
                        </div>

                        <div className="px-4 pb-4 flex flex-col justify-between flex-grow">
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-xs font-semibold text-primary">
                                {card.formattedDate}
                              </p>
                              <Link href={`/blogs/${card.slug}/${card._id}`}>
                                <Image
                                  src={Arrow}
                                  alt="Arrow icon"
                                  width={20}
                                  height={20}
                                  className="h-5 w-5 ml-2"
                                />
                              </Link>
                            </div>

                            <Link href={`/blogs/${card.slug}/${card._id}`}>
                              <h3 className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer transition-colors mb-3 leading-tight">
                                {card.title || 'Untitled Blog'}
                              </h3>
                            </Link>

                            <p
                              className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: card.body || 'No content available.',
                              }}
                            />
                          </div>

                          <div className="mt-4">
                            <Link href={`/blogs/${card.slug}/${card._id}`}>
                              <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-200 text-sm font-medium">
                                Read More
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <p className="text-sm sm:text-base text-center text-gray-600 py-8">
                    {searchQuery
                      ? `No blogs found for "${searchQuery}".`
                      : 'No blogs available at the moment.'}
                  </p>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        )}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          margin-top: 10px;
          text-align: center;
        }
        .swiper-pagination-bullet {
          background: #cccccc !important;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #931602 !important;
        }
      `}</style>
    </div>
  )
}
