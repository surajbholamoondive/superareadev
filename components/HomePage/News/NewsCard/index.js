import { useRouter } from 'next/router'
import { useData } from '@/context/data'
import Styles from './index.module.css'
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2'
const{viewText}=GLOBALLY_COMMON_TEXT.text
const {defaultNewsDescription,defaultNewsImage}=HOME_PAGE_TEXT.news
const NewsCard = ({ news }) => {
  const [data, setData] = useData()
  const router = useRouter()

  const handleRead = async () => {
    await localStorage.removeItem('News')
    await setData(news)
    await localStorage.setItem('News', JSON.stringify(news))
    router.push(`/news/${news.title}`)
  }

  return (
    <div className={Styles.parentDiv}>
      <div className={Styles.imageDiv}>
        <img
          src={news?.urlToImage ? news?.urlToImage : defaultNewsImage}
          width={350}
          height={300}
          className={Styles.imageBlog}
          alt="featured blog-images"
        />
      </div>
      <div className={Styles.childDiv}>
        <div className={Styles.title}>{news.title}</div>
        <div className={Styles.storyContainer}>
          <div className={Styles.story}>
            {news.description ? news.description : defaultNewsDescription}
          </div>
        </div>
        <div>
          <button className={`{Styles.button} capitalize`} onClick={handleRead}>
            {viewText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
