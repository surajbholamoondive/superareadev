import { HOME_PAGE_TEXT } from '@/textV2'
import Styles from './index.module.css'
import NewsCard from './NewsCard'
const{newsText}=HOME_PAGE_TEXT.news
const News = ({ articles }) => {
  return (
    <div className="mb-16 overflow-hidden max-w-[1500px] lg:px-20 m-auto ">
      <div className="flex md:mb-12 mb-7  md:justify-between w-[80%] mt-10 max-md:ml-8 max-lg:ml-12">
        <div>
          <h1
            className={`text-[24px] md:text-[28px] lg:text-[33px] ${Styles.heading}`}
          >
            {newsText}
          </h1>
          <hr className={`${Styles.underline}`} />
        </div>
      </div>
      <div className={`${Styles.cardsDiv}`}>
        {articles?.map((news, index) => (
          <NewsCard news={news} key={index} />
        ))}
      </div>
    </div>
  )
}

export default News
