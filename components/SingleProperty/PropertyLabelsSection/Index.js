import { useEffect, useState } from 'react'
import Link from 'next/link'
import useWindowWidth from '@/context/useWindowWidth'
import { getLogger } from '@/helper/logger'
import {
  formatNumberWithUnit,
  makeApiRequest,
  numberFormatter,
  plotAreaMap,
  projectAreaMap,
  projectPriceMap,
} from '@/utils/utils'
import { MDLabel } from '@/components/MDLabel/MDLabel'
import doubleBed from '../../../assets/AmenitiesIcons/doubleBed.svg'
import furnitureIcon from '../../../assets/AmenitiesIcons/furniture.svg'
import areaIcon from '../../../assets/AmenitiesIcons/measured.svg'
import mscore from '../../../assets/logo/logo-icon.svg'
import shieldIcon from '../../../assets/logo/verification-logo.svg'
import eEstimate from '../../../assets/logo/eStimate.svg'
import { COMPONENTS, GLOBALLY_COMMON_TEXT, SEARCH_RESULT_CARD_TEXTS } from '@/textV2'
import EditLatLong from '@/components/Admin/Direct-Listing/EditLatLong'
import pencilIcon from '../../../assets/AmenitiesIcons/editLocation.svg'
import Image from 'next/image'
import { useAuth } from '@/context/auth'
import { ADMIN_TEXT } from '@/text'
const {  routes } = COMPONENTS?.SEARCH_RESULT_CARD_COMPO;
const { mapsUrl } = routes;

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
    coordinates: [propertyDetail?.latitude, propertyDetail?.longitude]
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
    addressLabel
  } = propertyDetail



  const extractedPropertySize = Array.isArray(areaDetail)
    ? areaDetail.find((area) => area.display === true)?.propertySize
    : undefined;

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
    }
    else {
      setSEstimate(mEstimate)
    }
  }
    , [_id, mEstimate])

  const formatBedBathCount = (count) => {
    return Number.isInteger(count) ? count : parseFloat(count).toFixed(1);
  };

  const window = useWindowWidth()
  const totalUnitCountText = (totalUnitCount) => {
    if (totalUnitCount === 1) { return unitText }
    else {
      return unitsText
    }
  }
  const { missingPropertyText, mScoreDiscriptionPath, superEstimateDiscriptionPath, expertAdviceText, unitText, unitsText } = COMPONENTS.SINGLE_PROPERTY_VIEW_COMPO?.propertyLabelSection
  const { areaMaps, symbols, text, units, propertyTypes } = GLOBALLY_COMMON_TEXT
  const { studioText, commercialLandText, plotText } = propertyTypes
  const { dash, rupeeSymbol } = symbols
  const { postType, upForSale, superEstimateLabel } = text
  const { suqareFeets } = units
  const { bathSingularText, bathPruralText, bedSingularText, bedPruralText, sharedbathText, bhkText } = SEARCH_RESULT_CARD_TEXTS.text
  const { projectStatus, projectSize, totalUnits, unitSize } = GLOBALLY_COMMON_TEXT?.text
  const plotAreaInfo = plotAreaMap(projectUnits);
  const [auth, setAuth] = useAuth()

  const { userResult } = auth || {}
  let tagsAndLabels = []
  if (tags) {
    tagsAndLabels = [...tags]
  }

  if (labels) {
    tagsAndLabels.push(labels)
  }

  return (
    <div className="px-3 md:px-7 mt-6 max-w-[1400px] m-auto">
      <div className="lg:flex lg:justify-between mb-2">
        <div
          className={`flex max-lg:justify-between max-lg:mb-3 ml-0 ${window < 770 && 'flex items-center justify-between'}`}
        >
          <div className='flex w-max gap-1 mt-2'>
            <div className='flex mt-1 gap-1'>
              {(projectTitle || mVerifiedStatus) && (
                <MDLabel
                  icon={shieldIcon}
                  inlineStyle={{
                    containerClass: 'flex items-start',
                    textColor: '#0168A2',
                    fontWeight: 'bold',
                    imgClass: 'w-5',
                    textClass:"text-[12px]"
                    
                  }}
                />
              )}
              <div className='flex gap-1'>
                <MDLabel
                  text={propertyType || projectType}
                  inlineStyle={{
                    textColor: 'var(--secondary-color)',
                    containerClass: 'mt-1',
                    fontWeight: 'bold',
                  }}

                />
                <span className='max-sm:text-[12px] mt-1'>{dash} {projectSubType || propertySubType} {projectLabel}</span>
              </div>
            </div>
            {mScore && (
              <Link
                target="_blank"
                href={mScoreDiscriptionPath}
              >
                <MDLabel
                  text={mScore}
                  icon={mscore}
                  inlineStyle={{
                    position: 'relative',
                    textColor: 'var(--secondary-color)',
                    fontWeight: 'bold',
                    bgColor: '#93160240',
                    containerClass:
                      'flex rounded-full w-fit px-2 py-1 ml-12 pr-[5px] ',
                    imgClass: 'mt-[8px] w-4 pl-[4px]',
                    textClass: 'text-[16px] pr-[6px]'
                  }}
                />
              </Link>
            )}
          </div>
        </div>
        <div className='flex flex-wrap w-full md:w-[78%] md:justify-end'>
          {(tagsAndLabels || projectHighlightTags)?.map(
            (highlight, index) => (
              <MDLabel
                text={highlight}
                key={index}
                inlineStyle={{
                  bgColor: 'var(--secondary-bg)',
                  fontWeight: 'bold',
                  textColor: 'var(--secondary-color)',
                  containerClass:
                    'rounded-full w-fit h-fit py-[9px] px-4  mt-1 tracking-wide max-lg:mr-2 lg:ml-2',
                }}
              />
            )
          )}
        </div>
      </div>

      <div className="flex justify-between gap-2 flex-wrap items-center text-[24px]  md:text-[28px] lg:text-[35px] max-md:mb-4">
        <div className="flex items-center text-[1rem]">
          <MDLabel
            text={propertyTitle || projectTitle}
            inlineStyle={{
              fontWeight: 'bold',
              textClass: 'text-[1rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[2rem]',
              textColor: 'var(--secondary-color)',

            }}
          />
        </div>
        <div>
          <h2 className={`flex-shrink-0 text-[1.1rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] rounded-lg ml-[0.5px] text-primary`}>
            {propertyTitle
              ? `${rupeeSymbol}${formatNumberWithUnit(salePrice ? salePrice : rentPrice)}`
              : projectPriceMap(projectUnits)}
          </h2>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between py-2 md:py-4 pb-6 md:pb-4'>
        <div className="flex items-center gap-2">
          {
            propertyDetail?.projectTitle ? (
              <Link
                target="_blank"
                href={`${mapsUrl}?api=1&query=${encodeURIComponent(locality + ' ' + city)}`}
                prefetch={true}
              >
                <p className="line-clamp-1 w-full underline ">
                  {locality}, {city}
                </p>
              </Link>
            ) : (
              addressLabel && (
                <Link
                  target="_blank"
                  href={`${mapsUrl}?api=1&query=${encodeURIComponent(addressLabel)}`}
                  prefetch={true}
                >
                  <p className="line-clamp-1 w-full underline">
                    {addressLabel}
                  </p>
                </Link>
              )
            )
          }


          {userResult?.userType === ADMIN_TEXT && <button
            onClick={() => setIsEditLatLongOpen(true)}
            className="p-1 rounded-md"
          >
            <Image
              src={pencilIcon}
              alt="Edit location"
              width={20}
              height={20}
            />
          </button>
          }
        </div>

        <EditLatLong
          isOpen={isEditLatLongOpen}
          onClose={() => setIsEditLatLongOpen(false)}
          projectData={projectData}
          setProjectData={setProjectData}
          inputValue={projectData?.projectTitle}
          setSelectDropdown={() => { }}
          isNotInList={false}
          setIsNotInList={() => { }}
          propertyId={_id}
          onFormSubmit={() => setIsFormSubmitted(true)}
        />

        <div className="flex justify-between">
          {!projectTitle &&
            <Link href={superEstimateDiscriptionPath} target="_blank">
              <div>
                {
                  propertyStatus == upForSale && sEstimate && (
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
                          'rounded-full w-fit h-fit py-[5px] text-[14px] pl-[4px] pr-[10px]',
                        imgClass: 'h-5 w-6 pl-2',
                        img: 'mt-2',
                      }}
                    />
                  )}
              </div>
            </Link>
          }
          {/* <div className=" justify-end flex items-end">
              <MDLabel
                text={`${projectBedroomString(projectUnits)} ${projectBedroomString(projectUnits) !== studioText && bhkText}`}
              />
            </div> */}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1 mt-0">
        <div className="flex gap-3 items-center text-sm text-gray-600 max-w-full">
          {propertyTitle ? (
            <>
              {bedroomCount && (
                bedroomCount == 0.5 ? (
                  <MDLabel icon={doubleBed} prefix={studioText} inlineStyle={{ imgClass: 'h-5 w-5' }} />
                ) : (
                  <MDLabel
                    icon={doubleBed}
                    text={`${formatBedBathCount(bedroomCount)} ${bhkText}`}
                    inlineStyle={{ imgClass: 'h-5 w-5' }}
                  />
                )
              )}

              {extractedPropertySize && (
                <MDLabel
                  icon={areaIcon}
                  prefix={extractedPropertySize}
                  text={suqareFeets}
                  inlineStyle={{ imgClass: 'h-5 w-5' }}
                />
              )}
              {furnishingStatus && (
                <MDLabel icon={furnitureIcon} text={furnishingStatus} inlineStyle={{ imgClass: 'h-5 w-5' }} />
              )}
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center my-3 max-sm:hidden">
                {projectSubType !== plotText && projectSubType !== commercialLandText && (
                  <div className="flex items-center">
                    <MDLabel
                      text={
                        <>
                          <p className="font-semibold text-primary ">{possessionStatus}</p>
                          <p>{projectStatus}</p>
                        </>
                      }
                      inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 max-sm:mb-2 text-sm font-bold rounded-md' }}
                    />
                    <div className="h-8 w-[1px] bg-primary"></div>
                  </div>
                )}
                <div className="flex items-center">
                  <MDLabel
                    text={
                      <>
                        <p className="font-semibold text-primary">{numberFormatter(projectArea) + ' ' + areaMaps[projectAreaUnit]}</p>
                        <p>{projectSize}</p>
                      </>
                    }
                    inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 max-sm:mb-2 text-sm font-bold rounded-md' }}
                  />
                  <div className="h-8 w-[1px] bg-primary"></div>
                </div>
                {totalUnitCount && (
                  <div className="flex items-center">
                    <MDLabel
                      text={
                        <>
                          <p className="font-semibold text-primary">{totalUnitCount} {totalUnitCountText(totalUnitCount)}</p>
                          <p>{totalUnits}</p>
                        </>
                      }
                      inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 max-sm:mb-2 text-sm font-bold rounded-md' }}
                    />
                    <div className="h-8 w-[1px] bg-primary"></div>
                  </div>
                )}
                {plotAreaInfo ? (
                  <div className="flex items-center">
                    <MDLabel
                      text={
                        <>
                          <p className="font-semibold text-primary">{plotAreaMap(projectUnits)}</p>
                          <p>{unitSize}</p>
                        </>
                      }
                      inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 max-sm:mb-2 text-sm font-bold rounded-md' }}
                    />
                    <div className="h-8 w-[1px] bg-primary"></div>
                  </div>
                ) : (
                  <div>
                    <MDLabel
                      text={
                        <>
                          <p className="font-semibold text-primary">{projectAreaMap(projectUnits)}</p>
                          <p>{unitSize}</p>
                        </>
                      }
                      inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 max-sm:mb-2 text-sm font-bold rounded-md' }}
                    />
                  </div>
                )}
              </div>

              <div className="sm:hidden w-fit overflow-x-auto">
                <div className="flex flex-row whitespace-nowrap my-3">
                  {projectSubType !== plotText && projectSubType !== commercialLandText && (
                    <MDLabel
                      text={
                        <>
                          <p className="font-semibold text-primary">{possessionStatus}</p>
                          <p>{projectStatus}</p>
                        </>
                      }
                      inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 text-sm font-bold  rounded-md flex-shrink-0 min-w-[150px]' }}
                    />
                  )}
                  <MDLabel
                    text={
                      <>
                        <p className="font-semibold text-primary">{numberFormatter(projectArea) + ' ' + areaMaps[projectAreaUnit]}</p>
                        <p>{projectSize}</p>
                      </>
                    }
                    inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 text-sm font-bold  rounded-md flex-shrink-0 min-w-[150px]' }}
                  />
                  {totalUnitCount && <MDLabel
                    text={
                      <>
                        <p className="font-semibold text-primary">{totalUnitCount} {totalUnitCountText(totalUnitCount)}</p>
                        <p>{totalUnits}</p>
                      </>
                    }
                    inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 text-sm font-bold  rounded-md flex-shrink-0 min-w-[150px]' }}
                  />
                  }
                  <MDLabel
                    text={
                      <>
                        <p className="font-semibold text-primary">{projectAreaMap(projectUnits)}</p>
                        <p>{unitSize}</p>
                      </>
                    }
                    inlineStyle={{ containerClass: 'text-center px-4 py-2 mr-2 mb-0 text-sm font-bold  rounded-md flex-shrink-0 min-w-[150px]' }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <button className="bg-white text-primary py-2 px-2 rounded-[40px] text-center border border-primary w-full md:w-auto my-2 md:my-0" onClick={handleClick}>
          <MDLabel
            text={expertAdviceText}
            inlineStyle={{
              containerClass: 'w-full md:w-[136px] items-center justify-center',
              imgClass: 'h-[16px] w-fit',
              textColor: '#931602',
              textClass: 'font-semibold'
            }}
          />
        </button>
      </div>


    </div>
  )
}

export default PropertyLabelsSection
