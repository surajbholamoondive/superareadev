import React, { useEffect, useState , forwardRef} from 'react';
import TooltipComponent from '../Tooltip';

const MDLabelAndInput = forwardRef(({ label, inputType, onChangeFunction, maxLengthInput, cssClass, dropdownClass, dropdownArray, onSelectFunction, capitalize, isInputNumber, inputState, tooltipText, dropdownState, max, onBlur, labelClass, isdisabled, placeholder, isRequired = true, handlePaste, onKeyDown, pattern }, ref) => {
  const [inputValue, setInputValue] = useState(inputState || '')
  const [dropdownValue, setDropdownValue] = useState(dropdownState || '')

  useEffect(() => {
    setInputValue(inputState || '')
    setDropdownValue(dropdownState || '')
  }, [inputState, dropdownState])

  useEffect(() => {
    if (inputState) {
      setInputValue(capitalize ? inputState.toUpperCase() : inputState)
    }
    if (dropdownState) {
      setDropdownValue(dropdownState)
    }
  }, [inputState, dropdownState, capitalize])

  const handleSelection = (e) => {
    if (onSelectFunction) {
      onSelectFunction(e.target.value)
    }
  }

  const handleInputChange = async (e) => {
    let updatedValue;
    if (isInputNumber) {
      updatedValue = e.target.value.replace(/[^0-9.]/g, "");
      const parts = updatedValue.split('.');
      if (parts.length > 2) {
        updatedValue = parts[0] + '.' + parts.slice(1).join('');
      }
    } else {
      updatedValue = e.target.value;
    }

    if (maxLengthInput && updatedValue.length > maxLengthInput) {
      return
    }
    setInputValue(capitalize ? updatedValue.toUpperCase() : updatedValue)
    if (onChangeFunction) {
      onChangeFunction(updatedValue)
    }
  }


  const actualInputType = (isInputNumber && inputType === "number") ? "text" : (inputType || "text");

  return (
    <div className={`${cssClass} h-fit`}>


      <div className="flex items-center space-x-1">
        <label className={`${labelClass}`}>{label}</label>
        {isRequired && (
          <span className="text-red-500" style={{ fontWeight: "normal" }}>*</span>
        )}
        {tooltipText && <TooltipComponent tooltipText={tooltipText} />}
      </div>

      <div className="flex">
        {onChangeFunction && (
          <input
            type={actualInputType}
            className={`border text-headingColor border-headingColor ${dropdownArray ? 'rounded-l-lg border-r-0' : 'rounded-md'} px-2 mt-1 focus:outline-none focus:border-headingColor ${cssClass}`}
            value={isInputNumber ? inputValue : inputValue}
            onChange={handleInputChange}
            max={max}
            disabled={isdisabled}
            placeholder={placeholder}
            onPaste={handlePaste}
            onKeyDown={onKeyDown}
            pattern={pattern}
            ref={ref}
            onBlur={onBlur}
          />
        )}


        {dropdownArray && (
          <select
            className={`border border-headingColor rounded-r-md mt-1 text-[0.875rem] text-headingColor -ml-1 pl-1 ${inputType ? 'rounded-r-lg' : 'rounded-md'} focus:outline-none focus:border-headingColor ${dropdownClass}`}
            onChange={handleSelection}
            value={dropdownValue}
          >
            {dropdownArray.map((data) => (
              <option key={data?.label || data} value={data?.value || data}>
                {data?.label || data}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
})

export default MDLabelAndInput