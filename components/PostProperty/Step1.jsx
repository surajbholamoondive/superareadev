import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import postPropertyFormCondition from '@/content/JSON/postPropertyFormCondition'
import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Modal from '@mui/material/Modal'
import AmenitiesModal from '../amenities/AmenitiesModal'
import FurnishingDetails from '../SingleProperty/furnishingDetalis'
import PostPropertyCard from './cards/PostPropertyCard'
import styles from './PropertyDetails.module.css'
import { COMPONENTS, GLOBALLY_COMMON_TEXT, SINGLE_PROPERTY_VIEW_TEXT } from '@/textV2'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const { carpetArea } = GLOBALLY_COMMON_TEXT?.units
import ExpertIcon from '@/assets/ColorChangeIcons/PostPropertyCardsIcons/ExpertIcon'
import DirectIcon from '@/assets/ColorChangeIcons/PostPropertyCardsIcons/DirectIcon'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 4,
}
const { stepOneText, stepThreeText } = COMPONENTS.POST_PROPERTY_COMPO
const { text, propertyTypes, units, listingIntent, propertySubTypeMap, propertyTypeMap} = GLOBALLY_COMMON_TEXT
const turquoise = '#0168A2'
export default function Step1({
  setSellOrRent,
  DATA,
  setDATA,
  trigger,
  setTrigger,
  setPropertyDetails,
  showCard,
  edit,
  setDeclarationOne,
  setDeclarationTwo,
  declarationOne,
  declarationTwo,
}) {
  const { propertyType, propertySubType, furnishingDetails, listing } = DATA
  const isSmallScreen = window <= 1024
  const [isModalOpen, setIsModalOpen] = useState()
  const [activeCard, setActiveCard] = useState(
    'isAgentRequired' in DATA && (DATA?.isAgentRequired ? 1 : 2)
  )
  const [furnished, setFurnished] = useState('')
  const [defaultIcon, setDefaultIcon] = useState([])
  useEffect(() => {
    const { listing, propertySubType, propertyType, furnishingStatus } = DATA
    if (listing === text.capitalizeSellText) {
      if (
        [
          propertyTypes.apartmentText,
          propertyTypes.houseOrVilla,
          stepThreeText.builderFloorText,
          propertyTypes.penthouseText,
          propertyTypes.officeSpace,
          propertyTypes.warehouseText,
          propertyTypes.showroomText,
          propertyTypes.shopText,
          propertySubTypeMap?.serviceApartment,
          propertySubTypeMap?.farmhouse,
          propertySubTypeMap?.Showroom,
          propertySubTypeMap?.hospitality,
          propertySubTypeMap?.Warehouse,
          propertySubTypeMap?.hospitality,
          propertySubTypeMap?.Shop,
          propertySubTypeMap?.manufacturing,
          propertySubTypeMap?.factory,
          propertySubTypeMap?.industrialBuilding,
          
        ].includes(propertySubType) &&
        listing &&
        propertySubType &&
        propertyType &&
        furnishingStatus
      ) {
        setPropertyDetails(true)
      } else if (
        [propertyTypes.plotText, propertyTypes.commercialLandText,propertySubTypeMap?.CommercialLand,propertySubTypeMap.industrialShed,propertySubTypeMap.agricultureFarmLand].includes(propertySubType) &&
        listing &&
        propertySubType &&
        propertyType
      ) {
        setPropertyDetails(true)
      } else {
        setPropertyDetails(false)
      }
    } else if (listing === text.capitalizeRentText) {
      if (
        [
          propertyTypes.apartmentText,
          propertyTypes.houseOrVilla,
          stepThreeText.builderFloorText,
          propertyTypes.penthouseText,
          propertyTypes.officeSpace,
          propertyTypes.warehouseText,
          propertyTypes.showroomText,
          propertyTypes.shopText,
          propertySubTypeMap?.manufacturing,
          propertySubTypeMap?.factory,
          propertySubTypeMap?.Warehouse,
          propertySubTypeMap?.industrialBuilding,
          propertySubTypeMap?.farmhouse
        ].includes(propertySubType) &&
        listing &&
        propertySubType &&
        propertyType &&
        furnishingStatus
      ) {
        setPropertyDetails(true)
      } else if (
        [propertyTypes.plotText, propertyTypes.commercialLandText,propertySubTypeMap?.CommercialLand,propertySubTypeMap.industrialShed,propertySubTypeMap.agricultureFarmLand].includes(propertySubType) &&
        listing &&
        propertySubType &&
        propertyType
      ) {
        setPropertyDetails(true)
      } else if (propertySubType === propertyTypes.pgText && listing && propertyType) {
        setPropertyDetails(true)
      } else {
        setPropertyDetails(false)
      }
    } else {
      setPropertyDetails(false)
    }
    setTrigger(propertySubType ? propertySubType : propertyType)
    if (
      DATA?.furnishingStatus === text.furnishedText ||
      DATA?.furnishingStatus === text.semiFurnishedText
    ) {
      setFurnished(DATA?.furnishingStatus)
      if (
        DATA?.furnishingDetails?.length === 0 ||
        Object.keys(DATA?.furnishingDetails ?? {}).length === 0
      ) {
        delete DATA.furnishingStatus
        setPropertyDetails(false)
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

  const openModal = (value) => {
    setDATA({ ...DATA, furnishingStatus: value })
    {
      value === 'Unfurnished' || value === 'Bareshell'
        ? ''
        : setIsModalOpen(true)
    }
  }
  const closeModal = (_, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return
    }
    setIsModalOpen(false)
  }
  const renderButtons = (
    buttons,
    title,
    disable = false,
    onClick,
    isFurnishingDetailVisible
  ) => {
    if (!buttons || buttons.length === 0) {
      return null
    }
    return (
      <div className="rounded-md bg-white">
        <div className="flex mb-2">
          <h4 className={`${styles.property_label} font-medium `}>{title}</h4>
          <span className="text-red-500 ml-[2px]"> *</span>
        </div>
        <div className="flex gap-3 flex-wrap mb-3">
          {buttons.map((button) => (
            <button
              className={`px-3 py-2 h-[25px] w-fit rounded-full ${DATA && Object.values(DATA).includes(button) && edit ? ' opacity-30' : ''}
              ${DATA && Object.values(DATA).includes(button)
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600'
                }  border-2 border-primary`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isFurnishingDetailVisible && 1,
              }}
              key={button}
              disabled={disable}
              onClick={() => onClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const getPropertySubTypeOptions = () => {
    const { propertyType } = DATA
    
    return (
      postPropertyFormCondition[DATA?.listing]?.[propertyType]
        ?.propertySubType || [
        propertySubTypeMap.Apartment,
        propertySubTypeMap.HouseOrVilla,
        propertySubTypeMap.Plot,
        propertySubTypeMap.BuilderFloor,
        propertySubTypeMap.Penthouse,
      ]
    )
  }
  const pathname = usePathname()
  const urlParams = new URLSearchParams(window.location.search)
  const propId = urlParams.get('propertyId')
  const propertySubTypeOptions = getPropertySubTypeOptions()

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
  }));

    const updatePropertyData = (key, value) => {
    setDATA(prev => ({
      ...prev,
      [key]: value
    }))
  }


  return (
    <div
      className={`px-5 lg:flex-row md:flex-row bg-white sm:flex-col lg:justify-start md:justify-start  md:gap-10 sm:gap-5 `}
    >
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
              />
            </div>
          ))}
        </div>
      )}
      <div className="pl-7">
        {renderButtons(listingIntent, text.listingText, edit ? true : false, (value) => {
          if (listing) {
            setDATA({
              areaDetail: DATA?.areaDetail,
              isAgentRequired: DATA?.isAgentRequired,
              listing: value,
            })
            setPropertyDetails(false)
          } else {
            setDATA({
              ...DATA,
              listing: value,
            })
          }
          setTrigger(value)
        })}
        {propertySubTypeOptions.length > 0 &&
          renderButtons(
           propertyTypeMap,
            text.propertyTypeText,
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
                setPropertyDetails(false)
              } else {
                setDATA({
                  ...DATA,
                  propertyType: value,
                })
              }
              setTrigger(value)
            }
          )}
        {propertySubTypeOptions.length > 0 &&
          renderButtons(
            propertySubTypeOptions,
            stepOneText.propertySubTypeText,
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
              setTrigger(value)
            }
          )}
        {postPropertyFormCondition[listing]?.[trigger]?.furnishingStatus &&
          renderButtons(
            postPropertyFormCondition[listing]?.[trigger]?.furnishingStatus,
            SINGLE_PROPERTY_VIEW_TEXT.propertyInformationComponent.furnishingStatusText,
            false,
            async (value) => {
              if (
                value === text.capitalisedUnfurnished ||
                value === text.bareshellText
              ) {
                await setDATA((prevDATA) => ({
                  ...prevDATA,
                  furnishingStatus: value,
                  furnishingDetails: {},
                }))
              } else {
                await setDATA((prevDATA) => ({
                  ...prevDATA,
                  furnishingStatus: value,
                }))
                openModal(value)
              }
            },
            true
          )}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
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
              onClose={closeModal}
              furnished={furnished}
              setFurnished={setFurnished}
              defaultIcon={defaultIcon}
              setDefaultIcon={setDefaultIcon}
              DATA={DATA}
              setDATA={setDATA}
            />
          </Box>
        </Modal>
        {furnishingDetails && Object.keys(furnishingDetails).length > 0 && (
          <div className="flex flex-col items-start">
            <h4 className='text-left pb-3'>
              {SINGLE_PROPERTY_VIEW_TEXT.text.furnishingDetailsText}
            </h4>
            <FurnishingDetails furnishingDetails={furnishingDetails} />
          </div>
        )}
        {edit && (
          <>
            <div className="flex mt-4">
              <div className="flex -mt-[7px] items-start ">
                <Checkbox
                  {...label}
                  checked={declarationOne}
                  sx={{
                    color: turquoise,
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
                {stepOneText.editDeclearation}
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
