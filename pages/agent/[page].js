import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import AgentMenuConfig from '@/content/Agent/AgentSideDashboard'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import BackgroundImage from '../../assets/NonLoggedUserImages/backgroundImage.svg';
import {
  AGENT_ASSIGNED_LISTING,
  AGENT_ASSIGNED_LISTING_ROUTE,
  AGENT_LEADS,
  AGENT_LEADS_ROUTE,
  AGENT_LOGOUT_ROUTE,
  AGENT_MY_LISTING,
  AGENT_POST_PROJECT_ROUTE,
  AGENT_POST_PROPERTY,
  AGENT_PROFILE,
  AGENT_PROFILE_ROUTE,
  AGENT_PROJECT_LISTING_ROUTE,
  HOME_ROUTE,
  IS_ADMIN_LOGIN,
  IS_LOGIN,
  LEADS,
  PUT_REQ,
  USER_LOGOUT,
  AGENT_M_VERIFICATION_LISTING_ROUTE,
  AGENT_E_VERIFICATION,
  USER_LOGOUT_ROUTE,
  POST_TEXT,
  PROPERTY_LIST_ROUTE,
  GET_REQ,
  ENQUIRED_QUERY,
  MY_LISTINGS,
  AGENT_COUNT_ROUTE,
  VERIFIED_LISTING_COUNTS
} from '@/text'
import withProtectedRoute from '@/utils/RouteProtection/routes'
import { makeApiRequest, setLocalStorageItem } from '@/utils/utils'
import Cookies from 'js-cookie'
import axios from 'axios'

const PostProperty = dynamic(() => import('@/components/Agent/add-property'))
const AssignedListing = dynamic(() => import('@/components/Agent/AssigendListing/AssignedListing'))
const Leads = dynamic(() => import('@/components/Agent/Leads'))
const AgentListing = dynamic(() => import('@/components/Agent/Listing/AgentListing'))
const profile = dynamic(() => import('@/components/Agent/profile'))
const Mverification = dynamic(() => import('@/components/Agent/Mverification'))


import SideDashboard from '@/components/SideDashboard/SideDashboard'
import OutletLayout from '@/components/OutletLayout/OutletLayout'
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
      logger.error(error)
    }
  }
  useEffect(() => {
    handleLogout()
  }, [])
}
 
const AgentPage = ({ listings, assignedListing, leads, counts }) => {
  const componentMap = {
    [AGENT_POST_PROJECT_ROUTE]: PostProperty,
    [AGENT_PROFILE_ROUTE]: profile,
    [AGENT_PROJECT_LISTING_ROUTE]: AgentListing,
    [AGENT_M_VERIFICATION_LISTING_ROUTE]: Mverification,
    [AGENT_LEADS_ROUTE]: Leads,
    [AGENT_ASSIGNED_LISTING_ROUTE]: AssignedListing,
    [AGENT_LOGOUT_ROUTE]: Logout,
  };
  
  const DynamicText = {
    [AGENT_POST_PROJECT_ROUTE]: AGENT_POST_PROPERTY,
    [AGENT_PROFILE_ROUTE]: AGENT_PROFILE,
    [AGENT_PROJECT_LISTING_ROUTE]: AGENT_MY_LISTING,
    [AGENT_M_VERIFICATION_LISTING_ROUTE]: AGENT_E_VERIFICATION,
    [AGENT_LEADS_ROUTE]: AGENT_LEADS,
    [AGENT_ASSIGNED_LISTING_ROUTE]: AGENT_ASSIGNED_LISTING,
  };
  
  const propMap = {
    [AGENT_PROJECT_LISTING_ROUTE]: listings,
    [AGENT_ASSIGNED_LISTING_ROUTE]: assignedListing,
    [AGENT_LEADS_ROUTE]: leads,
    [AGENT_M_VERIFICATION_LISTING_ROUTE]: counts,
  };
 
  const [agentcount, setAgentCount] = useState();
  const router = useRouter();
  const routerPath = decodeURIComponent(router.asPath);
  const currentPath = routerPath.split('?')[0];
 
  let Component = componentMap[currentPath] || PostProperty;
  const logger = getLogger();
 
  const fetchApi = async () => {
    try {
      const response = await makeApiRequest(GET_REQ, AGENT_COUNT_ROUTE);
      setAgentCount(response.data.result);
    } catch (error) {
      logger.error(error);
    }
  };
 
  useEffect(() => {
    fetchApi();
  }, []);
 
  let getText = DynamicText[currentPath] || LEADS;
 
  return (
    <div className="py-4"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <OutletLayout
        sidebar={<SideDashboard arrayMenu={AgentMenuConfig} count={agentcount} />}
      >
        {currentPath === AGENT_LOGOUT_ROUTE ? (
          <Logout />
        ) : (
          <Component data={propMap[currentPath]} />
        )}
      </OutletLayout>
    </div>
  );
};
 
 
export default withProtectedRoute(AgentPage, ['Agent'])
 
export async function getServerSideProps({ req }) {
  try {
    const { token, ipaddress, Longitude, ipLatitude, ipLongitude, Latitude, machineid } = req.cookies;
 
    axios.defaults.headers.common["token"] = token || '';
    axios.defaults.headers.common["ipaddress"] = ipaddress || '';
    axios.defaults.headers.common["latitude"] = Latitude ? Latitude : ipLatitude || '';
    axios.defaults.headers.common["longitude"] = Longitude ? Longitude : ipLongitude || '';
    axios.defaults.headers.common["machineid"] = machineid || '';
    const queryParams = {
      sortBy: 'sort_by'
    }
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const { data } = await makeApiRequest(
      GET_REQ,
      AGENT_ASSIGNED_LISTING_ROUTE, { params: queryParams }, decodedToken._id)
    const { assignedListing } = data?.result || []
    const response = await makeApiRequest(POST_TEXT, PROPERTY_LIST_ROUTE, decodedToken._id);
    const paramsData = { activity: ENQUIRED_QUERY, pageNumber: 1, pageSize: 10, city: '', propertyTitle: '', days: '', sortOrder: '', listingtype: MY_LISTINGS }
    const { data: Data } = await makeApiRequest(GET_REQ, AGENT_LEADS_ROUTE, { params: paramsData }, decodedToken._id)
    const { data: Response } = await makeApiRequest(GET_REQ, VERIFIED_LISTING_COUNTS, decodedToken._id);
    const leads = Data.result || {}
    const listings = response.data.result || []
    const counts = Response.result || {}
    return { props: { listings, assignedListing, leads, counts } }
  } catch (error) {
    return { props: { listings: [], assignedListing: [], leads: {}, counts: {} } }
  }
}