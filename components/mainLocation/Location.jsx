import { useState } from "react";
import CitiesDropdown from "../CitiesDropdown/CitiesDropdown";
import LocalitiesInACityDropDown from "../LocalitiesInACityGoogleDropdown/LocalitiesInACityDropDown";
import styles from "./Location.module.css";
const Location = ({ DATA, setDATA, close, setClose }) => {
  const [city, setCity] = useState("");
  const [cityLongitude, setCityLongitude] = useState("");
  const [cityLatitude, setCityLatitude] = useState("");
 
  const [locality, setLocality] = useState("");
  const [localityLongitude, setLocalityLongitude] = useState("");
  const [localityLatitude, setLocalityLatitude] = useState("");
 
  const [disabled, setDisabled] = useState(true);
 
  const updateCityLocation = (city, longitude, latitude) => {
    setCity(city);
    setCityLongitude(longitude);
    setCityLatitude(latitude);
  };
 
  const updateLocalityLocation = (locality, longitude, latitude) => {
    setLocality(locality);
    setLocalityLongitude(longitude);
    setLocalityLatitude(latitude);
    let check = DATA?.locality == undefined &&  DATA?.localityLongitude == undefined && DATA?.localityLatitude == undefined
    if (!check) {
        setClose(false)
    }
    // setClose(false)
  };
  return (
    <div className="lg:flex md:flex sm:flex justify-start gap-3">
      <div className="mt-4">
        <label className={`${styles.property_label} text-[13px]`}>
          Property Location/City
        </label>
        <CitiesDropdown
          updateParentLocation={updateCityLocation}
          type="text"
          name="city"
          className="w-full px-4 py-2 focus:outline-none focus:border-primary"
          onSelect={(e) => {
            onChange("city", e.target.value);
          }}
          placeholder="Select City"
          setDisabled={setDisabled}
          DATA={DATA}
          setDATA={setDATA}
        />
      </div>
 
      <div className="mt-4">
        <label className={`${styles.property_label} text-[13px]`}>Locality</label>
        <LocalitiesInACityDropDown
          updateParentLocation={updateLocalityLocation}
          long={cityLongitude}
          lat={cityLatitude}
          setClose={setClose}
          close={close}
          selectedCity={DATA?.city}
          disabled={disabled}
          setDisabled={setDisabled}
          type="text"
          name="locality"
          onSelect={(e) => {
            onChange("locality", e.target.value);
          }}
          DATA={DATA}
          setDATA={setDATA}
        />
      </div>
    </div>
  );
};
export default Location;