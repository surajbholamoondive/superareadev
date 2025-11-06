import React from "react";
import GoogleMapReact from 'google-map-react';
import marker from '../../assets/GoogleMapMarker/marker.png'
import hosp from '../../assets/GoogleMapMarker/hospitalMarker.png'
import pol from '../../assets/GoogleMapMarker/policeStationMarker.png'
import reast from '../../assets/GoogleMapMarker/reasturantMarker.png'
import sch from '../../assets/GoogleMapMarker/School.png'
import metr from '../../assets/GoogleMapMarker/metro.png'
import pump from '../../assets/GoogleMapMarker/gas-station.png'
import at from '../../assets/GoogleMapMarker/atm.png'
import at from '../../assets/GoogleMapMarker/atm.png'
import Image from "next/image";
import { useState } from "react";
 

const Marker = ({imageUrl}) => (
  <div style={{ width: '20px', height: '20px' }}>
    <Image src={imageUrl} alt="Marker" width={60} height={60} />
  </div>
);

const CustomMarker=({imageUrl})=>(
  <div style={{ width: '20px', height: '20px' }}>
  <Image src={imageUrl} alt="Marker" width={26} height={26} />
</div>
)
 
export default function SimpleMap({localityLatitude,localityLongitude,hospitals,schools,policeStations,restaurants,metros,gasStations,atms}){

  
  const [visibleMarkers, setVisibleMarkers] = useState({
    hospitals: false,
    schools: false,
    policeStations: false,
    restaurants: false,
    metros: false,
    gasStations: false,
    atms: false,
  });
  console.log('hospitalshospitalshospitalshospitals',hospitals)
  // useEffect(() => {
  //   const img = new Image();
  //   img.src = marker;
  //   img.onload = () => {
  //     setImageLoaded(true);
  //   };
  // }, []);

  // if (!imageLoaded) {
  //   return <div>Loading...</div>; 
  // }

  
  const toggleMarkers = (markerType) => {
    // Toggle the visibility status of a specific marker type
    setVisibleMarkers((prevState) => ({
      ...prevState,
      [markerType]: !prevState[markerType],
    }));
  };
  // const numberLat=parseFloat(localityLatitude)
  // const numberLng=parseFloat(localityLongitude)
  // console.log('number lat',numberLat)

  // const myProps={
  //   center:{
  //     lat:numberLat,
  //     lng:numberLng,
  //   },
  //   zoom:15
  // }
//  console.log('hospitals from Lat long',hospitals?.[0]?.geometry?.location?.lat)
//  console.log('hospitals from Lat long',localityLatitude)
//  console.log('schools',schools?.[0])
//  console.log('policeStations',policeStations)
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div className="bg-white flex justify-evenly">
        <div className="bg-secondary rounded-lg px-2 flex cursor-pointer my-1">
          <Image onClick={() => toggleMarkers("hospitals")}  src={hosp} alt="hospital icon" width={20} height={20}/>
        <button className="text-sm font-semibold" onClick={() => toggleMarkers("hospitals")}>
        Hospitals
      </button>
        </div>
        <div className="bg-secondary rounded-lg px-2 flex cursor-pointer my-1 ">
        <Image onClick={() => toggleMarkers("schools")} src={sch} alt="school marker" width={20} height={20}/>
      <button className="text-sm font-semibold" onClick={() => toggleMarkers("schools")}>Schools</button>
      </div>
      <div className="bg-secondary rounded-lg px-2 flex cursor-pointer my-1">
      <Image onClick={() => toggleMarkers("policeStations")} src={pol} alt="police station marker" width={20} height={20}/>
      <button className="text-sm font-semibold" onClick={() => toggleMarkers("policeStations")}>
        Police Stations
      </button>
      </div>
      <div className="bg-secondary rounded-lg px-2 flex cursor-pointer my-1">
        <Image onClick={() => toggleMarkers("restaurants")}  src={reast} alt="reasturant marker" width={20} height={20}/>
      <button className="text-sm font-semibold" onClick={() => toggleMarkers("restaurants")}>
        Restaurants
      </button>
      </div>
      <div className="bg-secondary rounded-lg px-2 cursor-pointer flex my-1">
      <Image  onClick={() => toggleMarkers("metros")}  src={metr} alt="metro marker" width={20} height={20}/>
      <button className="text-sm font-semibold" onClick={() => toggleMarkers("metros")}>Metros</button>
      </div>
      <div  className="bg-secondary rounded-lg flex cursor-pointer my-1">
      <Image onClick={() => toggleMarkers("gasStations")} src={pump}  alt="petrol pump marker" width={20} height={20}/>
      <button className="text-sm font-semibold" onClick={() => toggleMarkers("gasStations")}>
         Gas Stations
      </button>
      </div>
      <div  className="bg-secondary rounded-lg flex cursor-pointer my-1">
      <Image onClick={() => toggleMarkers("atms")} src={at} alt="atm marker" width={20} height={20}/>
      <button className="text-sm font-semibold px-2" onClick={() => toggleMarkers("atms")}>
        ATMs
        </button>
      </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_apiGooglePlace }}
        defaultCenter={{
          lat:parseFloat(localityLatitude),
          lng:parseFloat(localityLongitude)
        }}
        defaultZoom={15} 
      >
        <Marker
          lat={localityLatitude}
          lng={localityLongitude}
          imageUrl={marker}
        />

        {visibleMarkers.hospitals && hospitals
          ? hospitals.map((hospital, index) => (
              <CustomMarker
                key={`hospital-${index}`}
                lat={hospital?.geometry?.location?.lat}
                lng={hospital?.geometry?.location?.lng}
                imageUrl={hosp}
              />
            ))
          : null}

        {visibleMarkers.schools && schools
          ? schools.map((school, index) => (
              <CustomMarker
                key={`school-${index}`}
                lat={school?.geometry?.location?.lat}
                lng={school?.geometry?.location?.lng}
                imageUrl={sch}
              />
            ))
          : null}

        {visibleMarkers.policeStations && policeStations
          ? policeStations.map((policeStation, index) => (
              <CustomMarker
                key={`policeStation-${index}`}
                lat={policeStation?.geometry?.location?.lat}
                lng={policeStation?.geometry?.location?.lng}
                imageUrl={pol}
              />
            ))
          : null}

        {visibleMarkers.restaurants && restaurants
          ? restaurants.map((restaurant, index) => (
              <CustomMarker
                key={`restaurant-${index}`}
                lat={restaurant?.geometry?.location?.lat}
                lng={restaurant?.geometry?.location?.lng}
                imageUrl={reast}
              />
            ))
          : null}

        {visibleMarkers.metros && metros
          ? metros.map((metro, index) => (
              <CustomMarker
                key={`metro-${index}`}
                lat={metro?.geometry?.location?.lat}
                lng={metro?.geometry?.location?.lng}
                imageUrl={metr}
              />
            ))
          : null}

        {visibleMarkers.gasStations && gasStations
          ? gasStations.map((gasStation, index) => (
              <CustomMarker
                key={`gasStation-${index}`}
                lat={gasStation?.geometry?.location?.lat}
                lng={gasStation?.geometry?.location?.lng}
                imageUrl={pump}
              />
            ))
          : null}

        {visibleMarkers.atms && atms
          ? atms.map((atm, index) => (
              <CustomMarker
                key={`atm-${index}`}
                lat={atm?.geometry?.location?.lat}
                lng={atm?.geometry?.location?.lng}
                imageUrl={at}
              />
            ))
          : null}

      </GoogleMapReact>
    </div>
  );
}