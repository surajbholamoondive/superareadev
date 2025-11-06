"use client"
import { Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"
import { sliderSettings } from "./utils/sliderSettings";
// import Styles from './SliderSwiper.module.css'
import FeaturedSectionCard from "./FeaturedSectionCard";
import one from "../../../assets/FeaturedPropertiesImages/AdinRoyal.png"
import two from '../../../assets/FeaturedPropertiesImages/ElegantHouse.png'
import three from '../../../assets/FeaturedPropertiesImages/MiroResidence.png'
import four from '../../../assets/FeaturedPropertiesImages/PentHouseInn.png'
import five from '../../../assets/FeaturedPropertiesImages/RoyalPalms.png'
import six from '../../../assets/FeaturedPropertiesImages/RoyalResidence.png' 

const SlideSwiper=({properties})=>{
  const arr=[one,two,three,four,five,six]
    return(
        <section id='Properties'>
        <div className="mt-5">
          <Swiper {...sliderSettings}>
            {properties?.map((card, i) => (
              <SwiperSlide key={i} >
                <FeaturedSectionCard singlePropertyData={card} key={i} src={arr[i]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    )
}
export default SlideSwiper