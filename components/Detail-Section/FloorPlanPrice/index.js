import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import comingSoon from '@/assets/PostProperty/coming_soon.svg'
import { useAuth } from '@/context/auth'
import {
  PROJECT_SIZE_UNIT,
  TEXT_FILL_CONTACT_FORM_TO_SEE_UNIT_FLOOR_PLAN,
} from '@/text'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { formatNumberWithUnit } from '@/utils/utils'
import axios from 'axios'
import { toast } from 'react-toastify'

import ContactForm from '@/components/ContactForm/ContactForm'

import bathTub from '../../../assets/AmenitiesIcons/bathtub.svg'
import bedRoom from '../../../assets/AmenitiesIcons/doubleBed.svg'
import edit from '../../../assets/ButtonIcons/edit.svg'
import leftArrow from '../../../assets/ButtonIcons/left-arrow.svg'
import newbackButton from '../../../assets/ButtonIcons/newbackButton.svg'
import trash from '../../../assets/ButtonIcons/trash-01.svg'
import { HOME_PAGE_TEXT } from '../../../textV2'
import Styles from './index.module.css'

const { userContactRoute } = HOME_PAGE_TEXT.routes

const { POST_PROJECT_COMPO } = COMPONENTS
const { stepTwoText } = POST_PROJECT_COMPO
const { symbols, text } = GLOBALLY_COMMON_TEXT

