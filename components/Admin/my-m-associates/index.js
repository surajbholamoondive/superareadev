import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'
import { useAuth } from '@/context/auth'
import Loading from '@/pages/loading'


import { CustomTabLabel, dayMappings, makeApiRequest } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import DropdownList from '../Dashboard/DropdownList'
import style from './index.module.css'
import NoDataInfo from './NoDataInfo.js'
import EnhancedTable from './Table'
import { GLOBALLY_COMMON_TEXT, USER_ENQUIRIES_RECEIVED_TEXT, ADMIN_MODULE, } from '@/textV2'
const { ADMIN_DASHBOARD_PAGE } = ADMIN_MODULE
const { routes } = ADMIN_DASHBOARD_PAGE
const { text } = GLOBALLY_COMMON_TEXT
const { text: enquiriesReceived } = USER_ENQUIRIES_RECEIVED_TEXT
const myAssociates = () => {
  const router = useRouter()
  const { query } = router
  const { city, days } = router.query
  const [value, setValue] = useState(text.aprrovedText)
  const [leadsList, setLeadsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [approvedCount, setApprovedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [restrictedCount, setRestrictedCount] = useState(0)
  const [noDataModal, setNoDataModal] = useState(false)
  const [selectedCity, setSelectedCity] = useState(city || enquiriesReceived.allCitiesText)
  const [selectedDays, setSelectedDays] = useState(days || '90')
  const [clicked, setClicked] = useState(true)
  const logger = getLogger()
  const [auth, setAuth] = useAuth()

  useEffect(() => {
    fetchData()
  }, [query.city, query.days, value, auth, clicked])

  const handleSelectChangeCity = (value) => {
    setLoading(true)
    setSelectedCity(value)
    const cityQueryParam = value
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
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const fetchData = async () => {
    setLoading(true)
    if (auth?.token === '') {
      return
    }
    try {
      const queryParams = {
        ...(selectedCity && selectedCity !== enquiriesReceived.allCitiesText
          ? { city: selectedCity }
          : {}),
        ...(days ? { days: days } : {}),
      }
      const response = await makeApiRequest(text.getType, routes.mAssociateRoute, {
        params: queryParams,
      })
      const result = response?.data?.result
      if (result?.approvedCount === 0) {
        setNoDataModal(true)
      } else {
        setNoDataModal(false)
      }
      if (result?.pendingCount === 0) {
        setNoDataModal(true)
      } else {
        setNoDataModal(false)
      }
      if (result?.restrictedCount === 0) {
        setNoDataModal(true)
      } else {
        setNoDataModal(false)
      }
      if (value === 'approved') {
        setLeadsList(result?.usersApproved)
      } else if (value === 'pending') {
        setLeadsList(result?.usersPending)
      } else {
        setLeadsList(result?.usersRestricted)
      }
      setApprovedCount(result?.approvedCount)
      setPendingCount(result?.pendingCount)
      setRestrictedCount(result?.restrictedCount)
      setLoading(false)
    }
    catch {
      (error) => {
        logger.error(error)
      }
    }
  }
  return (
    <div>
      {!loading ? (
        <Paper className="mb-[40px]">
          <Box sx={{ width: '100%', mr: '8px', typography: 'body2' }}>
            <TabContext className={`${style.tabContext}`} value={value}>
              <Box sx={{ borderBottom: 0, borderColor: 'transparent' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <TabList
                    className="ml-7"
                    onChange={handleChange}
                    aria-label="tabs"
                    TabIndicatorProps={{
                      style: { backgroundColor: "#931602" },
                    }}
                  >
                    <Tab
                      sx={{ textTransform: 'capitalize', padding: '1px 1px' }}
                      label={`Approved ${approvedCount > 0 ? `(${approvedCount})` : ''}`}
                      value="approved"
                      className={` ${style.tabApprovedStyle}  `}

                      style={{
                        color: value == 'approved' && "#931602",
                      }}
                    />

                    <div style={{ width: '15px' }} />

                    <Tab
                      sx={{ textTransform: 'capitalize', padding: '1px 1px' }}
                      label={pendingCount > 0 ? (<CustomTabLabel
                        text={`Awaiting Approval`}
                        count={pendingCount} />) : ('Awaiting Approval')}
                      value="pending"

                      style={{
                        color: value == "pending" && "#931602",
                      }} />

                    <div style={{ width: '15px' }} />

                    <Tab
                      sx={{ textTransform: 'capitalize', padding: '1px 1px' }}
                      label={`Restricted ${restrictedCount > 0 ? `(${restrictedCount})` : ''}`}
                      value="restricted"
                      style={{
                        color: value == "restricted" && "#931602",
                      }}
                      className={` ${style.tabApprovedStyle}  `} />

                  </TabList>
                  <div className="flex mr-[4.8px] gap-4 pr-5  pt-3">
                    <div>
                      <DropdownList
                        handleSelectChangeCity={handleSelectChangeCity}
                        isCityDropdown={true}
                      />
                    </div>
                    <div>
                      <DropdownList
                        handleSelection={handleSelection}
                        isCityDropdown={false}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {approvedCount > 0 ? (
                    <TabPanel sx={{ paddingTop: '12px' }} value="approved">
                      <EnhancedTable
                        setClicked={setClicked} clicked={clicked} array={leadsList}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel sx={{ paddingTop: '12px' }} value="approved">
                      <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[585px] flex items-center ">
                        <NoDataInfo />
                      </div>
                    </TabPanel>
                  )}
                  {pendingCount ? (
                    <TabPanel
                      sx={{ paddingTop: '12px' }}
                      value="pending"
                    >
                      <EnhancedTable
                        setClicked={setClicked} clicked={clicked} array={leadsList}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel
                      sx={{ paddingTop: '12px' }}
                      value="pending"
                    >
                      <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[585px] flex items-center ">
                        <NoDataInfo />
                      </div>
                    </TabPanel>
                  )}
                  {restrictedCount ? (
                    <TabPanel
                      sx={{ paddingTop: '12px' }}
                      value="restricted"
                    >
                      <EnhancedTable
                        setClicked={setClicked} clicked={clicked} array={leadsList}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel
                      sx={{ paddingTop: '12px' }}
                      value="restricted"
                    >
                      <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[585px] flex items-center ">
                        <NoDataInfo />
                      </div>
                    </TabPanel>
                  )}
                </div>
              </Box>
            </TabContext>
          </Box>
        </Paper>
      ) : (
        <Loading />
      )}
    </div>
  )
}
export default myAssociates
