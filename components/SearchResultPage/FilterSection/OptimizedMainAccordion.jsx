import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import DownArrow from '@/assets/DownArrow/down-arrow.svg';
import OptimizedFilterInput from './OptimizedFilterInput';
import MinimumDistanceSliderBudget from './SliderComponentBudget';

import Commercial from '../../../content/AccordionFilters/Commercial.json';
import Residential from '../../../content/AccordionFilters/Residential.json';
import Industrial from '../../../content/AccordionFilters/Industrial.json';
import Agricultural from '../../../content/AccordionFilters/Agricultural.json';

const FILTER_CATEGORY_MAP = {
  'BHK': 'bedroomCounts',
  'Furnishing Status': 'furnishingStatus',
  'Amenities': 'amenities',
  'Property Sub Type': 'propertySubTypes',
  'Possession Status': 'possessionStatus',
  'Posted Since': 'postedSince',
};

const OptimizedMainAccordion = ({
  hname,
  filters,
  filterState,
  onToggleFilter,
  onSetPropertyType,
  onSetBudgetRange,
}) => {
  const [show, setShow] = useState(false);
  const isManuallyClosed = useRef(false);

  useEffect(() => {
    const hasAppliedFilters = () => {
      switch (hname) {
        case 'BHK':
          return filterState.bedroomCounts.size > 0;
        case 'Property Type':
          if (isManuallyClosed.current) return false;
          return Object.values(filterState.propertyTypes).some(value => value);
        case 'Property Sub Type':
          return filterState.propertySubTypes.size > 0;
        case 'Furnishing Status':
          return filterState.furnishingStatus.size > 0;
        case 'Amenities':
          return filterState.amenities.size > 0;
        case 'Possession Status':
          return filterState.possessionStatus.size > 0;
        case 'Price Range':
          return filterState.budgetValue.length > 0;
        case 'Posted Since':
          return filterState.postedSince !== null;
        default:
          return false;
      }
    };
    
    setShow(hasAppliedFilters());
  }, [filterState, hname]);

  const handleClick = () => {
    if (hname === 'Property Type') {
      if (show) {
        isManuallyClosed.current = true; 
      } else {
        isManuallyClosed.current = false; 
      }
    }
    
    setShow(!show);
  };

  const getCategoryKey = () => FILTER_CATEGORY_MAP[hname];

  return (
    <div className="max-lg:w-[280px] max-md:w-full lg:mt-5">
      <div onClick={handleClick} className="flex mb-3 lg:ps-3 justify-between items-center cursor-pointer">
        <h3 className="w-fit">{hname}</h3>
        <div className={`transition-all duration-500 mr-2 ${show ? 'rotate-180' : ''}`}>
          <Image src={DownArrow} height={18} width={18} alt="toggle arrow" />
        </div>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.2 }}
          >
            {hname !== "Price Range" && filters.map((filter, index) => (
              <OptimizedFilterInput
                key={index}
                name={filter}
                head={hname}
                categoryKey={getCategoryKey()}
                filterState={filterState}
                onToggleFilter={onToggleFilter}
                onSetPropertyType={onSetPropertyType}
              />
            ))}

            {filterState.propertyTypes.residential && hname === 'Property Type' && (
              <div className="max-lg:flex justify-between max-md:flex-col">
                {Residential.map((option, index) => (
                  <div key={index}>
                    <OptimizedMainAccordion
                      hname={option.heading}
                      filters={option.filters}
                      filterState={filterState}
                      onToggleFilter={onToggleFilter}
                      onSetPropertyType={onSetPropertyType}
                      onSetBudgetRange={onSetBudgetRange}
                    />
                  </div>
                ))}
              </div>
            )}

            {filterState.propertyTypes.commercial && hname === 'Property Type' && (
              <div className="max-lg:flex justify-between w-full max-md:flex-col">
                {Commercial.map((option, index) => (
                  <div key={index}>
                    <OptimizedMainAccordion
                      hname={option.heading}
                      filters={option.filters}
                      filterState={filterState}
                      onToggleFilter={onToggleFilter}
                      onSetPropertyType={onSetPropertyType}
                      onSetBudgetRange={onSetBudgetRange}
                    />
                  </div>
                ))}
              </div>
            )}

            {filterState.propertyTypes.industrial && hname === 'Property Type' && (
              <div className="max-lg:flex justify-between w-full max-md:flex-col">
                {Industrial.map((option, index) => (
                  <div key={index}>
                    <OptimizedMainAccordion
                      hname={option.heading}
                      filters={option.filters}
                      filterState={filterState}
                      onToggleFilter={onToggleFilter}
                      onSetPropertyType={onSetPropertyType}
                      onSetBudgetRange={onSetBudgetRange}
                    />
                  </div>
                ))}
              </div>
            )}

            {filterState.propertyTypes.agricultural && hname === 'Property Type' && (
              <div className="max-lg:flex justify-between w-full max-md:flex-col">
                {Agricultural.map((option, index) => (
                  <div key={index}>
                    <OptimizedMainAccordion
                      hname={option.heading}
                      filters={option.filters}
                      filterState={filterState}
                      onToggleFilter={onToggleFilter}
                      onSetPropertyType={onSetPropertyType}
                      onSetBudgetRange={onSetBudgetRange}
                    />
                  </div>
                ))}
              </div>
            )}

            {hname === 'Price Range' && (
              <div className='pl-3 max-lg:mb-4'>
                <MinimumDistanceSliderBudget
                  budgetValue={filterState.budgetValue}
                  setBudgetValue={onSetBudgetRange}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OptimizedMainAccordion;