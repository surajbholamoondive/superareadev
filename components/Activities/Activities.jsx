import DateDisplay from '@/utils/CreatedAtDateConversion/createdAtDateConversion'
import SearchResultCardComponent from '../SearchResultCardComponent/SearchResultCardComponent'

export default function Activities({ data, isRecommendation }) {

  const property = isRecommendation ? data?.listingId : data?.propertyId;
  const project = isRecommendation ? data?.listingId : data?.projectId;

  const url = property?.slug;
  const projectUrl = project?.slug;

  let propertyImageArray = []
  let projectImageArray = []

  if (property?.propertyImages?.length > 0) {
    property?.propertyImages?.forEach((element) => {
      propertyImageArray.push(element.url)
    })
  }

  if (project?.projectImages?.length > 0) {
    project?.projectImages?.forEach((element) => {
      projectImageArray.push(element.url)
    })
  }

  const {
    _id,
    addressLabel = '',
    bedroomCount = '',
    bathroomCount = '',
    furnishingStatus = '',
    propertyTitle = '',
    salePrice = '',
    rentPrice = '',
    propertyDescription = '',
    propertyType = '',
    propertySubType = '',
    createdAt = '',
    mScore = '',
    assignedTo,
    areaDetail,
    propertySize: myPropertySize,
    propertySizeUnit: myPropertySizeUnit,
  } = property || project || {};

  const postedBy = property?.postedBy?.userType || ''
  const firstName = property?.postedBy?.firstName || data?.postedBy?.firstName || ''
  const lastName = property?.postedBy?.lastName || data?.postedBy?.lastName || ''

  const daysAgo = DateDisplay(createdAt)

  const {
    city: City = '',
    locality: Locality = '',
    projectDescription = '',
    projectTitle = '',
    projectType = '',
    projectSubType = '',
    totalUnitCount = '',
    projectUnits = '',
    projectAreaUnit = '',
    projectArea = '',
    createdAt: CreatedAt = '',
  } = project || {}

  const ProjectDaysAgo = DateDisplay(CreatedAt)

  const filteredDetail = areaDetail?.filter((detail) => detail.display)

  let propertySize, propertySizeUnit

  if (myPropertySize) {
    propertySize = myPropertySize
    propertySizeUnit = myPropertySizeUnit
  }
  else if (filteredDetail?.length > 0) {
    ({ propertySize, propertySizeUnit } = filteredDetail[0])
  }

  return (
    <div className="rounded-lg shadow-md  mb-5 mr-3">
      {projectTitle && projectTitle !== '' ? (
        <SearchResultCardComponent
          id={_id}
          share={true}
          isProject={true}
          imageArray={projectImageArray}
          projectSubType={projectSubType}
          projectType={projectType}
          projectTitle={projectTitle}
          propertyUrl={projectUrl}
          projectDescription={projectDescription}
          projectUnits={projectUnits}
          projectAreaUnit={projectAreaUnit}
          totalUnitCount={totalUnitCount}
          projectArea={projectArea}
          locality={Locality}
          city={City}
          daysAgo={ProjectDaysAgo}
          assignedTo={assignedTo}
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
          propertyDescription={propertyDescription}
          propertyType={propertyType}
          propertySubType={propertySubType}
          postedBy={postedBy}
          firstName={firstName}
          lastName={lastName}
          mScoreValue={mScore}
          mScore={true}
          imageArray={propertyImageArray}
          propertyUrl={url}
          daysAgo={daysAgo}
          propertySizeUnit={propertySizeUnit}
          assignedTo={assignedTo}
        />
      )}
    </div>
  )
}
