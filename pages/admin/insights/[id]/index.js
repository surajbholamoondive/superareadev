import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'
import { useAuth } from '@/context/auth'
import { AGERANGE,
   AGERANGE_MDDROPDOWN,
    All_CITIES,
     DARK_TURQUOISE, 
     ENQUIRED, 
     ENQUIRED_QUERY, 
     LEADS,
      M_CITITES,
       METRO_CITIES,
        TOTAL_ENQUIRED,
         TOTAL_VIEWED,
          TOTAL_WISHLISTED,
           TURQUOISE,
            VIEWED,
             WISHLISTED } from '@/text'
import { makeApiRequest, sortByDate } from '@/utils/utils'
import TopBar from '@/components/SearchResultPage/TopBar/TopBar'
import SearchResultCardComponent from '@/components/SearchResultCardComponent/SearchResultCardComponent'
import singlePropertyAndProjectRoute from '@/utils/RoutingWithMetaData/routingHelper';
import DateDisplay from '@/utils/CreatedAtDateConversion/createdAtDateConversion';
import Loading from '@/pages/loading'
import { dayMappings } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Tab from '@mui/material/Tab'
import DropdownList from '@/components/Admin/Dashboard/DropdownList'
import NoDataInfo from '@/components/Admin/my-m-associates/NoDataInfo.js/index'
import LeadsLineChart from '@/components/Admin/Dashboard/Graph/leads';
import {mapDataToDisplayDaysMonth, mapDataToDisplayFullDate} from '@/utils/helper';
import EnhancedTable from './table'
import HorizontalBars from '@/components/Admin/HorizontalBars'
import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'
import Checkbox from '@mui/material/Checkbox'
import TooltipComponent from '@/components/Tooltip'

