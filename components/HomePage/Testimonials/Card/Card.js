import Image from 'next/image'
import Styles from './Card.module.css'
import { HOME_PAGE_TEXT } from '@/textV2'
const{fromText,postedOnText}=HOME_PAGE_TEXT.testimonials
const Card = ({ description }) => {
  function formatDateToDDMMYYYY(originalDateString) {
    const dateObject = new Date(originalDateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()
    return `${day}-${month}-${year}`
  }
  return (
    <div className={`w-[75%] mx-5 md:w-[45%] md:mx-5 bg-black  ${Styles.card}`}>
      <div className={Styles.imageNameDiv}>
        <Image
          src={description.profileImage}
          alt="Real estate client reviews, satisfied clients, Client stories"
          width={60}
          height={60}
          className={Styles.image}
        />
        <h2 className={Styles.name}>{description.name}</h2>
      </div>
      <div className={Styles.storyContainer}>
        <h2
          className={`mb-16 text-xs md:text-[12px] w-[80%] h-[24vh] m-auto mt-5 ${Styles.story}`}
        >
          {description.description}
        </h2>
        <div className={Styles.cityTag}>
          {fromText} {description.city}
          <hr className={Styles.cityUnderline} />
        </div>

        <div className={Styles.postedTag}>
          {postedOnText} {formatDateToDDMMYYYY(description?.createdAt)}
          <hr className={Styles.postedAtUnderline} />
        </div>
      </div>
    </div>
  )
}

export default Card
