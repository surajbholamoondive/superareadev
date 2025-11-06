import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import getCategoryIcon from '@/utils/OsmNearbyHelper/CategoriesFunction'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import atmIcon from '../../assets/MapToggleIcon/atm.svg'
import banks from '../../assets/MapToggleIcon/bank-icon.svg'
import busStationIcon from '../../assets/MapToggleIcon/busstation-icon.svg'
import exactLocation from '../../assets/MapToggleIcon/exactLocationNew.svg'
import highwayIcon from '../../assets/MapToggleIcon/highway-icon.svg'
import hospitalIcon from '../../assets/MapToggleIcon/hospital-icon.svg'
import Metro from '../../assets/MapToggleIcon/metro-icon.svg'
import parkIcon from '../../assets/MapToggleIcon/park-icon.svg'
import PetrolPump from '../../assets/MapToggleIcon/petrolpump-icon.svg'
import pharmacyIcon from '../../assets/MapToggleIcon/pharmacy-icon.svg'
import PoliceStation from '../../assets/MapToggleIcon/policestation-icon.svg'
import railway from '../../assets/MapToggleIcon/railway.svg'
import restaurant from '../../assets/MapToggleIcon/restaurant-icon.svg'
import schools from '../../assets/MapToggleIcon/school-icon.svg'
import shop from '../../assets/MapToggleIcon/shop-icon.svg'
import shoppingMallIcon from '../../assets/MapToggleIcon/shoppingmall-icon.svg'
import {
  ATM,
  ATMS,
  BANK,
  BANKS,
  BUS_STATION,
  BUS_STATIONS,
  FUEL,
  FUEL_STATION,
  HIGHWAY,
  HIGHWAYS,
  HOSPITAL,
  HOSPITALS,
  MARKETPLACE,
  MARKETPLACES,
  METRO_STATION,
  METRO_STATIONS,
  PARK,
  PARKS,
  PHARMACIES,
  PHARMACY,
  POLICE,
  POLICE_STATION,
  RAILWAY_STATION,
  RAILWAY_STATIONS,
  RESTAURANT,
  RESTAURANTS,
  SCHOOL,
  SCHOOLS,
  SHOPPING,
  SHOPPING_MALL,
} from '../../text.js'
import styles from './OsmMap.module.css'

