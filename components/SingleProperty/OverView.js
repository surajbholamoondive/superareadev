import React, { useState } from 'react'
import useWindowWidth from '@/context/useWindowWidth'

import styles from './style.module.css'

export default function OverView({ details }) {
  console.log('overview details', details)
  const [expanded, setExpanded] = useState(false)
  const windowWidth = useWindowWidth()

  const paragraphs = details?.match(/<p>[\s\S]*?<\/p>/g)?.join('') || ''
  const lists = details?.match(/<ul>[\s\S]*?<\/ul>/g)?.join('') || ''

  const togglePoints = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
      {windowWidth >= 768 ? (
        <div className="py-1">
          <div className="text-[0.875rem] leading-5 md:leading-6 text-gray-600 text-justify">
            <div dangerouslySetInnerHTML={{ __html: paragraphs }} />
            <div
              dangerouslySetInnerHTML={{ __html: lists }}
              className={` ml-10 ${styles.overview}`}
            />
          </div>
        </div>
      ) : (
        <div className="py-1">
          <div className="text-[0.875rem] leading-5 md:leading-6 text-gray-600 text-justify">
            <div dangerouslySetInnerHTML={{ __html: paragraphs }} />
            <div
              dangerouslySetInnerHTML={{ __html: lists }}
              className={`ml-10 ${styles.overview}`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
