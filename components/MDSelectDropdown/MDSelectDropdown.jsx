import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import styles from './MDSelectDropdown.module.css'
import MDSelectDropdownWithGrouping from './MDSelectDropdownWithGrouping'

export default function MDSelectDropdown({
  inlineCSS,
  groupingEnabled = false,
  values,
  byDefaultText = '',
  icon = '',
  iconSize,
  setSelectedValue,
  onClick,
}) {
  const [isActive, setIsActive] = useState(false)
  const [selectedOption, setSelectedOption] = useState(byDefaultText)
  const dropdownRef = useRef(null)
  useEffect(() => {
    setSelectedOption(byDefaultText)
  }, [byDefaultText])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])
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
    fontSize: inlineCSS && inlineCSS.fontSize ? inlineCSS.fontSize : '0.875rem',
    dropdownFontSize:
      inlineCSS && inlineCSS.dropdownFontSize
        ? inlineCSS.dropdownFontSize
        : '0.875rem',
    width: inlineCSS && inlineCSS.width ? inlineCSS.width : '400px',
    fontWeight:
      inlineCSS && inlineCSS.fontWeight ? inlineCSS.fontWeight : '100',
    height: inlineCSS && inlineCSS.height ? inlineCSS.height : '100%',
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
  }

  const handleButtonClick = () => {
    setIsActive(!isActive)
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsActive(false)
    onClick(option)
  }

  return !groupingEnabled ? (
    <div
      ref={dropdownRef}
      className={`${styles.customSelect}  ${isActive && styles.active}`}
      style={{
        fontSize: `${finalInlineCSS.fontSize}`,
        width: `${finalInlineCSS.width}`,
      }}
    >
      <button
        className={styles.selectButton}
        style={{
          backgroundColor: `${finalInlineCSS.backgroundColor} `,
          border: `${finalInlineCSS.borderColor}`,
          color: `${finalInlineCSS.textColor}`,
          fontSize: `${finalInlineCSS.fontSize}`,
          borderRadius: `${finalInlineCSS.borderRadius}`,
          padding: `${finalInlineCSS.padding}`,
          height: `${finalInlineCSS.height}`,
          fontWeight: `${finalInlineCSS.fontWeight}`,
        }}
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={isActive}
        aria-controls="select-dropdown"
        onClick={handleButtonClick}
      >
        <span className={`${styles.selectedValue}`}>{selectedOption}</span>
        {icon === '' ? (
          <span className={styles.arrow}></span>
        ) : (
          <div
            className={styles.imageDiv}
            style={{
              height: finalInlineCSS.iconHeight,
              width: finalInlineCSS.iconWidth,
            }}
          >
            <Image
              className="mt-1"
              width={10}
              height={11}
              src={icon}
              alt="Icon to show on side of the dropdown"
            />
          </div>
        )}
      </button>
      <ul
        className={styles.selectDropdown}
        role="listbox"
        id="select-dropdown"
        style={{
          backgroundColor: `${finalInlineCSS.bgColor}`,
          borderRadius: `${finalInlineCSS.dropdownBorderRadius}`,
        }}
      >
        {values?.map((option) => (
          <li
            style={{
              color: `${finalInlineCSS.dropdownTextColor}`,
              fontSize: `${finalInlineCSS.dropdownFontSize}`,
            }}
            key={option}
            tabIndex="0"
            onClick={() => handleOptionSelect(option)}
          >
            <input
              type="radio"
              style={{ fontSize: `${finalInlineCSS.dropdownFontSize}` }}
              id={option}
              name="social-account"
            />
            <label
              htmlFor={option}
              style={{ fontSize: `${finalInlineCSS.dropdownFontSize}` }}
            >
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <MDSelectDropdownWithGrouping
      values={values}
      inlineCSS={inlineCSS}
      byDefaultText={byDefaultText}
      icon={icon}
      iconSize={iconSize}
      setSelectedValue={setSelectedValue}
      onClick={onClick}
    />
  )
}
