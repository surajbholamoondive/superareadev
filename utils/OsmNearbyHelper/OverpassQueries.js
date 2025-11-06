import { MAP_AMENITIES } from "@/text";
const getAmenitiesQuery = (lat, lon) => {
    const queries = MAP_AMENITIES.map((amenity) => {
      return `nwr(around:10000, ${lat},${lon})["amenity"="${amenity}"];`;
    });
    return `[out:json][timeout:25];
    (${queries.join("\n")});
    out center;`;
  };
 
  const getRailwayQuery = (lat, lon) => {
    return `[out:json][timeout:25];
    nwr(around:10000,${lat},${lon})["building"="train_station"];
    out center;`;
  };
 
  const getMetroStationQuery = (lat, lon) => {
    return `[out:json][timeout:25];
    nwr(around:10000,${lat},${lon})["railway"="subway"];
    out center;`;
  };
 
  const getParkQuery=(lat,lon)=>{
    return `[out:json][timeout:25];
    nwr(around:10000,${lat},${lon})["leisure"="park"];
    out center;`;
  };
 
  const getHighwayQuery = (lat, lon) => {
    return `[out:json][timeout:25];
    nwr(around:10000,${lat},${lon})["highway"="primary"];
    out center;`;
}
 
export {getAmenitiesQuery,getRailwayQuery,getMetroStationQuery,getParkQuery,getHighwayQuery}