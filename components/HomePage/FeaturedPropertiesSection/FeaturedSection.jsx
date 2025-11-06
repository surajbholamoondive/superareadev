import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import useWindowWidth from '@/context/useWindowWidth'
import { RightSlideButton } from '@/utils/leftRightSlideButtons'
import Styles from './FeaturedProperties.module.css'
import FeaturedSectionCard from './FeaturedSectionCard'
import { HOME_PAGE_TEXT } from '@/textV2'
import LeftSlideButton from '@/utils/leftRightSlideButtons'

const { featuredProject, featureProperty, RecommendedForYou } = HOME_PAGE_TEXT.featuredPropertySection

const FeaturedSection = ({ data, recommendation }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const scrollContainerRef = useRef(null)
  const windowWidth = useWindowWidth()

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
    scrollContainerRef.current.scrollLeft += scrollOffset
  }

  const totalItems = recommendation?.length > 0 ? recommendation?.length : data?.length

  return (
    <div className="lg:w-full sm:w-[95%] w-[100%] mt-6 max-w-[1230px]">
      <style jsx global>{`
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
    background: var(--secondary-color) !important; /* using global color */
  }


  :root {
    --secondary-color: #931602; 
  }

  * {
    scrollbar-color: var(--secondary-color) transparent;
    scrollbar-width: thin;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--secondary-color);
    border-radius: 10px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }
`}</style>
      <div className="flex justify-center w-[100%]">
        <div className="text-center">
          <h2 className={`${Styles.featuredheading} text-[1.5rem] text-center text-primary flex-grow font-black mb-5`}>
            {recommendation
              ? RecommendedForYou
              : data[0]?.projectTitle
                ? featuredProject
                : featureProperty}
          </h2>
        </div>
      </div>

      {isLargeScreen ? (

        <div className="flex items-center justify-between">
          <div className={`m-2 ${totalItems >= 3 ? '' : 'invisible'}`}>
            <LeftSlideButton leftFunction={() => scroll(-400)} />
          </div>
          <div className={`${Styles.wrapper} lg:h-[450px] `} ref={scrollContainerRef}>
            {data?.map((singlePropertyData, index) => (
              <FeaturedSectionCard
                singlePropertyData={singlePropertyData}
                key={`data-${index}`}
              />
            ))}
            {recommendation?.map((singlePropertyData, index) => (
              <FeaturedSectionCard
                singlePropertyData={singlePropertyData?.listingId}
                key={`recommend-${index}`}
              />
            ))}
          </div>
          <div className={`m-2 ${totalItems >= 3 ? '' : 'invisible'}`}>
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
                return `<span class="dot ${className}"></span>`;
              },
            }}
            loop={false}
            className="w-full pb-8"
          >
            {data?.map((singlePropertyData, index) => (
              <SwiperSlide key={`data-mobile-${index}`} className="flex justify-center w-full px-2">
                <div className="w-full sm:w-[100%] px-2 flex justify-center">
                  <FeaturedSectionCard singlePropertyData={singlePropertyData} />
                </div>
              </SwiperSlide>
            ))}
            {recommendation?.map((singlePropertyData, index) => (
              <SwiperSlide key={`recommend-mobile-${index}`} className="flex justify-center w-full px-2">
                <div className="w-full sm:w-[100%] px-2 flex justify-center">
                  <FeaturedSectionCard singlePropertyData={singlePropertyData?.listingId} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      )}
    </div>
  )
}

export default FeaturedSection
