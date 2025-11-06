import React from 'react'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { formatDateValue, numberFormatter } from '@/utils/utils'

const {
  facingText,
  flooringText,
  pgFoodChargesText,
  areaTypeText,
  balconyViewText,
  bathroomText,
  bedroomText,
  builtDateText,
  coveredParkigText,
  floorNumberText,
  furnishingStatusText,
  maintenanceAmountText,
  maintenanceMethodText,
  parkingAvailabilityText,
  plotNumberText,
  plotShapeText,
  possesionDateText,
  possesionStatusText,
  electricityChargesText,
  propertySize,
  propertyStatusText,
  totalFloor,
  numberofUnits,
  towerAndBlock,
  uncoveredParking,
  maintenanceAmount,
  leaseTenureInYears,
  annualRent,
  leasedToBusiness,
  currentRentPerMonth,
  bookingAmount,
  preLeasedOrRented,
  reraApproved,
  ownershipType,
  floorCountText
} = COMPONENTS.SINGLE_PROPERTY_VIEW_COMPO.propertyInformationComponent

const {
  projectSubType,
  projectTypeText,
  propertySubTypeText,
  propertyTypeText,
  rentDepositeAmount,
  rentDepositeMethod,
  rentPriceText,
  salePriceText,
  cityText,
  numOfTowersText,
  anyConstructionDoneText,
  currentlyLeasedText,
  cafeteriaText,
  assuredReturnText,
  mattingTypeText,
  liftAreaText,
  loadingAreaText,
  gatedSocietyText,
  waterSewageText,
  electricitySupplyText,
  swimmingPoolText,
  gardenText,
  guardRoomText,
  airCoolingSystemText,
  dryStorageText,
  coolingStorageText,
  landTypeText,
} = GLOBALLY_COMMON_TEXT.text

const { suqareFeets } = GLOBALLY_COMMON_TEXT.units
const { pgRoomType, propertySizeUnits } = GLOBALLY_COMMON_TEXT

const formatFloorNumber = (num) => {
  switch (num) {
    case -3:
      return 'Lower Basement'
    case -2:
      return 'Basement'
    case -1:
      return 'Upper Basement'
    case -0.5:
      return 'Lower Ground Floor'
    case 0:
      return 'Ground'
    case 0.5:
      return 'Upper Ground Floor'
    default:
      return num
  }
}

