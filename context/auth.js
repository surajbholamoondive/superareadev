import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchIPData, getGeolocationData, initializeTracking } from "@/helper/tracking";
import { GLOBALLY_COMMON_TEXT, LOGIN_PAGE, } from '@/textV2'
const { islogin, isAdminLogin, userNotFound } = LOGIN_PAGE.text
const { routes, text } = GLOBALLY_COMMON_TEXT
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userResult: null,
    token: "",
    sessionId: "",
  });
  const [loading] = useState(false);

  const getProfile = async () => {
    if (auth?.token === 'undefined') {
      return
    }
    let token = Cookies.get("token")
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}${routes.userGetProfileRoute}`,
      {
        headers: {
          token: `${token}`,
        },
      }
    )
    if (data === userNotFound) {
      localStorage.setItem(islogin, 'false');
    }
    if (data?.message === text.jwtExpiredText) {
      const body = {
        sessionExitStatus: text.autoLogout,
      }
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API}${routes.userLogoutroute}${userResult?.userResult._id}`,
        body
      )
      if (response) {
        localStorage.removeItem(`wishlist-${auth?.userResult?._id}`)
        Cookies.remove('token')
        return localStorage.removeItem('auth')
      }
    }
    setAuth({
      userResult: data.result,
      token: Cookies.get("token")
    })
  }

  const getSessionTrackingInfo = async () => {
    const trackingData = initializeTracking()
    fetchIPData()
    getGeolocationData()
  }

  useEffect(() => {
    getProfile()
    getSessionTrackingInfo()
  }, []);

  axios.defaults.headers.common["token"] = auth?.token;
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {loading ? (
        <div
          className="text-5xl text-[#931602] text-center"
          style={{ marginTop: '40vh' }}
        >
          {text.loadingText}
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
