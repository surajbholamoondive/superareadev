import React, { useState } from 'react';
import cities from '../../content/JSON/cities';

const CityDropdownForProfile = ({ userData, setCity }) => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleChange = (event) => {
    const fullCityName = event.target.value;
    setSelectedCity(fullCityName);

    setCity({
      ...userData,
      city: fullCityName
    });
  }

  return (
    <div>
      <select id="city-select" className='w-full border py-2 px-2 rounded-md' value={selectedCity} onChange={handleChange}>
        <option value="not selected" defaultValue={'no city selected'} disabled selected>City *</option>
        {cities.map((city) => (
          <option key={city.id} value={`${city.name}, ${city.state}`}>
            {`${city.name}, ${city.state}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdownForProfile;
