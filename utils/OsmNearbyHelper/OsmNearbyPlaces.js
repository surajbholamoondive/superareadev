import { MAP_AMENITIES } from "@/text";
import { getLogger } from "@/helper/logger";
import {getAmenitiesQuery,getRailwayQuery,getMetroStationQuery,getParkQuery,getHighwayQuery} from './OverpassQueries'
import overpassRequest from "./OverpassQueryRequest";

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; 
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c
    return distance
}

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}

  const getNearbyPlaces = async (lat,lon) => {  
    const logger=getLogger()
    const nearbyAmenities = {};
    const overpassQuery = getAmenitiesQuery(lat, lon);
  
    try {
      const response = await overpassRequest(overpassQuery)
      const data = await response.json();
        MAP_AMENITIES.forEach((amenity) => {
        nearbyAmenities[amenity] = data.elements.filter((element) =>
          element.tags && element.tags.amenity === amenity
        )
        nearbyAmenities[amenity].forEach((element) => {
          const distance = getDistance(lat, lon, element.lat ? element.lat : element.center.lat, element.lon ? element.lon : element.center.lon);
          element.distance = distance.toFixed(2)
      })
      })
  
      const overpassRailwayQuery = getRailwayQuery(lat, lon)
      const railwayResponse = await overpassRequest(overpassRailwayQuery)
      const railwayData = await railwayResponse.json();
      nearbyAmenities["railwayStations"] = railwayData.elements
      nearbyAmenities["railwayStations"].forEach((element) => {
        const distance = getDistance(lat, lon, element.center.lat, element.center.lon)
        element.distance = distance.toFixed(2)
    })
      const overpassMetroQuery = getMetroStationQuery(lat, lon);
      const metroResponse = await overpassRequest(overpassMetroQuery)
      const metroData = await metroResponse.json();
      nearbyAmenities["metroStations"] = metroData.elements
      nearbyAmenities["metroStations"].forEach((element) => {
        const distance = getDistance(lat, lon, element.center.lat, element.center.lon);
        element.distance = distance.toFixed(2)
    })
    const overpassHighwayQuery = getHighwayQuery(lat,lon);
    const highwayResponse =await overpassRequest(overpassHighwayQuery)
    const highwayData = await highwayResponse.json();
    nearbyAmenities["highways"] = highwayData.elements
    nearbyAmenities["highways"].forEach((element) => {
      const distance = getDistance(lat, lon, element.center.lat, element.center.lon);
      element.distance = distance.toFixed(2)
  })
    const overpassParkQuery = getParkQuery(lat, lon);
    const parkResponse = await overpassRequest(overpassParkQuery)
    const parkData = await parkResponse.json();
    nearbyAmenities["parks"] = parkData.elements
    nearbyAmenities["parks"].forEach((element) => {
      const distance = getDistance(lat, lon, element.center.lat, element.center.lon);
      element.distance = distance.toFixed(2)
  })
  
    } catch (error) {
      logger.error("Error fetching nearby amenities:", error)
    }
      return nearbyAmenities;
  }

export default getNearbyPlaces