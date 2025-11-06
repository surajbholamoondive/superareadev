import FeaturedSection from "./FeaturedSection";
const FeaturedProperties = ({ featuredProperties, recommendProperties }) => {

  return (
    <div className="flex justify-center ">
      {featuredProperties?.length > 0 &&
        <FeaturedSection data={featuredProperties} />
      }
      {recommendProperties?.length > 0 &&
        <FeaturedSection recommendation={recommendProperties} />
      }
    </div>
  )
};
export default FeaturedProperties;
