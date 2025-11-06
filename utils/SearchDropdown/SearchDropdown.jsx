import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  COMMERCIAL,
  MORE_OPTIONS,
  RESIDENTIAL,
} from '@/text'

import whiteTriangle from '../../assets/NavbarIcons/triangle.svg'
import Styles from './index.module.css'

const SearchDropdown = ({
  isBuyActive,
  isCommercialActive,
  isRentActive,
  isResidentialActive,
  isPlotAndLandActive,
  setIsBuyActive,
  setIsCommercialActive,
  setIsRentActive,
  setIsResidentialActive,
  setIsPlotAndLandActive,
  newProject,
  setNewProject,
  pG,
  setPG,
  villa,
  setVilla,
  plotAndLand,
  setPlotAndLand,
  sell,
  setSell,
  rent,
  setRent,
  residential,
  setResidential,
  commercial,
  setCommercial,
  noIcon,
}) => {
  const color = [
    'rgba(1, 129, 145, 0.08)',
    'rgba(147, 22, 2, 0.06)',
    'rgba(200, 142, 32, 0.06)',
  ]
  const [clicked, setClicked] = useState(false)
  const divRef = useRef(null)

  const handleResidentialClick = (e) => {
    e.stopPropagation()
    setIsResidentialActive(true)
    setIsCommercialActive(false)
    setResidential(RESIDENTIAL)
    setCommercial('')
  }
  const handleCommercialClick = (e) => {
    e.stopPropagation()
    setIsCommercialActive(true)
    setIsResidentialActive(false)
    setCommercial(COMMERCIAL)
    setResidential('')
  }
  const handleFilterButtonClick = (e) => {
    e.stopPropagation()
  }
  return (
    <div
      className={` ${Styles.dropDown}  ${clicked ? `${Styles.dropDown2}` : ''}`}
    >
      <button
        className="flex items-center relative top-0"
        onClick={() => setClicked(!clicked)}
      >
        {/* <div className="bg-white rounded-full p-1 mr-3 font-light">
          <Image src={moreoptions} height={25} width={15} alt="icon" />
        </div> */}
        <p style={{ letterSpacing: '0.5px' }}>
          {MORE_OPTIONS}
        </p>
        <Image
          src={whiteTriangle}
          className={Styles.whiteTriangle}
          width={20}
          alt="white triangle"
        />
      </button>
      <div className={`w-[250px] ${Styles.dropdownMenu}`}>
        <div className="flex flex-col" onClick={handleFilterButtonClick}>
          <div
            className={Styles.innerDiv}
            style={{ backgroundColor: color[0] }}
          >
            <h4 className={`${Styles.headTag} md:hidden max-md:visible`}>
              Property Type
            </h4>
            <hr className={`${Styles.underline} md:hidden max-md:visible`} />
            <div
              onClick={handleResidentialClick}
              className={`flex  gap-3 md:hidden max-md:visible ${noIcon ? '' : 'pr-3 pl-[6px] py-2 border border-solid'}  cursor-pointer border-searchFilterButtonBorder text-black  rounded-full `}
            >
              <button className={`${
                isResidentialActive ? 'font-bold' : ''
              } `}>{RESIDENTIAL}</button>
            </div>
            <div
              onClick={handleCommercialClick}
              className={`flex  gap-3 md:hidden max-md:visible ${noIcon ? '' : 'pr-3 pl-[6px] py-2 border border-solid  '}  cursor-pointer  border-searchFilterButtonBorder text-black rounded-full`} >
              <button className={`${
                isCommercialActive ? 'font-bold' : ''
              } `}>{COMMERCIAL}</button>
            </div>
            
            {/* <h3 className={Styles.headTag}>Property Sub Type</h3> */}
            {/* <hr className={`${Styles.underline} `}/> */}
            {/* <div className='flex flex-col '>
                   <FilterButtons
                    name={NEW_PROJECT}
                    newProject={newProject}
                    setNewProject={setNewProject}
                    setIsBuyActive={setIsBuyActive}
                    setIsCommercialActive={setIsCommercialActive}
                    setIsRentActive={setIsRentActive}
                    setIsResidentialActive={setIsResidentialActive}
                    noIcon={noIcon}
                    plotAndLand={plotAndLand}
                  />
                  <FilterButtons
                    name={PLOT_AND_LAND}
                    noIcon={noIcon}
                    plotAndLand={plotAndLand}
                    setPlotAndLand={setPlotAndLand}
                    isBuyActive={isBuyActive}
                    isCommercialActive={isCommercialActive}
                    setIsBuyActive={setIsBuyActive}
                    setIsCommercialActive={setIsCommercialActive}
                    setIsRentActive={setIsRentActive}
                    setIsResidentialActive={setIsResidentialActive}
                    isPlotAndLandActive={isPlotAndLandActive}
                    setIsPlotAndLandActive={setIsPlotAndLandActive}
                  />
                  <FilterButtons
                    name={PG_AND_HOSTELS}
                    noIcon={noIcon}
                    setIsBuyActive={setIsBuyActive}
                    setIsCommercialActive={setIsCommercialActive}
                    setIsRentActive={setIsRentActive}
                    setIsResidentialActive={setIsResidentialActive}
                    pG={pG}
                    setPG={setPG}
                  />
                  <FilterButtons
                    name={VILLA}
                    noIcon={noIcon}  
                    setIsBuyActive={setIsBuyActive}
                    setIsCommercialActive={setIsCommercialActive}
                    setIsRentActive={setIsRentActive}
                    setIsResidentialActive={setIsResidentialActive}
                    villa={villa}
                    setVilla={setVilla}
                  />
                </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SearchDropdown
