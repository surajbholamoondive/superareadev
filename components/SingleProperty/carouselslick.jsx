import React from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import mdiEye from '@/assets/AmenitiesIcons/mdiEye.svg'
import { COMPONENTS } from '@/textV2'

import plus from '../../assets/ImageComponent/plus.svg'
import LikeShareButtons from '../LikeShare/Component'
import LikeUnlike from '../LikeShare/LikeUnlike'
import Styles from './carousel.module.css'

const { alreadySeenText, photosText, viewsText } =
  COMPONENTS.SINGLE_PROPERTY_VIEW_COMPO.imageGridComponent
const OsmMap = dynamic(() => import('@/components/OsmMapCard/OsmMap'), {
  ssr: false,
})

const defaultImageUrl = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL

const ImageGridSlider = ({
  coverImage,
  rightImages,
  onImageClick,
  onMapClick,
  propertyVideos,
  localityLat,
  localityLng,
  id,
  alreadySeen,
  totalViews,
  isProject,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  const imageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  }

  const totalImages = rightImages.length
  const defaultRightImages = new Array(2).fill({
    url: defaultImageUrl,
    alt: 'mores images, real-estate images',
  })

  const handleImageClickInternal = (index) => {
    if (index === 2) {
      onMapClick()
    } else {
      onImageClick(index)
    }
  }
  return (
    <div>
      <div
        className={`flex cursor-pointer mt-2 ${Styles.imageGridContainer} ${Styles.nonMobile}`}
      >
        <div
          className={` ${Styles.coverImage}`}
          onClick={() => {
            if (rightImages.length >= 1) {
              onImageClick(0)
            }
          }}
        >
          {/* <img
            src={
              rightImages[0]?.url
                ? rightImages[0]?.url
                : process.env.NEXT_PUBLIC_DEFAULT_PROPERTY_PHOTO
            }
            alt={coverImage.alt || 'Property image, real-estate property image'}
            className="object-cover"
          /> */}
          <Image
            src={
              rightImages[0]?.url
                ? rightImages[0]?.url
                : process.env.NEXT_PUBLIC_DEFAULT_PROPERTY_PHOTO
            }
            alt={coverImage.alt || 'Property image, real-estate property image'}
            fill
            className="object-cover"
            style={{ borderRadius: '10px' }}
            priority // (optional, if above the fold)
          />
          <div className="absolute top-0 right-1 py-1 ">
            <div className="mb-2">
              <LikeUnlike id={id} isProject={isProject} />
            </div>
            <div className="ml-[1px]">
              <LikeShareButtons id={id} />
            </div>
          </div>
          {alreadySeen && (
            <div className="bg-alreadySeenBackground absolute bottom-1 right-3 mb-2 mr-2 px-3 backdrop-blur-sm p-2 rounded-full align-middle">
              <div className="text-white capitalize font-semibold">
                <p className="text-white"> {alreadySeenText} </p>
              </div>
            </div>
          )}
          {totalViews > 0 && (
            <div className="bg-viewCountBackground  backdrop-blur-sm absolute -top-2  rounded-full p-2 ml-4 mt-4 pr-3 flex w-fit gap-1">
              <div className="relative w-fit p-1 h-6">
                <Image src={mdiEye} alt="eye icon" width={2} height={2} />
              </div>
              <div className="w-fit pt-[1px]">
                <p className=" text-white">
                  {totalViews} {viewsText}
                </p>
              </div>
            </div>
          )}
        </div>

        {propertyVideos?.length === 0 ? (
          <div className={` ${Styles.rightImages}`}>
            {rightImages.length === 0 && (
              <div
                className={`${Styles.rightImageFull} relative px-1`}
                onClick={() => handleImageClickInternal(2)}
                style={{ width: '100%', marginLeft: '3px' }}
              >
                <OsmMap
                  onClick={onMapClick}
                  lng={localityLng}
                  lat={localityLat}
                />
              </div>
            )}

            {rightImages.length === 1 && (
              <div
                className={`${Styles.rightImage} ${Styles.rightImageFull} relative px-1 ml-1`}
                onClick={() => handleImageClickInternal(2)}
                style={{ width: '100%' }}
              >
                <OsmMap
                  lng={localityLng}
                  lat={localityLat}
                  borderradius="10px"
                  onClick={onMapClick}
                />
              </div>
            )}
            {rightImages.length === 2 && (
              <>
                <div
                  className={`${Styles.rightImageFull} relative px-1 pb-1 `}
                  onClick={() => onImageClick(1)}
                  style={{ width: '100%', height: '250px' }}
                >
                  {/* <img
                    src={rightImages[1]?.url}
                    alt="real estate property images, mores photos"
                  /> */}
                  <Image
                    src={rightImages[1]?.url || '/default-image.jpg'} // fallback image if needed
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  className={`${Styles.rightImage} relative px-1`}
                  onClick={() => handleImageClickInternal(2)}
                  style={{ width: '100%' }}
                >
                  <OsmMap
                    lng={localityLng}
                    lat={localityLat}
                    borderradius="10px"
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}

            {rightImages.length === 3 && (
              <>
                <div
                  className={`${Styles.rightImage} relative px-2 -mr-2  `}
                  onClick={() => onImageClick(1)}
                  style={{ width: '100%', height: '250px' }}
                >
                  {/* <img
                    src={rightImages[1]?.url}
                    alt="real estate property images, mores real-estate"
                  /> */}
                  <Image
                    src={rightImages[1]?.url || '/default-image.jpg'} // fallback image if needed
                    alt="real estate property images, mores real-estate"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(2)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <img
                    src={rightImages[2]?.url}
                    alt="real estate property images"
                  />
                </div> */}
                <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(1)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[1]?.url || '/default-image.jpg'}
                    alt="real estate property images"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`${Styles.rightImage} relative px-2 pt-2 `}
                  onClick={() => handleImageClickInternal(2)}
                  style={{ width: '98%' }}
                >
                  <div className="w-screen" />
                  <OsmMap
                    lng={localityLng}
                    lat={localityLat}
                    borderradius="10px"
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}
            {rightImages.length === 4 && (
              <>
                {/* <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(1)}
                >
                  <img
                    src={rightImages[1]?.url}
                    alt="real estate property images"
                  />
                </div> */}
                <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(1)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[1]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* <div
                  className={`${Styles.rightImage} relative px-1`}
                  onClick={() => onImageClick(2)}
                >
                  <img
                    src={rightImages[2]?.url}
                    alt="real estate property images"
                  />
                </div> */}
                <div
                  className={`${Styles.rightImage} relative px-1`}
                  onClick={() => onImageClick(2)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[2]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* <div
                  className={`${Styles.rightImage} relative px-2 -mr-1 pt-2 `}
                  onClick={() => onImageClick(3)}
                >
                  <img
                    src={rightImages[3]?.url}
                    alt="real estate property images"
                  />
                </div> */}

                <div
                  className={`${Styles.rightImage} relative px-2 -mr-1 pt-2`}
                  onClick={() => onImageClick(3)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[3]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`${Styles.rightImage} relative px-1 pt-2`}
                  onClick={() => handleImageClickInternal(2)}
                >
                  <OsmMap
                    borderradius="10px"
                    lng={localityLng}
                    lat={localityLat}
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}

            {rightImages.length > 4 && (
              <>
                {/* <div
                  className={`${Styles.rightImage} relative  px-2 -mr-1 `}
                  onClick={() => onImageClick(1)}
                >
                  <img
                    alt="real estate property images"
                    style={{ width: '100%', height: '250px' }}
                  />
                </div> */}

                <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(1)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[1]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* <div
                  className={`${Styles.rightImage} relative px-1 `}
                  onClick={() => onImageClick(2)}
                >
                  <img
                    src={rightImages[2]?.url}
                    alt="real estate property images, mores"
                  />
                </div> */}
                <div
                  className={`${Styles.rightImage} relative px-2 `}
                  onClick={() => onImageClick(2)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[2]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`${Styles.rightImage} relative px-2 pt-2`}
                  onClick={() => onImageClick(3)}
                        style={{ width: '100%', height: '250px' }}
                >
                  {/* <img
                    src={rightImages[3]?.url}
                    alt="real estate property images, mores"
                  /> */}
                   <Image
                    src={rightImages[3]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute  ml-2 mr-2 mt-2 inset-0 bg-gray-600 bg-opacity-90 flex justify-center item-center rounded-xl  text-white">
                    <div
                      className={`flex rounded-full px-4 py-2 mt-8  ${Styles.BgTwo}`}
                    >
                      <div className="w-3 h-3 ">
                        <Image src={plus} alt="plus" height={10} width={10} />
                      </div>
                      <span className="text-md ml-1">
                        {totalImages} {photosText}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`${Styles.rightImage} relative pt-2 pr-2 `}
                  onClick={() => handleImageClickInternal(2)}
                >
                  <OsmMap
                    borderradius="10px"
                    lng={localityLng}
                    lat={localityLat}
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={`px-1 ${Styles.rightImages}`}>
            {rightImages.length === 0 && (
              <div
                className={`${Styles.rightImageFull} relative px-1 `}
                onClick={() => handleImageClickInternal(2)}
              >
                <OsmMap
                  onClick={onMapClick}
                  lng={localityLng}
                  lat={localityLat}
                />
              </div>
            )}

            {rightImages.length === 1 && (
              <>
                <div
                  className={`${Styles.rightImage} relative px-1  w-full `}
                  onClick={() => onImageClick(2)}
                  style={{ width: '100%' }}
                >
                  <video
                    controls
                    src={propertyVideos ? propertyVideos[0].url : null}
                    alt="real estate property videos, mores property video"
                    style={{ width: '100%', height: '250px' }}
                  />
                </div>
                <div
                  className={`${Styles.rightImage} relative top-1 px-1`}
                  onClick={() => handleImageClickInternal(2)}
                  style={{ width: '100%' }}
                >
                  <OsmMap
                    lng={localityLng}
                    lat={localityLat}
                    borderradius="10px"
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}
            {rightImages.length === 2 && (
              <>
                {/* <div
                  className={`${Styles.rightImage} relative px-1  `}
                  onClick={() => onImageClick(2)}
                >
                  <img
                    src={rightImages[1]?.url}
                    alt="real estate property images, mores"
                  />
                </div> */}

                  <div
                  className={`${Styles.rightImage} relative px-1`}
                  onClick={() => onImageClick(1)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[1]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`${Styles.rightImage} relative px-1  `}
                  onClick={() => onImageClick(2)}
                >
                  <video
                    controls
                    src={propertyVideos[0].url}
                    alt="real estate property videos, mores property video"
                  />
                </div>
                <div
                  className={`${Styles.rightImage} relative px-1 py-1 `}
                  onClick={() => handleImageClickInternal(2)}
                  style={{ width: '690px' }}
                >
                  <OsmMap
                    lng={localityLng}
                    lat={localityLat}
                    borderradius="10px"
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}

            {rightImages.length === 3 && (
              <>
                {/* <div
                  className={`${Styles.rightImage} relative px-1  `}
                  onClick={() => onImageClick(2)}
                >
                  <img src={rightImages[1]?.url} alt="Default Image" />
                </div> */}
                  <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(2)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[2]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* <div
                  className={`${Styles.rightImage} relative px-1  `}
                  onClick={() => onImageClick(2)}
                >
                  <img src={rightImages[2]?.url} alt="Default Image" />
                </div> */}
                  <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(2)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[2]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`${Styles.rightImage} relative px-1 py-1 `}
                  onClick={() => onImageClick(2)}
                >
                  <video
                    controls
                    src={propertyVideos[0].url}
                    alt="real estate property videos, mores property video"
                  />
                </div>
                <div
                  className={`${Styles.rightImage} relative px-1 py-1 `}
                  onClick={() => handleImageClickInternal(2)}
                >
                  <OsmMap
                    lng={localityLng}
                    lat={localityLat}
                    borderradius="10px"
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}

            {rightImages.length >= 4 && (
              <>
                {/* <div
                  className={`${Styles.rightImage} relative px-1  `}
                  onClick={() => onImageClick(2)}
                >
                  <img src={rightImages[1]?.url} alt="Default Image" />
                </div> */}
                  <div
                  className={`${Styles.rightImage} relative px-2 -mr-1`}
                  onClick={() => onImageClick(2)}
                  style={{ width: '100%', height: '250px' }}
                >
                  <Image
                    src={rightImages[2]?.url || '/default-image.jpg'}
                    alt="real estate property images, more photos"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  className={`${Styles.rightImage} relative px-1`}
                  onClick={() => onImageClick(2)}
                >
                  <img src={rightImages[2]?.url} alt="Default Image" />
                  <div className="absolute  inset-0 ml-1  mr-1 bg-gray-800 bg-opacity-80 flex justify-center items-center rounded-xl  text-white">
                    <div
                      className={`flex rounded-full px-4 py-2 mt-8  ${Styles.Bg}`}
                    >
                      <div className="w-3 h-3 mt-2">
                        <Image src={plus} alt="plus" height={10} width={10} />
                      </div>

                      <span className="text-lg ml-1">
                        {totalImages} {photosText}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${Styles.rightImage} relative pt-2 pl-1 pr-1`}
                  onClick={() => onImageClick(2)}
                >
                  <video
                    controls
                    src={propertyVideos[0].url}
                    alt="real estate property videos, mores property video"
                  />
                </div>
                <div
                  className={`${Styles.rightImage} relative pt-2 pl-1  pr-1`}
                  onClick={() => handleImageClickInternal(2)}
                >
                  <OsmMap
                    lng={localityLng}
                    lat={localityLat}
                    borderradius="10px"
                    onClick={onMapClick}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className={`mt-2 ${Styles.mobileSlider} ${Styles.mobile}`}>
        <Slider {...settings}>
          {rightImages.map((img, index) => (
            <div
              className="relative"
              style={{ ...imageStyle, borderRadius: '10px' }}
              key={index}
              onClick={() => onImageClick(index)}
            >
              <img
                src={img.url || defaultImageUrl}
                alt={img.alt}
                style={{ ...imageStyle, borderRadius: '10px' }}
              />
              <div className="absolute top-0 right-3 py-1">
                <div className="mb-2">
                  <LikeUnlike id={id} isProject={isProject} />
                </div>
                <LikeShareButtons id={id} />
              </div>
              {alreadySeen && (
                <div className="bg-alreadySeenBackground absolute bottom-1 right-3 mb-2 mr-2 px-3 backdrop-blur-sm p-2 rounded-full align-middle">
                  <div className="text-white font-semibold text-sm">
                    {alreadySeenText}
                  </div>
                </div>
              )}
              {totalViews > 0 && (
                <div className="bg-viewCountBackground backdrop-blur-sm absolute -top-2 rounded-full p-2 ml-4 mt-4 pr-3 flex w-fit gap-1">
                  <div className="relative w-fit p-1 h-6">
                    <Image src={mdiEye} alt="eye icon" width={20} height={20} />
                  </div>
                  <div className="w-fit text-white pt-[1px]">
                    <p className="text-white">
                      {totalViews} {viewsText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ImageGridSlider
