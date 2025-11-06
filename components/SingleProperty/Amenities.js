import Image from 'next/image'
import bathtub from "@/assets/AmenitiesIcons/bathtub.svg";
import school from "@/assets/AmenitiesIcons/school.svg";
import Gymnasium from "@/assets/AmenitiesIcons/Gymnasium.svg";
import Lift from "@/assets/AmenitiesIcons/Lift.png";
import CCTV from "@/assets/AmenitiesIcons/cctv.svg";
import FireFightingSystems from "@/assets/AmenitiesIcons/FireFightingSystems.svg";
import Security from "@/assets/AmenitiesIcons/Security.svg";
import wifi from "@/assets/AmenitiesIcons/wifi.svg";
import pool from '@/assets/AmenitiesIcons/pool.svg'
import BadmintonCourt from "@/assets/AmenitiesIcons/BadmintonCourt.svg";
import TennisCourt from "@/assets/AmenitiesIcons/TennisCourt.svg";
import SquashCourt from "@/assets/AmenitiesIcons/SquashCourt.svg";
import Football from "@/assets/AmenitiesIcons/Football.svg";
import tv from "@/assets/AmenitiesIcons/tv.svg";
import Cricket from "@/assets/AmenitiesIcons/Cricket.svg";
import TableTennis from '@/assets/AmenitiesIcons/TableTennis.svg'
import Basketball from "@/assets/AmenitiesIcons/Basketball.svg";
import Volleyball from "@/assets/AmenitiesIcons/Volleyball.svg";
import park from "@/assets/AmenitiesIcons/Park.svg"
import PowerBackup from "@/assets/AmenitiesIcons/PowerBackup.svg";
import table from "@/assets/AmenitiesIcons/table.png";
import sofa from "@/assets/AmenitiesIcons/sofa.png";
import Jogging from "@/assets/AmenitiesIcons/Jogging.svg";
import ExtraIcon from "@/assets/AmenitiesIcons/building.png";
import carParking from '@/assets/AmenitiesIcons/carParking.svg'
import garden from '@/assets/AmenitiesIcons/garden.svg'
import KidsPlayArea from '@/assets/AmenitiesIcons/kidsPlayArea.svg'
import IntercomFacility from '@/assets/AmenitiesIcons/interComFacility.svg'
import SwimmingPool from '@/assets/AmenitiesIcons/pool.svg'
import MeditationArea from '@/assets/AmenitiesIcons/Yoga.svg'
import SportCourt from '@/assets/AmenitiesIcons/sportCourt.svg'
import Theatre from '@/assets/AmenitiesIcons/theatre.svg'
import Cafeteria from '@/assets/AmenitiesIcons/cafeteria.svg'
import WasteDisposal from '@/assets/AmenitiesIcons/wasteDisposal.svg'
import PartyLawn from '@/assets/AmenitiesIcons/partyLawn.svg'
import ClubHouse from '@/assets/AmenitiesIcons/clubHouse.svg'
import BanquetHall from '@/assets/AmenitiesIcons/clubHouse.svg'
import RainWaterHarvesting from '@/assets/AmenitiesIcons/rainWaterHarvesting.svg'
import VastuCompliant from '@/assets/AmenitiesIcons/vastuCompliant.png'
import SolarWaterHeating from '@/assets/AmenitiesIcons/solarWaterHeating.png'
import CommonSocietyOffice from '@/assets/AmenitiesIcons/commonSocietyOffice.png'
import MultiPurposeHall from '@/assets/AmenitiesIcons/multiPurposeHall.png'
import SkatingRing from '@/assets/AmenitiesIcons/skatingRing.png'
import IndoorGames from '@/assets/AmenitiesIcons/indoorGames.png'
import ShoppingCenter from '@/assets/AmenitiesIcons/shoppingCenter.png'
import Amphitheatre from '@/assets/AmenitiesIcons/amphitheatre.png'
import GolfCourse from '@/assets/AmenitiesIcons/golfCourse.png'
import Library from '@/assets/AmenitiesIcons/library.png'
import Lobby from '@/assets/AmenitiesIcons/lobby.png'
import VideoDoorPhones from '@/assets/AmenitiesIcons/videoDoorPhones.png'
import Temple from '@/assets/AmenitiesIcons/temple.png'
import Gazeebo from '@/assets/AmenitiesIcons/gazeebo.png'
import SpaAndMassage from '@/assets/AmenitiesIcons/spaAndMassage.svg'
import WaterSupply from '@/assets/AmenitiesIcons/water-supply.png'

const amenityNameMapping = {
  Gymnasium: 'Gymnasium',
  school: 'School',
  Lift: 'Lift',
  FireFightingSystems: 'Fire Fighting Systems',
  wifi: 'WiFi',
  Security: 'Security',
  CCTV: 'CCTV',
  KidsPool: 'Kids Pool',
  BadmintonCourt: 'Badminton Court',
  TennisCourt: 'Tennis Court',
  Football: 'Football Ground',
  SquashCourt: 'Squash Court',
  Cricket: 'Cricket',
  Volleyball: 'Volleyball',
  MeditationArea: 'Meditation Area',
  Basketball: 'Basketball Court',
  Jogging: 'Jogging',
  PowerBackup: 'Power Backup',
  TableTennis: 'Table Tennis',
  park: 'Park',
  table: 'Table',
  sofa: 'Sofa',
  tv: 'TV',
  bathtub: 'Bathtub',
  garden: 'Garden',
  carParking: 'Car Parking',
  KidsPlayArea: 'Kids Play Area',
  IntercomFacility: 'Intercom Facility',
  WaterSupply: 'Water Supply',
  SwimmingPool: 'Swimming Pool',
  spaAndMassage: 'Spa And Massage',
  SportCourt: 'Sport Court',
  Theatre: 'Theatre',
  Cafeteria: 'Cafeteria',
  WasteDisposal: 'Waste Disposal',
  PartyLawn: 'Party Lawn',
  ClubHouse: 'Club House',
  BanquetHall: 'Banquet Hall',
  RainWaterHarvesting: 'Rain Water Harvesting',
  VastuCompliant: 'Vastu Compliant',
  SolarWaterHeating: 'Solar Water Heating',
  CommonSocietyOffice: 'Common Society Office',
  MultipurposeHall: 'Multipurpose Hall',
  SkatingRing: 'Skating Ring',
  IndoorGames: 'Indoor Games',
  ShoppingCenter: 'Shopping Center',
  Amphitheatre: 'Amphitheatre',
  GolfCourse: 'Golf Course',
  Library: 'Library',
  Lobby: 'Lobby',
  VideoDoorPhones: 'Video Door Phones',
  Temple: 'Temple',
  Gazeebo: 'Gazeebo',

}