const propertyIcon = L.icon({
  iconUrl: exactLocation.src,
  iconSize: [30, 30],
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
const OsmMapWithNearby = ({
  localityLat,
  localityLng,
  nearby,
  property,
  height,
  width,
}) => {
  const locationSelection = [localityLat, localityLng]
  const [showCategories, setShowCategories] = useState({
    hospital: true,
    metroStations: true,
    shopping: false,
    bank: false,
    school: false,
    restaurant: false,
    police: false,
    atm: false,
    marketplace: false,
    railwayStations: true,
    pharmacy: false,
    fuel: false,
    bus_station: true,
    highways: false,
    parks: false,
  })
  const handleToggleCategory = (category) => {
    setShowCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const mapStyle = {
    height: height ? `${height}px` : '100vh',
    width: width ? `${width}px` : '100%',
  }

  return (
    <div style={mapStyle} className="relative">
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
        {localityLat && (
          <Marker position={locationSelection} icon={propertyIcon}>
            <Popup>{property}</Popup>
          </Marker>
        )}
        {nearby &&
          Object.keys(nearby).length > 0 &&
          Object.keys(nearby).map((category, index) => (
            <React.Fragment key={index}>
              {showCategories[category] &&
                nearby[category].length > 0 &&
                nearby[category].map((location, locationIndex) => (
                  <Marker
                    key={`${category}-${locationIndex}`}
                    position={[
                      location?.center?.lat || 28.5355,
                      location?.center?.lon || 77.391,
                    ]}
                    icon={getCategoryIcon(category)}
                  ></Marker>
                ))}
            </React.Fragment>
          ))}

        <ResetCenterView localityLat={localityLat} localityLng={localityLng} />
      </MapContainer>
      <div
        className={`flex flex-col   absolute top-5 right-10 max-sm:right-2 z-[950] bg-mapsOverlayBackground opacity-90 w-[195px] gap-2 h-fit rounded-lg items-center max-h-[225px] overflow-y-auto  shadow-md ${styles.modalScroll} pt-2 pl-[1px] `}
      >
        
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(HOSPITAL)
          }}
          className={`filter-item flex items-center ${
            showCategories.hospital && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%]  mt-1 gap-2`}
        >
          <Image
            src={hospitalIcon}
            height={29}
            width={29}
            alt="hospital icon"
          />
          {HOSPITALS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(METRO_STATION)
          }}
          className={`filter-item flex items-center ${
            showCategories.metroStations &&
            'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-[3px] mt-1 gap-3`}
        >
          <Image
            src={Metro}
            height={20}
            width={20}
            alt="metro icon"
            className="ml-1"
          />
          {METRO_STATIONS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(BUS_STATION)
          }}
          className={`filter-item flex items-center ${
            showCategories.bus_station &&
            'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] mt-1 p-[1px] gap-2`}
        >
          <Image
            src={busStationIcon}
            height={28}
            width={28}
            alt="bus station icon"
            className="ml-1"
          />
          {BUS_STATIONS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(RAILWAY_STATION)
          }}
          className={`filter-item flex items-center ${
            showCategories.railwayStations &&
            'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-[3px] mt-1 gap-2 `}
        >
          <Image
            src={railway}
            height={18}
            width={18}
            alt="railway icon"
            className="ml-2"
          />
          {RAILWAY_STATIONS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(PHARMACY)
          }}
          className={`filter-item flex items-center ${
            showCategories.pharmacy && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-[6px]`}
        >
          <Image
            src={pharmacyIcon}
            height={35}
            width={35}
            alt="pharmacies icon"
          />
          {PHARMACIES}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(SCHOOL)
          }}
          className={`filter-item flex items-center ${
            showCategories.school && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-[2px] gap-2`}
        >
          <Image
            src={schools}
            height={30}
            width={30}
            alt="school icon"
            className="ml-1"
          />
          {SCHOOLS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(BANK)
          }}
          className={`filter-item flex items-center ${
            showCategories.bank && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-[2px] gap-1`}
        >
          <Image
            src={banks}
            height={30}
            width={30}
            alt="Bank icon"
            className="ml-1"
          />
          {BANKS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(ATM)
          }}
          className={`filter-item flex items-center ${
            showCategories.atm && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-[12px] `}
        >
          <Image
            src={atmIcon}
            height={17}
            width={17}
            alt="atm icon"
            className="ml-2"
          />
          {ATMS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(SHOPPING)
          }}
          className={`filter-item flex items-center ${
            showCategories.shopping && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-1`}
        >
          <Image
            src={shoppingMallIcon}
            height={35}
            width={35}
            alt="shopping mall icon"
          />
          {SHOPPING_MALL}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(MARKETPLACE)
          }}
          className={`filter-item flex items-center ${
            showCategories.marketplace &&
            'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-2`}
        >
          <Image
            src={shop}
            height={28}
            width={28}
            alt="shop icon"
            className="ml-1"
          />
          {MARKETPLACES}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(PARKS)
          }}
          className={`filter-item flex items-center ${
            showCategories.parks && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-2`}
        >
          <Image
            src={parkIcon}
            height={30}
            width={30}
            alt="park icon"
            className="ml-1"
          />
          {PARK}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(RESTAURANT)
          }}
          className={`filter-item flex items-center ${
            showCategories.restaurant &&
            'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-2`}
        >
          <Image
            src={restaurant}
            height={30}
            width={30}
            alt="restaurant icon"
            className="ml-1"
          />
          {RESTAURANTS}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(POLICE)
          }}
          className={`filter-item flex items-center ${
            showCategories.police && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-2`}
        >
          <Image
            src={PoliceStation}
            height={28}
            width={28}
            className="ml-1"
            alt="police-station icon"
          />
          {POLICE_STATION}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(HIGHWAYS)
          }}
          className={`filter-item flex  ${
            showCategories.highways && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 mt-1 gap-2`}
        >
          <Image
            src={highwayIcon}
            height={35}
            width={35}
            alt="highway icon"
            className="ml-1"
          />
          {HIGHWAY}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleToggleCategory(FUEL)
          }}
          className={`filter-item flex items-center ${
            showCategories.fuel && 'bg-nearbySelectedBackground rounded-lg'
          } cursor-pointer w-[90%] p-1 pt-0  gap-2`}
        >
          <Image
            src={PetrolPump}
            height={30}
            width={30}
            alt="petrol pump icon"
            className="ml-1"
          />
          {FUEL_STATION}
        </div>
      </div>
    </div>
  )
}

export default OsmMapWithNearby
