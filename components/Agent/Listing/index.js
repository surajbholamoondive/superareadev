import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import useWindowWidth from "@/context/useWindowWidth";
import { useRouter } from 'next/router';
import { makeApiRequest } from '@/utils/utils';
import { PROPERTY_LIST_ROUTE, POST_TEXT, LEAD_TYPE, LEAD_TYPE_WISHLISTED, PUT_REQ, LEADS_INDEX_ROUTE, AGENT, MY_LISTINGS } from "@/text"
import { useData } from '@/context/data';
import { getLogger } from "@/helper/logger";
import Listing from "@/components/MDListing";
import EditPage from "@/components/Agent/Edit";
import KycModal from '../../../components/Agent/modal'
const agentListing = () => {
  const [properties, setProperties] = useState([]);
  const [auth] = useAuth();
  const windowWidth = useWindowWidth();
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [DATA, setDATA] = useData({});
  const [isKycUpdateModalOpen, setKycUpdateModalOpen] = useState(false)
  const [clicked,setClicked]=useState(false);
  useEffect(() => {
    if (auth?.userResult?.isKycVerified === false) {
      setKycUpdateModalOpen(true)
    }
  }, [auth.userResult])
  const handleModalClose = () => {
    setKycUpdateModalOpen(false)
  }
  const logger = getLogger();
  const type = AGENT;
  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...route.query, ...newParams, };

    Object.keys(updatedQuery).forEach(key => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key];
      }
    });
    route.push({ pathname: LEADS_INDEX_ROUTE, query: updatedQuery, });
  };

  useEffect(() => {
    makeApiRequest(POST_TEXT, PROPERTY_LIST_ROUTE)
      .then((response) => {
        const Result = response?.data?.result;
        if (Array.isArray(Result)) {
          setProperties(Result);
        } else {
          logger.error("Property list response is not an array:", Result);
        }
      })
      .catch((error) => {
        logger.error("Error fetching property list:", error);
      });
  }, [clicked]);

  const deleteProperty = async (propertyId) => {
    try {
      const response = await makeApiRequest(PUT_REQ,`property/delete-property?propertyId=${propertyId}`);
      return response.data;
    } catch (error) {
      logger.error('error deleting property:', error);
      throw error;
    }
  };
  const handleEdit = (ID, property) => {
    setDATA(property)
    const propertyId = encodeURIComponent(ID);
    const newUrl = `${window.location.pathname}?propertyId=${propertyId}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    setPropertyToEdit(ID);
    setIsModalOpen(true);
  };
  const confirmDelete = (id) => {
    const result = deleteProperty(id)
    setShowDeleteConfirmation(false);
    setClicked(!clicked)
     }
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPropertyToDelete(null);
  };
  const handleDelete = async (propertyId) => {
    setPropertyToDelete(propertyId);
    setShowDeleteConfirmation(true);
  };
  const handleEnquired = (id) => {
    const activity = LEAD_TYPE
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    };
    updateQueryParams({ ...params })
  };
  const handleWishlisted = (id) => {
    const activity = LEAD_TYPE_WISHLISTED
    const params = {
      propertyId: id,
      activity: activity,
      pageNumber: 1,
      pageSize: 10,
    };
    updateQueryParams({ ...params })
  };
  return (
    <div className="px-4 mb-12 w-full">
            {isKycUpdateModalOpen && <KycModal onClose={handleModalClose} />}
      <div className="flex bg-white mt-2 rounded-md pb-9">
        <div className={`mt-4 ${windowWidth > 1024 ? `w-[1005px]` : `w-[90%]`}`} >
          <div className="flex items-center justify-between">
            <h1 className="pl-3 mb-5">
              {MY_LISTINGS} ({properties?.length})
            </h1>
          </div>
          <div>
            <div><Listing properties={properties} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} propertyToEdit={propertyToEdit} handleWishlisted={handleWishlisted} handleDelete={handleDelete} handleEdit={handleEdit} handleEnquired={handleEnquired} EditPage={EditPage} type={type} showDeleteConfirmation={showDeleteConfirmation} cancelDelete={cancelDelete} confirmDelete={confirmDelete} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default agentListing;
