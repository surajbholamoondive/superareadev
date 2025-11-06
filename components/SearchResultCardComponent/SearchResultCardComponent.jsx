import Image from 'next/image'
import Link from 'next/link'
import { UNIT_SIZE } from '@/text'
import { COMPONENTS, GLOBALLY_COMMON_TEXT } from '@/textV2'
import {
  numberFormatter,
  plotAreaMap,
  projectAreaMap,
  projectBedroomString,
  projectPriceMap,
  searchResultCardNumberFormatter,
} from '@/utils/utils'
import { Tooltip } from '@mui/material'

import buildingIcon from '../../assets/AmenitiesIcons/building.svg'
import furnitureIcon from '../../assets/AmenitiesIcons/furniture.svg'
import locationIcon from '../../assets/AmenitiesIcons/locationNew.svg'
import areaIcon from '../../assets/AmenitiesIcons/measured.svg'
import MscoreMIcon from '../../assets/logo/logo-icon.svg'
import shieldIcon from '../../assets/logo/verification-logo.svg'
import User_cicrle_light from '../../assets/MenuIcons/ProfileDropdown/defaultProfileIcon.svg'
import Carousel from '../Carousel/Carousel'
import LikeShareButtons from '../LikeShare/Component'
import LikeUnlike from '../LikeShare/LikeUnlike'
import { MDLabel } from '../MDLabel/MDLabel'
import Badge from '../SearchResultPage/Badge'
import styles from './SearchResultCardComponent.module.css'

//
const { text, routes } = COMPONENTS?.SEARCH_RESULT_CARD_COMPO
const {
  bathSingularText,
  bathPruralText,
  bedSingularText,
  bedPruralText,
  bhkText,
  projectSizeText,
  sharedbathText,
} = text
const { mScorePath, mapsUrl, superVerificationPath } = routes
const { propertySizeUnits, propertySizeUnitMap, propertyTypes } =
  GLOBALLY_COMMON_TEXT
const { dash, rupeeSymbol, colon } = GLOBALLY_COMMON_TEXT?.symbols
const { contactButton } = GLOBALLY_COMMON_TEXT?.buttons
const { suqareFeets } = GLOBALLY_COMMON_TEXT?.units
const { aprrovedText, ownerText, rentText, upForSale } =
  GLOBALLY_COMMON_TEXT?.text
const {
  studioText,
  commercialLandText,
  officeSpace,
  pgText,
  plotText,
  showroomText,
  warehouseText,
} = propertyTypes
export default function SearchResultCardComponent({
  id,
  profileImage = '',
  mScore = false,
  share = false,
  isProject = false,
  myListing = false,
  addresslabel,
  bathroomCount,
  mScoreValue = '',
  bedroomCount,
  furnishingStatus,
  propertyTitle = '',
  projectTitle = '',
  salePrice,
  rentPrice,
  propertySize,
  propertyDescription = '',
  projectDescription = '',
  projectType,
  propertyType,
  projectSubType,
  propertySubType = '',
  postedBy = '',
  firstName,
  lastName,
  imageArray,
  linkEnabled = true,
  projectUnits = [],
  totalUnitCount = '',
  projectAreaUnit = '',
  projectArea = '',
  locality = '',
  city = '',
  daysAgo,
  ShowContact = true,
  mVerifiedStatus,
  assignedTo,
  propertySizeUnit,
  propertyUrl = '',
}) {
  const getLabelFromValue = (value) => {
    const unit = propertySizeUnits.find((unit) => unit.value === value)
    return unit ? unit.label : suqareFeets
  }
  const projectValue = projectPriceMap(projectUnits)
  const saleValue = searchResultCardNumberFormatter(salePrice)
  const rentValue = searchResultCardNumberFormatter(rentPrice)
  return (
    <section className={styles.sectionWrapper}>
      {!isProject &&
        (salePrice ? (
          <Badge propertyStatus={upForSale} />
        ) : (
          <Badge propertyStatus={rentText} />
        ))}
      <div className="w-[230px] h-[245px] max-lg:w-full">
        <Carousel id={id} isProject={isProject} images={imageArray} />
      </div>

      {linkEnabled && propertyUrl != '' ? (
        <div className="w-full">
          <div className="flex justify-between gap-1 min-w-full items-center ">
            {propertyType ? (
              <div className="flex gap-1 items-center h-full">
                {mVerifiedStatus === aprrovedText && (
                  <Link href={superVerificationPath}>
                    <Image
                      src={shieldIcon}
                      width={14}
                      height={14}
                      alt="shield icon"
                    />
                  </Link>
                )}
                <p className="text-primary ">{propertyType}</p>
                {dash}
                <span>{propertySubType}</span>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <Link href={superVerificationPath}>
                  <Image
                    src={shieldIcon}
                    width={14}
                    height={14}
                    alt="shield icon"
                  />
                </Link>
                <p className="text-primary">{projectType}</p>
                {dash}
                <span className="">{projectSubType}</span>
              </div>
            )}
            <div className="flex h-fit items-center ">
              {mScoreValue != '' && salePrice && (
                <Link
                  target="_blank"
                  href={mScorePath}
                  className="h-fit"
                  prefetch={true}
                >
                  <div className="flex items-center bg-languageBackground px-2 mt-[2px] rounded-3xl max-sm:rounded-2xl gap-1 h-6 justify-center">
                    <Image
                      src={MscoreMIcon}
                      width={12}
                      height={10}
                      alt="Mores M-score,real estate m-score"
                      className=" max-sm:h-[14px] max-sm:w-[14px]"
                    />
                    <span className="text-primary pt-[1px] ">
                      {mScoreValue}
                    </span>
                  </div>
                </Link>
              )}
              {isProject
                ? share && (
                  <div className="cursor-pointer h-fit hidden sm:block">
                    <LikeUnlike id={id} isProject={true} />
                  </div>
                )
                : share && (
                  <div className="cursor-pointer h-fit hidden sm:block ">
                    <LikeUnlike id={id} isProject={false} />
                  </div>
                )}
              {share && (
                <div className="cursor-pointer h-fit hidden sm:block">
                  <LikeShareButtons
                    copyCard={true}
                    copyPath={`${process.env.NEXT_PUBLIC_FRONTEND_API}/${propertyUrl}`}
                  />
                </div>
              )}
            </div>
          </div>
          <Link
            href={`${process.env.NEXT_PUBLIC_FRONTEND_API}/${isProject ? 'project-view' : 'property-view'}/${propertyUrl}`}
            target="_blank"
            prefetch={true}
          >
            <div className="flex justify-between min-w-full mt-1 ">
              <div className="w-[70%] max-lg:w-[60%] ">
                {projectTitle && projectTitle != '' ? (
                  linkEnabled && propertyUrl != '' ? (
                    <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                      {projectTitle}
                    </h3>
                  ) : (
                    <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                      {projectTitle}
                    </h3>
                  )
                ) : linkEnabled && propertyUrl != '' ? (
                  <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                    {propertyTitle}
                  </h3>
                ) : (
                  <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                    {propertyTitle}
                  </h3>
                )}
              </div>
              <div className="text-center break-words whitespace-normal sm:whitespace-nowrap">
                {isProject ? (
                  <h3 className="font-semibold text-primary text-base sm:text-lg">
                    {projectPriceMap(projectUnits)}
                  </h3>
                ) : salePrice ? (
                  <h3 className="font-semibold text-primary text-base sm:text-lg">
                    {rupeeSymbol} {searchResultCardNumberFormatter(salePrice)}
                  </h3>
                ) : (
                  <h3 className="font-semibold text-base sm:text-lg">
                    {rupeeSymbol} {searchResultCardNumberFormatter(rentPrice)}
                  </h3>
                )}
              </div>
            </div>
          </Link>
          <div className="flex items-center min-w-full text-gray-500 justify-between mt-3">
            <div className="flex gap-1 items-center ">
              <Image
                src={locationIcon}
                width={12}
                height={12}
                alt="Mores location icon, projects and properties location"
              />
              {isProject ? (
                <Link
                  target="_blank"
                  href={`${mapsUrl}?api=1&query=${encodeURIComponent(locality + ' ' + city)}`}
                  prefetch={true}
                >
                  <p className="line-clamp-1 w-full underline">
                    {locality}, {city}
                  </p>
                </Link>
              ) : (
                <Link
                  target="_blank"
                  href={`${mapsUrl}?api=1&query=${encodeURIComponent(addresslabel)}`}
                  prefetch={true}
                >
                  <p className="line-clamp-1 w-full underline">
                    {addresslabel}
                  </p>
                </Link>
              )}
            </div>

            {!isProject &&
              propertySubType !== plotText &&
              propertySubType !== warehouseText &&
              propertySubType !== commercialLandText && (
                <div className="w-[70px] justify-end flex items-end">
                  {bedroomCount === 'Studio' || Number(bedroomCount) === 0.5 ? (
                    <MDLabel
                      text={
                        bedroomCount === 'Studio' ||
                          Number(bedroomCount) === 0.5
                          ? 'Studio'
                          : bedroomCount + ' ' + bhkText
                      }
                    />
                  ) : (
                    <MDLabel
                      text={bedroomCount > 0 && bedroomCount + ' ' + bhkText}
                    />
                  )}
                </div>
              )}
          </div>
          {!isProject &&
            (propertySubType === plotText ||
              propertySubType === warehouseText ||
              propertySubType === commercialLandText ||
              propertySubType === pgText ? (
              <div className="flex gap-2 mt-[10px] w-[75%] min-w-full max-lg:w-full">
                <div className="flex text-gray-500 gap-1">
                  <Image
                    src={areaIcon}
                    width={12}
                    height={12}
                    alt="Mores property and projects area"
                  />
                  <p>{`${numberFormatter(propertySize)} ${getLabelFromValue(propertySizeUnit)}`}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap mt-3 w-[70%] min-w-full max-lg:w-full items-start gap-2 ml-0.5  ">
                {/* {propertySubType !== showroomText &&
                  propertySubType !== officeSpace && (
                    <div className="flex text-[12px] items-center text-gray-500 gap-1 max-lg:text-[12px] max-sm:text-[12px]">
                      {(Number(bathroomCount) >= 1 ||
                        bathroomCount === 'Shared' ||
                        Number(bathroomCount) === 0.5) && (
                        <Image
                          src={bathtub}
                          width={14}
                          height={14}
                          alt="bathtub icon for real estate, mores"
                        />
                      )}
                      {Number(bathroomCount) > 1 ? (
                        <p>
                          {bathroomCount} {bathPruralText}
                        </p>
                      ) : (
                        Number(bathroomCount) !== 0 && <p>{sharedbathText}</p>
                      )}
                    </div>
                  )}
                {propertySubType !== showroomText &&
                  propertySubType !== officeSpace && (
                    <div className="flex text-[12px] text-gray-500 gap-1 max-lg:text-[12px] max-sm:text-[12px] ">
                      {(Number(bedroomCount) >= 1 ||
                        bedroomCount === 'Studio' ||
                        Number(bedroomCount) === 0.5) && (
                        <Image
                          src={doubleBed}
                          width={14}
                          height={14}
                          alt="Mores double bed icon"
                        />
                      )}
                      {Number(bedroomCount) > 1 ? (
                        <p>
                          {bedroomCount} {bedPruralText}
                        </p>
                      ) : (
                        Number(bedroomCount) !== 0 && <p>{studioText}</p>
                      )}
                    </div>
                  )} */}
                <div className="flex text-[12px] text-gray-500 gap-1 max-lg:text-[12px] max-sm:text-[12px]">
                  <Image
                    src={areaIcon}
                    width={14}
                    height={14}
                    alt="Mores property and projects area"
                  />
                  <p>{`${numberFormatter(propertySize)} ${getLabelFromValue(propertySizeUnit)}`}</p>
                </div>
                {propertySubType !== plotText &&
                  propertySubType !== commercialLandText && (
                    <div className="flex text-gray-500 gap-1">
                      <Image
                        src={furnitureIcon}
                        width={14}
                        height={14}
                        alt="furniture icon for real estate"
                      />
                      <p>{furnishingStatus}</p>
                    </div>
                  )}
              </div>
            ))}

          <div className="mt-3 line-clamp-2 w-full">
            {linkEnabled && propertyUrl != '' ? (
              <Link href={propertyUrl} target="_blank" prefetch={true}>
                <div
                  className="max-lg:w-full break-all "
                  dangerouslySetInnerHTML={{
                    __html: propertyDescription || projectDescription,
                  }}
                />
              </Link>
            ) : (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: propertyDescription || projectDescription,
                }}
              />
            )}
          </div>

          {isProject && (
            <Link href={propertyUrl} target="_blank" prefetch={true}>
              <div className="flex items-center gap-1 flex-wrap">
                {plotAreaMap(projectUnits) && (
                  <>
                    <div className="flex items-center justify-center gap-[2px] px-1 py-1 rounded-lg max-lg:text-[12px] max-sm:text-[10px] max-w-[100%] truncate">
                      <Tooltip title={`${plotAreaMap(projectUnits)}`}>
                        <div className="flex">
                          <p className="font-semibold mr-1 text-primary">
                            {UNIT_SIZE}
                          </p>
                          <p className="truncate">
                            - {plotAreaMap(projectUnits)}
                          </p>
                        </div>
                      </Tooltip>
                    </div>
                    {(projectAreaMap(projectUnits) !== 'NaN Sq.Ft.' ||
                      (projectUnits && projectUnits[0]?.bedroomCount)) && (
                        <div className="w-[1px] h-4 bg-newBackground"></div>
                      )}
                  </>
                )}
                {projectAreaMap(projectUnits) !== 'NaN Sq.Ft.' && (
                  <>
                    <div className="flex items-center justify-center gap-[2px] text-primary py-1 rounded-lg max-lg:text-[12px] max-sm:text-[10px] max-[360px]:text-[8px] max-w-[100%] truncate">
                      <Tooltip title={`${projectAreaMap(projectUnits)}`}>
                        <div className="flex">
                          <p className="font-bold mr-1 text-primary max-[360px]:text-[10px] ">
                            {UNIT_SIZE}
                          </p>
                          <p className="text-primary font-bold truncate max-[360px]:text-[10px] ">
                            - {projectAreaMap(projectUnits)}
                          </p>
                        </div>
                      </Tooltip>
                    </div>
                    {projectUnits && projectUnits[0]?.bedroomCount && (
                      <div className="w-[1px] h-4 bg-newBackground"></div>
                    )}
                  </>
                )}
                {projectUnits && projectUnits[0]?.bedroomCount && (
                  <div className=" flex items-center justify-center gap-[2px] text-primary px-1 py-1 rounded-lg max-lg:text-[12px] max-sm:text-[10px] truncate">
                    <MDLabel
                      text={`${projectBedroomString(projectUnits)} ${projectBedroomString(projectUnits) !== studioText && bhkText}`}
                      inlineStyle={{
                        textColor: '#931600',
                        fontWeight: 'bold',
                      }}
                    />
                  </div>
                )}
              </div>
            </Link>
          )}
          <div
            className={`flex ${isProject ? 'justify-end' : 'justify-between'} items-center min-w-full mt-3`}
          >
            {!isProject && (
              <div className="flex items-center justify-between w-full gap-2">

                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative w-[40px] h-[40px] rounded-full shrink-0">
                    <Image
                      className="rounded-full"
                      src={assignedTo?.profileImage || profileImage || User_cicrle_light}
                      fill
                      alt="user default icon"
                    />
                  </div>

                  <div className="flex-col justify-evenly min-w-0">
                    {assignedTo?.firstName !== undefined ? (
                      <p className="capitalize truncate max-w-[120px] sm:max-w-[200px]">
                        {`${assignedTo?.firstName} ${assignedTo?.lastName}`}
                      </p>
                    ) : (
                      <p className="capitalize truncate max-w-[120px] sm:max-w-[200px]">
                        {`${firstName} ${lastName}`}
                      </p>
                    )}
                    <p className={`whitespace-normal ${styles.date}`}>{daysAgo}</p>
                  </div>
                </div>
                {ShowContact &&
                  (!isProject ? (
                    myListing ? (
                      <button className={styles.button}>{contactButton}</button>
                    ) : (
                      <Link
                        href={`${propertyUrl}/#contact`}
                        target="_blank"
                        className="border border-[var(--secondary-color)] text-[var(--subheading-color)] text-sm sm:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full tracking-wider whitespace-nowrap transition-colors duration-300 hover:bg-[var(--secondary-color)] hover:text-white"
                        prefetch={true}
                      >
                        {contactButton}
                      </Link>
                    )
                  ) : myListing ? (
                    <button className={styles.button}>{contactButton}</button>
                  ) : (
                    <Link
                      href={`${propertyUrl}/#contact`}
                      target="_blank"
                      className="border border-[var(--secondary-color)] text-[var(--subheading-color)] px-8 py-2 rounded-full tracking-wider transition-colors duration-300 hover:bg-[var(--secondary-color)] hover:text-white"
                      prefetch={true}
                    >
                      {contactButton}
                    </Link>
                  ))}
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between gap-1 min-w-full ">
            {propertyType ? (
              <div className="flex gap-1 items-center">
                {mVerifiedStatus === aprrovedText && (
                  <Image
                    src={shieldIcon}
                    width={14}
                    height={14}
                    alt="shield icon"
                  />
                )}
                <p className="text-primary">{propertyType}</p>
                {dash}
                <span className="">{propertySubType}</span>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <Image
                  src={shieldIcon}
                  width={14}
                  height={14}
                  alt="shield icon"
                />
                <p className="text-primary">
                  {projectType}
                  {dash}
                </p>
                <span className="">{projectSubType}</span>
              </div>
            )}
            <div className="flex gap-1">
              {mScoreValue != '' && (
                <div className="flex items-center bg-nearbySelectedBackground px-2 py-1 rounded-3xl gap-1 max-lg:p-1">
                  <Image
                    src={MscoreMIcon}
                    width={12}
                    height={10}
                    alt="Mores M-score,real estate m-score"
                  />
                  <span className="text-primary pt-[1px]">{mScoreValue}</span>
                </div>
              )}
              {isProject
                ? share && (
                  <div>
                    <LikeUnlike id={id} isProject={true} />
                  </div>
                )
                : share && (
                  <div>
                    <LikeUnlike id={id} isProject={false} />
                  </div>
                )}
              {share && (
                <div>
                  <LikeShareButtons />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between min-w-full mt-3">
            <div className="w-[70%] max-lg:w-[60%] ">
              {projectTitle && projectTitle != '' ? (
                linkEnabled && propertyUrl != '' ? (
                  <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                    {projectTitle}
                  </h3>
                ) : (
                  <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                    {projectTitle}
                  </h3>
                )
              ) : linkEnabled && propertyUrl != '' ? (
                <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                  {propertyTitle}
                </h3>
              ) : (
                <h3 className="line-clamp-1 font-semibold max-lg:break-words max-lg:line-clamp-2 text-primary">
                  {propertyTitle}
                </h3>
              )}
            </div>
            <div className="w-[50%] text-right line-clamp-1">
              {totalUnitCount && totalUnitCount != '' ? (
                <h3 className="font-semibold">
                  {projectPriceMap(projectUnits)}
                </h3>
              ) : salePrice ? (
                <h3 className="font-semibold">
                  {rupeeSymbol}
                  {searchResultCardNumberFormatter(salePrice)}
                </h3>
              ) : (
                <h3 className="font-semibold">
                  {rupeeSymbol}
                  {searchResultCardNumberFormatter(rentPrice)}
                </h3>
              )}
            </div>
          </div>
          <div className="flex items-center min-w-full text-gray-500 justify-between mt-3">
            <div className="flex gap-1 items-center">
              <Image
                src={locationIcon}
                width={12}
                height={12}
                alt="Mores location icon, projects and properties location"
              />
              {isProject ? (
                <p className="line-clamp-1 w-full">
                  {locality}, {city}
                </p>
              ) : (
                <p className="line-clamp-1 w-[90%]">{addresslabel}</p>
              )}
            </div>
            {isProject
              ? projectUnits &&
              projectUnits[0]?.bedroomCount && (
                <div className="max-w-[40%] justify-end flex items-end">
                  <MDLabel
                    text={`${projectBedroomString(projectUnits)} ${projectBedroomString(projectUnits) !== 'Studio' && 'BHK'}`}
                  />
                </div>
              )
              : propertySubType !== plotText &&
              propertySubType !== warehouseText &&
              propertySubType !== commercialLandText &&
              (bedroomCount === 'Studio' ? (
                <MDLabel
                  text={bedroomCount}
                  inlineStyle={{
                    containerClass: 'w-[60px]',
                  }}
                />
              ) : (
                <MDLabel
                  text={bedroomCount + ' ' + bhkText}
                  inlineStyle={{
                    containerClass: 'w-[40px] ml-3',
                  }}
                />
              ))}
          </div>
          {!isProject &&
            (propertySubType === plotText ||
              propertySubType === warehouseText ||
              propertySubType === commercialLandText ||
              propertySubType === pgText ? (
              <div className="flex gap-2 mt-[10px] w-[75%] min-w-full max-lg:w-full">
                <div className="flex text-gray-500 gap-1">
                  <Image
                    src={areaIcon}
                    width={12}
                    height={12}
                    alt="Mores property and projects area"
                  />
                  <p>{`${numberFormatter(propertySize)} ${getLabelFromValue(propertySizeUnit)}`}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mt-3 w-[75%] min-w-full max-lg:w-full max-sm:justify-evenly">
                {/* {propertySubType !== showroomText &&
                  propertySubType !== officeSpace && (
                    <div className="flex items-center text-gray-500 gap-1">
                      {(Number(bathroomCount) >= 1 ||
                        bathroomCount === 'Shared') && (
                        <Image
                          src={bathtub}
                          width={11}
                          height={11}
                          alt="bathtub icon for real estate, mores"
                        />
                      )}
                      {Number(bathroomCount > 1) ? (
                        <p>
                          {bathroomCount} {bathPruralText}
                        </p>
                      ) : (
                        Number(bathroomCount) !== 0 && (
                          <p>
                            {bathroomCount} {bathSingularText}
                          </p>
                        )
                      )}
                    </div>
                  )} */}
                {/* {propertySubType !== showroomText &&
                  propertySubType !== officeSpace && (
                    <div className="flex text-gray-500 gap-1">
                      {(Number(bedroomCount) >= 1 ||
                        bedroomCount === 'Studio') && (
                        <Image
                          src={doubleBed}
                          width={11}
                          height={11}
                          alt="Mores double bed icon"
                        />
                      )}
                      {Number(bedroomCount) > 1 ? (
                        <p>
                          {bedroomCount} {bedPruralText}
                        </p>
                      ) : (
                        Number(bedroomCount) !== 0 && (
                          <p>
                            {bedroomCount} {bedSingularText}
                          </p>
                        )
                      )}
                    </div>
                  )} */}
                <div className="flex text-gray-500 gap-1">
                  <Image
                    src={areaIcon}
                    width={12}
                    height={12}
                    alt="Mores property and projects area"
                  />
                  <p>{`${numberFormatter(propertySize)} ${getLabelFromValue(propertySizeUnit)}`}</p>
                </div>
                {propertySubType !== plotText &&
                  propertySubType !== commercialLandText && (
                    <div className="flex text-gray-500 gap-1">
                      <Image
                        src={furnitureIcon}
                        width={12}
                        height={12}
                        alt="furniture icon for real estate"
                      />
                      <p>{furnishingStatus}</p>
                    </div>
                  )}
              </div>
            ))}

          <div className="mt-3 line-clamp-2 w-[90%] max-w-[500px]">
            {linkEnabled && propertyUrl != '' ? (
              <Link href={propertyUrl} target="_blank" prefetch={true}>
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: propertyDescription || projectDescription,
                  }}
                />
              </Link>
            ) : (
              <div
                className=""
                dangerouslySetInnerHTML={{
                  __html: propertyDescription || projectDescription,
                }}
              />
            )}
          </div>
          {isProject && (
            <div className="flex justify-between mt-3 min-w-full">
              <div className="items-center flex text-primary bg-nearbySelectedBackground px-2 py-2 gap-1 rounded-lg">
                <Image
                  src={buildingIcon}
                  width={15}
                  height={15}
                  alt="Mores, real estate projects buildings icon"
                />
                <p className="line-clamp-1 ">
                  {projectSizeText}
                  {colon} {numberFormatter(projectArea)}{' '}
                  {propertySizeUnitMap[projectAreaUnit]}
                </p>
              </div>
              <div className="items-center flex justify-center  text-primary bg-nearbySelectedBackground px-2  py-2 rounded-lg max-lg:text-[12px] max-sm:text-[12px] max-w-[20%]">
                <p className="line-clamp-1">
                  {Number(totalUnitCount) > 1
                    ? `${totalUnitCount} Units`
                    : `${totalUnitCount} Unit`}
                </p>
              </div>
              <div className="items-center flex justify-center gap-[2px] text-primary bg-nearbySelectedBackground px-2 py-2 rounded-lg max-lg:text-[12px] max-sm:text-[12px] max-w-[50%]">
                <Tooltip title={`${projectAreaMap(projectUnits)}`}>
                  <p className="truncate">
                    {` ${projectAreaMap(projectUnits)}`}
                  </p>
                </Tooltip>
              </div>
            </div>
          )}
          <div
            className={`flex ${isProject ? 'justify-end' : 'justify-between'} items-center min-w-full mt-3`}
          >
            {!isProject && (
              <div className="flex items-center gap-1">
                <div className="relative w-[40px] h-[40px] rounded-full">
                  <Image
                    src={
                      assignedTo?.profileImage ||
                      profileImage ||
                      User_cicrle_light
                    }
                    fill
                    alt="user default icon"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col justify-evenly ">
                  {assignedTo?.firstName !== undefined ? (
                    <p className="">
                      {`${assignedTo?.firstName} ${assignedTo?.lastName}`}
                    </p>
                  ) : (
                    <p className="">{`${firstName} ${lastName}`}</p>
                  )}
                  <p className="">{daysAgo}</p>
                </div>
              </div>
            )}
            {ShowContact &&
              (!isProject ? (
                myListing ? (
                  <button
                    disabled
                    className={`py-2 max-lg:py-[6px] px-5 bg-[#979797] text-white tracking-wider rounded-lg max-sm:p-3 cursor-not-allowed `}
                  >
                    {contactButton}
                  </button>
                ) : (
                  <button
                    className={`py-2 max-lg:py-[6px] px-5 tracking-wide rounded-lg max-sm:p-3 bg-button text-white`}
                  >
                    {contactButton}
                  </button>
                )
              ) : myListing ? (
                <button
                  disabled
                  className={`py-2 max-lg:py-[6px] px-5  bg-[#979797] text-white tracking-wider rounded-lg max-lg:p-3 max-lg:w-[200px] max-sm:p-3 max-sm:w-[150px] cursor-not-allowed`}
                >
                  {contactButton}
                </button>
              ) : (
                <button
                  className={`py-2 max-lg:py-[6px] px-5 text-white tracking-wider rounded-lg max-lg:p-3 max-lg:w-[200px] max-sm:p-3 max-sm:w-[150px] bg-button`}
                >
                  {contactButton}
                </button>
              ))}
          </div>
        </div>
      )}
    </section>
  )
}
