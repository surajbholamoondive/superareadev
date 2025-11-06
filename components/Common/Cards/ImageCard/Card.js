import { useState } from 'react'
import Image from 'next/image'
import amoebaButton from '../../../../assets/ButtonIcons/amoebaButton.svg'
import Styles from './Card.module.css'
import Link from 'next/link'

const ImageCard = ({ name, imageSrc, link }) => {
  const [loading] = useState(false)
  return (
    <div
      className={`cursor-default w-[85%] md:w-[50%] lg:w-[29.8%] h-[280px] md:h-[310px] lg:h-[320px] ${Styles.card}  mr-10`}
    >
      <Link
    href={link}
    className="cursor-pointer"
  >
      <Image
        src={imageSrc}
        alt="services offered by real estate, Real estate listings, property for sale, property for rent, Real Estate Investment Opportunities"
        width={2000}
        height={1200}
        className={Styles.image}
        loading="lazy"
      />
      </Link>
      <Link
        href={link}
        className="text-[14px] md:text-[16px] font-semibold absolute -bottom-8 left-5 cursor-pointer"
      >
        <Image
          src={amoebaButton}
          alt="Find Out More Details, Click for more details"
          width={200}
          height={72}
          className="w-[130px] md:w-[160px]"
        />
        <h2 className={Styles.name}>{loading ? WAIT : name}</h2>
      </Link>
    </div>
  )
}

export default ImageCard
