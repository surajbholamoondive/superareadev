import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useFilters = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    propertyTypes: {
      residential: false,
      commercial: false,
      industrial: false,
      agricultural: false,
    },
    propertySubTypes: new Set(),
    possessionStatus: new Set(),
    furnishingStatus: new Set(),
    bedroomCounts: new Set(),
    amenities: new Set(),
    budgetValue: [],
    mVerifiedStatus: null,
    reraApproved: null,
    mScore: [0, 100],
    postedSince: null,
    newGrandProject: null,
  });

  useEffect(() => {
    const query = router.query;
    const postedSinceMap = {
      Yesterday: 'yesterday',
      'Last Week': 'last_week',
      'Last 2 Weeks': 'last_2_weeks',
      'Last Month': 'last_month',
    };
    const postedSinceReverseMap = {
      yesterday: 'Yesterday',
      last_week: 'Last Week',
      'last_2_weeks': 'Last 2 Weeks',
      last_month: 'Last Month',
    };
    const backendPostedSince = query.postedSince
      ? postedSinceReverseMap[query.postedSince] || query.postedSince
      : null;

    setFilters((prev) => ({
      ...prev,
      propertyTypes: {
        residential: query.propertyType === 'Residential',
        commercial: query.propertyType === 'Commercial',
        industrial: query.propertyType === 'Industrial',
        agricultural: query.propertyType === 'Agricultural',
      },
      propertySubTypes: new Set(
        query.propertySubType ? query.propertySubType.split(',') : []
      ),
      possessionStatus: new Set(
        query.possessionStatus ? query.possessionStatus.split(',') : []
      ),
      furnishingStatus: new Set(
        query.furnishingStatus ? query.furnishingStatus.split(',') : []
      ),
      bedroomCounts: new Set(
        query.bedroomCount ? query.bedroomCount.split(',') : []
      ),
      amenities: new Set(query.amenities ? query.amenities.split(',') : []),
      budgetValue: query.price ? query.price.split('-').map(Number) : [],
      mVerifiedStatus: query.mVerifiedStatus === 'approved' ? 'approved' : null,
      reraApproved: query.reraApproved === 'Yes' ? 'Yes' : null,
      mScore: query.mScore ? query.mScore.split('-').map(Number) : [0, 100],
      postedSince: backendPostedSince,
      newGrandProject: query.newGrandProject === 'grandProjects' ? 'grandProjects' : null,
    }));
  }, [router.query]);

  const toggleFilter = (category, value) => {
    if (category === 'postedSince') {
      setFilters((prev) => ({
        ...prev,
        postedSince: prev.postedSince === value ? null : value,
      }));
    } else {
      setFilters((prev) => {
        const newSet = new Set(prev[category]);
        if (newSet.has(value)) newSet.delete(value);
        else newSet.add(value);
        return { ...prev, [category]: newSet };
      });
    }
  };

  const setPropertyType = (type) => {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: {
        residential: type === 'Residential',
        commercial: type === 'Commercial',
        industrial: type === 'Industrial',
        agricultural: type === 'Agricultural',
      },
      propertySubTypes: new Set(),
    }));
  };

  const setBudgetRange = (range) => {
    setFilters((prev) => ({ ...prev, budgetValue: range }));
  };

  const setMScore = (score) =>
    setFilters((prev) => ({ ...prev, mScore: score }));
  const setMVerified = (status) =>
    setFilters((prev) => ({ ...prev, mVerifiedStatus: status }));
  const setReraVerified = (status) =>
    setFilters((prev) => ({ ...prev, reraApproved: status }));
  const setGrandProject = (status) =>
    setFilters((prev) => ({ ...prev, newGrandProject: status }));

  const resetFilters = () => {
    setFilters({
      propertyTypes: {
        residential: false,
        commercial: false,
        industrial: false,
        agricultural: false,
      },
      propertySubTypes: new Set(),
      possessionStatus: new Set(),
      furnishingStatus: new Set(),
      bedroomCounts: new Set(),
      amenities: new Set(),
      budgetValue: [],
      mVerifiedStatus: null,
      reraApproved: null,
      mScore: [0, 100],
      postedSince: null,
      newGrandProject: null,
    });
  };

  return {
    filters,
    toggleFilter,
    setPropertyType,
    setBudgetRange,
    setMScore,
    setMVerified,
    resetFilters,
    setReraVerified,
    setGrandProject,
  };
};