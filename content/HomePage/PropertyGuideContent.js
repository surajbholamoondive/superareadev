import overallControlIcon from '../../assets/Images/HomePage/overall-control.svg'
import insuranceIcon from '../../assets/Images/HomePage/insurance.svg'
import comissionIcon from '../../assets/Images/HomePage/lowest-comission.svg'
import priceIcon from '../../assets/Images/HomePage/price-estimation.svg'
import illustrationImage from '../../assets/Images/HomePage/Illustration.svg'

export const PropertyGuideContent = {
    leftPanel: {
      title: 'Key to your new home: Ultimate property buying guide.',
      description: 'Find your dream place to live in with more than 10k+ properties listed.',
      buttonText: 'Download',
      buttonLink: '#',
      image: illustrationImage
    },
    rightPanel: {
      title: 'What sets us unique',
      features: [
        {
          icon: insuranceIcon,
          title: 'Property Insurance',
          description: 'Offers comprehensive property insurance with liability coverage, ensuring your investment is protected and providing you peace of mind.'
        },
        {
          icon: priceIcon,
          title: 'Price Estimation',
          description: 'Delivers precise price estimates based on coverage requirements, property value, and specific risk factors'
        },
        {
          icon: comissionIcon,
          title: 'Lowest Commission',
          description: 'Competitive pricing with the lowest commission rates, ensuring cost-effective solutions for your property investments'
        },
        {
          icon: overallControlIcon,
          title: 'Overall Control',
          description: 'Experience a virtual tour and arrange property viewings prior to purchase or rental, ensuring comprehensive oversight and informed decision-making'
        }
      ]
    }
  }
  