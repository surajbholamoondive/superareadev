import { getLogger } from '@/helper/logger'
import { GLOBALLY_COMMON_TEXT, OTHER_PAGES_TEXT } from '@/textV2'
import {
  displayDaysMonth,
  displayFullDate,
  makeApiRequest,
} from '@/utils/utils'
import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const logger = getLogger()
const { profileEditText, wrongEmail } = OTHER_PAGES_TEXT.wishlisted
const { conversionFactorMap, text, routes, propertySizeUnits } = GLOBALLY_COMMON_TEXT
const { putType, getType, lowercaseRecommended, lowText } = text
// Recommended Notification Function//
export async function storeRecommendedProperties(user) {
  const NotificationType = lowercaseRecommended
  const time = lowText

  try {
    const response = await makeApiRequest(
      process.env.NEXT_PUBLIC_PUT_METHOD,
      process.env.NEXT_PUBLIC_STORE_NOTIFICATION,
      {
        userId: user,
        notificationType: NotificationType,
        timeSensitivity: time,
      }
    )
    logger.info(response)
  } catch (error) {
    logger.error(error)
  }
}

/*export const storeNotification = async ({
  userId,
  text,
  notificationType,
  propertyId,
  time,
  userStatus,
  approvalStatus,
  listingStatus,
  meetingTime,
}) => {
  if (!userId || !notificationType) {
    logger.error('userId and Notification Type are required parameters')
    return
  }
  const payload = {
    userId: userId.toString(),
    text: text,
  }

  if (notificationType) {
    payload.notificationType = notificationType
  }
  if (propertyId) {
    payload.propertyId = propertyId.toString()
  }
  if (time) {
    payload.timeSensitivity = time
  }
  if (meetingTime) {
    payload.meetingTime = meetingTime
  }
  if (userStatus) {
    payload.userStatus = userStatus
  }
  if (approvalStatus) {
    payload.approvalStatus = approvalStatus
  }
  if (listingStatus) {
    payload.listingStatus = listingStatus
  }

  try {
    const response = await makeApiRequest(
      putType,
      process.env.NEXT_PUBLIC_STORE_NOTIFICATION,
      payload
    )
    logger.info(response)
  } catch (error) {
    logger.error('API call failed:', error)
  }
}*/

// fetch wishlist function for user my Activity section //
export const fetchWishlistData = async (userId) => {
  try {
    const responseWishlist = await makeApiRequest(
      getType,
      routes.userWishlistedRoute,
      userId
    )
    return responseWishlist?.data?.result
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const fetchRecommendedData = async (userId) => {
  try {
      const params = {
      userId: userId,
    }

    const { data } = await makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      process.env.NEXT_PUBLIC_ACTIVITY_RECOMMENDED_ROUTE,
      { params }
    )
    const recommendations = data?.recommendations || [];
    return recommendations
  } catch (error) {
    return []
  }
}
export const formattedDateOfBirth = (dateOfBirth) => {
  return dateOfBirth
    ? new Date(dateOfBirth).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "---";
};


export const formattedAgentSince = (agentSince) => {
  return agentSince
    ? `${new Date(agentSince).toLocaleString('default', { month: 'long' })} ${new Date(agentSince).getUTCFullYear()}`
    : '---'
}

export const handleLanguageToggle = (language, userData, setUserData) => {
  if (userData.languagePreferences.includes(language)) {
    setUserData({
      ...userData,
      languagePreferences: userData.languagePreferences.filter(
        (lang) => lang !== language
      ),
    })
  } else {
    setUserData({
      ...userData,
      languagePreferences: [...userData.languagePreferences, language],
    })
  }
}

export const handleEditProfile = async (
  selectedDate,
  userData,
  onClose,
  setAuth,
  auth,
  userType
) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(userData?.email)) {
    toast.error(wrongEmail)
    return
  }
  if (!selectedDate || selectedDate.isAfter(dayjs())) {
    toast.error('Invalid date of birth. Please select a valid date.')
    return
  }
  if(userData.city){
        console.log(userData.city)
  }
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API}${userType}/edit-profile`,
      userData
    )
    const Result = response?.data?.result
    const ResponseMessage = response?.data?.responseCode

    if (ResponseMessage === 200) {
      toast.success(profileEditText)
      setAuth({
        ...auth,
        userResult: {
          ...auth.userResult,
          ...userData,
        },
      })
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...auth,
          userResult: {
            ...auth.userResult,
            ...userData,
          },
        })
      )
      onClose(false)
    } else {
      console.error(response?.data?.ResponseMessage)
    }
  } catch (error) {
    console.error(error)
  }
}

// Admin Dashboard //
export const extractDate = (item) => ({
  year: item._id?.year || item.year,
  month: item._id?.month || item.month,
  day: item._id?.day || item.day,
})
// Admin Dashboard //
export const mapDataToDisplayDaysMonth = (sortedData) => {
  return sortedData.map((item) => {
    const { year, month, day } = extractDate(item)
    return displayDaysMonth(year, month, day)
  })
}
// Admin Dashboard //
export const mapDataToDisplayFullDate = (sortedData) => {
  return sortedData.map((item) => {
    const { year, month, day } = extractDate(item)
    return displayFullDate(year, month, day)
  })
}
// Leads Table on Admin Dashbaord //
export function descendingComparator(a, b, orderBy) {
  if (orderBy === 'date') {
    const dateA = new Date(a[orderBy]).getTime()
    const dateB = new Date(b[orderBy]).getTime()

    if (dateB < dateA) {
      return -1
    }
    if (dateB > dateA) {
      return 1
    }
    return 0
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
}
// Leads Table on Admin Dashbaord //
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
// Leads Table on Admin Dashbaord //
export function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map((el) => el[0])
}

export const fetchFeaturedData = async (user_id) => {
  try {
    const { data } = await makeApiRequest(
      process.env.NEXT_PUBLIC_GET_METHOD,
      process.env.NEXT_PUBLIC_FEATURED_LISTING_ROUTE
    )
    const featuredListings = data?.featuredRecommendations || []
    return featuredListings;
  } catch (error) {
    return []
  }
}

export const getPricePerUnit = async (areaUnit, unitSize, price) => {
  const unitObject = propertySizeUnits.find((unit) => unit.value === areaUnit)
  if (!unitObject) {
    throw new Error('Invalid area unit')
  }
  const conversionFactor = conversionFactorMap[unitObject.value]

  if (isNaN(unitSize) || isNaN(price)) {
    throw new Error('Invalid unitSize or price')
  }
  const sizeInSqFt = unitSize * conversionFactor;
  const pricePerSqFt = price * unitSize;
  return parseFloat(pricePerSqFt.toFixed(2));
}
