import React, { useEffect, useState } from 'react'
import { CustomTabLabel } from '@/utils/utils'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import NoDataInfo from '@/components/Admin/my-m-associates/NoDataInfo.js'
import style from '../../Admin/my-m-associates/index.module.css'
import VerificationListing from './verifiedListings'
import { GLOBALLY_COMMON_TEXT } from '@/textV2'
const {allText,aprrovedText,pendingText,rejectedText,verifiedText}=GLOBALLY_COMMON_TEXT?.text
const agentListing = ({ data }) => {
  const [value, setValue] = useState('1')
  const [lastValidValue, setLastValidValue] = useState('1')
  const [allData] = useState(data.totalCountAll)
  const [approveddData] = useState(data.totalCountApproved)
  const [pendingData] = useState(data.totalCountPending)
  const [rejectedData] = useState(data.totalCountRejected)
  const [clicked, setClicked] = useState(false)
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    if (value === undefined) {
      setValue(lastValidValue)
    } else {
      setLastValidValue(value)
    }
  }, [value, lastValidValue])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="bg-white h-fit m-auto rounded-lg">
      <Box sx={{ width: '100%' }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'transparent'
            }}
          >
            <TabList
              value={value}
              style={{ marginTop: "2.5px", marginLeft: "20px", overflowX: "auto", whiteSpace: "nowrap", flexGrow: 1 }}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              TabIndicatorProps={{
                style: { backgroundColor: '#931602'},
              }}
            >
              <Tab
                sx={{ textTransform: 'capitalize' ,fontSize: '14px',
                  minWidth: 'auto',
                  padding: '0px',
                  margin: '0px 10px',
                    }}
                label={`${allText} ${allData > 0 ? `(${allData})` : ''}`}
                value="1"
                style={(value === "1" ? { color: '#931602' } : {})}
              />
              <Tab
                  sx={{ textTransform: 'capitalize' ,fontSize: '14px',
                    minWidth: 'auto',
                    padding: '0px',
                    margin: '0px 10px', }}
                label={
                  pendingData > 0 ? (
                    <div>
                    <CustomTabLabel
                      text={pendingText}
                      count={pendingData > 0 ? pendingData : ''}
                    />
                    </div>
                  ) : (
                  <span className='capitalize'>{pendingText}</span>  
                  )
                }
                value="2"
                className={style.tabPendingStyle}
                style={(value === "2" ? { color: '#931602' } : {})}
              />
              <Tab
                 sx={{ textTransform: 'capitalize' ,fontSize: '14px',
                  minWidth: 'auto',
                  padding: '0px',
                  margin: '0px 10px', }}
                label={`${verifiedText} ${approveddData > 0 ? `(${approveddData})` : ''}`}
                value="3"
                style={(value === "3" ? { color: '#931602' } : {})}
              />
              <Tab
                  sx={{ textTransform: 'capitalize' ,fontSize: '14px',
                    minWidth: 'auto',
                    padding: '0px',
                    margin: '0px 10px', }}
                label={`${rejectedText} ${rejectedData > 0 ? `(${rejectedData})` : ''}`}
                value="4"
                style={(value === "4" ? { color: '#931602' } : {})}
              />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ padding: '0px' }}>
            <VerificationListing
              status={allText}
              clicked={clicked}
              setClicked={setClicked}
              setNoData={setNoData}
            />
          </TabPanel>
          <TabPanel value="2" style={{ padding: '0px' }}>
            <VerificationListing
              status={pendingText}
              clicked={clicked}
              setClicked={setClicked}
              setNoData={setNoData}
            />
          </TabPanel>
          <TabPanel value="3" style={{ padding: '0px' }}>
            <VerificationListing
              status={aprrovedText}
              clicked={clicked}
              setClicked={setClicked}
              setNoData={setNoData}
            />
          </TabPanel>
          <TabPanel value="4" style={{ padding: '0px' }}>
            <VerificationListing
              status={rejectedText}
              clicked={clicked}
              setClicked={setClicked}
              setNoData={setNoData}
            />
          </TabPanel>
        </TabContext>
      </Box>
      {noData && (
        <div className="bg-white w-full justify-center h-[420px] flex items-center ">
          <NoDataInfo />
        </div>
      )}
    </div>
  )
}
export default agentListing
