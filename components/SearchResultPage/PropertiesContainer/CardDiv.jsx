import React from 'react'
import DateDisplay from '@/utils/CreatedAtDateConversion/createdAtDateConversion'
import SearchResultCardComponent from '@/components/SearchResultCardComponent/SearchResultCardComponent'

const CardDiv = ({ property }) => {
  let imageArray = []
  property?.propertyImages?.forEach((element) => {
    imageArray.push(element.url)
  })
  property?.projectImages?.forEach((element) => {
    imageArray.push(element.url)
  })
  const url = property?.slug; 
  const { areaDetail } = property
  let propertySize, propertySizeUnit
  const filteredDetail = areaDetail?.filter((detail) => detail.display)
  if(property?.propertySize) {
    propertySize = property?.propertySize;
    propertySizeUnit = property?.propertySizeUnit
  }

  else if (filteredDetail?.length > 0) {
    ({ propertySize, propertySizeUnit } = filteredDetail[0])
  }
  const {
    _id,
    addressLabel = '',
    bedroomCount = '',
    bathroomCount = '',
    furnishingStatus = '',
    propertyTitle = '',
    projectTitle = '',
    salePrice = '',
    rentPrice = '',
    projectDescription = '',
    propertyDescription = '',
    propertyType = '',
    projectType = '',
    propertySubType = '',
    projectSubType = '',
    totalUnitCount = '',
    projectUnits = '',
    projectAreaUnit = '',
    createdAt = '',
    projectArea = '',
    city = '',
    locality = '',
    mScore = '',
    mVerifiedStatus = '',
  } = property || {}

  const postedBy = property?.postedBy?.userType || ''
  const firstName = property?.postedBy?.firstName || ''
  const lastName = property?.postedBy?.lastName || ''
  const profileImage = property?.postedBy?.profileImage || ''
  const daysAgo = DateDisplay(createdAt)
  return (
    <div className="flex item-center h-fit mb-3">
      <div className={` rounded-md h-fit shadow-md`} style={{ width: '100%' , padding: '0rem', borderRadius: '1rem' }}>
        {projectTitle && projectTitle != '' ? (
          <SearchResultCardComponent
            id={_id}
            share={true}
            isProject={true}
            addresslabel={addressLabel}
            imageArray={imageArray}
            projectSubType={projectSubType}
            projectType={projectType}
            projectTitle={projectTitle}
            propertyUrl={url}
            projectDescription={projectDescription}
            projectUnits={projectUnits}
            projectAreaUnit={projectAreaUnit}
            totalUnitCount={totalUnitCount}
            projectArea={projectArea}
            locality={locality}
            city={city}
            daysAgo={daysAgo}
            mVerifiedStatus={mVerifiedStatus}
          />
        ) : (
          <SearchResultCardComponent
            id={_id}
            share={true}
            isProject={false}
            addresslabel={addressLabel}
            bedroomCount={bedroomCount}
            bathroomCount={bathroomCount}
            furnishingStatus={furnishingStatus}
            propertyTitle={propertyTitle}
            salePrice={salePrice}
            rentPrice={rentPrice}
            propertySize={propertySize}
            projectDescription={projectDescription}
            propertyDescription={propertyDescription}
            propertyType={propertyType}
            projectType={projectType}
            propertySubType={propertySubType}
            projectSubType={projectSubType}
            postedBy={postedBy}
            firstName={firstName}
            lastName={lastName}
            mScoreValue={mScore}
            mScore={true}
            profileImage={profileImage}
            imageArray={imageArray}
            propertyUrl={url}
            daysAgo={daysAgo}
            mVerifiedStatus={mVerifiedStatus}
            propertySizeUnit={propertySizeUnit}
          />
        )}
      </div>
    </div>
  )
}

export default CardDiv
