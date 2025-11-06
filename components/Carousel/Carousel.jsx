import { useState } from 'react'
import Image from 'next/image'
import leftArrow from '../../assets/carouselArrow/leftArrow.svg'
import rightArrow from '../../assets/carouselArrow/rightArrow.svg'
import LikeShareButtons from '../LikeShare/Component'
import LikeUnlike from '../LikeShare/LikeUnlike'

const Carousel = ({ images, id='' , isProject}='') => {
  const [index, setIndex] = useState(0)
  function prevSlide() {
    const isFirstSlide = index === 0
    const newIndex = isFirstSlide ? images.length - 1 : index - 1
    setIndex(newIndex)
  }
  function nextSlide() {
    const isLastSlide = index === images.length - 1
    const newIndex = isLastSlide ? 0 : index + 1
    setIndex(newIndex)
  }
  function goToSlide(slideIndex) {
    setIndex(slideIndex)
  }
  return (
    <div className="w-[100%] h-[100%] relative group">
      <div
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundSize: 'cover',
        }}
        className="rounded-2xl bg-center duration-500 aspect-square max-lg:w-[100%] max-lg:h-full lg:w-[238px] lg:h-[245px]"
      >
        <div className="absolute top-0 right-0 space-y-1 p-2 block sm:hidden">
          <LikeShareButtons />
          <LikeUnlike  id={id} isProject={isProject} />
        </div>
      </div>
      {images.length > 1 && (
        <div
          onClick={prevSlide}
          className="group block absolute top-[50%] -translate-x-0 -translate-y-[50%] -left-[2px] text-2xl rounded-full p-2 bg-white/70 text-white cursor-pointer ml-2"
        >
          <Image
            src={rightArrow}
            height={16}
            width={16}
            alt="right arrow icon"
          />
        </div>
      )}
      {images.length > 1 && (
        <div
          onClick={nextSlide}
          className="group block absolute top-[50%] -translate-x-0 -translate-y-[50%] max-lg:right-1 -right-[7px] text-2xl rounded-full p-2 bg-white/70 text-white cursor-pointer mr-1"
        >
          <Image src={leftArrow} height={16} width={16} alt="left arrow icon" />
        </div>
      )}
      <div className="flex top-4 justify-center ">
        {images.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-xl cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
  )
}
export default Carousel
