import React from "react";

export default function HighlightAmenities({ property }) {
  const definingLocation =
    property?.DefiningLocation &&
    Object.keys(property.DefiningLocation).find(
      (key) => property.DefiningLocation[key]
    );
  
  const SuitableFor =
    property?.suitableFor &&
    Object.keys(property.suitableFor).find((key) => property.suitableFor[key]);
  
  return (
    <div className="flex my-2  max-sm:flex-wrap   lg:text-[12px]  md:text-[10px] text-[10px] gap-3 md:gap-5">
      <button className="bg-[#9316020f]   text-primary text-center px-6 py-2 max-md:px-3 rounded-full ">
        {property?.propertyType}
      </button>
      <button className="bg-[#9316020f]  text-primary text-center px-2 py-2 max-md:px-3 rounded-full inline-block whitespace-no-wrap w-32 h-9 ">
        {property?.propertySubType}
      </button>
      <button className="bg-[#9316020f]  text-primary text-center px-5 py-2 max-md:px-5 rounded-full ">
        {property?.action &&
          property.action.charAt(0).toUpperCase() +
            property.action.slice(1).toLowerCase()}
      </button>
      {/* <button className="bg-[#01819138] text-[#018191] text-center px-10 py-2 max-md:px-3 rounded-full  ">
        {definingLocation}
      </button> */}

      {definingLocation ? (
        <button className="w-40 h-9 bg-[#9316020f] text-primary text-center px-1 py-1 max-md:px-3 inline-block whitespace-no-wrap rounded-full">
          {definingLocation}
        </button>
      ) : null}

      {SuitableFor ? (
        <button className="w-36 h-9 bg-[#9316020f] text-primary text-center px-1 py-1 max-md:px-3 inline-block whitespace-no-wrap rounded-full">
          {SuitableFor}
        </button>
      ) : null}
      {/* <button className="bg-[#01819138] text-[#018191] text-center px-8 py-2 max-md:px-2 rounded-full font-bold shadow-md">{possessionStatus }</button> */}
    </div>
  );
}
