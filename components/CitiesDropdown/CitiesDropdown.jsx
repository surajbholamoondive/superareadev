import React, { useState, useEffect, useRef } from "react";
import { GoogleApiWrapper } from "google-maps-react";
 
const GoogleMap = ({ google, updateParentLocation,setDisabled , DATA, setDATA}) => {
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
 
  useEffect(() => {
    if('city' in selectedLocation){
      updateParentLocation(
        selectedLocation.city,
        selectedLocation.longitude,
        selectedLocation.latitude,
        setDATA({
          ...DATA,
          city: selectedLocation.city,
          cityLongitude: selectedLocation.longitude,
          cityLatitude: selectedLocation.latitude,
        })
      );
    }else{
      updateParentLocation(
        selectedLocation.city,
        selectedLocation.longitude,
        selectedLocation.latitude,
        setDATA({
          city: selectedLocation.city,
          cityLongitude: selectedLocation.longitude,
          cityLatitude: selectedLocation.latitude,
          ...DATA,
        })
      );
    }
    setSearchValue(selectedLocation.city);
  }, [selectedLocation,setDATA]);
  useEffect(()=>{
    if(DATA?.city){
      setSearchValue(DATA?.city)
    }
    document.addEventListener('click', handleClickOutside);
 
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[])
  const handleClickOutside = (event) => {
    // console.log('-------------------------->REF',inputRef.current);
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  const onSearchInputChange = (event) => {
    const value = event.target.value;
    if(DATA?.city){
      if(DATA?.city!==value){
        // console.log('----------------------> data.city',DATA?.city);
        // console.log('----------------------> value',value);
        setDisabled(true)
        DATA.city=""
        DATA.locality=""
      }
    }
    setSearchValue(value);
    // console.log('----------------------------->value',value);
    // DATA.city=undefined
    if (value.trim() !== "") {
      const autocompleteService = new google.maps.places.AutocompleteService();
      const request = {
        input: value,
        types: ["(cities)"],
        componentRestrictions: { country: "in" },
      };
      autocompleteService.getPlacePredictions(
        request,
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setAutocompleteResults(predictions);
            setShowDropdown(true);
          } else {
            setAutocompleteResults([]);
            setShowDropdown(false);
          }
        }
      );
    } else {
      setAutocompleteResults([]);
    }
  };
  const onLocationSelect = (place) => {
    // setSearchValue(place.description);
    setAutocompleteResults([]);
    setShowDropdown(false);
    fetchPlaceDetails(place.place_id)
      .then((placeResult) => {
        const location = placeResult.geometry.location;
        setSelectedLocation({
          city: placeResult.name,
          latitude: location.lat(),
          longitude: location.lng(),
        });
        // console.log(placeResult);
        setDisabled(false)
      })
      .catch((error) => {
        console.error(error);
        // setSelectedLocation(null);
      });
  };
  const fetchPlaceDetails = (placeId) => {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = { placeId: placeId }
    return new Promise((resolve, reject) => {
      service.getDetails(request, (placeResult, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(placeResult);
        } else {
          reject(new Error("Error fetching place details"));
        }
      });
    });
  };  
 
  return (
    <div className="relative lg:w-80 ">
      <input
        type="text"
        value={searchValue}
        style={{outline:'none'}}
        onChange={onSearchInputChange}
        placeholder="Search for a location"
        ref={inputRef}
        // onBlur={()=>{setShowDropdown(false)}}
        className="pl-4 border border-solid border-gray-200 rounded-md h-[30px] w-full text-xs"
      />
 
      {showDropdown &&(<div className="absolute z-30 bg-white text-xs"> {autocompleteResults.length > 0 && (
        <ul>
          {autocompleteResults.map((result) => (
            <li
              key={result.place_id}
              onClick={() => onLocationSelect(result)}
              className="border border-primary p-2 cursor-pointer text-xs"
            >
              {result.description}
            </li>
          ))}
        </ul>
      )}
      </div>)}
    </div>
  );
};
 export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_apiGooglePlace,
})(GoogleMap)