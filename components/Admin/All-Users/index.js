import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth'
import { getLogger } from '@/helper/logger'
import Loading from '@/pages/loading'
import {
  ALL_USERS,
  RESTRICTED_USERS,
} from '@/text'
import { dayMappings, makeApiRequest } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Dropdown from '../Dashboard/DropdownList'
import style from '../my-m-associates/index.module.css'
import NoDataInfo from '../my-m-associates/NoDataInfo.js/index'
import EnhancedTable from './table'
import { GLOBALLY_COMMON_TEXT, ADMIN_MODULE } from '@/textV2'
const { text } = GLOBALLY_COMMON_TEXT
const { ADMIN_ALL_USERS_PAGE } = ADMIN_MODULE
const { routes, text: allUsersText } = ADMIN_ALL_USERS_PAGE
const AllUsers = () => {
  const logger = getLogger()
  const router = useRouter()
  const [usersData, setUsersData] = useState({
    allUsers: [],
    restrictedUsers: [],
  })
  const { query } = router
  const { city, days } = router.query
  const [value, setValue] = useState('All Users')
  const [approved, setApproved] = useState(true)
  const [restrict, setRestricted] = useState(true)
  const [selectedCity, setSelectedCity] = useState(city || allUsersText.allCities)
  const [selectedDays, setSelectedDays] = useState(days || '90')
  const [allUserCount, setAllUserCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [restrictedUserCount, setRestrictedUserCount] = useState(0)
  const [auth, setAuth] = useAuth()
  useEffect(() => {
    fetchData()
  }, [query.city, query.days, approved, restrict, auth])

  const fetchData = async () => {
    setLoading(true)
    if (auth?.token === '') {
      return
    }
    try {
      const queryParams = {
        ...(selectedCity && selectedCity !== allUsersText.allCities
          ? { city: selectedCity }
          : {}),
        ...(days ? { days: days } : {}),
      }
      const response = await makeApiRequest(text.getType, routes.allUsersRoute, {
        params: queryParams,
      })
      setUsersData(response?.data?.result)
      const results = response?.data?.result
      setAllUserCount(response?.data?.result?.allUsersCount)
      setRestrictedUserCount(response?.data?.result?.restrictedCount)

      if (results?.allUsersCount > 0) {
        setNoDataModal(false)
      } else {
        setNoDataModal(true)
      }
      setLoading(false)
    } catch (error) {
      logger.error(error)
      setLoading(false)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSelectChangeCity = (value) => {
    setLoading(true)
    setSelectedCity(value)
    const cityQueryParam = value === allUsersText.allCities ? undefined : value
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
                      label={`Approved Users ${allUserCount > 0 ? `(${allUserCount})` : ''}`}
                      value="All Users"
                      className={` ${style.tabApprovedStyle}  `}
                      style={{
                        color: value == ALL_USERS && "#931602",
                      }}
                    />
                    <div style={{ width: '15px' }} />
                    <Tab
                      sx={{ textTransform: 'capitalize', padding: '1px 1px' }}
                      label={`Restricted Users ${restrictedUserCount > 0 ? `(${restrictedUserCount})` : ''}`}
                      className={` ${style.tabPendingStyle}`}
                      value="Restricted Users"
                      style={{
                        color: value == RESTRICTED_USERS && "#931602",
                      }}
                    />
                  </TabList>
                  <div className="flex mr-[3px] gap-4 pr-5  pt-3">
                    <div>
                      <Dropdown
                        handleSelectChangeCity={handleSelectChangeCity}
                        handleSelection={handleSelection}
                        isCityDropdown={true}
                      />
                    </div>
                    <div>
                      <Dropdown
                        handleSelection={handleSelection}
                        isCityDropdown={false}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {allUserCount > 0 ? (
                    <TabPanel sx={{ paddingTop: '12px' }} value="All Users">
                      <EnhancedTable
                        array={usersData?.allUsers}
                        restricted={false}
                        setApproved={setApproved}
                        setRestricted={setRestricted}
                        restrict={restrict}
                        approved={approved}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel sx={{ paddingTop: '12px' }} value="All Users">
                      <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[585px] flex items-center ">
                        <NoDataInfo />
                      </div>
                    </TabPanel>
                  )}
                  {restrictedUserCount ? (
                    <TabPanel
                      sx={{ paddingTop: '12px' }}
                      value="Restricted Users"
                    >
                      <EnhancedTable
                        array={usersData?.restrictedUsers}
                        restricted={true}
                        setApproved={setApproved}
                        setRestricted={setRestricted}
                        restrict={restrict}
                        approved={approved}
                      />
                    </TabPanel>
                  ) : (
                    <TabPanel
                      sx={{ paddingTop: '12px' }}
                      value="Restricted Users"
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

export default AllUsers
