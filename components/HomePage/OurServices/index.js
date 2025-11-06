import { useRef, useState } from 'react'
import useWindowWidth from '@/context/useWindowWidth'
import LeftRightSlideButtons from '@/utils/leftRightSlideButtons'
import Styles from './index.module.css'
import ImageCard from '@/components/Common/Cards/ImageCard/Card'
import OurServiceContent from '@/content/HomePage/OurServices'
import { HOME_PAGE_TEXT } from '@/textV2'
const {ourServiceDescription,ourServices}=HOME_PAGE_TEXT.ourServices
const OurServices = () => {
  const [services] = useState(OurServiceContent)
  const scrollContainerRef = useRef(null)
  const windowWidth = useWindowWidth()

  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset
  }
  return (
    <div className={`text-center md:text-left ${Styles.servicesComponent}`}>
      <h1 className={Styles.heading}>
        {ourServices}
        <hr className={`md:m-0 ${Styles.underline}`} />
      </h1>
      <div className="my-2 flex justify-center md:justify-between  ml-[6%] w-[91%]">
        <h2
          className={`w-[100%] md:w-[60%] lg:w-[55%] mt-[13px] ${Styles.shortPara}`}
        >
          {ourServiceDescription}
        </h2>
        <div className='-mt-[45px]'>
        {windowWidth > 768 && (
          <LeftRightSlideButtons
            leftFunction={() => scroll(-400)}
            rightFunction={() => scroll(+400)}
          />
        )}
        </div>
      </div>
      <div className={Styles.wrapper} ref={scrollContainerRef}>
        {Object.keys(services).map((service, index) => (
          <ImageCard name={service} imageSrc={services[service].image} link={services[service].link} key={index} />
        ))}
      </div>
    </div>
  )
}
export default OurServices
