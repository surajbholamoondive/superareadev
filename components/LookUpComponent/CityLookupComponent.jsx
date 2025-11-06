import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./index.module.css";
import { GLOBALLY_COMMON_TEXT } from "@/textV2";
const{notInTheList}=GLOBALLY_COMMON_TEXT.text

const CityLookUpComponent = ({
  setCity,
  setModalOpen,
  city,
  DATA,
  setDATA,
  setLocality,
  setPropertyTitle,
  cssClass,
  dropdownWidth
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(false);
  const dropdownRef = useRef(null);
  const CITY = DATA?.city

  useEffect(() => {
    handleSuggestions();
    setSelected(false);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    setCity(e.target.value);
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
        let searchData = await searchValue.replaceAll(",", "");
        const suggestions = await axios.get(
          `/property/dropdown-city-suggestions?type=${searchData}`
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

  /**
   *
   * @param {object} listData
   */
  const handleListClick = async (listData) => {
    if (listData.isExtraOption) {
      setModalOpen("city");
    }
    setCity(listData.city);
    setDATA({...DATA, city: listData.city})
    setSearchValue(listData.city);
    setShowDropdown(false);
    setSelected(true);
  };
  return (
    <div className="my-1 w-full">
      <input
        type="text"
        value={city ? city : CITY}
        spellCheck="false"
        onChange={(e) => {
          setCity(e.target.value);
          setDATA({
            ...DATA,
            city: e.target.value,
          });
          setSearchValue(e.target.value);
        }}
        className={`border border-gray-600 rounded-md px-1 py-2 h-[30px] focus:outline-none focus:border-primary ${cssClass}`}
      />
      <div ref={dropdownRef} className="absolute z-[9999] bg-white">
        {autocompleteResults.length > 0 && showDropdown && (
          <ul className={`${styles.ulList} ${dropdownWidth ? dropdownWidth : 'w-[240px] max-sm:w-[220px] '}`}>
            {autocompleteResults.map((result, index) => (
              <li
                key={index}
                className="p-2 py-3 cursor-pointerl "
                onClick={() => handleListClick(result)}
              >
                {result.isExtraOption ? (
                  <p className="text-primary">{notInTheList}</p>
                ) : (
                  result.city && (
                    <div className="flex justify-between">
                      <p className="pt-1">{result.city}</p>
                    </div>
                  )
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CityLookUpComponent;
