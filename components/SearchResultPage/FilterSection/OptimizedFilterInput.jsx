import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TickIcon from '@/assets/DownArrow/tickIcon.svg';
import { GLOBALLY_COMMON_TEXT } from '@/textV2';
import CircleIcon from '@/assets/ColorChangeIcons/FilterIcons/CircleIcon';

const {
  residentialText,
  commercialText,
  industrialText,
  agriculturalText,
  propertyTypeText,
} = GLOBALLY_COMMON_TEXT.text;

const OptimizedFilterInput = ({
  name,
  head,
  categoryKey,
  filterState,
  onToggleFilter,
  onSetPropertyType,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (head === 'Posted Since') {
      setIsChecked(filterState.postedSince === name);
    } else if (categoryKey && filterState[categoryKey]) {
      setIsChecked(filterState[categoryKey].has(name));
    } else if (head === 'Property Type') {
      const typeMap = {
        [residentialText]: filterState.propertyTypes.residential,
        [commercialText]: filterState.propertyTypes.commercial,
        [industrialText]: filterState.propertyTypes.industrial,
        [agriculturalText]: filterState.propertyTypes.agricultural,
      };
      setIsChecked(typeMap[name] || false);
    } else {
      setIsChecked(filterState.propertySubTypes?.has(name) || false);
    }
  }, [filterState, categoryKey, name, head]);

  const handleFilterClick = (event) => {
    event.stopPropagation();
    if (head === 'Property Type') {
      onSetPropertyType(name);
    } else if (categoryKey) {
      onToggleFilter(categoryKey, name);
    } else {
      onToggleFilter('propertySubTypes', name);
    }
  };

  const shouldShowTick = () => {
    if (head === 'Property Type') {
      return (
        (name === residentialText && filterState.propertyTypes.residential) ||
        (name === commercialText && filterState.propertyTypes.commercial) ||
        (name === industrialText && filterState.propertyTypes.industrial) ||
        (name === agriculturalText && filterState.propertyTypes.agricultural)
      );
    }
    return isChecked && head !== propertyTypeText;
  };

  return (
    <div className="ml-3 w-full">
      {shouldShowTick() ? (
        <div
          className="flex m-3 cursor-pointer"
          onClick={handleFilterClick}
        >
          <label className="rounded-full h-4 flex items-center justify-center cursor-pointer">
            <span className="w-4 h-4 flex items-center justify-center">
              <Image src={TickIcon} height={15} width={15} alt="tick icon" />
            </span>
            <p className="ml-2 text-primary">{name}</p>
          </label>
        </div>
      ) : (
        <div
          className="flex m-3 cursor-pointer"
          onClick={handleFilterClick}
        >
          <label className="h-4 flex items-center justify-center cursor-pointer">
            <span className="w-4 h-4 flex items-center justify-center">
              {head === 'Posted Since' ? (
                <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
                  {isChecked && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              ) : (
                <CircleIcon />
              )}
            </span>
            <p className="ml-2 text-SearchResultText">{name}</p>
          </label>
        </div>
      )}
    </div>
  );
};

export default OptimizedFilterInput;