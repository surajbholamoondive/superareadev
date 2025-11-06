import { useRef } from 'react'
import useWindowWidth from '@/context/useWindowWidth'
import LeftRightSlideButtons from '@/utils/leftRightSlideButtons'
import Card from './Card/Card'
import Styles from './index.module.css'

const Testimonials = ({ testimonial }) => {
  const scrollContainerRef = useRef(null)
  const windowWidth = useWindowWidth()
  const scroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset
  }
  return (
    <div className={`${Styles.servicesComponent}`}>
      <div className="flex justify-between">
        <div>
          <h1 className={Styles.heading}>
            Testimonials
            <hr className={`m-auto md:m-0 ${Styles.underline}`} />
          </h1>
        </div>
        <div className="mr-6 mt-[22px]">
          {windowWidth > 768 && (
            <LeftRightSlideButtons
              leftFunction={() => scroll(-400)}
              rightFunction={() => scroll(+400)}
            />
          )}
        </div>
      </div>
      <div className="relative">
        <div className={`lg:ml-0 ${Styles.wrapper}`} ref={scrollContainerRef}>
          {testimonial?.map((listItem, index) => (
            <Card description={listItem} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
