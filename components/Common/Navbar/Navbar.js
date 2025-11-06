import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import navbarContent from '@/content/Navbar'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import {
  ADMIN_TEXT,
  AGENT,
  AGENT_POST_PROJECT_ROUTE,
  INDIVIDUAL_TEXT,
  LOGIN_NOW,
  LOGIN_TOASTER,
  ROOT_LOGIN_ROUTE,
  SELL_AND_RENT_TEXT,
  USER_POST_PROJECT_ROUTE,
} from '@/text'
import DropdownButton from '@/utils/DropdownButton/DropdownButton'
import Notifications from '@/utils/Notifications/Notifications'
import ProfileDropdownButton from '@/utils/ProfileDropdownButton/ProfileDropdownButton'
import WishlistMenuNavbar from '@/utils/WishlistMenuNavbar'
import MoresLogo from '../MoresLogo'
import BurgerMenu from './BurgerMenu'
import MobileMenu from './MobileMenu'
import Styles from './Navbar.module.css'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'


const Navbar = () => {
  const [auth, setAuth] = useAuth()
  const [navbarContentData] = useState(navbarContent)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const router = useRouter()
  const windowWidth = useWindowWidth()
  const { userResult } = auth || {}
  const isLoggedIn = useMemo(() => auth?.userResult !== undefined, [auth])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      if (document.getElementById('navbar')) {
        if (prevScrollPos > currentScrollPos && windowWidth > 768) {
          document.getElementById('navbar').style.top = '0'
        } else {
          document.getElementById('navbar').style.top = '-100px'
        }
        setPrevScrollPos(currentScrollPos)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, windowWidth])
  const pathsWithoutNavbar = [
    '/login',
    '/register',
    '/otp-verify',
    '/register/register-form',
    '/Post-Property-Form',
    '/admin',
  ]

  if (pathsWithoutNavbar.includes(router.pathname)) {
    return null
  }
  let propertyAddPath = ''
  if (auth?.userResult) {
    if (auth.userResult.userType === INDIVIDUAL_TEXT) {
      propertyAddPath = USER_POST_PROJECT_ROUTE
    } else if (auth.userResult.userType === AGENT) {
      propertyAddPath = AGENT_POST_PROJECT_ROUTE
    }
  }
  const handleSellRentClick = () => {
    if (!isLoggedIn) {
      toast.error(LOGIN_TOASTER);
      router.push(ROOT_LOGIN_ROUTE);
    } else {
      router.push(propertyAddPath);
    }
  };

  const handleLoginClick = () => {
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
      Cookies.set("username", enteredUsername, { expires: 1 });
      Cookies.set("password", enteredPassword, { expires: 1 });

      setAuth({
        token: 'dummy-token',
        userResult: { userType: INDIVIDUAL_TEXT },
      });
      router.push(ROOT_LOGIN_ROUTE);
    }
  };

  return (
    <>

      <div
        className={`${Styles.navbar} `} id="navbar">
        <div className={`${Styles.navbarContainer}`}>
          <div
            className={`flex md:justify-between lg:justify-between ${Styles.outerDiv}`}
          >
            <div className=" flex items-center max-lg:hidden justify-between py-1 ">
              <div className="w-[155px] ml-4">
                <MoresLogo />
              </div>
              {(userResult?.userType !== ADMIN_TEXT && auth?.token) && (
                <div className={`flex justify-evenly ml-10 `}>
                  {Object.keys(navbarContentData).map((content, index) => (
                    <div className={Styles.optionName} key={index}>
                      <DropdownButton
                        optionName={content}
                        menuItem={navbarContentData[content]}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex w-fit justify-between max-md:hidden md:none lg:hidden">
              {userResult?.userType !== ADMIN_TEXT && <BurgerMenu />}
              <div className="w-[150px] ml-2">
                <MoresLogo />
              </div>
            </div>

            <div className="md:w-[350px]">
              {!isLoggedIn && !auth?.token ? (
                <div className="flex justify-end absolute right-10 top-2">
                  <button className={Styles.button} onClick={handleLoginClick}>
                    {LOGIN_NOW}
                  </button>
                </div>
              ) : (
                <div className="flex absolute right-10 ">
                  {userResult?.userType !== ADMIN_TEXT && (
                    <>
                      <Link href={propertyAddPath}>
                        <button
                          className={`mr-1 md:mt-[8px] lg:mt-[10px]  ${Styles.sellRentButton} `}
                        >
                          {SELL_AND_RENT_TEXT}
                        </button>
                      </Link>
                      <div className="w-[40px]  cursor-pointer">
                        <WishlistMenuNavbar />
                      </div>
                      <div className="w-[40px] -mt-2 cursor-pointer">
                        <Notifications />
                      </div>
                    </>
                  )}
                  {userResult?.userType == ADMIN_TEXT ? (
                    <h3 className="mt-2">{userResult?.firstName}</h3>
                  ) : (
                    <div
                      className={`${Styles.divName} ${userResult?.profileImage && userResult?.profileImage.trim() !== ""
                          ? Styles.divNameUploaded
                          : Styles.divNameDefault
                        }`}
                    >
                      <div className={Styles.name}>
                        <ProfileDropdownButton />
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden  md:px-4 py-4">
        <MobileMenu />
      </div>
    </>
  )
}
export default Navbar
