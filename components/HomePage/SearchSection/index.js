import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import useWindowWidth from '@/context/useWindowWidth'
import {
  AGRICULTURE,
  AI,
  BUY_TEXT_SMALL,
  COMMERCIAL,
  FIND_YOUR,
  INDUSTRIAL,
  PERFECT,
  POWERED_BY,
  RENT_TEXT_SMALL,
  RESIDENTIAL,
  SPACE,
  UP_FOR_RENT,
  UP_FOR_SALE,
} from '@/text'

import AgricultureIcon from '../../../assets/ColorChangeIcons/FilterIcons/AgricultureIcon'
import CommercialIcon from '../../../assets/ColorChangeIcons/FilterIcons/CommercialIcon'
import IndustrialIcon from '../../../assets/ColorChangeIcons/FilterIcons/IndustrialIcon'
import ResidentialIcon from '../../../assets/ColorChangeIcons/FilterIcons/Residential'
// import buildingImg from '../../../assets/homePageImage.jpg'
const buildingImg = "https://res.cloudinary.com/dgjhnlqjy/image/upload/v1762244230/assets/homePageImage.jpg";
import effect from '../../../assets/topRight.jpg'
import options from '../../../content/MoreOptions/index.jsx'
import Styles from './search.module.css'
import SearchBox from './SearchBox'

