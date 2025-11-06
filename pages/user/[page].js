import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import BackgroundImage from '../../assets/NonLoggedUserImages/backgroundImage.svg';
import {
  ENQUIRED_QUERY,
  GET_REQ,
  HOME_ROUTE,
  IS_ADMIN_LOGIN,
  IS_LOGIN,
  MY_LISTINGS,
  POST_TEXT,
  PROPERTY_LIST_ROUTE,
  PUT_REQ,
  USER_ACTIVITY_ROUTE,
  USER_AGENT_ROUTE,
  USER_ENQUIRES_RECIEVED,
  USER_ENQUIRES_RECIEVED_ROUTE,
  USER_ENQUIRIES_ROUTE,
  USER_LISTING,
  USER_LISTING_ROUTE,
  USER_LOGOUT,
  USER_LOGOUT_ROUTE,
  USER_M_ASSOCIATE,
  USER_M_ASSOCIATE_ROUTE,
  USER_MY_ACTIIVITY,
  USER_MY_ACTIIVITY_ROUTE,
  USER_POST_PROPERTY,
  USER_POST_PROPERTY_ROUTE,
  USER_PROFILE,
  USER_PROFILE_ROUTE,
  USER_PROPERTY_ENQUIRED_ROUTE,
  USER_PROPERTY_WISHLISTED_ROUTE,
} from '@/text'
import withProtectedRoute from '@/utils/RouteProtection/routes'
import {
  makeApiRequest,
  setLocalStorageItem,
} from '@/utils/utils'
import Cookies from 'js-cookie'

const AddProperty = dynamic(() => import('@/components/User/add-property'))
const Agent = dynamic(() => import('@/components/User/agent/index'))
const Tabs = dynamic(() => import('@/components/User/enquiries-received/index'))
const userListing = dynamic(() => import('@/components/User/listing'))
const mAssociate = dynamic(() => import('@/components/User/mAssociate'))
const activity = dynamic(() => import('@/components/User/activity'))
const profile = dynamic(() => import('@/components/User/profile'))
import SideDashboard from '@/components/SideDashboard/SideDashboard'
import mAssociatesIcon from '../../assets/logo/logo-icon.svg'
import UserSideDashboard from '../../components/User/UserSideDashboard'
import Loading from '../loading'
import OutletLayout from '@/components/OutletLayout/OutletLayout'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export const Logout = () => {
  const router = useRouter()
  const [auth, setAuth] = useAuth()
  const logger = getLogger()

  const handleLogout = async () => {
    try {
      const body = {
        sessionExitStatus: USER_LOGOUT,
      }
      await makeApiRequest(
        PUT_REQ,
        `${process.env.NEXT_PUBLIC_API}${USER_LOGOUT_ROUTE}/${auth?.userResult?._id}`,
        body
      )
      localStorage.removeItem(`wishlist-${auth?.userResult?._id}`)
      setLocalStorageItem(IS_ADMIN_LOGIN, 'false')
      setLocalStorageItem(IS_LOGIN, 'false')
      localStorage.removeItem('auth')
      Cookies.remove('token')
      setAuth({
        user: null,
        token: '',
        refreshToken: '',
      })
      router.push(HOME_ROUTE)
    } catch (error) {
      logger.error('Logout error:', error)
    }
  }
  useEffect(() => {
    handleLogout()
  }, [])
}

const Index = ({ listings, activityData, enquiryReceived }) => {
  const DynamicText = {
    [USER_PROFILE_ROUTE]: USER_PROFILE,
    [USER_LISTING_ROUTE]: USER_LISTING,
    [USER_MY_ACTIIVITY_ROUTE]: USER_MY_ACTIIVITY,
    [USER_POST_PROPERTY_ROUTE]: USER_POST_PROPERTY,
    [USER_M_ASSOCIATE_ROUTE]: USER_M_ASSOCIATE,
    [USER_ENQUIRES_RECIEVED_ROUTE]: USER_ENQUIRES_RECIEVED,
  }

  const componentMap = {
    [USER_PROFILE_ROUTE]: profile,
    [USER_LISTING_ROUTE]: userListing,
    [USER_MY_ACTIIVITY_ROUTE]: activity,
    [USER_AGENT_ROUTE]: Agent,
    [USER_POST_PROPERTY_ROUTE]: AddProperty,
    [USER_M_ASSOCIATE_ROUTE]: mAssociate,
    [USER_ENQUIRES_RECIEVED_ROUTE]: Tabs,
    [USER_LOGOUT_ROUTE]: Logout,
  }
  
  const propMap = {
    [USER_LISTING_ROUTE]: listings,
    [USER_MY_ACTIIVITY_ROUTE]: activityData,
    [USER_ENQUIRES_RECIEVED_ROUTE]: enquiryReceived,
  }
  
  const iconListTopBar = {
    [USER_M_ASSOCIATE_ROUTE]: mAssociatesIcon,
  }
  
  const router = useRouter()
  const [auth] = useAuth()
  const currentPath = router.asPath.split('?')[0]
  let Component = componentMap[currentPath] || profile
  
  for (const route in componentMap) {
    const regex = new RegExp(`^${route}(\\?.*)?$`)
    if (regex.test(currentPath)) {
      Component = componentMap[route]
      break
    }
  }
  
  if (currentPath === `/${USER_LOGOUT_ROUTE}`) {
    Logout()
    return <Loading />
  }
  
  return (
    <div className="py-4"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      {auth?.token && (
        <OutletLayout
          sidebar={<SideDashboard arrayMenu={UserSideDashboard} />}
        >
          {currentPath === `/${USER_LOGOUT_ROUTE}` ? (
            <Logout />
          ) : (
            <Component Data={propMap[currentPath]} />
          )}
        </OutletLayout>
      )}
    </div>
  )
}

export default withProtectedRoute(Index, ['Individual'])

export async function getServerSideProps({ req }) {
  try {
    const { token, ipaddress, Longitude, ipLatitude, ipLongitude, Latitude, machineid } = req.cookies;

    axios.defaults.headers.common["token"] = token || '';
    axios.defaults.headers.common["ipaddress"] = ipaddress || '';
    axios.defaults.headers.common["latitude"] = Latitude ? Latitude : ipLatitude || '';
    axios.defaults.headers.common["longitude"] = Longitude ? Longitude : ipLongitude || '';
    axios.defaults.headers.common["machineid"] = machineid || '';
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const response = await makeApiRequest(POST_TEXT, PROPERTY_LIST_ROUTE);
    const listings = response.data.result || [];
    const viewedResponse = await makeApiRequest(PUT_REQ, USER_ACTIVITY_ROUTE, decodedToken._id)
    const enquiredResponse = await makeApiRequest(GET_REQ, USER_PROPERTY_ENQUIRED_ROUTE, decodedToken._id)
    const wishlistResponse = await makeApiRequest(GET_REQ, USER_PROPERTY_WISHLISTED_ROUTE, decodedToken._id)

    const paramsData = { activity: ENQUIRED_QUERY, pageNumber: 1, pageSize: 10, listingtype: MY_LISTINGS }
    const enquiryResponse = await makeApiRequest(GET_REQ, USER_ENQUIRIES_ROUTE, { params: paramsData })
    const enquiryReceived = enquiryResponse.data.result

    const activityData = {
      viewed: viewedResponse?.data?.result || [],
      enquired: enquiredResponse?.data?.result?.propertyResult || [],
      wishlists: wishlistResponse?.data?.result?.propertyResult || [],
    }
    return { props: { listings, activityData, enquiryReceived } };
  } catch (error) {
    return { props: { listings: [], activityData: {}, enquiryReceived: {} } };
  }
}