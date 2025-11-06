import React, { useEffect, useRef, useState } from 'react'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import axios from 'axios'

import styles from './index.module.css'

const PropertyLookUpComponent = ({
  city,
  setState,
  setPropertyTitle,
  propertyTitle,
  setLocality,
  setLocalitySelected,
  setModalOpen,
  setSelectDropdown,
  DATA,
  setDATA,
  cssClass,
}) => {
  const [searchValue, setSearchValue] = useState(DATA?.propertyTitle || '')
  const [autocompleteResults, setAutocompleteResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)
    const PROPERTY_TITLE = DATA?.propertyTitle
  const [isItemSelected, setIsItemSelected] = useState(false)
  const selectionTimeoutRef = useRef(null)

  useEffect(() => {
    handleSuggestions()
  }, [searchValue])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current !== event.target
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    setPropertyTitle(value)
    setDATA((prev) => ({
      ...prev,
      propertyTitle: value,
    }))
    setIsItemSelected(false)
  }

  const handleSuggestions = async () => {
    try {
      if (!searchValue) {
        setAutocompleteResults([])
        setShowDropdown(false)
        return
      }
      const searchData = searchValue.replaceAll(',', '')
      const suggestions = await axios.get(
        `/property/dropdown-property-suggestions?type=${searchData}&city=${DATA?.city}`
      )
      const resultsWithExtraOption = [
        ...suggestions.data,
        { isExtraOption: true },
      ]
      if (isItemSelected) {
        return
      }
      setAutocompleteResults(resultsWithExtraOption)
      setShowDropdown(true)
    } catch (err) {
      setShowDropdown(false)
    }
  }

  const handleListClick = async (listData) => {
    setShowDropdown(false)
    setIsItemSelected(true)

    // Clear any existing timeout
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current)
    }

    if (setSelectDropdown) {
      setSelectDropdown(true)
    }
    
    if (listData.isExtraOption) {
      setModalOpen('property')
    } else {
      const projectData = listData?.project
      setPropertyTitle(projectData?.projectTitle)
      setSearchValue(projectData?.projectTitle)
      setDATA((prevDATA) => ({
        ...prevDATA,
        propertyTitle: projectData?.projectTitle,
        locality: projectData?.locality,
        city: projectData?.city,
        builtDate: projectData?.builtDate,
        latitude: projectData?.latitude,
        longitude: projectData?.longitude,
        amenities: projectData?.amenities,
        projectCoverImage: projectData?.projectCoverImage,
        state: projectData?.state,
        reraNumber: projectData?.projectReraDetails?.[0]?.projectReraId,
      }))
      setLocality(projectData?.locality)
      setState(projectData?.state)
      setLocalitySelected(true)

      // Keep isItemSelected true for longer
      selectionTimeoutRef.current = setTimeout(() => {
        setIsItemSelected(false)
      }, 500)
    }
  }

  const handleBlur = () => {
    setShowDropdown(false)
    setTimeout(() => {
      if (!isItemSelected && searchValue && !DATA?.latitude) {
        // Only clear if no valid property was selected
        setSearchValue('')
        setPropertyTitle('')
        setDATA((prev) => ({
          ...prev,
          propertyTitle: '',
        }))
      }
    }, 300)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="my-1 w-full relative">
      <input
        type="text"
        ref={inputRef}
        value={searchValue || PROPERTY_TITLE}
        style={{ outline: 'none' }}
        onChange={handleChange}
        onBlur={handleBlur}
        spellCheck="false"
        className={`border border-gray-600 rounded-md px-1 py-2 h-[30px] focus:outline-none focus:border-primary w-[240px] ${cssClass}`}
      />
      {autocompleteResults.length > 0 && showDropdown && (
        <div ref={dropdownRef} className="absolute z-[9999] bg-white">
          <ul className={`${styles.ulList} w-[240px] max-sm:w-[220px]`}>
            {autocompleteResults.map((result, index) => (
              <li
                key={index}
                           className="p-2 py-3 cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleListClick(result)}
              >
                {result?.isExtraOption ? (
                  <p className="text-primary">
                    {GLOBALLY_COMMON_TEXT.text.notInTheList}
                  </p>
                ) : (
                  result?.project?.projectTitle && (
                    <p>
                      {result?.project?.projectTitle},{' '}
                      {result?.project?.locality},{result?.project?.city}
                    </p>
                  )
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PropertyLookUpComponent