import L from 'leaflet'
import exactLocation from '../../assets/MapToggleIcon/exactLocationNew.svg'
import 'leaflet/dist/leaflet.css'
import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
const icon = L.icon({
  iconUrl: exactLocation.src,
  iconSize: [18, 24],
})

function ResetCenterView({ localityLat, localityLng }) {
  const map = useMap()

  useEffect(() => {
    if (localityLat && localityLng) {
      map.setView(L.latLng(localityLat, localityLng), map.getZoom(), {
        animate: true,
      })
    }
  }, [localityLat, localityLng])

  return null
}
const OsmMap = ({ lat, lng, height, width, name = '' }) => {
  const locationSelection = [lat, lng]
  const mapStyle = {
    height: height ? `${height}px` : '100%',
    width: width ? `${width}px` : '100%',
  }
  return (
    <div style={mapStyle}>
      <MapContainer
        center={[28.5355, 77.391]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=AK89DYLcA2yVQoqxRzD9"
        />
        {lat && <Marker position={locationSelection} icon={icon}></Marker>}
        <React.Fragment>
          <Marker
            position={[lat || 28.5355, lng || 77.391]}
            icon={icon}
          ></Marker>
        </React.Fragment>
        <ResetCenterView localityLat={lat} localityLng={lng} />
      </MapContainer>
    </div>
  )
}

export default OsmMap
