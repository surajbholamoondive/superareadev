import {
    PROPERTY_SUB_TYPE_MAP,
    AREA_TYPES, AREA_UNITS,
    FURNITURE_STATUSES,
    POSSESSION_STATUSES,
    PROPERTY_HIGHLIGHT_TAGS,
    PROPERTY_NEARBY_TAGS,
    BEDROOMS,
    BATHROOMS,
    LAND_TYPES,
    OPEN_SIDES,
    YES_NO,
    DEDICATED_ROOMS,
    PANTRY_AREAS,
    WASHROOMS,
} from "@/text"

const inputField = {
    salePrice: {
        name: "salePrice",
        type: "number",
        maxLength: 20,
        width: 160,
        label: "Sell Price",
        tooltipText: "The total price for purchasing this unit."
    },
    projectTitle: {
        name: "projectTitle",
        type: "text",
        label: "Project Name",
        tooltipText: "The official name of the building or housing project."
    },
    projectSize: {
        name: "projectSize",
        type: "number",
        maxLength: 5,
        width: 160,
        label: "Project Size",
        tooltipText: "The total area of the project."
    },
    unitSize: {
        name: "unitSize",
        type: "number",
        maxLength: 5,
        width: 160,
        label: "unit Size",
        tooltipText: "The total area of the Unit"
    },
    unitCount: {
        name: "unitCount",
        type: "number",
        maxLength: 5,
        width: 160,
        label: "unit Count",
        tooltipText: "Total Unit Count"
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
        tooltipText: "The date on which the project will be available for occupancy."
    },
    builtDate: {
        name: "builtDate",
        type: "month",
        label: "Built Month",
        tooltipText: "The month and year of building/project construction."
    },
};

const commonAmenities = {
    'Swimming Pool': "https://Swimming-Pool.svg",
    'Bed Room': "https://Bed-Room.svg",
    'Bath Room': "https://Bath-Room.svg"
};


