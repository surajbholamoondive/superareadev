import Link from 'next/link';
import Styles from './index.module.css';
import Image from 'next/image';
import { makeApiRequest, setLocalStorageItem } from '@/utils/utils';
import {
  HOME_ROUTE,
  IS_ADMIN_LOGIN,
  IS_LOGIN,
  PUT_REQ,
  REDIRECT,
  USER_LOGOUT,
  USER_LOGOUT_ROUTE
} from '@/text';
import { useAuth } from '@/context/auth'
import { ADMIN_TEXT } from '@/text'
import logoImage from '../../../assets/logo/main-logo.svg'
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

const MoresLogo = () => {
  const [auth, setAuth] = useAuth()
  const { userResult } = auth || {}
  const router = useRouter();

  const handleLocal = async () => {
    if (!userResult?.isAccountVerified) {
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

    } else {
      setLocalStorageItem(REDIRECT, '')
    }
  }
  return (
    <div className={Styles.navLogo} onClick={handleLocal}>
      {userResult?.userType !== ADMIN_TEXT ? (
        <Link href="/">
          <Image src={logoImage} alt="estrata-Logo icon, real estate icon" width={163} />
        </Link>
      ) : (
        <Image src={logoImage} alt="estrata-Logo icon, real estate icon" width={163} />
      )}
    </div>
  )
}
export default MoresLogo
