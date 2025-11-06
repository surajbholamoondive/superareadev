import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLogger } from '@/helper/logger'
import { useAuth } from '@/context/auth'
import Loading from '@/pages/loading'
import { makeApiRequest } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import style from './index.module.css'
import NoDataInfo from './NoDataInfo.js'
import EnhancedTable from './Table'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const { text, bugtext } = GLOBALLY_COMMON_TEXT
const myAssociates = () => {
  const router = useRouter()
  const [value, setValue] = useState('pending')
  const [leadsList, setLeadsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [resolvedCount, setResolvedCount] = useState(0)
  const [noDataModal, setNoDataModal] = useState(false)
  const [clicked, setClicked] = useState(true)
  const logger = getLogger()
  const [auth, setAuth] = useAuth()

  const updateQueryParams = (newParams) => {
    const updatedQuery = { ...router.query, ...newParams }
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key]
      }
    })
    router.push({ pathname: router.pathname, query: updatedQuery })
  }

  useEffect(() => {
    fetchData()
  }, [auth, clicked, router.query])

  const handleChange = (event, newValue) => {
    setLoading(true)
    setValue(newValue)
    updateQueryParams({
      bugStatus: newValue
    })

  }
  const fetchData = async () => {
    setLoading(true)
    if (auth?.token === '') {
      return
    }

    if (router.query.bugStatus) {

      try {
        const response = await makeApiRequest(text.getType, bugtext.bugreportsdatatext, {
          params: router.query,
        })
        const result = response?.data?.result

        if (result?.totalCountPending === 0) {
          setNoDataModal(true)
        } else {
          setNoDataModal(false)
        }
        if (result?.totalCountResolved === 0) {
          setNoDataModal(true)
        } else {
          setNoDataModal(false)
        }
        setLeadsList(result?.bugData)
        setPendingCount(result?.totalCountPending)
        setResolvedCount(result?.totalCountResolved)
        setLoading(false)
      }
      catch {
        (error) => {
          logger.error(error)
        }
      }
    } else {
      updateQueryParams({
        bugStatus: bugtext.pendingtext
      })

    }
  }

  return (
    <div>
      {!loading ? (
        <TabContext className={`${style.tabContext}`} value={value}>
          <Box sx={{}}>
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
                  label={`Pending ${pendingCount > 0 ? `(${pendingCount})` : ''}`}
                  value="pending"
                  className={` ${style.tabApprovedStyle}  `}
                  style={{
                    color: value == 'pending' && "#931602",
                  }}
                />

                <div style={{ width: '15px' }} />

                <Tab
                  sx={{ textTransform: 'capitalize', padding: '1px 1px' }}
                  label={`Resolved ${resolvedCount > 0 ? `(${resolvedCount})` : ''}`}
                  value="resolved"
                  className={` ${style.tabApprovedStyle}  `}
                  style={{
                    color: value == 'resolved' && "#931602",
                  }}
                />

              </TabList>
            </div>
            <div>
              {pendingCount > 0 ? (
                <TabPanel sx={{ paddingTop: '12px' }} value={bugtext.pendingtext}>
                  <EnhancedTable
                    setClicked={setClicked} clicked={clicked} array={leadsList}
                  />
                </TabPanel>
              ) : (
                <TabPanel sx={{ paddingTop: '12px' }} value={bugtext.pendingtext}>
                  <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[585px] flex items-center ">
                    <NoDataInfo />
                  </div>
                </TabPanel>
              )}
              {resolvedCount ? (
                <TabPanel
                  sx={{ paddingTop: '12px' }}
                  value={bugtext.resolvedtext}
                >
                  <EnhancedTable
                    setClicked={setClicked} clicked={clicked} array={leadsList}
                  />
                </TabPanel>
              ) : (
                <TabPanel
                  sx={{ paddingTop: '12px' }}
                  value={bugtext.resolvedtext}
                >
                  <div className="bg-white w-full rounded-md max-md:w-full justify-center h-[585px] flex items-center ">
                    <NoDataInfo />
                  </div>
                </TabPanel>
              )}
            </div>
          </Box>
        </TabContext>
      ) : (
        <Loading />
      )}
    </div>
  )
}
export default myAssociates
