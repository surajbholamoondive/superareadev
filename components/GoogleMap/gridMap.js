import React from "react";
import GoogleMapReact from 'google-map-react';

export default function Gridmap({localityLatitude,localityLongitude}){

return (
    <div style={{ height: '100%', width: '100%' }}>
 
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_apiGooglePlace }}
        defaultCenter={{
          lat:parseFloat(localityLatitude),
          lng:parseFloat(localityLongitude)
        }}
        defaultZoom={15} 
      >
       

      </GoogleMapReact>
    </div>
  );
}