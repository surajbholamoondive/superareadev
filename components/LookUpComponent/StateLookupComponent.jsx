import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

const StateLookupComponent = ({
  setState,
  setModalOpen,
  state,
  DATA,
  setDATA,
  cssClass,
  dropdownWidth
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  console.log("StateLookupComponent running agian");
  const stateList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

 // Sync with DATA.state when it changes
  useEffect(() => {
    if (DATA?.state !== searchValue) {
      setSearchValue(DATA?.state || '');
      if (DATA?.state) {
        setState(DATA.state);
        setSelected(true);
      }
    }
  }, [DATA?.state]);


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
    setState(value);
    setDATA((prev) => ({
      ...prev,
      state: value,
    }));
    setShowDropdown(value.length > 0);
    setSelected(false);
  };

  const handleListClick = (listData) => {
    setState(listData);
    setDATA((prev) => ({ ...prev, state: listData }));
    setSearchValue(listData);
    setShowDropdown(false);
    setSelected(true);
  };

  const filteredStates = stateList.filter((stateItem) => 
    stateItem.toLowerCase().includes(searchValue.toLowerCase())
  );

 return (
  <div className={`w-full my-1 relative`}> {/* 👈 make parent relative */}
    <input
      ref={inputRef}
      type="text"
      value={searchValue}
      spellCheck="false"
      onChange={handleChange}
      onFocus={() => {
        if (!selected && searchValue) {
          setShowDropdown(true);
        }
      }}
      className={`border border-gray-600 rounded-md px-1 py-2 h-[30px] focus:outline-none focus:border-primary ${cssClass}`}
    />

    {showDropdown && filteredStates.length > 0 && (
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 z-[9999] bg-white border border-gray-300 shadow-lg mt-1"
      >
        <ul
          className={`${styles.ulList} ${
            dropdownWidth ? dropdownWidth : "w-[300px] max-sm:w-[220px]"
          } max-h-[200px] overflow-y-auto`}
        >
          {filteredStates.map((result, index) => (
            <li
              key={index}
              className="p-2 py-3 cursor-pointer hover:bg-gray-100"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleListClick(result)}
            >
              <div className="flex justify-between">
                <p className="pt-1">{result}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

};

export default StateLookupComponent;