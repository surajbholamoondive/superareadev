import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/auth'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import { ADMIN_TEXT } from '@/text'
import {
  COMPONENTS,
  GLOBALLY_COMMON_TEXT,
  SEARCH_RESULT_CARD_TEXTS,
} from '@/textV2'
import {
  formatNumberWithUnit,
  makeApiRequest,
  numberFormatter,
  plotAreaMap,
  projectAreaMap,
  projectPriceMap,
} from '@/utils/utils'

import EditLatLong from '@/components/Admin/Direct-Listing/EditLatLong'
import { MDLabel } from '@/components/MDLabel/MDLabel'

import doubleBed from '../../../assets/AmenitiesIcons/doubleBed.svg'
import pencilIcon from '../../../assets/AmenitiesIcons/editLocation.svg'
import furnitureIcon from '../../../assets/AmenitiesIcons/furniture.svg'
import locationIcon from '../../../assets/AmenitiesIcons/locationNew.svg'
import areaIcon from '../../../assets/AmenitiesIcons/measured.svg'
import eEstimate from '../../../assets/logo/eStimate.svg'
import mscore from '../../../assets/logo/logo-icon.svg'
import shieldIcon from '../../../assets/logo/verification-logo.svg'

const { routes } = COMPONENTS?.SEARCH_RESULT_CARD_COMPO
const { mapsUrl } = routes

