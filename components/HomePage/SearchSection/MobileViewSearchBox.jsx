import Image from "next/image";
import magnify from '../../../assets/SearchBoxIcon/magnifyglass.svg';
import GooglePlaceDropdown from "@/pages/register/register-form/components/GooglePlaceDropdown";
import { useState } from "react";
import NearMeSearch from "./NearMe";

const MobileViewSearchBox = ({onSearchButtonClick , updateParentLocation}) => {
  const[locationLatitude ,setLocationLatitude] = useState("")
  const[locationLongitude ,setLocationLongitude] = useState("")
  const[locationName ,setLocationName] = useState("")

  const updateSearchLocation = (city, longitude, latitude) => {
    setLocationName(city);
    setLocationLongitude(longitude);
    setLocationLatitude(latitude);
  };
  return (
    <div className="flex w-full px-4 py-2 h-[50px] justify-between items-center ps-2 bg-transparent rounded-lg ">
      <div className="flex ">
      <NearMeSearch/>
      <GooglePlaceDropdown updateParentLocation={updateParentLocation}/>
      </div>
      <div className="bg-primary flex items-center rounded-lg p-2 ">
        <button onClick={onSearchButtonClick} className=" border-solid border-searchFilterButtonBorder text-white focus:outline-none items-center">
          <Image src={magnify} width={14} height={14} alt='search icon, explore icon' />
        </button>
      </div>
    </div>
  );
}

export default MobileViewSearchBox;
