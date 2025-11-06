import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/auth'
import { useNotification } from '@/context/notificationContext'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import { NO_NOTIFICATION_MESSAGE, NOTIFICATION } from '@/text'
import { Drawer } from '@mui/material'
import crossIcon from '../../assets/ButtonIcons/crossIcon.svg'
import io from 'socket.io-client'
import NotificationCard from '@/components/NotificationCard/index'
import notificationBell from '../../assets/ButtonIcons/NotificationBell.svg'
import whiteTriangle from '../../assets/NavbarIcons/triangle.svg'
import Styles from './index.module.css'

const Notifications = ({ notificationDrawer, setNotificationDrawer }) => {
  const logger = getLogger()
  const [auth, setAuth] = useAuth()
  
  const {fetchNotification,notifications,unreadCount}=useNotification()
  

  const [counter, setCounter] = useState()
  const user = auth?.userResult?._id
  const dropdownRef = useRef(null)
  const [notificationList, setNotificationList] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    if (windowWidth > 768) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
    
  }, [auth])


  const url = process.env.NEXT_PUBLIC_NOTIFICATION
  useEffect(() => {
    const socket = io(url)
    socket.on('connect', () => {
      logger.info('Connected to Socket.IO server')
    })

    socket.on('disconnect', () => {
      logger.info('Disconnected from Socket.IO server')
    })
    socket.on('response', (data) => {
      if (data !== 'Socketio connected') {
        const obj = JSON.parse(data)
        setNotificationList(obj)
      }
    })
    socket.emit('message', user)
    return () => {
      socket.disconnect()
    }
  }, [user])




  useEffect(() => {
    fetchNotification();
  }, [auth, showDropdown]);
  
  const handleClick = async() => {
    setShowDropdown(!showDropdown)
  }
  

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !document.getElementById('notifylist')?.contains(event.target)
    ) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    const notify = document.getElementById('notifylist')
    const whiteTriangleBottom = document.getElementById('whiteTriangleBottom')

    if (notify && whiteTriangleBottom) {
      if (showDropdown) {
        notify.style.display = 'block'
        whiteTriangleBottom.style.display = 'block'
      } else {
        notify.style.display = 'none'
        whiteTriangleBottom.style.display = 'none'
      }
    }
  }, [showDropdown])

  return (
    <div className={`${Styles.outerDiv} relative`} ref={dropdownRef}>
      <div className={`max-md:h-fit ml-1 max-md:mt-1`}>
        <Image
          src={notificationBell}
          onClick={windowWidth < 768 ? null : handleClick}
          width={18}
          height={22}
          className="mt-[24px] mx-2 max-md:ml-2"
          alt="Notifications bell icon, mores notifications"
        />
        <div className={`relative cursor-default ${unreadCount > 0 ? '' : 'hidden'}`}>
          <h2 className={Styles.counter}>{unreadCount>99?'99+' : unreadCount}</h2>
        </div>
        {windowWidth < 768 ? (
          ''
        ) : (
          <Image
            src={whiteTriangle}
            className={Styles.whiteTriangle}
            id="whiteTriangleBottom"
            width={20}
            alt="white triangle icon"
          />
        )}
      </div>
      {windowWidth < 768 ? (
        <Drawer
          anchor="bottom"
          open={notificationDrawer}
          onClose={() => setNotificationDrawer(!notificationDrawer)}
        >

          {notifications?.length > 0 ? (
              <div className={`${Styles.wrapperDiv}`}>
                <div className='flex justify-between'>
                  <h3 className={Styles.h3}>{NOTIFICATION}</h3>
                  <div onClick={() => setNotificationDrawer(!notificationDrawer)}>
                    <Image
                      src={crossIcon}
                      width={28}
                      alt='cross icon'
                      className='pt-2 pr-3'
                    />
                  </div>
                </div>
                {notifications.map((item, index) => (
                  <NotificationCard key={index} data={item} />
                
                ))}
              </div>
            ) : (
              <h4 className={Styles.noNotification}>
                {NO_NOTIFICATION_MESSAGE}
              </h4>
          )}

        </Drawer>
      ) : (
        <div className={`${Styles.notifylist} absolute right-0 z-50 bg-white shadow-lg rounded-lg`} id="notifylist">
          {notifications?.length > 0 ? (
            <div className={`${Styles.wrapperDiv}`}>
              {notifications.map((item, index) => (
                <NotificationCard key={index} data={item} dropdown={showDropdown}/>
              ))}
            </div>
          ) : (
            <h4 className={Styles.h3}>{NO_NOTIFICATION_MESSAGE}</h4>
          )}
        </div>
      )}
    </div>
  )
}

export default Notifications

