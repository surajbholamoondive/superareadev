import React from 'react';
import Step from './Step';
import styles from './index.module.css'; // Import your CSS module here

const MDStepper = ({
    ButtonDisable,
    steps,
    handleNext,
    handleBack,
    handleFinish,
    currentStep,
    completedIcon,
    inCompleteIcon,
    inlineCSS,
}) => {
    return (
        <div className={`${styles.mainStepper}`}>
            {steps.map((step, index) => (
                <div key={index}>
                    <Step
                        ButtonDisable={ButtonDisable}
                        title={step.title}
                        index={index}
                        stepNumber={index + 1}
                        isActive={index === currentStep}
                        isCompleted={index < currentStep}
                        inActive={index > currentStep}
                        component={step.component}
                        onNext={handleNext}
                        onBack={handleBack}
                        onFinish={handleFinish}
                        isLastStep={index === steps.length - 1}
                        completedIcon={completedIcon}
                        inCompleteIcon={inCompleteIcon}
                        inlineCSS={inlineCSS}
                        buttons={step.buttons}
                        buttonBackgroundColor={step.buttons.map(button => button.backgroundColor)} />
                </div>
            ))}
        </div>
    );
};

export default MDStepper;
