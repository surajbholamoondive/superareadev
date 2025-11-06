import Image from 'next/image'
import buyIcon from '../../../assets/moreIcon/buy.svg'
import rentIcon from '../../../assets/moreIcon/rent.svg'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const {allCapitalBuy,allCapitalRent,upForSale,projectText}=GLOBALLY_COMMON_TEXT.text
const Badge = ({ propertyStatus, width, style }) => {
  return (
    <div className="absolute left-[5.3%] max-md:left-[7%] top-0 z-[9]">
      <Image
        src={
          propertyStatus === upForSale || propertyStatus === allCapitalBuy || propertyStatus === projectText ? buyIcon : rentIcon
        }
        width={width || 46}
        height={30}
        alt="For sale and rent property badge-icon"
      />
      <p
        className={`text-center -mt-8 text-white font-bold tracking-wide`}
        style={style}
      >
        {propertyStatus === upForSale || propertyStatus === allCapitalBuy
          ? allCapitalBuy : allCapitalRent}
      </p>
    </div>
  )
}

export default Badge
