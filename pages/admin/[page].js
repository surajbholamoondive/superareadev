import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import AdminSideDashboard from '@/content/Admin/AdminSideDashboard'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import withProtectedRoute from '@/utils/RouteProtection/routes'
import { makeApiRequest, removeLocalStorageItem, setLocalStorageItem } from '@/utils/utils'
import Cookies from 'js-cookie'

const AllUsers = dynamic(() => import('@/components/Admin/All-Users'))
const Assignmassociate = dynamic(() => import('@/components/Admin/Assign-Massociate'))
const DirectLeads = dynamic(() => import('@/components/Admin/DirectLeads'))
const Leads = dynamic(() => import('@/components/Admin/LeadsAdmin'))
const Massociate = dynamic(() => import('@/components/Admin/my-m-associates'))
const PostProject = dynamic(() => import('@/components/Admin/Post-Project'))
const ProjectsBuildings = dynamic(() => import('@/components/Admin/Project-Buildings'))
const WebsiteModeration = dynamic(() => import('@/components/Admin/WebsiteModeration'))
const Settings = dynamic(() => import('@/components/Admin/Settings'))
const BugReportTable = dynamic(() => import('@/components/Admin/bugReportTable'))
const mVerificationTab = dynamic(() => import('@/components/Admin/mVerificationTab'))
const Dashboard = dynamic(() => import('@/components/Admin/Dashboard'))
const DirectListing = dynamic(() => import('@/components/Admin/Direct-Listing'))
const AppModeration = dynamic(() => import('@/components/Admin/AppModeration/AppModeration'))
const LogoutConfirmationModal = dynamic(() => import('@/components/Admin/LogoutConfirmationModal'))

import TopBar from '@/components/SearchResultPage/TopBar/TopBar'
import SideDashboard from '@/components/SideDashboardAdmin/SideDashboard'
import MoresIcon from '@/assets/logo/logo-icon.svg'
import OutletLayout from '@/components/OutletLayoutAdmin/OutletLayout'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2'

const { ADMIN_LOGOUT_TAB } = ADMIN_MODULE
const { text: logoutText } = ADMIN_LOGOUT_TAB
const { text } = GLOBALLY_COMMON_TEXT
const { routes } = ADMIN_LOGOUT_TAB

