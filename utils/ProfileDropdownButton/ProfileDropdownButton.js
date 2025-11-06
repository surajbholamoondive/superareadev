import React, { useState } from 'react'
import Image from 'next/image'
import ProfileLogo from '@/assets/UserProfileLogo.svg'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import { ADMIN_TYPE } from '@/text'
import Menu from '@mui/material/Menu'
import downArrow from '../../assets/ButtonIcons/fluent_ios-arrow-24-filled.svg'
import upArrow from '../../assets/ButtonIcons/upArrow.svg'
import ProfileList from '../ProfileList'


const ProfileDropdownButton = () => {
  const userResult = useAuth()[0].userResult || {}
  const { firstName, profileImage } = userResult
  const windowWidth = useWindowWidth()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = (event) => {
    if (userResult?.userType === ADMIN_TYPE) return
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="flex items-center"
      >
        {userResult?.userType !== ADMIN_TYPE && (
          <div className="flex items-center ">
            <div className="relative mr-2">
              {profileImage ? (
                <div className="relative w-8 h-8">
                  <Image
                    src={profileImage}
                    alt="User Profile Image"
                    fill
                    className="rounded-full"
                    layout="fixed"
                  />
                </div>
              ) : (
                <div className="relative w-6 h-4 ">
                  <Image
                    src={ProfileLogo}
                    alt="Default Profile Logo"
                    fill
                    className=""
                    layout="fixed"
                  />
                </div>
              )}
            </div>
            <div className="max-md:mr-2 md:hidden">
              {anchorEl ? (
                <Image src={upArrow} width={12} alt="up arrow image" />
              ) : (
                <Image src={downArrow} width={12} alt="down arrow image" />
              )}
            </div>
          </div>
        )}



        <div className="flex text-sm max-md:hidden">
          {firstName && <p className="mr-1 capitalize">{firstName}</p>}
          {userResult?.userType !== ADMIN_TYPE &&
            (anchorEl ? (
              <Image src={upArrow} width={12} alt="up arrow image" />
            ) : (
              <Image src={downArrow} width={12} alt="down arrow image" />
            ))}
        </div>

      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="block"
        disableScrollLock={true}
      >
        <ProfileList onClose={handleClose} />
      </Menu>
    </div>
  )
}

export default ProfileDropdownButton