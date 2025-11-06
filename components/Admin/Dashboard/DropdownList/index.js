import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'
import {
  All_CITIES,
  GET_REQ,
  UNIQUE_CITY_ROUTE,
} from '@/text'

import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'
import { makeApiRequest } from '../../../../utils/utils'

const DropdownList = ({ handleSelectChangeCity, isCityDropdown, handleSelection, leadsPage }) => {
  const logger = getLogger();
  const router = useRouter();
  const daysMapping = {
    "All": 'all',
     Yesterday: '1',
    'Last 7 Days': '7',
    'Last 15 Days': '15',
    'Last 30 Days': '30',
    'Last 90 Days': '90',
    'Last 6 Months': '180',
    'Last 1 Year': '365',
  };

  const { city, days } = router.query;
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(city ? city : All_CITIES);
  const [selectedDays, setSelectedDays] = useState(() => {
    if (days) {
      const displayValue = Object.keys(daysMapping).find(
        key => daysMapping[key] === days
      );
      return displayValue || 'Last 90 Days';
    }
    return 'Last 90 Days';
  });

  const topCities = cityList?.slice(0, 5);
  const sortedCities = cityList?.slice(5).sort();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityResponse = await makeApiRequest(GET_REQ, UNIQUE_CITY_ROUTE);
        const cities = Array.isArray(cityResponse?.data?.result)
          ? cityResponse.data.result
          : [];
        setCityList(cities);
      } catch (error) {
        logger.error('Error fetching city list:', error);
        setCityList([]);
      }
    };
    fetchData();

    if (city) setSelectedCity(city);
    if (days) {
      const displayValue = Object.keys(daysMapping).find(
        key => daysMapping[key] === days
      );
      setSelectedDays(displayValue || 'Last 90 Days');
    }
  }, [router.query]);

  const handleCityChange = (value) => {
    setSelectedCity(value);
    handleSelectChangeCity(value);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, city: value },
    }, undefined, { shallow: true });
  };

  const handleDaysChange = (displayValue) => {
    const queryValue = daysMapping[displayValue];
    setSelectedDays(displayValue);
    handleSelection(queryValue);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, days: queryValue },
    }, undefined, { shallow: true });
  };

  const cities = {
    'All Cities': ['All Cities'],
    'Top Cities': topCities,
    'A-Z': sortedCities,
  };

  const daysDropdown = Object.keys(daysMapping);

  return (
    <>
      {isCityDropdown ? (
        <MDSelectDropdown
          values={cities}
          groupingEnabled={true}
          byDefaultText={selectedCity ? selectedCity : All_CITIES}
          onClick={handleCityChange}
          inlineCSS={{
            width: '160px',
            textAlign: 'left',
            padding: '7.95px',
            borderRadius: '6.5px',
            marginLeft: '6px',
            marginRight: '23px',
            height: '100%',
            dropdownFontSize: '14px',
          }}
        />
      ) : (
        <MDSelectDropdown
          values={daysDropdown}
          groupingEnabled={false}
          byDefaultText={selectedDays ? selectedDays : 'Last 90 Days'}
          onClick={handleDaysChange}
          icon="https://cdn-icons-png.flaticon.com/256/60/60995.png"  
          inlineCSS={{
            width: '160px',
            textAlign: 'left',
            padding: '7.95px',
            borderRadius: '6.5px',
            marginLeft: '6px',
            marginRight: '23px',
            height: '100%',
            dropdownFontSize: '14px',
          }}
        />
      )}
    </>
  );
};


export default DropdownList
