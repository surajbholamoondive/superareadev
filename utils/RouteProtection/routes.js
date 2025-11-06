import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import Loading from '@/pages/loading';
import { ROOT_LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from '@/text';
const withProtectedRoute = (WrappedComponent, allowedRoles) => {
  const Wrapper = (props) => {
    const router = useRouter()
    const [auth] = useAuth()
    const [isAuth,setIsAuth]=useState(false)
    useEffect(() => {
      if(auth?.token === ''){
        return
      }
      if (!allowedRoles.includes(auth?.userResult?.userType)) {
          router.push(UNAUTHORIZED_ROUTE) 
      } else if (auth?.userResult === ''){
        router.push(ROOT_LOGIN_ROUTE)
      }
      else{
        setIsAuth(true)
      }
    }, [auth]);
    return isAuth ? (<WrappedComponent {...props} />) : <Loading/>
  };
  return Wrapper
};
export default withProtectedRoute