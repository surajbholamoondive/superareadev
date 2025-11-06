import React, { useEffect, useState } from 'react'
import { GLOBALLY_COMMON_TEXT, REGISTERATION_TEXT } from '@/textV2'
import { makeApiRequest, numberFormatter } from '@/utils/utils'

import styles from './index.module.css'

const { propertyTypes } = GLOBALLY_COMMON_TEXT
const { projectText, propertiesText, projectsText } = GLOBALLY_COMMON_TEXT.text
const { text, routes } = REGISTERATION_TEXT

const GoogleMap = ({
  updateParentLocation,
  sell,
  rent,
  commercial,
  residential,
  plotAndLand,
  pG,
  villa,
  setListClicked,
  setSuggestionType,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [debounceValue, setDebounceValue] = useState('')
  const [autocompleteResults, setAutocompleteResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selected, setSelected] = useState(false)
  const [propertyType, setPropertyType] = useState('')
  const [propertyStatus, setPropertyStatus] = useState('')
  const [propertySubTypes, SetPropertySubTypes] = useState('')

  useEffect(() => {
    if (residential) {
      setPropertyType(residential)
    } else if (commercial) {
      setPropertyType(commercial)
    } else {
      setPropertyType('')
    }

    if (sell) {
      setPropertyStatus(sell)
    } else if (rent) {
      setPropertyStatus(rent)
    } else {
      setPropertyStatus('')
    }
  }, [residential, commercial, sell, rent])

  useEffect(() => {
    let subTypes = []
    if (plotAndLand) {
      subTypes.push(propertyTypes.plotText)
      subTypes.push(propertyTypes.commercialLandText)
    }
    if (pG) {
      subTypes.push(propertyTypes.pgText)
    }
    if (villa) {
      subTypes.push(propertyTypes.houseOrVilla)
    }
    const subTypeValue = subTypes.join(',')
    SetPropertySubTypes(subTypeValue)
  }, [plotAndLand, pG, villa])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchValue)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchValue])

  useEffect(() => {
    if (debounceValue.length < 2) {
      return
    }
    handleSuggestions()
    setSelected(false)
  }, [debounceValue])

  const handleSuggestions = async () => {
    try {
      if (selected) {
        setShowDropdown(false)
        return
      }

      updateParentLocation('', '', '', debounceValue)

      if (debounceValue.length === 0) {
        setAutocompleteResults([])
        setShowDropdown(false)
        return
      }
      let searchData = debounceValue.replaceAll(',', '')
      const params = new URLSearchParams()
      params.append('type', searchData)

      if (propertyType && propertyType.trim()) {
        params.append('propertyType', propertyType)
      }
      if (propertySubTypes && propertySubTypes.trim()) {
        params.append('propertySubType', propertySubTypes)
      }
      if (propertyStatus && propertyStatus.trim()) {
        params.append('propertyStatus', propertyStatus)
      }

      const apiUrl = `${routes.propertySuggestionRoute}?${params.toString()}`
      let response
      try {
        response = await makeApiRequest(
          process.env.NEXT_PUBLIC_GET_METHOD,
          apiUrl
        )
      } catch (apiError) {
        setAutocompleteResults([
          {
            error: true,
            message: `Server error: ${apiError.response?.status || 'Unknown'}`,
            details: apiError.response?.data?.message || apiError.message,
          },
        ])
        setShowDropdown(true)
        return
      }

      if (!response) {
        setShowDropdown(false)
        return
      }
      let data = null
      if (response.data) {
        data = response.data
      } else if (response.result) {
        data = response.result
      } else if (Array.isArray(response)) {
        data = response
      } else if (response.properties || response.projects) {
        data = response
      } else {
        data = response
      }
      setAutocompleteResults(data || [])
      const hasProperties =
        data?.properties &&
        Array.isArray(data.properties) &&
        data.properties.length > 0
      const hasProjects =
        data?.projects &&
        Array.isArray(data.projects) &&
        data.projects.length > 0
      const hasCityResults =
        Array.isArray(data) && data.length > 0 && data[0]?.city
      if (hasProperties || hasProjects || hasCityResults) {
        setShowDropdown(true)
      } else {
        setShowDropdown(false)
      }
    } catch (err) {
      setShowDropdown(false)
      setAutocompleteResults([])
    }
  }

  /**
   * @param {object} property
   * @param {string} city
   */
  const handleListClick = async (property, city) => {
    setShowDropdown(false)
    setSelected(true)
    setListClicked(true)
    let value = ''
    let suggestionTypeToSet = 'city' 

    if (property?.propertyTitle) {
      value = `${property.propertyTitle}, ${property.locality}, ${property.city}`
      suggestionTypeToSet = 'property' 
    } else if (property?.projectTitle) {
      value = property.projectTitle
      suggestionTypeToSet = 'project' 
    } else {
      value = city
      suggestionTypeToSet = 'city'
    }

    setSuggestionType(suggestionTypeToSet)
    setSearchValue(value)
    await updateParentLocation(
      property?.propertyTitle || property?.projectTitle || '',
      property?.city || city,
      property?.locality || '',
      value, 
      property?.propertySubType || ''
    )
  }

  return (
    <div className="relative lg:w-80 ">
      <input
        type="text"
        value={searchValue}
        style={{ outline: 'none' }}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter Location, Property and City"
        spellCheck="false"
        className={`relative bg-transparent placeholder:text-primary p-4 md:px-2 lg:rounded-lg md:border-lg h-[30px] max-md:-ml-8 max-md:w-[250px] md:w-[280px] lg:w-[400px] text-[0.875rem] font-normal flex max-[375px]:w-[200px] max-[375px]:text-[0.7rem]`}
      />
      {showDropdown && searchValue && (
        <div
          className={`${styles.suggestionBox} absolute z-[100] -left-10 max-md:-left-14 mt-5 max-md:mt-3 max-md:w-[400px] md:w-[590px] lg:w-[610px] text-[0.875rem] font-normal px-2 bg-red-600 shadow-lg border rounded-lg max-h-60 overflow-y-auto`}
        >
          <ul className={styles.ulList}>
            {Array.isArray(autocompleteResults) &&
              autocompleteResults[0]?.error && (
                <li className="p-3 bg-red-50 border border-red-200 rounded">
                  <div className="text-red-700 font-medium">
                    {autocompleteResults[0].message}
                  </div>
                  <div className="text-red-600 text-xs mt-1">
                    {autocompleteResults[0].details}
                  </div>
                </li>
              )}
            {(!autocompleteResults ||
              (Array.isArray(autocompleteResults) &&
                autocompleteResults.length === 0) ||
              (!Array.isArray(autocompleteResults) &&
                !autocompleteResults.properties &&
                !autocompleteResults.projects)) &&
              !autocompleteResults?.[0]?.error && (
                <li className="p-2 py-3 text-gray-500">
                  No suggestions found for "{searchValue}"
                </li>
              )}
            {Array.isArray(autocompleteResults) &&
              autocompleteResults.length > 0 &&
              autocompleteResults[0]?.city && (
                <>
                  <li className="p-2 py-1 font-semibold text-gray-600 bg-gray-50">
                    Cities
                  </li>
                  {autocompleteResults.map(({ city, _id, count }, index) => (
                    <li
                      key={`city-${_id || index}`}
                      className="p-2 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
                      onClick={() => handleListClick(_id, city)}
                    >
                      <div className="flex justify-between">
                        <p className="pt-1">{city}</p>
                        <p className={styles.suggestionCount}>
                          {numberFormatter(count)} Properties
                        </p>
                      </div>
                    </li>
                  ))}
                </>
              )}
            {autocompleteResults?.properties &&
              autocompleteResults.properties.length > 0 && (
                <>
                  <li className="p-2 py-1 font-semibold text-gray-600 bg-gray-50">
                    Properties
                  </li>
                  {autocompleteResults.properties.map((item, index) => (
                    <li
                      key={`property-${index}`}
                      className="p-2 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
                      onClick={() => handleListClick(item._id, item.city)}
                    >
                      {item._id?.propertyTitle ? (
                        <div className="flex justify-between">
                          <p className="pt-1 w-[70%]">
                            {item._id.propertyTitle}, {item._id.locality},{' '}
                            {item._id.city}
                          </p>
                          <p className={styles.suggestionCount}>
                            {numberFormatter(item.count)}{' '}
                            {item.count === 1
                              ? text.propertyText
                              : propertiesText}
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <p className="pt-1">{item.city}</p>
                          <p className={styles.suggestionCount}>
                            {numberFormatter(item.count)}{' '}
                            {item.count === 1
                              ? text.propertyText
                              : propertiesText}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </>
              )}
            {autocompleteResults?.projects &&
              autocompleteResults.projects.length > 0 && (
                <>
                  <li className="p-2 py-1 font-semibold text-gray-600 bg-gray-50">
                    Projects
                  </li>
                  {autocompleteResults.projects.map((item, index) => (
                    <li
                      key={`project-${index}`}
                      className="p-2 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100"
                      onClick={() => handleListClick(item._id, item.city)}
                    >
                      {item._id?.projectTitle ? (
                        <div className="flex justify-between">
                          <p className="pt-1">{item._id.projectTitle}</p>
                          <p className={styles.suggestionCountProjects}>
                            {numberFormatter(item.count)}{' '}
                            {item.count === 1 ? projectText : text.projectsText}
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <p className="pt-1">{item.city}</p>
                          <p className={styles.suggestionCount}>
                            {numberFormatter(item.count)}{' '}
                            {item.count === 1
                              ? text.propertyText
                              : propertiesText}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </>
              )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default GoogleMap
