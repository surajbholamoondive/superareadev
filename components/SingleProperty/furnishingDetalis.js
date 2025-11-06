import Image from "next/image";
import { furnishingIcons } from "@/content/PropertyIcon/FurnishingIcons";
import defaultIcon from "../../assets/AmenitiesIcons/default.svg";
import { DefaultIconMap } from "@/content/Amenities/defaultIcon";
import { GLOBALLY_COMMON_TEXT } from "@/textV2";
const { dash } = GLOBALLY_COMMON_TEXT.symbols;

export default function FurnishingDetails({furnishingDetails, furnishingStatus }) {
  const noCountKeys = ["Reception Area", "Oxygen Duct", "UPS"];

  return (
    <div className="grid sm:grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2">
      {Object.keys(furnishingDetails).map((key, index) => {
        if (furnishingDetails[key] === 0) {
          return null;
        }
        if (furnishingDetails[key]?.iconName) {
          return (
            <div key={index} className="flex gap-4 items-center ">
              <div className="w-[40px] h-[40px] relative border-[0.8px] rounded-md p-2 ">
                <Image
                  src={DefaultIconMap[furnishingDetails[key]?.iconName]}
                  alt="furnishing details icon, real estate icons"
                />
              </div>
              <p>
                  {
                    noCountKeys.includes(key)
                      ? `${key}`
                      : (furnishingStatus === "Furnished" && key === "Central Air Condition")
                      ? `${key}`
                      : (typeof furnishingDetails[key] === "object")
                      ? `${key} ${dash} ${furnishingDetails[key].count}`
                      : `${key} ${dash} ${furnishingDetails[key]}`
                  }
              </p>
            </div>
          );
        }
        return (
          <div
            key={index}
            className="flex gap-4 items-center  p-2 "
          >
            <div className="flex-shrink-0 flex items-center justify-center border-[0.8px] rounded-md p-2 w-[40px] h-[40px]">
              <Image
                src={furnishingIcons[key] ? furnishingIcons[key] : defaultIcon}
                alt="furnishing details icon, real estate icons"
                className="max-w-full max-h-full"
              />
            </div>
            <p className="">
              {
                noCountKeys.includes(key) ||
                (furnishingStatus === "Furnished" && key === "Central Air Condition")
                  ? key
                  : `${key} ${dash} ${
                      typeof furnishingDetails[key] === "object"
                        ? furnishingDetails[key].count
                        : furnishingDetails[key]
                    }`
              }
            </p>
          </div>

        );
      })}
    </div>
  );
}