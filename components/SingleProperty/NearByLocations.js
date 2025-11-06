import React, { useState } from "react";
import Styles from "./style.module.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import bathtub from "../../assets/AmenitiesIcons/bathtub.svg";
import doubleBed from "../../assets/AmenitiesIcons/doubleBed.svg";
import school from "../../assets/AmenitiesIcons/school.svg";
import Gymnasium from "../../assets/AmenitiesIcons/Gymnasium.svg";
import Lift from "../../assets/AmenitiesIcons/Lift.png";
import CCTV from "../../assets/AmenitiesIcons/CCTV.svg";
import FireFightingSystems from "../../assets/AmenitiesIcons/FireFightingSystems.svg";
import Security from "../../assets/AmenitiesIcons/Security.png";
import wifi from "../../assets/AmenitiesIcons/wifi.png";
import BadmintonCourt from "../../assets/AmenitiesIcons/BadmintonCourt.png";
import TennisCourt from "../../assets/AmenitiesIcons/TennisCourt.png";
import SquashCourt from "../../assets/AmenitiesIcons/SquashCourt.png";
import Football from "../../assets/AmenitiesIcons/Football.png";
import tv from "../../assets/AmenitiesIcons/tv.svg";
import Cricket from "../../assets/AmenitiesIcons/Cricket.png";
import Basketball from "../../assets/AmenitiesIcons/Basketball.png";
import Volleyball from "../../assets/AmenitiesIcons/Volleyball.png";
import Yoga from "../../assets/AmenitiesIcons/Yoga.png";
import PowerBackup from "../../assets/AmenitiesIcons/PowerBackup.png";
import table from "../../assets/AmenitiesIcons/table.png";
import sofa from "../../assets/AmenitiesIcons/sofa.png";
import Jogging from "../../assets/AmenitiesIcons/Jogging.png";
import WaterPurifier from "../../assets/AmenitiesIcons/Water.svg";
import Fan from "../../assets/AmenitiesIcons/Fan.svg";
import Fridge from "../../assets/AmenitiesIcons/Fridge.svg";
import ExhaustFan from "../../assets/AmenitiesIcons/ExhaustFan.svg";
import DinningTable from "../../assets/AmenitiesIcons/table.png";
import Geyser from "../../assets/AmenitiesIcons/Geyser.svg";
import Stove from "../../assets/AmenitiesIcons/Stove.svg";
import Light from "../../assets/AmenitiesIcons/Light.svg";
import Curtains from "../../assets/AmenitiesIcons/Curtain.svg";
import ModularKitchen from "../../assets/AmenitiesIcons/Kitchen.svg";
import Chimney from "../../assets/AmenitiesIcons/Chimney.svg";
import AC from "../../assets/AmenitiesIcons/AC.svg";
import Wardrobe from "../../assets/AmenitiesIcons/Wardrobe.svg";
import WashingMachine from "../../assets/AmenitiesIcons/Washingmachine.svg";
import MicroWave from "../../assets/AmenitiesIcons/Microwave.svg";
import Projector from "../../assets/AmenitiesIcons/projector.svg";
import Smartboard from "../../assets/AmenitiesIcons/smartboard.svg";
import Coffemaker from "../../assets/AmenitiesIcons/coffemaker.svg";
import Medicalkits from "../../assets/AmenitiesIcons/medicalkits.svg";
import Conferencerooms from "../../assets/AmenitiesIcons/conferencerooms.svg";
import Chairs from "../../assets/AmenitiesIcons/chairs.svg";

const arr = {
  tv: "TV",
  Lift: "Lift",
  wifi: "WIFI",
  AC: "AC",
  CCTV: "CCTV",
  Chairs: "Chair",
  Chimney: "Chimney",
  Coffemaker: "Coffee Maker",
  Conferencerooms: "Conference room",
  Curtains: "Curtains",
  ExhaustFan: "Exhaust Fan",
  Fan: "Fan",
  Fridge: "Fridge",
  Light: "Light",
  Medicalkits: "Medicalkits",
  MicroWave: "Microwave",
  ModularKitchen: "Modular Kitchens",
  Projector: "Projector",
  Smartboard: "Smart Boards",
  Stove: "Stove",
  Wardrobe: "Wardrobe",
  WaterPurifier: "Water Purifier",
  sofa: "Sofa",
  table: "Table",
};

const amenityIcons = {
  Gymnasium: Gymnasium,
  school: school,
  WaterPurifier: WaterPurifier,
  Lift: Lift,
  FireFightingSystems: FireFightingSystems,
  wifi: wifi,
  Security: Security,
  CCTV: CCTV,
  tv: tv,
  KidsPool: school,
  BadmintonCourt: BadmintonCourt,
  TennisCourt: TennisCourt,
  Football: Football,
  SquashCourt: SquashCourt,
  Basketball: Basketball,
  Cricket: Cricket,
  Volleyball: Volleyball,
  Yoga: Yoga,
  bathtub: bathtub,
  doubleBed: doubleBed,
  TableTennis: BadmintonCourt,
  park: school,
  PowerBackup: PowerBackup,
  bed: doubleBed,
  table: table,
  sofa: sofa,
  Jogging: Jogging,
  Fan: Fan,
  ExhaustFan: ExhaustFan,
  Fridge: Fridge,
  DinningTable: DinningTable,
  Geyser: Geyser,
  Stove: Stove,
  Light: Light,
  Curtains: Curtains,
  ModularKitchen: ModularKitchen,
  Chimney: Chimney,
  AC: AC,
  Wardrobe: Wardrobe,
  WashingMachine: WashingMachine,
  MicroWave: MicroWave,
  Chairs: Chairs,
  Smartboard: Smartboard,
  Conferencerooms: Conferencerooms,
  Medicalkits: Medicalkits,
  Projector: Projector,
  Coffemaker: Coffemaker,
};

export default function NearByLocations({ property }) {
  const Information = property?.DefiningLocation;
  const [Up, setUp] = useState(true);

  return (
    <div className={`shadow-lg rounded-b-lg ${Styles.outerDiv}`}>
      <div className="bg-[#aae3eb] flex justify-between rounded-t-lg lg:p-2 md:p-3 p-2">
        <div>
          <h1 className="text-white text-[14px] font-semibold">
            Defining Location
          </h1>
        </div>

        <div
          className={`bg-white me-1 rounded-full w-[30px] h-[30px]  ${Up ? "pb-[3px] pt-[2px] pl-[2.5px]" : "pl-[2.5px] pt-[3px] ma"
            } `}
          onClick={() => setUp(!Up)}
        >
          <h1 className="text-black text-lg font-semibold">
            {Up ? <FaAngleUp size={25} /> : <FaAngleDown size={25} />}
          </h1>
        </div>
      </div>
      {Up && (
        <div className="flex justify-start flex-wrap  bg-white">
          {Information &&
            Object.keys(Information).map((key, index) => {
              const value = Information[key];
              return (
                <div
                  key={index}
                  className=" w-[180px]  flex gap-3 m-3 ml-8 justify-center bg-gray-300 rounded-xl  max-md:w-[150] max-sm:w-[150px]"
                >
                  {(
                    <>

                      {
                        //   amenityIcons[key] ?
                        //   <Image
                        //     src={amenityIcons[]}
                        //     alt={key}
                        //     width={35}
                        //     height={35}
                        //     className="bg-[#ccd6d7] text-white rounded-full w-[35px] h-[35px] p-[4px]  max-sm:w-[25px] max-sm:h-[25px]"
                        //   />
                        //   :
                        //   " "
                      }
                      <div className="m-1 text-xs font-bold  max-sm:text-[10px]">
                        {key}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
