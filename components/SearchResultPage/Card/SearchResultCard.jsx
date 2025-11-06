import LeftSectionCarousel from '../FilterSection/LeftSectionCarousel'
import RightSection from '../FilterSection/RightSection'

const SearchResultCard = ({ property, statusView, edit, mVerify }) => {
  const { propertyCoverImage, projectCoverImage } = property || {}
  let imageArray = [propertyCoverImage || projectCoverImage]
  property?.propertyImages?.forEach((element) => {
    imageArray.push(element.url)
  })
  property?.projectImages?.forEach((element) => {
    imageArray.push(element.url)
  })
  return (
    <div
      className={`bg-white max-w-[1300px] max-md:px-2 flex max-md:flex-col rounded-xl pt-2 px-100 pb-4 overflow-hidden max-md:px-4z ${
        statusView ? ' h-fit mb-5' : 'my-5 h-[10%]'
      } relative`}
    >
      <div>
        <LeftSectionCarousel
          photoURLs={imageArray}
          propertyCoverImage={propertyCoverImage}
          statusView={statusView}
        />
      </div>

      <div className={`w-full`}>
        <RightSection propertyDetail={property} statusView={statusView} mVerify={mVerify} edit={edit}/>
      </div>
    </div>
  )
}
export default SearchResultCard
