import Insurance from '../../assets/NonLoggedUserImages/Insurance.svg'
import Estimation from '../../assets/NonLoggedUserImages/Estimation.svg'
import LowestCommission from '../../assets/NonLoggedUserImages/Lowest Commission.svg'
import OverallControl from '../../assets/NonLoggedUserImages/Overall Control.svg'
import SuperEstimate from '../../assets/NonLoggedUserImages/SuperEstimate.svg'
import SuperScore from '../../assets/NonLoggedUserImages/SuperScore.svg'
import SuperVerification from '../../assets/NonLoggedUserImages/SuperVerification.svg'
import SuperScoreLogo from '../../assets/NonLoggedUserImages/SuperScoreLogo.svg'
import SuperVerificationLogo from '../../assets/NonLoggedUserImages/SuperVerificationLogo.svg'
import SuperEstimateLogo from '../../assets/NonLoggedUserImages/SuperEstimateLogo.png'

export const UNIQUE_DATA = [
  {
    image: Insurance,
    alt: 'Insurance',
    heading: 'Assured Properties',
    description: 'Secure your property with trusted assurance that ensures long-term value, stability, and peace of mind—offering complete protection, confidence, and care for everything you’ve built and everything still to come. Ideal for fractional-time properties and reference homes that demand consistent reliability',
  },
  {
    image: Estimation,
    alt: 'Price Estimation',
    heading: "Total Control",
    description: 'Walk through properties with interactive 360° and 3D virtual tours, and arrange viewings prior to purchase or renting—granting total control and facilitating intelligent decisions. Suitable for remote inspection of reference homes and important properties.',
  },
  {
    image: LowestCommission,
    alt: 'Lowest Commission',
    heading: 'Minimum Commission',
    description: 'Get competitive rates with low commission charges, offering cost-effective solutions that bring value to your real estate investments. Get unlimited options within your means and goals.',
  },
  {
    image: OverallControl,
    alt: 'Overall Control',
    heading: 'All inclusive support',
    description: 'From the first contact to the last handover, enjoy effortless, bespoke service at every step of your property search. Our attentive care guarantees a hassle-free, well-advised experience for both buyers and tenants.',
  }
]
export const WHAT_MAKES_SUPERAREA_STANDOUT = [
  {
    image: SuperScore.src,
    alt: "SuperScore",
    heading: "SuperScore",
    logo: SuperScoreLogo,
    descriptionList: [`SuperScore is consolidated metric that reflects a property’s value through multiple assessment criteria.`, `
Reviews builder credibility, project standards, essential features, and property conditions.`, `Validates the accuracy, quality of property and provides detailed information.`]
  },
  {
    image: SuperVerification.src,
    alt: "SuperVerification",
    logo: SuperVerificationLogo,
    heading: "SuperVerification",
    descriptionList: [`SuperVerification is a reliable tool ensuring accurate, trustworthy and authenticated property listing.`, `Enhanced transparency in transactions, creating a more credible and reliable market place for users.`, `Offers a dependable method for authenticating information and ensuring data integrity.`]
  },
  {
    image: SuperEstimate.src,
    alt: "SuperEstimate",
    logo: SuperEstimateLogo,
    heading: "SuperEstimate",
    descriptionList: [`SuperEstimate leverages Al and machine learning to value properties accurately by analysing local sales data and adapting to market changes.`, `SuperEstimate helps in making informed decisions by offering reliable and detailed property value insights.`, `Adapt to market shifts, ensuring up- to-date and reliable valuations.`]
  }
]