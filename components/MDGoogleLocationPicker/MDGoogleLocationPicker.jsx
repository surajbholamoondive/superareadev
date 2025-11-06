import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Styles from './index.module.css';
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2';
import ManualProjectName from '../Admin/Post-Project/ManualProjectName';
const { comma } = GLOBALLY_COMMON_TEXT.symbols

const MDGoogleLocationPicker = ({ apiKey, DATA, setDATA, inlineStyles, dropdownCss, isProject, setSelectDropdown, setLocality, setPropertyTitle }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const [isNotInList, setIsNotInList] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const geocoderRef = useRef(null);
  const { POST_PROJECT_COMPO } = COMPONENTS
  const { stepOneText } = POST_PROJECT_COMPO

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_apiGooglePlace,
      libraries: ['places'],
    });

    loader.load().then(() => {
      geocoderRef.current = new google.maps.Geocoder();
    });
  }, [apiKey]);

  useEffect(() => {
    setInputValue(DATA?.projectTitle)
    if(setSelectDropdown){
      setSelectDropdown(true)
    }
  }, [DATA?.projectTitle])
  useEffect(() => {
    if (inputValue && inputValue.length > 2 && !selectedPlace && inputValue !== DATA?.projectTitle) {
      fetchSuggestions(inputValue);
      setIsNotInList(true);
    } else {
      setSuggestions([]);
      setIsNotInList(false);
    }
  }, [inputValue, selectedPlace, DATA?.projectTitle]);

  const fetchSuggestions = (input) => {
    if (!geocoderRef.current || input.length <= 2) {
      setSuggestions([]);
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input, componentRestrictions: { country: 'IN' } }, (predictions, status) => {
      if (status === 'OK' && predictions) {
        setSuggestions(predictions.map((p) => p.description));
        setPlaceId(predictions.map((p) => p.place_id))
      } else {
        setSuggestions([]);
      }
    });
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if(setPropertyTitle){
      setPropertyTitle(e.target.value)
    }
    if (value.length > 2) {
      fetchSuggestions(value);
      setIsNotInList(true);
    } else {
      setSuggestions([]);
      setIsNotInList(false);
    }
    if (setSelectDropdown) {
      setSelectDropdown(false)
    }
    setSelectedPlace('');
  };

  const handleSuggestionSelect = (suggestion, index) => {
    setInputValue(suggestion)
    setSelectedPlace(suggestion);
    setSuggestions([])
    setIsNotInList(false);

    if (setSelectDropdown) {
      setSelectDropdown(true)
    }
    geocoderRef.current.geocode({ placeId: placeId[index] }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const place = results[0];
        const addressInfo = {
          locality: '',
          sublocality: '',
          city: '',
          state: '',
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        };
        var subLocalityAddress = ''
        place.address_components.forEach((component) => {
          const types = component.types;
          if (types.includes('neighborhood')) {
            subLocalityAddress = component.long_name;
          }
          if (types.includes('sublocality')) {
            if (subLocalityAddress) {
              addressInfo.sublocality = subLocalityAddress + comma + component.long_name;
            } else {
              addressInfo.sublocality = component.long_name;
            }
          } else if (types.includes('locality')) {
            addressInfo.locality = component.long_name;
          }
          else if (types.includes('administrative_area_level_1')) {
            addressInfo.state = component.long_name;
          }
        });
        const projectName = suggestion.split(',')[0].trim();
        const propertyName = suggestion.split(',')[0].trim()
        if(setPropertyTitle){
          setPropertyTitle(propertyName)
        }
        setInputValue(projectName)
        if (setLocality) {
          setLocality(addressInfo.sublocality)
        }
          if (isProject){
            setDATA({
              ...DATA,
              locality: addressInfo.sublocality,
              city: addressInfo.locality,
              state: addressInfo.state,
              coordinates: [addressInfo.latitude, addressInfo.longitude],
              projectTitle: projectName,
            })
          }
          else{
              setDATA({
              ...DATA,
              locality: addressInfo.sublocality,
              sublocality: addressInfo.sublocality,
              state: addressInfo.state,
              city: addressInfo.locality,
              latitude: addressInfo.latitude,
              longitude: addressInfo.longitude,
              propertyTitle: propertyName,
              builtDate: "",
              amenities: {},
              totalFloors: "",
            })
          }
        setSelectedPlaceDetails(addressInfo);
        setSuggestions([]);
        return
      } else {
        setSelectedPlaceDetails(null);
      }
    });
  };


  const handleClosModal = () => {
    setShowModal(false)
  }

  const handleNotInListClick = () => {
    setShowModal(true);
    setSuggestions([]);
    setIsNotInList(false);
  }

  const shouldShowNotInList = () => {
    return inputValue?.length > 2 && !selectedPlace;
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        className={inlineStyles ? inlineStyles : `w-full z-0 focus:outline-[#931602]`}
        onChange={handleInputChange}
      />
      {(suggestions.length > 0 || shouldShowNotInList()) && !selectedPlace && (
        <ul className={`${Styles.ulList} ${suggestions.length > 0 && dropdownCss}`}>
          {suggestions.length === 0 && shouldShowNotInList() && isNotInList && (
            <li onClick={handleNotInListClick} className='py-1 px-1 font-semibold hover:bg-gray-100'>
              {stepOneText.notInTheList}
            </li>
          )}
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionSelect(suggestion, index)} className='py-1 px-1 '>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <ManualProjectName
        inputValue={inputValue}
        setSelectDropdown={setSelectDropdown}
        projectData={DATA}
        setProjectData={setDATA}
        isOpen={showModal}
        onClose={handleClosModal}
        isNotInList={isNotInList}
        setIsNotInList={setIsNotInList}
      />
    </div>
  );
};

export default MDGoogleLocationPicker