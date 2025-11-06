import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import activeIcon from '../../assets/stepper/redTick.svg'
import inActiveIcon from '../../assets/stepper/greyTick.svg'
import styles from './index.module.css'

const Step = ({
  index,
  ButtonDisable,
  currentStep,
  propertyDetails,
  stepNumber,
  setCurrentStep,
  title,
  isActive,
  isCompleted,
  buttons,
  component,
  declarationOne,
  declarationTwo,
  isProject,
  edit,
  postButtonDisabled
}) => {
  const icon = isActive || isCompleted ? activeIcon : inActiveIcon
  const [previous, setPrevious] = useState(null)
  useEffect(() => {
    if (currentStep !== index) {
      setPrevious(currentStep)
    }
  }, [currentStep, index])

  const handleStepChange = (clickedIndex) => {
    if (edit == true) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStep(clickedIndex);
    }
    if (clickedIndex < currentStep) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setCurrentStep(clickedIndex)
    } else if (clickedIndex === currentStep && previous !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setCurrentStep(previous)
    }
  }
  return (
    <div
      className={`${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} bg-white border border-primary rounded-lg cursor-pointer mb-3`}
    >
      <div
        className="flex justify-between"
        onClick={() => handleStepChange(index)}
      >
        <div className={`${styles.border}`}>
          {isCompleted ? (
            <Image
              src={icon}
              alt="step status"
              width={25}
              height={25}
              className="mr-2"
            />
          ) : (
            <span
              className="  mr-2 p-[4px] text-center rounded-full min-w-[27px]"
              style={{ borderRadius: '50%', color: 'var(--secondary-color)', fontWeight: 'bold' }}
            >
              {stepNumber}.
            </span>
          )}
          <h3
            style={{ borderRadius: '50%', color: 'var(--secondary-color)' }}>{title ? title : 'Active Step'}
          </h3>
        </div>
      </div>
      <div>
        {isActive && component}

        {isActive && (
          <div className="flex justify-center gap-3 items-center h-[80px]">
            {buttons.map((button, index) => (
              <button
                className={` mr-1 md:mt-[8px] lg:mt-[10px]  rounded-3xl max-sm:text-[12px] max-sm:py-[8px] max-sm:px-[22px] text-[1rem] mb-3 py-[10px] px-[30px] mt-2 ${postButtonDisabled && 'cursor-not-allowed'}  ${button.label === 'Back'
                  ? 'bg-[#dadada] text-black border-[#00000020] mr-2 '
                  : `${postButtonDisabled ? 'bg-[#dadada] text-black' : 'bg-primary text-white '}`
                  }`}
                disabled={postButtonDisabled}
                key={index}
                // disabled={
                //   button.label !== 'Back' &&
                //   ButtonDisable &&
                //   (!propertyDetails || !declarationOne || !declarationTwo)
                // }
                onClick={(e) => {
                  e.stopPropagation();
                  button.onClick[0]();
                  if (!edit && button.onClick[1]) {
                    button.onClick[1]();
                  }
                }}



              >
                {(postButtonDisabled && index === 1) ? 'Posting...' : button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Step
