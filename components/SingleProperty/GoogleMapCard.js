import React from 'react';
import SimpleMap from '../GoogleMap/Using_Lat_Log';
const GoogleMapCard = ({ property, restaurants,policeStations,schools,hospitals,metros,gasStations,atms}) => {
  return (
    <div>
    <div className="w-full bg-gray-400 rounded-lg m-auto" style={{ padding: '10px' ,height:'400px'}}>
      <SimpleMap
        localityLatitude={property?.localityLatitude }
        localityLongitude={property?.localityLongitude }
        restaurants={restaurants}
        policeStations={policeStations}
        schools={schools}
        hospitals={hospitals}
        metros={metros}
        gasStations={gasStations}
        atms={atms}
      />
    </div>
    </div>
  );
}

export default GoogleMapCard;
