import Image from 'next/image'
import Link from 'next/link'
import building from '@/assets/FeaturedPropertiesIcons/building.svg'
import { GLOBALLY_COMMON_TEXT, HOME_PAGE_TEXT } from '@/textV2'
import {
  formatNumberWithUnit,
  numberFormatter,
  projectPriceMap,
} from '@/utils/utils'

import { MDLabel } from '@/components/MDLabel/MDLabel'

import locationIcon from '../../../assets/AmenitiesIcons/locationNew.svg'
import bathtub from '../../../assets/FeaturedPropertiesIcons/bathtub.svg'
import doubleBedIcon from '../../../assets/FeaturedPropertiesIcons/double-bed.svg'
import houseIcon from '../../../assets/FeaturedPropertiesIcons/measured.svg'
import Styles from './FeaturedProperties.module.css'

const {
  bathsText,
  bedsText,
  checkItOutText,
  projectSizeText,
  slashSquareFeet,
  unitText,
  unitsText,
} = HOME_PAGE_TEXT.featuredPropertySection
const { text, symbols, propertySizeUnitMap, areaMaps, propertySizeUnits } =
  GLOBALLY_COMMON_TEXT
const { suqareFeets } = GLOBALLY_COMMON_TEXT?.units
const { routes } = HOME_PAGE_TEXT

const { propertyTypes } = GLOBALLY_COMMON_TEXT
const {
  studioText,
  commercialLandText,
  officeSpace,
  pgText,
  plotText,
  showroomText,
  warehouseText,
} = propertyTypes

const FeaturedSectionCard = ({ singlePropertyData }) => {
  const {
    _id,
    propertyTitle,
    projectTitle,
    locality,
    city,
    projectArea,
    projectAreaUnit,
    totalUnitCount,
    projectUnits = [],
    budget,
    projectImages,
    bedroomCount,
    bathroomCount,
    propertySize: myPropertySize,
    propertySizeUnit: myPropertySizeUnit,
    areaDetail,
    salePrice,
    addressLabel,
    propertyCoverImage,
    propertyImages,
    furnishingStatus,
    propertyStatus,
    propertySubType,
    slug,
  } = singlePropertyData || {}
  const propertyUrl =
    process.env.NEXT_PUBLIC_FRONTEND_API + '/property-view/' + slug
  const projectUrl =
    process.env.NEXT_PUBLIC_FRONTEND_API + '/project-view/' + slug

  const filteredDetail = areaDetail?.filter((detail) => detail.display)
  let propertySize, propertySizeUnit

  if (myPropertySize) {
    propertySize = myPropertySize
    propertySizeUnit = myPropertySizeUnit
  } else if (filteredDetail?.length > 0) {
    ({ propertySize, propertySizeUnit } = filteredDetail[0])
  }

  const getLabelFromValue = (value) => {
    const unit = propertySizeUnits.find((unit) => unit.value === value)
    return unit ? unit.label : suqareFeets
  }
  const updatedPropertySize = getLabelFromValue(propertySizeUnit)

  const formatBedBathCount = (count) => {
    return Number.isInteger(count) ? count : parseFloat(count).toFixed(1)
  }

  let formattedBudget
  if (formatNumberWithUnit && budget) {
    if (budget.minPrice === budget.maxPrice) {
      formattedBudget = `${symbols.rupeeSymbol} ${formatNumberWithUnit(budget.minPrice)}`
    } else {
      formattedBudget = `${symbols.rupeeSymbol} ${formatNumberWithUnit(budget.minPrice)} ${symbols.dash} ${symbols.rupeeSymbol} ${formatNumberWithUnit(budget.maxPrice)}`
    }
  }
  let projectSizeLabel = `${projectSizeText} ${symbols.dash} ${numberFormatter(projectArea)} ${propertySizeUnitMap[projectAreaUnit]}`

  const getStyleForPropertyStatus = (status) => {
    switch (status) {
      case text.upForRent:
        return {
          marginTop: '-40px',
          padding: '5px',
        }
      case text.upForSale:
        return {
          marginTop: '-44px',
          padding: '8.5px',
        }
      case text.capitalizeRentText:
        return {
          marginTop: '-40px',
          padding: '5px',
        }
      default:
        return {
          marginTop: '-45px',
          padding: '5px',
        }
    }
  }

  const isProject = !!projectTitle
  const cardUrl = isProject ? projectUrl : propertyUrl
  const cardImages = isProject ? projectImages : propertyImages
  const cardTitle = isProject ? projectTitle : propertyTitle
  const cardLocation = isProject ? `${locality}, ${city}` : addressLabel

  return (
    <div
      className={`${Styles.divCardSize} w-full max-w-[344px] xs:max-w-[400px] mx-auto`}
    >
      <div className="relative border-2 border-primary border-b-0 rounded-t-[1.5rem]">
        <Image
          className={`object-cover w-full h-[180px] xs:h-[200px] ${Styles.cardBorder}`}
          src={cardImages?.[0]?.url || ''}
          width={400}
          height={300}
          alt={`featured ${isProject ? 'project' : 'property'} images, trending ${isProject ? 'projects' : 'properties'}`}
        />
      </div>

      <div
        className={`py-3 ${Styles.contentDiv} rounded-b-3xl border-2 border-primary border-t-0 bg-white hover:bg-[#f4f4f4] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}
      >
        <Link href={cardUrl} target="_blank">
          <div className="flex items-center justify-between px-3 xs:px-4 h-[60px] -mt-2">
            <h3 className="w-[65%] xs:w-[70%] line-clamp-1 overflow-hidden font-bold overflow-ellipsis text-primary text-sm xs:text-base">
              {cardTitle}
            </h3>
            {isProject && formattedBudget && (
              <h3 className="font-semibold max-w-[80px] xs:max-w-[100px] truncate text-xs xs:text-sm">
                {formattedBudget}
              </h3>
            )}
            {!isProject && salePrice && (
              <p className="text-gray-600 p-1 xs:p-2 h-fit rounded-md font-semibold flex items-center text-xs xs:text-sm">
                <div className="mr-1">{symbols.rupeeSymbol}</div>
                <MDLabel
                  prefix={salePrice / propertySize}
                  text={`/${updatedPropertySize}`}
                  inlineStyle={{ textClass: 'mx-0', fontWeight: '600' }}
                />
              </p>
            )}
            {isProject && (
              <h3 className="font-semibold text-xs xs:text-sm whitespace-nowrap">
                {projectPriceMap(projectUnits)}
              </h3>
            )}
          </div>
        </Link>

        <div className="flex justify-between items-center w-full">
          <Link
            href={cardUrl}
            target="_blank"
            className="flex items-center gap-1 xs:gap-2 px-3 xs:px-4 text-gray-600 min-w-0"
          >
            <Image
              height={10}
              width={10}
              src={locationIcon}
              alt="location"
              className="xs:h-3 xs:w-3 flex-shrink-0"
            />
            <p className="truncate text-xs xs:text-sm">{cardLocation}</p>
          </Link>
        </div>

        {!isProject && (
<div className="flex gap-1 mt-3 justify-between px-3 xs:px-[14px]">

            
            <div className="flex items-center text-gray-500 gap-1 min-w-0 flex-1">
              {(Number(bathroomCount) >= 1 || bathroomCount === 'Shared') && (
                <Image
                  src={bathtub}
                  width={10}
                  height={10}
                  alt="bathtub icon for real estate, mores"
                  className="xs:w-[11px] xs:h-[11px] flex-shrink-0"
                />
              )}
              {Number(bathroomCount) > 1 ? (
                <p className="text-[10px] xs:text-[12px] truncate">
                  {formatBedBathCount(bathroomCount)} Baths
                </p>
              ) : (
                Number(bathroomCount) !== 0 && (
                  <p className="text-[10px] xs:text-[12px] truncate">
                    {formatBedBathCount(bathroomCount)} Bath
                  </p>
                )
              )}
            </div>


            <div className="flex items-center text-gray-500 gap-1 min-w-0 flex-1 justify-center">
              {(Number(bedroomCount) >= 1 || bedroomCount === 'Studio') && (
                <Image
                  src={doubleBedIcon}
                  width={10}
                  height={10}
                  alt="Mores double bed icon"
                  className="xs:w-[11px] xs:h-[11px] flex-shrink-0"
                />
              )}
              {Number(bedroomCount) > 1 ? (
                <p className="text-[10px] xs:text-[12px] truncate">
                  {formatBedBathCount(bedroomCount)} Beds
                </p>
              ) : (
                Number(bedroomCount) !== 0 &&
                bedroomCount !== 'Studio' && (
                  <p className="text-[10px] xs:text-[12px] truncate">
                    {formatBedBathCount(bedroomCount)} Bed
                  </p>
                )
              )}
              {bedroomCount === 'Studio' && (
                <p className="text-[10px] xs:text-[12px] truncate">Studio</p>
              )}
            </div>

           
            {propertySize && !isNaN(propertySize) && (
              <div className="flex items-center text-gray-500 gap-1 min-w-0 flex-1 justify-end">
                <Image
                  src={houseIcon}
                  width={10}
                  height={10}
                  alt="Mores property and projects area"
                  className="xs:w-[11px] xs:h-[11px] flex-shrink-0"
                />
                <p className="text-[10px] xs:text-[12px] truncate">
                  {`${numberFormatter(propertySize)} ${getLabelFromValue(propertySizeUnit)}`}
                </p>
              </div>
            )}
          </div>
        )}
        {isProject && (
         <div className="flex flex-col mt-4 px-3 xs:px-4 text-gray-600 gap-2 xs:gap-3">

            <div className="flex items-center justify-between text-xs xs:text-sm">
              <div className="flex items-center gap-1 xs:gap-2 min-w-0">
                <p className="text-[11px] xs:text-sm font-medium whitespace-nowrap">
                  Project Size -
                </p>
                <span className="text-[10px] xs:text-xs truncate">
                  {numberFormatter(projectArea)}{' '}
                  {propertySizeUnitMap[projectAreaUnit]}
                </span>
              </div>
              {totalUnitCount && (
                <div className="flex items-center gap-1 xs:gap-2 ml-2">
                  <Image
                    src={building}
                    alt="Units"
                    width={12}
                    height={12}
                    className="xs:w-[14px] xs:h-[14px] flex-shrink-0"
                  />
                  <span className="text-[10px] xs:text-xs whitespace-nowrap">
                    {numberFormatter(totalUnitCount)} Units
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <Link href={cardUrl} target="_blank">
          <div
            className="
    flex justify-center 
    w-[85%] xs:w-[80%] 
    h-7 xs:h-8 
    mt-16 md:mt-8 lg:mt-8  
    bg-white border border-primary text-primary 
    rounded-3xl mx-auto 
    hover:bg-primary hover:text-white hover:border-none
  "
          >
            <button className="text-xs xs:text-sm font-medium">
              {checkItOutText}
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedSectionCard
