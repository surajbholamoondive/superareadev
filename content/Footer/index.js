import facebookIcon from '../../assets/socialIcons/facebook.svg'
import twitterIcon from '../../assets/socialIcons/twitter.svg'
import linkedIcon from '../../assets/socialIcons/linkedIn.svg'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
import IgIcon from '../../assets/socialIcons/instagram.svg'

const { adminEmail, adminMobile,adminAddress } = GLOBALLY_COMMON_TEXT.text;

const footerContent = {
  tagLine:
    'India’s First AI driven Real Estate Platform',
  address:adminAddress,
  email: adminEmail,
  mobile: adminMobile,
  copyRight: 'SuperArea.ai. All rights reserved.',
  content: [
    {
      heading: 'Quick Links',
      headContent: [
        {
          name: 'Properties',
          path: '/search-result?status=active',
        },
        {
          name: 'About us',
          path: '/about',
        },
        {
          name: 'Contact us',
          path: '/contact-us',
        },
        {
          name: 'FAQs',
          path: '/faqs',
        },
      ],
    },
    {
      heading: 'About',
      headContent: [
        // {
        //   name: 'Career',
        //   path: '/career',
        // },
        {
          name: 'Terms & Conditions',
          path: '/terms-and-conditions',
        },
        {
          name: 'Privacy Policy',
          path: '/privacy-policy',
        },
        {
          name: 'Blogs',
          path: '/blogs',
        },
        {
          name: 'Testimonials',
          path: '/testimonials',
        },
      ],
    },
  ],

  social: [
    {
      icon: facebookIcon,
      link: 'https://www.facebook.com/profile.php?id=61580240940703',
    },
    {
      icon: twitterIcon,
      link: 'https://x.com/superarea_ai',
    },
    {
      icon: IgIcon,
      link: 'https://www.instagram.com/superarea.ai/',
    },
    {
      icon: linkedIcon,
      // link: '/',
    }
  ],
}

export default footerContent