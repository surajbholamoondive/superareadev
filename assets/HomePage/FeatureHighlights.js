import SuperScoreIllustration from '@/assets/NonLoggedUserImages/SuperVerification.svg'
import SuperScoreHomepage from '@/assets/Images/HomePage/SuperScoreHomepage.svg'
import SuperVerificationIllustration from '@/assets/NonLoggedUserImages/SuperScore.svg'
import SuperAreaShield from '@/assets/logo/verification-logo.svg'
import eEstimateIllustration from '@/assets/NonLoggedUserImages/SuperEstimate.svg'
import eEstimateHomePage from '@/assets/Images/HomePage/eEstimateHomePage.svg'

const FeatureHighlights = {
  "card1": {
    "image": SuperVerificationIllustration,
    "imagePosition": "left",
    "preHeading": "Introducing",
    "heading": "SuperScore",
    "bulletPoints": [
      {
        strong:'Project & Builder Reputation',
        content:'Considers the builder’s credibility, construction quality, and key facilities like parking, gym, security, and overall project reliability.'
      },
      {
        strong:'Market Value & Investment Potential',
        content:'Considers the builder’s credibility, construction quality, and key facilities like parking, gym, security, and overall project reliability.'

      },
      {
        strong:'Prime Location & Accessibility',
        content:'Analyses proximity to hospitals, schools, transport links, and commercial hubs, ensuring convenience and a high-value investment.'
      },
    ],
    "button": {
      "text": "Read more",
      "url": "/faqs/super-score"
    },
    "icon": SuperScoreHomepage
  },
  "card2": {
    "image": SuperScoreIllustration,
    "imagePosition": "right",
    "preHeading": "Introducing",
    "heading": "SuperVerification",
    "bulletPoints": [
      {
        strong:'Verified & Trustworthy Listings',
        content:'SuperVerification guarantees that every property listing on our platform is authentic, accurate, and free from misleading information, giving buyers confidence in their decisions.'
      },
      {
        strong:'Revolutionizing Online Property Sales',
        content:'By ensuring listing reliability and transparency, we make online property transactions seamless, secure, and more efficient for both buyers and sellers.'

      },
      {
        strong:'Authenticity Checks for Real Estate Data',
        content:'Our advanced verification process validates property details, ownership records, and legal documentation, ensuring you get only verified real estate listings.'
      },    ],
    "button": {
      "text": "Read more",
      "url": "/faqs/super-verification"
    },
    "icon": SuperAreaShield
  },
  "card3": {
    "image": eEstimateIllustration,
    "imagePosition": "left",
    "preHeading": "Introducing",
    "heading": "SuperEstimate",
    "bulletPoints": [
      {
        strong:'AI & Machine Learning for Accurate Home Valuation',
        content:'SuperEstimate harnesses artificial intelligence and machine learning to analyse  local real estate trends, recent sales data, and market fluctuations to deliver the most precise home value estimates.'
      },
      {
        strong:'Real-Time Market Adaptation',
        content:'SuperEstimate continuously tracks neighbourhood price shifts, demand trends, and comparable home sales, improving its predictions as the market evolves.'

      },
      {
        strong:'Comparable Sales & Investment Potential',
        content:'By evaluating similar properties sold in the area, it helps homeowners, buyers, and investors make data-backed real estate decisions and assess long-term property value growth.'
      },   
    ],
    "button": {
      "text": "Read more",
      "url": "/faqs/super-estimate"
    },
    "icon": eEstimateHomePage
  }
};

export default FeatureHighlights;
