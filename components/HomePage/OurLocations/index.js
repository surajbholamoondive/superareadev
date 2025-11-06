import { useRef, useState } from 'react'
import useWindowWidth from '@/context/useWindowWidth'
import LeftRightSlideButtons from '@/utils/leftRightSlideButtons'
import Styles from './index.module.css'
import ImageCard from '@/components/Common/Cards/ImageCard/Card'
import OurLocationContent from '@/content/HomePage/OurLocation'
import { HOME_PAGE_TEXT } from '@/textV2'
const {ourLocation,ourLocationDescriptionL}=HOME_PAGE_TEXT.ourLocation
const OurLocation = () => {
  const [services] = useState(OurLocationContent)
  const scrollContainerRef = useRef(null)
  const windowWidth = useWindowWidth()

  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset
  }

  return (
    <div className={`text-center md:text-left ${Styles.servicesComponent}`}>
      <h1 className={Styles.heading}>
        {ourLocation}
        <hr className={`${Styles.underline}`} />
      </h1>
      <div className="my-1 flex justify-center md:justify-between ml-[4.3%] w-[93%]">
        <h2
          className={`w-[100%] mt-[10px] md:w-[50%]  lg:w-[55%] ${Styles.shortPara}`}
        >
          {ourLocationDescriptionL}
        </h2>
        <div className='-mt-[45px]'>
        {windowWidth > 768 && (
          <LeftRightSlideButtons
            leftFunction={() => scroll(-400)}
            rightFunction={() => scroll(+400)}
          />
        )}</div>
      </div>
      <div className="relative">
        <div className={Styles.wrapper} ref={scrollContainerRef}>
          {Object.keys(services).map((service, index) => (
            <ImageCard name={service} imageSrc={services[service].image} link={services[service].link} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurLocation
