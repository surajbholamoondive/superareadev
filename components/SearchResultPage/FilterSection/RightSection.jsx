import Image from 'next/image'
import MobileViewProperty from '@/assets/moreIcon/MobileViewProperty'
import useWindowWidth from '@/context/useWindowWidth'
import ShareButtons from '@/components/LikeShare/Component'
import doubleBed from '../../../assets/AmenitiesIcons/doubleBed.svg'
import bathtub from '../../../assets/AmenitiesIcons/bathtub.svg'
import locationIcon from '../../../assets/AmenitiesIcons/location.svg'
import furnitureIcon from '../../../assets/AmenitiesIcons/furniture.svg'
import areaIcon from '../../../assets/AmenitiesIcons/measured.svg'
import buildingIcon from '../../../assets/AmenitiesIcons/building.svg'
import shieldIcon from '../../../assets/logo/verification-logo.svg'
import User_cicrle_light from '../../../assets/MenuIcons/ProfileDropdown/User_cicrle_light.svg'
import mscore from '@/assets/logo/logo-icon.svg'
import Link from 'next/link'
import LikeUnlike from '@/components/LikeShare/LikeUnlike'
import {
  projectAreaMap,
  projectBedroomString,
  projectPriceMap,
} from '@/utils/utils'
import { MDLabel } from '@/components/MDLabel/MDLabel'
import { formatNumberWithUnit } from '@/utils/utils'
import { useAuth } from '@/context/auth'
import {
  AGENT_FORM_ID,
  BATHS,
  BEDS,
  BHK,
  BUY_TEXT,
  CONTACT,
  DASH,
  MSCORE_DESCRIPTION_PATH,
  M_VERIFICATION_DESCRIPTION_PATH,
  OWNER,
  PROJECT_SIZE,
  PROPERTY_SIZE_UNIT_MAP,
  RENT_TEXT,
  RUPEES_SYMBOL,
  SELL,
  SQUARE_FT_TEXT,
  VIEW_PROJECT_PATH,
  VIEW_PROPERTY_PATH,
} from '@/text'
import Badge from '../Badge'

