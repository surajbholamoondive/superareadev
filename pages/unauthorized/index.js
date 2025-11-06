import Image from 'next/image'
import Link from 'next/link'
import error from '@/assets/Images/error/403-error.svg'
import { useAuth } from '@/context/auth'
import Styles from '@/pages/error.module.css'


import { GLOBALLY_COMMON_TEXT, OTHER_PAGES_TEXT } from '@/textV2'
const {error403,unauthorized,goToHomepage,unauthorizedMessage}=OTHER_PAGES_TEXT.unauthorised
const {text,routes,buttons,symbols}=GLOBALLY_COMMON_TEXT
function Unauthorized() {
  const [auth] = useAuth()
  const userType = auth?.userResult?.userType
  return (
    <div className={`${Styles.wrapper}`}>
      <div className={`pb-[2%] max-md:flex-col ${Styles.errorcontainer}`}>
        <div>
          <Image
            className="h-[430px] w-[770px] min-h-[300px] max-md:h-[150px] min-w-[220px]"
            src={error}
            alt="403 error image"
          />
        </div>
        <div className="flex flex-col p-[5%] justify-center">
          <h1 className="text-[35px]">{error403}</h1>
          <h1 className="text-[35px]">{unauthorized}</h1>
          <hr className="bg-black h-[3px] w-[87.25%] mb-4" />
          <div className="w-[87.25%]">
            <p className={Styles.text}>{unauthorizedMessage}</p>
          </div>
          <div className="flex gap-4 mt-4 items-center">
            {userType === text.adminText ? (
              <Link href={routes.adminDashboardRoute}>
                <button
                  className={Styles.btn}
                  style={{
                    backgroundColor: '#931602',
                    border: '#931602 solid black',
                  }}
                >
                  {buttons.goBackButton}
                </button>
              </Link>
            ) : (
              (userType === text.agentText || userType===text.individualText || userType ===undefined) && (
                <Link href={symbols.slash}>
                  <button
                    className={Styles.btn}
                    style={{
                      backgroundColor: '#931602',
                      border: '#931602 solid black',
                    }}
                  >
                    {goToHomepage}
                  </button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Unauthorized
