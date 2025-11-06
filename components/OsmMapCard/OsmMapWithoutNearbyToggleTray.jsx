import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import React from "react";
import getCategoryIcon from "@/utils/OsmNearbyHelper/CategoriesFunction";
import exactLocation from '../../assets/MapToggleIcon/exactLocationNew.svg'
import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";

const propertyIcon = L.icon({
  iconUrl: exactLocation.src,
  iconSize: [30, 30],
});

function ResetCenterView({ localityLat, localityLng, }) {
  const map = useMap();
  useEffect(() => {
    if (localityLat && localityLng) {
      map.setView(L.latLng(localityLat, localityLng), map.getZoom(), {
        animate: true,
      });
    }
  }, [localityLat, localityLng]);
  return null;
}
const OsmMapWithoutNearbyToggleTray = ({ localityLat, localityLng, nearby, property, height, width }) => {
  const locationSelection = [localityLat, localityLng];
  const mapStyle = {
    height: height ? `${height}px` : '100%',
    width: width ? `${width}px` : '100%'
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div style={mapStyle}>
      <MapContainer
        center={[28.5355, 77.391]}
        zoom={14}
        scrollWheelZoom={false}
       style={{ width: "100%", height: "100%", borderRadius: "10px", zIndex: 0 }}
        attributionControl={false}
        zoomControl={false} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=AK89DYLcA2yVQoqxRzD9"
        />
        <ZoomControl position="topright" />
        {localityLat && (
          <Marker position={locationSelection} icon={propertyIcon}>
            <Popup>{property}</Popup>
          </Marker>
        )}
        {nearby &&
          Object.keys(nearby).length > 0 &&
          Object.keys(nearby).map((category, index) => (
            <React.Fragment key={index}>
              {nearby[category].length > 0 &&
                nearby[category].map((location, locationIndex) => (
                  <Marker
                    key={`${category}-${locationIndex}`}
                    position={[
                      location?.center?.lat || 28.5355,
                      location?.center?.lon || 77.391,
                    ]}
                    icon={getCategoryIcon(category)} 
                  >
                    <Popup>
                      {capitalizeFirstLetter(category)} - {location?.tags?.name} <br />
                    </Popup>
                  </Marker>
                ))}
            </React.Fragment>
          ))}
        <ResetCenterView localityLat={localityLat} localityLng={localityLng} />
      </MapContainer>
    </div>
  );
};

export default OsmMapWithoutNearbyToggleTray;