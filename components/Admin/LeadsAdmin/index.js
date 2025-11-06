import * as React from 'react'
import { useEffect, useState } from 'react'
import { dayMappings } from '@/utils/utils'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import {
  ADMIN_LEADS_ROUTE,
  ADMIN_SIDE,
  ADMIN_UNIQUE_LISITNGS_API_ROUTE,
  All_CITIES,
  ALL_CITIES_DEFAULT,
  ALL_PROJECTS,
  ALL_PROPERTIES,
  ENQUIRED_QUERY,
  GET_REQ,
  LEAD_TYPE,
  LEAD_TYPE_VIEWED,
  LEAD_TYPE_WISHLISTED,
  MY_PROJECTS,
  MY_PROPERTIES,
  POST_TEXT,
  PROPERTY_FETCHING_REDIRECT,
} from '@/text'
import { makeApiRequest } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import DropdownList from '../Dashboard/DropdownList'
import NoDataInfo from '../my-m-associates/NoDataInfo.js/index.js'
import EnhancedTable from './Table'
import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'

export default function Tabs() {
  const router = useRouter()
  const { query } = router;
  const { city, days, propertyId } = router.query;
  const [selectedCity, setSelectedCity] = useState(city || All_CITIES);
  const [selectedDays, setSelectedDays] = useState(days || '90');
  const [values, setValues] = useState(query.activity || ENQUIRED_QUERY)
  const [selectedListing, setSelectedListing] = useState('')
  const [myListingType, setMyListingType] = useState(propertyId ? "" : MY_PROJECTS)
  const [propertyRedirect, setPropertyRedirect] = useState(propertyId ? propertyId : '')
  const [leadsList, setLeadsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPageType, setTotalPageType] = useState(ENQUIRED_QUERY)
  const [apiCountEnquired, setApiCountEnquired] = useState(0)
  const [apiCountWishlisted, setApiCountWishlisted] = useState(0)
  const [apiCountViewed, setApiCountViewed] = useState(0)
  const [noDataModal, setNoDataModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [listingValues, setListingValues] = useState({ "All Listings": [ALL_PROJECTS, ALL_PROPERTIES], Projects: [], Properties: [], })
  const [defaultText, setDefaultText] = useState('')
  const logger = getLogger()
  const tableToRender = ADMIN_SIDE
  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '' || updatedQuery[key] === ALL_CITIES_DEFAULT) {
        delete updatedQuery[key]
      }
    })
    router.push({ pathname: router.pathname, query: updatedQuery })
  }

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

  };
  const handleSortOrderChange = () => {
    setLoading(true)
    if (sortOrder === -1) {
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
      pageNumber: 1
    })
    setCurrentPage(1)
  }
  const handleSelectChangelisting = (value) => {
    setLoading(true)
    if (value === ALL_PROJECTS) {
      setMyListingType(MY_PROJECTS)
      updateQueryParams({
        myListingType: MY_PROJECTS,
        propertyTitle: "",
        propertyId: "",
        sortingOrder: ""
      })
      setSelectedListing("")
    }
    else if (value === ALL_PROPERTIES) {
      setMyListingType(MY_PROPERTIES)
      updateQueryParams({
        myListingType: ALL_PROPERTIES,
        propertyTitle: "",
        propertyId: "",
        sortingOrder: ""
      })
      setSelectedListing("")
    }
    else {
      setSelectedListing(value)
      updateQueryParams({ propertyTitle: value, propertyId: "", sortingOrder: "" })
    }
  }
  useEffect(() => {
    makeApiRequest(POST_TEXT, PROPERTY_FETCHING_REDIRECT, { propertyId: propertyRedirect })
      .then((response) => {
        const result = response?.data?.result
        setDefaultText(result.propertyData.propertyTitle)
      })
      .catch((error) => {
        logger.error(error)
      })
  }, [propertyRedirect])

  useEffect(() => {
    makeApiRequest(GET_REQ, ADMIN_UNIQUE_LISITNGS_API_ROUTE)
      .then((response) => {
        const result = response?.data?.result
        setListingValues({ "All Listings": [ALL_PROJECTS, ALL_PROPERTIES], Projects: [...result.uniqueProjectTitlesArray], Properties: [...result.uniquePropertyTitlesArray], })
      })
      .catch((error) => {
        logger.error(error)
      })
  }, [])

  useEffect(() => {
    const { activity, pageNumber, pageSize, myListingType, days } = router.query
    setLoading(true)
    if (activity && pageNumber && pageSize && myListingType && days) {
      makeApiRequest(GET_REQ, ADMIN_LEADS_ROUTE, { params: router.query })
        .then((response) => {
          const result = response?.data?.result
          if (result?.totalPages === 0) {
            setNoDataModal(true)
          } else {
            setNoDataModal(false)
          }
          setLeadsList(result)
          setTotalPageType(result?.activities[0]?.activity)
          setTotalPages(result.totalPages)
          setApiCountEnquired(result?.totalCountEnquired)
          setApiCountWishlisted(result?.totalCountWishlisted)
          setApiCountViewed(result?.totalCountViewed)
          setLoading(false)
        })
        .catch((error) => {
          logger.error(error)
        })
    } else {
      updateQueryParams({
        activity: values,
        pageNumber: currentPage,
        pageSize: 10,
        city: selectedCity ? selectedCity : All_CITIES,
        days: selectedDays ? selectedDays : "90",
        myListingType: MY_PROJECTS
      })
    }
  }, [query])
  return (
    <Paper className="rounded-lg border">
      <Box sx={{ width: '100%', mr: 4, typography: 'body2' }}>
        <TabContext value={values}>
          <Box sx={{ borderBottom: 1, borderColor: 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
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
                  style: { backgroundColor: "#931602" },
                }}
              >
                <Tab
                  label={`Enquired (${apiCountEnquired || 0})`}
                  value="enquired"
                  style={{
                    textTransform: 'none',
                    padding: '0px 0px 0px 0px',
                    marginLeft: '4px',
                    color: values == LEAD_TYPE && "#931602",
                  }}
                />
                <Tab
                  label={`Wishlisted (${apiCountWishlisted || 0})`}
                  value="wishlisted"
                  style={{
                    textTransform: 'none',
                    padding: '0px 0px 0px 0px',
                    marginLeft: '10px',
                    color: values == LEAD_TYPE_WISHLISTED && "#931602",
                  }}
                />
                <Tab
                  label={`Viewed (${apiCountViewed || 0})`}
                  value="viewed"
                  style={{
                    textTransform: 'none',
                    padding: '0px 0px 0px 0px',
                    marginLeft: '10px',
                    color: values == LEAD_TYPE_VIEWED && "#931602",
                  }}
                />
              </TabList>
              <div className=" flex p-2  gap-3">
                <div>
                  <DropdownList
                    handleSelectChangeCity={handleSelectChangeCity}
                    isCityDropdown={true}
                  />
                </div>
                <div className='pl-1'>
                  <DropdownList
                    handleSelection={handleSelection}
                    isCityDropdown={false}
                  />
                </div>
                <div style={{ marginLeft: '6px', marginRight: '15px' }}>
                  {defaultText && (<MDSelectDropdown inlineCSS={{
                    width: '180px',
                    textAlign: 'left',
                    padding: '7.95px',
                    borderRadius: '6.5px',
                    marginLeft: '6px',
                    marginRight: '23px',
                    height: "30px",
                    dropdownFontSize: '14px',
                  }}
                    values={listingValues} groupingEnabled={true} byDefaultText={defaultText} setSelectedValue={setSelectedListing} onClick={handleSelectChangelisting} />
                  )}
                  {defaultText === '' && (
                    <MDSelectDropdown inlineCSS={{
                      width: '180px',
                      textAlign: 'left',
                      padding: '7.95px',
                      borderRadius: '6.5px',
                      marginLeft: '6px',
                      marginRight: '23px',
                      height: "30px",
                      dropdownFontSize: '14px',
                    }}
                      values={listingValues} groupingEnabled={true} byDefaultText={'All Projects'} setSelectedValue={setSelectedListing} onClick={handleSelectChangelisting} />
                  )
                  }
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
                    tableToRender={tableToRender}
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
                    tableToRender={tableToRender}
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
                    tableToRender={tableToRender}
                  />
                )}
              </TabPanel>
            </>
          )}
        </TabContext>
        {
          !noDataModal && (
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
                size={'medium'}
                showFirstButton={true}
                showLastButton={true}
                variant={'contained'}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          )
        }
      </Box >
      {noDataModal && (
        <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[598px] flex items-center">
          <NoDataInfo />
        </div>
      )
      }
    </Paper >
  )
}
