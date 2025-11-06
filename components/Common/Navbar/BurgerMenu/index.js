import React, { useState } from 'react'
import Image from 'next/image'
import burgerMenuIcon from '@/assets/ButtonIcons/burgerMenuIcon.svg'
import DropdownButtonMobile from '@/utils/DropdownButton/DropdownButtonMobile'
import Menu from '@mui/material/Menu'
import navbarContent from '../../../../content/Navbar'
import Styles from './index.module.css'

const BurgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [navbarContentData] = useState(navbarContent)
  const [optionName, setOptionName] = useState()
  const [categoryData, setCategoryData] = useState()
  const [newComponent, setNewComponent] = useState()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setOptionName()
    setCategoryData()
    setNewComponent(false)
  }
  const handleBack = () => {
    setOptionName()
    setCategoryData()
    setNewComponent(false)
  }
  return (
    <div className={Styles.burgerDiv}>
      <button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="flex"
      >
        <Image
          src={burgerMenuIcon}
          width={25}
          height={50}
          className="md:w-[30px]"
          alt="Navigation Menu Icon, mores burger menu icon"
        />
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={Styles.menu}
      >
        <div className="flex mb-14 w-[300px]">
          <img
            src="https://www.svgrepo.com/show/533620/arrow-sm-left.svg"
            width={35}
            height={35}
            className="h-[25px] mb-3 absolute right-0 mr-2"
            onClick={optionName && categoryData ? handleBack : handleClose}
          />
        </div>
        {optionName && categoryData ? (
          <div className={`${Styles.optionName} flex gap-1`}>
            <DropdownButtonMobile
              optionName={optionName}
              menuItem={categoryData}
              newComponent={newComponent}
              handleBack={handleBack}
              close={handleClose}
              setNewComponent={setNewComponent}
            />
          </div>
        ) : (
          <div>
            {Object.keys(navbarContentData).map((content, index) => (
              <div className={`${Styles.optionName} flex gap-1`} key={index}>
                <DropdownButtonMobile
                  optionName={content}
                  key={index}
                  menuItem={navbarContentData[content]}
                  close={handleClose}
                  setOptionName={setOptionName}
                  setCategoryData={setCategoryData}
                  newComponent={newComponent}
                  setNewComponent={setNewComponent}
                />
              </div>
            ))}
          </div>
        )}
      </Menu>
    </div>
  )
}

export default BurgerMenu