const postProjectForm = {
    landType: LAND_TYPES,
    cafeteria: YES_NO,
    assuredReturn: YES_NO,
    currentlyLeased: YES_NO,
    isConstructionDone: YES_NO,
    gatedSociety: YES_NO,
    waterSewage: YES_NO,
    electricitySupply: YES_NO,
    swimmingPool: YES_NO,
    garden: YES_NO,
    guardRoom: YES_NO,
    airCoolingSystem: YES_NO,
    dryStorage: YES_NO,
    coolingStorage: YES_NO,
    projectHighlightTags: PROPERTY_HIGHLIGHT_TAGS,

    Residential: {
        projectSubType: [
            PROPERTY_SUB_TYPE_MAP.Apartment,
            PROPERTY_SUB_TYPE_MAP.Penthouse,
            PROPERTY_SUB_TYPE_MAP.Flat,
            PROPERTY_SUB_TYPE_MAP.ResidentialHouse,
            PROPERTY_SUB_TYPE_MAP.Villa,
            PROPERTY_SUB_TYPE_MAP.IndependentVilla,
            PROPERTY_SUB_TYPE_MAP.Kothi,
            PROPERTY_SUB_TYPE_MAP.BuilderFloorApartment,
            PROPERTY_SUB_TYPE_MAP.StudioApartment,
            PROPERTY_SUB_TYPE_MAP.ResidentialPlot,
            PROPERTY_SUB_TYPE_MAP.ResidentialLand,
            PROPERTY_SUB_TYPE_MAP.FarmHouse,
            PROPERTY_SUB_TYPE_MAP.IndependentFloor,
            PROPERTY_SUB_TYPE_MAP.ApartmentwithLawnArea,
            PROPERTY_SUB_TYPE_MAP.FlatWithGarden
        ],
        'Residential Plot': {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
            },

        },
        "Residential Land": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
            },
        },
        "Villa": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Independent Villa": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },

        "Apartment": {
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            amenities: commonAmenities,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
        "House or Villa": {
            furnishingStatus: FURNITURE_STATUSES,
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            amenities: commonAmenities,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
        "Penthouse": {
            furnishingStatus: FURNITURE_STATUSES,
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            amenities: commonAmenities,
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
        "Builder Floor Apartment": {
            furnishingStatus: FURNITURE_STATUSES,
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            amenities: commonAmenities,
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
        "Flat": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Residential House": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Kothi": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Independent Floor": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Apartment with Lawn Area": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Flat with Garden": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Studio Apartment": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Farm House": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
            },
        },

    },
    Commercial: {
        projectSubType: [
            PROPERTY_SUB_TYPE_MAP.CommercialLand,
            PROPERTY_SUB_TYPE_MAP.Warehouse,
            PROPERTY_SUB_TYPE_MAP.officeSpaceSEZ,
            PROPERTY_SUB_TYPE_MAP.CommercialOfficeSpace,
            PROPERTY_SUB_TYPE_MAP.Shop,
            PROPERTY_SUB_TYPE_MAP.Showroom,
            PROPERTY_SUB_TYPE_MAP.Godown,
            PROPERTY_SUB_TYPE_MAP.MallRetailLockable,
            PROPERTY_SUB_TYPE_MAP.MallRetailUnlocakble,
            PROPERTY_SUB_TYPE_MAP.HighStreetRetailLockable,
            PROPERTY_SUB_TYPE_MAP.HighStreetRetailUnlockable,
            PROPERTY_SUB_TYPE_MAP.OfficeSpace,
            PROPERTY_SUB_TYPE_MAP.ScoPlot,
            PROPERTY_SUB_TYPE_MAP.BusinessSuites,
            PROPERTY_SUB_TYPE_MAP.HotelAprtment,
            PROPERTY_SUB_TYPE_MAP.Foodcourt,
            PROPERTY_SUB_TYPE_MAP.Banquet,
            PROPERTY_SUB_TYPE_MAP.KIOSK,
            PROPERTY_SUB_TYPE_MAP.StudioApartment,
            PROPERTY_SUB_TYPE_MAP.AnchorStore,
            PROPERTY_SUB_TYPE_MAP.HyperMarket,
            PROPERTY_SUB_TYPE_MAP.FoodKios,
            PROPERTY_SUB_TYPE_MAP.AtmSpace,
            PROPERTY_SUB_TYPE_MAP.RetailSpace
        ],
        "Commercial Land": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            amenities: {},
            input: [inputField.plotNumber, inputField.salePrice, inputField.projectSize],
            propertyNearByTags: [],
        },
        "SCO Plot": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
            },
        },
        "Food Court": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Food Kiosk": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Retail Space": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Business Suites": {
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Banquet": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Anchor Store": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Hyper Market": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "KIOSK": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "ATM Space": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Hotel Apartment": {
            // possessionStatus: POSSESSION_STATUSES,
            // projectUnits: {
            //     bedroomCount: BEDROOMS,
            //     bathroomCount: BATHROOMS,
            //     dedicatedRooms: DEDICATED_ROOMS
            // },
        },
        "Studio Apartment": {
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS
            },
        },
        "Commercial Office Space": {
            furnishingStatus: FURNITURE_STATUSES,
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            amenities: commonAmenities,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
        "Commercial Shop": {
            furnishingStatus: FURNITURE_STATUSES,
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            amenities: commonAmenities,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
        "Commercial Showroom": {
            furnishingStatus: FURNITURE_STATUSES,
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            amenities: commonAmenities,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
                areaType: AREA_TYPES,
                areaUnit: AREA_UNITS,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
        "Mall Retail Lockable": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Mall Retail Unlocakble": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Office Space": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "High Street Retail Lockable": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "High Street Retail Unlockable": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Office Space in IT Park / SEZ": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                pantryArea: PANTRY_AREAS,
                washroomCount: WASHROOMS,
            },
        },
        "Godown": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
            },
        },
        "Warehouse": {
            furnishingStatus: FURNITURE_STATUSES,
            possessionStatus: POSSESSION_STATUSES,
            projectAreaType: AREA_TYPES,
            projectAreaUnit: AREA_UNITS,
            amenities: commonAmenities,
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
                input: [inputField.unitSize, inputField.salePrice, inputField.unitCount]
            },
            input: [inputField.salePrice, inputField.projectSize, inputField.builtDate],
            propertyNearByTags: PROPERTY_NEARBY_TAGS,
        },
    },

    Industrial: {
        projectSubType: [
            PROPERTY_SUB_TYPE_MAP.Warehouse,
            PROPERTY_SUB_TYPE_MAP.IndustrialBuilding,
            PROPERTY_SUB_TYPE_MAP.IndustrialLand,
            PROPERTY_SUB_TYPE_MAP.Godown,
            PROPERTY_SUB_TYPE_MAP.IndustrialShed
        ],
        "Warehouse": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
                pantryArea: PANTRY_AREAS,

            },
        },
        "Industrial Land": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
                pantryArea: PANTRY_AREAS,

            },
        },
        "Industrial Shed": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
                pantryArea: PANTRY_AREAS,
            },
        },
        "Industrial Building": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
                pantryArea: PANTRY_AREAS,
            },
        },
        "Godown": {
            possessionStatus: POSSESSION_STATUSES,
            furnishingStatus: FURNITURE_STATUSES,
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
                pantryArea: PANTRY_AREAS,
            },
        },
    },
    Agricultural: {
        projectSubType: [
            PROPERTY_SUB_TYPE_MAP.FarmHouse,
            PROPERTY_SUB_TYPE_MAP.AgriculturalLand
        ],
        "Agricultural Land": {
            projectUnits: {
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
            },
        },
        "Farm House": {
            possessionStatus: POSSESSION_STATUSES,
            projectUnits: {
                bedroomCount: BEDROOMS,
                bathroomCount: BATHROOMS,
                dedicatedRooms: DEDICATED_ROOMS,
                openSides: OPEN_SIDES,
                boundaryWalls: YES_NO,
            },
        },
    },
    RERA_Details: {
        projectSubType: [
            PROPERTY_SUB_TYPE_MAP.Residential, PROPERTY_SUB_TYPE_MAP.Commercial,
            PROPERTY_SUB_TYPE_MAP.Industrial // Assuming these are valid subtypes for RERA details
        ],
        fields: [
            {
                name: "reraID",
                type: "text",
                label: "Project RERA ID",
                tooltipText: "Unique identifier for the project under RERA.",
                required: true,
                width: 160,
            },
            {
                name: "projectStatus",
                type: "select",
                label: "Project Status",
                options: ["Completed", "Ongoing", "Planned"], // Example options, customize as needed
                tooltipText: "Current status of the project.",
                required: true,
                width: 160,
            },
            {
                name: "projectStartDate",
                type: "date",
                label: "Project Start Date",
                tooltipText: "The start date of the project.",
                required: true,
                width: 160,
            },
            {
                name: "projectCompletionDate",
                type: "date",
                label: "Project Completion Date",
                tooltipText: "The expected or actual completion date of the project.",
                required: true,
                width: 160,
            },
            {
                name: "totalArea",
                type: "number",
                label: "Total Area (sq.mt.)",
                tooltipText: "The total area covered by the project.",
                required: true,
                width: 160,
            },
            {
                name: "projectDocument",
                type: "select",
                label: "Project Document",
                options: ["Affidavit", "Building Plan", "Environmental Clearance"], // Example options
                tooltipText: "Type of project document.",
                required: true,
                width: 160,
            },
            {
                name: "sanctioningAuthority",
                type: "text",
                label: "Sanctioning Competent Authority",
                tooltipText: "The authority that sanctioned the project.",
                required: true,
                width: 160,
            },
            {
                name: "additionalDocument",
                type: "file", // Assuming file upload for additional documents
                label: "Add Additional Document",
                tooltipText: "Upload any additional documents related to the project.",
                required: false,
                width: 160,
            }
        ]
    }
}
export default postProjectForm;
