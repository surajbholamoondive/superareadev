import React, { useEffect, useState,useRef } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import NearByPlacesForMScore from "@/utils/NearbyPlacesForM-score/NearbyPlacesForMScore.jsx";
 
const GoogleMap = ({
  google,
  updateParentLocation,
  lat,
  long,
  selectedCity,
  disabled,
  setDisabled,
  DATA,
  setDATA,
  setDbl,
  disb,
  setClose,
  close
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if('city' in selectedLocation){
      updateParentLocation(
        setSelectedLocation.city,
        selectedLocation.longitude,
        selectedLocation.latitude
      );
      setDATA({
        ...DATA,
        locality: selectedLocation.city,
        localityLongitude: selectedLocation.longitude,
        localityLatitude: selectedLocation.latitude,
      });
    }else{
      updateParentLocation(
        setSelectedLocation.city,
        selectedLocation.longitude,
        selectedLocation.latitude
      );
      setDATA({
        locality: selectedLocation.city,
        localityLongitude: selectedLocation.longitude,
        localityLatitude: selectedLocation.latitude,
        ...DATA,
      });
    }
    setSearchValue(selectedLocation.city);
    // console.log('selected location -------------------------',selectedLocation)
  }, [selectedLocation, setDATA]);
 
  useEffect(()=>{
    if(DATA?.locality){
      setSearchValue(DATA?.locality)
      setDisabled(false)
    }
    document.addEventListener('click', handleClickOutside);
 
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[])
  useEffect(()=>{
    // console.log('log log log');
    // console.log('--------------- disabled',disabled);
    if(disabled && !(DATA?.locality && DATA?.locality.length>0)){
      // console.log('--------------------------->>>> BYEEEE');
      setSearchValue("")
      setDATA({...DATA , locality:""})
      setClose(true)
    }
  },[disabled])
 
  const handleClickOutside = (event) => {
    // console.log('-------------------------->REF',inputRef.current);
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  const onSearchInputChange = (event) => {
    const value = event.target.value;
    if(DATA?.locality){
      if(DATA?.locality!==value ){
        setClose(true)
      }
    }
    setSearchValue(value);
 
    if (value.trim() !== "") {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input: value,
          types: ["geocode"],
          componentRestrictions: { country: "in" },
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const filteredPredictions = predictions.filter((prediction) => {
              return (
                prediction.description
                  .toLowerCase()
                  .includes(selectedCity?.toLowerCase()) &&
                (prediction.types.includes("locality") ||
                  prediction.types.includes("sublocality"))
              );
            });
            setAutocompleteResults(filteredPredictions);
            setShowDropdown(true);
          } else {
            setAutocompleteResults([]);
            setShowDropdown(false)
          }
        }
      );
    } else {
      setAutocompleteResults([]);
    }
  };
 
  const onLocationSelect = (place) => {
    setSearchValue(place.description);
    // setClose(false);
    // console.log('-------------------------- close in locality dropdown  --------------------',close)
    setAutocompleteResults([]);
    fetchPlaceDetails(place.place_id)
      .then((placeResult) => {
        const location = placeResult.geometry.location;
        setSelectedLocation({
          city: placeResult.name,
          latitude: location.lat(),
          longitude: location.lng(),
        });
        setDATA({
          ...DATA,
          locality: placeResult.name,
          localityLongitude: location.lng(),
          localityLatitude: location.lat(),
          completeAddress: placeResult.formatted_address,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const fetchPlaceDetails = (placeId) => {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = { placeId: placeId };
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
    <div className="relative lg:w-80">
      <input
        id="localitySelect"
        type="text"
        value={searchValue}
        disabled={disabled}
        style={{ outline: "none" }}
        ref={inputRef}
        // onBlur={()=>{setShowDropdown(false)}}
        onChange={onSearchInputChange}
        placeholder="Search for a location"
        className="pl-4 border border-solid border-gray-200 rounded-md h-[30px] w-full text-xs"
      />
      <NearByPlacesForMScore latitude={selectedLocation.latitude} longitude={selectedLocation.longitude}/>
     {showDropdown && (<div className="absolute z-30 bg-white">
        {autocompleteResults.length > 0 && (
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
})(GoogleMap);