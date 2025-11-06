import React, { useState } from 'react'
import faqContent from '@/content/faq/index'

import Styles from './index.module.css'

const Mverification = () => {
  const [openAccordions, setOpenAccordions] = useState({})
  const toggleAccordion = (index) => {
    const updatedAccordions = { ...openAccordions }
    updatedAccordions[index] = !updatedAccordions[index]
    setOpenAccordions(updatedAccordions)
  }
  const mVerificationContent = faqContent.mVerificationContent || []

  return (
    <div id="M-verification">
      <div className={Styles.wrapper}>
        <div className='w-full'>
          {mVerificationContent.map((item, i) => (
            <div key={i} className={Styles.item}>
              <div className={Styles.title} onClick={() => toggleAccordion(i)}>
                <h3>{item.question}</h3>
                <span
                  className={openAccordions[i] ? Styles.minus : Styles.plus}
                ></span>
              </div>
              {openAccordions[i] && (
                <div className={`${Styles.content} ${Styles.expanded}`}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Mverification
