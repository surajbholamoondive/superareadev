import React, { useState } from "react";
import Image from "next/image";
import bathtub from "../../assets/AmenitiesIcons/bathtub.svg";
import doubleBed from "../../assets/AmenitiesIcons/doubleBed.svg";
import school from "../../assets/AmenitiesIcons/school.svg";
import Gymnasium from "../../assets/AmenitiesIcons/Gymnasium.svg";
import Lift from "../../assets/AmenitiesIcons/Lift.png";
import CCTV from "../../assets/AmenitiesIcons/cctv.svg";
import FireFightingSystems from "../../assets/AmenitiesIcons/FireFightingSystems.svg";
import Security from "../../assets/AmenitiesIcons/Security.svg";
import wifi from "../../assets/AmenitiesIcons/wifi.svg";
import pool from '@/assets/AmenitiesIcons/pool.svg'
import BadmintonCourt from "../../assets/AmenitiesIcons/BadmintonCourt.svg";
import TennisCourt from "../../assets/AmenitiesIcons/TennisCourt.svg";
import SquashCourt from "../../assets/AmenitiesIcons/SquashCourt.svg";
import Football from "../../assets/AmenitiesIcons/Football.svg";
import tv from "../../assets/AmenitiesIcons/tv.svg";
import Cricket from "../../assets/AmenitiesIcons/Cricket.svg";
import TableTennis from '@/assets/AmenitiesIcons/TableTennis.svg'
import Basketball from "../../assets/AmenitiesIcons/Basketball.svg";
import park from "@/assets/AmenitiesIcons/Park.svg"
import Volleyball from "../../assets/AmenitiesIcons/Volleyball.svg";
import Yoga from "../../assets/AmenitiesIcons/Yoga.svg";
import PowerBackup from "../../assets/AmenitiesIcons/PowerBackup.svg";
import table from "../../assets/AmenitiesIcons/dinningTable.svg";
import sofa from "../../assets/AmenitiesIcons/sofa.svg";
import Jogging from "../../assets/AmenitiesIcons/Jogging.svg";
import WaterPurifier from "../../assets/AmenitiesIcons/Water.svg";
import Fan from "../../assets/AmenitiesIcons/Fan.svg";
import Fridge from "../../assets/AmenitiesIcons/Fridge.svg";
import ExhaustFan from "../../assets/AmenitiesIcons/ExhaustFan.svg";
import DinningTable from "../../assets/AmenitiesIcons/dinningTable.svg";
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
import defaultIcon1 from '../../assets/AmenitiesIcons/default1.svg'
import defaultIcon2 from '../../assets/AmenitiesIcons/default2.svg'
import defaultIcon3 from '../../assets/AmenitiesIcons/default3.svg'
import ExtraAmenitiesModal from "./ExtraAmenitiesModal.js";
import { COMPONENTS, GLOBALLY_COMMON_TEXT, SINGLE_PROPERTY_VIEW_TEXT } from "@/textV2";
const { extraAmenitiesModalText } = COMPONENTS.POST_PROPERTY_COMPO
export default function AmenitiesModal({ setFurnished, furnished, onClose, DATA, setDATA, defaultIcon, setDefaultIcon }) {

  const defaultIconMap = {
    'Default icon 1': defaultIcon1,
    'Default icon 2': defaultIcon2,
    'Default icon 3': defaultIcon3,
  }
  const amenityIcons = {
    "Gymnasium": Gymnasium,
    "school": school,
    "Water Purifier": WaterPurifier,
    "Lift": Lift,
    "Fire Fighting Systems": FireFightingSystems,
    "wifi": wifi,
    "Security": Security,
    "CCTV": CCTV,
    "tv": tv,
    "Kids Pool": pool,
    "Badminton Court": BadmintonCourt,
    "Tennis Court": TennisCourt,
    "Football": Football,
    "Squash Court": SquashCourt,
    "Basketball": Basketball,
    "Cricket": Cricket,
    "Volleyball": Volleyball,
    "Yoga": Yoga,
    "bathtub": bathtub,
    "double Bed": doubleBed,
    "Table Tennis": TableTennis,
    "park": park,
    "Power Backup": PowerBackup,
    "bed": doubleBed,
    "table": table,
    "sofa": sofa,
    "Jogging": Jogging,
    "Fan": Fan,
    "Exhaust Fan": ExhaustFan,
    "Fridge": Fridge,
    "Dining Table": DinningTable,
    "Geyser": Geyser,
    "Stove": Stove,
    "Light": Light,
    "Curtains": Curtains,
    "Modular Kitchen": ModularKitchen,
    "Chimney": Chimney,
    "AC": AC,
    "Wardrobe": Wardrobe,
    "Washing Machine": WashingMachine,
    "Micro Wave": MicroWave,
    "Chairs": Chairs,
    "Smartboard": Smartboard,
    "Conference Rooms": Conferencerooms,
    "Medical Kits": Medicalkits,
    "Projector": Projector,
    "Coffemaker": Coffemaker,
  };

  const amenityIco = {
    "Modular Kitchen": {
      image: ModularKitchen,
      name: "Modular Kitchen",
    },
    "Wardrobe": {
      image: Wardrobe,
      name: "Wardrobe",
    },
    "Water Purifier": {
      image: WaterPurifier,
      name: "Water Purifier",
    },
    "AC": {
      image: AC,
      name: "AC",
    },
    "Geyser": {
      image: Geyser,
      name: "Geyser",
    },
    "Fridge": {
      image: Fridge,
      name: "Fridge",
    },
    "sofa": {
      image: sofa,
      name: "Sofa",
    },
    "Fan": {
      image: Fan,
      name: "Fan",
    },
    "Exhaust Fan": {
      image: ExhaustFan,
      name: "Exhaust Fan",
    },
    "Dining Table": {
      image: DinningTable,
      name: "Dining Table",
    },
    "Stove": {
      image: Stove,
      name: "Stove",
    },
    "Light": {
      image: Light,
      name: "Light",
    },
    "Curtains": {
      image: Curtains,
      name: "Curtains",
    },
    "Modular Kitchen": {
      image: ModularKitchen,
      name: "Modular Kitchen",
    },
    "Chimney": {
      image: Chimney,
      name: "Chimney",
    },
    "Micro Wave": {
      image: MicroWave,
      name: "Micro Wave",
    },
    "table": {
      image: table,
      name: "Table",
    },
    "wifi": {
      image: wifi,
      name: "WiFi",
    },
    "CCTV": {
      image: CCTV,
      name: "CCTV",
    },
    "tv": {
      image: tv,
      name: "TV",
    },
  };

  const officeAmenityIco = {
    "Modular Kitchen": {
      image: ModularKitchen,
      name: "Modular Kitchen",
    },
    "Wardrobe": {
      image: Wardrobe,
      name: "Wardrobe",
    },
    "Water Purifier": {
      image: WaterPurifier,
      name: "Water Purifier",
    },
    "AC": {
      image: AC,
      name: "AC",
    },
    "Fridge": {
      image: Fridge,
      name: "Fridge",
    },
    "sofa": {
      image: sofa,
      name: "Sofa",
    },
    "Fan": {
      image: Fan,
      name: "Fan",
    },
    "Stove": {
      image: Stove,
      name: "Stove",
    },
    "Light": {
      image: Light,
      name: "Light",
    },
    "Curtains": {
      image: Curtains,
      name: "Curtains",
    },
    "Chimney": {
      image: Chimney,
      name: "Chimney",
    },
    "Micro Wave": {
      image: MicroWave,
      name: "Micro Wave",
    },
    "table": {
      image: table,
      name: "Table",
    },
    "wifi": {
      image: wifi,
      name: "WiFi",
    },
    "CCTV": {
      image: CCTV,
      name: "CCTV",
    },
    "tv": {
      image: tv,
      name: "TV",
    },
    "Conference Rooms": {
      image: Conferencerooms,
      name: "Conference Rooms",
    },
    "Smartboard": {
      image: Smartboard,
      name: "Smartboard",
    },
    "Coffemaker": {
      image: Coffemaker,
      name: "Coffee Makers",
    },
    "Medical Kits": {
      image: Medicalkits,
      name: "Medical Kits",
    },
    "Chairs": {
      image: Chairs,
      name: "Chairs",
    },
    "Projector": {
      image: Projector,
      name: "Projectors",
    },
  };

  const addedEnableAmenities = {
    "Reception Area": {
      image: defaultIcon1,
      name: "Reception Area",
      enable: false
    },
    "Central Air Condition": {
      image: defaultIcon1,
      name: "Central Air Condition",
      enable: false
    },
    "Oxygen Duct": {
      image: defaultIcon1,
      name: "Oxygen Duct",
      enable: false
    },
    "UPS": {
      image: defaultIcon1,
      name: "UPS",
      enable: false
    },
  }
  const addedCountAmenities = {
    "Fire Extinguisher": {
      image: defaultIcon1,
      name: "Fire Extinguisher"
    },
    "Fire Sensor": {
      image: defaultIcon1,
      name: "Fire Sensor"
    },
    "Sprinklers": {
      image: defaultIcon1,
      name: "Sprinklers"
    },
    "Fire House": {
      image: defaultIcon1,
      name: "Fire House"
    },
  }

  const bareshellAmenities = {
    "Doors Constructed": {
      image: defaultIcon1,
      name: "Doors Constructed",
    },
    "Oxygen Duct": {
      image: defaultIcon1,
      name: "Oxygen Duct",
      enable: false
    },
    "UPS": {
      image: defaultIcon1,
      name: "UPS",
      enable: false
    },
    "Constructions Status": {
      image: defaultIcon1,
      name: "Constructions Status",
      dropOptions: ["No Walls", "Brick Walls", "Cemented Walls", "Plastered Walls"]
    },
    "Central Air Condition": {
      image: defaultIcon1,
      name: "Central Air Condition",
      dropOptions: ["Duct Only", "Available", "Not Available"]
    }
  }

  const [amenities, setAmenities] = useState([{ name: "", count: 0, }]);
  const [selectedAmenities, setSelectedAmenities] = useState(DATA?.furnishingDetails || []);
  const [isResetClicked, setIsResetClicked] = useState(false);



  const incrementAmenity = (amenity) => {
    setSelectedAmenities((prevAmenities) => {
      if (prevAmenities[amenity]?.count) {
        let newCount = prevAmenities[amenity]?.count + 1
        return (
          {
            ...prevAmenities,
            [amenity]: {
              ...prevAmenities[amenity],
              count: newCount
            }
          }
        )
      }
      else {
        return ({
          ...prevAmenities,
          [amenity]: (prevAmenities[amenity] || 0) + 1,
        }
        )
      }
    });
  };

  const decrementAmenity = (amenity) => {
    setSelectedAmenities((prevAmenities) => {
      const prevCount = prevAmenities[amenity] || 0;
      if (prevAmenities[amenity]?.count) {
        let prevCount = prevAmenities[amenity]?.count
        let newCount = Math.max(prevCount, 0) - 1
        if (newCount === 0) {
          delete (prevAmenities[amenity])
        }
        else {
          return {
            ...prevAmenities,
            [amenity]: { ...prevAmenities[amenity], count: newCount }
          }
        }
      }
      else {
        const newCount = Math.max(prevCount - 1, 0);
        const updatedAmenities = { ...prevAmenities };
        if (newCount === 0) {
          delete updatedAmenities[amenity];
        } else {
          updatedAmenities[amenity] = newCount;
        }
        return updatedAmenities;
      }
    });
  };

  const handleEnableAmenity = (amenity) => {
    setSelectedAmenities((prevAmenity) => {

      if (amenity in prevAmenity) {
        const updatedAmenities = { ...prevAmenity }
        delete updatedAmenities[amenity]
        return updatedAmenities
      } else {
        return ({ ...prevAmenity, [amenity]: 1 })
      }
    })
  }

  const handleSelectionOption = (amenity, option) => {
    setSelectedAmenities((prevAmenity) => {
      if ((amenity in prevAmenity) && option === "") {
        const updatedAmenities = { ...prevAmenity }
        delete updatedAmenities[amenity]
        return updatedAmenities
      }
      return ({ ...prevAmenity, [amenity]: option })
    })
  }

  const resetAllAmenities = () => {
    setSelectedAmenities({});
    setIsResetClicked(true);
    setTimeout(() => {
      setIsResetClicked(false);
    }, 100);
    setAmenities([{ name: "", count: 0 }]);
    setDATA({ ...DATA, updatedIcons: []})
    setAddAmenities(false);
  };

  const showData = () => {
    setDATA({
      ...DATA,
      furnishingDetails: selectedAmenities,
      furnishingStatus: Object.keys(selectedAmenities).length === 0 ? "" : DATA.furnishingStatus,
    });
    onClose();
    setFurnished("")
  };


  const [addAmenities, setAddAmenities] = useState(false);

  const openchildmodal = () => {
    setAddAmenities(true);
  };
  const incrementExtraAmenity = (index) => {
    setAmenities((prevAmenities) => {
      const updatedAmenities = [...prevAmenities];
      updatedAmenities[index] = {
        ...updatedAmenities[index],
        count: (updatedAmenities[index].count || 0) + 1,
      };
      return updatedAmenities;
    });
  };

  const decrementExtraAmenity = (index) => {
    setAmenities((prevAmenities) => {
      if (index >= 0 && index < prevAmenities.length) {
        const updatedAmenities = [...prevAmenities];
        if (updatedAmenities[index].count > 0) {
          updatedAmenities[index] = {
            ...updatedAmenities[index],
            count: updatedAmenities[index].count - 1,
          };
        }
        return updatedAmenities;
      } else {
        console.error('Invalid index:', index);
        return prevAmenities;
      }
    });
  };

  const currentAmenitiesArray = DATA?.propertySubType === "Office Space" && furnished === "Furnished" ?
    { ...officeAmenityIco, ...addedCountAmenities, ...addedEnableAmenities } :
    DATA?.propertySubType === "Office Space" && furnished === "Bareshell" ?
    { ...addedCountAmenities, ...bareshellAmenities, } : 
    officeAmenityIco


  return (
    <div className={`custom-scrollbar max-h-[500px] 2xl:max-h-[600px] overflow-y-auto `}>
      {DATA?.propertyType === "Residential" ? (
        <div>
          <div className="bg-slate-200 h-14 rounded-tl-2xl w-fill">
            <div className="pt-2 p-1">
              <h4 className="pl-3">{SINGLE_PROPERTY_VIEW_TEXT.text.furnishingDetailsText}</h4>
              <p className="pl-3 text-[#5F5F5F]">
                {extraAmenitiesModalText.chooseText}
              </p>
            </div>
          </div>
          <div className="grid max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4">
            {Object.keys(amenityIco).map((amenity, index) => (
              <div
                className={`m-3 flex items-center border rounded-md p-1 gap-2 cursor-pointer relative mb-1`}
                key={index}
              >
                <div className={`flex relative bg-[#ccd6d7] items-center justify-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] p-[8px] rounded-full`}>
                  <Image
                    src={amenityIcons[amenity]}
                    alt={amenity}
                  />
                </div>
                <div className="leading-4 py-2">
                  <span>
                    {amenityIco[amenity].name}
                  </span>
                </div>
                <div className="flex border rounded-sm w-3/3 absolute  w-12 -bottom-[12px] right-1 bg-white">
                  <button
                    className="w-1/3 bg-slate-300"
                    onClick={() => decrementAmenity(amenity)}
                  >
                    -
                  </button>
                  <span className="w-1/3 flex justify-center">
                    {selectedAmenities?.[amenity] || 0}
                  </span>
                  <button
                    className="w-[34.6%] bg-slate-300"
                    onClick={() => incrementAmenity(amenity)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            {selectedAmenities && Object.keys(selectedAmenities).map((amenity, index) => {
              if (amenityIco[amenity]) {
                return null;
              }
              return (
                <div
                  className={`mt-3 ml-[10px] flex items-center gap-2 border h-[49.5px] w-[132px] rounded-md p-1 cursor-pointer relative`}
                  key={index}
                >
                  <div className={`flex relative bg-[#ccd6d7] items-center justify-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] p-[7px] rounded-full`}>
                    <Image
                      src={defaultIconMap[selectedAmenities[amenity]?.iconName]}
                      alt={amenity}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="break-words max-w-[70px] line-clamp-2">
                    <span className=" h-[10px]">
                      {amenity}
                    </span>
                  </div>
                  <div className="flex border rounded-sm w-3/3 absolute  w-12 -bottom-[12px] right-1 bg-white">
                    <button
                      className="w-1/3 bg-slate-300"
                      onClick={() => decrementAmenity(amenity)}
                    >
                      -
                    </button>
                    <span className="w-1/3 flex justify-center">
                      {selectedAmenities[amenity]?.count || 0}
                    </span>
                    <button
                      className="w-1/3 bg-slate-300"
                      onClick={() => incrementAmenity(amenity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            })}

          </div>
          <div className="flex justify-between mb-5 mr-8">
            <div className="ps-5 pt-6 font-bold">
              <button onClick={openchildmodal} className="text-green-600 bold">
                {
                  <ExtraAmenitiesModal
                    amenities={amenities}
                    DATA={DATA}
                    setDATA={setDATA}
                    setAmenities={setAmenities}
                    setSelectedAmenities={setSelectedAmenities}
                    selectedAmenities={selectedAmenities}
                    setDefaultIcon={setDefaultIcon}
                    defaultIcon={defaultIcon}
                  />
                }
              </button>
            </div>
            <div className="flex">
              <div className={`mt-5 h-8 flex justify-center w-20 border mr-4 rounded-md ${isResetClicked && "bg-gray-300"}`}>
                <button
                  onClick={resetAllAmenities}
                >
                  {GLOBALLY_COMMON_TEXT.buttons.resetAllButton}
                </button>
              </div>
              <div
                onClick={showData}
                className="mt-5 h-8 flex justify-center bg-gray-300 rounded-md"
              >
                <button className="px-4">Save</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-slate-200 h-14 rounded-tl-2xl w-fill">
            <div className="pt-2 p-1">
              <h4 className="pl-3">Furnishing Details</h4>
              <p className="pl-3 text-[#5F5F5F]">
                Please Choose the Items From the List
              </p>
            </div>
          </div>
          <div className="grid max-md:grid-cols-2 max-lg:grid-cols-3 grid-cols-4 gap-1 p-2">
            {Object.keys(currentAmenitiesArray).map((amenity, index) => (

                <div
                  className={`my-3 mx-2 flex items-center border rounded-md p-1  gap-2 cursor-pointer relative mb-2 w-[140px] `}
                  key={index}
                >
                  <div className={`flex relative bg-[#ccd6d7] items-center justify-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] p-[7px] rounded-full`}>
                    <Image
                      src={currentAmenitiesArray[amenity].image}
                      alt={amenity}
                    />
                  </div>
                  <div>
                    <span className=" m-x-1">
                      {currentAmenitiesArray[amenity].name}
                    </span>
                  </div>

                  {currentAmenitiesArray[amenity].enable === false ?
                    <div className={`flex border rounded-[3px] w-3/3 absolute  w-9 -bottom-[16px] right-1  h-[20px] justify-between items-center ${(amenity in selectedAmenities) ? "bg-[#931602]" : "bg-slate-300"}`}
                      onClick={() => handleEnableAmenity(amenity)}>
                      <button
                        className={(amenity in selectedAmenities) ? "object-none text-transparent" : "w-[40%] bg-slate-300 border border-slate-400 rounded-l-sm h-[22px] text-slate-400"}

                      >
                        |||
                      </button>

                      <button
                        className={(amenity in selectedAmenities) ? "w-[40%] bg-slate-300 border border-slate-400 rounded-r-sm h-[22px] text-slate-400" : "object-none text-transparent "}

                      >
                        |||
                      </button>
                    </div> :
                    currentAmenitiesArray[amenity].dropOptions ?
                      <div className="flex border rounded-sm w-3/3 absolute  w-12 -bottom-[16px] right-1 bg-white">
                        <select className="absolute -bottom-2 right-1 border rounded-sm bg-white text-sm  p-1 w-[120px]"
                          value={selectedAmenities[amenity] || ""}
                          onChange={(e) => handleSelectionOption(amenity, e.target.value)}
                        >
                          <option value="" disabled>
                            select options
                          </option>
                          {
                            currentAmenitiesArray[amenity].dropOptions.map((option, idx) => (
                              <option value={option} key={idx}>
                                {option}
                              </option>
                            ))
                          }
                        </select>
                      </div> :
                      <div className="flex border rounded-sm w-3/3 absolute  w-12 -bottom-[16px] right-1 bg-white">
                        <button
                          className="w-1/3 bg-slate-300"
                          onClick={() => decrementAmenity(amenity)}
                        >
                          -
                        </button>
                        <span className="w-1/3 flex justify-center">
                          {selectedAmenities?.[amenity] || 0}
                        </span>
                        <button
                          className="w-[34.6%] bg-slate-300"
                          onClick={() => incrementAmenity(amenity)}
                        >
                          +
                        </button>
                      </div>}
                </div>
              ))
            }
            {selectedAmenities && Object.keys(selectedAmenities).map((amenity, index) => {
  if (amenityIco[amenity]) {
    return null;
  }
  if (currentAmenitiesArray[amenity]) {
    return null;
  }
  return (
    <div
      className={`mt-3 ml-[10px] flex items-center gap-2 border h-[49.5px] w-[132px] rounded-md p-1 cursor-pointer relative`}
      key={index}
    >
      <div className={`flex relative bg-[#ccd6d7] items-center justify-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] p-[7px] rounded-full`}>
        <Image
          src={defaultIconMap[selectedAmenities[amenity]?.iconName]}
          alt={amenity}
          width={20}
          height={20}
        />
      </div>
      <div className="break-words max-w-[70px] line-clamp-2">
        <span className=" h-[10px]">
          {amenity}
        </span>
      </div>
      <div className="flex border rounded-sm w-3/3 absolute  w-12 -bottom-[12px] right-1 bg-white">
        <button
          className="w-1/3 bg-slate-300"
          onClick={() => decrementAmenity(amenity)}
        >
          -
        </button>
        <span className="w-1/3 flex justify-center">
          {selectedAmenities[amenity]?.count || 0}
        </span>
        <button
          className="w-1/3 bg-slate-300"
          onClick={() => incrementAmenity(amenity)}
        >
          +
        </button>
      </div>
    </div>
  )
})}

          </div>

          <div className="flex justify-between mb-5 mr-8">
            <div className="ps-5 pt-6 font-bold">
              <button onClick={openchildmodal} >
                {
                  <ExtraAmenitiesModal
                    amenities={amenities}
                    DATA={DATA}
                    setDATA={setDATA}
                    setAmenities={setAmenities}
                    setSelectedAmenities={setSelectedAmenities}
                    selectedAmenities={selectedAmenities}
                    defaultIcon={defaultIcon}
                    setDefaultIcon={setDefaultIcon}
                  />
                }
              </button>
            </div>
            <div className="flex">
              <div
                className={`mt-5 h-8 flex justify-center w-20 border mr-4 rounded-md  ${isResetClicked ? "bg-gray-300" : ""}`}
                onClick={resetAllAmenities}
                style={{ cursor: "pointer" }}
              >
                <button>{GLOBALLY_COMMON_TEXT.buttons.resetAllButton}</button>
              </div>
              <div
                className="mt-5 h-8 flex justify-center w-20 bg-gray-300 rounded-md"
                onClick={showData}
                style={{ cursor: "pointer" }}
              >
                <button>{GLOBALLY_COMMON_TEXT.buttons.saveButton}</button>
              </div>
            </div>
          </div>
        </div>
      )}
      { }
    </div>
  );
}



