const commonAmenities = {
    'Swimming Pool': "https://Swimming-Pool.svg",
    'Bed Room': "https://Bed-Room.svg",
    'Bath Room': "https://Bath-Room.svg"
}

const LAND_ZONE_LIST = ['Residential Zone', 'Commercial Zone', 'Industrial Zone', 'Transport and Communication', 'Public Utilities', 'Public and Semi Public Use', 'Open Spaces', 'Agricultural Zone', 'Special Economic Zone', 'Natural Conservation Zone', 'Government Use', 'Others']
const OWNERSHIP_TYPES= ['Free hold', 'Leasehold', 'Co-operative Society', 'Power of attorney', 'Trust/Institutional Ownership']
export const inputField = {
    rentPrice: {
        name: "rentPrice",
        type: "number",
        maxLength: 20,
        width: 160,
        label: "Expected Rent Price (Per Month)",
        tooltipText: "The monthly rental amount for this property."
    },
    salePrice: {
        name: "salePrice",
        type: "number",
        maxLength: 20,
        width: 160,
        label: "Expected Sale Price",
        tooltipText: "The total price for purchasing this property."
    },
    bookingAmount: {
        name: "bookingAmount",
        type: "number",
        maxLength: 20,
        width: 160,
        label: "Booking Amount",
    },
    priceIncludes: {
        name: "priceIncludes",
        type: "text",
        width: 100,
        label: "Price Includes",
    },
    pricePerUnit: {
        name: "pricePerUnit",
        type: "number",
        maxLength: 20,
        width: 160,
        label: "Price/Unit.",
        tooltipText: "Property price per unit"
    },
    propertyTitle: {
        name: "propertyTitle",
        type: "text",
        label: "Project Name",
        tooltipText: "The official name of the building or housing project."
    },
    pgName: {
        name: "propertyTitle",
        type: "number",
        label: "PG Name",
        tooltipText: "The name of the paying guest accommodation."
    },
    propertySize: {
        name: "propertySize",
        type: "number",
        maxLength: 5,
        width: 160,
        label: "Property Size",
        tooltipText: "The total area of the property."
    },
    rentDepositAmount: {
        name: "rentDepositAmount",
        type: "number",
        maxLength: 10,
        width: 160,
        label: "Deposit Amount",
        tooltipText: "The initial security deposit required to rent this property."
    },
    maintenanceAmount: {
        name: "maintenanceAmount",
        type: "number",
        maxLength: 10,
        width: 160,
        label: "Maintenance Fee",
        tooltipText: "The periodic fee for maintenance services."
    },
    totalFloors: {
        name: "totalFloors",
        type: "number",
        maxLength: 3,
        width: 100,
        label: "Total Floors",
        tooltipText: "The total number of floors in the building."
    },
    floorNumber: {
        name: "floorNumber",
        type: "number",
        width: 160,
        label: "Floor Number",
        tooltipText: "The specific floor on which this property is located."
    },
    towerBlock: {
        name: "towerBlock",
        type: "text",
        width: 160,
        label: "Tower/Block",
        tooltipText: "The designated tower or block name within a multi-tower complex."
    },
    unitNumber: {
        name: "unitNumber",
        type: "text",
        maxLength: 5,
        width: 160,
        label: "Unit Number",
        tooltipText: "The unique identification number of the specific apartment or unit."
    },
    plotNumber: {
        name: "plotNumber",
        type: "text",
        width: 160,
        label: "Plot number",
        tooltipText: "The designated plot number for an independent house or land."
    },
    possessionDate: {
        name: "possessionDate",
        type: "month",
        label: "Possession Date",
        tooltipText: "The date on which the property will be available for occupancy."
    },
    builtDate: {
        name: "builtDate",
        type: "month",
        label: "Built Month",
        tooltipText: "The month and year of building/project construction."
    },
    //Studio/Service Apartment
    managedBy: {
        name: "managedBy",
        type: "text",
        label: "Managed By"
    },
    //farmhouse specific field
    lengthOfPlot: {
        name: 'lengthOfPlot',
        type: "number",
        label: 'Length Of Plot'
    },
    breadthOfPlot: {
        name: 'breadthOfPlot',
        type: "number",
        label: 'Breadth Of Plot'
    },
    //WareHouse specific field
    height: {
        name: 'height',
        type: 'number',
        label: 'Height Of Warehouse',
    },
    //WareHouse specific field
    areaOfLandBuildIn: {
        name: 'areaOfLandBuildIn',
        type: 'number',
        label: 'Area Of Land It Is Built In'
    },
    //Hospitality Specific field
    leaseTenure: {
        name: 'leaseTenure',
        type: 'number',
        label: 'Lease Tenure In Years'
    },
    annualRent: {
        name: 'annualRent',
        type: 'number',
        label: 'Annual Rent In %'
    },
    leasedToBusiness: {
        name: 'leasedToBusiness',
        type: 'text',
        label: 'Leased to Business'
    },
    currentRentPerMonth: {
        name: 'currentRentPerMonth',
        type: 'number',
        label: 'Current Rent Per Month'
    },
    reraNumber: {
        name: 'reraNumber',
        type: 'text',
        label: 'Rera Number'
    },
    //industrial type --> manufacturing
    coveredArea: {
        name: 'coveredArea',
        type: 'text',
        label: 'Covered area'
    },
    plotArea: {
        name: 'plotArea',
        type: 'text',
        label: 'Plot Area'
    },
    otherLandZone: {
        name: 'landZone',
        type: 'text',
        label: 'Other Land Zone'
    },
    entranceWidth: {
        name: 'entranceWidth',
        type: 'number',
        label: 'Entrance Widht'
    },
    ceilingHeight: {
        name: 'ceilingHeight',
        type: 'number',
        label: 'Ceiling Height'
    },
    floorsAllowedForConstruction: {
        name: 'FloorsAllowedForConstruction',
        type: 'number',
        label: 'Floors Allowed For Construction'
    }
}
/* commercial--> plot/land commercial--> Office Space commercial --> Retail Shop/Showroom  commercial --> Co-working Space*/
export const postPropertyMap = {
    Sell: {
        Residential: {
            propertySubType: ['Flat/Apartment', 'Independent House/Villa', 'Plot/Land', 'Independent Floor/Builder Floor', 'Penthouse', 'Studio/Service Apartment', 'Duplex', 'Farmhouse'],
            'Flat/Apartment': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: "Step1"
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber},
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    additionalInputField: [
                        { field: inputField.builtDate, required: true, place: 'Step5' },
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: "Step3"
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                Amenities: commonAmenities,
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: "Step3"
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                    required: true,
                    place: 'Step5'
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                    required: true,
                    place: 'Step5'
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                    required: true,
                    place: 'Step5'
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                labels: {
                    list: ['Apartment', 'Flat', 'Apartment with lawn Area', 'Flat with Garden', 'Studio Apartment'],
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES

                },
            },
            'Independent House/Villa': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: "Step1"
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber},
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.floorsAllowedForConstruction },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: "Step4"
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],

                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                labels: {
                    list: ['Residential house', 'Villa', 'Independent Villa', 'Kothi'],
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Duplex: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: "Step1"
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                Amenities: commonAmenities,
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],

                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },

                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list:OWNERSHIP_TYPES
                },
            },
            'Plot/Land': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.floorsAllowedForConstruction }
                    ]
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                anyConstructionDone: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                constructedRooms: {
                    list: ['Shed', 'Rooms', 'Washroom', 'Other'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                boundaryWallMade: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step4'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                noBuildingAmenities: 'Yes',
                labels: {
                    list: ['Residential Plot', 'Residential Land']
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Independent Floor/Builder Floor': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: "Step1"
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step3'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West',],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles',],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                labels: {
                    list: ['Buider Floor Apartment', 'Independent Floor']
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Penthouse: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: "Step1"
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: "Step3" },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: "Step3" },
                        { field: inputField.floorNumber, required: true, place: "Step3" },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: "Step5" }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Studio/Service Apartment': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: "Step1"
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: "Step3" },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: "Step3" },
                        { field: inputField.totalFloors, required: true, place: "Step3" },
                        { field: inputField.floorNumber, required: true, place: "Step3" },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: "Step5" }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step3'
                },
                Amenities: commonAmenities,
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Farmhouse: {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: "Step3" },
                        { field: inputField.plotNumber, required: true, place: "Step3" },
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West',],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
        },
        Commercial: {
            propertySubType: ['Plot/Land', 'Office Space', 'Retail Shop/Showroom', 'Co-Working Space', 'Hospitality'],
            'Plot/Land': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.floorsAllowedForConstruction }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                additionalSubType: {
                    list: ['IT/ITES', 'Commercial Plots /Land', 'Hotel Land', 'SCO Plots', 'Mixed Use Lands', 'Corporate Land'],
                    required: true,
                    place: 'Step1'
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                anyConstructionDone: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                constructedRooms: {
                    list: ['Shed', 'Rooms', 'Washroom', 'Other'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                boundaryWallMade: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                noBuildingAmenities: 'Yes',
                lables: {
                    list: ['Commerical Land']
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Office Space': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                additionalSubType: {
                    list: ['Lockable', 'Unlockable'],
                    required: true,
                    place: 'Step1'
                },
                personalWashroom: {
                    list: ['Yes', 'No'],
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount},
                        { field: inputField.bookingAmount },
                    ]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                locatedInside: {
                    list: ['Mall', 'IT Park', 'ITES', 'Special Economic Zone', 'Business Park', 'Corporate Park', 'High Street', 'Other'],
                    required: true,
                    place: 'Step4'
                },
                officeSpaceType: {
                    list: ['Semi fitted', 'Fitted Space', 'shell and core'],
                    required: true,
                    place: 'Step4'
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                },
                washroom: {
                    list: ['Private', 'Public', 'Sharing'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                publicParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                privateParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                multilevelParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                labels: {
                    list: ['Office Space in IT/SEZ', 'Commerical Office Space', 'Office Space', 'SCO Plot', 'Business Suites']
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Co-Working Space': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                additionalSubType: {
                    list: ['Cabin', 'Sitting', 'Other'],
                    required: true,
                    place: 'Step1'
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                washroom: {
                    list: ['Private', 'Public', 'Sharing'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
    
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                officeSpaceType: {
                    list: ['Semi fitted', 'Fitted Space', 'shell and core'],
                    required: true,
                    place: 'Step4'
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                },
                personalWashroom: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                publicParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                privateParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                multilevelParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Retail Shop/Showroom': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                additionalSubType: {
                    list: ['Lockable', 'Unlockable'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                washroom: {
                    list: ['Private', 'Public', 'Sharing'],
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    shopFacadeInputField: [
                        { field: inputField.entranceWidth, required: true, place: 'Step5' }, ,
                        { field: inputField.ceilingHeight, required: true, place: 'Step5' }
                    ]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                locatedNear: {
                    list: ['Entrance', 'Elevator', 'Staircase', 'Atrium'],
                },
                SuitableForBusinessType: {
                    list: ['ATM', 'Bakery', 'Boutique', 'Clinic', 'Clothing', 'Cloud Kitchen', 'Cafe']
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                cornerShop: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                publicParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                privateParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                multilevelParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                locatedInside: {
                    list: ['Mall', 'Commercial Project', 'Retail Complex/Building', 'Market/High Street'],
                    required: true,
                    place: 'Step4'
                },
                labels: {
                    list: ['Commercial Shop', 'Mall Retail Lockable', 'Mall Retail Unlockable', 'High Street Retail Unlockable', 'Food Court', 'KIOSK', 'Anchor Store', 'Hyper Market', 'Food Kiosk', 'ATM Space', 'Retail Space', 'Multiplex', 'Cafe/Lounge', 'Resturant', 'Society Shop']
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Hospitality: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                inputs: {
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                publicParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                privateParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                multilevelParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                category: {
                    list: ['Guest House', 'Banquet Halls', 'Hotels', 'Resort', 'Restaurant', 'Cafeteria'],
                    required: true,
                    place: 'Step4'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                labels: {
                    list: ['Hotel Apartment', 'Banquet']
                }
            }
        },
        Industrial: {
            propertySubType: ['Manufacturing', 'Factory', 'Warehouse/Storage/Godown', 'Plot/Land', 'Industrial Shed', 'Industrial building'],
            Manufacturing: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ]
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                anyConstructionDone: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                constructedRooms: {
                    list: ['Shed', 'Rooms', 'Washroom', 'Other'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                boundaryWallMade: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                noBuildingAmenities: 'Yes',
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Factory: {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list: LAND_ZONE_LIST,
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                anyConstructionDone: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                constructedRooms: {
                    list: ['Shed', 'Rooms', 'Washroom', 'Other'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                boundaryWallMade: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: "Yes",
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Warehouse/Storage/Godown': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount},
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step3'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                anyConstructionDone: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                constructedRooms: {
                    list: ['Shed', 'Rooms', 'Washroom', 'Other'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                boundaryWallMade: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                personalWashroom: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Plot/Land': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                anyConstructionDone: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                constructedRooms: {
                    list: ['Shed', 'Rooms', 'Washroom', 'Other'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                boundaryWallMade: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Industrial Shed': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step4'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West',],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                    required: true,
                    place: 'Step1'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Industrial building': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                noBuildingAmenities: 'Yes',
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                },
            },
        },
        Agricultural: {
            propertySubType: ['Agricultural/Farm Land', 'Farmhouse'],
            'Agricultural/Farm Land': {
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                anyConstructionDone: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                constructedRooms: {
                    list: ['Shed', 'Rooms', 'Washroom', 'Other'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West',],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                boundaryWallMade: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                noBuildingAmenities: 'Yes'
            },
            Farmhouse: {
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionaleInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                numberOfOpenSides: {
                    list: ['1', '2', '3', '4'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                view: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                noBuildingAmenities: 'Yes'
            },
        }
    },
    Rent: {
        Residential: {
            propertySubType: ['Flat/Apartment', 'Independent House/Villa', 'Plot/Land', 'Independent Floor/Builder Floor', 'Penthouse', 'Studio/Service Apartment', 'Duplex', 'Farmhouse', 'PG'],
            'Flat/Apartment': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                Amenities: commonAmenities,
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: "Step3"
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Independent House/Villa': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.floorsAllowedForConstruction },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: "Step3"
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Duplex: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.salePrice, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                Amenities: commonAmenities,
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: "Step3"
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: "Step3"
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: "Step5"
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: "Step5"
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Plot/Land': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.floorsAllowedForConstruction }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Independent Floor/Builder Floor': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount},
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step1'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step1'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step1'
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Penthouse: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                dedicatedRooms: {
                   list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Studio/Service Apartment': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                Amenities: commonAmenities,
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step3'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West',],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                }
            },
            Farmhouse: {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step5'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            
            PG: {
                pgAvailableFrom: {
                    list: ['Immediately', 'Later'],
                    required: true,
                    place: 'Step3'
                },
                pgRoomType: {
                    list: ['Private Room', 'Twin Sharing', 'Triple Sharing', 'Quad Sharing'],
                    required: true,
                    place: 'Step3'
                },
                pgFoodAvailability: {
                    list: ['Breakfast', 'Lunch', 'Dinner', 'Self-Cooking', 'None'],
                    required: true,
                    place: 'Step3'
                },
                pgFoodCharges: {
                    list: ['Included', 'Excluded'],
                    required: true,
                    place: 'Step3'
                },
                pgNoticePeriod: {
                    list: ['15 Days', '30 Days', '45 Days', 'Others'],
                    required: true,
                    place: 'Step3'
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.possessionDate, required: true, place: 'Step3' }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                electricityCharges: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                pgRules: {
                    list: ['No Smoking', 'No Partying', 'No Drinking', 'No Non-Veg', 'No Loud Music', 'Visitors Allowed'],
                    required: true,
                    place: 'Step3'
                },
                pgServices: {
                    list: ['Wifi', 'Laundry Service', 'Pet Friendly', 'Room Cleaning'],
                    required: true,
                    place: 'Step3'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                pgFoodCharges: {
                    list: ['Included', 'Excluded'],
                    required: true,
                    place: 'Step3'
                },
                pgRoomType: {
                    list: ['Private Room', 'Twin Sharing', 'Triple Sharing', 'Quad Sharing'],
                    required: true,
                    place: 'Step3'
                },
                pgFoodAvailability: {
                    list: ['Breakfast', 'Lunch', 'Dinner', 'Self-Cooking', 'None'],
                    required: true,
                    place: 'Step3'
                },
                electricityChargesIncluded: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
        },
        Commercial: {
            propertySubType: ['Plot/Land', 'Office Space', 'Retail Shop/Showroom', 'Hospitality'],
            'Plot/Land': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.floorsAllowedForConstruction }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Office Space': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                officeSpaceType: {
                    list: ['Semi fitted', 'Fitted Space', 'shell and core'],
                    required: true,
                    place: 'Step4'
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                },
                personalWashroom: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                liftAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                ownershipType: {
                    list:OWNERSHIP_TYPES
                },
            },
            'Retail Shop/Showroom': { 
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    shopFacadeInputField: [
                        { field: inputField.entranceWidth, required: true, place: 'Step5' }, ,
                        { field: inputField.ceilingHeight, required: true, place: 'Step4' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                personalWashroom: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                locatedInside: {
                    list: ['Mall', 'Commercial Project', 'Retail Complex/Building', 'Market/High Street'],
                    required: true,
                    place: 'Step4'
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            // Showroom:{
            //     furnishingStatus:{
            //         list:['Unfurnished','Furnished','Semi Furnished','Bareshell'],
            //         required:true,
            //         place:'Step1'
            //     },
            //     landZone:{
            //         list:['Industrial Zone','Commercial Zone', 'Residential Zone', 'Transport and Communication', 'Public Utilities', 'Public and Semi Public Use', 'Open Spaces', 'Agricultural Zone', 'Special Economic Zone', 'Natural Conservation Zone', 'Government Use', 'Others'],
            //         required:true,
            //         place:'Step1'
            //     },
            //     inputs:{
            //         stepTwoInput:[
            //             {field:inputField.totalFloors, required:true, place:'Step2'},
            //             {field:inputField.builtDate, required:true, place:'Step2'}
            //         ],
            //         stepThreeInput:[
            //             {field:inputField.rentPrice, required:true, place:'Step3'},
            //             {field:inputField.rentDepositAmount, required:true, place:'Step3'},
            //             {field:inputField.unitNumber, required:true, place:'Step3'},
            //             {field:inputField.towerBlock, required:true, place:'Step3'},
            //             {field:inputField.floorNumber, required:true, place:'Step3'}
            //         ],
            //         rentedOrLeasedStepTwoInputField:[
            //             {field:inputField.leaseTenure, required:true, place:'Step2'},
            //             {field:inputField.annualRent, required:true, place:'Step2'},
            //             {field:inputField.leasedToBusiness, required:true, place:'Step2'},
            //             {field:inputField.currentRentPerMonth, required:true, place:'Step2'}
            //         ],
            //         reraApprovedInput:[
            //             {field:inputField.reraNumber, required:true, place:'Step2'}
            //         ],
            //         additionalInputField:[
            //             {field: inputField.maintenanceAmount, required:true, place:'Step4'}, 
            //             {field: inputField.bookingAmount, required:true, place:'Step4'}, 
            //         ]
            //     },
            //     areaFields:{
            //         areaType:['Carpet Area','Built-up Area','Super Built-up Area'],
            //         areaUnit:['Sq.Ft.','Sq.Yard','Sq.M','Acre','Bigha','Hectare'],
            //         input:[inputField.unitSize]
            //     },
            //     possessionStatus:{
            //         list:['Newly Launched','Ready to Move','Under Construction'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     preLeasedOrRented: {
            //         list:['Yes','No'], 
            //         required:true, 
            //         place:'Step2'
            //     },
            //     reraApproved: {
            //         list:['Yes','No'], 
            //         required:true, 
            //         place:'Step2'
            //     },
            //     facing:{
            //         list:['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     flooring:{
            //         list:['Mosaic','Standard','Marble','Wooden','Ceramic','Granite','Laminated','Anti Skid','Kota Stone','Vitrified','Matt Finish','Normal Tiles'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     personalWashroom:{
            //         list:['Yes','No'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     powerBackup: {
            //         list:['Yes','No'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     parkingAvailable : {
            //         list:['Yes','No'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     coveredParking:{
            //         list:['None', '1', '2', '3', '4', '5+'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     uncoveredParking:{
            //         list:['None', '1', '2', '3', '4', '5+'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     mechanicalParking:{
            //         list:['None', '1', '2', '3', '4', '5+'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     balconies:{
            //         list:['Room-attached', 'Individual', 'Connected'],
            //         required:true,
            //         place:'Step4'
            //     },
            //     balconyView:{
            //         list:['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
            //         required:true,
            //         place:'Step4'
            //     },
            // },
            Hospitality: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step2' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                category: {
                    list: ['Guest House', 'Banquet Halls', 'Hotels', 'Resort', 'Restaurant', 'Cafeteria'],
                    required: true,
                    place: 'Step4'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                balconies: {
                    list: ['Room-attached', 'Individual', 'Connected'],
                },
                balconyView: {
                    list: ['Road', 'Pool', 'Club', 'Lake', 'Garden', 'Park', 'Golf Course', 'Sunset', 'Sunrise', 'Railway Station', 'Street View', 'Community', 'None'],
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            }
        },
        Industrial: {
            propertySubType: ['Manufacturing', 'Factory', 'Warehouse/Storage/Godown', 'Plot/Land', 'Industrial Shed', 'Industrial building', 'Farmhouse'],
            Manufacturing: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                    ],
                    dimensionFields: [
                        { field: inputField.coveredArea, required: true, place: 'Step4' },
                        { field: inputField.plotArea, required: true, place: 'Step4' }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: 'Yes',
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                    required: true,
                    place: 'Step4'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Factory: {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                personalWashroom: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                dedicatedRooms: {
                    list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                    required: true,
                    place: 'Step4'
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                    required: true,
                    place: 'Step4'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Warehouse/Storage/Godown': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.unitNumber },
                        { field: inputField.towerBlock, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                        { field: inputField.floorNumber, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount},
                        { field: inputField.bookingAmount},
                        { field: inputField.builtDate, required: true, place: 'Step5' }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.unitSize]
                },
                possessionStatus: {
                    list: ['Newly Launched', 'Ready to Move', 'Under Construction', 'Near Possession'],
                    required: true,
                    place: 'Step4'
                },
                facing: {
                    list: ['North', 'East', 'South', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                flooring: {
                    list: ['Mosaic', 'Standard', 'Marble', 'Wooden', 'Ceramic', 'Granite', 'Laminated', 'Anti Skid', 'Kota Stone', 'Vitrified', 'Matt Finish', 'Normal Tiles'],
                },
                personalWashroom: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step4'
                },
                dedicatedRooms: {
                   list: ['Pooja Room', 'Study Room', 'Store Room', 'Dining Room', 'Laundry Room', 'Meeting Room', 'Servant Room', 'Other Room', 'Home Office', 'None'],
                    required: true,
                    place: 'Step3'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Plot/Land': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step5'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Industrial Shed': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            'Industrial building': {
                furnishingStatus: {
                    list: ['Unfurnished', 'Furnished', 'Semi Furnished', 'Bareshell'],
                    required: true,
                    place: 'Step1'
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' },
                        { field: inputField.totalFloors, required: true, place: 'Step3' },
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: 'Yes',
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                pantry: {
                    list: ['Combined', 'Open', 'Private'],
                    required: true,
                    place: 'Step5'
                },
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
        },
        Agricultural: {
            propertySubType: ['Agricultural/Farm Land', 'Farmhouse'],
            'Agricultural/Farm Land': {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step5'
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
            Farmhouse: {
                inputs: {
                    stepThreeInput: [
                        { field: inputField.rentPrice, required: true, place: 'Step3' },
                        { field: inputField.rentDepositAmount, required: true, place: 'Step3' },
                        { field: inputField.plotNumber, required: true, place: 'Step3' }
                    ],
                    dimensionFields: [
                        { field: inputField.lengthOfPlot },
                        { field: inputField.breadthOfPlot }
                    ],
                    rentedOrLeasedStepTwoInputField: [
                        { field: inputField.leaseTenure },
                        { field: inputField.annualRent },
                        { field: inputField.leasedToBusiness },
                        { field: inputField.currentRentPerMonth }
                    ],
                    reraApprovedInput: [
                        { field: inputField.reraNumber }
                    ],
                    additionalInputField: [
                        { field: inputField.maintenanceAmount },
                        { field: inputField.bookingAmount },
                    ],
                    otherLandZoneInput: [
                        { field: inputField.otherLandZone, required: true, place: 'Step3' }
                    ],
                },
                landZone: {
                    list:LAND_ZONE_LIST,
                },
                publicTransportation: {
                    list: ['Under 1km', 'More than 3 kms', 'Between 1 Km to 3 km', 'No'],
                    required: true,
                    place: 'Step3'
                },
                preLeasedOrRented: {
                    list: ['Yes', 'No'],
                },
                reraApproved: {
                    list: ['Yes', 'No'],
                },
                areaFields: {
                    areaType: ['Carpet Area', 'Built-up Area', 'Super Built-up Area'],
                    areaUnit: ['Sq.Ft.', 'Sq.Yard', 'Sq.M', 'Acre', 'Bigha', 'Hectare'],
                    input: [inputField.plotSize]
                },
                sewage: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                waterSupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                powerBackup: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                loanAvailability: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                gasPipeline: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                parkingAvailable : {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                coveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                uncoveredParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                mechanicalParking: {
                    list: ['None', '1', '2', '3', '4', '5+'],
                },
                streetLighting: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                electricitySupply: {
                    list: ['Yes', 'No'],
                    required: true,
                    place: 'Step5'
                },
                bedroomCount: {
                    list: ['Studio', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                bathroomCount: {
                    list: ['Shared', '1', '1.5', '2', '2.5', '3', '3.5', '4+'],
                },
                noBuildingAmenities: 'Yes',
                ownershipType: {
                    list: OWNERSHIP_TYPES
                },
            },
        }
    }
}