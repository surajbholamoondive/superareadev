import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/auth'
import errorImg from '@/assets/404.png'
import arrow from '@/assets/right-arrow.png'
import BackgroundImage from '../assets/NonLoggedUserImages/backgroundImage.svg';
import { GLOBALLY_COMMON_TEXT, OTHER_PAGES_TEXT } from '@/textV2'
const { text, routes, symbols } = GLOBALLY_COMMON_TEXT
const { lookingForSomething, webAddressError, backToHomepage, backToDashboard } = OTHER_PAGES_TEXT.error404Page
function Error() {
  const [auth] = useAuth()
  const userType = auth?.userResult?.userType

  const links = [
    { name: 'Super AI', href: '/chatbot' },
    { name: 'SuperVerification', href: 'faqs/super-verification' },
    { name: 'SuperEstimate', href: 'faqs/super-estimate' },
    { name: 'SuperScore', href: '/faqs/super-score' }
  ];
  return (
    <div className="p-6"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <div className={"custom-section w-[100%] lg:w-[95%]"}>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen bg-white px-6 lg:px-16">
          <div className="lg:w-[40%] flex flex-col space-y-4 text-left">
            <h1 className="text font-bold text-newBackground">Oops!</h1>
            <h2 className="text text-newBackground  md:text-4xl text-2xl">
              Looking for something?
            </h2>
            <p className="text-gray-600 text-sm">
              Sorry, the page you are looking for doesn’t exist or has been moved. Here are some helpful links:
            </p>

            <ul className="space-y-2">
              {links.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Link
                    href={item.href}
                    className="
          flex items-center gap-2 font-bold transition-all duration-300 
          rounded-md px-2 py-1 text-gray-700 
          hover:text-newBackground  focus:text-newBackground outline-none
        "
                  >
                    {item.name}
                    <Image
                      src={arrow}
                      alt="arrow"
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className='flex justify-center md:justify-start'>
              <Link
                href="/"
                className=" w-full md:w-[40%] text-center mt-4 inline-block border border-newBackground text-newBackground px-4 py-2 rounded-full hover:bg-newBackground hover:text-white transition "
              >
                Back to Homepage
              </Link>
            </div>
          </div>
          <div className="lg:w-[60%] flex justify-center items-center ">
            <Image
              src={errorImg}
              alt="404 Error"
              className=" w-full md:h-[550px] h-[350px] object-contain "
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Error
