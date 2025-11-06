import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MailIcon from '@/assets/ColorChangeIcons/EmailIcon/EmailIcon'
import footerContent from '@/content/Footer'
import useWindowWidth from '@/context/useWindowWidth'
import { FOOTER_TEXT } from '@/textV2'

import addressIcon from '../../../assets/FooterIcons/location.svg'
import phoneIcon from '../../../assets/FooterIcons/phone.svg'
// import footerLogo from '../../../assets/logo/inverted-logo.svg'
import footerLogo from '../../../assets/logo/main-logo.svg'
import Styles from './Footer.module.css'
import MobileFooter from './MobileFooter'

const {
  adminRoute,
  liveCameraRoute,
  otpVerifiedRoute,
  registerAsRoute,
  loginRoute,
  rootRegisterRoute,
} = FOOTER_TEXT.routes

const Footer = () => {
  const router = useRouter()
  const windowWidth = useWindowWidth()
  const { social, tagLine, address, mobile, email, content, copyRight } =
    footerContent
  const pathsWithoutFooter = [
    loginRoute,
    rootRegisterRoute,
    otpVerifiedRoute,
    registerAsRoute,
    adminRoute,
    liveCameraRoute,
    '/screen/room',
    '/chatbot',
  ]

  if (pathsWithoutFooter.includes(router.pathname)) return null

  const currentYear = new Date().getFullYear()
  return (
    <section id="footer" className=" pb-2">
      <div className="max-md:mb-12 max-2xl:px-1 w-[93%] lg:w-[93%] custom-section">
        <div className={`text-primary ${Styles.footer} p-2`}>
          <div className="mx-auto px-2 md:px-10">
            {windowWidth > 768 ? (
              <div className="flex flex-wrap justify-between gap-8">
                {/* Left section */}
                <div className="w-full md:w-[60%]">
                  <Link href="/">
                    <Image
                      src={footerLogo}
                      alt="Company logo"
                      width={143}
                      height={36}
                      className="mb-4"
                    />
                  </Link>
                  <h2 className="text-primary mb-4 font-black">{tagLine}</h2>
                  <div className="flex space-x-4 mb-6 items-center">
                    {social.map(({ icon, link }, index) => (
                      <a
                        key={index}
                        href={link || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <Image
                          src={icon}
                          alt="Social icon"
                          width={24}
                          height={24}
                        />
                      </a>
                    ))}
                  </div>

                  <ul className="flex flex-wrap gap-x-6">
                    {content[0].headContent.map(({ name, path }, index) => (
                      <li key={index}>
                        <a href={path}>{name}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right section */}
                <div className="w-full md:w-[35%] flex flex-col justify-end space-y-4 mb-5">
                  <div className="flex items-start">
                    <Image
                      src={addressIcon}
                      alt="Address icon"
                      width={16}
                      height={16}
                      className="mt-1 mr-3 text-featureText"
                    />
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm leading-snug text-featureText line-clamp-2"
                    >
                      {address}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    <MailIcon color="#5f5f5f" className="w-4 h-4" />
                    <Link
                      href={`mailto:${email}`}
                      className="text-featureText text-sm break-all"
                    >
                      {email}
                    </Link>
                  </div>

                  <div className="flex items-center">
                    <Image
                      src={phoneIcon}
                      alt="Phone icon"
                      width={16}
                      height={16}
                      className="mr-3"
                    />
                    <Link
                      href={`tel:${mobile}`}
                      className="text-sm text-featureText"
                    >
                      {mobile}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <MobileFooter />
            )}

            {/* Bottom row */}
            <div className="mt-10 pt-6 border-t border-primary flex flex-col md:flex-row justify-between gap-4">
              <div className="hidden md:block">
                <ul className="flex flex-wrap gap-x-6">
                  {content[1].headContent.map(({ name, path }, index) => (
                    <li key={index}>
                      <Link href={path || '#'} className="text-sm">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-featureText text-sm text-center md:text-right">
                ©{currentYear} {copyRight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
