import Styles from './topbar.module.css'
import Image from 'next/image';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
const { capitalizeRentText, upForRent, upForSale, buyText, commercialText, rentResidentialText, rentCommercialText, buyResidentialText, buyCommercialText, newProjectText, searchResultText, residentialText } = GLOBALLY_COMMON_TEXT.text
const TopBar = ({ label, prefix, icon, currentPath, propertyType, propertySubType, possessionStatus }) => {

  let displayedText;

  if (label === upForRent) {
    if (propertyType == residentialText) { displayedText = rentResidentialText }
    else if (propertyType == commercialText) { displayedText = rentCommercialText }
    else {
      displayedText = capitalizeRentText;
    }

  } else if (label === upForSale) {
    if (propertyType == residentialText) { displayedText = buyResidentialText }
    else if (propertyType == commercialText) { displayedText = buyCommercialText }
    else {
      displayedText = buyText;
    }
  } else {
    if (label) { displayedText = label }
    else if (propertySubType) { displayedText = propertySubType }
    else if (possessionStatus) {
      displayedText = newProjectText;
    }
    else {
      displayedText = searchResultText;
    }
  }



  return (
    <div className={`relative bg-cover bg-center text-white text-center brightness-[1] h-16 ${Styles.image}`}>
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-xl md:text-3xl font-semibold text-white md:p-1 md:px-2 z-10">{prefix}</h1>
        {icon &&
          <Image
            src={icon}
            width={25}
            height={10}
            alt='MORES, real estate'
          />
        }
        <h1 className="text-2xl md:text-3xl font-semibold text-white p-1 px-2 z-10">
          {displayedText}
        </h1>
      </div>
    </div>
  );
};
export default TopBar