const SearchSection = () => {
  const windowWidth = useWindowWidth()
  const isMobileView = windowWidth < 768
  const [moreOptionData] = useState(options)
  const [clicked, setClicked] = useState(false)
  const [sell, setSell] = useState('up for sale')
  const [rent, setRent] = useState('')
  const [isBuyActive, setIsBuyActive] = useState(true)
  const [isRentActive, setIsRentActive] = useState(false)
  const [isCommercialActive, setIsCommercialActive] = useState(false)
  const [isResidentialActive, setIsResidentialActive] = useState(true)
  const [isIndustrialActive, setIsIndustrialActive] = useState(false)
  const [isAgricultureActive, setIsAgricultureActive] = useState(false)
  const [commercial, setCommercial] = useState('')
  const [residential, setResidential] = useState('Residential')
  const [industrial, setIndustrial] = useState('')
  const [agriculture, setAgriculter] = useState('')
  const [plotAndLand, setPlotAndLand] = useState('')
  const [isPlotAndLandActive, setIsPlotAndLandActive] = useState(false)
  const [newProject, setNewProject] = useState('')
  const [pG, setPG] = useState('')
  const [villa, setVilla] = useState('')
  const [propertySubType, setPropertySubType] = useState('')
  const [noIcon] = useState(true)
  const divRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setClicked(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [sell])
  const handleBuyClick = () => {
    setIsBuyActive(true)
    setIsRentActive(false)
    setSell(UP_FOR_SALE)
    setRent('')
  }

  const handleRentClick = () => {
    setIsRentActive(true)
    setIsBuyActive(false)
    setRent(UP_FOR_RENT)
    setSell('')
  }

  const handleResidentialClick = () => {
    setIsResidentialActive(true)
    setIsCommercialActive(false)
    setIsIndustrialActive(false)
    setResidential(RESIDENTIAL)
    setCommercial('')
    setIndustrial('')
    setAgriculter('')
  }

  const handleCommercialClick = () => {
    setIsCommercialActive(true)
    setIsResidentialActive(false)
    setIsIndustrialActive(false)
    setCommercial(COMMERCIAL)
    setResidential('')
    setIndustrial('')
    setAgriculter('')
  }

  const handleIndustrialClick = () => {
    setIsIndustrialActive(!isIndustrialActive)
    setIsResidentialActive(false)
    setIsCommercialActive(false)
    if (!isIndustrialActive) {
      setIndustrial(INDUSTRIAL)
      setResidential('')
      setCommercial('')
      setAgriculter('')
    } else {
      setIndustrial('')
    }
  }

  const handleAgricultureClick = () => {
    setIsAgricultureActive(true)
    setIsResidentialActive(false)
    setIsCommercialActive(false)
    setIsIndustrialActive(false)

    setAgriculter(AGRICULTURE)

    setResidential('')
    setCommercial('')
    setIndustrial('')
  }

  return (
    <div
      className={`custom-section relative z-10 flex flex-row md:px-10 max-md:px-4 pt-24 max-md:pt-10 max-lg:h-[600px] h-[700px] w-[95%] lg:w-[93%] ${Styles.searchImage}`}
    >
      <div className="w-full h-[58%] -z-10 absolute bottom-0 left-0">
        <Image
          fill
          src={buildingImg}
          style={{
            borderRadius: '0.75rem',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <div
        className="absolute top-0 right-0 -z-20 
             w-[45%] h-[52%] 
             max-md:w-[75%] max-md:h-[200px]"
      >
        <Image
          fill
          src={effect}
          alt="effect"
          className="rounded-xl object-cover object-center"
        />
      </div>

      <div className="w-[100%]">
        <div className="flex flex-col md:my-8 gap-2 m-auto">
          {/* Desktop view */}
          <h1 className={`lg:ps-[10px] text-primary font-thin max-md:hidden`}>
            {FIND_YOUR}{' '}
            <span className="font-black text-[3rem]">{PERFECT}</span>
          </h1>
          <div className="lg:w-2/3 lg:ps-3 flex md:flex-col max-md:hidden">
            <h1 className={`text-primary font-thin md:w-[600px]`}>
              <span className="font-black text-[3rem]">{SPACE}</span> -{' '}
              {POWERED_BY} <span className="font-black text-[3rem]">{AI}</span>
            </h1>
          </div>

          {/* Mobile view */}
          <div className="hidden max-md:flex flex-col    tracking-wide">
            <h1 className="text-primary font-thin text-[2rem]">{FIND_YOUR}</h1>
            <h1 className="font-black text-[3rem] max-[375px]:text-[2.8rem] text-primary">
              {PERFECT} {SPACE}
            </h1>
            <p className="text-primary text-sm -mt-1">
              - {POWERED_BY} <span className="font-black">{AI}</span>
            </p>
          </div>
        </div>

        <div
          className={`flex lg:w-full flex-col justify-center lg:mb-20  max-md:mt-4 `}
        >
          {/* new filter section based on icons*/}
          <div className="flex gap-x-4 md:pl-3 mb-8 max-[375px]:gap-x-1">
            <div
              className="flex flex-col items-center gap-y-1 cursor-pointer"
              onClick={handleResidentialClick}
            >
              <ResidentialIcon
                color={residential === RESIDENTIAL ? '#931602' : 'black'}
              />
              <p
                className={`md:py-[2px] md:px-3 p-[2px] rounded-lg ${residential === RESIDENTIAL && 'bg-primary text-white'}`}
              >
                Residential
              </p>
            </div>
            <div
              className="flex flex-col items-center gap-y-1 cursor-pointer"
              onClick={handleCommercialClick}
            >
              <CommercialIcon
                color={commercial === COMMERCIAL ? '#931602' : 'black'}
              />
              <p
                className={`md:py-[2px] md:px-3 p-[2px] rounded-lg ${commercial === COMMERCIAL && 'bg-primary text-white'}`}
              >
                Commercial
              </p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer gap-y-1"
              onClick={handleAgricultureClick}
            >
              <AgricultureIcon
                color={agriculture === AGRICULTURE ? '#931602' : 'black'}
              />
              <p
                className={`md:py-[2px] md:px-3 p-[2px] rounded-lg ${agriculture === AGRICULTURE && 'bg-primary text-white'}`}
              >
                Agriculture
              </p>
            </div>
            <div
              className="flex flex-col items-center gap-y-1 cursor-pointer"
              onClick={handleIndustrialClick}
            >
              <IndustrialIcon
                color={industrial === INDUSTRIAL ? '#931602' : 'black'}
              />
              <p
                className={`md:py-[2px] md:px-3 p-[2px] rounded-lg ${industrial === INDUSTRIAL && 'bg-primary text-white'}`}
              >
                Industrial
              </p>
            </div>
          </div>
          <div className={`flex justify-start max-md:justify-between pt-2`}>
            <div className="flex items-center w-full md:hidden justify-between">
              <div className="flex w-full  justify-between lg:mr-[10px]">
                <div
                  className={`flex rounded-t-2xl ${Styles.filterButtonInactive}`}
                >
                  <div
                    onClick={handleBuyClick}
                    className={`flex w-[90px] justify-center max-md:w-[70px] h-full py-2  cursor-pointer border-searchFilterButtonBorder rounded-tl-2xl ${isBuyActive ? Styles.filterButtonActive : ''
                      }`}
                  >
                    <button className={`${isBuyActive ? 'font-bold' : ''}`}>
                      {BUY_TEXT_SMALL}
                    </button>
                  </div>
                  <div
                    onClick={handleRentClick}
                    className={`flex w-[90px] md:w-[90px] max-md:w-[70px] justify-center h-full py-2 cursor-pointer border-searchFilterButtonBorder rounded-tr-2xl ${isRentActive ? Styles.filterButtonActive : ''
                      }`}
                  >
                    <button className={`${isRentActive ? 'font-bold' : ''}`}>
                      {RENT_TEXT_SMALL}
                    </button>
                  </div>
                </div>
                {/* <div
                  className={`flex items-center w-[140px] justify-center rounded-t-2xl bg-yellow-600  ${clicked ? Styles.filterButtonActive : Styles.filterButtonInactive
                    }`}
                  onClick={() => setClicked(!clicked)}
                >
                  {Object.keys(moreOptionData).map((content, index) => (
                    <SearchDropdown
                      menuItem={moreOptionData[content]}
                      key={index}
                      isBuyActive={isBuyActive}
                      isCommercialActive={isCommercialActive}
                      isRentActive={isRentActive}
                      isResidentialActive={isResidentialActive}
                      isPlotAndLandActive={isPlotAndLandActive}
                      setIsBuyActive={setIsBuyActive}
                      setIsCommercialActive={setIsCommercialActive}
                      setIsRentActive={setIsRentActive}
                      setIsResidentialActive={setIsResidentialActive}
                      setIsPlotAndLandActive={setIsPlotAndLandActive}
                      newProject={newProject}
                      setNewProject={setNewProject}
                      pG={pG}
                      setPG={setPG}
                      villa={villa}
                      setVilla={setVilla}
                      plotAndLand={plotAndLand}
                      setPlotAndLand={setPlotAndLand}
                      isMobileView={isMobileView}
                      sell={sell}
                      setSell={setSell}
                      rent={rent}
                      setRent={setRent}
                      residential={residential}
                      setResidential={setResidential}
                      commercial={commercial}
                      setCommercial={setCommercial}
                      noIcon={noIcon}
                    />
                  ))}
                </div> */}
              </div>
            </div>
            <div className="flex gap-1 max-md:hidden">
              <div className="flex max-lg:hidden lg:mr-[10px] gap-2">
                <div
                  className={`flex rounded-t-[18px] ${Styles.filterButtonInactive} `}
                >
                  <div
                    onClick={handleBuyClick}
                    className={`flex w-[90px] justify-center h-full py-2 cursor-pointer rounded-tl-[1rem] ${isBuyActive ? Styles.filterButtonActive : ''
                      }`}
                  >
                    <button className={`${isBuyActive ? 'font-bold text-white' : 'text-[#931602]'}`}>
                      {BUY_TEXT_SMALL}
                    </button>
                  </div>
                  <div
                    onClick={handleRentClick}
                    className={`flex w-[90px] justify-center h-full py-2  cursor-pointer border-searchFilterButtonBorder rounded-tr-2xl ${isRentActive ? Styles.filterButtonActive : ''
                      }`}
                  >
                    <button className={`${isRentActive ? 'font-bold text-white' : 'text-[#931602]'}`}>
                      {RENT_TEXT_SMALL}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                <div className="flex  border-b-2 lg:mr-[10px] gap-2">
                  <div
                    className={`flex rounded-t-2xl ${Styles.filterButtonInactive}  `}
                  >
                    <div
                      onClick={handleBuyClick}
                      className={`flex w-[90px] md:w-[90px] justify-center  h-full py-2  cursor-pointer border-searchFilterButtonBorder rounded-t-2xl ${isBuyActive ? Styles.filterButtonActive : ''
                        }`}
                    >
                      <button className={`${isBuyActive ? 'font-bold text-white' : 'text-[#931602]'}`}>{BUY_TEXT_SMALL}</button>
                    </div>
                    <div
                      onClick={handleRentClick}
                      className={`flex w-[90px] md:w-[90px] justify-center h-full py-2  cursor-pointer border-searchFilterButtonBorder rounded-t-2xl ${isRentActive ? Styles.filterButtonActive : ''
                        }`}
                    >
                      <button className={`${isRentActive ? 'font-bold text-white' : 'text-[#931602]'}`}>{RENT_TEXT_SMALL}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SearchBox
            newProject={newProject}
            pG={pG}
            villa={villa}
            plotAndLand={plotAndLand}
            sell={sell}
            rent={rent}
            residential={residential}
            commercial={commercial}
            Agricultural={agriculture}
            Industrial={industrial}
            propertySubType={propertySubType}
            setPropertySubType={setPropertySubType}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection
