import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Modal from '@mui/material/Modal'
import AmenitiesModal from '../amenities/AmenitiesModal'
import FurnishingDetails from '../SingleProperty/furnishingDetalis'
import PostPropertyCard from './cards/PostPropertyCard'
import { postPropertyMap } from "../../content/JSON/PostPropertyMap"
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
import ExpertIcon from '@/assets/ColorChangeIcons/PostPropertyCardsIcons/ExpertIcon'
import DirectIcon from '@/assets/ColorChangeIcons/PostPropertyCardsIcons/DirectIcon'
import { useAuth } from '@/context/auth'
import TooltipComponent from '../Tooltip'
const { stepOneText, stepThreeText } = COMPONENTS.POST_PROPERTY_COMPO
const { text, propertyTypes, units, listingIntent, propertySubTypeMap, propertyTypeMap } = GLOBALLY_COMMON_TEXT

export default function NewStep1({ showCard, DATA, setDATA, setSellOrRent, edit = false, setDeclarationOne, setDeclarationTwo, declarationOne, declarationTwo, isOthersClicked, setOthersClicked }) {

  const { propertyType, propertySubType, furnishingDetails, listing, additionalSubType } = DATA || ''
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [furnished, setFurnished] = useState('')
  const [defaultIcon, setDefaultIcon] = useState([])
  const [activeCard, setActiveCard] = useState('isAgentRequired' in DATA && (DATA?.isAgentRequired ? 1 : 2))
  const isSmallScreen = window <= 1024
  const [isModalOpen, setIsModalOpen] = useState()
  const [auth, setAuth] = useAuth()


  useEffect(() => {
    if (
      DATA?.furnishingStatus !== 'Unfurnished'
    ) {
      setFurnished(DATA?.furnishingStatus)
      if (
        DATA?.furnishingDetails?.length === 0 ||
        Object.keys(DATA?.furnishingDetails ?? {}).length === 0
      ) {

      }
    }
    if (DATA?.isAgentRequired != null) {
      setActiveCard(DATA?.isAgentRequired ? 1 : 2)
    }
    if (!edit) {
      setDeclarationOne(true)
      setDeclarationTwo(true)
    }
  }, [DATA])

  const handleContainerMORES = () => {
    setActiveCard(1)
    setSellOrRent(true)
    setDATA({
      ...DATA,
      isAgentRequired: true,
    })
  }

  const handleContainerFree = () => {
    setActiveCard(2)
    setSellOrRent(true)
    setDATA({
      ...DATA,
      isAgentRequired: false,
    })
  }

  const rawCards = [
    {
      id: 1,
      title: stepOneText.sellorrentHome,
      subtitle: text.superAreaExpert,
      color: 'rgba(147, 22, 2, 1)',
      borderColor: 'rgba(147, 22, 2, 1)',
      handleClick: handleContainerMORES,
      IconComponent: ExpertIcon,
    },
    {
      id: 2,
      title: stepOneText.sellOrRent,
      subtitle: stepOneText.directlyText,
      color: '#931602',
      borderColor: '#931602',
      handleClick: handleContainerFree,
      IconComponent: DirectIcon,
    },
  ];

  const cards = rawCards.map(card => ({
    ...card,
    icon: <card.IconComponent color={activeCard === card.id ? 'white' : '#931602'} />,
  }))

  const updatePropertyData = (key, value) => {
    setDATA(prev => ({
      ...prev,
      [key]: value
    }))
  }
  const renderInputFields = (label, name, type, index) => {
    return (
      type === 'month' ? (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label className="">
            {label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="month"
            value={DATA[name] ? new Date(DATA[name]).toISOString().slice(0, 7) : ''}
            min="1990-01"
            max="2023-12"
            onChange={(e) => {
              setDATA({
                ...DATA,
                [name]: e.target.value ? new Date(e.target.value).toISOString() : '',
              });
            }}
            className="border border-gray-500 rounded-md px-2 py-2 h-[29px]"
          />
        </div>
      ) : type === 'number' ? (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label className="">
            {label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="number"
            value={DATA[name] ?? ''}
            onChange={(e) => updatePropertyData(name, e.target.value)}
            className="border border-gray-500 rounded-md px-2 py-2 h-[29px]"
          />
        </div>
      ) : label === 'Rera Number' ? (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label>
            {label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            value={DATA[name] ?? ''}
            onChange={(e) => updatePropertyData(name, e.target.value)}
            className="border border-gray-500 rounded-md px-2 py-2 h-[29px]"
          />
        </div>
      ) : (
        <div className="flex flex-col p-1 gap-y-1" key={index}>
          <label>
            {label}
            <span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            value={DATA[name] ?? ''}
            onChange={(e) => updatePropertyData(name, e.target.value)}
            className="border border-gray-500 rounded-md px-2 py-2 w-[180px] h-[29px]"
          />
        </div>
      )
    );
  }
  const renderButton = (buttons, title, onPress, category) => {
    if (!buttons || buttons.length === 0) {
      return null;
    }
    return (
      <div>
        <div className="flex flex-row mb-1">
          <span className="font-medium text-base">{title}</span>
          <TooltipComponent tooltipText={'Land zones specify how a property can be legally used'} />
        </div>
        <div className="flex flex-row gap-3 flex-wrap mb-2">
          {buttons.map((button) => {
            const isButtonActive = DATA[category] === button;
            return (
              <button
                className={`flex flex-row items-center text-center justify-center px-4 py-1 rounded-full ${isButtonActive
                  ? 'bg-primary  text-white'
                  : 'border border-newBackground  text-gray-600'
                  }`}
                key={button}
                onClick={() => onPress(category, button)}
              >
                <span>{button}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  const renderButtons = (buttons, title, disable = false, onClick, isFurnishingDetailVisible) => {
    if (!buttons || buttons.length === 0) {
      return null;
    }

    return (
      <div className="rounded-md bg-white px-1">
        <div className="flex flex-row mb-2">
          <span className="font-medium text-base">{title}</span>
          <span className="text-red-500"> *</span>
        </div>
        <div className="flex flex-row flex-wrap mb-3 gap-1">
          {buttons.map((button) => (
            <button
              className={`flex flex-row items-center text-center justify-center px-4 py-1 rounded-full ${DATA && Object.values(DATA).includes(button)
                ? disable
                  ? 'border bg-gray-400 border-primary text-white'
                  : 'bg-primary text-white'
                : 'bg-white border border-primary'
                } `}
              key={button}
              disabled={disable}
              onClick={() => onClick(button)}
            >
              <span className={` ${DATA && Object.values(DATA).includes(button)
                ? 'text-white'
                : 'text-gray-600'
                }`}>
                {button}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  const categoryToDisplay = (propertySubType) => {
    if (propertySubType === 'Plot/Land') {
      return 'Commercial Subcategory'
    } else if (propertySubType === 'Office Space') {
      return 'Office Subcategory'
    }
    else if (propertySubType === 'Retail Shop/Showroom') {
      return 'Retail Shop/Showroom Subcategory'
    }
    else if (propertySubType === 'Co-Working Space') {
      return 'Siting Space'
    }
  }
  return (
    <div className={`px-5 lg:flex-row md:flex-row bg-white sm:flex-col lg:justify-start md:justify-start  md:gap-10 sm:gap-5 `} >
      {showCard && (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-0 px-4 pb-2 pt-0 max-w-[800px]">
          {cards.map((card) => (
            <div key={card._id} className="cursor-pointer">
              <PostPropertyCard
                title={card.title}
                subtitle={card.subtitle}
                icon={card.icon}
                color={card.color}
                active={activeCard === card.id}
                borderColor={card.borderColor}
                handleClick={edit ? null : card.handleClick}
                DATA={DATA}
                edit={edit}
              />
            </div>
          ))}
        </div>
      )}
      <div className="pl-7">
        {renderButtons(['Sell', 'Rent'], 'Listing', edit ? true : false, (value) => {
          if (listing) {
            setDATA({
              areaDetail: DATA?.areaDetail,
              isAgentRequired: DATA?.isAgentRequired,
              listing: value
            })
          } else {
            setDATA({
              ...DATA,
              listing: value,
            })
          }
        })}
        {renderButtons(
          ['Residential', 'Commercial', 'Industrial', 'Agricultural'],
          'Property Type',
          edit ? true : false,
          (value) => {
            if (propertySubType) {
              delete DATA?.propertySubType
            }
            if (propertyType) {
              setDATA({
                areaDetail: DATA?.areaDetail,
                listing: DATA?.listing,
                isAgentRequired: DATA?.isAgentRequired,
                propertyType: value,
              })
            } else {
              setDATA({
                ...DATA,
                propertyType: value,
              })
            }
          }
        )}
        {renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.propertySubType,
          'Property Subtype',
          edit ? true : false,
          (value) => {
            if (propertySubType) {
              setDATA({
                areaDetail: DATA?.areaDetail,
                listing: DATA?.listing,
                propertyType: propertyType,
                isAgentRequired: DATA?.isAgentRequired,
                propertySubType: value,
              })
            } else {
              setDATA({
                ...DATA,
                propertySubType: value,
              })
            }
          }
        )}
        {renderButtons(
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA.propertySubType]?.furnishingStatus?.list,
          'Furnishing Status',
          false,
          (value) => {
            setDATA((prevDATA) => {

              const newData = { ...prevDATA, furnishingStatus: value };


              if (value !== DATA?.furnishingStatus) {
                newData.furnishingDetails = {};
              }


              const shouldOpenModal =
                value === 'Furnished' ||
                value === 'Semi Furnished' ||
                (value === 'Bareshell' && newData.propertySubType === 'Office Space');

              if (shouldOpenModal) {
                setIsModalOpen(true);
              }

              return newData;
            });
          },
          true
        )}

        {furnishingDetails && Object.keys(furnishingDetails).length > 0 && (
          <div className="flex flex-col items-start">
            <h4 className={`text-left pb-3`}>
              Furnishing Details
            </h4>
            <FurnishingDetails furnishingDetails={furnishingDetails} furnishingStatus={DATA?.furnishingStatus}/>
          </div>
        )}
        {
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA.propertySubType]?.additionalSubType && (
            renderButtons(
              postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA.propertySubType]?.additionalSubType?.list,
              categoryToDisplay(DATA?.propertySubType),
              edit ? true : false,
              (value) => {
                if (additionalSubType) {
                  setDATA({
                    areaDetail: DATA?.areaDetail,
                    listing: DATA?.listing,
                    propertyType: DATA?.propertyType,
                    isAgentRequired: DATA?.isAgentRequired,
                    propertySubType: DATA?.propertySubType,
                    furnishingStatus: DATA?.furnishingStatus,
                    furnishingDetails:DATA?.furnishingDetails,
                    additionalSubType: value
                  })
                } else {
                  setDATA({
                    ...DATA,
                    additionalSubType: value,
                  })
                }
              }
            )
          )
        }
        {
          postPropertyMap[DATA?.listing]?.[DATA.propertyType]?.[DATA?.propertySubType]?.landZone && (
            renderButton(postPropertyMap[DATA?.listing]?.['Residential']?.['Flat/Apartment']?.landZone?.list,
              'Land Zone',
              (category, value) => {
                setOthersClicked(value === 'Others' ? true : false)
                setDATA((prev) => {
                  return {
                    ...prev,
                    [category]: value
                  }
                })
              },
              'landZone'
            )
          )
        }
        {
          isOthersClicked && (
            postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[DATA?.propertySubType]?.inputs?.otherLandZoneInput.map((obj, index) => (
              renderInputFields(obj?.field?.label, obj?.field?.name, obj?.field?.type, index)
            ))
          )
        }
        <Modal
          open={isModalOpen}
          onClose={() => {
                if(Object.keys(DATA?.furnishingDetails).length===0){
                  DATA.furnishingStatus=""
                }
                setIsModalOpen(false)
              }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{
            zIndex: '99999',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              maxWidth: '620px',
              width: 'fit-content',
              margin: 'auto',
              marginTop: '2%',
              bgcolor: 'background.paper',
              borderRadius: '15px',
              boxShadow: 24,
              '@media (max-width: 600px)': {
                width: '90%',
              },
              overflowY: isSmallScreen ? 'auto' : 'hidden',
              maxHeight: isSmallScreen ? '80vh' : 'auto',
            }}
          >
            <AmenitiesModal
              isOpen={isModalOpen}
              onClose={() => {
                if(Object.keys(DATA?.furnishingDetails).length===0){
                  DATA.furnishingStatus=""
                }
                setIsModalOpen(false)
              }}
              furnished={furnished}
              setFurnished={setFurnished}
              defaultIcon={defaultIcon}
              setDefaultIcon={setDefaultIcon}
              DATA={DATA}
              setDATA={setDATA}
            />
          </Box>
        </Modal>
        {edit && (
          <>
            <div className="flex mt-4">
              <div className="flex -mt-[7px] items-start ">
                <Checkbox
                  {...label}
                  checked={declarationOne}
                  sx={{
                    color: 'red',
                    '&.Mui-checked': {
                      color: '#0168A2',
                    },
                    '& .MuiSvgIcon-root': { fontSize: 20 },
                  }}
                  onChange={() => {
                    setDeclarationOne(!declarationOne)
                    setDeclarationTwo(!declarationTwo)
                  }}
                />
              </div>
              <label className="ml-2 text-gray-600 font-semibold bg-opacity-5 rounded-[4.95px]">
                I confirm that I have carefully reviewed my listing and understand that once the listing information is submitted, it cannot be edited. I hereby agree that the above information is accurate, and SuperArea has the full right to block or disable my account if the information provided is incorrect.
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  )
}