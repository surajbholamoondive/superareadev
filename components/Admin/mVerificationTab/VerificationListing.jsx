import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth';
import { getLogger } from '@/helper/logger';
import Loading from '@/pages/loading';
import { DELETE_FINAL_MESSAGE, DELETE_MESSAGE, GET_REQ, LEAD_REDIRECT_ROUTE, LEAD_TYPE, LEAD_TYPE_VIEWED, LEAD_TYPE_WISHLISTED, PUT_REQ, VERIFICATION_LISTING, } from '@/text';
import { makeApiRequest } from '@/utils/utils';
import DeleteModal from '@/components/Agent/Listing/DeleteModal';
import ListingDeatails from '@/components/MDListing/ListingDetails.jsx';
import PropertyModal from '../Direct-Listing/PropertyModal';
import NoDataInfo from '../my-m-associates/NoDataInfo.js/index.js';
import Style from './Properties.module.css';
import _debounce from 'lodash/debounce';

const FilterListing = ({ status, clicked, setClicked, selectedCity, selectedDays }) => {
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState('');
  const [nextPage, setNextPage] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [auth, setAuth] = useAuth();
  const [propertyData, setPropertyData] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const logger = getLogger();
  const type = auth?.userResult?.userType;
  const router = useRouter();
  const mVerify = 'm-verify';

  const containerRef = useRef();
  const handleScroll = _debounce(async () => {
    const container = containerRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollTop + container.clientHeight >=
      container.scrollHeight;
    if (isAtBottom && !isLoading && nextPage !== null) {
      await loadMoreProperties();
    }
  }, 200);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchListingData();
  }, [auth, clicked, userId, selectedCity, selectedDays]);

  const updateQueryParams = (newParams) => {
    const { page, ...queryParams } = router.query;
    const updatedQuery = { ...queryParams, ...newParams };
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key];
      }
    });
    router.push({ pathname: LEAD_REDIRECT_ROUTE, query: updatedQuery });
  };

  const handleOpen = (data) => {
    setOpen(true);
    setPropertyData(data);
  };

  const handleClose = () => {
    setOpen(false);
    setPropertyData(null);
  };

  const fetchListingData = async () => {
    try {
      const queryParams = {
        ...(selectedCity && selectedCity !== 'All Cities' ? { city: selectedCity } : {}),
        ...(selectedDays ? { days: selectedDays } : { days: '90' }),
      };
      const pageNum = 1;
      const size = 15;
      const response = await makeApiRequest(
        GET_REQ,
        `${VERIFICATION_LISTING}?pageNumber=${pageNum}&size=${size}&status=${status}`,
        { params: queryParams }
      );
      if (response) {
        setIsLoading(false);
      }
      const { data } = response || {};
      const { result } = data || {};
      const { listing } = result || {};
      const { nextPage } = result || 0;
      setNextPage(nextPage);
      setListings(listing);
    } catch (error) {
      logger.error(error);
    }
  };


  const loadMoreProperties = async () => {
    const size = 15;
    try {
      const response = await makeApiRequest(
        process.env.NEXT_PUBLIC_GET_METHOD,
        `${VERIFICATION_LISTING}?pageNumber=${nextPage}&size=${size}&status=${status}`
      );

      if (response) {
        const { data } = response || {};
        const { result } = data || {};
        const { listing } = result || {};
        const { nextPage } = result || 0;
        setNextPage(nextPage);
        setListings((prevListing) => [...prevListing, ...listing]);
      }
    } catch (error) {
      logger.error('Error loading more properties:', error);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      const response = await makeApiRequest(
        PUT_REQ,
        `property/delete-property?propertyId=${propertyId}`
      );
      setListings(listings.filter((property) => property._id !== propertyId));
      return response.data;
    } catch (error) {
      logger.error('Error deleting property:', error);
      throw error;
    }
  };

  const handleDelete = async (propertyId) => {
    setPropertyToDelete(propertyId);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPropertyToDelete(null);
  };

  const confirmDelete = (id) => {
    deleteProperty(id);
    setShowDeleteConfirmation(false);
    setClicked(!clicked);
  };

  const handleEnquired = (id) => {
    const activity = LEAD_TYPE;
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    };
    updateQueryParams({ ...params });
  };

  const handleWishlisted = (id) => {
    const activity = LEAD_TYPE_WISHLISTED;
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    };
    updateQueryParams({ ...params });
  };

  const handleViewed = (id) => {
    const activity = LEAD_TYPE_VIEWED;
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    };
    updateQueryParams({ ...params });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center m-4">
      <div
        className={` ${Style.propertiesContainer} lg:min-w-[700px] my-2 max-sm:mt-4 p-4 `}
        ref={containerRef}
        style={{
          maxHeight: '1200px',
          minHeight: '400px',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            <div key={index} className="my-2 w-[100%] cursor-pointer">
              <ListingDeatails
                setUserId={setUserId}
                handleDelete={handleDelete}
                handleEnquired={handleEnquired}
                handleWishlisted={handleWishlisted}
                handleViewed={handleViewed}
                property={listing}
                type={type}
                mVerify={mVerify}
                handleOpen={() => handleOpen(listing)}
              />
              <DeleteModal
                open={showDeleteConfirmation}
                id={listing._id}
                cancelDelete={cancelDelete}
                confirmDelete={confirmDelete}
                footText={DELETE_FINAL_MESSAGE}
                headText={DELETE_MESSAGE}
              />
            </div>
          ))
        ) : (
          <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[620px] flex items-center">
            <NoDataInfo />
          </div>
        )}
        <PropertyModal
          open={open}
          handleClose={handleClose}
          propertyData={propertyData}
          type={type}
          clicked={clicked}
          setClicked={setClicked}
          listings={listings}
        />
        {nextPage !== null && isLoading && <Loading />}
      </div>
    </div>
  );
};
export default FilterListing;
