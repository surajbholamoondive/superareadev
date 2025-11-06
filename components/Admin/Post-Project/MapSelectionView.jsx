import React, { useState, useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import CloseIcon from '../../../assets/ButtonIcons/newbackButton.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { COMPONENTS } from '@/textV2';
import exactLocation from '../../../assets/MapToggleIcon/exactLocationNew.svg';

const propertyIcon = L.icon({
  iconUrl: exactLocation.src,
  iconSize: [30, 30],
});

function ResetCenterView({ localityLat, localityLng }) {
  const map = useMap();
  useEffect(() => {
    if (localityLat && localityLng) {
      map.setView(L.latLng(localityLat, localityLng), map.getZoom(), {
        animate: true,
      });
    }
  }, [localityLat, localityLng]);
  return null;
}

const MapSelectionView = ({ onSelectLocation, onClose }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocompleteInput, setAutocompleteInput] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocationDetails, setSelectedLocationDetails] = useState(null);
  const autocompleteServiceRef = useRef(null);
  const geocoderRef = useRef(null);
  const markerRef = useRef(null);
  const { POST_PROJECT_COMPO } = COMPONENTS;
  const { stepOneText } = POST_PROJECT_COMPO;

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_apiGooglePlace,
      libraries: ['places'],
    });
    loader.load().then(() => {
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
      geocoderRef.current = new google.maps.Geocoder();
    });
  }, []);

  const handleAutocompleteInputChange = (e) => {
    const value = e.target.value;
    setAutocompleteInput(value);
    if (value.length > 2 && autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions(
        { input: value, componentRestrictions: { country: 'IN' } },
        (predictions, status) => {
          if (status === 'OK' && predictions) {
            setSuggestions(predictions.map((p) => ({ description: p.description, placeId: p.place_id })));
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (!geocoderRef.current) return;
    geocoderRef.current.geocode({ placeId: suggestion.placeId }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const place = results[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMarkerPosition({ lat, lng });
        const addressInfo = extractAddressInfo(place, lat, lng);
        setSelectedLocationDetails(addressInfo);
        setAutocompleteInput(suggestion.description);
        setSuggestions([]);
      }
    });
  };

  const handleMarkerDragEnd = () => {
    if (!geocoderRef.current || !markerRef.current) return;
    const { lat, lng } = markerRef.current.getLatLng();
    setMarkerPosition({ lat, lng });
    geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const place = results[0];
        const addressInfo = extractAddressInfo(place, lat, lng);
        setSelectedLocationDetails(addressInfo);
        setAutocompleteInput(place.formatted_address);
      }
    });
  };

  const handleConfirmSelection = () => {
    if (!propertyName.trim()) {
      toast.error(stepOneText.projectNameError);
      return;
    }
    if (!selectedLocationDetails) {
      toast.error('Please select a location');
      return;
    }
    onSelectLocation({ ...selectedLocationDetails, projectTitle: propertyName.trim() });
  };

  const extractAddressInfo = (place, lat, lng) => {
    const addressInfo = {
      locality: '',
      sublocality: '',
      city: '',
      state: '',
      latitude: lat,
      longitude: lng,
    };
    let subLocalityAddress = '';
    place.address_components.forEach((component) => {
      const types = component.types;
      if (types.includes('neighborhood')) {
        subLocalityAddress = component.long_name;
      }
      if (types.includes('sublocality')) {
        addressInfo.sublocality = subLocalityAddress ? `${subLocalityAddress}, ${component.long_name}` : component.long_name;
      } else if (types.includes('locality')) {
        addressInfo.locality = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        addressInfo.state = component.long_name;
      }
    });
    return addressInfo;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[10000] rounded-lg">
      <div className="bg-white rounded-lg flex flex-col w-[90%] md:w-[80%] lg:w-[60%] min-w-[300px] max-w-[800px] h-[80vh] overflow-hidden shadow-2xl mx-4 relative">
        <Image src={CloseIcon} width={30} height={30} className="absolute top-2 right-2 cursor-pointer" onClick={onClose} alt="close" />
        <div className="p-4">
          <div className="mb-2">
            <label className="block text-headingColor mb-1">
              Project Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="Enter property name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <label className="block text-headingColor mb-1">
            Search Location
          </label>
          <input
            type="text"
            value={autocompleteInput}
            onChange={handleAutocompleteInputChange}
            placeholder="Search for a location"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {suggestions.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </div>
        <MapContainer
          center={[28.5355, 77.391]}
          zoom={14}
          scrollWheelZoom={false}
          attributionControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=AK89DYLcA2yVQoqxRzD9"
          />
          {markerPosition && (
            <Marker
              position={[markerPosition.lat, markerPosition.lng]}
              icon={propertyIcon}
              draggable={true}
              eventHandlers={{
                dragend: handleMarkerDragEnd,
              }}
              ref={markerRef}
            >
              <Popup>Drag to adjust location</Popup>
            </Marker>
          )}
          <ResetCenterView localityLat={markerPosition?.lat} localityLng={markerPosition?.lng} />
        </MapContainer>
        <div className="p-4">
          <button
            onClick={handleConfirmSelection}
            className={`w-full px-4 py-2 rounded text-white ${propertyName && selectedLocationDetails ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapSelectionView;