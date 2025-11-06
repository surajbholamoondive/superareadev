import React, { useState } from 'react';
import cities from '../../content/JSON/cities.json';
import { setLocalStorageItem } from '@/utils/utils';

const CityDropdown = ({ DATA, setDATA, setCityLongitude, setCityLatitude, citdy, setCity }) => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
    setCity(selectedCityName);

    const selectedCityData = cities.find((city) => city.name === selectedCityName);

    if (selectedCityData) {
      const fullCityName = `${selectedCityName}, ${selectedCityData.state}`;
      setDATA({
        ...DATA,
        city: fullCityName,
        state: selectedCityData.state,
        addressLabel: '',
        locality: '',
      });

      setLocalStorageItem('PROPERTY_DATA', {
        ...DATA,
        city: fullCityName,
        state: selectedCityData.state,
      });

      setCityLatitude(selectedCityData.latitude);
      setCityLongitude(selectedCityData.longitude);
    } else {
      setDATA({
        ...DATA,
        city: selectedCityName,
        state: '',
        addressLabel: '',
        locality: '',
      });

      setLocalStorageItem('PROPERTY_DATA', {
        ...DATA,
        city: selectedCityName,
        state: '',
      });

      setCityLatitude(null);
      setCityLongitude(null);
    }
  };

  return (
    <div className=''>
      <select id="city-select" className='w-full border py-2 px-2 rounded-md focus:outline-[#931602]' value={selectedCity} onChange={handleChange}>
        <option value=""> City *</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;
