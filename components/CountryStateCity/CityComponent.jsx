import { City } from 'country-state-city';
import { useEffect } from 'react';
import Dropdown from './Commons/Dropdown'

const CityComponent = ({ countryCode, code, city, setCity, setCityLat, setCityLng,onCityChange,stateName,initialCity }) => {
    const data = City.getCitiesOfState(countryCode, code).map(city => ({
        value: city.name,
        displayValue: city.name,
        latitude: city.latitude,
        longitude: city.longitude
    }));
    useEffect(() => {
        if (initialCity) {
          setCity(initialCity);
        }
      }, [initialCity]);

    const isDisabled = !code;

    const handleCitySelect = (e) => {
        const selectedCityName = e.target.value;
        setCity(selectedCityName);
        onCityChange(selectedCityName,stateName)
        const selectedCity = data.find(c => c.value === selectedCityName);
        if (selectedCity) {
            setCityLat(selectedCity.latitude);
            setCityLng(selectedCity.longitude);
        } else {
            setCityLat("");
            setCityLng("");
        }
    };

    return (
        <Dropdown options={data} disabled={isDisabled} value={city} onChange={handleCitySelect} />
    );
};

export default CityComponent;

