import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
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
import ExtraAmenities from "./services/ExtraAmenities.js";
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

const amenityIcons = {
  Gymnasium: Gymnasium,
  school: school,
  Lift: Lift,
  FireFightingSystems: FireFightingSystems,
  wifi: wifi,
  Security: Security,
  CCTV: CCTV,
  KidsPool: pool,
  BadmintonCourt: BadmintonCourt,
  TennisCourt: TennisCourt,
  Football: Football,
  SquashCourt: SquashCourt,
  Cricket: Cricket,
  Volleyball: Volleyball,
  MeditationArea: MeditationArea,
  Basketball: Basketball,
  Jogging: Jogging,
  PowerBackup: PowerBackup,
  TableTennis: TableTennis,
  park: park,
  table: table,
  sofa: sofa,
  tv: tv,
  bathtub: bathtub,
  garden: garden,
  carParking: carParking,
  KidsPlayArea: KidsPlayArea,
  IntercomFacility: IntercomFacility,
  WaterSupply: WaterSupply,
  spaAndMassage: SpaAndMassage,
  SwimmingPool: SwimmingPool,
  SportCourt: SportCourt,
  Theatre: Theatre,
  Cafeteria: Cafeteria,
  WasteDisposal: WasteDisposal,
  PartyLawn: PartyLawn,
  ClubHouse: ClubHouse,
  BanquetHall: BanquetHall,
  RainWaterHarvesting: RainWaterHarvesting,
  VastuCompliant: VastuCompliant,
  SolarWaterHeating: SolarWaterHeating,
  CommonSocietyOffice: CommonSocietyOffice,
  MultipurposeHall: MultiPurposeHall,
  SkatingRing: SkatingRing,
  IndoorGames: IndoorGames,
  ShoppingCenter: ShoppingCenter,
  Amphitheatre: Amphitheatre,
  GolfCourse: GolfCourse,
  Library: Library,
  Lobby: Lobby,
  VideoDoorPhones: VideoDoorPhones,
  Temple: Temple,
  Gazeebo: Gazeebo,
};
export default function Amenities({ DATA, setDATA }) {
  const [selectedAmenities, setSelectedAmenities] = useState(
    DATA?.amenities || {}
  );

  const amenityIco = {
    Gymnasium: {
      image: Gymnasium,
      name: "Gymnasium",
    },
    school: {
      image: school,
      name: "School And Collages",
    },
    Lift: {
      image: Lift,
      name: "Lift",
    },
    FireFightingSystems: {
      image: FireFightingSystems,
      name: "Fire Fighting Equipments",
    },
    wifi: {
      image: wifi,
      name: "WiFi",
    },
    Security: {
      image: Security,
      name: "Security",
    },
    CCTV: {
      image: CCTV,
      name: "Video/CCTV Security",
    },

    KidsPool: {
      image: pool,
      name: "Kids Pool",
    },
    BadmintonCourt: {
      image: BadmintonCourt,
      name: "Badminton Court",
    },
    TennisCourt: {
      image: TennisCourt,
      name: "Tennis Court",
    },
    Football: {
      image: Football,
      name: "Foot Ball",
    },
    SquashCourt: {
      image: SquashCourt,
      name: "Squash Court",
    },
    Cricket: {
      image: Cricket,
      name: "Cricket Ground",
    },

    Volleyball: {
      image: Volleyball,
      name: "Volley Ball",
    },
    MeditationArea: {
      image: Volleyball,
      name: "Meditation Area",
    },

    Basketball: {
      image: Basketball,
      name: "Basket Ball",
    },
    Jogging: {
      image: Jogging,
      name: "Jogging Track",
    },
    PowerBackup: {
      image: PowerBackup,
      name: "Power Backup",
    },
    TableTennis: {
      image: TableTennis,
      name: "Table Tennis",
    },
    park: {
      image: park,
      name: "Park",
    },
    table: {
      image: table,
      name: "Table",
    },

    sofa: {
      image: sofa,
      name: "Sofa",
    },
    tv: {
      image: tv,
      name: "TV",
    },
    bathtub: {
      image: bathtub,
      name: "Bathtub",
    },
    garden: {
      image: bathtub,
      name: "Garden",
    },
    carParking: {
      image: bathtub,
      name: "Car Parking",
    },
    KidsPlayArea: {
      image: bathtub,
      name: "Kids Play Area",
    },
    IntercomFacility: {
      image: bathtub,
      name: "Intercom Facility",
    },
    WaterSupply: {
      image: bathtub,
      name: "24*7 Water Supply",
    },
    SwimmingPool: {
      image: SwimmingPool,
      name: "Swimming Pool",
    },
    spaAndMassage: {
      image: bathtub,
      name: "Spa And Massage",
    },
    SportCourt: {
      image: bathtub,
      name: "Sport Court",
    },
    Theatre: {
      image: bathtub,
      name: "Theatre",
    },
    Cafeteria: {
      image: bathtub,
      name: "Cafeteria",
    },
    WasteDisposal: {
      image: bathtub,
      name: "Waste Disposal",
    },
    PartyLawn: {
      image: bathtub,
      name: "Party Lawn",
    },
    ClubHouse: {
      image: bathtub,
      name: "Club House",
    },
    BanquetHall: {
      image: bathtub,
      name: "Banquet Hall",
    },
    RainWaterHarvesting: {
      image: bathtub,
      name: "Rain Water Harvesting",
    },
    VastuCompliant: {
      image: bathtub,
      name: "Vastu Compliant",
    },
    SolarWaterHeating: {
      image: bathtub,
      name: "Solar Water Heating",
    },
    CommonSocietyOffice: {
      image: bathtub,
      name: "Common Society Office",
    },
    MultipurposeHall: {
      image: bathtub,
      name: "Multipurpose Hall",
    },
    SkatingRing: {
      image: bathtub,
      name: "Skating Ring",
    },

    IndoorGames: {
      image: bathtub,
      name: "Indoor Games",
    },
    ShoppingCenter: {
      image: bathtub,
      name: "Shopping Center",
    },
    Amphitheatre: {
      image: bathtub,
      name: "Amphitheatre",
    },
    GolfCourse: {
      image: bathtub,
      name: "Golf Course",
    },
    Library: {
      image: bathtub,
      name: "Library",
    },
    Lobby: {
      image: bathtub,
      name: "Lobby",
    },
    VideoDoorPhones: {
      image: bathtub,
      name: "Video Door Phones",
    },
    Temple: {
      image: bathtub,
      name: "Temple",
    },
    Gazeebo: {
      image: bathtub,
      name: "Gazeebo",
    },
  };

  const toggleAmenity = (amenity) => {
    const updatedAmenities = {
      ...DATA?.amenities,
      ...selectedAmenities,
      [amenity]: !selectedAmenities[amenity],
    };
    setSelectedAmenities(updatedAmenities);
    setDATA({ ...DATA, amenities: updatedAmenities });
  };
  const [amenities, setAmenities] = useState([""]);

  return (
    <div className="bg-white mb-[40px]" >
      {DATA?.propertySubType === "COMMERCIAL_LAND" ||
        DATA?.propertySubType === "PLOT" ? (
        ""
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {Object.keys(amenityIcons).map(
            (amenity) =>
              <div
                key={amenity.name}
                className={`flex items-center space-x-2 cursor-pointer ${DATA?.amenities?.[amenity] || selectedAmenities[amenity]
                  ? "text-primary "
                  : "text-headingColor"
                  }`}
                onClick={() => toggleAmenity(amenity)}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-3xl  ${DATA?.amenities?.[amenity] || selectedAmenities[amenity]
                    ? "bg-viewCountBackground border-primary border-[0.8px]"
                    : "bg-white"
                    }`}
                >
                  <Image
                    src={amenityIcons[amenity]}
                    alt={amenity}
                    width={24}
                    height={25}
                    className={`${DATA?.amenities?.[amenity] || selectedAmenities[amenity]
                      ? "text-white w-[22px]"
                      : " text-white rounded-3xl w-10 h-10 p-[8px] border"
                      }`}
                  />
                </div>
                <span className="max-sm:w-[80px] font-normal">
                  {amenityIco[amenity]?.name}
                </span>
              </div>
          )}
          {DATA?.amenities && Object.keys(DATA?.amenities)?.map(
            (amenity) => {
              if (amenityIcons[amenity]) {
                return null;
              }
              return (
                <div
                  key={amenity.name}
                  className={` ${amenity === "" ? "hidden" : ""}`}
                >
                  <div
                    key={amenity.name}
                    className={`flex items-center space-x-2 cursor-pointer ${DATA?.amenities?.[amenity] || selectedAmenities[amenity]
                      ? "text-primary text-xs"
                      : "text-gray-800 text-xs"
                      }`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs ${DATA?.amenities?.[amenity] || selectedAmenities[amenity]
                        ? "bg-nearme text-xs border-black border-[0.8px]"
                        : "bg-white text-xs border-black border"
                        }`}
                    >
                      <Image
                        src={ExtraIcon}
                        alt={amenity}
                        width={24}
                        height={25}
                        className={`${DATA?.amenities?.[amenity] ||
                          selectedAmenities[amenity]
                          ? "text-white w-[22px] p-[2px]"
                          : "text-white w-[22px] p-[2px]"
                          }`}
                      />
                    </div>
                    <span className="max-sm:w-[80px] capitalize">{amenity}</span>
                  </div>
                </div>
              )
            }
          )}
          <div>
            {
              <ExtraAmenities
                amenities={amenities}
                setAmenities={setAmenities}
                selectedAmenities={selectedAmenities}
                setSelectedAmenities={setSelectedAmenities}
                toggleAmenity={toggleAmenity}
                DATA={DATA}
                setDATA={setDATA}
                amenityIcons={amenityIcons}
              />
            }
          </div>
        </div>
      )}

    </div >
  );
}

Amenities.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateAmenities: PropTypes.func.isRequired,
};
