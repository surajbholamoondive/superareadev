import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import downArrow from '../../assets/ButtonIcons/fluent_ios-arrow-24-filled.svg'
import whiteTriangle from '../../assets/NavbarIcons/triangle.svg'
import Styles from './index.module.css'
import { HOME_PAGE_TEXT } from '@/textV2'
const {searchResultPageRoute}=HOME_PAGE_TEXT.routes
const DropdownButton = ({ optionName, menuItem }) => {
  const color = [
    'rgba(1, 129, 145, 0.08)',
    'rgba(147, 22, 2, 0.06)',
    'rgba(200, 142, 32, 0.06)',
  ]

  return (
    <div className={Styles.dropDown}>
      <button className="flex h-[50px] items-center mr-3 relative">
        <p className="mr-2" style={{ letterSpacing: '0.5px' ,color:'#343434'}}>
          {optionName}
        </p>
        <Image
          src={downArrow}
          className={Styles.image}
          width={11}
          alt="down arrow icon"
          style={{ marginTop: '1px' }}
        />
        <Image
          src={whiteTriangle}
          className={Styles.whiteTriangle}
          width={20}
          alt="white triangle icon"
        />
      </button>
      <div className={Styles.dropdownMenu}>
        <div className="flex">
          {Object.keys(menuItem)?.map((head, index) => (
            <div
              key={index}
              className={head==='India'? Styles.innerDivSmall: Styles.innerDiv}
              style={{ backgroundColor: color[index] }}
            >
              <h2 className={Styles.headTag}>{head}</h2>
              <hr className={Styles.underline} />
              {menuItem[head]?.map(({ search, title, path, image }, index) => (
                <div className="flex gap-2 items-center">
                  {image &&
                    <Image src={image} height={10} width={15} className='mb-[6px]' />
                  }
                  <Link
                    key={index}
                    href={{
                      pathname: path || searchResultPageRoute,
                      query: search,
                    }}
                    className='text-featureText'
                  >
                    {title}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DropdownButton
