import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './index.module.css'; // Adjust path as needed

const DeveloperLookUpComponent = ({
  developerDetail,
  setDeveloperDetail,
  cssClass,
  dropdownWidth,
  setDeveloperRating,
  projectData,
  setProjectData,
}) => {


  const [searchValue, setSearchValue] = useState(developerDetail?.developerName || '');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
  if (developerDetail?.developerName) {
    setSearchValue(developerDetail.developerName);
  }
}, [developerDetail?.developerName]);

  const handleChange = (e) => {
    e.preventDefault();
    handleSuggestions();
    setSearchValue(e.target.value);
    setDeveloperDetail({
      ...developerDetail,
      developerName: e.target.value
    })
    setProjectData({
      ...projectData,
      developerDetail: {
        ...projectData.developerDetail,
        developerName: e.target.value
      }
    });
  };

  const handleSuggestions = async () => {
    try {
      if (searchValue === '') {
        setAutocompleteResults([]);
        setShowDropdown(false);
      } else {
        let searchData = searchValue.replaceAll(',', '');
        const suggestions = await axios.put(
          `/project/developer-lookup-suggestions?type=${searchData}`
        );
        setAutocompleteResults(suggestions?.data);
        setShowDropdown(true);
      }
    } catch (err) {
      setShowDropdown(false);
    }
  };

  const handleListClick = (listData) => {
    setDeveloperDetail(listData);
    setDeveloperRating(listData.developerRating)
    setSearchValue(listData.developerName || '');
    setShowDropdown(false);
    setProjectData({
      ...projectData,
      developerDetail: listData
    })
  };
  return (
    <div className="w-full relative">
      <input
        type="text"
        value={searchValue}
        spellCheck="false"
        placeholder='e.g. Gulshan'
        onChange={handleChange}
        className={`border border-gray-600 text-[13px] rounded-md px-1 py-2 h-[30px] mt-1 focus:outline-none focus:border-primary ${cssClass}`}
      />
      <div ref={dropdownRef} className="absolute z-[999] bg-white">
        {autocompleteResults.length > 0 && showDropdown && (
          <ul className={`${styles.ulList} ${dropdownWidth}`}>
            {autocompleteResults.map((result, index) => (
              <li
                key={index}
                className="p-2 py-3 cursor-pointer"
                onClick={() => handleListClick(result)}
              >
                {result.developerName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeveloperLookUpComponent;
