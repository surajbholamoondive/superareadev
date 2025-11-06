import React, { useState } from 'react'
import Image from 'next/image'
import styles from './MDIconSelectDropdown.module.css'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const {iconText}=GLOBALLY_COMMON_TEXT.text
export default function MDIconSelectDropdown({
  inlineCSS,
  values,
  byDefaultText,
  icon = '',
  iconSize,
  dIconSize,
  onClick,
  index,
  DATA,
  setDATA,
  defaultIconName
}) {
  const [isActive, setIsActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(byDefaultText)

  const defaultBgColors = {
    default: '#fff',
    secondary: 'rgb(226,227,229)',
    success: 'rgb(212,237,218)',
    danger: 'rgb(248,215,218)',
    warning: 'rgb(255,243,205)',
    info: 'rgb(209,236,241)',
    light: 'rgb(254,254,254)',
    dark: 'rgb(214,216,217)',
  }

  const defaultBorderColors = {
    default: '#caced1',
    secondary: 'rgb(226,227,229)',
    success: 'rgb(212,237,218)',
    danger: 'rgb(248,215,218)',
    warning: 'rgb(255,243,205)',
    info: 'rgb(209,236,241)',
    light: 'rgb(254,254,254)',
    dark: 'rgb(214,216,217)',
  }

  const finalInlineCSS = {
    backgroundColor:
      inlineCSS && inlineCSS.backgroundColor
        ? inlineCSS.backgroundColor
        : defaultBgColors['default'],
    borderColor:
      inlineCSS && inlineCSS.border
        ? inlineCSS.border
        : `1px solid ${defaultBorderColors['default']}`,
    textColor: inlineCSS && inlineCSS.textColor ? inlineCSS.textColor : 'black',
    dropdownTextColor:
      inlineCSS && inlineCSS.dropdownTextColor
        ? inlineCSS.dropdownTextColor
        : 'black',
    fontSize: inlineCSS && inlineCSS.fontSize ? inlineCSS.fontSize : '1.15rem',
    dropdownFontSize: inlineCSS && inlineCSS.dropdownFontSize ? inlineCSS.dropdownFontSize:'1.15rem',
    width: inlineCSS && inlineCSS.width ? inlineCSS.width : '400px',
    height:inlineCSS && inlineCSS.height ? inlineCSS.height:'40px',
    bgColor:
      inlineCSS && inlineCSS.dropdownBackground
        ? inlineCSS.dropdownBackground
        : '#fff',
    borderRadius:
      inlineCSS && inlineCSS.borderRadius ? inlineCSS.borderRadius : '0.25rem',
    dropdownBorderRadius:
      inlineCSS && inlineCSS.dropdownBorderRadius
        ? inlineCSS.dropdownBorderRadius
        : '4px',
    padding: inlineCSS && inlineCSS.padding ? inlineCSS.padding : '0.675em 1em',
    iconHeight: iconSize ? iconSize : '20px',
    iconWidth: iconSize ? iconSize : '20px',
    dropdownIconWidth: dIconSize ? dIconSize : '5px',
    dropdownIconHeight: dIconSize ? dIconSize : '5px',
  }

  const handleButtonClick = () => {
    setIsActive(!isActive)
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsActive(false)
    onClick((prev)=>{
      const updatedIcons=[...prev] 
      updatedIcons[index]=option
      defaultIconName(index,option?.value)
      setDATA({...DATA,updatedIcons})
      return updatedIcons
    })
  }

  return (
    <div
      className={`${styles.customSelect} ${isActive && styles.active} `}
      style={{ fontSize: finalInlineCSS.fontSize, width: finalInlineCSS.width }}
    >
      <button
        className={styles.selectButton}
        style={{
          backgroundColor: finalInlineCSS.backgroundColor,
          border: finalInlineCSS.borderColor,
          color: finalInlineCSS.textColor,
          fontSize: finalInlineCSS.fontSize,
          borderRadius: finalInlineCSS.borderRadius,
          padding: finalInlineCSS.padding,
          height:finalInlineCSS.height
        }}
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={isActive}
        aria-controls="select-dropdown"
        onClick={handleButtonClick}
      >
        <div className="flex justify-between w-full items-center">
          <div className="flex gap-2 items-center ">
            {selectedOption?.icon && (
              <div
                className="relative"
                style={{
                  height: finalInlineCSS.dropdownIconHeight,
                  width: finalInlineCSS.dropdownIconWidth,
                }}
              >
                <Image
                  fill
                  src={selectedOption?.icon}
                  alt="selected icon"
                />
              </div>
            )}
            {selectedOption?.value ===iconText && <span>{iconText}</span>}
          </div>
          {icon ? (
            <div
              className={styles.imageDiv}
              style={{
                height: finalInlineCSS.iconHeight,
                width: finalInlineCSS.iconWidth,
              }}
            >
              <Image
                fill
                src={icon}
                alt="Icon to show on side of the dropdown"
              />
            </div>
          ) : (
            <div className={styles.arrow}></div>
          )}
        </div>
      </button>
      <ul
        className={styles.selectDropdown}
        role="listbox"
        id="select-dropdown"
        style={{
          backgroundColor: finalInlineCSS.bgColor,
          borderRadius: finalInlineCSS.dropdownBorderRadius,
        }}
      >
        {values.map((option, index) => (
          <li
            key={index}
            style={{ color: finalInlineCSS.dropdownTextColor, fontSize:finalInlineCSS.dropdownFontSize}}
            tabIndex="0"
            onClick={(e) => {
              e.preventDefault()
               handleOptionSelect(option)
              }}
          >
            <input type="radio" id={option.value} name="select-option" />
            <label htmlFor={option.value} className={styles.optionLabel}>
              <div style={{ display: 'flex', alignItems: 'center', gap:'6px', justifyContent:'center'}}>
                {option.icon && (
                  <div
                    className="relative"
                    style={{
                      width: finalInlineCSS.dropdownIconWidth,
                      height: finalInlineCSS.dropdownIconHeight,
                    }}
                  >
                    <Image src={option?.icon} fill/>
                  </div>
                )}
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
