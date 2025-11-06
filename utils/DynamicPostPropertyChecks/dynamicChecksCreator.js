// Updated generateValidationForStep function with proper conditional validation

import { postPropertyMap } from "@/content/JSON/PostPropertyMap"

export function generateValidationForStep(
  DATA,
  stepNumber,
  userType = 'Individual'
) {
  let propertyConfig

  // Step 1 basic validation
  if (stepNumber === 1) {
    if (DATA?.isAgentRequired === undefined && userType === 'Individual') {
      return 'Sell or Rent via SuperArea expert or Directly is missing'
    } else if (!DATA?.listing) {
      return 'Listing type is missing'
    } else if (!DATA?.propertyType) {
      return 'Property Type is missing'
    } else if (!DATA?.propertySubType) {
      return 'Property Sub Type is missing'
    }
  }

  // Step 2 location validation
  if (stepNumber === 2) {
    const locationValidation = []

    if (!DATA?.propertyTitle || DATA?.propertyTitle.trim() === '') {
      locationValidation.push({
        propertyTitle: 'Location and Building is required',
      })
    }

    if (!DATA?.locality || DATA?.locality.trim() === '') {
      locationValidation.push({ locality: 'Locality Name is required' })
    }

    if (!DATA?.city || DATA?.city.trim() === '') {
      locationValidation.push({ city: 'City Name is required' })
    }

    if (!DATA?.state || DATA?.state.trim() === '') {
      locationValidation.push({ state: 'State Name is required' })
    }

    // Return location validation errors if any exist
    if (locationValidation.length > 0) {
      return locationValidation
    }
  }

  propertyConfig =
    postPropertyMap[DATA?.listing]?.[DATA?.propertyType]?.[
      DATA?.propertySubType
    ]

  if (!propertyConfig) {
    return []
  }

  const validation = []

  // Helper function to validate only if field exists in config AND is required AND should be rendered
  const validateIfExists = (fieldName, displayName) => {
    const fieldConfig = propertyConfig[fieldName]

    // Only validate if:
    // 1. Field exists in property config
    // 2. Field is marked as required
    // 3. Field value is missing/empty
    if (
      fieldConfig &&
      fieldConfig.required === true &&
      (!DATA[fieldName] ||
        (Array.isArray(DATA[fieldName]) && DATA[fieldName].length === 0))
    ) {
      // Special handling for furnishing status
      if (
        fieldName === 'furnishingStatus' &&
        DATA[fieldName] === 'Unfurnished'
      ) {
        return
      }

      validation.push({ [fieldName]: `${displayName} is required` })
    }
  }

  // Component-based validation - only validate fields that are actually rendered
  const validateFieldsForStep = (stepNum) => {
    switch (stepNum) {
      case 1:
        // Step 1: Only validate fields that actually appear in NewStep1 component
        validateIfExists('furnishingStatus', 'Furnishing Status')
        validateIfExists('additionalSubType', 'Sub Category')
        validateIfExists('landZone', 'Land Zone')
        break

      case 2:
        // Step 2: Fields that appear in NewStep2 component (mostly handled above)
        break

      case 3:
        // Step 3: Only validate fields that appear in NewStep3 component
        validateIfExists('possessionStatus', 'Possession Status')
        validateIfExists('bedroomCount', 'Bedroom')
        validateIfExists('bathroomCount', 'Bathroom')
        validateIfExists('dedicatedRooms', 'Dedicated Rooms')
        validateIfExists('numberOfOpenSides', 'Number of Open Sides')
        validateIfExists('boundaryWallMade', 'Boundary Wall')
        validateIfExists('anyConstructionDone', 'Construction Done')
        validateIfExists('cornerShop', 'Corner Shop')
        break

      case 4:
        // Step 4: No required field validation (just file uploads)
        break

      case 5:
        // Step 5: Only validate fields that appear in NewStep5 component
        validateIfExists('liftAvailability', 'Lift Availability')

        // FIXED: Check if parking field exists in config before validating
        // The field name in your property map is 'parkingAvailable', not 'parkingAvailability'
        if (propertyConfig.parkingAvailable) {
          validateIfExists('parkingAvailability', 'Parking Available')
        }

        validateIfExists('sewage', 'Sewage')
        validateIfExists('gasPipeline', 'Gas Pipeline')
        validateIfExists('waterSupply', 'Water Supply')
        validateIfExists('powerBackup', 'Power Backup')
        validateIfExists('streetLighting', 'Street Lighting')
        validateIfExists('electricitySupply', 'Electricity Supply')
        validateIfExists('loanAvailability', 'Loan Availability')
        validateIfExists('ownershipType', 'Ownership Type')
        validateIfExists('pantry', 'Pantry')
        validateIfExists('washroom', 'Washroom')
        break

      case 6:
        // Step 6: Only validate fields that appear in NewStep6 component
        validateIfExists('labels', 'Labels')
        break

      default:
        break
    }
  }

  // Run step-specific validation
  validateFieldsForStep(stepNumber)

  // Validate input fields from inputs section
  if (propertyConfig?.inputs) {
    const inputSectionsForStep = {
      1: ['otherLandZoneInput'],
      2: [
        'stepTwoInput',
        'rentedOrLeasedStepTwoInputField',
        'reraApprovedInput',
      ],
      3: ['stepThreeInput', 'dimensionFields'],
      5: ['additionalInputField', 'shopFacadeInputField'],
    }

    const currentStepSections = inputSectionsForStep[stepNumber] || []

    currentStepSections.forEach((sectionName) => {
      const inputArray = propertyConfig.inputs[sectionName]
      if (Array.isArray(inputArray)) {
        inputArray.forEach((item) => {
          if (item.required && item.field?.name) {
            const fieldName = item.field.name
            const fieldValue = DATA[fieldName]

            // Additional condition checks for conditional fields
            let shouldValidate = true

            // Only validate RERA number if RERA is approved
            if (fieldName === 'reraNumber' && DATA.reraApproved !== 'Yes') {
              shouldValidate = false
            }

            // Only validate lease-related fields if property is pre-leased
            if (
              [
                'leaseTenure',
                'annualRent',
                'leasedToBusiness',
                'currentRentPerMonth',
              ].includes(fieldName) &&
              DATA.preLeasedOrRented !== 'Yes'
            ) {
              shouldValidate = false
            }

            // Only validate other land zone if landZone is 'Others'
            if (fieldName === 'otherLandZone' && DATA.landZone !== 'Others') {
              shouldValidate = false
            }

            if (
              shouldValidate &&
              (fieldValue === undefined ||
                fieldValue === null ||
                fieldValue === '')
            ) {
              const label = item.field.label || getFieldDisplayName(fieldName)
              validation.push({ [fieldName]: `${label} is required` })
            }
          }
        })
      }
    })
  }

  // Step 3 specific validations
  if (stepNumber === 3) {
    // Property size validation for different property types
    if (
      ['Plot/Land', 'Commercial Land', 'Agricultural/Farm Land'].includes(
        DATA.propertySubType
      )
    ) {
      if (!DATA.propertySize) {
        validation.push({ propertySize: 'Property size is required' })
      }
      if (!DATA.propertySizeUnit) {
        validation.push({ propertySizeUnit: 'Property size unit is required' })
      }
    }
    // Area details validation for sell properties
    else if (
      DATA.listing === 'Sell' &&
      DATA.areaDetail &&
      Array.isArray(DATA.areaDetail)
    ) {
      let hasValidAreaDetail = false
      DATA.areaDetail.forEach((item, index) => {
        if (item.propertySize && item.propertySize > 0) {
          hasValidAreaDetail = true
        } else {
          const areaType = item.areaType || `Area ${index + 1}`
          validation.push({
            [`areaDetail[${index}].propertySize`]: `${areaType} size is required`,
          })
        }
      })
    }
  }

  // Handle parking validation only if parking is available AND parking field exists in config
  if (
    stepNumber === 5 &&
    DATA.parkingAvailability === 'Yes' &&
    propertyConfig.parkingAvailable
  ) {
    const parkingTypes = [
      'coveredParking',
      'uncoveredParking',
      'mechanicalParking',
      'publicParking',
      'privateParking',
      'multilevelParking',
    ]

    const availableParkingTypes = parkingTypes.filter(
      (type) => propertyConfig[type]
    )

    const selectedParkingTypes = availableParkingTypes.filter(
      (type) => DATA[type] && DATA[type] !== 'None'
    )

    if (availableParkingTypes.length > 0 && selectedParkingTypes.length === 0) {
      validation.push({
        parkingType: 'Please select at least one parking type',
      })
    }
  }

  return validation
}

