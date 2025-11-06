import nearme from "../../../assets/SearchBoxIcon/nearmesearch.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { HOME_PAGE_TEXT } from "@/textV2";
const { allowNote, nearMe } = HOME_PAGE_TEXT.searchSection
const { searchResultRoute } = HOME_PAGE_TEXT.routes
const NearMeSearch = () => {

  const router = useRouter();

  const handleNearMeClick = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_apiGooglePlace}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const cityComponent = data.results[0]?.address_components.find(
        (component) => component.types.includes("locality")
      )?.long_name;
      const cityName = cityComponent || "CityName";

      const payload = {
        lat: latitude,
        long: longitude,
      };
      router.push({
        pathname: searchResultRoute,
        query: payload,
      });
    } catch (error) {
      alert(allowNote);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-1 max-md:ml-2 max-md:w-10 max-lg:w-20 max-lg:justify-between items-center" onClick={handleNearMeClick}>
        <Image src={nearme} width={15} alt="Nearby Properties Icon" />
        <button
          className={`max-md:hidden max-md:mt-2 text-primary`}
        >
          {nearMe}
        </button>
      </div>
      <div className="flex gap-1 md:hidden" onClick={handleNearMeClick}>
        {/* <Image src={nearme} width={14} alt="Nearest Properties Icon" /> */}
      </div>
    </>
  )
}


export default NearMeSearch;
