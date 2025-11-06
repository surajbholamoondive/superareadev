import React, { useState, useEffect } from 'react'
import postProjectForm from '@/content/JSON/postProjectForm'
import { toast } from 'react-toastify'
import MDLabelAndInput from '@/components/MDLabelAndInput'
import Amenities from '@/components/PostProperty/Amenities'
import TooltipComponent from '@/components/Tooltip'
import { GLOBALLY_COMMON_TEXT, COMPONENTS } from '@/textV2'
import { MATTING_TYPE } from '@/text'
const { floorings, symbols } = GLOBALLY_COMMON_TEXT
const { POST_PROJECT_COMPO } = COMPONENTS
const { stepThreeText } = POST_PROJECT_COMPO

export default function Step3({
  projectData,
  setProjectData,
  landAmenity,
  setLandAmenity,
}) {
  const [listing, setListing] = useState()
  const { projectType, projectSubType } = projectData || {}
  const [isLand, setIsLand] = useState(false);

  const isAgriculturalLand = (projectData?.projectType === stepThreeText.agricultural && (
    projectData?.projectSubType === stepThreeText.agriculturalLand ||
    projectData?.projectSubType === stepThreeText.farmHouse
  ));


  const isIndustrialLand = (projectData?.projectType === stepThreeText.industrial && (
    projectData?.projectSubType === stepThreeText.wareHouse ||
    projectData?.projectSubType === stepThreeText.godown ||
    projectData?.projectSubType === stepThreeText.industrialLand ||
    projectData?.projectSubType === stepThreeText.industrialShed ||
    projectData?.projectSubType === stepThreeText.industrialBuilding
  ));


  useEffect(() => {
    if (projectData?.projectSubType !== stepThreeText.residentialPlot &&
      projectData?.projectSubType !== stepThreeText.residentialLand &&
      projectData?.projectSubType !== stepThreeText.farmHouse &&
      projectData?.projectSubType !== stepThreeText.commercialLand &&
      projectData?.projectSubType !== stepThreeText.wareHouse &&
      projectData?.projectSubType !== stepThreeText.godown &&
      projectData?.projectSubType !== stepThreeText.scoPlot &&
      projectData?.projectSubType !== stepThreeText.industrialLand &&
      projectData?.projectSubType !== stepThreeText.industrialShed &&
      projectData?.projectSubType !== stepThreeText.agriculturalLand) {
      setIsLand(true);
    } else {
      setIsLand(false);
    }
  }, [projectData?.projectSubType]);
  useEffect(() => {
    if (!isLand && !projectData?.possessionStatus) {
      setProjectData(prev => ({
        ...prev,
        possessionStatus: stepThreeText.readyToMove
      }));
    }
  }, [isLand, projectData?.possessionStatus]);

  let isShop = (projectData?.projectType === stepThreeText.commercial ||
    projectData?.projectType === stepThreeText.industrial ||
    projectData?.projectType === stepThreeText.residential) &&
    (projectData.projectSubType === stepThreeText.commercialOfficeSpace ||
      projectData?.projectSubType === stepThreeText.officeSpaceInItPark ||
      projectData.projectSubType === stepThreeText.commercialShop ||
      projectData.projectSubType === stepThreeText.commercialShowroom ||
      projectData.projectSubType === stepThreeText.mallRetailLockable ||
      projectData.projectSubType === stepThreeText.mallRetailUnlockable ||
      projectData.projectSubType === stepThreeText.highStreetRetailLockable ||
      projectData.projectSubType === stepThreeText.highStreetRetailUnlockable ||
      projectData.projectSubType === stepThreeText.officeSpace ||
      projectData.projectSubType === stepThreeText.foodCourt ||
      projectData.projectSubType === stepThreeText.banquet ||
      projectData.projectSubType === stepThreeText.kiosk ||
      projectData.projectSubType === stepThreeText.anchorStore ||
      projectData.projectSubType === stepThreeText.hyperMarket ||
      projectData.projectSubType === stepThreeText.foodKiosk ||
      projectData.projectSubType === stepThreeText.atmSpace ||
      projectData.projectSubType === stepThreeText.retailSpace ||
      projectData.projectSubType === stepThreeText.industrialBuilding
    )

  const [highlightTags, setHighlightTags] = useState(
    projectData?.projectHighlightTags && projectData?.projectHighlightTags
  )
  const renderButtons = (buttons, title, onClick, category, tooltipText) => {
    if (!buttons || buttons.length === 0) {
      return null
    }
    return (
      <div className="rounded-md mb-5">
        <div className={`flex`}>
          <p className='text-[1rem]'>{title}</p>
          <div>
            {tooltipText &&
              <TooltipComponent tooltipText={tooltipText} />
            }
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          {buttons.map((button) => {
            const isButtonActive =
              projectData[category] == button || landAmenity[category] == button ? true : false;
            return (
              <button
                className={`px-3 mt-2 py-4 h-[22px] min-w-[100px] w-fit  mr-5 rounded-full ${isButtonActive
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600'
                  } border-2 border-primary mx-1`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={button}
                onClick={() => onClick(category, button)}
              >
                {button}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const handleHighlightTags = (value) => {
    setHighlightTags((prev) => {
      let updatedDefiningHighlight
      if (!Array.isArray(prev)) {
        prev = []
      }
      if (prev?.includes(value)) {
        updatedDefiningHighlight = prev.filter((item) => item !== value)
      } else {
        if (projectData?.projectHighlightTags?.length === 5) {
          toast.error(stepThreeText.selectFiveTags)
          return prev
        } else {
          updatedDefiningHighlight = [...prev, value]
        }
      }
      setProjectData((prevData) => ({
        ...prevData,
        projectHighlightTags: updatedDefiningHighlight,
      }))
      return updatedDefiningHighlight
    })
  }

  const renderArrayButtons = (
    buttons,
    title,
    onClick,
    category,
    tooltipText,
    isRequired = true
  ) => {
    if (!buttons || buttons.length === 0) {
      return null
    }

    return (
      <div className="rounded-md mb-2">
        <div className={`  mb-1 flex`}>
          <p className='text-[1rem]'> {title}</p>
          <div>
            <TooltipComponent tooltipText={tooltipText} />
            {isRequired && <span className='text-primary'>*</span>}
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          {buttons.map((button) => {
            const isButtonActive =
              Array.isArray(projectData[category]) &&
              projectData[category].includes(button)

            return (
              <button
                className={`px-3 mt-2 py-4 h-[22px] mb-3 min-w-[100px] w-fit  mr-3 rounded-full ${isButtonActive
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600'
                  } border-2 border-primary mx-1`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={button}
                onClick={() => onClick(category, button)}
              >
                {button}
              </button>
            )
          })}
        </div>
      </div>
    )
  }


  const handleProjectDataChange = (keyName, value) => {
    setProjectData({
      ...projectData,
      [keyName]: value,
    })
  }

  return (
    <div className="px-7 py-2">
      <div className="flex w-[100%] flex-wrap gap-10 gap-y-4">
        {isLand && (
          <div>
            <MDLabelAndInput
              label={stepThreeText.launchMonth}
              labelClass="text-headingColor"
              inputType="month"
              cssClass="w-[240px] h-[38px]"
              min="2000-01"
              max="2050-12"
              inputState={projectData?.launchDate
                && new Date(projectData.launchDate).toISOString().slice(0, 7)
              }
              onChangeFunction={(newValue) => {
                const updatedDate = newValue
                  ? new Date(`${newValue}-01`)
                  : null;
                setProjectData({
                  ...projectData,
                  launchDate: updatedDate && updatedDate.toISOString(),
                });
              }}
              isRequired={false}
            />
          </div>
        )}
        {isLand && (
          <div>
            <MDLabelAndInput
              label={stepThreeText.builtMonth}
              labelClass="text-headingColor"
              inputType="month"
              cssClass="w-[240px] h-[38px]"
              min="2000-01"
              max="2050-12"
              inputState={projectData?.builtDate
                && new Date(projectData.builtDate).toISOString().slice(0, 7)}
              onChangeFunction={(newValue) => {
                const updatedDate = newValue
                  ? new Date(`${newValue}-01`)
                  : null;
                setProjectData({
                  ...projectData,
                  builtDate: updatedDate && updatedDate.toISOString(),
                });
              }}
              isRequired={false}
            />
          </div>
        )}
        {(isLand || isIndustrialLand) && (
          <MDLabelAndInput
            label={stepThreeText.flooring}
            labelClass="text-headingColor"
            dropdownArray={floorings}
            // tooltipText="Enter the floor type"
            dropdownState={projectData?.flooring}
            dropdownClass=" w-[230px] h-[39px] mt-1.5"
            onSelectFunction={(value) =>
              handleProjectDataChange('flooring', value)
            }
            isRequired={false}
          />
        )}
        <MDLabelAndInput
          label={stepThreeText.numberofFloors}
          labelClass="text-headingColor"
          cssClass="w-[240px] h-[38px]"
          inputState={projectData?.floorCount}
          onChangeFunction={(value) =>
            handleProjectDataChange("floorCount", value)
          }
          isRequired={false}
        />
        <MDLabelAndInput
          label={stepThreeText.numOfTowers}
          labelClass="text-headingColor"
          cssClass="w-[240px] h-[38px]"
          inputState={projectData?.numOfTowers}
          onChangeFunction={(value) =>
            handleProjectDataChange("numOfTowers", value)
          }
          isRequired={false}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 py-5">
        {postProjectForm?.cafeteria && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={projectData?.cafeteria === stepThreeText.yes}
              onChange={() => {
                if (projectData?.cafeteria !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    cafeteria: stepThreeText.yes,
                  });
                } else {
                  setProjectData({
                    ...projectData,
                    cafeteria: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.cafeteria}</label>
          </div>
        )}
        {postProjectForm?.assuredReturn && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={projectData?.assuredReturn === stepThreeText.yes}
              onChange={() => {
                if (projectData?.assuredReturn !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    assuredReturn: stepThreeText.yes,
                  });
                } else {
                  setProjectData({
                    ...projectData,
                    assuredReturn: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.assuredReturn}</label>
          </div>
        )}
        {postProjectForm?.currentlyLeased && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={projectData?.currentlyLeased === stepThreeText.yes}
              onChange={() => {
                if (projectData?.currentlyLeased !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    currentlyLeased: stepThreeText.yes,
                  });
                } else {
                  setProjectData({
                    ...projectData,
                    currentlyLeased: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.currentlyLeased}</label>
          </div>
        )}
        {postProjectForm?.isConstructionDone && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={projectData?.isConstructionDone === stepThreeText.yes}
              onChange={() => {
                if (projectData?.isConstructionDone !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    isConstructionDone: stepThreeText.yes,
                  });
                } else {
                  setProjectData({
                    ...projectData,
                    isConstructionDone: "",
                  });
                }
              }}
              className="w-4 h-4 "
            />
            <label className="text-headingColor mr-2">{stepThreeText.anyConstructionDone}</label>
          </div>
        )}
        {postProjectForm?.gatedSociety && isAgriculturalLand && (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={projectData?.gatedSociety === stepThreeText.yes}
              onChange={() => {
                if (projectData?.gatedSociety !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    gatedSociety: stepThreeText.yes,
                  });
                } else {
                  setProjectData({
                    ...projectData,
                    gatedSociety: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.gatedSociety}</label>
          </div>
        )}
        {postProjectForm?.waterSewage && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.waterSewage === stepThreeText.yes}
              onChange={() => {
                if (projectData?.waterSewage !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    waterSewage: stepThreeText.yes,
                  });
                } else {
                  setProjectData({
                    ...projectData,
                    waterSewage: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.waterSewage}</label>
          </div>
        )}
        {postProjectForm?.electricitySupply && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.electricitySupply === stepThreeText.yes}
              onChange={() => {
                if (projectData?.electricitySupply !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    electricitySupply: stepThreeText.yes,
                  });
                }
                else {
                  setProjectData({
                    ...projectData,
                    electricitySupply: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.electricitySupply}</label>
          </div>
        )}
        {postProjectForm?.swimmingPool && isAgriculturalLand && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.swimmingPool === stepThreeText.yes}
              onChange={() => {
                if (projectData?.swimmingPool !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    swimmingPool: stepThreeText.yes,
                  });
                }
                else {
                  setProjectData({
                    ...projectData,
                    swimmingPool: "",
                  });
                }
              }}

              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.swimmingPool}</label>
          </div>
        )}
        {postProjectForm?.garden && isAgriculturalLand && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.garden === stepThreeText.yes}
              onChange={() => {
                if (projectData?.garden !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    garden: stepThreeText.yes,
                  });
                }
                else {
                  setProjectData({
                    ...projectData,
                    garden: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.garden}</label>
          </div>
        )}
        {postProjectForm?.guardRoom && isIndustrialLand && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.guardRoom === stepThreeText.yes}
              onChange={() => {
                if (projectData?.guardRoom !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    guardRoom: stepThreeText.yes,
                  });
                }
                else {
                  setProjectData({
                    ...projectData,
                    guardRoom: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.guardRoom}</label>
          </div>
        )}
        {postProjectForm?.airCoolingSystem && isIndustrialLand && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.airCoolingSystem === stepThreeText.yes}
              onChange={() => {
                if (projectData?.airCoolingSystem !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    airCoolingSystem: stepThreeText.yes,
                  });
                }
                else {
                  setProjectData({
                    ...projectData,
                    airCoolingSystem: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.airCoolingSystem}</label>
          </div>
        )}
        {postProjectForm?.dryStorage && isIndustrialLand && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.dryStorage === stepThreeText.yes}
              onChange={() => {
                if (projectData?.dryStorage !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    dryStorage: stepThreeText.yes,
                  });
                }
                else {
                  setProjectData({
                    ...projectData,
                    dryStorage: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.dryStorage}</label>
          </div>
        )}
        {postProjectForm?.coolingStorage && isIndustrialLand && (
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={projectData?.coolingStorage === stepThreeText.yes}
              onChange={() => {
                if (projectData?.coolingStorage !== stepThreeText.yes) {
                  setProjectData({
                    ...projectData,
                    coolingStorage: stepThreeText.yes,
                  });
                }
                else {
                  setProjectData({
                    ...projectData,
                    coolingStorage: "",
                  });
                }
              }}
              className="w-4 h-4"
            />
            <label className="text-headingColor mr-2">{stepThreeText.coolingStorage}</label>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-6 gap-y-2 mb-5 ">
        {isIndustrialLand &&
          <MDLabelAndInput
            label={stepThreeText.liftArea}
            labelClass="text-headingColor"
            cssClass="w-[240px] h-[38px]"
            inputState={projectData?.liftArea}
            onChangeFunction={(value) =>
              handleProjectDataChange("liftArea", value)
            }
            isRequired={false}
          />
        }
        {isIndustrialLand &&
          <MDLabelAndInput
            label={stepThreeText.loadingArea}
            labelClass="text-headingColor"
            cssClass="w-[240px] h-[38px]"
            inputState={projectData?.loadingArea}
            onChangeFunction={(value) =>
              handleProjectDataChange("loadingArea", value)
            }
            isRequired={false}
          />}

        {isIndustrialLand &&
          <MDLabelAndInput
            label={stepThreeText.selectMattingType}
            labelClass='text-headingColor'
            dropdownArray={MATTING_TYPE}
            cssClass="ml-1"
            dropdownState={projectData?.mattingType}
            dropdownClass="w-[240px] h-[38px]"
            onSelectFunction={(value) =>
              handleProjectDataChange("mattingType", value)
            }
            isRequired={false}
          />
        }
      </div>
      <div className='mt-3'>
        {postProjectForm[projectType][projectSubType]?.possessionStatus &&
          renderButtons(
            postProjectForm[projectType][projectSubType]?.possessionStatus,
            stepThreeText.possessionStatus,
            (category, value) => {
              setProjectData({
                ...projectData,
                [category]: value,
              })
            },
            'possessionStatus',
            stepThreeText.possessionStatusTooltip
          )}
        {!isLand && (projectData?.possessionStatus !== stepThreeText.readyToMove) && (
          <div className="mb-6">
            <MDLabelAndInput
              label={stepThreeText.proposedPossessionDate}
              labelClass='text-headingColor'
              inputType="date"
              cssClass="w-[240px] h-[38px]"
              min="2000-01-01"
              max="2050-12-31"
              inputState={
                projectData?.possessionDate &&
                new Date(projectData.possessionDate)
                  .toISOString()
                  .split("T")[0]
              }
              onChangeFunction={(newValue) => {
                const updatedDate = newValue ? new Date(newValue) : null;
                setProjectData({
                  ...projectData,
                  possessionDate: updatedDate && updatedDate.toISOString(),
                });
              }}
            />
          </div>
        )}
        {isLand &&
          (projectData?.possessionStatus !== stepThreeText.readyToMove) && (
            <div className="mb-6">
              <MDLabelAndInput
                label={stepThreeText.proposedPossessionDate}
                labelClass='text-headingColor'
                inputType="date"
                cssClass="w-[240px] h-[38px]"
                min="2000-01-01"
                max="2050-12-31"
                inputState={
                  projectData?.possessionDate &&
                  new Date(projectData.possessionDate)
                    .toISOString()
                    .split("T")[0]
                }
                onChangeFunction={(newValue) => {
                  const updatedDate = newValue ? new Date(newValue) : null;
                  setProjectData({
                    ...projectData,
                    possessionDate: updatedDate && updatedDate.toISOString(),
                  });
                }}
              />
            </div>
          )
        }
      </div>
      {renderArrayButtons(
        postProjectForm?.projectHighlightTags,
        stepThreeText.projectHighlightTags,
        (category, value) => handleHighlightTags(value),
        'projectHighlightTags',
        stepThreeText.projectHighlightTagsTooltip
      )}
      {isLand && (
        <div className="w-[100%]">
          <label className="text-headingColor">{stepThreeText.buildingAmenities}</label>
          <div className="mt-5">
            <Amenities
              DATA={projectData}
              setDATA={setProjectData}
              listing={listing}
              setListing={setListing}
            />
          </div>
        </div>
      )}
    </div>
  )
}