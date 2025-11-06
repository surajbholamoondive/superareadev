import React, { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css'; // Import your CSS module here

import activeIcon from '../../assets/MDStepper/blueTick.svg';
import inActiveIcon from '../../assets/MDStepper/greyTick.svg';


const Step = ({
  index,
  ButtonDisable,
  currentStep,
  stepNumber,
  setCurrentStep,
  title,
  isActive,
  isCompleted,
  buttons,
  component,
  requiredFields,
  onNext,
  onBack,
  onFinish,
  isLastStep,
  completedIcon,
  inCompleteIcon,
  inlineCSS,
  buttonBackgroundColor
}) => {
  const icon = isActive || isCompleted ? activeIcon : inActiveIcon;
  const [previous, setPrevious] = useState(null);

  const finalInlineCSS = {
    contentMargin: inlineCSS && inlineCSS.contentMargin ? inlineCSS.contentMargin : null,
    buttonsAlignment: inlineCSS && inlineCSS.buttonsAlignment ? inlineCSS.buttonsAlignment : 'start',
    textAlign: inlineCSS && inlineCSS.labelTextAlignment ? inlineCSS.labelTextAlignment : 'start',
    color: inlineCSS && inlineCSS.labelTextColor ? inlineCSS.labelTextColor : 'black',
    hideStepLine: inlineCSS && inlineCSS.hideStepLine ? inlineCSS.hideStepLine : false,
    stepBorder: inlineCSS && inlineCSS.stepBorder ? inlineCSS.stepBorder : null,
    stepBackgroundColor: inlineCSS && inlineCSS.stepBackgroundColor ? inlineCSS.stepBackgroundColor : 'white',
    stepBorderRadius: inlineCSS && inlineCSS.stepBorderRadius ? inlineCSS.stepBorderRadius : null,
  };

  const handleStepChange = (clickedIndex) => {
    if (clickedIndex < currentStep) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(clickedIndex);
    } else if (clickedIndex === currentStep && previous !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(previous);
    }
  };

  return (
    <div className={`${styles.mainStepContainer}`}>
      <div onClick={() => handleStepChange(index)}>
        <div className={`${styles.step}`} style={{ border: finalInlineCSS.stepBorder, background : finalInlineCSS.stepBackgroundColor, borderRadius : finalInlineCSS.stepBorderRadius }}>
          {isCompleted ? (
            <div className={`${styles.iconDiv}`}>
              <Image fill src={completedIcon ? completedIcon : icon} alt="step status" />
            </div>
          ) : (
            inCompleteIcon ? (
              <div className={`${styles.iconDiv}`}>
                <Image fill src={inCompleteIcon} alt="step status" />
              </div>
            ) : (
              <span className={`${styles.circle}`}>
                {stepNumber}
              </span>
            )
          )}
          <div className={`${styles.titleDiv}`}>
            <p style={{ textAlign: finalInlineCSS.textAlign, color: finalInlineCSS.color }}>{title ? title : 'Active Step'}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.lineContainer}`}>
        {!finalInlineCSS.hideStepLine && <div className={`${isLastStep ? null : styles.line}`}></div>}
        <div style={{ width: '100%' }}>
          <div className={`${styles.content}`} style={{ margin: finalInlineCSS.contentMargin }}>
            {isActive && component}
          </div>
          {isActive && (
            <div className={`${styles.buttonContainer}`} style={{ justifyContent: finalInlineCSS.buttonsAlignment }}>
              {buttons.map((button, index) => (
                <button
                  className={`${styles.button}`}
                  style={{ backgroundColor: buttonBackgroundColor[index] }}
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (button.action === 'Back') {
                      onBack();
                    } else if (button.action === 'Finish') {
                      onFinish();
                    } else {
                      onNext();
                    }
                  }}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Step;