const RightSection = ({ propertyDetail, statusView,edit=false , mVerify}) => {
  const windowWidth = useWindowWidth()
  const auth = useAuth()
  const firstName = auth[0]?.userResult?.firstName
  const lastName = auth[0]?.userResult?.lastName
  const FullName = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`
  const {
    _id,
    propertyType,
    projectType,
    mScore,
    propertyTitle,
    projectTitle,
    locality,
    city,
    rentPrice,
    salePrice,
    bedroomCount,
    bathroomCount,
    furnishingStatus,
    propertySize,
    projectArea,
    projectAreaUnit,
    propertyDescription,
    projectDescription,
    propertySubType,
    projectSubType,
    propertyStatus,
    totalUnitCount,
    listing,
    unitNumber,
    towerBlock,
    projectUnits,
    postedBy,
    assignedTo,
    mVerificationDetails,
    createdAt
  } = propertyDetail || {}


  function calculateDaysFromDate(dateString) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMillis = currentDate - givenDate;
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  const propertyStatusLabel = propertyStatus
    ? `${propertyStatus}`
    : `${listing === SELL ? BUY_TEXT : RENT_TEXT}`
  const addressLabel = `${locality}, ${city}`
  const propertyLabel = `${propertyTitle} - ${towerBlock ? `${towerBlock}/` : ''
    } ${unitNumber ? `${unitNumber}` : ''}`
    const generatePropertyURL = (propertyDetail) => {
      const {
        _id,
        propertyType,
        projectType,
        city,
        propertyTitle,
        projectTitle,
        propertySize,
        locality,
        projectSubType,
        propertySubType,
        propertyAreaUnit,
      } = propertyDetail || {}
      
      let metadataString = ''
      if (propertyTitle) metadataString += `${propertyTitle}-`
      if (projectTitle) metadataString += `${projectTitle}-`
      if (propertyType) metadataString += `${propertyType}-`
      if (projectType) metadataString += `${projectType}-`
      if (propertySize) metadataString += `${propertySize}-`
      if (propertyAreaUnit) metadataString += `${propertyAreaUnit}-`
      if (city) metadataString += `${city}-`
      if (locality) metadataString += `${locality}-`
      if (propertySubType) metadataString += `${propertySubType}-`
      if (projectSubType) metadataString += `${projectSubType}-`
    
      // Remove trailing hyphen if present
      metadataString = metadataString.replace(/-$/, '')
    
      let url = ''
      if (propertyTitle) {
        url = `${VIEW_PROPERTY_PATH}/${metadataString}/${_id}`
      } else {
        url = `${VIEW_PROJECT_PATH}/${metadataString}/${_id}`
      }
    
      // Ensure there are no double slashes
      url = url.replace(/\/\//g, '/')
    
      return url
    }
  const propertyPath = `${process.env.NEXT_PUBLIC_FRONTEND_API}${generatePropertyURL(propertyDetail)}`
  const handleContact = () => {
    const propertyURL = generatePropertyURL(propertyDetail);
    const targetSectionId = AGENT_FORM_ID;
    const targetURL = `${propertyURL}#${targetSectionId}`;
    window.location.replace(targetURL);
  };
  return (
    <div
      className={`${statusView ? 'px-3 ' : ' md:pr-7'
        } max-md:pt-2 cursor-default`}
    >
      {propertyTitle && <Badge propertyStatus={propertyStatusLabel} />}
      <div className="flex justify-between lg:text-[0.695em] md:text-[0.8em] sm:text-[0.75em] ">
        <div className="flex items-center justify-center w-fit ">
          <Link href={M_VERIFICATION_DESCRIPTION_PATH} target="_blank">
            <MDLabel
              icon={shieldIcon}
              text={propertyType || projectType}
              inlineStyle={{
                position: 'relative',
                textColor: '#931602',
                fontWeight: 'bold',
                iconWidth: `${statusView ? '1rem' : '1.2rem'}`,
                containerClass: `lg:text-[0.695rem] md:text-[0.8rem] sm:text-[0.75rem]`,
              }}
            />
          </Link>
          <MDLabel
            text={DASH + (propertySubType || projectSubType)}
            inlineStyle={{
              containerClass: `${statusView
                ? ' lg:text-[0.695rem] ml-[5.2rem]'
                : ' lg:text-[14px] ml-20'
                } ml-1 max-md:ml-[100px] md:text-[0.5rem] sm:text-[0.75rem] `,
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-[0rem] align-center text-center text-button p-1">
          {mScore && (
            <Link href={MSCORE_DESCRIPTION_PATH} target="_blank">
              <MDLabel
                text={mScore}
                icon={mscore}
                inlineStyle={{
                  position: 'relative',
                  textColor: '#931602',
                  fontWeight: 'bold',
                  bgColor: '#9316020f',
                  containerClass:
                    'rounded-full w-[60px] h-[30px] pt-[6px] px-[10px] text-[0.8rem]',
                  imgClass: 'mt-1.5 w-[14px]',
                }}
              />
            </Link>
          )}
          <div className="flex items-center  max-md:hidden">
            {statusView ? (
              <ShareButtons id={_id} copyCard={true} copyPath={propertyPath} />
            ) : (
              <div>
                {_id && (
                  <div className="flex items-center">
                    <LikeUnlike id={_id} isProject={projectType ? true : false} edit={edit} />
                    <ShareButtons id={_id} edit={edit} copyCard={true} copyPath={propertyPath}/>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {(_id )? (
       edit?(<>
       <div
         className={`capitalize lg:flex max-lg:flex-col w-full font-semibold ${statusView ? 'text-[0.9 rem]' : 'text-[1.2rem] mt-2'
           } justify-between -mt-1 `}
       >
         <h1 className={`${statusView? "h-[25px] w-[230px]" :"h-[30px] w-[350px]"} capitalize  text-ellipsis overflow-hidden  line-clamp-1  text-[0.9 rem] max-md:text-md `}>
           {propertyTitle ? propertyLabel : projectTitle}
         </h1>
         <div className="flex justify-center w-[100px]">
           {propertyType && (
             <h1
               className={`max-md:pt-3 max-md:text-md max-lg:mt-2 lg:text-[1em]`}
               // style={{  font-family: 'Poppins' }}
             >
               {RUPEES_SYMBOL}
               {formatNumberWithUnit(salePrice ? salePrice : rentPrice)}
             </h1>
           )}
           {totalUnitCount && (
             <h1
               className={`max-md:pt-3 max-md:text-md max-lg:mt-2 lg:text-[1em]`}
               style={{ fontFamily: 'Poppins' }}
             >
               {projectPriceMap(projectUnits)}
             </h1>
           )}
           <div>{windowWidth < 768 && <MobileViewProperty id={_id} />}</div>
         </div>
       </div>
       <div className="flex gap-[6%] mt-2 text-[0.8em] text-gray-500 justify-between">
         <MDLabel
           icon={locationIcon}
           text={addressLabel}
           inlineStyle={{
             position: 'relative',
           }}
         />
         {bedroomCount && (
           <MDLabel
             text={bedroomCount + ' ' + BHK}
             inlineStyle={{ fontWeight: 'bold' }}
           />
         )}
         {projectUnits && projectUnits[0]?.bedroomCount && (
           <MDLabel
             text={projectBedroomString(projectUnits) + ' ' + BHK}
             inlineStyle={{ fontWeight: 'bold' }}
           />
         )}
       </div>
       {(bedroomCount || bathroomCount || propertySize) && (
         <div className="flex items-center max-md:hidden text-[0.77em] justify-start gap-[0.6em] mt-2 text-gray-500">
           <MDLabel icon={bathtub} prefix={bathroomCount} text={BATHS} />

           <MDLabel icon={doubleBed} prefix={bedroomCount} text={BEDS} />

           <MDLabel
             icon={areaIcon}
             prefix={propertySize}
             text={SQUARE_FT_TEXT}
           />

           <MDLabel icon={furnitureIcon} text={furnishingStatus} />
         </div>
       )}
       <div className="mt-2 line-clamp-2 h-[30px] text-xs">
           <div
             dangerouslySetInnerHTML={{
               __html: propertyDescription || projectDescription,
             }}
           />
       </div>
       </>):( <Link  href={ generatePropertyURL(propertyDetail)} target={"_blank"}>
       <div
         className={`capitalize lg:flex max-lg:flex-col w-full font-semibold ${statusView ? 'text-[0.9 rem]' : 'text-[1.2rem] mt-2'
           } justify-between -mt-1 `}
       >
         <h1 className={`${statusView? "h-[25px] w-[230px]" :"h-[30px] w-[350px]"} capitalize  text-ellipsis overflow-hidden  line-clamp-1  text-[0.9 rem] max-md:text-md `}>
           {propertyTitle ? propertyLabel : projectTitle}
         </h1>
         <div className="flex justify-center w-[100px]">
           {propertyType && (
             <h1
               className={`max-md:pt-3 max-md:text-md max-lg:mt-2 lg:text-[1em]`}
               // style={{  font-family: 'Poppins' }}
             >
               {RUPEES_SYMBOL}
               {formatNumberWithUnit(salePrice ? salePrice : rentPrice)}
             </h1>
           )}
           {totalUnitCount && (
             <h1
               className={`max-md:pt-3 max-md:text-md max-lg:mt-2 lg:text-[1em]  `}
               style={{ fontFamily: 'Poppins' }}
             >
               {projectPriceMap(projectUnits)}
             </h1>
           )}
           <div>{windowWidth < 768 && <MobileViewProperty id={_id} />}</div>
         </div>
       </div>
       <div className="flex gap-[6%] mt-2 text-[0.8em] text-gray-500 justify-between">
         <MDLabel
           icon={locationIcon}
           text={addressLabel}
           inlineStyle={{
             position: 'relative',
           }}
         />
         {bedroomCount && (
           <MDLabel
             text={bedroomCount + ' ' + BHK}
             inlineStyle={{ fontWeight: 'bold' }}
           />
         )}
         {projectUnits && projectUnits[0]?.bedroomCount && (
           <MDLabel
             text={projectBedroomString(projectUnits) + ' ' + BHK}
             inlineStyle={{ fontWeight: 'bold' }}
           />
         )}
       </div>
       {(bedroomCount || bathroomCount || propertySize) && (
         <div className="flex items-center max-md:hidden text-[0.77em] justify-start gap-[0.6em] mt-2 text-gray-500">
           <MDLabel icon={bathtub} prefix={bathroomCount} text={BATHS} />

           <MDLabel icon={doubleBed} prefix={bedroomCount} text={BEDS} />

           <MDLabel
             icon={areaIcon}
             prefix={propertySize}
             text={SQUARE_FT_TEXT}
           />

           <MDLabel icon={furnitureIcon} text={furnishingStatus} />
         </div>
       )}
       <div className="mt-2 line-clamp-2 h-[30px] text-xs">
           <div
             dangerouslySetInnerHTML={{
               __html: propertyDescription || projectDescription,
             }}
           />
       </div>
     </Link>)
      ) : ( 
        <div className="cursor-default">
          <div
            className={`capitalize lg:flex max-lg:flex-col font-semibold ${statusView ? 'text-[0.9 rem]' : 'text-[1.2rem] mt-2'
              } justify-between -mt-1`}
          >
            <h1 className={`capitalize text-[0.9 rem] max-md:text-md mr-2`}>
              {propertyTitle ? propertyLabel : projectTitle}
            </h1>
            <div className="flex justify-between">
              {propertyType && (
                <h1
                  className={`max-md:pt-3 max-md:text-md max-lg:mt-2 lg:text-[1em]`}
                  style={{ fontFamily: 'Poppins' }}
                >
                  {RUPEES_SYMBOL}
                  {formatNumberWithUnit(salePrice ? salePrice : rentPrice)}
                </h1>
              )}
              {totalUnitCount && (
                <h1
                  className={`max-md:pt-3 max-md:text-md max-lg:mt-2 lg:text-[1em]`}
                  style={{ fontFamily: 'Poppins' }}
                >
                  {projectPriceMap(projectUnits)}
                </h1>
              )}
              <div>{windowWidth < 768 && <MobileViewProperty id={_id} />}</div>
            </div>
          </div>
          <div className="flex gap-[4%] mt-4 mr-5 text-[0.8em] text-gray-500 justify-between">
            <MDLabel
              icon={locationIcon}
              text={addressLabel}
              inlineStyle={{
                position: 'relative',
              }}
            />
            {bedroomCount && (
              <MDLabel
                text={bedroomCount + ' ' + BHK}
                inlineStyle={{ fontWeight: 'bold', }}
              />
            )}
            {projectUnits && projectUnits[0]?.bedroomCount && (
              <MDLabel
                text={projectBedroomString(projectUnits) + ' ' + BHK}
                inlineStyle={{ fontWeight: 'bold' }}
              />
            )}
          </div>
          {(bedroomCount || bathroomCount || propertySize) && (
            <div className="flex items-center max-md:hidden text-[0.77em] justify-start gap-[0.6em] mt-4 text-gray-500">
              <MDLabel icon={bathtub} prefix={bathroomCount} text={BATHS} />

              <MDLabel icon={doubleBed} prefix={bedroomCount} text={BEDS} />

              <MDLabel
                icon={areaIcon}
                prefix={propertySize}
                text={SQUARE_FT_TEXT}
              />

              <MDLabel icon={furnitureIcon} text={furnishingStatus} />
            </div>
          )}
          <div className="mt-4 line-clamp-2 h-[32px] text-xs">
              <div
                dangerouslySetInnerHTML={{
                  __html: propertyDescription || projectDescription,
                }}
              />
          </div>
        </div>
      )}
      {propertyTitle ? (
        <div className="flex max-md:flex-col max-md:gap-4 justify-between mt-[4%] cursor-default ">
          <div className="flex items-center gap-2">
         <div className='relative rounded-full h-11 w-11 mr-3 '>
        <Image alt='Property Owner Image' src={postedBy?.profileImage||User_cicrle_light} fill className='mr-2 rounded-full  object-fill' />
        </div>
            <div>
              <div>
                <h2 className='font-semibold'>{postedBy?.firstName ? postedBy?.firstName : ''} {postedBy?.lastName ? postedBy?.lastName : ''}</h2>
                        </div>
              <h2 className="text-xs font-extralight">{OWNER}</h2>
            </div>
          </div>
          <div onClick={!edit ? handleContact : undefined} className="flex  justify-center bg-featuredBackground text-sm p-1 px-6 text-white max-md:p-2 max-md:my-2 max-md:px-9 rounded-md">
            <button >
              <div className="font-semibold  tracking-wider">{CONTACT}</div>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-9 flex justify-between">
            <MDLabel
              icon={buildingIcon}
              prefix={PROJECT_SIZE}
              text={
                DASH +
                projectArea +
                ' ' +
                PROPERTY_SIZE_UNIT_MAP[projectAreaUnit]
              }
              inlineStyle={{
                bgColor: '#9316020f',
                containerClass:
                  'w-fit h-fit px-3 py-1 text-[14px] rounded-[4px] text-[#931602]',
                textClass: 'pt-1',
              }}
            />
            <div>
              <MDLabel
                prefix={totalUnitCount}
                text="Units"
                inlineStyle={{
                  bgColor: '#9316020f',
                  containerClass:
                    'w-fit px-7 py-2 text-[14px] m-auto rounded-[4px] text-[#931602] font-bold',
                }}
              />
              <MDLabel
                text={projectAreaMap(projectUnits)}
                inlineStyle={{
                  containerClass:
                    'w-fit px-3 py-2 text-[13px] text-[#931602] font-bold',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default RightSection