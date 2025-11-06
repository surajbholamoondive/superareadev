import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import error from '@/assets/Images/error/error-img.svg'
import Styles from './error.module.css'
import { OTHER_PAGES_TEXT } from '@/textV2'

const { backToHomepage, defaultError, reloadText, oopsText, somethingWentWrong } =
  OTHER_PAGES_TEXT.errorPage

function Error() {
  const router = useRouter()

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.errorcontainer}>
        <div className={Styles.imageContainer}>
          <Image height={400} src={error} alt="Error illustration" />
        </div>

        <div className={Styles.content}>
          <h1 className={Styles.title}>{oopsText}</h1>
          <h1 className={Styles.title}>{somethingWentWrong}</h1>
          <div className={Styles.divider}></div>
          <p className={Styles.text}>{defaultError}</p>

          <div className={Styles.buttons}>
            <Link href="/">
              <button className={`${Styles.btn} ${Styles.primary}`}>
                {backToHomepage}
              </button>
            </Link>

            <button
              className={`${Styles.btn} ${Styles.secondary}`}
              onClick={() => router.reload()}
            >
              {reloadText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
