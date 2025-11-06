import { useState } from 'react'

const LeftSectionCarousel = ({ photoURLs, propertyCoverImage, statusView }) => {
  const [index, setIndex] = useState(0)
  const photo = propertyCoverImage
    ? propertyCoverImage
    : process.env.NEXT_PUBLIC_DEFAULT_PROPERTY_PHOTO

  function prevSlide() {
    const isFirstSlide = index === 0
    const newIndex = isFirstSlide ? photoURLs.length - 1 : index - 1
    setIndex(newIndex)
  }
  function nextSlide() {
    const isLastSlide = index === photoURLs.length - 1
    const newIndex = isLastSlide ? 0 : index + 1
    setIndex(newIndex)
  }
  function goToSlide(slideIndex) {
    setIndex(slideIndex)
  }

  return (
    <div
      className={`${
        statusView
          ? 'min-w-[260px]  lg:h-[80%] p-1'
          : 'max-md:min-h-[230px] min-w-[320px] max-md:min-w-[150px] lg:h-[103%]  p-2 pl-4 max-md:pl-0 pr-4 max-md:pr-0'
      } min-h-[150px] max-md:h-[80%] max-sm:h-[180px] relative group`}
    >
      <div
        style={{
          backgroundImage: `url(${photoURLs[index] || photoURLs[index + 1]})`,
          backgroundSize: 'fill',
        }}
        className="w-full h-[210px] rounded-xl max-md:rounded-lg bg-center bg-cover duration-500 max-lg:aspect-square "
      ></div>
      {photoURLs.length > 1 && (
        <>
          <div
            onClick={prevSlide}
            className="group block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-white/70 text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M16.1506 6.70001L9.85059 13L16.1506 19.3"
                stroke="#232339"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            onClick={nextSlide}
            className="group block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-white/70 text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M9.84942 19.3L16.1494 13L9.84942 6.69999"
                stroke="#232339"
                strokeWidth="2"
              />
            </svg>
          </div>
        </>
      )}
      <div className="flex top-4 justify-center py-2">
        {photoURLs.map((slide, slideIndex) => (
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
export default LeftSectionCarousel
