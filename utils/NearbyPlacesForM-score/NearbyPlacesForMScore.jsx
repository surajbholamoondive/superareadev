import { useState, useEffect } from "react";
// import GooglePlaceDropdown from "../register/registerAs/components/GooglePlaceDropdown";
import * as geolib from 'geolib';
import { useData } from "@/context/data";

const NearByPlacesForMScore = ({latitude,longitude}) => {
  const [places, setPlaces] = useState([]);
  const [placeExistence, setPlaceExistence] = useState({}); 
  const [score, setScore] = useState({});
  const [data,setData]=useData()
  const updateParentLocation = (city, longitude, latitude) => {
    setParentCity(city);
    setParentLongitude(longitude);
    setParentLatitude(latitude);
  };

  useEffect(() => {
    if (longitude && latitude) {
      const placeTypes = [
        "hospital",
        "subway_station",
        "shopping_mall",
        "bank",
        "school",
        "restaurant",
        "police",
        "atm",
        "store",
        "train_station",
        "park",
        "pharmacy",
        "gas_station"
      ];
      setPlaces([]);
      setPlaceExistence({}); 
      setData({})
      findPlacesNearLocation(placeTypes);
    }
  }, [longitude, latitude]);
  
  useEffect(() => {
  }, [placeExistence,data]);

  const findPlacesNearLocation = (placeTypes) => {
    const location = {
      lat: latitude,
      lng: longitude,
    };
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    placeTypes.forEach((placeType) => {
      let rad;
      if (placeType === "train_station") {
        rad = 5000;
      } else {
        rad = 1500;
      }
      const request = {
        location,
        radius: rad,
        types: [placeType],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.sort((a, b) => {
            let distanceA = geolib.getDistance(location, {
              latitude: a.geometry.location.lat(),
              longitude: a.geometry.location.lng(),
            });
            let distanceB = geolib.getDistance(location, {
              latitude: b.geometry.location.lat(),
              longitude: b.geometry.location.lng(),
            });
            return distanceA - distanceB;
          });

          const closestPlace = results[0];
          if (closestPlace) {
            let distance = geolib.getDistance(location, {
              latitude: closestPlace.geometry.location.lat(),
              longitude: closestPlace.geometry.location.lng(),
            });
            let units = "meters";
            if (distance > 1000) {
              distance = distance / 1000;
              units = "km";
            }

            const heading = getPlaceHeading(placeType);
            const placeWithDistance = {
              type: placeType,
              heading,
              name: closestPlace.name,
              address: closestPlace.vicinity,
              distance: distance + units,
            };
            setPlaces((prevPlaces) => [...prevPlaces, placeWithDistance]);


            setPlaceExistence((prevExistence) => ({
              ...prevExistence,
              [placeType]: true,
            }));
            setData((prevExistence)=>({
              ...prevExistence,
              [placeType]:true,
            }))
          }
          else {

            setPlaceExistence((prevExistence) => ({
              ...prevExistence,
              [placeType]: false,
            }));
            setData((prevExistence)=>({
              ...prevExistence,
              [placeType]:false
            }))
          }
        } else {
          setPlaceExistence((prevExistence) => ({
            ...prevExistence,
            [placeType]: false,
          }));
          setData((prevExistence)=>({
            ...prevExistence,
            [placeType]:false,
          }))
        }
      });
    });
  };


  const getPlaceHeading = (placeType) => {
    switch (placeType) {
      case "subway_station":
        return "Metro Stations";
      case "shopping_mall":
        return "Shopping Malls";
      case "police":
        return "Police Stations";
      case "bank":
        return "Banks";
      case "school":
        return "Schools";
      case "restaurant":
        return "Restaurants";
      case "hospital":
        return "Hospitals";
      case "atm":
        return "ATMs";
      case "supermarket":
        return "Markets";
      case "store":
        return "Stores";
      case "train_station":
        return "Railway Stations";
      default:
        return "";
    }
  };

  return (
    
    // <div>
    //   <GooglePlaceDropdown updateParentLocation={updateParentLocation} />
    //   <div>
    //     {places.map((place, index) => (
    //       <div key={index}>
    //         <h2 className="text-xl font-semibold">{place.heading} Near Location:</h2>
    //         <h1 className="text-base">
    //           Closest {place.heading} is{" "}
    //           <span className="font-bold">{place.name}</span> with a distance of{" "}
    //           <span className="font-bold">{place.distance}</span>
    //         </h1>
    //         <ul>
    //           <li>Name: {place?.name}</li>
    //           <li>Address: {place?.address}</li>
    //           <li>Distance: {place?.distance}</li>
    //         </ul>
    //       </div>
    //     ))}
    //     <div>
    //       {placeExistence && Object.keys(placeExistence).map((placeType, index) => (
    //         <div key={index}>
    //           <h2 className="text-xl font-semibold">{getPlaceHeading(placeType)} Exists:</h2>
    //           <h1 className="text-base">
    //             {placeExistence[placeType]
    //               ? `${getPlaceHeading(placeType)} exists.`
    //               : `${getPlaceHeading(placeType)} does not exist.`}
    //           </h1>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  "");
};

export default NearByPlacesForMScore;
