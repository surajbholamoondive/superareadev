import Image from 'next/image'
import Link from 'next/link'
import {
  DASH,

  RUPEES_SYMBOL,
  VIEW_PROJECT_PATH,
  VIEW_PROPERTY_PATH,
} from '@/text'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'

import LikeUnlike from '@/components/LikeShare/LikeUnlike'
import { MDLabel } from '@/components/MDLabel/MDLabel'
import Badge from '@/components/SearchResultPage/Badge'
import locationIcon from '../../assets/AmenitiesIcons/locationNew.svg'
import shieldIcon from '../../assets/logo/verification-logo.svg'
import { formatNumberWithUnit, projectPriceMap } from '../utils'
import Styles from './index.module.css'

const LikedPropertyCard = ({ data }) => {
  const { propertyId, projectId } = data || {}
  const {
    _id,
    propertyCoverImage,
    projectCoverImage,
    propertyImages,
    projectImages,
    mVerifiedStatus,
    salePrice,
    slug,
    rentPrice,
    propertyStatus,
    propertyType,
    projectTitle,
    projectType,
    projectUnits,
    customProjectUrl,
    city,
    propertyTitle,
    propertySize,
    locality,
    projectSubType,
    propertySubType,
    propertyAreaUnit,
  } = propertyId || projectId || {}
  const generatePropertyURL = () => {
    let url = ''
    if (propertyTitle) {
      url = `${VIEW_PROPERTY_PATH}/${slug}`
    } else {
      url = `${VIEW_PROJECT_PATH}/${slug}`
    }
    return url
  }
  const displayTag = `${locality}, ${city}`
  const price = salePrice || rentPrice
  const { text } = GLOBALLY_COMMON_TEXT
  const { approvedText } = text
  return (
    <div className={Styles.singleList}>
      <Link href={generatePropertyURL(propertyId)} target="_blank">
        {propertyId && (
          <Badge
            propertyStatus={propertyStatus}
            width="28"
            style={{
              color: 'white',
              marginTop: '-23px',
              fontSize: '0.563rem',
              fontWeight: 'normal',
            }}
          />
        )}
 <div className={Styles.imageContainer}>
  <Image
    src={
      propertyCoverImage ||
      projectCoverImage ||
      propertyImages?.[0]?.url ||
      projectImages?.[0]?.url
    }
    alt="cover image"
    fill
    className={Styles.coverImage}
  />
</div>



      </Link>
      <div className="w-full pr-1">
        <div className="flex justify-between ml-2 w-[100%]">
          <div className="flex items-center">
            <MDLabel
              icon={
                (projectType && shieldIcon) ||
                (mVerifiedStatus === approvedText && shieldIcon)
              }
              text={propertyType || projectType}
              inlineStyle={{
                textColor: '#931602',
                fontWeight: 'bold',
                iconWidth: '15px -mr-4',
                containerClass: 'flex items-center',
              }}
            />
            <MDLabel
              text={
                DASH + `${propertySubType ? propertySubType : projectSubType}`
              }
            />
          </div>
          <div className="mr-[2px]">
            <LikeUnlike
              id={_id}
              isProject={projectType ? true : false}
              style="h-8 w-8"
            />
          </div>
        </div>
        <Link
          href={generatePropertyURL(propertyId || projectId)}
          target="_blank"
        >
          {/* <div className="w-[220px] h-[20px] flex gap-2 justify-between"> */}
            <div className={Styles.row}>

            <h4
              className={`capitalize my-0 truncate w-[60%] font-bold ml-2 -mt-[10px]`}
            >
              {propertyTitle || projectTitle}
            </h4>
            {propertyId && (
              <p className="w-[10%] truncate">
                {RUPEES_SYMBOL}
                {formatNumberWithUnit(price)}
              </p>
            )}
            {projectId && (
              <p className="w-fit truncate">{projectPriceMap(projectUnits)}</p>
            )}
          </div>
          <div className="flex gap-[3px] ml-2 mt-1 items-center">
            <Image
              src={locationIcon}
              width={12}
              height={8}
              className="w-[10px] h-[8px]"
            />
           <p className="text-[10px]">{displayTag}</p>

          </div>
        </Link>
      </div>
    </div>
  )
}

export default LikedPropertyCard
