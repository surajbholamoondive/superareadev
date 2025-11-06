import { State } from 'country-state-city';
import StateDropdown from './Commons/StateDropdown'
import CityComponent from './CityComponent';
import { useState } from 'react';

const CountryStateCity = ({ countryCode = 'IN', onCityChange, initialState, initialCity, inlineCSS }) => {
    const [stateCode, setStateCode] = useState(null);
    const [city, setCity] = useState(initialCity || "");
    const [cityLat, setCityLat] = useState("")
    const [cityLng, setCityLng] = useState("")
    const [stateName, setStateName] = useState(initialState || "");

    const { gap, bgcolor } = inlineCSS || {};

    const data = State.getStatesOfCountry(countryCode).map(state => ({
        value: state.name,
        displayValue: `${state.name}`,
        latitude: state.latitude,
        longitude: state.longitude,
        isoCode: state.isoCode
    }));
    return (
        <div className={`flex justify-between max-md:flex-col`}
            style={{
                backgroundColor: bgcolor,
                gap: gap
            }}
        >
            <div className="flex flex-col flex-1 mb-4 justify-start items-start max-w-[48%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    {"State "}
                 </label>
                <StateDropdown options={data} stateCode={stateCode} setStateCode={setStateCode} setCity={setCity} setStateName={setStateName} initialState={initialState} />
            </div>

            <div className="flex flex-col flex-1 mb-4 justify-start items-start max-w-[48%]">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    {"City "}
                </label>
                <CityComponent countryCode={countryCode} code={stateCode} city={city} setCity={setCity} cityLng={cityLng} cityLat={cityLat} setCityLat={setCityLat} setCityLng={setCityLng} onCityChange={onCityChange} stateName={stateName} initialCity={initialCity} />
            </div>
        </div>
    );
};

export default CountryStateCity;