const TrendsPage = () => {
  const router = useRouter();
  const { query } = router;
  const { id, type, city: City, days } = query;
  const [propertyData, setPropertyData] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(City || All_CITIES);
  const [selectedDays, setSelectedDays] = useState(days || '90');
  const [values, setValues] = useState(ENQUIRED_QUERY)
  const [leadsList, setLeadsList] = useState([])
  const [sortOrder, setSortOrder] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [apiCountEnquired, setApiCountEnquired] = useState(0)
  const [apiCountWishlisted, setApiCountWishlisted] = useState(0)
  const [apiCountViewed, setApiCountViewed] = useState(0)
  const [noDataModal, setNoDataModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [activityArray, setActivityArray] = useState(["wishlisted", "enquired"]);
  const [activitiesData, setActivitiesData] = useState();
  const [stackBarGaphData, setStackBarGaphData] = useState();
  const activity = [TOTAL_WISHLISTED, TOTAL_ENQUIRED, TOTAL_VIEWED];
  const [selectedActivities, setSelectedActivities] = useState({
    wishlisted: true,
    enquired: true,
    viewed: false,
  });

  const[listingValues,setListingValues]=useState(AGERANGE)
  const [isChecked, setIsChecked] = useState(false);
  const logger = getLogger();
  const [auth, setAuth] = useAuth();
  const isValueValid = (value) => value !== undefined && value !== null && value !== '';
  const leadsData = activitiesData || [];
  const sortedLeadsData = sortByDate(leadsData);
  const leadsDataMap = mapDataToDisplayDaysMonth(sortedLeadsData);
  const leadsDataMapYear = mapDataToDisplayFullDate(sortedLeadsData);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const turquoise = TURQUOISE
  
  const handleCityCheckboxChange = () => {
    setLoading(true)
    setIsChecked(!isChecked);
    if(isChecked){
      updateQueryParams({mCities:"isTrue",city:"All Cities"})
      setSelectedCity("All Cities");
    }else{
      updateQueryParams({mCities:"isFalse",city:"All Cities"})
      setSelectedCity("All Cities");
    }
  };

  const capitalizeWords = (str) => {
    return str?.replace(/\b\w/g, char => char.toUpperCase());
  };

  const sortDataByCount = (data, key) => {
    return data?.sort((a, b) => b[key] - a[key]);
  };

  const prepareDataForGraph = (data, key) => {
    return data
      ?.map((item) => ({
        city: capitalizeWords(item.city),
        [key]: item[key],
      }))
      .filter((item) => item.city.trim() !== '' && item[key] > 0);
  };

  const getGraphData = (data, type) => {
    let preparedData;

    switch (type) {
      case 'Viewed':
        preparedData = prepareDataForGraph(data, 'Viewed');
        break;
      case 'Wishlisted':
        preparedData = prepareDataForGraph(data, 'Wishlisted');
        break;
      case 'Enquired':
        preparedData = prepareDataForGraph(data, 'Enquired');
        break;
      default:
        return [];
    }

    return sortDataByCount(preparedData, type);
  };

  const viewedData = getGraphData(stackBarGaphData, 'Viewed');
  const wishlistedData = getGraphData(stackBarGaphData, 'Wishlisted');
  const enquiredData = getGraphData(stackBarGaphData, 'Enquired');

  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams };

    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key];
      }
    });

    if (isValueValid(updatedQuery.id)) {
      router.push({ pathname: router.pathname, query: updatedQuery }, undefined, { shallow: true });
    }
  };

  let imageArray = [];
  propertyData?.propertyImages?.forEach((element) => {
    imageArray.push(element.url);
  });
  propertyData?.projectImages?.forEach((element) => {
    imageArray.push(element.url);
  });
  const url = singlePropertyAndProjectRoute(propertyData);

  const {
    _id,
    addressLabel = '',
    bedroomCount = '',
    bathroomCount = '',
    furnishingStatus = '',
    propertyTitle = '',
    projectTitle = '',
    salePrice = '',
    rentPrice = '',
    propertySize = '',
    projectDescription = '',
    propertyDescription = '',
    propertyType = '',
    projectType = '',
    propertySubType = '',
    projectSubType = '',
    totalUnitCount = '',
    projectUnits = '',
    projectAreaUnit = '',
    createdAt = '',
    projectArea = '',
    city = '',
    locality = '',
    mScore = '',
    mVerifiedStatus = '',
  } = propertyData || {};

  const postedBy = propertyData?.postedBy?.userType || '';
  const firstName = propertyData?.postedBy?.firstName || '';
  const lastName = propertyData?.postedBy?.lastName || '';
  const profileImage = propertyData?.postedBy?.profileImage || '';
  const daysAgo = DateDisplay(createdAt);

  const handleSelectChangeCity = (value) => {
    setLoading(true);
    setSelectedCity(value);
    const cityQueryParam = value === All_CITIES ? undefined : value;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, city: cityQueryParam },
    }, undefined, { shallow: true });
  };

  const handleSelection = (value) => {
    setLoading(true)
    const selectedValue = dayMappings[value];
    setSelectedDays(selectedValue);
    updateQueryParams({ days: selectedValue })
  };
  const handleSortOrderChange = () => {
    setLoading(true)
    if (sortOrder == -1) {
      setSortOrder(1)
      updateQueryParams({
        sortingOrder: 1
      })
    } else {
      setSortOrder(-1)
      updateQueryParams({
        sortingOrder: -1
      })
    }
  }
  const handlePageChange = (event, newPage) => {
    setLoading(true)
    setCurrentPage(newPage)
    updateQueryParams({
      pageNumber: newPage
    })
  }
  const handleChange = (event, newValue) => {
    setLoading(true)
    setValues(newValue)
    updateQueryParams({
      activity: newValue,
      pageNumber:1
    })
    setCurrentPage(1)

  }
  const handleSelectChangelisting = (newValue) => {
    setLoading(true)
    if(newValue==='All'){
      updateQueryParams({ageGroup: ''})
    }else{
      updateQueryParams({ageGroup: newValue})
    }
  }
  
  const handleCheckboxChange = (activity) => (event) => {
    const newState = {
      ...selectedActivities,
      [activity]: event.target.checked,
    };
    const updatedArray = Object.keys(newState).filter((key) => newState[key]);
    setActivityArray(updatedArray);
    const newQuery = {
      ...router.query,
      graphactivityType: updatedArray.length > 0 ? updatedArray.join(',') : undefined,
    };
    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
    setSelectedActivities(newState);
  };

  useEffect(() => {
    if (router.isReady && id && type && auth.token && router.query.city && router.query.days && router.query.activity) {
      fetchData();
    } else {
      updateQueryParams({
        activity: values,
        pageNumber: currentPage,
        pageSize: 10,
        city: selectedCity ? selectedCity : All_CITIES,
        days: selectedDays ? selectedDays : "90",
        mCities: 'isTrue'
      })
    }
  }, [router.isReady, id, auth, query, activityArray,isChecked]);

  const fetchData = async () => {
    try {
      const route = `/admin/insights/${id}`
      const queryParams = {
        ...router.query,
        ...(activityArray.length > 0 ? { graphactivityType: activityArray } : {}),
      };
      const response = await makeApiRequest('get', route, {
        params: queryParams
      });
      let result = response?.data?.result;
      const tableResult = response?.data?.result?.tableData
      setTotalPages(response?.data?.result?.totalPages)
      if (type === "property") {
        setPropertyData(result.propertyData[0]);
      } else {
        setPropertyData(result.propertyData);
      }
      if (tableResult?.activities.length === 0) {
        setNoDataModal(true)
      } else {
        setNoDataModal(false)
      }
      setLeadsList(tableResult)
      setApiCountEnquired(tableResult?.totalCountEnquired)
      setApiCountWishlisted(tableResult?.totalCountWishlisted)
      setApiCountViewed(tableResult?.totalCountViewed)
      setLoading(false)
      setActivitiesData(response?.data?.result?.lineGraphData);
      setStackBarGaphData(response?.data?.result?.data)
      setValues(response?.data?.result?.activity)
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className=' bg-[#F7FBFC]'>
      <TopBar label="Listing Insights" />
      <div className='w-fit bg-[#FDFDFD] m-auto pt-8'>          
      <div className=' w-fit bg-white m-auto rounded-md mb-12 shadow-md'>
          {propertyData && (
            projectTitle && projectTitle !== '' ? (
              <SearchResultCardComponent
                id={_id}
                share={true}
                isProject={true}
                addresslabel={addressLabel}
                imageArray={imageArray}
                projectSubType={projectSubType}
                projectType={projectType}
                projectTitle={projectTitle}
                propertyUrl={url}
                projectDescription={projectDescription}
                projectUnits={projectUnits}
                projectAreaUnit={projectAreaUnit}
                totalUnitCount={totalUnitCount}
                projectArea={projectArea}
                locality={locality}
                city={city}
                daysAgo={daysAgo}
                mVerifiedStatus={mVerifiedStatus}
              />
            ) : (
              <SearchResultCardComponent
                id={_id}
                share={true}
                isProject={false}
                addresslabel={addressLabel}
                bedroomCount={bedroomCount}
                bathroomCount={bathroomCount}
                furnishingStatus={furnishingStatus}
                propertyTitle={propertyTitle}
                salePrice={salePrice}
                rentPrice={rentPrice}
                propertySize={propertySize}
                projectDescription={projectDescription}
                propertyDescription={propertyDescription}
                propertyType={propertyType}
                projectType={projectType}
                propertySubType={propertySubType}
                projectSubType={projectSubType}
                postedBy={postedBy}
                firstName={firstName}
                lastName={lastName}
                mScoreValue={mScore}
                mScore={true}
                profileImage={profileImage}
                imageArray={imageArray}
                propertyUrl={url}
                daysAgo={daysAgo}
                mVerifiedStatus={mVerifiedStatus}
              />
            )
          )}
        </div>

        <div className='mb-2 relative'>
          <TabContext value={values}>
            <Box sx={{ borderBottom: 1, borderColor: 'transparent'}}>
              <div style={{ display: 'flex', alignItems: 'center'  }}>
                <TabList
                  style={{
                    marginTop: '2.5px',
                    marginLeft: '20px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    flexGrow: 1,
                  }}
                  onChange={handleChange}
                  aria-label="tabs"
                  TabIndicatorProps={{
                    style: { backgroundColor: '#931602' },
                  }}
                >
                  <Tab
                    label={`Enquired (${apiCountEnquired || 0})`}
                    value="enquired"
                    style={{
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      padding: '0px 0px 0px 0px',
                      marginLeft: '4px',
                    }}
                  />
                  <Tab
                    label={`Wishlisted (${apiCountWishlisted || 0})`}
                    value="wishlisted"
                    style={{
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      padding: '0px 0px 0px 0px',
                      marginLeft: '10px',
                    }}
                  />
                  <Tab
                    label={`Viewed (${apiCountViewed || 0})`}
                    value="viewed"
                    style={{
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      padding: '0px 0px 0px 0px',
                      marginLeft: '10px',
                    }}
                  />
                </TabList>

                <div className=" flex items-center gap-2">
                <div className="flex items-center justify-center  mr-2">
              <Checkbox
                {...label}
                checked={isChecked}
                sx={{
                  color: turquoise,
                  '&.Mui-checked': {
                    color: DARK_TURQUOISE,
                    margin: 0, padding: 0 ,
                    
                  },
                }}
                className='transition-none w-9'
                onChange={handleCityCheckboxChange}
              />
              <label className='text-[0.875rem] justify-center items-center text-black bg-opacity-5'>
                {METRO_CITIES}
              </label>
              <TooltipComponent tooltipText={M_CITITES} />
              </div>
                  <div >
                    <DropdownList
                      handleSelectChangeCity={handleSelectChangeCity}
                      isCityDropdown={true}
                    />
                  </div>
                  
                  <div className='pr-2 pl-2'>
                    <DropdownList
                      handleSelection={handleSelection}
                      isCityDropdown={false}
                    />
                  </div>
                  <div className='pr-6'>
                  <MDSelectDropdown inlineCSS={{
                    width: '180px',
                    textAlign: 'left',
                    padding: '7.95px',
                    borderRadius: '6.5px',
                    marginLeft: '6px',
                    marginRight: '23px',
                    height: "30px",
                    dropdownFontSize: '0.875rem',
                  }}
                    values={listingValues} byDefaultText={AGERANGE_MDDROPDOWN} setSelectedValue={setListingValues} onClick={handleSelectChangelisting} />
                  </div>
                </div>
              </div>
            </Box>
            {!noDataModal && (
              <>
                <TabPanel value="enquired" sx={{ paddingTop: '9px' }}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <EnhancedTable
                      array={leadsList}
                      valueType={values}
                      handleSortState={handleSortOrderChange}
                      setModalData={setModalData}
                      currentPage={currentPage}

                    />
                  )}
                </TabPanel>
                <TabPanel value="wishlisted" sx={{ paddingTop: '9px' }}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <EnhancedTable
                      array={leadsList}
                      valueType={values}
                      handleSortState={handleSortOrderChange}
                      setModalData={setModalData}
                      currentPage={currentPage}

                    />
                  )}
                </TabPanel>
                <TabPanel value="viewed" sx={{ paddingTop: '9px' }}>
                  {' '}
                  {loading ? (
                    <Loading />
                  ) : (
                    <EnhancedTable
                      array={leadsList}
                      valueType={values}
                      handleSortState={handleSortOrderChange}
                      setModalData={setModalData}
                      currentPage={currentPage}
                    />
                  )}
                </TabPanel>
              </>
            )}
          </TabContext>
          {!noDataModal && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '2px',
                marginTop: '4px',
                backgroundColor: 'white',
              }}
            >
              <Pagination
                count={totalPages}
                size="medium"
                showFirstButton={true}
                showLastButton={true}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '50%',
                    height: "30px",
                    width: "30px",
                    alignContent: "center"
                  }
                }}
              />
            </div>
          )}
          {noDataModal && (
            <div className="rounded-md flex justify-center py-20 mx-7 mt-2 bg-white">
              <NoDataInfo
              />
            </div>
          )}</div>
        <div className='mt-[50px] ml-6 mb-[50px]'>
          {leadsData && (
            <div className='text-center border-2 border-primary rounded-xl mr-6 py-2'>
              <div className='whitespace-nowrap font-extrabold mr-3'><h3>{LEADS} {leadsDataMapYear.length > 0 && `(${leadsDataMapYear[0]} to ${leadsDataMapYear[leadsDataMapYear.length - 1]})`}</h3></div>
         <div className='w-[100%] flex items-center justify-center'>
                <LeadsLineChart data={leadsDataMap} yDataKeys={activity} sortedData={sortedLeadsData} />
              </div>
              <div className="flex justify-center mb-1 mt-4">
                <div className='flex' >
                  <input
                    type="checkbox"
                    className='w-6 ml-5'
                    checked={selectedActivities.wishlisted}
                    onChange={handleCheckboxChange('wishlisted')}
                  />
                  <p>{WISHLISTED}</p>
                </div>
                <div className='flex' >
                  <input
                    type="checkbox"
                    className="ml-5 w-6"
                    checked={selectedActivities.enquired}
                    onChange={handleCheckboxChange('enquired')}
                  />
                  <p>{ENQUIRED}</p>
                </div>
                <div className='flex'>
                  <input
                    type="checkbox"
                    className="ml-5 w-6"
                    checked={selectedActivities.viewed}
                    onChange={handleCheckboxChange('viewed')}
                  />
                  <p> {VIEWED} </p>
                </div>
              </div>
            </div>
          )}
        </div> 
        {(Array.isArray(enquiredData) && enquiredData.length > 0) || 
 (Array.isArray(wishlistedData) && wishlistedData.length > 0) || 
 (Array.isArray(viewedData) && viewedData.length > 0) ? (
  <div className='text-center border-2 border-primary rounded-xl flex justify-center m-6 pb-2'>
    <div className="flex flex-row m-4">
      {Array.isArray(viewedData) && viewedData.length > 0 && (
        <div className='m-2 items-center flex'>
          <HorizontalBars data={viewedData} label="Viewed" color={"#0168A2"} />
        </div>
      )}
      {Array.isArray(wishlistedData) && wishlistedData.length > 0 && (
        <div className='m-2 flex'>
          <HorizontalBars data={wishlistedData} label="Wishlisted" color={"#931602"} />
        </div>
      )}
      {Array.isArray(enquiredData) && enquiredData.length > 0 && (
        <div className='m-2 flex'>
          <HorizontalBars data={enquiredData} label="Enquired" color={"#E9C051"} />
        </div>
      )}
    </div>
  </div>
) : null}
     
</div>
    </div>
  );
};
export default TrendsPage;