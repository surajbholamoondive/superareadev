import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/auth'
import {
  AGENT,
  AGENT_POST_PROJECT_ROUTE,
  HOME_TEXT,
  INDIVIDUAL_TEXT,
  LOGIN_TOASTER,
  NOTIFICATION,
  ROOT_LOGIN_ROUTE,
  SELL_RENT_TEXT,
  USER_POST_PROJECT_ROUTE,
} from '@/text'
import ProfileDropdownButton from '@/utils/ProfileDropdownButton/ProfileDropdownButton'
import WishlistMenuNavbar from '@/utils/WishlistMenuNavbar'
import Notification from '@/utils/Notifications/Notifications'
import bottomHome from '../../../../assets/MenuIcons/BottomMenu/Home.svg'
import bottomSellRent from '../../../../assets/MenuIcons/BottomMenu/sellRent.svg'
import MoresLogo from '../../MoresLogo'
import Styles from './index.module.css'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const MobileMenu = () => {
  const [auth, setAuth] = useAuth()
  const [wishlistDrawer, setWishlistDrawer] = useState(false)
  const [notificationDrawer, setNotificationDrawer] = useState(false)
  const { notification } = auth?.userResult || {}
  const isLoggedIn = useMemo(() => auth?.userResult !== undefined, [auth])
  const router = useRouter()

  const toggleWishlistDrawer = () => {
    setWishlistDrawer(!wishlistDrawer)
  }

  const toggleNotificationDrawer = () => {
    setNotificationDrawer(!notificationDrawer)
  }

  let propertyAddPath = () => {
    if (auth?.userResult) {
      if (auth.userResult.userType === INDIVIDUAL_TEXT) {
        propertyAddPath = USER_POST_PROJECT_ROUTE
      } else if (auth.userResult.userType === AGENT) {
        propertyAddPath = AGENT_POST_PROJECT_ROUTE
      }
      if (!isLoggedIn) {
        toast.error(LOGIN_TOASTER);
        router.push(ROOT_LOGIN_ROUTE);
      } else {
        router.push(propertyAddPath);
      }
    }

  }

  const handleLoginClick = () => {
    // Check if credentials are already stored in cookies
    const storedUsername = Cookies.get("username");
    const storedPassword = Cookies.get("password");

    if (storedUsername === "Guest" && storedPassword === "SuperArea.ai") {
      setAuth({
        token: 'dummy-token',
        userResult: { userType: INDIVIDUAL_TEXT },
      });
      router.push(ROOT_LOGIN_ROUTE);
      return;
    }

    const enteredUsername = window.prompt('Enter Username:');
    const enteredPassword = window.prompt('Enter Password:');

    if (enteredUsername === 'Guest' && enteredPassword === 'SuperArea.ai') {
      // Save valid credentials in cookies
      Cookies.set("username", enteredUsername, { expires: 1 }); // Cookie expires in 1 day
      Cookies.set("password", enteredPassword, { expires: 1 });

      setAuth({
        token: 'dummy-token',
        userResult: { userType: INDIVIDUAL_TEXT },
      });
      router.push(ROOT_LOGIN_ROUTE);
    }
  };

  return (
    <div >
        <div className='px-2 '>

      <div className={`w-[100%]  ${Styles.mobileNavbar} bg-white rounded-xl z-[1100]`}>
          <div className="flex h-[55px] m-auto justify-between items-center px-4" id="navbar">
            <div className="w-[140px] flex items-center">
              <MoresLogo />
            </div>
            {!auth?.userResult ? (
              <div className="text-center hover:opacity-95 flex items-center">
                <button className={Styles.button} onClick={handleLoginClick}>Login</button>
              </div>
            ) : (
              <div className="flex items-center">
                <ProfileDropdownButton />
              </div>
            )}
          </div>
        </div>
  </div>
        <div className="fixed bottom-0 z-[1100] w-[100vw] h-[50px] pt-[9px] bg-white flex  font-semibold justify-evenly tracking-wide shadow-lg shadow-gray-950">
          <div className='w-[70px] flex flex-col items-center justify-center'>
            <Link href="/">
              <Image
                src={bottomHome}
                width={18}
                height={20}
                className={`m-auto mb-1 ${Styles.icons}`}
                alt="Mores home text, real estate"
              />
              {HOME_TEXT}
            </Link>
          </div>
          <div className='w-[75px] flex flex-col items-center justify-center'>
            <div onClick={propertyAddPath}>
              <Image
                src={bottomSellRent}
                width={18}
                height={20}
                className="m-auto mb-1"
                alt="Mores properties and projects Sell and rent"
              />
              <p>{SELL_RENT_TEXT}</p>
            </div>
          </div>
          <div className='w-[70px] -mt-[14px] flex flex-col justify-center items-center'>
            <div onClick={toggleWishlistDrawer}>
              <WishlistMenuNavbar
                setWishlistDrawer={setWishlistDrawer}
                wishlistDrawer={wishlistDrawer}
              />
              <p className=" mt-[2px] text-black  normal-case">
                Wishlist
              </p>
            </div>
          </div>
          <div className=' w-[70px] -mt-[5px] flex flex-col justify-center items-center'>
            <div onClick={toggleNotificationDrawer} >
              <div className='ps-[12px]'><Notification setNotificationDrawer={setNotificationDrawer} notificationDrawer={notificationDrawer} /></div>
              <p className=" mt-[2px]  text-black normal-case">
                {NOTIFICATION}
              </p>
            </div>
          </div>
        </div>
    
    </div>


  )
}

export default MobileMenu