const PropertyLabelsSection = ({ propertyDetail, handleClick, mVerified }) => {
  if (!propertyDetail) {
    return null
  }
  const [sEstimate, setSEstimate] = useState()
  const [isEditLatLongOpen, setIsEditLatLongOpen] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [projectData, setProjectData] = useState({
    projectTitle: propertyDetail?.projectTitle || propertyDetail?.propertyTitle,
    locality: propertyDetail?.locality,
    city: propertyDetail?.city,
    coordinates: [propertyDetail?.latitude, propertyDetail?.longitude],
  })

  const logger = getLogger()
  const {
    _id,
    mScore,
    propertyType,
    projectType,
    propertyTitle,
    propertyStatus,
    projectTitle,
    rentPrice,
    salePrice,
    locality,
    city,
    bathroomCount,
    tags,
    labels,
    bedroomCount,
    furnishingStatus,
    propertySize,
    projectArea,
    projectAreaUnit,
    projectUnits,
    totalUnitCount,
    propertyHighlightTags,
    projectHighlightTags,
    coveredParkingCount,
    latitude,
    longitude,
    projectSubType,
    propertySubType,
    mVerifiedStatus,
    areaDetail,
    possessionStatus,
    projectLabel,
    state,
    mEstimate,
    addressLabel,
  } = propertyDetail

  const extractedPropertySize = Array.isArray(areaDetail)
    ? areaDetail.find((area) => area.display === true)?.propertySize
    : undefined

  const fetchMEstimate = (propertyId) => {
    makeApiRequest('post', process.env.NEXT_PUBLIC_M_Estimate, {
      propertyId: propertyId,
    })
      .then((response) => {
        const { data } = response
        setSEstimate(data['M-estimate'])
      })
      .catch((error) => {
        logger.error(error)
      })
  }

  useEffect(() => {
    if (_id && !mEstimate) {
      fetchMEstimate(_id)
    } else {
      setSEstimate(mEstimate)
    }
  }, [_id, mEstimate])

  const formatBedBathCount = (count) => {
    return Number.isInteger(count) ? count : parseFloat(count).toFixed(1)
  }

  const window = useWindowWidth()
  const totalUnitCountText = (totalUnitCount) => {
    if (totalUnitCount === 1) {
      return unitText
    } else {
      return unitsText
    }
  }
  const {
    missingPropertyText,
    mScoreDiscriptionPath,
    superEstimateDiscriptionPath,
    expertAdviceText,
    unitText,
    unitsText,
  } = COMPONENTS.SINGLE_PROPERTY_VIEW_COMPO?.propertyLabelSection
  const { areaMaps, symbols, text, units, propertyTypes } = GLOBALLY_COMMON_TEXT
  const { studioText, commercialLandText, plotText } = propertyTypes
  const { dash, rupeeSymbol } = symbols
  const { postType, upForSale, superEstimateLabel } = text
  const { suqareFeets } = units
  const {
    bathSingularText,
    bathPruralText,
    bedSingularText,
    bedPruralText,
    sharedbathText,
    bhkText,
  } = SEARCH_RESULT_CARD_TEXTS.text
  const { projectStatus, projectSize, totalUnits, unitSize } =
    GLOBALLY_COMMON_TEXT?.text
  const plotAreaInfo = plotAreaMap(projectUnits)
  const [auth, setAuth] = useAuth()

  const { userResult } = auth || {}
  let tagsAndLabels = []
  if (tags) {
    tagsAndLabels = [...tags]
  }

  if (labels) {
    tagsAndLabels.push(labels)
  }
  console.log('projectHighlightTags', projectHighlightTags)
  return (
    <div className="px-4 md:px-6 lg:px-8 mt-4 md:mt-6 max-w-full">
      {/* Verification badges and property type section */}
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {(projectTitle || mVerifiedStatus) && (
                <MDLabel
                  icon={shieldIcon}
                  inlineStyle={{
                    containerClass: 'flex items-center',
                    textColor: 'var(--primary-color)',
                    fontWeight: 'bold',
                    imgClass: 'w-4 h-4 md:w-5 md:h-5',
                  }}
                />
              )}
              <div className="flex items-center gap-2">
                <MDLabel
                  text={propertyType || projectType}
                  inlineStyle={{
                    textColor: 'var(--primary-color)',
                    containerClass: 'text-sm md:text-base',
                    fontWeight: 'bold',
                  }}
                />
               <span className="text-sm md:text-base font-bold" style={{ color: 'var(--primary-color)' }}>
                  {dash} {projectSubType || propertySubType} {projectLabel}
                </span>
              </div>
            </div>
          </div>

          {/* M-Score */}
          {mScore && (
            <div className="self-start sm:self-center">
              <Link target="_blank" href={mScoreDiscriptionPath}>
                <MDLabel
                  text={mScore}
                  icon={mscore}
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                    bgColor: '#93160240',
                    containerClass: 'flex rounded-full w-fit px-3 py-1',
                    imgClass: 'w-3 md:w-4 mt-1',
                    textClass: 'text-sm md:text-base',
                  }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Property title - Further reduced font size */}
      <div className="mb-2 md:mb-3">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary leading-tight">
          {propertyTitle || projectTitle}
        </h1>
      </div>
      {/* Location and Super Estimate section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 py-1 md:py-4">
        <div className="flex items-center gap-2 flex-1">
          {propertyDetail?.projectTitle ? (
            <Link
              target="_blank"
              href={`${mapsUrl}?api=1&query=${encodeURIComponent(locality + ' ' + city)}`}
              prefetch={true}
              className="flex-1 flex items-center gap-2"
            >
              <Image
                src={locationIcon}
                alt="Location"
                width={12}
                height={12}
                className="md:w-4 md:h-4 flex-shrink-0"
              />
              <p className="line-clamp-1 text-xs md:text-sm underline text-primary">
                {locality}, {city}
              </p>
            </Link>
          ) : (
            addressLabel && (
              <Link
                target="_blank"
                href={`${mapsUrl}?api=1&query=${encodeURIComponent(addressLabel)}`}
                prefetch={true}
                className="flex-1 flex items-center gap-2"
              >
                <Image
                  src={locationIcon}
                  alt="Location"
                  width={12}
                  height={12}
                  className="md:w-4 md:h-4 flex-shrink-0"
                />
                <p className="line-clamp-1 text-xs md:text-sm underline text-primary">
                  {addressLabel}
                </p>
              </Link>
            )
          )}

          {userResult?.userType === ADMIN_TEXT && (
            <button
              onClick={() => setIsEditLatLongOpen(true)}
              className="p-1 rounded-md flex-shrink-0"
            >
              <Image
                src={pencilIcon}
                alt="Edit location"
                width={14}
                height={14}
                className="md:w-4 md:h-4"
              />
            </button>
          )}
        </div>

        <EditLatLong
          isOpen={isEditLatLongOpen}
          onClose={() => setIsEditLatLongOpen(false)}
          projectData={projectData}
          setProjectData={setProjectData}
          inputValue={projectData?.projectTitle}
          setSelectDropdown={() => {}}
          isNotInList={false}
          setIsNotInList={() => {}}
          propertyId={_id}
          onFormSubmit={() => setIsFormSubmitted(true)}
        />

        {/* Super Estimate */}
        <div className="self-start sm:self-center">
          {!projectTitle && (
            <Link href={superEstimateDiscriptionPath} target="_blank">
              <div>
                {propertyStatus == upForSale && sEstimate && (
                  <MDLabel
                    text={
                      superEstimateLabel +
                      ' ₹' +
                      formatNumberWithUnit(sEstimate * 100000, true) +
                      dash +
                      ' ₹' +
                      formatNumberWithUnit(sEstimate * 110000)
                    }
                    icon={eEstimate}
                    inlineStyle={{
                      textColor: '#931602',
                      fontWeight: 'bold',
                      bgColor: '#9316020f',
                      containerClass:
                        'rounded-full w-fit h-fit py-2 px-3 text-xs md:text-sm',
                      imgClass: 'h-4 w-5',
                    }}
                  />
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
      {/* Project Rating - Add after location section */}
      {propertyDetail?.projectRating && (
        <div className="py-1 md:py-2 mb-1 md:mb-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 md:w-8 md:h-8 ${
                  star <= Math.floor(propertyDetail.projectRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 fill-current'
                }`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      )}
      {/* Price section - Much smaller font size for price */}
      <div className="py-1 mb-3 md:py-2">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">
          {propertyTitle
            ? `${rupeeSymbol}${formatNumberWithUnit(salePrice ? salePrice : rentPrice)}`
            : projectPriceMap(projectUnits)}
        </h2>
      </div>
      <div className="mb-4 md:mb-6">
        <div className="flex flex-wrap gap-1">
          {(tagsAndLabels.length > 0
            ? tagsAndLabels
            : projectHighlightTags
          )?.map((highlight, index) => (
            <MDLabel
              text={highlight}
              key={index}
              inlineStyle={{
                bgColor: 'var(--secondary-bg)',
                fontWeight: 'bold',
                textColor: 'var(--secondary-color)',
                containerClass:
                  'rounded-sm w-fit h-fit py-0.5 px-2 text-[6px] md:text-xs whitespace-nowrap',
              }}
            />
          ))}
        </div>
      </div>
      {/* Property details and stats */}
      <div className="mb-6">
        {propertyTitle ? (
          /* Individual property details */
          <div className="flex flex-wrap items-center gap-3 text-xs text-primary">
            {bedroomCount &&
              (bedroomCount == 0.5 ? (
                <MDLabel
                  icon={doubleBed}
                  prefix={studioText}
                  inlineStyle={{
                    imgClass: 'h-3 w-3 md:h-4 md:w-4',
                    containerClass:
                      'flex items-center gap-1 text-xs md:text-sm',
                    textColor: 'var(--primary-color)',
                  }}
                />
              ) : (
                <MDLabel
                  icon={doubleBed}
                  text={`${formatBedBathCount(bedroomCount)} ${bhkText}`}
                  inlineStyle={{
                    imgClass: 'h-3 w-3 md:h-4 md:w-4',
                    containerClass:
                      'flex items-center gap-1 text-xs md:text-sm',
                    textColor: 'var(--primary-color)',
                  }}
                />
              ))}

            {extractedPropertySize && (
              <MDLabel
                icon={areaIcon}
                prefix={extractedPropertySize}
                text={suqareFeets}
                inlineStyle={{
                  imgClass: 'h-3 w-3 md:h-4 md:w-4',
                  containerClass: 'flex items-center gap-1 text-xs md:text-sm',
                  textColor: 'var(--primary-color)',
                }}
              />
            )}

            {furnishingStatus && (
              <MDLabel
                icon={furnitureIcon}
                text={furnishingStatus}
                inlineStyle={{
                  imgClass: 'h-3 w-3 md:h-4 md:w-4',
                  containerClass: 'flex items-center gap-1 text-xs md:text-sm',
                  textColor: 'var(--primary-color)',
                }}
              />
            )}
          </div>
        ) : (
          /* Project property stats */
          <>
            {/* Desktop version - horizontal layout with dividers */}
            <div className="hidden md:flex flex-wrap items-center  gap-1">
              {projectSubType !== plotText &&
                projectSubType !== commercialLandText && (
                  <div className="flex items-center">
                    <div className="text-center py-1">
                      <p className="font-semibold text-primary text-sm md:text-sm">
                        {possessionStatus}
                      </p>
                      <p className="text-[#5F5F5F] text-[10px] md:text-xs">
                        {projectStatus}
                      </p>
                    </div>
                    <div className="h-6 w-[1px] bg-primary ml-3"></div>
                  </div>
                )}

              <div className="flex items-center">
                <div className="text-center px-3 py-1">
                  <p className="font-semibold text-primary text-sm md:text-sm">
                    {numberFormatter(projectArea) +
                      ' ' +
                      areaMaps[projectAreaUnit]}
                  </p>
                  <p className="text-[#5F5F5F] text-[10px] md:text-xs">
                    {projectSize}
                  </p>
                </div>
                <div className="h-6 w-[1px] bg-primary ml-3"></div>
              </div>

              {totalUnitCount && (
                <div className="flex items-center">
                  <div className="text-center px-3 py-1">
                    <p className="font-semibold text-primary text-sm md:text-sm">
                      {totalUnitCount} {totalUnitCountText(totalUnitCount)}
                    </p>
                    <p className="text-[#5F5F5F] text-[10px] md:text-xs">
                      {totalUnits}
                    </p>
                  </div>
                  <div className="h-6 w-[1px] bg-primary ml-3"></div>
                </div>
              )}

              <div className="text-center px-3 py-1">
                <p className="font-semibold text-primary text-sm md:text-sm">
                  {plotAreaInfo
                    ? plotAreaMap(projectUnits)
                    : projectAreaMap(projectUnits)}
                </p>
                <p className="text-[#5F5F5F] text-[10px] md:text-xs">
                  {unitSize}
                </p>
              </div>
            </div>

            {/* Mobile version - horizontal scroll with dividers like desktop */}
            <div className="md:hidden">
              <div className="flex items-center gap-0 overflow-x-auto pb-2 scrollbar-hide my-2">
                {projectSubType !== plotText &&
                  projectSubType !== commercialLandText && (
                    <>
                      <div className="flex items-center">
                        <MDLabel
                          text={
                            <>
                              <p className="font-semibold text-primary text-xs">
                                {possessionStatus}
                              </p>
                              <p className="text-[#5F5F5F] text-[10px]">
                                {projectStatus}
                              </p>
                            </>
                          }
                          inlineStyle={{
                            containerClass:
                              'text-center  py-1 text-xs font-bold whitespace-nowrap',
                          }}
                        />
                        <div className="h-6 w-[1px] bg-primary mx-2 flex-shrink-0"></div>
                      </div>
                    </>
                  )}

                <div className="flex items-center">
                  <MDLabel
                    text={
                      <>
                        <p className="font-semibold text-primary text-xs">
                          {numberFormatter(projectArea) +
                            ' ' +
                            areaMaps[projectAreaUnit]}
                        </p>
                        <p className="text-[#5F5F5F] text-[10px]">
                          {projectSize}
                        </p>
                      </>
                    }
                    inlineStyle={{
                      containerClass:
                        'text-center px-3 py-1 text-xs font-bold whitespace-nowrap',
                    }}
                  />
                  <div className="h-6 w-[1px] bg-primary mx-2 flex-shrink-0"></div>
                </div>

                {totalUnitCount && (
                  <div className="flex items-center">
                    <MDLabel
                      text={
                        <>
                          <p className="font-semibold text-primary text-xs">
                            {totalUnitCount}{' '}
                            {totalUnitCountText(totalUnitCount)}
                          </p>
                          <p className="text-[#5F5F5F] text-[10px]">
                            {totalUnits}
                          </p>
                        </>
                      }
                      inlineStyle={{
                        containerClass:
                          'text-center px-3 py-1 text-xs font-bold whitespace-nowrap',
                      }}
                    />
                    <div className="h-6 w-[1px] bg-primary mx-2 flex-shrink-0"></div>
                  </div>
                )}

                {/* Last item without divider */}
                <div className="flex items-center">
                  <MDLabel
                    text={
                      <>
                        <p className="font-semibold text-primary text-xs">
                          {plotAreaInfo
                            ? plotAreaMap(projectUnits)
                            : projectAreaMap(projectUnits)}
                        </p>
                        <p className="text-[#5F5F5F] text-[10px]">{unitSize}</p>
                      </>
                    }
                    inlineStyle={{
                      containerClass:
                        'text-center px-3 py-1 text-xs font-bold whitespace-nowrap',
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* CTA Button */}
      <div className="mt-8">
        <button
          className="w-full sm:w-auto bg-white text-primary py-3 px-6 rounded-full text-center border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-200 font-semibold min-w-[200px]"
          onClick={handleClick}
        >
          <MDLabel
            text={expertAdviceText}
            inlineStyle={{
              containerClass: 'flex items-center justify-center gap-2',
              imgClass: 'h-4 w-4',
              textColor: 'inherit',
              textClass: 'font-semibold text-sm md:text-sm',
            }}
          />
        </button>
      </div>
    </div>
  )
}

export default PropertyLabelsSection
