import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  AREA_KEYS_DECRESING_ORDERS,
  AREA_KEYS_INCREASING_ORDERS,
  PROPERTY_SIZE_UNIT_MAP,
} from '@/text'
import { GLOBALLY_COMMON_TEXT, OTHER_PAGES_TEXT } from '@/textV2'
import axios from 'axios'
import bcrypt from 'bcryptjs'

import RecButton from '../assets/ButtonIcons/recButton.svg'
import checkIcon from '../assets/userDashboard/Check_ring_light.svg'
import style from '../components/Admin/my-m-associates/index.module.css'
import { getLogger } from '../helper/logger'

const logger = getLogger()
/**
 *
 * @param {number} price
 * @returns
 */
const {
  numericText,
  longText,
  enUsText,
  smallAm,
  lastOneYear,
  uppercaseAm,
  atText,
  uppercasePm,
  smallPm,
  last30Days,
  last15Days,
  last7Days,
  yesterdayText,
  last90Days,
  otpVerified,
} = OTHER_PAGES_TEXT.wishlisted
const { allAvailableFacilities, decresingOrder, increasingOrder } =
  OTHER_PAGES_TEXT
const { symbols, text, propertySizeUnitMap, monthNameMap } =
  GLOBALLY_COMMON_TEXT
export const numberFormatter = (
  number,
  currencyCode = 'INR',
  currencyCountry = 'en-IN'
) => {
  if (number === '') {
    return ''
  }

  // Check if the number has decimals
  const hasDecimals = number % 1 !== 0

  let formatter

  // If isDecimal is true or the number has decimals, format with decimals
  if (hasDecimals) {
    formatter = new Intl.NumberFormat(currencyCountry, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2, // Always show two decimals
      maximumFractionDigits: 2,
    })
  } else {
    // No decimals
    formatter = new Intl.NumberFormat(currencyCountry, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0, // No decimal places
    })
  }

  // Format the number and return
  const formattedPrice = formatter.format(number)
  return formattedPrice.replace(symbols.rupeeSymbol, '')
}

/**
 *
 * @param {number} number
 * @param {string} country
 * @returns
 */
export const formatNumberWithUnit = (number, range, country = 'en-IN') => {
  let unit
  let formattedNumber
  if (number >= 10000000) {
    number /= 10000000
    unit = 'Crore'
  } else if (number >= 100000) {
    number /= 100000
    unit = 'Lakh'
  } else {
    unit = ''
  }
  if (number % 1 !== 0) {
    formattedNumber = new Intl.NumberFormat(country, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number)
  } else {
    formattedNumber = new Intl.NumberFormat(country, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number)
  }
  if (range) {
    return unit ? `${formattedNumber}` : formattedNumber
  }
  return unit ? `${formattedNumber} ${unit}` : formattedNumber
}
export const formatNumberWithUnitExtended = (number, range, country = 'en-IN') => {
  if (!number || isNaN(number)) return "0";

  let unit = "";
  let formattedNumber = "";
  if (number >= 10000000) {
    number /= 10000000;
    unit = "Crore";
  } 
  else if (number >= 100000) {
    number /= 100000;
    unit = "Lakh";
  } 
  else if (number >= 1000) {
    formattedNumber = new Intl.NumberFormat(country, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
    return `${formattedNumber} Thousand`;
  } 
  else {
    formattedNumber = new Intl.NumberFormat(country).format(number);
    return formattedNumber;
  }

  if (number % 1 !== 0) {
    formattedNumber = new Intl.NumberFormat(country, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  } else {
    formattedNumber = new Intl.NumberFormat(country, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  if (range) {
    return unit ? `${formattedNumber}` : formattedNumber;
  }
  return unit ? `${formattedNumber} ${unit}` : formattedNumber;
};


export const searchResultCardNumberFormatter = (
  number,
  range,
  country = 'en-IN'
) => {
  let unit
  let formattedNumber
  if (typeof number === 'string') {
    number = parseFloat(number.replace(/,/g, ''))
  }
  if (number >= 10000000) {
    number /= 10000000
    unit = 'Cr'
  } else if (number >= 100000) {
    number /= 100000
    unit = 'Lakh'
  } else {
    unit = ''
  }

  if (number % 1 !== 0) {
    if (Math.floor(number * 10) % 10 === 0) {
      formattedNumber = new Intl.NumberFormat(country, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(number)
    } else {
      formattedNumber = new Intl.NumberFormat(country, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number)
    }
  } else {
    formattedNumber = new Intl.NumberFormat(country, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number)
  }

  if (range) {
    return unit ? `${formattedNumber}` : formattedNumber
  }

  return unit ? `${formattedNumber} ${unit}` : formattedNumber
}

/**
 *
 * @param {string} apiType
 * @param {string} apiPath
 * @param {object} data
 *
 * @returns
 */
export const makeApiRequest = async (apiType, apiPath, data) => {
  try {
    let response
    switch (apiType.toLowerCase()) {
      case 'get':
        response = await axios.get(apiPath, data)
        break
      case 'post':
        response = await axios.post(apiPath, data)
        break
      case 'put':
        response = await axios.put(apiPath, data)
        break
      case 'delete':
        response = await axios.delete(apiPath)
        break
      default:
        throw console.log(`Unsupported API type: ${apiType}`)
    }
    return response
  } catch (error) {
    logger.error(error)
  }
}
export const useNavigateToPath = () => {
  const router = useRouter()
  /**
   *
   * @param {string} path
   * @param {object} queryParameters
   */
  const navigateToPath = (path, queryParameters) => {
    router.push({
      pathname: path,
      query: queryParameters,
    })
  }

  return navigateToPath
}

/**
 *
 * @param {string} key
 * @param {string} value
 */
export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value)
  return
}
export const getLocalStorageItem = (key) => {
  const gettingLocalStorageItem = localStorage.getItem(key)
  return gettingLocalStorageItem
}
export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key)
  return
}
/**
 *
 * @param {Number} duration
 * @param {boolean} setResendButtonDisabled
 * @returns
 */
export const startTimer = (duration, setResendButtonDisabled) => {
  let currentTimer = duration
  const timerInterval = setInterval(() => {
    currentTimer -= 1
    if (currentTimer <= 0) {
      clearInterval(timerInterval)
      setResendButtonDisabled(false)
      currentTimer = 0
    }
  }, 1000)
  return [timerInterval, () => currentTimer]
}
export const handlePaste = (e, setOTP, otpInputsRef) => {
  e.preventDefault()
  const clipboardData = e.clipboardData || window.clipboardData
  const pastedData = clipboardData.getData('Text')
  if (/^\d{6}$/.test(pastedData)) {
    const newOTP = pastedData.split('').slice(0, 6)
    setOTP(newOTP)
    otpInputsRef.current[5].focus()
  }
}
export function formatDateToDDMMYYYY(originalDateString) {
  const dateObject = new Date(originalDateString)
  const day = dateObject.getDate().toString().padStart(2, '0')
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObject.getFullYear()
  return `${day}-${month}-${year}`
}
export const formatIndianNumber = (value) => {
  if (typeof value === 'number') {
    return value.toLocaleString('en-IN')
  } else if (typeof value === 'string') {
    const parsedValue = parseInt(value.replace(/,/g, ''), 10)
    if (!isNaN(parsedValue)) {
      return parsedValue.toLocaleString('en-IN')
    }
  }
  return value
}
export const capitalizeFirstLetter = (string) => {
  if (!string) return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export function calculateYear(Year) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - Year
  return age
}

// export function projectAreaMap(projectUnits) {
//   const areaMap = {};
//   let lower = 0;
//   let higher = 0;
//   let areaMapString = '';

//   projectUnits?.forEach(({ primaryArea, secondaryArea, tertiaryArea }) => {
//     // Handle primary area
//     if (primaryArea?.areaUnit) {
//       if (!areaMap[primaryArea.areaUnit]) {
//         areaMap[primaryArea.areaUnit] = [parseInt(primaryArea.areaSize)];
//       } else {
//         areaMap[primaryArea.areaUnit].push(parseInt(primaryArea.areaSize));
//       }
//     }

//     // Handle secondary area
//     if (secondaryArea?.areaUnit) {
//       if (!areaMap[secondaryArea.areaUnit]) {
//         areaMap[secondaryArea.areaUnit] = [parseInt(secondaryArea.areaSize)];
//       } else {
//         areaMap[secondaryArea.areaUnit].push(parseInt(secondaryArea.areaSize));
//       }
//     }

//     // Handle tertiary area
//     if (tertiaryArea?.areaUnit) {
//       if (!areaMap[tertiaryArea.areaUnit]) {
//         areaMap[tertiaryArea.areaUnit] = [parseInt(tertiaryArea.areaSize)];
//       } else {
//         areaMap[tertiaryArea.areaUnit].push(parseInt(tertiaryArea.areaSize));
//       }
//     }
//   });

//   const areaKeys = increasingOrder;
//   for (let i = 0; i < areaKeys.length; i++) {
//     const key = areaKeys[i];
//     if (lower === 0 && areaMap[key]) {
//       areaMap[key].sort((a, b) => a - b);
//       const numberFormatted = numberFormatter(areaMap[key][0]);
//       areaMapString += String(numberFormatted) + ' ' + propertySizeUnitMap[key] + ' ';
//       lower++;
//       break;
//     }
//   }

//   if (projectUnits?.length === 1) {
//     return areaMapString.trim();
//   }

//   const reverseAreaKeys = decresingOrder;
//   for (let i = 0; i < reverseAreaKeys.length; i++) {
//     const key = reverseAreaKeys[i];
//     if (higher === 0 && areaMap[key]) {
//       areaMap[key].sort((a, b) => b - a);
//       const numberFormatted = numberFormatter(areaMap[key][0]);
//       areaMapString += symbols.dash + ' ' + String(numberFormatted) + ' ' + propertySizeUnitMap[key];
//       higher++;
//       break;
//     }
//   }

//   return areaMapString;
// }

export function projectAreaMap(projectUnits) {
  const areaMap = {}
  let lower = 0
  let higher = 0
  let areaMapString = ''

  const displayableUnits = projectUnits?.filter((unit) => {
    return (
      unit.primaryArea?.displayUnitSize === true ||
      unit.secondaryArea?.displayUnitSize === true ||
      unit.tertiaryArea?.displayUnitSize === true
    )
  })

  if (displayableUnits && displayableUnits.length > 0) {
    const areaValues = []

    displayableUnits.forEach((unit) => {
      if (unit.primaryArea?.displayUnitSize === true) {
        areaValues.push({
          size: unit.primaryArea.areaSize,
          unit: unit.primaryArea.areaUnit,
        })
      }
      if (unit.secondaryArea?.displayUnitSize === true) {
        areaValues.push({
          size: unit.secondaryArea.areaSize,
          unit: unit.secondaryArea.areaUnit,
        })
      }
      if (unit.tertiaryArea?.displayUnitSize === true) {
        areaValues.push({
          size: unit.tertiaryArea.areaSize,
          unit: unit.tertiaryArea.areaUnit,
        })
      }
    })
    areaValues.sort((a, b) => parseInt(a.size) - parseInt(b.size))
    if (areaValues.length === 1) {
      const area = areaValues[0]
      return `${numberFormatter(parseInt(area.size))} ${PROPERTY_SIZE_UNIT_MAP[area.unit]}`
    } else if (areaValues.length > 1) {
      const smallest = areaValues[0]
      const largest = areaValues[areaValues.length - 1]
      return `${numberFormatter(parseInt(smallest.size))} ${PROPERTY_SIZE_UNIT_MAP[smallest.unit]} - ${numberFormatter(parseInt(largest.size))} ${PROPERTY_SIZE_UNIT_MAP[largest.unit]}`
    }
  }
  if (projectUnits && projectUnits.length > 0) {
    const firstUnit = projectUnits[0]

    if (firstUnit.primaryArea?.areaSize && firstUnit.primaryArea?.areaUnit) {
      return `${numberFormatter(parseInt(firstUnit.primaryArea.areaSize))} ${PROPERTY_SIZE_UNIT_MAP[firstUnit.primaryArea.areaUnit]}`
    } else if (
      firstUnit.secondaryArea?.areaSize &&
      firstUnit.secondaryArea?.areaUnit
    ) {
      return `${numberFormatter(parseInt(firstUnit.secondaryArea.areaSize))} ${PROPERTY_SIZE_UNIT_MAP[firstUnit.secondaryArea.areaUnit]}`
    } else if (
      firstUnit.tertiaryArea?.areaSize &&
      firstUnit.tertiaryArea?.areaUnit
    ) {
      return `${numberFormatter(parseInt(firstUnit.tertiaryArea.areaSize))} ${PROPERTY_SIZE_UNIT_MAP[firstUnit.tertiaryArea.areaUnit]}`
    }
  }
  projectUnits?.forEach(({ primaryArea, secondaryArea, tertiaryArea }) => {
    if (primaryArea?.areaUnit) {
      if (!areaMap[primaryArea.areaUnit]) {
        areaMap[primaryArea.areaUnit] = [parseInt(primaryArea.areaSize)]
      } else {
        areaMap[primaryArea.areaUnit].push(parseInt(primaryArea.areaSize))
      }
    }
    if (secondaryArea?.areaUnit) {
      if (!areaMap[secondaryArea.areaUnit]) {
        areaMap[secondaryArea.areaUnit] = [parseInt(secondaryArea.areaSize)]
      } else {
        areaMap[secondaryArea.areaUnit].push(parseInt(secondaryArea.areaSize))
      }
    }
    if (tertiaryArea?.areaUnit) {
      if (!areaMap[tertiaryArea.areaUnit]) {
        areaMap[tertiaryArea.areaUnit] = [parseInt(tertiaryArea.areaSize)]
      } else {
        areaMap[tertiaryArea.areaUnit].push(parseInt(tertiaryArea.areaSize))
      }
    }
  })

  const areaKeys = AREA_KEYS_INCREASING_ORDERS
  for (let i = 0; i < areaKeys.length; i++) {
    const key = areaKeys[i]
    if (lower === 0 && areaMap[key]) {
      areaMap[key].sort((a, b) => a - b)
      const numberFormatted = numberFormatter(areaMap[key][0])
      areaMapString +=
        String(numberFormatted) + ' ' + PROPERTY_SIZE_UNIT_MAP[key] + ' '
      lower++
      break
    }
  }
  if (projectUnits?.length === 1) {
    return areaMapString.trim()
  }
  const reverseAreaKeys = AREA_KEYS_DECRESING_ORDERS
  for (let i = 0; i < reverseAreaKeys.length; i++) {
    const key = reverseAreaKeys[i]
    if (higher === 0 && areaMap[key]) {
      areaMap[key].sort((a, b) => b - a)
      const numberFormatted = numberFormatter(areaMap[key][0])
      areaMapString +=
        '-' + ' ' + String(numberFormatted) + ' ' + PROPERTY_SIZE_UNIT_MAP[key]
      higher++
      break
    }
  }
  return areaMapString
}

export function plotAreaMap(projectUnits) {
  if (!projectUnits || projectUnits.length === 0) {
    return ''
  }
  const firstUnit = projectUnits[0]
  if (firstUnit.plotAreaLength && firstUnit.plotAreaBreadth) {
    const lengthFormatted = numberFormatter(firstUnit.plotAreaLength)
    const breadthFormatted = numberFormatter(firstUnit.plotAreaBreadth)
    const lengthUnit =
      PROPERTY_SIZE_UNIT_MAP[firstUnit.plotAreaLengthPerUnit] ||
      firstUnit.plotAreaLengthPerUnit
    const breadthUnit =
      PROPERTY_SIZE_UNIT_MAP[firstUnit.plotAreaBreadthPerUnit] ||
      firstUnit.plotAreaBreadthPerUnit

    return `${lengthFormatted} ${lengthUnit} - ${breadthFormatted} ${breadthUnit}`
  }
  return ''
}

export function ValidateCustomURL(url) {
  const urlPattern = /^[a-zA-Z0-9-]+$/
  if (!urlPattern.test(url)) {
    return 'The URL can only contain letters, numbers, and hyphens.'
  }
  if (url.startsWith('-') || url.endsWith('-') || url.includes('--')) {
    return 'The URL cannot start, end, or contain consecutive hyphens.'
  }
  if (url.length > 120) {
    return 'The URL cannot be longer than 50 characters.'
  }
  return null
}

export function projectBedroomString(projectUnits) {
  let bedroomString = ''
  let bedroomArray = []
  projectUnits?.forEach((unit) => {
    if (!bedroomArray.includes(unit.bedroomCount)) {
      bedroomArray.push(unit.bedroomCount)
    }
  })
  bedroomArray.sort((a, b) => a - b)
  for (const key in bedroomArray) {
    if (bedroomString === '') {
      bedroomString += bedroomArray[key]
    } else {
      bedroomString += ', ' + bedroomArray[key]
    }
  }
  return bedroomString
}

export function projectPriceMap(projectUnits, min = false) {
  let priceString = ''
  let priceArray = []
  projectUnits?.forEach((unit) => {
    if (unit.salePrice && unit.primaryArea?.areaSize) {
      const pricePerSqFt =
        unit.salePrice * parseFloat(unit.primaryArea.areaSize)
      const totalPrice = parseFloat(pricePerSqFt.toFixed(2))
      priceArray.push(totalPrice)
    }
    if (unit.minPrice) {
      priceArray.push(unit.minPrice)
    }
    if (unit.maxPrice) {
      priceArray.push(unit.maxPrice)
    }
    if (unit.plotMinPrice && unit?.plotMaxPrice) {
      priceArray.push(unit.plotMinPrice)
      priceArray.push(unit.plotMaxPrice)
    }   
    if (unit?.plotSalePrice) {
      priceArray.push(unit.plotSalePrice)
    }
  })
  priceArray.sort((a, b) => a - b)
  const n = priceArray.length
  if (n === 0) {
    return ''
  } else if (n === 1) {
    priceString =
      symbols.rupeeSymbol + ' ' + formatNumberWithUnit(priceArray[0])
  } else if (priceArray.every((price) => price === priceArray[0])) {
    priceString =
      symbols.rupeeSymbol + ' ' + formatNumberWithUnit(priceArray[0])
  } else if (min) {
    return formatNumberWithUnit(priceArray[0])
  } else {
    priceString =
      symbols.rupeeSymbol +
      ' ' +
      formatNumberWithUnit(priceArray[0]) +
      ' ' +
      symbols.dash +
      ' ' +
      symbols.rupeeSymbol +
      ' ' +
      formatNumberWithUnit(priceArray[n - 1])
  }
  return priceString
}

export const displayDaysMonth = (year, month, day) => {
  const displayMonth =
    typeof month === 'number' && month >= 1 && month <= 12 ? month : 1
  const displayDay = typeof day === 'number' && day >= 1 && day <= 31 ? day : 1
  const monthName = monthNameMap[displayMonth - 1]
  return `${displayDay} ${monthName}`
}
export const displayFullDate = (year, month, day) => {
  const displayMonth =
    typeof month === 'number' && month >= 1 && month <= 12 ? month : 1
  const displayDay = typeof day === 'number' && day >= 1 && day <= 31 ? day : 1
  const monthName = monthNameMap[displayMonth - 1]
  return `${displayDay} ${monthName}, ${year}`
}
export const sortByDate = (array) => {
  return array.sort((a, b) => {
    const dateA = new Date(
      (a._id || {}).year,
      (a._id || {}).month - 1,
      (a._id || {}).day
    )
    const dateB = new Date(
      (b._id || {}).year,
      (b._id || {}).month - 1,
      (b._id || {}).day
    )
    return dateA - dateB
  })
}
export const generateMachineId = (payload) => {
  return bcrypt.hashSync(payload)
}
export const Timer = ({ recordingStarted }) => {
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let intervalId
    if (recordingStarted) {
      setStartTime(Date.now())
      intervalId = setInterval(() => {
        const currentTime = Date.now()
        setElapsedTime(currentTime - startTime)
      }, 1000)
    } else {
      clearInterval(intervalId)
      setStartTime(null)
      setElapsedTime(0)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [recordingStarted, startTime])
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return (
    <div className="relative">
      <div className="flex absolute top-[25px] left-4 text-sm">
        <Image
          src={RecButton}
          width={15}
          height={10}
          className="mr-2"
          alt="recording-button"
        />
        {formatTime(elapsedTime)}
      </div>
    </div>
  )
}

export const mapAvailableFacilities = (data) => {
  const facilitiesArray = data || []
  const facilitiesStatus = {}
  const availableSet = new Set(facilitiesArray)
  Object.keys(allAvailableFacilities).forEach((key) => {
    facilitiesStatus[key] = availableSet.has(allAvailableFacilities[key])
      ? 'Yes'
      : 'No'
  })
  return facilitiesStatus
}

export const formatCount = (count) => {
  if (typeof count === 'number') {
    return count > 99 ? '99+' : count.toString()
  }
  return ''
}

export const formatDateValue = (dateString) => {
  const dateObject = new Date(dateString)
  const day = dateObject.getDate().toString()
  const month = dateObject
    .toLocaleString('default', { month: 'short' })
    .slice(0, 3)
  const year = dateObject.getFullYear()
  return `${month} ${day}, ${year}`
}

export const formatDate = (dateString) => {
  const options = {
    month: longText,
    day: numericText,
    year: numericText,
    hour: numericText,
    minute: numericText,
    hour12: true,
  }
  return new Date(dateString)
    .toLocaleString(enUsText, options)
    .replace(/, /g, symbols.comma)
    .replace(atText, '')
    .replace(uppercaseAm, smallAm)
    .replace(uppercasePm, smallPm)
}

export const CustomTabLabel = ({ text, count }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <span className="capitalize">{text}</span>
    <span className={`${style.tabSpan} pt-[1px]`}>{count}</span>
  </div>
)
export const getTimeDifference = (agentSince) => {
  const now = new Date()
  const pastDate = new Date(agentSince)

  let years = now.getFullYear() - pastDate.getFullYear()
  let months = now.getMonth() - pastDate.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  const yearsStr = years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''
  const monthsStr = months > 0 ? `${months} month${months > 1 ? 's' : ''} ` : ''

  return `${yearsStr}${monthsStr}`.trim()
}

export const OtpVerify = () => {
  return (
    <div className="flex gap-1 text-primary">
      <Image src={checkIcon} height={14} width={14} alt="check" />
      <p>{otpVerified}</p>
    </div>
  )
}

export const dayMappings = {
  [yesterdayText]: 1,
  [last7Days]: 7,
  [last15Days]: 15,
  [last30Days]: 30,
  [last90Days]: 90,
  [lastOneYear]: 365,
}

export const excludedPaths = [
  '/admin/logout',
  '/admin/settings',
  '/admin/website-moderation',
  '/admin/post-project',
  '/admin/app-moderation',
]
