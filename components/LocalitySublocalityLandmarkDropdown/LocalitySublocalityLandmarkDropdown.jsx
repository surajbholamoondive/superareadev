import React, { useState } from "react";
import { GoogleApiWrapper } from "google-maps-react";
 
const GoogleMap = ({
  google,
  Lat,
  Lng
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const onSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim() !== "") {
        const autocompleteService = new google.maps.places.AutocompleteService();

        const cityCenter = new google.maps.LatLng(Lat, Lng); 
        const restriction = {
            latLngBounds: cityCenter.toBounds(50000),
        };

        autocompleteService.getPlacePredictions(
            {
                input: value,
                types: ['establishment'], 
                locationBias: cityCenter,
                locationRestriction: restriction,
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
                  prediction.types.includes("sublocality")||
                  prediction.types.includes("establishment")
                  )
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
    setAutocompleteResults([]);
    fetchPlaceDetails(place.place_id)
      .then((placeResult) => {
        const location = placeResult.geometry.location;
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
        style={{ outline: "none" }}
        onChange={onSearchInputChange}
        placeholder="Search for a location"
        className="pl-4 border border-solid border-gray-200 rounded-md h-[30px] w-full text-xs"
      />
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