const FloorPlanPricing = ({
  projectUnits,
  handleEdit,
  handleDelete,
  isShowEdit = false,
  handleClick,
  handlePrepopulate,
  isplotRange,
}) => {
  const [auth] = useAuth()
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [viewFloorPlan, setViewFloorPlan] = useState(false)
  const [filteredUnits, setFilteredUnits] = useState(projectUnits)
  const [selectedBHK, setSelectedBHK] = useState('All')
  const [isBlurred, setIsBlurred] = useState(true)
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [style, setStyle] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  useEffect(() => {
    const storedEmail = localStorage.getItem('formSubmittedEmail')
    if (storedEmail) {
      setIsBlurred(false)
    } else if (auth?.user?.email) {
      if (storedEmail === auth.user.email) {
        setIsBlurred(false)
      }
    }
  }, [auth?.user?.email])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.firstName.trim()) {
      return toast.error('First Name is required')
    }
    if (!formData.lastName.trim()) {
      return toast.error('Last Name is required')
    }
    if (!formData.email.trim()) {
      return toast.error('Email is required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return toast.error('Please enter a valid email address')
    }
    if (!formData.phone.trim()) {
      return toast.error('Phone number is required')
    }

    const digitsOnly = formData.phone.replace(/\D/g, '')
    if (digitsOnly.length < 10) {
      return toast.error('Please enter a valid phone number')
    }

    const formattedPhone = digitsOnly.startsWith('91')
      ? `+${digitsOnly}`
      : `+91${digitsOnly}`

    if (!formData.message.trim()) {
      return toast.error('Message cannot be empty')
    }

    try {
      const response = await axios.post(userContactRoute, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formattedPhone,
        message: formData.message,
      })

      setIsVisible(true)
      localStorage.setItem('formSubmittedEmail', formData.email)

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })

      toast.success('Your message has been sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      })
      setIsOpen(false)
      setIsBlurred(false)
    } catch (error) {
      toast.error('Failed to submit form. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const bhkOptions = [
    ...new Set(
      projectUnits
        ?.filter(
          (unit) =>
            unit && unit.unitTitle !== undefined && unit.unitTitle !== null
        )
        .map((unit) => unit.unitTitle)
    ),
  ]
  const uniqueBHKOptions =
    bhkOptions.length > 0 ? ['All', ...bhkOptions] : ['All']

  useEffect(() => {
    if (selectedBHK === 'All') {
      setFilteredUnits(projectUnits)
    } else {
      setFilteredUnits(
        projectUnits.filter((unit) => unit.unitTitle === selectedBHK)
      )
    }
  }, [selectedBHK, projectUnits])

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      const hasMoreRight =
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      setCanScrollRight(hasMoreRight)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      checkScrollability()
      setTimeout(checkScrollability, 100)
      window.addEventListener('resize', checkScrollability)

      const handleImagesLoaded = () => {
        checkScrollability()
      }

      const images = container.querySelectorAll('img')
      images.forEach((img) => {
        if (img.complete) {
          handleImagesLoaded()
        } else {
          img.addEventListener('load', handleImagesLoaded)
        }
      })
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
        const images = container.querySelectorAll('img')
        images.forEach((img) => {
          img.removeEventListener('load', checkScrollability)
        })
      }
    }
  }, [filteredUnits])

  useEffect(() => {
    setTimeout(checkScrollability, 100)
  }, [filteredUnits])

  const handleOpen = (projectUnit) => {
    setViewFloorPlan(projectUnit)
    setOpen(true)
  }

  const handleCloseInfoModal = () => {
    setShowInfoModal(false)
  }

  const handleFormClose = () => {
    setIsOpen(false)
  }

  const handleClose = () => setOpen(false)

  const getLabelFromValue = (value) => {
    const unit = PROJECT_SIZE_UNIT.find((unit) => unit.value === value)
    return unit ? unit.label : stepTwoText.sqFt
  }

  const handleViewClick = () => {
    setIsOpen(true)
  }

  const scrollByCard = (direction) => {
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.querySelector('div')
      const cardWidth = card ? card.offsetWidth + 24 : 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      })
      setTimeout(checkScrollability, 400)
    }
  }
  console.log('filteredUnits', filteredUnits)
  const scrollLeft = () => scrollByCard('left')
  const scrollRight = () => scrollByCard('right')
  return (
    <div className="relative">
      <div>
        <div className="flex gap-5 overflow-hidden">
          {uniqueBHKOptions.map((option) => (
            <div
              key={option}
              className={`bg-aliceBlueBg px-3 py-1 rounded-lg cursor-pointer ${selectedBHK === option ? 'bg-primary rounded-3xl text-white border border-secondary' : ''}`}
              onClick={() => setSelectedBHK(option)}
            >
              <h4
                className={`${selectedBHK === option ? 'text-white' : 'text-headingColor'}`}
              >
                {option}
              </h4>
            </div>
          ))}
        </div>
        <div className="relative my-3">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-1 shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full">
                <Image
                  src={leftArrow}
                  height={12}
                  width={12}
                  className="md:w-[15px] md:h-[15px]"
                  alt="Scroll left"
                />
              </div>
            </button>
          )}

          <div
            className={`gap-3 md:gap-6 my-3 relative overflow-x-auto ${Styles.wrapper} pb-1`}
            ref={scrollContainerRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredUnits?.length > 0 &&
              filteredUnits.map((projectUnit, index) => (
                <div
                  key={index}
                  className="rounded-[18px] border border-primary overflow-hidden flex flex-col min-w-[260px] max-w-[280px] md:min-w-[280px] md:max-w-[300px] bg-white"
                >
                  {/* BHK and Area Header */}
                  <div className="bg-white px-4 py-3 border-b border-gray-100 flex justify-between items-start min-h-[60px]">
                    <div>
                      <span className="text-primary font-bold text-md">
                        {projectUnit?.unitTitle || ''}
                      </span>
                    </div>

                    {projectUnit?.primaryArea?.areaSize ? (
                      <div className="text-right ">
                        <div className="text-primary font-bold text-md">
                          {projectUnit.primaryArea.areaSize} sq.ft.
                        </div>
                        <div className="text-primary text-sm">Carpet Area</div>
                      </div>
                    ) : (
                      <div className="text-right">
                        {projectUnit?.plotAreaLength &&
                          projectUnit?.plotAreaLengthPerUnit &&
                          projectUnit?.plotAreaBreadth &&
                          projectUnit?.plotAreaBreadthPerUnit && (
                            <div className="text-xs md:text-sm text-primary">
                              {formatNumberWithUnit(projectUnit.plotAreaLength)}{' '}
                              {getLabelFromValue(
                                projectUnit.plotAreaLengthPerUnit
                              )}{' '}
                              -{' '}
                              {formatNumberWithUnit(
                                projectUnit.plotAreaBreadth
                              )}{' '}
                              {getLabelFromValue(
                                projectUnit.plotAreaBreadthPerUnit
                              )}
                            </div>
                          )}
                      </div>
                    )}
                  </div>

                  {/* Image Section */}
                  <div className="relative">
                    <div className={`${isBlurred ? 'blur-sm' : ''}`}>
                      <Image
                        src={projectUnit?.imageUrl?.[0]?.url || comingSoon}
                        width={500}
                        height={250}
                        className={ `w-full h-[180px] md:h-[215px] object-cover px-3 md:px-6 py-2`}
                        alt="Floor Plan"
                        onLoad={checkScrollability}
                      />
                      <button
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-primary rounded-md px-3 py-1 cursor-pointer text-primaryBackground text-sm hover:bg-opacity-90 transition-all"
                        onClick={() => handleOpen(projectUnit)}
                        disabled={isBlurred}
                      >
                        {stepTwoText.viewFloorPlan}
                      </button>
                    </div>
                    {isBlurred && auth?.userResult?.userType !== 'Admin' && (
                      <button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition-all text-sm"
                        onClick={handleViewClick}
                      >
                        View
                      </button>
                    )}
                  </div>

                  {/* Content Section */}
                  <div
                    className={`px-3 md:px-4 py-6 flex  justify-center items-center flex-col gap-2 w-full ${isShowEdit ? 'min-h-[160px]' : 'min-h-[140px]'}`}
                  >
                    {/* Price */}
                    <div className="text-sm md:text-lg text-primary  flext justify-center items-center font-semibold ">
                      {projectUnit?.plotSalePrice ? (
                        <>
                          {symbols.rupeeSymbol}
                          {formatNumberWithUnit(projectUnit.plotSalePrice)}{' '}
                          {stepTwoText.onwards}
                        </>
                      ) : projectUnit?.plotMinPrice &&
                        projectUnit?.plotMaxPrice ? (
                        <>
                          {symbols.rupeeSymbol}
                          {formatNumberWithUnit(
                            projectUnit.plotMinPrice
                          )} - {formatNumberWithUnit(projectUnit.plotMaxPrice)}{' '}
                          {stepTwoText.onwards}
                        </>
                      ) : projectUnit?.maxPrice && projectUnit?.minPrice ? (
                        <>
                          {symbols.rupeeSymbol}{' '}
                          {formatNumberWithUnit(projectUnit.minPrice)} -{' '}
                          {formatNumberWithUnit(projectUnit.maxPrice)}{' '}
                          {stepTwoText.onwards}
                        </>
                      ) : projectUnit?.salePrice != null &&
                        projectUnit?.salePrice !== '' ? (
                        <>
                          {symbols.rupeeSymbol}{' '}
                          {formatNumberWithUnit(projectUnit.salePrice)}{' '}
                          {stepTwoText.onwards}
                        </>
                      ) : null}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex justify-between items-center mt-auto pt-3">
                      <button
                        disabled={auth?.userResult?.userType === 'Admin'}
                        className={`border border-primary px-4 md:px-12 py-1.5 rounded-2xl text-sm flex-1 mr-2 transition-all text-primary
    ${
      auth?.userResult?.userType === 'Admin'
        ? 'border border-primary px-4 md:px-12 py-1.5 rounded-2xl text-sm flex-1 mr-2 transition-all cursor-not-allowed text-primary'
        : 'text-primary cursor-pointer hover:bg-primary hover:text-white'
    }`}
                        onClick={handleViewClick}
                      >
                        {stepTwoText.contactUs}
                      </button>

                      {isShowEdit && (
                        <div className="flex gap-2 md:gap-3 items-center">
                          <button
                            className="cursor-pointer p-1"
                            onClick={() => handleEdit(index)}
                          >
                            <Image
                              src={edit}
                              width={16}
                              height={16}
                              alt="Edit"
                              className="w-4 h-4"
                            />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="cursor-pointer p-1"
                          >
                            <Image
                              src={trash}
                              width={16}
                              height={16}
                              alt="Delete"
                              className="w-4 h-4"
                            />
                          </button>
                          {!isplotRange && (
                            <button
                              onClick={() => {
                                handleClick()
                                handlePrepopulate(index)
                              }}
                              className="cursor-pointer text-primary text-xs"
                            >
                              {stepTwoText.preFill}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-1 shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full">
                <Image
                  src={leftArrow}
                  height={12}
                  width={12}
                  className="md:w-[15px] md:h-[15px]"
                  alt="Scroll right"
                  style={{ transform: 'rotate(180deg)' }}
                />
              </div>
            </button>
          )}
        </div>
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999]">
            <div className="relative bg-white p-4 rounded-lg shadow-lg w-[90vw] max-w-[600px]">
              <div className="flex justify-between items-center mb-2">
                <div
                  className="cursor-pointer flex gap-2"
                  onClick={handleClose}
                >
                  <Image src={leftArrow} height={15} width={15} />
                  <p>{text.unitsFloorPlans}</p>
                </div>
                <Image
                  src={newbackButton}
                  width={30}
                  height={30}
                  className="cursor-pointer"
                  onClick={handleClose}
                  alt="close"
                />
              </div>
              <div className="w-full">
                <Image
                  src={viewFloorPlan?.imageUrl?.[0]?.url || comingSoon}
                  width={600}
                  height={300}
                  className="h-[300px] rounded-lg"
                  alt="Floor Plan"
                />
              </div>
              <div className="mt-2 bg-viewCountBackground p-2 rounded-md">
                <div className="flex justify-between items-center">
                  {((typeof viewFloorPlan?.bedroomCount === 'number' &&
                    viewFloorPlan?.bedroomCount > 0) ||
                    (typeof viewFloorPlan?.bedroomCount === 'string' &&
                      viewFloorPlan?.bedroomCount) ||
                    (typeof viewFloorPlan?.bathroomCount === 'number' &&
                      viewFloorPlan?.bathroomCount > 0) ||
                    (typeof viewFloorPlan?.bathroomCount === 'string' &&
                      viewFloorPlan?.bathroomCount)) && (
                    <>
                      <div className="flex items-center gap-2">
                        <Image
                          src={bedRoom}
                          height={20}
                          width={20}
                          className="p-[2px]"
                        />
                        <p>
                          {viewFloorPlan?.bedroomCount} {text.bedroom}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={bathTub}
                          height={20}
                          width={20}
                          className="p-[2px]"
                        />
                        <p>
                          {viewFloorPlan?.bathroomCount} {text.bathroom}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  {viewFloorPlan?.openSides && (
                    <p>
                      {stepTwoText.openSides} : {viewFloorPlan?.openSides}
                    </p>
                  )}
                  {viewFloorPlan?.boundaryWalls && (
                    <p>
                      {stepTwoText.boundaryWalls} :{' '}
                      {viewFloorPlan?.boundaryWalls}
                    </p>
                  )}
                </div>
                {((viewFloorPlan?.roadFacingPlotLength &&
                  viewFloorPlan?.roadFacingPlotLengthPerUnit) ||
                  (viewFloorPlan?.roadFacingPlotBreadth &&
                    viewFloorPlan?.roadFacingPlotBreadthPerUnit)) && (
                  <div className="flex justify-between items-center">
                    <div>
                      <p>
                        {stepTwoText.plotLength} :{' '}
                        {viewFloorPlan?.roadFacingPlotLength}{' '}
                        {getLabelFromValue(
                          viewFloorPlan?.roadFacingPlotLengthPerUnit
                        )}
                      </p>
                    </div>
                    <div>
                      <p>
                        {stepTwoText.plotBreadth} :{' '}
                        {viewFloorPlan?.roadFacingPlotBreadth}{' '}
                        {getLabelFromValue(
                          viewFloorPlan?.roadFacingPlotBreadthPerUnit
                        )}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    {viewFloorPlan?.furnishingStatus && (
                      <p>
                        {stepTwoText.furnishingStatus} :{' '}
                        {viewFloorPlan?.furnishingStatus}
                      </p>
                    )}
                  </div>
                  <div>
                    {viewFloorPlan?.pantryArea && (
                      <p>
                        {stepTwoText.pantryArea} : {viewFloorPlan?.pantryArea}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {viewFloorPlan?.washroomCount && (
                      <p>
                        {stepTwoText.washroomType} :{' '}
                        {viewFloorPlan?.washroomCount}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div className="flex flex-wrap gap-2">
                    {viewFloorPlan?.dedicatedRoom &&
                      (Array.isArray(viewFloorPlan?.dedicatedRoom) ? (
                        viewFloorPlan.dedicatedRoom
                          .filter((room) => room && room.length > 1)
                          .map((room, index) => (
                            <p
                              className="bg-primary px-2 py-1 text-primaryBackground rounded-lg"
                              key={index}
                            >
                              {room}
                            </p>
                          ))
                      ) : (
                        <p>
                          {stepTwoText.dedicatedRooms} :{' '}
                          {viewFloorPlan?.dedicatedRoom}
                        </p>
                      ))}
                  </div>
                </div>
                {viewFloorPlan?.reraArea?.displayReraCarpetArea && (
                  <p className="mt-2 px-1">
                    {stepTwoText.reraCarpetArea} :{' '}
                    {formatNumberWithUnit(
                      viewFloorPlan?.reraArea?.reraCarpetArea
                    )}{' '}
                    {getLabelFromValue(
                      viewFloorPlan?.reraArea?.reraCarpetAreaUnit
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <ContactForm
        handleSubmit={handleSubmit}
        onCancel={handleFormClose}
        handleChange={handleChange}
        formData={formData}
        text={TEXT_FILL_CONTACT_FORM_TO_SEE_UNIT_FLOOR_PLAN}
        onClose={handleCloseInfoModal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        style={true}
        isButton={true}
      />
    </div>
  )
}

export default FloorPlanPricing
