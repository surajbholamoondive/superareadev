import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./index.module.css";

const LocalityLookUpComponent = ({
  city,
  setLocality,
  locality,
  selected,
  setSelected,
  setModalOpen,
  DATA,
  setDATA,
  cssClass,
  dropdownWidth,
}) => {
  const [searchValue, setSearchValue] = useState(DATA?.locality || "");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (DATA?.locality !== searchValue) {
      setSearchValue(DATA?.locality || '');
      if (DATA?.locality) {
        setLocality(DATA.locality);
        setSelected(true);
      }
    }
  }, [DATA?.locality]);
 
  useEffect(() => {
    handleSuggestions();
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        inputRef.current !== event.target
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setDATA((prev) => ({
      ...prev,
      locality: value
    }));
    setLocality(value);
    setSelected(false);
  };

  const handleSuggestions = async () => {
    try {
      if (selected) {
        return;
      }
      if (searchValue === "") {
        setAutocompleteResults([]);
        setShowDropdown(false);
      } else {
        let searchData = searchValue.replaceAll(",", "");
        const suggestions = await axios.get(
          `/property/dropdown-locality-suggestions?type=${searchData}&city=${city}`
        );
        const resultsWithExtraOption = [
          ...suggestions.data,
          { isExtraOption: true },
        ];
        setAutocompleteResults(resultsWithExtraOption);
        setShowDropdown(true);
      }
    } catch (err) {
      setShowDropdown(false);
    }
  };

  const handleListClick = async (listData) => {
    if (listData.isExtraOption) {
      setModalOpen('locality');
      return;
    }
    
    const localityValue = listData.locality;
    setSelected(true);
    setLocality(localityValue);
    setSearchValue(localityValue);
    setDATA((prev) => ({ ...prev, locality: localityValue }));
    setShowDropdown(false);
  };

  return (
    <div className="my-1 w-full relative">
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        spellCheck="false"
        onChange={handleChange}
        className={`border border-gray-600 rounded-md px-1 py-2 h-[30px] focus:outline-none focus:border-primary ${cssClass}`}
      />
      <div ref={dropdownRef} className="absolute z-[999] bg-white">
        {autocompleteResults.length > 0 && showDropdown && (
          <ul className={`${styles.ulList} ${dropdownWidth}`}>
            {autocompleteResults?.map((result, index) => (
              <li
                key={index}
                className="p-2 py-3 cursor-pointer hover:bg-gray-100"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleListClick(result)}
              >
                {result.isExtraOption ? (
                  <p className="text-primary">Not in the list?</p>
                ) : (
                  <div className="flex justify-between">
                    <p className="pt-1">{result.locality}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LocalityLookUpComponent;