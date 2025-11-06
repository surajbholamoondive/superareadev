import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/auth'
import { useLike } from '@/context/LikeUnlikeCntx'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import crossIcon from '../../assets/ButtonIcons/crossIcon.svg'
import { Drawer } from '@mui/material'
import fillHeart from '../../assets/ButtonIcons/heart.svg'
import whiteTriangle from '../../assets/NavbarIcons/triangle.svg'
import { makeApiRequest } from '../utils'
import Styles from './index.module.css'
import LikedPropertyCard from './LikedCard'
import { GLOBALLY_COMMON_TEXT, OTHER_PAGES_TEXT } from '@/textV2'
const {donnotLikeAnything,likedProperty}=OTHER_PAGES_TEXT.wishlisted
const {mouseDownText}=GLOBALLY_COMMON_TEXT.events
const WishlistMenuNavbar = ({ wishlistDrawer, setWishlistDrawer }) => {
  const [auth] = useAuth()
  const [list, setList] = useState([])
  const [counter, setCounter] = useState()
  const dropdownRef = useRef(null)
  const [like] = useLike()
  const logger = getLogger()
  const windowWidth = useWindowWidth()
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    fetchWishlist()
    document.addEventListener(mouseDownText, handleClickOutside)
    return () => {
      document.removeEventListener(mouseDownText, handleClickOutside)
    }
  }, [like, auth])

  useEffect(() => {
    setCounter(list ? list.length : 0)
  }, [list])

  const fetchWishlist = async () => {
    try {
      const { data } = await makeApiRequest(
        process.env.NEXT_PUBLIC_GET_METHOD,
        process.env.NEXT_PUBLIC_ALL_LIKED_PROPERTY_API_PATH
      )
      const { filteredResults } = data?.result || {}
      if (filteredResults === undefined) {
        setList(null)
      } else {
        setList(filteredResults)
        const liked = filteredResults.map((item) =>
          item?.propertyId ? item?.propertyId?._id : item?.projectId._id
        )
        const localStorageKey = `wishlist-${auth?.userResult?._id}`
        localStorage.setItem(localStorageKey, JSON.stringify(liked))
      }
    } catch (err) {
      logger.error(err)
    }
  }

  const handleClick = () => {
    setShowDropdown(!showDropdown)
  }

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !document.getElementById('likedMenu')?.contains(event.target)
    ) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    const likedMenu = document.getElementById('likedMenu')
    const whiteTriangle = document.getElementById('whiteTriangle')

    if (likedMenu && whiteTriangle) {
      if (showDropdown) {
        likedMenu.style.display = 'block'
        whiteTriangle.style.display = 'block'
      } else {
        likedMenu.style.display = 'none'
        whiteTriangle.style.display = 'none'
      }
    }
  }, [showDropdown])
  return (
    <div className={Styles.outerDiv} ref={dropdownRef}>
      <div className={`relative mt-[11px] `}>
        <Image
          src={fillHeart}
          onClick={handleClick}
          width={22}
          height={32}
          className="mt-[18px] mx-2"
          alt="Favourite Item Icon"
        />
        <div
          className={`cursor-default absolute top-0 right-0 -mr-1 ${counter === 0 ? 'hidden' : ''}`}
        >
          <p className={`${Styles.counter}`}>{counter ? counter : 0}</p>
        </div>
        {windowWidth < 768 ? (
          ''
        ) : (
          <Image
            src={whiteTriangle}
            className={` ${Styles.whiteTriangle}`}
            id="whiteTriangle"
            width={20}
            alt="white triangle icon"
          />
        )}
      </div>
      {windowWidth < 768 ? (
        <Drawer
          anchor="bottom"
          open={wishlistDrawer}
          onClose={() => setWishlistDrawer(!wishlistDrawer)}
        >
          {list?.length > 0 ? (
            <div>
              <div className='flex justify-between'>
                <h4 className={Styles.h3mob}>{likedProperty}</h4>
                <div onClick={() => setWishlistDrawer(!wishlistDrawer)}>
                  <Image
                  src={crossIcon}
                  width={28}
                  alt='cross icon'
                  className='pt-2 pr-3'
                  />
                </div>
              </div>
              <div className={Styles.wrapperDivMob}>
                {list?.map((data, index) => (
                  <LikedPropertyCard key={index} data={data} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <h3 className={Styles.elseContent}>{donnotLikeAnything}</h3>
            </>
          )}
        </Drawer>
      ) : (
        <div className={Styles.likedMenu} id="likedMenu">
          {list?.length > 0 ? (
<div className="w-[400px] ">
              <p className={Styles.h3Class}>{likedProperty}</p>
              <div className={Styles.wrapperDiv}>
                {list.map((data, index) => (
                  <LikedPropertyCard key={index} data={data} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="w-[400px]">
                <p className={` ${Styles.elseContent}`}>
                  {donnotLikeAnything}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default WishlistMenuNavbar