// Helper function to get user-friendly field names
function getFieldDisplayName(fieldName) {
  const fieldNameMap = {
    furnishingStatus: 'Furnishing Status',
    additionalSubType: 'Sub Category',
    landZone: 'Land Zone',
    bedroomCount: 'Bedroom',
    bathroomCount: 'Bathroom',
    dedicatedRooms: 'Dedicated Rooms',
    possessionStatus: 'Possession Status',
    parkingAvailability: 'Parking Available',
    liftAvailability: 'Lift Availability',
    powerBackup: 'Power Backup',
    waterSupply: 'Water Supply',
    ownershipType: 'Ownership Type',
    propertySize: 'Property Size',
    propertySizeUnit: 'Property Size Unit',
    salePrice: 'Sale Price',
    rentPrice: 'Rent Price',
    rentDepositAmount: 'Security Deposit',
    totalFloors: 'Total Floors',
    floorNumber: 'Floor Number',
    unitNumber: 'Unit Number',
    towerBlock: 'Tower/Block',
    plotNumber: 'Plot Number',
    maintenanceAmount: 'Maintenance Amount',
    builtDate: 'Built Date',
    reraNumber: 'RERA Number',
    leaseTenure: 'Lease Tenure',
    annualRent: 'Annual Rent',
    otherLandZone: 'Other Land Zone',
    numberOfOpenSides: 'Number of Open Sides',
    boundaryWallMade: 'Boundary Wall',
    anyConstructionDone: 'Construction Done',
    cornerShop: 'Corner Shop',
    sewage: 'Sewage',
    gasPipeline: 'Gas Pipeline',
    streetLighting: 'Street Lighting',
    electricitySupply: 'Electricity Supply',
    loanAvailability: 'Loan Availability',
    propertyTitle: 'Location and Building',
    locality: 'Locality Name',
    city: 'City Name',
    state: 'State Name',
    subLocality: 'Sub Locality',
    pantry: 'Pantry',
    washroom: 'Washroom',
  }

  return (
    fieldNameMap[fieldName] ||
    fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1).replace(/([A-Z])/g, ' $1')
  )
}