export default function PropertyInformation({ propertyDetail }) {
  console.log("propertyDetail",propertyDetail);
  const keysToShow = [
    'propertyType',
    'projectType',
    'propertySubType',
    'projectSubType',
    'subLocality',
    'city',
    'propertySize',
    'salePrice',
    'rentPrice',
    'possessionStatus',
    'furnishingStatus',
    'bathroomCount',
    'bedroomCount',
    'uncoveredParkingCount',
    'coveredParkingCount',
    'facing',
    'flooring',
    'totalFloors',
    'floorCount',
    'totalUnitCount',
    'floorNumber',
    'towerBlock',
    'plotShape',
    'plotNumber',
    'propertyElectricityCharges',
    'pgRoomType',
    'possessionDate',
    'builtDate',
    'balconyView',
    'maintenanceAmount',
    'leaseTenure',
    'annualRent',
    'leasedToBusiness',
    'currentRentPerMonth',
    'bookingAmount',
    'preLeasedOrRented',
    'reraApproved',
    'ownershipType',
    'propertyStatus',
    'parkingAvailability',
    'rentDepositAmount',
    'rentDepositMethod',
    'pgFoodCharges',
    'areaDetail',
    'numOfTowers',
    'landType',
    'isConstructionDone',
    'currentlyLeased',
    'cafeteria',
    'assuredReturn',
    'mattingType',
    'liftArea',
    'loadingArea',
    'gatedSociety',
    'waterSewage',
    'electricitySupply',
    'swimmingPool',
    'garden',
    'guardRoom',
    'airCoolingSystem',
    'dryStorage',
    'coolingStorage',
  ]

  const keyDisplayNames = {
    propertyType: propertyTypeText,
    projectType: projectTypeText,
    propertySubType: propertySubTypeText,
    projectSubType: projectSubType,
    totalUnitCount: numberofUnits,
    city: cityText,
    propertySize: propertySize,
    salePrice: salePriceText,
    rentPrice: rentPriceText,
    possessionStatus: possesionStatusText,
    possessionDate: possesionDateText,
    areaDetail: areaTypeText,
    builtDate: builtDateText,
    furnishingStatus: furnishingStatusText,
    bathroomCount: bathroomText,
    bedroomCount: bedroomText,
    uncoveredParkingCount: uncoveredParking,
    coveredParkingCount: coveredParkigText,
    facing: facingText,
    flooring: flooringText,
    totalFloors: totalFloor,
    floorCount: floorCountText,
    floorNumber: floorNumberText,
    towerBlock: towerAndBlock,
    plotShape: plotShapeText,
    balconyView: balconyViewText,
    pgRoomType: pgRoomType,
    propertyElectricityCharges: electricityChargesText,
    propertyStatus: propertyStatusText,
    parkingAvailability: parkingAvailabilityText,
    maintenanceAmount: maintenanceAmount,
    rentDepositAmount: rentDepositeAmount,
    rentDepositMethod: rentDepositeMethod,
    plotNumber: plotNumberText,
    pgFoodCharges: pgFoodChargesText,
    numOfTowers: numOfTowersText,
    landType: landTypeText,
    isConstructionDone: anyConstructionDoneText,
    currentlyLeased: currentlyLeasedText,
    cafeteria: cafeteriaText,
    assuredReturn: assuredReturnText,
    mattingType: mattingTypeText,
    liftArea: liftAreaText,
    loadingArea: loadingAreaText,
    gatedSociety: gatedSocietyText,
    waterSewage: waterSewageText,
    electricitySupply: electricitySupplyText,
    swimmingPool: swimmingPoolText,
    garden: gardenText,
    guardRoom: guardRoomText,
    airCoolingSystem: airCoolingSystemText,
    dryStorage: dryStorageText,
    coolingStorage: coolingStorageText,
    leaseTenure: leaseTenureInYears,
    annualRent: annualRent,
    leasedToBusiness: leasedToBusiness,
    currentRentPerMonth: currentRentPerMonth,
    bookingAmount: bookingAmount,
    preLeasedOrRented: preLeasedOrRented,
    reraApproved: reraApproved,
    ownershipType: ownershipType,
  }

  const InfoToFormat = [
    'salePrice',
    'rentPrice',
    'propertySize',
    'maintenanceAmount',
    'currentRentPerMonth',
    'bookingAmount',
  ]

  const keysToObject = keysToShow.reduce((obj, key) => {
    obj[key] = keyDisplayNames[key]
    return obj
  }, {})

  const additionaCommonInformation = [
    'pgFoodAvailability',
    'pgServices',
    'availableFacilities',
    'dedicatedRooms',
  ]

  const areaDetail = propertyDetail?.areaDetail || []

  const getLabelFromValue = (value) => {
    const unit = propertySizeUnits.find((unit) => unit.value === value)
    return unit ? unit.label : suqareFeets
  }

  return (
    <div className="flex flex-wrap flex-row ">
      {Object.entries(keysToObject).map(([key, displayName], index) => {
        const value = propertyDetail?.[key]

        if (value === null || value === undefined || value === '') return null

        return (
          <div
            key={index}
            className="w-full max-md:w-1/2 md:w-1/2 lg:w-1/3 p-2 mb-4 min-w-0 flex justify-center"
          >
            <div className="flex flex-col items-center text-center text-[#5F5F5F] border-b border-dotted border-newBackground pb-2 w-full">
              <h4 className="capitalize font-semibold text-primary">
                {displayName || key}
              </h4>
              <div className="capitalize">
                {['builtDate', 'possessionDate'].includes(key) ? (
                  <p>{formatDateValue(value)}</p>
                ) : InfoToFormat.includes(key) ? (
                  <p>{`₹ ${numberFormatter(value)}`}</p>
                ) : key === 'areaDetail' ? (
                  <div className="inline-block">
                    {areaDetail.map((area, idx) => (
                      <div key={idx} className="flex gap-x-1 w-fit">
                        <p>{`${numberFormatter(area.propertySize)}`}</p>
                        <p>{`${getLabelFromValue(area.propertySizeUnit)}`}</p>
                        <p>({`${area.areaType}`})</p>
                      </div>
                    ))}
                  </div>
                ) : key === 'floorNumber' ? (
                  <p>{formatFloorNumber(value)}</p>
                ) : typeof value === 'boolean' ? (
                  <p>{value ? 'Yes' : 'No'}</p>
                ) : (
                  <p>{String(value)}</p>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {additionaCommonInformation?.map((arrayKey) =>
        propertyDetail?.[arrayKey]?.length
          ? propertyDetail[arrayKey].map((facility, index) => (
              <div
                key={`facility-${index}`}
                   className="w-full max-md:w-1/2 md:w-1/2 lg:w-1/3 p-2 mb-4 min-w-0 flex justify-center"
              >
                <div className="flex flex-col items-center text-center border-b border-dotted border-newBackground w-2/3 mx-auto">
                  <h4 className="capitalize text-primary font-semibold">
                    {facility}
                  </h4>
                  <p className="capitalize  text-sm">
                    {propertyDetail[arrayKey].includes(facility) ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
            ))
          : null
      )}
    </div>
  )
}
