import React from 'react'
import PhoneInput from 'react-phone-number-input'
import Styles from './index.module.css'

const PhoneNumberInput = ({ value, onChange, className }) => {
  const handleChange = (inputValue) => {
    onChange(inputValue)
  }

  return (
    <div className={`${className} text-black `}>
      <PhoneInput
        international
        defaultCountry="IN"
        value={value}
        onChange={handleChange}
        className={Styles.flag}
      />
    </div>
  )
}

export default PhoneNumberInput
