import { LAND_AMENITIES_NAMES, NO_TEXT, YES_TEXT } from '@/text';
import React from 'react'

const LandAmenities = ({ landAmenities }) => {

  return (
    <div className="flex flex-wrap flex-row">
      {Object.entries(LAND_AMENITIES_NAMES).map(
        ([key, displayName], index) =>
          landAmenities?.[key] && (
            <div
              key={index}
              className="w-full max-md:w-1/2 md:w-1/2 lg:w-1/3 p-2 rounded-lg mb-2 min-w-0"
            >
              <h4 className="capitalize">{displayName}</h4>
              <div className="capitalize">
                <p>{landAmenities[key] === YES_TEXT ? YES_TEXT : NO_TEXT}</p>
              </div>
            </div>
          )
      )}
    </div>
  )
}
export default LandAmenities;
