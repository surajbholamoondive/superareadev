import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import closeIcon from '@/assets/userDashboard/close.svg';
import { GLOBALLY_COMMON_TEXT, SEARCH_RESULT_PAGE_TEXT } from '@/textV2';
import { toast } from 'react-toastify';

import shield from '../../../assets/logo/verification-logo.svg';
import filterOptions from '../../../content/AccordionFilters/const.json';
import Styles from './filtersection.module.css';
import { useFilters } from './hooks/useFilters';
import OptimizedMainAccordion from './OptimizedMainAccordion';
import MinimumDistanceSlider from './SliderComponent';
import { TEXT_NEW_GRAND_PROJECT, TEXT_RERA_REGISTER } from '@/text';

const { activeText, budgetFilterError, filterText, refineSearch, resetFilter } =
  SEARCH_RESULT_PAGE_TEXT.text;
const { superVerifiedProperty } = GLOBALLY_COMMON_TEXT.text;

const OptimizedFilterSection = ({
  dataToFilter,
  totalPropertyCount,
  handleDrawerClose,
  setResidential,
  setCommercial,
  setIndustrial,
  setAgricultural,
}) => {
  const ref = useRef(null);
  const router = useRouter();
  const {
    filters,
    toggleFilter,
    setPropertyType,
    setBudgetRange,
    setMScore,
    setMVerified,
    resetFilters,
    setReraVerified,
    setGrandProject,
  } = useFilters();

  React.useEffect(() => {
    setResidential(filters.propertyTypes.residential);
    setCommercial(filters.propertyTypes.commercial);
    setIndustrial(filters.propertyTypes.industrial);
    setAgricultural(filters.propertyTypes.agricultural);
  }, [
    filters.propertyTypes,
    setResidential,
    setCommercial,
    setIndustrial,
    setAgricultural,
  ]);

  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams };
    Object.keys(updatedQuery).forEach((key) => {
      if (
        updatedQuery[key] === '' ||
        updatedQuery[key] === null ||
        updatedQuery[key] === undefined ||
        (Array.isArray(updatedQuery[key]) && updatedQuery[key].length === 0)
      ) {
        delete updatedQuery[key];
      }
    });
    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleRefineSearch = () => {
    handleDrawerClose();
    ref.current?.scrollIntoView({ behavior: 'smooth' });

    const queryParams = {
      sortBy: '',
      searchString: '',
      propertyType:
        Object.keys(filters.propertyTypes)
          .find((key) => filters.propertyTypes[key])
          ?.charAt(0)
          .toUpperCase() +
          Object.keys(filters.propertyTypes)
            .find((key) => filters.propertyTypes[key])
            ?.slice(1) || '',
      propertySubType: Array.from(filters.propertySubTypes).join(','),
      bedroomCount: Array.from(filters.bedroomCounts).join(','),
      furnishingStatus: Array.from(filters.furnishingStatus).join(','),
      amenities: Array.from(filters.amenities).join(','),
      price:
        filters.budgetValue.length === 2
          ? `${filters.budgetValue[0]}-${filters.budgetValue[1]}`
          : '',
      mVerifiedStatus: filters.mVerifiedStatus || '',
      possessionStatus: Array.from(filters.possessionStatus).join(','),
      reraApproved: filters.reraApproved || '',
      postedSince: filters.postedSince || '',
      newGrandProject: filters.newGrandProject || '',
    };

    if (filters.budgetValue[0] > filters.budgetValue[1]) {
      toast.error(budgetFilterError);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (filters.mScore[0] !== 0 || filters.mScore[1] !== 100) {
      queryParams.mScore = `${filters.mScore[0]}-${filters.mScore[1]}`;
    }

    updateQueryParams(queryParams);
  };

  const handleResetFilter = () => {
    resetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateQueryParams({
      sortBy: '',
      searchString: '',
      propertySubType: '',
      mScore: '',
      propertyType: '',
      propertyStatus: '',
      bedroomCount: '',
      furnishingStatus: '',
      amenities: '',
      price: '',
      mVerifiedStatus: '',
      status: activeText,
      possessionStatus: '',
      reraApproved: '',
      postedSince: '',
      newGrandProject: '',
    });
  };

  const handleCheckboxChange = () => {
    const newStatus = filters.mVerifiedStatus === 'approved' ? null : 'approved';
    setMVerified(newStatus);
  };

  const handleReraCheckboxChange = () => {
    const newReraStatus = filters.reraApproved === 'Yes' ? null : 'Yes';
    setReraVerified(newReraStatus);
  };

  const handleGrandCheckboxChange = () => {
    const newGrandStatus = filters.newGrandProject === 'grandProjects' ? null : 'grandProjects';
    setGrandProject(newGrandStatus);
  };

  return (
    <div
      className="flex max-lg:flex-col max-md:justify-center w-fit rounded-xl"
      style={{ marginTop: '3.3rem' }}
    >
      <div
        onClick={handleDrawerClose}
        className="absolute top-5 right-6 flex justify-center lg:hidden items-center cursor-pointer rounded-full bg-transparent border p-[5px] border-gray-400"
      >
        <button>
          <Image
            src={closeIcon}
            alt="close"
            width={15}
            height={15}
            className="cursor-pointer"
          />
        </button>
      </div>

      <div className="bg-white max-md:mb-14 flex max-md:justify-center max-lg:flex flex-col max-lg:w-[300px] overflow-hidden rounded-2xl lg:border border-primary">
        <div className="ml-5 mt-6">
          <h2>{filterText}</h2>

          <div className="flex items-center mt-3 w-60 gap-[2px] max-md:ml-1">
            <Link href="/super-verification">
              <Image className="h-6 w-6" src={shield} alt="M-verified icon" />
            </Link>
            <p>{superVerifiedProperty}</p>
            <label className={Styles.firstContainer}>
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={filters.mVerifiedStatus === 'approved'}
              />
              <span className={Styles.spanBox}></span>
            </label>
          </div>

          <MinimumDistanceSlider
            value1={filters.mScore}
            setValue1={setMScore}
          />
        </div>

        <div className="flex justify-start max-md:justify-center">
          <div className="ps-[8.5px] max-lg:flex justify-between w-full flex-col">
            {filterOptions.map((option, index) => (
              <div key={index}>
                <OptimizedMainAccordion
                  hname={option.heading}
                  htype={option.key}
                  filters={option.filters}
                  filterState={filters}
                  onToggleFilter={toggleFilter}
                  onSetPropertyType={setPropertyType}
                  onSetBudgetRange={setBudgetRange}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="ml-5">
          <div className="flex items-center mt-3 w-60 gap-[2px] max-md:ml-1">
            <p>{TEXT_RERA_REGISTER}</p>
            <label className={Styles.firstContainer}>
              <input
                type="checkbox"
                onChange={handleReraCheckboxChange}
                checked={filters.reraApproved === 'Yes'}
              />
              <span className={Styles.spanBox}></span>
            </label>
          </div>
        </div>
        <div className="ml-5">
          <div className="flex items-center mt-3 w-60 gap-[84px] max-md:ml-1">
            <p>{TEXT_NEW_GRAND_PROJECT}</p>
            <label className={Styles.firstContainer}>
              <input
                type="checkbox"
                onChange={handleGrandCheckboxChange}
                checked={filters.newGrandProject === 'grandProjects'}
              />
              <span className={Styles.spanBox}></span>
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center text-center mt-6">
            <button
              className="bg-primary tracking-wider px-14 py-3 rounded-md text-white text-sm"
              onClick={handleRefineSearch}
            >
              {refineSearch}
            </button>
          </div>
          <div className="flex justify-center text-center mt-6 pb-5">
            <button
              className="bg-white px-16 tracking-wider py-3 mb-3 rounded-md text-[#636363] text-sm border border-solid-gray-500"
              onClick={handleResetFilter}
            >
              {resetFilter}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedFilterSection;