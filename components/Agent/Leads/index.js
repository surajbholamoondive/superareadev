import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import { AGENT_MODULE, GLOBALLY_COMMON_TEXT } from '@/textV2'
import { dayMappings, makeApiRequest } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import TableContainer from '@mui/material/TableContainer'

import EnhancedTable from '@/components/Admin/LeadsAdmin/Table.js'
import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'

import KycModal from '../../../components/Agent/modal'
import DropdownList from '../../Admin/Dashboard/DropdownList'
import NoDataInfo from '../../Admin/my-m-associates/NoDataInfo.js'
import styles from './index.module.css'

const {
  agentSideText,
  allCitiesText,
  allListingText,
  myLisintingText,
  filterObject,
} = AGENT_MODULE.AGENT_LEADS_PAGE.text
const { agentLeadsRoute, uniqueAgentListingRoute, propertyTitleRoute } =
  AGENT_MODULE?.AGENT_LEADS_PAGE?.routes
const { postType, getType, enquiredText } = GLOBALLY_COMMON_TEXT?.text
const Leads = () => {
  const router = useRouter()
  const { query } = router
  const { city, days, propertyId } = router.query
  const [value, setValue] = useState(
    query?.activity ? query.activity : enquiredText
  )
  const [selectedListing, setSelectedListing] = useState('')
  const [listingFilters, setListingFilters] = useState([])
  const [leadsList, setLeadsList] = useState()
  const [loading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [apiCountEnquired, setApiCountEnquired] = useState(0)
  const [apiCountWishlisted, setApiCountWishlisted] = useState(0)
  const [apiCountViewed, setApiCountViewed] = useState(0)
  const [listingType, setListingType] = useState(myLisintingText)
  const [noDataModal, setNoDataModal] = useState(false)
  const [isKycUpdateModalOpen, setKycUpdateModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState(city || allCitiesText)
  const [selectedDays, setSelectedDays] = useState(days || '90')
  const [propertyRedirect, setPropertyRedirect] = useState(
    propertyId ? propertyId : ''
  )
  const [modalData, setModalData] = useState({})
  const [defaultText, setDefaultText] = useState('')
  const [listingValues, setListingValues] = useState({
    'All Listings': [allListingText],
  })
  const [auth] = useAuth()
  const logger = getLogger()
  const tableToRender = agentSideText
  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })
    router.push({ pathname: router.pathname, query: updatedQuery })
  }
  const handleSelectChangeCity = (value) => {
    setLoading(true)
    setSelectedCity(value)
    const cityQueryParam = value === allCitiesText ? undefined : value
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, city: cityQueryParam },
      },
      undefined,
      { shallow: true }
    )
  }
  const handleSelection = (value) => {
    setLoading(true)
    const selectedValue = dayMappings[value]
    if (selectedValue !== undefined) {
      setSelectedDays(selectedValue)
      try {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, days: selectedValue },
        })
      } catch (error) {
        logger.error(error)
      }
    }
  }
  const handleSortOrderChange = () => {
    setLoading(true)
    if (sortOrder == -1) {
      updateQueryParams({ ...query, sortingorder: 1 })
      setSortOrder(1)
    } else {
      updateQueryParams({ ...query, sortingorder: -1 })
      setSortOrder(-1)
    }
  }

  const handlePageChange = (event, newPage) => {
    setLoading(true)
    setCurrentPage(newPage)
  }
  const handleChange = (event, newValue) => {
    setLoading(true)
    setValue(newValue)
    updateQueryParams({ activity: newValue })
    setCurrentPage(1)
  }
  const handleSelectlistingtype = (value) => {
    setLoading(true)
    setListingType(value)
    updateQueryParams({ listingtype: listingType })
  }
  const handleSelectChangelisting = (value) => {
    setLoading(true)
    if (value === allListingText) {
      setSelectedListing('')
      updateQueryParams({
        propertyTitle: '',
        propertyId: '',
      })
    } else {
      setSelectedListing(value)
      updateQueryParams({ propertyTitle: value, propertyId: '' })
    }
  }
  const [allOptionAdded, setAllOptionAdded] = useState(false)

  useEffect(() => {
    makeApiRequest(postType, propertyTitleRoute, {
      propertyId: propertyRedirect,
    })
      .then((response) => {
        const result = response?.data?.result
        setDefaultText(result.propertyData.propertyTitle)
      })
      .catch((error) => {
        logger.error(error)
      })
  }, [propertyRedirect])

  useEffect(() => {
    makeApiRequest(getType, uniqueAgentListingRoute)
      .then((response) => {
        const result = response?.data?.result
        setListingValues({
          Listings: [allListingText, ...result.uniquePropertyTitlesArray],
        })
      })
      .catch((error) => {
        logger.error(error)
      })
  }, [])

  useEffect(() => {
    const { activity, pageNumber, pageSize, listingtype } = router.query
    if (activity && pageNumber && pageSize && listingtype) {
      setLoading(true)
      makeApiRequest(getType, agentLeadsRoute, { params: router.query })
        .then((response) => {
          const result = response?.data?.result
          setLeadsList(result)
          setTotalPages(result?.totalPages)
          setApiCountEnquired(result?.totalCountEnquired)
          setApiCountWishlisted(result?.totalCountWishlisted)
          setApiCountViewed(result?.totalCountViewed)
          if (result?.activities?.length === 0) {
            setNoDataModal(true)
          } else {
            setNoDataModal(false)
          }
          setLoading(false)
          const uniqueListingFilters = new Set(
            listingFilters.map((item) => item.value)
          )
          result.activities.forEach((e) => {
            let propertyTitle = e.propertyTitle
            if (propertyTitle) {
              uniqueListingFilters.add(propertyTitle)
            }
          })
          let listingFiltersArray = []
          if (!allOptionAdded) {
            listingFiltersArray = [allListingText, ...uniqueListingFilters]
            setAllOptionAdded(true)
          } else {
            listingFiltersArray = [...uniqueListingFilters]
          }
          setListingFilters(
            [...listingFiltersArray].map((value) => ({ value, label: value }))
          )
        })
        .catch((error) => {
          logger.error(error)
        })
    }
  }, [query])

  useEffect(() => {
    if (auth?.userResult?.isKycVerified === false) {
      setKycUpdateModalOpen(true)
    }
  }, [auth.userResult])
  const handleModalClose = () => {
    setKycUpdateModalOpen(false)
  }

  return (
    <Paper
      className="rounded-lg pb-2 min-h-[70vh]"
      elevation={0}
      style={{ width: 'fit-content' }}
    >
      {isKycUpdateModalOpen && <KycModal onClose={handleModalClose} />}
      <Box sx={{}}>
        <TabContext value={value}>
          <Box>
            <TabContext value={value}>
              <Box className={styles.tabWrapper}>
                <TabList
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: '#931602',
                      display: 'flex',
                      justifyContent: 'center',
                    },
                  }}
                  className={styles.tabList}
                >
                  <Tab
                    label={`Enquired (${apiCountEnquired || 0})`}
                    value="enquired"
                    className={`${styles.tabItem} ${
                      value === 'enquired' ? styles.activeTab : ''
                    }`}
                  />
                  <Tab
                    label={`Wishlisted (${apiCountWishlisted || 0})`}
                    value="wishlisted"
                    className={`${styles.tabItem} ${
                      value === 'wishlisted' ? styles.activeTab : ''
                    }`}
                  />
                  <Tab
                    label={`Viewed (${apiCountViewed || 0})`}
                    value="viewed"
                    className={`${styles.tabItem} ${
                      value === 'viewed' ? styles.activeTab : ''
                    }`}
                  />
                </TabList>

                <div className={styles.filtersWrapper}>
                  <MDSelectDropdown
                    values={filterObject?.map((option) => option.label)}
                    byDefaultText={
                      defaultText
                        ? filterObject[1]?.label
                        : filterObject[0]?.label
                    }
                    onClick={handleSelectlistingtype}
                    icon="https://cdn-icons-png.flaticon.com/256/60/60995.png"
                    inlineCSS={{
                      width: '160px',
                      textAlign: 'left',
                      padding: '7.95px',
                      borderRadius: '6.5px',
                      marginLeft: '6px',
                      marginRight: '23px',
                      height: '100%',
                      dropdownFontSize: '14px',
                    }}
                  />
                  <DropdownList
                    handleSelectChangeCity={handleSelectChangeCity}
                    leadsPage={true}
                    isCityDropdown={true}
                  />

                  <DropdownList
                    handleSelection={handleSelection}
                    leadsPage={true}
                    isCityDropdown={false}
                  />

                  <MDSelectDropdown
                    values={listingValues}
                    groupingEnabled={true}
                    byDefaultText={defaultText || 'All Listings'}
                    setSelectedValue={setSelectedListing}
                    onClick={handleSelectChangelisting}
                  />
                </div>
              </Box>
            </TabContext>
          </Box>

          <TabPanel value="enquired" sx={{ paddingTop: '9px' }}>
            {loading ? (
              <Loading />
            ) : (
              !noDataModal && (
                <TableContainer sx={{ width: '100%' }}>
                  <EnhancedTable
                    array={leadsList}
                    valueType={value}
                    handleSortState={handleSortOrderChange}
                    tableToRender={tableToRender}
                    setModalData={setModalData}
                  />
                </TableContainer>
              )
            )}
          </TabPanel>
          <TabPanel value="wishlisted" sx={{ paddingTop: '9px' }}>
            {loading ? (
              <Loading />
            ) : (
              !noDataModal && (
                <EnhancedTable
                  array={leadsList}
                  valueType={value}
                  handleSortState={handleSortOrderChange}
                  tableToRender={tableToRender}
                  setModalData={setModalData}
                />
              )
            )}
          </TabPanel>
          <TabPanel value="viewed" sx={{ paddingTop: '9px' }}>
            {' '}
            {loading ? (
              <Loading />
            ) : (
              !noDataModal && (
                <EnhancedTable
                  array={leadsList}
                  valueType={value}
                  handleSortState={handleSortOrderChange}
                  tableToRender={tableToRender}
                  setModalData={setModalData}
                />
              )
            )}
          </TabPanel>
        </TabContext>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2px',
            marginTop: '4px',
            backgroundColor: 'white',
          }}
        >
          {!noDataModal && (
            <Pagination
              count={totalPages}
              size="medium"
              showFirstButton
              showLastButton
              variant={'contained'}
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
        </div>
      </Box>
      {noDataModal && (
        <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[500px] flex items-center ">
          <NoDataInfo />
        </div>
      )}
    </Paper>
  )
}
export default Leads
