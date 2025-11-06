import React from 'react'
import Step from './Step'

const Stepper = ({
  setDATA,
  ButtonDisable,
  DATA,
  propertyDetails,
  setPropertyDetails,
  steps,
  currentStep,
  setCurrentStep,
  edit,
  declarationOne,
  declarationTwo,
  postButtonDisabled
}) => {

  return (
    <div>
      {steps.map((step, index) => (
        <div key={index}>
          <Step
            postButtonDisabled={postButtonDisabled}
            ButtonDisable={ButtonDisable}
            title={step.title}
            index={index}
            stepNumber={index + 1}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
            inActive={index > currentStep}
            buttons={step.buttons}
            validate={steps?.validate}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            component={step.component}
            setDATA={setDATA}
            DATA={DATA}
            propertyDetails={propertyDetails}
            setPropertyDetails={setPropertyDetails}
            edit={edit}
            declarationOne={declarationOne}
            declarationTwo={declarationTwo}
            isProject={step.isProject}
          />
        </div>
      ))}
    </div>
  )
}

export default Stepper
