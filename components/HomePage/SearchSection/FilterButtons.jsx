import Image from "next/image";
import { useState } from "react";
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from "@/textV2";
const {text,possessionStatus,propertyTypes}=GLOBALLY_COMMON_TEXT
const {newProjectText,pgAndHostel,plotAndLandText}=HOME_PAGE_TEXT.searchSection
const FilterButtons = ({
  name,
  icon,
  setResidential,
  setCommercial,
  activeFilter,
  setActiveFilter,
  plotAndLand,
  setPlotAndLand,
  isBuyActive,
  isCommercialActive,
  setRent,
  setSell,
  setIsBuyActive,
  setIsCommercialActive,
  setIsRentActive,
  setIsResidentialActive,
  newProject,
  setNewProject,
  pG,
  setPG,
  villa,
  setVilla,
  noIcon,
}) => {
  const [active, toggleactive] = useState(true);

  function handleClick(e) {
    e.stopPropagation();
    if (name === text.residentialText) {
      toggleactive(!active);
      setResidential(text.residentialText);
    } else if (name === text.commercialText) {
      toggleactive(!active);
      setCommercial(text.commercialText);
    } else if (name === text.buyText) {
      if (activeFilter !== text.buyText) {
        setActiveFilter(text.buyText);
      } else {
        setActiveFilter("");
      }
    } else if (name === text.capitalizeRentText) {
      if (activeFilter !== text.capitalizeRentText) {
        setActiveFilter(text.capitalizeRentText);
      } else {
        setActiveFilter("");
      }
    } else if (name === plotAndLandText) {
      toggleactive(!active);
      setIsCommercialActive(false);
      setIsBuyActive(false);
      setIsResidentialActive(false);
      setIsRentActive(false);
      setRent('')
      setSell('')
      setResidential('')
      setCommercial('')
      if (active) {
        setPlotAndLand(propertyTypes.plotText);
      } else {
        setPlotAndLand("");
      }
    } else if (name === newProjectText) {
      setIsCommercialActive(false);
      setIsBuyActive(false);
      setIsResidentialActive(false);
      setIsRentActive(false);
      setRent('')
      setSell('')
      setResidential('')
      setCommercial('')
      if (active) {
        setNewProject(possessionStatus[0]);
      } else {
        setNewProject("");
      }
    }
    else if (name === pgAndHostel) {
     
      setIsCommercialActive(false);
      setIsBuyActive(false);
      setIsResidentialActive(false);
      setIsRentActive(false);
      setRent('')
      setSell('')
      setResidential('')
      setCommercial('')
      if (active) {
        setPG(villaText.pgText);
      } else {
        setPG("");
      }
    }
    else if (name === propertyTypes.villaText) {
      setIsCommercialActive(false);
      setIsBuyActive(false);
      setIsResidentialActive(false);
      setIsRentActive(false);
      setRent('')
      setSell('')
      setResidential('')
      setCommercial('')
      if (active) {
        setVilla(propertyTypes.houseOrVilla);
      } else {
        setVilla("");
      }
    }  
    else {
      toggleactive(!active);

    }
  }

  return  (
    <div className="flex" onClick={(e) => { toggleactive(!active); handleClick(e); }}>
      <div
        className={`flex  max-md:gap-3 lg:gap-1 gap-2 ${noIcon ? "" : "py-2 pl-[7px] pr-2 border border-solid  text-white"}  cursor-pointer border-searchFilterButtonBorder rounded-full text-xs ${
          active
            ? noIcon ? "text-gray-700 font-light" : "bg-searchFilterButton backdrop-blur-[0.7px]"
            : noIcon ? "text-primary border border-transparent font-bold":"bg-primary border border-transparent "
        } `}
      >
        {!noIcon && <div
          className="bg-white rounded-full p-[5px] cursor-pointer"
          onClick={() => toggleactive(!active)}
        >
          <Image src={icon} height={25} width={15} alt="icon" />
        </div>}
        <button onClick={() => toggleactive(!active)} className="">
          {name}
        </button>
      </div>
    </div>
  )
};

export default FilterButtons;
