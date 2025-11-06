import atmIcon from '../../assets/MapToggleIcon/atm.svg'
import banks from '../../assets/MapToggleIcon/bank.svg'
import Metro from '../../assets/MapToggleIcon/metro.svg'
import PetrolPump from '../../assets/MapToggleIcon/petrolpump.svg'
import pharmacyIcon from '../../assets/MapToggleIcon/pharmacy.svg'
import PoliceStation from '../../assets/MapToggleIcon/policestation.svg'
import railway from '../../assets/MapToggleIcon/railway.svg'
import restaurant from '../../assets/MapToggleIcon/restaurant.svg'
import schools from '../../assets/MapToggleIcon/school.svg'
import shoppingMallIcon from '../../assets/MapToggleIcon/shoppingmalls.svg'
import shop from '../../assets/MapToggleIcon/shop.svg'
import hospitalIcon from '../../assets/MapToggleIcon/hospital.svg'
import highwayIcon from '../../assets/MapToggleIcon/highway.svg'
import busStationIcon from '../../assets/MapToggleIcon/busStation.svg'
import parkIcon from '../../assets/MapToggleIcon/park.svg'
import exactLocation from '../../assets/MapToggleIcon/exactLocationNew.svg'
import L from 'leaflet';

const icon = L.icon({
    iconUrl: exactLocation.src,
    iconSize: [25, 25],
  });
  const hospital = L.icon({
    iconUrl: hospitalIcon.src,
    iconSize: [30, 30],
  })
  const metroStations = L.icon({
    iconUrl: Metro.src,
    iconSize: [30, 30],
  })
  const shopping = L.icon({
    iconUrl: shop.src,
    iconSize: [30, 30],
  })
  const bank = L.icon({
    iconUrl: banks.src,
    iconSize: [30, 30],
  })
  const school = L.icon({
    iconUrl: schools.src,
    iconSize: [30, 30],
  })
  const resturant = L.icon({
    iconUrl: restaurant.src,
    iconSize: [30, 30],
  })
  const police = L.icon({
    iconUrl: PoliceStation.src,
    iconSize: [30, 30],
  })
  const atm = L.icon({
    iconUrl: atmIcon.src,
    iconSize: [30, 30],
  })
  const marketplace = L.icon({
    iconUrl: shoppingMallIcon.src,
    iconSize: [30, 30],
  })
  const railwayStations = L.icon({
    iconUrl: railway.src,
    iconSize: [30, 30],
  })
  const pharmacy = L.icon({
    iconUrl: pharmacyIcon.src,
    iconSize: [30, 30],
  })
  const fuel = L.icon({
    iconUrl: PetrolPump.src,
    iconSize: [30, 30],
  })
  const busStation = L.icon({
    iconUrl: busStationIcon.src,
    iconSize: [30, 30],
  })
  const highway = L.icon({
    iconUrl: highwayIcon.src,
    iconSize: [30, 30],
  })
  const park = L.icon({
    iconUrl: parkIcon.src,
    iconSize: [30, 30],
  })
  
const getCategoryIcon = (category) => {
    switch (category) {
      case 'hospital':
        return hospital;
      case 'metroStations':
        return metroStations;
      case 'shopping':
        return shopping;
      case 'bank':
        return bank;
      case 'school':
        return school;
      case 'restaurant':
        return resturant;
      case 'police':
        return police;
      case 'atm':
        return atm;
      case 'marketplace':
        return marketplace;
      case 'railwayStations':
        return railwayStations;
      case 'pharmacy':
        return pharmacy;
      case 'fuel':
        return fuel;
        case 'bus_station':
          return busStation;
        case 'highways':
          return highway;
        case 'parks':
        return park;
      default:
        return icon;
    }
  };
  export default getCategoryIcon