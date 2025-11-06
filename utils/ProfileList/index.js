import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import {
  ADMIN_ROUTE,
  ADMIN_TYPE,
  AGENT,
  ENQUIRES,
  HOME_ROUTE,
  IS_ADMIN_LOGIN,
  IS_LOGIN,
  RECIEVED,
  USER_LOGOUT,
  USER_LOGOUT_ROUTE,
} from '@/text'
import axios from 'axios'
import Cookies from 'js-cookie'

import assignAssociates from '../../assets/MenuIcons/ProfileDropdown/assign associates.svg'
import assignmentIcon from '../../assets/MenuIcons/ProfileDropdown/assignmentIcon.svg'
import groupIcon from '../../assets/MenuIcons/ProfileDropdown/Group 1171278614.svg'
import listIcon from '../../assets/MenuIcons/ProfileDropdown/icons_list-box.svg'
import logoutIcon from '../../assets/MenuIcons/ProfileDropdown/logout.svg'
import postIcon from '../../assets/MenuIcons/ProfileDropdown/post-add.svg'
import profileIcon from '../../assets/MenuIcons/ProfileDropdown/profile.svg'
import activities from '../../assets/MenuIcons/ProfileDropdown/ri_time-line.svg'
import mverification from '../../assets/M-verification/mverification.svg'
import MoresIcon from '../../assets/logo/logo-icon.svg'
import enquiriesIcon from '../../assets/userDashboard/enquiriesIcon.svg'
import { setLocalStorageItem } from '../utils'
import Styles from './index.module.css'

const ProfileList = ({onClose}) => {
  const [auth, setAuth] = useAuth()
  const router = useRouter()
  const userType = auth?.userResult?.userType

  const handleLogout = async () => {
    const body = {
      sessionExitStatus: USER_LOGOUT,
    }
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API}${USER_LOGOUT_ROUTE}/${auth?.userResult?._id}`,
      body
    )
    if (response) {
      localStorage.removeItem(`wishlist-${auth?.userResult?._id}`)
      localStorage.removeItem('auth')
      localStorage.removeItem('formSubmittedEmail')
      setLocalStorageItem(IS_LOGIN, 'false')
      setLocalStorageItem(IS_ADMIN_LOGIN, 'false')
      Cookies.remove('token')
      setAuth({
        user: null,
        token: '',
        refreshToken: '',
      })
      if (userType === ADMIN_TYPE) {
        router.push(ADMIN_ROUTE)
        return
      } else {
        router.push(HOME_ROUTE)
        return
      }
    }
  }
  const getProfileLink = (path) => {
    if (auth?.userResult?.userType === AGENT) {
      return `/agent/${path}`
    } else {
      return `/user/${path}`
    }
  }
  const userLinks = [
    {
      label: 'Profile',
      path: getProfileLink('profile'),
      icon: profileIcon,
      iconWidth: '30px',
    },
    {
      label: 'My Activities',
      path: getProfileLink('activity'),
      icon: activities,
      iconWidth: '30px',
    },
    {
      label: 'Post Property',
      path: getProfileLink('post-property'),
      icon: postIcon,
      iconWidth: '30px',
    },
    {
      label: 'My Listings',
      path: getProfileLink('listing'),
      icon: listIcon,
      iconWidth: '30px',
    },
    {
      label: (
        <div className='flex gap-1'>
          <div>{ENQUIRES}</div>
          <div>{RECIEVED}</div>
        </div>
      ),
      path: getProfileLink(
        'enquiries-received'
      ),
      icon: enquiriesIcon,
      iconWidth: '30px',
    },
    {
      label: 'Associates',
      path: getProfileLink('super-associate'),
      icon: assignmentIcon,
      iconWidth: '30px',
      labelIcon: MoresIcon,
    },
    { label: 'Logout', path: '/', icon: logoutIcon, iconWidth: '30px' },
  ]

  const agentLinks = [
    {
      label: 'Profile',
      path: getProfileLink('profile'),
      icon: profileIcon,
      iconWidth: '30px',
    },
    {
      label: 'My Listings',
      path: getProfileLink('listing'),
      icon: listIcon,
      iconWidth: '30px',
    },
    {
      label: 'Assigned Listings',
      path: getProfileLink('assigned-listing'),
      icon: assignAssociates,
      iconWidth: '30px',
    },
    {
      label: 'S-Verification',
      path: getProfileLink('e-verification'),
      icon: mverification,
      iconWidth: '30px',
    },
    {
      label: 'Leads',
      path: getProfileLink('leads?activity=enquired&pageNumber=1&pageSize=10&listingtype=My+Listings'),
      icon: groupIcon,
      iconWidth: '30px',
    },
    {
      label: 'Post Property',
      path: getProfileLink('post-property'),
      icon: postIcon,
      iconWidth: '30px',
    },
    { label: 'Logout', path: '/', icon: logoutIcon, iconWidth: '30px' },
  ]

  const links = auth?.userResult?.userType === 'Agent' ? agentLinks : userLinks
  return (
    <div className={`w-[200px] ml-4 -mt-2 -mb-2 ${Styles.mainDiv}`} onClick={onClose}>
      {links.map((link, index) => (
        <Link href={link.path} key={index}>
          <div
            className={`flex my-3 ${Styles.singleDiv}`}
            onClick={link.label === 'Logout' ? handleLogout : null}
          >
            <div className={Styles.iconDiv}>
              <Image
                src={link.icon}
                alt={link.label}
                className="m-auto"
                width={20}
              />
            </div>
            <div className='w-[150px] mt-3 text-sm'>{link.label}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProfileList
