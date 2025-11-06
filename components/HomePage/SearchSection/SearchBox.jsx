import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import GooglePlaceDropdown from '@/pages/register/register-form/components/GooglePlaceDropdown'
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2'
import { toast } from 'react-toastify'

import magnify from '../../../assets/SearchBoxIcon/searchGlass.svg'
import { getLogger } from '../../../helper/logger'
import MobileViewSearchBox from './MobileViewSearchBox'
import NearMeSearch from './NearMe'
import Styles from './search.module.css'

const { searchResultRoute } = HOME_PAGE_TEXT.routes
const { searchSection } = HOME_PAGE_TEXT
const { text, possessionStatus, propertyTypes } = GLOBALLY_COMMON_TEXT
const SearchBox = ({
  sell,
  rent,
  residential,
  commercial,
  Industrial,
  Agricultural,
  plotAndLand,
  newProject,
  pG,
  villa,
  propertySubType,
  setPropertySubType,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [budgetValue, setBudgetValue] = useState([])
  const [listClicked, setListClicked] = useState(false)
  const [suggestionType, setSuggestionType] = useState('')
  const logger = getLogger(searchSection.searchBox)
  const [budget, setBudget] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [hidden, sethidden] = useState(true)
  const [city, setCity] = useState('')
  const [locality, setLocality] = useState('')
  const [propertyTitle, setPropertyTitle] = useState('')
  const [searchString, setSearchString] = useState('')
  const [windowWidth, setWindowWidth] = useState(0)
  const router = useRouter()
  const { query } = router
  useEffect(() => {
    const typeMap = {
      commercial: text.commercialText,
      residential: text.residentialText,
      Industrial: text.industrialText,
      Agricultural: text.agriculturalText,
    }

    if (commercial) setPropertyType(typeMap.commercial)
    else if (residential) setPropertyType(typeMap.residential)
    else if (Industrial) setPropertyType(typeMap.Industrial)
    else if (Agricultural) setPropertyType(typeMap.Agricultural)
  }, [commercial, residential, Industrial, Agricultural])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const updateSearchLocation = (
    propertyTitle,
    city,
    locality,
    searchString,
    propertySubType
  ) => {
    updateLocationData(
      propertyTitle,
      city,
      locality,
      searchString,
      propertySubType
    )
  }

  const onSearchButtonClick = () => {
    if (budgetValue[0] > budgetValue[1]) {
      toast.error(searchSection.InputNote)
      return
    }

    const queryParameters = {}
    if (propertyTitle) {
      queryParameters.propertyTitle = propertyTitle
      queryParameters.searchString = propertyTitle 
    }
    if (listClicked) {
      queryParameters.searchSuggestion = 'true' 
      if (suggestionType) {
        queryParameters.searchSuggestionType = suggestionType
      }
    }

    if (locality) {
      queryParameters.locality = locality
    }
    if (city) {
      queryParameters.city = city
    }
    if (budgetValue.length == 2) {
      queryParameters.price = budgetValue.join('-')
    }
    if (searchString !== '' && !propertyTitle) {
      queryParameters.searchString = searchString
    }
    if (sell) {
      queryParameters.propertyStatus = sell
    }
    if (rent) {
      queryParameters.propertyStatus = rent
    }
    if (!listClicked) {
      if (residential) {
        queryParameters.propertyType = residential
      }
      if (commercial) {
        queryParameters.propertyType = commercial
      }
      if (Industrial) {
        queryParameters.propertyType = Industrial
      }
      if (Agricultural) {
        queryParameters.propertyType = Agricultural
      }
      if (plotAndLand) {
        queryParameters.propertyType = ''
        let subTypeValue = ''
        if (pG) {
          if (villa)
            subTypeValue =
              propertyTypes.plotText +
              ',' +
              propertyTypes.commercialLandText +
              ',' +
              propertyTypes.pgText +
              ',' +
              propertyTypes.houseOrVilla
          else
            subTypeValue =
              propertyTypes.plotText +
              ',' +
              propertyTypes.commercialLandText +
              ',' +
              propertyTypes.pgText
        } else {
          subTypeValue =
            propertyTypes.plotText + ',' + propertyTypes.commercialLandText
        }
        queryParameters.propertySubType = subTypeValue
        setPropertySubType(subTypeValue)
      } else if (pG) {
        queryParameters.propertyType = ''
        let subTypeValue = ''
        if (villa) {
          if (plotAndLand)
            subTypeValue =
              propertyTypes.plotText +
              ',' +
              propertyTypes.commercialLandText +
              ',' +
              propertyTypes.pgText +
              ',' +
              propertyTypes.houseOrVilla
          else
            subTypeValue =
              propertyTypes.pgText + ',' + propertyTypes.houseOrVilla
        } else {
          subTypeValue = propertyTypes.pgText
        }
        queryParameters.propertySubType = subTypeValue
        setPropertySubType(subTypeValue)
      } else if (villa) {
        queryParameters.propertyType = ''
        let subTypeValue = ''
        if (pG) {
          if (plotAndLand)
            subTypeValue =
              propertyTypes.plotText +
              ',' +
              propertyTypes.commercialLandText +
              ',' +
              propertyTypes.pgText +
              ',' +
              propertyTypes.houseOrVilla
          else
            subTypeValue =
              propertyTypes.pgText + ',' + propertyTypes.houseOrVilla
        } else {
          subTypeValue = propertyTypes.houseOrVilla
        }
        queryParameters.propertySubType = subTypeValue
        setPropertySubType(subTypeValue)
      }
    }

    if (newProject) {
      queryParameters.possessionStatus = possessionStatus[0]
    }

    logger.info(JSON.stringify(queryParameters), 'queryParams..')

    router.push({
      pathname: searchResultRoute,
      query: queryParameters,
    })
    if (
      !listClicked &&
      !(sell || rent || commercial || residential || newProject || plotAndLand)
    ) {
      queryParameters.status = 'active'
      router.push({
        pathname: searchResultRoute,
        query: queryParameters,
      })
    }
  }
  const updateLocationData = (
    propertyTitle,
    city,
    locality,
    searchString,
    propertySubType,
    isFromSuggestion = false
  ) => {
    setPropertyTitle(propertyTitle)
    setCity(city)
    setLocality(locality)
    setSearchString(searchString)
    setPropertySubType(propertySubType)
    if (isFromSuggestion) {
      setListClicked(true)
      setSuggestionType('property') 
    }
  }
  return (
    <div
      className={`flex  h-18 items-center md:p-3  lg:w-[700px] ${Styles.SearchBox}`}
    >
      <div
        className={`flex ml-2 max-md:hidden max-md:w-full md:rounded-md md:p-2 md:gap-2 md:items-center`}
      >
        <NearMeSearch />
      </div>

      <div className="flex w-[80%] max-md:hidden">
        {!hidden && <div className="bg-red absolute z-50 h-20 w-20"></div>}
        <div
          className={`ml-4 text-[0.875rem] font-normal w-[100%] bg-transparent flex items-center border-2 border-l-primary  border-y-0 border-r-0`}
        >
          <GooglePlaceDropdown
            updateParentLocation={updateSearchLocation}
            sell={sell}
            rent={rent}
            commercial={commercial}
            residential={residential}
            propertySubType={propertySubType}
            pG={pG}
            villa={villa}
            plotAndLand={plotAndLand}
            setListClicked={setListClicked}
            setSuggestionType={setSuggestionType}
          />
        </div>
        <button
          className={`py-2 px-6 ml-36 max-lg:ml-0 max-lg:px-2 max-lg:py-1 mr-2 rounded-3xl border border-primary justify-center  flex`}
          onClick={onSearchButtonClick}
        >
          <Image
            src={magnify}
            width={14}
            height={14}
            alt="search icon, explore icon"
          />
          <p className="text-primary ml-1">{text.searchText}</p>
        </button>
      </div>
      <div className="md:hidden w-full">
        <MobileViewSearchBox
          onSearchButtonClick={onSearchButtonClick}
          updateParentLocation={updateSearchLocation}
        />
      </div>
    </div>
  )
}

export default SearchBox
