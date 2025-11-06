import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MDSelectDropdown from '@/components/MDSelectDropdown/MDSelectDropdown'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import { GLOBALLY_COMMON_TEXT, USER_MODULE } from '@/textV2'
import { makeApiRequest } from '@/utils/utils'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import { dayMappings } from '@/utils/utils'
import EnhancedTable from '@/components/Admin/LeadsAdmin/Table.js'
import DropdownList from '../../Admin/Dashboard/DropdownList'
import NoDataInfo from '../../Admin/my-m-associates/NoDataInfo.js'

const { enquiredText, getType, postType } = GLOBALLY_COMMON_TEXT?.text
const { text, routes } = USER_MODULE?.USER_ENQUIRIES_RECEIVED_PAGE
const { propertyTitleRoute, userEnquiriesRoute, uniqueListingRoute } = routes
const { allCitiesText, allListingText, myListingText, userSideText } = text
export default function Tabs() {
  const router = useRouter();
  const { query } = router
  const { city, days, propertyId } = router.query;
  const [selectedCity, setSelectedCity] = useState(city || allCitiesText)
  const [selectedDays, setSelectedDays] = useState(days || '90')
  const [selectedListing, setSelectedListing] = useState('')
  const [cityFilters, setCityFilters] = useState([])
  const [listingFilters, setListingFilters] = useState([])
  const [leadsList, setLeadsList] = useState()
  const [loading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState(-1)
  const [modalData, setModalData] = useState({})
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [noDataModal, setNoDataModal] = useState(false)
  const [propertyRedirect, setPropertyRedirect] = useState(propertyId ? propertyId : '')
  const [defaultText, setDefaultText] = useState('')
  const [listingValues, setListingValues] = useState({ "All Listings": [allListingText] })

  const logger = getLogger()
  const tableToRender = userSideText

  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '' || updatedQuery[key] === allListingText) {
        delete updatedQuery[key]
      }
    })
    router.push({ pathname: router.pathname, query: updatedQuery })
  }

  const handleSortOrderChange = () => {
    setLoading(true)
    if (sortOrder === -1) {
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
    updateQueryParams({ ...query, pageNumber: newPage })
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
  const handleSelectChangelisting = (value) => {
    setLoading(true)
    if (value === allListingText) {
      setSelectedListing('')
      updateQueryParams({ propertyTitle: "", propertyId: "" })
    } else {
      setSelectedListing(value)
      updateQueryParams({ propertyTitle: value, propertyId: "" })
    }
  }

  const [allOptionAdded, setAllOptionAdded] = useState(false)
  useEffect(() => {
    makeApiRequest(postType, propertyTitleRoute, { propertyId: propertyRedirect })
      .then((response) => {
        const result = response?.data?.result
        setDefaultText(result.propertyData.propertyTitle)
      })
      .catch((error) => {
        logger.error(error)
      })
  }, [propertyRedirect])
  useEffect(() => {
    makeApiRequest(getType, uniqueListingRoute)
      .then((response) => {
        const result = response?.data?.result
        setListingValues({ "All Listings": [allListingText, ...result.uniquePropertyTitlesArray] })
      })
      .catch((error) => {
        logger.error(error)
      })
  }, [])

  useEffect(() => {
    const { activity, pageNumber, pageSize, listingtype } = router.query
    setLoading(true)
    if (activity && pageNumber && pageSize && listingtype) {
      makeApiRequest(getType, userEnquiriesRoute, { params: router.query })
        .then((response) => {
          const result = response?.data?.result
          if (result?.activities.length === 0) {
            setNoDataModal(true)
          } else {
            setNoDataModal(false)
          }
          setLeadsList(result)
          setTotalPages(result.totalPages)
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
          setLoading(false)
        }
        )
        .catch((error) => {
          logger.error(error)
        })
    } else {
      updateQueryParams({
        activity: enquiredText,
        listingtype: myListingText,
        pageNumber: 1,
        pageSize: 10,
      })
    }
  }, [query])
  return (
    <div
      className={`border rounded-lg max-md:w-[360px] max-lg:w-[700px] max-xl:w-[880px] min-h-[70vh]`}
    >
      <Paper>
        <Box sx={{ typography: 'body1' }}>
          <Box sx={{ typography: 'body1' }}>
            <div className="flex flex-wrap max-lg:ml-3 gap-4 md:justify-end  pt-[10px] pb-[3px]">
              <div>
                <DropdownList
                  handleSelectChangeCity={handleSelectChangeCity}
                  leadsPage={true}
                  isCityDropdown={true}
                />
              </div>
              <div>
                <DropdownList
                  handleSelection={handleSelection}
                  leadsPage={true}
                  isCityDropdown={false}
                />
              </div>
              <div className='mr-3'>
                {defaultText && (
                  <MDSelectDropdown
                    inlineCSS={{
                      width: '160px',
                      textAlign: 'left',
                      padding: '7.95px',
                      borderRadius: '6.5px',
                      marginLeft: '6px',
                      marginRight: '23px',
                      fontSize: '14px',
                      height: "30px",
                      dropdownFontSize: '12px',
                    }}
                    values={listingValues} groupingEnabled={true}
                    byDefaultText={defaultText} setSelectedValue={setSelectedListing} onClick={handleSelectChangelisting} />
                )}
                {defaultText === '' && (
                  <MDSelectDropdown inlineCSS={{
                    width: '160px',
                    textAlign: 'left',
                    padding: '18.5px',
                    borderRadius: '6.5px',
                    marginLeft: '6px',
                    marginRight: '23px',
                    fontSize: '14px',
                    height: "30px",
                    dropdownFontSize: '14px',
                  }}
                    values={listingValues} groupingEnabled={true}
                    byDefaultText={'Listings'} setSelectedValue={setSelectedListing} onClick={handleSelectChangelisting} />
                )
                }
              </div>
            </div>
          </Box>
          {!noDataModal && (
            <div className='p-3'>
              {loading ? (
                <Loading />
              ) : (
                <EnhancedTable
                  array={leadsList}
                  handleSortState={handleSortOrderChange}
                  setModalData={setModalData}
                  valueType={'enquired'}
                  tableToRender={tableToRender}
                />
              )}
            </div>
          )}
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
                size={'medium'}
                showFirstButton={true}
                showLastButton={true}
                variant={'contained'}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          )}
        </Box>
      </Paper>
      {noDataModal && (
        <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[598px] flex items-center">
          <NoDataInfo />
        </div>
      )}
    </div>
  )
}