const AdminPage = ({ apiData, countData }) => {
  const router = useRouter()
  const { asPath } = router
  const [auth, setAuth] = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const logger = getLogger()
  const [isDesktop, setIsDesktop] = useState(true) 
  
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1000)
    }
    handleResize() 
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const handleLogout = async () => {
    try {
      const body = {
        sessionExitStatus: routes.logout,
      }
      await makeApiRequest(
        text.putType,
        `${process.env.NEXT_PUBLIC_API}${routes.logout}/${auth?.userResult?._id}`,
        body
      )
      removeLocalStorageItem('auth')
      setLocalStorageItem(logoutText.isAdminLogin, 'false')
      setLocalStorageItem(logoutText.isLogin, 'false')
      Cookies.remove('token')
      setAuth({
        user: null,
        token: '',
        refreshToken: '',
      })
      const userType = auth?.userResult?.userType
      if (userType === logoutText.admin) {
        router.push(routes.admin)
        return
      } else {
        router.push(routes.login)
        return
      }
    } catch (error) {
      logger.error(error)
    }
  }

  const handleConfirmLogout = () => {
    setShowLogoutModal(false)
    handleLogout()
  }

  const handleCancelLogout = () => {
    setShowLogoutModal(false)
  }

  // Check if current path is logout and show modal instead of changing URL
  useEffect(() => {
    if (asPath === routes.adminLogout) {
      setShowLogoutModal(true)
      // Redirect back to dashboard without changing the URL
      router.replace(routes.adminDashboard, undefined, { shallow: true })
    }
  }, [asPath, router])

  const componentMap = {
    [routes.adminDashboard]: Dashboard,
    [routes.adminEAssociate]: Massociate,
    [routes.adminLeads]: Leads,
    [routes.projectListing]: ProjectsBuildings,
    [routes.adminPostProject]: PostProject,
    [routes.adminAllUsers]: AllUsers,
    [routes.assignEAssociates]: Assignmassociate,
    [routes.adminDirectListing]: DirectListing,
    [routes.adminDirectLeads]: DirectLeads,
    [routes.verification]: mVerificationTab,
    [routes.adminWebsiteModeration]: WebsiteModeration,
    [routes.adminAppModeration]: AppModeration,
    [routes.bugreportTable]: BugReportTable,
    [routes.adminSettings]: Settings,
  }

  const DynamicText = {
    [routes.adminDashboard]: logoutText.titleCaseDashboard,
    [routes.adminEAssociate]: logoutText.associates,
    [routes.adminLeads]: logoutText.leads,
    [routes.projectListing]: logoutText.projectBuildingName,
    [routes.adminPostProject]: logoutText.postProject,
    [routes.adminAllUsers]: logoutText.allUsers,
    [routes.assignEAssociates]: logoutText.associate,
    [routes.adminDirectListing]: logoutText.directListing,
    [routes.adminDirectLeads]: logoutText.directLeads,
    [routes.verification]: logoutText.superVerification,
    [routes.adminWebsiteModeration]: logoutText.websiteModeration,
    [routes.adminAppModeration]: logoutText.appModeration,
    [routes.bugreportTable]: logoutText.bugreports,
    [routes.adminSettings]: logoutText.settings,
  }

  let currentPath = Object.keys(DynamicText).find((key) => asPath.startsWith(key)) || routes.adminDashboard
  let Component = componentMap[currentPath]

  return (
    <div className=' px-16 py-1'>
      {isDesktop ? (
        <div className="custom-section">
          <TopBar
            label={DynamicText[currentPath]}
            icon={iconListTopBar[currentPath]}
            prefix={prefixText[currentPath]}
          />
          {auth?.token && (
            <OutletLayout sidebar={<SideDashboard arrayMenu={AdminSideDashboard} />}>
              <Component Data={apiData} />
            </OutletLayout>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[80vh] text-center py-8 px-4  text-gray-500 font-poppins">
          <h2 className="mb-2 text-large text-white">This admin panel is only available on desktop screens.</h2>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={showLogoutModal}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </div>
  )
}

const iconListTopBar = {
  [routes.adminEAssociate]: MoresIcon,
  [routes.assignEAssociates]: MoresIcon
}

const prefixText = {
  [routes.adminEAssociate]: logoutText.my,
  [routes.assignEAssociates]: logoutText.assign
}

export default withProtectedRoute(AdminPage, [logoutText.admin])

export async function getServerSideProps({ req, params }) {
  try {
    const { page } = params;
    let apiEndpoint;
    switch (page) {
      case logoutText.dashboard:
        apiEndpoint = routes.adminDashboard;
        break;
      case logoutText.projectBuilding:
        apiEndpoint = routes.projectBuilding;
        break;
      case logoutText.assignEAssociate:
        apiEndpoint = `${routes.filteredListing}?pageNumber=1&size=15&myPage=${logoutText.assignAssociate}`;
        break;
      default:
        apiEndpoint = routes.count
        break;
    }

    const { token, ipaddress, Longitude, ipLatitude, ipLongitude, Latitude, machineid } = req.cookies;

    axios.defaults.headers.common["token"] = token || '';
    axios.defaults.headers.common["ipaddress"] = ipaddress || '';
    axios.defaults.headers.common["latitude"] = Latitude ? Latitude : ipLatitude || '';
    axios.defaults.headers.common["longitude"] = Longitude ? Longitude : ipLongitude || '';
    axios.defaults.headers.common["machineid"] = machineid || '';
    const countResponse = await makeApiRequest(text.getType, `${process.env.NEXT_PUBLIC_API}admin/show-count`, {});
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const apiResponse = await makeApiRequest(text.getType, `${process.env.NEXT_PUBLIC_API}${apiEndpoint}`, {});
    const countData = countResponse?.data?.result || {};
    const apiData = apiResponse?.data?.result || {};
    return { props: { apiData, countData } };
  } catch (error) {
    return { props: { apiData: {}, countData: {} } };
  }
}