const amenityIcons = {
  Gymnasium: {
    image: Gymnasium,
  },
  School: {
    image: school,
  },
  Lift: {
    image: Lift,
  },
  'Fire Fighting Systems': {
    image: FireFightingSystems,
  },
  WiFi: {
    image: wifi,
  },
  Security: {
    image: Security,
  },
  CCTV: {
    image: CCTV,
  },
  'Kids Pool': {
    image: pool,
  },
  'Badminton Court': {
    image: BadmintonCourt,
  },
  'Tennis Court': {
    image: TennisCourt,
  },

  'Football Ground': {
    image: Football,
  },
  'Squash Court': {
    image: SquashCourt,
  },
  Cricket: {
    image: Cricket,
  },
  Volleyball: {
    image: Volleyball,
  },
  'Meditation Area': {
    image: MeditationArea,
  },
  'Basket Ball': {
    image: Basketball,
  },
  Jogging: {
    image: Jogging,
  },
  'Power Backup': {
    image: PowerBackup,
  },
  'Table Tennis': {
    image: TableTennis,
  },
  Park: {
    image: park,
  },
  Table: {
    image: table,
  },
  Sofa: {
    image: sofa,
  },
  TV: {
    image: tv,
  },
  Bathtub: {
    image: bathtub,
  },
  Garden: {
    image: garden,
  },

  'Car Parking': {
    image: carParking,
  },
  'Kids Play Area': {
    image: KidsPlayArea,
  },
  'Intercom Facility': {
    image: IntercomFacility,
  },
  'Water Supply': {
    image: WaterSupply,
  },
  'Swimming Pool': {
    image: SwimmingPool,
  },

  'Spa And Massage': {
    image: SpaAndMassage,
  },
  'Sport Court': {
    image: SportCourt,
  },
  Theatre: {
    image: Theatre,
  },
  Cafeteria: {
    image: Cafeteria,
  },
  'Waste Disposal': {
    image: WasteDisposal,
  },
  'Party Lawn': {
    image: PartyLawn,
  },
  'Club House': {
    image: ClubHouse,
  },
  'Banquet Hall': {
    image: BanquetHall,
  },
  'Rain Water Harvesting': {
    image: RainWaterHarvesting,
  },
  'Vastu Compliant': {
    image: VastuCompliant,
  },
  'Solar Water Heating': {
    image: SolarWaterHeating,
  },
  'Common Society Office': {
    image: CommonSocietyOffice,
  },
  'Multipurpose Hall': {
    image: MultiPurposeHall,
  },
  'Skating Ring': {
    image: SkatingRing,
  },
  'Indoor Games': {
    image: IndoorGames,
  },
  'Shopping Center': {
    image: ShoppingCenter,
  },
  'Amphitheatre': {
    image: Amphitheatre,
  },
  'Golf Course': {
    image: GolfCourse,
  },
  'Library': {
    image: Library,
  },
  'Lobby': {
    image: Lobby,
  },
  'Video Door Phones': {
    image: VideoDoorPhones,
  },
  'Temple': {
    image: Temple,
  },
  'Gazeebo': {
    image: Gazeebo,
  },

}

const Amenities = ({ amenities }) => {
  const selectedAmenities = Object.keys(amenities).filter(
    (amenity) =>
      amenities[amenity] === 'True' ||
      amenities[amenity] === 'true' ||
      amenities[amenity] === true
  )

  const amenityDetails = selectedAmenities.map((amenity, index) => {
    const normalizedAmenity = amenityNameMapping[amenity] || amenity
    return {
      name: normalizedAmenity,
      key: amenityIcons[normalizedAmenity] ? amenityIcons[normalizedAmenity].image : ExtraIcon,
      index: index,
    }
  })
  amenityDetails.sort((a, b) => a.name.localeCompare(b.name))
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 [@media(min-width:1024px)_and_(max-width:1024px)]:grid-cols-3 lg:grid-cols-4 gap-2">
      {amenityDetails.map((amenity) => (
        <div
          key={amenity.index}
          className="rounded-lg py-2"
        >
          <span className="flex items-center ">
            {typeof amenity.key === 'string' ? (
              <span>{amenity.key}</span>
            ) : (
              <>
                <div className="relative w-8 h-8 flex items-center justify-center bg-lightRedBg rounded-full mr-2">
  <Image
    src={amenity.key.src}
    alt={amenity.name}
    width={20}
    height={20}
    className="object-contain"
  />
</div>

                <p className='text-[9px] sm:text-[9px] md:text-[12px]'>{amenity.name}</p>
              </>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Amenities
