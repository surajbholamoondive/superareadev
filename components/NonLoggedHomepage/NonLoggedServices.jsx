import { useEffect, useRef, useState } from 'react'
import serviceContent from '@/content/HomePage/serviceContent'
import { HOME_PAGE_TEXT } from '@/textV2'
import ServiceCard from '../../components/HomePage/Services/ServiceCard'
import Styles from './services.module.css'

const { everythingYou, need } = HOME_PAGE_TEXT.searchSection

const NonLoggedServices = () => {
  const [serviceList] = useState(serviceContent)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const servicesArray = Object.keys(serviceList)
  const [isScrolling, setIsScrolling] = useState(false)

  // For touch events
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)

  const handleWheel = (e) => {
    if (!isScrolling) {
      e.preventDefault()
      setIsScrolling(true)

      if (e.deltaY > 0) {
        setCurrentIndex((prev) => (prev + 1) % servicesArray.length)
      } else {
        setCurrentIndex((prev) =>
          prev === 0 ? servicesArray.length - 1 : prev - 1
        )
      }

      setTimeout(() => {
        setIsScrolling(false)
      }, 300)
    }
  }

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    // If the touch starts on a button or interactive element, ignore swipe logic
    if (e.target.closest('button, a, [role="button"], input, textarea')) {
      touchStartX.current = null
      return
    }
    touchStartX.current = e.changedTouches[0].screenX
    touchStartY.current = e.changedTouches[0].screenY
  }

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return
    touchEndX.current = e.changedTouches[0].screenX
    touchEndY.current = e.changedTouches[0].screenY
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === undefined) return

    const deltaX = touchStartX.current - touchEndX.current
    const deltaY = touchStartY.current - touchEndY.current

    // Check if horizontal swipe is greater than vertical movement and exceeds threshold
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // Swipe left -> next
        setCurrentIndex((prev) => (prev + 1) % servicesArray.length)
      } else {
        // Swipe right -> previous
        setCurrentIndex((prev) =>
          prev === 0 ? servicesArray.length - 1 : prev - 1
        )
      }
    }

    // Reset
    touchStartX.current = null
    touchEndX.current = undefined
    touchEndY.current = undefined
  }

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 1024)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const container = document.getElementById('servicesWrapper')
    const onScroll = () => {
      const scrollLeft = container.scrollLeft
      const containerWidth = container.offsetWidth
      const children = Array.from(container.children)

      let closestIndex = 0
      let minDistance = Infinity

      children.forEach((child, index) => {
        const offset = child.offsetLeft
        const distance = Math.abs(offset - scrollLeft)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })

      setCurrentIndex(closestIndex)
    }

    container?.addEventListener('scroll', onScroll, { passive: true })
    return () => container?.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const handleDotClick = (index) => {
    setCurrentIndex(index)
    if (isMobile) {
      const container = document.getElementById('servicesWrapper')
      const card = container.children[index]
      if (card) {
        container.scrollTo({
          left: card.offsetLeft,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <section className="w-[93%] lg:w-[93%] overflow-hidden border-none m-auto rounded-xl">
      <div className="bg-white rounded-xl">
        <div className="text-center w-full my-4 pt-[2rem]">
          <h3 className="inline-block text-primary">{everythingYou}</h3>{' '}
          <h2 className="inline-block text-primary">{need}</h2>
        </div>

        <div
          className={Styles.wrapper}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* {servicesArray.map((service, index) => (
            <div>
              <ServiceCard name={service} description={serviceList[service]} />
              <ServiceCard
                key={index}
                name={service}
                description={serviceList[service]}
              />
            </div>
          ))} */}
           {isMobile ? (
                      <div className={Styles.slideWrapper}>
                        <ServiceCard
                          name={servicesArray[currentIndex]}
                          description={serviceList[servicesArray[currentIndex]]}
                        />
                      </div>
                    ) : (
                      servicesArray.map((service, index) => (
                        <ServiceCard
                          key={index}
                          name={service}
                          description={serviceList[service]}
                        />
                      ))
                    )}
        </div>

        {isMobile && (
          <div className={Styles.dotsContainer}>
            {servicesArray.map((_, index) => (
              <span
                key={index}
                className={`${Styles.dot} ${
                  index === currentIndex ? Styles.activeDot : ''
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default NonLoggedServices
