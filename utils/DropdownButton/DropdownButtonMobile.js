import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Buy from '@/assets/DropDownButtonMobile/Buy.svg'
import City from '@/assets/DropDownButtonMobile/City.svg'
import Projects from '@/assets/DropDownButtonMobile/Projects.svg'
import Rent from '@/assets/DropDownButtonMobile/Rent.svg'
import Services from '@/assets/DropDownButtonMobile/Services.svg'
import downArrow from '../../assets/ButtonIcons/fluent_ios-arrow-24-filled.svg'
import Styles from './burgerMenu.module.css'
import { HOME_PAGE_TEXT } from '@/textV2'
const {routes,text}=HOME_PAGE_TEXT
const DropdownButtonMobile = ({
  optionName,
  menuItem,
  close,
  setOptionName,
  setCategoryData,
  newComponent,
  setNewComponent,
}) => {
  const imageAssets = {
    Buy,
    Rent,
    Projects,
    Services,
    City,
  }
  const [show, setShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isChildOpen, setIsChildOpen] = useState(false)
  const handleClick = () => {
    setShow(!show)
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    if (newComponent) {
      setIsOpen(true)
    }
  }, [newComponent])
  const handleChildOpen = (head, menuItem) => {
    setIsChildOpen(!isChildOpen)
    setOptionName(head)
    setCategoryData(menuItem)
    setNewComponent(true)
  }
  return (
    <div className={Styles.dropDown}>
      <button
        className="flex space-between w-[260px] h-[50px] items-center mr-3 relative "
        onClick={handleClick}
      >
        <div className="flex mt-7 gap-2">
          {!newComponent && (
            <Image
              src={imageAssets[optionName]}
              width={30}
              height={30}
              className="h-[25px] -ml-2"
            />
          )}
          <h4
            className={`font-bold ${newComponent && ` mt-[-10px] mb-[-20px] ${Styles.newOption}`} `}
            style={{ letterSpacing: '0.5px', fontWeight:"normal" }}
          >
            {optionName}
          </h4>
        </div>
        {!newComponent && (
          <Image
            src={downArrow}
            className={`${Styles.image} transition-all ${show ? 'rotate-180' : 'rotate-0'}`}
            width={11}
            alt="down arrow icon"
            style={{ marginTop: '1px' }}
          />
        )}
      </button>
      <hr className="mb-2 "/>
      {isOpen && (
        <div className=' mt-[-10px]'>
          {Object.keys(menuItem)?.map((head, index) => (
            <div key={index}>
              <div className="flex">
                <div className={`${!newComponent && 'ml-5'}`}>
                  {newComponent ? (
                    <Link
                      key={index}
                      href={{
                        pathname:
                          optionName !== text.ourServicesText
                            ? routes.searchResultPageRoute
                            : menuItem[index]?.search,
                        query:
                          optionName !== text.ourServicesText && menuItem[index]?.search,
                      }}
                      onClick={close}
                    >
                      <p className={`${Styles.menuTitle} text-black `}>
                        {menuItem[index]?.title}
                      </p>
                      <hr className=" w-[240px]" />
                    </Link>
                  ) : (
                    <div onClick={() => handleChildOpen(head, menuItem[head])}>
                      <p className={`${Styles.headTag} text-primary`}>
                        {head}
                      </p>
                    </div>
                  )}
                </div>
                {!newComponent && (
                  <div>
                    <button
                      onClick={() => handleChildOpen(head, menuItem[head])}
                    >
                      <Image
                        src={downArrow}
                        className="transform -rotate-90 "
                        width={11}
                        alt="down arrow icon"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownButtonMobile
