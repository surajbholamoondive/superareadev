import { useState } from 'react'
import Card from './Card/card'
import Styles from './index.module.css'
import whyChooseUsContent from '@/content/HomePage/whyChooseUs'
import { HOME_PAGE_TEXT } from '@/textV2'
const {whyChooseDescription,whyChooseUsText}=HOME_PAGE_TEXT.whyChooseUs
const WhyChooseUs = () => {
  const [list] = useState(whyChooseUsContent)
  return (
    <div className='bg-[#b49974]'>
      <div className={`${Styles.container}`}>
        <div className={`${Styles.title}`}>
          <h1 className="text-white normal font-semibold text-start text-xl md:text-3xl lg:text-[32px] pt-[20px] lg:pt-[50px]">
            {whyChooseUsText}
            <hr className={Styles.underline} />
          </h1>
          <h2 className="w-[280px] md:w-[490px] lg:w-[600px] text-start text-white text-[11px] md:text-[12px] lg:text-[14px] mt-5">
            {whyChooseDescription}
          </h2>
        </div>
        <div
          className={`flex mt-12 pb-12 w-[100%] gap-[2%] px-8 text-center ${Styles.cardsDiv}`}
        >
          {Object.keys(list).map((item, index) => (
            <Card name={item} description={list[item]} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
